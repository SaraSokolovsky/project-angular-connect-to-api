import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Volunteer } from './volunteer.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {
  constructor(private _http:HttpClient) { }

  getAllVolunteer = (): Observable<Volunteer[]> => {
    return this._http.get<Volunteer[]>("http://localhost:5000/api/Volunteer/GetAll");
}
  getVolunteerById = (id:any): Observable<Volunteer> => {
  return this._http.get<Volunteer>("http://localhost:5000/api/Volunteer/Get/"+id)
}
updateVolunteer = (volunteer:Volunteer): Observable<Volunteer[]> => {
  return this._http.put<Volunteer[]>(`http://localhost:5000/api/Volunteer/Update/${volunteer.id}`,volunteer);
}
}
