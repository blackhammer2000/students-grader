const gradesTableBody = document.querySelector("[data-student-information]");

const allStudents = JSON.parse(localStorage.getItem("grading-students")) || [];

if (allStudents) {
  const allStudentsHead = document.querySelector("[data-all-students-head]");
  const headersMap = {
    number: "NO.",
    name: "NAME",
    admission: "ADM NO.",
  };
  renderTableHead(headersMap, allStudentsHead);

  const allStudentsTabelBody = document.querySelector("[data-all-students]");

  renderStudents(allStudents, allStudentsTabelBody);

  const studentsListRows = allStudentsTabelBody.querySelectorAll("tr");
  studentsListRows.forEach((row) => {
    row.addEventListener("click", (e) => {
      const admissionNumber = e.target.parentElement.children[2].innerText;
      renderGradesBody();
    });
  });
}

// UTILITY FUNCTION///////

function renderTableHead(headers, headerBody) {
  const fragment = document.createDocumentFragment();

  for (let header in headers) {
    const cell = document.createElement("th");
    cell.innerText = headers[header];
    fragment.append(cell);
  }

  headerBody.append(fragment);
}

function renderStudents(students, studentsTableBody) {
  const fragment = document.createDocumentFragment();

  students.forEach((student, index) => {
    const row = document.createElement("tr");
    const numberCell = document.createElement("td");
    numberCell.innerText = index + 1;

    const nameCell = document.createElement("td");
    nameCell.innerText = student.name;
    const admissionNumberCell = document.createElement("td");
    admissionNumberCell.innerText = student.id;
    row.append(numberCell);
    row.append(nameCell);
    row.append(admissionNumberCell);

    fragment.append(row);
  });
  studentsTableBody.append(fragment);
}
