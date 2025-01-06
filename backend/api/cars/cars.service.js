import { getDb } from "../../services/db.js";

async function getAllCars() {
  try {
    const db = await getDb();

    const request = await db.request();

    const result = await request.execute("GetAllCars");
    return result.recordset; // recordset is where the data requested is.
  } catch (err) {
    console.error("Error fetching cars:", err);
    throw err;
  }
}

// CREATE PROCEDURE GetAllCars
// AS
// BEGIN
//     SELECT * FROM Cars;
// END;
// GO

async function upsertCar(car) {
  try {
    const db = await getDb();
    const request = await db.request();
    const query = `
            EXEC upsertCar 
                @ID = @IDParam,
                @Make = @MakeParam,
                @MODEL = @ModelParam,
                @YEAR = @YearParam,
                @Price = @PriceParam
        `;

    // Use request.input() to safely bind parameters to the query, preventing SQL injection and ensuring proper data handling.
    request.input("IDParam", car.ID || null);
    request.input("MakeParam", car.Make);
    request.input("ModelParam", car.Model);
    request.input("YearParam", car.Year);
    request.input("PriceParam", car.Price);

    // Execute the query
    const result = await request.query(query);
    return result.recordset[0]; // returning the updated car, which is in the first array cell.
  } catch (err) {
    console.error("Error upserting car:", err);
    throw err;
  }
}

export default {
  getAllCars,
  upsertCar,
};

//   CREATE PROCEDURE UpsertCar
//   @ID INT = NULL,
//   @Make NVARCHAR(50),
//   @Model NVARCHAR(50),
//   @Year INT,
//   @Price DECIMAL(18, 2)
// AS
// BEGIN
//   IF @ID IS NULL
//   BEGIN
//       INSERT INTO Cars (Make, Model, Year, Price)
//       VALUES (@Make, @Model, @Year, @Price);
//   END
//   ELSE
//   BEGIN
//       UPDATE Cars
//       SET Make = @Make,
//           Model = @Model,
//           Year = @Year,
//           Price = @Price
//       WHERE ID = @ID;
//       SELECT * FROM Cars WHERE ID = @ID;
//   END;
// END;
// GO
