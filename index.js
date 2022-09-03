const httpServer = require('http');
const url = require('url');
const fs = require('fs');

const replaceTemplate = require('./modules/replaceTemplate');


/// Read data from file
// Template
const tempCourse = fs.readFileSync(
    `${__dirname}/data/data.json`,
    'utf-8'
 );

 /////////////////////////////////
// Template
const templateHTMLCourse = fs.readFileSync(
    `${__dirname}/template/templateCourse.html`,
    'utf-8'
  );

// //   function replaceTemplate(htmlStr, course){
const replaceTemplate = (htmlStr, course)=>{ // fat arrow function or lambda
     let output = htmlStr.replace(/{%ID%}/g, course.Id);
     output = output.replace(/{%CUSTOMERNAME%}/g, course.customerName);
     output = output.replace(/{%PHONENUMBER%}/g, course.phoneNumber);
     output = output.replace(/{%ADDRESS%}/g, course.address);
     output = output.replace(/{%LOANAMOUNT%}/g, course.loanAmount);
     output = output.replace(/{%INTEREST%}/g, course.interest);
     output = output.replace(/{%LOANTERMYEARS%}/g, course.loanTermYears);
     output = output.replace(/{%LOANTYPE%}/g, course.loanType);
     output = output.replace(/{%DESCRIPTION%}/g, course.description);
     return output;
// }

 const dataObj = JSON.parse(tempCourse);// string to JavaScript Object JSON

////////////////////////////////
//Create Server
// const server = httpServer.createServer(function (req, res) {// call back function
const server = httpServer.createServer( (req, res) =>{// call back function

     const urlParameter = url.parse(req.url, true);
     console.log(JSON.stringify(urlParameter.query));// convert to String
     console.log(JSON.stringify(urlParameter.pathname));// convert to String
    const {query,pathname} = url.parse(req.url, true); // object distructors
    if(query.id){// if there is query parameter named id read as string
        // Courses page
        if (pathname === '/' || pathname.toLowerCase() === '/courses') {
            res.writeHead(200, {// Every thing ran successfully
                'Content-type': 'text/html'
            });
            const course = dataObj[Number(query.id)];// convert string to numeric value
            const strCourseName = JSON.stringify(course);
            const courseHTML = replaceTemplate(templateHTMLCourse, course);// function that will replace the course values in the HTML
               res.end(` We received our first request from the client at resource ${urlParameter.pathname.toLowerCase()} with query parameter ${urlParameter.query.id}
               ${JSON.stringify(course)}// convert object back to string
               `)
            res.end(courseHTML);
        }
    }
    else{
            res.writeHead(404, {// Server did not find what you were looking for
                'Content-type': 'text/html'
            });
            res.end(`resource not found`)
        }
    });

//Start Listening to requests
server.listen(8000, 'localhost', ()=> {
    console.log('Listening to requests on port 8000')
})}
