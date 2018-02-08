import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
@Injectable()
export class ConfigService {

  settings: any;

  constructor(
    public http: Http
  ) {

  }

  load(): Promise<boolean> {

    return new Promise((resolve, reject) => {
      this.http.get('assets/data/config.json')
        .subscribe(data => {
          this.settings = data.json();
          resolve(true);
        }, error => {
          reject(error);
        });
    });
  }

  get(setting) {
    return this.settings[setting];
  }

}
