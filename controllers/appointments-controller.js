import {
    POOL_LUZON,
    POOL_PHILIPPINES,
    POOL_VISMIN,
} from '../database.js';

const getAppointment = async (req, res) => {
    try {
        const APPOINTMENT_ID = req.params.appointmentId;
        const QUERY = 'SELECT * FROM denormalizedappointments WHERE apptid = ?;';

        await POOL_PHILIPPINES.query(`
            SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
        `);
        await POOL_PHILIPPINES.query(`START TRANSACTION;`);

        const [ROWS] = await POOL_PHILIPPINES.query(QUERY, [APPOINTMENT_ID]);

        await POOL_PHILIPPINES.query(`DO SLEEP(10);`);

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

        await POOL_PHILIPPINES.query(`DO SLEEP(10);`);

        res.status(200).json(ROWS);
    } catch (error) {
        console.error(error)
        res.status(400).json(error);
    }
};

const getUpdateAppointments = async (req, res) => {
    res.render('update-appointments');
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

        await POOL_PHILIPPINES.query(`
            DO SLEEP(10)
            COMMIT;
        `);

        res.status(200).json(RESULT);
    } catch (error) {
        console.error(error);
        res.status(400).json(error);
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

export {
    getAppointment,
    getAppointments,
    getUpdateAppointments,
    updateAppointment,
    deleteAppointment,
};