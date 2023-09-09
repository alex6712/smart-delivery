import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/api/auth.service';
import { AuthTokensSaveAction } from 'src/app/store/auth/auth.actions';
import { AuthStore } from 'src/app/store/auth/auth.reducer';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  signinForm: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router,
    private store$: Store<AuthStore>
  ) {
    this.signinForm = new FormGroup({
      username: new FormControl<String>('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      password: new FormControl<String>('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  ngOnInit(): void {}

  sign_in() {
    const formData = new URLSearchParams();
    formData.append('grant_type', 'password');
    formData.append('client_id', 'XXXX-app');
    formData.append('username', this._username?.value);
    formData.append('password', this._password?.value);
    this.auth.login(formData).subscribe((res) => {
      console.log(res);
      if (res.code == 200) {
        if (res.access_token && res.refresh_token) {
          this.store$.dispatch(
            new AuthTokensSaveAction({
              access_token: res.access_token,
              refresh_token: res.refresh_token,
              isAuth: true,
            })
          );
          localStorage.setItem('access_token', res.access_token);
          localStorage.setItem('refresh_token', res.refresh_token);
          localStorage.setItem('isAuth', JSON.stringify(true));
        }
        this.router.navigate(['main']);
      }
      this.signinForm.setValue({
        username: '',
        password: '',
      });
    });
  }

  get _username() {
    return this.signinForm.get('username');
  }

  get _password() {
    return this.signinForm.get('password');
  }
}
