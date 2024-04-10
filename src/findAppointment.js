// Import the mysql module
import { createPool } from 'mysql';

// Create a connection pool
const pool = createPool({
    host: 'ccscloud.dlsu.edu.ph',
    user: 'username',
    password: 'password',
    database: 'Philippines'
});

// Function to find an appointment by ID
function findAppointmentById(appointmentId, callback) {
    // Query to find appointment by ID
    const query = 'SELECT * FROM denormalizedtable WHERE apptid = ?';

    // Acquire a connection from the pool
    pool.getConnection((err, connection) => {
        if (err) {
            // Handle connection error
            callback(err, null);
            return;
        }

        // Execute the query with the provided appointment ID
        connection.query(query, [appointmentId], (error, results) => {
            // Release the connection back to the pool
            connection.release();

            if (error) {
                // Handle query execution error
                callback(error, null);
                return;
            }

            // Pass the results to the callback function
            callback(null, results);
        });
    });
}

// Export the findAppointmentById function
export default findAppointmentById;