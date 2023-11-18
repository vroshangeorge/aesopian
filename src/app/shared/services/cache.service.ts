import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() { }


  initForFirstTime() {
    localStorage.setItem('isFirstTime', JSON.stringify(false));
  }

  isFirstTime(): any {
    if (localStorage.getItem('isFirstTime')) {
      return JSON.parse(localStorage.getItem('isFirstTime') as string);
    } else {
      return true;
    }
  }
}
