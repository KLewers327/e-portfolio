// BACKGROUND MATRIX EFFECT

const initMatrixRain = () => {
  const c = document.getElementById("cyber-matrix");
  const ctx = c?.getContext("2d");
  if (!c || !ctx) return;

  const resize = () => {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
  };
  window.onresize = resize;
  resize();

  const chars = "01010101ABCDEFGHIJKLMNOPQRSTUVWXYZｦｱｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";
  const fontSize = 16;
  const columns = Math.floor(c.width / fontSize);
  const drops = Array(columns).fill(1);
  const mouse = { x: -1000, y: -1000 };

  window.onmousemove = (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  };

  const draw = () => {
    ctx.fillStyle = "rgba(10, 9, 21, 0.15)";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.font = `${fontSize}px monospace`;

    drops.forEach((y, i) => {
      const txt = chars[Math.floor(Math.random() * chars.length)];
      
      const columnX = i * fontSize;
      const distanceX = Math.abs(columnX - mouse.x);

      const isNearMouse = distanceX < 80;
      ctx.fillStyle = isNearMouse ? "#00F0FF" : (Math.random() > 0.5 ? "#5A189A" : "#240046");
      
      ctx.fillText(txt, columnX, y * fontSize);

      let nextY = y + (isNearMouse ? 3 : 1);

      drops[i] = (nextY * fontSize > c.height && Math.random() > 0.975) ? 0 : nextY;
    });
  };

  setInterval(draw, 33);
};


// MODAL DATA OBJECT

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
  const aboutBtn = document.querySelector('a[href="#about"]');
  const contactBtn = document.querySelector('a[href="#contact"]');
  const closeBtn = document.getElementById("modal-close");
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const contactTriggers = document.querySelectorAll(
    ".terminal__window, .avatar__placeholder"
  );
  const hero = document.querySelector(".hero");

  if (aboutBtn) aboutBtn.onclick = (e) => { e.preventDefault(); toggleModal('about'); };
  if (contactBtn) contactBtn.onclick = (e) => { e.preventDefault(); toggleModal('contact'); };
  if (closeBtn) closeBtn.onclick = () => toggleModal();
  if (hero) {
    hero.addEventListener("click", (e) => {
      if (
        e.target instanceof Element &&
        e.target.closest(".terminal__window, .avatar__placeholder")
      ) {
        toggleModal("contact");
      }
    });
  }

  if (menuToggle && navLinks) {
    menuToggle.onclick = () => {
      menuToggle.classList.toggle("nav__toggle--active");
      navLinks.classList.toggle("nav__links--open");
    };

    // Close the mobile drop-down automatically if a user clicks an actual link anchor
    navLinks.onclick = (e) => {
      if (e.target.classList.contains("nav__link")) {
        menuToggle.classList.remove("nav__toggle--active");
        navLinks.classList.remove("nav__links--open");
      }
    };
  }

  contactTriggers.forEach((trigger) => {
    trigger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleModal("contact");
      }
    });
  });
  
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

// TYPING ANIMATION

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

// PROJECTS DATA AND DISPLAY

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


const renderGrid = (projectData) => {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  grid.innerHTML = projectData.map(proj => `
    <div class="projects__card">
      <h3 class="projects__card-title">${proj.title}</h3>
      <p class="projects__card-desc">${proj.desc}</p>
      <div class="projects__tags">
        ${proj.tags.map(t => `<span class="projects__tag">${t}</span>`).join('')}
      </div>
    </div>
  `).join('');
};

const filterProjects = (tag) => {
  const filtered = tag === 'all' ? projects : projects.filter(p => p.tags.includes(tag));
  renderGrid(filtered);
};

const setupFilterListeners = () => {
  const controls = document.getElementById("projects-controls");
  if (!controls) return;

  controls.onclick = (e) => {
    if (e.target.classList.contains("projects__btn")) {
      filterProjects(e.target.dataset.tag);
    }
  };
};


// SYSTEM CLOCK UPDATE

const updateClockNode = () => {
  const clock = document.getElementById("system-clock");
  if (!clock) return;

  const now = new Date();
  // Formats time into a string (HH:MM:SS)
  const timeStr = now.toTimeString().split(' ')[0];
  clock.textContent = `> SYS_TIME: ${timeStr}`;
};


document.addEventListener("DOMContentLoaded", () => {
  initMatrixRain(); // Performs background matrix rain effect
  typeConnection(); // Starts the typing animation sequence
  renderGrid(projects); // Performs the initial complete grid render
  setupFilterListeners(); // Mounts the filter control listeners
  setupNavListeners(); // Mounts the modal navigation listeners
  setupFormListener(); // Mounts the modal form submission listener
  
  // Start the time loop cycle instantly and update every 1000ms (1 second)
  updateClockNode();
  setInterval(updateClockNode, 1000);
});
