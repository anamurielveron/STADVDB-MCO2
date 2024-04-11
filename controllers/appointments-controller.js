import {
    POOL_LUZON,
    POOL_PHILIPPINES,
    POOL_VISMIN,
} from '../database.js';

const getAppointments = async (req, res) => {
    try {
        const [rows, fields] = await POOL_PHILIPPINES.query('SELECT * FROM denormalizedappointments');

        if (rows) {
            res.status(200).json(rows);
        }
    } catch (error) {
        console.error(error)
    }
};

const updateAppointment = async (req, res, status, date, time, type, virtual) => {
    values = "VALUES (" + status + "," + date + "," + time + "," + type + "," + virtual + ")";
    try {
        const [rows, fields] = await POOL_PHILIPPINES.query('INSERT INTO denormalizedappointments (status, QueueDate, StartTime, type, Virtual)' + values);

        if (rows) {
            res.status(200).json(rows);
        }
    } catch (error) {
        console.error(error)
    }
};

const deleteAppointment = async (req, res, id) => {
    try {
        const [rows, fields] = await POOL_PHILIPPINES.query('DELETE FROM denormalizedappointments WHERE pxid = ' + id);

        if (rows) {
            res.status(200).json(rows);
        }
    } catch (error) {
        console.error(error)
    }
};

export {getAppointments, updateAppointment, deleteAppointment};