CREATE TABLE Cars (
    ID INT PRIMARY KEY IDENTITY(1,1),
    Make NVARCHAR(50),
    Model NVARCHAR(50),
    Year INT,
    Price DECIMAL(18, 2)
);
GO

VALUES ('Tesla', 'Model 3', 2022, 157891.3);
GO

INSERT INTO Cars (Make, Model, Year, Price)
VALUES ('Tesla', 'Model Y', 2023, 215000);
GO

INSERT INTO Cars (Make, Model, Year, Price)
VALUES ('Volkswagen', 'Golf', 2015, 20000);
GO

INSERT INTO Cars (Make, Model, Year, Price)
VALUES ('Toyota', 'Corrola', 2019, 35499.95);
GO

INSERT INTO Cars (Make, Model, Year, Price)
VALUES ('Toyota', 'RAV4', 2024, 239101.7);
GO

 CREATE PROCEDURE GetAllCars
 AS
 BEGIN
     SELECT * FROM Cars;
 END;
 GO

 CREATE OR ALTER PROCEDURE upsertCar
     @ID INT = NULL,
     @Make NVARCHAR(50),
     @Model NVARCHAR(50),
     @Year INT,
     @Price DECIMAL(18, 2)
 AS
 BEGIN
     SET NOCOUNT ON;

     IF @ID IS NULL
     BEGIN
         INSERT INTO Cars (Make, Model, Year, Price)
         VALUES (@Make, @Model, @Year, @Price);

         SELECT * FROM Cars WHERE ID = SCOPE_IDENTITY();
     END
     ELSE
     BEGIN
         UPDATE Cars
         SET Make = @Make,
             Model = @Model,
             Year = @Year,
             Price = @Price
         WHERE ID = @ID;

         SELECT * FROM Cars WHERE ID = @ID;
     END
 END;
 GO