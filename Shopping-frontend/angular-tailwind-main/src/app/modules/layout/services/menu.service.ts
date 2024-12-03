import {inject, Injectable, OnDestroy, signal} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {map, Subscription} from 'rxjs';
import { Menu } from 'src/app/core/constants/menu';
import { MenuItem, SubMenuItem } from 'src/app/core/models/menu.model';
import { UserStorageService } from "../../auth/storage/user-storage.service";
import {TeamService} from "../../../core/components/services/team/team.service";

@Injectable({
  providedIn: 'root',
})
export class MenuService implements OnDestroy {
  private _showSidebar = signal(true);
  private _showMobileMenu = signal(false);
  private _pagesMenu = signal<MenuItem[]>([]);  // Le signal pour gérer le menu dynamique
  private _subscription = new Subscription();
  private teamService = inject(TeamService)

  userId!:number
  constructor(private router: Router) {
    const userString = window.localStorage.getItem('user'); // "user" est la clé

    if (userString) {
      const user = JSON.parse(userString);

      // Accéder à l'id
      this.userId = user.id;
      console.log('User ID:', this.userId);
    } else {
      console.log('No user data found in localStorage.');
    }

    this.teamService.findById(this.userId).pipe(
      map(value => value.role)
    ).subscribe({
      next: role => {
        console.log('User role:', role); // Vérifiez le rôle dans les logs

        if (role === 'SUPERADMIN') {
          this._pagesMenu.set(Menu.pages); // Utilisation du menu pour SUPERADMIN
        } else {
          this._pagesMenu.set(Menu.pagesAdmin); // Utilisation du menu pour les autres rôles
        }
      },
      error: err => {
        console.error('Failed to fetch user role:', err);
      }
    });

    // Souscription aux événements de navigation pour gérer l'expansion des sous-menus
    const sub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this._pagesMenu().forEach((menu) => {
          let activeGroup = false;
          menu.items.forEach((subMenu) => {
            const active = this.isActive(subMenu.route);  // Vérification si la route est active
            subMenu.expanded = active;
            subMenu.active = active;
            if (active) activeGroup = true;
            if (subMenu.children) {
              this.expand(subMenu.children);  // Expansion des sous-menus
            }
          });
          menu.active = activeGroup;  // Mise à jour de l'état du groupe
        });
      }
    });
    this._subscription.add(sub);
  }

  // Accesseurs pour afficher ou masquer la barre latérale et le menu mobile
  get showSideBar() {
    return this._showSidebar();
  }

  get showMobileMenu() {
    return this._showMobileMenu();
  }

  get pagesMenu() {
    return this._pagesMenu();  // Accès au menu dynamique
  }

  // Mutateurs pour modifier l'état de la barre latérale et du menu mobile
  set showSideBar(value: boolean) {
    this._showSidebar.set(value);
  }

  set showMobileMenu(value: boolean) {
    this._showMobileMenu.set(value);
  }

  // Méthode pour basculer l'état de la barre latérale
  public toggleSidebar() {
    this._showSidebar.set(!this._showSidebar());
  }

  // Méthode pour basculer l'état d'un menu principal
  public toggleMenu(menu: any) {
    this.showSideBar = true;
    menu.expanded = !menu.expanded;
  }

  // Méthode pour basculer l'état d'un sous-menu
  public toggleSubMenu(submenu: SubMenuItem) {
    submenu.expanded = !submenu.expanded;
  }

  // Fonction récursive pour développer tous les sous-menus qui sont actifs
  private expand(items: Array<any>) {
    items.forEach((item) => {
      item.expanded = this.isActive(item.route);  // Développe l'élément si la route est active
      if (item.children) this.expand(item.children);  // Appel récursif pour les enfants
    });
  }

  // Vérification si la route est active en fonction de l'instruction
  private isActive(instruction: any): boolean {
    return this.router.isActive(this.router.createUrlTree([instruction]), {
      paths: 'subset',
      queryParams: 'subset',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }

  // Nettoyage des souscriptions lors de la destruction du service
  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
