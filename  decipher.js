class CodeDechipher {
  constructor(code) {
    this.code = code;
    this.value_from_find;
    this.leftover = code;
  }
  find(_start, _end) {
    var startindex = this.code.indexOf(_start);
    var endindex = this.code.indexOf(_end, startindex);
    const extracted_line =
      startindex != -1 && endindex != -1 && endindex > startindex
        ? this.code.substring(startindex, endindex)
        : '';
    this.leftover = this.leftover.replace(extracted_line, '');
    echo = this.leftover.replace(/^\s+|\s+$/g, '');
    return extracted_line;
  }
  findvalue(s, e) {
    return this.find(s, e)
      .replace(s + '=', '')
      .trim();
  }
  _if(_startTag) {
    this.cmd = _startTag;
    if (_startTag == 'leftover') {
      this.value = this.leftover;
      return this;
    }

    this.value = this.findvalue(_startTag, '\n');
    return this;
  }
  _do(cmd) {
    if (this.cmd === 'leftover') {
      write(cmd, this.value, 'pre');
    } else if (this.value.includes(';')) {
      this.value
        .split(';')
        .filter((element) => element)
        .forEach((v) => write(cmd, v));
    } else if (typeof this.value == 'string') {
      write(cmd, this.value);
    }
  }
  // process() {}
  translate() {}
  transform() {}
}

const dcper = (code) => {
  let d = new CodeDechipher(code);
  d._if('-t')._do('create tag');
  d._if('-?')._do('create title');
  d._if('leftover')._do('create code panel');
  d.translate();
};

exports.dcper = dcper;
