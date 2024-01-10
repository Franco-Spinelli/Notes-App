package com.example.challengeback.model.dto;



import com.example.challengeback.model.entity.Note;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Data
@Builder
public class NoteDto {
    private Integer note_id; 
    private String title; 
    private String content;  
    private boolean archived; 
    private String category;

    public NoteDto(Note note){
        this.note_id = note.getNote_id();
        this.title = note.getTitle();
        this.content = note.getContent();
        this.archived = note.isArchived();
        this.category = note.getCategory().getTitle();
    }
}
