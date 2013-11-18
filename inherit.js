//Inherit function takes n Constructors to extend from as arguments. By @adityapunjani 

//Syntax inhert(Constructor1[, Constructor2[, ...]])
//Where each argument is function or an object.

//If your constructor function does not take arguments, pass the function itself to the "inherit" function as an argument. Ex var x = inherit(p,q,n) where p,q,n are constructor functions

//If you want to pass arguments to a constructor function, create an an object with "Constructor" (capital C) key defined as the constructor function and "Arguments" (capital A) key defined as an array of all arguments the constructor function takes in order. 
//Ex inherit(x, {"Constructor" : y, "Arguments" : [1,"asd",true]}, z) where x & z are constructor functions and the 2nd argument is an object with "Constructor" key as constructor function x and "Arguments" key as array of all arguments the constructor function takes. 

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
