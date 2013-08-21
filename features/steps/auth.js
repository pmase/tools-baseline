;(function(require, library){
  "use strict";
  
  library
    .given('I am logged in as user $text with password $text',
      function(user, password, done){
        console.log(arguments);
        done();
      });
    
}).call(this, require, library);