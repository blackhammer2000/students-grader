class Store {
  static getStudents() {
    let students;
    if (localStorage.getItem("grading-students") === null) {
      students = [];
    } else {
      const studentsDatabase = localStorage.getItem("grading-students");
      students = JSON.parse(studentsDatabase);
    }

    return students;
  }

  static async addStudentToLocalStorage(student) {
    const students = await Store.getStudents();
    students.push(student);

    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => (input.value = ""));

    localStorage.setItem("grading-students", JSON.stringify(students));
  }
}

class Student {
  constructor(name, email, id, course, gender) {
    (this.name = name),
      (this.email = email),
      (this.id = id),
      (this.course = course),
      (this.gender = gender),
      (this.date = this.createDate()),
      (this.units = []);
  }

  createDate() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  grade(score) {
    let grade;
    const above70 = score >= 70 && score <= 100;
    const above60 = score >= 60 && score < 70;
    const above50 = score >= 50 && score < 60;
    const above40 = score >= 40 && score < 50;
    const below40 = score >= 0 && score < 40;

    switch (above70 || above60 || above50 || above40 || below40) {
      case above70 === true:
        grade = "A";
        break;
      case above60 === true:
        grade = "B";
        break;
      case above50 === true:
        grade = "C";
        break;
      case above40 === true:
        grade = "D";
        break;
      case below40 === true:
        grade = "F";
    }
    return `${this.firstName} ${this.secondName} scored ${grade}.`;
  }
}

const form = document.querySelector("form");
const showGrades = document.querySelector("[data-show-grades]");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.querySelector("[data-name]").value.toUpperCase();
  const email = document.querySelector("[data-email]").value;
  const admissionNumber = document.querySelector("[data-admission]").value;
  const course = document.querySelector("[data-course]").value.toUpperCase();
  const gender = document.querySelector("[data-gender]").value.toUpperCase();

  const student = new Student(name, email, admissionNumber, course, gender);
  await Store.addStudentToLocalStorage(student);
});

showGrades.addEventListener("click", () => {
  if (localStorage.getItem("grading-students")) {
    setTimeout(() => {
      location.href = `../students_marks_display/marks_display.html`;
    }, 3000);
  }
});
