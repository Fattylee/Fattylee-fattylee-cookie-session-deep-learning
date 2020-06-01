const parent = {
  fn() {
    return this.name;
  },
  name: "parent",
};

const child = Object.create(parent);
child.name = "child";
console.log(child);
console.log(child.__proto__);
console.log(child.name);
console.log(child.fn.call(parent));
console.log(child.fn());

let numbers = [1, 2, 3, 4, 5, 2, 1, 2, 3, 4];
// const even = [...new Set(numbers)].filter((num) => !(num % 2));
const multiplesOFX = (numbers = [1, 2, 3, 4, 5], factor = 2) => {
  const multiple = [...new Set(numbers)].reduce((acc, num) => {
    acc[num] = num * factor;
    return acc;
  }, {});
  console.log(multiple);
  console.log("multiples of", factor);
  Object.entries(multiple).forEach(([key, value]) => {
    console.log(`${factor} x ${key} = ${value}`);
  });
};
multiplesOFX(
  Array(30)
    .fill(0)
    .map((e, i) => i),
  3
);
// numbers = "heLloworld".split("");
const res = numbers.reduce((acc, num) => {
  // num = num.toLowerCase();
  if (!(num % 2)) {
    acc[num] = num;
  }
  return acc;
}, {});
console.log(res);
console.log(Object.values(res).join(""));
