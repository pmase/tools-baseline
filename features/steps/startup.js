;(function(require, library){
  "use strict";
  
  var noop = function(done){ done(); };
  
  library
    .given('a browser window is open', noop)
    
    .when('I navigate to the URL of the home page', noop)
    
    .then('I see the text $text',
      function(txt, done){
        document.body.innerHTML.should.contain(txt);
        done();
    })
      
    .then('I click a $element with $property $text', function(element, prop, text, done){
      element = {
        "text box": 'textarea, input[type="text"]',
        "password box": 'input[type="password"]',
        button: 'button, input[type="submit"]'
      }[element];
        
      prop = {
        text: function(val){
          return function(){ return $(this).text() === val; };
        },
        "placeholder text": function(val){
          return '[placeholder="' + val + '"]';
        }
      }[prop];
      
      this.ctx.last_element = $(element).filter(prop(text))
        .first()
        .trigger("click");
      
      done();
    })
    
    .then('I type $text', function(text, done){
      this.ctx.last_element.val(text);
      done();
    });
    
}).call(this, require, library);