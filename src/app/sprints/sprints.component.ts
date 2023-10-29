import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sprints',
  templateUrl: './sprints.component.html',
  styleUrls: ['./sprints.component.scss']
})
export class SprintsComponent implements OnInit {
  @Input() dataState!: BehaviorSubject<any>;
  sprintList: any = [];
  visible = false;
  smallStoryLimit: number;
  largeStoryLimit: number;


  

  constructor(){
    this.smallStoryLimit = 0;
    this.largeStoryLimit = 0;
  }

  ngOnInit() {
    this.dataState.subscribe((data) => {
      this.sprintList = data.sprints;
    });
    
  }

  openDialog(){
    this.visible = true;
  }

  onDialogClose(event: any) {
    this.visible = event;
 }

 createSprint(event: any){
  this.sprintList.unshift(event);
  const updatedData = this.dataState.getValue();
  updatedData.sprints = this.sprintList;
  this.dataState.next(updatedData);
  this.visible = false;
  this.calculateSplittingPoints();
}

  calculateSplittingPoints() {
    const pointsArray = this.sprintList.map((item: any) => item.sprintCapacity);
    const lowerBound = Math.min(...pointsArray);
    const upperBound = Math.max(...pointsArray);
    const range = upperBound - lowerBound;
    this.smallStoryLimit = lowerBound + (range * 1 / 3);
    this.largeStoryLimit = lowerBound + (range * 2 / 3);
  }
}
