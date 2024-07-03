import { Injectable } from '@angular/core';
import { VolunteerService } from '../volunteer/volunteer.service';
import { Volunteer } from '../volunteer/volunteer.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Schedule } from './scheduling.model';

@Injectable()
export class SchedulingService {

  constructor(private _http:HttpClient) {

  }
  getScheduleFromServer = (): Observable<Schedule> => {
    return this._http.get<Schedule>("http://localhost:5000/api/Schedule/GetAll");
  }

  setScheduleInServer = (sched:Schedule): Observable<Schedule> => {
    return this._http.put<Schedule>(`http://localhost:5000/api/Schedule/Update`,sched);
  }

}
