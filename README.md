Multiple Inheritance Implemented in JavaScript
=============================

What is multiple inheritance? http://en.wikipedia.org/wiki/Multiple_inheritance

What does it mean in JavaScript? :
Having 3 classes (constructor functions) "Name" , "Age" and "Place" , create an object "person" which should inherit from all three constructors. It should have all the prototype properties of each constructor and 'own' properties of each constructor. Also "person" should be an instance of all 3. Thus dynamically adding prototypes properties to any constructor should reflect for "person" as well.
Extra test case: Any objects of "Name" , "Age" , "Place" should NOT be instances of each other.

Live Example: Checkout output in Console.
JSFiddle : http://jsfiddle.net/adityapunjani/uYhPa/
JSBIN : http://jsbin.com/UVOCuViR/1/edit

Usage : Use the function "inherit" in inherit.js file or include the file.

Inherit function takes n Constructors to extend from as parameters. By @adityapunjani 

Syntax inhert(Constructor1[, Constructor2[, ...]])
Where each argument is function or an object.

If your constructor function does not take arguments, pass the function itself to the "inherit" function as an argument. Ex var x = inherit(p,q,n) where p,q,n are constructor functions

If you want to pass arguments to a constructor function, create an an object with "Constructor" (capital C) key defined as the constructor function and "Arguments" (capital A) key defined as an array of all arguments the constructor function takes in order. 
Ex inherit(x, {"Constructor" : y, "Arguments" : [1,"asd",true]}, z) where x & z are constructor functions and the 2nd argument is an object with "Constructor" key as constructor function x and "Arguments" key as array of all arguments the constructor function takes. 
