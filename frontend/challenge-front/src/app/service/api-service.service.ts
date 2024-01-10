import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, Note } from '../model';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private id_note: number;
  private archiveStatus: boolean;
  private apiUrl = 'http://localhost:8092/challenge';
  constructor(private http: HttpClient) { }
  getNotes(): Observable<any> {
    // Make an HTTP GET request to fetch all notes from the server.
    return this.http.get<any>(`${this.apiUrl}/note/findAll`);
  }
  getCategories(): Observable<any> {
    // Make an HTTP GET request to fetch all categories from the server.
    return this.http.get<any>(`${this.apiUrl}/category/findAll`);
  }
  changeStatusNote(note: Note): Observable<any> {
    // Create an updatedNote object with the necessary properties.
    const updatedNote = {
      note_id: note.note_id,
      title: note.title,
      content: note.content,
      // Toggle the archived status to its opposite value.
      archived: !note.archived,
      category: note.category
    };
    // Construct the API URL for updating the note's status.
    const url = `${this.apiUrl}/note/update`;
    // Make an HTTP PUT request to update the note's status.
    return this.http.put(url, updatedNote);
  }
 
  updateNote(bodyMapping: any): Observable<any> {
    // Construct the API URL for updating the note's status.
    const url = `${this.apiUrl}/note/update`;
    // Make an HTTP PUT request to update the note's status.
    return this.http.put(url, bodyMapping);
  }
 
  findById(id: number): Observable<Note> {
    return this.http.get<Note>(`${this.apiUrl}/note/findById/${id}`);
  }

  setId(id: number) {
    this.id_note = id;
  }

  getId() {
    return this.id_note;
  }
}
