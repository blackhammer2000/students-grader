const form = document.querySelector("form");
const showGrades = document.querySelector("[data-show-grades]");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.querySelector("[data-name]").value.toUpperCase();
  const email = document.querySelector("[data-email]").value;
  const admissionNumber = document.querySelector("[data-admission]").value;
  const course = document.querySelector("[data-course]").value.toUpperCase();
  const gender = document.querySelector("[data-gender]").value.toUpperCase();
  const units = Student.setUnits(course);

  const student = new Student(
    name,
    email,
    admissionNumber,
    course,
    gender,
    units
  );
  await Store.addStudentToLocalStorage(student);
});

showGrades.addEventListener("click", () => {
  if (localStorage.getItem("grading-students")) {
    setTimeout(() => {
      location.href = `../students_marks_display/marks_display.html`;
    }, 3000);
  }
});
