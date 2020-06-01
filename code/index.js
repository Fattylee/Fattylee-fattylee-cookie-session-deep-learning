"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var app = (0, _express["default"])();
var port = process.env.PORT || 4000;
app.listen(port, function () {
  console.log("Server listening on port ".concat(port));
});
var users = {
  fattylee: {
    name: "fattylee",
    age: Math.random() * 100 | 1
  },
  abdullah: {
    name: "abdullah",
    age: Math.random() * 100 | 1
  },
  haleemah: {
    name: "haleemah",
    age: Math.random() * 100 | 1
  }
};
var sessions = {// "878w": { name: "hwh", age: 32 },
};
app.use(_express["default"]["static"](_path["default"].join(__dirname, "public")));
app.use(function (req, res, next) {
  var cookies = req.headers.cookie;
  var cookie = cookies === null || cookies === void 0 ? void 0 : cookies.split("; ").reduce(function (acc, pair) {
    var _pair$split = pair.split("="),
        _pair$split2 = _slicedToArray(_pair$split, 2),
        key = _pair$split2[0],
        value = _pair$split2[1];

    acc[key] = value;
    return acc;
  }, {});
  var sessionId = cookie === null || cookie === void 0 ? void 0 : cookie["sessionId"];

  if (!sessionId) {
    sessionId = Math.random();
    res.set("set-cookie", "sessionId=".concat(sessionId));
  }

  sessions[sessionId] = sessions[sessionId] || {};
  req.session = sessions[sessionId];
  console.log("middleWare");
  req.session = sessions[sessionId];
  console.log("sessions <===> ", sessions);
  next();
});
app.get("/", function (req, res) {
  var resTemp = "\n\n  <h1>Session state</h1>\n\n".concat(req.session.user ? "<h4> My name is " + req.session.user.name + " and I am " + req.session.user.age + " years old</h4>" : "<form action='/login/fattylee' method='post'> \
      <button>Login as fattylee</button> \
    </form><form action='/login/haleemah' method='post'> \
      <button>Login as haleemah</button> \
    </form> \
    </form><form action='/login/abdullah' method='post'> \
      <button>Login as abdullah</button> \
    </form>", "\n    ");
  res.send(resTemp);
});
app.post("/login/:user", function (req, res) {
  var user = req.params.user;
  req.session.user = users[user];
  res.redirect("/");
});
app.get("/json", function (req, res) {
  res.json({
    message: "iLoveCodig",
    status: "success"
  });
});
app.get("/home", function (req, res) {
  res.sendFile(_path["default"].resolve(process.cwd(), "public/home.html"));
});
var letter = "fattyleE hello";

var countVowel = function countVowel(word) {
  console.time("baba");
  var vowels = "aeiou";
  word = word.toLowerCase();
  var res = word.split("").reduce(function (count, l) {
    if (vowels.includes(l)) {
      count++;
    }

    return count;
  }, 0);
  console.timeEnd("baba");
  return res;
};

var countVowel2 = function countVowel2(word) {
  console.time("fatty");
  word = word.toLowerCase();
  var vowels = {
    a: "a",
    e: "e",
    i: "i",
    o: "o",
    u: "u"
  };
  var res = word.split("").reduce(function (count, l) {
    if (vowels[l]) {
      count++;
    }

    return count;
  }, 0);
  console.timeEnd("fatty");
  return res;
};

var countVowel3 = function countVowel3(words) {
  console.time("match");
  var matches = words.match(/[aeiou]/gi);

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