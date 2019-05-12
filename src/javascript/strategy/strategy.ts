abstract class Strategy {
  abstract AlgorithmInterface(): void;
}

class ConcreteStrategyA extends Strategy {
  AlgorithmInterface() {
    console.log("Implementation A");
  }
}

class ConcreteStrategyB extends Strategy {
  AlgorithmInterface() {
    console.log("Implementation B");
  }
}

///////////////////////////////////////////////////////////////////////////////

class Context {
  strategy: Strategy;

  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }

  ContextInterface() {
    this.strategy.AlgorithmInterface();
  }
}

///////////////////////////////////////////////////////////////////////////////

let context = new Context(new ConcreteStrategyA());
context.ContextInterface();

context = new Context(new ConcreteStrategyB());
context.ContextInterface();

// Implementation A
// Implementation B
