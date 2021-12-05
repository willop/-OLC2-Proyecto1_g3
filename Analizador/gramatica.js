/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var gramatica = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,6],$V1=[1,9],$V2=[1,10],$V3=[1,16],$V4=[1,11],$V5=[1,12],$V6=[1,13],$V7=[1,14],$V8=[1,15],$V9=[5,9,10,11,15,29,30,31,32,33],$Va=[16,34],$Vb=[1,32],$Vc=[1,27],$Vd=[1,30],$Ve=[1,31],$Vf=[1,45],$Vg=[1,41],$Vh=[1,42],$Vi=[1,43],$Vj=[1,44],$Vk=[1,46],$Vl=[1,47],$Vm=[1,37],$Vn=[1,38],$Vo=[1,39],$Vp=[1,56],$Vq=[1,67],$Vr=[1,58],$Vs=[1,59],$Vt=[1,60],$Vu=[1,61],$Vv=[1,62],$Vw=[1,63],$Vx=[1,64],$Vy=[1,65],$Vz=[1,66],$VA=[1,68],$VB=[1,69],$VC=[9,25,26,44,45,46,47,48,49,50,51,53,54,55,56,58],$VD=[9,25,26],$VE=[9,18,29,30,31,32,33],$VF=[1,97],$VG=[1,96],$VH=[1,98],$VI=[9,25,26,45,46,58],$VJ=[9,25,26,45,46,47,48,49,50,51,53,58],$VK=[9,25,26,44,45,46,47,48,49,50,51,53,54,58];
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"ini":3,"INSTRUCCIONES":4,"EOF":5,"INSTRUCCION":6,"DECLARACION":7,"COMENTARIOS":8,"TK_SALTO_LINEA":9,"TK_COMENTARIO":10,"TK_COMENTARIO_MULTI":11,"TIPO_VALOR":12,"TIPO_DECLARACION":13,"STRUCT":14,"TK_STRUCT":15,"TK_ID":16,"TK_corchete_apertura":17,"TK_corchete_cierre":18,"FIN_LINEA":19,"CUERPO_STRUCT":20,"CONTENIDO_STRUCT":21,"TK_igual":22,"EXPRESIONARIT":23,"FIN_LINEA_STRUCT":24,"TK_coma":25,"TK_pcoma":26,"IGUALACION":27,"COND_ARREGLO":28,"TK_STRING":29,"TK_INT":30,"TK_BOOLEAN":31,"TK_DOUBLE":32,"TK_CHAR":33,"TK_llave_apertura":34,"TK_llave_cierre":35,"MAS_VARIABLES":36,"VALORES":37,"TK_CADENA":38,"TK_TRUE":39,"TK_FALSE":40,"TK_CARACTER":41,"TK_ENTERO":42,"TK_DECIMAL":43,"TK_MENOS":44,"TK_and":45,"TK_or":46,"TK_mayor_igual":47,"TK_menor_igual":48,"TK_mayor":49,"TK_menor":50,"TK_igualacion":51,"EXPRESION":52,"TK_desigual":53,"TK_MAS":54,"TK_POR":55,"TK_DIVIDIDO":56,"TK_par_apertura":57,"TK_par_cierre":58,"TK_not":59,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",9:"TK_SALTO_LINEA",10:"TK_COMENTARIO",11:"TK_COMENTARIO_MULTI",15:"TK_STRUCT",16:"TK_ID",17:"TK_corchete_apertura",18:"TK_corchete_cierre",22:"TK_igual",25:"TK_coma",26:"TK_pcoma",29:"TK_STRING",30:"TK_INT",31:"TK_BOOLEAN",32:"TK_DOUBLE",33:"TK_CHAR",34:"TK_llave_apertura",35:"TK_llave_cierre",38:"TK_CADENA",39:"TK_TRUE",40:"TK_FALSE",41:"TK_CARACTER",42:"TK_ENTERO",43:"TK_DECIMAL",44:"TK_MENOS",45:"TK_and",46:"TK_or",47:"TK_mayor_igual",48:"TK_menor_igual",49:"TK_mayor",50:"TK_menor",51:"TK_igualacion",52:"EXPRESION",53:"TK_desigual",54:"TK_MAS",55:"TK_POR",56:"TK_DIVIDIDO",57:"TK_par_apertura",58:"TK_par_cierre",59:"TK_not"},
productions_: [0,[3,2],[4,2],[4,1],[6,1],[6,1],[6,1],[8,2],[8,2],[7,2],[7,1],[14,5],[14,6],[20,2],[20,1],[21,5],[21,3],[21,1],[24,1],[24,1],[24,1],[13,2],[13,3],[19,1],[19,1],[12,1],[12,1],[12,1],[12,1],[12,1],[28,2],[27,3],[27,2],[27,1],[36,3],[36,2],[37,1],[37,1],[37,1],[37,1],[37,1],[37,1],[37,1],[23,2],[23,3],[23,3],[23,3],[23,3],[23,3],[23,3],[23,3],[23,3],[23,3],[23,3],[23,3],[23,3],[23,3],[23,3],[23,3],[23,2],[23,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
}
},
table: [{3:1,4:2,6:3,7:4,8:5,9:$V0,10:$V1,11:$V2,12:7,14:8,15:$V3,29:$V4,30:$V5,31:$V6,32:$V7,33:$V8},{1:[3]},{5:[1,17],6:18,7:4,8:5,9:$V0,10:$V1,11:$V2,12:7,14:8,15:$V3,29:$V4,30:$V5,31:$V6,32:$V7,33:$V8},o($V9,[2,3]),o($V9,[2,4]),o($V9,[2,5]),o($V9,[2,6]),{13:19,16:[1,20],28:21,34:[1,22]},o($V9,[2,10]),{9:[1,23]},{9:[1,24]},o($Va,[2,25]),o($Va,[2,26]),o($Va,[2,27]),o($Va,[2,28]),o($Va,[2,29]),{16:[1,25]},{1:[2,1]},o($V9,[2,2]),o($V9,[2,9]),{9:$Vb,19:29,22:$Vc,25:$Vd,26:$Ve,27:26,36:28},{16:[1,33]},{35:[1,34]},o($V9,[2,7]),o($V9,[2,8]),{17:[1,35]},o($V9,[2,21]),{16:$Vf,23:36,37:40,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$Vl,44:$Vm,57:$Vn,59:$Vo},{9:$Vb,19:48,25:[1,49],26:$Ve},o($V9,[2,33]),{16:[1,50]},o($V9,[2,23]),o($V9,[2,24]),{9:$Vb,19:29,22:$Vc,25:$Vd,26:$Ve,27:51,36:28},{16:[2,30]},{9:$Vp,12:55,18:[1,52],20:53,21:54,29:$V4,30:$V5,31:$V6,32:$V7,33:$V8},{9:$Vb,19:57,26:$Ve,44:$Vq,45:$Vr,46:$Vs,47:$Vt,48:$Vu,49:$Vv,50:$Vw,51:$Vx,53:$Vy,54:$Vz,55:$VA,56:$VB},{16:$Vf,23:70,37:40,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$Vl,44:$Vm,57:$Vn,59:$Vo},{16:$Vf,23:71,37:40,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$Vl,44:$Vm,57:$Vn,59:$Vo},{16:$Vf,23:72,37:40,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$Vl,44:$Vm,57:$Vn,59:$Vo},o($VC,[2,60]),o($VC,[2,36]),o($VC,[2,37]),o($VC,[2,38]),o($VC,[2,39]),o($VC,[2,40]),o($VC,[2,41]),o($VC,[2,42]),o($V9,[2,32]),{16:[1,73]},o($VD,[2,35]),o($V9,[2,22]),{9:$Vb,19:74,26:$Ve},{9:$Vp,12:55,18:[1,75],21:76,29:$V4,30:$V5,31:$V6,32:$V7,33:$V8},o($VE,[2,14]),{16:[1,77]},o($VE,[2,17]),o($V9,[2,31]),{16:$Vf,23:78,37:40,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$Vl,44:$Vm,57:$Vn,59:$Vo},{16:$Vf,23:79,37:40,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$Vl,44:$Vm,57:$Vn,59:$Vo},{16:$Vf,23:80,37:40,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$Vl,44:$Vm,57:$Vn,59:$Vo},{16:$Vf,23:81,37:40,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$Vl,44:$Vm,57:$Vn,59:$Vo},{16:$Vf,23:82,37:40,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$Vl,44:$Vm,57:$Vn,59:$Vo},{16:$Vf,23:83,37:40,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$Vl,44:$Vm,57:$Vn,59:$Vo},{52:[1,84]},{16:$Vf,23:85,37:40,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$Vl,44:$Vm,57:$Vn,59:$Vo},{16:$Vf,23:87,37:40,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$Vl,44:$Vm,54:[1,86],57:$Vn,59:$Vo},{16:$Vf,23:89,37:40,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$Vl,44:[1,88],57:$Vn,59:$Vo},{16:$Vf,23:90,37:40,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$Vl,44:$Vm,57:$Vn,59:$Vo},{16:$Vf,23:91,37:40,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$Vl,44:$Vm,57:$Vn,59:$Vo},o($VC,[2,43]),{44:$Vq,45:$Vr,46:$Vs,47:$Vt,48:$Vu,49:$Vv,50:$Vw,51:$Vx,53:$Vy,54:$Vz,55:$VA,56:$VB,58:[1,92]},o($VC,[2,59]),o($VD,[2,34]),o($V9,[2,11]),{9:$Vb,19:93,26:$Ve},o($VE,[2,13]),{9:$VF,22:[1,94],24:95,25:$VG,26:$VH},o($VI,[2,44],{44:$Vq,47:$Vt,48:$Vu,49:$Vv,50:$Vw,51:$Vx,53:$Vy,54:$Vz,55:$VA,56:$VB}),o($VI,[2,45],{44:$Vq,47:$Vt,48:$Vu,49:$Vv,50:$Vw,51:$Vx,53:$Vy,54:$Vz,55:$VA,56:$VB}),o($VJ,[2,46],{44:$Vq,54:$Vz,55:$VA,56:$VB}),o($VJ,[2,47],{44:$Vq,54:$Vz,55:$VA,56:$VB}),o($VJ,[2,48],{44:$Vq,54:$Vz,55:$VA,56:$VB}),o($VJ,[2,49],{44:$Vq,54:$Vz,55:$VA,56:$VB}),o($VC,[2,50]),o($VJ,[2,51],{44:$Vq,54:$Vz,55:$VA,56:$VB}),o($VC,[2,52]),o($VK,[2,54],{55:$VA,56:$VB}),o($VC,[2,53],{37:40,23:70,16:$Vf,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$Vl,57:$Vn,59:$Vo}),o($VK,[2,55],{55:$VA,56:$VB}),o($VC,[2,56]),o($VC,[2,57]),o($VC,[2,58]),o($V9,[2,12]),{16:$Vf,23:99,37:40,38:$Vg,39:$Vh,40:$Vi,41:$Vj,42:$Vk,43:$Vl,44:$Vm,57:$Vn,59:$Vo},o($VE,[2,16]),o($VE,[2,18]),o($VE,[2,19]),o($VE,[2,20]),{9:$VF,24:100,25:$VG,26:$VH,44:$Vq,45:$Vr,46:$Vs,47:$Vt,48:$Vu,49:$Vv,50:$Vw,51:$Vx,53:$Vy,54:$Vz,55:$VA,56:$VB},o($VE,[2,15])],
defaultActions: {17:[2,1],34:[2,30]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function(match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex () {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin (condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState () {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules () {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState (n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState (condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:return 10;// comentario simple línea
break;
case 1:return 11;//; comentario multiple líneas
break;
case 2:return 'TK_NULL';
break;
case 3:return 30;
break;
case 4:return 32;
break;
case 5:return 31;
break;
case 6:return 33;
break;
case 7:return 29;
break;
case 8:return 15;
break;
case 9:return 'TK_POW';
break;
case 10:return 'TK_SQRT';
break;
case 11:return 'TK_SIN';
break;
case 12:return 'TK_COS';
break;
case 13:return 'TK_TAN';
break;
case 14:return 'TK_LOG';
break;
case 15:return 'TK_CARETER_OF_POSITION';
break;
case 16:return 'TK_SUBSTRING';
break;
case 17:return 'TK_LENGHT';
break;
case 18:return 'TK_TOUPPERCASE';
break;
case 19:return 'TK_TOLOWERCASE';
break;
case 20:return 'TK_PRINT';
break;
case 21:return 'TK_PRINTLN';
break;
case 22:return 'TK_PARSE';
break;
case 23:return 'TK_TOINT';
break;
case 24:return 'TK_TODOUBLE';
break;
case 25:return 'TK_TYPEOF';
break;
case 26:return 'TK_FUNCTION';
break;
case 27:return 'TK_RETURN';
break;
case 28:return 'TK_IF';
break;
case 29:return 'TK_ELSE';
break;
case 30:return 'TK_ELSEIF';
break;
case 31:return 'TK_SWITCH';
break;
case 32:return 'TK_CASE';
break;
case 33:return 'TK_DEFAULT';
break;
case 34:return 'TK_BREAK';
break;
case 35:return 'TK_WHILE';
break;
case 36:return 'TK_DO';
break;
case 37:return 'TK_FOR';
break;
case 38:return 'TK_IN';
break;
case 39:return 'TK_PUSH';
break;
case 40:return 'TK_POP';
break;
case 41:return 'TK_BEGIN';
break;
case 42:return 'TK_END';
break;
case 43:return 'TK_CONTINUE';
break;
case 44:return 39;
break;
case 45:return 40;
break;
case 46:return 54;
break;
case 47:return 44;
break;
case 48:return 55;
break;
case 49:return 56;
break;
case 50:return 'TK_MODULO'
break;
case 51:return 57;
break;
case 52:return 58;
break;
case 53:return 17;
break;
case 54:return 18;
break;
case 55:return 34;
break;
case 56:return 35;
break;
case 57:return 'TK_dos_puntos';
break;
case 58:return 26;
break;
case 59:return 25;
break;
case 60:return 'TK_punto';
break;
case 61:return 51;
break;
case 62:return 22;
break;
case 63:return 53;
break;
case 64:return 47;
break;
case 65:return 48;
break;
case 66:return 50;
break;
case 67:return 49;
break;
case 68:return 45;
break;
case 69:return 46;
break;
case 70:return 59;
break;
case 71:return 'TK_concat';
break;
case 72:return 'TK_numeral';
break;
case 73:return 'TK_dolar';
break;
case 74:return 'TK_pregunta';
break;
case 75:return 9
break;
case 76:// se ignoran espacios en blanco
break;
case 77:return 43;
break;
case 78:return 42;   
break;
case 79:return 38;
break;
case 80:return 41;
break;
case 81:return 16;
break;
case 82:return 5;
break;
case 83: console.error('Este es un error léxico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column); 
break;
}
},
rules: [/^(?:\/\/.*)/i,/^(?:\/\*(\*(?!\/)|[^*])*\*\/\n)/i,/^(?:null\b)/i,/^(?:int\b)/i,/^(?:dobule\b)/i,/^(?:boolean\b)/i,/^(?:char\b)/i,/^(?:String\b)/i,/^(?:struct\b)/i,/^(?:pow\b)/i,/^(?:sqrt\b)/i,/^(?:sin\b)/i,/^(?:cos\b)/i,/^(?:tan\b)/i,/^(?:log10\b)/i,/^(?:caracterOfPosition\b)/i,/^(?:subString\b)/i,/^(?:lenght\b)/i,/^(?:toUppercase\b)/i,/^(?:toLowercase\b)/i,/^(?:print\b)/i,/^(?:println\b)/i,/^(?:parse\b)/i,/^(?:toInt\b)/i,/^(?:toDouble\b)/i,/^(?:typeof\b)/i,/^(?:function\b)/i,/^(?:return\b)/i,/^(?:if\b)/i,/^(?:else\b)/i,/^(?:elseif\b)/i,/^(?:switch\b)/i,/^(?:case\b)/i,/^(?:default\b)/i,/^(?:break\b)/i,/^(?:while\b)/i,/^(?:do\b)/i,/^(?:for\b)/i,/^(?:in\b)/i,/^(?:push\b)/i,/^(?:pop\b)/i,/^(?:begin\b)/i,/^(?:end\b)/i,/^(?:continue\b)/i,/^(?:true\b)/i,/^(?:false\b)/i,/^(?:\+)/i,/^(?:-)/i,/^(?:\*)/i,/^(?:\/)/i,/^(?:%)/i,/^(?:\()/i,/^(?:\))/i,/^(?:\{)/i,/^(?:\})/i,/^(?:\[)/i,/^(?:\])/i,/^(?::)/i,/^(?:;)/i,/^(?:,)/i,/^(?:\.)/i,/^(?:==)/i,/^(?:=)/i,/^(?:!=)/i,/^(?:>=)/i,/^(?:<=)/i,/^(?:<)/i,/^(?:>)/i,/^(?:&&)/i,/^(?:\|\|)/i,/^(?:!)/i,/^(?:&)/i,/^(?:#)/i,/^(?:\$)/i,/^(?:\?)/i,/^(?:\n)/i,/^(?:\s+)/i,/^(?:[0-9]+(\.[0-9]+)?\b)/i,/^(?:[0-9]+\b)/i,/^(?:"[^\"]*")/i,/^(?:'[^\']*')/i,/^(?:([a-zA-Z])[a-zA-Z0-9_]*)/i,/^(?:$)/i,/^(?:.)/i],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = gramatica;
exports.Parser = gramatica.Parser;
exports.parse = function () { return gramatica.parse.apply(gramatica, arguments); };
exports.main = function commonjsMain (args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}