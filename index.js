import { CodeDechipher } from './decipher.js';
import './style.css';
const appDiv = document.getElementById('app');
const code = document.getElementById('code-content');
const action = document.getElementById('action-todo');
const echoDiv = document.getElementById('echo');
function echo(echo) {
  if (typeof echo == 'string') {
    echoDiv.appendChild(document.createTextNode(echo));
    echoDiv.appendChild(document.createElement('br'));
  } else {
    echoDiv.innerText = JSON.stringify(echo);
  }
}

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
  constructor() {
    this.leftover = '';
    this.rules = {
      '-t': 'create tag',
      '-?': 'create title',
      leftover: 'create code panel',
    };
  }
  find(_start, _end, opt) {
    var startindex = this.code.indexOf(_start);
    var endindex = this.code.indexOf(_end, startindex);

    if (startindex == -1) {
      return {
        value: null,
        leftover: this.leftover,
      };
    }

    const extracted_line =
      startindex != -1 && endindex != -1 && endindex > startindex
        ? this.code.substring(startindex, endindex)
        : '';

    this.leftover = this.leftover.replace(extracted_line, '');

    if (opt) {
      return {
        value:
          _start == 'leftover'
            ? this.leftover
            : extracted_line.replace(_start + '=', '').trim(),
        leftover: _start == 'leftover' ? '' : this.leftover,
      };
    }

    if (_start == 'leftover') {
      return this.leftover;
    }

    return extracted_line;
  }
  if_do(st, cd) {}
  transform(code) {
    this.code = code;
    this.leftover = code;
    let newcode = '';

    Object.keys(this.rules).map((key) => {
      const _if = key;
      const _do = this.rules[key];
      const { value, leftover } = this.find(_if, '\n', true);

      //if (['-t', '-?'].includes(_if)) {
      if (value) {
        newcode += `<div class='tag-action'>` + _do;
        value
          .split(';')
          .filter((v) => v)
          .map((x) => {
            newcode += `<span class='tag-value'>${x}</span>`;
          });
        newcode += `</div>`;
      }

      // find the start and end

      echo('if : ' + _if + ' do: ' + _do + ' // value : ' + value);
    });

    return newcode + this.leftover;
  }
}

const ty = new trx();

const transform_code_div = document.getElementById('transform-code');
transform_code_div.innerHTML = code.innerHTML;
transform_code_div.addEventListener('keypress', function (event) {
  // ['Shift + Enter', ';', '=']
  if (['Enter'].includes(event.key) && event.shiftKey) {
    // the code you want to run
    transform_code_div.innerHTML = ty.transform(transform_code_div.innerHTML);
  }
});

transform_code_div.innerHTML = ty.transform(transform_code_div.innerHTML);
