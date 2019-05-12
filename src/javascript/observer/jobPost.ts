import { Observable, Observer } from "./interface";

class JobSeeker implements Observer {
  protected name: String;

  constructor(name: String) {
    this.name = name;
  }

  update(obs?: Observable, obj?: Object) {
    let job = <JobPost>obj;
    console.log(`Hi ${this.name}! new job posted: ${job.getTitle()}`);
  }
}

///////////////////////////////////////////////////////////////////////////////

class EmploymentAgency implements Observable {
  protected observers: Array<Observer>;

  constructor() {
    this.observers = [];
  }

  notifyObservers(obj?: Object) {
    let observers = this.observers;
    for (let i = 0; i < observers.length; i++) {
      observers[i].update(null, obj);
    }
  }

  addObserver(obs: Observer) {
    this.observers.push(obs);
  }

  deleteObserver(obs: Observer) {
    let index = this.observers.indexOf(obs);
    if (index >= 0) {
      this.observers.splice(index, 1);
    }
  }

  addJob(job: JobPost): void {
    this.notifyObservers(job);
  }
}

///////////////////////////////////////////////////////////////////////////////

class JobPost {
  protected title: String;

  constructor(title: String) {
    this.title = title;
  }

  getTitle(): String {
    return this.title;
  }
}

///////////////////////////////////////////////////////////////////////////////

let jobHunter1 = new JobSeeker("Gyumeijie");
let jobHunter2 = new JobSeeker("YuMeiJie");

let agency = new EmploymentAgency();
agency.addObserver(jobHunter1);
agency.addObserver(jobHunter2);

agency.addJob(new JobPost("Web Developer"));

// Hi Gyumeijie! new job posted: Web Developer
// Hi YuMeiJie! new job posted: Web Developer
