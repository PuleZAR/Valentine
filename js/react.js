console.log("Script is running");

// ===== Hearts header animation =====
const leftArrows = document.querySelectorAll(".left-arrows .arrow");
const rightArrows = document.querySelectorAll(".right-arrows .arrow");

let step = 0;

function animateArrows() {
    // Remove glow from all arrows
    [...leftArrows, ...rightArrows].forEach(a => a.classList.remove("glow"));

    // Left arrows: glow from outside to inside (right to left)
    if (leftArrows[step]) leftArrows[leftArrows.length - 1 - step].classList.add("glow");

    // Right arrows: glow from left to right
    if (rightArrows[step]) rightArrows[step].classList.add("glow");

    step++;
    if (step >= leftArrows.length) step = 0;
}

setInterval(animateArrows, 300);

// ===== Popup elements =====
const openButton = document.getElementById('open-popup-button');
const closeButton = document.getElementById('close-popup-button');
const popupOverlay = document.getElementById('popup-overlay');

// Open popup
function openPopup() {
    popupOverlay.classList.add('active');
}

// Close popup
function closePopup() {
    popupOverlay.classList.remove('active');
}

// Close popup if user clicks overlay
window.addEventListener('click', function(event) {
    if (event.target === popupOverlay) {
        closePopup();
    }
});

// ===== Feedback email sending =====
const feedbackForm = document.getElementById("feedback-form");
const feedbackInput = document.getElementById("feedback-input");
const noButton = document.getElementById("no-button");

// Send feedback and optionally open popup after submit
function sendFeedback(answer, openPopupAfter = false) {
    feedbackInput.value = answer;

    if (openPopupAfter) {
        // Listen for iframe load to know submission finished
        const iframe = document.querySelector('iframe[name="hidden_iframe"]');
        const onLoad = () => {
            openPopup(); // show popup after email sent
            iframe.removeEventListener('load', onLoad);
        };
        iframe.addEventListener('load', onLoad);
    }

    feedbackForm.submit();
}

// YES button → send feedback + popup
openButton.addEventListener("click", () => {
    sendFeedback("Yes", true);
});

// NO button → send feedback only
noButton.addEventListener("click", () => {
    sendFeedback("No");
});
