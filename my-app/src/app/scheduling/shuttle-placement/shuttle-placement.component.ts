import { Component, OnInit } from '@angular/core';
import { VolunteerService } from '../../volunteer/volunteer.service';
import { Volunteer } from '../../volunteer/volunteer.model';
import { SchedulingService } from '../scheduling.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Schedule } from '../scheduling.model';

@Component({
  selector: 'app-scheduling',
  templateUrl: './shuttle-placement.component.html'
})
export class ShuttlePlacementComponent implements OnInit {
  _daysOfWeek: string[] = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"
  ];
  scheduleForm: FormGroup = new FormGroup({});
  flag: boolean = false;
  constructor(private _serviceSchedule: SchedulingService, private _serviceVol: VolunteerService) {}

  ngOnInit(): void {
    this._serviceVol.getAllVolunteer().subscribe((volunteers: Volunteer[]) => {
      this._volARR = volunteers;
    });

    this._serviceSchedule.getScheduleFromServer().subscribe((data: Schedule) => {
      this._schedARR = data;
      if (this._schedARR && this._schedARR.idForDay) {
        this.scheduleForm = new FormGroup({
          "idForDay": new FormArray(
            this._schedARR.idForDay.map(id => new FormControl(id))
          )
        });
        this.flag = true;
      } else {
        // Handle case where data or idForDay is undefined
        console.error("Schedule data or idForDay is undefined");
      }
    });
  }

  _volARR: Volunteer[] = [];
  _schedARR: Schedule = new Schedule();

  get idForDay(): FormArray {
    return this.scheduleForm.get('idForDay') as FormArray;
  }

  getVolunteerPerDay(day: number): Volunteer[] {
    return this._volARR.filter(v => v?.days[day] == true);
  }

  saveSchedule() {
    this._serviceSchedule.setScheduleInServer(this.scheduleForm.value).subscribe((data: Schedule) => {
      this._schedARR = data;
      alert("The scheduling saved successfully!");
      console.log("The scheduling saved successfully!",data);
    }, error => {
      console.error("Error saving schedule:", error);
      alert("Failed to save scheduling.");
    });
  }
}
