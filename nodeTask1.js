/* A node.js file which creates a simple form, 
processes the form input data and 
submits to a file using node js file system */

var http = require('http');
var fs = require('fs');
var formData = require('querystring');

//creating server
http.createServer(function(req,res){
    res.writeHead(200, {'Content-Type':'text/html'});
    
    //creating HTML form using res.write function 
    res.write('<!DOCTYPE html> <html lang="en"> <head>');
    res.write('<meta charset="utf-8">');
    res.write('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
    res.write('<title>NODE.JS Task 1</title>');
    res.write('</head> <body>');
    res.write('<form method="POST" action="/message">');
    res.write('<input type="text" name="message">');
    res.write('<button type="submit">Submit</button>');
    res.write('</form> </body> </html>');

    //Accessing the form data
    if (req.method ==='POST'){

        let body = '';

        req.on('data', (formChunk)=>{

            body += formChunk.toString(); 

        });
        
        req.on('end', () =>{

            let formMessage = formData.parse(body).message;
            
            // Writing the form input data into a text file.
            fs.writeFile('message.txt', formMessage, function(err){
                if (err) {throw err;}
                else{ console.log('The file has been saved!'); }
            
            }); 

        });
    }

    res.end();

}).listen(8080);