interface GumballMachineState {
  insertQuarter(): void;
  ejectQuarter(): void;
  turnCrank(): void;
  dispense(): void;
}

///////////////////////////////////////////////////////////////////////////////

class GumballMachine {
  private soldOutState: GumballMachineState;
  private noQuarterState: GumballMachineState;
  private hasQuarterState: GumballMachineState;
  private soldState: GumballMachineState;

  private state: GumballMachineState = this.soldOutState;
  private count: number = 0;

  constructor(count: number) {
    this.soldOutState = new SoldOutState(this);
    this.noQuarterState = new NoQuarterState(this);
    this.hasQuarterState = new HasQuarterState(this);
    this.soldState = new SoldState(this);

    this.count = count;
    this.state = count > 0 ? this.noQuarterState : this.state;
  }

  setState(state: GumballMachineState) {
    this.state = state;
  }

  getState(state: string): GumballMachineState {
    if (["soldOut", "noQuarter", "hasQuarter", "sold"].includes(state)) {
      return eval(`this.${state}State`);
    }
    return this.state;
  }

  getCount(): number {
    return this.count;
  }

  insertQuarter() {
    this.state.insertQuarter();
  }

  ejectQuarter() {
    this.state.ejectQuarter();
  }

  turnCrank() {
    this.state.turnCrank();
    this.state.dispense();
  }

  releaseBall() {
    console.log("A gumball comes rolling out the slot");
    if (this.count != 0) this.count--;
  }
}

///////////////////////////////////////////////////////////////////////////////

class NoQuarterState implements GumballMachineState {
  gumballMachine: GumballMachine;

  constructor(gumballMachine: GumballMachine) {
    this.gumballMachine = gumballMachine;
  }

  insertQuarter() {
    console.log("You inserted a quarter");
    this.gumballMachine.setState(this.gumballMachine.getState("hasQuarter"));
  }

  ejectQuarter() {
    console.log("You haven't inserted a quarter");
  }

  turnCrank() {
    console.log("You turned but there's no quarter");
  }

  dispense() {
    console.log("You need to pay first");
  }
}

class HasQuarterState implements GumballMachineState {
  gumballMachine: GumballMachine;

  constructor(gumballMachine: GumballMachine) {
    this.gumballMachine = gumballMachine;
  }

  insertQuarter() {
    console.log("You can't insert another quarter");
  }

  ejectQuarter() {
    this.gumballMachine.setState(this.gumballMachine.getState("noQuarter"));
    console.log("Quarter returned");
  }

  turnCrank() {
    console.log("You turned...");
    this.gumballMachine.setState(this.gumballMachine.getState("sold"));
  }

  dispense() {
    console.log("No gumball dispensed");
  }
}

class SoldState implements GumballMachineState {
  gumballMachine: GumballMachine;

  constructor(gumballMachine: GumballMachine) {
    this.gumballMachine = gumballMachine;
  }

  insertQuarter() {
    console.log("Please wait, we're already giving you a gumball");
  }

  ejectQuarter() {
    console.log("Sorry, you already turned the crank");
  }

  turnCrank() {
    console.log("Turning twice doesn't get you another gumball");
  }

  dispense() {
    this.gumballMachine.releaseBall();
    if (this.gumballMachine.getCount() > 0) {
      this.gumballMachine.setState(this.gumballMachine.getState("noQuarter"));
    } else {
      console.log("Oops, out of gumballs!");
      this.gumballMachine.setState(this.gumballMachine.getState("soldOut"));
    }
  }
}

class SoldOutState implements GumballMachineState {
  gumballMachine: GumballMachine;

  constructor(gumballMachine: GumballMachine) {
    this.gumballMachine = gumballMachine;
  }

  insertQuarter() {
    console.log("You can't insert a quarter, the machine is sold out");
  }

  ejectQuarter() {
    console.log("You can't eject, you haven't inserted a quarter yet");
  }

  turnCrank() {
    console.log("You turned but there are no gumballs");
  }

  dispense() {
    console.log("No gumball dispensed");
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
// You need to pay first
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
// No gumball dispensed
gumballMachine.insertQuarter();
gumballMachine.turnCrank();

// tsc gumballMachine.ts --target ES2016 && node gumballMachine.js
