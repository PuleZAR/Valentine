console.log("Script is running");

// Arrow glow animation
const leftArrows = document.querySelectorAll(".left-arrows .arrow");
const rightArrows = document.querySelectorAll(".right-arrows .arrow");
let step = 0;

function animateArrows() {
    [...leftArrows, ...rightArrows].forEach(a => a.classList.remove("glow"));
    if(leftArrows[step]) leftArrows[leftArrows.length - 1 - step].classList.add("glow");
    if(rightArrows[step]) rightArrows[step].classList.add("glow");
    step++;
    if(step >= leftArrows.length) step=0;
}
setInterval(animateArrows, 300);

// Popup elements
const openButton = document.getElementById('open-popup-button');
const closeButton = document.getElementById('close-popup-button');
const popupOverlay = document.getElementById('popup-overlay');

// Open/Close popup
function openPopup() { popupOverlay.classList.add('active'); }
function closePopup() { popupOverlay.classList.remove('active'); }
closeButton.addEventListener('click', closePopup);
window.addEventListener('click', e=>{ if(e.target===popupOverlay) closePopup(); });

// Feedback email
const feedbackForm = document.getElementById("feedback-form");
const feedbackInput = document.getElementById("feedback-input");
const noButton = document.getElementById("no-button");

function sendFeedback(answer, openPopupAfter=false){
    feedbackInput.value = answer;
    feedbackForm.submit();
    if(openPopupAfter){
        setTimeout(()=>{ openPopup(); }, 300);
    }
}

// Heart burst effect
function heartBurst(){
    const burstContainer = document.getElementById("heart-burst");
    burstContainer.innerHTML = "";
    for(let i=0;i<15;i++){
        const heart=document.createElement("span");
        heart.className="heart-burst-heart";
        heart.textContent="❤";
        const x=(Math.random()-0.5)*200+"px";
        const y=(Math.random()-0.5)*200+"px";
        heart.style.setProperty("--x",x);
        heart.style.setProperty("--y",y);
        burstContainer.appendChild(heart);
        setTimeout(()=>heart.remove(),1000);
    }
}

// YES button → send + popup + heart burst
openButton.addEventListener("click",()=>{
    sendFeedback("Yes", true);
    heartBurst();
});

// NO button → send only
noButton.addEventListener("click", () => { sendFeedback("No"); });
