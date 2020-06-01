console.log(66);
const btn = document.querySelector("#push");
// btn.innerHTML = "hi guys!";
btn.addEventListener("click", listener);
function listener(e) {
  let val = e.target.innerHTML.split(": ")[1] | 0;
  e.target.innerHTML = `Push up: ${++val}`;
  console.log(val);
}
