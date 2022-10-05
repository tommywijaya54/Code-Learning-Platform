// Import stylesheets

import { dcper } from './decipher.js';

import './style.css';
const appDiv = document.getElementById('app');
const code = document.getElementById('code-content');
const action = document.getElementById('action-todo');
const echoDiv = document.getElementById('echo');
var echo = 'no echo atm';

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
/*
class Util {
  static _loop(val, fn) {
    if (typeof val == 'string') {
      fn(cmd, val);
    } else if (Array.isArray(val)) {
      val.forEach((v) => fn(cmd, v));
    }
  }
}
*/

dcper(code.innerHTML);

code.addEventListener('blur', function () {
  action.innerHTML = '';
  dcper(code.innerHTML);
});

// Ending Code
if (typeof echo == 'string') {
  echoDiv.innerText = echo;
} else {
  echoDiv.innerText = JSON.stringify(echo);
}
