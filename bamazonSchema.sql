DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
    item_id INT NOT NULL
    AUTO_INCREMENT,
  product_name VARCHAR
    (100) NOT NULL,
  department_name VARCHAR
    (50) NULL,
  price DECIMAL
    (10,2) NOT NULL,
  stock_quantity INT
    (10) NULL,
--   product_sales DECIMAL
--     (10,2) NULL,
  PRIMARY KEY
    (item_id)
);



    INSERT INTO products
        (product_name, department_name, price,stock_quantity)
    VALUES
        ("Quartz Roller 'clear' ", "Beauty Essentials", 14.99, 52),
        ("Quartz Roller 'pink' ", "Beauty Essentials", 14.99, 52);

    INSERT INTO products
        (product_name, department_name, price,stock_quantity)
    VALUES
        ("Resistant Loops", "Fitness", 19.99, 78),
        ("Reactive Sling-shot", "Fitness", 21.99, 30);

    INSERT INTO products
        (product_name, department_name, price,stock_quantity)
    VALUES
        ("Wireless Charging Hub", "Electronics", 25.00, 90),
        ("LED Scribble Alarm Clock", "Electronics", 19.95, 68);

    INSERT INTO products
        (product_name, department_name, price,stock_quantity)
    VALUES
        ("Lap Desk", "Home Office", 30.00, 40),
        ("Universal Phone Mount", "Home Office", 9.99, 98);

    INSERT INTO products
        (product_name, department_name, price,stock_quantity)
    VALUES
        ("Hand Bookend Set", "Home Decor", 39.00, 18),
        ("Blackout Curtains", "Home Decor", 49.99, 28);

    USE bamazon_DB;

    CREATE TABLE departments
    (
        department_id INT NOT NULL
        AUTO_INCREMENT,
    department_name VARCHAR
        (100) NOT NULL, 
    over_head_costs DECIMAL
        (10,2) NOT NULL,
    PRIMARY KEY
        (department_id)
);



        INSERT INTO departments
            (department_name, over_head_costs)
        VALUES
            ("Beauty Essentials", 1200.00),
            ("Electronics", 3500.00),
            ("Fitness", 2600.00),
            ("Home Office", 1900.00),
            ("Home Decor", 1000.00);

            -- Select * From departments;
            -- ALTER TABLE products ADD COLUMN product_sales DECIMAL(7,2) DEFAULT '0.00';