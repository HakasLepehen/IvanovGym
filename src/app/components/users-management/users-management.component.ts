import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.scss']
})
export class UsersManagementComponent {
  readonly loginForm = this.fb.group({
    login: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  error: any = '';
  location: any;
  public isLoading = false;

  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {
    [this.location] = route.snapshot.url;
  }

  ngOnInit(): void {
    this.userService.getAllUsers();
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
      return this.userService.signUp(email, password)
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

  get login() {
    return this.loginForm.get('login');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
