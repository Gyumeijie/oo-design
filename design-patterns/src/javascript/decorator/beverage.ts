/*
 * @Priciples: Open/closed principle (OCP)
 */

abstract class Beverage {
  protected description: String;

  getDescription(): String {
    return this.description;
  }

  abstract cost(): number;
}

abstract class CondimentDecorator extends Beverage {
  abstract getDescription(): String;
}

class Espresso extends Beverage {
  constructor() {
    super();
    this.description = "Espresso";
  }

  cost() {
    return 1.99;
  }
}

///////////////////////////////////////////////////////////////////////////////

class HouseBlend extends Beverage {
  constructor() {
    super();
    this.description = "House Blend Coffee";
  }

  cost() {
    return 0.89;
  }
}

class Mocha extends CondimentDecorator {
  private beverage: Beverage;

  constructor(beverage: Beverage) {
    super();
    this.beverage = beverage;
  }

  getDescription() {
    return `${this.beverage.getDescription()}, Mocha`;
  }

  cost() {
    return 0.2 + this.beverage.cost();
  }
}

class Whip extends CondimentDecorator {
  private beverage: Beverage;

  constructor(beverage: Beverage) {
    super();
    this.beverage = beverage;
  }

  getDescription() {
    return `${this.beverage.getDescription()}, Whip`;
  }

  cost() {
    return 0.35 + this.beverage.cost();
  }
}

///////////////////////////////////////////////////////////////////////////////

let beverage = new HouseBlend();
beverage = new Whip(beverage);
beverage = new Mocha(beverage);
beverage = new Mocha(beverage);

console.log(`beverage: ${beverage.getDescription()}, cost: ${beverage.cost()}`);

// beverage: House Blend Coffee, Whip, Mocha, Mocha, cost: 1.64