import { FormGroup, FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
declare const $: any;

@Injectable()
export class HelperService {
  public loading = new BehaviorSubject<boolean>(false);

  constructor() { }

  showNotification(from: any, align: any, color: number, message: string) {
    const type = ['danger', 'success', 'info', 'warning', 'rose', 'primary'];

    $.notify({
      icon: 'notifications',
      message: message
    }, {
        type: type[color],
        timer: 3000,
        placement: {
          from: from,
          align: align
        }
      });
  }

  showLoading() {
    this.loading.next(true);
  }

  hideLoading() {
    this.loading.next(false);
  }
}
