const connectionText = "> Establishing connection...";
const welcomeText = " Welcome, I'm Kaylyn.";
const aboutText = "I'm a Frontend Software Engineer.";

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

window.onload = typeConnection;