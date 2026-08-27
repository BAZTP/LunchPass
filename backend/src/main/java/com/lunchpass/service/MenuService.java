package com.lunchpass.service;

import com.lunchpass.dto.CreateMenuRequest;
import com.lunchpass.dto.MenuDto;
import com.lunchpass.dto.MenuItemDto;
import com.lunchpass.entity.Menu;
import com.lunchpass.entity.MenuItem;
import com.lunchpass.repository.MenuItemRepository;
import com.lunchpass.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MenuService {

    @Autowired
    private MenuRepository menuRepository;

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Transactional(readOnly = true)
    public List<MenuDto> getMenus() {
        return menuRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Optional<MenuDto> getMenuByDate(LocalDate date) {
        return menuRepository.findByDate(date)
                .map(this::convertToDto);
    }

    @Transactional(readOnly = true)
    public Optional<MenuDto> getTodayMenu() {
        return getMenuByDate(LocalDate.now());
    }

    @Transactional
    public MenuDto createMenu(CreateMenuRequest request) {
        Optional<Menu> existingOpt = menuRepository.findByDate(request.getDate());

        Menu menu;
        if (existingOpt.isPresent()) {
            // Update existing menu for that date rather than throwing an exception
            menu = existingOpt.get();
            if (request.getDescription() != null && !request.getDescription().trim().isEmpty()) {
                menu.setDescription(request.getDescription());
            }
        } else {
            menu = new Menu();
            menu.setDate(request.getDate());
            menu.setDescription(request.getDescription());
            menu.setMenuItems(new ArrayList<>());
        }

        if (request.getItems() != null) {
            for (CreateMenuRequest.CreateMenuItemDto itemDto : request.getItems()) {
                MenuItem item = new MenuItem();
                item.setName(itemDto.getName());
                item.setDescription(itemDto.getDescription());
                item.setCategory(itemDto.getCategory() != null ? itemDto.getCategory() : "MAIN_COURSE");
                item.setCalories(itemDto.getCalories() != null ? itemDto.getCalories() : 0);
                item.setPrice(itemDto.getPrice() != null ? itemDto.getPrice() : BigDecimal.ZERO);
                item.setMenu(menu);
                menu.getMenuItems().add(item);
            }
        }

        Menu saved = menuRepository.save(menu);
        return convertToDto(saved);
    }

    @Transactional
    public MenuDto updateMenu(Long id, CreateMenuRequest request) {
        Menu menu = menuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menú no encontrado con ID: " + id));

        menu.setDate(request.getDate());
        menu.setDescription(request.getDescription());

        // Clear existing items and replace
        menuItemRepository.deleteAll(menu.getMenuItems());
        menu.getMenuItems().clear();

        if (request.getItems() != null) {
            for (CreateMenuRequest.CreateMenuItemDto itemDto : request.getItems()) {
                MenuItem item = new MenuItem();
                item.setName(itemDto.getName());
                item.setDescription(itemDto.getDescription());
                item.setCategory(itemDto.getCategory() != null ? itemDto.getCategory() : "MAIN_COURSE");
                item.setCalories(itemDto.getCalories() != null ? itemDto.getCalories() : 0);
                item.setPrice(itemDto.getPrice() != null ? itemDto.getPrice() : BigDecimal.ZERO);
                item.setMenu(menu);
                menu.getMenuItems().add(item);
            }
        }

        Menu updated = menuRepository.save(menu);
        return convertToDto(updated);
    }

    @Transactional
    public void deleteMenu(Long id) {
        menuRepository.deleteById(id);
    }

    @Transactional
    public MenuDto duplicateMenu(Long sourceId, LocalDate targetDate) {
        Menu source = menuRepository.findById(sourceId)
                .orElseThrow(() -> new RuntimeException("Menú de origen no encontrado con ID: " + sourceId));

        Optional<Menu> existingTarget = menuRepository.findByDate(targetDate);
        Menu duplicate;
        if (existingTarget.isPresent()) {
            duplicate = existingTarget.get();
        } else {
            duplicate = new Menu();
            duplicate.setDate(targetDate);
            duplicate.setDescription(source.getDescription() + " (Copia)");
            duplicate.setMenuItems(new ArrayList<>());
        }

        for (MenuItem sourceItem : source.getMenuItems()) {
            MenuItem copy = new MenuItem();
            copy.setName(sourceItem.getName());
            copy.setDescription(sourceItem.getDescription());
            copy.setCategory(sourceItem.getCategory());
            copy.setCalories(sourceItem.getCalories());
            copy.setPrice(sourceItem.getPrice());
            copy.setMenu(duplicate);
            duplicate.getMenuItems().add(copy);
        }

        Menu saved = menuRepository.save(duplicate);
        return convertToDto(saved);
    }

    private MenuDto convertToDto(Menu menu) {
        List<MenuItemDto> itemDtos = new ArrayList<>();
        if (menu.getMenuItems() != null) {
            for (MenuItem item : menu.getMenuItems()) {
                itemDtos.add(new MenuItemDto(
                        item.getId(),
                        item.getName(),
                        item.getDescription(),
                        item.getCategory(),
                        item.getCalories(),
                        item.getPrice()
                ));
            }
        }

        return new MenuDto(
                menu.getId(),
                menu.getDate(),
                menu.getDescription(),
                itemDtos
        );
    }
}
