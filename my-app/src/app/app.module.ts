import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolunteerModule } from './volunteer/volunteer.module';
import { SchedulingModule } from './scheduling/scheduling.module';
import { VolunteerListComponent } from './volunteer/volunteer-list/volunteer-list.component';
import { ShuttlePlacementComponent } from './scheduling/shuttle-placement/shuttle-placement.component';
import {RouterModule, Route} from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { Appcomponent } from './app.component';
import { EditingAndMarkingComponent } from './volunteer/editing-and-marking/editing-and-marking.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

const APP_ROUTES: Route[] = [
  { path: "volunteer-list", component: VolunteerListComponent },
  { path: "shuttle-placement", component: ShuttlePlacementComponent},
  { path:"editing-and-marking",component:EditingAndMarkingComponent},
  { path:"editing-and-marking/:volunteer",component:EditingAndMarkingComponent}
];

@NgModule({
  declarations: [
    Appcomponent
  ],
  imports: [
    BrowserModule ,RouterModule, CommonModule,VolunteerModule,
    SchedulingModule,RouterModule.forRoot(APP_ROUTES), HttpClientModule,
    FormsModule
  ],
  bootstrap:[Appcomponent]
})
export class AppModule { }
