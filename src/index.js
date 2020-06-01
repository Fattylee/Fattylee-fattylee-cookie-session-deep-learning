import express from "express";
import path from "path";

const app = express();

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const users = {
  fattylee: { name: "fattylee", age: (Math.random() * 100) | 1 },
  abdullah: { name: "abdullah", age: (Math.random() * 100) | 1 },
  haleemah: { name: "haleemah", age: (Math.random() * 100) | 1 },
};

const sessions = {
  // "878w": { name: "hwh", age: 32 },
};

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  const cookies = req.headers.cookie;
  const cookie = cookies?.split("; ").reduce((acc, pair) => {
    const [key, value] = pair.split("=");
    acc[key] = value;
    return acc;
  }, {});

  let sessionId = cookie?.["sessionId"];
  if (!sessionId) {
    sessionId = Math.random();
    res.set("set-cookie", `sessionId=${sessionId}`);
  }
  sessions[sessionId] = sessions[sessionId] || {};
  req.session = sessions[sessionId];
  console.log("middleWare");
  req.session = sessions[sessionId];
  console.log("sessions <===> ", sessions);
  next();
});

app.get("/", (req, res) => {
  const resTemp = `

  <h1>Session state</h1>

${
  req.session.user
    ? "<h4> My name is " +
      req.session.user.name +
      " and I am " +
      req.session.user.age +
      " years old</h4>"
    : "<form action='/login/fattylee' method='post'> \
      <button>Login as fattylee</button> \
    </form><form action='/login/haleemah' method='post'> \
      <button>Login as haleemah</button> \
    </form> \
    </form><form action='/login/abdullah' method='post'> \
      <button>Login as abdullah</button> \
    </form>"
}
    `;

  res.send(resTemp);
});

app.post("/login/:user", (req, res) => {
  const { user } = req.params;
  req.session.user = users[user];

  res.redirect("/");
});

app.get("/json", (req, res) => {
  res.json({ message: "iLoveCodig", status: "success" });
});

app.get("/home", (req, res) => {
  res.sendFile(path.resolve(process.cwd(), "public/home.html"));
});

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
