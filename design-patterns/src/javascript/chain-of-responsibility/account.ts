abstract class Account {
  protected successor: Account = null;
  protected balance: number;
  private accountType: String;

  constructor(accountType: String) {
    this.accountType = accountType;
  }

  private canPay(amount: number): boolean {
    return this.balance >= amount;
  }

  setNext(account: Account) {
    this.successor = account;
  }

  pay(amountToPay: number) {
    if (this.canPay(amountToPay)) {
      console.log(`Paid ${amountToPay} using ${this.accountType}`);
    } else if (this.successor) {
      console.log(`Cannot pay using ${this.accountType}. Proceeding...`);
      this.successor.pay(amountToPay);
    } else {
      throw "None of the accouts have enough balance";
    }
  }
}

///////////////////////////////////////////////////////////////////////////////

class Bank extends Account {
  protected balance: number;

  constructor(balance: number) {
    super("Bank");
    this.balance = balance;
  }
}

class Paypal extends Account {
  protected balance: number;

  constructor(balance: number) {
    super("Paypal");
    this.balance = balance;
  }
}

class Bitcoin extends Account {
  protected balance: number;

  constructor(balance: number) {
    super("Bitcoin");
    this.balance = balance;
  }
}

///////////////////////////////////////////////////////////////////////////////

let bank: Account = new Bank(100);
let paypal: Account = new Paypal(500);
let bitcoin: Account = new Bitcoin(300);
bank.setNext(paypal);
paypal.setNext(bitcoin);

bank.pay(259);

// Cannot pay using Bank. Proceeding...
// Paid 259 using Paypal
