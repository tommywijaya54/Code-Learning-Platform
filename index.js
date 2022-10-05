// Import stylesheets

import './style.css';
const appDiv = document.getElementById('app');
const code = document.getElementById('code-content');
const action = document.getElementById('action-todo');
const echoDiv = document.getElementById('echo');
var echo = 'no echo atm';

const write = (dostr, valuestr) => {
  
  const todo = document.createElement('div');
  todo.className = 'action';
  todo.innerHTML = `
    <span class="action-cmd">${dostr}</span>
    <span class='action-value'>${valuestr}</span>`;

  action.appendChild(todo);
};

write('create tag', 'laravel');

class CodeDechipher {
  constructor(code) {
    this.code = code;
  }
  find(_start, _end) {
    var startindex = this.code.indexOf(_start);
    var endindex = this.code.indexOf(_end, startindex);
    const extracted =
      startindex != -1 && endindex != -1 && endindex > startindex
        ? this.code.substring(startindex, endindex)
        : '';
    echo = extracted;
  }
  _if(_startTag) {
    this.find(_startTag, '\n');
    return this;
  }
  _do(cmd, val) {
    write(cmd, val);
  }
}

const dcper = (code) => {
  let d = new CodeDechipher(code);
  //d.find('-t', '\n');
  //d.find('-?', '\n');
  d._if('-t')._do('create tag', 'xxx');
};

dcper(code.innerHTML);
if (typeof echo == 'string') {
  echoDiv.innerText = echo;
} else {
  echoDiv.innerText = JSON.stringify(echo);
}
