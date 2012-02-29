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
        if((m = /^;+\s*BEGIN.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^;+\s*END.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsRegionMarker')) continue;
        if((m = /^;.*(?=$|\n)/.exec(this.str)) && this.hl(m[0], 'dsComment')) continue;
        if(this.str[0] == '#|' && this.hl('#|', 'dsComment')) {this._multiLineComment();continue;}
        if(this.str[0] == '(' && this.hl('(', 'dsNormal')) continue;
        if(this.str[0] == ')' && this.hl(')', 'dsNormal')) continue;
        if((m = /^(?:abort|abs|access|acons|acos|acosh|add-method|adjoin|adjustable-array-p|adjust-array|allocate-instance|alpha-char-p|alphanumericp|and|append|apply|applyhook|apropos|apropos-list|aref|arithmetic-error|arithmetic-error-operands|arithmetic-error-operation|array|array-dimension|array-dimension-limit|array-dimensions|array-displacement|array-element-type|array-has-fill-pointer-p|array-in-bounds-p|arrayp|array-rank|array-rank-limit|array-row-major-index|array-total-size|array-total-size-limit|ash|asin|asinh|assert|assoc|assoc-if|assoc-if-not|atan|atanh|atom|base-char|base-string|bignum|bit|bit-and|bit-andc1|bit-andc2|bit-eqv|bit-ior|bit-nand|bit-nor|bit-not|bit-orc1|bit-orc2|bit-vector|bit-vector-p|bit-xor|block|boole|boole-1|boole-2|boolean|boole-and|boole-andc1|boole-andc2|boole-c1|boole-c2|boole-clr|boole-eqv|boole-ior|boole-nand|boole-nor|boole-orc1|boole-orc2|boole-set|boole-xor|both-case-p|boundp|break|broadcast-stream|broadcast-stream-streams|built-in-class|butlast|byte|byte-position|byte-size|caaaar|caaadr|caaar|caadar|caaddr|caadr|caar|cadaar|cadadr|cadar|caddar|cadddr|caddr|cadr|call-arguments-limit|call-method|call-next-method|capitalize|car|case|catch|ccase|cdaaar|cdaadr|cdaar|cdadar|cdaddr|cdadr|cdar|cddaar|cddadr|cddar|cdddar|cddddr|cdddr|cddr|cdr|ceiling|cell-error|cell-error-name|cerror|change-class|char|char<|char<=|char=|char>|char>=|char\/=|character|characterp|char-bit|char-bits|char-bits-limit|char-code|char-code-limit|char-control-bit|char-downcase|char-equal|char-font|char-font-limit|char-greaterp|char-hyper-bit|char-int|char-lessp|char-meta-bit|char-name|char-not-equal|char-not-greaterp|char-not-lessp|char-super-bit|char-upcase|check-type|cis|class|class-name|class-of|clear-input|clear-output|close|clrhash|code-char|coerce|commonp|compilation-speed|compile|compiled-function|compiled-function-p|compile-file|compile-file-pathname|compiler-let|compiler-macro|compiler-macro-function|complement|complex|complexp|compute-applicable-methods|compute-restarts|concatenate|concatenated-stream|concatenated-stream-streams|cond|condition|conjugate|cons|consp|constantly|constantp|continue|control-error|copy-alist|copy-list|copy-pprint-dispatch|copy-readtable|copy-seq|copy-structure|copy-symbol|copy-tree|cos|cosh|count|count-if|count-if-not|ctypecase|debug|decf|declaim|declaration|declare|decode-float|decode-universal-time|delete|delete-duplicates|delete-file|delete-if|delete-if-not|delete-package|denominator|deposit-field|describe|describe-object|destructuring-bind|digit-char|digit-char-p|directory|directory-namestring|disassemble|division-by-zero|do|do\*|do-all-symbols|documentation|do-exeternal-symbols|do-external-symbols|dolist|do-symbols|dotimes|double-float|double-float-epsilon|double-float-negative-epsilon|dpb|dribble|dynamic-extent|ecase|echo-stream|echo-stream-input-stream|echo-stream-output-stream|ed|eighth|elt|encode-universal-time|end-of-file|endp|enough-namestring|ensure-directories-exist|ensure-generic-function|eq|eql|equal|equalp|error|etypecase|eval|evalhook|eval-when|evenp|every|exp|export|expt|extended-char|fboundp|fceiling|fdefinition|ffloor|fifth|file-author|file-error|file-error-pathname|file-length|file-namestring|file-position|file-stream|file-string-length|file-write-date|fill|fill-pointer|find|find-all-symbols|find-class|find-if|find-if-not|find-method|find-package|find-restart|find-symbol|finish-output|first|fixnum|flet|float|float-digits|floating-point-inexact|floating-point-invalid-operation|floating-point-overflow|floating-point-underflow|floatp|float-precision|float-radix|float-sign|floor|fmakunbound|force-output|format|formatter|fourth|fresh-line|fround|ftruncate|ftype|funcall|function|function-keywords|function-lambda-expression|functionp|gbitp|gcd|generic-function|gensym|gentemp|get|get-decoded-time|get-dispatch-macro-character|getf|gethash|get-internal-real-time|get-internal-run-time|get-macro-character|get-output-stream-string|get-properties|get-setf-expansion|get-setf-method|get-universal-time|go|graphic-char-p|handler-bind|handler-case|hash-table|hash-table-count|hash-table-p|hash-table-rehash-size|hash-table-rehash-threshold|hash-table-size|hash-table-test|host-namestring|identity|if|if-exists|ignorable|ignore|ignore-errors|imagpart|import|incf|initialize-instance|inline|in-package|in-package|input-stream-p|inspect|int-char|integer|integer-decode-float|integer-length|integerp|interactive-stream-p|intern|internal-time-units-per-second|intersection|invalid-method-error|invoke-debugger|invoke-restart|invoke-restart-interactively|isqrt|keyword|keywordp|labels|lambda|lambda-list-keywords|lambda-parameters-limit|last|lcm|ldb|ldb-test|ldiff|least-negative-double-float|least-negative-long-float|least-negative-normalized-double-float|least-negative-normalized-long-float|least-negative-normalized-short-float|least-negative-normalized-single-float|least-negative-short-float|least-negative-single-float|least-positive-double-float|least-positive-long-float|least-positive-normalized-double-float|least-positive-normalized-long-float|least-positive-normalized-short-float|least-positive-normalized-single-float|least-positive-short-float|least-positive-single-float|length|let|let\*|lisp|lisp-implementation-type|lisp-implementation-version|list|list\*|list-all-packages|listen|list-length|listp|load|load-logical-pathname-translations|load-time-value|locally|log|logand|logandc1|logandc2|logbitp|logcount|logeqv|logical-pathname|logical-pathname-translations|logior|lognand|lognor|lognot|logorc1|logorc2|logtest|logxor|long-float|long-float-epsilon|long-float-negative-epsilon|long-site-name|loop|loop-finish|lower-case-p|machine-instance|machine-type|machine-version|macroexpand|macroexpand-1|macroexpand-l|macro-function|macrolet|make-array|make-array|make-broadcast-stream|make-char|make-concatenated-stream|make-condition|make-dispatch-macro-character|make-echo-stream|make-hash-table|make-instance|make-instances-obsolete|make-list|make-load-form|make-load-form-saving-slots|make-method|make-package|make-pathname|make-random-state|make-sequence|make-string|make-string-input-stream|make-string-output-stream|make-symbol|make-synonym-stream|make-two-way-stream|makunbound|map|mapc|mapcan|mapcar|mapcon|maphash|map-into|mapl|maplist|mask-field|max|member|member-if|member-if-not|merge|merge-pathname|merge-pathnames|method|method-combination|method-combination-error|method-qualifiers|min|minusp|mismatch|mod|most-negative-double-float|most-negative-fixnum|most-negative-long-float|most-negative-short-float|most-negative-single-float|most-positive-double-float|most-positive-fixnum|most-positive-long-float|most-positive-short-float|most-positive-single-float|muffle-warning|multiple-value-bind|multiple-value-call|multiple-value-list|multiple-value-prog1|multiple-value-seteq|multiple-value-setq|multiple-values-limit|name-char|namestring|nbutlast|nconc|next-method-p|nil|nintersection|ninth|no-applicable-method|no-next-method|not|notany|notevery|notinline|nreconc|nreverse|nset-difference|nset-exclusive-or|nstring|nstring-capitalize|nstring-downcase|nstring-upcase|nsublis|nsubst|nsubst-if|nsubst-if-not|nsubstitute|nsubstitute-if|nsubstitute-if-not|nth|nthcdr|nth-value|null|number|numberp|numerator|nunion|oddp|open|open-stream-p|optimize|or|otherwise|output-stream-p|package|package-error|package-error-package|package-name|package-nicknames|packagep|package-shadowing-symbols|package-used-by-list|package-use-list|pairlis|parse-error|parse-integer|parse-namestring|pathname|pathname-device|pathname-directory|pathname-host|pathname-match-p|pathname-name|pathnamep|pathname-type|pathname-version|peek-char|phase|pi|plusp|pop|position|position-if|position-if-not|pprint|pprint-dispatch|pprint-exit-if-list-exhausted|pprint-fill|pprint-indent|pprint-linear|pprint-logical-block|pprint-newline|pprint-pop|pprint-tab|pprint-tabular|prin1|prin1-to-string|princ|princ-to-string|print|print-not-readable|print-not-readable-object|print-object|print-unreadable-object|probe-file|proclaim|prog|prog\*|prog1|prog2|progn|program-error|progv|provide|psetf|psetq|push|pushnew|putprop|quote|random|random-state|random-state-p|rassoc|rassoc-if|rassoc-if-not|ratio|rational|rationalize|rationalp|read|read-byte|read-char|read-char-no-hang|read-delimited-list|reader-error|read-eval-print|read-from-string|read-line|read-preserving-whitespace|read-sequence|readtable|readtable-case|readtablep|real|realp|realpart|reduce|reinitialize-instance|rem|remf|remhash|remove|remove-duplicates|remove-if|remove-if-not|remove-method|remprop|rename-file|rename-package|replace|require|rest|restart|restart-bind|restart-case|restart-name|return|return-from|revappend|reverse|room|rotatef|round|row-major-aref|rplaca|rplacd|safety|satisfies|sbit|scale-float|schar|search|second|sequence|serious-condition|set|set-char-bit|set-difference|set-dispatch-macro-character|set-exclusive-or|setf|set-macro-character|set-pprint-dispatch|setq|set-syntax-from-char|seventh|shadow|shadowing-import|shared-initialize|shiftf|short-float|short-float-epsilon|short-float-negative-epsilon|short-site-name|signal|signed-byte|signum|simle-condition|simple-array|simple-base-string|simple-bit-vector|simple-bit-vector-p|simple-condition-format-arguments|simple-condition-format-control|simple-error|simple-string|simple-string-p|simple-type-error|simple-vector|simple-vector-p|simple-warning|sin|single-flaot-epsilon|single-float|single-float-epsilon|single-float-negative-epsilon|sinh|sixth|sleep|slot-boundp|slot-exists-p|slot-makunbound|slot-missing|slot-unbound|slot-value|software-type|software-version|some|sort|space|special|special-form-p|special-operator-p|speed|sqrt|stable-sort|standard|standard-char|standard-char-p|standard-class|standard-generic-function|standard-method|standard-object|step|storage-condition|store-value|stream|stream-element-type|stream-error|stream-error-stream|stream-external-format|streamp|streamup|string|string<|string<=|string=|string>|string>=|string\/=|string-capitalize|string-char|string-char-p|string-downcase|string-equal|string-greaterp|string-left-trim|string-lessp|string-not-equal|string-not-greaterp|string-not-lessp|stringp|string-right-strim|string-right-trim|string-stream|string-trim|string-upcase|structure|structure-class|structure-object|style-warning|sublim|sublis|subseq|subsetp|subst|subst-if|subst-if-not|substitute|substitute-if|substitute-if-not|subtypep|svref|sxhash|symbol|symbol-function|symbol-macrolet|symbol-name|symbolp|symbol-package|symbol-plist|symbol-value|synonym-stream|synonym-stream-symbol|sys|system|t|tagbody|tailp|tan|tanh|tenth|terpri|the|third|throw|time|trace|translate-logical-pathname|translate-pathname|tree-equal|truename|truncase|truncate|two-way-stream|two-way-stream-input-stream|two-way-stream-output-stream|type|typecase|type-error|type-error-datum|type-error-expected-type|type-of|typep|unbound-slot|unbound-slot-instance|unbound-variable|undefined-function|unexport|unintern|union|unless|unread|unread-char|unsigned-byte|untrace|unuse-package|unwind-protect|update-instance-for-different-class|update-instance-for-redefined-class|upgraded-array-element-type|upgraded-complex-part-type|upper-case-p|use-package|user|user-homedir-pathname|use-value|values|values-list|vector|vectorp|vector-pop|vector-push|vector-push-extend|warn|warning|when|wild-pathname-p|with-accessors|with-compilation-unit|with-condition-restarts|with-hash-table-iterator|with-input-from-string|with-open-file|with-open-stream|with-output-to-string|with-package-iterator|with-simple-restart|with-slots|with-standard-io-syntax|write|write-byte|write-char|write-line|write-sequence|write-string|write-to-string|yes-or-no-p|y-or-n-p|zerop)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:<|<=|=|>|>=|=>|-|\/|\/=|\/\/|\/\/\/|\*|\*\*|\*\*\*|\+|\+\+|\+\+\+|1-|1\+)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?::abort|:adjustable|:append|:array|:base|:case|:circle|:conc-name|:constructor|:copier|:count|:create|:default|:defaults|:device|:direction|:directory|:displaced-index-offset|:displaced-to|:element-type|:end1|:end2|:end|:error|:escape|:external|:from-end|:gensym|:host|:if-does-not-exist:pretty|:if-exists:print|:include:print-function|:index|:inherited|:initial-contents|:initial-element|:initial-offset|:initial-value|:input|:internal:size|:io|:junk-allowed|:key|:length|:level|:named|:name|:new-version|:nicknames|:output-file|:output|:overwrite|:predicate|:preserve-whitespace|:probe|:radix|:read-only|:rehash-size|:rehash-threshold|:rename-and-delete|:rename|:start1|:start2|:start|:stream|:supersede|:test|:test-not|:type|:use|:verbose|:version)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:\*applyhook\*|\*break-on-signals\*|\*break-on-signals\*|\*break-on-warnings\*|\*compile-file-pathname\*|\*compile-file-pathname\*|\*compile-file-truename\*|\*compile-file-truename\*|\*compile-print\*|\*compile-verbose\*|\*compile-verbose\*|\*debugger-hook\*|\*debug-io\*|\*default-pathname-defaults\*|\*error-output\*|\*evalhook\*|\*features\*|\*gensym-counter\*|\*load-pathname\*|\*load-print\*|\*load-truename\*|\*load-verbose\*|\*macroexpand-hook\*|\*modules\*|\*package\*|\*print-array\*|\*print-base\*|\*print-case\*|\*print-circle\*|\*print-escape\*|\*print-gensym\*|\*print-length\*|\*print-level\*|\*print-lines\*|\*print-miser-width\*|\*print-miser-width\*|\*print-pprint-dispatch\*|\*print-pprint-dispatch\*|\*print-pretty\*|\*print-radix\*|\*print-readably\*|\*print-right-margin\*|\*print-right-margin\*|\*query-io\*|\*random-state\*|\*read-base\*|\*read-default-float-format\*|\*read-eval\*|\*read-suppress\*|\*readtable\*|\*standard-input\*|\*standard-output\*|\*terminal-io\*|\*trace-output\*)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) continue;
        if((m = /^(?:defclass|defconstant|defgeneric|define-compiler-macro|define-condition|define-method-combination|define-modify-macro|define-setf-expander|define-setf-method|define-symbol-macro|defmacro|defmethod|defpackage|defparameter|defsetf|deftype|defvar|defun|defstruct)\b/.exec(this.str)) && this.hl(m[0], 'dsKeyword')) {this._function_decl();continue;}
        if((m = /^#\\./.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) {this._string();continue;}
        if((m = /^#[bodxei]/.exec(this.str)) && this.hl(m[0], 'dsChar')) {this._specialNumber();continue;}
        if((m = /^#[tf]/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) continue;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) continue;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._multiLineComment = function() {
    var m;
    while(this.pos < this.len) {
        if(this.str[0] == '|#' && this.hl('|#', 'dsComment')) return;
        this.hl(this.str[0], 'dsComment');
    }
};
HL.prototype._function_decl = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\s*[A-Za-z0-9-+\<\>//\*]*\s*/.exec(this.str)) && this.hl(m[0], 'dsFunction')) return;
        this.hl(this.str[0], 'dsFunction');
    }
};
HL.prototype._specialNumber = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^\d*\.\d+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) return;
        if((m = /^\d+/.exec(this.str)) && this.hl(m[0], 'dsDecVal')) return;
        if((m = /^0[0-7]+/.exec(this.str)) && this.hl(m[0], 'dsBaseN')) return;
        if((m = /^0x[\da-fA-F]+/.exec(this.str)) && this.hl(m[0], 'dsFloat')) return;
        if(this.str[0] == '\n' && this.hl('\n', 'dsNormal')) return;
        this.hl(this.str[0], 'dsNormal');
    }
};
HL.prototype._string = function() {
    var m;
    while(this.pos < this.len) {
        if((m = /^#\\./.exec(this.str)) && this.hl(m[0], 'dsChar')) continue;
        if((m = /^\\([abefnrtv"'?\\]|x[\da-fA-F]{2}|0?[0-7]{1,2})/.exec(this.str)) && this.hl(m[0], 'dsString')) continue;
        if(this.str[0] == '"' && this.hl('"', 'dsString')) return;
        this.hl(this.str[0], 'dsString');
    }
};
