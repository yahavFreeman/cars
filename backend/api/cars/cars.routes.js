import express from 'express';
import {getCars, upsertCar} from './cars.controller.js';
import { requireAuth } from '../../middlewares/requireAuth.middleware.js';

const carsRoutes = express.Router()

carsRoutes.get('/', requireAuth, getCars) // adding the middleware to validate the JWT before allowing access to the protected route 
carsRoutes.post('/', requireAuth, upsertCar)
// carsRoutes.get('/', getCars) // adding the middleware to validate the JWT before allowing access to the protected route 
// carsRoutes.post('/', upsertCar)

export {carsRoutes}