import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoriesComponent } from './stories/stories.component';
import { SprintsComponent } from './sprints/sprints.component';
import { CreateStoryComponent } from './create-story/create-story.component';
import { CreateSprintComponent } from './create-sprint/create-sprint.component';
import { HomeComponent } from './home/home.component';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [
    AppComponent,
    StoriesComponent,
    SprintsComponent,
    CreateStoryComponent,
    CreateSprintComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TabViewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
