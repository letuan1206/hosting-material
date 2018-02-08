import { Observable } from 'rxjs/Observable';
import { Http, RequestOptions, Headers } from '@angular/http';
import { ConfigService } from './config.service';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ApiService {

  apiBase: string;

  constructor(private http: Http,
    public configService: ConfigService) {
    this.apiBase = this.configService.get('apiBase');
  }

  post(url, params): Observable<any> {
    const apiUrl = this.apiBase + url;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    // params.environment = this.configService.get('environment');
    return this.http.post(apiUrl, params, options)
      .map(res => res.json());
  }

  
}
