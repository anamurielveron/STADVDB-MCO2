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

export {getAppointments};