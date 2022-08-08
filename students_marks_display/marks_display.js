window.addEventListener("load", async () => {
  updateYear();
  await UserInterface.setTableState();
});

const form = document.querySelector("form");
const addScoresButton = document.querySelector("[data-add-scores]");

form.addEventListener("submit", (e) => {
  const admissionNumber = parseInt(
    document.querySelector("[data-search-admission]").value
  );

  if (admissionNumber && typeof admissionNumber === "number") {
    UserInterface.updateStudentDescription();
    UserInterface.renderSelectedStudentGrades(admissionNumber);
    Utilities.clearInputs();
  }
});

addScoresButton.addEventListener("click", () => {
  if (localStorage.getItem("grading-students-selected-student")) {
    location.assign("../student_marks_assignment/marks_assignment.html");
  }
});

function updateYear() {
  document.querySelector("[data-year]").innerText = new Date().getFullYear();
}
