import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { validate } from '@angular/forms/signals';
import { ToastrService } from 'ngx-toastr';
@Component({

  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {

  signupForm = new FormGroup({
    name:new FormControl("",[Validators.required]),
    email:new FormControl("",[Validators.required,Validators.email]),
    password:new FormControl("",[Validators.required]),
    confirmPassword:new FormControl("",[Validators.required])
  })

  constructor(private toastr:ToastrService){}

  handleSignup(){

    if(this.signupForm.invalid){
      this.toastr.error("Please fill all the required fields");
      return;
    }

    if(this.signupForm.value.password !== this.signupForm.value.confirmPassword){
      this.toastr.error("Password and Confirm Password should be same");
      return;
    }

    console.log(this.signupForm.value)
  }

}
