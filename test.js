function sayHi() {
  let counter = 0;

  function output() {
    if (counter < 5) {
        console.log("Congrats you earn the chance!")
    } else {
        console.log("Sorry you missed the chance")
    }
    counter++;
  }

  return output;
}

const agent = sayHi();
agent();
agent();
agent();
agent();
agent();
agent();
agent();
agent();
