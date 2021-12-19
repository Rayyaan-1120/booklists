const fs = require("fs");
const http = require('http')
const url = require('url')
const replacetemp = require('./modules/replaceTemplate')

////////////////////////////////

//reading and writing files sync way
// const trylistentext = fs.readFileSync('./txt/finaltext.txt','utf-8')
// const textcreate = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,${trylistentext}created on ${Date.now()}`
// fs.writeFileSync('./txt/output.txt',textcreate)
// console.log('text has been written')

///////////////////////////////////

//reading and writing files in async way (callback hell type)

// fs.readFile("./txt/output.txt", "utf-8", (err, data1) => {
//   fs.readFile("./txt/finaltext.txt", "utf-8", (err, data2) => {
//     fs.readFile("./txt/text.txt", "utf-8", (err, data3) => {
//       fs.writeFile("./txt/asyncwritefile.txt", `${data2}\n${data3}`, (err, data4) => {
//         console.log("data written");
//       });
//     });
//   });
// });

// console.log('reading files')

/////////////////////////////////////////////////////////

//first simple server



const data = fs.readFileSync('./data/bookdata.json','utf-8')
const booklist = fs.readFileSync('./templates/booklist.html','utf-8')
const overview = fs.readFileSync('./templates/overview.html','utf-8')
const card = fs.readFileSync('./templates/card.html','utf-8')
const dataobj = JSON.parse(data)

const server = http.createServer((req,res) => {
    const {query,pathname} = url.parse(req.url,true)

    //booklists page
    if(pathname === '/' || pathname === '/books'){

        const booksmap = dataobj.map(entry => replacetemp(card,entry)).join('')
        const outputdata = booklist.replace('{%BOOK_CARDS%}',booksmap)
        res.writeHead(200,{'Content-type':'text/html'})
        res.end(outputdata)
    }
    //bookdetails page
    else if(pathname === '/bookdetail'){
        const bookdetail = dataobj[query.id]
        const output = replacetemp(overview,bookdetail)
        res.writeHead(200,{'Content-type':'text/html'})

        res.end(output)
    }
    //api
    else if(pathname === '/api'){
        res.writeHead(200,{'Content-type':'application/json'})
        res.end(data)
    }
    //not found
    else{
        res.writeHead(404,{
            'Content-type':'text/html',
            'my-own-header':'hello-world'
        })
        res.end('<h1>page not found</h1>')
    }
})

server.listen(8000,'127.0.0.1',() => {
    console.log('server started running')
})
