const SUBMIT_BTN = document.querySelector('input[type=submit]');

SUBMIT_BTN.addEventListener('click', async (event) => {
    event.preventDefault();

    try {
        const appointmentContainer = document.querySelector('.appointment-container');
        const APPOINTMENT_ID = document.querySelector('#appointmentID').value;
        const RESPONSE = await fetch(`/appointments/${APPOINTMENT_ID}`);
        const DATA = await RESPONSE.json();

        appointmentContainer.innerHTML = '';
        appointmentContainer.innerHTML = 'Loading, please wait...';

        console.log(DATA);
        displayAppointmentData(DATA);
    } catch (error) {
        console.error(error);
    }
});

function displayAppointmentData(data) {
    const appointmentContainer = document.querySelector('.appointment-container');
    appointmentContainer.innerHTML = '';

    const appointmentID = data.map(appointment => appointment.apptid);
    const patientID = data.map(appointment => appointment.pxid);
    const doctorID = data.map(appointment => appointment.doctorid);
    const appointmentType = data.map(appointment => appointment.type);
    const ifVirtual = data.map(appointment => appointment.Virtual);
    const appointmentStatus = data.map(appointment => appointment.status);
    const clinicID = data.map(appointment => appointment.clinicid);
    const hospitalName = data.map(appointment => appointment.hospitalname);
    const province = data.map(appointment => appointment.Province);
    const region = data.map(appointment => appointment.RegionName);
    const queueDate = data.map(appointment => appointment.QueueDate);
    const startTime = data.map(appointment => appointment.StartTime);
    const endTime = data.map(appointment => appointment.EndTime);

    if (data.length === 0) {
        appointmentContainer.innerHTML = 'No appointment found.';
    } else {
        data.forEach(appointment => {
            appointmentContainer.innerHTML = `
                Appointment ID: ${appointmentID}<br>
                Patient ID: ${patientID}<br>
                Doctor ID: ${doctorID}<br>
                Appointment Type: ${appointmentType}<br>
                Virtual?: ${ifVirtual}<br>
                Status: ${appointmentStatus}<br>
                <br>
                Clinic ID: ${clinicID}<br>
                Hospital Name: ${hospitalName}<br>
                Province: ${province}<br>
                Region: ${region}<br>
                <br>
                Queue Date: ${queueDate}<br>
                Start Time: ${startTime}<br>
                End Time: ${endTime}<br>
            `;
        });
    }
}