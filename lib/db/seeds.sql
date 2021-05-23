-- Inserts into department column
INSERT INTO department (name, utilized_budget)
VALUES 
('Sales', 450000),
('Engineering', 420000),
('Finance', 220000),
('Legal', 300000);

INSERT INTO role (title, salary, department_id)
VALUES
('Sales Manager', 280000, 1),
('Sales Representative', 170000, 1),
('Engineering Manager', 180000, 2),
('Software Engineer', 120000, 2),
('Accounting Manager', 120000, 3),
('Accountant', 100000, 3),
('Lawyer', 120000, 4),
('Attorney', 130000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Alec', 'Becker', 1, null),
('Jake', 'Smith', 4, 1),
('James', 'Dean', 3, null),
('Kanye', 'West', 2, 3),
('Rami ', 'Makel', 5, null),
('Mr.', 'Ayo', 6, 7),
('David', 'Impey', 5, null);

-- General delete syntax
SET SQL_SAFE_UPDATES = 0;
DELETE FROM employee WHERE id=1;
SET SQL_SAFE_UPDATES = 1;