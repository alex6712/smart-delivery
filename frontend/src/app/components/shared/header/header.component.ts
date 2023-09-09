import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/api/auth.service';
import { AuthExitAccountAction } from 'src/app/store/auth/auth.actions';
import { AuthStore } from 'src/app/store/auth/auth.reducer';
import { authIsAuthSelector } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAuth$: Observable<boolean> = this.store$.pipe(select(authIsAuthSelector));
  username: string = 'username';

  constructor(
    private store$: Store<AuthStore>,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const access = localStorage.getItem('access_token');
    if (access) {
      this.auth.getMe(access).subscribe((res) => {
        console.log(res);
        if (res.code == 200) this.username = res.username;
        else if (res.detail) this.router.navigate(['']);
      });
    }
  }

  exit_account() {
    this.store$.dispatch(
      new AuthExitAccountAction({
        isAuth: false,
      })
    );
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.setItem('isAuth', JSON.stringify(false));
    this.router.navigate(['auth']);
  }
}
