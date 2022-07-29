// Coding Challenge #1
const Car = function (make, speed) {
    this.make = make;
    this.speed = speed;
}
const BMW = new Car('BMW', 100);
const Audi = new Car('Audi', 120);

Car.prototype.accelerate = function () {
    console.log(`${this.make} is going at ${this.speed + 5}km/h`);
}
Car.prototype.brake = function () {
    console.log(`${this.make} is going at ${this.speed - 5}km/h`);
}

Audi.accelerate();
BMW.accelerate();

Audi.brake();
BMW.brake();


// Coding challenge 3 
const EV = function (make, speed, charge) {
    Car.call(this, make, speed);
    this.charge = charge;
}

EV.prototype = Object.create(Car.prototype);
EV.prototype.chargeBattery = function (chargeTo) {
    this.charge = chargeTo;
}
EV.prototype.accelerate = function () {
    this.speed += 20;
    this.charge--;
    console.log(`${this.make} is going at ${this.speed}km/h, with a charge of ${this.charge}`);
}

const tesla = new EV('Tesla', 120, 23);
tesla.chargeBattery(90);
tesla.accelerate();
tesla.brake();


// // Coding Challenge #2
class CarCl {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
    }
    accelerate() {
        this.speed += 10;
        console.log(`${this.make} is going at ${this.speed + 5}km/h`);
        this;
    }
    brake() {
        this.speed -= 5;
        console.log(`${this.make} is going at ${this.speed - 5}km/h`);
        return this;
    }
    get speedUS() {
        return this.speed / 1.6;
    }
    set speedUS(speed) {
        this.speed = speed * 1.6;
    }
}
const ford = new Car('ford', 120)
console.log(ford.speedUS);

ford.speedUS = 50;
console.log(ford);

ford.accelerate();
ford.brake();


// Coding Challenge 4
class ECVL extends CarCl {
    #charge;
    constructor(make, speed, charge) {
        super(make, speed);
        this.#charge = charge;
    }
    chargeBattery(chargeTo) {
        this.#charge = chargeTo;
        return this
    }
    accelerate() {
        this.speed += 20;
        this.#charge--;
        console.log(`${this.make} is going at ${this.speed - 5}km/h, with a charge of ${this.#charge}`);
        return this;
    }
}
const rivian = new ECVL('Rivian', 120, 23);
console.log(rivian);
rivian.accelerate().accelerate().accelerate().brake().chargeBattery(50).accelerate();