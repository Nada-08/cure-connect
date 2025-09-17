import { Component } from '@angular/core';
import { FormBuilder, FormControl,FormGroup,ReactiveFormsModule,Validator, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signup:FormGroup;
  submitted:boolean=false;
  constructor(private fb:FormBuilder, private authService: AuthService, private router: Router){
    this.signup=this.fb.group({
      role: ['', Validators.required],
      name:['',[Validators.required,Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      username:['',[Validators.required,Validators.minLength(5)]],
      phone: ['', [Validators.required, Validators.minLength(11)]],
      specialization: ['',[Validators.required]],  
      availableDays: ['',[Validators.required]] ,
      description: ['',[Validators.required]],
      password:['',[Validators.required,Validators.minLength(8)]],
      confirmPassword:['',[Validators.required]],
    }) 
     this.signup.get('role')?.valueChanges.subscribe(role => {
      if (role === 'doctor') {
        this.signup.get('specialization')?.setValidators([Validators.required]);
        this.signup.get('description')?.setValidators([Validators.required]);
        this.signup.get('availableDays')?.setValidators([Validators.required]);
      } else {
        this.signup.get('specialization')?.clearValidators();
        this.signup.get('description')?.clearValidators();
        this.signup.get('availableDays')?.clearValidators();
      }
      this.signup.get('specialization')?.updateValueAndValidity();
      this.signup.get('description')?.updateValueAndValidity();
      this.signup.get('availableDays')?.updateValueAndValidity();
    });
}
 get formControl(){
    return this.signup.controls;
  }
   handleSubmit() {
    this.submitted = true;
    if (this.signup.valid) {
      this.authService.signup(this.signup.value).subscribe({
        next: (res: any) => {
          console.log('Signup success:', res);
          if (res.token) {
            localStorage.setItem('token', res.token);
          }
          this.router.navigate(['/login']); 
        },
        error: (err) => console.error('Signup failed:', err)
      });
    }
  }
}

