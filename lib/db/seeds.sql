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
VALUES('Attorney', 130000, 4);

-- General delete syntax
SET SQL_SAFE_UPDATES = 0;
DELETE FROM employee WHERE id=1;
SET SQL_SAFE_UPDATES = 1;