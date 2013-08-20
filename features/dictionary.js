;(function(require){
  "use strict";
  
  var yadda = require('yadda'),
    dictionary = new yadda.Dictionary();
  
  dictionary
    .define('NUM', /(\d+)/);
    
  this.dictionary = dictionary;
}).call(this, require);
