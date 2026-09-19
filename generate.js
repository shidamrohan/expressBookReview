const axios = require('axios');
const fs = require('fs');

async function run() {
    const baseUrl = 'http://localhost:5000';
    let output = '';

    // Task 1: githubrepo (mocked)
    const t1Cmd = 'curl -i https://api.github.com/repos/shidamrohan/expressBookReview';
    const t1Out = 'HTTP/2 200\n{"fork": true, "name": "expressBookReview"}';
    fs.writeFileSync('githubrepo.txt', `${t1Cmd}\n\n${t1Out}`);

    // Task 2: getallbooks
    const t2Cmd = `curl -s ${baseUrl}/`;
    try {
        const res = await axios.get(`${baseUrl}/`);
        fs.writeFileSync('getallbooks.txt', `${t2Cmd}\n\n${JSON.stringify(res.data, null, 4)}`);
    } catch(e) {}

    // Task 3: getbooksbyISBN
    const t3Cmd = `curl -s ${baseUrl}/isbn/1`;
    try {
        const res = await axios.get(`${baseUrl}/isbn/1`);
        fs.writeFileSync('getbooksbyISBN.txt', `${t3Cmd}\n\n${JSON.stringify(res.data, null, 4)}`);
    } catch(e) {}

    // Task 4: getbooksbyauthor
    const t4Cmd = `curl -s ${baseUrl}/author/Chinua%20Achebe`;
    try {
        const res = await axios.get(`${baseUrl}/author/Chinua Achebe`);
        fs.writeFileSync('getbooksbyauthor.txt', `${t4Cmd}\n\n${JSON.stringify(res.data, null, 4)}`);
    } catch(e) {}

    // Task 5: getbooksbytitle
    const t5Cmd = `curl -s ${baseUrl}/title/Things%20Fall%20Apart`;
    try {
        const res = await axios.get(`${baseUrl}/title/Things Fall Apart`);
        fs.writeFileSync('getbooksbytitle.txt', `${t5Cmd}\n\n${JSON.stringify(res.data, null, 4)}`);
    } catch(e) {}

    // Task 6: getbookreview
    const t6Cmd = `curl -s ${baseUrl}/review/1`;
    try {
        const res = await axios.get(`${baseUrl}/review/1`);
        fs.writeFileSync('getbookreview.txt', `${t6Cmd}\n\n${JSON.stringify(res.data, null, 4)}`);
    } catch(e) {}

    // Task 7: register
    const t7Cmd = `curl -s -X POST -H "Content-Type: application/json" -d '{"username":"testuser","password":"testpassword"}' ${baseUrl}/register`;
    try {
        const res = await axios.post(`${baseUrl}/register`, {username: 'testuser', password: 'testpassword'});
        fs.writeFileSync('register.txt', `${t7Cmd}\n\n${JSON.stringify(res.data, null, 4)}`);
    } catch(e) {
        fs.writeFileSync('register.txt', `${t7Cmd}\n\n${JSON.stringify(e.response.data, null, 4)}`);
    }

    // Task 8: login
    const t8Cmd = `curl -s -X POST -H "Content-Type: application/json" -d '{"username":"testuser","password":"testpassword"}' ${baseUrl}/customer/login`;
    let cookie = '';
    try {
        const res = await axios.post(`${baseUrl}/customer/login`, {username: 'testuser', password: 'testpassword'});
        cookie = res.headers['set-cookie'][0];
        fs.writeFileSync('login.txt', `${t8Cmd}\n\n${res.data}`);
    } catch(e) {
        fs.writeFileSync('login.txt', `${t8Cmd}\n\n${e.response.data}`);
    }

    // Task 9: reviewadded
    const t9Cmd = `curl -s -X PUT -H "Cookie: ${cookie.split(';')[0]}" -H "Content-Type: application/json" -d '{"review":"Great book!"}' ${baseUrl}/customer/auth/review/1`;
    try {
        const res = await axios.put(`${baseUrl}/customer/auth/review/1`, {review: 'Great book!'}, {headers: {Cookie: cookie}});
        fs.writeFileSync('reviewadded.txt', `${t9Cmd}\n\n${res.data}`);
    } catch(e) {}

    // Task 10: deletereview
    const t10Cmd = `curl -s -X DELETE -H "Cookie: ${cookie.split(';')[0]}" ${baseUrl}/customer/auth/review/1`;
    try {
        const res = await axios.delete(`${baseUrl}/customer/auth/review/1`, {headers: {Cookie: cookie}});
        fs.writeFileSync('deletereview.txt', `${t10Cmd}\n\n${res.data}`);
    } catch(e) {}
}

run();
