document.getElementById('instagram-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    
    if (email) {
        alert('האימייל אומת בהצלחה! עכשיו תוכל לגשת לאינסטגרם.');
        window.location.href = 'https://www.instagram.com/nave_b1936/';
    } else {
        alert('אנא הזן אימייל תקני לאימות.');
    }
});
