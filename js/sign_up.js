

document.querySelector('.registration-form').addEventListener('submit', function (event) {
    event.preventDefault();


    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!username || !password || !confirmPassword) {
        alert('אנא מלא/י את כל השדות');
        return;
    }

    // בדיקה אם שם המשתמש מכיל לפחות אות אחת
    const usernameRegex = /[a-zA-Zא-ת]/;    // לפחות אות אחת
    if (!usernameRegex.test(username)) {
        alert('שם המשתמש חייב להכיל לפחות אות אחת');
        return;
    }

    if (password.length < 8) {
        alert("הסיסמה לא תקינה, עליך להזין סיסמה באורך 8 תווים");
        return;
    }
    

    if (password !== confirmPassword) {
        alert('הסיסמאות לא תואמות');
        return;
    }

    // בדיקה אם המערך כבר קיים
    //  אם כן, הוא לוקח את המערך הקיים אחרת, הוא פותח מערך חדש []
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.username === username);

    if (userExists) {
        alert('שם המשתמש כבר קיים. בחר שם אחר.');
        return;
    }

    const newUser = { username: username, password: password };
    users.push(newUser);

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));


    alert(`נרשמת בהצלחה! שלום ${username}`);

    window.location.href ="../html/choosGame.html";

    // ניקוי השדות אחרי ההרשמה
    document.getElementById('registrationForm').reset();

});

