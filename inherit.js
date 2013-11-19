//Inherit function takes n Constructors to extend from as arguments. By @adityapunjani 

//Syntax inhert(Constructor1[, Constructor2[, ...]])
//Where each argument is function or an object.

//If your constructor function does not take arguments, pass the function itself to the "inherit" function as an argument. Ex var x = inherit(p,q,n) where p,q,n are constructor functions

//If you want to pass arguments to a constructor function, create an an object with "Constructor" (capital C) key defined as the constructor function and "Arguments" (capital A) key defined as an array of all arguments the constructor function takes in order. 
//Ex inherit(x, {"Constructor" : y, "Arguments" : [1,"asd",true]}, z) 
//where x & z are constructor functions and the 2nd argument is an object with "Constructor" key as constructor function x and "Arguments" key as array of all arguments the constructor function takes. 
  


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

//Implemented Object.instanceOf to replace the "instanceof" operator so as to satisfy instanceof conditions.

//Dynamically adding prototype properties to any constructor should reflect for inherited object as well. 
//This is implemented using Object.observe and will only work for latest chrome browser whith experimental JavaScript flag turned on in chrome://flags/ or any other browser that supports ES6

//Todo Implement Object.observe polyfill for ES5.
