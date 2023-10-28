import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

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

  createStory(){
    this.storyList.push({
      name: 'test',
      description: 'testing',
      points: 12
    });
    this.visible = false;
  }
}
