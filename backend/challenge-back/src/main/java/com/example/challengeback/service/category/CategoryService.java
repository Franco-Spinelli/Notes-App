package com.example.challengeback.service.category;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.challengeback.model.entity.Category;


@Service
public interface CategoryService {
      // Retrieve all categories
      List<Category> findAll();
      // Save a category
      void save(Category category);
      // Delete a category by its ID
      void delete(Integer category_id);
      // Find a category by its title
      Category findByTitle(String title);
      // Find a note by its ID
      Optional<Category> findById(Integer id);
}
