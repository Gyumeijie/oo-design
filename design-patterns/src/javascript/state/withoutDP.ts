namespace WithoutDesignPattern {
  enum State {
    SOLD_OUT,
    NO_QUARTER,
    HAS_QUARTER,
    SOLD
  }

  class GumballMachine {
    private state: State = State.SOLD_OUT;
    private count: number = 0;

    constructor(count: number) {
      this.count = count;
      this.state = count > 0 ? State.NO_QUARTER : this.state;
    }

    insertQuarter() {
      if (this.state === State.HAS_QUARTER) {
        console.log("You can't insert another quarter");
      } else if (this.state === State.NO_QUARTER) {
        this.state = State.HAS_QUARTER;
        console.log("You inserted a quarter");
      } else if (this.state === State.SOLD_OUT) {
        console.log("You can't insert a quarter, the machine is sold out");
      } else if (this.state === State.SOLD) {
        console.log("Please wait, we're already giving you a gumball");
      }
    }

    ejectQuarter() {
      if (this.state === State.HAS_QUARTER) {
        console.log("Quarter returned");
        this.state = State.NO_QUARTER;
      } else if (this.state === State.NO_QUARTER) {
        console.log("You haven't inserted a quarter");
      } else if (this.state === State.SOLD) {
        console.log("Sorry, you already turned the crank");
      } else if (this.state === State.SOLD_OUT) {
        console.log("You can't eject, you haven't inserted a quarter yet");
      }
    }

    turnCrank() {
      if (this.state === State.SOLD) {
        console.log("Turning twice doesn't get you another gumball");
      } else if (this.state === State.NO_QUARTER) {
        console.log("You turned but there's no quarter");
      } else if (this.state === State.SOLD_OUT) {
        console.log("You turned but there are no gumballs");
      } else if (this.state === State.HAS_QUARTER) {
        this.state = State.SOLD;
        console.log("You turned...");
        this.dispense();
      }
    }

    dispense() {
      if (this.state === State.SOLD) {
        console.log("A gumball comes rolling out the slot");
        this.count--;
        if (this.count === 0) {
          console.log("Oops, out of gumballs!");
          this.state = State.SOLD_OUT;
        } else {
          this.state = State.NO_QUARTER;
        }
      } else if (this.state === State.NO_QUARTER) {
        console.log("You need to pay first");
      } else if (this.state === State.SOLD_OUT) {
        console.log("No gumball dispensed");
      } else if (this.state === State.HAS_QUARTER) {
        console.log("No gumball dispensed");
      }
    }
  }

  ///////////////////////////////////////////////////////////////////////////////

  let gumballMachine = new GumballMachine(2);

  // You inserted a quarter
  // You turned...
  // A gumball comes rolling out the slot
  gumballMachine.insertQuarter();
  gumballMachine.turnCrank();

  // You inserted a quarter
  // Quarter returned
  // You turned but there's no quarter
  gumballMachine.insertQuarter();
  gumballMachine.ejectQuarter();
  gumballMachine.turnCrank();

  // You inserted a quarter
  // You turned...
  // A gumball comes rolling out the slot
  // Oops, out of gumballs!
  gumballMachine.insertQuarter();
  gumballMachine.turnCrank();

  // You can't insert a quarter, the machine is sold out
  // You turned but there are no gumballs
  gumballMachine.insertQuarter();
  gumballMachine.turnCrank();
}
