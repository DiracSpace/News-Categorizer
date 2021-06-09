import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from './models/news';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'NewsCategorizer';
  isLoaded: boolean = false;

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.getTestData();
  }

  private async getTestData() {
    this.getJson().subscribe({
      next: (data: News) => {
        console.log(data);
      },
      error: (message: any) => {
        console.log("JSON error: ", message);
      }
    });
  }

  private getJson(): Observable<News> {
    return this.http.get<News>('./assets/news.json');
  }
}
