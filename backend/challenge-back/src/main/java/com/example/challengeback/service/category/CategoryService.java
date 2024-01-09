package com.example.challengeback.service.category;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.challengeback.model.entity.Category;

@Service
public interface CategoryService {
    List<Category> findAll();
    void save (Category category);
    void delete(Integer category_id);
}
