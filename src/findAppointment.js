// Function to find an appointment by ID
function findAppointmentById() {
    button.addEventListener('click', () => {
        const RESULTS = fetch('/getAppointments');
        console.log(RESULTS);
        
    });
}

// Export the findAppointmentById function
export default findAppointmentById;