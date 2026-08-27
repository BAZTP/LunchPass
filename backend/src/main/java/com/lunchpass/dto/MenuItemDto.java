package com.lunchpass.dto;

import java.math.BigDecimal;

public class MenuItemDto {
    private Long id;
    private String name;
    private String description;
    private String category;
    private Integer calories;
    private BigDecimal price;

    public MenuItemDto() {}

    public MenuItemDto(Long id, String name, String description, String category, Integer calories, BigDecimal price) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.calories = calories;
        this.price = price;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Integer getCalories() { return calories; }
    public void setCalories(Integer calories) { this.calories = calories; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
}
