import {Router} from 'express';

import {
    getAppointment,
    getAppointments,
    getUpdateAppointments,
    updateAppointment,
    deleteAppointment
} from "../controllers/appointments-controller.js";

const APPOINTMENTS_ROUTES = Router();

APPOINTMENTS_ROUTES.get('/appointments', getAppointments);
APPOINTMENTS_ROUTES.get('/appointments/:appointmentId', getAppointment);
APPOINTMENTS_ROUTES.get('/update-appointments', getUpdateAppointments);
APPOINTMENTS_ROUTES.put('/appointments', updateAppointment);
APPOINTMENTS_ROUTES.delete('/appointments', deleteAppointment);

export {APPOINTMENTS_ROUTES};