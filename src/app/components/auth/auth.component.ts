import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

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
  token$: any = '';
  location: any;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService,
    private store: Store,
    private router: ActivatedRoute
  ) {
    [this.location] = router.snapshot.url;

  }

  ngOnInit(): void {}


  get isLoginPage(): boolean {
    return this.location.path == 'login';
  }

  get goToPage() {
    return this.isLoginPage ? '/signup' : '/login';
  }

  onSubmit() {
    this.isLoading = true;
    try {
      const email: string = this.loginForm.value.login as string;
      const password: string = this.loginForm.value.password as string;
      return this.isLoginPage ? this.authService.signIn(email, password) : this.authService.signUp(email, password);
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
        this.isLoading = false;
      }
    }
  }

  get login() {
    return this.loginForm.get('login');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
