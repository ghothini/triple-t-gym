import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  sideNavSubject = new Subject<any>();
  paymentsSubject = new Subject<any>();
  paymentsTotalSubject = new Subject<any>();
  noteRefreshSubject = new Subject<any>();
  memberToViewRefreshSubject = new Subject<any>();
  memberPaymentsRefreshSubject = new Subject<any>();
  loggedInBusiness: any;
  memberToView: any;
  isDeleteConfirmed: boolean = false;
  constructor(private snackbar: MatSnackBar) { }

  getStorage(key: any, storage: any) {
    const data = storage === 'session' ? sessionStorage.getItem(key) : localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  setLoggedInBusiness(business: any) {
    this.loggedInBusiness = business;
  }

  getLoggedInBusiness(): any {
    return this.loggedInBusiness;
  }

  setMemberToView(member: any) {
    this.memberToView = member;
  }

  setIsDeleteConfirmed(isConfirmed: boolean): any {
    this.isDeleteConfirmed = isConfirmed;
  }

  getIsDeleteConfirmed() {
    return this.isDeleteConfirmed;
  }

  getMemberToView(): any {
    return this.memberToView;
  }

  toggleSideNav() {
    this.sideNavSubject.next('changed');
    return;
  }

  triggerPaymentUpdates(paymentsPerMonthArr: any) {
    this.paymentsSubject.next(paymentsPerMonthArr);
    return;
  }

  triggerMemberToViewRefresh() {
    this.memberToViewRefreshSubject.next('');
    return;
  }

  watchMemberToViewRefresh(): Observable<any> {
    return this.memberToViewRefreshSubject.asObservable();
  }

  triggerMemberPaymentsRefresh() {
    this.memberPaymentsRefreshSubject.next('');
    return;
  }

  watchMemberPaymentsRefresh(): Observable<any> {
    return this.memberPaymentsRefreshSubject.asObservable();
  }

  triggerNoteRefresh() {
    this.noteRefreshSubject.next('');
    return;
  }

  watchNoteReset(): Observable<any> {
    return this.noteRefreshSubject.asObservable();
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

  downloadSpreadsheet(spreadSheetPrefix: any, spreadSheetData: any): void {
    try {
      spreadSheetData.forEach((row: any, indx: number) => {
        delete spreadSheetData[indx]['gymBusiness'];
      })
      const fileName = `${spreadSheetPrefix} ${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}.xlsx`;
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(spreadSheetData);
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      // save
      XLSX.writeFile(wb, fileName,)
      this.snackbar.open('Download complete', 'Ok', { duration: 3000 });
    } catch (error) {
      this.snackbar.open('Something went wrong', 'Ok', { duration: 3000 });
    }
  }

  downloadImportTemplateSpreadsheet(importType: any): void {
    try {
      let fileName: any;
      let spreadSheetDataGuide: any;
      if (importType === 'members') {
        fileName = `Import Members.xlsx`;
        spreadSheetDataGuide = [{
          "name": null,
          "email": null,
          "phoneNumber": null,
          "address": null,
          "age": null,
          "emergencyContactName": null,
          "emergencyContactEmail": null,
          "emergencyContactPhoneNumber": null,
          "gender": null,
          "joinDate": null,
          "membershipNumber": null,
        }];
      }
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(spreadSheetDataGuide);
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      // save
      XLSX.writeFile(wb, fileName,)
      this.snackbar.open('Download complete', 'Ok', { duration: 3000 });
    } catch (error) {
      this.snackbar.open('Something went wrong', 'Ok', { duration: 3000 });
    }
  }
}
