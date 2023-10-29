import { Component, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnInit {
  stories: any;
  sprints: any;
  visible = false;

  dataState = new BehaviorSubject<any>({ stories: [], sprints: [] });

  constructor(private elementRef: ElementRef) {
    this.stories = [];
    this.sprints = [];
  }


  ngOnInit() {
    this.dataState.subscribe((data) => {
      this.stories = data.stories;
      this.sprints = data.sprints;
    });
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#f5f5f5';
  }

}
