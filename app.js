const textToType = "> Establishing connection... Welcome, I'm Kaylyn, and I'm a Frontend software engineer.";

const terminalElement = document.getElementById("terminal-text");

let i = 0;

const typeWriter = () => {
  if (i < textToType.length) {
    terminalElement.textContent += textToType[i++];
    
    const isPause =
      terminalElement.textContent === ">" ||
      terminalElement.textContent.endsWith("> Establishing connection...");
    setTimeout(typeWriter, isPause ? 1500 : 50);
  }
  
};


window.onload = typeWriter;