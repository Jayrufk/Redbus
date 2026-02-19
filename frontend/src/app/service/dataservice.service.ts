import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  private datasource = new BehaviorSubject<any>(null);
  currentdata = this.datasource.asObservable();

  private passdetails = new BehaviorSubject<any>(null);
  passdata = this.passdetails.asObservable();

  private loginState = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loginState.asObservable();

  sendobj(obj: any) {
    this.datasource.next(obj);
  }

  passobj(obj: any) {
    this.passdetails.next(obj);
  }

  setLoginState(state: boolean) {
    this.loginState.next(state);
  }

  constructor() {
    if (sessionStorage.getItem('Loggedinuser')) {
      this.loginState.next(true);
    }
  }
}
