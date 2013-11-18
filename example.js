//Example : Having 3 classes "Name" , "Age" and "Place" create an object "person" which should inherit from all three constructors. It should have all the prototype properties of each constructor and 'own'  properties of each constructor. Also "person" should be an instance of all 3. Thus dynamically adding prototypes properties to any constructor should reflect for "person" as well.
//Extra test case: Any objects of "Name" , "Age" , "Place" should NOT be instances of each others constructor functions but only its own constructor function.

function inherit() {
    var Prev, f, from, obj,params,arg, i = 0;

    function copy(to, objArray) {
        for (i = 0; i < objArray.length; i++) {
            if (Object.prototype.toString.call(objArray[i]) === "[object Object]") {
                params = objArray[i].Arguments;
                arg = objArray[i].Constructor;
                from = new arg();
                arg.apply(from, params);

            } else {
                from = new objArray[i]();
            }
            for (var prop in from) {
                if (from.hasOwnProperty(prop)) {
                    to[prop] = from[prop];
                }
            }
        }
    }

    function reset() {
        f = function () {};
    }

    for (i = 0; i < arguments.length; i++) {
        reset();
        if (Object.prototype.toString.call(arguments[i]) === "[object Object]") {
            arg = arguments[i].Constructor;
        } else {
            arg = arguments[i];
        }
        f.prototype = Object.create(arg.prototype);
        if (i > 0) {
            f.prototype.__proto__ = new Prev();
            //can also use Object.setPrototypeOf(f, new Prev()); in ES6;
        }
        Prev = f;
    }

    obj = new Prev();
    copy(obj, arguments);
    return obj;
}


var NameConstructor = function() {
    this.printName = function() {
        console.log("NameConstructor Method logging name : " + this.name);
    };
};

var AgeConstructor = function(age) {
    this.age = age || 0;
    this.printName = function() {
        console.log("AgeConstructor Method logging age : " + this.age);
    };
};

var PlaceConstructor = function() {};
PlaceConstructor.prototype.place = "Bangalore";

//call inherit to create a new instance of all three constructors.
var person = inherit(NameConstructor, {
    "Constructor": AgeConstructor,
        "parameters": [21]
},
PlaceConstructor);

NameConstructor.prototype.name = "aditya"; //adding prototype property 'name' after "person" object is created

console.log("Is person instance of NameConstructor? : " + (person instanceof NameConstructor));
console.log("Is person instance of AgeConstructor? : " + (person instanceof AgeConstructor));
console.log("Is person instance of PlaceConstructor? : " + (person instanceof PlaceConstructor));

console.log("Log person.name: " + (person.name));
console.log("Log person.age: " + (person.age));
console.log("Log person.place: " + (person.place));

var n = new NameConstructor();
console.log("creating object n as new NameConstructor");
console.log("Is n instance of NameConstructor? : " + (n instanceof NameConstructor));
console.log("Is n instance of AgeConstructor? : " + (n instanceof AgeConstructor));
console.log("Is n instance of PlaceConstructor? : " + (n instanceof PlaceConstructor));

var a = new AgeConstructor();
console.log("creating object a as new AgeConstructor");
console.log("Is a instance of NameConstructor? : " + (a instanceof NameConstructor));
console.log("Is a instance of AgeConstructor? : " + (a instanceof AgeConstructor));
console.log("Is a instance of PlaceConstructor? : " + (a instanceof PlaceConstructor));
