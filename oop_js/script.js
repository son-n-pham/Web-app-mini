'use strict';

// Create OOP with constructor
// Contructor is just a normal regular function, but not arrow function
// The special is to have new keyword when calling the class
const Person = function (firstName, birthYear) {
  console.log(this);
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Create a method in constructor function
  // NEVER do that as it is creating method for each instance
  // which can impact negatively to performance
  // The better solution is to use prototype
  this.calcAge = function () {
    console.log(2037 - this.birthYear);
  };
};

// prototype is better for creating
// Each instance (object) created from the Person
// inherits from Person.prototype, which include the
// calcAgeBetter method
Person.prototype.calcAgeBetter = function () {
  console.log(2037 - this.birthYear);
};

const jonas = new Person('Jonas', 1991);
// 1. New empty object {} is created
// 2. function is called, this = {}
// 3. {} is linked to prototype
// 4. function automatically return {}

const matilda = new Person('Matilda', 2017);

console.log(jonas instanceof Person); // return true
console.log(matilda, jonas); // return 2 instances matilda and jonas

// Both of the below method is working.
// The first one is the method defined inside the constructor
// The next one is the method defined in the Person.prototype
matilda.calcAge();
matilda.calcAgeBetter();

// Each object has the __proto__ property accessing to the object prototype
console.log(jonas.__proto__);
// Therefore, jonas.__proto__ is the same as Person.prototype, thus the below return true
console.log(jonas.__proto__ === Person.prototype);

// Another way to check the above is
console.log(Person.prototype.isPrototypeOf(jonas)); // return true
console.log(Person.prototype.isPrototypeOf(matilda)); // return true

// We can also set property to prototype
Person.prototype.species = 'mankind';
console.log(jonas, matilda); // We can see species property in Prototype, not directly in the object

////////////////////////////////////////////////////
// Prototype Inheritance
console.log(jonas.__proto__); // return Person.prototype
console.log(jonas.__proto__.__proto__); // return the higher prototype, which is Object.prototype which is the highest prototype level

// Array.prototype
const arr = [3, 2, 4, 5, 5, 6, 5, 9];
console.log(arr);
console.log(arr.__proto__ === Array.prototype); // return true

// We can add a method to Array.prototype and other array objects
// can have that new method. The below return a unique array from
// an array with duplicate components
Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique()); // return [3, 2, 4, 5, 6, 9]

// console.dir to check the object
console.dir(x => x + 1);

///////////////////////////////////////
// Coding Challenge #1
console.log('/////////////////////////////////////');
console.log('/////////// Challenge 1 /////////////');
// 1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
const Car = function (make, speed) {
  this.speed = speed;
  this.make = make;
};
// 2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(this.speed);
};
// 3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(this.speed);
};

// 4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

// DATA CAR 1: 'BMW' going at 120 km/h
const car1 = new Car('BMW', 120);
console.log('///// Car 1 /////');
console.log(car1);
car1.accelerate();
car1.accelerate();
car1.brake();
// DATA CAR 2: 'Mercedes' going at 95 km/h
const car2 = new Car('Mercedes', 95);
console.log('///// Car 2 /////');
console.log(car2);
car2.accelerate();
car2.accelerate();
car2.brake();

///////////////////////////////////////
// Coding Challenge #2
console.log('/////////////////////////////////////');
console.log('/////////// Challenge 1 /////////////');
// 1. Re-create challenge 1, but this time using an ES6 class;
class CarClass {
  constructor(make, speed) {
    this.speed = speed;
    this.make = make;
  }

  accelerate() {
    this.speed += 10;
    console.log(this.speed);
  }

  brake() {
    this.speed -= 5;
    console.log(this.speed);
  }

  // 2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
  get speedUS() {
    return this.speed / 1.6;
  }

  // 3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6)
  set speedUS(speedInMile) {
    this.speed = speedInMile * 1.6;
  }
}

// 4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.
// DATA CAR 1: 'Ford' going at 120 km/h
const car3 = new CarClass('Ford', 120);
console.log(car3);
car3.accelerate();
car3.brake();
console.log(car3.speedUS);

//////////////////////////////////////////////////
// Object.create
// Object.create can link prototype of instance or class to another class's prototype
// It is used for create inheritance between classes created by constructor function
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto); // Create an instance link to the prototype of PersonProto
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

// Person1 is class created by constructor function
const Person1 = function (firstName, birthYear) {
  console.log(this);
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person1.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};
const Student = function (firstName, birthYear, course) {
  // We use Person1.call(this,...)  as Person1(...) is not working
  // call is used for Person1 to call its this, so that its
  // this.firstName and this.birthYear are defined
  Person1.call(this, firstName, birthYear);
  this.course = course;
};

// We use Object.create to link Student.prototype to Person1.prototype
// With this setup, Student inhirent all prototype of Person1
Student.prototype = Object.create(Person1.prototype);

// We then can create the own prototype of Student
Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study`);
};

console.log(Student);

// Create a new instance of Student
const mike = new Student('Mike', 2000, 'IT');
console.log(mike);
console.dir(Student.prototype.constructor);
Student.prototype.constructor = Student; // Doing this to set constructor of Student to Student
console.log(mike);
console.dir(Student.prototype.constructor);

///////////////////////////////////////////////
// Inhiritance between Classes with ES6 Classes
console.log('////////////////////////////////////////////');
console.log('Inhiritance between Classes with ES6 Classes');
class Student1 extends Person1 {
  constructor(firstName, birthYear, course) {
    super(firstName, birthYear); // always need
    this.course = course;
  }
  introduce() {
    console.log(`My name is ${this.firstName}, I study ${this.course}.`);
  }
  calcAge() {
    console.log('This is to overwrite the calcAge in Person1.prototype');
  }
}

const martha = new Student1('Martha', 1970, 'CS');
console.log(martha);
martha.introduce();
martha.calcAge();

///////////////////////////////////////////////
// Another class example
console.log('////////////////////////////////////////////');
console.log('Another class example');

class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.pin = pin;
    this.movement = [];
    this.locale = navigator.language;
  }

  // Public interface
  deposit(val) {
    this.movement.push(val);
  }

  withdraw(val) {
    this.deposit(-val);
  }

  approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this.approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
    }
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);

console.log(acc1);

acc1.deposit(250);
acc1.withdraw(140);

console.log(acc1);

///////////////////////////////////////////////
// Encapsulation: Protected Properties and Methods
console.log('////////////////////////////////////////////');
console.log('Encapsulation: Protected Properties and Methods');

class AccountProtected {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this._pin = pin;
    this._movement = [];
    this.locale = navigator.language;
  }

  // Public interface
  getMovements() {
    return this._movement;
  }

  deposit(val) {
    this._movement.push(val);
  }

  withdraw(val) {
    this.deposit(-val);
  }

  _approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
    }
  }
}

const accProtected = new AccountProtected('Jonas', 'EUR', 1111);

console.log(accProtected);

accProtected.deposit(250);
accProtected.withdraw(140);

console.log(accProtected);

///////////////////////////////////////////////
// Encapsulation: Private Class Fields and Methods
console.log('////////////////////////////////////////////');
console.log('Encapsulation: Private Class Fields and Methods');

class AccountPrivate {
  // 1. Public fields
  locale = navigator.language;

  // 2. Private fields
  #pin;
  #movement = [];

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    // this.#movement = [];
    // this.locale = navigator.language;
  }

  // 3. Public method
  getMovements() {
    return this.#movement;
  }

  deposit(val) {
    this.#movement.push(val);
  }

  withdraw(val) {
    this.deposit(-val);
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
    }
  }

  // 4.Private method
  // Current not in Prototype, Chrome treat it as private field
  #approveLoan(val) {
    return true;
  }

  // 5. Static helper
  static helper() {
    console.log('This is a static helper available in Class level');
  }
}

const accPrivate = new AccountPrivate('Jonas', 'EUR', 1111);

console.log(accPrivate);

accPrivate.deposit(250);
accPrivate.withdraw(140);

console.log(accPrivate);

AccountPrivate.helper();

///////////////////////////////////////////////
// Encapsulation: Private Class Fields and Methods
// For chaining methods to work, the methods need to return the account
// which is can happen by using return this keyword
console.log('////////////////////////////////////////////');
console.log('Chaining Methods');

class AccountChaining {
  // 1. Public fields
  locale = navigator.language;

  // 2. Chaining fields
  #pin;
  #movement = [];

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    // this.#movement = [];
    // this.locale = navigator.language;
  }

  // 3. Public method
  getMovements() {
    return this.#movement;
  }

  deposit(val) {
    this.#movement.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
    }
    return this;
  }

  // 4.Chaining method
  // Current not in Prototype, Chrome treat it as Chaining field
  #approveLoan(val) {
    return true;
  }

  // 5. Static helper
  static helper() {
    console.log('This is a static helper available in Class level');
  }
}

const accChaining = new AccountChaining('Jonas', 'EUR', 1111);

console.log(accChaining);

accChaining.deposit(250).withdraw(140).requestLoan(2000);

console.log(accChaining);

AccountChaining.helper();
