import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventHandlerService } from './event-handler.service';
import { CalculatorService } from './calculator.service';
import { PowerService } from './power.service';

@Injectable({
  providedIn: 'root'
})

export class MutateService {
  data;
  observable;
  colors;
  rules = {
    loadShift: {
      'from': ['Solar', 'Wind'],
      'to': ['Kohle', 'Transport', 'Gas', 'Speicher', 'Biomasse', 'Import', 'Pumpspeicher', 'Power2Gas']
    },
    timeShift: {
      'from': ['Pumpspeicher', 'Speicher'],
      'to': ['Transport', 'Kohle', 'Gas']
    }
  };
  observe(data) {
    this.observable = Observable.create(observer => {
      this.powerService.getDefaults().then((defaults) => {
        const allCharts = this.calculator.createCharts(data,  this.rules, defaults);
        this.data = allCharts;
        this.eventHandler.on('mutate').subscribe((mutate) => {
          const normalized =  this.calculator.mutate(this.data, {}, this.rules, defaults);
          const modified =  this.calculator.mutate(this.data, mutate, this.rules, defaults);
          modified.normalized = normalized.modified;
          observer.next(modified);
        });
      });
    });
    return this.observable;
  }

  constructor(private eventHandler: EventHandlerService, private calculator: CalculatorService, private powerService: PowerService) { }
  getRules() {
    return this.rules;
  }
  mutate() {

  }
  getMutate(data) {
    return this.observe(data);
  }
  doTheChanges(mutate, defaults) {
    return this.calculator.mutate(this.data, mutate, this.rules, defaults);
  }
}
