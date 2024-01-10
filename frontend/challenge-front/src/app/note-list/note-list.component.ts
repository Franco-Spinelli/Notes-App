import { Component } from '@angular/core';
import { Note } from '../model';
import { ApiServiceService } from '../service/api-service.service';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { Router } from '@angular/router';
@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule, MatCardModule,MatDividerModule,MatListModule],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.css'
})
export class NoteListComponent {
  notes:Note[] = [];
  updateNote: FormGroup;
  constructor(private apiService:ApiServiceService, private fb: FormBuilder, private router: Router){
    this.updateNote = this.fb.group({
      note_id: new FormControl(''),
      title: new FormControl(''),
      content: new FormControl(''),
      createdAt: new FormControl(''),
      archived: new FormControl(''),
      category: new FormControl('')
     });
  }
  ngOnInit() {
    this.loadNotes();
    console.log('Ruta actual:', this.router.url)
   }
   loadNotes() {
    // Call the getNotes method from the ApiService to fetch notes.
    this.apiService.getNotes().subscribe(
      (response) => {
        // Assign the retrieved notes to the local notes variable.
        this.notes = response;
        // Log the notes to the console for debugging purposes.
        console.log(this.notes);
      }
    );
  }
  changeStatusNote(note: Note) {
    // Call the changeStatusNote method from the ApiService to update the note's status.
    this.apiService.changeStatusNote(note).subscribe(
      () => {
        // Log a success message when the status is changed successfully.
        console.log('Status changed successfully');
        // Reload the notes to reflect the updated status.
        this.loadNotes();
      },
      (error) => {
        // Log an error message if there's an issue changing the status.
        console.error('Error changing status:', error);
      }
    );
  }
}
