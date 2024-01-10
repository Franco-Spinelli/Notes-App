import { Component } from '@angular/core';
import { ApiServiceService } from '../service/api-service.service';
import { Category, Note } from '../model';
import { FormBuilder, FormControl, FormGroup, FormsModule,  ReactiveFormsModule  } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-create-note',
  standalone: true,
  imports: [FormsModule,  ReactiveFormsModule, MatRadioModule, CommonModule],
  templateUrl: './create-note.component.html',
  styleUrl: './create-note.component.css'
})
export class CreateNoteComponent {

  categories: Category[] = [];
  newCategory: string;
  newNote: Note = new Note();
  createNote: FormGroup;
  constructor(private  apiService: ApiServiceService, private fb: FormBuilder) {
    this.createNote = this.fb.group({
      title: new FormControl(''),
      content: new FormControl('')
     });
  }

  ngOnInit() {
    this.loadCategories();
   }
  onSaveNote(noteData: Note): void {
    this. apiService.saveNote(noteData).subscribe(
      (response) => {
        console.log('Guardado con éxito:', response);
        // Realizar acciones adicionales si es necesario
      },
      (error) => {
        console.error('Error al guardar:', error);
        // Manejar el error según tus necesidades
      }
    );
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
  onCategoryChange(event: any) {
    this.newCategory = event.value;
  }
  create(){
    if(this.createNote.value.title!=null && this.createNote.value.content!=null &&  this.newCategory!=null){
    this.newNote.title = this.createNote.value.title;
    this.newNote.content = this.createNote.value.content;
    this.newNote.category = this.newCategory;
    this.newNote.archived = false;
    this.apiService.saveNote(this.newNote).subscribe(
      () => {
        // Log a success message when the status is changed successfully.
        console.log('Status changed successfully');
      },
      (error) => {
        // Log an error message
        console.error('Error', error);
      }
    );
   }
   else{
    alert("Complete all the form");
   }
  }
}
