document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('studentForm');
    const updateForm = document.getElementById('updateStudentForm');
    const fetchButton = document.getElementById('fetchStudent');
    const updateButton = document.getElementById('updateStudent');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const studentID = document.getElementById('studentID').value;
        const studentName = document.getElementById('studentName').value;
        const course = document.getElementById('course').value;

        const studentData = { studentID, studentName, course };

        try {
            const response = await fetch('http://localhost:8080/student', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(studentData)
            });

            const result = await response.json();
            displayMessage(response.status, result.message);
        } catch (error) {
            displayMessage(500, 'Network error or server issue. Please try again later.');
        }
    });

    fetchButton.addEventListener('click', async () => {
        const studentID = document.getElementById('updateStudentID').value;
        if (!studentID) {
            displayMessage(400, 'Please enter a Student ID to fetch.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/student/${studentID}`);
            if (response.ok) {
                const student = await response.json();
                document.getElementById('updateStudentName').value = student.studentName;
                document.getElementById('updateCourse').value = student.course;
                updateButton.disabled = false;
            } else {
                displayMessage(response.status, 'Student not found.');
            }
        } catch (error) {
            displayMessage(500, 'Error fetching student details.');
        }
    });

    updateButton.addEventListener('click', async () => {
        const studentID = document.getElementById('updateStudentID').value;
        const studentName = document.getElementById('updateStudentName').value;
        const course = document.getElementById('updateCourse').value;
    
        const studentData = { studentID, studentName, course }; // Send ID in body
    
        try {
            const response = await fetch(`http://localhost:8080/student/update`, { // No ID in URL
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(studentData)
            });
    
            const result = await response.json();
            displayMessage(response.status, result.message);
        } catch (error) {
            displayMessage(500, 'Error updating student details.');
        }
    });
    

    function displayMessage(status, message) {
        const messageDiv = document.getElementById('responseMessage');
        messageDiv.textContent = message;
        messageDiv.style.color = status === 201 || status === 200 ? 'green' : 'red';
    }
});
