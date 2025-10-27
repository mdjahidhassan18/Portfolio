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

/* -------------------- Publications -------------------- */
if (window.location.pathname.includes("about.html")) {
  // Fetch Publications
  fetch("http://localhost:1337/api/publications")
    .then(res => res.json())
    .then(data => {
      const container = document.querySelector("#publications");

      const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric"
        });
      };

      
      const sorted = data.data.sort((a, b) => {
        const dateA = a.PublishedDate ? new Date(a.PublishedDate) : new Date(0);
        const dateB = b.PublishedDate ? new Date(b.PublishedDate) : new Date(0);
        return dateB - dateA;
      });

      container.innerHTML = sorted.map(item => {
        const pub = item;
        return `
          <div class="publication-item">
            <h4>${pub.Name}</h4>
            <p><strong>Journal/Conference:</strong> ${pub.journalORconference || "N/A"}</p>
            <p><strong>Co-author(s):</strong> ${pub.coauthor || "N/A"}</p>
            <p><strong>Published Date:</strong> ${formatDate(pub.PublishedDate)}</p>
            <p><strong>Reference:</strong> ${pub.reference || ""}</p>
          </div>
        `;
      }).join("");
    })
    .catch(err => console.error("Error fetching publications:", err));
}



/* -------------------- CV Section -------------------- */
if (window.location.pathname.includes("about.html")) {
  async function fetchCV() {
    try {
      const res = await fetch("http://localhost:1337/api/cvs?populate=*");
      const data = await res.json();
      const cvData = data.data[0];
      const cvLink = document.getElementById("cv-download");

      if (cvData && cvData.file && cvData.file.url) {
        // Combine base URL with file path
        const fileUrl = cvData.file.url.startsWith("http")
          ? cvData.file.url
          : `http://localhost:1337${cvData.file.url}`;

        cvLink.href = fileUrl;
        cvLink.textContent = cvData.file.name || "Download CV";
        cvLink.classList.remove("disabled");
      } else {
        cvLink.textContent = "CV not available";
        cvLink.classList.add("disabled");
      }
    } catch (err) {
      console.error("Error fetching CV:", err);
    }
  }

  fetchCV();
}

/* -------------------- 3. Projects Page -------------------- */
if (window.location.pathname.includes("projects.html")) {
  fetch("http://localhost:1337/api/projects")
    .then(res => res.json())
    .then(data => {
      console.log("Fetched projects:", data);
      const container = document.querySelector("#projects-container");
      if (!container) return;

      if (!data.data || data.data.length === 0) {
        container.innerHTML = "<p style='color:#888;text-align:center;'>No projects found.</p>";
        return;
      }

      // ✅ Create project list
      container.innerHTML = data.data.map(item => {
        const p = item;
        return `
          <div class="project-item">
            <h2>${p.Name || "Untitled Project"}</h2>
            <p><strong>Finished:</strong> ${
              p.DateofFinish
                ? new Date(p.DateofFinish).toLocaleDateString("en-GB")
                : "N/A"
            }</p>
            <a href="project-details.html?id=${p.id}" class="btn">View Details</a>
          </div>
        `;
      }).join("");
    })
    .catch(err => {
      console.error("Error fetching projects:", err);
      document.querySelector("#projects-container").innerHTML =
        "<p style='color:red;text-align:center;'>Failed to load projects. Check console.</p>";
    });
}


/* -------------------- 3.1 Project Details Page -------------------- */

// 🧩 1️⃣ Get the project ID from URL
const params = new URLSearchParams(window.location.search);
const projectId = params.get("id");
const container = document.getElementById("project-details");

// 🧩 2️⃣ Fetch project by ID (with all related media)
if (projectId) {
  fetch("http://localhost:1337/api/projects?populate=*")
    .then(res => res.json())
    .then(data => {
      const projects = data.data;
      const project = projects.find(p => p.id == projectId);

      if (!project) {
        container.innerHTML =
          "<p style='color:red;text-align:center;'>Project not found.</p>";
        return;
      }

      const baseURL = "http://localhost:1337";

      // ✅ Handle FinishedImage (array)
      const finishedImages =
        project.FinishedImage?.map(img =>
          img.url.startsWith("http") ? img.url : baseURL + img.url
        ) || [];

      // ✅ Handle ModelAndCircuitDiagram (array or single)
      const modelImages =
        project.ModelAndCircuitDiagram?.map(img =>
          img.url.startsWith("http") ? img.url : baseURL + img.url
        ) || [];

      // 🖼️ Slideshow HTML for Finished Images
      const slideshowHTML =
        finishedImages.length > 0
          ? `
          <div class="slideshow-container">
            ${finishedImages
              .map(
                (img, i) => `
              <div class="mySlides fade">
                <div class="numbertext">${i + 1} / ${finishedImages.length}</div>
                <img src="${img}" style="width:100%">
                <div class="text">Finished Project Image ${i + 1}</div>
              </div>`
              )
              .join("")}

            <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
            <a class="next" onclick="plusSlides(1)">&#10095;</a>
          </div>

          <div style="text-align:center">
            ${finishedImages
              .map(
                (_, i) =>
                  `<span class="dot" onclick="currentSlide(${i + 1})"></span>`
              )
              .join("")}
          </div>
        `
          : "";

      // 🧩 Model & Circuit Diagram Section
      const modelDiagramHTML =
        modelImages.length > 0
          ? `
        <div class="project-section">
          <h3>Model & Circuit Diagram</h3>
          <div class="project-images">
            ${modelImages
              .map(
                img => `
              <div class="image-box">
                <img src="${img}" alt="Model Diagram" loading="lazy">
              </div>`
              )
              .join("")}
          </div>
        </div>`
          : "";

      // 🎨 Render project
      container.innerHTML = `
        <div class="project-details-wrapper">
          <div class="project-header">
            <h1>${project.Name}</h1>
            <p class="project-date">
              ${
                project.DateofFinish
                  ? `Finished: ${new Date(
                      project.DateofFinish
                    ).toLocaleDateString("en-GB")}`
                  : "Ongoing Project"
              }
            </p>
          </div>

          ${slideshowHTML}

          <div class="project-content-box">
            <div class="project-section">
              <h3>Objective</h3>
              <p>${project.Objective || "Not specified"}</p>
            </div>

            <div class="project-section">
              <h3>Background & Motivation</h3>
              <p>${project.ProjectBackgroundMotivation || "No details available"}</p>
            </div>

            <div class="project-section">
              <h3>Methodology / Working Principle</h3>
              <p>${project.MethodologyWorkingPrinciple || "No information"}</p>
            </div>

            <div class="project-section">
              <h3>Tools & Technologies Used</h3>
              <p>${project.ToolsAndTechnologiesUsed || "N/A"}</p>
            </div>

            ${modelDiagramHTML}

            <div class="project-section">
              <h3>Program Code</h3>
              <pre class="code-block">${project.ProgramCode || "No code provided"}</pre>
            </div>

            <div class="project-section">
              <h3>Results / Achievements</h3>
              <p>${project.ResultsOutcomeAchievements || "No results available"}</p>
            </div>

            <div class="project-section">
              <h3>Challenges Faced</h3>
              <p>${project.ChallengesFaced || "Not mentioned"}</p>
            </div>
          </div>

          <div class="back-btn-container">
            <a href="projects.html" class="btn back-btn">← Back to Projects</a>
          </div>
        </div>
      `;

      // Initialize slideshow after HTML renders
      initSlideshow();
    })
    .catch(err => {
      console.error("Error fetching project:", err);
      container.innerHTML =
        "<p style='color:red;text-align:center;'>Error loading details.</p>";
    });
} else {
  container.innerHTML =
    "<p style='color:red;text-align:center;'>No project ID found in URL.</p>";
}

// 🧩 3️⃣ Slideshow Logic
function initSlideshow() {
  let slideIndex = 1;
  showSlides(slideIndex);

  window.plusSlides = function (n) {
    showSlides((slideIndex += n));
  };

  window.currentSlide = function (n) {
    showSlides((slideIndex = n));
  };

  function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");
    if (slides.length === 0) return;

    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    if (dots.length > 0) dots[slideIndex - 1].className += " active";
  }
}


/* -------------------- 4. Others-------------------- */
