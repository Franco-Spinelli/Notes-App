package com.example.challengeback.model.entity;

import java.sql.Date;

//import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "notes")
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer note_id; // Unique identifier for the note.
    // nullable = false Indicates that the database column does not allow null values.
    @Column(name = "title", nullable = false)
    private String title; // Title of the note.

    @Column(name = "content", nullable = false)
    private String content; // Content or body of the note.

    @Column(name = "created_at", nullable = false)
    private Date createdAt; // Date and time when the note was created.

    @Column(name = "archived")
    private boolean archived; // Indicates whether the note is archived or active.
    
    // one note only have one category
    @ManyToOne
   // @JsonIgnore
    @JoinColumn(name = "category_id")
    private Category category; // Category associated with the note.
}
