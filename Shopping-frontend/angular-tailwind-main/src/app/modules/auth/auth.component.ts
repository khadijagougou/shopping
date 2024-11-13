import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "./authService/auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    standalone: true,
  imports: [AngularSvgIconModule, RouterOutlet, ReactiveFormsModule],
})
export class AuthComponent  {
  signupFormGroup:FormGroup;
  constructor( private fb:FormBuilder,
               private authService : AuthService,) {
    this.signupFormGroup = this.fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],  // Validité pour un numéro de téléphone à 10 chiffres
      email: ['', [Validators.required, Validators.email]],  // Validation de l'email
      password: ['', [Validators.required]],
      confirmpassword: ['', [Validators.required]]
    }, {validator: this.passwordMatchValidator});  // Validation personnalisée pour vérifier la correspondance des mots de passe

  }
  submitForm(){
    this.authService.signup(this.signupFormGroup.value).subscribe(res=>{
        console.log(res);
      },error => {
        console.log("echec lors du signup");
      }


    )
  }
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmpassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'mismatch': true };  // Retourne une erreur si les mots de passe ne correspondent pas
    }
    return null;  // Retourne null si tout va bien
  }
}
