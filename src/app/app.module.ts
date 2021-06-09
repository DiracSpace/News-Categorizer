import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { AppComponent } from './app.component';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';
import { ArticlesListItemComponent } from './components/articles-list-item/articles-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticlesListComponent,
    ArticlesListItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxSkeletonLoaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
