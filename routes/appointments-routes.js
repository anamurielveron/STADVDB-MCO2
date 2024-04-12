import {Router} from 'express';

import {
    deleteAppointment,
    getAppointment,
    getAppointments,
    getDeleteAppointments,
    getUpdateAppointments,
    updateAppointment,
} from "../controllers/appointments-controller.js";

const APPOINTMENTS_ROUTES = Router();

APPOINTMENTS_ROUTES.delete('/appointments', deleteAppointment);
APPOINTMENTS_ROUTES.get('/appointments', getAppointments);
APPOINTMENTS_ROUTES.get('/appointments/:appointmentId', getAppointment);
APPOINTMENTS_ROUTES.get('/delete-appointments', getDeleteAppointments);
APPOINTMENTS_ROUTES.get('/update-appointments', getUpdateAppointments);
APPOINTMENTS_ROUTES.put('/appointments', updateAppointment);

export {APPOINTMENTS_ROUTES};