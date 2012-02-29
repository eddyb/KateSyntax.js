var HL = function HL(){};
HL.prototype.run = function run(str) {
    this.str = str;
    this.pos = 0;
    this.len = str.length;
    this.main = document.createElement('div');
    this.hlText = '';
    this.style = 'dsNormal';
    this._normal();
    this.hl('');
    return this.main;
};
HL.prototype.hl = function hl(m,s) {
    this.pos += m.length;
    this.str = this.str.slice(m.length);
    if(this.style == s)
        this.hlText += m;
    else {
        if(this.hlText) {
            if(this.style == 'dsNormal')
                this.main.appendChild(document.createTextNode(this.hlText));
            else {
                var span = document.createElement('span');
                span.appendChild(document.createTextNode(this.hlText));
                span.className = this.style;
                this.main.appendChild(span);
            }
        }
        this.style = s;
        this.hlText = m;
    }
    return true;
};
HL.prototype._normal = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^WINE REGISTRY Version.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^#\s*<\s*wineconf\s*>/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^#\s*<\s*\/\s*wineconf\s*>/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\[.*\](?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^;.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if((m = /^\s*"\s*[a-zA-Z0-9_.:*]*\s*"/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if(this.str[0] == '=' && this.hl('=', 'dsNormal')) {this._value();continue;}
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._value = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s*".*"/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^;.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '\n' && this.hl('\n', 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};