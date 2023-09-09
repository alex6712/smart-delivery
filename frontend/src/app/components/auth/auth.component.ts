import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/api/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  signinForm: FormGroup;

  constructor(private auth: AuthService) {
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
    });
    this.signinForm.setValue({
      username: '',
      password: '',
    });
  }

  get _username() {
    return this.signinForm.get('username');
  }

  get _password() {
    return this.signinForm.get('password');
  }
}
