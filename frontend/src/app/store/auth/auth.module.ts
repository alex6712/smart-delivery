import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { AUTH_REDUCER_NODE, authReducer } from './auth.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(AUTH_REDUCER_NODE, authReducer),
  ],
})
export class AuthModule {}
