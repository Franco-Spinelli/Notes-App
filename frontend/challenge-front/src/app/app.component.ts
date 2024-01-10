import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule} from '@angular/router';
import { Note } from './model';
import {MatTabsModule} from '@angular/material/tabs';
import { NoteListComponent } from "./note-list/note-list.component";
import { HttpClientModule } from '@angular/common/http';
import { TopMenuComponent } from "./top-menu/top-menu.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, MatTabsModule, NoteListComponent, RouterModule, TopMenuComponent]
})
export class AppComponent {
  title = 'challenge-front';
}
