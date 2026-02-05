const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const response = document.getElementById("response");
const letterPage = document.getElementById("letterPage");
const finalPage = document.getElementById("finalPage");

// Make NO button impossible to click
function moveNoButton() {
    noBtn.style.left = Math.random() * 70 + "%";
    noBtn.style.top = Math.random() * 50 + "%";
}
noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton);
noBtn.addEventListener("click", e => { e.preventDefault(); moveNoButton(); });

// Emoji rain
function emojiRain() {
    const emojis=["❤️","💖","💕","💘","💝","😍"];
    for(let i=0;i<30;i++){
        const emoji=document.createElement("div");
        emoji.classList.add("emoji");
        emoji.innerText=emojis[Math.floor(Math.random()*emojis.length)];
        emoji.style.position="fixed";
        emoji.style.top="-10px";
        emoji.style.left=Math.random()*100+"vw";
        emoji.style.fontSize="24px";
        emoji.style.animation="fall 3s linear forwards";
        document.body.appendChild(emoji);
        setTimeout(()=>emoji.remove(),4000);
    }
}

// Slideshow
let currentSlide=0;
const slides=document.querySelectorAll(".slide");
const captionEl=document.getElementById("slideCaption");
let slideTimeout;

function showSlide(index){
    slides.forEach((slide,i)=>{
        slide.classList.toggle("active", i===index);
        const video=slide.querySelector("video");
        if(video){ video.pause(); video.currentTime=0; }
    });

    captionEl.innerText=slides[index].dataset.caption || "";

    const activeSlide=slides[index];
    const video=activeSlide.querySelector("video");
    const text=activeSlide.querySelector(".final-slide-text");

    if(video){ video.play(); video.onended=nextSlide; }
    else if(text){ slideTimeout=setTimeout(nextSlide,5000); }
    else{ slideTimeout=setTimeout(nextSlide,3500); }
}

function nextSlide(){ clearTimeout(slideTimeout); currentSlide=(currentSlide+1)%slides.length; showSlide(currentSlide);}
function startSlideshow(){ showSlide(currentSlide);}

// YES button triggers slideshow
yesBtn.addEventListener("click", ()=>{
yesBtn.addEventListener("click", ()=>{
    response.innerHTML="😍❤️ She said YES!";
    emojiRain(); // optional
    setTimeout(()=>{
        letterPage.style.display="none";
        finalPage.style.display="flex";
        startSlideshow();
        // Start word rain every 1 second
        setInterval(wordRain, 2000);
    },1500);
});


// Word rain around slideshow
function wordRain() {
    const words = ["Tell me lies.", "Say you're mine.", "I'm yours for the night.👩‍❤️‍💋‍👩", "Head be genuis.👅", "Dick game be the realest.🍆"];
    const slideshow = document.getElementById("slideshow");
    const rect = slideshow.getBoundingClientRect(); // get slideshow position and size

    for (let i = 0; i < 10; i++) {
        const word = document.createElement("div");
        word.classList.add("falling-word");
        word.innerText = words[Math.floor(Math.random() * words.length)];

        // position randomly around slideshow
        const x = rect.left + Math.random() * rect.width;
        word.style.left = x + "px";
        word.style.top = "-20px";

        word.style.position = "fixed";
        word.style.fontSize = (14 + Math.random() * 12) + "px";
        word.style.color = "rgba(255,255,255,0.9)";
        word.style.zIndex = 999;
        word.style.pointerEvents = "none";
        word.style.whiteSpace = "nowrap";

        // speed varies randomly
        const duration = 4 + Math.random() * 4;
        word.style.animation = `fallWord ${duration}s linear forwards`;

        document.body.appendChild(word);
        setTimeout(() => word.remove(), duration * 1000);
    }
}});
