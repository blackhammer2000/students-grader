updateYear();

const allStudents =
  JSON.parse(localStorage.getItem("grading-students")).sort((a, b) =>
    a.name < b.name ? -1 : a.name > b.name ? 1 : 0
  ) || [];

if (allStudents) {
  const allStudentsHead = document.querySelector("[data-all-students-head]");
  const headersMap = {
    number: "NO.",
    name: "NAME",
    admission: "ADM NO.",
    course: "COURSE",
    gender: "GENDER",
  };
  renderTableHead(headersMap, allStudentsHead);

  const allStudentsTabelBody = document.querySelector("[data-all-students]");

  renderStudents(allStudents, allStudentsTabelBody);

  const studentsListRows = allStudentsTabelBody.querySelectorAll("tr");
  studentsListRows.forEach((row) => {
    row.addEventListener("click", (e) => {
      const admissionNumber = e.target.parentElement.children[2].innerText;
      const gradesHeadersBody = document.querySelector(
        "[data-student-grades-head]"
      );
      const gradesHeaders = {
        subject: "SUBJECT.",
        score: "SCORE(%)",
        rounded_score: "SCORE(^)",
        grade: "GRADE",
        date: "DATE",
      };
      const headers = gradesHeadersBody.querySelectorAll("th");
      if (!headers.length) {
        renderTableHead(gradesHeaders, gradesHeadersBody);
      }
      renderSelectedStudentGrades(admissionNumber, allStudents);
      changeNameBackground(e);
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

    const courseCell = document.createElement("td");
    courseCell.innerText = student.course;

    const genderCell = document.createElement("td");
    genderCell.innerText = student.gender;

    row.append(numberCell);
    row.append(nameCell);
    row.append(admissionNumberCell);
    row.append(courseCell);
    row.append(genderCell);

    fragment.append(row);
  });
  studentsTableBody.append(fragment);
}

function renderSelectedStudentGrades(admissionNumber, students) {
  const gradesTableBody = document.querySelector("[data-student-information]");

  const allRows = gradesTableBody.querySelectorAll("tr");
  allRows.forEach((row) => row.remove());

  const fragment = document.createDocumentFragment();
  const selectedStudent = students.find(
    (student) => student.id === admissionNumber
  );

  const units = selectedStudent.units;

  units.forEach((unit) => {
    const row = document.createElement("tr");
    row.classList.add("bg-light");

    const subjectCell = document.createElement("td");
    subjectCell.innerText = unit.title.toUpperCase();

    const rawScoreCell = document.createElement("td");
    rawScoreCell.innerText = unit.score ? unit.score : "null";

    const roundedScoreCell = document.createElement("td");
    roundedScoreCell.innerText = unit.rounded_score
      ? unit.rounded_score
      : "null";

    const gradeCell = document.createElement("td");
    gradeCell.innerText = unit.grade ? unit.grade : "null";

    const dateCell = document.createElement("td");
    dateCell.innerText = unit.date ? unit.date : "null";

    row.append(subjectCell);
    row.append(rawScoreCell);
    row.append(roundedScoreCell);
    row.append(gradeCell);
    row.append(dateCell);

    fragment.append(row);
  });

  gradesTableBody.append(fragment);
}

function changeNameBackground(e) {
  const allRows = e.target.parentElement.parentElement.querySelectorAll("tr");
  allRows.forEach((row) => {
    row.classList.remove("bg-white");
    row.classList.remove("font-weight-bold");
  });

  const nameRow = e.target.parentElement;
  nameRow.classList.add("bg-white");
  nameRow.classList.add("font-weight-bold");
}

function updateYear() {
  document.querySelector("[data-year]").innerText = new Date().getFullYear();
}
