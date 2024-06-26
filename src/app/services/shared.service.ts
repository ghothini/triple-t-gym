import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  sideNavSubject = new Subject<any>();
  paymentsSubject = new Subject<any>();
  paymentsTotalSubject = new Subject<any>();
  constructor() { }

  getStorage(key: any, storage: any) {
    const data = storage === 'session' ? sessionStorage.getItem(key) : localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  toggleSideNav() {
    this.sideNavSubject.next('changed');
    return;
  }

  triggerPaymentUpdates(paymentsPerMonthArr: any) {
    this.paymentsSubject.next(paymentsPerMonthArr);
    return;
  }

  triggerPaymentsTotalUpdates(paymentsObj: any) {
    this.paymentsTotalSubject.next(paymentsObj);
    return;
  }

  watchSideNavChanges(): Observable<any> {
    return this.sideNavSubject.asObservable();
  }

  watchPaymentsChanges(): Observable<any> {
    return this.paymentsSubject.asObservable();
  }

  watchpaymentsTotalChanges(): Observable<any> {
    return this.paymentsTotalSubject.asObservable();
  }

  setStorage(key: any, value: any, storage: any) {
    return storage === 'session' ? sessionStorage.setItem(key, JSON.stringify(value)) : localStorage.setItem(key, JSON.stringify(value));
  }

  calculateYearPayments(annualMonths: any, allPayments: any, filterYear: any) {
    let paymentsPerMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let paymentsYearsArr: any = [];
    annualMonths.forEach((month: any, indx: any) => {
      const monthPayments = allPayments.filter((payment: any) => payment.monthForPayment === month);
      if (monthPayments.length > 0) {
        monthPayments.forEach((payment: any) => {
          if (new Date(payment.dateOfPayment).getFullYear() !== filterYear) {
            return;
          }
          paymentsPerMonth[indx] += Number(payment.amout);
        })
      }
    })
    return paymentsPerMonth;
  }
}
