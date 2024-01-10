import { Component } from '@angular/core';
import { Category, Note } from '../model';
import { ApiServiceService } from '../service/api-service.service';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { Router, RouterOutlet, RouterModule, RouterLink } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import {NgModule} from '@angular/core';
@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule, MatCardModule,MatDividerModule,MatListModule,MatTabsModule,RouterOutlet,RouterModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.css'
})
export class NoteListComponent {
  notes:Note[] = [];
  search: FormGroup;
  searchNotes: Note[] = [];
  constructor(private apiService:ApiServiceService,  private fb: FormBuilder){
    this.search = this.fb.group({
      searchCategory: new FormControl('')
     });
  }
  ngOnInit() {
    this.loadNotes();
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
  
 // Function to search notes by category
searchNotesByCategory() {
  // Clear the existing searchNotes array
  this.searchNotes.length = 0;
  // Get the search category from the form
  let category = this.search.value.searchCategory;
  // Convert the search category to lowercase for case-insensitive comparison
  category.toLowerCase();
  // Iterate through each note in the 'notes' array
  this.notes.forEach(note => {
    // Convert the category of the current note to lowercase
    let noteCategory = note.category.toLowerCase();
    // Check if the note's category includes the search category
    if (noteCategory.includes(category)) {
      // If it does, add the note to the 'searchNotes' array
      this.searchNotes.push(note);
    }
  });
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

  onDeleteNote(noteId: number): void {
    // Call the deleteNote method from your ApiService
    this.apiService.deleteNote(noteId).subscribe(
      (response) => {
        // Successful deletion
        console.log('Successful deletion:', response);
        // Perform additional actions if needed
      },
      (error) => {
        // Error handling
        console.error('Error deleting:', error);
        // Handle the error according to your needs
      }
    );
  }

  setId(id: number){
    this.apiService.setId(id);
  }
}
