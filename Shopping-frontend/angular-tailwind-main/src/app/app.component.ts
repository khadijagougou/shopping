import {Component, inject} from '@angular/core';
import {ThemeService} from './core/services/theme.service';
import {RouterOutlet} from '@angular/router';
import {NgClass} from '@angular/common';
import {ResponsiveHelperComponent} from './shared/components/responsive-helper/responsive-helper.component';
import {NgxSonnerToaster} from 'ngx-sonner';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faCoffee} from '@fortawesome/free-solid-svg-icons';
import {TeamService} from "./core/components/services/team/team.service";
import {UserStorageService} from "./modules/auth/storage/user-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [NgClass, RouterOutlet, ResponsiveHelperComponent, NgxSonnerToaster,

    FontAwesomeModule],
})
export class AppComponent {
  title = 'Angular Tailwind';
  faCoffee = faCoffee;
  private teamService = inject(TeamService);


  constructor(public themeService: ThemeService,
             ) {

  }
}
