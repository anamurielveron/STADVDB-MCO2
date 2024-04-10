// Function to fetch appointment data by ID
async function fetchAppointmentById(appointmentId) {
    try {
        const response = await fetch(`appointments/${appointmentId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching appointment data:', error);
        return null;
    }
}

// Function to display appointment details
function displayAppointmentDetails(appointment) {
    // Display appointment details in the form
    document.getElementById('apptStatus').value = appointment.status;
    document.getElementById('apptDate').value = appointment.apptDate;
    document.getElementById('apptTime').value = appointment.apptTime;
    document.getElementById('apptType').value = appointment.apptType;
    document.getElementById('virtual').value = appointment.virtual;
}

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault();
    // Implement form submission logic here
}

// Function to find appointment by ID and populate form
async function findAppointmentByIdAndPopulateForm(appointmentId) {
    try {
        const appointment = await fetchAppointmentById(appointmentId);
        if (appointment) {
            displayAppointmentDetails(appointment);
        } else {
            console.error('Appointment not found.');
        }
    } catch (error) {
        console.error('Error finding appointment:', error);
    }
}

// Call the function to find appointment by ID and populate form when the page loads
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const appointmentId = urlParams.get('id');
    if (appointmentId) {
        findAppointmentByIdAndPopulateForm(appointmentId);
    } else {
        console.error('Appointment ID not provided.');
    }
};
