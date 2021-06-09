import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from 'src/app/models/news';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService extends ApiService {

  endpoint: string = "e";

  constructor(
    private http: HttpClient,
  ) {
    super();
  }

  request_news(topic: string): Observable<News> {
    return this.http.get<News>(`${ this.url }q=${ topic }&${ this.apiKey }`);
  }
}

/*

status: string;
totalResults: number;
articles: Articles[];

source: Source;
author: string;
title: string;
description: string;
url: string;
urlToImage: string;
publishedAt: string;
content: Content;

text: string;

id: string;
name: string;
*/