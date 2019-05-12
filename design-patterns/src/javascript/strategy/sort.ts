interface SortStrategy {
  sort<T>(dataset: Array<T>): Array<T>;
}

class BubbleSortStrategy implements SortStrategy {
  sort<T>(dataset: Array<T>): Array<T> {
    console.log("Sorting using bubble sort");
    return dataset;
  }
}

class QuickSortStrategy implements SortStrategy {
  sort<T>(dataset: Array<T>): Array<T> {
    console.log("Sorting using quick sort");
    return dataset;
  }
}

///////////////////////////////////////////////////////////////////////////////

class Sorter {
  private sorter: SortStrategy;

  constructor(sorter: SortStrategy) {
    this.sorter = sorter;
  }

  sort<T>(dataset: Array<T>): Array<T> {
    return this.sorter.sort(dataset);
  }
}

///////////////////////////////////////////////////////////////////////////////

let dataset: number[] = [1, 5, 4, 3, 2, 8];
let sorter = new Sorter(new BubbleSortStrategy());
sorter.sort(dataset);

sorter = new Sorter(new QuickSortStrategy());
sorter.sort(dataset);

// Sorting using bubble sort
// Sorting using quick sort
