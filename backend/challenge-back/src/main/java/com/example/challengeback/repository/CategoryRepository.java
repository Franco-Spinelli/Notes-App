package com.example.challengeback.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.challengeback.model.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Integer>{
      @Query("SELECT c FROM Category c" +
            " WHERE c.title = :title")
    Category findByTitle(@Param("title") String title);
}
