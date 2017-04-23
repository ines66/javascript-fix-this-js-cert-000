var cake = {
  name: "German Chocolate Cake",
  ingredients: ["eggs", "flour", "oil", "chocolate", "sugar", "butter"],
  topping: "coconut frosting",
  bakeTemp: "425 degrees",
  bakeTime: "45 minutes",
  customer: "Tommy",
  //die Callback -Funktion in timeout muss hier zu dem richtigen Inhalt gebunden werden
  decorate: function(updateFunction) {
    var status = "Decorating with " + this.topping + ". Ready to eat soon!";
    updateFunction(status)
	//hier rufe ich ein letztes Mal die ergänzte Funktion (mit dem DOM-Element) "updateFunction" auf, mit der ich den Text im DOM poste
	//- hier erzeugt die Funktion serve den Text, ich kann die Funktion updateFunction im timeout nicht direkt ausführen, deswegen muss
	//ich eine Funktion definieren, die die Funktion ausführt
  setTimeout( function(){updateFunction(serve.call(this, "Happy Eating!", this.customer))}.bind(this) , 2000)
  }
}


var pie = {
  name: "Apple Pie",
  ingredients: ["apples", "flour", "eggs", "butter", "sugar"],
  topping: "streusel",
  bakeTemp: "350 degrees",
  bakeTime: "75 minutes",
  customer: "Tammy"
}

//Innerhalb der makeCake und makePie Funktionen soll man eine neue Version von updateStatus erzeugen, mit dem richtigen this-Inhalt(DOM-Objekt),
//der jeweils das pie oder cake div wiedergeben soll. Das soll man dann an die anderen Funktionen weitergeben können, damit sie
//auch immer das richtige DOM-Element updaten
function makeCake() {
  var updateCakeStatus = updateStatus.bind(this)
  mix.call(cake, updateCakeStatus)
}
//In der makePie Funktion soll man die decorate-Funktion von cake borgen und für den Pie verfügbar machen
function makePie() {
  pie.decorate = cake.decorate.bind(pie);
  //die Variable updatePieStatus hier ist die Funktion updateSatus mit dem DOM-Objekt als this
  var updatePieStatus = updateStatus.bind(this)
  //Das this ist hier der pie und das andere DOM-Objekt wird als Argument an die mix-Funktion übergeben
  mix.call(pie, updatePieStatus)
}


//diese Funktion soll nicht verändert werden
// sie wurde mit dem DOM-Element/Objekt als this durch .bind ergänzt und wird dann immer in der Version verwendet
function updateStatus(statusText) {
  this.getElementsByClassName("status")[0].innerText = statusText
}

function bake(updateFunction) {
  var status = "Baking at " + this.bakeTemp + " for " + this.bakeTime
  //Achtung in setTimeout wird die Funktion nicht aufgerufen nur definiert
  setTimeout (function(){cool.call(this, updateFunction)}.bind(this), 2000)
 // setTimeout(cool.bind(this, updateFunction), 2000);
  updateFunction(status)
}

function mix(updateFunction) {
  var status = "Mixing " + this.ingredients.join(", ")
//Hier wird mit this jeweils Kuchen oder Pie weitergegeben, die updateFunction kennt schon ihr richtiges DOM-this
 setTimeout (function(){bake.call(this, updateFunction)}.bind(this), 2000)
 //someFn(callback.bind(this), 2000)
   updateFunction(status);
}

function cool(updateFunction) {
  var status = "It has to cool! Hands off!"
  setTimeout (function(){this.decorate.call(this, updateFunction)}.bind(this), 2000)
  //setTimeout(this.decorate.bind(this, updateFunction), 2000)
  updateFunction(status)
}

function makeDessert() {
//wenn man auf einem DOM-Element eine Funktion aufruft, dann hat die Funktion das DOM-Element als this
if (this.innerHTML==="Make Cake"){
//hier rufe ich die Funktion makeCall mit dem DOM-Objekt als this auf
makeCake.call(document.getElementById("cake"))
}
 else {
makePie.call(document.getElementById("pie"))

 }

  //add code here to decide which make... function to call
  //based on which link was clicked
}

function serve(message, customer) {
  //you shouldn't need to alter this function
  return(customer + ", your " + this.name + " is ready to eat! " + message)
}

document.addEventListener("DOMContentLoaded", function(event) {
  //you shouldn't need to alter this function
  var cookLinks = document.getElementsByClassName("js-make")
  for(var i=0; i<cookLinks.length; i++) {
    cookLinks[i].addEventListener("click", makeDessert)
  }
});
