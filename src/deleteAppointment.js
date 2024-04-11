// Function to find an appointment by ID
function deleteAppointment() {
    button.addEventListener('click', () => {
        const RESULTS = fetch('/deleteAppointment');
        console.log(RESULTS);
        
    });
}

// Export the findAppointmentById function
export default deleteAppointment;