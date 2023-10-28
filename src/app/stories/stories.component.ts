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
  smallStoryLimit: number;
  largeStoryLimit: number;
  constructor(){
    this.smallStoryLimit = 0;
    this.largeStoryLimit = 0;
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
    this.calculateSplittingPoints();
  }

  calculateSplittingPoints() {
    const n = this.storyList.length;
    const pointsArray = this.storyList.map((item: any) => item.points);
    const lowerBound = Math.min(...pointsArray);
    const upperBound = Math.max(...pointsArray);
    const range = upperBound - lowerBound;
    this.smallStoryLimit = lowerBound + (range * 1 / 3);
    this.largeStoryLimit = lowerBound + (range * 2 / 3);
  }
}
