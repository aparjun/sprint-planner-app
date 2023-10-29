import { Component, Input, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-create-sprint',
  templateUrl: './create-sprint.component.html',
  styleUrls: ['./create-sprint.component.scss']
})
export class CreateSprintComponent implements OnInit, OnDestroy {
  @Input() dataState!: BehaviorSubject<any>;
  @Input() displayDialog: boolean;
  @Output() closeDialogEvent = new EventEmitter<boolean>();
  @Output() onSubmit = new EventEmitter<any>();

  sprintDetails: any;
  allStories: any;
  allSprints: any;
  sprintNameExists: boolean;
  noSelections: boolean;
  smallStoryLimit: number;
  largeStoryLimit: number;
  resultSprintSize: number = 0;
  constructor(){
    this.displayDialog = true;
    this.sprintDetails = {
      name: '',
      sprintCapacity: 1,
      sprintStories: []
    };
    this.allStories = [];
    this.allSprints = [];
    this.smallStoryLimit = 0;
    this.largeStoryLimit = 0;
    this.sprintNameExists = false;
    this.noSelections = false;
  }

  ngOnInit(){
    this.dataState.subscribe((data) => {
      this.allStories = data.stories;
      this.allSprints = data.sprints;
    });
  }

  closeDialog(){
    this.closeDialogEvent.emit(false);
  }

  createSprint(){
    const duplicateSprint = this.allSprints.find((element: any) => element.name === this.sprintDetails.name);
    if (duplicateSprint){
      this.sprintNameExists = true;
    } else {
      this.sprintNameExists = false;
      this.onSubmit.emit(this.sprintDetails);
      this.sprintDetails = {
        name: '',
        sprintCapacity: 1,
        sprintStories: []
      };
      this.displayDialog = false;
    }
  }

  findClosestSet(items: any = this.allStories, target: number = this.sprintDetails.sprintCapacity, currentSet: any = [], currentIndex: number = 0, currentSum: number = 0) {
    this.noSelections = this.allStories.length === 0;
    if (currentIndex === items.length) {
      if (currentSum <= target && Math.abs(target - currentSum) < Math.abs(target - this.resultSprintSize)) {
        this.resultSprintSize = currentSum;
        this.sprintDetails.sprintStories = [...currentSet];
        this.calculateSplittingPoints();
      }
      return;
    }

    const currentItem = items[currentIndex];

    // Include the current item
    currentSet.push(currentItem);
    this.findClosestSet(items, target, currentSet, currentIndex + 1, currentSum + currentItem.points);
    currentSet.pop();

    // Exclude the current item
    this.findClosestSet(items, target, currentSet, currentIndex + 1, currentSum);
  }

  calculateSplittingPoints() {
    const pointsArray = this.sprintDetails.sprintStories.map((item: any) => item.points);
    const lowerBound = Math.min(...pointsArray);
    const upperBound = Math.max(...pointsArray);
    const range = upperBound - lowerBound;
    this.smallStoryLimit = lowerBound + (range * 1 / 3);
    this.largeStoryLimit = lowerBound + (range * 2 / 3);
  }

  ngOnDestroy() {
    this.closeDialogEvent.unsubscribe();
  }

  clearStories(){
    const updatedData = this.dataState.getValue();
    updatedData.stories = [];
    this.dataState.next(updatedData);
    this.sprintDetails = {
      name: '',
      sprintCapacity: 1,
      sprintStories: []
    };
    this.clearSprints();
  }

  clearSprints(){
    const updatedData = this.dataState.getValue();
    updatedData.sprints = [];
    this.dataState.next(updatedData);
    this.sprintDetails = {
      name: '',
      sprintCapacity: 1,
      sprintStories: []
    };
  }
}
