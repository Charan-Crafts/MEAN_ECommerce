import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header.component/header.component';
@Component({
  selector: 'app-user-layout',
  imports: [RouterOutlet,HeaderComponent],
  templateUrl: './user-layout.html',
  styleUrl: './user-layout.css',
})
export class UserLayout {

}
