import {
  Injectable
} from '@angular/core';
import {
  Observable
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventHandlerService {
  events: any[];
  observers = {};
  state = {};
  constructor() {}
  on(eventtype) {
    const source = Observable.create((observer) => {
      if (!this.observers[eventtype]) {
        this.observers[eventtype] = [];
      }
      this.observers[eventtype].push(observer);
      if (this.state[eventtype]) {
        observer.next(this.state[eventtype]);
      }
    });
    return source  ;
  }
  /*
  on = Observable.
    callback => {
      console.log('observe callback', callback)
    }
  })
  */

  setDate(dateobj) {
    return this.setObserver('datechange', dateobj);
  }
  setMutate(mutate) {
    return this.setObserver('mutate', mutate);
    /*
    this.state['mutate'] = mutate;
    if (this.observers['mutate']) {
      this.observers['mutate'].forEach(function(observer) {
        observer.next(mutate);
      });
    }
    */
  }
  setQuickMode(active: boolean) {
    return this.setObserver('quickmode', active);
  }
  setObserver(name, value) {
    this.state[name] = value;
    if (this.observers[name]) {
      this.observers[name].forEach(function(observer) {
        observer.next(value);
      });
    }
  }
}
