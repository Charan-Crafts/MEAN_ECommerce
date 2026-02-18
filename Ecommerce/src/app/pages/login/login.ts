import { Component, inject } from '@angular/core';
import { ReactiveFormsModule , FormsModule,FormGroup,FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/services/auth.service';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private authService = inject(AuthService)

  private router = inject(Router)

  constructor(private toastr:ToastrService){}

  loginForm = new FormGroup({
    email:new FormControl("",[Validators.required,Validators.email]),
    password:new FormControl("",[Validators.required])
  })

  handleLogin(){
    if(this.loginForm.invalid){
      this.toastr.error("Please fill all the required fields");
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next:(res)=>{
        this.toastr.success(res.message);
        this.router.navigate(["/cart"])
      },
      error:(err)=>{
        this.toastr.error(err.message);
      }
    })
    
  }
  
}
