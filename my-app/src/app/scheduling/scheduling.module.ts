import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShuttlePlacementComponent } from './shuttle-placement/shuttle-placement.component';
import { Route, RouterModule } from '@angular/router';
import { SchedulingService } from './scheduling.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

const SCHEDULE_ROUTES: Route[] = [
  {path:"scheduling", component: ShuttlePlacementComponent}
];

@NgModule({
  declarations: [ShuttlePlacementComponent],
  providers:[SchedulingService],
  imports: [
    CommonModule,RouterModule.forChild(SCHEDULE_ROUTES),HttpClientModule,ReactiveFormsModule
  ],
  exports:[ShuttlePlacementComponent]
})
export class SchedulingModule { }
