import carsService from "./cars.service.js";

async function getCars(req, res) {
  try {
    const cars = await carsService.getAllCars();
    res.send(cars);
  } catch (err) {
    console.error("Failed to get cars", err);
    res.status(500).send({ err: "Failed to get cars" });
  }
}

async function upsertCar(req, res) {
  try {
    const car = req.body;
    const savedcars = await carsService.upsertCar(car);
    res.send(savedcars);
  } catch (err) {
    console.error("Failed to update cars", err);
    res.status(500).send({ err: "Failed to update cars" });
  }
}

export { getCars, upsertCar };
