const currentUser = JSON.parse(localStorage.getItem('currentUser'));


if(!currentUser) {
    window.location.href = "../html/log_in.html";
}
