interface Duck {
  quack(): void;
  fly(): void;
}

interface Turkey {
  gobble(): void;
  fly(): void;
}

///////////////////////////////////////////////////////////////////////////////

class MallarDuck implements Duck {
  quack(): void {
    console.log("Quack");
  }

  fly(): void {
    console.log("I'm flying");
  }
}

class WildTurkey implements Turkey {
  gobble(): void {
    console.log("Gobble");
  }

  fly(): void {
    console.log("I'm flying a short distance");
  }
}

///////////////////////////////////////////////////////////////////////////////

class TurkeyAdapter implements Duck {
  // Adaptee
  private turkey: Turkey;

  constructor(turkey: Turkey) {
    this.turkey = turkey;
  }

  quack(): void {
    this.turkey.gobble();
  }

  fly(): void {
    for (let i = 0; i < 5; i++) {
      this.turkey.fly();
    }
  }
}

///////////////////////////////////////////////////////////////////////////////

let turkey: WildTurkey = new WildTurkey();
let turkeyAdapter: Duck = new TurkeyAdapter(turkey);

turkeyAdapter.fly();
turkeyAdapter.quack();

// I'm flying a short distance
// I'm flying a short distance
// I'm flying a short distance
// I'm flying a short distance
// I'm flying a short distance
// Gobble
