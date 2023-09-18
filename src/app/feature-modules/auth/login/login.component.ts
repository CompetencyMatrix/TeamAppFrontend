import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  isLoading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      username: '',
      password: '',
    });
    if (this.authService.userValue) {
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
    const username = this.loginForm.controls['username'].value;
    const password = this.loginForm.controls['password'].value;
    this.authService
      .login(username, password)
      .pipe(first())
      .subscribe({
        next: () => {
          const returnUrl =
            this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
          this.router.navigate([returnUrl]);
        },
        error: err => {
          this.error = err;
          this.isLoading = false;
          console.log(this.error);
        },
      });
  }
}
