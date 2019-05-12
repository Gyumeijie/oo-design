namespace simpleFactory {
  abstract class Operation {
    private _numberA: number = 0;
    private _numberB: number = 0;

    public get numberA(): number {
      return this._numberA;
    }

    public set numberA(v: number) {
      this._numberA = v;
    }

    public get numberB(): number {
      return this._numberB;
    }

    public set numberB(v: number) {
      this._numberB = v;
    }

    abstract getResult(): number;
  }

  class OperationAdd extends Operation {
    getResult(): number {
      return this.numberA + this.numberB;
    }
  }

  class OperationSub extends Operation {
    getResult(): number {
      return this.numberA - this.numberB;
    }
  }

  class OperationMul extends Operation {
    getResult(): number {
      return this.numberA * this.numberB;
    }
  }

  class OperationDiv extends Operation {
    getResult(): number {
      if (this.numberB === 0) {
        throw new Error("divisor can not be 0");
      }
      return this.numberA / this.numberB;
    }
  }

  ///////////////////////////////////////////////////////////////////////////////

  class OperationFactory {
    static createOperation(operation: String): Operation {
      let oper: Operation = null;

      switch (operation) {
        case "+":
          oper = new OperationAdd();
          break;
        case "-":
          oper = new OperationSub();
          break;
        case "*":
          oper = new OperationMul();
          break;
        case "/":
          oper = new OperationDiv();
          break;
      }

      return oper;
    }
  }

  ///////////////////////////////////////////////////////////////////////////////

  let oper: Operation = OperationFactory.createOperation("/");
  oper.numberA = 1;
  oper.numberB = 2;
  console.log(oper.getResult());
  // 0.5
}
