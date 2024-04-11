import {Router} from 'express';

import {getAppointments} from "../controllers/appointments-controller.js";

const APPOINTMENTS_ROUTES = Router();

APPOINTMENTS_ROUTES.get('/appointments', getAppointments);

export {APPOINTMENTS_ROUTES};