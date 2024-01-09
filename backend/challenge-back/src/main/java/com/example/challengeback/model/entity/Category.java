package com.example.challengeback.model.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Entity
@AllArgsConstructor
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer category_id; // Unique identifier for the category.

    @Column(name = "title", nullable = false)
    private String title; // Title or name of the category.
    
    @OneToMany(mappedBy = "category" ,cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    private List<Note> notes; // Notes associated with this category.
}