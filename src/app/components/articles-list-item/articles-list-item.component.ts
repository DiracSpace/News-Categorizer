import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Articles } from 'src/app/models/news';
import { isNullOrWhitespace } from 'src/app/utils/validators';

@Component({
  selector: 'app-articles-list-item',
  templateUrl: './articles-list-item.component.html',
  styleUrls: ['./articles-list-item.component.scss']
})
export class ArticlesListItemComponent implements OnInit {

  @Input() article: Articles = new Articles();
  @Output() selected = new EventEmitter<Articles>();

  defaultCoverImage = "https://blogdelcontador.com.ar/wp-content/themes/fox/images/placeholder.jpg";
  coverImage: string = "";
  hasCoverImage: boolean = false;

  constructor() { }

  ngOnInit(): void {

    if (isNullOrWhitespace(this.article.urlToImage)) {
      this.onImageNotFound();
    } else {
      this.coverImage = this.article.urlToImage;
      this.hasCoverImage = true;
    }
  }

  onArticleClicked() {
    this.selected.emit(this.article);
  }

  onImageNotFound() {
    this.coverImage = this.defaultCoverImage;
    this.hasCoverImage = false;
  }

}
