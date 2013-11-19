Multiple Inheritance Implemented in JavaScript
=============================

What is multiple inheritance? http://en.wikipedia.org/wiki/Multiple_inheritance

What does it mean in JavaScript? :
Having 3 classes "Name" , "Age" and "Place" create an object "person" which should inherit from all three constructors. It should have all the prototype properties of each constructor and 'own'  properties from each constructor. Also "person" should be an instance of all 3. Any instances of individual constructors should not be instances of other constructors. Dynamically adding prototype properties to any constructor should reflect for "person" object as well


Why? Because it can be done. Remember always bet on JS!

Live Example: Checkout output in Console.

JSFiddle : http://jsfiddle.net/adityapunjani/uYhPa/

JSBIN : http://jsbin.com/ESiwimEm/1/edit

Usage : Use the function "inherit" in inherit.js file or include the file.

Inherit function takes n Constructors to extend from as arguments.

Syntax inherit(Constructor1[, Constructor2[, ...]])
Where each argument is a function or an object.

If your constructor function does not take any arguments, pass the function itself to the "inherit" function as an argument. Ex var x = inherit(p,q,n) where p,q,n are constructor functions

If you want to pass arguments to a constructor function, create an an object with "Constructor" (capital C) key defined as the constructor function and "Arguments" (capital A) key defined as an array of all arguments the constructor function takes in order. 
Ex inherit(x, {"Constructor" : y, "Arguments" : [1,"asd",true]}, z) where x & z are constructor functions and the 2nd argument is an object with "Constructor" key as constructor function x and "Arguments" key as array of all arguments the constructor function takes. 

Implemented Object.instanceOf to replace the "instanceof" operator so as to satisfy the instance of conditions.

Reflecting dynamically added prototype properties is implemented using Object.observe and will only work for latest chrome browser whith experimental JavaScript flag turned on in chrome://flags/ or any other browser that supports ES6

Todo Implement Object.observe polyfill for ES5.
