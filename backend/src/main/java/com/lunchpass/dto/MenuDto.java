package com.lunchpass.dto;

import java.time.LocalDate;
import java.util.List;

public class MenuDto {
    private Long id;
    private LocalDate date;
    private String description;
    private List<MenuItemDto> items;

    public MenuDto() {}

    public MenuDto(Long id, LocalDate date, String description, List<MenuItemDto> items) {
        this.id = id;
        this.date = date;
        this.description = description;
        this.items = items;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<MenuItemDto> getItems() { return items; }
    public void setItems(List<MenuItemDto> items) { this.items = items; }
}
