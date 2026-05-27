const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if(!currentUser) {
    window.location.href = "../html/log_in.html";
}

const username = currentUser.username;
const p = document.createElement("p");
p.innerText = `.שלום ${username}`;
p.classList.add("writeUserName");

const span = document.createElement("span");
const log_out = document.createElement("p");
log_out.innerText = ".להתנתקות לחץ";
log_out.classList.add("writeAfterUserName");
log_out.style.cursor = 'pointer';

span.appendChild(p);
span.appendChild(log_out);
span.style.border="none";

const header = document.getElementById("savedPersonsContainer");
header.appendChild(span);

log_out.addEventListener('click', logOut);
function logOut() {
    localStorage.removeItem('currentUser');
    window.location.href = "../html/log_in.html";
}



const objectTypes1 = ['eye', 'mouth', 'shirt', 'pants'];

objectTypes1.forEach(type => {
    for (let i = 1; i <= 4; i++) {
        let element = document.getElementById(`${type}${i}${i}`);
        element.style.display = "none";
        element.dataset.lastClick = false;
        console.log(element);
    }
});

let randImages = [];
function rand() {
    for (let i = 0; i < 4; i++) {
        const random = Math.floor(Math.random() * 4) + 1;
        const personRand = document.getElementById("personRandom1");
        const get = `area${objectTypes1[i]}`;
        let imgElement = personRand.querySelector(`.${get} img`);
        imgElement.src = `../photos/${objectTypes1[i]}${random}.png`;
        randImages[i] = imgElement.src;
    }
}
rand();

const objectTypes = [
    { type: 'eye', number: 0 },
    { type: 'mouth', number: 1 },
    { type: 'shirt', number: 2 },
    { type: 'pants', number: 3 }
];

//מוסיף eventlistener לכל הבגדים של הארון
objectTypes.forEach(object => {
    for (let i = 1; i <= 4; i++) {
        const element = document.getElementById(`${object.type}${i}`);
        element.addEventListener('click', iClick);
        element.dataset.i = i;
        element.dataset.number = object.number;
    }
});



function iClick() {
    for (let i = 1; i <= 4; i++) {
        const elementMe = document.getElementById(`${objectTypes[this.dataset.number].type}${i}${i}`);
        elementMe.style.display = "none";
        elementMe.dataset.lastClick = false;
    }
    let elementMe = document.getElementById(`${this.id}${this.dataset.i}`);
    elementMe.style.display = "block";
    elementMe.dataset.lastClick = true;
}

document.getElementById("finishPerson").addEventListener("click", savePerson);
let mone = 0;
let counterImages = 0;//סופר את כמות התמונות בבן אדם הרנדומלי ששוות לתמונות שבבן אדם שנלחץ



function savePerson() {

    mone++;
    let savedState = [];

    if (mone <= 7) {

        let person1 = document.getElementById("person");
        let counter = 0;

        //שומר את מה שיש על האדם הרנדומלי בתוך המערך
        objectTypes1.forEach(type => {
            const imgArray = Array.from(person1.querySelectorAll(`.area${type} div`));

            const firstTrueIndex = imgArray.findIndex(value => value.dataset.lastClick === "true");
            if (firstTrueIndex !== -1) {

                const imgElement = imgArray[firstTrueIndex].querySelector('img');
                savedState.push(imgElement.src);

            } else {
                alert(`the item ${type} is'nt selected!`);
                counter++;
            }
        });

        //סופר כמה תמונות נכונות יש באדם שנלחץ
        for (let i = 0; i < 4; i++) {
            if (savedState[i] === randImages[i])
                counterImages++;
        }

        if (!counter) {
            addNewDivToHeader();
        }
        else {
            mone--;
        }

        console.log(counterImages);

        function addNewDivToHeader() {
            // Create a new div to represent the saved person
            const savedPersonsContainer = document.getElementById("savedPersonsContainer");
            let smallDiv = document.createElement("div");

            // Add the images to the small div
            savedState.forEach(src => {
                const img = document.createElement("img");
                img.src = src;
                smallDiv.appendChild(img);
            });

            let corect = document.createElement("div");
            corect.innerText = `${counterImages} : ✔️   ${4 - counterImages} : ❌`;
            smallDiv.appendChild(corect);
            // Append the small div to the header container
            savedPersonsContainer.appendChild(smallDiv);
        }

        objectTypes1.forEach(type => {
            for (let i = 1; i <= 4; i++) {
                let element = document.getElementById(`${type}${i}${i}`);
                element.style.display = "none";
                element.dataset.lastClick = false;
            }
        });

    }

    let win = false;
    if (counterImages === 4)//אם ניצחת
    {

        let curtain = document.querySelector('.curtainMove');
        curtain.style.animation = 'moveCurtain 4s forwards';
        setTimeout(() => {
            let model = document.getElementById("gameWinModal");
            model.style.display = "flex";
            // כפתור התחלה מחדש
            const button = document.querySelector("#restartGame2");
            button.addEventListener("click", () => restartGame("Win"));
        }, 3000);
        win = true;

        startConfetti();
    }
    else { }
    if (mone === 7 && !win) {

        let curtain = document.querySelector('.curtainMove');
        curtain.style.animation = 'moveCurtain 4s forwards';

        setTimeout(() => {
            let model = document.getElementById("gameOverModal");
            model.style.display = "flex";

            // כפתור התחלה מחדש
            const button = document.querySelector("#restartGame1");
            button.addEventListener("click", () => restartGame("Over"));
        }, 4000);
    }

    counterImages = 0;

}




function restartGame(word) {

    let curtain = document.querySelector('.curtainMove');
    curtain.style.animation = "";

    // אפס את הניחושים ואת מצב המשחק
    mone = 0;
    console.log(`game${word}Modal`);
    let model = document.getElementById(`game${word}Modal`);
    model.style.display = "none";

    // אפס את האיש הדינמי
    objectTypes1.forEach(type => {
        let imgElement = document.querySelector(`.area${type} img`);
        imgElement.src = "";
    });

    // אפס את המשתמשים השמורים
    let savedPersonsContainer = document.getElementById("savedPersonsContainer");
    savedPersonsContainer.innerHTML = "";
    rand();
}




function startConfetti() {
    const confettiContainer = document.body;
    const confettiCount = 100;

    for (let i = 0; i < confettiCount; i++) {
        let confetti = document.createElement("div");
        confetti.classList.add("confetti");

        let startX = Math.random() * window.innerWidth;
        confetti.style.left = `${startX}px`;

        let colors = ["red", "blue", "yellow", "green", "purple", "pink", "orange"];
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        // מהירות אקראית
        let duration = Math.random() * 3 + 2;
        confetti.style.animationDuration = `${duration}s`;

        // זווית תנועה
        confetti.style.setProperty("--start-x", `${startX}px`);

        confettiContainer.appendChild(confetti);

        // מחיקה מה-DOM לאחר סיום האנימציה
        setTimeout(() => {
            confetti.remove();
        }, duration * 1000);
    }
}
