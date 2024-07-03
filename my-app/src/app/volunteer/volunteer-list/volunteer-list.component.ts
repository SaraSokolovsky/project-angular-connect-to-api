import { Component } from '@angular/core';
import { Volunteer } from '../volunteer.model';
import { Route,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VolunteerService } from '../volunteer.service';
import { Subscription, from } from 'rxjs';



@Component({
  selector: 'app-volunteer-list',
  templateUrl: './volunteer-list.component.html'
})
export class VolunteerListComponent {
  volunteerArr: Volunteer[] | undefined;


  constructor(private _router:Router,private _serviceVol: VolunteerService){
    this._serviceVol.getAllVolunteer().subscribe((val) => {
      this.volunteerArr = val;
    })
    console.log(this.volunteerArr)
  }


  edit(v:Volunteer){
    this._router.navigate(['/editing-and-marking',v.id])
}


}
