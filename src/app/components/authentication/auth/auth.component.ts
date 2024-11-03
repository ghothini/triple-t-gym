import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  emailAuthFormGroup: FormGroup;
  constructor(private snackbar: MatSnackBar, private sharedService: SharedService,
    private router: Router
  ) {
    this.emailAuthFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
    })
  }

  submit() {
    if (this.emailAuthFormGroup.invalid) {
      this.snackbar.open('Email Address is required', 'Ok', { duration: 3000 });
      return
    }
    const gymBusinesses = this.sharedService.getStorage('GymBusinesses', 'local');
    if (gymBusinesses.length > 0) {
      const isBusinessFound = gymBusinesses.find((business: any) => business.email === this.emailAuthFormGroup.value.email)
      if (isBusinessFound) {
        this.snackbar.open("Account already exists", 'Ok', { duration: 3000 });
        return;
      }
      this.router.navigate(['/register']);
    } else {
      this.router.navigate(['/register']);
    }

    console.log(this.emailAuthFormGroup.value.email)
  }

}
