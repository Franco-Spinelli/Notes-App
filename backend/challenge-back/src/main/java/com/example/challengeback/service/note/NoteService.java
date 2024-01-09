package com.example.challengeback.service.note;

import java.util.List;


import org.springframework.stereotype.Service;

import com.example.challengeback.model.entity.Note;

@Service
public interface NoteService {
    List<Note> findAll();
    void save (Note note);
    void delete(Integer note_id);
}
