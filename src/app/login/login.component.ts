import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
loginForm!:FormGroup;
loading = false;
submitted = false;
error = '';
private unsubscribe$ = new Subject<void>()

constructor(
  private  formBuilder:FormBuilder,
  private router:Router,
  private authService:AuthService,
  private cd: ChangeDetectorRef
){
  this.loginForm = this.formBuilder.group({
    username: ['',Validators.required],
    password: ['', Validators.required]
  });
}

ngOnInit() {
  this.loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
}
get f() {return this.loginForm.controls;}

onSubmit(){
  this.submitted = true;

  if(this.loginForm.invalid){
    return;
  }

  this.loading = true;
  this.authService.login(this.f['username'].value, this.f['password'].value)
  .subscribe({
    next: () => {
      this.router.navigate(['/tasks'])
    },
    error:error => {
      this.error = error;
      this.loading = false;
      this.cd.markForCheck();
    }
  })
}

ngOnDestroy() {
  this.unsubscribe$.next();
  this.unsubscribe$.complete();
}
}
