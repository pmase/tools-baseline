;(function(require, library){
  var noop = function(done){ done(); };
  
  library
    .given('a browser window is open', noop)
    .when('I navigate to the URL of the home page', noop)
    .then('I see the text "([^"]*)"',
      function(txt, done) {
        assert.contains(document.body.innerHTML, txt);
        done();
      });
}).call(this, require, library);