import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './shared/components/home/home.component';
import { StoriesComponent } from './shared/components/stories/stories.component';
import { BookComponent } from './shared/components/book/book.component';
import { TurnjsDirective } from './shared/directives/turnjs.directive';
import { OpenBookComponent } from './shared/components/open-book/open-book.component';
import { SlidesComponent } from './shared/components/slides/slides.component';
import { BookblockComponent } from './shared/components/bookblock/bookblock.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StoriesComponent,
    BookComponent,
    TurnjsDirective,
    OpenBookComponent,
    SlidesComponent,
    BookblockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
