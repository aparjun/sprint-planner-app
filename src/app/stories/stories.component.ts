import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent {
  @Output() onCreate = new EventEmitter<any>();
  storyList: any = [];
  visible = false;
  constructor(){
  }

  openDialog(){
    this.visible = true;
  }

  onDialogClose(event: any) {
    this.visible = event;
 }

  createStory(event: any){
    this.storyList.push(event);
    this.onCreate.emit(this.storyList.length);
    this.visible = false;
  }
}
