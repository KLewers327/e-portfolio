const connectionText = "> Establishing connection...";
const welcomeText = " Welcome, I'm Kaylyn.";
const aboutText = "I'm a Frontend Software Engineer with a passion for creating visually stunning and user-friendly web applications.";

const terminalElement = document.getElementById("terminal-text");

let i = 0;

const typeWelcome = () => {
  if (i < welcomeText.length) {
    terminalElement.textContent += welcomeText[i++];
    setTimeout(typeWelcome, 50);
  } else {
    terminalElement.textContent += "\n";
    i = 0;
    typeAbout();
  }
};

const typeAbout = () => {
  if (i < aboutText.length) {
    terminalElement.textContent += aboutText[i++];
    setTimeout(typeAbout, 50);
  }
};

const deleteConnection = () => {
  if (terminalElement.textContent.length > 1) {
    terminalElement.textContent = terminalElement.textContent.slice(0, -1);
    setTimeout(deleteConnection, 30);
  } else {
    i = 0;
    typeWelcome();
  }
};

const typeConnection = () => {
  if (i < connectionText.length) {
    terminalElement.textContent += connectionText[i++];
    const isPause = terminalElement.textContent === ">";
    const isConnectionComplete = i === connectionText.length;
    setTimeout(
      isConnectionComplete ? deleteConnection : typeConnection,
      isPause ? 1500 : isConnectionComplete ? 1500 : 50
    );
  }
};


const projects = [
  {
    title: "Cyberpunk Portfolio",
    desc: "A futuristic portfolio website showcasing my skills and projects.",
    tags: ["HTML", "CSS", "JavaScript"]
  },
  {
    title: "Cyberpunk Terminal Typer Tool",
    desc: "A vanilla JavaScript engine that feeds data arrays into interactive typewriter terminal DOM slots.",
    tags: ["JavaScript", "BEM__naming", "CSS"]
  },
  {
    title: "Treact recreation",
    desc: "A recreation of a Treact static page with a focus on modern UI design.",
    tags: ["HTML", "CSS"]
  }
];


const displayProjects = () => {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  projects.forEach(proj => {
    grid.innerHTML += `
      <div class="projects__card">
        <h3 class="projects__card-title">${proj.title}</h3>
        <p class="projects__card-desc">${proj.desc}</p>
        <div class="projects__tags">
          ${proj.tags.map(t => `<span class="projects__tag">${t}</span>`).join('')}
        </div>
      </div>
    `;
  });
};

window.onload = () => {
  typeConnection();   
  displayProjects();
};
