import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  sideNavSubject = new Subject<any>();
  paymentsSubject = new Subject<any>();
  constructor() { }

  getStorage(key: any, storage: any) {
    const data = storage === 'session' ? sessionStorage.getItem(key) : localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  toggleSideNav() {
    this.sideNavSubject.next('changed');
    return;
  }

  triggerPaymentUpdates() {
    this.paymentsSubject.next('changed');
    return;
  }

  watchSideNavChanges(): Observable<any> {
    return this.sideNavSubject.asObservable();
  }

  watchPaymentsChanges(): Observable<any> {
    return this.paymentsSubject.asObservable();
  }

  setStorage(key: any, value: any, storage: any) {
    return storage === 'session' ? sessionStorage.setItem(key, JSON.stringify(value)) : localStorage.setItem(key, JSON.stringify(value));
  }
}
