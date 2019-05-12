abstract class Company {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract add(company: Company): void;
  abstract remove(company: Company): void;
  abstract display(depth: number): void;
}

///////////////////////////////////////////////////////////////////////////////

class ConcreteCompany extends Company {
  private children: Array<Company> = new Array<Company>();

  constructor(name: string) {
    super(name);
  }

  add(company: Company) {
    this.children.push(company);
  }

  remove(company: Company) {
    let index = this.children.indexOf(company);
    this.children.splice(index, 1);
  }

  display(depth: number) {
    console.log(
      `${Array(depth)
        .fill("-")
        .join("")} ${this.name}`
    );

    for (let i = 0; i < this.children.length; i++) {
      this.children[i].display(depth + 4);
    }
  }
}

class HRDepartment extends Company {
  constructor(name: string) {
    super(name);
  }

  add() {}

  remove() {}

  display(depth: number) {
    console.log(
      `${Array(depth)
        .fill("-")
        .join("")} ${this.name}`
    );
  }
}

class FinanceDepartment extends Company {
  constructor(name: string) {
    super(name);
  }

  add() {}

  remove() {}

  display(depth: number) {
    console.log(
      `${Array(depth)
        .fill("-")
        .join("")} ${this.name}`
    );
  }
}

///////////////////////////////////////////////////////////////////////////////

let root = new ConcreteCompany("BeiJing HeadQuarter");
root.add(new HRDepartment("HRDepartment of HeadQuarter"));
root.add(new FinanceDepartment("FinanceDepartment of HeadQuarter"));

let esternChinaBranch = new ConcreteCompany("ShangHai Branch Office");
esternChinaBranch.add(new HRDepartment("HRDepartment of ShangHai Branch Office"));
esternChinaBranch.add(new FinanceDepartment("FinanceDepartment of ShangHai Branch Office"));
root.add(esternChinaBranch);

let NanJingOffice = new ConcreteCompany("NanJing Office");
NanJingOffice.add(new HRDepartment("HRDepartment of NanJing Office"));
NanJingOffice.add(new FinanceDepartment("FinanceDepartment of NanJing Office"));
esternChinaBranch.add(NanJingOffice);

let HangZhouOffice = new ConcreteCompany("HangZhou Office");
HangZhouOffice.add(new HRDepartment("HRDepartment of HangZhou Office"));
HangZhouOffice.add(new FinanceDepartment("FinanceDepartment of HangZhou Office"));
esternChinaBranch.add(HangZhouOffice);

root.display(1);

// tsc company.ts --target ES2015 && node company.js
// - BeiJing HeadQuarter
// ----- HRDepartment of HeadQuarter
// ----- FinanceDepartment of HeadQuarter
// ----- ShangHai Branch Office
// --------- HRDepartment of ShangHai Branch Office
// --------- FinanceDepartment of ShangHai Branch Office
// --------- NanJing Office
// ------------- HRDepartment of NanJing Office
// ------------- FinanceDepartment of NanJing Office
// --------- HangZhou Office
// ------------- HRDepartment of HangZhou Office
// ------------- FinanceDepartment of HangZhou Office
