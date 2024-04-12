import {
    POOL_LUZON,
    POOL_PHILIPPINES,
    POOL_VISMIN,
} from '../database.js';

const deleteAppointment = async (req, res) => {
    try {
        const APPOINTMENT_ID = req.body.appointmentId;
        const QUERY = `DELETE FROM denormalizedappointments WHERE apptid = ?;`;

        await POOL_PHILIPPINES.query(`
            SET SESSION TRANSACTION ISOLATION LEVEL SERIALIZABLE;
        `);
        await POOL_PHILIPPINES.query(`START TRANSACTION;`);

        const [RESULT] = await POOL_PHILIPPINES.query(QUERY, APPOINTMENT_ID);

        await POOL_PHILIPPINES.query(`COMMIT;`);

        res.status(200).json(RESULT);
    } catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
};

const getAppointment = async (req, res) => {
    try {
        const APPOINTMENT_ID = req.params.appointmentId;
        const QUERY = 'SELECT * FROM denormalizedappointments WHERE apptid = ?;';

        await POOL_LUZON.query(`
            SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
        `);
        await POOL_LUZON.query(`START TRANSACTION;`);

        const [ROWS] = await POOL_LUZON.query(QUERY, APPOINTMENT_ID);

        res.status(200).json(ROWS);
    } catch (error) {
        console.error(error)
        res.status(400).json(error);
    }
};

const getAppointments = async (req, res) => {
    try {
        const QUERY = 'SELECT * FROM denormalizedappointments;';

        await POOL_PHILIPPINES.query(`
            SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
        `);
        await POOL_PHILIPPINES.query(`START TRANSACTION;`);

        const [ROWS] = await POOL_PHILIPPINES.query(QUERY);

        res.status(200).json(ROWS);
    } catch (error) {
        console.error(error)
        res.status(400).json(error);
    }
};

const getDeleteAppointments = async (req, res) => {
    res.render('delete-appointments', {title: 'Delete Appointment'});
};

const getUpdateAppointments = async (req, res) => {
    res.render('update-appointments', {title: 'Update Appointment'});
};

const updateAppointment = async (req, res) => {
    try {
        const {
            appointmentId,
            endTime,
            queueDate,
            startTime,
            status,
            type,
            virtual,
        } = req.body;
        const QUERY = `
            UPDATE denormalizedappointments
            SET
                EndTime = ?,
                QueueDate = ?,
                StartTime = ?,
                status = ?,
                type = ?,
                \`Virtual\` = ?
            WHERE apptid = ?;
        `;

        await POOL_PHILIPPINES.query(`
            SET SESSION TRANSACTION ISOLATION LEVEL SERIALIZABLE;
        `);
        await POOL_PHILIPPINES.query(`START TRANSACTION;`);

        const [RESULT] = await POOL_PHILIPPINES.query(QUERY, [
            endTime,
            queueDate,
            startTime,
            status,
            type,
            virtual,
            appointmentId,
        ]);

        await POOL_PHILIPPINES.query(`COMMIT;`);

        res.status(200).json(RESULT);
    } catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
};

export {
    deleteAppointment,
    getAppointment,
    getAppointments,
    getDeleteAppointments,
    getUpdateAppointments,
    updateAppointment,
};