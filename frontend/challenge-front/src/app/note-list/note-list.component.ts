import { Component } from '@angular/core';
import { Note } from '../model';
import { ApiServiceService } from '../service/api-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.css'
})
export class NoteListComponent {
  notes:Note[] = [];
  constructor(private apiService:ApiServiceService){}
  ngOnInit() {
    this.loadNotes();
   }
  loadNotes(){
    this.apiService.getNotes().subscribe(
      (response) => {
        this.notes = response;
        console.log(this.notes)
      }
    )
  }
}
