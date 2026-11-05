const textToType = "> Establishing connection... Welcome, I'm Kaylyn.";

//I'm a Frontend Software engineer and a Web Developer. I am passionate about creating visually appealing and user-friendly web applications. I have experience in HTML, CSS, and JavaScript. I enjoy learning new technologies and improving my skills. Let's connect and collaborate on exciting projects!

const terminalElement = document.getElementById("terminal-text");

let i = 0;

function typeWriter() {
  if (i < textToType.length) {
    terminalElement.textContent += textToType.charAt(i);

    i++;  

    const pausePhrase = "> Establishing connection...";

    if (terminalElement.textContent === pausePhrase) {
      setTimeout(typeWriter, 1500); 
    } else {
      setTimeout(typeWriter, 50); // Adjust the typing speed here (in milliseconds)
    }
  }
}

window.onload = typeWriter;