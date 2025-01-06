const INITIAL_STATE = {
  cars: [],
};

export function carsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "CARS/GET":
      return {
        ...state,
        cars: action.cars,
      };
    case "CARS/UPSERT":
      const carExists = state.cars.some(
        (car) => car.ID === action.upsertedCar.ID
      );
      return {
        ...state,
        cars: carExists
          ? state.cars.map((car) =>
              car.ID === action.upsertedCar.ID ? action.upsertedCar : car
            )
          : [...state.cars, action.upsertedCar],
      };
    default:
      return state;
  }
}
