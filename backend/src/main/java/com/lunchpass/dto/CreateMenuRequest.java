package com.lunchpass.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public class CreateMenuRequest {
    private LocalDate date;
    private String description;
    private List<CreateMenuItemDto> items;

    public CreateMenuRequest() {}

    public CreateMenuRequest(LocalDate date, String description, List<CreateMenuItemDto> items) {
        this.date = date;
        this.description = description;
        this.items = items;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<CreateMenuItemDto> getItems() {
        return items;
    }

    public void setItems(List<CreateMenuItemDto> items) {
        this.items = items;
    }

    public static class CreateMenuItemDto {
        private String name;
        private String description;
        private String category;
        private Integer calories;
        private BigDecimal price;

        public CreateMenuItemDto() {}

        public CreateMenuItemDto(String name, String description, String category, Integer calories, BigDecimal price) {
            this.name = name;
            this.description = description;
            this.category = category;
            this.calories = calories;
            this.price = price;
        }

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
}
