'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?
const movePiece = (startStack, endStack) => {
  return stacks[endStack].push(stacks[startStack].pop());
  
}

const stackTest = (startStack, endStack)=> {
  if (startStack === "a" && (endStack === "b" || endStack === "c")) {
    return true;
  } 
  else if (startStack === "b" && (endStack === "a" || endStack === "c")) {
    return true;
  }
  else if (startStack === "c" && (endStack === "a" || endStack === "b")) {
    return true;  
  }
  else {
    return false;
  }
}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (startStack, endStack) => {
  if (stackTest(startStack, endStack)) {
  let start = stacks[startStack][stacks[startStack].length -1];
  let end = stacks[endStack][stacks[endStack].length -1];
  // let moveFrom = stacks[startStack];
  // let moveTo = stacks[endStack];
  // if (moveFrom[stacks[startStack].length -1] < moveTo[stacks[endStack].length -1]) {
    if (start < end || stacks[endStack].length === 0) {
      return true;
    }
    else {
      console.log("Illegal Input!")
      return false
  }
}
}

// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {
  if (stacks.b.length === 4) {
    console.log("Congrats, you win!");
    return true;
  }
  else {
    return false;
  }

}

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  if (isLegal(startStack, endStack)) {
    movePiece(startStack, endStack);
    checkForWin();
  }
  // else {
  //   towersOfHanoi()
  // }
}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });
  describe('#stackTest()', () => {
    it('should only allow illegal input', () => {
      towersOfHanoi('a', 'd');
      assert.equal(stackTest('a', 'd'), false);
        });
    it('should only allow legal input', () => {
      towersOfHanoi('b', 'c');
      assert.equal(stackTest('b', 'c'), true);
        });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
