import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

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

  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    try {
      const email: string = this.loginForm.value.login as string;
      const password: string = this.loginForm.value.password as string;
      this.authService.signUp(email, password);

      alert('Аккаунт создан!');
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      }
    }
  }

  getUser() {
    const email: string = this.loginForm.value.login as string;
    const password: string = this.loginForm.value.password as string;
    this.authService.getUser(email, password);
  }

  signIn() {
    this.authService.signIn(this.loginForm.value.login, this.loginForm.value.password);
  }

  get login() {
    return this.loginForm.get('login');
  }

  get password() {
    return this.loginForm.get('password');
  }


}
