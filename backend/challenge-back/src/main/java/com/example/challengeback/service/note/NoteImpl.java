package com.example.challengeback.service.note;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.challengeback.model.entity.Note;
import com.example.challengeback.repository.NoteRepository;

@Component
public class NoteImpl implements NoteService{
    @Autowired
    private NoteRepository noteRepository;
    //return all the notes.
    @Override
    public List<Note> findAll() {
        return noteRepository.findAll();
    }

    // save notes (edit or create).
    @Override
    public void save(Note note) {
       noteRepository.save(note);
    }

    // delete one note by id.
    @Override
    public void delete(Integer note_id) {
        // if the note exist. 
        if(noteRepository.existsById(note_id)){
            noteRepository.deleteById(note_id);
        }
    }
    // find one note by id.
    @Override
    public Optional<Note> findById(Integer id) {
       return noteRepository.findById(id);
    }
    // return only the archived notes.
    @Override
    public List<Note> findAllArchived() {
        List<Note>notes = noteRepository.findAll();
        List<Note>notesArchived = new ArrayList<>();
        // If the note is archived, it is added to the new list.
        for (Note note : notes) {
            if(note.isArchived()){
                notesArchived.add(note);
            }
        }
      return notesArchived;
    }

    @Override
    public List<Note> findAllNotArchived() {
      List<Note>notes = noteRepository.findAll();
        List<Note>notesNotArchived = new ArrayList<>();
        // If the note is not archived, it is added to the new list.
        for (Note note : notes) {
            if(!note.isArchived()){
                notesNotArchived.add(note);
            }
        }
      return notesNotArchived;
    }
    
}
