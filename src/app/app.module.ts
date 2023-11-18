import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './shared/components/home/home.component';
import { TurnjsDirective } from './shared/directives/turnjs.directive';
import { FilterList, SafeHtmlPipe, SlidesComponent } from './shared/components/slides/slides.component';
import { StoryComponent } from './shared/components/story/story.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TurnjsDirective,
    SlidesComponent,
    FilterList,
    SafeHtmlPipe,
    StoryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
