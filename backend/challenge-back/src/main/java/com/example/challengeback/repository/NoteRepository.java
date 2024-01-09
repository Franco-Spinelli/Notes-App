package com.example.challengeback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.challengeback.model.entity.Note;
@Repository
public interface NoteRepository extends JpaRepository<Note,Integer>{
    
}
