package com.example.challengeback.service.note;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.challengeback.model.entity.Note;

@Service
public interface NoteService {
     // Retrieve all notes
     List<Note> findAll();
     // Retrieve all archived notes
     List<Note> findAllArchived();
     // Retrieve all notes that are not archived
     List<Note> findAllNotArchived();
     // Save a note
     void save(Note note);
     // Find a note by its ID
     Optional<Note> findById(Integer id);
     // Delete a note by its ID
     void delete(Integer note_id);
}
