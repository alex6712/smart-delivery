import { HttpClientModule } from '@angular/common/http';
import { InjectionToken, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment.prod';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { ControlPanelComponent } from './components/main/control-panel/control-panel.component';
import { MainComponent } from './components/main/main.component';
import { StationsComponent } from './components/main/stations/stations.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { authReducer } from './store/auth/auth.reducer';

const reducers = {
  auth: authReducer,
};

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    StationsComponent,
    ControlPanelComponent,
    AuthComponent,
    RegistrationComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
