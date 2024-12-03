import {Component, inject, OnInit} from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import {AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import {Router, RouterLink, RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {AuthService} from "../../authService/auth.service";



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: true,
  imports: [FormsModule, AngularSvgIconModule, ButtonComponent, ReactiveFormsModule, RouterLink,CommonModule, RouterModule],
})
export class SignUpComponent implements OnInit {
  signupFormGroup : FormGroup;
  private authService = inject(AuthService)
  submissionSuccessCreate = false;
  submissionError = false;
  private router = inject(Router)

  constructor( private fb:FormBuilder,
              ) {
    this.signupFormGroup = this.fb.group({
      name: ['',Validators.pattern(/^[ a-zA-Z]+$/)],
      phone: ['' ,Validators.pattern('^[0-9]{10}$')],
      email: ['', [Validators.required],Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')],
      password: ['', [Validators.required]],
    }, );  // Validation personnalisée pour vérifier la correspondance des mots de passe

  }
  create() {
    this.submissionSuccessCreate = false;
    this.submissionError = false;
    if (this.signupFormGroup.invalid) {
      this.signupFormGroup.markAllAsTouched();
      this.submissionError = true;
      return;
    }

    this.authService.signup(this.signupFormGroup.value).subscribe({
      next: (value) => {
        console.log(value);
        this.router.navigate(['/auth/sign-in'], {
          queryParams: { successcreate: 'true' },
        });
      },
      error: (err) => {
        console.error('Création échouée', err);
        this.submissionError = true;
        if (err.error && err.error.message) {
          alert(`Error: ${err.error.message}`);
        }
      },
    });
  }

  ngOnInit(): void {

  }


}
