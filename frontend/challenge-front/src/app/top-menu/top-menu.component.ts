import { Component } from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import { RouterOutlet, RouterModule} from '@angular/router';
@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [MatIconModule, MatToolbarModule, RouterOutlet, RouterModule],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.css'
})
export class TopMenuComponent {

}
