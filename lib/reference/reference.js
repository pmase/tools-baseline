;(function($, d3){
  "use strict";
  
  var window = this;
  
  var reference = {};
  
  var USERS = {
    alice: {password: "secret", name: "alice"},
    bob: {password: "M0@r$3creter", name: "bob"}
  };
  
  var my = {
    user: undefined,
    views: []
  };
  
  var app = d3.select("#app");
  
  var on = {
    login: function(){
      d3.event.preventDefault();
      reference.user(
        d3.select("#login-user").property("value"),
        d3.select("#login-password").property("value")
      );
      return false;
    },
    show_view: function(view){
      view.amplified(true);
    },
    hide_view: function(view){
      view.amplified(false);
    },
    logout_clicked: function(){
      reference.user(undefined);
    },
    new_concept: function(view){
      view.addConcept(new Concept(null), d3.event);
    }
  };
  
  reference.user = function(username, password){
    if(!arguments.length){ return my.user; }
    
    if(username === void 0){
      my.user = undefined;
      reference.render();
    }
    
    if(username && USERS[username] && USERS[username].password === password){
      my.user = USERS[username];
      reference.render();
    }
    
    return reference;
  };
  
  reference.render = function(){
    app.style("font-family", "sans-serif");
    reference.render.header()
      .login_form()
      .account()
      .view_picker()
      .amplified();
    
  };
  
  reference.render.header = function(){
    app.selectAll("h1")
      .data([1])
      .enter().append("h1")
        .style("background-color", "black")
        .style("margin", 0)
        .style("color", "white")
        .style("padding", "5px")
        .text("PMASE Tools");
        
    return reference.render;
  };
  
  reference.render.login_form = function(){
    var login_form = app.selectAll("#login-form")
        .data(reference.user() ? [] : [1]),
      init = login_form.enter()
        .append("form")
        .style("position", "fixed")
        .style("color", "white")
        .style("right", "5px")
        .style("top", "5px")
        .attr("id", "login-form")
        .on("submit", on.login);
      
    init.append("input")
      .attr("id", "login-user")
      .attr("type", "text")
      .attr("placeholder", "Username");
      
    init.append("input")
      .attr("id", "login-password")
      .attr("type", "password")
      .attr("placeholder", "Password");
      
    init.append("button")
      .attr("id", "login-sign-in")
      .text("Sign In")
      .on("click", on.login);
      
    login_form.exit()
      .transition()
      .style("opacity", 0)
      .remove();
    
    return reference.render;
  };
  
  reference.render.account = function(){
    var account = app.selectAll("#account-info")
          .data(reference.user() ? [reference.user()] : []),
      init = account.enter()
        .append("div")
        .attr("id", "account-info")
        .style("position", "fixed")
        .style("color", "white")
        .style("right", "5px")
        .style("top", "5px");
    
    init.append("span")
      .attr("class", "welcome");
    
    init.append("button")
      .text("Sign Out")
      .on("click", on.logout_clicked);
    
    account.select(".welcome")
      .text(function(user){
        return "Welcome, " + user.name + "!"; 
      });
    
    account.exit()
      .transition()
      .style("opacity", 0)
      .remove();
    
    return reference.render;
  };
  
  reference.render.view_picker = function(){
    var container = app
      .selectAll("#view_picker")
      .data(reference.user() ? [reference.user()] : []);
      
    container.enter()
      .append("div")
      .attr("id", "view_picker");
    
    container.exit().remove();
    
    // yeah, so basically all of this would be refactored into classes/views
    var views = container.selectAll(".view.unpicked")
      .data(my.views.filter(function(view){
          return view.type === view.AFFINITY;
        })),
      init = views.enter()
        .append("div")
        .attr("class", "view unpicked")
        .style("background-color", "lightyellow")
        .style("width", "200px")
        .style("height", "200px")
        .style("padding", "5px")
        .style("margin", "5px")
        .style("border-radius", "5px")
        .style("box-shadow", "2px 2px 2px 2px rgba(0, 0, 0, .5)")
        .style("position", "relative")
        .on("click", on.show_view);
      
    init.append("div")
      .style("font-weight", "bold")
      .style("font-size", "80%")
      .style("position", "absolute")
      .style("top", 0)
      .style("right", 0)
      .style("padding", "5px")
      .style("border-radius", "5px")
      .style("box-shadow", "2px 2px 2px 2px rgba(0, 0, 0, .5)")
      .attr("class", "tag");
      
    init.append("span")
      .attr("class", "name");

    views.select(".tag")
      .text(function(view){
        return view.type.tag;
      });
    
    views.select(".name") 
      .text(function(view){
        return view.label;
      });
    
    views.exit().remove();
    
    return reference.render;
  };
  
  reference.render.amplified = function(){
    var amplified = my.views.filter(function(view){
      return view.amplified();
    });
    
    var amp = app.selectAll(".amplified")
        .data(amplified),
      init = amp.enter()
        .append("div")
        .attr("class", "amplified")
        .style("position", "fixed")
        .style("top", 0)
        .style("left", 0)
        .style("right", 0)
        .style("bottom", 0)
        .style("background-color", "rgba(255,255,255,.9)")
        .on("dblclick", on.new_concept);
    
    init.append("button")
      .style("top", 0)
      .style("right", 0)
      .style("position", "fixed")
      .text("close")
      .on("click", on.hide_view);
      
    amp.exit()
      .transition()
      .style("opacity", 0)
      .remove();
    
    return reference.render;
  };
  
  function View(label, type){
    this.label = label;
    this.type = type;
    this.concepts = [];
    
    this._amplified = false;
  }
  
  View.prototype.AFFINITY = {
    label: "Affinity Diagram",
    tag: "aff",
    newParams: function(view, evt){
      // absent any other information but the view and the event,
      // what should view-specific params be?
      return {x: evt.x, y: evt.y};
    }
  };
  
  View.prototype.amplified = function(amplified){
    if(!arguments.length){return this._amplified;}
    this._amplified = amplified;
    reference.render();
    return this;
  };
  
  View.prototype.addConcept = function(concept, evt){
    this.concepts.push(
      new ConceptView(concept, this.type.newParams(this, evt))
    );
    reference.render();
  };
  
  function ConceptView(concept, params){
    this.concept = concept;
    this.params = params || {};
  }
  
  function Concept(label){
    this.label = label;
  }
  
  window.reference = reference;
  
  
  // fake data
  my.views.push(new View("New Affinity Diagram",
    View.prototype.AFFINITY));
  
  reference.render();
}).call(this, $, d3);
