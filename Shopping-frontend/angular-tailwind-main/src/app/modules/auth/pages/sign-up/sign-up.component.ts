import { Component, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import {AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import {RouterLink, RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: true,
  imports: [FormsModule, AngularSvgIconModule, ButtonComponent, ReactiveFormsModule, RouterLink,CommonModule, RouterModule],
})
export class SignUpComponent implements OnInit {
  signupFormGroup : FormGroup;

  constructor( private fb:FormBuilder,
              ) {
    this.signupFormGroup = this.fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],  // Validité pour un numéro de téléphone à 10 chiffres
      email: ['', [Validators.required, Validators.email]],  // Validation de l'email
      password: ['', [Validators.required]],
      confirmpassword: ['', [Validators.required]]
    }, {validator: this.passwordMatchValidator});  // Validation personnalisée pour vérifier la correspondance des mots de passe

  }

  ngOnInit(): void {

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
