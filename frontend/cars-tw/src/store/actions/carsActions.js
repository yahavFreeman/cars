import {carsService} from "../../services/carsService"

export function loadCars() {
    return async (dispatch) => {
        try {
            const cars = await carsService.getCars()
            dispatch({type: 'CARS/SET', cars})
        } catch (error) {
            console.log(error)
        }
    }
}

export function upsertCar(car) {
    return async (dispatch) => {
        try {
            const upsertedCar = await carsService.upsertCar(car)
            dispatch({type: "CARS/UPSERT", upsertedCar})
        } catch (error) {
            console.log(error)
            
        }
    }
}