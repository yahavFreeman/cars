import { httpService } from "./http.service";

async function getCars() {
  return await httpService.get("cars");
}

async function upsertCar(car) {
  return await httpService.post("cars", car);
}

export const carsService = {
  getCars,
  upsertCar,
};
