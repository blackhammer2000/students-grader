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

  static fetchSelectedStudent() {
    let selectedStudent = null;
    if (localStorage.getItem("grading-students-selected-student") === null) {
      selectedStudent = {};
    } else {
      selectedStudent = JSON.parse(
        localStorage.getItem("grading-students-selected-student")
      );
    }

    return selectedStudent;
  }

  static async fetchUnits(admissionNumber) {
    const students = await Store.getStudents();
    const selectedStudent =
      students.find((student) => student.id == admissionNumber) ||
      "No student found";

    console.log(selectedStudent);

    if (typeof selectedStudent === "string") {
      return selectedStudent;
    } else {
      localStorage.setItem(
        "grading-students-selected-student",
        JSON.stringify(selectedStudent)
      );
      return selectedStudent.units;
    }
  }

  static async addStudentToLocalStorage(student) {
    const students = await Store.getStudents();
    students.push(student);

    Utilities.clearInputs();

    localStorage.setItem("grading-students", JSON.stringify(students));
  }

  static async updateUnitScore(unitName, unitScore, dateTaken) {
    const students = await Store.getStudents();
    const selectedStudent = await Store.fetchSelectedStudent();
    const selectedStudentUnits = selectedStudent.units;
    const roundedScore = Grader.roundScore(unitScore);

    selectedStudentUnits.forEach((unit) => {
      if (unit.title === unitName) {
        unit.score = unitScore;
        unit.date = dateTaken;
        unit.rounded_score = roundedScore;
        unit.grade = Grader.grade(roundedScore);
      }
    });

    students.forEach((student, index) => {
      if (
        student.name === selectedStudent.name &&
        student.id === selectedStudent.id
      ) {
        students.splice(index, 1, selectedStudent);
      }
    });

    localStorage.setItem("grading-students", JSON.stringify(students));
    localStorage.setItem(
      "grading-students-selected-student",
      JSON.stringify(selectedStudent)
    );
  }
}

class UserInterface {
  static async renderSelectedStudentGrades(admissionNumber) {
    const units = await Store.fetchUnits(admissionNumber);
    if (units && units.length && units !== "string") {
      const tableBody = document.querySelector("tbody");
      const fragment = document.createDocumentFragment();

      console.log(Array.isArray(units));

      Utilities.clearTableBody();

      units.forEach((unit) => {
        const tableRow = document.createElement("tr");

        const firstCell = document.createElement("td");
        firstCell.classList.add("font-weight-normal");
        const firstCellText = document.createTextNode(unit.title.toUpperCase());
        firstCell.append(firstCellText);

        const secondCell = document.createElement("td");
        const secondText = document.createTextNode(unit.score);
        secondCell.append(secondText);

        const thirdCell = document.createElement("td");
        const thirdCellText = document.createTextNode(unit.rounded_score);
        thirdCell.append(thirdCellText);

        const forthCell = document.createElement("td");
        const forthCellText = document.createTextNode(unit.grade);
        forthCell.append(forthCellText);

        tableRow.append(firstCell);
        tableRow.append(secondCell);
        tableRow.append(thirdCell);
        tableRow.append(forthCell);

        fragment.append(tableRow);
      });

      tableBody.append(fragment);
    } else {
      console.log(units);
      alert(`${units}`);
    }
  }

  static async updateStudentDescription() {
    const selectedStudent = await Store.fetchSelectedStudent();
    const studentDescription = document.querySelector(
      "[data-student-description]"
    );

    studentDescription.parentElement.classList.add("border");

    if (selectedStudent) {
      const description = `${selectedStudent.name}, ADM NO: ${
        selectedStudent.id
      } GRADES FOR THE EXAM FOR ${new Date().toLocaleDateString()}`;
      studentDescription.innerText = description;
    } else {
      alert(
        `please select a valid student by searching for a valid admission number.`
      );
    }
  }

  static async setTableState() {
    const selectedStudent = await Store.fetchSelectedStudent();
    UserInterface.updateStudentDescription();
    UserInterface.renderSelectedStudentGrades(selectedStudent.id);
  }
}

class Student {
  constructor(name, email, id, course, gender, units) {
    (this.name = name),
      (this.email = email),
      (this.id = id),
      (this.course = course),
      (this.gender = gender),
      (this.date = new Date().toLocaleString()),
      (this.units = units);
  }

  static setUnits(course) {
    let units = null;
    switch (course.toLowerCase()) {
      case "software-development":
        const softwareUnits = [
          "html",
          "css",
          "javascript",
          "reactjs",
          "angularjs",
          "vuejs",
          "nodejs",
          "python",
          "django",
          "flask",
          "php",
          "laravel",
          "java",
          "springboot",
          "git",
        ];
        units = this.createUnits(softwareUnits);
        break;
      case "cyber-security":
        const cyberUnits = [
          "html",
          "css",
          "javascript",
          "linux",
          "bash",
          "data_laws",
          "data_security",
          "pen_testing",
          "ethical_hacking",
          "sql_injection",
          "network_security",
        ];
        units = Student.createUnits(cyberUnits);
        break;

      case "database-administrator":
        const databaseAdminUnits = [];
        break;

      default:
        units = {};
        break;
    }
    return units;
  }

  static createUnits(units) {
    let mappedUnits = [];
    units.forEach((unit) => {
      mappedUnits.push({
        title: unit,
        grade: null,
        score: null,
        rounded_score: null,
        date: null,
      });
    });
    return mappedUnits;
  }
}

class Grader {
  static grade(score) {
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
    return grade;
  }

  static roundScore(score) {
    const modulo = score % 5;
    const previousMultiple = score - modulo;
    const nextMultiple = previousMultiple + 5;
    const difference = nextMultiple - score;

    const finalScore = difference < 3 ? nextMultiple : score;

    return finalScore;
  }
}

class Utilities {
  static clearInputs() {
    const inputs = document.querySelectorAll("form input");
    inputs.forEach((input) => (input.value = ""));
  }

  static clearTableBody() {
    const rows = document.querySelectorAll("tbody tr");
    rows.forEach((row) => row.remove());
  }
}
