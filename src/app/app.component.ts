import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Articles, News } from './models/news';
import { Reactions, Words } from './models/words';
import { isUndefined } from './utils/validators';

export class ReactionObject {
  [x: string]: any;
}

const bayes = require('bayes');
const classifier = bayes();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'NewsCategorizer';
  isLoaded: boolean = false;

  articles: Articles[] = [];
  words: Reactions[] = [];

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.getTestData();
    // this.classifyArticles();
  }

  onArticleSelect(article: Articles) {
    console.log(article);
  }

  private learnWords() {
    this.words.forEach(async w => this.hugeConditionalValues(w));
  }

  async hugeConditionalValues(w: ReactionObject) {

    if (!isUndefined(this.getKeyByValue(w, "-5"))) {
      await classifier.learn(this.getKeyByValue(w, "-5"), 'Completamente insatisfecho');
    }

    if (!isUndefined(this.getKeyByValue(w, "-4"))) {
      await classifier.learn(this.getKeyByValue(w, "-4"), 'Mayormente insatisfecho');
    }
    if (!isUndefined(this.getKeyByValue(w, "-3"))) {
      await classifier.learn(this.getKeyByValue(w, "-3"), 'Algo insatisfecho');
    }
    
    if (!isUndefined(this.getKeyByValue(w, "-2"))) {
      await classifier.learn(this.getKeyByValue(w, "-2"), 'Escaso');
    }

    if (!isUndefined(this.getKeyByValue(w, "-1"))) {
      await classifier.learn(this.getKeyByValue(w, "-1"), 'Justo');
    }

    if (!isUndefined(this.getKeyByValue(w, "0"))) {
      await classifier.learn(this.getKeyByValue(w, "0"), 'Neutral');
    }
    
    if (!isUndefined(this.getKeyByValue(w, "1"))) {
      await classifier.learn(this.getKeyByValue(w, "1"), 'Bueno');
    }
    
    if (!isUndefined(this.getKeyByValue(w, "2"))) {
      await classifier.learn(this.getKeyByValue(w, "2"), 'Aceptable');
    }

    if (!isUndefined(this.getKeyByValue(w, "3"))) {
      await classifier.learn(this.getKeyByValue(w, "3"), 'Moderado');
    }

    if (!isUndefined(this.getKeyByValue(w, "4"))) {
      await classifier.learn(this.getKeyByValue(w, "4"), 'Mayormente satisfecho');
    }

    if (!isUndefined(this.getKeyByValue(w, "5"))) {
      await classifier.learn(this.getKeyByValue(w, "5"), 'Completamente satisfecho');
    }
  }

  private classifyArticles() {
    this.articles.forEach(async a => a.classifier = await classifier.categorize(a.content));

    console.log(this.articles);
  }

  private async getTestData() {
    this.getWordsJson().subscribe({
      next: (data: Reactions[]) => {
        this.words = data;
      },
      error: (message: any) => {
        console.log("JSON error: ", message);
      },
      complete: () => this.learnWords()
    });

    this.getNewsJson().subscribe({
      next: (data: News) => {
        this.articles = data.articles;
      },
      error: (message: any) => {
        console.log("JSON error: ", message);
      },
      complete: () => this.classifyArticles(),
    });
  }

  private getNewsJson(): Observable<News> {
    return this.http.get<News>('./assets/news.json');
  }

  private getWordsJson(): Observable<Reactions[]> {
    return this.http.get<Reactions[]>('./assets/words.json');
  }

  getKeyByValue(object: ReactionObject, value: any): string {
    return Object.keys(object).find(key => object[key] === value);
  }
}
