//Example : Having 3 classes "Name" , "Age" and "Place" create an object "person" which should inherit from all three constructors. It should have all the prototype properties of each constructor and 'own'  properties of each constructor. Also "person" should be an instance of all 3. Any instances of individual constructors should not be instances of other constructors.

//Implemented Object.instanceOf to replace the "instanceof" operator so as to satisfy the above conditions.

//Dynamically adding prototype properties to any constructor should reflect for "person" object as well. This is implemented using Object.observe and will only work for latest chrome browser whith experimental JavaScript flag turned on in chrome://flags/ or any other browser that supports ES6

//Todo Implement Object.observe polyfill for ES5.

Object.prototype.instanceOf = function (obj) {
    if (this.constructor === obj) return true;
    if (this.constructors) {
        for (var i = 0; i < this.constructors.length; i++) {
            if (this.constructors[i] === obj) return true;
        }
    }
    return false;
};

function inherit() {
    function clone(to, source) {
        for (var key in source) {
            to[key] = source[key];
        }
    }
    var Prev, f, from, obj, params, arg, i = 0;

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

    f = function () {};
    constructors = [];
    for (i = 0; i < arguments.length; i++) {


        arg = arguments[i].Constructor || arguments[i];

        clone(f.prototype, arg.prototype);

        if (Object.observe) {
            var change = (function (a) {
                return function () {
                    clone(f.prototype, a);
                };
            })(arg.prototype);
            Object.observe(arg.prototype, change);
        }
        constructors.push(arg);
    }

    obj = new f();
    copy(obj, arguments);
    obj.constructors = constructors;
    return obj;
}

//Example : Having 3 classes "Name" , "Age" and "Place" create an object "person" which should inherit from all three constructors. It should have all the prototype properties of each constructor and 'own'  properties of each constructor. Also "person" should be an instance of all 3. Thus dynamically adding prototypes properties to any constructor should reflect for "person" as well.


var NameConstructor = function n() {
    this.printName = function () {
        console.log("NameConstructor Method logging name : " + this.name);
    };
};
NameConstructor.prototype.name = "aditya";

var AgeConstructor = function a(age) {
    this.age = age || 0;
    this.printName = function () {
        console.log("AgeConstructor Method logging age : " + this.age);
    };
};

var PlaceConstructor = function p() {};
PlaceConstructor.prototype.place = "Bangalore";

//call inherit to create a new instance of all three constructors.
var person = inherit(NameConstructor, {
    "Constructor": AgeConstructor,
        "Arguments": [21]
},
PlaceConstructor);


console.log("Is person instance of NameConstructor? : " + person.instanceOf(NameConstructor));
console.log("Is person instance of AgeConstructor? : " + person.instanceOf(AgeConstructor));
console.log("Is person instance of PlaceConstructor? : " + person.instanceOf(PlaceConstructor));

console.log("Log person.name: " + (person.name));
console.log("Log person.age: " + (person.age));
console.log("Log person.place: " + (person.place));

console.log("Creating instance of NameConstructor as n");
var n = new NameConstructor();
console.log("Is n instance of NameConstructor? : " + n.instanceOf(NameConstructor));
console.log("Is n instance of AgeConstructor? : " + n.instanceOf(AgeConstructor));
console.log("Is n instance of PlaceConstructor? : " + n.instanceOf(PlaceConstructor));

console.log("Creating instance of AgeConstructor as a");
var a = new AgeConstructor();
console.log("Is a instance of NameConstructor? : " + a.instanceOf(NameConstructor));
console.log("Is a instance of AgeConstructor? : " + a.instanceOf(AgeConstructor));
console.log("Is a instance of PlaceConstructor? : " + a.instanceOf(PlaceConstructor));

console.log("Creating instance of PlaceConstructor as p");
var p = new PlaceConstructor();
console.log("Is p instance of NameConstructor? : " + p.instanceOf(NameConstructor));
console.log("Is p instance of AgeConstructor? : " + p.instanceOf(AgeConstructor));
console.log("Is p instance of PlaceConstructor? : " + p.instanceOf(PlaceConstructor));
