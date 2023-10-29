import { Component, Input, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-create-story',
  templateUrl: './create-story.component.html',
  styleUrls: ['./create-story.component.scss']
})
export class CreateStoryComponent implements OnInit, OnDestroy{
  @Input() dataState!: BehaviorSubject<any>;
  @Input() displayDialog: boolean;
  @Output() closeDialogEvent = new EventEmitter<boolean>();
  @Output() onSubmit = new EventEmitter<any>();

  storyDetails: any;
  storyNameExists: boolean;
  allStories: any;
  constructor(){
    this.displayDialog = true;
    this.storyDetails = {
      name: '',
      description: '',
      points: 1
    };
    this.storyNameExists = false;
    this.allStories = [];
  }

  ngOnInit(){
    this.dataState.subscribe((data) => {
      this.allStories = data.stories;
    });
  }

  closeDialog(){
    this.closeDialogEvent.emit(false);
  }

  createStory(){
    const duplicateStory = this.allStories.find((element: any) => element.name === this.storyDetails.name);
    if(duplicateStory) {
      this.storyNameExists = true;
    } else {
      this.storyNameExists = false;
      this.onSubmit.emit(this.storyDetails);
      this.storyDetails = {
        name: '',
        description: '',
        points: 1
      };
      this.displayDialog = false;
    }
  }

  ngOnDestroy() {
    this.closeDialogEvent.unsubscribe();
  }
}
