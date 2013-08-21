;(function(require){
  "use strict";
  
  var yadda = require('yadda'),
    dictionary = new yadda.Dictionary();
  
  dictionary
    .define("element", /(text box|button|password box)/)
    .define("property", /(placeholder text|text)/)
    .define("view", /(affinity diagram)/)
    .define("text", /(?:")([^"]*)(?:")/);
    
  this.dictionary = dictionary;
}).call(this, require);
