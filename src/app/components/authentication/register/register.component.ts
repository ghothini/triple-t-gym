import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerFormGroup: FormGroup;
  menuListItems: string[] = ['Google Search', 'Recommended by someone',
    'Social Media', 'You reached out to me', 'Others'
  ]

  constructor(private snackbar: MatSnackBar, private sharedService: SharedService, private router: Router) {
    this.registerFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
      fullName: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
      businessName: new FormControl('', Validators.required),
      aboutUs: new FormControl('', Validators.required),
    })
  }

  selectedMenuItem(item: string) {
    this.registerFormGroup.get('aboutUs')?.setValue(item);
  }

  submit() {
    if (this.registerFormGroup.invalid) {
      this.snackbar.open('All fields are required', 'Ok', { duration: 3000 });
      return
    };
    const gymBusinesses = this.sharedService.getStorage('GymBusinesses', 'local');
    if (gymBusinesses.length > 0) {
      const isBusinessFound = gymBusinesses.find((business: any) => business.email === this.registerFormGroup.value.email)
      if (isBusinessFound) {
        this.snackbar.open("Account already exists", 'Ok', { duration: 3000 });
        return;
      }
      gymBusinesses.push(this.registerFormGroup.value);
      this.sharedService.setStorage('GymBusinesses', gymBusinesses, 'local');
      this.snackbar.open("You've been registered successfully", 'Ok', { duration: 3000 });
      this.sharedService.setLoggedInBusiness(this.registerFormGroup.value);
      // temp
      this.sharedService.setStorage('currentUser',this.registerFormGroup.value, 'session');
      this.router.navigate(['/landing']);
    } else {
      gymBusinesses.push(this.registerFormGroup.value);
      this.sharedService.setStorage('GymBusinesses', gymBusinesses, 'local');
      this.snackbar.open("You've been registered successfully", 'Ok', { duration: 3000 });
      this.sharedService.setLoggedInBusiness(this.registerFormGroup.value);
      this.sharedService.setStorage('currentUser',this.registerFormGroup.value, 'session');
      this.router.navigate(['/landing']);
    }
  }
}
