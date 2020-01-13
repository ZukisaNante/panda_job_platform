//  $("<h1>Welcome to our jobs site</h1>").appendTo("body");
//  $("<p>Click the link below to see the current jobs.</p>").appendTo("body");
//  console.log($("body").html());
//  $("#edit").appendTo("body");
//  console.log($("body").html());
//  $("#delete").appendTo("body");
//  console.log($("body").html());
// jobSeekerMenu();
//data
// var $ = require('jQuery');

// $.getJSON('mongodb://localhost:27017/EmployeeDB/employees/treason.json?count=10&callback=?',function(data) {
//   console.log(data);
// });

$("h3.edit").hide();
              console.log("edit button hidden for normal user");
              $("form.delete").hide();
              console.log('delete is hidden for users');


var jsdom = require('jsdom').jsdom
  , myWindow = jsdom().createWindow()
  , $ = require('jQuery')
  , jq = require('jQuery').create()
  , jQuery = require('jQuery').create(myWindow)
  ;

  //FUNCTIONS
  // function jobSeekerMenu(){
  //   var jobSeekerLogin = require('views/job_Seeker_login');
  //   var userAdmin = require('/views/login');

  //   if(jobSeekerLogin == true){
  //     $('#edit').hide();
  //     $('#delete').hide();
  //   }else{
  //      $('#edit').show();
  //     $('#delete').show();
  //   }

  // }
  
            //$("submit#jobSeeker").click(function(){
              
           // });
      
      