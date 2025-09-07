/* -------------------- 1. Home Section -------------------- */
// Typed.js effect for home page
if (window.location.pathname.includes("index.html")) {
  var typed = new Typed(".mulitple-text", {
    strings: ["Mechanical Engineer....", "CAD Designer....", "Learner...."],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
  });
}

/* -------------------- 2. About Section -------------------- */
if (window.location.pathname.includes("about.html")) {
  fetch("about.json")
    .then(response => response.json())
    .then(data => {
      // Bio
      document.getElementById("about-bio").innerHTML = `<p>${data.bio}</p>`;

      // Education
      document.getElementById("about-education").innerHTML = `<p>${data.education}</p>`;

      // Skills
      document.getElementById("about-skills").innerHTML =
        data.skills.map(skill => `<li>${skill}</li>`).join("");

      // Experience
      document.getElementById("about-experience").innerHTML = `<p>${data.experience}</p>`;

      // Publications
      document.getElementById("about-publications").innerHTML =
        data.publications.map(pub => `<li>${pub}</li>`).join("");
    })
    .catch(error => console.error("Error loading about.json:", error));
}

/* -------------------- 3. Projects Section -------------------- */
if (window.location.pathname.includes("projects.html")) {
  fetch("projects.json")
    .then(response => response.json())
    .then(projects => {
      const container = document.querySelector(".projects-grid");
      container.innerHTML = projects.map(project => `
        <div class="project-item">
          <h2>${project.title}</h2>
          <p>${project.description}</p>
          <a href="${project.link}" class="btn" target="_blank">View Project</a>
        </div>
      `).join("");
    })
    .catch(error => console.error("Error loading projects.json:", error));
}



/* -------------------- Redirect Login to Admin Panel -------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Demo login (replace with your own email/password)
      if (email === "admin@example.com" && password === "1234") {
        sessionStorage.setItem("isLoggedIn", "true");
        window.location.href = "admin.html"; 
      } else {
        alert("Invalid credentials!");
      }
    });
  }
});



/* -------------------- Save Data to LocalStorage -------------------- */

function addExperience() {
  let exp = document.getElementById("exp-input").value;
  if (exp) {
    let exps = JSON.parse(localStorage.getItem("experience")) || [];
    exps.push(exp);
    localStorage.setItem("experience", JSON.stringify(exps));
    alert("Experience added!");
  }
}

function addProject() {
  let title = document.getElementById("proj-title").value;
  let desc = document.getElementById("proj-desc").value;
  if (title && desc) {
    let projects = JSON.parse(localStorage.getItem("projects")) || [];
    projects.push({ title, desc });
    localStorage.setItem("projects", JSON.stringify(projects));
    alert("Project added!");
  }
}


/* -------------------- Load Data into About Page -------------------- */
document.addEventListener("DOMContentLoaded", () => {
  // Load Education
  let educations = JSON.parse(localStorage.getItem("education")) || [];
  let eduDiv = document.getElementById("education");
  educations.forEach(e => {
    let p = document.createElement("p");
    p.textContent = e;
    eduDiv.appendChild(p);
  });

  // Load Skills
  let skills = JSON.parse(localStorage.getItem("skills")) || [];
  let skillsUl = document.getElementById("skills");
  skills.forEach(s => {
    let li = document.createElement("li");
    li.textContent = s;
    skillsUl.appendChild(li);
  });

  // Load Experience
  let experiences = JSON.parse(localStorage.getItem("experience")) || [];
  let expDiv = document.getElementById("about-experience");
  experiences.forEach(ex => {
    let p = document.createElement("p");
    p.textContent = ex;
    expDiv.appendChild(p);
  });

  // Load Projects
  let projects = JSON.parse(localStorage.getItem("projects")) || [];
  let projDiv = document.getElementById("about-publications");
  projects.forEach(proj => {
    let li = document.createElement("li");
    li.textContent = proj.title + " - " + proj.desc;
    projDiv.appendChild(li);
  });
});



//logs

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("Login form submitted ✅");

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === "admin@example.com" && password === "1234") {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "admin.html"; 
    } else {
      alert("Invalid credentials!");
    }
  });
}
