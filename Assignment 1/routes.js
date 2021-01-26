const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/'){
        res.write("<html>");
        res.write("<head>");
        res.write("<title>My Project</title>");
        res.write("</head>");
        res.write("<body>");
        res.write("<h1>Welcome to my first NodeJS assignment</h1>");
        res.write("<form action='/create-user' method='POST'>");
        res.write("<input type='text' name='username'><br/><button type='submit'>Add User</button>")
        res.write("</form>");
        res.write("</body>");
        res.write("</html>");
        return res.end();
    }
    if (url === '/users'){
        res.write("<html>");
        res.write("<head>");
        res.write("<title>My Project</title>");
        res.write("</head>");
        res.write("<body>");
        res.write("<h1>Top Node Users</h1>");
        res.write("<ul>");
        res.write("<li>User 1</li><li>User 2</li><li>User 3</li><li>User 4</li><li>User 5</li><li>User 6</li><li>User 7</li>");
        res.write("</ul>");
        res.write("</body>");
        res.write("</html>");
        return res.end();
    }
    if (url === '/create-user' && method === 'POST'){
        const body = [];
        req.on("data", chunk => {
            body.push(chunk);
        });
        return req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            console.log(message);
            res.statusCode = 302;
            res.setHeader('Location', '/users');
            return res.end();
        })
    }
}

module.exports = requestHandler;