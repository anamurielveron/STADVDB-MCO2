import {
    POOL_LUZON,
    POOL_PHILIPPINES,
    POOL_VISMIN,
} from '../database.js';

/**
 * Inserts a new appointment record in the 'denormalizedappointments' table
 * using the Serializable isolation level
 * @param {String} req.body.clinicId Clinic ID of the appointment
 * @param {String} req.body.queueDate Queue date of the appointment
 * @param {String} req.body.startTime Start time of the appointment
 * @param {String} req.body.type Type of the appointment
 * @param {String} req.body.virtual Virtual status of the appointment
 * @param {Object} res Response object to send HTTP response back to the client
 * @returns {Promise<Object>} A promise that resolves with an object detailing
 *     the result of the insert request
 */
const createAppointment = async (req, res) => {
    try {
        const {
            clinicId,
            queueDate,
            startTime,
            type,
            virtual,
        } = req.body;

        const QUERY = `
            INSERT INTO denormalizedappointments (
                clinicid,
                QueueDate,
                StartTime,
                type,
                \`Virtual\`
            )
            VALUES (?, ?, ?, ?, ?);
        `;

        await POOL_PHILIPPINES.query(`
            SET SESSION TRANSACTION ISOLATION LEVEL SERIALIZABLE;
        `);
        await POOL_PHILIPPINES.query(`START TRANSACTION;`);

        const RESULT = await POOL_PHILIPPINES.query(QUERY, [
            clinicId,
            queueDate,
            startTime,
            type,
            virtual,
        ]);

        await POOL_PHILIPPINES.query(`COMMIT;`);

        res.status(200).json(RESULT);
    } catch (error) {
        res.status(400).json(error);
    }
};

/**
 * Deletes an appointment record in the 'denormalizedappointments' table
 * using the Serializable isolation level
 * @param {String} req.body.appointmentId Appointment ID of the appointment
 * @param {Object} res Response object to send HTTP response back to the client
 * @returns {Promise<Object>} A promise that resolves with an object detailing
 *     the result of the delete request
 */
const deleteAppointment = async (req, res) => {
    try {
        const APPOINTMENT_ID = req.body.appointmentId;
        const QUERY = `DELETE FROM denormalizedappointments WHERE apptid = ?;`;

        await POOL_PHILIPPINES.query(`
            SET SESSION TRANSACTION ISOLATION LEVEL SERIALIZABLE;
        `);
        await POOL_PHILIPPINES.query(`START TRANSACTION;`);

        const RESULT = await POOL_PHILIPPINES.query(QUERY, APPOINTMENT_ID);

        await POOL_PHILIPPINES.query(`COMMIT;`);

        res.status(200).json(RESULT);
    } catch (error) {
        console.error(error);
        res.status(400).json(error);
    }
};

/**
 * Reads an appointment record from the 'denormalizedappointments' table
 * using the Read Uncommitted isolation level
 * @param {String} req.params.appointmentId Appointment ID of the appointment
 * @param {Object} res Response object to send HTTP response back to the client
 * @returns {Promise<Array<Object>>} Promise that resolves with an array of
 *     objects whose appointmentId matches the appointmentId argument
 */
const getAppointment = async (req, res) => {
    try {
        const APPOINTMENT_ID = req.params.appointmentId;
        const QUERY = 'SELECT * FROM denormalizedappointments WHERE apptid = ?;';

        await POOL_PHILIPPINES.query(`
            SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
        `);
        await POOL_PHILIPPINES.query(`START TRANSACTION;`);

        const ROWS = await POOL_PHILIPPINES.query(QUERY, APPOINTMENT_ID);

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

        const ROWS = await POOL_PHILIPPINES.query(QUERY);

        res.status(200).json(ROWS);
    } catch (error) {
        console.error(error)
        res.status(400).json(error);
    }
};

const getCreateAppointments = async (req, res) => {
    res.render('create-appointments', {title: 'Create Appointment'});
};

const getDeleteAppointments = async (req, res) => {
    res.render('delete-appointments', {title: 'Delete Appointment'});
};

const getUpdateAppointments = async (req, res) => {
    res.render('update-appointments', {title: 'Update Appointment'});
};

/**
 * Updates an appointment record in the 'denormalizedappointments' table
 * using the Serializable isolation level
 * @param {String} req.body.appointmentId Appointment ID of the appointment
 * @param {String} req.body.endTime New End Time of the appointment
 * @param {String} req.body.queueDate New Queue Date of the appointment
 * @param {String} req.body.startTime New Start Time of the appointment
 * @param {String} req.body.status New status of the appointment
 * @param {String} req.body.type New type of the appointment
 * @param {String} req.body.virtual New virtual status of the appointment
 * @param {Object} res Response object to send HTTP response back to the client
 * @returns {Promise<Object>} Promise that resolves with an object detailing
 *     the result of the update request
 */
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

        const RESULT = await POOL_PHILIPPINES.query(QUERY, [
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
    createAppointment,
    deleteAppointment,
    getAppointment,
    getAppointments,
    getCreateAppointments,
    getDeleteAppointments,
    getUpdateAppointments,
    updateAppointment,
};