import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { HeaderModalComponent } from '../../title/header-modal/header-modal.component';
import {
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  FormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { SaveWithTextButtonComponent } from '../../buttons/save-with-text-button/save-with-text-button.component';
import { timeValidator } from '../../../validators/time.directive';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, merge, throwError } from 'rxjs';
import { InformationModalComponent } from '../../title/information-modal/information-modal.component';
import { addTerm, newTermError, newTermSuccess, selectTimeTerm } from '../../../interfaces/calendarInterfaces';
import { CloseButtonComponent } from '../../buttons/close-button/close-button.component';
import { NotificationService } from '../../../services/service/notification/notification.service';
import { TermService } from '../../../services/http/calendar/term.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-new-term',
  standalone: true,
  imports: [
    FormsModule,
    HeaderModalComponent,
    InformationModalComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    SaveWithTextButtonComponent,
    CloseButtonComponent,
  ],
  templateUrl: './new-term.component.html',
  styleUrl: './new-term.component.scss',
})
export class NewTermComponent {
  @Input() Term: selectTimeTerm = {
    dataTerm: '',
    timeTerm: '00:00',
  };
  @Output() closeModal = new EventEmitter<boolean>();
  newTerm:addTerm ={start_date: '', end_date: ''}
  addTerm = new FormGroup({});
  startTime = new FormControl('', [Validators.required, timeValidator]);
  errorStartTimeMessage = signal('');
  endTime = new FormControl('', [Validators.required, timeValidator]);
  errorEndTimeMessage = signal('');

  constructor(
    private notificationService: NotificationService,
    private termService: TermService
  ) {
    merge(this.startTime.statusChanges, this.startTime.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateStartTimeErrorMessage());
    merge(this.endTime.statusChanges, this.endTime.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateEndTimeErrorMessage());
  }
  ngOnInit() {
    this.startTime = new FormControl(this.Term.timeTerm, [
      Validators.required,
      timeValidator,
    ]);
  }

  updateStartTimeErrorMessage() {
    if (this.startTime.hasError('required')) {
      this.errorStartTimeMessage.set('Pole czas startu nie może być puste');
    } else if (this.startTime.hasError('invalidTime')) {
      this.errorStartTimeMessage.set(
        'Pole czas startu ma nieprawidłowy format'
      );
    } else {
      this.errorStartTimeMessage.set('');
    }
  }

  updateEndTimeErrorMessage() {
    if (this.endTime.hasError('required')) {
      this.errorEndTimeMessage.set('Pole czas końca nie może być puste');
    } else if (this.endTime.hasError('invalidTime')) {
      this.errorEndTimeMessage.set('Pole czas końca ma nieprawidłowy format');
    } else {
      this.errorEndTimeMessage.set('');
    }
  }
  setErrorMessage(error:newTermError){

  }
  onSubmit() {
    this.updateStartTimeErrorMessage();
    this.updateEndTimeErrorMessage();
    if (this.startTime.invalid || this.endTime.invalid)
      this.notificationService.showError('Nieprawidłowe dane nowego terminu');
    else {
      this.newTerm ={
        start_date: this.Term.dataTerm + ' '+ this.startTime.value+':00',
        end_date: this.Term.dataTerm + ' '+ this.endTime.value+':00',
      }
      console.log(this.newTerm );
      
      this.termService.setTerm(this.newTerm)
      .pipe(
        catchError((error:HttpErrorResponse)=>{
          this.notificationService.showError(error.error.message);
          this.setErrorMessage(error.error);
          return throwError(() =>new Error('Error fetching data'))
        })
      ).subscribe((data:newTermSuccess)=>{
        this.notificationService.showSuccess(data.message);
        this.closeModal.emit(true); 
      });
    }
  }
  close() {
    this.closeModal.emit(false);
  }
}
