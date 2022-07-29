'use strict';

const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
}

const jonas = new Person ('Jonas',1991);
const matila = new Person('Matila', 2017);
const jack = new Person('Jack',1990);
console.log(matila, jack,jonas);
console.log(jonas instanceof Person);

// Prototypes
console.log(Person.prototype);
Person.prototype.calcAge = function () {
    console.log(2037 - this.birthYear);
}

const Student = function (firstName, birthYear, course) {
    Person.call(this, firstName, birthYear);
    this.course = course;
}
// Linking prototypes
Student.prototype = Object.create(Person.prototype)

Student.prototype.introduce = function () {
    console.log(`My name is ${this.firstName} and I study ${this.course}.`);
}

const mike = new Student('Mike', 2020, 'Computer Science');
console.log(mike);
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student);

console.log(mike instanceof Person);

Student.prototype.constructor = Student;
console.log(Student.prototype.constructor);

jonas.calcAge();
matila.calcAge()
console.log(jonas.__proto__);
console.log(jonas.__proto__=== Person.prototype);
console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(matila));
console.log(Person.prototype.isPrototypeOf(Person));

Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matila.species);

console.log(jonas.hasOwnProperty('firstName'));
console.log(jonas.hasOwnProperty('species'));

console.log(jonas.__proto__);
console.log(jonas.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);

const arr = [1,2,3,4,5,6,6,6,5,3,2]; 
console.log(arr.__proto__ === Array.prototype);
console.log(arr.__proto__);
console.log((arr.__proto__.__proto__));
Array.prototype.unique = function(){
    return [...new Set(this)];
}
console.log(arr.unique());

// class expression
// const PersonCl = class{}

// class declaration
class PersonCl {
    constructor(fullName, birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
    }
    calcAge() {
        console.log(2037 - this.birthYear);
    }
    greet() {
        console.log(`hey ${this.firstName}`);
    }
    get age() {
        return 2037 - this.birthYear;
    }
    set fullName(name) {
        console.log(name);
        if (name.includes(' ')) this._fullName = name;
        else alert('enter full name');
    }
    get fullName() {
        return this._fullName;
    }

    static hey() {
        console.log('hey there!');
        console.log(this);
    }
}

class StudentCl extends PersonCl{
    // constructor(fullName,birthYear,course){
    //     super(fullName,birthYear);
    // }
}

const martha = new StudentCl('Martha Jones', 2012);
console.log(martha);
const jessica = new PersonCl('Jessica Davis', 1990);
jessica.calcAge();
console.log(jessica.age);
jessica.greet();
console.log(jessica);
console.log(jessica.__proto__ === PersonCl.prototype);
PersonCl.hey();

// getter ans setters
const walter = new PersonCl('Walter White ', 1965);
const account = {
    owner: 'jonas',
    movements: [200, 100, 300, 400],
    get latest() {
        return this.movements.slice(-1).pop();
    },
    set latest(movements) {
        this.movements.push(movements);
    }
};
console.log(account.latest);
account.latest = -100;
console.log(account.movements);
const PersonProto = {
    calcAge() {
        console.log(2037 - this.birthYear);
    },
    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    },
};
const steven = Object.create(PersonProto);
const StudentProto = Object.create(PersonProto);
StudentProto.init = function(firstName,birthYear,course){
    PersonProto.init.call(this, firstName,birthYear);
    this.course = course;
}
StudentProto.introduce = function(){
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
}
const jay = Object.create(StudentProto)
jay.init('Jay',2010,'cs');
jay.introduce();
jay.calcAge();
console.log(jay);
const sarah = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();
console.log(steven.__proto__ === PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();

// class fields
class Account {
    // Public Fields
    locale = navigator.language;
    // Private Fields
    #movements = [];
    #pin;
    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        // protected property
        this.#pin = pin;
        // this._movements = [];
        // this.locale = navigator.language;
        console.log(`Thanks for opening an account, ${owner}`);
    }
    getMovements() {
        return this.#movements;
    }
    deposit(val) {
        this.#movements.push(val);
        return this;
    }
    withdraw(val) {
        this.deposit(-val);
        return this;
    }
    #approveLoan(val) {
        return true;
    }
    requestLoan(val) {
        if (this.#approveLoan(val)) {
            this.deposit(val);
            console.log('loan approved');
        }
        return this;        
    }
    static helper() {
        console.log('hi');
    }
}
const acc1 = new Account('Jonas', 'eur', 1111, []);
acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
console.log(acc1.getMovements());
console.log(acc1);
Account.helper();
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);