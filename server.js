// ייבוא הספריות הנדרשות
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// הגדרת תיקיית קבצים סטטיים (כמו HTML, CSS, JavaScript ותמונות)
app.use(express.static(path.join(__dirname, 'public')));

// עמוד הבית (לשלוח את ה-HTML הראשי)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// עמוד פרויקטים (לשלוח את עמוד ה-HTML של פרויקטים)
app.get('/projects', (req, res) => {
  res.sendFile(path.join(__dirname, 'projects.html'));
});

// עמוד צור קשר (לשלוח את עמוד ה-HTML של צור קשר)
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'contact.html'));
});

// השקת השרת על הפורט המוגדר
app.listen(port, () => {
  console.log(`השרת מאזין בכתובת http://localhost:${port}`);
});

const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

// הגדרת הגדרות השרת
const server = http.createServer((req, res) => {
    // אם הבקשה היא POST (כשהמשתמש שולח את הטופס)
    if (req.method === 'POST') {
        let body = '';
        
        // קריאת נתוני הטופס
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            // פרס את הנתונים של הטופס
            const postData = querystring.parse(body);
            const name = postData.name;
            const email = postData.email;
            const message = postData.message;

            // הגדרת תוכן להודעה שמגיע מהטופס
            const responseMessage = `שם: ${name}\nאימייל: ${email}\nהודעה: ${message}`;

            // שמור את ההודעה בקובץ טקסט
            fs.appendFile('contact_form_submissions.txt', responseMessage + '\n\n', (err) => {
                if (err) {
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end('שגיאה בשמירת הנתונים');
                } else {
                    // שלח תגובה חיובית
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end('<h1>ההודעה נשלחה בהצלחה!</h1><p>תודה על פנייתך.</p>');
                }
            });
        });
    } else {
        // אם זו בקשה GET (כאשר עמוד האתר נטען)
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(`
            <html>
                <head>
                    <title>צור קשר</title>
                </head>
                <body>
                    <h1>צור קשר</h1>
                    <form action="/" method="POST">
                        <label for="name">שם מלא:</label><br>
                        <input type="text" id="name" name="name" required><br><br>
                        <label for="email">אימייל:</label><br>
                        <input type="email" id="email" name="email" required><br><br>
                        <label for="message">הודעה:</label><br>
                        <textarea id="message" name="message" rows="4" required></textarea><br><br>
                        <button type="submit">שלח</button>
                    </form>
                </body>
            </html>
        `);
    }
});

// הפעלת השרת על פורט 3000
server.listen(3000, () => {
    console.log('השרת רץ בכתובת http://localhost:3000');
});
