import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Volunteer } from '../volunteer.model';
import { VolunteerService } from 'src/app/volunteer/volunteer.service';
import { Schedule } from 'src/app/scheduling/scheduling.model';
import { SchedulingService } from 'src/app/scheduling/scheduling.service';

@Component({
  selector: 'app-editing-and-marking',
  templateUrl: './editing-and-marking.component.html'
})
export class EditingAndMarkingComponent implements OnInit {
  editForm!: FormGroup; // יש שימוש ב-! כדי לציין שהמשתנה ייווצר בהמשך
  volunteer: Volunteer = new Volunteer();
  _sched?: Schedule;

  constructor(private _activatedRoute: ActivatedRoute, private _volunteerService: VolunteerService,  private _serviceSchedule: SchedulingService) { }

  ngOnInit() {
    this.initForm();
    this._activatedRoute.params.subscribe(params => {
      const volunteerId = params['volunteer'];
      this._volunteerService.getVolunteerById(volunteerId).subscribe(volunteer => {
        this.volunteer = volunteer;
        this.refreshForm();
      });
    });
  }

  refreshForm() {
    if (this.editForm) {
      this.editForm.patchValue({
        firstName: this.volunteer.firstName,
        lastName: this.volunteer.lastName,
        email: this.volunteer.email,
        phone: this.volunteer.phone,
        days: this.volunteer.days // מניח ש־days ב-Angular תואם את days ב-API
      });
    }
  }

  initForm() {
    this.editForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      days: new FormGroup({
        Sunday: new FormControl(false, [Validators.required]),
        Monday: new FormControl(false, [Validators.required]),
        Tuesday: new FormControl(false, [Validators.required]),
        Wednesday: new FormControl(false, [Validators.required]),
        Thursday: new FormControl(false, [Validators.required]),
        Friday: new FormControl(false, [Validators.required])
      })
    });
    this._serviceSchedule.getScheduleFromServer().subscribe(data => {
      this._sched = data;
    })
  }

  onSubmit() {
    if (this.editForm.valid) {
      const formData = {
        id: this.volunteer.id,
        firstName: this.editForm.value.firstName,
        lastName: this.editForm.value.lastName,
        email: this.editForm.value.email,
        phone: this.editForm.value.phone,
        days: Object.values(this.editForm.value.days) as boolean[] // המרת אובייקט days למערך בוליאנים
      };
      if (this._sched?.idForDay != undefined) {
        for (let i = 0; i < this._sched?.idForDay.length; i++) {
          if (formData?.id == this._sched.idForDay[i] && formData.days[i] == false) {
            alert("You have already been placed in the volunteer system, Unable to cancel");
            throw new Error("the update is unavailable");
          }
        }
      }
      this._volunteerService.updateVolunteer(formData).subscribe(
        response => {
          alert("The volunteer has been successfully updated")
          console.log('The volunteer has been successfully updated', response);
          // טיפול בעדכון המוצלח, לדוגמה: ניווט לעמוד אחר או הצגת הודעת הצלחה
        },
        error => {
          console.error('Error updating the volunteer', error);
          // טיפול בשגיאה, לדוגמה: הצגת הודעת שגיאה
        }
      );
    } else {
      console.error('הטופס אינו תקין');
      // טיפול במקרה שבו אימות הטופס נכשל
    }
  }
}
