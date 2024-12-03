import {Component, inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import {AuthService} from "../../authService/auth.service";
import {UserStorageService} from "../../storage/user-storage.service";
import {TeamService} from "../../../../core/components/services/team/team.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, AngularSvgIconModule, NgClass, NgIf, ButtonComponent],
})
export class SignInComponent {
  submitted = false;
  passwordTextType!: boolean;
private teamService= inject(TeamService)
  submissionSuccessCreate=false
  status:any
  constructor(private fb:FormBuilder,
              private authService : AuthService,
              private activatedRouter : ActivatedRoute,
              private router : Router,) {
    this.signinFormGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  signinFormGroup : FormGroup;




  onClick() {
    console.log('Button clicked');
  }


message!:string
  togglePasswordTextType() {
    this.passwordTextType = !this.passwordTextType;
  }
  submitForm() {
    this.authService.login(this.signinFormGroup.value).subscribe({
      next: res => {
        console.log(res);

        if (res.userId && res.role) {
          const user = {
            id: res.userId,
          };

          this.teamService.findById(res.userId).subscribe({
            next: value => {
              console.log(value);
              this.status = value.status;

              if (res.role === "ADMIN" && this.status === false) {
                console.log('Vous ne pouvez pas accéder.');
                this.message='Your account is desactivated.'
              } else {
                UserStorageService.saveUser(user);
                UserStorageService.saveToken(res.jwt);
                console.log('hhhh',user)

                this.router.navigate(['/dashboard'], {
                  queryParams: { useId: 'true' },
                });
              }
            },
            error: err => {
              console.log("Erreur lors de la récupération du statut :", err);
            }
          });
        } else {
          console.log("Utilisateur ou rôle invalide.");
        }
      },
      error: err => {
        console.log("Échec lors du login :", err);
      }
    });
  }
  ngOnInit(){
    this.activatedRouter.queryParams.subscribe((params) => {
      if (params['successcreate'] === 'true') {
        this.submissionSuccessCreate = true;
        setTimeout(() => {
          this.submissionSuccessCreate = false; // Le message disparaît après un moment
        }, 3000);
      }
    });
  }

/*
  submitForm() {
    this.authService.login(this.signinFormGroup.value).subscribe(res => {
      console.log(res);
      if (res.userId != null && res.role != null) {
        const user = {
          id: res.userId,
          role: res.role
        };
        UserStorageService.saveUser(user);
        UserStorageService.saveToken(res.jwt);

        this.router.navigateByUrl('/dashboard');
      }
    }, error => {
      console.log("Échec lors du login");
    });
  }

*/
}
