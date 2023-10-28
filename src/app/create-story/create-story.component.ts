import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-create-story',
  templateUrl: './create-story.component.html',
  styleUrls: ['./create-story.component.scss']
})
export class CreateStoryComponent implements OnDestroy{

  @Input() displayDialog: boolean;
  @Output() closeDialogEvent = new EventEmitter<boolean>();

  constructor(){
    this.displayDialog = true;
  }

  closeDialog(){
    this.closeDialogEvent.emit(false);
  }

  createStory(){
    this.displayDialog = false;
  }

  ngOnDestroy() {
    this.closeDialogEvent.unsubscribe();
  }
}
