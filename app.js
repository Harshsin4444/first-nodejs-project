const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res)=>{

    const url = req.url;
    const method = req.method;
    if(url === '/')
    {

        fs.readFile('message.txt', {encoding : 'utf-8'}, (err,data)=>{
            if(err)
            {
                console.log(err);
            }
            console.log(data);
            res.write('<html>');
            res.write('<head> <title> First Post Message</title> </head>');
            res.write(`<body>${data}</body>`);
            res.write('<body> <form action="/message" method = "POST"><input type="text" name="message"><button type="submit">SEND</button> </body>');
            res.write('</html>');
             return res.end();
        });

       
    }

    else if(url === '/message' && method === 'POST')
    {
        const body = [];
        req.on('data', (chunk)=>{
            body.push(chunk);
        });

       return req.on('end', ()=>{
            const parsebody = Buffer.concat(body).toString();
            const message = parsebody.split('=')[1];
            fs.writeFile('message.txt', message, ()=>{
                res.statusCode = 302;
                res.setHeader('Location','/');
                return res.end();
            });
           
        });

       
    }
    else {
        res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head> <title> My First Page </title> </head>');
    res.write('<body> <h1> Hello World from NodeJs </h1> </body>');
    res.write('</html>');
    res.end();
    }

})

server.listen(4000);