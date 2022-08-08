window.addEventListener("load", async () => {
  updateYear();
  await updateStudentLegend();
});

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const examDate = document.querySelector("[data-exam-date]").value;
  const subjectName = form
    .querySelector("[data-subject-name]")
    .value.toLowerCase();
  const subjectScore = parseInt(
    form.querySelector("[data-subject-score]").value
  );

  await Store.updateUnitScore(subjectName, subjectScore, examDate);

  Utilities.clearInputs();
});

function updateYear() {
  document.querySelector("[data-year]").innerText = new Date().getFullYear();
}

async function updateStudentLegend() {
  const selectedStudent = await Store.fetchSelectedStudent();
  const legend = document.querySelector("[data-student-legend]");
  legend.innerText = `ENTER SCORES FOR ${selectedStudent.name}, ADM NO. ${selectedStudent.id}`;
}
