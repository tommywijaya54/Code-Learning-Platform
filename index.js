import { CodeDechipher } from './decipher.js';
import './style.css';
const appDiv = document.getElementById('app');
const code = document.getElementById('code-content');
const action = document.getElementById('action-todo');
const echoDiv = document.getElementById('echo');
var echo = 'no echo atm';

function dcper(code) {
  const write = (dostr, valuestr, pre) => {
    const todo = document.createElement('div');
    todo.className = 'action';

    if (pre == 'pre') {
      todo.innerHTML = `
      <span class="action-cmd">${dostr}</span>
      <span class='action-value'><pre>${valuestr}</pre></span>`;
    } else {
      todo.innerHTML = `
      <span class="action-cmd">${dostr}</span>
      <span class='action-value'>${valuestr}</span>`;
    }
    action.appendChild(todo);
  };

  let d = new CodeDechipher(code);
  d.write = write;
  d._if('-t')._do('create tag');
  d._if('-?')._do('create title');
  d._if('leftover')._do('create code panel');
}
// dcper(code.innerHTML);

code.addEventListener('blur', function () {
  action.innerHTML = '';
  dcper(code.innerHTML);
});

class trx {
  static if_then(st, cd) {}
  static transform(code) {
    return 'yyy';
  }
}

const transform_code_div = document.getElementById('transform-code');
transform_code_div.innerHTML = code.innerHTML;
transform_code_div.addEventListener('keypress', function (event) {
  if (['Enter', ';', '='].includes(event.key)) {
    // the code you want to run
    transform_code_div.innerHTML = trx.transform(transform_code_div.innerHTML);
  }
});

// Ending Code
if (typeof echo == 'string') {
  echoDiv.innerText = echo;
} else {
  echoDiv.innerText = JSON.stringify(echo);
}
