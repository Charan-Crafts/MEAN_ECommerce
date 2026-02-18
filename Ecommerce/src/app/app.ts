import { Component, inject, signal } from '@angular/core';
import { UserLayout } from './layouts/user-layout/user-layout';
import { AdminLayout } from "./layouts/admin-layout/admin-layout";
import { AuthService } from './core/services/auth.service';



@Component({
  selector: 'app-root',
  imports: [UserLayout, AdminLayout],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  private authService = inject(AuthService);

  ngOnInit(){
    this.authService.healthCheck().subscribe({
      next:(res)=>{
        console.log("Health Check Success:", res);
      },
      error:(err)=>{
        console.error("Health Check Failed:", err);
      }
    })
  }
  
  role = signal("user");
}
