import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { LOCALSTORE_KEY } from 'app/common/constants';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  canActivate() {
    console.log('i am checking to see if you are logged in');
    let isLogin = JSON.parse(sessionStorage.getItem(LOCALSTORE_KEY.ACCOUNT)) || false;
    if (!isLogin) {
      console.log('Chua login');
    }
    return true;
  }

  canActivateChild() {
    console.log('checking child route access');
    return true;
  }

}