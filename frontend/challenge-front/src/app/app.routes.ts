import { RouterModule, Routes } from '@angular/router';
import { EditNoteComponent } from './edit-note/edit-note.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { NoteListComponent } from './note-list/note-list.component';

export const routes: Routes = [
    {path: '', component: NoteListComponent},
    {path: 'edit', component: EditNoteComponent}
];
