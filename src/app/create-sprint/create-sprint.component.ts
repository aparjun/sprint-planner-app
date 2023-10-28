import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-create-sprint',
  templateUrl: './create-sprint.component.html',
  styleUrls: ['./create-sprint.component.scss']
})
export class CreateSprintComponent {
  @Input() displayDialog: boolean;
  @Output() closeDialogEvent = new EventEmitter<boolean>();
  @Output() onSubmit = new EventEmitter<any>();

  sprintDetails: any;
  constructor(){
    this.displayDialog = true;
    this.sprintDetails = {
      name: '',
      description: '',
      points: 1
    };
  }

  closeDialog(){
    this.closeDialogEvent.emit(false);
  }

  createSprint(){
    this.onSubmit.emit(this.sprintDetails);
    this.sprintDetails = {
      name: '',
      description: '',
      points: 1
    };
    this.displayDialog = false;
  }

  ngOnDestroy() {
    this.closeDialogEvent.unsubscribe();
  }
}
