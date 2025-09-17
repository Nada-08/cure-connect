import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormControl,FormGroup,ReactiveFormsModule,Validator, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  login:FormGroup;
  submitted:boolean=false;
  constructor( private fb: FormBuilder,
  private authService: AuthService, 
  private router: Router){
    this.login=this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]],
    })
}
handleSubmit() {
  this.submitted = true;
  if (this.login.valid) {
    this.authService.login(this.login.value).subscribe({
      next: (res: any) => {
        console.log('Login success:', res);
        localStorage.setItem('token', res.token); 
        this.router.navigate(['/']); 
      },
      error: (err) => console.error('Login failed:', err)
    });
  }
}
}
