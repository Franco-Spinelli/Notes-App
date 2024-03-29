import { Component } from '@angular/core';
import { Category, Note } from '../model';
import { ApiServiceService } from '../service/api-service.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule,  ReactiveFormsModule  } from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule, MatDividerModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  categories: Category[] = [];
  newCategory: Category = new Category();
  categoryForm: FormGroup;
constructor(private  apiService: ApiServiceService,  private fb: FormBuilder){
  this.categoryForm = this.fb.group({
    title: new FormControl(null)
   });
}

ngOnInit() {
  this.loadCategories();
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
  onDeleteCategory(categoryId: number): void {
    // Log the categoryId to the console for debugging purposes
    console.log('Category ID to delete:', categoryId);
  
    // Call the deleteCategory method from your ApiService
    this.apiService.deleteCategory(categoryId).subscribe(
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
  onSaveCategory(): void {
    let categoryExist=false;
    console.log(this.categoryForm.value.title);
    this.newCategory.title=this.categoryForm.value.title;
    if(this.categoryForm.value.title!=null){
       this.categories.forEach(element => {
        let category = this.categoryForm.value.title.toLowerCase();
        console.log(category);
        if(element.title.toLowerCase().includes(category)){
          categoryExist = true;
        }
       });
       console.log(categoryExist);
       
      if(!categoryExist){ 
        this.apiService.saveCategory(this.newCategory).subscribe(
        (response) => {
          console.log('Save successful:', response);
          // Perform additional actions if needed
        },
        (error) => {
          console.error('Error saving:', error);
          // Handle the error according to your needs
        }
      );
      }else{
        alert("The category already exists");
      }
  }else{
    alert("Complete all the form");
  }
  }

}
