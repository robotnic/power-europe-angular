import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { forkJoin } from 'rxjs';  // RxJS 6 syntax


@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  url = '/api/data/sectors/Tabelle1/';
  types = [ 'Traktion', 'Raumheizung%20und%20Klimaanlagen', 'Dampferzeugung', 'Industrieöfen', 'Standmotoren', 'Beleuchtung und EDV'];
  statistics: BehaviorSubject<any>;
  constructor( private httpClient: HttpClient) {}
  public init() {
    const promise = new Promise((resolve, reject) => {
      this.load().subscribe((data) => {
        const statistics = {};
        this.types.forEach((type, i) => {
          console.log(type);
          statistics[type] = this.translate(data[i]);
        });
        console.log('dadaadaata', statistics);
        resolve(statistics);
      });
    });
    return promise;
  }
  public load(): Observable<any[]> {
    const responses = [];
    this.types.forEach((type) => {
      responses.push( this.httpClient.get(this.url + type));
    });
    // Observable.forkJoin (RxJS 5) changes to just forkJoin() in RxJS 6
    let x = forkJoin(responses);
    console.log(x);
    return x;
  }
  getSankeyData() {

  }
  translate(data) {
    const newdata = {};
    console.log('translate', data);
    // tslint:disable-next-line:forin
    for (const item in data) {
      let name = item;
      switch (item) {
//        case 'Naturgas': name = 'Gas'; break;
      }
      newdata[name] = data[item];
    }
    return newdata;
  }
}
