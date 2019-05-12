interface Observable {
  // Adds an observer to the internal list of observers.
  addObserver(obs: Observer): void;
  // Deletes an observer from the internal list of observers
  deleteObserver(obs: Observer): void;
  // Deletes all observers from the internal list of observers.
  deleteObservers?(): void;
  // Returns the number of observers in the internal list of observers.
  countObservers?(): number;
  // Sets the internal flag that indicates this observable has changed state.
  setChanged?(): void;
  // Clears the internal flag that indicates this observable has changed state.
  clearChanged?(): void;
  // Returns the boolean value true if this observable has changed state
  hasChanged?(): Boolean;
  /* Checks the internal flag to see if the observable has changed state 
     and notifies all observers. Passes the object specified in the parameter 
     list to the notify() method of the observer. */
  notifyObservers(obj?: Object): void;
}

interface Observer {
  // Called when a change has occurred in the state of the observable.
  update(obs?: Observable, obj?: Object): void;
}

export { Observable, Observer };
