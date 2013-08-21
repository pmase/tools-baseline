;(function(require, library){
  "use strict";
  
  library
    .given('I click on an existing $view',
      function(view, done){
        view = {
          "affinity diagram": function(){
            return $('.view.unpicked > .tag:contains("aff")').parent();
          }
        }[view];
        
        view().click();
        
        done();
      });
  
    
}).call(this, require, library);