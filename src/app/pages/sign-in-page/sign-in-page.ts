import { Component, effect, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../shared/services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { ButtonDirective, ButtonIcon, ButtonLabel } from "primeng/button";
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-sign-in-page',
  imports: [
    ReactiveFormsModule,
    ToastModule,
    CardModule,
    ButtonDirective,
    ButtonIcon,
    ButtonLabel,
    RouterLink,
    InputTextModule,
    FloatLabelModule,
    MessageModule,
    PasswordModule
],
  templateUrl: './sign-in-page.html',
  styleUrl: './sign-in-page.css',
  providers: [MessageService]
})
export class SignInPage {
  loading = signal(false);

  form: FormGroup = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required]})
  });

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password')
  }

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly messageService: MessageService,
  ) {
    effect(() => {
      if (this.loading()) {
        this.form.disable();
      } else {
        this.form.enable();
      }
    })
  }

  signIn(event: any) {
    event.preventDefault();
    
    if (this.form.invalid) {
      return;
    }

    this.loading.set(true);
    
    this.authService.signIn(
      this.email?.value,
      this.password?.value
    ).subscribe({
      next: (res) => {
        this.authService.setAccessToken(res.access_token);
        this.authService.setRefreshToken(res.refresh_token);

        this.loading.set(false);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.loading.set(false);
        this.form.enable();

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message || "Unknown error"
        })
      }
    })
  }

  signInWithGoogle() {
    this.loading.set(true);
    
    this.authService.signInWithGoogle().subscribe({
      next: (res) => {
        this.authService.setAccessToken(res.access_token);
        this.authService.setRefreshToken(res.refresh_token);

        this.loading.set(false);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.loading.set(false);
        this.form.enable();

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message || "Unknown error"
        })
      }
    })
  }
}
