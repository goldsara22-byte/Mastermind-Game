const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (!currentUser) {
    window.location.href = "../html/log_in.html";
}

const username = currentUser.username;
const p = document.createElement("p");
p.innerText = `.שלום ${username}`;

const span = document.createElement("span");
const log_out = document.createElement("p");
log_out.innerText = ".להתנתקות לחץ";
log_out.style.cursor = 'pointer';

span.appendChild(p);
span.appendChild(log_out);

const me = document.getElementById("userName");
me.appendChild(span);

log_out.addEventListener('click', logOut);
function logOut() {
    localStorage.removeItem('currentUser');
    window.location.href = "../html/log_in.html";
}

function addTheGames() {
    let gams = document.getElementById("theGames");
    for (let i = 1; i <= 5; i++) {
        let button = document.createElement("button");
        button.classList.add("button");
        button.style.backgroundImage = `url('../photos/game${i}.jpg')`; // תמונה לדוגמה
        button.style.backgroundSize = "cover";

        button.addEventListener("click", function () {
            if (i != 3) {
                window.location.href = `../html/building.html`;
            }
            else
                window.location.href = `../html/rules.html`;
        });
        gams.appendChild(button);
    }
}

addTheGames();

function createSparkle() {
    const sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");

    const size = Math.random() * 5 + 5;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.left = `${Math.random() * 100}vw`;
    sparkle.style.animationDuration = `${Math.random() * 3 + 2}s`;

    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 5000);
}

setInterval(createSparkle, 100);//פונקציה שעושה את createSparkle 100 פעמים
