const connectionText = "> Establishing connection...";
const welcomeIntroText = " Welcome, I'm ";
const welcomeNameText = "Kaylyn.";
const aboutIntroText = "I'm a ";
const aboutRoleText = "Frontend Software Engineer";
const aboutSuffixText = " with a passion for creating visually stunning and user-friendly web applications.";

let i = 0;

const typeSegment = (element, text, onComplete, index = 0) => {
  if (index < text.length) {
    element.textContent += text[index];
    setTimeout(() => typeSegment(element, text, onComplete, index + 1), 50);
  } else if (onComplete) {
    onComplete();
  }
};

const typeWelcome = () => {
  const welcomeIntro = document.getElementById("welcome-intro");
  const welcomeName = document.getElementById("welcome-name");
  const aboutIntro = document.getElementById("about-intro");
  const aboutRole = document.getElementById("about-role");
  const aboutSuffix = document.getElementById("about-suffix");

  typeSegment(welcomeIntro, welcomeIntroText, () => {
    typeSegment(welcomeName, welcomeNameText, () => {
      aboutIntro.textContent = "\n";
      typeSegment(aboutIntro, aboutIntroText, () => {
        typeSegment(aboutRole, aboutRoleText, () => {
          typeSegment(aboutSuffix, aboutSuffixText);
        });
      });
    });
  });
};

const deleteConnection = () => {
  const connectionElement = document.getElementById("connection-text");

  if (connectionElement.textContent.length > 1) {
    connectionElement.textContent = connectionElement.textContent.slice(0, -1);
    setTimeout(deleteConnection, 30);
  } else {
    i = 0;
    typeWelcome();
  }
};

const typeConnection = () => {
  const connectionElement = document.getElementById("connection-text");

  if (i < connectionText.length) {
    connectionElement.textContent += connectionText[i++];
    const isPause = connectionElement.textContent === ">";
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

const modalData = {
  about: {
    title: "> ACCESSING_BIOMETRICS...",
    text: "Hello, I am Kaylyn. I am a passionate Frontend Software Engineer dedicated to architecting highly visible, accessible, and clean digital experiences. Skilled in HTML, CSS, and modern shorthand JavaScript architectures.\n\n> Launch project? Transmit payload below.",
  },
  contact: {
    title: "> ESTABLISHING_COMMS...",
    text: "Connection parameters active. Drop me a line or track my source repositories to collaborate on upcoming engineering builds. Terminal Node: active."
  }
};

const toggleModal = (view) => {
  const modal = document.getElementById("info-modal");
  const form = document.getElementById("modal-form");
  if (!modal || !form) return;

  if (view) {
    document.getElementById("modal-title").textContent = modalData[view].title;
    document.getElementById("modal-content").textContent = modalData[view].text;
    
    form.classList.remove("modal__form--hidden");
    
    modal.classList.add("modal--visible");
  } else {
    modal.classList.remove("modal--visible");
  }
};


const setupNavListeners = () => {
  // Update these selectors if your nav items use unique classes
  const aboutBtn = document.querySelector('a[href="#about"]');
  const contactBtn = document.querySelector('a[href="#contact"]');
  const closeBtn = document.getElementById("modal-close");
  const hero = document.querySelector(".hero");

  if (aboutBtn) aboutBtn.onclick = (e) => { e.preventDefault(); toggleModal('about'); };
  if (contactBtn) contactBtn.onclick = (e) => { e.preventDefault(); toggleModal('contact'); };
  if (closeBtn) closeBtn.onclick = () => toggleModal();
  if (hero) {
    hero.addEventListener("click", () => toggleModal("contact"));
    hero.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleModal("contact");
      }
    });
  }
  
  window.onclick = (e) => { if (e.target.id === "info-modal") toggleModal(); };
};

const resetFormNode = () => {
  const form = document.getElementById("modal-form");
  if (!form) return;

  form.reset();
  setTimeout(() => toggleModal(), 2000);
};

const setupFormListener = () => {
  const form = document.getElementById("modal-form");
  const content = document.getElementById("modal-content");
  if (!form || !content) return;

  form.onsubmit = async (e) => {
    e.preventDefault();

    content.textContent = "> TRANSMITTING PAYLOAD DATA PACKET...";
    content.className = "modal__text modal__text--loading";
    form.classList.add("modal__form--hidden");

    await fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    content.textContent = "[ SUCCESS: TRANSMISSION_COMPLETE_ ]";
    content.className = "modal__text modal__text--success";

    resetFormNode(); 
  };
};


const updateClockNode = () => {
  const clock = document.getElementById("system-clock");
  if (!clock) return;

  const now = new Date();
  // Formats time into a string (HH:MM:SS)
  const timeStr = now.toTimeString().split(' ')[0];
  clock.textContent = `> SYS_TIME: ${timeStr}`;
};


document.addEventListener("DOMContentLoaded", () => {
  typeConnection();
  displayProjects();
  setupNavListeners();
  setupFormListener();
  
  // Start the time loop cycle instantly and update every 1000ms (1 second)
  updateClockNode();
  setInterval(updateClockNode, 1000);
});
