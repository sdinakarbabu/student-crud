const API_URL = 'http://localhost:3000/students';
const studentTable = document.getElementById('studentTable');
const studentForm = document.getElementById('studentForm');
const studentIdField = document.getElementById('studentId');

let editingStudentId = null;

async function fetchStudents() {
    const res = await fetch(API_URL);
    const students = await res.json();
    studentTable.innerHTML = students.map(student => `
        <tr>
            <td>${student.name}</td>
            <td>${student.roll_number}</td>
            <td>${student.course}</td>
            <td>
                <button class="btnChange" style="margin-right: 15px;" onclick="editStudent(${student.id}, '${student.name}', '${student.roll_number}', '${student.course}')">Edit</button>
                <button class="btnChange" onclick="deleteStudent(${student.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Handle form submit for both adding and updating
studentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const rollNumber = document.getElementById('rollNumber').value;
    const course = document.getElementById('course').value;

    if (editingStudentId) {
        // Update the student
        await fetch(`${API_URL}/${editingStudentId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, roll_number: rollNumber, course })
        });
        editingStudentId = null;  // Reset editing mode
    } else {
        // Add a new student
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, roll_number: rollNumber, course })
        });
    }

    // Reset form and refetch student list
    studentForm.reset();
    fetchStudents();
});

// Edit student function
function editStudent(id, name, roll_number, course) {
    editingStudentId = id;  // Store the ID of the student being edited
    studentIdField.value = id;  // Set the ID field (hidden)
    document.getElementById('name').value = name;
    document.getElementById('rollNumber').value = roll_number;
    document.getElementById('course').value = course;
}

// Delete student function
async function deleteStudent(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchStudents();
}

fetchStudents();
