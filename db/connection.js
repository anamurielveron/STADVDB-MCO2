// Import required packages
const mysql = require('mysql');

// Create a connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'ccscloud.dlsu.edu.ph',
  user: 'username',
  password: 'password',
  database: 'your_database'
});

// Execute a query
pool.query('SELECT * FROM appointments', (error, results, fields) => {
  if (error) {
    console.error('Error executing query:', error);
    return;
  }
  console.log('Query results:', results);
});

// Example of inserting data into the database
const newAppointment = {
  clinic_id: 1,
  appointment_date: '2024-04-10',
  appointment_time: '10:00:00',
  appointment_type: 'Consultation',
  virtual: true,
  status: 'Queued'
};

pool.query('INSERT INTO appointments SET ?', newAppointment, (error, results, fields) => {
  if (error) {
    console.error('Error inserting data:', error);
    return;
  }
  console.log('Data inserted successfully.');
});

// Close the connection pool when done
pool.end();
