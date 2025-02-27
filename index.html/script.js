let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");
 

// Memory for learning
let aiMemory = JSON.parse(localStorage.getItem("aiMemory")) || {};

function speak(text, lang = "hi-GB") {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = lang;
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let hours = new Date().getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sohail, mai aapke liye kya kar sakta hu?");
        content.innerText = "Good Morning Sohail, mai aapke liye kya kar sakta hu?";
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon Sohail, mai aapke liye kya kar sakta hu?");
        content.innerText = "Good Afternoon Sohail, mai aapke liye kya kar sakta hu?";
    } else if (hours >= 16 && hours < 21) {
        speak("Good Evening Sohail, mai aapke liye kya kar sakta hu?");
        content.innerText = "Good Evening Sohail, mai aapke liye kya kar sakta hu?";
    } else {
        speak("Good Night Sohail, sweet dreams!");
        content.innerText = "Good Night Sohail, sweet dreams!";
    }
}

// Speech Recognition
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();
recognition.onresult = (event) => {
    let transcript = event.results[event.resultIndex][0].transcript.toLowerCase();
    content.innerText = transcript;
    takeCommand(transcript);
};

btn.addEventListener("click", () => {
    recognition.start();
    voice.style.display = "block";
    btn.style.display = "none";
});

function takeCommand(message) {
    voice.style.display = "none";
    btn.style.display = "flex";

    if (message === "golu") {
        let response = "Hello golu, mai aapke liye kaise madad kar sakta hu?";
        speak(response);
        content.innerText = response;
        return;
    }

    if (aiMemory[message]) {
        speak(aiMemory[message]); 
        content.innerText = aiMemory[message];
        return;
    }

    if (message.includes("who are you") || message.includes("tum kaun ho")) {
        let response = "मैं एक वर्चुअल असिस्टेंट हूँ, जिसे Sohail Akhtar ने बनाया है।";
        speak("मैं एक वर्चुअल असिस्टेंट हूँ, जिसे Sohail Akhtar ने बनाया है।");
        content.innerText = response;
        translateText(response, "hi", "en");
    } 
    else if (message.includes("who created you") || message.includes("kisne banaya hai")) {
        let response = "मुझे Sohail Akhtar ने बनाया है। मैं Sohail Akhtar Software का एक प्रोजेक्ट हूँ।";
        speak(response);
        content.innerText = response;
    }
    else if (message.includes("sohail akhtar")) {
        let response = "Sohail Akhtar is a Software Engineer, a student of Desh Bhagat University, and he is from Bihar. His father's name is Shamshad Alam. उनका मोबाइल नंबर 8809473332 है।";
        speak(response);
        translateText(response, "hi", "en");
    }
    else if (message.includes("what is your favorite food") || message.includes("tumhara pasandida khana kya hai")) {
        let response = "Mera pasandida khana sweet, spicy aur kaaju biryani hai.";
        speak(response);
        content.innerText = response;
    }
    else if (message.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://facebook.com", "_blank");
    }
    else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://instagram.com", "_blank");
    }
    else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp...");
        window.open("https://web.whatsapp.com", "_blank");
    }
    else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://youtube.com", "_blank");
      
    }
    else if (message.includes("hello")) {
        speak("hello sohail how are you what can i do for you");
        content.innerText = "hello sohail how are you what can i do for you ";
        translateText(response, "hi", "en");
    }
    else if (message.includes("love you jaan")) {
        speak("hello shaheen you are very lucky that you have a boy who loves you so much who has made me you want to know me smile please Sohail it was nice to know you thank you ");
        content.innerText = "hello shaheen you are very lucky that you have a boy who loves you so much who has made me you want to know me smile please Sohail it was nice to know you thank you ";
    
    }
    else if (message.includes("friend")) {
        speak("Your friends are very stupid, stay away Sohail");
        content.innerText = "Your friends are very stupid, stay away Sohail";
   

    }
    else if (message.includes("nothing")) {
        speak("ok sohail take care");
        content.innerText = "ok sohail take care";


    }
    else if (message.includes("sohail wedding")) {
        speak(" shaheen se dont worry aapka shaadi fix ho geya hai shaheen se ");
        content.innerText = " shaheen se dont worry aapka shaadi fix ho geya hai shaheen se";


    }
    else if (message.includes("shaadi kab hoga")) {
        speak("kbhi nahi jao padho phle ");
        content.innerText = "kbhi nahi jao padho phle ";

    }
    else if (message.includes("love you")) {
        speak("love you too much sohail ");
        content.innerText = "love you too much sohail ";

    }
    else if (message.includes("hum kon hai")) {
        speak("you are software engineer ");
        content.innerText = "you are softare engineer ";

    }
    else if (message.includes("good night")) {
        speak("good night sweet dreem ");
        content.innerText = "good night sweet dreem ";

    
      }  else if (message.includes("open my portfolio") || message.includes("mera portfolio kholo")) {
            speak("Opening your portfolio...");
            window.open("https://sohail1133.github.io/file/index.html/?fbclid=PAY2xjawIs5sRleHRuA2FlbQIxMQABpqojzv-3Ahtt6vFpFaaM_cjZCQGwBsNfmQ11HGtt3zgqlEdBGoBIgWH6dA_aem_6dRsqoZ87d4DHib1TiCGvA", "_blank"); 
        
            
      }else if (message.includes("download my cv") || message.includes("mera cv download karo")) {
                speak("Downloading your CV...");
                let link = document.createElement("a");
                link.href = "Sohail_Akhtar_CV.pdf";  // Apne CV ka actual file name daal do
                link.download = "Sohail_Akhtar_CV.pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            


       } else if (message.includes("show my photo") || message.includes("mera photo dikhao")) {
                    speak("Showing your photo...");
                
                    // Check if image already exists, remove it
                    let existingImg = document.getElementById("myPhoto");
                    if (existingImg) {
                        existingImg.remove();
                    }
                
                    // Create Image Element
                    let img = document.createElement("img");
                    img.src = "pic.sohail.jpeg"; // Apni photo ka link yahan daal do
                    img.id = "myPhoto";
                    img.alt = "My Picture";
                    img.style.position = "fixed";
                    img.style.top = "50%";
                    img.style.left = "50%";
                    img.style.transform = "translate(-50%, -50%)";
                    img.style.border = "5px solid white";
                    img.style.boxShadow = "0px 0px 10px white";
                    img.style.width = "200px";
                    img.style.height = "200px";
                    img.style.borderRadius = "50%";
                    img.style.zIndex = "1000";
                    
                    document.body.appendChild(img);
                
                    // Auto Hide After 5 Seconds
                    setTimeout(() => {
                        img.remove();
                        speak("Hiding your photo.");
                    }, 5000);
                
             
                } else if (message.includes("show my wife") || message.includes("mera photo dikhao")) {
                    speak("ok sohail...");
                
                    // Check if image already exists, remove it
                    let existingImg = document.getElementById("myPhoto");
                    if (existingImg) {
                        existingImg.remove();
                    }
                
                    // Create Image Element
                    let img = document.createElement("img");
                    img.src = "shaee.pic.jpeg"; // Apni photo ka link yahan daal do
                    img.id = "myPhoto";
                    img.alt = "My Picture";
                    img.style.position = "fixed";
                    img.style.top = "50%";
                    img.style.left = "50%";
                    img.style.transform = "translate(-50%, -50%)";
                    img.style.border = "5px solid white";
                    img.style.boxShadow = "0px 0px 10px white";
                    img.style.width = "200px";
                    img.style.height = "200px";
                    img.style.borderRadius = "50%";
                    img.style.zIndex = "1000";
                    
                    document.body.appendChild(img);
                
                    // Auto Hide After 5 Seconds
                    setTimeout(() => {
                        img.remove();
                        speak("Hiding your photo.");
                    }, 5000);
           //////////my proof
           
                 } else if (message.includes("my details") || message.includes("mere details ")) {
            speak("Showing your details...");
        
            // Remove existing details if already present
            let existingDetails = document.getElementById("myDetails");
            if (existingDetails) {
                existingDetails.remove();
            }
        
            // Create Container for Details
            let detailsDiv = document.createElement("div");
            detailsDiv.id = "myDetails";
            detailsDiv.style.position = "fixed";
            detailsDiv.style.top = "50%";
            detailsDiv.style.left = "50%";
            detailsDiv.style.transform = "translate(-50%, -50%)";
            detailsDiv.style.background = "black";
            detailsDiv.style.color = "white";
            detailsDiv.style.padding = "20px";
            detailsDiv.style.borderRadius = "10px";
            detailsDiv.style.fontSize = "24px";
            detailsDiv.style.fontWeight = "bold";
            detailsDiv.style.textAlign = "center";
            detailsDiv.style.boxShadow = "0px 0px 10px white";
            detailsDiv.style.zIndex = "1000";
        
            // Create Number Element
            let numberText = document.createElement("p");
            numberText.innerText = "📞 8809473332"; // Apna number daal do
            numberText.style.marginBottom = "10px";
        
            // Create Aadhaar Card Image Element
            let aadhaarImg = document.createElement("img");
            aadhaarImg.src = "doc.jpeg"; // Yahan apne Aadhaar card ki image ka link daal do
            aadhaarImg.alt = "Aadhaar Card";
            aadhaarImg.style.width = "250px";
            aadhaarImg.style.borderRadius = "10px";
            aadhaarImg.style.border = "3px solid white";
            aadhaarImg.style.boxShadow = "0px 0px 10px white";
        
            // Append Elements
            detailsDiv.appendChild(numberText);
            detailsDiv.appendChild(aadhaarImg);
            document.body.appendChild(detailsDiv);
              
            setTimeout(() => {
                img.remove();
                speak("Hiding your photo.");
            }, 5000);
////


 //
 // Global Audio Variable
 let song = new Audio("sham.mp3"); 

 function takeCommand(message) {
     if (message.includes("play song") || message.includes("gaana chalao")) {
         speak("Playing song...");
         song.play();
     } 
     else if (message.includes("pause song") || message.includes("gaana roko")) {
         speak("Pausing song...");
         song.pause();
     }
     else if (message.includes("stop song") || message.includes("gaana band karo")) {
         speak("Stopping song...");
         song.pause();
         song.currentTime = 0; // Gaane ko shuru se start karne ke liye
     }
 }

///
   }
    else if (message.includes("stop")) {
        speak("Ok Sohail, i was joking");
        content.innerText = "Ok Sohail i was joking";
        translateText(response, "hi", "en");
    }


    else if (message.includes("set reminder")) {
        speak("What should I remind you about?");
        setTimeout(() => {
            let reminder = prompt("Enter your reminder:");
            if (reminder) {
                setTimeout(() => {
                    speak(`Reminder: ${reminder}`);
                    alert(`🔔 Reminder: ${reminder}`);
                }, 5000);
            }
        }, 2000);
    }
    else if (message.includes("translate")) {
        let words = message.split("translate")[1].trim();
        translateText(words, "en", "hi");
    }
    else {
        speak("Searching Google for " + message);
        window.open(`https://www.google.com/search?q=${message}`, "_blank");
    }
}

async function translateText(text, fromLang, toLang) {
    let url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${fromLang}|${toLang}`;
    let response = await fetch(url);
    let data = await response.json();
    let translatedText = data.responseData.translatedText;
    speak(translatedText, "hi-IN");
    content.innerText = `Translated: ${translatedText}`;
}



