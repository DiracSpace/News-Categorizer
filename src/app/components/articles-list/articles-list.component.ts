import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { isNull } from 'src/app/utils/validators';
import { Articles } from 'src/app/models/news';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {

  @Input() articles: Articles[] = [];
  @Output() selected = new EventEmitter<Articles>();

  constructor() { }

  ngOnInit(): void {
  }

  onArticleSelect(article: Articles) {
    if (!isNull(article)) this.selected.emit(article);
  }

}
