-- Inserts into department column
INSERT INTO department (name, utilized_budget)
VALUES ('Sales', 450000);

INSERT INTO department (name, utilized_budget)
VALUES ('Engineering', 420000);

INSERT INTO department (name, utilized_budget)
VALUES ('Finance', 220000);

INSERT INTO department (name, utilized_budget)
VALUES ('Legal', 300000);

INSERT INTO role (title, salary, department_id)
VALUES('Sales Manager', 280.000, 1);

INSERT INTO role (title, salary, department_id)
VALUES('Sales Representative', 170.000, 1);

INSERT INTO role (title, salary, department_id)
VALUES('Engineering Manager', 180.000, 2);

INSERT INTO role (title, salary, department_id)
VALUES('Software Engineer', 120.000, 2);

INSERT INTO role (title, salary, department_id)
VALUES('Accounting Manager', 120.00, 3);

INSERT INTO role (title, salary, department_id)
VALUES('Accountant', 100.000, 3);

INSERT INTO role (title, salary, department_id)
VALUES('Lawyer', 120.000, 4);

INSERT INTO role (title, salary, department_id)
VALUES('Attorney', 130.000, 4);

-- General delete syntax
SET SQL_SAFE_UPDATES = 0;
DELETE FROM employee WHERE id=1;
SET SQL_SAFE_UPDATES = 1;