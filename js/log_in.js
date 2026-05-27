
document.querySelector('.registration-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('אנא מלא/י את כל השדות');
        return;
    }

    // בדיקה אם המערך כבר קיים
    //  אם כן, הוא לוקח את המערך הקיים אחרת, הוא פותח מערך חדש []   
 let users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.username === username && user.password === password);

    if (!userExists) {
        alert("המשתמש לא קיים או שהסיסמה לא נכונה. להרשמה: sign up");
        return;
    }

    const newUser = { username: username, password: password };
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    alert(`התחברת בהצלחה! שלום ${username}`);

    window.location.href = "../html/choosGame.html";

    // ניקוי השדות אחרי הכניסה
    document.getElementById('registrationForm').reset();
});


