INSERT INTO roles (name) VALUES ('ADMIN'), ('EMPLOYEE'), ('KITCHEN_STAFF');

INSERT INTO users (username, password, email, role_id) VALUES
('admin', 'adminpass', 'admin@example.com', 1),
('john.doe', 'password', 'john.doe@example.com', 2),
('chef.gordon', 'password', 'gordon@example.com', 3);

INSERT INTO departments (name) VALUES ('Tecnología'), ('Finanzas'), ('Recursos Humanos'), ('Operaciones'), ('Ventas');

INSERT INTO employees (user_id, first_name, last_name, department_id, status) VALUES
(2, 'John', 'Doe', 1, 'ACTIVE'),
(3, 'Gordon', 'Ramsay', 4, 'ACTIVE');

INSERT INTO menus (date, description) VALUES
(CURRENT_DATE, 'Menú del Día - Almuerzos Ejecutivos, Gourmet y Vegetariano'),
(CURRENT_DATE + 1, 'Menú Mañana - Especial Criollo y Fusión'),
(CURRENT_DATE + 2, 'Menú Viernes - Parrillada y Menú Marino');

INSERT INTO menu_items (menu_id, name, description, category, calories, price) VALUES
-- Menú de Hoy (id 1) - 14 Platos de variedad
(1, 'Sopa de Verduras y Crutones', 'Entrada: Sopa casera con vegetales frescos y vegetativo salteado', 'STARTER', 150, 0.00),
(1, 'Crema de Champiñones y Finas Hierbas', 'Entrada: Crema concentrada con toques de mantequilla y hierbas', 'STARTER', 180, 0.00),
(1, 'Causa Rellena de Pollo y Palta', 'Entrada: Papa prensada con ají amarillo, pollo deshilachado y palta', 'STARTER', 210, 0.00),
(1, 'Tequeños Crocantes con Guacamole', 'Entrada: 4 Tequeños de queso derretido con guacamole casero', 'STARTER', 240, 0.00),

(1, 'Pollo a la Plancha con Puré y Ensalada', 'Plato Fuerte: Pechuga a las finas hierbas con puré de papas y mix verde', 'MAIN_COURSE', 520, 0.00),
(1, 'Lomo Saltado Tradicional', 'Plato Fuerte: Tiras de lomo salteadas con cebolla, tomate y papas fritas', 'MAIN_COURSE', 650, 0.00),
(1, 'Pechuga Cordon Bleu con Arroz Primavera', 'Plato Fuerte: Pechuga empanizada rellena de jamón y queso derretido', 'MAIN_COURSE', 680, 0.00),
(1, 'Milanesa de Cerdo con Papas Rústicas', 'Plato Fuerte: Filete de cerdo empanizado dorado con papas al romero', 'MAIN_COURSE', 620, 0.00),

(1, 'Hamburguesa de Lentejas y Quinua', 'Opción Vegetariana: Medallón de quinua y lentejas con vegetal salteado', 'VEGETARIAN', 410, 0.00),
(1, 'Bowl Proteico de Garbanzos y Palta', 'Opción Vegetariana: Bowl con quinoa, garbanzos, palta, tomate y aderezo', 'VEGETARIAN', 390, 0.00),

(1, 'Cheesecake de Maracuyá', 'Postre: Mousse ligero con jalea artesanal de maracuyá', 'DESSERT', 280, 0.00),
(1, 'Tiramisú Tradicional de Café', 'Postre: Bizcochuelo impregnado en espresso con crema mascarpone', 'DESSERT', 320, 0.00),

(1, 'Chicha Morada Natural Helada', 'Bebida: Bebida tradicional refrescante', 'BEVERAGE', 110, 0.00),
(1, 'Jugo de Mango y Maracuyá Natural', 'Bebida: Jugo tropical fresco sin azúcar añadida', 'BEVERAGE', 120, 0.00),

-- Menú de Mañana (id 2) - 10 Platos
(2, 'Ensalada César con Pollo y Crutones', 'Entrada: Lechuga romana, aderezo césar y pollo deshilachado', 'STARTER', 220, 0.00),
(2, 'Crema de Zapallo y Semillas de Girasol', 'Entrada: Crema tibia con semillas tostadas', 'STARTER', 160, 0.00),

(2, 'Seco de Res con Fríjoles y Arroz', 'Plato Fuerte: Carne guisada con cilantro y arroz blanco', 'MAIN_COURSE', 680, 0.00),
(2, 'Fettuccine Alfredo con Filete de Pollo', 'Plato Fuerte: Pasta en salsa blanca al parmesano con pollo a la parrilla', 'MAIN_COURSE', 710, 0.00),
(2, 'Asado de Tira con Chimichurri', 'Plato Fuerte Especial: Carne a la parrilla con papas y chimichurri', 'MAIN_COURSE', 740, 0.00),

(2, 'Lasagna de Vegetales Gratinada', 'Opción Vegetariana: Pasta con capas de zuchini, berenjena y queso', 'VEGETARIAN', 450, 0.00),
(2, 'Risotto de Champiñones y Portobello', 'Opción Vegetariana: Arroz arborio cremoso con variedad de hongos', 'VEGETARIAN', 480, 0.00),

(2, 'Mousse de Chocolate al 70%', 'Postre: Cremoso mousse con cacao fino', 'DESSERT', 310, 0.00),
(2, 'Tres Leches de Vainilla', 'Postre: Bizcocho húmedo bañado en tres leches', 'DESSERT', 340, 0.00),
(2, 'Limonada Frozen con Menta', 'Bebida: Refrescante limonada frappé', 'BEVERAGE', 95, 0.00),

-- Menú Pasado Mañana (id 3) - 8 Platos
(3, 'Pollo al Horno con Papas Rústicas', 'Plato Fuerte: Cuarto de pollo sazonado al romero con papas', 'MAIN_COURSE', 590, 0.00),
(3, 'Arroz con Mariscos Especial', 'Plato Fuerte: Arroz salteado con camarones, calamar y pimiento', 'MAIN_COURSE', 660, 0.00),
(3, 'Salmón a la Plancha con Legumbres', 'Plato Fuerte Especial: Filete de salmón fresco salteado', 'MAIN_COURSE', 530, 0.00),
(3, 'Ensalada Gourmet de Queso de Cabra', 'Opción Vegetariana: Mix de lechugas, queso de cabra y frutos secos', 'VEGETARIAN', 370, 0.00),
(3, 'Tarta de Manzana y Canela', 'Postre: Pie horneado de manzana', 'DESSERT', 260, 0.00),
(3, 'Helado Artesanal de Fresa', 'Postre: 2 Bolas de helado natural', 'DESSERT', 180, 0.00),
(3, 'Te Helado de Durazno', 'Bebida: Té helado con extracto de durazno', 'BEVERAGE', 85, 0.00),
(3, 'Agua Mineral con Gas', 'Bebida: Botella 500ml', 'BEVERAGE', 0, 0.00);

INSERT INTO reservations (employee_id, menu_item_id, status) VALUES
(1, 5, 'CONFIRMED');

INSERT INTO qr_codes (reservation_id, token, status) VALUES
(1, 'QR-12345', 'ACTIVE');
