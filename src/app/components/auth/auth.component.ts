import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

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
  error: any = '';
  location: any;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {
    [this.location] = route.snapshot.url;
  }

  ngOnInit(): void {
  }

  get isLoginPage(): boolean {
    return this.location.path == 'login';
  }

  get goToPage() {
    return this.isLoginPage ? '/signup' : '/login';
  }

  onSubmit(): any {
    this.isLoading = true;
    const email: string = this.loginForm.value.login as string;
    const password: string = this.loginForm.value.password as string;

    this.error = '';
    if (this.isLoginPage) {
      return this.authService.signIn(email, password)
        .pipe(first())
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.router.navigate(['']);
          },
          error: error => {
            this.isLoading = false;

            if (error.error.error === 'invalid_grant') {
              this.error = 'Неверный логин или пароль';
            } else {
              this.error = 'Не удалось авторизоваться';
            }
            return;
          }
        });
    }
  }

  get login() {
    return this.loginForm.get('login');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
