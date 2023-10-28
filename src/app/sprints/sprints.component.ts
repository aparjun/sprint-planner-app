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
  constructor(){
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
  }
}
