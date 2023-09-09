import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/api/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  signinForm: FormGroup;

  constructor(private auth: AuthService, private router: Router) {
    this.signinForm = new FormGroup({
      username: new FormControl<String>('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      email: new FormControl<String>('', [
        Validators.required,
        Validators.email,
        Validators.minLength(4),
      ]),
      phone: new FormControl<String>('', [
        Validators.required,
        Validators.minLength(7),
      ]),
      password: new FormControl<String>('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  ngOnInit(): void {}

  sign_in() {
    this.auth
      .registration({
        username: this._username?.value,
        email: this._email?.value,
        phone: this._phone?.value,
        password: this._password?.value,
      })
      .subscribe((res) => {
        console.log(res);
        if (res.code == 201) {
          this.router.navigate(['main']);
        }
      });
    this.signinForm.setValue({
      username: '',
      email: '',
      phone: '',
      password: '',
    });
  }

  get _username() {
    return this.signinForm.get('username');
  }

  get _email() {
    return this.signinForm.get('email');
  }

  get _phone() {
    return this.signinForm.get('phone');
  }

  get _password() {
    return this.signinForm.get('password');
  }
}
