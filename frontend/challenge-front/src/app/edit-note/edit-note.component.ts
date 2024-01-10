import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ApiServiceService } from '../service/api-service.service';
import { Category, Note } from '../model';
import { FormBuilder, FormControl, FormGroup, FormsModule,  ReactiveFormsModule  } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatRadioModule} from '@angular/material/radio';
@Component({
  selector: 'app-edit-note',
  standalone: true,
  imports: [MatInputModule,MatSelectModule,MatFormFieldModule, FormsModule, ReactiveFormsModule, CommonModule, MatRadioModule],
  templateUrl: './edit-note.component.html',
  styleUrl: './edit-note.component.css'
})
export class EditNoteComponent {
  categories: Category[] = [];
  newCategory: string;
  updateNote: FormGroup;
  note: Note;
  idNote: number;
  constructor(private apiService:ApiServiceService,  private fb: FormBuilder){
    this.updateNote = this.fb.group({
      note_id: this.idNote,
      title: new FormControl(''),
      content: new FormControl(''),
     });
  }
  ngOnInit() {
    this.loadCategories();
    this.idNote = this.apiService.getId();
    this.findByid();
   }
  loadCategories() {
    // Call the getNotes method from the ApiService to fetch notes.
    this.apiService.getCategories().subscribe(
      (response) => {
        // Assign the retrieved notes to the local notes variable.
        this.categories = response;
        // Log the notes to the console for debugging purposes.
        console.log(this.categories);
      }
    );
  }

  findByid(){
    this.apiService.findById(this.idNote).subscribe(
      (response) => {
        this.note = response;
        console.log(this.note);
      },
      (error) => {
        console.error('Error', error);
      }
    );
  }
  update(){
    this.note.title = this.updateNote.value.title;
    this.note.content = this.updateNote.value.content;
    this.note.category = this.newCategory;
    this.apiService.changeStatusNote(this.note).subscribe(
      () => {
        // Log a success message when the status is changed successfully.
        console.log('Status changed successfully');
        // Reload the notes to reflect the updated status.
      },
      (error) => {
        // Log an error message if there's an issue changing the status.
        console.error('Error changing status:', error);
      }
    );
  }

  onCategoryChange(event: any) {
    this.newCategory = event.value;
    console.log('Categoría seleccionada:', this.newCategory);
  }
}
