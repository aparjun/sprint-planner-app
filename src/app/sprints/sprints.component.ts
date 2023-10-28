import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sprints',
  templateUrl: './sprints.component.html',
  styleUrls: ['./sprints.component.scss']
})
export class SprintsComponent {
  @Output() onCreate = new EventEmitter<any>();
  sprintList: any = [];
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

  createSprint(event: any){
    this.sprintList.push(event);
    this.onCreate.emit(this.sprintList.length);
    this.visible = false;
    this.calculateSplittingPoints();
  }

  calculateSplittingPoints() {
    const n = this.sprintList.length;
    const pointsArray = this.sprintList.map((item: any) => item.points);
    const lowerBound = Math.min(...pointsArray);
    const upperBound = Math.max(...pointsArray);
    const range = upperBound - lowerBound;
    this.smallStoryLimit = lowerBound + (range * 1 / 3);
    this.largeStoryLimit = lowerBound + (range * 2 / 3);
  }
}
