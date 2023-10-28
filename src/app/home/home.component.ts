import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  storyCount: number;
  sprintCount: number;
  visible = false;
  constructor(){
    this.storyCount = 0;
    this.sprintCount = 0;
  }

  updateStoryCount(event: any){
    this.storyCount = event;
  }

  updateSprintCount(event: any){
    this.sprintCount = event;
  }
}
