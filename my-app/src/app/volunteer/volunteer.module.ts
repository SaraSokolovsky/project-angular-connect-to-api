import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolunteerListComponent } from './volunteer-list/volunteer-list.component';
import { EditingAndMarkingComponent } from './editing-and-marking/editing-and-marking.component';
import { Route} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    VolunteerListComponent,EditingAndMarkingComponent
  ],
  imports: [
    CommonModule,ReactiveFormsModule,BrowserModule,FormsModule,ReactiveFormsModule
  ]
})
export class VolunteerModule { }
