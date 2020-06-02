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

const sessions = {};

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  const cookie = req.headers.cookie?.split(/;\s*/gi).reduce((cookie, pair) => {
    const [key, value] = pair.split("=");
    cookie[key] = value;
    return cookie;
  }, {});

  let sessionId = cookie?.sessionId;
  if (!sessionId) {
    sessionId = Math.random();
    res.header("SET-cookie", `sessionId=${sessionId}`);
  }
  sessions[sessionId] = sessions[sessionId] || {};
  req.session = sessions[sessionId];
  req.session.destroy = () => {
    delete sessions[sessionId];
    res.set("set-cookiE", "sessionId=;max-age=0");
  };
  next();
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
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
      " years old</h4>" +
      '\
  <a href="/logout">Logout</a>'
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

