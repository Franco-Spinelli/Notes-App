package com.example.challengeback.controller;

import java.util.List;
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

import com.example.challengeback.model.dto.CategoryDto;
import com.example.challengeback.model.entity.Category;

import com.example.challengeback.service.category.CategoryService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/challenge/category")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;
    @GetMapping("/findAll")
    public ResponseEntity<List<CategoryDto>> findAllCategories() {
        // Retrieve all categories from the service.
        List<Category> allCategories = categoryService.findAll();
        // Convert the list of Category entities to a list of CategoryDTOs.
        List<CategoryDto> allCategoryDTOs = allCategories.stream()
                .map(category -> new CategoryDto(
                        category.getCategory_id(),
                        category.getTitle()
                ))
                .collect(Collectors.toList());
        // Return the list of CategoryDTOs in the response.
        return ResponseEntity.ok(allCategoryDTOs);
    }
    @PostMapping("/save")
    public ResponseEntity<?>save(@RequestBody Category category){
        categoryService.save(category);
        return ResponseEntity.ok("Save success");
    }

    @PutMapping("/updateCategory")
    public ResponseEntity<?> updateCategory(@RequestBody CategoryDto categoryDto) {
        // if category is not empty
        if(!categoryService.findById(categoryDto.getCategory_id()).isEmpty()){
            // Build a Category object using data from the DTO.
            Category categoryToUpdate = new Category();
            categoryToUpdate.setCategory_id(categoryDto.getCategory_id());
            categoryToUpdate.setTitle(categoryDto.getTitle());
            // Save the updated category in the database.
            categoryService.save(categoryToUpdate);
            // Return a successful response.
            return ResponseEntity.ok("Save success");
        }
        return ResponseEntity.notFound().build();
    }
 
    // !!!!!!If you delete a category, all the notes related to it are also deleted!!!!!!.
    @DeleteMapping("/delete/{category_id}")
    public ResponseEntity<?>delete (@PathVariable Integer category_id){
        categoryService.delete(category_id);
        return ResponseEntity.ok("Delete success");
    }

}
