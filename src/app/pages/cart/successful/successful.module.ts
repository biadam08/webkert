import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuccessfulRoutingModule } from './successful-routing.module';
import { SuccessfulComponent } from './successful.component';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from 'src/app/shared/shared.module';




@NgModule({
  declarations: [
    SuccessfulComponent,
  ],
  imports: [
    CommonModule,
    SuccessfulRoutingModule,
    MatCardModule,
    SharedModule
  ]
})
export class SuccessfulModule { }
