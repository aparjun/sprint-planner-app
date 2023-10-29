import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit {
  @Input() dataState!: BehaviorSubject<any>;
  storyList: any = [];
  visible = false;
  smallStoryLimit: number;
  largeStoryLimit: number;
  constructor(){
    this.smallStoryLimit = 0;
    this.largeStoryLimit = 0;
  }

  ngOnInit() {
    this.dataState.subscribe((data) => {
      this.storyList = data.stories;
    });
  }

  openDialog(){
    this.visible = true;
  }

  onDialogClose(event: any) {
    this.visible = event;
 }

  createStory(event: any){
    this.storyList.unshift(event);
    const updatedData = this.dataState.getValue();
    updatedData.stories = this.storyList;
    this.dataState.next(updatedData);
    this.visible = false;
    this.calculateSplittingPoints();
  }

  calculateSplittingPoints() {
    const pointsArray = this.storyList.map((item: any) => item.points);
    const lowerBound = Math.min(...pointsArray);
    const upperBound = Math.max(...pointsArray);
    const range = upperBound - lowerBound;
    this.smallStoryLimit = lowerBound + (range * 1 / 3);
    this.largeStoryLimit = lowerBound + (range * 2 / 3);
  }
}
