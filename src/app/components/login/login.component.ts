import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginFormGroup: FormGroup;

  constructor(private snackbar: MatSnackBar, private sharedService: SharedService,
    private router: Router) {
    this.loginFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
      password: new FormControl('', [Validators.required]),
    })
    // Demo Temp
    localStorage.setItem('managementUsers',JSON.stringify([{
        email: 'admin@triplet.com',
        password: 'password',
        role: 'administrator'
    },{
        email: 'operator@triplet.com',
        password: 'password',
        role: 'operator'
    }]))
  }

  submit() {
    if (this.loginFormGroup.invalid) {
      this.snackbar.open('All fields are required', 'Ok', { duration: 3000 });
      return
    };
    const managementUsers = this.sharedService.getStorage('managementUsers', 'local');
    if (managementUsers.length > 0) {
      const isFound = managementUsers.find((user: any) => user.email === this.loginFormGroup.value.email);
      if (isFound) {
        // Do something
        if (isFound.password === this.loginFormGroup.value.password) {
          sessionStorage.setItem('currentUser', JSON.stringify(isFound));
          this.snackbar.open("Logged in successfully!", 'Ok', { duration: 3000 });
          // Send user to landing page
          this.router.navigate(['/landing']);
          return;
        }
        this.snackbar.open("Password is incorrect!", 'Ok', { duration: 3000 });
        return;
      } else {
        this.snackbar.open("Account does not exist!", 'Ok', { duration: 3000 });
      }
      console.log("this.loginFormGroup", this.loginFormGroup.value)
    } else {
      this.snackbar.open('0 users registered in the system!', 'Ok', { duration: 3000 });
      return;
    }
  }

  forgotPassword() {
    this.snackbar.open('Contact administrator', 'Ok', { duration: 3000 });
  }
}
