import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {
  readonly loginForm = this.fb.group({
    login: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  error: WritableSignal<string> = signal('')
  public isLoading = false;

  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(): any {
    this.isLoading = true;
    const email: string = this.loginForm.value.login as string;
    const password: string = this.loginForm.value.password as string;

    // this.error = '';
    return this.authService.signIn(email, password)
      .pipe(first())
      .subscribe({
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;

          if (error.error.error === 'invalid_grant' || error.error.error_code === 'invalid_credentials') {
            this.error.set('Неверный логин или пароль');
          } else {
            this.error.set('Не удалось авторизоваться');
          }
          return;
        },
        complete: () => {
          this.isLoading = false;
          this.router.navigate(['']);
        }
      });
  }

  get login() {
    return this.loginForm.get('login');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
