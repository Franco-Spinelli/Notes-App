package com.example.challengeback.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Data
@Builder
public class CategoryDto {
    private Integer category_id;
    private String title;
}
