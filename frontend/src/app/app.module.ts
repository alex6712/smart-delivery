import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ControlPanelComponent } from './components/main/control-panel/control-panel.component';
import { MainComponent } from './components/main/main.component';
import { StationsComponent } from './components/main/stations/stations.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    StationsComponent,
    ControlPanelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
