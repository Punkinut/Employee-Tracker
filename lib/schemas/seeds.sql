INSERT INTO department (name, utilized_budget)
VALUES ('Sales', 450000);

INSERT INTO department (name, utilized_budget)
VALUES ('Engineering', 420000);

INSERT INTO department (name, utilized_budget)
VALUES ('Finance', 220000);

INSERT INTO department (name, utilized_budget)
VALUES ('Legal', 300000);

-- General delete syntax
SET SQL_SAFE_UPDATES = 0;
DELETE FROM department WHERE name='Tim';
SET SQL_SAFE_UPDATES = 1;