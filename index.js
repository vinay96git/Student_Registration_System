var selectedRow = null;

document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
});

function onFormSubmit(e) {
    e.preventDefault();
    var formData = readFormData();
    if (selectedRow === null) {
        insertNewRecord(formData);
    } else {
        updateRecord(formData);
    }
    resetForm();
    saveToLocalStorage();
}

// Retrieve the data
function readFormData() {
    var formData = {};
    formData["name"] = document.getElementById("name").value;
    formData["id"] = document.getElementById("id").value;
    formData["email"] = document.getElementById("email").value;
    formData["contact"] = document.getElementById("contact").value;
    return formData;
}

// Insert record function
function insertNewRecord(data) {
    var table = document.getElementById("registeredInfo").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.name;
    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.id;
    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.email;
    var cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.contact;
    var cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<button onclick='onEdit(this)'>Edit</button> <button onClick='onDelete(this)'>Delete</button>`;
}

// To update record
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.name;
    selectedRow.cells[1].innerHTML = formData.id;
    selectedRow.cells[2].innerHTML = formData.email;
    selectedRow.cells[3].innerHTML = formData.contact;
    selectedRow = null;
}

// Edit the data
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById('name').value = selectedRow.cells[0].innerHTML;
    document.getElementById('id').value = selectedRow.cells[1].innerHTML;
    document.getElementById('email').value = selectedRow.cells[2].innerHTML;
    document.getElementById('contact').value = selectedRow.cells[3].innerHTML;
}

// Delete the data
function onDelete(td) {
    if (confirm('Do you want to delete this record?')) {
        row = td.parentElement.parentElement;
        document.getElementById('registeredInfo').deleteRow(row.rowIndex);
        saveToLocalStorage();
    }
    resetForm();
}

// Reset the form
function resetForm() {
    document.getElementById('name').value = '';
    document.getElementById('id').value = '';
    document.getElementById('email').value = '';
    document.getElementById('contact').value = '';
    selectedRow = null;
}

// Save data to local storage
function saveToLocalStorage() {
    var table = document.getElementById("registeredInfo").getElementsByTagName('tbody')[0];
    var rows = table.getElementsByTagName('tr');
    var records = [];
    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName('td');
        var record = {
            name: cells[0].innerHTML,
            id: cells[1].innerHTML,
            email: cells[2].innerHTML,
            contact: cells[3].innerHTML
        };
        records.push(record);
    }
    localStorage.setItem('records', JSON.stringify(records));
}

// Load data from local storage
function loadFromLocalStorage() {
    var storedRecords = localStorage.getItem('records');
    if (storedRecords) {
        var records = JSON.parse(storedRecords);
        for (var i = 0; i < records.length; i++) {
            insertNewRecord(records[i]);
        }
    }
}