var cake = {
  name: "German Chocolate Cake",
  ingredients: ["eggs", "flour", "oil", "chocolate", "sugar", "butter"],
  topping: "coconut frosting",
  bakeTemp: "425 degrees",
  bakeTime: "45 minutes",
  customer: "Tommy",
  //die Callback -Funktion in timeout muss hier zu dem richtigen Inhalt gebunden werden
  decorate: function(updateStatus) {
    var status = "Decorating with " + this.topping + ". Ready to eat soon!"
    updateFunction.call(updateStatus, status)
	//hier rufe ich ein letztes Mal die Funktion "updateStatus" auf, mit der ich den Text im DOM poste
	//- hier erzeugt die Funktion serve den Text das thsi ist auch wieder das DOM-Objekt,
	//	das ich bei makeCake oder Make Pie erzeugt hatte
    setTimeout(() => {
      updateFunction.call(updateStatus, serve.call(this, "Happy Eating!", this.customer))
    }, 2000)
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
//In der makePiFunktion soll man die decorate-Funktion von cake borgen und für den Pie verfügbar machen
//Innerhalb der makeCake und makePie Funktionen soll man eine Version von updateStatus erzeugen mit dem richtigen this-Inhalt,
//der jeweils das pie oder cake div wiedergeben soll. Das soll man dann an die anderen Funktionen weitergeben können, damit sie
//auch immer das richtige DOM-Element updaten
function makeCake() {
  mix.call(cake, this)
}

function makePie() {
	//die Variable updateStatus hier ist ein DOM-Element, aber auch ein Objekt und kann deshalb später als this in UpdateStatus verwendet werden
  pie.decorate = cake.decorate.bind(pie);
  //Das this ist hier der pie und das andere DOM-Objekt wird als Argument an die mix-Funktion übergeben
  mix.call(pie, this)
}


//diese Funktion soll nicht verändert werden - sie muss immer mit dem DOM-Element/Objekt als this aufgerufen werden
function updateFunction(statusText) {
  this.getElementsByClassName("status")[0].innerText = statusText
}

function bake(updateStatus) {
  var status = "Baking at " + this.bakeTemp + " for " + this.bakeTime
  setTimeout(() => {
    cool.call(this, updateStatus)
  }, 2000);
  updateFunction.call(updateStatus, status)
}

function mix(updateStatus) {
  var status = "Mixing " + this.ingredients.join(", ")
//Der Trick hier ist, dass man das DOM-Objekt (updateFunction) einmal als Argument übergibt und einmal als this-Objekt
 setTimeout (() => {
    bake.call(this, updateStatus)
  }, 2000);
  updateFunction.call(updateStatus, status)
}

function cool(updateStatus) {
  var status = "It has to cool! Hands off!"
    setTimeout(() => {
    this.decorate.call(this, updateStatus)
  }, 2000);
  updateFunction.call(updateStatus, status)
}

function makeDessert() {
//wenn man auf einem DOM-Element eine Funktion aufruft, dann hat die Funktion das DOM-Element als this
if (this.innerHTML==="Make Cake"){
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
