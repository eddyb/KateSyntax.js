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
        if(this.str[0] == '(*' && this.hl('(*', 'dsComment')) {this._multilineComment();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) continue;
        if(this.str[0] == ')' && this.hl(')', 'dsNormal')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
        if(this.str[0] == '[|' && this.hl('[|', 'dsNormal')) continue;
        if(this.str[0] == '|]' && this.hl('|]', 'dsNormal')) continue;
        if(this.str[0] == '[' && this.hl('[', 'dsNormal')) continue;
        if(this.str[0] == ']' && this.hl(']', 'dsNormal')) continue;
        if((m = /^(?:do)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:done)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:module|open|include)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._moduleEnv();continue;}
        if((m = /^(?:begin)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._block();continue;}
        if((m = /^(?:object)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._object();continue;}
        if((m = /^(?:sig)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._sig();continue;}
        if((m = /^(?:struct)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._struct();continue;}
        if((m = /^`\s*&IDENT;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if(/^&MIDENT;\s*\./.exec(this.str)) {this._moduleEnv2();continue;}
        if((m = /^&MIDENT;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^#&IDENT;.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringConstant();continue;}
        if((m = /^'(&ESC;|[^'])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '<<' && this.hl('<<', 'dsString')) {this._camlp4QuotationConstant();continue;}
        if((m = /^<:&IDENT;</.exec(this.str)) && this.hl(m[0], 'dsString')) {this._camlp4QuotationConstant();continue;}
        if((m = /^(?:and|as|assert|asr|class|closed|constraint|downto|else|exception|external|false|for|fun|function|functor|if|in|inherit|initializer|land|lazy|let|lor|lsl|lsr|lxor|match|method|mod|mutable|new|of|or|parser|private|rec|then|to|true|try|type|val|virtual|when|while|with)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:declare|value|where)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:exn|lazy_t|format|unit|int|real|char|string|ref|array|bool|list|option)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^&IDENT;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^-?0[xX][0-9A-Fa-f_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^-?0[oO][0-7_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^-?0[bB][01_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^-?&DEC;((\.(&DEC;)?([eE][-+]?&DEC;)?)|([eE][-+]?&DEC;))/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^-?&DEC;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._multilineComment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '*)' && this.hl('*)', 'dsComment')) return;
        if(this.str[0] == '(*' && this.hl('(*', 'dsComment')) {this._multilineComment();continue;}
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._stringConstant = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        if((m = /^&ESC;/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\\(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
HL.prototype._block = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:end)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if(this.str[0] == '(*' && this.hl('(*', 'dsComment')) {this._multilineComment();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) continue;
        if(this.str[0] == ')' && this.hl(')', 'dsNormal')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
        if(this.str[0] == '[|' && this.hl('[|', 'dsNormal')) continue;
        if(this.str[0] == '|]' && this.hl('|]', 'dsNormal')) continue;
        if(this.str[0] == '[' && this.hl('[', 'dsNormal')) continue;
        if(this.str[0] == ']' && this.hl(']', 'dsNormal')) continue;
        if((m = /^(?:do)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:done)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:module|open|include)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._moduleEnv();continue;}
        if((m = /^(?:begin)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._block();continue;}
        if((m = /^(?:object)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._object();continue;}
        if((m = /^(?:sig)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._sig();continue;}
        if((m = /^(?:struct)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._struct();continue;}
        if((m = /^`\s*&IDENT;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if(/^&MIDENT;\s*\./.exec(this.str)) {this._moduleEnv2();continue;}
        if((m = /^&MIDENT;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^#&IDENT;.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringConstant();continue;}
        if((m = /^'(&ESC;|[^'])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '<<' && this.hl('<<', 'dsString')) {this._camlp4QuotationConstant();continue;}
        if((m = /^<:&IDENT;</.exec(this.str)) && this.hl(m[0], 'dsString')) {this._camlp4QuotationConstant();continue;}
        if((m = /^(?:and|as|assert|asr|class|closed|constraint|downto|else|exception|external|false|for|fun|function|functor|if|in|inherit|initializer|land|lazy|let|lor|lsl|lsr|lxor|match|method|mod|mutable|new|of|or|parser|private|rec|then|to|true|try|type|val|virtual|when|while|with)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:declare|value|where)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:exn|lazy_t|format|unit|int|real|char|string|ref|array|bool|list|option)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^&IDENT;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^-?0[xX][0-9A-Fa-f_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^-?0[oO][0-7_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^-?0[bB][01_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^-?&DEC;((\.(&DEC;)?([eE][-+]?&DEC;)?)|([eE][-+]?&DEC;))/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^-?&DEC;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._sig = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:end)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if(this.str[0] == '(*' && this.hl('(*', 'dsComment')) {this._multilineComment();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) continue;
        if(this.str[0] == ')' && this.hl(')', 'dsNormal')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
        if(this.str[0] == '[|' && this.hl('[|', 'dsNormal')) continue;
        if(this.str[0] == '|]' && this.hl('|]', 'dsNormal')) continue;
        if(this.str[0] == '[' && this.hl('[', 'dsNormal')) continue;
        if(this.str[0] == ']' && this.hl(']', 'dsNormal')) continue;
        if((m = /^(?:do)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:done)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:module|open|include)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._moduleEnv();continue;}
        if((m = /^(?:begin)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._block();continue;}
        if((m = /^(?:object)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._object();continue;}
        if((m = /^(?:sig)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._sig();continue;}
        if((m = /^(?:struct)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._struct();continue;}
        if((m = /^`\s*&IDENT;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if(/^&MIDENT;\s*\./.exec(this.str)) {this._moduleEnv2();continue;}
        if((m = /^&MIDENT;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^#&IDENT;.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringConstant();continue;}
        if((m = /^'(&ESC;|[^'])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '<<' && this.hl('<<', 'dsString')) {this._camlp4QuotationConstant();continue;}
        if((m = /^<:&IDENT;</.exec(this.str)) && this.hl(m[0], 'dsString')) {this._camlp4QuotationConstant();continue;}
        if((m = /^(?:and|as|assert|asr|class|closed|constraint|downto|else|exception|external|false|for|fun|function|functor|if|in|inherit|initializer|land|lazy|let|lor|lsl|lsr|lxor|match|method|mod|mutable|new|of|or|parser|private|rec|then|to|true|try|type|val|virtual|when|while|with)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:declare|value|where)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:exn|lazy_t|format|unit|int|real|char|string|ref|array|bool|list|option)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^&IDENT;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^-?0[xX][0-9A-Fa-f_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^-?0[oO][0-7_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^-?0[bB][01_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^-?&DEC;((\.(&DEC;)?([eE][-+]?&DEC;)?)|([eE][-+]?&DEC;))/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^-?&DEC;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._struct = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:end)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if(this.str[0] == '(*' && this.hl('(*', 'dsComment')) {this._multilineComment();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) continue;
        if(this.str[0] == ')' && this.hl(')', 'dsNormal')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
        if(this.str[0] == '[|' && this.hl('[|', 'dsNormal')) continue;
        if(this.str[0] == '|]' && this.hl('|]', 'dsNormal')) continue;
        if(this.str[0] == '[' && this.hl('[', 'dsNormal')) continue;
        if(this.str[0] == ']' && this.hl(']', 'dsNormal')) continue;
        if((m = /^(?:do)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:done)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:module|open|include)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._moduleEnv();continue;}
        if((m = /^(?:begin)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._block();continue;}
        if((m = /^(?:object)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._object();continue;}
        if((m = /^(?:sig)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._sig();continue;}
        if((m = /^(?:struct)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._struct();continue;}
        if((m = /^`\s*&IDENT;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if(/^&MIDENT;\s*\./.exec(this.str)) {this._moduleEnv2();continue;}
        if((m = /^&MIDENT;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^#&IDENT;.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringConstant();continue;}
        if((m = /^'(&ESC;|[^'])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '<<' && this.hl('<<', 'dsString')) {this._camlp4QuotationConstant();continue;}
        if((m = /^<:&IDENT;</.exec(this.str)) && this.hl(m[0], 'dsString')) {this._camlp4QuotationConstant();continue;}
        if((m = /^(?:and|as|assert|asr|class|closed|constraint|downto|else|exception|external|false|for|fun|function|functor|if|in|inherit|initializer|land|lazy|let|lor|lsl|lsr|lxor|match|method|mod|mutable|new|of|or|parser|private|rec|then|to|true|try|type|val|virtual|when|while|with)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:declare|value|where)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:exn|lazy_t|format|unit|int|real|char|string|ref|array|bool|list|option)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^&IDENT;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^-?0[xX][0-9A-Fa-f_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^-?0[oO][0-7_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^-?0[bB][01_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^-?&DEC;((\.(&DEC;)?([eE][-+]?&DEC;)?)|([eE][-+]?&DEC;))/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^-?&DEC;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._object = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^(?:end)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        if(this.str[0] == '(*' && this.hl('(*', 'dsComment')) {this._multilineComment();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) continue;
        if(this.str[0] == ')' && this.hl(')', 'dsNormal')) continue;
        if(this.str[0] == '{' && this.hl('{', 'dsNormal')) continue;
        if(this.str[0] == '}' && this.hl('}', 'dsNormal')) continue;
        if(this.str[0] == '[|' && this.hl('[|', 'dsNormal')) continue;
        if(this.str[0] == '|]' && this.hl('|]', 'dsNormal')) continue;
        if(this.str[0] == '[' && this.hl('[', 'dsNormal')) continue;
        if(this.str[0] == ']' && this.hl(']', 'dsNormal')) continue;
        if((m = /^(?:do)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:done)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:module|open|include)\b/.exec(this.str)) && this.hl(m[0], 'dsOthers')) {this._moduleEnv();continue;}
        if((m = /^(?:begin)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._block();continue;}
        if((m = /^(?:object)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._object();continue;}
        if((m = /^(?:sig)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._sig();continue;}
        if((m = /^(?:struct)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._struct();continue;}
        if((m = /^`\s*&IDENT;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if(/^&MIDENT;\s*\./.exec(this.str)) {this._moduleEnv2();continue;}
        if((m = /^&MIDENT;/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^#&IDENT;.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsOthers')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._stringConstant();continue;}
        if((m = /^'(&ESC;|[^'])'/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '<<' && this.hl('<<', 'dsString')) {this._camlp4QuotationConstant();continue;}
        if((m = /^<:&IDENT;</.exec(this.str)) && this.hl(m[0], 'dsString')) {this._camlp4QuotationConstant();continue;}
        if((m = /^(?:and|as|assert|asr|class|closed|constraint|downto|else|exception|external|false|for|fun|function|functor|if|in|inherit|initializer|land|lazy|let|lor|lsl|lsr|lxor|match|method|mod|mutable|new|of|or|parser|private|rec|then|to|true|try|type|val|virtual|when|while|with)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:declare|value|where)\b/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^(?:exn|lazy_t|format|unit|int|real|char|string|ref|array|bool|list|option)\b/.exec(this.str)) && this.hl(m[0], 'dsDataType')) continue;
        if((m = /^&IDENT;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^-?0[xX][0-9A-Fa-f_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^-?0[oO][0-7_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^-?0[bB][01_]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) continue;
        if((m = /^-?&DEC;((\.(&DEC;)?([eE][-+]?&DEC;)?)|([eE][-+]?&DEC;))/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^-?&DEC;/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._moduleEnv = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if(/^&MIDENT;\s*\./.exec(this.str)) {this._moduleEnv2();continue;}
        if((m = /^&MIDENT;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._moduleEnv2 = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^&MIDENT;/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^[^\S\n]+/.exec(this.str)) && this.hl(m[0], 'dsNormal')) continue;
        if((m = /^\./.exec(this.str)) && this.hl(m[0], 'dsKeyword')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._camlp4QuotationConstant = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '>>' && this.hl('>>', 'dsString')) return;
        if(this.str[0] == '<<' && this.hl('<<', 'dsString')) {this._camlp4QuotationConstant();continue;}
        if((m = /^<:&IDENT;</.exec(this.str)) && this.hl(m[0], 'dsString')) {this._camlp4QuotationConstant();continue;}
        if((m = /^\\(\\|>>|<<)/.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\\<:&IDENT;</.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        this.hl(this.str[0], 'dsString');
    }
};
