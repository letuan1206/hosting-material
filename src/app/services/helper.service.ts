import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class HelperService {
  public loading = new BehaviorSubject<boolean>(false);

  constructor() { }

  showLoading() {
    this.loading.next(true);
  }

  hideLoading() {
    this.loading.next(false);
  }
}
