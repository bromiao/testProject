class Queue {
  constructor() {
    this.items = {};
    this.headIndex = 0;
    this.tailIndex = 0;
  }

  enqueue(item) {
    this.items[this.tailIndex] = item;
    this.tailIndex++;
  }

  dequeue() {
    delete this.items[this.headIndex];
    this.headIndex++;
    return this.items;
  }

  peek() {
    return this.items[this.headIndex];
  }

  get length() {
    return this.tailIndex - this.headIndex;
  }


}

const queue = new Queue();
queue.enqueue(5);
queue.enqueue(4);
queue.enqueue(3);
console.log(queue.length);
console.log(queue.dequeue(), queue.length, queue.headIndex, queue.tailIndex);
console.log(queue.peek());
