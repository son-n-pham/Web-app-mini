'use strict';

// console.log(this); // This is the window object

// const calcAge = function (birthYear) {
//   console.log(2037 - birthYear);
//   console.log(this); // undefine in strict mode or global object (window) in unstrict mode
// };
// calcAge(1982);

// const calcAgeArrow = birthYear => {
//   console.log(2037 - birthYear);
//   console.log(this); // this global object (window) in unstrict mode
// };
// calcAgeArrow(1982);

// const jonas = {
//   year: 1991,
//   calcAge: function () {
//     console.log(this); // this is jonas object, which is the owner of the object
//   },
// };
// jonas.calcAge();

// const matilda = {
//   year: 2017,
// };
// matilda.calcAge = jonas.calcAge;
// matilda.calcAge(); // this at this case is matilda. This is proving that this is pointing to the object calling the method having this.

// const f = jonas.calcAge;
// f(); // This is a regular function call with no object attached. Thus this is undefined.

/////////////////////////////////////////////////
// Regular Function vs Arrow Function

const jonas = {
  firstName: 'Jonas',
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);

    // // This function is not run as this keyword inside the function is undefined
    // const isMillenial = function () {
    //   console.log(this.year >= 1981 && this.year <= 1996); // this keyword is undefined as it is called in a function calcAge. There are 2 solutions
    // };
    // isMillenial();

    // // First solution is to use self out side the function first
    // self = this;
    // const isMillenial = function () {
    //   console.log(self.year >= 1981 && self.year <= 1996); // this keyword is undefined as it is called in a function calcAge. There are 2 solutions
    // };
    // isMillenial();

    // Second solution is to use arrow function
    const isMillenial = () => {
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillenial();
  },

  greet: () => {
    console.log(`Hey ${this.firstName}`);
    console.log(this); // Due to arrow function, this is the global object, which is window
  },

  greet1: function () {
    console.log(`Hey ${this.firstName}`);
    console.log(this); // Due to arrow function, this is the global object, which is window
  },
};
jonas.greet();
jonas.greet1();
jonas.calcAge();

// arguments keyword
// It exists only in regular function, not arrow function
// arguments is an object containing arrow of input arguments which we can access
const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExpr(2, 5);
addExpr(2, 5, 8, 12);

// // arguments is not define with arrow function, thus the below gives error
// const addExpr1 = (a, b) => {
//   console.log(arguments);
//   return a + b;
// };
// addExpr1(2, 5);
// addExpr1(2, 5, 8, 12);
