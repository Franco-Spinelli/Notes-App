import { RouterModule, Routes } from '@angular/router';
import { EditNoteComponent } from './edit-note/edit-note.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { NoteListComponent } from './note-list/note-list.component';
import { CreateNoteComponent } from './create-note/create-note.component';
import { CategoriesComponent } from './categories/categories.component';

export const routes: Routes = [
    {path: '', component: NoteListComponent},
    {path: 'edit', component: EditNoteComponent},
    {path: 'create', component: CreateNoteComponent},
    {path: 'categories', component: CategoriesComponent}
];
