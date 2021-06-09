import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class ApiService {

  abstract endpoint: string;

  constructor() { }

  get url(): string {
    return `${ environment.apiUrl }`;
  }

  get apiKey(): string {
    return `apiKey=${ environment.key }`;
  }
}
