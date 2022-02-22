import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoriesComponent } from './shared/components/stories/stories.component';
import { HomeComponent } from './shared/components/home/home.component';
import { BookComponent } from './shared/components/book/book.component';
import { OpenBookComponent } from './shared/components/open-book/open-book.component';
import { SlidesComponent } from './shared/components/slides/slides.component';
import { BookblockComponent } from './shared/components/bookblock/bookblock.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'stories', component: StoriesComponent
  },
  {
    path: 'book', component: BookComponent
  },
  {
    path: 'openbook', component: OpenBookComponent
  },
  {
    path: 'slides', component: SlidesComponent
  },
  {
    path: 'bb', component: BookblockComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
