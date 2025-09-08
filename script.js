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

/* -------------------- 2. About Section (Education, Experience, Skills, Projects from Strapi) -------------------- */
/* -------------------- Education -------------------- */
if (window.location.pathname.includes("about.html")) {
  // Fetch Education
  fetch("http://localhost:1337/api/educations")
    .then(res => res.json())
    .then(data => {
      const container = document.querySelector("#education");

      // Format date function
      const formatDate = (dateStr, isEnd = false) => {
        if (!dateStr && isEnd) return "Present";
        if (!dateStr) return "";
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric"
        });
      };

      // Sort by EndDate (most recent first)
      const sorted = data.data.sort((a, b) => {
        const endA = a.EndDate ? new Date(a.EndDate) : new Date(); // if null, treat as ongoing
        const endB = b.EndDate ? new Date(b.EndDate) : new Date();
        return endB - endA; // descending
      });

      // Render HTML
      container.innerHTML = sorted.map(item => {
        const edu = item;
        return `
          <div class="education-item">
            <p>${edu.InstitutionName}</p>
            <p><strong>Degree/Certificate : </strong> ${edu.Degree}</p>
            <p><strong>Field of Study:</strong> ${edu.FieldofStudy}</p>
            <p><strong>Duration:</strong> ${formatDate(edu.StartDate)} to ${formatDate(edu.EndDate, true)}</p>
            <p><strong>Location:</strong> ${edu.location}</p>
          </div>
        `;
      }).join("");
    })
    .catch(err => console.error("Error fetching education:", err));
}

/* -------------------- Experiences -------------------- */
if (window.location.pathname.includes("about.html")) {
  // Fetch Experience
  fetch("http://localhost:1337/api/experiences")
    .then(res => res.json())
    .then(data => {
      const container = document.querySelector("#about-experience");

      // Format date function
      const formatDate = (dateStr, isEnd = false) => {
        if (!dateStr && isEnd) return "Present";
        if (!dateStr) return "";
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric"
        });
      };

      // Duration calculator (years & months)
      const getDuration = (start, end) => {
        if (!start) return "";
        const startDate = new Date(start);
        const endDate = end ? new Date(end) : new Date(); // if null, ongoing

        let years = endDate.getFullYear() - startDate.getFullYear();
        let months = endDate.getMonth() - startDate.getMonth();

        if (months < 0) {
          years--;
          months += 12;
        }

        let result = "";
        if (years > 0) result += `${years} year${years > 1 ? "s" : ""} `;
        if (months > 0) result += `${months} month${months > 1 ? "s" : ""}`;
        return result.trim();
      };

      // Sort by EndDate (most recent first)
      const sorted = data.data.sort((a, b) => {
        const endA = a.endDate ? new Date(a.endDate) : new Date();
        const endB = b.endDate ? new Date(b.endDate) : new Date();
        return endB - endA;
      });

      // Render HTML
      container.innerHTML = sorted.map(item => {
        const exp = item;
        return `
          <div class="experience-item">
            <p class="company-name">${exp.company}</p>
            <p><strong>Position:</strong> ${exp.title}</p>
            <p><strong>Duration:</strong> ${formatDate(exp.startDate)} to ${formatDate(exp.endDate, true)} 
              <em>(${getDuration(exp.startDate, exp.endDate)})</em>
            </p>
            <p><strong>Location:</strong> ${exp.location}</p>
            <p><strong>Description:</strong> ${exp.description}</p>
            <p><strong>Website: </strong>${exp.WebSite}</p>
          </div>
        `;
      }).join("");
    })
    .catch(err => console.error("Error fetching experiences:", err));
}


/* -------------------- 3. Projects Section -------------------- */
if (window.location.pathname.includes("projects.html")) {
  fetch("http://localhost:1337/api/projects")
    .then(res => res.json())
    .then(data => {
      const container = document.querySelector("#projects-container");

      container.innerHTML = data.data.map(item => {
        const project = item;

        return `
          <div class="project-item">
            <h2>${project.Name}</h2>
            <p><strong>Finished:</strong> ${new Date(project.DateofFinish).toLocaleDateString("en-GB")}</p>
            <button class="btn view-details">View Details</button>
            
            <div class="project-details hidden">
              <p><strong>Objective:</strong> ${project.Objective}</p>
              <p><strong>Background:</strong> ${project.ProjectBackgroundMotivation}</p>
              <p><strong>Tools & Tech:</strong> ${project.ToolsAndTechnologiesUsed}</p>
              <p><strong>Achievements:</strong> ${project.ResultsOutcomeAchievements}</p>
              <p><strong>Challenges:</strong> ${project.ChallengesFaced}</p>
            </div>
          </div>
        `;
      }).join("");

      // Toggle details on button click
      document.querySelectorAll(".view-details").forEach((btn, index) => {
        btn.addEventListener("click", () => {
          const details = btn.nextElementSibling;
          details.classList.toggle("hidden");
          btn.textContent = details.classList.contains("hidden")
            ? "View Details"
            : "Hide Details";
        });
      });
    })
    .catch(err => console.error("Error fetching projects:", err));
}
