import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-create-story',
  templateUrl: './create-story.component.html',
  styleUrls: ['./create-story.component.scss']
})
export class CreateStoryComponent implements OnDestroy{

  @Input() displayDialog: boolean;
  @Output() closeDialogEvent = new EventEmitter<boolean>();
  @Output() onSubmit = new EventEmitter<any>();

  storyDetails: any;
  constructor(){
    this.displayDialog = true;
    this.storyDetails = {
      name: '',
      description: '',
      points: 1
    };
  }

  closeDialog(){
    this.closeDialogEvent.emit(false);
  }

  createStory(){
    this.onSubmit.emit(this.storyDetails);
    this.storyDetails = {
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
