import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signup: FormGroup;
  submitted = false;
  selectedFile: File | null = null;
  availableDays: string[] = [];

  allDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signup = this.fb.group({
      role: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(11)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      specialization: [''],
      licenseNum: ['', [Validators.required, Validators.minLength(5)]],
      description: ['']
    });

    this.signup.get('role')?.valueChanges.subscribe(role => {
      if (role === 'doctor') {
        this.signup.get('specialization')?.setValidators([Validators.required]);
        this.signup.get('description')?.setValidators([Validators.required]);
      } else {
        this.signup.get('specialization')?.clearValidators();
        this.signup.get('description')?.clearValidators();
      }
      this.signup.get('specialization')?.updateValueAndValidity();
      this.signup.get('description')?.updateValueAndValidity();
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] || null;
  }

  toggleDay(day: string) {
    if (this.availableDays.includes(day)) {
      this.availableDays = this.availableDays.filter(d => d !== day);
    } else {
      this.availableDays.push(day);
    }
  }

  handleSubmit() {
    this.submitted = true;
    if (this.signup.value.password !== this.signup.value.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (this.signup.valid) {
      const formData = new FormData();
      const values = this.signup.value;
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('phone', values.phone);
      formData.append('password', values.password);
      formData.append('role', values.role);
      if (values.role === 'doctor') {
        formData.append('specialization', values.specialization);
        formData.append('description', values.description);
        formData.append('licensNum', values.licenseNum);
        formData.append('availableDay', JSON.stringify(this.availableDays));
      }
      if (this.selectedFile) {
        formData.append('avatar', this.selectedFile);
      }
      this.authService.signup(formData).subscribe({
        next: (res: any) => {
          console.log('Signup success:', res);
          if (res.token) localStorage.setItem('token', res.token);
          this.router.navigate(['/login']);
        },
        error: (err) => console.error('Signup failed:', err)
      });
    }
  }


}
