const { response } = require('express');
const express = require ('express');
const conn = require('./DBConnect.js');
const app = express();
app.use(express.static('static'));

app.use(express.urlencoded({
    extended:true
}));

conn().query(`SELECT * FROM GuestMeeting`, function(e,r,f){console.log(r);});

app.get('/sign-up',  (req, res, next) => {
    //res.redirect('/sign-up.html')
    //THIS IS WHERE THE GUEST GOES!!!!! TO SIGN UP FOR PRE EXISTING MEETINGS
    conn().connect();
   let r = req.body;
   let lastID=0;  //THIS WAS GONNA BE DYNAMIC BUT I CANT GET IT TO WORK 
   
   
   //display page that grabs stuff from sql. 
   //use result. Just gonna grab first one. 
   conn().query(`SELECT * FROM Meeting WHERE id = ${lastID}`, function(error, results, fields){
       
       let day = results[lastID].MeetingDay;
       let t1 = results[lastID].time1;
       let t2 = results[lastID].time2;
       let t3 = results[lastID].time3;
       let t4 = results[lastID].time4;
       let t5 = results[lastID].time5;
       let t6 = results[lastID].time6;
       let t7 = results[lastID].time7;
       let t8 = results[lastID].time8;
       let t9 = results[lastID].time9;
       let t10 = results[lastID].time10;
       conn().end();
    res.send(`
   <html>
   <head>
     <title>Doodle - Sign Up</title>
     <link rel="stylesheet" href="main.css" />
     <style>
     </style>
   </head>
 
   <center>
     <body id = "all">
 
       <h1>Please input your name and select the times that work best for you. </h1>
       <a href = 'index.html'><h1>Back to Homepage</h1></a>
 
 
     <form method = 'post' action = '/register'>
       <label for= 'name'>Enter Name: </label>
       <input name = 'name' required>
 
     <div id = "containerContainer">
       <p>Meeting is on ${day}</p>
       <div class = "timeContainer">
         <label class = "timelabel">${t1}</label>
         <input type = 'checkbox' id = "timeAvailable" name = "t1">
       </div>  
 
       <div class = "timeContainer">
         <label class = "timelabel">${t2}</label>
         <input type = 'checkbox' id = "timeAvailable" name = "t2">
       </div>  
 
       <div class = "timeContainer">
         <label class = "timelabel">${t3}</label>
         <input type = 'checkbox' id = "timeAvailable" name = "t3">
       </div>  
 
       <div class = "timeContainer">
         <label class = "timelabel">${t4}</label>
         <input type = 'checkbox' id = "timeAvailable" name = "t4">
       </div>  
 
       <div class = "timeContainer">
         <label class = "timelabel">${t5}</label>
         <input type = 'checkbox' id = "timeAvailable" name = "t5">
       </div>  
 
       <div class = "timeContainer">
         <label class = "timelabel">${t6}</label>
         <input type = 'checkbox' id = "timeAvailable" name = "t6">
       </div>  
 
       <div class = "timeContainer">
         <label class = "timelabel">${t7}</label>
         <input type = 'checkbox' id = "timeAvailable" name = "t7" >
       </div>  
 
       <div class = "timeContainer">
         <label class = "timelabel">${t8}</label>
         <input type = 'checkbox' id = "timeAvailable" name = "t8" >
       </div>  
 
       <div class = "timeContainer">
         <label class = "timelabel">${t9}</label>
         <input type = 'checkbox' id = "timeAvailable" name = "t9" >
       </div>  
 
       <div class = "timeContainer">
         <label class = "timelabel">${t10}</label>
         <input type = 'checkbox' id = "timeAvailable" name = "t10" >
       </div>  
     </div>
 
     <input type="submit"  value="Submit" name = "userSubmitTimes">
 
   </form>
 
     </body>
   </center>
   
 </html>

    `)
    
   });

   

});


app.post('/login', function(req, res){
  
    let usr = req.body.user;
    let pss = req.body.pass;
    let msg = "No way Jose";

    if (usr == "Admin" && pss == "123"){
        res.redirect('/sign-up-admin.html');
    }
    else{
        console.log(msg);
        res.redirect('/index-1.html');
    }

});

app.post('/submit_meeting', function(req, res){
  //REDIRECTED FROM SIGN UP ADMIN. THIS IS WHERE THE ADMIN PUTS THE NEW MEETING INFO INTO!!!! 
    let r = req.body;
    let id = 0; //was gonna be dynamic but i ran out of time and don't care enough.
    conn().connect();

    //insert into meeting, ID, day, time1..10
    conn().query(`
    INSERT INTO Meeting VALUES(${id}, '${r.day}','${r.time1}','${r.time2}','${r.time3}',
    '${r.time4}', '${r.time5}', '${r.time6}', '${r.time7}', '${r.time8}', '${r.time9}', '${r.time10}' )
    `, function (error, results, fields){
      if(error){
        console.log("Something went wrong in SUBMIT_MEETING");
        console.log(error);
      }else{
        
        console.log(results);
      }
    });
    let content = `<html>
    <head>
      <title>Doodle 2.0</title>
      
      <script src = "handler.js"></script>
      <style>
      #all {
        border: navy solid 5px;
        background-color: DodgerBlue;
        color:white;
        font-family: Arial, Helvetica, sans-serif;
      }
      </style>
    </head>
  
    <center>
      <header>
      <h1>Doodle 2.0 - SE 3316 Edition <br> You have created a new meeting for ${r.day} with the first time being at ${r.time1}</h1>
      </header>

    <body id ='all'>
      
      <a href = "index.html"><h1>Back to Homepage</h1></a>
    </body>
     
    </center>
  
  </html>`;
  res.send(content);


  conn().end();
  

});

app.get('/view-meetings', function(req, res){
  conn().connect();
  conn().query(`SELECT * FROM GuestMeeting ORDER BY GuestName`, function(error, results, fields){
    
    if (error){
      console.log("ERROR IN VIEW MEETINGS");
      console.log(error);
      throw error;
    }else{
      meetingsList = results;

      let content = `<html>
        <head><title>Doodle - Sign Up</title><link rel="stylesheet" href="main.css" /><style></style></head><center><body id = "all">
        `;

      for (m of meetingsList){
        content += '<div>';
        content += m.GuestName + " has a meeting on" + m.MeetingDay + " at " + m.time;
        content += '</div>\n';
        
      }
      content += `<h1>Hi there. I struggled with this lab for a long time. You can only see the meeting times
        for the first date in the data base. I apologize for not making this better.</h1>
        <a href = "index.html"><h1>Back to Homepage</h1></a></body>
      </center>
      
    </html>`;
    res.send(content);
    }

  });
  conn().end();
});

app.get('/resetDB', function(req, res){
  conn().connect();
    conn().query(`
        TRUNCATE TABLE Meeting
    `
    );
    conn().query(`
        TRUNCATE TABLE GuestMeeting
    `
    );
    console.log('Meeting + GuestTimes Relations have been RESET');
    res.redirect('index.html');
  conn().end();
});

app.post('/register', function(req, res, next){
    let r = req.body;
    let day;
    
    //get the time slots and the meeting day. 
    conn().connect();
    let lastID = 0;
    let timeSlots = [];
    let timeChecks = [];

    conn().query(`SELECT * FROM Meeting
    `, function(error, results, fields){
        day = results[lastID].MeetingDay;
        timeSlots[0] = results[lastID].time1;
        timeSlots[1] = results[lastID].time2;
        timeSlots[2] = results[lastID].time3;
        timeSlots[3] = results[lastID].time4;
        timeSlots[4] = results[lastID].time5;
        timeSlots[5] = results[lastID].time6;
        timeSlots[6] = results[lastID].time7;
        timeSlots[7] = results[lastID].time8;
        timeSlots[8] = results[lastID].time9;
        timeSlots[9] = results[lastID].time10;

        timeChecks = []
        timeChecks[0] = r.t1||'off';
        timeChecks[1] = r.t2||'off';
        timeChecks[2] = r.t3||'off';
        timeChecks[3] = r.t4||'off';
        timeChecks[4] = r.t5||'off';
        timeChecks[5] = r.t6||'off';
        timeChecks[6] = r.t7||'off';
        timeChecks[7] = r.t8||'off';
        timeChecks[8] = r.t9||'off';
        timeChecks[9] = r.t10||'off';

        for(let i = 0; i < timeChecks.length; i++){
      
          if (timeChecks[i] == 'on'){
            conn().query(`INSERT INTO GuestMeeting VALUES('${day}','${timeSlots[i]}','${r.name}');
            `, function(error, results, fields){
              if (error ){
                console.log(error);
              }else{
                console.log("Updated GuestMeeting table");
                
              }
            }
          )
        }
        
      }
      res.send(`
      <html>
      <head>
        <title>You're In.</title>
        <link rel="stylesheet" href="main.css" />
        <style>
        </style>
      </head>
    
      <center>
        <body id = "all">
          <h1>You have been added to your specified meetings.</h1>
          
          <a href = 'index.html'><h1>Back to Homepage</h1></a>
        </body>
      </center>
      `);
    }
    );
    

    
    


    
  conn().end();
});
  


app.listen(80);