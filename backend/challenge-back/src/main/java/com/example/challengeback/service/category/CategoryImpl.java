package com.example.challengeback.service.category;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.challengeback.model.entity.Category;
import com.example.challengeback.repository.CategoryRepository;
@Component
public class CategoryImpl implements CategoryService{
    @Autowired
    private CategoryRepository categoryRepository;
    @Override
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    @Override
    public void save(Category category) {
       categoryRepository.save(category);
    }

    @Override
    public void delete(Integer category_id) {
        if(categoryRepository.existsById(category_id)){
            categoryRepository.deleteById(category_id);
        }
    }
    
}
