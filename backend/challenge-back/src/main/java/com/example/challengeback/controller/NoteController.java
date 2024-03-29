package com.example.challengeback.controller;



import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.challengeback.model.dto.NoteDto;
import com.example.challengeback.model.entity.Category;
import com.example.challengeback.model.entity.Note;
import com.example.challengeback.service.category.CategoryService;
import com.example.challengeback.service.note.NoteService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/challenge/note")
public class NoteController {
    @Autowired
    private NoteService noteService;
    @Autowired
    private CategoryService categoryService;
   @GetMapping("/findAll")
    public ResponseEntity<List<NoteDto>> findAll() {
        // Retrieve all notes from the service.
        List<Note> allNotes = noteService.findAll();
        // Convert the list of Note entities to a list of NoteDTOs.
        List<NoteDto> allNoteDTOs = allNotes.stream()
                .map(note -> new NoteDto(
                        note.getNote_id(),
                        note.getTitle(),
                        note.getContent(),
                        note.isArchived(),
                        (note.getCategory() != null) ? note.getCategory().getTitle() : null
                ))
                .collect(Collectors.toList());
        // Return the list of NoteDTOs in the response.
        return ResponseEntity.ok(allNoteDTOs);
    }
    @GetMapping("/findById/{id}")
    public ResponseEntity<NoteDto> findById(@PathVariable Integer id) {
        // Retrieve the note by ID from the service.
        Optional<Note> noteOptional = noteService.findById(id);
        Note note = noteOptional.get();
        // Check if the note with the given ID exists.
        if (note == null) {
            return ResponseEntity.notFound().build();
        }

        // Convert the Note entity to a NoteDTO.
        NoteDto noteDto = new NoteDto(
                note.getNote_id(),
                note.getTitle(),
                note.getContent(),
                note.isArchived(),
                note.getCategory().getTitle()
        );

        // Return the NoteDTO in the response.
        return ResponseEntity.ok(noteDto);
    }

    @GetMapping("/findAllArchived")
    public ResponseEntity<List<NoteDto>> findAllArchived() {
        // Retrieve all archived notes from the service.
        List<Note> archivedNotes = noteService.findAllArchived();
        // Convert the list of archived Note entities to a list of NoteDTOs.
        List<NoteDto> archivedNoteDTOs = archivedNotes.stream()
                .map(note -> new NoteDto(
                        note.getNote_id(),
                        note.getTitle(),
                        note.getContent(),
                        note.isArchived(),
                        (note.getCategory() != null) ? note.getCategory().getTitle() : null
                ))
                .collect(Collectors.toList());
        // Return the list of archived NoteDTOs in the response.
        return ResponseEntity.ok(archivedNoteDTOs);
    }

       @GetMapping("/findAllNotArchived")
    public ResponseEntity<List<NoteDto>> findAllNotArchived() {
        // Retrieve all not archived notes from the service.
        List<Note> notArchivedNotes = noteService.findAllNotArchived();
        // Convert the list of archived Note entities to a list of NoteDTOs.
        List<NoteDto> notArchivedNoteDTOs = notArchivedNotes.stream()
                .map(note -> new NoteDto(
                        note.getNote_id(),
                        note.getTitle(),
                        note.getContent(),
                        note.isArchived(),
                        (note.getCategory() != null) ? note.getCategory().getTitle() : null
                ))
                .collect(Collectors.toList());
        // Return the list of archived NoteDTOs in the response.
        return ResponseEntity.ok(notArchivedNoteDTOs);
    }

    @PostMapping("/save")
    public ResponseEntity<?>save(@RequestBody NoteDto notedDto){
         Category categoryNote = categoryService.findByTitle(notedDto.getCategory());
            // Build a Note object using data from the DTO and the found category.
            Note noteToUpdate = Note.builder()
                .title(notedDto.getTitle())
                .note_id(notedDto.getNote_id())
                .archived(notedDto.isArchived())
                .category(categoryNote)
                .content(notedDto.getContent())
                .build();
            // Save the new note in the database.
            noteService.save(noteToUpdate);
            // Return a successful response.
            return ResponseEntity.ok("Save success");
    }

    @PutMapping("/update")
    public ResponseEntity<?>update(@RequestBody NoteDto notedDto){
        // if note is not empty
        if(!noteService.findById(notedDto.getNote_id()).isEmpty()){
            // Retrieve the category associated with the provided title in the DTO.
            Category categoryNote = categoryService.findByTitle(notedDto.getCategory());
            // Build a Note object using data from the DTO and the found category.
            Note noteToUpdate = Note.builder()
                .title(notedDto.getTitle())
                .note_id(notedDto.getNote_id())
                .archived(notedDto.isArchived())
                .category(categoryNote)
                .content(notedDto.getContent())
                .build();
            // Save the updated note in the database.
            noteService.save(noteToUpdate);
            // Return a successful response.
            return ResponseEntity.ok("Save success");
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{note_id}")
    public ResponseEntity<?>delete (@PathVariable Integer note_id){
        noteService.delete(note_id);
        return ResponseEntity.ok("Delete success");
    }
}
