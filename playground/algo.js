const letter = "fattyleE hello";
const countVowel = (word) => {
  console.time("baba");
  const vowels = "aeiou";
  word = word.toLowerCase();
  const res = word.split("").reduce((count, l) => {
    if (vowels.includes(l)) {
      count++;
    }
    return count;
  }, 0);
  console.timeEnd("baba");
  return res;
};

const countVowel2 = (word) => {
  console.time("fatty");
  word = word.toLowerCase();
  const vowels = { a: "a", e: "e", i: "i", o: "o", u: "u" };
  const res = word.split("").reduce((count, l) => {
    if (vowels[l]) {
      count++;
    }
    return count;
  }, 0);
  console.timeEnd("fatty");
  return res;
};

const countVowel3 = (words) => {
  console.time("match");
  const matches = words.match(/[aeiou]/gi);
  if (matches) {
    console.timeEnd("match");
    return matches.length;
  }
  console.timeEnd("match");
  return 0;
};

console.log(countVowel(letter));
console.log(countVowel2(letter));
console.log(countVowel3(letter));
console.log(76767);
