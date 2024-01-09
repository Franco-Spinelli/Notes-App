package com.example.challengeback.service.note;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.challengeback.model.entity.Note;
import com.example.challengeback.repository.NoteRepository;

@Component
public class NoteImpl implements NoteService{
    @Autowired
    private NoteRepository noteRepository;
    //return all the notes
    @Override
    public List<Note> findAll() {
        return noteRepository.findAll();
    }
    
    // save notes (edit or create)
    @Override
    public void save(Note note) {
       noteRepository.save(note);
    }

    // delete one note by id
    @Override
    public void delete(Integer note_id) {
        // if the note exist 
        if(noteRepository.existsById(note_id)){
            noteRepository.deleteById(note_id);
        }
    }
    
}
