// Secret Locker Variables
let lockerPassword = "46755";  // Apna secret password yahan set karo
let secretFiles = []; // Yeh tumhare files store karega

// Speech Recognition
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();
recognition.lang = "en-US";

// Speak Function
function speak(text) {
    let text_speak  = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-US";
    window.speechSynthesis.speak(text_speak);
}

// Start Voice Recognition
function startListening() {
    recognition.start();
}

// Voice Command Handling
recognition.onresult = (event) => {
    let transcript = event.results[0][0].transcript.toLowerCase();
    if (transcript.includes("open locker")) {
        openLocker();
    }
};

// Open Locker Function
function openLocker() {
    speak("Please enter your 4-digit password.");
    setTimeout(() => {
        let userPassword = prompt("Enter your 4-digit password:");
        if (userPassword === lockerPassword) {
            speak("Locker opened successfully.");
            showLocker();
        } else {
            speak("Incorrect password. Access denied.");
        }
    }, 2000);
}

// Show Locker UI
function showLocker() {
    let lockerDiv = document.createElement("div");
    lockerDiv.innerHTML = `
        <h2>🔐 Secret Locker</h2>
        <input type="file" id="fileInput">
        <button onclick="uploadFile()">Upload File</button>
        <h3>Stored Files:</h3>
        <ul id="fileList"></ul>
    `;
    lockerDiv.style.position = "fixed";
    lockerDiv.style.top = "50%";
    lockerDiv.style.left = "50%";
    lockerDiv.style.transform = "translate(-50%, -50%)";
    lockerDiv.style.background = "black";
    lockerDiv.style.color = "white";
    lockerDiv.style.padding = "20px";
    lockerDiv.style.border = "2px solid white";
    document.body.appendChild(lockerDiv);
    updateFileList();
}

// Upload File
function uploadFile() {
    let fileInput = document.getElementById("fileInput");
    if (fileInput.files.length > 0) {
        let fileName = fileInput.files[0].name;
        secretFiles.push(fileName);
        speak(fileName + " uploaded successfully.");
        updateFileList();
    } else {
        speak("No file selected.");
    }
}

// Update File List
function updateFileList() {
    let fileList = document.getElementById("fileList");
    fileList.innerHTML = "";
    secretFiles.forEach(file => {
        let listItem = document.createElement("li");
        listItem.textContent = file;
        fileList.appendChild(listItem);
    });
}

// Auto Start Listening on Page Load
window.onload = () => {
    speak("Say 'Open Secret Locker' to access.");
    startListening();
};