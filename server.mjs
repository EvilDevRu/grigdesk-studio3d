import { createRequire } from "node:module"; const require = createRequire(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/ajv/dist/compile/codegen/code.js
var require_code = __commonJS({
  "node_modules/ajv/dist/compile/codegen/code.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.regexpCode = exports.getEsmExportName = exports.getProperty = exports.safeStringify = exports.stringify = exports.strConcat = exports.addCodeArg = exports.str = exports._ = exports.nil = exports._Code = exports.Name = exports.IDENTIFIER = exports._CodeOrName = void 0;
    var _CodeOrName = class {
    };
    exports._CodeOrName = _CodeOrName;
    exports.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
    var Name = class extends _CodeOrName {
      constructor(s) {
        super();
        if (!exports.IDENTIFIER.test(s))
          throw new Error("CodeGen: name must be a valid identifier");
        this.str = s;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        return false;
      }
      get names() {
        return { [this.str]: 1 };
      }
    };
    exports.Name = Name;
    var _Code = class extends _CodeOrName {
      constructor(code) {
        super();
        this._items = typeof code === "string" ? [code] : code;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        if (this._items.length > 1)
          return false;
        const item = this._items[0];
        return item === "" || item === '""';
      }
      get str() {
        var _a;
        return (_a = this._str) !== null && _a !== void 0 ? _a : this._str = this._items.reduce((s, c) => `${s}${c}`, "");
      }
      get names() {
        var _a;
        return (_a = this._names) !== null && _a !== void 0 ? _a : this._names = this._items.reduce((names, c) => {
          if (c instanceof Name)
            names[c.str] = (names[c.str] || 0) + 1;
          return names;
        }, {});
      }
    };
    exports._Code = _Code;
    exports.nil = new _Code("");
    function _(strs, ...args) {
      const code = [strs[0]];
      let i = 0;
      while (i < args.length) {
        addCodeArg(code, args[i]);
        code.push(strs[++i]);
      }
      return new _Code(code);
    }
    exports._ = _;
    var plus = new _Code("+");
    function str(strs, ...args) {
      const expr = [safeStringify(strs[0])];
      let i = 0;
      while (i < args.length) {
        expr.push(plus);
        addCodeArg(expr, args[i]);
        expr.push(plus, safeStringify(strs[++i]));
      }
      optimize(expr);
      return new _Code(expr);
    }
    exports.str = str;
    function addCodeArg(code, arg) {
      if (arg instanceof _Code)
        code.push(...arg._items);
      else if (arg instanceof Name)
        code.push(arg);
      else
        code.push(interpolate(arg));
    }
    exports.addCodeArg = addCodeArg;
    function optimize(expr) {
      let i = 1;
      while (i < expr.length - 1) {
        if (expr[i] === plus) {
          const res = mergeExprItems(expr[i - 1], expr[i + 1]);
          if (res !== void 0) {
            expr.splice(i - 1, 3, res);
            continue;
          }
          expr[i++] = "+";
        }
        i++;
      }
    }
    function mergeExprItems(a, b) {
      if (b === '""')
        return a;
      if (a === '""')
        return b;
      if (typeof a == "string") {
        if (b instanceof Name || a[a.length - 1] !== '"')
          return;
        if (typeof b != "string")
          return `${a.slice(0, -1)}${b}"`;
        if (b[0] === '"')
          return a.slice(0, -1) + b.slice(1);
        return;
      }
      if (typeof b == "string" && b[0] === '"' && !(a instanceof Name))
        return `"${a}${b.slice(1)}`;
      return;
    }
    function strConcat(c1, c2) {
      return c2.emptyStr() ? c1 : c1.emptyStr() ? c2 : str`${c1}${c2}`;
    }
    exports.strConcat = strConcat;
    function interpolate(x) {
      return typeof x == "number" || typeof x == "boolean" || x === null ? x : safeStringify(Array.isArray(x) ? x.join(",") : x);
    }
    function stringify(x) {
      return new _Code(safeStringify(x));
    }
    exports.stringify = stringify;
    function safeStringify(x) {
      return JSON.stringify(x).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
    }
    exports.safeStringify = safeStringify;
    function getProperty(key) {
      return typeof key == "string" && exports.IDENTIFIER.test(key) ? new _Code(`.${key}`) : _`[${key}]`;
    }
    exports.getProperty = getProperty;
    function getEsmExportName(key) {
      if (typeof key == "string" && exports.IDENTIFIER.test(key)) {
        return new _Code(`${key}`);
      }
      throw new Error(`CodeGen: invalid export name: ${key}, use explicit $id name mapping`);
    }
    exports.getEsmExportName = getEsmExportName;
    function regexpCode(rx) {
      return new _Code(rx.toString());
    }
    exports.regexpCode = regexpCode;
  }
});

// node_modules/ajv/dist/compile/codegen/scope.js
var require_scope = __commonJS({
  "node_modules/ajv/dist/compile/codegen/scope.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ValueScope = exports.ValueScopeName = exports.Scope = exports.varKinds = exports.UsedValueState = void 0;
    var code_1 = require_code();
    var ValueError = class extends Error {
      constructor(name) {
        super(`CodeGen: "code" for ${name} not defined`);
        this.value = name.value;
      }
    };
    var UsedValueState;
    (function(UsedValueState2) {
      UsedValueState2[UsedValueState2["Started"] = 0] = "Started";
      UsedValueState2[UsedValueState2["Completed"] = 1] = "Completed";
    })(UsedValueState || (exports.UsedValueState = UsedValueState = {}));
    exports.varKinds = {
      const: new code_1.Name("const"),
      let: new code_1.Name("let"),
      var: new code_1.Name("var")
    };
    var Scope = class {
      constructor({ prefixes, parent } = {}) {
        this._names = {};
        this._prefixes = prefixes;
        this._parent = parent;
      }
      toName(nameOrPrefix) {
        return nameOrPrefix instanceof code_1.Name ? nameOrPrefix : this.name(nameOrPrefix);
      }
      name(prefix) {
        return new code_1.Name(this._newName(prefix));
      }
      _newName(prefix) {
        const ng = this._names[prefix] || this._nameGroup(prefix);
        return `${prefix}${ng.index++}`;
      }
      _nameGroup(prefix) {
        var _a, _b;
        if (((_b = (_a = this._parent) === null || _a === void 0 ? void 0 : _a._prefixes) === null || _b === void 0 ? void 0 : _b.has(prefix)) || this._prefixes && !this._prefixes.has(prefix)) {
          throw new Error(`CodeGen: prefix "${prefix}" is not allowed in this scope`);
        }
        return this._names[prefix] = { prefix, index: 0 };
      }
    };
    exports.Scope = Scope;
    var ValueScopeName = class extends code_1.Name {
      constructor(prefix, nameStr) {
        super(nameStr);
        this.prefix = prefix;
      }
      setValue(value, { property, itemIndex }) {
        this.value = value;
        this.scopePath = (0, code_1._)`.${new code_1.Name(property)}[${itemIndex}]`;
      }
    };
    exports.ValueScopeName = ValueScopeName;
    var line = (0, code_1._)`\n`;
    var ValueScope = class extends Scope {
      constructor(opts) {
        super(opts);
        this._values = {};
        this._scope = opts.scope;
        this.opts = { ...opts, _n: opts.lines ? line : code_1.nil };
      }
      get() {
        return this._scope;
      }
      name(prefix) {
        return new ValueScopeName(prefix, this._newName(prefix));
      }
      value(nameOrPrefix, value) {
        var _a;
        if (value.ref === void 0)
          throw new Error("CodeGen: ref must be passed in value");
        const name = this.toName(nameOrPrefix);
        const { prefix } = name;
        const valueKey = (_a = value.key) !== null && _a !== void 0 ? _a : value.ref;
        let vs = this._values[prefix];
        if (vs) {
          const _name = vs.get(valueKey);
          if (_name)
            return _name;
        } else {
          vs = this._values[prefix] = /* @__PURE__ */ new Map();
        }
        vs.set(valueKey, name);
        const s = this._scope[prefix] || (this._scope[prefix] = []);
        const itemIndex = s.length;
        s[itemIndex] = value.ref;
        name.setValue(value, { property: prefix, itemIndex });
        return name;
      }
      getValue(prefix, keyOrRef) {
        const vs = this._values[prefix];
        if (!vs)
          return;
        return vs.get(keyOrRef);
      }
      scopeRefs(scopeName, values2 = this._values) {
        return this._reduceValues(values2, (name) => {
          if (name.scopePath === void 0)
            throw new Error(`CodeGen: name "${name}" has no value`);
          return (0, code_1._)`${scopeName}${name.scopePath}`;
        });
      }
      scopeCode(values2 = this._values, usedValues, getCode) {
        return this._reduceValues(values2, (name) => {
          if (name.value === void 0)
            throw new Error(`CodeGen: name "${name}" has no value`);
          return name.value.code;
        }, usedValues, getCode);
      }
      _reduceValues(values2, valueCode, usedValues = {}, getCode) {
        let code = code_1.nil;
        for (const prefix in values2) {
          const vs = values2[prefix];
          if (!vs)
            continue;
          const nameSet = usedValues[prefix] = usedValues[prefix] || /* @__PURE__ */ new Map();
          vs.forEach((name) => {
            if (nameSet.has(name))
              return;
            nameSet.set(name, UsedValueState.Started);
            let c = valueCode(name);
            if (c) {
              const def = this.opts.es5 ? exports.varKinds.var : exports.varKinds.const;
              code = (0, code_1._)`${code}${def} ${name} = ${c};${this.opts._n}`;
            } else if (c = getCode === null || getCode === void 0 ? void 0 : getCode(name)) {
              code = (0, code_1._)`${code}${c}${this.opts._n}`;
            } else {
              throw new ValueError(name);
            }
            nameSet.set(name, UsedValueState.Completed);
          });
        }
        return code;
      }
    };
    exports.ValueScope = ValueScope;
  }
});

// node_modules/ajv/dist/compile/codegen/index.js
var require_codegen = __commonJS({
  "node_modules/ajv/dist/compile/codegen/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.or = exports.and = exports.not = exports.CodeGen = exports.operators = exports.varKinds = exports.ValueScopeName = exports.ValueScope = exports.Scope = exports.Name = exports.regexpCode = exports.stringify = exports.getProperty = exports.nil = exports.strConcat = exports.str = exports._ = void 0;
    var code_1 = require_code();
    var scope_1 = require_scope();
    var code_2 = require_code();
    Object.defineProperty(exports, "_", { enumerable: true, get: function() {
      return code_2._;
    } });
    Object.defineProperty(exports, "str", { enumerable: true, get: function() {
      return code_2.str;
    } });
    Object.defineProperty(exports, "strConcat", { enumerable: true, get: function() {
      return code_2.strConcat;
    } });
    Object.defineProperty(exports, "nil", { enumerable: true, get: function() {
      return code_2.nil;
    } });
    Object.defineProperty(exports, "getProperty", { enumerable: true, get: function() {
      return code_2.getProperty;
    } });
    Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
      return code_2.stringify;
    } });
    Object.defineProperty(exports, "regexpCode", { enumerable: true, get: function() {
      return code_2.regexpCode;
    } });
    Object.defineProperty(exports, "Name", { enumerable: true, get: function() {
      return code_2.Name;
    } });
    var scope_2 = require_scope();
    Object.defineProperty(exports, "Scope", { enumerable: true, get: function() {
      return scope_2.Scope;
    } });
    Object.defineProperty(exports, "ValueScope", { enumerable: true, get: function() {
      return scope_2.ValueScope;
    } });
    Object.defineProperty(exports, "ValueScopeName", { enumerable: true, get: function() {
      return scope_2.ValueScopeName;
    } });
    Object.defineProperty(exports, "varKinds", { enumerable: true, get: function() {
      return scope_2.varKinds;
    } });
    exports.operators = {
      GT: new code_1._Code(">"),
      GTE: new code_1._Code(">="),
      LT: new code_1._Code("<"),
      LTE: new code_1._Code("<="),
      EQ: new code_1._Code("==="),
      NEQ: new code_1._Code("!=="),
      NOT: new code_1._Code("!"),
      OR: new code_1._Code("||"),
      AND: new code_1._Code("&&"),
      ADD: new code_1._Code("+")
    };
    var Node = class {
      optimizeNodes() {
        return this;
      }
      optimizeNames(_names, _constants) {
        return this;
      }
    };
    var Def = class extends Node {
      constructor(varKind, name, rhs) {
        super();
        this.varKind = varKind;
        this.name = name;
        this.rhs = rhs;
      }
      render({ es5, _n }) {
        const varKind = es5 ? scope_1.varKinds.var : this.varKind;
        const rhs = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
        return `${varKind} ${this.name}${rhs};` + _n;
      }
      optimizeNames(names, constants2) {
        if (!names[this.name.str])
          return;
        if (this.rhs)
          this.rhs = optimizeExpr(this.rhs, names, constants2);
        return this;
      }
      get names() {
        return this.rhs instanceof code_1._CodeOrName ? this.rhs.names : {};
      }
    };
    var Assign = class extends Node {
      constructor(lhs, rhs, sideEffects) {
        super();
        this.lhs = lhs;
        this.rhs = rhs;
        this.sideEffects = sideEffects;
      }
      render({ _n }) {
        return `${this.lhs} = ${this.rhs};` + _n;
      }
      optimizeNames(names, constants2) {
        if (this.lhs instanceof code_1.Name && !names[this.lhs.str] && !this.sideEffects)
          return;
        this.rhs = optimizeExpr(this.rhs, names, constants2);
        return this;
      }
      get names() {
        const names = this.lhs instanceof code_1.Name ? {} : { ...this.lhs.names };
        return addExprNames(names, this.rhs);
      }
    };
    var AssignOp = class extends Assign {
      constructor(lhs, op, rhs, sideEffects) {
        super(lhs, rhs, sideEffects);
        this.op = op;
      }
      render({ _n }) {
        return `${this.lhs} ${this.op}= ${this.rhs};` + _n;
      }
    };
    var Label = class extends Node {
      constructor(label) {
        super();
        this.label = label;
        this.names = {};
      }
      render({ _n }) {
        return `${this.label}:` + _n;
      }
    };
    var Break = class extends Node {
      constructor(label) {
        super();
        this.label = label;
        this.names = {};
      }
      render({ _n }) {
        const label = this.label ? ` ${this.label}` : "";
        return `break${label};` + _n;
      }
    };
    var Throw = class extends Node {
      constructor(error) {
        super();
        this.error = error;
      }
      render({ _n }) {
        return `throw ${this.error};` + _n;
      }
      get names() {
        return this.error.names;
      }
    };
    var AnyCode = class extends Node {
      constructor(code) {
        super();
        this.code = code;
      }
      render({ _n }) {
        return `${this.code};` + _n;
      }
      optimizeNodes() {
        return `${this.code}` ? this : void 0;
      }
      optimizeNames(names, constants2) {
        this.code = optimizeExpr(this.code, names, constants2);
        return this;
      }
      get names() {
        return this.code instanceof code_1._CodeOrName ? this.code.names : {};
      }
    };
    var ParentNode = class extends Node {
      constructor(nodes = []) {
        super();
        this.nodes = nodes;
      }
      render(opts) {
        return this.nodes.reduce((code, n) => code + n.render(opts), "");
      }
      optimizeNodes() {
        const { nodes } = this;
        let i = nodes.length;
        while (i--) {
          const n = nodes[i].optimizeNodes();
          if (Array.isArray(n))
            nodes.splice(i, 1, ...n);
          else if (n)
            nodes[i] = n;
          else
            nodes.splice(i, 1);
        }
        return nodes.length > 0 ? this : void 0;
      }
      optimizeNames(names, constants2) {
        const { nodes } = this;
        let i = nodes.length;
        while (i--) {
          const n = nodes[i];
          if (n.optimizeNames(names, constants2))
            continue;
          subtractNames(names, n.names);
          nodes.splice(i, 1);
        }
        return nodes.length > 0 ? this : void 0;
      }
      get names() {
        return this.nodes.reduce((names, n) => addNames(names, n.names), {});
      }
    };
    var BlockNode = class extends ParentNode {
      render(opts) {
        return "{" + opts._n + super.render(opts) + "}" + opts._n;
      }
    };
    var Root = class extends ParentNode {
    };
    var Else = class extends BlockNode {
    };
    Else.kind = "else";
    var If = class _If extends BlockNode {
      constructor(condition, nodes) {
        super(nodes);
        this.condition = condition;
      }
      render(opts) {
        let code = `if(${this.condition})` + super.render(opts);
        if (this.else)
          code += "else " + this.else.render(opts);
        return code;
      }
      optimizeNodes() {
        super.optimizeNodes();
        const cond = this.condition;
        if (cond === true)
          return this.nodes;
        let e = this.else;
        if (e) {
          const ns = e.optimizeNodes();
          e = this.else = Array.isArray(ns) ? new Else(ns) : ns;
        }
        if (e) {
          if (cond === false)
            return e instanceof _If ? e : e.nodes;
          if (this.nodes.length)
            return this;
          return new _If(not(cond), e instanceof _If ? [e] : e.nodes);
        }
        if (cond === false || !this.nodes.length)
          return void 0;
        return this;
      }
      optimizeNames(names, constants2) {
        var _a;
        this.else = (_a = this.else) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants2);
        if (!(super.optimizeNames(names, constants2) || this.else))
          return;
        this.condition = optimizeExpr(this.condition, names, constants2);
        return this;
      }
      get names() {
        const names = super.names;
        addExprNames(names, this.condition);
        if (this.else)
          addNames(names, this.else.names);
        return names;
      }
    };
    If.kind = "if";
    var For = class extends BlockNode {
    };
    For.kind = "for";
    var ForLoop = class extends For {
      constructor(iteration) {
        super();
        this.iteration = iteration;
      }
      render(opts) {
        return `for(${this.iteration})` + super.render(opts);
      }
      optimizeNames(names, constants2) {
        if (!super.optimizeNames(names, constants2))
          return;
        this.iteration = optimizeExpr(this.iteration, names, constants2);
        return this;
      }
      get names() {
        return addNames(super.names, this.iteration.names);
      }
    };
    var ForRange = class extends For {
      constructor(varKind, name, from, to) {
        super();
        this.varKind = varKind;
        this.name = name;
        this.from = from;
        this.to = to;
      }
      render(opts) {
        const varKind = opts.es5 ? scope_1.varKinds.var : this.varKind;
        const { name, from, to } = this;
        return `for(${varKind} ${name}=${from}; ${name}<${to}; ${name}++)` + super.render(opts);
      }
      get names() {
        const names = addExprNames(super.names, this.from);
        return addExprNames(names, this.to);
      }
    };
    var ForIter = class extends For {
      constructor(loop, varKind, name, iterable) {
        super();
        this.loop = loop;
        this.varKind = varKind;
        this.name = name;
        this.iterable = iterable;
      }
      render(opts) {
        return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(opts);
      }
      optimizeNames(names, constants2) {
        if (!super.optimizeNames(names, constants2))
          return;
        this.iterable = optimizeExpr(this.iterable, names, constants2);
        return this;
      }
      get names() {
        return addNames(super.names, this.iterable.names);
      }
    };
    var Func = class extends BlockNode {
      constructor(name, args, async) {
        super();
        this.name = name;
        this.args = args;
        this.async = async;
      }
      render(opts) {
        const _async = this.async ? "async " : "";
        return `${_async}function ${this.name}(${this.args})` + super.render(opts);
      }
    };
    Func.kind = "func";
    var Return = class extends ParentNode {
      render(opts) {
        return "return " + super.render(opts);
      }
    };
    Return.kind = "return";
    var Try = class extends BlockNode {
      render(opts) {
        let code = "try" + super.render(opts);
        if (this.catch)
          code += this.catch.render(opts);
        if (this.finally)
          code += this.finally.render(opts);
        return code;
      }
      optimizeNodes() {
        var _a, _b;
        super.optimizeNodes();
        (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNodes();
        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNodes();
        return this;
      }
      optimizeNames(names, constants2) {
        var _a, _b;
        super.optimizeNames(names, constants2);
        (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants2);
        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNames(names, constants2);
        return this;
      }
      get names() {
        const names = super.names;
        if (this.catch)
          addNames(names, this.catch.names);
        if (this.finally)
          addNames(names, this.finally.names);
        return names;
      }
    };
    var Catch = class extends BlockNode {
      constructor(error) {
        super();
        this.error = error;
      }
      render(opts) {
        return `catch(${this.error})` + super.render(opts);
      }
    };
    Catch.kind = "catch";
    var Finally = class extends BlockNode {
      render(opts) {
        return "finally" + super.render(opts);
      }
    };
    Finally.kind = "finally";
    var CodeGen = class {
      constructor(extScope, opts = {}) {
        this._values = {};
        this._blockStarts = [];
        this._constants = {};
        this.opts = { ...opts, _n: opts.lines ? "\n" : "" };
        this._extScope = extScope;
        this._scope = new scope_1.Scope({ parent: extScope });
        this._nodes = [new Root()];
      }
      toString() {
        return this._root.render(this.opts);
      }
      // returns unique name in the internal scope
      name(prefix) {
        return this._scope.name(prefix);
      }
      // reserves unique name in the external scope
      scopeName(prefix) {
        return this._extScope.name(prefix);
      }
      // reserves unique name in the external scope and assigns value to it
      scopeValue(prefixOrName, value) {
        const name = this._extScope.value(prefixOrName, value);
        const vs = this._values[name.prefix] || (this._values[name.prefix] = /* @__PURE__ */ new Set());
        vs.add(name);
        return name;
      }
      getScopeValue(prefix, keyOrRef) {
        return this._extScope.getValue(prefix, keyOrRef);
      }
      // return code that assigns values in the external scope to the names that are used internally
      // (same names that were returned by gen.scopeName or gen.scopeValue)
      scopeRefs(scopeName) {
        return this._extScope.scopeRefs(scopeName, this._values);
      }
      scopeCode() {
        return this._extScope.scopeCode(this._values);
      }
      _def(varKind, nameOrPrefix, rhs, constant) {
        const name = this._scope.toName(nameOrPrefix);
        if (rhs !== void 0 && constant)
          this._constants[name.str] = rhs;
        this._leafNode(new Def(varKind, name, rhs));
        return name;
      }
      // `const` declaration (`var` in es5 mode)
      const(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.const, nameOrPrefix, rhs, _constant);
      }
      // `let` declaration with optional assignment (`var` in es5 mode)
      let(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.let, nameOrPrefix, rhs, _constant);
      }
      // `var` declaration with optional assignment
      var(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.var, nameOrPrefix, rhs, _constant);
      }
      // assignment code
      assign(lhs, rhs, sideEffects) {
        return this._leafNode(new Assign(lhs, rhs, sideEffects));
      }
      // `+=` code
      add(lhs, rhs) {
        return this._leafNode(new AssignOp(lhs, exports.operators.ADD, rhs));
      }
      // appends passed SafeExpr to code or executes Block
      code(c) {
        if (typeof c == "function")
          c();
        else if (c !== code_1.nil)
          this._leafNode(new AnyCode(c));
        return this;
      }
      // returns code for object literal for the passed argument list of key-value pairs
      object(...keyValues) {
        const code = ["{"];
        for (const [key, value] of keyValues) {
          if (code.length > 1)
            code.push(",");
          code.push(key);
          if (key !== value || this.opts.es5) {
            code.push(":");
            (0, code_1.addCodeArg)(code, value);
          }
        }
        code.push("}");
        return new code_1._Code(code);
      }
      // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
      if(condition, thenBody, elseBody) {
        this._blockNode(new If(condition));
        if (thenBody && elseBody) {
          this.code(thenBody).else().code(elseBody).endIf();
        } else if (thenBody) {
          this.code(thenBody).endIf();
        } else if (elseBody) {
          throw new Error('CodeGen: "else" body without "then" body');
        }
        return this;
      }
      // `else if` clause - invalid without `if` or after `else` clauses
      elseIf(condition) {
        return this._elseNode(new If(condition));
      }
      // `else` clause - only valid after `if` or `else if` clauses
      else() {
        return this._elseNode(new Else());
      }
      // end `if` statement (needed if gen.if was used only with condition)
      endIf() {
        return this._endBlockNode(If, Else);
      }
      _for(node, forBody) {
        this._blockNode(node);
        if (forBody)
          this.code(forBody).endFor();
        return this;
      }
      // a generic `for` clause (or statement if `forBody` is passed)
      for(iteration, forBody) {
        return this._for(new ForLoop(iteration), forBody);
      }
      // `for` statement for a range of values
      forRange(nameOrPrefix, from, to, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.let) {
        const name = this._scope.toName(nameOrPrefix);
        return this._for(new ForRange(varKind, name, from, to), () => forBody(name));
      }
      // `for-of` statement (in es5 mode replace with a normal for loop)
      forOf(nameOrPrefix, iterable, forBody, varKind = scope_1.varKinds.const) {
        const name = this._scope.toName(nameOrPrefix);
        if (this.opts.es5) {
          const arr = iterable instanceof code_1.Name ? iterable : this.var("_arr", iterable);
          return this.forRange("_i", 0, (0, code_1._)`${arr}.length`, (i) => {
            this.var(name, (0, code_1._)`${arr}[${i}]`);
            forBody(name);
          });
        }
        return this._for(new ForIter("of", varKind, name, iterable), () => forBody(name));
      }
      // `for-in` statement.
      // With option `ownProperties` replaced with a `for-of` loop for object keys
      forIn(nameOrPrefix, obj, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.const) {
        if (this.opts.ownProperties) {
          return this.forOf(nameOrPrefix, (0, code_1._)`Object.keys(${obj})`, forBody);
        }
        const name = this._scope.toName(nameOrPrefix);
        return this._for(new ForIter("in", varKind, name, obj), () => forBody(name));
      }
      // end `for` loop
      endFor() {
        return this._endBlockNode(For);
      }
      // `label` statement
      label(label) {
        return this._leafNode(new Label(label));
      }
      // `break` statement
      break(label) {
        return this._leafNode(new Break(label));
      }
      // `return` statement
      return(value) {
        const node = new Return();
        this._blockNode(node);
        this.code(value);
        if (node.nodes.length !== 1)
          throw new Error('CodeGen: "return" should have one node');
        return this._endBlockNode(Return);
      }
      // `try` statement
      try(tryBody, catchCode, finallyCode) {
        if (!catchCode && !finallyCode)
          throw new Error('CodeGen: "try" without "catch" and "finally"');
        const node = new Try();
        this._blockNode(node);
        this.code(tryBody);
        if (catchCode) {
          const error = this.name("e");
          this._currNode = node.catch = new Catch(error);
          catchCode(error);
        }
        if (finallyCode) {
          this._currNode = node.finally = new Finally();
          this.code(finallyCode);
        }
        return this._endBlockNode(Catch, Finally);
      }
      // `throw` statement
      throw(error) {
        return this._leafNode(new Throw(error));
      }
      // start self-balancing block
      block(body, nodeCount) {
        this._blockStarts.push(this._nodes.length);
        if (body)
          this.code(body).endBlock(nodeCount);
        return this;
      }
      // end the current self-balancing block
      endBlock(nodeCount) {
        const len = this._blockStarts.pop();
        if (len === void 0)
          throw new Error("CodeGen: not in self-balancing block");
        const toClose = this._nodes.length - len;
        if (toClose < 0 || nodeCount !== void 0 && toClose !== nodeCount) {
          throw new Error(`CodeGen: wrong number of nodes: ${toClose} vs ${nodeCount} expected`);
        }
        this._nodes.length = len;
        return this;
      }
      // `function` heading (or definition if funcBody is passed)
      func(name, args = code_1.nil, async, funcBody) {
        this._blockNode(new Func(name, args, async));
        if (funcBody)
          this.code(funcBody).endFunc();
        return this;
      }
      // end function definition
      endFunc() {
        return this._endBlockNode(Func);
      }
      optimize(n = 1) {
        while (n-- > 0) {
          this._root.optimizeNodes();
          this._root.optimizeNames(this._root.names, this._constants);
        }
      }
      _leafNode(node) {
        this._currNode.nodes.push(node);
        return this;
      }
      _blockNode(node) {
        this._currNode.nodes.push(node);
        this._nodes.push(node);
      }
      _endBlockNode(N1, N2) {
        const n = this._currNode;
        if (n instanceof N1 || N2 && n instanceof N2) {
          this._nodes.pop();
          return this;
        }
        throw new Error(`CodeGen: not in block "${N2 ? `${N1.kind}/${N2.kind}` : N1.kind}"`);
      }
      _elseNode(node) {
        const n = this._currNode;
        if (!(n instanceof If)) {
          throw new Error('CodeGen: "else" without "if"');
        }
        this._currNode = n.else = node;
        return this;
      }
      get _root() {
        return this._nodes[0];
      }
      get _currNode() {
        const ns = this._nodes;
        return ns[ns.length - 1];
      }
      set _currNode(node) {
        const ns = this._nodes;
        ns[ns.length - 1] = node;
      }
    };
    exports.CodeGen = CodeGen;
    function addNames(names, from) {
      for (const n in from)
        names[n] = (names[n] || 0) + (from[n] || 0);
      return names;
    }
    function addExprNames(names, from) {
      return from instanceof code_1._CodeOrName ? addNames(names, from.names) : names;
    }
    function optimizeExpr(expr, names, constants2) {
      if (expr instanceof code_1.Name)
        return replaceName(expr);
      if (!canOptimize(expr))
        return expr;
      return new code_1._Code(expr._items.reduce((items, c) => {
        if (c instanceof code_1.Name)
          c = replaceName(c);
        if (c instanceof code_1._Code)
          items.push(...c._items);
        else
          items.push(c);
        return items;
      }, []));
      function replaceName(n) {
        const c = constants2[n.str];
        if (c === void 0 || names[n.str] !== 1)
          return n;
        delete names[n.str];
        return c;
      }
      function canOptimize(e) {
        return e instanceof code_1._Code && e._items.some((c) => c instanceof code_1.Name && names[c.str] === 1 && constants2[c.str] !== void 0);
      }
    }
    function subtractNames(names, from) {
      for (const n in from)
        names[n] = (names[n] || 0) - (from[n] || 0);
    }
    function not(x) {
      return typeof x == "boolean" || typeof x == "number" || x === null ? !x : (0, code_1._)`!${par(x)}`;
    }
    exports.not = not;
    var andCode = mappend(exports.operators.AND);
    function and(...args) {
      return args.reduce(andCode);
    }
    exports.and = and;
    var orCode = mappend(exports.operators.OR);
    function or(...args) {
      return args.reduce(orCode);
    }
    exports.or = or;
    function mappend(op) {
      return (x, y) => x === code_1.nil ? y : y === code_1.nil ? x : (0, code_1._)`${par(x)} ${op} ${par(y)}`;
    }
    function par(x) {
      return x instanceof code_1.Name ? x : (0, code_1._)`(${x})`;
    }
  }
});

// node_modules/ajv/dist/compile/util.js
var require_util = __commonJS({
  "node_modules/ajv/dist/compile/util.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.checkStrictMode = exports.getErrorPath = exports.Type = exports.useFunc = exports.setEvaluated = exports.evaluatedPropsToName = exports.mergeEvaluated = exports.eachItem = exports.unescapeJsonPointer = exports.escapeJsonPointer = exports.escapeFragment = exports.unescapeFragment = exports.schemaRefOrVal = exports.schemaHasRulesButRef = exports.schemaHasRules = exports.checkUnknownRules = exports.alwaysValidSchema = exports.toHash = void 0;
    var codegen_1 = require_codegen();
    var code_1 = require_code();
    function toHash(arr) {
      const hash = {};
      for (const item of arr)
        hash[item] = true;
      return hash;
    }
    exports.toHash = toHash;
    function alwaysValidSchema(it, schema) {
      if (typeof schema == "boolean")
        return schema;
      if (Object.keys(schema).length === 0)
        return true;
      checkUnknownRules(it, schema);
      return !schemaHasRules(schema, it.self.RULES.all);
    }
    exports.alwaysValidSchema = alwaysValidSchema;
    function checkUnknownRules(it, schema = it.schema) {
      const { opts, self } = it;
      if (!opts.strictSchema)
        return;
      if (typeof schema === "boolean")
        return;
      const rules = self.RULES.keywords;
      for (const key in schema) {
        if (!rules[key])
          checkStrictMode(it, `unknown keyword: "${key}"`);
      }
    }
    exports.checkUnknownRules = checkUnknownRules;
    function schemaHasRules(schema, rules) {
      if (typeof schema == "boolean")
        return !schema;
      for (const key in schema)
        if (rules[key])
          return true;
      return false;
    }
    exports.schemaHasRules = schemaHasRules;
    function schemaHasRulesButRef(schema, RULES) {
      if (typeof schema == "boolean")
        return !schema;
      for (const key in schema)
        if (key !== "$ref" && RULES.all[key])
          return true;
      return false;
    }
    exports.schemaHasRulesButRef = schemaHasRulesButRef;
    function schemaRefOrVal({ topSchemaRef, schemaPath }, schema, keyword, $data) {
      if (!$data) {
        if (typeof schema == "number" || typeof schema == "boolean")
          return schema;
        if (typeof schema == "string")
          return (0, codegen_1._)`${schema}`;
      }
      return (0, codegen_1._)`${topSchemaRef}${schemaPath}${(0, codegen_1.getProperty)(keyword)}`;
    }
    exports.schemaRefOrVal = schemaRefOrVal;
    function unescapeFragment(str) {
      return unescapeJsonPointer(decodeURIComponent(str));
    }
    exports.unescapeFragment = unescapeFragment;
    function escapeFragment(str) {
      return encodeURIComponent(escapeJsonPointer(str));
    }
    exports.escapeFragment = escapeFragment;
    function escapeJsonPointer(str) {
      if (typeof str == "number")
        return `${str}`;
      return str.replace(/~/g, "~0").replace(/\//g, "~1");
    }
    exports.escapeJsonPointer = escapeJsonPointer;
    function unescapeJsonPointer(str) {
      return str.replace(/~1/g, "/").replace(/~0/g, "~");
    }
    exports.unescapeJsonPointer = unescapeJsonPointer;
    function eachItem(xs, f) {
      if (Array.isArray(xs)) {
        for (const x of xs)
          f(x);
      } else {
        f(xs);
      }
    }
    exports.eachItem = eachItem;
    function makeMergeEvaluated({ mergeNames, mergeToName, mergeValues, resultToName }) {
      return (gen, from, to, toName) => {
        const res = to === void 0 ? from : to instanceof codegen_1.Name ? (from instanceof codegen_1.Name ? mergeNames(gen, from, to) : mergeToName(gen, from, to), to) : from instanceof codegen_1.Name ? (mergeToName(gen, to, from), from) : mergeValues(from, to);
        return toName === codegen_1.Name && !(res instanceof codegen_1.Name) ? resultToName(gen, res) : res;
      };
    }
    exports.mergeEvaluated = {
      props: makeMergeEvaluated({
        mergeNames: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true && ${from} !== undefined`, () => {
          gen.if((0, codegen_1._)`${from} === true`, () => gen.assign(to, true), () => gen.assign(to, (0, codegen_1._)`${to} || {}`).code((0, codegen_1._)`Object.assign(${to}, ${from})`));
        }),
        mergeToName: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true`, () => {
          if (from === true) {
            gen.assign(to, true);
          } else {
            gen.assign(to, (0, codegen_1._)`${to} || {}`);
            setEvaluated(gen, to, from);
          }
        }),
        mergeValues: (from, to) => from === true ? true : { ...from, ...to },
        resultToName: evaluatedPropsToName
      }),
      items: makeMergeEvaluated({
        mergeNames: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true && ${from} !== undefined`, () => gen.assign(to, (0, codegen_1._)`${from} === true ? true : ${to} > ${from} ? ${to} : ${from}`)),
        mergeToName: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true`, () => gen.assign(to, from === true ? true : (0, codegen_1._)`${to} > ${from} ? ${to} : ${from}`)),
        mergeValues: (from, to) => from === true ? true : Math.max(from, to),
        resultToName: (gen, items) => gen.var("items", items)
      })
    };
    function evaluatedPropsToName(gen, ps) {
      if (ps === true)
        return gen.var("props", true);
      const props = gen.var("props", (0, codegen_1._)`{}`);
      if (ps !== void 0)
        setEvaluated(gen, props, ps);
      return props;
    }
    exports.evaluatedPropsToName = evaluatedPropsToName;
    function setEvaluated(gen, props, ps) {
      Object.keys(ps).forEach((p) => gen.assign((0, codegen_1._)`${props}${(0, codegen_1.getProperty)(p)}`, true));
    }
    exports.setEvaluated = setEvaluated;
    var snippets = {};
    function useFunc(gen, f) {
      return gen.scopeValue("func", {
        ref: f,
        code: snippets[f.code] || (snippets[f.code] = new code_1._Code(f.code))
      });
    }
    exports.useFunc = useFunc;
    var Type;
    (function(Type2) {
      Type2[Type2["Num"] = 0] = "Num";
      Type2[Type2["Str"] = 1] = "Str";
    })(Type || (exports.Type = Type = {}));
    function getErrorPath(dataProp, dataPropType, jsPropertySyntax) {
      if (dataProp instanceof codegen_1.Name) {
        const isNumber = dataPropType === Type.Num;
        return jsPropertySyntax ? isNumber ? (0, codegen_1._)`"[" + ${dataProp} + "]"` : (0, codegen_1._)`"['" + ${dataProp} + "']"` : isNumber ? (0, codegen_1._)`"/" + ${dataProp}` : (0, codegen_1._)`"/" + ${dataProp}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
      }
      return jsPropertySyntax ? (0, codegen_1.getProperty)(dataProp).toString() : "/" + escapeJsonPointer(dataProp);
    }
    exports.getErrorPath = getErrorPath;
    function checkStrictMode(it, msg, mode = it.opts.strictSchema) {
      if (!mode)
        return;
      msg = `strict mode: ${msg}`;
      if (mode === true)
        throw new Error(msg);
      it.self.logger.warn(msg);
    }
    exports.checkStrictMode = checkStrictMode;
  }
});

// node_modules/ajv/dist/compile/names.js
var require_names = __commonJS({
  "node_modules/ajv/dist/compile/names.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var names = {
      // validation function arguments
      data: new codegen_1.Name("data"),
      // data passed to validation function
      // args passed from referencing schema
      valCxt: new codegen_1.Name("valCxt"),
      // validation/data context - should not be used directly, it is destructured to the names below
      instancePath: new codegen_1.Name("instancePath"),
      parentData: new codegen_1.Name("parentData"),
      parentDataProperty: new codegen_1.Name("parentDataProperty"),
      rootData: new codegen_1.Name("rootData"),
      // root data - same as the data passed to the first/top validation function
      dynamicAnchors: new codegen_1.Name("dynamicAnchors"),
      // used to support recursiveRef and dynamicRef
      // function scoped variables
      vErrors: new codegen_1.Name("vErrors"),
      // null or array of validation errors
      errors: new codegen_1.Name("errors"),
      // counter of validation errors
      this: new codegen_1.Name("this"),
      // "globals"
      self: new codegen_1.Name("self"),
      scope: new codegen_1.Name("scope"),
      // JTD serialize/parse name for JSON string and position
      json: new codegen_1.Name("json"),
      jsonPos: new codegen_1.Name("jsonPos"),
      jsonLen: new codegen_1.Name("jsonLen"),
      jsonPart: new codegen_1.Name("jsonPart")
    };
    exports.default = names;
  }
});

// node_modules/ajv/dist/compile/errors.js
var require_errors = __commonJS({
  "node_modules/ajv/dist/compile/errors.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.extendErrors = exports.resetErrorsCount = exports.reportExtraError = exports.reportError = exports.keyword$DataError = exports.keywordError = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var names_1 = require_names();
    exports.keywordError = {
      message: ({ keyword }) => (0, codegen_1.str)`must pass "${keyword}" keyword validation`
    };
    exports.keyword$DataError = {
      message: ({ keyword, schemaType }) => schemaType ? (0, codegen_1.str)`"${keyword}" keyword must be ${schemaType} ($data)` : (0, codegen_1.str)`"${keyword}" keyword is invalid ($data)`
    };
    function reportError(cxt, error = exports.keywordError, errorPaths, overrideAllErrors) {
      const { it } = cxt;
      const { gen, compositeRule, allErrors } = it;
      const errObj = errorObjectCode(cxt, error, errorPaths);
      if (overrideAllErrors !== null && overrideAllErrors !== void 0 ? overrideAllErrors : compositeRule || allErrors) {
        addError(gen, errObj);
      } else {
        returnErrors(it, (0, codegen_1._)`[${errObj}]`);
      }
    }
    exports.reportError = reportError;
    function reportExtraError(cxt, error = exports.keywordError, errorPaths) {
      const { it } = cxt;
      const { gen, compositeRule, allErrors } = it;
      const errObj = errorObjectCode(cxt, error, errorPaths);
      addError(gen, errObj);
      if (!(compositeRule || allErrors)) {
        returnErrors(it, names_1.default.vErrors);
      }
    }
    exports.reportExtraError = reportExtraError;
    function resetErrorsCount(gen, errsCount) {
      gen.assign(names_1.default.errors, errsCount);
      gen.if((0, codegen_1._)`${names_1.default.vErrors} !== null`, () => gen.if(errsCount, () => gen.assign((0, codegen_1._)`${names_1.default.vErrors}.length`, errsCount), () => gen.assign(names_1.default.vErrors, null)));
    }
    exports.resetErrorsCount = resetErrorsCount;
    function extendErrors({ gen, keyword, schemaValue, data, errsCount, it }) {
      if (errsCount === void 0)
        throw new Error("ajv implementation error");
      const err = gen.name("err");
      gen.forRange("i", errsCount, names_1.default.errors, (i) => {
        gen.const(err, (0, codegen_1._)`${names_1.default.vErrors}[${i}]`);
        gen.if((0, codegen_1._)`${err}.instancePath === undefined`, () => gen.assign((0, codegen_1._)`${err}.instancePath`, (0, codegen_1.strConcat)(names_1.default.instancePath, it.errorPath)));
        gen.assign((0, codegen_1._)`${err}.schemaPath`, (0, codegen_1.str)`${it.errSchemaPath}/${keyword}`);
        if (it.opts.verbose) {
          gen.assign((0, codegen_1._)`${err}.schema`, schemaValue);
          gen.assign((0, codegen_1._)`${err}.data`, data);
        }
      });
    }
    exports.extendErrors = extendErrors;
    function addError(gen, errObj) {
      const err = gen.const("err", errObj);
      gen.if((0, codegen_1._)`${names_1.default.vErrors} === null`, () => gen.assign(names_1.default.vErrors, (0, codegen_1._)`[${err}]`), (0, codegen_1._)`${names_1.default.vErrors}.push(${err})`);
      gen.code((0, codegen_1._)`${names_1.default.errors}++`);
    }
    function returnErrors(it, errs) {
      const { gen, validateName, schemaEnv } = it;
      if (schemaEnv.$async) {
        gen.throw((0, codegen_1._)`new ${it.ValidationError}(${errs})`);
      } else {
        gen.assign((0, codegen_1._)`${validateName}.errors`, errs);
        gen.return(false);
      }
    }
    var E = {
      keyword: new codegen_1.Name("keyword"),
      schemaPath: new codegen_1.Name("schemaPath"),
      // also used in JTD errors
      params: new codegen_1.Name("params"),
      propertyName: new codegen_1.Name("propertyName"),
      message: new codegen_1.Name("message"),
      schema: new codegen_1.Name("schema"),
      parentSchema: new codegen_1.Name("parentSchema")
    };
    function errorObjectCode(cxt, error, errorPaths) {
      const { createErrors } = cxt.it;
      if (createErrors === false)
        return (0, codegen_1._)`{}`;
      return errorObject(cxt, error, errorPaths);
    }
    function errorObject(cxt, error, errorPaths = {}) {
      const { gen, it } = cxt;
      const keyValues = [
        errorInstancePath(it, errorPaths),
        errorSchemaPath(cxt, errorPaths)
      ];
      extraErrorProps(cxt, error, keyValues);
      return gen.object(...keyValues);
    }
    function errorInstancePath({ errorPath }, { instancePath }) {
      const instPath = instancePath ? (0, codegen_1.str)`${errorPath}${(0, util_1.getErrorPath)(instancePath, util_1.Type.Str)}` : errorPath;
      return [names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, instPath)];
    }
    function errorSchemaPath({ keyword, it: { errSchemaPath } }, { schemaPath, parentSchema }) {
      let schPath = parentSchema ? errSchemaPath : (0, codegen_1.str)`${errSchemaPath}/${keyword}`;
      if (schemaPath) {
        schPath = (0, codegen_1.str)`${schPath}${(0, util_1.getErrorPath)(schemaPath, util_1.Type.Str)}`;
      }
      return [E.schemaPath, schPath];
    }
    function extraErrorProps(cxt, { params, message }, keyValues) {
      const { keyword, data, schemaValue, it } = cxt;
      const { opts, propertyName, topSchemaRef, schemaPath } = it;
      keyValues.push([E.keyword, keyword], [E.params, typeof params == "function" ? params(cxt) : params || (0, codegen_1._)`{}`]);
      if (opts.messages) {
        keyValues.push([E.message, typeof message == "function" ? message(cxt) : message]);
      }
      if (opts.verbose) {
        keyValues.push([E.schema, schemaValue], [E.parentSchema, (0, codegen_1._)`${topSchemaRef}${schemaPath}`], [names_1.default.data, data]);
      }
      if (propertyName)
        keyValues.push([E.propertyName, propertyName]);
    }
  }
});

// node_modules/ajv/dist/compile/validate/boolSchema.js
var require_boolSchema = __commonJS({
  "node_modules/ajv/dist/compile/validate/boolSchema.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.boolOrEmptySchema = exports.topBoolOrEmptySchema = void 0;
    var errors_1 = require_errors();
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var boolError = {
      message: "boolean schema is false"
    };
    function topBoolOrEmptySchema(it) {
      const { gen, schema, validateName } = it;
      if (schema === false) {
        falseSchemaError(it, false);
      } else if (typeof schema == "object" && schema.$async === true) {
        gen.return(names_1.default.data);
      } else {
        gen.assign((0, codegen_1._)`${validateName}.errors`, null);
        gen.return(true);
      }
    }
    exports.topBoolOrEmptySchema = topBoolOrEmptySchema;
    function boolOrEmptySchema(it, valid) {
      const { gen, schema } = it;
      if (schema === false) {
        gen.var(valid, false);
        falseSchemaError(it);
      } else {
        gen.var(valid, true);
      }
    }
    exports.boolOrEmptySchema = boolOrEmptySchema;
    function falseSchemaError(it, overrideAllErrors) {
      const { gen, data } = it;
      const cxt = {
        gen,
        keyword: "false schema",
        data,
        schema: false,
        schemaCode: false,
        schemaValue: false,
        params: {},
        it
      };
      (0, errors_1.reportError)(cxt, boolError, void 0, overrideAllErrors);
    }
  }
});

// node_modules/ajv/dist/compile/rules.js
var require_rules = __commonJS({
  "node_modules/ajv/dist/compile/rules.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getRules = exports.isJSONType = void 0;
    var _jsonTypes = ["string", "number", "integer", "boolean", "null", "object", "array"];
    var jsonTypes = new Set(_jsonTypes);
    function isJSONType(x) {
      return typeof x == "string" && jsonTypes.has(x);
    }
    exports.isJSONType = isJSONType;
    function getRules() {
      const groups = {
        number: { type: "number", rules: [] },
        string: { type: "string", rules: [] },
        array: { type: "array", rules: [] },
        object: { type: "object", rules: [] }
      };
      return {
        types: { ...groups, integer: true, boolean: true, null: true },
        rules: [{ rules: [] }, groups.number, groups.string, groups.array, groups.object],
        post: { rules: [] },
        all: {},
        keywords: {}
      };
    }
    exports.getRules = getRules;
  }
});

// node_modules/ajv/dist/compile/validate/applicability.js
var require_applicability = __commonJS({
  "node_modules/ajv/dist/compile/validate/applicability.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.shouldUseRule = exports.shouldUseGroup = exports.schemaHasRulesForType = void 0;
    function schemaHasRulesForType({ schema, self }, type) {
      const group = self.RULES.types[type];
      return group && group !== true && shouldUseGroup(schema, group);
    }
    exports.schemaHasRulesForType = schemaHasRulesForType;
    function shouldUseGroup(schema, group) {
      return group.rules.some((rule) => shouldUseRule(schema, rule));
    }
    exports.shouldUseGroup = shouldUseGroup;
    function shouldUseRule(schema, rule) {
      var _a;
      return schema[rule.keyword] !== void 0 || ((_a = rule.definition.implements) === null || _a === void 0 ? void 0 : _a.some((kwd) => schema[kwd] !== void 0));
    }
    exports.shouldUseRule = shouldUseRule;
  }
});

// node_modules/ajv/dist/compile/validate/dataType.js
var require_dataType = __commonJS({
  "node_modules/ajv/dist/compile/validate/dataType.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.reportTypeError = exports.checkDataTypes = exports.checkDataType = exports.coerceAndCheckDataType = exports.getJSONTypes = exports.getSchemaTypes = exports.DataType = void 0;
    var rules_1 = require_rules();
    var applicability_1 = require_applicability();
    var errors_1 = require_errors();
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var DataType;
    (function(DataType2) {
      DataType2[DataType2["Correct"] = 0] = "Correct";
      DataType2[DataType2["Wrong"] = 1] = "Wrong";
    })(DataType || (exports.DataType = DataType = {}));
    function getSchemaTypes(schema) {
      const types = getJSONTypes(schema.type);
      const hasNull = types.includes("null");
      if (hasNull) {
        if (schema.nullable === false)
          throw new Error("type: null contradicts nullable: false");
      } else {
        if (!types.length && schema.nullable !== void 0) {
          throw new Error('"nullable" cannot be used without "type"');
        }
        if (schema.nullable === true)
          types.push("null");
      }
      return types;
    }
    exports.getSchemaTypes = getSchemaTypes;
    function getJSONTypes(ts) {
      const types = Array.isArray(ts) ? ts : ts ? [ts] : [];
      if (types.every(rules_1.isJSONType))
        return types;
      throw new Error("type must be JSONType or JSONType[]: " + types.join(","));
    }
    exports.getJSONTypes = getJSONTypes;
    function coerceAndCheckDataType(it, types) {
      const { gen, data, opts } = it;
      const coerceTo = coerceToTypes(types, opts.coerceTypes);
      const checkTypes = types.length > 0 && !(coerceTo.length === 0 && types.length === 1 && (0, applicability_1.schemaHasRulesForType)(it, types[0]));
      if (checkTypes) {
        const wrongType = checkDataTypes(types, data, opts.strictNumbers, DataType.Wrong);
        gen.if(wrongType, () => {
          if (coerceTo.length)
            coerceData(it, types, coerceTo);
          else
            reportTypeError(it);
        });
      }
      return checkTypes;
    }
    exports.coerceAndCheckDataType = coerceAndCheckDataType;
    var COERCIBLE = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
    function coerceToTypes(types, coerceTypes) {
      return coerceTypes ? types.filter((t) => COERCIBLE.has(t) || coerceTypes === "array" && t === "array") : [];
    }
    function coerceData(it, types, coerceTo) {
      const { gen, data, opts } = it;
      const dataType = gen.let("dataType", (0, codegen_1._)`typeof ${data}`);
      const coerced = gen.let("coerced", (0, codegen_1._)`undefined`);
      if (opts.coerceTypes === "array") {
        gen.if((0, codegen_1._)`${dataType} == 'object' && Array.isArray(${data}) && ${data}.length == 1`, () => gen.assign(data, (0, codegen_1._)`${data}[0]`).assign(dataType, (0, codegen_1._)`typeof ${data}`).if(checkDataTypes(types, data, opts.strictNumbers), () => gen.assign(coerced, data)));
      }
      gen.if((0, codegen_1._)`${coerced} !== undefined`);
      for (const t of coerceTo) {
        if (COERCIBLE.has(t) || t === "array" && opts.coerceTypes === "array") {
          coerceSpecificType(t);
        }
      }
      gen.else();
      reportTypeError(it);
      gen.endIf();
      gen.if((0, codegen_1._)`${coerced} !== undefined`, () => {
        gen.assign(data, coerced);
        assignParentData(it, coerced);
      });
      function coerceSpecificType(t) {
        switch (t) {
          case "string":
            gen.elseIf((0, codegen_1._)`${dataType} == "number" || ${dataType} == "boolean"`).assign(coerced, (0, codegen_1._)`"" + ${data}`).elseIf((0, codegen_1._)`${data} === null`).assign(coerced, (0, codegen_1._)`""`);
            return;
          case "number":
            gen.elseIf((0, codegen_1._)`${dataType} == "boolean" || ${data} === null
              || (${dataType} == "string" && ${data} && ${data} == +${data})`).assign(coerced, (0, codegen_1._)`+${data}`);
            return;
          case "integer":
            gen.elseIf((0, codegen_1._)`${dataType} === "boolean" || ${data} === null
              || (${dataType} === "string" && ${data} && ${data} == +${data} && !(${data} % 1))`).assign(coerced, (0, codegen_1._)`+${data}`);
            return;
          case "boolean":
            gen.elseIf((0, codegen_1._)`${data} === "false" || ${data} === 0 || ${data} === null`).assign(coerced, false).elseIf((0, codegen_1._)`${data} === "true" || ${data} === 1`).assign(coerced, true);
            return;
          case "null":
            gen.elseIf((0, codegen_1._)`${data} === "" || ${data} === 0 || ${data} === false`);
            gen.assign(coerced, null);
            return;
          case "array":
            gen.elseIf((0, codegen_1._)`${dataType} === "string" || ${dataType} === "number"
              || ${dataType} === "boolean" || ${data} === null`).assign(coerced, (0, codegen_1._)`[${data}]`);
        }
      }
    }
    function assignParentData({ gen, parentData, parentDataProperty }, expr) {
      gen.if((0, codegen_1._)`${parentData} !== undefined`, () => gen.assign((0, codegen_1._)`${parentData}[${parentDataProperty}]`, expr));
    }
    function checkDataType(dataType, data, strictNums, correct = DataType.Correct) {
      const EQ = correct === DataType.Correct ? codegen_1.operators.EQ : codegen_1.operators.NEQ;
      let cond;
      switch (dataType) {
        case "null":
          return (0, codegen_1._)`${data} ${EQ} null`;
        case "array":
          cond = (0, codegen_1._)`Array.isArray(${data})`;
          break;
        case "object":
          cond = (0, codegen_1._)`${data} && typeof ${data} == "object" && !Array.isArray(${data})`;
          break;
        case "integer":
          cond = numCond((0, codegen_1._)`!(${data} % 1) && !isNaN(${data})`);
          break;
        case "number":
          cond = numCond();
          break;
        default:
          return (0, codegen_1._)`typeof ${data} ${EQ} ${dataType}`;
      }
      return correct === DataType.Correct ? cond : (0, codegen_1.not)(cond);
      function numCond(_cond = codegen_1.nil) {
        return (0, codegen_1.and)((0, codegen_1._)`typeof ${data} == "number"`, _cond, strictNums ? (0, codegen_1._)`isFinite(${data})` : codegen_1.nil);
      }
    }
    exports.checkDataType = checkDataType;
    function checkDataTypes(dataTypes, data, strictNums, correct) {
      if (dataTypes.length === 1) {
        return checkDataType(dataTypes[0], data, strictNums, correct);
      }
      let cond;
      const types = (0, util_1.toHash)(dataTypes);
      if (types.array && types.object) {
        const notObj = (0, codegen_1._)`typeof ${data} != "object"`;
        cond = types.null ? notObj : (0, codegen_1._)`!${data} || ${notObj}`;
        delete types.null;
        delete types.array;
        delete types.object;
      } else {
        cond = codegen_1.nil;
      }
      if (types.number)
        delete types.integer;
      for (const t in types)
        cond = (0, codegen_1.and)(cond, checkDataType(t, data, strictNums, correct));
      return cond;
    }
    exports.checkDataTypes = checkDataTypes;
    var typeError = {
      message: ({ schema }) => `must be ${schema}`,
      params: ({ schema, schemaValue }) => typeof schema == "string" ? (0, codegen_1._)`{type: ${schema}}` : (0, codegen_1._)`{type: ${schemaValue}}`
    };
    function reportTypeError(it) {
      const cxt = getTypeErrorContext(it);
      (0, errors_1.reportError)(cxt, typeError);
    }
    exports.reportTypeError = reportTypeError;
    function getTypeErrorContext(it) {
      const { gen, data, schema } = it;
      const schemaCode = (0, util_1.schemaRefOrVal)(it, schema, "type");
      return {
        gen,
        keyword: "type",
        data,
        schema: schema.type,
        schemaCode,
        schemaValue: schemaCode,
        parentSchema: schema,
        params: {},
        it
      };
    }
  }
});

// node_modules/ajv/dist/compile/validate/defaults.js
var require_defaults = __commonJS({
  "node_modules/ajv/dist/compile/validate/defaults.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.assignDefaults = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    function assignDefaults(it, ty) {
      const { properties, items } = it.schema;
      if (ty === "object" && properties) {
        for (const key in properties) {
          assignDefault(it, key, properties[key].default);
        }
      } else if (ty === "array" && Array.isArray(items)) {
        items.forEach((sch, i) => assignDefault(it, i, sch.default));
      }
    }
    exports.assignDefaults = assignDefaults;
    function assignDefault(it, prop, defaultValue) {
      const { gen, compositeRule, data, opts } = it;
      if (defaultValue === void 0)
        return;
      const childData = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(prop)}`;
      if (compositeRule) {
        (0, util_1.checkStrictMode)(it, `default is ignored for: ${childData}`);
        return;
      }
      let condition = (0, codegen_1._)`${childData} === undefined`;
      if (opts.useDefaults === "empty") {
        condition = (0, codegen_1._)`${condition} || ${childData} === null || ${childData} === ""`;
      }
      gen.if(condition, (0, codegen_1._)`${childData} = ${(0, codegen_1.stringify)(defaultValue)}`);
    }
  }
});

// node_modules/ajv/dist/vocabularies/code.js
var require_code2 = __commonJS({
  "node_modules/ajv/dist/vocabularies/code.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateUnion = exports.validateArray = exports.usePattern = exports.callValidateCode = exports.schemaProperties = exports.allSchemaProperties = exports.noPropertyInData = exports.propertyInData = exports.isOwnProperty = exports.hasPropFunc = exports.reportMissingProp = exports.checkMissingProp = exports.checkReportMissingProp = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var names_1 = require_names();
    var util_2 = require_util();
    function checkReportMissingProp(cxt, prop) {
      const { gen, data, it } = cxt;
      gen.if(noPropertyInData(gen, data, prop, it.opts.ownProperties), () => {
        cxt.setParams({ missingProperty: (0, codegen_1._)`${prop}` }, true);
        cxt.error();
      });
    }
    exports.checkReportMissingProp = checkReportMissingProp;
    function checkMissingProp({ gen, data, it: { opts } }, properties, missing) {
      return (0, codegen_1.or)(...properties.map((prop) => (0, codegen_1.and)(noPropertyInData(gen, data, prop, opts.ownProperties), (0, codegen_1._)`${missing} = ${prop}`)));
    }
    exports.checkMissingProp = checkMissingProp;
    function reportMissingProp(cxt, missing) {
      cxt.setParams({ missingProperty: missing }, true);
      cxt.error();
    }
    exports.reportMissingProp = reportMissingProp;
    function hasPropFunc(gen) {
      return gen.scopeValue("func", {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        ref: Object.prototype.hasOwnProperty,
        code: (0, codegen_1._)`Object.prototype.hasOwnProperty`
      });
    }
    exports.hasPropFunc = hasPropFunc;
    function isOwnProperty(gen, data, property) {
      return (0, codegen_1._)`${hasPropFunc(gen)}.call(${data}, ${property})`;
    }
    exports.isOwnProperty = isOwnProperty;
    function propertyInData(gen, data, property, ownProperties) {
      const cond = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(property)} !== undefined`;
      return ownProperties ? (0, codegen_1._)`${cond} && ${isOwnProperty(gen, data, property)}` : cond;
    }
    exports.propertyInData = propertyInData;
    function noPropertyInData(gen, data, property, ownProperties) {
      const cond = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(property)} === undefined`;
      return ownProperties ? (0, codegen_1.or)(cond, (0, codegen_1.not)(isOwnProperty(gen, data, property))) : cond;
    }
    exports.noPropertyInData = noPropertyInData;
    function allSchemaProperties(schemaMap) {
      return schemaMap ? Object.keys(schemaMap).filter((p) => p !== "__proto__") : [];
    }
    exports.allSchemaProperties = allSchemaProperties;
    function schemaProperties(it, schemaMap) {
      return allSchemaProperties(schemaMap).filter((p) => !(0, util_1.alwaysValidSchema)(it, schemaMap[p]));
    }
    exports.schemaProperties = schemaProperties;
    function callValidateCode({ schemaCode, data, it: { gen, topSchemaRef, schemaPath, errorPath }, it }, func, context, passSchema) {
      const dataAndSchema = passSchema ? (0, codegen_1._)`${schemaCode}, ${data}, ${topSchemaRef}${schemaPath}` : data;
      const valCxt = [
        [names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, errorPath)],
        [names_1.default.parentData, it.parentData],
        [names_1.default.parentDataProperty, it.parentDataProperty],
        [names_1.default.rootData, names_1.default.rootData]
      ];
      if (it.opts.dynamicRef)
        valCxt.push([names_1.default.dynamicAnchors, names_1.default.dynamicAnchors]);
      const args = (0, codegen_1._)`${dataAndSchema}, ${gen.object(...valCxt)}`;
      return context !== codegen_1.nil ? (0, codegen_1._)`${func}.call(${context}, ${args})` : (0, codegen_1._)`${func}(${args})`;
    }
    exports.callValidateCode = callValidateCode;
    var newRegExp = (0, codegen_1._)`new RegExp`;
    function usePattern({ gen, it: { opts } }, pattern) {
      const u = opts.unicodeRegExp ? "u" : "";
      const { regExp } = opts.code;
      const rx = regExp(pattern, u);
      return gen.scopeValue("pattern", {
        key: rx.toString(),
        ref: rx,
        code: (0, codegen_1._)`${regExp.code === "new RegExp" ? newRegExp : (0, util_2.useFunc)(gen, regExp)}(${pattern}, ${u})`
      });
    }
    exports.usePattern = usePattern;
    function validateArray(cxt) {
      const { gen, data, keyword, it } = cxt;
      const valid = gen.name("valid");
      if (it.allErrors) {
        const validArr = gen.let("valid", true);
        validateItems(() => gen.assign(validArr, false));
        return validArr;
      }
      gen.var(valid, true);
      validateItems(() => gen.break());
      return valid;
      function validateItems(notValid) {
        const len = gen.const("len", (0, codegen_1._)`${data}.length`);
        gen.forRange("i", 0, len, (i) => {
          cxt.subschema({
            keyword,
            dataProp: i,
            dataPropType: util_1.Type.Num
          }, valid);
          gen.if((0, codegen_1.not)(valid), notValid);
        });
      }
    }
    exports.validateArray = validateArray;
    function validateUnion(cxt) {
      const { gen, schema, keyword, it } = cxt;
      if (!Array.isArray(schema))
        throw new Error("ajv implementation error");
      const alwaysValid = schema.some((sch) => (0, util_1.alwaysValidSchema)(it, sch));
      if (alwaysValid && !it.opts.unevaluated)
        return;
      const valid = gen.let("valid", false);
      const schValid = gen.name("_valid");
      gen.block(() => schema.forEach((_sch, i) => {
        const schCxt = cxt.subschema({
          keyword,
          schemaProp: i,
          compositeRule: true
        }, schValid);
        gen.assign(valid, (0, codegen_1._)`${valid} || ${schValid}`);
        const merged = cxt.mergeValidEvaluated(schCxt, schValid);
        if (!merged)
          gen.if((0, codegen_1.not)(valid));
      }));
      cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
    }
    exports.validateUnion = validateUnion;
  }
});

// node_modules/ajv/dist/compile/validate/keyword.js
var require_keyword = __commonJS({
  "node_modules/ajv/dist/compile/validate/keyword.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateKeywordUsage = exports.validSchemaType = exports.funcKeywordCode = exports.macroKeywordCode = void 0;
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var code_1 = require_code2();
    var errors_1 = require_errors();
    function macroKeywordCode(cxt, def) {
      const { gen, keyword, schema, parentSchema, it } = cxt;
      const macroSchema = def.macro.call(it.self, schema, parentSchema, it);
      const schemaRef = useKeyword(gen, keyword, macroSchema);
      if (it.opts.validateSchema !== false)
        it.self.validateSchema(macroSchema, true);
      const valid = gen.name("valid");
      cxt.subschema({
        schema: macroSchema,
        schemaPath: codegen_1.nil,
        errSchemaPath: `${it.errSchemaPath}/${keyword}`,
        topSchemaRef: schemaRef,
        compositeRule: true
      }, valid);
      cxt.pass(valid, () => cxt.error(true));
    }
    exports.macroKeywordCode = macroKeywordCode;
    function funcKeywordCode(cxt, def) {
      var _a;
      const { gen, keyword, schema, parentSchema, $data, it } = cxt;
      checkAsyncKeyword(it, def);
      const validate = !$data && def.compile ? def.compile.call(it.self, schema, parentSchema, it) : def.validate;
      const validateRef = useKeyword(gen, keyword, validate);
      const valid = gen.let("valid");
      cxt.block$data(valid, validateKeyword);
      cxt.ok((_a = def.valid) !== null && _a !== void 0 ? _a : valid);
      function validateKeyword() {
        if (def.errors === false) {
          assignValid();
          if (def.modifying)
            modifyData(cxt);
          reportErrs(() => cxt.error());
        } else {
          const ruleErrs = def.async ? validateAsync() : validateSync();
          if (def.modifying)
            modifyData(cxt);
          reportErrs(() => addErrs(cxt, ruleErrs));
        }
      }
      function validateAsync() {
        const ruleErrs = gen.let("ruleErrs", null);
        gen.try(() => assignValid((0, codegen_1._)`await `), (e) => gen.assign(valid, false).if((0, codegen_1._)`${e} instanceof ${it.ValidationError}`, () => gen.assign(ruleErrs, (0, codegen_1._)`${e}.errors`), () => gen.throw(e)));
        return ruleErrs;
      }
      function validateSync() {
        const validateErrs = (0, codegen_1._)`${validateRef}.errors`;
        gen.assign(validateErrs, null);
        assignValid(codegen_1.nil);
        return validateErrs;
      }
      function assignValid(_await = def.async ? (0, codegen_1._)`await ` : codegen_1.nil) {
        const passCxt = it.opts.passContext ? names_1.default.this : names_1.default.self;
        const passSchema = !("compile" in def && !$data || def.schema === false);
        gen.assign(valid, (0, codegen_1._)`${_await}${(0, code_1.callValidateCode)(cxt, validateRef, passCxt, passSchema)}`, def.modifying);
      }
      function reportErrs(errors) {
        var _a2;
        gen.if((0, codegen_1.not)((_a2 = def.valid) !== null && _a2 !== void 0 ? _a2 : valid), errors);
      }
    }
    exports.funcKeywordCode = funcKeywordCode;
    function modifyData(cxt) {
      const { gen, data, it } = cxt;
      gen.if(it.parentData, () => gen.assign(data, (0, codegen_1._)`${it.parentData}[${it.parentDataProperty}]`));
    }
    function addErrs(cxt, errs) {
      const { gen } = cxt;
      gen.if((0, codegen_1._)`Array.isArray(${errs})`, () => {
        gen.assign(names_1.default.vErrors, (0, codegen_1._)`${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`).assign(names_1.default.errors, (0, codegen_1._)`${names_1.default.vErrors}.length`);
        (0, errors_1.extendErrors)(cxt);
      }, () => cxt.error());
    }
    function checkAsyncKeyword({ schemaEnv }, def) {
      if (def.async && !schemaEnv.$async)
        throw new Error("async keyword in sync schema");
    }
    function useKeyword(gen, keyword, result) {
      if (result === void 0)
        throw new Error(`keyword "${keyword}" failed to compile`);
      return gen.scopeValue("keyword", typeof result == "function" ? { ref: result } : { ref: result, code: (0, codegen_1.stringify)(result) });
    }
    function validSchemaType(schema, schemaType, allowUndefined = false) {
      return !schemaType.length || schemaType.some((st) => st === "array" ? Array.isArray(schema) : st === "object" ? schema && typeof schema == "object" && !Array.isArray(schema) : typeof schema == st || allowUndefined && typeof schema == "undefined");
    }
    exports.validSchemaType = validSchemaType;
    function validateKeywordUsage({ schema, opts, self, errSchemaPath }, def, keyword) {
      if (Array.isArray(def.keyword) ? !def.keyword.includes(keyword) : def.keyword !== keyword) {
        throw new Error("ajv implementation error");
      }
      const deps = def.dependencies;
      if (deps === null || deps === void 0 ? void 0 : deps.some((kwd) => !Object.prototype.hasOwnProperty.call(schema, kwd))) {
        throw new Error(`parent schema must have dependencies of ${keyword}: ${deps.join(",")}`);
      }
      if (def.validateSchema) {
        const valid = def.validateSchema(schema[keyword]);
        if (!valid) {
          const msg = `keyword "${keyword}" value is invalid at path "${errSchemaPath}": ` + self.errorsText(def.validateSchema.errors);
          if (opts.validateSchema === "log")
            self.logger.error(msg);
          else
            throw new Error(msg);
        }
      }
    }
    exports.validateKeywordUsage = validateKeywordUsage;
  }
});

// node_modules/ajv/dist/compile/validate/subschema.js
var require_subschema = __commonJS({
  "node_modules/ajv/dist/compile/validate/subschema.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.extendSubschemaMode = exports.extendSubschemaData = exports.getSubschema = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    function getSubschema(it, { keyword, schemaProp, schema, schemaPath, errSchemaPath, topSchemaRef }) {
      if (keyword !== void 0 && schema !== void 0) {
        throw new Error('both "keyword" and "schema" passed, only one allowed');
      }
      if (keyword !== void 0) {
        const sch = it.schema[keyword];
        return schemaProp === void 0 ? {
          schema: sch,
          schemaPath: (0, codegen_1._)`${it.schemaPath}${(0, codegen_1.getProperty)(keyword)}`,
          errSchemaPath: `${it.errSchemaPath}/${keyword}`
        } : {
          schema: sch[schemaProp],
          schemaPath: (0, codegen_1._)`${it.schemaPath}${(0, codegen_1.getProperty)(keyword)}${(0, codegen_1.getProperty)(schemaProp)}`,
          errSchemaPath: `${it.errSchemaPath}/${keyword}/${(0, util_1.escapeFragment)(schemaProp)}`
        };
      }
      if (schema !== void 0) {
        if (schemaPath === void 0 || errSchemaPath === void 0 || topSchemaRef === void 0) {
          throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
        }
        return {
          schema,
          schemaPath,
          topSchemaRef,
          errSchemaPath
        };
      }
      throw new Error('either "keyword" or "schema" must be passed');
    }
    exports.getSubschema = getSubschema;
    function extendSubschemaData(subschema, it, { dataProp, dataPropType: dpType, data, dataTypes, propertyName }) {
      if (data !== void 0 && dataProp !== void 0) {
        throw new Error('both "data" and "dataProp" passed, only one allowed');
      }
      const { gen } = it;
      if (dataProp !== void 0) {
        const { errorPath, dataPathArr, opts } = it;
        const nextData = gen.let("data", (0, codegen_1._)`${it.data}${(0, codegen_1.getProperty)(dataProp)}`, true);
        dataContextProps(nextData);
        subschema.errorPath = (0, codegen_1.str)`${errorPath}${(0, util_1.getErrorPath)(dataProp, dpType, opts.jsPropertySyntax)}`;
        subschema.parentDataProperty = (0, codegen_1._)`${dataProp}`;
        subschema.dataPathArr = [...dataPathArr, subschema.parentDataProperty];
      }
      if (data !== void 0) {
        const nextData = data instanceof codegen_1.Name ? data : gen.let("data", data, true);
        dataContextProps(nextData);
        if (propertyName !== void 0)
          subschema.propertyName = propertyName;
      }
      if (dataTypes)
        subschema.dataTypes = dataTypes;
      function dataContextProps(_nextData) {
        subschema.data = _nextData;
        subschema.dataLevel = it.dataLevel + 1;
        subschema.dataTypes = [];
        it.definedProperties = /* @__PURE__ */ new Set();
        subschema.parentData = it.data;
        subschema.dataNames = [...it.dataNames, _nextData];
      }
    }
    exports.extendSubschemaData = extendSubschemaData;
    function extendSubschemaMode(subschema, { jtdDiscriminator, jtdMetadata, compositeRule, createErrors, allErrors }) {
      if (compositeRule !== void 0)
        subschema.compositeRule = compositeRule;
      if (createErrors !== void 0)
        subschema.createErrors = createErrors;
      if (allErrors !== void 0)
        subschema.allErrors = allErrors;
      subschema.jtdDiscriminator = jtdDiscriminator;
      subschema.jtdMetadata = jtdMetadata;
    }
    exports.extendSubschemaMode = extendSubschemaMode;
  }
});

// node_modules/fast-deep-equal/index.js
var require_fast_deep_equal = __commonJS({
  "node_modules/fast-deep-equal/index.js"(exports, module) {
    "use strict";
    module.exports = function equal(a, b) {
      if (a === b) return true;
      if (a && b && typeof a == "object" && typeof b == "object") {
        if (a.constructor !== b.constructor) return false;
        var length, i, keys;
        if (Array.isArray(a)) {
          length = a.length;
          if (length != b.length) return false;
          for (i = length; i-- !== 0; )
            if (!equal(a[i], b[i])) return false;
          return true;
        }
        if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length) return false;
        for (i = length; i-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
        for (i = length; i-- !== 0; ) {
          var key = keys[i];
          if (!equal(a[key], b[key])) return false;
        }
        return true;
      }
      return a !== a && b !== b;
    };
  }
});

// node_modules/json-schema-traverse/index.js
var require_json_schema_traverse = __commonJS({
  "node_modules/json-schema-traverse/index.js"(exports, module) {
    "use strict";
    var traverse = module.exports = function(schema, opts, cb) {
      if (typeof opts == "function") {
        cb = opts;
        opts = {};
      }
      cb = opts.cb || cb;
      var pre = typeof cb == "function" ? cb : cb.pre || function() {
      };
      var post = cb.post || function() {
      };
      _traverse(opts, pre, post, schema, "", schema);
    };
    traverse.keywords = {
      additionalItems: true,
      items: true,
      contains: true,
      additionalProperties: true,
      propertyNames: true,
      not: true,
      if: true,
      then: true,
      else: true
    };
    traverse.arrayKeywords = {
      items: true,
      allOf: true,
      anyOf: true,
      oneOf: true
    };
    traverse.propsKeywords = {
      $defs: true,
      definitions: true,
      properties: true,
      patternProperties: true,
      dependencies: true
    };
    traverse.skipKeywords = {
      default: true,
      enum: true,
      const: true,
      required: true,
      maximum: true,
      minimum: true,
      exclusiveMaximum: true,
      exclusiveMinimum: true,
      multipleOf: true,
      maxLength: true,
      minLength: true,
      pattern: true,
      format: true,
      maxItems: true,
      minItems: true,
      uniqueItems: true,
      maxProperties: true,
      minProperties: true
    };
    function _traverse(opts, pre, post, schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
      if (schema && typeof schema == "object" && !Array.isArray(schema)) {
        pre(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
        for (var key in schema) {
          var sch = schema[key];
          if (Array.isArray(sch)) {
            if (key in traverse.arrayKeywords) {
              for (var i = 0; i < sch.length; i++)
                _traverse(opts, pre, post, sch[i], jsonPtr + "/" + key + "/" + i, rootSchema, jsonPtr, key, schema, i);
            }
          } else if (key in traverse.propsKeywords) {
            if (sch && typeof sch == "object") {
              for (var prop in sch)
                _traverse(opts, pre, post, sch[prop], jsonPtr + "/" + key + "/" + escapeJsonPtr(prop), rootSchema, jsonPtr, key, schema, prop);
            }
          } else if (key in traverse.keywords || opts.allKeys && !(key in traverse.skipKeywords)) {
            _traverse(opts, pre, post, sch, jsonPtr + "/" + key, rootSchema, jsonPtr, key, schema);
          }
        }
        post(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
      }
    }
    function escapeJsonPtr(str) {
      return str.replace(/~/g, "~0").replace(/\//g, "~1");
    }
  }
});

// node_modules/ajv/dist/compile/resolve.js
var require_resolve = __commonJS({
  "node_modules/ajv/dist/compile/resolve.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getSchemaRefs = exports.resolveUrl = exports.normalizeId = exports._getFullPath = exports.getFullPath = exports.inlineRef = void 0;
    var util_1 = require_util();
    var equal = require_fast_deep_equal();
    var traverse = require_json_schema_traverse();
    var SIMPLE_INLINED = /* @__PURE__ */ new Set([
      "type",
      "format",
      "pattern",
      "maxLength",
      "minLength",
      "maxProperties",
      "minProperties",
      "maxItems",
      "minItems",
      "maximum",
      "minimum",
      "uniqueItems",
      "multipleOf",
      "required",
      "enum",
      "const"
    ]);
    function inlineRef(schema, limit = true) {
      if (typeof schema == "boolean")
        return true;
      if (limit === true)
        return !hasRef(schema);
      if (!limit)
        return false;
      return countKeys(schema) <= limit;
    }
    exports.inlineRef = inlineRef;
    var REF_KEYWORDS = /* @__PURE__ */ new Set([
      "$ref",
      "$recursiveRef",
      "$recursiveAnchor",
      "$dynamicRef",
      "$dynamicAnchor"
    ]);
    function hasRef(schema) {
      for (const key in schema) {
        if (REF_KEYWORDS.has(key))
          return true;
        const sch = schema[key];
        if (Array.isArray(sch) && sch.some(hasRef))
          return true;
        if (typeof sch == "object" && hasRef(sch))
          return true;
      }
      return false;
    }
    function countKeys(schema) {
      let count = 0;
      for (const key in schema) {
        if (key === "$ref")
          return Infinity;
        count++;
        if (SIMPLE_INLINED.has(key))
          continue;
        if (typeof schema[key] == "object") {
          (0, util_1.eachItem)(schema[key], (sch) => count += countKeys(sch));
        }
        if (count === Infinity)
          return Infinity;
      }
      return count;
    }
    function getFullPath(resolver, id2 = "", normalize) {
      if (normalize !== false)
        id2 = normalizeId(id2);
      const p = resolver.parse(id2);
      return _getFullPath(resolver, p);
    }
    exports.getFullPath = getFullPath;
    function _getFullPath(resolver, p) {
      const serialized = resolver.serialize(p);
      return serialized.split("#")[0] + "#";
    }
    exports._getFullPath = _getFullPath;
    var TRAILING_SLASH_HASH = /#\/?$/;
    function normalizeId(id2) {
      return id2 ? id2.replace(TRAILING_SLASH_HASH, "") : "";
    }
    exports.normalizeId = normalizeId;
    function resolveUrl(resolver, baseId, id2) {
      id2 = normalizeId(id2);
      return resolver.resolve(baseId, id2);
    }
    exports.resolveUrl = resolveUrl;
    var ANCHOR = /^[a-z_][-a-z0-9._]*$/i;
    function getSchemaRefs(schema, baseId) {
      if (typeof schema == "boolean")
        return {};
      const { schemaId, uriResolver } = this.opts;
      const schId = normalizeId(schema[schemaId] || baseId);
      const baseIds = { "": schId };
      const pathPrefix = getFullPath(uriResolver, schId, false);
      const localRefs = {};
      const schemaRefs = /* @__PURE__ */ new Set();
      traverse(schema, { allKeys: true }, (sch, jsonPtr, _, parentJsonPtr) => {
        if (parentJsonPtr === void 0)
          return;
        const fullPath = pathPrefix + jsonPtr;
        let innerBaseId = baseIds[parentJsonPtr];
        if (typeof sch[schemaId] == "string")
          innerBaseId = addRef.call(this, sch[schemaId]);
        addAnchor.call(this, sch.$anchor);
        addAnchor.call(this, sch.$dynamicAnchor);
        baseIds[jsonPtr] = innerBaseId;
        function addRef(ref) {
          const _resolve = this.opts.uriResolver.resolve;
          ref = normalizeId(innerBaseId ? _resolve(innerBaseId, ref) : ref);
          if (schemaRefs.has(ref))
            throw ambiguos(ref);
          schemaRefs.add(ref);
          let schOrRef = this.refs[ref];
          if (typeof schOrRef == "string")
            schOrRef = this.refs[schOrRef];
          if (typeof schOrRef == "object") {
            checkAmbiguosRef(sch, schOrRef.schema, ref);
          } else if (ref !== normalizeId(fullPath)) {
            if (ref[0] === "#") {
              checkAmbiguosRef(sch, localRefs[ref], ref);
              localRefs[ref] = sch;
            } else {
              this.refs[ref] = fullPath;
            }
          }
          return ref;
        }
        function addAnchor(anchor) {
          if (typeof anchor == "string") {
            if (!ANCHOR.test(anchor))
              throw new Error(`invalid anchor "${anchor}"`);
            addRef.call(this, `#${anchor}`);
          }
        }
      });
      return localRefs;
      function checkAmbiguosRef(sch1, sch2, ref) {
        if (sch2 !== void 0 && !equal(sch1, sch2))
          throw ambiguos(ref);
      }
      function ambiguos(ref) {
        return new Error(`reference "${ref}" resolves to more than one schema`);
      }
    }
    exports.getSchemaRefs = getSchemaRefs;
  }
});

// node_modules/ajv/dist/compile/validate/index.js
var require_validate = __commonJS({
  "node_modules/ajv/dist/compile/validate/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getData = exports.KeywordCxt = exports.validateFunctionCode = void 0;
    var boolSchema_1 = require_boolSchema();
    var dataType_1 = require_dataType();
    var applicability_1 = require_applicability();
    var dataType_2 = require_dataType();
    var defaults_1 = require_defaults();
    var keyword_1 = require_keyword();
    var subschema_1 = require_subschema();
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var resolve_1 = require_resolve();
    var util_1 = require_util();
    var errors_1 = require_errors();
    function validateFunctionCode(it) {
      if (isSchemaObj(it)) {
        checkKeywords(it);
        if (schemaCxtHasRules(it)) {
          topSchemaObjCode(it);
          return;
        }
      }
      validateFunction(it, () => (0, boolSchema_1.topBoolOrEmptySchema)(it));
    }
    exports.validateFunctionCode = validateFunctionCode;
    function validateFunction({ gen, validateName, schema, schemaEnv, opts }, body) {
      if (opts.code.es5) {
        gen.func(validateName, (0, codegen_1._)`${names_1.default.data}, ${names_1.default.valCxt}`, schemaEnv.$async, () => {
          gen.code((0, codegen_1._)`"use strict"; ${funcSourceUrl(schema, opts)}`);
          destructureValCxtES5(gen, opts);
          gen.code(body);
        });
      } else {
        gen.func(validateName, (0, codegen_1._)`${names_1.default.data}, ${destructureValCxt(opts)}`, schemaEnv.$async, () => gen.code(funcSourceUrl(schema, opts)).code(body));
      }
    }
    function destructureValCxt(opts) {
      return (0, codegen_1._)`{${names_1.default.instancePath}="", ${names_1.default.parentData}, ${names_1.default.parentDataProperty}, ${names_1.default.rootData}=${names_1.default.data}${opts.dynamicRef ? (0, codegen_1._)`, ${names_1.default.dynamicAnchors}={}` : codegen_1.nil}}={}`;
    }
    function destructureValCxtES5(gen, opts) {
      gen.if(names_1.default.valCxt, () => {
        gen.var(names_1.default.instancePath, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.instancePath}`);
        gen.var(names_1.default.parentData, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.parentData}`);
        gen.var(names_1.default.parentDataProperty, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.parentDataProperty}`);
        gen.var(names_1.default.rootData, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.rootData}`);
        if (opts.dynamicRef)
          gen.var(names_1.default.dynamicAnchors, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.dynamicAnchors}`);
      }, () => {
        gen.var(names_1.default.instancePath, (0, codegen_1._)`""`);
        gen.var(names_1.default.parentData, (0, codegen_1._)`undefined`);
        gen.var(names_1.default.parentDataProperty, (0, codegen_1._)`undefined`);
        gen.var(names_1.default.rootData, names_1.default.data);
        if (opts.dynamicRef)
          gen.var(names_1.default.dynamicAnchors, (0, codegen_1._)`{}`);
      });
    }
    function topSchemaObjCode(it) {
      const { schema, opts, gen } = it;
      validateFunction(it, () => {
        if (opts.$comment && schema.$comment)
          commentKeyword(it);
        checkNoDefault(it);
        gen.let(names_1.default.vErrors, null);
        gen.let(names_1.default.errors, 0);
        if (opts.unevaluated)
          resetEvaluated(it);
        typeAndKeywords(it);
        returnResults(it);
      });
      return;
    }
    function resetEvaluated(it) {
      const { gen, validateName } = it;
      it.evaluated = gen.const("evaluated", (0, codegen_1._)`${validateName}.evaluated`);
      gen.if((0, codegen_1._)`${it.evaluated}.dynamicProps`, () => gen.assign((0, codegen_1._)`${it.evaluated}.props`, (0, codegen_1._)`undefined`));
      gen.if((0, codegen_1._)`${it.evaluated}.dynamicItems`, () => gen.assign((0, codegen_1._)`${it.evaluated}.items`, (0, codegen_1._)`undefined`));
    }
    function funcSourceUrl(schema, opts) {
      const schId = typeof schema == "object" && schema[opts.schemaId];
      return schId && (opts.code.source || opts.code.process) ? (0, codegen_1._)`/*# sourceURL=${schId} */` : codegen_1.nil;
    }
    function subschemaCode(it, valid) {
      if (isSchemaObj(it)) {
        checkKeywords(it);
        if (schemaCxtHasRules(it)) {
          subSchemaObjCode(it, valid);
          return;
        }
      }
      (0, boolSchema_1.boolOrEmptySchema)(it, valid);
    }
    function schemaCxtHasRules({ schema, self }) {
      if (typeof schema == "boolean")
        return !schema;
      for (const key in schema)
        if (self.RULES.all[key])
          return true;
      return false;
    }
    function isSchemaObj(it) {
      return typeof it.schema != "boolean";
    }
    function subSchemaObjCode(it, valid) {
      const { schema, gen, opts } = it;
      if (opts.$comment && schema.$comment)
        commentKeyword(it);
      updateContext(it);
      checkAsyncSchema(it);
      const errsCount = gen.const("_errs", names_1.default.errors);
      typeAndKeywords(it, errsCount);
      gen.var(valid, (0, codegen_1._)`${errsCount} === ${names_1.default.errors}`);
    }
    function checkKeywords(it) {
      (0, util_1.checkUnknownRules)(it);
      checkRefsAndKeywords(it);
    }
    function typeAndKeywords(it, errsCount) {
      if (it.opts.jtd)
        return schemaKeywords(it, [], false, errsCount);
      const types = (0, dataType_1.getSchemaTypes)(it.schema);
      const checkedTypes = (0, dataType_1.coerceAndCheckDataType)(it, types);
      schemaKeywords(it, types, !checkedTypes, errsCount);
    }
    function checkRefsAndKeywords(it) {
      const { schema, errSchemaPath, opts, self } = it;
      if (schema.$ref && opts.ignoreKeywordsWithRef && (0, util_1.schemaHasRulesButRef)(schema, self.RULES)) {
        self.logger.warn(`$ref: keywords ignored in schema at path "${errSchemaPath}"`);
      }
    }
    function checkNoDefault(it) {
      const { schema, opts } = it;
      if (schema.default !== void 0 && opts.useDefaults && opts.strictSchema) {
        (0, util_1.checkStrictMode)(it, "default is ignored in the schema root");
      }
    }
    function updateContext(it) {
      const schId = it.schema[it.opts.schemaId];
      if (schId)
        it.baseId = (0, resolve_1.resolveUrl)(it.opts.uriResolver, it.baseId, schId);
    }
    function checkAsyncSchema(it) {
      if (it.schema.$async && !it.schemaEnv.$async)
        throw new Error("async schema in sync schema");
    }
    function commentKeyword({ gen, schemaEnv, schema, errSchemaPath, opts }) {
      const msg = schema.$comment;
      if (opts.$comment === true) {
        gen.code((0, codegen_1._)`${names_1.default.self}.logger.log(${msg})`);
      } else if (typeof opts.$comment == "function") {
        const schemaPath = (0, codegen_1.str)`${errSchemaPath}/$comment`;
        const rootName = gen.scopeValue("root", { ref: schemaEnv.root });
        gen.code((0, codegen_1._)`${names_1.default.self}.opts.$comment(${msg}, ${schemaPath}, ${rootName}.schema)`);
      }
    }
    function returnResults(it) {
      const { gen, schemaEnv, validateName, ValidationError, opts } = it;
      if (schemaEnv.$async) {
        gen.if((0, codegen_1._)`${names_1.default.errors} === 0`, () => gen.return(names_1.default.data), () => gen.throw((0, codegen_1._)`new ${ValidationError}(${names_1.default.vErrors})`));
      } else {
        gen.assign((0, codegen_1._)`${validateName}.errors`, names_1.default.vErrors);
        if (opts.unevaluated)
          assignEvaluated(it);
        gen.return((0, codegen_1._)`${names_1.default.errors} === 0`);
      }
    }
    function assignEvaluated({ gen, evaluated, props, items }) {
      if (props instanceof codegen_1.Name)
        gen.assign((0, codegen_1._)`${evaluated}.props`, props);
      if (items instanceof codegen_1.Name)
        gen.assign((0, codegen_1._)`${evaluated}.items`, items);
    }
    function schemaKeywords(it, types, typeErrors, errsCount) {
      const { gen, schema, data, allErrors, opts, self } = it;
      const { RULES } = self;
      if (schema.$ref && (opts.ignoreKeywordsWithRef || !(0, util_1.schemaHasRulesButRef)(schema, RULES))) {
        gen.block(() => keywordCode(it, "$ref", RULES.all.$ref.definition));
        return;
      }
      if (!opts.jtd)
        checkStrictTypes(it, types);
      gen.block(() => {
        for (const group of RULES.rules)
          groupKeywords(group);
        groupKeywords(RULES.post);
      });
      function groupKeywords(group) {
        if (!(0, applicability_1.shouldUseGroup)(schema, group))
          return;
        if (group.type) {
          gen.if((0, dataType_2.checkDataType)(group.type, data, opts.strictNumbers));
          iterateKeywords(it, group);
          if (types.length === 1 && types[0] === group.type && typeErrors) {
            gen.else();
            (0, dataType_2.reportTypeError)(it);
          }
          gen.endIf();
        } else {
          iterateKeywords(it, group);
        }
        if (!allErrors)
          gen.if((0, codegen_1._)`${names_1.default.errors} === ${errsCount || 0}`);
      }
    }
    function iterateKeywords(it, group) {
      const { gen, schema, opts: { useDefaults } } = it;
      if (useDefaults)
        (0, defaults_1.assignDefaults)(it, group.type);
      gen.block(() => {
        for (const rule of group.rules) {
          if ((0, applicability_1.shouldUseRule)(schema, rule)) {
            keywordCode(it, rule.keyword, rule.definition, group.type);
          }
        }
      });
    }
    function checkStrictTypes(it, types) {
      if (it.schemaEnv.meta || !it.opts.strictTypes)
        return;
      checkContextTypes(it, types);
      if (!it.opts.allowUnionTypes)
        checkMultipleTypes(it, types);
      checkKeywordTypes(it, it.dataTypes);
    }
    function checkContextTypes(it, types) {
      if (!types.length)
        return;
      if (!it.dataTypes.length) {
        it.dataTypes = types;
        return;
      }
      types.forEach((t) => {
        if (!includesType(it.dataTypes, t)) {
          strictTypesError(it, `type "${t}" not allowed by context "${it.dataTypes.join(",")}"`);
        }
      });
      narrowSchemaTypes(it, types);
    }
    function checkMultipleTypes(it, ts) {
      if (ts.length > 1 && !(ts.length === 2 && ts.includes("null"))) {
        strictTypesError(it, "use allowUnionTypes to allow union type keyword");
      }
    }
    function checkKeywordTypes(it, ts) {
      const rules = it.self.RULES.all;
      for (const keyword in rules) {
        const rule = rules[keyword];
        if (typeof rule == "object" && (0, applicability_1.shouldUseRule)(it.schema, rule)) {
          const { type } = rule.definition;
          if (type.length && !type.some((t) => hasApplicableType(ts, t))) {
            strictTypesError(it, `missing type "${type.join(",")}" for keyword "${keyword}"`);
          }
        }
      }
    }
    function hasApplicableType(schTs, kwdT) {
      return schTs.includes(kwdT) || kwdT === "number" && schTs.includes("integer");
    }
    function includesType(ts, t) {
      return ts.includes(t) || t === "integer" && ts.includes("number");
    }
    function narrowSchemaTypes(it, withTypes) {
      const ts = [];
      for (const t of it.dataTypes) {
        if (includesType(withTypes, t))
          ts.push(t);
        else if (withTypes.includes("integer") && t === "number")
          ts.push("integer");
      }
      it.dataTypes = ts;
    }
    function strictTypesError(it, msg) {
      const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
      msg += ` at "${schemaPath}" (strictTypes)`;
      (0, util_1.checkStrictMode)(it, msg, it.opts.strictTypes);
    }
    var KeywordCxt = class {
      constructor(it, def, keyword) {
        (0, keyword_1.validateKeywordUsage)(it, def, keyword);
        this.gen = it.gen;
        this.allErrors = it.allErrors;
        this.keyword = keyword;
        this.data = it.data;
        this.schema = it.schema[keyword];
        this.$data = def.$data && it.opts.$data && this.schema && this.schema.$data;
        this.schemaValue = (0, util_1.schemaRefOrVal)(it, this.schema, keyword, this.$data);
        this.schemaType = def.schemaType;
        this.parentSchema = it.schema;
        this.params = {};
        this.it = it;
        this.def = def;
        if (this.$data) {
          this.schemaCode = it.gen.const("vSchema", getData(this.$data, it));
        } else {
          this.schemaCode = this.schemaValue;
          if (!(0, keyword_1.validSchemaType)(this.schema, def.schemaType, def.allowUndefined)) {
            throw new Error(`${keyword} value must be ${JSON.stringify(def.schemaType)}`);
          }
        }
        if ("code" in def ? def.trackErrors : def.errors !== false) {
          this.errsCount = it.gen.const("_errs", names_1.default.errors);
        }
      }
      result(condition, successAction, failAction) {
        this.failResult((0, codegen_1.not)(condition), successAction, failAction);
      }
      failResult(condition, successAction, failAction) {
        this.gen.if(condition);
        if (failAction)
          failAction();
        else
          this.error();
        if (successAction) {
          this.gen.else();
          successAction();
          if (this.allErrors)
            this.gen.endIf();
        } else {
          if (this.allErrors)
            this.gen.endIf();
          else
            this.gen.else();
        }
      }
      pass(condition, failAction) {
        this.failResult((0, codegen_1.not)(condition), void 0, failAction);
      }
      fail(condition) {
        if (condition === void 0) {
          this.error();
          if (!this.allErrors)
            this.gen.if(false);
          return;
        }
        this.gen.if(condition);
        this.error();
        if (this.allErrors)
          this.gen.endIf();
        else
          this.gen.else();
      }
      fail$data(condition) {
        if (!this.$data)
          return this.fail(condition);
        const { schemaCode } = this;
        this.fail((0, codegen_1._)`${schemaCode} !== undefined && (${(0, codegen_1.or)(this.invalid$data(), condition)})`);
      }
      error(append, errorParams, errorPaths) {
        if (errorParams) {
          this.setParams(errorParams);
          this._error(append, errorPaths);
          this.setParams({});
          return;
        }
        this._error(append, errorPaths);
      }
      _error(append, errorPaths) {
        ;
        (append ? errors_1.reportExtraError : errors_1.reportError)(this, this.def.error, errorPaths);
      }
      $dataError() {
        (0, errors_1.reportError)(this, this.def.$dataError || errors_1.keyword$DataError);
      }
      reset() {
        if (this.errsCount === void 0)
          throw new Error('add "trackErrors" to keyword definition');
        (0, errors_1.resetErrorsCount)(this.gen, this.errsCount);
      }
      ok(cond) {
        if (!this.allErrors)
          this.gen.if(cond);
      }
      setParams(obj, assign) {
        if (assign)
          Object.assign(this.params, obj);
        else
          this.params = obj;
      }
      block$data(valid, codeBlock, $dataValid = codegen_1.nil) {
        this.gen.block(() => {
          this.check$data(valid, $dataValid);
          codeBlock();
        });
      }
      check$data(valid = codegen_1.nil, $dataValid = codegen_1.nil) {
        if (!this.$data)
          return;
        const { gen, schemaCode, schemaType, def } = this;
        gen.if((0, codegen_1.or)((0, codegen_1._)`${schemaCode} === undefined`, $dataValid));
        if (valid !== codegen_1.nil)
          gen.assign(valid, true);
        if (schemaType.length || def.validateSchema) {
          gen.elseIf(this.invalid$data());
          this.$dataError();
          if (valid !== codegen_1.nil)
            gen.assign(valid, false);
        }
        gen.else();
      }
      invalid$data() {
        const { gen, schemaCode, schemaType, def, it } = this;
        return (0, codegen_1.or)(wrong$DataType(), invalid$DataSchema());
        function wrong$DataType() {
          if (schemaType.length) {
            if (!(schemaCode instanceof codegen_1.Name))
              throw new Error("ajv implementation error");
            const st = Array.isArray(schemaType) ? schemaType : [schemaType];
            return (0, codegen_1._)`${(0, dataType_2.checkDataTypes)(st, schemaCode, it.opts.strictNumbers, dataType_2.DataType.Wrong)}`;
          }
          return codegen_1.nil;
        }
        function invalid$DataSchema() {
          if (def.validateSchema) {
            const validateSchemaRef = gen.scopeValue("validate$data", { ref: def.validateSchema });
            return (0, codegen_1._)`!${validateSchemaRef}(${schemaCode})`;
          }
          return codegen_1.nil;
        }
      }
      subschema(appl, valid) {
        const subschema = (0, subschema_1.getSubschema)(this.it, appl);
        (0, subschema_1.extendSubschemaData)(subschema, this.it, appl);
        (0, subschema_1.extendSubschemaMode)(subschema, appl);
        const nextContext = { ...this.it, ...subschema, items: void 0, props: void 0 };
        subschemaCode(nextContext, valid);
        return nextContext;
      }
      mergeEvaluated(schemaCxt, toName) {
        const { it, gen } = this;
        if (!it.opts.unevaluated)
          return;
        if (it.props !== true && schemaCxt.props !== void 0) {
          it.props = util_1.mergeEvaluated.props(gen, schemaCxt.props, it.props, toName);
        }
        if (it.items !== true && schemaCxt.items !== void 0) {
          it.items = util_1.mergeEvaluated.items(gen, schemaCxt.items, it.items, toName);
        }
      }
      mergeValidEvaluated(schemaCxt, valid) {
        const { it, gen } = this;
        if (it.opts.unevaluated && (it.props !== true || it.items !== true)) {
          gen.if(valid, () => this.mergeEvaluated(schemaCxt, codegen_1.Name));
          return true;
        }
      }
    };
    exports.KeywordCxt = KeywordCxt;
    function keywordCode(it, keyword, def, ruleType) {
      const cxt = new KeywordCxt(it, def, keyword);
      if ("code" in def) {
        def.code(cxt, ruleType);
      } else if (cxt.$data && def.validate) {
        (0, keyword_1.funcKeywordCode)(cxt, def);
      } else if ("macro" in def) {
        (0, keyword_1.macroKeywordCode)(cxt, def);
      } else if (def.compile || def.validate) {
        (0, keyword_1.funcKeywordCode)(cxt, def);
      }
    }
    var JSON_POINTER = /^\/(?:[^~]|~0|~1)*$/;
    var RELATIVE_JSON_POINTER = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
    function getData($data, { dataLevel, dataNames, dataPathArr }) {
      let jsonPointer;
      let data;
      if ($data === "")
        return names_1.default.rootData;
      if ($data[0] === "/") {
        if (!JSON_POINTER.test($data))
          throw new Error(`Invalid JSON-pointer: ${$data}`);
        jsonPointer = $data;
        data = names_1.default.rootData;
      } else {
        const matches = RELATIVE_JSON_POINTER.exec($data);
        if (!matches)
          throw new Error(`Invalid JSON-pointer: ${$data}`);
        const up = +matches[1];
        jsonPointer = matches[2];
        if (jsonPointer === "#") {
          if (up >= dataLevel)
            throw new Error(errorMsg("property/index", up));
          return dataPathArr[dataLevel - up];
        }
        if (up > dataLevel)
          throw new Error(errorMsg("data", up));
        data = dataNames[dataLevel - up];
        if (!jsonPointer)
          return data;
      }
      let expr = data;
      const segments = jsonPointer.split("/");
      for (const segment of segments) {
        if (segment) {
          data = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)((0, util_1.unescapeJsonPointer)(segment))}`;
          expr = (0, codegen_1._)`${expr} && ${data}`;
        }
      }
      return expr;
      function errorMsg(pointerType, up) {
        return `Cannot access ${pointerType} ${up} levels up, current level is ${dataLevel}`;
      }
    }
    exports.getData = getData;
  }
});

// node_modules/ajv/dist/runtime/validation_error.js
var require_validation_error = __commonJS({
  "node_modules/ajv/dist/runtime/validation_error.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ValidationError = class extends Error {
      constructor(errors) {
        super("validation failed");
        this.errors = errors;
        this.ajv = this.validation = true;
      }
    };
    exports.default = ValidationError;
  }
});

// node_modules/ajv/dist/compile/ref_error.js
var require_ref_error = __commonJS({
  "node_modules/ajv/dist/compile/ref_error.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var resolve_1 = require_resolve();
    var MissingRefError = class extends Error {
      constructor(resolver, baseId, ref, msg) {
        super(msg || `can't resolve reference ${ref} from id ${baseId}`);
        this.missingRef = (0, resolve_1.resolveUrl)(resolver, baseId, ref);
        this.missingSchema = (0, resolve_1.normalizeId)((0, resolve_1.getFullPath)(resolver, this.missingRef));
      }
    };
    exports.default = MissingRefError;
  }
});

// node_modules/ajv/dist/compile/index.js
var require_compile = __commonJS({
  "node_modules/ajv/dist/compile/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.resolveSchema = exports.getCompilingSchema = exports.resolveRef = exports.compileSchema = exports.SchemaEnv = void 0;
    var codegen_1 = require_codegen();
    var validation_error_1 = require_validation_error();
    var names_1 = require_names();
    var resolve_1 = require_resolve();
    var util_1 = require_util();
    var validate_1 = require_validate();
    var SchemaEnv = class {
      constructor(env) {
        var _a;
        this.refs = {};
        this.dynamicAnchors = {};
        let schema;
        if (typeof env.schema == "object")
          schema = env.schema;
        this.schema = env.schema;
        this.schemaId = env.schemaId;
        this.root = env.root || this;
        this.baseId = (_a = env.baseId) !== null && _a !== void 0 ? _a : (0, resolve_1.normalizeId)(schema === null || schema === void 0 ? void 0 : schema[env.schemaId || "$id"]);
        this.schemaPath = env.schemaPath;
        this.localRefs = env.localRefs;
        this.meta = env.meta;
        this.$async = schema === null || schema === void 0 ? void 0 : schema.$async;
        this.refs = {};
      }
    };
    exports.SchemaEnv = SchemaEnv;
    function compileSchema(sch) {
      const _sch = getCompilingSchema.call(this, sch);
      if (_sch)
        return _sch;
      const rootId = (0, resolve_1.getFullPath)(this.opts.uriResolver, sch.root.baseId);
      const { es5, lines } = this.opts.code;
      const { ownProperties } = this.opts;
      const gen = new codegen_1.CodeGen(this.scope, { es5, lines, ownProperties });
      let _ValidationError;
      if (sch.$async) {
        _ValidationError = gen.scopeValue("Error", {
          ref: validation_error_1.default,
          code: (0, codegen_1._)`require("ajv/dist/runtime/validation_error").default`
        });
      }
      const validateName = gen.scopeName("validate");
      sch.validateName = validateName;
      const schemaCxt = {
        gen,
        allErrors: this.opts.allErrors,
        data: names_1.default.data,
        parentData: names_1.default.parentData,
        parentDataProperty: names_1.default.parentDataProperty,
        dataNames: [names_1.default.data],
        dataPathArr: [codegen_1.nil],
        // TODO can its length be used as dataLevel if nil is removed?
        dataLevel: 0,
        dataTypes: [],
        definedProperties: /* @__PURE__ */ new Set(),
        topSchemaRef: gen.scopeValue("schema", this.opts.code.source === true ? { ref: sch.schema, code: (0, codegen_1.stringify)(sch.schema) } : { ref: sch.schema }),
        validateName,
        ValidationError: _ValidationError,
        schema: sch.schema,
        schemaEnv: sch,
        rootId,
        baseId: sch.baseId || rootId,
        schemaPath: codegen_1.nil,
        errSchemaPath: sch.schemaPath || (this.opts.jtd ? "" : "#"),
        errorPath: (0, codegen_1._)`""`,
        opts: this.opts,
        self: this
      };
      let sourceCode;
      try {
        this._compilations.add(sch);
        (0, validate_1.validateFunctionCode)(schemaCxt);
        gen.optimize(this.opts.code.optimize);
        const validateCode = gen.toString();
        sourceCode = `${gen.scopeRefs(names_1.default.scope)}return ${validateCode}`;
        if (this.opts.code.process)
          sourceCode = this.opts.code.process(sourceCode, sch);
        const makeValidate = new Function(`${names_1.default.self}`, `${names_1.default.scope}`, sourceCode);
        const validate = makeValidate(this, this.scope.get());
        this.scope.value(validateName, { ref: validate });
        validate.errors = null;
        validate.schema = sch.schema;
        validate.schemaEnv = sch;
        if (sch.$async)
          validate.$async = true;
        if (this.opts.code.source === true) {
          validate.source = { validateName, validateCode, scopeValues: gen._values };
        }
        if (this.opts.unevaluated) {
          const { props, items } = schemaCxt;
          validate.evaluated = {
            props: props instanceof codegen_1.Name ? void 0 : props,
            items: items instanceof codegen_1.Name ? void 0 : items,
            dynamicProps: props instanceof codegen_1.Name,
            dynamicItems: items instanceof codegen_1.Name
          };
          if (validate.source)
            validate.source.evaluated = (0, codegen_1.stringify)(validate.evaluated);
        }
        sch.validate = validate;
        return sch;
      } catch (e) {
        delete sch.validate;
        delete sch.validateName;
        if (sourceCode)
          this.logger.error("Error compiling schema, function code:", sourceCode);
        throw e;
      } finally {
        this._compilations.delete(sch);
      }
    }
    exports.compileSchema = compileSchema;
    function resolveRef(root, baseId, ref) {
      var _a;
      ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, ref);
      const schOrFunc = root.refs[ref];
      if (schOrFunc)
        return schOrFunc;
      let _sch = resolve.call(this, root, ref);
      if (_sch === void 0) {
        const schema = (_a = root.localRefs) === null || _a === void 0 ? void 0 : _a[ref];
        const { schemaId } = this.opts;
        if (schema)
          _sch = new SchemaEnv({ schema, schemaId, root, baseId });
      }
      if (_sch === void 0)
        return;
      return root.refs[ref] = inlineOrCompile.call(this, _sch);
    }
    exports.resolveRef = resolveRef;
    function inlineOrCompile(sch) {
      if ((0, resolve_1.inlineRef)(sch.schema, this.opts.inlineRefs))
        return sch.schema;
      return sch.validate ? sch : compileSchema.call(this, sch);
    }
    function getCompilingSchema(schEnv) {
      for (const sch of this._compilations) {
        if (sameSchemaEnv(sch, schEnv))
          return sch;
      }
    }
    exports.getCompilingSchema = getCompilingSchema;
    function sameSchemaEnv(s1, s2) {
      return s1.schema === s2.schema && s1.root === s2.root && s1.baseId === s2.baseId;
    }
    function resolve(root, ref) {
      let sch;
      while (typeof (sch = this.refs[ref]) == "string")
        ref = sch;
      return sch || this.schemas[ref] || resolveSchema.call(this, root, ref);
    }
    function resolveSchema(root, ref) {
      const p = this.opts.uriResolver.parse(ref);
      const refPath = (0, resolve_1._getFullPath)(this.opts.uriResolver, p);
      let baseId = (0, resolve_1.getFullPath)(this.opts.uriResolver, root.baseId, void 0);
      if (Object.keys(root.schema).length > 0 && refPath === baseId) {
        return getJsonPointer.call(this, p, root);
      }
      const id2 = (0, resolve_1.normalizeId)(refPath);
      const schOrRef = this.refs[id2] || this.schemas[id2];
      if (typeof schOrRef == "string") {
        const sch = resolveSchema.call(this, root, schOrRef);
        if (typeof (sch === null || sch === void 0 ? void 0 : sch.schema) !== "object")
          return;
        return getJsonPointer.call(this, p, sch);
      }
      if (typeof (schOrRef === null || schOrRef === void 0 ? void 0 : schOrRef.schema) !== "object")
        return;
      if (!schOrRef.validate)
        compileSchema.call(this, schOrRef);
      if (id2 === (0, resolve_1.normalizeId)(ref)) {
        const { schema } = schOrRef;
        const { schemaId } = this.opts;
        const schId = schema[schemaId];
        if (schId)
          baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
        return new SchemaEnv({ schema, schemaId, root, baseId });
      }
      return getJsonPointer.call(this, p, schOrRef);
    }
    exports.resolveSchema = resolveSchema;
    var PREVENT_SCOPE_CHANGE = /* @__PURE__ */ new Set([
      "properties",
      "patternProperties",
      "enum",
      "dependencies",
      "definitions"
    ]);
    function getJsonPointer(parsedRef, { baseId, schema, root }) {
      var _a;
      if (((_a = parsedRef.fragment) === null || _a === void 0 ? void 0 : _a[0]) !== "/")
        return;
      for (const part of parsedRef.fragment.slice(1).split("/")) {
        if (typeof schema === "boolean")
          return;
        const partSchema = schema[(0, util_1.unescapeFragment)(part)];
        if (partSchema === void 0)
          return;
        schema = partSchema;
        const schId = typeof schema === "object" && schema[this.opts.schemaId];
        if (!PREVENT_SCOPE_CHANGE.has(part) && schId) {
          baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
        }
      }
      let env;
      if (typeof schema != "boolean" && schema.$ref && !(0, util_1.schemaHasRulesButRef)(schema, this.RULES)) {
        const $ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schema.$ref);
        env = resolveSchema.call(this, root, $ref);
      }
      const { schemaId } = this.opts;
      env = env || new SchemaEnv({ schema, schemaId, root, baseId });
      if (env.schema !== env.root.schema)
        return env;
      return void 0;
    }
  }
});

// node_modules/ajv/dist/refs/data.json
var require_data = __commonJS({
  "node_modules/ajv/dist/refs/data.json"(exports, module) {
    module.exports = {
      $id: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#",
      description: "Meta-schema for $data reference (JSON AnySchema extension proposal)",
      type: "object",
      required: ["$data"],
      properties: {
        $data: {
          type: "string",
          anyOf: [{ format: "relative-json-pointer" }, { format: "json-pointer" }]
        }
      },
      additionalProperties: false
    };
  }
});

// node_modules/fast-uri/lib/utils.js
var require_utils = __commonJS({
  "node_modules/fast-uri/lib/utils.js"(exports, module) {
    "use strict";
    var isUUID = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu);
    var isIPv4 = RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u);
    var isPort = RegExp.prototype.test.bind(/^\d*$/u);
    var isHexPair = RegExp.prototype.test.bind(/^[\da-f]{2}$/iu);
    var isUnreserved = RegExp.prototype.test.bind(/^[\da-z\-._~]$/iu);
    var isPathCharacter = RegExp.prototype.test.bind(/^[A-Za-z0-9\-._~!$&'()*+,;=:@/]$/u);
    var isQueryFragmentCharacter = RegExp.prototype.test.bind(/^[A-Za-z0-9\-._~!$&'()*+,;=:@/?]$/u);
    var isUserinfoCharacter = RegExp.prototype.test.bind(/^[A-Za-z0-9\-._~!$&'()*+,;=:]$/u);
    var BYTE_HEX = new Array(256);
    {
      const HEX_DIGITS = "0123456789ABCDEF";
      for (let i = 0; i < 256; i++) {
        BYTE_HEX[i] = "%" + HEX_DIGITS[i >> 4] + HEX_DIGITS[i & 15];
      }
    }
    function percentEncodeNonAscii(cp) {
      if (cp < 2048) {
        return BYTE_HEX[192 | cp >> 6] + BYTE_HEX[128 | cp & 63];
      }
      if (cp < 65536) {
        return BYTE_HEX[224 | cp >> 12] + BYTE_HEX[128 | cp >> 6 & 63] + BYTE_HEX[128 | cp & 63];
      }
      return BYTE_HEX[240 | cp >> 18] + BYTE_HEX[128 | cp >> 12 & 63] + BYTE_HEX[128 | cp >> 6 & 63] + BYTE_HEX[128 | cp & 63];
    }
    function stringArrayToHexStripped(input2) {
      let acc = "";
      let code = 0;
      let i = 0;
      for (i = 0; i < input2.length; i++) {
        code = input2[i].charCodeAt(0);
        if (code === 48) {
          continue;
        }
        if (!(code >= 48 && code <= 57 || code >= 65 && code <= 70 || code >= 97 && code <= 102)) {
          return "";
        }
        acc += input2[i];
        break;
      }
      for (i += 1; i < input2.length; i++) {
        code = input2[i].charCodeAt(0);
        if (!(code >= 48 && code <= 57 || code >= 65 && code <= 70 || code >= 97 && code <= 102)) {
          return "";
        }
        acc += input2[i];
      }
      return acc;
    }
    var isHextet = RegExp.prototype.test.bind(/^[\dA-Fa-f]{1,4}$/);
    var isIPvFuture = RegExp.prototype.test.bind(/^[vV][\dA-Fa-f]+\.[A-Za-z\d\-._~!$&'()*+,;=:]+$/);
    var isZoneCharacter = RegExp.prototype.test.bind(/^[A-Za-z\d\-._~]$/);
    var nonSimpleDomain = RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);
    function isZoneIdentifier(zone) {
      if (zone.length === 0) return false;
      for (let i = 0; i < zone.length; i++) {
        if (isZoneCharacter(zone[i])) continue;
        if (zone[i] === "%" && i + 2 < zone.length && isHexPair(zone.slice(i + 1, i + 3))) {
          i += 2;
          continue;
        }
        return false;
      }
      return true;
    }
    function compressIPv6ZeroRun(hextets) {
      let bestStart = -1;
      let bestLength = 0;
      let runStart = -1;
      let runLength = 0;
      for (let i = 0; i < hextets.length; i++) {
        if (hextets[i] === "0") {
          if (runStart === -1) runStart = i;
          runLength++;
          if (runLength > bestLength) {
            bestLength = runLength;
            bestStart = runStart;
          }
        } else {
          runStart = -1;
          runLength = 0;
        }
      }
      if (bestLength < 2) return hextets.join(":");
      const head = hextets.slice(0, bestStart).join(":");
      const tail = hextets.slice(bestStart + bestLength).join(":");
      return head + "::" + tail;
    }
    function normalizeIPv6Address(input2) {
      const compression = input2.indexOf("::");
      if (compression !== -1 && input2.indexOf("::", compression + 1) !== -1) return void 0;
      const left = compression === -1 ? input2.split(":") : input2.slice(0, compression).split(":");
      const right = compression === -1 ? [] : input2.slice(compression + 2).split(":");
      if (compression !== -1) {
        if (left.length === 1 && left[0] === "") left.length = 0;
        if (right.length === 1 && right[0] === "") right.length = 0;
      }
      const parts = left.concat(right);
      let hextetCount = 0;
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (part === "") return void 0;
        if (part.indexOf(".") !== -1) {
          if (i !== parts.length - 1 || compression !== -1 && right.length === 0 || !isIPv4(part)) return void 0;
          hextetCount += 2;
          continue;
        }
        if (!isHextet(part)) return void 0;
        parts[i] = parseInt(part, 16).toString(16);
        hextetCount++;
      }
      if (compression === -1) {
        if (hextetCount !== 8) return void 0;
        return compressIPv6ZeroRun(parts);
      }
      if (hextetCount >= 8) return void 0;
      const expanded = parts.slice(0, left.length);
      for (let i = hextetCount; i < 8; i++) expanded.push("0");
      for (let i = left.length; i < parts.length; i++) expanded.push(parts[i]);
      return compressIPv6ZeroRun(expanded);
    }
    function normalizeIPv6(host) {
      const bracketed = host[0] === "[" && host[host.length - 1] === "]";
      const hasBracket = host[0] === "[" || host[host.length - 1] === "]";
      if (hasBracket && !bracketed) return { host, isIPV6: false, error: true };
      let input2 = bracketed ? host.slice(1, -1) : host;
      if (bracketed && isIPvFuture(input2)) {
        input2 = input2.toLowerCase();
        return { host: `[${input2}]`, escapedHost: input2, isIPV6: false, isIPVFuture: true };
      }
      if (findToken(input2, ":") < 2) {
        return { host, isIPV6: false, error: bracketed };
      }
      let zoneIdentifier = "";
      const zoneSeparator = input2.indexOf("%");
      if (zoneSeparator !== -1) {
        const separatorLength = input2.slice(zoneSeparator, zoneSeparator + 3).toLowerCase() === "%25" ? 3 : 1;
        zoneIdentifier = input2.slice(zoneSeparator + separatorLength);
        if (!isZoneIdentifier(zoneIdentifier)) return { host, isIPV6: false, error: true };
        input2 = input2.slice(0, zoneSeparator);
      }
      const address = normalizeIPv6Address(input2);
      if (address === void 0) return { host, isIPV6: false, error: true };
      return {
        host: address + (zoneIdentifier ? "%" + zoneIdentifier : ""),
        escapedHost: address + (zoneIdentifier ? "%25" + zoneIdentifier : ""),
        isIPV6: true
      };
    }
    function findToken(str, token) {
      let ind = 0;
      for (let i = 0; i < str.length; i++) {
        if (str[i] === token) ind++;
      }
      return ind;
    }
    function removeDotSegments(path21) {
      let input2 = path21;
      const output = [];
      let nextSlash = -1;
      let len = 0;
      while (len = input2.length) {
        if (len === 1) {
          if (input2 === ".") {
            break;
          } else if (input2 === "/") {
            output.push("/");
            break;
          } else {
            output.push(input2);
            break;
          }
        } else if (len === 2) {
          if (input2[0] === ".") {
            if (input2[1] === ".") {
              break;
            } else if (input2[1] === "/") {
              input2 = input2.slice(2);
              continue;
            }
          } else if (input2[0] === "/") {
            if (input2[1] === "." || input2[1] === "/") {
              output.push("/");
              break;
            }
          }
        } else if (len === 3) {
          if (input2 === "/..") {
            if (output.length !== 0) {
              output.pop();
            }
            output.push("/");
            break;
          }
        }
        if (input2[0] === ".") {
          if (input2[1] === ".") {
            if (input2[2] === "/") {
              input2 = input2.slice(3);
              continue;
            }
          } else if (input2[1] === "/") {
            input2 = input2.slice(2);
            continue;
          }
        } else if (input2[0] === "/") {
          if (input2[1] === ".") {
            if (input2[2] === "/") {
              input2 = input2.slice(2);
              continue;
            } else if (input2[2] === ".") {
              if (input2[3] === "/") {
                input2 = input2.slice(3);
                if (output.length !== 0) {
                  output.pop();
                }
                continue;
              }
            }
          }
        }
        if ((nextSlash = input2.indexOf("/", 1)) === -1) {
          output.push(input2);
          break;
        } else {
          output.push(input2.slice(0, nextSlash));
          input2 = input2.slice(nextSlash);
        }
      }
      return output.join("");
    }
    function removeDotSegmentsRelative(path21) {
      if (path21 === "" || path21[0] === "/") {
        return removeDotSegments(path21);
      }
      const segments = path21.split("/");
      const last = segments.length - 1;
      const output = [];
      let trailingDirectory = false;
      for (let i = 0; i <= last; i++) {
        const segment = segments[i];
        if (segment === "." || segment === "..") {
          if (segment === "..") {
            if (output.length !== 0 && output[output.length - 1] !== "..") {
              output.pop();
            } else {
              output.push("..");
            }
          }
          trailingDirectory = i === last;
        } else {
          output.push(segment);
        }
      }
      if (trailingDirectory && output[output.length - 1] !== "..") {
        output.push("");
      }
      if (output.length === 0 || output[0] === "" || output[0].includes(":")) {
        output.unshift(".");
      }
      return output.join("/");
    }
    var HOST_DELIMS = { "@": "%40", "/": "%2F", "?": "%3F", "#": "%23", ":": "%3A" };
    var HOST_DELIM_RE = /[@/?#:]/g;
    var HOST_DELIM_NO_COLON_RE = /[@/?#]/g;
    function reescapeHostDelimiters(host, isIP2) {
      const re = isIP2 ? HOST_DELIM_NO_COLON_RE : HOST_DELIM_RE;
      re.lastIndex = 0;
      return host.replace(re, (ch) => HOST_DELIMS[ch]);
    }
    function normalizePercentEncoding(input2, decodeUnreserved = false) {
      if (input2.indexOf("%") === -1) {
        return input2;
      }
      let output = "";
      for (let i = 0; i < input2.length; i++) {
        if (input2[i] === "%" && i + 2 < input2.length) {
          const hex = input2.slice(i + 1, i + 3);
          if (isHexPair(hex)) {
            const normalizedHex = hex.toUpperCase();
            const decoded = String.fromCharCode(parseInt(normalizedHex, 16));
            if (decodeUnreserved && isUnreserved(decoded)) {
              output += decoded;
            } else {
              output += "%" + normalizedHex;
            }
            i += 2;
            continue;
          }
        }
        output += input2[i];
      }
      return output;
    }
    function normalizePathEncoding(input2) {
      let output = "";
      for (let i = 0; i < input2.length; i++) {
        const ch = input2[i];
        if (ch === "%" && i + 2 < input2.length) {
          const hex = input2.slice(i + 1, i + 3);
          if (isHexPair(hex)) {
            const normalizedHex = hex.toUpperCase();
            const decoded = String.fromCharCode(parseInt(normalizedHex, 16));
            if (decoded !== "." && isUnreserved(decoded)) {
              output += decoded;
            } else {
              output += "%" + normalizedHex;
            }
            i += 2;
            continue;
          }
        }
        if (isPathCharacter(ch)) {
          output += ch;
        } else {
          const code = input2.charCodeAt(i);
          if (code < 128) {
            output += isEscapeSafe(code) ? ch : BYTE_HEX[code];
          } else if (code < 55296 || code > 57343) {
            output += percentEncodeNonAscii(code);
          } else if (code <= 56319 && i + 1 < input2.length) {
            const low = input2.charCodeAt(i + 1);
            if (low >= 56320 && low <= 57343) {
              output += percentEncodeNonAscii(65536 + (code - 55296 << 10) + (low - 56320));
              i++;
            } else {
              output += percentEncodeNonAscii(65533);
            }
          } else {
            output += percentEncodeNonAscii(65533);
          }
        }
      }
      return output;
    }
    function serializePathEncoding(input2, pathNoScheme = false) {
      let output = "";
      let firstSegment = pathNoScheme && input2[0] !== "/";
      for (let i = 0; i < input2.length; i++) {
        const ch = input2[i];
        if (ch === "%" && i + 2 < input2.length) {
          const hex = input2.slice(i + 1, i + 3);
          if (isHexPair(hex)) {
            output += "%" + hex.toUpperCase();
            i += 2;
            continue;
          }
        }
        if (ch === "/") {
          firstSegment = false;
        }
        if (isPathCharacter(ch) && (ch !== ":" || !firstSegment)) {
          output += ch;
        } else {
          const code = input2.charCodeAt(i);
          if (code < 128) {
            output += BYTE_HEX[code];
          } else if (code < 55296 || code > 57343) {
            output += percentEncodeNonAscii(code);
          } else if (code <= 56319 && i + 1 < input2.length) {
            const low = input2.charCodeAt(i + 1);
            if (low >= 56320 && low <= 57343) {
              output += percentEncodeNonAscii(65536 + (code - 55296 << 10) + (low - 56320));
              i++;
            } else {
              output += percentEncodeNonAscii(65533);
            }
          } else {
            output += percentEncodeNonAscii(65533);
          }
        }
      }
      return output;
    }
    function encodeComponent(input2, isAllowed) {
      let output = "";
      for (let i = 0; i < input2.length; i++) {
        const ch = input2[i];
        if (ch === "%" && i + 2 < input2.length) {
          const hex = input2.slice(i + 1, i + 3);
          if (isHexPair(hex)) {
            output += "%" + hex.toUpperCase();
            i += 2;
            continue;
          }
        }
        if (isAllowed(ch)) {
          output += ch;
        } else {
          const code = input2.charCodeAt(i);
          if (code < 128) {
            output += BYTE_HEX[code];
          } else if (code < 55296 || code > 57343) {
            output += percentEncodeNonAscii(code);
          } else if (code <= 56319 && i + 1 < input2.length) {
            const low = input2.charCodeAt(i + 1);
            if (low >= 56320 && low <= 57343) {
              output += percentEncodeNonAscii(65536 + (code - 55296 << 10) + (low - 56320));
              i++;
            } else {
              output += percentEncodeNonAscii(65533);
            }
          } else {
            output += percentEncodeNonAscii(65533);
          }
        }
      }
      return output;
    }
    function encodeUserinfo(input2) {
      return encodeComponent(input2, isUserinfoCharacter);
    }
    function encodeQuery(input2) {
      return encodeComponent(input2, isQueryFragmentCharacter);
    }
    function encodeFragment(input2) {
      return encodeComponent(input2, isQueryFragmentCharacter);
    }
    function isEscapeSafe(cp) {
      return cp >= 48 && cp <= 57 || cp >= 65 && cp <= 90 || cp >= 97 && cp <= 122 || cp === 42 || cp === 43 || cp === 45 || cp === 46 || cp === 47 || cp === 64 || cp === 95;
    }
    function normalizeQueryFragmentEncoding(input2) {
      let output = "";
      for (let i = 0; i < input2.length; i++) {
        const ch = input2[i];
        if (ch === "%" && i + 2 < input2.length) {
          const hex = input2.slice(i + 1, i + 3);
          if (isHexPair(hex)) {
            const normalizedHex = hex.toUpperCase();
            const decoded = String.fromCharCode(parseInt(normalizedHex, 16));
            if (isUnreserved(decoded)) {
              output += decoded;
            } else {
              output += "%" + normalizedHex;
            }
            i += 2;
            continue;
          }
        }
        if (isQueryFragmentCharacter(ch)) {
          output += ch;
        } else {
          const code = input2.charCodeAt(i);
          if (code < 128) {
            output += isEscapeSafe(code) ? ch : BYTE_HEX[code];
          } else if (code < 55296 || code > 57343) {
            output += percentEncodeNonAscii(code);
          } else if (code <= 56319 && i + 1 < input2.length) {
            const low = input2.charCodeAt(i + 1);
            if (low >= 56320 && low <= 57343) {
              output += percentEncodeNonAscii(65536 + (code - 55296 << 10) + (low - 56320));
              i++;
            } else {
              output += percentEncodeNonAscii(65533);
            }
          } else {
            output += percentEncodeNonAscii(65533);
          }
        }
      }
      return output;
    }
    function escapePreservingEscapes(input2) {
      let output = "";
      for (let i = 0; i < input2.length; i++) {
        if (input2[i] === "%" && i + 2 < input2.length) {
          const hex = input2.slice(i + 1, i + 3);
          if (isHexPair(hex)) {
            output += "%" + hex.toUpperCase();
            i += 2;
            continue;
          }
        }
        output += escape(input2[i]);
      }
      return output;
    }
    function recomposeAuthority(component) {
      const uriTokens = [];
      if (component.userinfo !== void 0) {
        uriTokens.push(encodeUserinfo(component.userinfo));
        uriTokens.push("@");
      }
      if (component.host !== void 0) {
        let host = component.host;
        if (!isIPv4(host)) {
          let ipV6res = normalizeIPv6(host);
          if (ipV6res.isIPV6 !== true && ipV6res.isIPVFuture !== true) {
            host = normalizePercentEncoding(host, true);
            ipV6res = normalizeIPv6(host);
          }
          if (ipV6res.isIPV6 === true || ipV6res.isIPVFuture === true) {
            host = `[${ipV6res.escapedHost}]`;
          } else {
            host = reescapeHostDelimiters(host, false);
          }
        }
        uriTokens.push(host);
      }
      if (typeof component.port === "number" || typeof component.port === "string") {
        const port = String(component.port);
        if (!isPort(port)) {
          throw new TypeError("URI port is malformed.");
        }
        uriTokens.push(":");
        uriTokens.push(port);
      }
      return uriTokens.length ? uriTokens.join("") : void 0;
    }
    module.exports = {
      nonSimpleDomain,
      recomposeAuthority,
      reescapeHostDelimiters,
      normalizePercentEncoding,
      normalizePathEncoding,
      serializePathEncoding,
      normalizeQueryFragmentEncoding,
      encodeUserinfo,
      encodeQuery,
      encodeFragment,
      escapePreservingEscapes,
      removeDotSegments,
      removeDotSegmentsRelative,
      isIPv4,
      isUUID,
      normalizeIPv6,
      stringArrayToHexStripped
    };
  }
});

// node_modules/fast-uri/lib/schemes.js
var require_schemes = __commonJS({
  "node_modules/fast-uri/lib/schemes.js"(exports, module) {
    "use strict";
    var { isUUID } = require_utils();
    var URN_REG = /^([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-./:;=@]|%[\da-f]{2})+)$/iu;
    var supportedSchemeNames = (
      /** @type {const} */
      [
        "http",
        "https",
        "ws",
        "wss",
        "urn",
        "urn:uuid"
      ]
    );
    function isValidSchemeName(name) {
      return supportedSchemeNames.indexOf(
        /** @type {*} */
        name
      ) !== -1;
    }
    function wsIsSecure(wsComponent) {
      if (wsComponent.secure === true) {
        return true;
      } else if (wsComponent.secure === false) {
        return false;
      } else if (wsComponent.scheme) {
        return wsComponent.scheme.length === 3 && (wsComponent.scheme[0] === "w" || wsComponent.scheme[0] === "W") && (wsComponent.scheme[1] === "s" || wsComponent.scheme[1] === "S") && (wsComponent.scheme[2] === "s" || wsComponent.scheme[2] === "S");
      } else {
        return false;
      }
    }
    function httpParse(component) {
      if (!component.host) {
        component.error = component.error || "HTTP URIs must have a host.";
      }
      return component;
    }
    function httpSerialize(component) {
      const secure = String(component.scheme).toLowerCase() === "https";
      if (component.port === (secure ? 443 : 80) || component.port === "") {
        component.port = void 0;
      }
      if (!component.path) {
        component.path = "/";
      }
      return component;
    }
    function wsParse(wsComponent) {
      wsComponent.secure = wsIsSecure(wsComponent);
      wsComponent.resourceName = (wsComponent.path || "/") + (wsComponent.query ? "?" + wsComponent.query : "");
      wsComponent.path = void 0;
      wsComponent.query = void 0;
      return wsComponent;
    }
    function wsSerialize(wsComponent) {
      if (wsComponent.port === (wsIsSecure(wsComponent) ? 443 : 80) || wsComponent.port === "") {
        wsComponent.port = void 0;
      }
      if (typeof wsComponent.secure === "boolean") {
        wsComponent.scheme = wsComponent.secure ? "wss" : "ws";
        wsComponent.secure = void 0;
      }
      if (wsComponent.resourceName) {
        const queryIndex = wsComponent.resourceName.indexOf("?");
        const path21 = queryIndex === -1 ? wsComponent.resourceName : wsComponent.resourceName.slice(0, queryIndex);
        wsComponent.path = path21 && path21 !== "/" ? path21 : void 0;
        wsComponent.query = queryIndex === -1 ? void 0 : wsComponent.resourceName.slice(queryIndex + 1);
        wsComponent.resourceName = void 0;
      }
      wsComponent.fragment = void 0;
      return wsComponent;
    }
    function urnParse(urnComponent, options) {
      if (!urnComponent.path) {
        urnComponent.error = "URN can not be parsed";
        return urnComponent;
      }
      const matches = urnComponent.path.match(URN_REG);
      if (matches && matches[0] === urnComponent.path) {
        const scheme = options.scheme || urnComponent.scheme || "urn";
        urnComponent.nid = matches[1].toLowerCase();
        urnComponent.nss = matches[2];
        const urnScheme = `${scheme}:${options.nid || urnComponent.nid}`;
        const schemeHandler = getSchemeHandler(urnScheme);
        urnComponent.path = void 0;
        if (schemeHandler) {
          urnComponent = schemeHandler.parse(urnComponent, options);
        }
      } else {
        urnComponent.error = urnComponent.error || "URN can not be parsed.";
      }
      return urnComponent;
    }
    function urnSerialize(urnComponent, options) {
      if (urnComponent.nid === void 0) {
        throw new Error("URN without nid cannot be serialized");
      }
      const scheme = options.scheme || urnComponent.scheme || "urn";
      const nid = urnComponent.nid.toLowerCase();
      const urnScheme = `${scheme}:${options.nid || nid}`;
      const schemeHandler = getSchemeHandler(urnScheme);
      if (schemeHandler) {
        urnComponent = schemeHandler.serialize(urnComponent, options);
      }
      const uriComponent = urnComponent;
      const nss = urnComponent.nss;
      uriComponent.path = `${nid || options.nid}:${nss}`;
      options.skipEscape = true;
      return uriComponent;
    }
    function urnuuidParse(urnComponent, options) {
      const uuidComponent = urnComponent;
      uuidComponent.uuid = uuidComponent.nss;
      uuidComponent.nss = void 0;
      if (!options.tolerant && (!uuidComponent.uuid || !isUUID(uuidComponent.uuid))) {
        uuidComponent.error = uuidComponent.error || "UUID is not valid.";
      }
      return uuidComponent;
    }
    function urnuuidSerialize(uuidComponent) {
      const urnComponent = uuidComponent;
      urnComponent.nss = (uuidComponent.uuid || "").toLowerCase();
      return urnComponent;
    }
    var http = (
      /** @type {SchemeHandler} */
      {
        scheme: "http",
        domainHost: true,
        parse: httpParse,
        serialize: httpSerialize
      }
    );
    var https = (
      /** @type {SchemeHandler} */
      {
        scheme: "https",
        domainHost: http.domainHost,
        parse: httpParse,
        serialize: httpSerialize
      }
    );
    var ws = (
      /** @type {SchemeHandler} */
      {
        scheme: "ws",
        domainHost: true,
        parse: wsParse,
        serialize: wsSerialize
      }
    );
    var wss = (
      /** @type {SchemeHandler} */
      {
        scheme: "wss",
        domainHost: ws.domainHost,
        parse: ws.parse,
        serialize: ws.serialize
      }
    );
    var urn = (
      /** @type {SchemeHandler} */
      {
        scheme: "urn",
        parse: urnParse,
        serialize: urnSerialize,
        skipNormalize: true
      }
    );
    var urnuuid = (
      /** @type {SchemeHandler} */
      {
        scheme: "urn:uuid",
        parse: urnuuidParse,
        serialize: urnuuidSerialize,
        skipNormalize: true
      }
    );
    var SCHEMES = (
      /** @type {Record<SchemeName, SchemeHandler>} */
      {
        http,
        https,
        ws,
        wss,
        urn,
        "urn:uuid": urnuuid
      }
    );
    Object.setPrototypeOf(SCHEMES, null);
    function getSchemeHandler(scheme) {
      return scheme && (SCHEMES[
        /** @type {SchemeName} */
        scheme
      ] || SCHEMES[
        /** @type {SchemeName} */
        scheme.toLowerCase()
      ]) || void 0;
    }
    module.exports = {
      wsIsSecure,
      SCHEMES,
      isValidSchemeName,
      getSchemeHandler
    };
  }
});

// node_modules/fast-uri/index.js
var require_fast_uri = __commonJS({
  "node_modules/fast-uri/index.js"(exports, module) {
    "use strict";
    var { normalizeIPv6, removeDotSegments, removeDotSegmentsRelative, recomposeAuthority, normalizePercentEncoding, normalizePathEncoding, serializePathEncoding, normalizeQueryFragmentEncoding, encodeQuery, encodeFragment, reescapeHostDelimiters, isIPv4, nonSimpleDomain } = require_utils();
    var { SCHEMES, getSchemeHandler } = require_schemes();
    var VALID_SCHEME = /^[A-Za-z][A-Za-z0-9+.-]*$/u;
    var MALFORMED_SCHEME_ERROR = "URI scheme is malformed.";
    var MALFORMED_HOST_ERROR = "URI host is malformed.";
    var FORBIDDEN_DOMAIN_HOST_CHARACTER = /[\0-\x20"#/:<>?@[\\\]^`{|}\x7F]/u;
    function validateScheme(scheme) {
      const stringScheme = String(scheme);
      if (!VALID_SCHEME.test(stringScheme)) {
        throw new TypeError(MALFORMED_SCHEME_ERROR);
      }
      return stringScheme;
    }
    function normalize(uri, options) {
      if (typeof uri === "string") {
        uri = /** @type {T} */
        normalizeString(uri, options);
      } else if (typeof uri === "object") {
        uri = /** @type {T} */
        parse(serialize(uri, options), options);
      }
      return uri;
    }
    function resolve(baseURI, relativeURI, options) {
      const schemelessOptions = options ? Object.assign({ scheme: "null" }, options) : { scheme: "null" };
      const {
        parsed: baseParsed,
        malformedAuthorityOrPort: baseMalformed,
        malformedPercentEncoding: baseMalformedPercentEncoding,
        malformedSchemeSpecific: baseMalformedSchemeSpecific,
        malformedHost: baseMalformedHost,
        malformedScheme: baseMalformedScheme
      } = parseWithStatus(baseURI, schemelessOptions);
      const {
        parsed: relativeParsed,
        malformedAuthorityOrPort: relativeMalformed,
        malformedPercentEncoding: relativeMalformedPercentEncoding,
        malformedSchemeSpecific: relativeMalformedSchemeSpecific,
        malformedHost: relativeMalformedHost,
        malformedScheme: relativeMalformedScheme
      } = parseWithStatus(relativeURI, schemelessOptions);
      if (baseMalformed || relativeMalformed || baseMalformedPercentEncoding || relativeMalformedPercentEncoding || baseMalformedSchemeSpecific || relativeMalformedSchemeSpecific || baseMalformedHost || relativeMalformedHost || baseMalformedScheme || relativeMalformedScheme) {
        throw new Error(baseParsed.error || relativeParsed.error || "URI is malformed.");
      }
      const resolved = resolveComponent(baseParsed, relativeParsed, schemelessOptions, true);
      const resolvedSchemeHandler = getSchemeHandler(options && options.scheme || resolved.scheme);
      const resolvedHost = resolved.host;
      const resolvedHostIsIP = resolvedHost !== void 0 && resolvedHost !== "" && (isIPv4(resolvedHost) || normalizeIPv6(resolvedHost).isIPV6);
      if (hasForbiddenDomainHost(resolved, options || {}, resolvedSchemeHandler, resolvedHostIsIP)) {
        throw new Error(MALFORMED_HOST_ERROR);
      }
      canonicalizeHost(resolved, options || {}, resolvedSchemeHandler, resolvedHostIsIP);
      const encodedASCIIHost = resolvedHost && resolvedHost.indexOf("%") !== -1 && !new RegExp("\\P{ASCII}", "u").test(resolvedHost);
      if (resolved.error && !encodedASCIIHost) {
        throw new Error(resolved.error);
      }
      schemelessOptions.skipEscape = true;
      return serialize(resolved, schemelessOptions);
    }
    function resolveComponent(base, relative, options, skipNormalization) {
      const target = {};
      if (!skipNormalization) {
        base = parse(serialize(base, options), options);
        relative = parse(serialize(relative, options), options);
      }
      options = options || {};
      if (!options.tolerant && relative.scheme) {
        target.scheme = relative.scheme;
        target.userinfo = relative.userinfo;
        target.host = relative.host;
        target.port = relative.port;
        target.path = removeDotSegments(relative.path || "");
        target.query = relative.query;
      } else {
        if (relative.userinfo !== void 0 || relative.host !== void 0 || relative.port !== void 0) {
          target.userinfo = relative.userinfo;
          target.host = relative.host;
          target.port = relative.port;
          target.path = removeDotSegments(relative.path || "");
          target.query = relative.query;
        } else {
          if (!relative.path) {
            target.path = base.path;
            if (relative.query !== void 0) {
              target.query = relative.query;
            } else {
              target.query = base.query;
            }
          } else {
            if (relative.path[0] === "/") {
              target.path = removeDotSegments(relative.path);
            } else {
              const baseHasAuthority = base.userinfo !== void 0 || base.host !== void 0 || base.port !== void 0;
              if (baseHasAuthority && !base.path) {
                target.path = "/" + relative.path;
              } else if (!base.path) {
                target.path = relative.path;
              } else {
                target.path = base.path.slice(0, base.path.lastIndexOf("/") + 1) + relative.path;
              }
              target.path = base.scheme === void 0 && !baseHasAuthority && target.path[0] !== "/" ? removeDotSegmentsRelative(target.path) : removeDotSegments(target.path);
            }
            target.query = relative.query;
          }
          target.userinfo = base.userinfo;
          target.host = base.host;
          target.port = base.port;
        }
        target.scheme = base.scheme;
      }
      target.fragment = relative.fragment;
      return target;
    }
    function equal(uriA, uriB, options) {
      const normalizedA = normalizeComparableURI(uriA, options);
      const normalizedB = normalizeComparableURI(uriB, options);
      return normalizedA !== void 0 && normalizedB !== void 0 && normalizedA === normalizedB;
    }
    function serialize(cmpts, opts) {
      const component = {
        host: cmpts.host,
        scheme: cmpts.scheme,
        userinfo: cmpts.userinfo,
        port: cmpts.port,
        path: cmpts.path,
        query: cmpts.query,
        nid: cmpts.nid,
        nss: cmpts.nss,
        uuid: cmpts.uuid,
        fragment: cmpts.fragment,
        reference: cmpts.reference,
        resourceName: cmpts.resourceName,
        secure: cmpts.secure,
        error: ""
      };
      const options = Object.assign({}, opts);
      const uriTokens = [];
      if (component.scheme) {
        component.scheme = validateScheme(component.scheme);
      }
      const schemeHandler = getSchemeHandler(options.scheme || component.scheme);
      if (schemeHandler && schemeHandler.serialize) schemeHandler.serialize(component, options);
      const hasAuthority = component.userinfo !== void 0 || component.host !== void 0 || component.port !== void 0;
      const schemelessReference = (component.scheme === void 0 || options.reference === "suffix") && !hasAuthority;
      const pathNoScheme = !options.skipEscape && schemelessReference;
      if (component.path !== void 0) {
        if (!options.skipEscape) {
          component.path = serializePathEncoding(component.path, pathNoScheme);
        } else {
          component.path = normalizePercentEncoding(component.path);
        }
      }
      if (options.reference !== "suffix" && component.scheme) {
        component.scheme = validateScheme(component.scheme);
        uriTokens.push(component.scheme, ":");
      }
      const authority = recomposeAuthority(component);
      if (authority !== void 0) {
        if (options.reference !== "suffix") {
          uriTokens.push("//");
        }
        uriTokens.push(authority);
        if (component.path && component.path[0] !== "/") {
          uriTokens.push("/");
        }
      }
      if (component.path !== void 0) {
        let s = component.path;
        if (!options.absolutePath && (!schemeHandler || !schemeHandler.absolutePath)) {
          s = schemelessReference && s[0] !== "/" ? removeDotSegmentsRelative(s) : removeDotSegments(s);
        }
        if (schemelessReference) {
          s = serializePathEncoding(s, true);
        }
        if (authority === void 0 && s[0] === "/" && s[1] === "/") {
          s = "/%2F" + s.slice(2);
        }
        uriTokens.push(s);
      }
      if (component.query !== void 0) {
        uriTokens.push("?", encodeQuery(component.query));
      }
      if (component.fragment !== void 0) {
        uriTokens.push("#", encodeFragment(component.fragment));
      }
      return uriTokens.join("");
    }
    var URI_PARSE = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
    var AUTHORITY_PREFIX = /^(?:[^#/:?]+:)?\/\/([^/?#]*)/;
    var AUTHORITY_INTRODUCER_REGION = /^(?:[^#/:?]+:)?([/\\\t\n\r]*)/;
    function getParseError(parsed, matches) {
      if (matches[2] !== void 0 && parsed.path && parsed.path[0] !== "/") {
        return 'URI path must start with "/" when authority is present.';
      }
      if (typeof parsed.port === "number" && (parsed.port < 0 || parsed.port > 65535)) {
        return "URI port is malformed.";
      }
      return void 0;
    }
    function hasMalformedPercentEncoding(component) {
      if (component === void 0) return false;
      let percent2 = component.indexOf("%");
      while (percent2 !== -1) {
        if (percent2 + 2 >= component.length || !/^[\da-f]{2}$/iu.test(component.slice(percent2 + 1, percent2 + 3))) {
          return true;
        }
        percent2 = component.indexOf("%", percent2 + 3);
      }
      return false;
    }
    function isIPLiteral(host) {
      return host[0] === "[" && host[host.length - 1] === "]";
    }
    function hasMalformedComponentPercentEncoding(matches) {
      const host = matches[4];
      return hasMalformedPercentEncoding(matches[3]) || host !== void 0 && !isIPLiteral(host) && hasMalformedPercentEncoding(host) || hasMalformedPercentEncoding(matches[6]) || hasMalformedPercentEncoding(matches[7]) || hasMalformedPercentEncoding(matches[8]);
    }
    function canonicalizeHost(parsed, options, schemeHandler, isIP2) {
      if (hasForbiddenDomainHost(parsed, options, schemeHandler, isIP2)) {
        parsed.error = parsed.error || MALFORMED_HOST_ERROR;
        return true;
      }
      if (!options.unicodeSupport && (!schemeHandler || !schemeHandler.unicodeSupport) && parsed.host && !isIPLiteral(parsed.host) && (options.domainHost || schemeHandler && schemeHandler.domainHost) && isIP2 === false && nonSimpleDomain(parsed.host)) {
        let url;
        try {
          url = new URL("http://" + parsed.host);
        } catch (e) {
          parsed.error = parsed.error || "Host's domain name can not be converted to ASCII: " + e;
          return true;
        }
        if (!isHostOnlyURL(url)) {
          parsed.error = parsed.error || MALFORMED_HOST_ERROR;
          return true;
        }
        parsed.host = url.hostname;
      }
      return false;
    }
    function hasForbiddenDomainHost(parsed, options, schemeHandler, isIP2) {
      return Boolean(
        parsed.host && isIP2 === false && !isIPLiteral(parsed.host) && (options.domainHost || schemeHandler && schemeHandler.domainHost) && FORBIDDEN_DOMAIN_HOST_CHARACTER.test(parsed.host)
      );
    }
    function isHostOnlyURL(url) {
      return url.username === "" && url.password === "" && url.port === "" && url.pathname === "/" && url.search === "" && url.hash === "" && url.hostname !== "";
    }
    function parseWithStatus(uri, opts) {
      const options = Object.assign({}, opts);
      const parsed = {
        scheme: void 0,
        userinfo: void 0,
        host: "",
        port: void 0,
        path: "",
        query: void 0,
        fragment: void 0
      };
      let malformedAuthorityOrPort = false;
      let malformedPercentEncoding = false;
      let malformedSchemeSpecific = false;
      let malformedHost = false;
      let malformedIPLiteral = false;
      let malformedScheme = false;
      let isIP2 = false;
      if (options.reference === "suffix") {
        if (options.scheme) {
          uri = options.scheme + ":" + uri;
        } else {
          uri = "//" + uri;
        }
      }
      const authorityMatch = uri.match(AUTHORITY_PREFIX);
      if (authorityMatch !== null && authorityMatch[1].indexOf("\\") !== -1) {
        parsed.error = "URI authority must not contain a literal backslash.";
        malformedAuthorityOrPort = true;
      }
      const introducerMatch = uri.match(AUTHORITY_INTRODUCER_REGION);
      if (introducerMatch !== null) {
        const region = introducerMatch[1];
        const normalizedRegion = region.replace(/[\t\n\r]/g, "");
        if (normalizedRegion.length >= 2) {
          if (normalizedRegion.slice(0, 2) !== "//") {
            parsed.error = parsed.error || "URI authority must not contain a literal backslash.";
            malformedAuthorityOrPort = true;
          } else if (region.length !== normalizedRegion.length) {
            parsed.error = parsed.error || "URI authority introducer must not contain whitespace.";
            malformedAuthorityOrPort = true;
          }
        }
      }
      const matches = uri.match(URI_PARSE);
      if (matches) {
        parsed.scheme = matches[1];
        parsed.userinfo = matches[3];
        parsed.host = matches[4];
        parsed.port = parseInt(matches[5], 10);
        parsed.path = matches[6] || "";
        parsed.query = matches[7];
        parsed.fragment = matches[8];
        if (parsed.scheme !== void 0) {
          if (VALID_SCHEME.test(parsed.scheme)) {
            parsed.scheme = parsed.scheme.toLowerCase();
          } else {
            parsed.error = parsed.error || MALFORMED_SCHEME_ERROR;
            malformedScheme = true;
          }
        }
        malformedPercentEncoding = hasMalformedComponentPercentEncoding(matches);
        if (malformedPercentEncoding) {
          parsed.error = parsed.error || "URI contains malformed percent-encoding.";
        }
        if (isNaN(parsed.port)) {
          parsed.port = matches[5];
        }
        const parseError = getParseError(parsed, matches);
        if (parseError !== void 0) {
          parsed.error = parsed.error || parseError;
          malformedAuthorityOrPort = true;
        }
        if (parsed.host) {
          const ipv4result = isIPv4(parsed.host);
          if (ipv4result === false) {
            const bracketedIPLiteral = isIPLiteral(parsed.host);
            const hasIPLiteralBracket = parsed.host.indexOf("[") !== -1 || parsed.host.indexOf("]") !== -1;
            const ipv6result = normalizeIPv6(parsed.host);
            isIP2 = ipv6result.isIPV6 || ipv6result.isIPVFuture === true;
            malformedIPLiteral = hasIPLiteralBracket && (!bracketedIPLiteral || ipv6result.error === true);
            parsed.host = isIP2 ? ipv6result.host : ipv6result.host.toLowerCase();
            if (malformedIPLiteral) {
              parsed.error = parsed.error || MALFORMED_HOST_ERROR;
              malformedAuthorityOrPort = true;
            }
          } else {
            isIP2 = true;
          }
        }
        if (parsed.scheme === void 0 && parsed.userinfo === void 0 && parsed.host === void 0 && parsed.port === void 0 && parsed.query === void 0 && !parsed.path) {
          parsed.reference = "same-document";
        } else if (parsed.scheme === void 0) {
          parsed.reference = "relative";
        } else if (parsed.fragment === void 0) {
          parsed.reference = "absolute";
        } else {
          parsed.reference = "uri";
        }
        if (options.reference && options.reference !== "suffix" && options.reference !== parsed.reference) {
          parsed.error = parsed.error || "URI is not a " + options.reference + " reference.";
        }
        const schemeHandler = getSchemeHandler(options.scheme || parsed.scheme);
        if (!malformedIPLiteral) {
          malformedHost = canonicalizeHost(parsed, options, schemeHandler, isIP2);
        }
        if (uri.indexOf("%") !== -1 && parsed.host !== void 0 && !malformedIPLiteral) {
          let host = isIP2 ? parsed.host : normalizePercentEncoding(parsed.host, true);
          if (!isIP2) {
            host = normalizePercentEncoding(host.toLowerCase());
          }
          parsed.host = isIP2 || options.scheme !== "null" ? reescapeHostDelimiters(host, isIP2) : host;
        }
        if (!schemeHandler || schemeHandler && !schemeHandler.skipNormalize) {
          if (parsed.path) {
            parsed.path = normalizePathEncoding(parsed.path);
          }
          if (parsed.query) {
            parsed.query = normalizeQueryFragmentEncoding(parsed.query);
          }
          if (parsed.fragment) {
            parsed.fragment = normalizeQueryFragmentEncoding(parsed.fragment);
          }
        }
        if (schemeHandler && schemeHandler.parse) {
          schemeHandler.parse(parsed, options);
          if (schemeHandler === SCHEMES.urn && parsed.nid === void 0) {
            malformedSchemeSpecific = true;
          }
        }
      } else {
        parsed.error = parsed.error || "URI can not be parsed.";
      }
      return { parsed, malformedAuthorityOrPort, malformedPercentEncoding, malformedSchemeSpecific, malformedHost, malformedScheme };
    }
    function parse(uri, opts) {
      return parseWithStatus(uri, opts).parsed;
    }
    function normalizeString(uri, opts) {
      return normalizeStringWithStatus(uri, opts).normalized;
    }
    function normalizeStringWithStatus(uri, opts) {
      const { parsed, malformedAuthorityOrPort, malformedPercentEncoding, malformedSchemeSpecific, malformedHost, malformedScheme } = parseWithStatus(uri, opts);
      return {
        normalized: malformedAuthorityOrPort || malformedPercentEncoding || malformedSchemeSpecific || malformedHost || malformedScheme ? uri : serialize(parsed, opts),
        malformedAuthorityOrPort,
        malformedPercentEncoding,
        malformedSchemeSpecific,
        malformedHost,
        malformedScheme
      };
    }
    function normalizeComparableURI(uri, opts) {
      if (typeof uri !== "string" && typeof uri !== "object") {
        return void 0;
      }
      let value;
      try {
        value = typeof uri === "string" ? uri : serialize(uri, opts);
      } catch {
        return void 0;
      }
      const { normalized, malformedAuthorityOrPort, malformedPercentEncoding, malformedSchemeSpecific, malformedHost, malformedScheme } = normalizeStringWithStatus(value, opts);
      return malformedAuthorityOrPort || malformedPercentEncoding || malformedSchemeSpecific || malformedHost || malformedScheme ? void 0 : normalized;
    }
    var fastUri = {
      SCHEMES,
      normalize,
      resolve,
      resolveComponent,
      equal,
      serialize,
      parse
    };
    module.exports = fastUri;
    module.exports.default = fastUri;
    module.exports.fastUri = fastUri;
  }
});

// node_modules/ajv/dist/runtime/uri.js
var require_uri = __commonJS({
  "node_modules/ajv/dist/runtime/uri.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var uri = require_fast_uri();
    uri.code = 'require("ajv/dist/runtime/uri").default';
    exports.default = uri;
  }
});

// node_modules/ajv/dist/core.js
var require_core = __commonJS({
  "node_modules/ajv/dist/core.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = void 0;
    var validate_1 = require_validate();
    Object.defineProperty(exports, "KeywordCxt", { enumerable: true, get: function() {
      return validate_1.KeywordCxt;
    } });
    var codegen_1 = require_codegen();
    Object.defineProperty(exports, "_", { enumerable: true, get: function() {
      return codegen_1._;
    } });
    Object.defineProperty(exports, "str", { enumerable: true, get: function() {
      return codegen_1.str;
    } });
    Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
      return codegen_1.stringify;
    } });
    Object.defineProperty(exports, "nil", { enumerable: true, get: function() {
      return codegen_1.nil;
    } });
    Object.defineProperty(exports, "Name", { enumerable: true, get: function() {
      return codegen_1.Name;
    } });
    Object.defineProperty(exports, "CodeGen", { enumerable: true, get: function() {
      return codegen_1.CodeGen;
    } });
    var validation_error_1 = require_validation_error();
    var ref_error_1 = require_ref_error();
    var rules_1 = require_rules();
    var compile_1 = require_compile();
    var codegen_2 = require_codegen();
    var resolve_1 = require_resolve();
    var dataType_1 = require_dataType();
    var util_1 = require_util();
    var $dataRefSchema = require_data();
    var uri_1 = require_uri();
    var defaultRegExp = (str, flags) => new RegExp(str, flags);
    defaultRegExp.code = "new RegExp";
    var META_IGNORE_OPTIONS = ["removeAdditional", "useDefaults", "coerceTypes"];
    var EXT_SCOPE_NAMES = /* @__PURE__ */ new Set([
      "validate",
      "serialize",
      "parse",
      "wrapper",
      "root",
      "schema",
      "keyword",
      "pattern",
      "formats",
      "validate$data",
      "func",
      "obj",
      "Error"
    ]);
    var removedOptions = {
      errorDataPath: "",
      format: "`validateFormats: false` can be used instead.",
      nullable: '"nullable" keyword is supported by default.',
      jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
      extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
      missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
      processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
      sourceCode: "Use option `code: {source: true}`",
      strictDefaults: "It is default now, see option `strict`.",
      strictKeywords: "It is default now, see option `strict`.",
      uniqueItems: '"uniqueItems" keyword is always validated.',
      unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
      cache: "Map is used as cache, schema object as key.",
      serialize: "Map is used as cache, schema object as key.",
      ajvErrors: "It is default now."
    };
    var deprecatedOptions = {
      ignoreKeywordsWithRef: "",
      jsPropertySyntax: "",
      unicode: '"minLength"/"maxLength" account for unicode characters by default.'
    };
    var MAX_EXPRESSION = 200;
    function requiredOptions(o) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
      const s = o.strict;
      const _optz = (_a = o.code) === null || _a === void 0 ? void 0 : _a.optimize;
      const optimize = _optz === true || _optz === void 0 ? 1 : _optz || 0;
      const regExp = (_c = (_b = o.code) === null || _b === void 0 ? void 0 : _b.regExp) !== null && _c !== void 0 ? _c : defaultRegExp;
      const uriResolver = (_d = o.uriResolver) !== null && _d !== void 0 ? _d : uri_1.default;
      return {
        strictSchema: (_f = (_e = o.strictSchema) !== null && _e !== void 0 ? _e : s) !== null && _f !== void 0 ? _f : true,
        strictNumbers: (_h = (_g = o.strictNumbers) !== null && _g !== void 0 ? _g : s) !== null && _h !== void 0 ? _h : true,
        strictTypes: (_k = (_j = o.strictTypes) !== null && _j !== void 0 ? _j : s) !== null && _k !== void 0 ? _k : "log",
        strictTuples: (_m = (_l = o.strictTuples) !== null && _l !== void 0 ? _l : s) !== null && _m !== void 0 ? _m : "log",
        strictRequired: (_p = (_o = o.strictRequired) !== null && _o !== void 0 ? _o : s) !== null && _p !== void 0 ? _p : false,
        code: o.code ? { ...o.code, optimize, regExp } : { optimize, regExp },
        loopRequired: (_q = o.loopRequired) !== null && _q !== void 0 ? _q : MAX_EXPRESSION,
        loopEnum: (_r = o.loopEnum) !== null && _r !== void 0 ? _r : MAX_EXPRESSION,
        meta: (_s = o.meta) !== null && _s !== void 0 ? _s : true,
        messages: (_t = o.messages) !== null && _t !== void 0 ? _t : true,
        inlineRefs: (_u = o.inlineRefs) !== null && _u !== void 0 ? _u : true,
        schemaId: (_v = o.schemaId) !== null && _v !== void 0 ? _v : "$id",
        addUsedSchema: (_w = o.addUsedSchema) !== null && _w !== void 0 ? _w : true,
        validateSchema: (_x = o.validateSchema) !== null && _x !== void 0 ? _x : true,
        validateFormats: (_y = o.validateFormats) !== null && _y !== void 0 ? _y : true,
        unicodeRegExp: (_z = o.unicodeRegExp) !== null && _z !== void 0 ? _z : true,
        int32range: (_0 = o.int32range) !== null && _0 !== void 0 ? _0 : true,
        uriResolver
      };
    }
    var Ajv2 = class {
      constructor(opts = {}) {
        this.schemas = {};
        this.refs = {};
        this.formats = /* @__PURE__ */ Object.create(null);
        this._compilations = /* @__PURE__ */ new Set();
        this._loading = {};
        this._cache = /* @__PURE__ */ new Map();
        opts = this.opts = { ...opts, ...requiredOptions(opts) };
        const { es5, lines } = this.opts.code;
        this.scope = new codegen_2.ValueScope({ scope: {}, prefixes: EXT_SCOPE_NAMES, es5, lines });
        this.logger = getLogger(opts.logger);
        const formatOpt = opts.validateFormats;
        opts.validateFormats = false;
        this.RULES = (0, rules_1.getRules)();
        checkOptions.call(this, removedOptions, opts, "NOT SUPPORTED");
        checkOptions.call(this, deprecatedOptions, opts, "DEPRECATED", "warn");
        this._metaOpts = getMetaSchemaOptions.call(this);
        if (opts.formats)
          addInitialFormats.call(this);
        this._addVocabularies();
        this._addDefaultMetaSchema();
        if (opts.keywords)
          addInitialKeywords.call(this, opts.keywords);
        if (typeof opts.meta == "object")
          this.addMetaSchema(opts.meta);
        addInitialSchemas.call(this);
        opts.validateFormats = formatOpt;
      }
      _addVocabularies() {
        this.addKeyword("$async");
      }
      _addDefaultMetaSchema() {
        const { $data, meta, schemaId } = this.opts;
        let _dataRefSchema = $dataRefSchema;
        if (schemaId === "id") {
          _dataRefSchema = { ...$dataRefSchema };
          _dataRefSchema.id = _dataRefSchema.$id;
          delete _dataRefSchema.$id;
        }
        if (meta && $data)
          this.addMetaSchema(_dataRefSchema, _dataRefSchema[schemaId], false);
      }
      defaultMeta() {
        const { meta, schemaId } = this.opts;
        return this.opts.defaultMeta = typeof meta == "object" ? meta[schemaId] || meta : void 0;
      }
      validate(schemaKeyRef, data) {
        let v;
        if (typeof schemaKeyRef == "string") {
          v = this.getSchema(schemaKeyRef);
          if (!v)
            throw new Error(`no schema with key or ref "${schemaKeyRef}"`);
        } else {
          v = this.compile(schemaKeyRef);
        }
        const valid = v(data);
        if (!("$async" in v))
          this.errors = v.errors;
        return valid;
      }
      compile(schema, _meta) {
        const sch = this._addSchema(schema, _meta);
        return sch.validate || this._compileSchemaEnv(sch);
      }
      compileAsync(schema, meta) {
        if (typeof this.opts.loadSchema != "function") {
          throw new Error("options.loadSchema should be a function");
        }
        const { loadSchema } = this.opts;
        return runCompileAsync.call(this, schema, meta);
        async function runCompileAsync(_schema, _meta) {
          await loadMetaSchema.call(this, _schema.$schema);
          const sch = this._addSchema(_schema, _meta);
          return sch.validate || _compileAsync.call(this, sch);
        }
        async function loadMetaSchema($ref) {
          if ($ref && !this.getSchema($ref)) {
            await runCompileAsync.call(this, { $ref }, true);
          }
        }
        async function _compileAsync(sch) {
          try {
            return this._compileSchemaEnv(sch);
          } catch (e) {
            if (!(e instanceof ref_error_1.default))
              throw e;
            checkLoaded.call(this, e);
            await loadMissingSchema.call(this, e.missingSchema);
            return _compileAsync.call(this, sch);
          }
        }
        function checkLoaded({ missingSchema: ref, missingRef }) {
          if (this.refs[ref]) {
            throw new Error(`AnySchema ${ref} is loaded but ${missingRef} cannot be resolved`);
          }
        }
        async function loadMissingSchema(ref) {
          const _schema = await _loadSchema.call(this, ref);
          if (!this.refs[ref])
            await loadMetaSchema.call(this, _schema.$schema);
          if (!this.refs[ref])
            this.addSchema(_schema, ref, meta);
        }
        async function _loadSchema(ref) {
          const p = this._loading[ref];
          if (p)
            return p;
          try {
            return await (this._loading[ref] = loadSchema(ref));
          } finally {
            delete this._loading[ref];
          }
        }
      }
      // Adds schema to the instance
      addSchema(schema, key, _meta, _validateSchema = this.opts.validateSchema) {
        if (Array.isArray(schema)) {
          for (const sch of schema)
            this.addSchema(sch, void 0, _meta, _validateSchema);
          return this;
        }
        let id2;
        if (typeof schema === "object") {
          const { schemaId } = this.opts;
          id2 = schema[schemaId];
          if (id2 !== void 0 && typeof id2 != "string") {
            throw new Error(`schema ${schemaId} must be string`);
          }
        }
        key = (0, resolve_1.normalizeId)(key || id2);
        this._checkUnique(key);
        this.schemas[key] = this._addSchema(schema, _meta, key, _validateSchema, true);
        return this;
      }
      // Add schema that will be used to validate other schemas
      // options in META_IGNORE_OPTIONS are alway set to false
      addMetaSchema(schema, key, _validateSchema = this.opts.validateSchema) {
        this.addSchema(schema, key, true, _validateSchema);
        return this;
      }
      //  Validate schema against its meta-schema
      validateSchema(schema, throwOrLogError) {
        if (typeof schema == "boolean")
          return true;
        let $schema;
        $schema = schema.$schema;
        if ($schema !== void 0 && typeof $schema != "string") {
          throw new Error("$schema must be a string");
        }
        $schema = $schema || this.opts.defaultMeta || this.defaultMeta();
        if (!$schema) {
          this.logger.warn("meta-schema not available");
          this.errors = null;
          return true;
        }
        const valid = this.validate($schema, schema);
        if (!valid && throwOrLogError) {
          const message = "schema is invalid: " + this.errorsText();
          if (this.opts.validateSchema === "log")
            this.logger.error(message);
          else
            throw new Error(message);
        }
        return valid;
      }
      // Get compiled schema by `key` or `ref`.
      // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
      getSchema(keyRef) {
        let sch;
        while (typeof (sch = getSchEnv.call(this, keyRef)) == "string")
          keyRef = sch;
        if (sch === void 0) {
          const { schemaId } = this.opts;
          const root = new compile_1.SchemaEnv({ schema: {}, schemaId });
          sch = compile_1.resolveSchema.call(this, root, keyRef);
          if (!sch)
            return;
          this.refs[keyRef] = sch;
        }
        return sch.validate || this._compileSchemaEnv(sch);
      }
      // Remove cached schema(s).
      // If no parameter is passed all schemas but meta-schemas are removed.
      // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
      // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
      removeSchema(schemaKeyRef) {
        if (schemaKeyRef instanceof RegExp) {
          this._removeAllSchemas(this.schemas, schemaKeyRef);
          this._removeAllSchemas(this.refs, schemaKeyRef);
          return this;
        }
        switch (typeof schemaKeyRef) {
          case "undefined":
            this._removeAllSchemas(this.schemas);
            this._removeAllSchemas(this.refs);
            this._cache.clear();
            return this;
          case "string": {
            const sch = getSchEnv.call(this, schemaKeyRef);
            if (typeof sch == "object")
              this._cache.delete(sch.schema);
            delete this.schemas[schemaKeyRef];
            delete this.refs[schemaKeyRef];
            return this;
          }
          case "object": {
            const cacheKey = schemaKeyRef;
            this._cache.delete(cacheKey);
            let id2 = schemaKeyRef[this.opts.schemaId];
            if (id2) {
              id2 = (0, resolve_1.normalizeId)(id2);
              delete this.schemas[id2];
              delete this.refs[id2];
            }
            return this;
          }
          default:
            throw new Error("ajv.removeSchema: invalid parameter");
        }
      }
      // add "vocabulary" - a collection of keywords
      addVocabulary(definitions) {
        for (const def of definitions)
          this.addKeyword(def);
        return this;
      }
      addKeyword(kwdOrDef, def) {
        let keyword;
        if (typeof kwdOrDef == "string") {
          keyword = kwdOrDef;
          if (typeof def == "object") {
            this.logger.warn("these parameters are deprecated, see docs for addKeyword");
            def.keyword = keyword;
          }
        } else if (typeof kwdOrDef == "object" && def === void 0) {
          def = kwdOrDef;
          keyword = def.keyword;
          if (Array.isArray(keyword) && !keyword.length) {
            throw new Error("addKeywords: keyword must be string or non-empty array");
          }
        } else {
          throw new Error("invalid addKeywords parameters");
        }
        checkKeyword.call(this, keyword, def);
        if (!def) {
          (0, util_1.eachItem)(keyword, (kwd) => addRule.call(this, kwd));
          return this;
        }
        keywordMetaschema.call(this, def);
        const definition = {
          ...def,
          type: (0, dataType_1.getJSONTypes)(def.type),
          schemaType: (0, dataType_1.getJSONTypes)(def.schemaType)
        };
        (0, util_1.eachItem)(keyword, definition.type.length === 0 ? (k) => addRule.call(this, k, definition) : (k) => definition.type.forEach((t) => addRule.call(this, k, definition, t)));
        return this;
      }
      getKeyword(keyword) {
        const rule = this.RULES.all[keyword];
        return typeof rule == "object" ? rule.definition : !!rule;
      }
      // Remove keyword
      removeKeyword(keyword) {
        const { RULES } = this;
        delete RULES.keywords[keyword];
        delete RULES.all[keyword];
        for (const group of RULES.rules) {
          const i = group.rules.findIndex((rule) => rule.keyword === keyword);
          if (i >= 0)
            group.rules.splice(i, 1);
        }
        return this;
      }
      // Add format
      addFormat(name, format) {
        if (typeof format == "string")
          format = new RegExp(format);
        this.formats[name] = format;
        return this;
      }
      errorsText(errors = this.errors, { separator = ", ", dataVar = "data" } = {}) {
        if (!errors || errors.length === 0)
          return "No errors";
        return errors.map((e) => `${dataVar}${e.instancePath} ${e.message}`).reduce((text3, msg) => text3 + separator + msg);
      }
      $dataMetaSchema(metaSchema, keywordsJsonPointers) {
        const rules = this.RULES.all;
        metaSchema = JSON.parse(JSON.stringify(metaSchema));
        for (const jsonPointer of keywordsJsonPointers) {
          const segments = jsonPointer.split("/").slice(1);
          let keywords = metaSchema;
          for (const seg of segments)
            keywords = keywords[seg];
          for (const key in rules) {
            const rule = rules[key];
            if (typeof rule != "object")
              continue;
            const { $data } = rule.definition;
            const schema = keywords[key];
            if ($data && schema)
              keywords[key] = schemaOrData(schema);
          }
        }
        return metaSchema;
      }
      _removeAllSchemas(schemas, regex) {
        for (const keyRef in schemas) {
          const sch = schemas[keyRef];
          if (!regex || regex.test(keyRef)) {
            if (typeof sch == "string") {
              delete schemas[keyRef];
            } else if (sch && !sch.meta) {
              this._cache.delete(sch.schema);
              delete schemas[keyRef];
            }
          }
        }
      }
      _addSchema(schema, meta, baseId, validateSchema = this.opts.validateSchema, addSchema = this.opts.addUsedSchema) {
        let id2;
        const { schemaId } = this.opts;
        if (typeof schema == "object") {
          id2 = schema[schemaId];
        } else {
          if (this.opts.jtd)
            throw new Error("schema must be object");
          else if (typeof schema != "boolean")
            throw new Error("schema must be object or boolean");
        }
        let sch = this._cache.get(schema);
        if (sch !== void 0)
          return sch;
        baseId = (0, resolve_1.normalizeId)(id2 || baseId);
        const localRefs = resolve_1.getSchemaRefs.call(this, schema, baseId);
        sch = new compile_1.SchemaEnv({ schema, schemaId, meta, baseId, localRefs });
        this._cache.set(sch.schema, sch);
        if (addSchema && !baseId.startsWith("#")) {
          if (baseId)
            this._checkUnique(baseId);
          this.refs[baseId] = sch;
        }
        if (validateSchema)
          this.validateSchema(schema, true);
        return sch;
      }
      _checkUnique(id2) {
        if (this.schemas[id2] || this.refs[id2]) {
          throw new Error(`schema with key or id "${id2}" already exists`);
        }
      }
      _compileSchemaEnv(sch) {
        if (sch.meta)
          this._compileMetaSchema(sch);
        else
          compile_1.compileSchema.call(this, sch);
        if (!sch.validate)
          throw new Error("ajv implementation error");
        return sch.validate;
      }
      _compileMetaSchema(sch) {
        const currentOpts = this.opts;
        this.opts = this._metaOpts;
        try {
          compile_1.compileSchema.call(this, sch);
        } finally {
          this.opts = currentOpts;
        }
      }
    };
    Ajv2.ValidationError = validation_error_1.default;
    Ajv2.MissingRefError = ref_error_1.default;
    exports.default = Ajv2;
    function checkOptions(checkOpts, options, msg, log = "error") {
      for (const key in checkOpts) {
        const opt = key;
        if (opt in options)
          this.logger[log](`${msg}: option ${key}. ${checkOpts[opt]}`);
      }
    }
    function getSchEnv(keyRef) {
      keyRef = (0, resolve_1.normalizeId)(keyRef);
      return this.schemas[keyRef] || this.refs[keyRef];
    }
    function addInitialSchemas() {
      const optsSchemas = this.opts.schemas;
      if (!optsSchemas)
        return;
      if (Array.isArray(optsSchemas))
        this.addSchema(optsSchemas);
      else
        for (const key in optsSchemas)
          this.addSchema(optsSchemas[key], key);
    }
    function addInitialFormats() {
      for (const name in this.opts.formats) {
        const format = this.opts.formats[name];
        if (format)
          this.addFormat(name, format);
      }
    }
    function addInitialKeywords(defs) {
      if (Array.isArray(defs)) {
        this.addVocabulary(defs);
        return;
      }
      this.logger.warn("keywords option as map is deprecated, pass array");
      for (const keyword in defs) {
        const def = defs[keyword];
        if (!def.keyword)
          def.keyword = keyword;
        this.addKeyword(def);
      }
    }
    function getMetaSchemaOptions() {
      const metaOpts = { ...this.opts };
      for (const opt of META_IGNORE_OPTIONS)
        delete metaOpts[opt];
      return metaOpts;
    }
    var noLogs = { log() {
    }, warn() {
    }, error() {
    } };
    function getLogger(logger) {
      if (logger === false)
        return noLogs;
      if (logger === void 0)
        return console;
      if (logger.log && logger.warn && logger.error)
        return logger;
      throw new Error("logger must implement log, warn and error methods");
    }
    var KEYWORD_NAME = /^[a-z_$][a-z0-9_$:-]*$/i;
    function checkKeyword(keyword, def) {
      const { RULES } = this;
      (0, util_1.eachItem)(keyword, (kwd) => {
        if (RULES.keywords[kwd])
          throw new Error(`Keyword ${kwd} is already defined`);
        if (!KEYWORD_NAME.test(kwd))
          throw new Error(`Keyword ${kwd} has invalid name`);
      });
      if (!def)
        return;
      if (def.$data && !("code" in def || "validate" in def)) {
        throw new Error('$data keyword must have "code" or "validate" function');
      }
    }
    function addRule(keyword, definition, dataType) {
      var _a;
      const post = definition === null || definition === void 0 ? void 0 : definition.post;
      if (dataType && post)
        throw new Error('keyword with "post" flag cannot have "type"');
      const { RULES } = this;
      let ruleGroup = post ? RULES.post : RULES.rules.find(({ type: t }) => t === dataType);
      if (!ruleGroup) {
        ruleGroup = { type: dataType, rules: [] };
        RULES.rules.push(ruleGroup);
      }
      RULES.keywords[keyword] = true;
      if (!definition)
        return;
      const rule = {
        keyword,
        definition: {
          ...definition,
          type: (0, dataType_1.getJSONTypes)(definition.type),
          schemaType: (0, dataType_1.getJSONTypes)(definition.schemaType)
        }
      };
      if (definition.before)
        addBeforeRule.call(this, ruleGroup, rule, definition.before);
      else
        ruleGroup.rules.push(rule);
      RULES.all[keyword] = rule;
      (_a = definition.implements) === null || _a === void 0 ? void 0 : _a.forEach((kwd) => this.addKeyword(kwd));
    }
    function addBeforeRule(ruleGroup, rule, before) {
      const i = ruleGroup.rules.findIndex((_rule) => _rule.keyword === before);
      if (i >= 0) {
        ruleGroup.rules.splice(i, 0, rule);
      } else {
        ruleGroup.rules.push(rule);
        this.logger.warn(`rule ${before} is not defined`);
      }
    }
    function keywordMetaschema(def) {
      let { metaSchema } = def;
      if (metaSchema === void 0)
        return;
      if (def.$data && this.opts.$data)
        metaSchema = schemaOrData(metaSchema);
      def.validateSchema = this.compile(metaSchema, true);
    }
    var $dataRef = {
      $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
    };
    function schemaOrData(schema) {
      return { anyOf: [schema, $dataRef] };
    }
  }
});

// node_modules/ajv/dist/vocabularies/core/id.js
var require_id = __commonJS({
  "node_modules/ajv/dist/vocabularies/core/id.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var def = {
      keyword: "id",
      code() {
        throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/core/ref.js
var require_ref = __commonJS({
  "node_modules/ajv/dist/vocabularies/core/ref.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.callRef = exports.getValidate = void 0;
    var ref_error_1 = require_ref_error();
    var code_1 = require_code2();
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var compile_1 = require_compile();
    var util_1 = require_util();
    var def = {
      keyword: "$ref",
      schemaType: "string",
      code(cxt) {
        const { gen, schema: $ref, it } = cxt;
        const { baseId, schemaEnv: env, validateName, opts, self } = it;
        const { root } = env;
        if (($ref === "#" || $ref === "#/") && baseId === root.baseId)
          return callRootRef();
        const schOrEnv = compile_1.resolveRef.call(self, root, baseId, $ref);
        if (schOrEnv === void 0)
          throw new ref_error_1.default(it.opts.uriResolver, baseId, $ref);
        if (schOrEnv instanceof compile_1.SchemaEnv)
          return callValidate(schOrEnv);
        return inlineRefSchema(schOrEnv);
        function callRootRef() {
          if (env === root)
            return callRef(cxt, validateName, env, env.$async);
          const rootName = gen.scopeValue("root", { ref: root });
          return callRef(cxt, (0, codegen_1._)`${rootName}.validate`, root, root.$async);
        }
        function callValidate(sch) {
          const v = getValidate(cxt, sch);
          callRef(cxt, v, sch, sch.$async);
        }
        function inlineRefSchema(sch) {
          const schName = gen.scopeValue("schema", opts.code.source === true ? { ref: sch, code: (0, codegen_1.stringify)(sch) } : { ref: sch });
          const valid = gen.name("valid");
          const schCxt = cxt.subschema({
            schema: sch,
            dataTypes: [],
            schemaPath: codegen_1.nil,
            topSchemaRef: schName,
            errSchemaPath: $ref
          }, valid);
          cxt.mergeEvaluated(schCxt);
          cxt.ok(valid);
        }
      }
    };
    function getValidate(cxt, sch) {
      const { gen } = cxt;
      return sch.validate ? gen.scopeValue("validate", { ref: sch.validate }) : (0, codegen_1._)`${gen.scopeValue("wrapper", { ref: sch })}.validate`;
    }
    exports.getValidate = getValidate;
    function callRef(cxt, v, sch, $async) {
      const { gen, it } = cxt;
      const { allErrors, schemaEnv: env, opts } = it;
      const passCxt = opts.passContext ? names_1.default.this : codegen_1.nil;
      if ($async)
        callAsyncRef();
      else
        callSyncRef();
      function callAsyncRef() {
        if (!env.$async)
          throw new Error("async schema referenced by sync schema");
        const valid = gen.let("valid");
        gen.try(() => {
          gen.code((0, codegen_1._)`await ${(0, code_1.callValidateCode)(cxt, v, passCxt)}`);
          addEvaluatedFrom(v);
          if (!allErrors)
            gen.assign(valid, true);
        }, (e) => {
          gen.if((0, codegen_1._)`!(${e} instanceof ${it.ValidationError})`, () => gen.throw(e));
          addErrorsFrom(e);
          if (!allErrors)
            gen.assign(valid, false);
        });
        cxt.ok(valid);
      }
      function callSyncRef() {
        cxt.result((0, code_1.callValidateCode)(cxt, v, passCxt), () => addEvaluatedFrom(v), () => addErrorsFrom(v));
      }
      function addErrorsFrom(source) {
        const errs = (0, codegen_1._)`${source}.errors`;
        gen.assign(names_1.default.vErrors, (0, codegen_1._)`${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`);
        gen.assign(names_1.default.errors, (0, codegen_1._)`${names_1.default.vErrors}.length`);
      }
      function addEvaluatedFrom(source) {
        var _a;
        if (!it.opts.unevaluated)
          return;
        const schEvaluated = (_a = sch === null || sch === void 0 ? void 0 : sch.validate) === null || _a === void 0 ? void 0 : _a.evaluated;
        if (it.props !== true) {
          if (schEvaluated && !schEvaluated.dynamicProps) {
            if (schEvaluated.props !== void 0) {
              it.props = util_1.mergeEvaluated.props(gen, schEvaluated.props, it.props);
            }
          } else {
            const props = gen.var("props", (0, codegen_1._)`${source}.evaluated.props`);
            it.props = util_1.mergeEvaluated.props(gen, props, it.props, codegen_1.Name);
          }
        }
        if (it.items !== true) {
          if (schEvaluated && !schEvaluated.dynamicItems) {
            if (schEvaluated.items !== void 0) {
              it.items = util_1.mergeEvaluated.items(gen, schEvaluated.items, it.items);
            }
          } else {
            const items = gen.var("items", (0, codegen_1._)`${source}.evaluated.items`);
            it.items = util_1.mergeEvaluated.items(gen, items, it.items, codegen_1.Name);
          }
        }
      }
    }
    exports.callRef = callRef;
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/core/index.js
var require_core2 = __commonJS({
  "node_modules/ajv/dist/vocabularies/core/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var id_1 = require_id();
    var ref_1 = require_ref();
    var core = [
      "$schema",
      "$id",
      "$defs",
      "$vocabulary",
      { keyword: "$comment" },
      "definitions",
      id_1.default,
      ref_1.default
    ];
    exports.default = core;
  }
});

// node_modules/ajv/dist/vocabularies/validation/limitNumber.js
var require_limitNumber = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/limitNumber.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var ops = codegen_1.operators;
    var KWDs = {
      maximum: { okStr: "<=", ok: ops.LTE, fail: ops.GT },
      minimum: { okStr: ">=", ok: ops.GTE, fail: ops.LT },
      exclusiveMaximum: { okStr: "<", ok: ops.LT, fail: ops.GTE },
      exclusiveMinimum: { okStr: ">", ok: ops.GT, fail: ops.LTE }
    };
    var error = {
      message: ({ keyword, schemaCode }) => (0, codegen_1.str)`must be ${KWDs[keyword].okStr} ${schemaCode}`,
      params: ({ keyword, schemaCode }) => (0, codegen_1._)`{comparison: ${KWDs[keyword].okStr}, limit: ${schemaCode}}`
    };
    var def = {
      keyword: Object.keys(KWDs),
      type: "number",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        cxt.fail$data((0, codegen_1._)`${data} ${KWDs[keyword].fail} ${schemaCode} || isNaN(${data})`);
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/validation/multipleOf.js
var require_multipleOf = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/multipleOf.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var error = {
      message: ({ schemaCode }) => (0, codegen_1.str)`must be multiple of ${schemaCode}`,
      params: ({ schemaCode }) => (0, codegen_1._)`{multipleOf: ${schemaCode}}`
    };
    var def = {
      keyword: "multipleOf",
      type: "number",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const { gen, data, schemaCode, it } = cxt;
        const prec = it.opts.multipleOfPrecision;
        const res = gen.let("res");
        const invalid = prec ? (0, codegen_1._)`Math.abs(Math.round(${res}) - ${res}) > 1e-${prec}` : (0, codegen_1._)`${res} !== parseInt(${res})`;
        cxt.fail$data((0, codegen_1._)`(${schemaCode} === 0 || (${res} = ${data}/${schemaCode}, ${invalid}))`);
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/runtime/ucs2length.js
var require_ucs2length = __commonJS({
  "node_modules/ajv/dist/runtime/ucs2length.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function ucs2length(str) {
      const len = str.length;
      let length = 0;
      let pos = 0;
      let value;
      while (pos < len) {
        length++;
        value = str.charCodeAt(pos++);
        if (value >= 55296 && value <= 56319 && pos < len) {
          value = str.charCodeAt(pos);
          if ((value & 64512) === 56320)
            pos++;
        }
      }
      return length;
    }
    exports.default = ucs2length;
    ucs2length.code = 'require("ajv/dist/runtime/ucs2length").default';
  }
});

// node_modules/ajv/dist/vocabularies/validation/limitLength.js
var require_limitLength = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/limitLength.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var ucs2length_1 = require_ucs2length();
    var error = {
      message({ keyword, schemaCode }) {
        const comp = keyword === "maxLength" ? "more" : "fewer";
        return (0, codegen_1.str)`must NOT have ${comp} than ${schemaCode} characters`;
      },
      params: ({ schemaCode }) => (0, codegen_1._)`{limit: ${schemaCode}}`
    };
    var def = {
      keyword: ["maxLength", "minLength"],
      type: "string",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const { keyword, data, schemaCode, it } = cxt;
        const op = keyword === "maxLength" ? codegen_1.operators.GT : codegen_1.operators.LT;
        const len = it.opts.unicode === false ? (0, codegen_1._)`${data}.length` : (0, codegen_1._)`${(0, util_1.useFunc)(cxt.gen, ucs2length_1.default)}(${data})`;
        cxt.fail$data((0, codegen_1._)`${len} ${op} ${schemaCode}`);
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/validation/pattern.js
var require_pattern = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/pattern.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var code_1 = require_code2();
    var util_1 = require_util();
    var codegen_1 = require_codegen();
    var error = {
      message: ({ schemaCode }) => (0, codegen_1.str)`must match pattern "${schemaCode}"`,
      params: ({ schemaCode }) => (0, codegen_1._)`{pattern: ${schemaCode}}`
    };
    var def = {
      keyword: "pattern",
      type: "string",
      schemaType: "string",
      $data: true,
      error,
      code(cxt) {
        const { gen, data, $data, schema, schemaCode, it } = cxt;
        const u = it.opts.unicodeRegExp ? "u" : "";
        if ($data) {
          const { regExp } = it.opts.code;
          const regExpCode = regExp.code === "new RegExp" ? (0, codegen_1._)`new RegExp` : (0, util_1.useFunc)(gen, regExp);
          const valid = gen.let("valid");
          gen.try(() => gen.assign(valid, (0, codegen_1._)`${regExpCode}(${schemaCode}, ${u}).test(${data})`), () => gen.assign(valid, false));
          cxt.fail$data((0, codegen_1._)`!${valid}`);
        } else {
          const regExp = (0, code_1.usePattern)(cxt, schema);
          cxt.fail$data((0, codegen_1._)`!${regExp}.test(${data})`);
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/validation/limitProperties.js
var require_limitProperties = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/limitProperties.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var error = {
      message({ keyword, schemaCode }) {
        const comp = keyword === "maxProperties" ? "more" : "fewer";
        return (0, codegen_1.str)`must NOT have ${comp} than ${schemaCode} properties`;
      },
      params: ({ schemaCode }) => (0, codegen_1._)`{limit: ${schemaCode}}`
    };
    var def = {
      keyword: ["maxProperties", "minProperties"],
      type: "object",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        const op = keyword === "maxProperties" ? codegen_1.operators.GT : codegen_1.operators.LT;
        cxt.fail$data((0, codegen_1._)`Object.keys(${data}).length ${op} ${schemaCode}`);
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/validation/required.js
var require_required = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/required.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var code_1 = require_code2();
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: ({ params: { missingProperty } }) => (0, codegen_1.str)`must have required property '${missingProperty}'`,
      params: ({ params: { missingProperty } }) => (0, codegen_1._)`{missingProperty: ${missingProperty}}`
    };
    var def = {
      keyword: "required",
      type: "object",
      schemaType: "array",
      $data: true,
      error,
      code(cxt) {
        const { gen, schema, schemaCode, data, $data, it } = cxt;
        const { opts } = it;
        if (!$data && schema.length === 0)
          return;
        const useLoop = schema.length >= opts.loopRequired;
        if (it.allErrors)
          allErrorsMode();
        else
          exitOnErrorMode();
        if (opts.strictRequired) {
          const props = cxt.parentSchema.properties;
          const { definedProperties } = cxt.it;
          for (const requiredKey of schema) {
            if ((props === null || props === void 0 ? void 0 : props[requiredKey]) === void 0 && !definedProperties.has(requiredKey)) {
              const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
              const msg = `required property "${requiredKey}" is not defined at "${schemaPath}" (strictRequired)`;
              (0, util_1.checkStrictMode)(it, msg, it.opts.strictRequired);
            }
          }
        }
        function allErrorsMode() {
          if (useLoop || $data) {
            cxt.block$data(codegen_1.nil, loopAllRequired);
          } else {
            for (const prop of schema) {
              (0, code_1.checkReportMissingProp)(cxt, prop);
            }
          }
        }
        function exitOnErrorMode() {
          const missing = gen.let("missing");
          if (useLoop || $data) {
            const valid = gen.let("valid", true);
            cxt.block$data(valid, () => loopUntilMissing(missing, valid));
            cxt.ok(valid);
          } else {
            gen.if((0, code_1.checkMissingProp)(cxt, schema, missing));
            (0, code_1.reportMissingProp)(cxt, missing);
            gen.else();
          }
        }
        function loopAllRequired() {
          gen.forOf("prop", schemaCode, (prop) => {
            cxt.setParams({ missingProperty: prop });
            gen.if((0, code_1.noPropertyInData)(gen, data, prop, opts.ownProperties), () => cxt.error());
          });
        }
        function loopUntilMissing(missing, valid) {
          cxt.setParams({ missingProperty: missing });
          gen.forOf(missing, schemaCode, () => {
            gen.assign(valid, (0, code_1.propertyInData)(gen, data, missing, opts.ownProperties));
            gen.if((0, codegen_1.not)(valid), () => {
              cxt.error();
              gen.break();
            });
          }, codegen_1.nil);
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/validation/limitItems.js
var require_limitItems = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/limitItems.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var error = {
      message({ keyword, schemaCode }) {
        const comp = keyword === "maxItems" ? "more" : "fewer";
        return (0, codegen_1.str)`must NOT have ${comp} than ${schemaCode} items`;
      },
      params: ({ schemaCode }) => (0, codegen_1._)`{limit: ${schemaCode}}`
    };
    var def = {
      keyword: ["maxItems", "minItems"],
      type: "array",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        const op = keyword === "maxItems" ? codegen_1.operators.GT : codegen_1.operators.LT;
        cxt.fail$data((0, codegen_1._)`${data}.length ${op} ${schemaCode}`);
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/runtime/equal.js
var require_equal = __commonJS({
  "node_modules/ajv/dist/runtime/equal.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var equal = require_fast_deep_equal();
    equal.code = 'require("ajv/dist/runtime/equal").default';
    exports.default = equal;
  }
});

// node_modules/ajv/dist/vocabularies/validation/uniqueItems.js
var require_uniqueItems = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/uniqueItems.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var dataType_1 = require_dataType();
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var equal_1 = require_equal();
    var error = {
      message: ({ params: { i, j } }) => (0, codegen_1.str)`must NOT have duplicate items (items ## ${j} and ${i} are identical)`,
      params: ({ params: { i, j } }) => (0, codegen_1._)`{i: ${i}, j: ${j}}`
    };
    var def = {
      keyword: "uniqueItems",
      type: "array",
      schemaType: "boolean",
      $data: true,
      error,
      code(cxt) {
        const { gen, data, $data, schema, parentSchema, schemaCode, it } = cxt;
        if (!$data && !schema)
          return;
        const valid = gen.let("valid");
        const itemTypes = parentSchema.items ? (0, dataType_1.getSchemaTypes)(parentSchema.items) : [];
        cxt.block$data(valid, validateUniqueItems, (0, codegen_1._)`${schemaCode} === false`);
        cxt.ok(valid);
        function validateUniqueItems() {
          const i = gen.let("i", (0, codegen_1._)`${data}.length`);
          const j = gen.let("j");
          cxt.setParams({ i, j });
          gen.assign(valid, true);
          gen.if((0, codegen_1._)`${i} > 1`, () => (canOptimize() ? loopN : loopN2)(i, j));
        }
        function canOptimize() {
          return itemTypes.length > 0 && !itemTypes.some((t) => t === "object" || t === "array");
        }
        function loopN(i, j) {
          const item = gen.name("item");
          const wrongType = (0, dataType_1.checkDataTypes)(itemTypes, item, it.opts.strictNumbers, dataType_1.DataType.Wrong);
          const indices = gen.const("indices", (0, codegen_1._)`{}`);
          gen.for((0, codegen_1._)`;${i}--;`, () => {
            gen.let(item, (0, codegen_1._)`${data}[${i}]`);
            gen.if(wrongType, (0, codegen_1._)`continue`);
            if (itemTypes.length > 1)
              gen.if((0, codegen_1._)`typeof ${item} == "string"`, (0, codegen_1._)`${item} += "_"`);
            gen.if((0, codegen_1._)`typeof ${indices}[${item}] == "number"`, () => {
              gen.assign(j, (0, codegen_1._)`${indices}[${item}]`);
              cxt.error();
              gen.assign(valid, false).break();
            }).code((0, codegen_1._)`${indices}[${item}] = ${i}`);
          });
        }
        function loopN2(i, j) {
          const eql = (0, util_1.useFunc)(gen, equal_1.default);
          const outer = gen.name("outer");
          gen.label(outer).for((0, codegen_1._)`;${i}--;`, () => gen.for((0, codegen_1._)`${j} = ${i}; ${j}--;`, () => gen.if((0, codegen_1._)`${eql}(${data}[${i}], ${data}[${j}])`, () => {
            cxt.error();
            gen.assign(valid, false).break(outer);
          })));
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/validation/const.js
var require_const = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/const.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var equal_1 = require_equal();
    var error = {
      message: "must be equal to constant",
      params: ({ schemaCode }) => (0, codegen_1._)`{allowedValue: ${schemaCode}}`
    };
    var def = {
      keyword: "const",
      $data: true,
      error,
      code(cxt) {
        const { gen, data, $data, schemaCode, schema } = cxt;
        if ($data || schema && typeof schema == "object") {
          cxt.fail$data((0, codegen_1._)`!${(0, util_1.useFunc)(gen, equal_1.default)}(${data}, ${schemaCode})`);
        } else {
          cxt.fail((0, codegen_1._)`${schema} !== ${data}`);
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/validation/enum.js
var require_enum = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/enum.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var equal_1 = require_equal();
    var error = {
      message: "must be equal to one of the allowed values",
      params: ({ schemaCode }) => (0, codegen_1._)`{allowedValues: ${schemaCode}}`
    };
    var def = {
      keyword: "enum",
      schemaType: "array",
      $data: true,
      error,
      code(cxt) {
        const { gen, data, $data, schema, schemaCode, it } = cxt;
        if (!$data && schema.length === 0)
          throw new Error("enum must have non-empty array");
        const useLoop = schema.length >= it.opts.loopEnum;
        let eql;
        const getEql = () => eql !== null && eql !== void 0 ? eql : eql = (0, util_1.useFunc)(gen, equal_1.default);
        let valid;
        if (useLoop || $data) {
          valid = gen.let("valid");
          cxt.block$data(valid, loopEnum);
        } else {
          if (!Array.isArray(schema))
            throw new Error("ajv implementation error");
          const vSchema = gen.const("vSchema", schemaCode);
          valid = (0, codegen_1.or)(...schema.map((_x, i) => equalCode(vSchema, i)));
        }
        cxt.pass(valid);
        function loopEnum() {
          gen.assign(valid, false);
          gen.forOf("v", schemaCode, (v) => gen.if((0, codegen_1._)`${getEql()}(${data}, ${v})`, () => gen.assign(valid, true).break()));
        }
        function equalCode(vSchema, i) {
          const sch = schema[i];
          return typeof sch === "object" && sch !== null ? (0, codegen_1._)`${getEql()}(${data}, ${vSchema}[${i}])` : (0, codegen_1._)`${data} === ${sch}`;
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/validation/index.js
var require_validation = __commonJS({
  "node_modules/ajv/dist/vocabularies/validation/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var limitNumber_1 = require_limitNumber();
    var multipleOf_1 = require_multipleOf();
    var limitLength_1 = require_limitLength();
    var pattern_1 = require_pattern();
    var limitProperties_1 = require_limitProperties();
    var required_1 = require_required();
    var limitItems_1 = require_limitItems();
    var uniqueItems_1 = require_uniqueItems();
    var const_1 = require_const();
    var enum_1 = require_enum();
    var validation2 = [
      // number
      limitNumber_1.default,
      multipleOf_1.default,
      // string
      limitLength_1.default,
      pattern_1.default,
      // object
      limitProperties_1.default,
      required_1.default,
      // array
      limitItems_1.default,
      uniqueItems_1.default,
      // any
      { keyword: "type", schemaType: ["string", "array"] },
      { keyword: "nullable", schemaType: "boolean" },
      const_1.default,
      enum_1.default
    ];
    exports.default = validation2;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/additionalItems.js
var require_additionalItems = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/additionalItems.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateAdditionalItems = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: ({ params: { len } }) => (0, codegen_1.str)`must NOT have more than ${len} items`,
      params: ({ params: { len } }) => (0, codegen_1._)`{limit: ${len}}`
    };
    var def = {
      keyword: "additionalItems",
      type: "array",
      schemaType: ["boolean", "object"],
      before: "uniqueItems",
      error,
      code(cxt) {
        const { parentSchema, it } = cxt;
        const { items } = parentSchema;
        if (!Array.isArray(items)) {
          (0, util_1.checkStrictMode)(it, '"additionalItems" is ignored when "items" is not an array of schemas');
          return;
        }
        validateAdditionalItems(cxt, items);
      }
    };
    function validateAdditionalItems(cxt, items) {
      const { gen, schema, data, keyword, it } = cxt;
      it.items = true;
      const len = gen.const("len", (0, codegen_1._)`${data}.length`);
      if (schema === false) {
        cxt.setParams({ len: items.length });
        cxt.pass((0, codegen_1._)`${len} <= ${items.length}`);
      } else if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
        const valid = gen.var("valid", (0, codegen_1._)`${len} <= ${items.length}`);
        gen.if((0, codegen_1.not)(valid), () => validateItems(valid));
        cxt.ok(valid);
      }
      function validateItems(valid) {
        gen.forRange("i", items.length, len, (i) => {
          cxt.subschema({ keyword, dataProp: i, dataPropType: util_1.Type.Num }, valid);
          if (!it.allErrors)
            gen.if((0, codegen_1.not)(valid), () => gen.break());
        });
      }
    }
    exports.validateAdditionalItems = validateAdditionalItems;
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/items.js
var require_items = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/items.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateTuple = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var code_1 = require_code2();
    var def = {
      keyword: "items",
      type: "array",
      schemaType: ["object", "array", "boolean"],
      before: "uniqueItems",
      code(cxt) {
        const { schema, it } = cxt;
        if (Array.isArray(schema))
          return validateTuple(cxt, "additionalItems", schema);
        it.items = true;
        if ((0, util_1.alwaysValidSchema)(it, schema))
          return;
        cxt.ok((0, code_1.validateArray)(cxt));
      }
    };
    function validateTuple(cxt, extraItems, schArr = cxt.schema) {
      const { gen, parentSchema, data, keyword, it } = cxt;
      checkStrictTuple(parentSchema);
      if (it.opts.unevaluated && schArr.length && it.items !== true) {
        it.items = util_1.mergeEvaluated.items(gen, schArr.length, it.items);
      }
      const valid = gen.name("valid");
      const len = gen.const("len", (0, codegen_1._)`${data}.length`);
      schArr.forEach((sch, i) => {
        if ((0, util_1.alwaysValidSchema)(it, sch))
          return;
        gen.if((0, codegen_1._)`${len} > ${i}`, () => cxt.subschema({
          keyword,
          schemaProp: i,
          dataProp: i
        }, valid));
        cxt.ok(valid);
      });
      function checkStrictTuple(sch) {
        const { opts, errSchemaPath } = it;
        const l = schArr.length;
        const fullTuple = l === sch.minItems && (l === sch.maxItems || sch[extraItems] === false);
        if (opts.strictTuples && !fullTuple) {
          const msg = `"${keyword}" is ${l}-tuple, but minItems or maxItems/${extraItems} are not specified or different at path "${errSchemaPath}"`;
          (0, util_1.checkStrictMode)(it, msg, opts.strictTuples);
        }
      }
    }
    exports.validateTuple = validateTuple;
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/prefixItems.js
var require_prefixItems = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/prefixItems.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var items_1 = require_items();
    var def = {
      keyword: "prefixItems",
      type: "array",
      schemaType: ["array"],
      before: "uniqueItems",
      code: (cxt) => (0, items_1.validateTuple)(cxt, "items")
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/items2020.js
var require_items2020 = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/items2020.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var code_1 = require_code2();
    var additionalItems_1 = require_additionalItems();
    var error = {
      message: ({ params: { len } }) => (0, codegen_1.str)`must NOT have more than ${len} items`,
      params: ({ params: { len } }) => (0, codegen_1._)`{limit: ${len}}`
    };
    var def = {
      keyword: "items",
      type: "array",
      schemaType: ["object", "boolean"],
      before: "uniqueItems",
      error,
      code(cxt) {
        const { schema, parentSchema, it } = cxt;
        const { prefixItems } = parentSchema;
        it.items = true;
        if ((0, util_1.alwaysValidSchema)(it, schema))
          return;
        if (prefixItems)
          (0, additionalItems_1.validateAdditionalItems)(cxt, prefixItems);
        else
          cxt.ok((0, code_1.validateArray)(cxt));
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/contains.js
var require_contains = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/contains.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: ({ params: { min, max } }) => max === void 0 ? (0, codegen_1.str)`must contain at least ${min} valid item(s)` : (0, codegen_1.str)`must contain at least ${min} and no more than ${max} valid item(s)`,
      params: ({ params: { min, max } }) => max === void 0 ? (0, codegen_1._)`{minContains: ${min}}` : (0, codegen_1._)`{minContains: ${min}, maxContains: ${max}}`
    };
    var def = {
      keyword: "contains",
      type: "array",
      schemaType: ["object", "boolean"],
      before: "uniqueItems",
      trackErrors: true,
      error,
      code(cxt) {
        const { gen, schema, parentSchema, data, it } = cxt;
        let min;
        let max;
        const { minContains, maxContains } = parentSchema;
        if (it.opts.next) {
          min = minContains === void 0 ? 1 : minContains;
          max = maxContains;
        } else {
          min = 1;
        }
        const len = gen.const("len", (0, codegen_1._)`${data}.length`);
        cxt.setParams({ min, max });
        if (max === void 0 && min === 0) {
          (0, util_1.checkStrictMode)(it, `"minContains" == 0 without "maxContains": "contains" keyword ignored`);
          return;
        }
        if (max !== void 0 && min > max) {
          (0, util_1.checkStrictMode)(it, `"minContains" > "maxContains" is always invalid`);
          cxt.fail();
          return;
        }
        if ((0, util_1.alwaysValidSchema)(it, schema)) {
          let cond = (0, codegen_1._)`${len} >= ${min}`;
          if (max !== void 0)
            cond = (0, codegen_1._)`${cond} && ${len} <= ${max}`;
          cxt.pass(cond);
          return;
        }
        it.items = true;
        const valid = gen.name("valid");
        if (max === void 0 && min === 1) {
          validateItems(valid, () => gen.if(valid, () => gen.break()));
        } else if (min === 0) {
          gen.let(valid, true);
          if (max !== void 0)
            gen.if((0, codegen_1._)`${data}.length > 0`, validateItemsWithCount);
        } else {
          gen.let(valid, false);
          validateItemsWithCount();
        }
        cxt.result(valid, () => cxt.reset());
        function validateItemsWithCount() {
          const schValid = gen.name("_valid");
          const count = gen.let("count", 0);
          validateItems(schValid, () => gen.if(schValid, () => checkLimits(count)));
        }
        function validateItems(_valid, block) {
          gen.forRange("i", 0, len, (i) => {
            cxt.subschema({
              keyword: "contains",
              dataProp: i,
              dataPropType: util_1.Type.Num,
              compositeRule: true
            }, _valid);
            block();
          });
        }
        function checkLimits(count) {
          gen.code((0, codegen_1._)`${count}++`);
          if (max === void 0) {
            gen.if((0, codegen_1._)`${count} >= ${min}`, () => gen.assign(valid, true).break());
          } else {
            gen.if((0, codegen_1._)`${count} > ${max}`, () => gen.assign(valid, false).break());
            if (min === 1)
              gen.assign(valid, true);
            else
              gen.if((0, codegen_1._)`${count} >= ${min}`, () => gen.assign(valid, true));
          }
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/dependencies.js
var require_dependencies = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/dependencies.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateSchemaDeps = exports.validatePropertyDeps = exports.error = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var code_1 = require_code2();
    exports.error = {
      message: ({ params: { property, depsCount, deps } }) => {
        const property_ies = depsCount === 1 ? "property" : "properties";
        return (0, codegen_1.str)`must have ${property_ies} ${deps} when property ${property} is present`;
      },
      params: ({ params: { property, depsCount, deps, missingProperty } }) => (0, codegen_1._)`{property: ${property},
    missingProperty: ${missingProperty},
    depsCount: ${depsCount},
    deps: ${deps}}`
      // TODO change to reference
    };
    var def = {
      keyword: "dependencies",
      type: "object",
      schemaType: "object",
      error: exports.error,
      code(cxt) {
        const [propDeps, schDeps] = splitDependencies(cxt);
        validatePropertyDeps(cxt, propDeps);
        validateSchemaDeps(cxt, schDeps);
      }
    };
    function splitDependencies({ schema }) {
      const propertyDeps = {};
      const schemaDeps = {};
      for (const key in schema) {
        if (key === "__proto__")
          continue;
        const deps = Array.isArray(schema[key]) ? propertyDeps : schemaDeps;
        deps[key] = schema[key];
      }
      return [propertyDeps, schemaDeps];
    }
    function validatePropertyDeps(cxt, propertyDeps = cxt.schema) {
      const { gen, data, it } = cxt;
      if (Object.keys(propertyDeps).length === 0)
        return;
      const missing = gen.let("missing");
      for (const prop in propertyDeps) {
        const deps = propertyDeps[prop];
        if (deps.length === 0)
          continue;
        const hasProperty = (0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties);
        cxt.setParams({
          property: prop,
          depsCount: deps.length,
          deps: deps.join(", ")
        });
        if (it.allErrors) {
          gen.if(hasProperty, () => {
            for (const depProp of deps) {
              (0, code_1.checkReportMissingProp)(cxt, depProp);
            }
          });
        } else {
          gen.if((0, codegen_1._)`${hasProperty} && (${(0, code_1.checkMissingProp)(cxt, deps, missing)})`);
          (0, code_1.reportMissingProp)(cxt, missing);
          gen.else();
        }
      }
    }
    exports.validatePropertyDeps = validatePropertyDeps;
    function validateSchemaDeps(cxt, schemaDeps = cxt.schema) {
      const { gen, data, keyword, it } = cxt;
      const valid = gen.name("valid");
      for (const prop in schemaDeps) {
        if ((0, util_1.alwaysValidSchema)(it, schemaDeps[prop]))
          continue;
        gen.if(
          (0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties),
          () => {
            const schCxt = cxt.subschema({ keyword, schemaProp: prop }, valid);
            cxt.mergeValidEvaluated(schCxt, valid);
          },
          () => gen.var(valid, true)
          // TODO var
        );
        cxt.ok(valid);
      }
    }
    exports.validateSchemaDeps = validateSchemaDeps;
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/propertyNames.js
var require_propertyNames = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/propertyNames.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: "property name must be valid",
      params: ({ params }) => (0, codegen_1._)`{propertyName: ${params.propertyName}}`
    };
    var def = {
      keyword: "propertyNames",
      type: "object",
      schemaType: ["object", "boolean"],
      error,
      code(cxt) {
        const { gen, schema, data, it } = cxt;
        if ((0, util_1.alwaysValidSchema)(it, schema))
          return;
        const valid = gen.name("valid");
        gen.forIn("key", data, (key) => {
          cxt.setParams({ propertyName: key });
          cxt.subschema({
            keyword: "propertyNames",
            data: key,
            dataTypes: ["string"],
            propertyName: key,
            compositeRule: true
          }, valid);
          gen.if((0, codegen_1.not)(valid), () => {
            cxt.error(true);
            if (!it.allErrors)
              gen.break();
          });
        });
        cxt.ok(valid);
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js
var require_additionalProperties = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var code_1 = require_code2();
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var util_1 = require_util();
    var error = {
      message: "must NOT have additional properties",
      params: ({ params }) => (0, codegen_1._)`{additionalProperty: ${params.additionalProperty}}`
    };
    var def = {
      keyword: "additionalProperties",
      type: ["object"],
      schemaType: ["boolean", "object"],
      allowUndefined: true,
      trackErrors: true,
      error,
      code(cxt) {
        const { gen, schema, parentSchema, data, errsCount, it } = cxt;
        if (!errsCount)
          throw new Error("ajv implementation error");
        const { allErrors, opts } = it;
        it.props = true;
        if (opts.removeAdditional !== "all" && (0, util_1.alwaysValidSchema)(it, schema))
          return;
        const props = (0, code_1.allSchemaProperties)(parentSchema.properties);
        const patProps = (0, code_1.allSchemaProperties)(parentSchema.patternProperties);
        checkAdditionalProperties();
        cxt.ok((0, codegen_1._)`${errsCount} === ${names_1.default.errors}`);
        function checkAdditionalProperties() {
          gen.forIn("key", data, (key) => {
            if (!props.length && !patProps.length)
              additionalPropertyCode(key);
            else
              gen.if(isAdditional(key), () => additionalPropertyCode(key));
          });
        }
        function isAdditional(key) {
          let definedProp;
          if (props.length > 8) {
            const propsSchema = (0, util_1.schemaRefOrVal)(it, parentSchema.properties, "properties");
            definedProp = (0, code_1.isOwnProperty)(gen, propsSchema, key);
          } else if (props.length) {
            definedProp = (0, codegen_1.or)(...props.map((p) => (0, codegen_1._)`${key} === ${p}`));
          } else {
            definedProp = codegen_1.nil;
          }
          if (patProps.length) {
            definedProp = (0, codegen_1.or)(definedProp, ...patProps.map((p) => (0, codegen_1._)`${(0, code_1.usePattern)(cxt, p)}.test(${key})`));
          }
          return (0, codegen_1.not)(definedProp);
        }
        function deleteAdditional(key) {
          gen.code((0, codegen_1._)`delete ${data}[${key}]`);
        }
        function additionalPropertyCode(key) {
          if (opts.removeAdditional === "all" || opts.removeAdditional && schema === false) {
            deleteAdditional(key);
            return;
          }
          if (schema === false) {
            cxt.setParams({ additionalProperty: key });
            cxt.error();
            if (!allErrors)
              gen.break();
            return;
          }
          if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
            const valid = gen.name("valid");
            if (opts.removeAdditional === "failing") {
              applyAdditionalSchema(key, valid, false);
              gen.if((0, codegen_1.not)(valid), () => {
                cxt.reset();
                deleteAdditional(key);
              });
            } else {
              applyAdditionalSchema(key, valid);
              if (!allErrors)
                gen.if((0, codegen_1.not)(valid), () => gen.break());
            }
          }
        }
        function applyAdditionalSchema(key, valid, errors) {
          const subschema = {
            keyword: "additionalProperties",
            dataProp: key,
            dataPropType: util_1.Type.Str
          };
          if (errors === false) {
            Object.assign(subschema, {
              compositeRule: true,
              createErrors: false,
              allErrors: false
            });
          }
          cxt.subschema(subschema, valid);
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/properties.js
var require_properties = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/properties.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var validate_1 = require_validate();
    var code_1 = require_code2();
    var util_1 = require_util();
    var additionalProperties_1 = require_additionalProperties();
    var def = {
      keyword: "properties",
      type: "object",
      schemaType: "object",
      code(cxt) {
        const { gen, schema, parentSchema, data, it } = cxt;
        if (it.opts.removeAdditional === "all" && parentSchema.additionalProperties === void 0) {
          additionalProperties_1.default.code(new validate_1.KeywordCxt(it, additionalProperties_1.default, "additionalProperties"));
        }
        const allProps = (0, code_1.allSchemaProperties)(schema);
        for (const prop of allProps) {
          it.definedProperties.add(prop);
        }
        if (it.opts.unevaluated && allProps.length && it.props !== true) {
          it.props = util_1.mergeEvaluated.props(gen, (0, util_1.toHash)(allProps), it.props);
        }
        const properties = allProps.filter((p) => !(0, util_1.alwaysValidSchema)(it, schema[p]));
        if (properties.length === 0)
          return;
        const valid = gen.name("valid");
        for (const prop of properties) {
          if (hasDefault(prop)) {
            applyPropertySchema(prop);
          } else {
            gen.if((0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties));
            applyPropertySchema(prop);
            if (!it.allErrors)
              gen.else().var(valid, true);
            gen.endIf();
          }
          cxt.it.definedProperties.add(prop);
          cxt.ok(valid);
        }
        function hasDefault(prop) {
          return it.opts.useDefaults && !it.compositeRule && schema[prop].default !== void 0;
        }
        function applyPropertySchema(prop) {
          cxt.subschema({
            keyword: "properties",
            schemaProp: prop,
            dataProp: prop
          }, valid);
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/patternProperties.js
var require_patternProperties = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/patternProperties.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var code_1 = require_code2();
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var util_2 = require_util();
    var def = {
      keyword: "patternProperties",
      type: "object",
      schemaType: "object",
      code(cxt) {
        const { gen, schema, data, parentSchema, it } = cxt;
        const { opts } = it;
        const patterns = (0, code_1.allSchemaProperties)(schema);
        const alwaysValidPatterns = patterns.filter((p) => (0, util_1.alwaysValidSchema)(it, schema[p]));
        if (patterns.length === 0 || alwaysValidPatterns.length === patterns.length && (!it.opts.unevaluated || it.props === true)) {
          return;
        }
        const checkProperties = opts.strictSchema && !opts.allowMatchingProperties && parentSchema.properties;
        const valid = gen.name("valid");
        if (it.props !== true && !(it.props instanceof codegen_1.Name)) {
          it.props = (0, util_2.evaluatedPropsToName)(gen, it.props);
        }
        const { props } = it;
        validatePatternProperties();
        function validatePatternProperties() {
          for (const pat of patterns) {
            if (checkProperties)
              checkMatchingProperties(pat);
            if (it.allErrors) {
              validateProperties(pat);
            } else {
              gen.var(valid, true);
              validateProperties(pat);
              gen.if(valid);
            }
          }
        }
        function checkMatchingProperties(pat) {
          for (const prop in checkProperties) {
            if (new RegExp(pat).test(prop)) {
              (0, util_1.checkStrictMode)(it, `property ${prop} matches pattern ${pat} (use allowMatchingProperties)`);
            }
          }
        }
        function validateProperties(pat) {
          gen.forIn("key", data, (key) => {
            gen.if((0, codegen_1._)`${(0, code_1.usePattern)(cxt, pat)}.test(${key})`, () => {
              const alwaysValid = alwaysValidPatterns.includes(pat);
              if (!alwaysValid) {
                cxt.subschema({
                  keyword: "patternProperties",
                  schemaProp: pat,
                  dataProp: key,
                  dataPropType: util_2.Type.Str
                }, valid);
              }
              if (it.opts.unevaluated && props !== true) {
                gen.assign((0, codegen_1._)`${props}[${key}]`, true);
              } else if (!alwaysValid && !it.allErrors) {
                gen.if((0, codegen_1.not)(valid), () => gen.break());
              }
            });
          });
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/not.js
var require_not = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/not.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var util_1 = require_util();
    var def = {
      keyword: "not",
      schemaType: ["object", "boolean"],
      trackErrors: true,
      code(cxt) {
        const { gen, schema, it } = cxt;
        if ((0, util_1.alwaysValidSchema)(it, schema)) {
          cxt.fail();
          return;
        }
        const valid = gen.name("valid");
        cxt.subschema({
          keyword: "not",
          compositeRule: true,
          createErrors: false,
          allErrors: false
        }, valid);
        cxt.failResult(valid, () => cxt.reset(), () => cxt.error());
      },
      error: { message: "must NOT be valid" }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/anyOf.js
var require_anyOf = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/anyOf.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var code_1 = require_code2();
    var def = {
      keyword: "anyOf",
      schemaType: "array",
      trackErrors: true,
      code: code_1.validateUnion,
      error: { message: "must match a schema in anyOf" }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/oneOf.js
var require_oneOf = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/oneOf.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: "must match exactly one schema in oneOf",
      params: ({ params }) => (0, codegen_1._)`{passingSchemas: ${params.passing}}`
    };
    var def = {
      keyword: "oneOf",
      schemaType: "array",
      trackErrors: true,
      error,
      code(cxt) {
        const { gen, schema, parentSchema, it } = cxt;
        if (!Array.isArray(schema))
          throw new Error("ajv implementation error");
        if (it.opts.discriminator && parentSchema.discriminator)
          return;
        const schArr = schema;
        const valid = gen.let("valid", false);
        const passing = gen.let("passing", null);
        const schValid = gen.name("_valid");
        cxt.setParams({ passing });
        gen.block(validateOneOf);
        cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
        function validateOneOf() {
          schArr.forEach((sch, i) => {
            let schCxt;
            if ((0, util_1.alwaysValidSchema)(it, sch)) {
              gen.var(schValid, true);
            } else {
              schCxt = cxt.subschema({
                keyword: "oneOf",
                schemaProp: i,
                compositeRule: true
              }, schValid);
            }
            if (i > 0) {
              gen.if((0, codegen_1._)`${schValid} && ${valid}`).assign(valid, false).assign(passing, (0, codegen_1._)`[${passing}, ${i}]`).else();
            }
            gen.if(schValid, () => {
              gen.assign(valid, true);
              gen.assign(passing, i);
              if (schCxt)
                cxt.mergeEvaluated(schCxt, codegen_1.Name);
            });
          });
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/allOf.js
var require_allOf = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/allOf.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var util_1 = require_util();
    var def = {
      keyword: "allOf",
      schemaType: "array",
      code(cxt) {
        const { gen, schema, it } = cxt;
        if (!Array.isArray(schema))
          throw new Error("ajv implementation error");
        const valid = gen.name("valid");
        schema.forEach((sch, i) => {
          if ((0, util_1.alwaysValidSchema)(it, sch))
            return;
          const schCxt = cxt.subschema({ keyword: "allOf", schemaProp: i }, valid);
          cxt.ok(valid);
          cxt.mergeEvaluated(schCxt);
        });
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/if.js
var require_if = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/if.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: ({ params }) => (0, codegen_1.str)`must match "${params.ifClause}" schema`,
      params: ({ params }) => (0, codegen_1._)`{failingKeyword: ${params.ifClause}}`
    };
    var def = {
      keyword: "if",
      schemaType: ["object", "boolean"],
      trackErrors: true,
      error,
      code(cxt) {
        const { gen, parentSchema, it } = cxt;
        if (parentSchema.then === void 0 && parentSchema.else === void 0) {
          (0, util_1.checkStrictMode)(it, '"if" without "then" and "else" is ignored');
        }
        const hasThen = hasSchema(it, "then");
        const hasElse = hasSchema(it, "else");
        if (!hasThen && !hasElse)
          return;
        const valid = gen.let("valid", true);
        const schValid = gen.name("_valid");
        validateIf();
        cxt.reset();
        if (hasThen && hasElse) {
          const ifClause = gen.let("ifClause");
          cxt.setParams({ ifClause });
          gen.if(schValid, validateClause("then", ifClause), validateClause("else", ifClause));
        } else if (hasThen) {
          gen.if(schValid, validateClause("then"));
        } else {
          gen.if((0, codegen_1.not)(schValid), validateClause("else"));
        }
        cxt.pass(valid, () => cxt.error(true));
        function validateIf() {
          const schCxt = cxt.subschema({
            keyword: "if",
            compositeRule: true,
            createErrors: false,
            allErrors: false
          }, schValid);
          cxt.mergeEvaluated(schCxt);
        }
        function validateClause(keyword, ifClause) {
          return () => {
            const schCxt = cxt.subschema({ keyword }, schValid);
            gen.assign(valid, schValid);
            cxt.mergeValidEvaluated(schCxt, valid);
            if (ifClause)
              gen.assign(ifClause, (0, codegen_1._)`${keyword}`);
            else
              cxt.setParams({ ifClause: keyword });
          };
        }
      }
    };
    function hasSchema(it, keyword) {
      const schema = it.schema[keyword];
      return schema !== void 0 && !(0, util_1.alwaysValidSchema)(it, schema);
    }
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/thenElse.js
var require_thenElse = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/thenElse.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var util_1 = require_util();
    var def = {
      keyword: ["then", "else"],
      schemaType: ["object", "boolean"],
      code({ keyword, parentSchema, it }) {
        if (parentSchema.if === void 0)
          (0, util_1.checkStrictMode)(it, `"${keyword}" without "if" is ignored`);
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/applicator/index.js
var require_applicator = __commonJS({
  "node_modules/ajv/dist/vocabularies/applicator/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var additionalItems_1 = require_additionalItems();
    var prefixItems_1 = require_prefixItems();
    var items_1 = require_items();
    var items2020_1 = require_items2020();
    var contains_1 = require_contains();
    var dependencies_1 = require_dependencies();
    var propertyNames_1 = require_propertyNames();
    var additionalProperties_1 = require_additionalProperties();
    var properties_1 = require_properties();
    var patternProperties_1 = require_patternProperties();
    var not_1 = require_not();
    var anyOf_1 = require_anyOf();
    var oneOf_1 = require_oneOf();
    var allOf_1 = require_allOf();
    var if_1 = require_if();
    var thenElse_1 = require_thenElse();
    function getApplicator(draft2020 = false) {
      const applicator = [
        // any
        not_1.default,
        anyOf_1.default,
        oneOf_1.default,
        allOf_1.default,
        if_1.default,
        thenElse_1.default,
        // object
        propertyNames_1.default,
        additionalProperties_1.default,
        dependencies_1.default,
        properties_1.default,
        patternProperties_1.default
      ];
      if (draft2020)
        applicator.push(prefixItems_1.default, items2020_1.default);
      else
        applicator.push(additionalItems_1.default, items_1.default);
      applicator.push(contains_1.default);
      return applicator;
    }
    exports.default = getApplicator;
  }
});

// node_modules/ajv/dist/vocabularies/format/format.js
var require_format = __commonJS({
  "node_modules/ajv/dist/vocabularies/format/format.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var error = {
      message: ({ schemaCode }) => (0, codegen_1.str)`must match format "${schemaCode}"`,
      params: ({ schemaCode }) => (0, codegen_1._)`{format: ${schemaCode}}`
    };
    var def = {
      keyword: "format",
      type: ["number", "string"],
      schemaType: "string",
      $data: true,
      error,
      code(cxt, ruleType) {
        const { gen, data, $data, schema, schemaCode, it } = cxt;
        const { opts, errSchemaPath, schemaEnv, self } = it;
        if (!opts.validateFormats)
          return;
        if ($data)
          validate$DataFormat();
        else
          validateFormat();
        function validate$DataFormat() {
          const fmts = gen.scopeValue("formats", {
            ref: self.formats,
            code: opts.code.formats
          });
          const fDef = gen.const("fDef", (0, codegen_1._)`${fmts}[${schemaCode}]`);
          const fType = gen.let("fType");
          const format = gen.let("format");
          gen.if((0, codegen_1._)`typeof ${fDef} == "object" && !(${fDef} instanceof RegExp)`, () => gen.assign(fType, (0, codegen_1._)`${fDef}.type || "string"`).assign(format, (0, codegen_1._)`${fDef}.validate`), () => gen.assign(fType, (0, codegen_1._)`"string"`).assign(format, fDef));
          cxt.fail$data((0, codegen_1.or)(unknownFmt(), invalidFmt()));
          function unknownFmt() {
            if (opts.strictSchema === false)
              return codegen_1.nil;
            return (0, codegen_1._)`${schemaCode} && !${format}`;
          }
          function invalidFmt() {
            const callFormat = schemaEnv.$async ? (0, codegen_1._)`(${fDef}.async ? await ${format}(${data}) : ${format}(${data}))` : (0, codegen_1._)`${format}(${data})`;
            const validData = (0, codegen_1._)`(typeof ${format} == "function" ? ${callFormat} : ${format}.test(${data}))`;
            return (0, codegen_1._)`${format} && ${format} !== true && ${fType} === ${ruleType} && !${validData}`;
          }
        }
        function validateFormat() {
          const formatDef = self.formats[schema];
          if (!formatDef) {
            unknownFormat();
            return;
          }
          if (formatDef === true)
            return;
          const [fmtType, format, fmtRef] = getFormat(formatDef);
          if (fmtType === ruleType)
            cxt.pass(validCondition());
          function unknownFormat() {
            if (opts.strictSchema === false) {
              self.logger.warn(unknownMsg());
              return;
            }
            throw new Error(unknownMsg());
            function unknownMsg() {
              return `unknown format "${schema}" ignored in schema at path "${errSchemaPath}"`;
            }
          }
          function getFormat(fmtDef) {
            const code = fmtDef instanceof RegExp ? (0, codegen_1.regexpCode)(fmtDef) : opts.code.formats ? (0, codegen_1._)`${opts.code.formats}${(0, codegen_1.getProperty)(schema)}` : void 0;
            const fmt = gen.scopeValue("formats", { key: schema, ref: fmtDef, code });
            if (typeof fmtDef == "object" && !(fmtDef instanceof RegExp)) {
              return [fmtDef.type || "string", fmtDef.validate, (0, codegen_1._)`${fmt}.validate`];
            }
            return ["string", fmtDef, fmt];
          }
          function validCondition() {
            if (typeof formatDef == "object" && !(formatDef instanceof RegExp) && formatDef.async) {
              if (!schemaEnv.$async)
                throw new Error("async format in sync schema");
              return (0, codegen_1._)`await ${fmtRef}(${data})`;
            }
            return typeof format == "function" ? (0, codegen_1._)`${fmtRef}(${data})` : (0, codegen_1._)`${fmtRef}.test(${data})`;
          }
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/vocabularies/format/index.js
var require_format2 = __commonJS({
  "node_modules/ajv/dist/vocabularies/format/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var format_1 = require_format();
    var format = [format_1.default];
    exports.default = format;
  }
});

// node_modules/ajv/dist/vocabularies/metadata.js
var require_metadata = __commonJS({
  "node_modules/ajv/dist/vocabularies/metadata.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.contentVocabulary = exports.metadataVocabulary = void 0;
    exports.metadataVocabulary = [
      "title",
      "description",
      "default",
      "deprecated",
      "readOnly",
      "writeOnly",
      "examples"
    ];
    exports.contentVocabulary = [
      "contentMediaType",
      "contentEncoding",
      "contentSchema"
    ];
  }
});

// node_modules/ajv/dist/vocabularies/draft7.js
var require_draft7 = __commonJS({
  "node_modules/ajv/dist/vocabularies/draft7.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = require_core2();
    var validation_1 = require_validation();
    var applicator_1 = require_applicator();
    var format_1 = require_format2();
    var metadata_1 = require_metadata();
    var draft7Vocabularies = [
      core_1.default,
      validation_1.default,
      (0, applicator_1.default)(),
      format_1.default,
      metadata_1.metadataVocabulary,
      metadata_1.contentVocabulary
    ];
    exports.default = draft7Vocabularies;
  }
});

// node_modules/ajv/dist/vocabularies/discriminator/types.js
var require_types = __commonJS({
  "node_modules/ajv/dist/vocabularies/discriminator/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DiscrError = void 0;
    var DiscrError;
    (function(DiscrError2) {
      DiscrError2["Tag"] = "tag";
      DiscrError2["Mapping"] = "mapping";
    })(DiscrError || (exports.DiscrError = DiscrError = {}));
  }
});

// node_modules/ajv/dist/vocabularies/discriminator/index.js
var require_discriminator = __commonJS({
  "node_modules/ajv/dist/vocabularies/discriminator/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var types_1 = require_types();
    var compile_1 = require_compile();
    var ref_error_1 = require_ref_error();
    var util_1 = require_util();
    var error = {
      message: ({ params: { discrError, tagName } }) => discrError === types_1.DiscrError.Tag ? `tag "${tagName}" must be string` : `value of tag "${tagName}" must be in oneOf`,
      params: ({ params: { discrError, tag, tagName } }) => (0, codegen_1._)`{error: ${discrError}, tag: ${tagName}, tagValue: ${tag}}`
    };
    var def = {
      keyword: "discriminator",
      type: "object",
      schemaType: "object",
      error,
      code(cxt) {
        const { gen, data, schema, parentSchema, it } = cxt;
        const { oneOf: oneOf2 } = parentSchema;
        if (!it.opts.discriminator) {
          throw new Error("discriminator: requires discriminator option");
        }
        const tagName = schema.propertyName;
        if (typeof tagName != "string")
          throw new Error("discriminator: requires propertyName");
        if (schema.mapping)
          throw new Error("discriminator: mapping is not supported");
        if (!oneOf2)
          throw new Error("discriminator: requires oneOf keyword");
        const valid = gen.let("valid", false);
        const tag = gen.const("tag", (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(tagName)}`);
        gen.if((0, codegen_1._)`typeof ${tag} == "string"`, () => validateMapping(), () => cxt.error(false, { discrError: types_1.DiscrError.Tag, tag, tagName }));
        cxt.ok(valid);
        function validateMapping() {
          const mapping = getMapping();
          gen.if(false);
          for (const tagValue in mapping) {
            gen.elseIf((0, codegen_1._)`${tag} === ${tagValue}`);
            gen.assign(valid, applyTagSchema(mapping[tagValue]));
          }
          gen.else();
          cxt.error(false, { discrError: types_1.DiscrError.Mapping, tag, tagName });
          gen.endIf();
        }
        function applyTagSchema(schemaProp) {
          const _valid = gen.name("valid");
          const schCxt = cxt.subschema({ keyword: "oneOf", schemaProp }, _valid);
          cxt.mergeEvaluated(schCxt, codegen_1.Name);
          return _valid;
        }
        function getMapping() {
          var _a;
          const oneOfMapping = {};
          const topRequired = hasRequired(parentSchema);
          let tagRequired = true;
          for (let i = 0; i < oneOf2.length; i++) {
            let sch = oneOf2[i];
            if ((sch === null || sch === void 0 ? void 0 : sch.$ref) && !(0, util_1.schemaHasRulesButRef)(sch, it.self.RULES)) {
              const ref = sch.$ref;
              sch = compile_1.resolveRef.call(it.self, it.schemaEnv.root, it.baseId, ref);
              if (sch instanceof compile_1.SchemaEnv)
                sch = sch.schema;
              if (sch === void 0)
                throw new ref_error_1.default(it.opts.uriResolver, it.baseId, ref);
            }
            const propSch = (_a = sch === null || sch === void 0 ? void 0 : sch.properties) === null || _a === void 0 ? void 0 : _a[tagName];
            if (typeof propSch != "object") {
              throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${tagName}"`);
            }
            tagRequired = tagRequired && (topRequired || hasRequired(sch));
            addMappings(propSch, i);
          }
          if (!tagRequired)
            throw new Error(`discriminator: "${tagName}" must be required`);
          return oneOfMapping;
          function hasRequired({ required }) {
            return Array.isArray(required) && required.includes(tagName);
          }
          function addMappings(sch, i) {
            if (sch.const) {
              addMapping(sch.const, i);
            } else if (sch.enum) {
              for (const tagValue of sch.enum) {
                addMapping(tagValue, i);
              }
            } else {
              throw new Error(`discriminator: "properties/${tagName}" must have "const" or "enum"`);
            }
          }
          function addMapping(tagValue, i) {
            if (typeof tagValue != "string" || tagValue in oneOfMapping) {
              throw new Error(`discriminator: "${tagName}" values must be unique strings`);
            }
            oneOfMapping[tagValue] = i;
          }
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/ajv/dist/refs/json-schema-draft-07.json
var require_json_schema_draft_07 = __commonJS({
  "node_modules/ajv/dist/refs/json-schema-draft-07.json"(exports, module) {
    module.exports = {
      $schema: "http://json-schema.org/draft-07/schema#",
      $id: "http://json-schema.org/draft-07/schema#",
      title: "Core schema meta-schema",
      definitions: {
        schemaArray: {
          type: "array",
          minItems: 1,
          items: { $ref: "#" }
        },
        nonNegativeInteger: {
          type: "integer",
          minimum: 0
        },
        nonNegativeIntegerDefault0: {
          allOf: [{ $ref: "#/definitions/nonNegativeInteger" }, { default: 0 }]
        },
        simpleTypes: {
          enum: ["array", "boolean", "integer", "null", "number", "object", "string"]
        },
        stringArray: {
          type: "array",
          items: { type: "string" },
          uniqueItems: true,
          default: []
        }
      },
      type: ["object", "boolean"],
      properties: {
        $id: {
          type: "string",
          format: "uri-reference"
        },
        $schema: {
          type: "string",
          format: "uri"
        },
        $ref: {
          type: "string",
          format: "uri-reference"
        },
        $comment: {
          type: "string"
        },
        title: {
          type: "string"
        },
        description: {
          type: "string"
        },
        default: true,
        readOnly: {
          type: "boolean",
          default: false
        },
        examples: {
          type: "array",
          items: true
        },
        multipleOf: {
          type: "number",
          exclusiveMinimum: 0
        },
        maximum: {
          type: "number"
        },
        exclusiveMaximum: {
          type: "number"
        },
        minimum: {
          type: "number"
        },
        exclusiveMinimum: {
          type: "number"
        },
        maxLength: { $ref: "#/definitions/nonNegativeInteger" },
        minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
        pattern: {
          type: "string",
          format: "regex"
        },
        additionalItems: { $ref: "#" },
        items: {
          anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }],
          default: true
        },
        maxItems: { $ref: "#/definitions/nonNegativeInteger" },
        minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
        uniqueItems: {
          type: "boolean",
          default: false
        },
        contains: { $ref: "#" },
        maxProperties: { $ref: "#/definitions/nonNegativeInteger" },
        minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
        required: { $ref: "#/definitions/stringArray" },
        additionalProperties: { $ref: "#" },
        definitions: {
          type: "object",
          additionalProperties: { $ref: "#" },
          default: {}
        },
        properties: {
          type: "object",
          additionalProperties: { $ref: "#" },
          default: {}
        },
        patternProperties: {
          type: "object",
          additionalProperties: { $ref: "#" },
          propertyNames: { format: "regex" },
          default: {}
        },
        dependencies: {
          type: "object",
          additionalProperties: {
            anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }]
          }
        },
        propertyNames: { $ref: "#" },
        const: true,
        enum: {
          type: "array",
          items: true,
          minItems: 1,
          uniqueItems: true
        },
        type: {
          anyOf: [
            { $ref: "#/definitions/simpleTypes" },
            {
              type: "array",
              items: { $ref: "#/definitions/simpleTypes" },
              minItems: 1,
              uniqueItems: true
            }
          ]
        },
        format: { type: "string" },
        contentMediaType: { type: "string" },
        contentEncoding: { type: "string" },
        if: { $ref: "#" },
        then: { $ref: "#" },
        else: { $ref: "#" },
        allOf: { $ref: "#/definitions/schemaArray" },
        anyOf: { $ref: "#/definitions/schemaArray" },
        oneOf: { $ref: "#/definitions/schemaArray" },
        not: { $ref: "#" }
      },
      default: true
    };
  }
});

// node_modules/ajv/dist/ajv.js
var require_ajv = __commonJS({
  "node_modules/ajv/dist/ajv.js"(exports, module) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MissingRefError = exports.ValidationError = exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = exports.Ajv = void 0;
    var core_1 = require_core();
    var draft7_1 = require_draft7();
    var discriminator_1 = require_discriminator();
    var draft7MetaSchema = require_json_schema_draft_07();
    var META_SUPPORT_DATA = ["/properties"];
    var META_SCHEMA_ID = "http://json-schema.org/draft-07/schema";
    var Ajv2 = class extends core_1.default {
      _addVocabularies() {
        super._addVocabularies();
        draft7_1.default.forEach((v) => this.addVocabulary(v));
        if (this.opts.discriminator)
          this.addKeyword(discriminator_1.default);
      }
      _addDefaultMetaSchema() {
        super._addDefaultMetaSchema();
        if (!this.opts.meta)
          return;
        const metaSchema = this.opts.$data ? this.$dataMetaSchema(draft7MetaSchema, META_SUPPORT_DATA) : draft7MetaSchema;
        this.addMetaSchema(metaSchema, META_SCHEMA_ID, false);
        this.refs["http://json-schema.org/schema"] = META_SCHEMA_ID;
      }
      defaultMeta() {
        return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(META_SCHEMA_ID) ? META_SCHEMA_ID : void 0);
      }
    };
    exports.Ajv = Ajv2;
    module.exports = exports = Ajv2;
    module.exports.Ajv = Ajv2;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Ajv2;
    var validate_1 = require_validate();
    Object.defineProperty(exports, "KeywordCxt", { enumerable: true, get: function() {
      return validate_1.KeywordCxt;
    } });
    var codegen_1 = require_codegen();
    Object.defineProperty(exports, "_", { enumerable: true, get: function() {
      return codegen_1._;
    } });
    Object.defineProperty(exports, "str", { enumerable: true, get: function() {
      return codegen_1.str;
    } });
    Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
      return codegen_1.stringify;
    } });
    Object.defineProperty(exports, "nil", { enumerable: true, get: function() {
      return codegen_1.nil;
    } });
    Object.defineProperty(exports, "Name", { enumerable: true, get: function() {
      return codegen_1.Name;
    } });
    Object.defineProperty(exports, "CodeGen", { enumerable: true, get: function() {
      return codegen_1.CodeGen;
    } });
    var validation_error_1 = require_validation_error();
    Object.defineProperty(exports, "ValidationError", { enumerable: true, get: function() {
      return validation_error_1.default;
    } });
    var ref_error_1 = require_ref_error();
    Object.defineProperty(exports, "MissingRefError", { enumerable: true, get: function() {
      return ref_error_1.default;
    } });
  }
});

// src/server/index.ts
import { randomUUID as randomUUID8 } from "node:crypto";
import { promises as fs16 } from "node:fs";
import path20 from "node:path";
import { fileURLToPath as fileURLToPath2 } from "node:url";

// src/lib/studio3d/analysisProcess.ts
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { promises as fs3 } from "node:fs";
import path3 from "node:path";

// src/shared/lib/contractDecoders.ts
function contractDecoders(fail2) {
  function record(value, path21) {
    if (value === null || typeof value !== "object" || Array.isArray(value)) {
      fail2(path21);
    }
    return value;
  }
  function objectOf2(fields) {
    return (value, path21) => {
      const source = record(value, path21);
      const entries = Object.entries(fields).map(([key, decode2]) => [
        key,
        decode2(source[key], `${path21}.${key}`)
      ]);
      return Object.fromEntries(entries);
    };
  }
  function text3(value, path21) {
    if (typeof value !== "string") {
      fail2(path21);
    }
    return value;
  }
  function numeric2(value, path21) {
    if (typeof value !== "number" || !Number.isFinite(value)) {
      fail2(path21);
    }
    return value;
  }
  function wholeNumber2(value, path21) {
    if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 0) {
      fail2(path21);
    }
    return value;
  }
  function boolean2(value, path21) {
    if (typeof value !== "boolean") {
      fail2(path21);
    }
    return value;
  }
  function oneOf2(...values2) {
    return (value, path21) => {
      for (const expected of values2) {
        if (value === expected) {
          return expected;
        }
      }
      return fail2(path21);
    };
  }
  function nullable(decode2) {
    return (value, path21) => value === null ? null : decode2(value, path21);
  }
  function optional2(decode2) {
    return (value, path21) => value === void 0 || value === null ? null : decode2(value, path21);
  }
  function listOf2(decode2) {
    return (value, path21) => {
      if (!Array.isArray(value)) {
        fail2(path21);
      }
      return value.map((item, index) => decode2(item, `${path21}[${index}]`));
    };
  }
  function mapOf2(decode2) {
    return (value, path21) => Object.fromEntries(Object.entries(record(value, path21)).map(([key, item]) => [key, decode2(item, `${path21}.${key}`)]));
  }
  return {
    boolean: boolean2,
    listOf: listOf2,
    mapOf: mapOf2,
    nullable,
    numeric: numeric2,
    objectOf: objectOf2,
    optional: optional2,
    oneOf: oneOf2,
    record,
    text: text3,
    wholeNumber: wholeNumber2
  };
}

// src/shared/studio3d/studio3dOperations.ts
var MISSING_TASK_WAIT_REASON = "\u0417\u0430\u043A\u0430\u0437 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D \u043F\u043E\u0441\u043B\u0435 \u0442\u0440\u0451\u0445 \u043F\u0440\u043E\u0432\u0435\u0440\u043E\u043A. \u041C\u043E\u0436\u043D\u043E \u043F\u0440\u0435\u043A\u0440\u0430\u0442\u0438\u0442\u044C \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u0435; \u043E\u043F\u043B\u0430\u0442\u0430 \u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430.";
var VERSION_KINDS = [
  "image",
  "views",
  "model",
  "rigged",
  "animated",
  "parts",
  "splat",
  "export"
];
var OPERATIONS = [
  {
    id: "text-to-model",
    label: "\u041C\u043E\u0434\u0435\u043B\u044C \u0438\u0437 \u0442\u0435\u043A\u0441\u0442\u0430",
    group: "create",
    inputs: ["text"],
    output: "model",
    hint: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0441\u043B\u043E\u0432\u0430\u043C\u0438 \u043F\u0440\u0435\u0432\u0440\u0430\u0449\u0430\u0435\u0442\u0441\u044F \u0432 \u0442\u0440\u0451\u0445\u043C\u0435\u0440\u043D\u0443\u044E \u043C\u043E\u0434\u0435\u043B\u044C."
  },
  {
    id: "image-to-model",
    label: "\u041C\u043E\u0434\u0435\u043B\u044C \u0438\u0437 \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0438",
    group: "create",
    inputs: ["image"],
    output: "model",
    hint: "\u041E\u0434\u043D\u0430 \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0430 \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0430 \u0438\u043B\u0438 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0430 \u043F\u0440\u0435\u0432\u0440\u0430\u0449\u0430\u0435\u0442\u0441\u044F \u0432 \u043C\u043E\u0434\u0435\u043B\u044C."
  },
  {
    id: "views-to-model",
    label: "\u041C\u043E\u0434\u0435\u043B\u044C \u043F\u043E \u0432\u0438\u0434\u0430\u043C",
    group: "create",
    inputs: ["views"],
    output: "model",
    hint: "\u041E\u0442 \u0434\u0432\u0443\u0445 \u0434\u043E \u0447\u0435\u0442\u044B\u0440\u0451\u0445 \u0432\u0438\u0434\u043E\u0432 \u043E\u0434\u043D\u043E\u0433\u043E \u043E\u0431\u044A\u0435\u043A\u0442\u0430; \u0432\u0438\u0434 \u0441\u043F\u0435\u0440\u0435\u0434\u0438 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u0435\u043D."
  },
  {
    id: "image-to-splat",
    label: "\u0421\u043F\u043B\u0430\u0442 \u0438\u0437 \u0444\u043E\u0442\u043E",
    group: "create",
    inputs: ["image"],
    output: "splat",
    hint: "\u041E\u0431\u043B\u0430\u043A\u043E \u0433\u0430\u0443\u0441\u0441\u043E\u0432\u044B\u0445 \u0442\u043E\u0447\u0435\u043A \u0434\u043B\u044F \u0444\u043E\u043D\u0430 \u0438 \u0441\u0446\u0435\u043D; \u044D\u0442\u043E \u043D\u0435 \u0441\u0435\u0442\u043A\u0430, \u0434\u0430\u043B\u044C\u0448\u0435 \u0435\u0433\u043E \u043D\u0435 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u0442\u044C."
  },
  {
    id: "text-to-image",
    label: "\u041A\u0430\u0440\u0442\u0438\u043D\u043A\u0430 \u0438\u0437 \u0442\u0435\u043A\u0441\u0442\u0430",
    group: "images",
    inputs: ["text"],
    output: "image",
    hint: "\u0414\u0435\u0448\u0451\u0432\u0430\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u043E\u0431\u043B\u0438\u043A\u0430 \u0434\u043E \u0437\u0430\u043A\u0430\u0437\u0430 \u043C\u043E\u0434\u0435\u043B\u0438."
  },
  {
    id: "image-edit",
    label: "\u041F\u0440\u0430\u0432\u043A\u0430 \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0438",
    group: "images",
    inputs: ["image"],
    output: "image",
    hint: "\u041F\u0440\u0430\u0432\u043A\u0430 \u0441\u043B\u043E\u0432\u0430\u043C\u0438 \u0438\u043B\u0438 \u0448\u0430\u0431\u043B\u043E\u043D\u043E\u043C: T-\u043F\u043E\u0437\u0430, \u0434\u043E\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0430, \u0432\u044B\u0434\u0435\u043B\u0438\u0442\u044C \u043F\u0440\u0435\u0434\u043C\u0435\u0442."
  },
  {
    id: "image-to-views",
    label: "\u0427\u0435\u0442\u044B\u0440\u0435 \u0432\u0438\u0434\u0430",
    group: "images",
    inputs: ["image"],
    output: "views",
    hint: "\u0418\u0437 \u043E\u0434\u043D\u043E\u0439 \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0438 \u043F\u043E\u043B\u0443\u0447\u0430\u044E\u0442\u0441\u044F \u0432\u0438\u0434\u044B \u0441\u043F\u0435\u0440\u0435\u0434\u0438, \u0441\u043B\u0435\u0432\u0430, \u0441\u0437\u0430\u0434\u0438 \u0438 \u0441\u043F\u0440\u0430\u0432\u0430."
  },
  {
    id: "views-edit",
    label: "\u041F\u0440\u0430\u0432\u043A\u0430 \u0432\u0438\u0434\u043E\u0432",
    group: "images",
    inputs: ["views"],
    output: "views",
    hint: "\u041F\u0440\u0430\u0432\u043A\u0430 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u044B\u0445 \u0432\u0438\u0434\u043E\u0432 \u0441\u043B\u043E\u0432\u0430\u043C\u0438, \u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440 \xAB\u0443\u0431\u0435\u0440\u0438 \u0444\u043E\u043D\u0430\u0440\u044C \u0438\u0437 \u0440\u0443\u043A\u0438\xBB."
  },
  {
    id: "retopology",
    label: "\u041C\u0435\u043D\u044C\u0448\u0435 \u043F\u043E\u043B\u0438\u0433\u043E\u043D\u043E\u0432",
    group: "geometry",
    inputs: ["model", "parts"],
    output: "model",
    hint: "\u041D\u043E\u0432\u0430\u044F \u0441\u0435\u0442\u043A\u0430 \u0441 \u043D\u0443\u0436\u043D\u044B\u043C \u0447\u0438\u0441\u043B\u043E\u043C \u0433\u0440\u0430\u043D\u0435\u0439; \u0442\u0435\u043A\u0441\u0442\u0443\u0440\u0430 \u043F\u0435\u0440\u0435\u043D\u043E\u0441\u0438\u0442\u0441\u044F \u043D\u0430 \u043D\u0435\u0451."
  },
  {
    id: "segment",
    label: "\u0420\u0430\u0437\u0440\u0435\u0437\u0430\u0442\u044C \u043D\u0430 \u0447\u0430\u0441\u0442\u0438",
    group: "geometry",
    inputs: ["model"],
    output: "parts",
    hint: "\u041C\u043E\u0434\u0435\u043B\u044C \u0434\u0435\u043B\u0438\u0442\u0441\u044F \u043D\u0430 \u0447\u0430\u0441\u0442\u0438, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043C\u043E\u0436\u043D\u043E \u0434\u043E\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u0438 \u0432\u044B\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043F\u043E \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u0438."
  },
  {
    id: "complete-parts",
    label: "\u0414\u043E\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u0447\u0430\u0441\u0442\u0438",
    group: "geometry",
    inputs: ["parts"],
    output: "parts",
    hint: "\u0417\u0430\u043A\u0440\u044B\u0432\u0430\u0435\u0442 \u0441\u043A\u0440\u044B\u0442\u044B\u0435 \u043F\u043E\u0432\u0435\u0440\u0445\u043D\u043E\u0441\u0442\u0438 \u0443 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0445 \u0447\u0430\u0441\u0442\u0435\u0439."
  },
  {
    id: "smart-segment",
    label: "\u0423\u043C\u043D\u0430\u044F \u0441\u0435\u0433\u043C\u0435\u043D\u0442\u0430\u0446\u0438\u044F",
    group: "geometry",
    inputs: ["image", "model"],
    output: "parts",
    hint: "\u0427\u0430\u0441\u0442\u0438 \u0441 \u043F\u043E\u0434\u043F\u0438\u0441\u044F\u043C\u0438 \u043F\u043E \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0435 \u0438\u043B\u0438 \u0433\u043E\u0442\u043E\u0432\u043E\u0439 \u043C\u043E\u0434\u0435\u043B\u0438 GLB."
  },
  {
    id: "stylize",
    label: "\u0421\u0442\u0438\u043B\u0438\u0437\u0430\u0446\u0438\u044F",
    group: "geometry",
    inputs: ["model"],
    output: "model",
    hint: "\u041B\u0435\u0433\u043E, \u0432\u043E\u043A\u0441\u0435\u043B\u0438, \u043C\u043E\u0437\u0430\u0438\u043A\u0430 \u0412\u043E\u0440\u043E\u043D\u043E\u0433\u043E \u0438\u043B\u0438 Minecraft."
  },
  {
    id: "retexture",
    label: "\u041D\u043E\u0432\u0430\u044F \u0442\u0435\u043A\u0441\u0442\u0443\u0440\u0430",
    group: "texture",
    inputs: ["model"],
    output: "model",
    hint: "\u041F\u0435\u0440\u0435\u0440\u0438\u0441\u043E\u0432\u044B\u0432\u0430\u0435\u0442 \u0442\u0435\u043A\u0441\u0442\u0443\u0440\u0443 \u0433\u043E\u0442\u043E\u0432\u043E\u0439 \u043C\u043E\u0434\u0435\u043B\u0438."
  },
  {
    id: "uv-unwrap",
    label: "UV-\u0440\u0430\u0437\u0432\u0451\u0440\u0442\u043A\u0430",
    group: "texture",
    inputs: ["model", "rigged", "animated"],
    output: "same",
    hint: "\u041D\u043E\u0432\u0430\u044F \u0440\u0430\u0437\u0432\u0451\u0440\u0442\u043A\u0430; \u0442\u0435\u043A\u0441\u0442\u0443\u0440\u0430, \u0441\u043A\u0435\u043B\u0435\u0442 \u0438 \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u044F \u043F\u0435\u0440\u0435\u043D\u043E\u0441\u044F\u0442\u0441\u044F \u043D\u0430 \u043D\u0435\u0451."
  },
  {
    id: "rig-check",
    label: "\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0441\u043A\u0435\u043B\u0435\u0442\u0430",
    group: "animation",
    inputs: ["model"],
    output: "check",
    hint: "\u041C\u043E\u0436\u043D\u043E \u043B\u0438 \u043F\u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0441\u043A\u0435\u043B\u0435\u0442 \u0438 \u043A\u0430\u043A\u043E\u0439 \u0442\u0438\u043F \u0442\u0435\u043B\u0430 \u0443 \u043C\u043E\u0434\u0435\u043B\u0438."
  },
  {
    id: "rig",
    label: "\u0421\u043A\u0435\u043B\u0435\u0442",
    group: "animation",
    inputs: ["model"],
    output: "rigged",
    hint: "\u041A\u043E\u0441\u0442\u0438 \u0438 \u0432\u0435\u0441\u0430 \u0434\u043B\u044F \u0430\u043D\u0438\u043C\u0430\u0446\u0438\u0438."
  },
  {
    id: "animate",
    label: "\u0414\u0432\u0438\u0436\u0435\u043D\u0438\u044F",
    group: "animation",
    inputs: ["rigged"],
    output: "animated",
    hint: "\u0413\u043E\u0442\u043E\u0432\u044B\u0435 \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u044F \u043D\u0430 \u0441\u043A\u0435\u043B\u0435\u0442: \u043A\u0430\u0436\u0434\u043E\u0435 \u2014 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F."
  },
  {
    id: "export",
    label: "\u042D\u043A\u0441\u043F\u043E\u0440\u0442",
    group: "export",
    inputs: ["model", "rigged", "animated", "parts"],
    output: "export",
    hint: "\u0414\u0440\u0443\u0433\u043E\u0439 \u0444\u043E\u0440\u043C\u0430\u0442, \u0440\u0430\u0437\u043C\u0435\u0440 \u0442\u0435\u043A\u0441\u0442\u0443\u0440, \u043E\u0440\u0438\u0435\u043D\u0442\u0430\u0446\u0438\u044F \u0438\u043B\u0438 \u043F\u0440\u0435\u0441\u0435\u0442 FBX."
  },
  {
    id: "rotate",
    label: "\u0420\u0430\u0437\u0432\u0435\u0440\u043D\u0443\u0442\u044C",
    group: "helpers",
    inputs: ["model", "rigged", "animated", "parts"],
    output: "same",
    hint: "\u041F\u043E\u0432\u043E\u0440\u043E\u0442 \u043C\u043E\u0434\u0435\u043B\u0438 \u0446\u0435\u043B\u0438\u043A\u043E\u043C; \u0441\u043A\u0435\u043B\u0435\u0442 \u0438 \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u044F \u043F\u043E\u0432\u043E\u0440\u0430\u0447\u0438\u0432\u0430\u044E\u0442\u0441\u044F \u0432\u043C\u0435\u0441\u0442\u0435 \u0441 \u043D\u0435\u0439."
  },
  {
    id: "scale",
    label: "\u0417\u0430\u0434\u0430\u0442\u044C \u0440\u043E\u0441\u0442",
    group: "helpers",
    inputs: ["model", "rigged", "animated", "parts"],
    output: "same",
    hint: "\u041C\u0430\u0441\u0448\u0442\u0430\u0431 \u043F\u043E \u0432\u044B\u0441\u043E\u0442\u0435 \u0432 \u043C\u0435\u0442\u0440\u0430\u0445."
  }
];
var OPERATION_BY_ID = new Map(
  OPERATIONS.map((operation) => [operation.id, operation])
);
function operationSpec(id2) {
  return OPERATION_BY_ID.get(id2) ?? null;
}
function operationsFor(kind) {
  const accepted = kind === "start" ? ["text", "image", "views"] : [kind];
  return OPERATIONS.filter((operation) => {
    return operation.inputs.some((input2) => accepted.includes(input2));
  });
}
function refineKind(kind, stats2) {
  if (!stats2 || !["model", "rigged", "animated"].includes(kind)) {
    return kind;
  }
  if ((stats2.animations?.length ?? 0) > 0) {
    return "animated";
  }
  return (stats2.bones ?? 0) > 0 ? "rigged" : "model";
}
function isFieldVisible(field, values2) {
  return (field.visibleWhen ?? []).every((condition) => {
    const value = values2[condition.field];
    const scalar2 = Array.isArray(value) ? null : value ?? null;
    if (condition.is && !condition.is.includes(scalar2)) {
      return false;
    }
    return !(condition.not && condition.not.includes(scalar2));
  });
}
function normalizeValues(fields, raw) {
  const values2 = {};
  const errors = [];
  for (const field of fields) {
    const value = coerceField(field, raw[field.id] === void 0 ? field.default ?? null : raw[field.id]);
    values2[field.id] = value.value;
    if (value.error) {
      errors.push({
        field: field.id,
        message: value.error
      });
    }
  }
  for (const field of fields) {
    if (!isFieldVisible(field, values2)) {
      delete values2[field.id];
      removeIssues(errors, field.id);
    } else if (field.required && isEmpty(values2[field.id])) {
      errors.push({
        field: field.id,
        message: `\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u043F\u043E\u043B\u0435 \xAB${field.label}\xBB.`
      });
    }
  }
  return {
    values: values2,
    errors,
    warnings: []
  };
}
function removeIssues(issues, field) {
  for (let index = issues.length - 1; index >= 0; index -= 1) {
    if (issues[index]?.field === field) {
      issues.splice(index, 1);
    }
  }
}
function isEmpty(value) {
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  return value === null || value === void 0 || value === "";
}
function coerceField(field, raw) {
  if (raw === null || raw === void 0 || raw === "") {
    return { value: field.kind === "multiselect" || field.kind === "view-prompts" ? [] : null };
  }
  if (field.kind === "toggle") {
    return { value: raw === true || raw === "true" };
  }
  if (field.kind === "number") {
    return coerceNumber(field, raw);
  }
  if (field.kind === "select") {
    const value = String(raw);
    const known = (field.options ?? []).some((option) => option.value === value);
    return known ? { value } : {
      value: null,
      error: `\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F \xAB${field.label}\xBB.`
    };
  }
  if (field.kind === "multiselect") {
    return coerceList(field, raw);
  }
  if (field.kind === "view-prompts") {
    return coerceViewPrompts(field, raw);
  }
  const text3 = String(raw).trim();
  if (field.maxLength !== void 0 && text3.length > field.maxLength) {
    return {
      value: text3,
      error: `\xAB${field.label}\xBB: \u043D\u0435 \u0434\u043B\u0438\u043D\u043D\u0435\u0435 ${field.maxLength} \u0437\u043D\u0430\u043A\u043E\u0432.`
    };
  }
  return { value: text3 };
}
function coerceNumber(field, raw) {
  const value = typeof raw === "number" ? raw : Number(String(raw).replace(",", "."));
  if (!Number.isFinite(value)) {
    return {
      value: null,
      error: `\xAB${field.label}\xBB: \u043D\u0443\u0436\u043D\u043E \u0447\u0438\u0441\u043B\u043E.`
    };
  }
  if (field.min !== void 0 && value < field.min || field.max !== void 0 && value > field.max) {
    return {
      value,
      error: `\xAB${field.label}\xBB: \u043E\u0442 ${field.min ?? "\u2212\u221E"} \u0434\u043E ${field.max ?? "\u221E"}.`
    };
  }
  if (field.step === 1 && !Number.isInteger(value)) {
    return {
      value,
      error: `\xAB${field.label}\xBB: \u043D\u0443\u0436\u043D\u043E \u0446\u0435\u043B\u043E\u0435 \u0447\u0438\u0441\u043B\u043E.`
    };
  }
  return { value };
}
function coerceList(field, raw) {
  const list = Array.isArray(raw) ? raw.map(String) : [String(raw)];
  const known = new Set((field.options ?? []).map((option) => option.value));
  const value = [...new Set(list)].filter((item) => known.has(item));
  if (value.length !== new Set(list).size) {
    return {
      value,
      error: `\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u044F \xAB${field.label}\xBB.`
    };
  }
  if (field.maxItems !== void 0 && value.length > field.maxItems) {
    return {
      value,
      error: `\xAB${field.label}\xBB: \u043D\u0435 \u0431\u043E\u043B\u044C\u0448\u0435 ${field.maxItems}.`
    };
  }
  return { value };
}
function coerceViewPrompts(field, raw) {
  const views = ["front", "left", "back", "right"];
  const list = Array.isArray(raw) ? raw : [];
  const value = [];
  for (const item of list) {
    const view = String(item?.view ?? "");
    const prompt = String(item?.prompt ?? "").trim();
    if (!views.includes(view) || !prompt || value.some((entry) => entry.view === view)) {
      return {
        value,
        error: `\xAB${field.label}\xBB: \u043F\u043E \u043E\u0434\u043D\u043E\u0439 \u043F\u0440\u0430\u0432\u043A\u0435 \u043D\u0430 \u0432\u0438\u0434, \u0442\u0435\u043A\u0441\u0442 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u0435\u043D.`
      };
    }
    value.push({
      view,
      prompt
    });
  }
  return { value };
}

// src/shared/studio3d/studio3dContracts.ts
var Studio3dContractError = class extends Error {
  constructor(path21) {
    super(`\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u043E\u0442\u0432\u0435\u0442 \u0440\u0430\u0437\u0434\u0435\u043B\u0430 \xAB3D\xBB: \u043F\u043E\u043B\u0435 ${path21}`);
    this.name = "Studio3dContractError";
  }
};
var VERSION_STATUSES = [
  "submitting",
  "waiting",
  "queued",
  "running",
  "downloading",
  "ready",
  "failed",
  "unknown",
  "unresolved",
  "remote",
  "lightened"
];
var ACTIVE_STATUSES = [
  "submitting",
  "waiting",
  "queued",
  "running",
  "downloading",
  "unknown"
];
var MODEL_ORIGINS = ["section", "agent", "file", "import"];
var MODEL_CATEGORIES = [
  {
    id: "character",
    label: "\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u0436"
  },
  {
    id: "prop",
    label: "\u041F\u0440\u0435\u0434\u043C\u0435\u0442"
  },
  {
    id: "part",
    label: "\u0414\u0435\u0442\u0430\u043B\u044C"
  },
  {
    id: "scene",
    label: "\u0421\u0446\u0435\u043D\u0430"
  }
];
var {
  boolean,
  listOf,
  mapOf,
  numeric,
  objectOf: baseObjectOf,
  oneOf,
  optional,
  text,
  wholeNumber
} = contractDecoders((path21) => {
  throw new Studio3dContractError(path21);
});
function objectOf(fields) {
  const decode2 = baseObjectOf(fields);
  return (value, path21) => {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      for (const key of Object.keys(value)) {
        if (!Object.hasOwn(fields, key)) {
          throw new Studio3dContractError(`${path21}.${key}`);
        }
      }
    }
    return decode2(value, path21);
  };
}
var amount = (value, path21) => {
  const result = numeric(value, path21);
  if (result < 0) {
    throw new Studio3dContractError(path21);
  }
  return result;
};
var percent = (value, path21) => {
  const result = wholeNumber(value, path21);
  if (result > 100) {
    throw new Studio3dContractError(path21);
  }
  return result;
};
var uuid = (value, path21) => {
  const result = text(value, path21);
  if (!/^[a-f0-9]{8}-[a-f0-9]{4}-[1-8][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(result)) {
    throw new Studio3dContractError(path21);
  }
  return result;
};
var PAYMENT_STATES = ["unpaid", "reserved", "charged", "refunded", "unknown", "free"];
var fieldValue = (value, path21) => {
  if (value === null || ["string", "boolean"].includes(typeof value) || typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (Array.isArray(value) && value.every((item) => typeof item === "string")) {
    return value;
  }
  if (Array.isArray(value)) {
    return listOf(objectOf({
      view: oneOf("front", "left", "back", "right"),
      prompt: text
    }))(value, path21);
  }
  throw new Studio3dContractError(path21);
};
var fieldValues = mapOf(fieldValue);
var scalar = (value, path21) => {
  if (value === null || ["string", "boolean"].includes(typeof value) || typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  throw new Studio3dContractError(path21);
};
var unitForms = objectOf({
  one: text,
  few: text,
  many: text
});
var statsSize = (value, path21) => {
  const result = listOf(amount)(value, path21);
  if (result.length !== 3) {
    throw new Studio3dContractError(path21);
  }
  return result;
};
var stats = objectOf({
  triangles: wholeNumber,
  vertices: wholeNumber,
  meshes: wholeNumber,
  materials: wholeNumber,
  bones: wholeNumber,
  animations: listOf(objectOf({
    name: text,
    duration: amount
  })),
  textures: listOf(optional(objectOf({
    format: oneOf("png", "jpeg", "webp"),
    width: wholeNumber,
    height: wholeNumber
  }))),
  size: optional(statsSize),
  facing: optional(oneOf("x", "z")),
  parts: listOf(text),
  extensions: listOf(text)
});
var fileEntry = objectOf({
  id: text,
  role: text,
  name: text,
  size: wholeNumber,
  url: text,
  sha256: text
});
var errorEntry = objectOf({
  kind: text,
  message: text,
  detail: optional(text)
});
var checkCommon = {
  jobId: uuid,
  childId: text,
  at: text
};
var checkDecoders = {
  pending: objectOf({ ...checkCommon, status: oneOf("pending") }),
  ready: objectOf({
    ...checkCommon,
    status: oneOf("ready"),
    riggable: boolean,
    rigType: optional(text)
  }),
  failed: objectOf({
    ...checkCommon,
    status: oneOf("failed"),
    error: errorEntry
  }),
  unknown: objectOf({
    ...checkCommon,
    status: oneOf("unknown"),
    error: optional(errorEntry)
  }),
  unresolved: objectOf({
    ...checkCommon,
    status: oneOf("unresolved"),
    error: optional(errorEntry)
  })
};
var rigCheck = (value, path21) => {
  const status = value && typeof value === "object" ? value.status : null;
  if (typeof status !== "string" || !Object.hasOwn(checkDecoders, status)) {
    throw new Studio3dContractError(`${path21}.status`);
  }
  return checkDecoders[status](value, path21);
};
var expenditureFields = {
  provider: text,
  unit: optional(unitForms),
  actual: amount,
  estimated: amount,
  refunded: amount,
  unknownCount: wholeNumber,
  unknownEstimated: amount
};
var expenditure = objectOf(expenditureFields);
var weeklyExpenditure = objectOf({
  ...expenditureFields,
  sectionActual: amount,
  externalActual: amount,
  reserved: amount
});
var version = objectOf({
  libraryId: uuid,
  id: text,
  seq: wholeNumber,
  parent: optional(text),
  kind: oneOf(...VERSION_KINDS),
  operation: optional(text),
  provider: optional(text),
  label: text,
  status: oneOf(...VERSION_STATUSES),
  progress: percent,
  etaSeconds: optional(numeric),
  params: fieldValues,
  files: listOf(fileEntry),
  preview: optional(text),
  stats: optional(stats),
  task: optional(objectOf({
    provider: text,
    id: text,
    type: text
  })),
  cost: objectOf({
    estimated: optional(amount),
    actual: optional(amount),
    free: boolean,
    unit: optional(unitForms),
    state: oneOf(...PAYMENT_STATES)
  }),
  error: optional(errorEntry),
  origin: oneOf(...MODEL_ORIGINS),
  createdAt: text,
  updatedAt: text,
  savedTo: listOf(objectOf({
    path: text,
    at: text,
    sha256: text
  })),
  rigCheck: optional(rigCheck),
  intentId: optional(uuid),
  childId: optional(text),
  waitReason: optional(text),
  retryAvailable: boolean,
  retryReason: optional(text),
  views: listOf(oneOf("front", "left", "back", "right")),
  mainFileId: optional(text)
});
var modelSummary = objectOf({
  id: text,
  name: text,
  project: optional(text),
  category: optional(oneOf("character", "prop", "part", "scene")),
  tags: listOf(text),
  origin: oneOf(...MODEL_ORIGINS),
  createdAt: text,
  updatedAt: text,
  mainVersion: optional(text),
  preview: optional(text),
  versions: wholeNumber,
  active: wholeNumber,
  spent: optional(amount),
  spending: listOf(expenditure),
  sizeBytes: wholeNumber,
  has: objectOf({
    rig: boolean,
    animation: boolean,
    parts: boolean,
    images: boolean
  })
});
var modelList = objectOf({
  libraryId: uuid,
  models: listOf(modelSummary),
  total: wholeNumber,
  broken: listOf(text)
});
var modelDetail = objectOf({
  libraryId: uuid,
  model: modelSummary,
  notes: text,
  versions: listOf(version),
  incoming: listOf(text),
  modelDirectory: text,
  saveFolders: optional(mapOf(mapOf(text)))
});
var providerState = objectOf({
  id: text,
  name: text,
  local: boolean,
  available: boolean,
  unit: optional(unitForms),
  balance: optional(objectOf({
    available: amount,
    reserved: amount
  })),
  billingUrl: optional(text)
});
var state = objectOf({
  libraryId: uuid,
  library: objectOf({
    dir: text,
    ok: boolean,
    error: optional(text),
    bytes: wholeNumber,
    freeBytes: optional(wholeNumber),
    lowDisk: boolean,
    modelBytes: wholeNumber,
    inputBytes: wholeNumber,
    temporaryBytes: wholeNumber
  }),
  providers: listOf(providerState),
  active: wholeNumber,
  autoImport: boolean
});
var quote = objectOf({
  total: optional(amount),
  lines: listOf(objectOf({
    label: text,
    amount
  })),
  unit: optional(unitForms),
  usd: optional(amount),
  note: optional(text)
});
var issue = objectOf({
  field: optional(text),
  message: text
});
var validation = objectOf({
  values: fieldValues,
  errors: listOf(issue),
  warnings: listOf(issue)
});
var fieldOption = objectOf({
  value: text,
  label: text,
  hint: optional(text),
  group: optional(text)
});
var operationField = objectOf({
  id: text,
  kind: oneOf("text", "textarea", "number", "select", "toggle", "multiselect", "view-prompts"),
  label: text,
  hint: optional(text),
  required: optional(boolean),
  default: optional(fieldValue),
  min: optional(numeric),
  max: optional(numeric),
  step: optional(numeric),
  maxLength: optional(wholeNumber),
  maxItems: optional(wholeNumber),
  unit: optional(text),
  options: optional(listOf(fieldOption)),
  advanced: optional(boolean),
  visibleWhen: optional(listOf(objectOf({
    field: text,
    is: optional(listOf(scalar)),
    not: optional(listOf(scalar))
  })))
});
var offer = objectOf({
  provider: text,
  providerName: text,
  local: boolean,
  operation: text,
  label: text,
  group: text,
  fields: listOf(operationField),
  presets: listOf(objectOf({
    id: text,
    label: text,
    hint: optional(text),
    values: fieldValues
  })),
  note: optional(text),
  priceKnown: boolean,
  available: boolean,
  reason: optional(text),
  quote
});
var taskRow = objectOf({
  intentId: text,
  childId: text,
  modelId: optional(text),
  modelName: optional(text),
  versionId: optional(text),
  label: text,
  provider: optional(text),
  status: oneOf(...VERSION_STATUSES),
  progress: percent,
  etaSeconds: optional(numeric),
  estimated: optional(amount),
  actual: optional(amount),
  paymentState: oneOf(...PAYMENT_STATES),
  unit: optional(unitForms),
  waitReason: optional(text),
  retryAvailable: boolean,
  retryReason: optional(text),
  error: optional(errorEntry),
  updatedAt: text
});
var externalTask = objectOf({
  provider: text,
  taskId: text,
  type: text,
  label: text,
  credits: optional(amount),
  createdAt: optional(text),
  modelId: optional(text)
});
var upload = objectOf({
  libraryId: uuid,
  uploadId: text,
  name: text,
  kind: oneOf("image", "model"),
  size: wholeNumber,
  stats: optional(stats),
  width: optional(wholeNumber),
  height: optional(wholeNumber)
});
var jobChild = objectOf({
  childId: text,
  versionId: optional(text),
  operation: text,
  provider: optional(text),
  status: oneOf(...VERSION_STATUSES),
  waitReason: optional(text),
  estimated: amount,
  actual: optional(amount),
  unit: optional(unitForms),
  paymentState: oneOf(...PAYMENT_STATES),
  taskId: optional(text),
  candidates: listOf(objectOf({
    taskId: text,
    type: text,
    createdAt: optional(text),
    credits: optional(amount)
  })),
  retryAvailable: boolean,
  retryReason: optional(text),
  error: optional(errorEntry)
});
var job = objectOf({
  intentId: uuid,
  libraryId: uuid,
  deleted: boolean,
  modelId: optional(text),
  children: listOf(jobChild),
  updatedAt: text
});
var batchRow = objectOf({
  provider: text,
  operation: text,
  values: fieldValues,
  name: text,
  project: optional(text),
  category: optional(oneOf("character", "prop", "part", "scene")),
  expectedPrice: amount
});
var batchSnapshot = objectOf({
  libraryId: uuid,
  rows: listOf(batchRow),
  catalogVersion: text,
  totalEstimated: amount,
  unit: optional(unitForms)
});
var batchQuote = objectOf({
  libraryId: uuid,
  snapshot: batchSnapshot,
  snapshotHash: text,
  totalEstimated: amount,
  unit: optional(unitForms)
});
var batchRun = objectOf({
  intentId: uuid,
  libraryId: uuid,
  children: listOf(objectOf({
    childId: text,
    intentId: uuid,
    modelId: optional(text),
    status: oneOf(...VERSION_STATUSES),
    estimated: amount
  })),
  totalEstimated: amount,
  unit: optional(unitForms),
  status: oneOf(...VERSION_STATUSES)
});
function runProjection(value) {
  const result = objectOf({
    libraryId: uuid,
    intentId: uuid,
    deleted: boolean,
    checkJobId: optional(uuid),
    model: optional(modelSummary),
    versions: listOf(version)
  })(value, "run");
  if (result.deleted ? result.model !== null || result.versions.length !== 0 : result.model === null) {
    throw new Studio3dContractError("run.model");
  }
  return result;
}
var parseStudio3d = {
  ok: (value) => objectOf({ libraryId: uuid, ok: oneOf(true) })(value, "ok"),
  values: (value) => fieldValues(value, "values"),
  unit: (value) => optional(unitForms)(value, "unit"),
  price: (value) => quote(value, "price"),
  validation: (value) => validation(value, "validation"),
  stats: (value) => stats(value, "stats"),
  state: (value) => state(value, "state"),
  models: (value) => modelList(value, "models"),
  model: (value) => modelDetail(value, "model"),
  version: (value) => version(value, "version"),
  offers: (value) => objectOf({ libraryId: uuid, offers: listOf(offer) })(value, "offers"),
  quote: (value) => objectOf({
    libraryId: uuid,
    quote,
    validation
  })(value, "quote"),
  run: runProjection,
  job: (value) => job(value, "job"),
  batchQuote: (value) => batchQuote(value, "batchQuote"),
  batchRun: (value) => batchRun(value, "batchRun"),
  createdModel: (value) => objectOf({
    libraryId: uuid,
    model: modelSummary,
    version
  })(value, "createdModel"),
  upload: (value) => upload(value, "upload"),
  tasks: (value) => objectOf({
    libraryId: uuid,
    active: listOf(taskRow),
    recent: listOf(taskRow),
    external: listOf(externalTask),
    week: objectOf({
      partial: boolean,
      groups: listOf(weeklyExpenditure)
    }),
    historyPartial: boolean,
    historyError: optional(text)
  })(value, "tasks"),
  save: (value) => objectOf({
    libraryId: uuid,
    path: text,
    overwritten: boolean
  })(value, "save"),
  scan: (value) => objectOf({
    libraryId: uuid,
    found: wholeNumber,
    imported: wholeNumber,
    skipped: wholeNumber,
    partial: boolean,
    reasons: listOf(text)
  })(value, "scan"),
  lighten: (value) => objectOf({ libraryId: uuid, freed: wholeNumber })(value, "lighten"),
  imported: (value) => objectOf({ libraryId: uuid, modelId: text })(value, "imported"),
  viewer: (value) => objectOf({
    libraryId: uuid,
    url: text,
    name: text,
    ext: text,
    size: wholeNumber,
    libraryRef: optional(objectOf({
      modelId: text,
      versionId: text
    }))
  })(value, "viewer")
};

// src/lib/documents/reader.ts
import { constants as FS, promises as fs } from "node:fs";
import path from "node:path";
import { TextDecoder as TextDecoder2 } from "node:util";
var ALLOWED_EXTENSIONS = /* @__PURE__ */ new Map([
  [".md", "markdown"],
  [".markdown", "markdown"],
  [".txt", "text"]
]);
var ALLOWED_ASSET_EXTENSIONS = /* @__PURE__ */ new Map([
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".gif", "image/gif"],
  [".webp", "image/webp"]
]);
var SCOPE_RE = /^([a-z][a-z0-9-]{0,31}):([A-Za-z0-9_-]{1,128})$/;
var SCOPED_SOURCE_RE = /^([a-z][a-z0-9-]{0,31}:[A-Za-z0-9_-]{1,128}):\d{1,4}$/;
var DEFAULT_MAX_BYTES = 16 * 1024 * 1024;
var DEFAULT_MAX_ASSET_BYTES = 5e6;
var READ_CHUNK_BYTES = 64 * 1024;
var DocumentReadError = class extends Error {
  code;
  statusCode;
  constructor(code, message, statusCode, cause = null) {
    super(message, cause ? { cause } : void 0);
    this.name = "DocumentReadError";
    this.code = code;
    this.statusCode = statusCode;
  }
};
function fail(code, message, statusCode) {
  throw new DocumentReadError(code, message, statusCode);
}
function isInside(root, target) {
  const relative = path.relative(root, target);
  return relative === "" || !path.isAbsolute(relative) && relative !== ".." && !relative.startsWith(`..${path.sep}`);
}
function assertMostSpecificOwner(roots, source, target) {
  const owner = roots.find((root) => isInside(root.path, target));
  if (!owner || owner.id !== source.id || owner.path !== source.path) {
    fail("document_source_mismatch", "\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442 \u043F\u0440\u0438\u043D\u0430\u0434\u043B\u0435\u0436\u0438\u0442 \u0434\u0440\u0443\u0433\u043E\u043C\u0443 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0443", 403);
  }
  return owner;
}
function formatOf(filePath) {
  return ALLOWED_EXTENSIONS.get(path.extname(filePath).toLowerCase()) || "";
}
function assetTypeOf(filePath) {
  return ALLOWED_ASSET_EXTENSIONS.get(path.extname(filePath).toLowerCase()) || "";
}
function byteLimit(value, fallback, { ceiling = Number.MAX_SAFE_INTEGER } = {}) {
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < 1) return fallback;
  return Math.min(parsed, ceiling);
}
function snapshotSize(stat) {
  const size = Number(stat?.size);
  if (!Number.isSafeInteger(size) || size < 0) {
    fail("document_unsafe_file", "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C \u0440\u0430\u0437\u043C\u0435\u0440 \u043E\u0431\u044B\u0447\u043D\u043E\u0433\u043E \u0444\u0430\u0439\u043B\u0430", 403);
  }
  return size;
}
function snapshotRevision(stat, nanoseconds, milliseconds) {
  const record = stat;
  return record?.[nanoseconds] ?? record?.[milliseconds];
}
function sameSnapshot(before, after) {
  return before?.dev === after?.dev && before?.ino === after?.ino && before?.mode === after?.mode && before?.nlink === after?.nlink && before?.size === after?.size && snapshotRevision(before, "mtimeNs", "mtimeMs") === snapshotRevision(after, "mtimeNs", "mtimeMs") && snapshotRevision(before, "ctimeNs", "ctimeMs") === snapshotRevision(after, "ctimeNs", "ctimeMs");
}
function assertInitialSnapshot(stat, maxBytes, kind) {
  if (!stat?.isFile?.()) fail("document_not_file", "\u041F\u0443\u0442\u044C \u043D\u0435 \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043E\u0431\u044B\u0447\u043D\u044B\u043C \u0444\u0430\u0439\u043B\u043E\u043C", 415);
  if (stat.nlink !== 1 && stat.nlink !== 1n) {
    fail("document_unsafe_file", "\u0424\u0430\u0439\u043B \u0441 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u0438\u043C\u0438 \u0436\u0451\u0441\u0442\u043A\u0438\u043C\u0438 \u0441\u0441\u044B\u043B\u043A\u0430\u043C\u0438 \u0437\u0430\u043F\u0440\u0435\u0449\u0451\u043D", 403);
  }
  const size = snapshotSize(stat);
  if (size > maxBytes) {
    const label = kind === "asset" ? "\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435" : "\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442";
    fail("document_too_large", `${label} \u0431\u043E\u043B\u044C\u0448\u0435 ${maxBytes} \u0431\u0430\u0439\u0442`, 413);
  }
  return size;
}
function assertStableSnapshot(before, after, bytesRead) {
  const afterSize = snapshotSize(after);
  if (!after?.isFile?.() || after.nlink !== 1 && after.nlink !== 1n || !sameSnapshot(before, after) || bytesRead !== afterSize) {
    fail("document_changed", "\u0424\u0430\u0439\u043B \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0441\u044F \u0432\u043E \u0432\u0440\u0435\u043C\u044F \u0447\u0442\u0435\u043D\u0438\u044F", 409);
  }
}
async function canonicalDirectory(value) {
  const entry = value;
  const raw = String(entry?.path || "");
  if (!raw || !path.isAbsolute(raw)) return null;
  try {
    const canonical = await fs.realpath(raw);
    const stat = await fs.stat(canonical);
    if (!stat.isDirectory()) return null;
    return {
      id: String(entry?.id || path.basename(canonical) || "root"),
      label: String(entry?.label || entry?.id || path.basename(canonical) || "\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B"),
      path: canonical
    };
  } catch {
    return null;
  }
}
async function readLimited(handle, maxBytes) {
  const chunks = [];
  let total = 0;
  while (total <= maxBytes) {
    const room = maxBytes + 1 - total;
    const chunk = Buffer.allocUnsafe(Math.min(READ_CHUNK_BYTES, room));
    const { bytesRead } = await handle.read(chunk, 0, chunk.length, null);
    if (!bytesRead) break;
    chunks.push(chunk.subarray(0, bytesRead));
    total += bytesRead;
  }
  if (total > maxBytes) {
    fail("document_too_large", `\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442 \u0431\u043E\u043B\u044C\u0448\u0435 ${maxBytes} \u0431\u0430\u0439\u0442`, 413);
  }
  return Buffer.concat(chunks, total);
}
function publicReadError(value) {
  if (value instanceof DocumentReadError) return value;
  const error = value;
  if (error?.code === "ENOENT" || error?.code === "ENOTDIR") {
    return new DocumentReadError("document_not_found", "\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D", 404);
  }
  if (error?.code === "EACCES" || error?.code === "EPERM") {
    return new DocumentReadError("document_unreadable", "\u041D\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \u043A \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0443", 403);
  }
  if (error?.code === "ELOOP") {
    return new DocumentReadError("document_unsafe_path", "\u041D\u0435\u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u044B\u0439 \u043F\u0443\u0442\u044C \u043A \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0443", 403);
  }
  return new DocumentReadError(
    "document_read_failed",
    "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E \u043F\u0440\u043E\u0447\u0438\u0442\u0430\u0442\u044C \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442",
    500,
    value
  );
}
var DocumentReader = class {
  rootProviders;
  scopeProviders = /* @__PURE__ */ new Map();
  maxBytes;
  maxAssetBytes;
  resolveOpenedPath;
  statOpenedFile;
  constructor({
    rootProviders = [],
    maxBytes = DEFAULT_MAX_BYTES,
    maxAssetBytes = DEFAULT_MAX_ASSET_BYTES,
    deps = {}
  } = {}) {
    this.rootProviders = [...rootProviders];
    this.maxBytes = byteLimit(maxBytes, DEFAULT_MAX_BYTES, { ceiling: DEFAULT_MAX_BYTES });
    this.maxAssetBytes = byteLimit(maxAssetBytes, DEFAULT_MAX_ASSET_BYTES);
    this.resolveOpenedPath = deps.resolveOpenedPath || ((handle) => fs.realpath(`/proc/self/fd/${handle.fd}`));
    this.statOpenedFile = deps.statOpenedFile || ((handle) => handle.stat({ bigint: true }));
    if (typeof this.resolveOpenedPath !== "function" || typeof this.statOpenedFile !== "function") {
      throw new TypeError("document reader deps must be functions");
    }
  }
  async verifiedOpenedPath(handle, sourceRoot, expectedPath) {
    let openedPath;
    try {
      openedPath = await this.resolveOpenedPath(handle);
    } catch {
      fail("document_unsafe_path", "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C \u043F\u0443\u0442\u044C \u043E\u0442\u043A\u0440\u044B\u0442\u043E\u0433\u043E \u0444\u0430\u0439\u043B\u0430", 403);
    }
    if (typeof openedPath !== "string" || !path.isAbsolute(openedPath) || openedPath !== expectedPath || !isInside(sourceRoot, openedPath)) {
      fail("document_unsafe_path", "\u041F\u0443\u0442\u044C \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0441\u044F \u0432\u043E \u0432\u0440\u0435\u043C\u044F \u043E\u0442\u043A\u0440\u044B\u0442\u0438\u044F", 403);
    }
    return openedPath;
  }
  /** Зарегистрировать ещё один источник корней на этапе сборки приложения. */
  addRootProvider(provider) {
    if (typeof provider !== "function") throw new TypeError("document root provider must be a function");
    this.rootProviders.push(provider);
    return this;
  }
  /**
   * Зарегистрировать поставщика корней области `kind`. Корни области не попадают в общий
   * список: их видит только запрос, который явно назвал область (`kind:id`).
   */
  addScopeProvider(kind, provider) {
    if (!/^[a-z][a-z0-9-]{0,31}$/.test(kind)) {
      throw new TypeError("document scope kind is invalid");
    }
    if (typeof provider !== "function") {
      throw new TypeError("document scope provider must be a function");
    }
    if (this.scopeProviders.has(kind)) {
      throw new TypeError(`document scope ${kind} is already registered`);
    }
    this.scopeProviders.set(kind, provider);
    return this;
  }
  /**
   * Общие корни плюс корни названной области. Общий корень с тем же путём побеждает:
   * один каталог не получает двух id, а документ GrigDesk остаётся ссылкой `grigdesk`.
   */
  async roots(scope = "") {
    const declared = [];
    for (const provider of this.rootProviders) {
      const entries = await provider();
      if (Array.isArray(entries)) declared.push(...entries);
    }
    const canonical = (await Promise.all(declared.map(canonicalDirectory))).filter((root) => Boolean(root));
    const roots = [];
    const byId = /* @__PURE__ */ new Map();
    const byPath = /* @__PURE__ */ new Map();
    for (const root of canonical) {
      const sameId = byId.get(root.id);
      const samePath = byPath.get(root.path);
      if (sameId && sameId.path !== root.path || samePath && samePath.id !== root.id) {
        fail("document_source_conflict", "\u041A\u043E\u043D\u0444\u043B\u0438\u043A\u0442 \u043A\u043E\u043D\u0444\u0438\u0433\u0443\u0440\u0430\u0446\u0438\u0438 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u043E\u0432 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432", 500);
      }
      if (sameId || samePath) continue;
      byId.set(root.id, root);
      byPath.set(root.path, root);
      roots.push(root);
    }
    for (const root of await this.scopeRoots(scope)) {
      if (byPath.has(root.path)) {
        continue;
      }
      byPath.set(root.path, root);
      roots.push(root);
    }
    return roots.sort((a, b) => b.path.length - a.path.length);
  }
  /**
   * Канонические корни одной области с id `вид:id:номер`. Неизвестная или пустая область
   * ничего не добавляет: отказ поставщика не расширяет и не ломает общий список.
   */
  async scopeRoots(scope) {
    const match = SCOPE_RE.exec(String(scope || ""));
    const [name = "", kind = "", scopeId = ""] = match || [];
    const provider = this.scopeProviders.get(kind);
    if (!name || !provider) {
      return [];
    }
    let entries;
    try {
      entries = await provider(scopeId);
    } catch {
      return [];
    }
    if (!Array.isArray(entries)) {
      return [];
    }
    const roots = await Promise.all(entries.map((entry, index) => {
      const declared = entry;
      return canonicalDirectory({
        id: `${name}:${index}`,
        label: String(declared?.label || ""),
        path: declared?.path
      });
    }));
    const seen = /* @__PURE__ */ new Set();
    return roots.filter((root) => {
      if (!root || seen.has(root.path)) {
        return false;
      }
      seen.add(root.path);
      return true;
    });
  }
  /**
   * Превратить старую абсолютную ссылку агента в стабильный DocumentRef. Этот метод
   * не читает содержимое; HTTP использует его только на входе bridge-route.
   * `scope` добавляет к общим корням папки названной области (`chat:<id>`).
   */
  async resolveAbsolute(inputPath, scope = "") {
    const requested = String(inputPath || "");
    if (!requested || requested.includes("\0") || !path.isAbsolute(requested)) {
      fail("document_bad_path", "\u041D\u0443\u0436\u0435\u043D \u0430\u0431\u0441\u043E\u043B\u044E\u0442\u043D\u044B\u0439 \u043F\u0443\u0442\u044C \u043A \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0443", 400);
    }
    if (!formatOf(requested)) {
      fail("document_type_not_allowed", "\u041C\u043E\u0436\u043D\u043E \u043F\u0440\u043E\u0441\u043C\u0430\u0442\u0440\u0438\u0432\u0430\u0442\u044C \u0442\u043E\u043B\u044C\u043A\u043E .md, .markdown \u0438 .txt", 415);
    }
    let canonical;
    try {
      canonical = await fs.realpath(requested);
    } catch (error) {
      throw publicReadError(error);
    }
    const format = formatOf(canonical);
    if (!format) {
      fail("document_type_not_allowed", "\u0426\u0435\u043B\u0435\u0432\u043E\u0439 \u0444\u0430\u0439\u043B \u0438\u043C\u0435\u0435\u0442 \u043D\u0435\u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u043C\u044B\u0439 \u0442\u0438\u043F", 415);
    }
    const roots = await this.roots(scope);
    const source = roots.find((root) => isInside(root.path, canonical));
    if (!source) {
      fail("document_outside_roots", "\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442 \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u0441\u044F \u0432\u043D\u0435 \u0440\u0430\u0437\u0440\u0435\u0448\u0451\u043D\u043D\u044B\u0445 \u043A\u043E\u0440\u043D\u0435\u0439", 403);
    }
    const relativePath = path.relative(source.path, canonical);
    return {
      ref: { source: source.id, path: relativePath },
      name: path.basename(canonical),
      format,
      source: { id: source.id, label: source.label }
    };
  }
  async read(documentRef) {
    const sourceId = String(documentRef?.source || "");
    const relativePath = String(documentRef?.path || "");
    if (!sourceId || !relativePath || relativePath.includes("\0") || path.isAbsolute(relativePath)) {
      fail("document_bad_ref", "\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u0430\u044F \u0441\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442", 400);
    }
    if (!formatOf(relativePath)) {
      fail("document_type_not_allowed", "\u041C\u043E\u0436\u043D\u043E \u043F\u0440\u043E\u0441\u043C\u0430\u0442\u0440\u0438\u0432\u0430\u0442\u044C \u0442\u043E\u043B\u044C\u043A\u043E .md, .markdown \u0438 .txt", 415);
    }
    const roots = await this.roots(SCOPED_SOURCE_RE.exec(sourceId)?.[1] || "");
    const source = roots.find((root) => root.id === sourceId);
    if (!source) fail("document_unknown_source", "\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D", 404);
    const candidate = path.resolve(source.path, relativePath);
    if (!isInside(source.path, candidate)) {
      fail("document_outside_roots", "\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442 \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u0441\u044F \u0432\u043D\u0435 \u0440\u0430\u0437\u0440\u0435\u0448\u0451\u043D\u043D\u043E\u0433\u043E \u043A\u043E\u0440\u043D\u044F", 403);
    }
    let canonical;
    try {
      canonical = await fs.realpath(candidate);
    } catch (error) {
      throw publicReadError(error);
    }
    if (!isInside(source.path, canonical)) {
      fail("document_outside_roots", "\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442 \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u0441\u044F \u0432\u043D\u0435 \u0440\u0430\u0437\u0440\u0435\u0448\u0451\u043D\u043D\u043E\u0433\u043E \u043A\u043E\u0440\u043D\u044F", 403);
    }
    assertMostSpecificOwner(roots, source, canonical);
    const format = formatOf(canonical);
    if (!format) fail("document_type_not_allowed", "\u0426\u0435\u043B\u0435\u0432\u043E\u0439 \u0444\u0430\u0439\u043B \u0438\u043C\u0435\u0435\u0442 \u043D\u0435\u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u043C\u044B\u0439 \u0442\u0438\u043F", 415);
    let handle;
    try {
      const flags = FS.O_RDONLY | (FS.O_NOFOLLOW || 0) | (FS.O_NONBLOCK || 0);
      handle = await fs.open(canonical, flags);
      const stat = await this.statOpenedFile(handle);
      assertInitialSnapshot(stat, this.maxBytes, "document");
      const openedPath = await this.verifiedOpenedPath(handle, source.path, canonical);
      assertMostSpecificOwner(roots, source, openedPath);
      const buffer = await readLimited(handle, this.maxBytes);
      const after = await this.statOpenedFile(handle);
      assertStableSnapshot(stat, after, buffer.length);
      assertMostSpecificOwner(
        roots,
        source,
        await this.verifiedOpenedPath(handle, source.path, canonical)
      );
      if (buffer.includes(0)) fail("document_binary", "\u0411\u0438\u043D\u0430\u0440\u043D\u044B\u0435 \u0444\u0430\u0439\u043B\u044B \u043D\u0435 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u044E\u0442\u0441\u044F", 415);
      let content;
      try {
        content = new TextDecoder2("utf-8", { fatal: true }).decode(buffer);
      } catch {
        fail("document_encoding", "\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442 \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u0432 UTF-8", 415);
      }
      if (content.charCodeAt(0) === 65279) content = content.slice(1);
      return {
        ref: { source: source.id, path: path.relative(source.path, openedPath) },
        name: path.basename(openedPath),
        displayPath: path.relative(source.path, openedPath) || path.basename(openedPath),
        format,
        size: buffer.length,
        modifiedAt: stat.mtime.toISOString(),
        source: { id: source.id, label: source.label },
        content
      };
    } catch (error) {
      throw publicReadError(error);
    } finally {
      await handle?.close().catch(() => {
      });
    }
  }
  /** Картинки Markdown читаются по тем же границам source/realpath, но как Buffer. */
  async readAsset(documentRef) {
    const sourceId = String(documentRef?.source || "");
    const relativePath = String(documentRef?.path || "");
    if (!sourceId || !relativePath || relativePath.includes("\0") || path.isAbsolute(relativePath)) {
      fail("document_bad_ref", "\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u0430\u044F \u0441\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435", 400);
    }
    if (!assetTypeOf(relativePath)) {
      fail("document_asset_type_not_allowed", "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u044E\u0442\u0441\u044F PNG, JPEG, GIF \u0438 WebP", 415);
    }
    const roots = await this.roots(SCOPED_SOURCE_RE.exec(sourceId)?.[1] || "");
    const source = roots.find((root) => root.id === sourceId);
    if (!source) fail("document_unknown_source", "\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u043E\u0432 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D", 404);
    const candidate = path.resolve(source.path, relativePath);
    if (!isInside(source.path, candidate)) {
      fail("document_outside_roots", "\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u0441\u044F \u0432\u043D\u0435 \u0440\u0430\u0437\u0440\u0435\u0448\u0451\u043D\u043D\u043E\u0433\u043E \u043A\u043E\u0440\u043D\u044F", 403);
    }
    let canonical;
    try {
      canonical = await fs.realpath(candidate);
    } catch (error) {
      throw publicReadError(error);
    }
    if (!isInside(source.path, canonical)) {
      fail("document_outside_roots", "\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u0441\u044F \u0432\u043D\u0435 \u0440\u0430\u0437\u0440\u0435\u0448\u0451\u043D\u043D\u043E\u0433\u043E \u043A\u043E\u0440\u043D\u044F", 403);
    }
    assertMostSpecificOwner(roots, source, canonical);
    const contentType = assetTypeOf(canonical);
    if (!contentType) fail("document_asset_type_not_allowed", "\u0426\u0435\u043B\u0435\u0432\u043E\u0439 \u0444\u0430\u0439\u043B \u0438\u043C\u0435\u0435\u0442 \u043D\u0435\u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u043C\u044B\u0439 \u0442\u0438\u043F", 415);
    let handle;
    try {
      const flags = FS.O_RDONLY | (FS.O_NOFOLLOW || 0) | (FS.O_NONBLOCK || 0);
      handle = await fs.open(canonical, flags);
      const stat = await this.statOpenedFile(handle);
      assertInitialSnapshot(stat, this.maxAssetBytes, "asset");
      assertMostSpecificOwner(
        roots,
        source,
        await this.verifiedOpenedPath(handle, source.path, canonical)
      );
      const content = await readLimited(handle, this.maxAssetBytes);
      const after = await this.statOpenedFile(handle);
      assertStableSnapshot(stat, after, content.length);
      assertMostSpecificOwner(
        roots,
        source,
        await this.verifiedOpenedPath(handle, source.path, canonical)
      );
      return { content, contentType, size: content.length, modifiedAt: stat.mtime.toISOString() };
    } catch (error) {
      throw publicReadError(error);
    } finally {
      await handle?.close().catch(() => {
      });
    }
  }
};

// src/lib/pathLock.ts
var locks = /* @__PURE__ */ new Map();
async function withPathLock(key, task) {
  const run = (locks.get(key) ?? Promise.resolve()).then(task);
  const tail = run.catch(() => void 0);
  locks.set(key, tail);
  try {
    return await run;
  } finally {
    if (locks.get(key) === tail) {
      locks.delete(key);
    }
  }
}

// src/lib/studio3d/glb.ts
var GLB_MAX_BYTES = 150 * 1024 * 1024;
var GLB_JSON_MAX_BYTES = 16 * 1024 * 1024;
var FACE_PLUS_Z = [0, -Math.SQRT1_2, 0, Math.SQRT1_2];

// src/lib/studio3d/safePath.ts
import { createHash, randomUUID } from "node:crypto";
import { constants as FS2, promises as fs2 } from "node:fs";
import path2 from "node:path";
import { Transform } from "node:stream";
import { pipeline } from "node:stream/promises";

// src/lib/studio3d/fileStreams.ts
import { createReadStream, createWriteStream } from "node:fs";
function borrowedReadStream(handle, name) {
  return createReadStream(name, {
    fd: handle.fd,
    autoClose: false,
    start: 0,
    fs: {
      read(_fd, buffer, offset, length, position, callback) {
        void handle.read(buffer, offset, length, position).then((result) => callback(null, result.bytesRead, buffer), (error) => callback(error, 0, buffer));
      },
      close(_fd, callback) {
        callback(null);
      }
    }
  });
}
function borrowedWriteStream(handle, name) {
  return createWriteStream(name, {
    fd: handle.fd,
    autoClose: false,
    fs: {
      write(_fd, buffer, offset, length, position, callback) {
        void handle.write(buffer, offset, length, position).then((result) => callback(null, result.bytesWritten, buffer), (error) => callback(
          error,
          0,
          buffer
        ));
      },
      close(_fd, callback) {
        callback(null);
      }
    }
  });
}

// src/lib/studio3d/safePath.ts
var reader = new DocumentReader();
var SafePathError = class extends Error {
  code;
  constructor(code) {
    super(code === "exists" ? "\u0424\u0430\u0439\u043B \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442." : code === "changed" ? "\u0424\u0430\u0439\u043B \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0441\u044F: \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u0430\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u043E\u0435 \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u043C\u043E\u0435." : "\u041D\u0435\u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u044B\u0439 \u043F\u0443\u0442\u044C \u0438\u043B\u0438 \u0444\u0430\u0439\u043B.");
    this.name = "SafePathError";
    this.code = code;
  }
};
function isSafeName(name) {
  return typeof name === "string" && /^[A-Za-z0-9][A-Za-z0-9._-]{0,120}$/.test(name) && !name.includes("..");
}
function isExternalName(name) {
  return typeof name === "string" && name.trim().length > 0 && !name.startsWith(".") && !name.includes("..") && !/[\/\\\x00-\x1f\x7f-\x9f]/.test(name);
}
function safePathText(value) {
  return !value.includes("\0") && !/%(?:2e|2f|5c|00|25)/i.test(value);
}
async function insideRoot(root, target) {
  if (!safePathText(root) || !safePathText(target)) {
    return false;
  }
  try {
    const canonicalRoot = await fs2.realpath(root);
    let ancestor = path2.resolve(target);
    const suffix = [];
    for (; ; ) {
      try {
        ancestor = await fs2.realpath(ancestor);
        break;
      } catch (error) {
        if (error.code !== "ENOENT") {
          return false;
        }
        suffix.unshift(path2.basename(ancestor));
        ancestor = path2.dirname(ancestor);
      }
    }
    const relative = path2.relative(canonicalRoot, path2.join(ancestor, ...suffix));
    return relative === "" || !path2.isAbsolute(relative) && relative !== ".." && !relative.startsWith(`..${path2.sep}`);
  } catch {
    return false;
  }
}
function openNoFollow(file) {
  return fs2.open(file, FS2.O_RDONLY | FS2.O_NOFOLLOW | FS2.O_NONBLOCK);
}
function fileRevision(stat) {
  return [stat.dev, stat.ino, stat.size, stat.mtimeNs, stat.ctimeNs, stat.nlink].join(":");
}
async function anchoredRoot(root) {
  const canonical = await fs2.realpath(root);
  if (canonical !== path2.resolve(root)) {
    throw new SafePathError("changed");
  }
  return canonical;
}
async function openVerified(root, file) {
  if (!await insideRoot(root, file)) {
    throw new SafePathError("unsafe_path");
  }
  const canonicalRoot = await anchoredRoot(root);
  const canonical = await fs2.realpath(file);
  const handle = await openNoFollow(file);
  try {
    const stat = await handle.stat({ bigint: true });
    if (!stat.isFile() || stat.nlink !== 1n) {
      throw new SafePathError("invalid_file");
    }
    await reader.verifiedOpenedPath(handle, canonicalRoot, canonical);
    const revision2 = fileRevision(stat);
    const verify = async () => {
      await anchoredRoot(canonicalRoot);
      await reader.verifiedOpenedPath(handle, canonicalRoot, canonical);
      const [current, atPath] = await Promise.all([
        handle.stat({ bigint: true }),
        fs2.lstat(canonical, { bigint: true })
      ]);
      if (fileRevision(current) !== revision2 || current.dev !== atPath.dev || current.ino !== atPath.ino || !atPath.isFile() || atPath.isSymbolicLink() || !await insideRoot(canonicalRoot, canonical)) {
        throw new SafePathError("changed");
      }
    };
    await verify();
    return {
      handle,
      canonical,
      root: canonicalRoot,
      revision: revision2,
      size: Number(stat.size),
      verify
    };
  } catch (error) {
    await handle.close();
    throw error;
  }
}
async function pinDirectory(root, directory) {
  if (!await insideRoot(root, directory)) {
    throw new SafePathError("unsafe_path");
  }
  const canonicalRoot = await anchoredRoot(root);
  const canonical = await fs2.realpath(directory);
  const handle = await fs2.open(directory, FS2.O_RDONLY | FS2.O_DIRECTORY | FS2.O_NOFOLLOW);
  const verify = async () => {
    await anchoredRoot(canonicalRoot);
    await reader.verifiedOpenedPath(handle, canonicalRoot, canonical);
    const [current, atPath] = await Promise.all([handle.stat(), fs2.lstat(canonical)]);
    if (!current.isDirectory() || !atPath.isDirectory() || current.dev !== atPath.dev || current.ino !== atPath.ino || !await insideRoot(canonicalRoot, canonical)) {
      throw new SafePathError("changed");
    }
  };
  try {
    await verify();
    return {
      canonical,
      root: canonicalRoot,
      handle,
      verify,
      child: (name) => `/proc/self/fd/${handle.fd}/${name}`,
      close: () => handle.close()
    };
  } catch (error) {
    await handle.close();
    throw error;
  }
}
async function ensureDirectory(root, target) {
  if (!await insideRoot(root, target)) {
    throw new SafePathError("unsafe_path");
  }
  const canonicalRoot = await anchoredRoot(root);
  const components = path2.relative(canonicalRoot, path2.resolve(target)).split(path2.sep).filter(Boolean);
  let current = canonicalRoot;
  for (const name of components) {
    if (!isExternalName(name) && ![".jobs", ".uploads"].includes(name)) {
      throw new SafePathError("unsafe_path");
    }
    const parent = await pinDirectory(canonicalRoot, current);
    try {
      await parent.verify();
      await fs2.mkdir(parent.child(name), { mode: 448 }).catch((error) => {
        if (error.code !== "EEXIST") {
          throw error;
        }
      });
      await parent.verify();
      current = path2.join(current, name);
      const child = await pinDirectory(canonicalRoot, current);
      await child.close();
    } finally {
      await parent.close();
    }
  }
}
async function verifiedHash(root, file) {
  const opened = await openVerified(root, file);
  const hash = createHash("sha256");
  try {
    await pipeline(borrowedReadStream(opened.handle, opened.canonical), hash);
    await opened.verify();
    return { size: opened.size, sha256: hash.digest("hex") };
  } finally {
    await opened.handle.close();
  }
}
async function publish(directory, temporary, target, options) {
  await directory.verify();
  if (options.overwrite) {
    if (!options.internalReplace) {
      if (!options.expectedSha256) {
        throw new SafePathError("changed");
      }
      const previous = await verifiedHash(directory.root, path2.join(directory.canonical, target));
      if (previous.sha256 !== options.expectedSha256) {
        throw new SafePathError("changed");
      }
    } else {
      const stat = await fs2.lstat(directory.child(target)).catch((error) => {
        if (error.code !== "ENOENT") {
          throw error;
        }
        return null;
      });
      if (stat && (!stat.isFile() || stat.nlink !== 1)) {
        throw new SafePathError("invalid_file");
      }
    }
    await directory.verify();
    await fs2.rename(directory.child(temporary), directory.child(target));
  } else {
    try {
      await fs2.link(directory.child(temporary), directory.child(target));
    } catch (error) {
      if (error.code === "EEXIST") {
        throw new SafePathError("exists");
      }
      throw error;
    }
    await fs2.unlink(directory.child(temporary));
  }
  await directory.handle.sync();
}
async function atomicWrite(options) {
  return withPathLock(path2.resolve(options.target), async () => {
    const name = path2.basename(options.target);
    if (!isSafeName(name) && ![".library.json", ".gitignore"].includes(name)) {
      throw new SafePathError("unsafe_path");
    }
    const directory = await pinDirectory(options.root, path2.dirname(options.target));
    const temporary = `.write-${randomUUID()}.tmp`;
    let handle = null;
    try {
      handle = await fs2.open(directory.child(temporary), FS2.O_WRONLY | FS2.O_CREAT | FS2.O_EXCL, 384);
      await handle.writeFile(options.data);
      await handle.sync();
      await handle.close();
      handle = null;
      await options.beforePublish?.();
      await publish(directory, temporary, name, options);
      const bytes = typeof options.data === "string" ? Buffer.from(options.data) : options.data;
      return { size: bytes.byteLength, sha256: createHash("sha256").update(bytes).digest("hex") };
    } finally {
      await handle?.close();
      await fs2.unlink(directory.child(temporary)).catch(() => {
      });
      await directory.close();
    }
  });
}
async function safeCopy(options) {
  return withPathLock(path2.resolve(options.target), async () => {
    if (!isExternalName(path2.basename(options.target)) || !await insideRoot(options.sourceRoot, options.source)) {
      throw new SafePathError("unsafe_path");
    }
    const canonical = await fs2.realpath(options.source);
    await options.beforeOpen?.();
    const opened = await openVerified(options.sourceRoot, options.source);
    if (opened.canonical !== canonical || opened.size > (options.maxBytes ?? 1024 * 1024 * 1024)) {
      await opened.handle.close();
      throw new SafePathError("unsafe_path");
    }
    let directory = null;
    let destination = null;
    const temporary = `.copy-${randomUUID()}.tmp`;
    const hash = createHash("sha256");
    let size = 0;
    try {
      directory = await pinDirectory(options.targetRoot, path2.dirname(options.target));
      destination = await fs2.open(directory.child(temporary), FS2.O_WRONLY | FS2.O_CREAT | FS2.O_EXCL, 384);
      const guard = new Transform({
        /**
         * Изменение длины не может незаметно расширить исходный snapshot.
         * SHA считается над теми же байтами, которые поступают в новый inode.
         */
        transform(bytes, _encoding, done) {
          size += bytes.length;
          hash.update(bytes);
          if (size > opened.size) {
            done(new SafePathError("changed"));
          } else {
            done(null, bytes);
          }
        }
      });
      await pipeline(
        borrowedReadStream(opened.handle, opened.canonical),
        guard,
        borrowedWriteStream(destination, directory.child(temporary))
      );
      await destination.sync();
      await destination.close();
      destination = null;
      await options.beforePublish?.();
      await opened.verify();
      if (size !== opened.size) {
        throw new SafePathError("changed");
      }
      await publish(directory, temporary, path2.basename(options.target), options);
      return { size, sha256: hash.digest("hex") };
    } finally {
      await destination?.close();
      await opened.handle.close();
      if (directory) {
        await fs2.unlink(directory.child(temporary)).catch(() => {
        });
        await directory.close();
      }
    }
  });
}
async function readJson(root, file, maxBytes = 1024 * 1024) {
  const opened = await openVerified(root, file);
  try {
    if (opened.size > maxBytes) {
      throw new SafePathError("too_large");
    }
    const bytes = Buffer.alloc(opened.size);
    let offset = 0;
    while (offset < bytes.length) {
      const result = await opened.handle.read(bytes, offset, bytes.length - offset, offset);
      if (!result.bytesRead) {
        throw new SafePathError("changed");
      }
      offset += result.bytesRead;
    }
    await opened.verify();
    return JSON.parse(bytes.toString("utf8"));
  } finally {
    await opened.handle.close();
  }
}

// src/lib/studio3d/analysisProcess.ts
var reader2 = new DocumentReader();
var queueKey = "studio3d:analysis-process";
var OUTPUT_MAX_BYTES = 16 * 1024 * 1024;
var AnalysisError = class extends Error {
  code;
  constructor(code) {
    super(code === "too-large" ? "\u041C\u043E\u0434\u0435\u043B\u044C \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0432\u0435\u043B\u0438\u043A\u0430 \u0434\u043B\u044F \u0430\u043D\u0430\u043B\u0438\u0437\u0430 (\u0434\u043E 150 \u041C\u0438\u0411)." : code === "timeout" ? "\u0410\u043D\u0430\u043B\u0438\u0437 \u043C\u043E\u0434\u0435\u043B\u0438 \u043D\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u043B\u0441\u044F \u0437\u0430 \u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u043E\u0435 \u0432\u0440\u0435\u043C\u044F." : code === "memory" ? "\u0410\u043D\u0430\u043B\u0438\u0437 \u043C\u043E\u0434\u0435\u043B\u0438 \u043F\u0440\u0435\u0432\u044B\u0441\u0438\u043B \u043F\u0440\u0435\u0434\u0435\u043B \u043F\u0430\u043C\u044F\u0442\u0438." : "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u0442\u044C GLB.");
    this.name = "AnalysisError";
    this.code = code;
  }
};
function revision(stat) {
  return [stat.dev, stat.ino, stat.size, stat.mtimeNs, stat.ctimeNs].join(":");
}
function processFile(input2, output, wrap, deps) {
  const signal = deps.ownerSignal && deps.signal ? AbortSignal.any([deps.ownerSignal, deps.signal]) : deps.ownerSignal ?? deps.signal;
  const effective = { ...deps, signal };
  const operation = withPathLock(queueKey, async () => {
    if (signal?.aborted) {
      throw new AnalysisError("aborted");
    }
    const opened = await openVerified(deps.root ?? path3.dirname(input2), input2);
    const canonical = opened.canonical;
    const handle = opened.handle;
    let directory = null;
    let pinned = null;
    try {
      const before = await handle.stat({ bigint: true });
      if (!before.isFile() || before.nlink !== 1n) {
        throw new AnalysisError("unsafe-file");
      }
      if (before.size > BigInt(GLB_MAX_BYTES)) {
        throw new AnalysisError("too-large");
      }
      await reader2.verifiedOpenedPath(handle, path3.dirname(canonical), canonical);
      await opened.verify();
      let outputDirectory = null;
      let outputName = null;
      if (output) {
        outputDirectory = await fs3.realpath(path3.dirname(output));
        outputName = path3.basename(output);
        if (!/^[A-Za-z0-9][A-Za-z0-9._-]{0,120}$/.test(outputName) || outputName.includes("..")) {
          throw new AnalysisError("unsafe-output");
        }
        pinned = await pinDirectory(deps.root ?? outputDirectory, outputDirectory);
        directory = pinned.handle;
        await reader2.verifiedOpenedPath(directory, outputDirectory, outputDirectory);
      }
      const result = await runWorker(handle, directory, {
        operation: wrap ? "rewrite" : "inspect",
        sourcePath: canonical,
        outputDirectory,
        outputName,
        wrap
      }, effective);
      const after = await handle.stat({ bigint: true });
      await reader2.verifiedOpenedPath(handle, path3.dirname(canonical), canonical);
      if (revision(before) !== revision(after)) {
        throw new AnalysisError("changed");
      }
      await opened.verify();
      await pinned?.verify();
      if (directory && outputDirectory) {
        await reader2.verifiedOpenedPath(directory, outputDirectory, outputDirectory);
      }
      return result;
    } finally {
      await handle.close();
      await pinned?.close();
    }
  });
  deps.track?.(operation);
  return operation;
}
async function rssOf(pid) {
  const text3 = await fs3.readFile(`/proc/${pid}/status`, "utf8").catch(() => "");
  const value = /^VmRSS:\s+(\d+)\s+kB$/m.exec(text3);
  return value ? Number(value[1]) * 1024 : 0;
}
function runWorker(input2, directory, request2, deps) {
  return new Promise((resolve, reject) => {
    if (deps.signal?.aborted) {
      throw new AnalysisError("aborted");
    }
    const worker = workerEnvironment(deps);
    const child = (deps.spawnImpl ?? spawn)(worker.nodeExecutable, [
      "--max-old-space-size=256",
      fileURLToPath(worker.workerUrl),
      JSON.stringify(request2)
    ], {
      env: { PATH: process.env.PATH, LANG: "C.UTF-8" },
      stdio: ["ignore", "pipe", "pipe", input2.fd, ...directory ? [directory.fd] : []]
    });
    const chunks = [];
    let size = 0;
    let failure = null;
    let sampling = false;
    const terminate = (code) => {
      failure ??= new AnalysisError(code);
      child.kill("SIGKILL");
    };
    const onAbort = () => terminate("aborted");
    deps.signal?.addEventListener("abort", onAbort, { once: true });
    if (deps.signal?.aborted) {
      onAbort();
    }
    const timeout = setTimeout(() => terminate("timeout"), Math.min(deps.timeoutMs ?? 6e4, 6e4));
    const watchdog = setInterval(() => {
      if (sampling || !child.pid) {
        return;
      }
      sampling = true;
      void rssOf(child.pid).then((bytes) => {
        deps.onRss?.(bytes);
        if (bytes > Math.min(deps.maxRssMb ?? 512, 512) * 1024 * 1024) {
          terminate("memory");
        }
      }).finally(() => {
        sampling = false;
      });
    }, 10);
    child.stdout?.on("data", (bytes) => {
      size += bytes.length;
      if (size > OUTPUT_MAX_BYTES) {
        terminate("output-limit");
      } else {
        chunks.push(bytes);
      }
    });
    child.stderr?.on("data", () => {
    });
    child.once("error", () => {
      failure = new AnalysisError("worker-start");
    });
    child.once("close", (code) => {
      clearTimeout(timeout);
      clearInterval(watchdog);
      deps.signal?.removeEventListener("abort", onAbort);
      if (failure || code !== 0) {
        reject(failure ?? new AnalysisError("worker-exit"));
        return;
      }
      try {
        const response = JSON.parse(Buffer.concat(chunks, size).toString("utf8"));
        if (!response || response.ok !== true || !response.stats || typeof response.stats !== "object") {
          throw new AnalysisError(typeof response?.code === "string" ? response.code : "worker-response");
        }
        resolve(parseStudio3d.stats(response.stats));
      } catch (error) {
        reject(error instanceof AnalysisError ? error : new AnalysisError("worker-response"));
      }
    });
  });
}
function inspectGlbFile(inputPath, deps = {}) {
  return processFile(inputPath, null, null, deps);
}
function rewriteGlbFile(inputPath, outputPath, options, deps = {}) {
  return processFile(inputPath, outputPath, options, deps);
}
function workerEnvironment(deps) {
  if (typeof deps.nodeExecutable !== "string" || !path3.isAbsolute(deps.nodeExecutable) || !(deps.workerUrl instanceof URL) || deps.workerUrl.protocol !== "file:") {
    throw new AnalysisError("worker-environment");
  }
  return { nodeExecutable: deps.nodeExecutable, workerUrl: deps.workerUrl };
}
function createAnalysisScope(environment) {
  const configured = workerEnvironment(environment);
  const controller = new AbortController();
  const active = /* @__PURE__ */ new Set();
  let closing = null;
  const track = (operation) => {
    active.add(operation);
    void operation.then(() => active.delete(operation), () => active.delete(operation));
  };
  return Object.freeze({
    deps(extra = {}) {
      return {
        ...extra,
        ...configured,
        ownerSignal: controller.signal,
        track
      };
    },
    abort() {
      controller.abort();
    },
    close() {
      controller.abort();
      closing ??= Promise.allSettled([...active]).then(() => {
      });
      return closing;
    }
  });
}

// src/lib/studio3d/notificationProjection.ts
var RECENT_MS = 864e5;
var SNAPSHOT_LIMIT = 500;
function projectStudioNotifications(libraryId, rows2, now = Date.now()) {
  return rows2.filter((row) => ["ready", "failed"].includes(row.status) && !!row.modelId && !!row.versionId && Date.parse(row.updatedAt) >= now - RECENT_MS).slice(0, SNAPSHOT_LIMIT).map((row) => {
    const name = row.modelName ?? row.label;
    const failed = row.status === "failed";
    const body = row.error?.message.slice(0, 2e3);
    return {
      action: "show",
      id: `studio-${row.versionId}`,
      topic: `model:${row.modelId}`,
      dedupKey: `${libraryId}:${row.intentId}:${row.childId}:${row.status}`,
      title: failed ? {
        ru: `\u041D\u0435 \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u043E\u0441\u044C: \xAB${name}\xBB`,
        en: `Failed: \u201C${name}\u201D`
      } : {
        ru: `\u041C\u043E\u0434\u0435\u043B\u044C \xAB${name}\xBB \u0433\u043E\u0442\u043E\u0432\u0430`,
        en: `Model \u201C${name}\u201D is ready`
      },
      ...body ? { body: { ru: body, en: body } } : {},
      tone: failed ? "danger" : "accent",
      sticky: failed,
      params: { model: row.modelId, version: row.versionId }
    };
  });
}
function dismissStudioModel(modelId) {
  return { action: "dismiss-topic", topic: `model:${modelId}` };
}

// src/lib/studio3d/jobInputs.ts
import { createHash as createHash4 } from "node:crypto";
import { fstatSync as fstatSync3, lstatSync as lstatSync3, realpathSync as realpathSync3, promises as fs8 } from "node:fs";
import path9 from "node:path";
import { pipeline as pipeline3 } from "node:stream/promises";

// src/lib/studio3d/intents.ts
import { createHash as createHash3 } from "node:crypto";
import { promises as fs6 } from "node:fs";
import path6 from "node:path";

// src/lib/studio3d/library.ts
import { createHash as createHash2, randomBytes, randomUUID as randomUUID2 } from "node:crypto";
import { fstatSync as fstatSync2, lstatSync as lstatSync2, realpathSync as realpathSync2, promises as fs5 } from "node:fs";
import path5 from "node:path";
import { pipeline as pipeline2 } from "node:stream/promises";
import { isDeepStrictEqual } from "node:util";

// src/lib/studio3d/libraryRoot.ts
import { fstatSync, lstatSync, realpathSync, promises as fs4 } from "node:fs";
import path4 from "node:path";
function verifyNow(directory) {
  const held = fstatSync(directory.handle.fd);
  const current = lstatSync(directory.canonical);
  if (!held.isDirectory() || !current.isDirectory() || current.isSymbolicLink() || held.dev !== current.dev || held.ino !== current.ino || realpathSync(directory.root) !== directory.root || realpathSync(directory.canonical) !== directory.canonical) {
    throw new SafePathError("changed");
  }
}
async function existingParent(requested, signal) {
  let ancestor = requested;
  const missing = [];
  for (; ; ) {
    signal?.throwIfAborted();
    const stat = await fs4.lstat(ancestor).catch((cause) => {
      if (cause.code !== "ENOENT") {
        throw cause;
      }
      return null;
    });
    signal?.throwIfAborted();
    if (stat === null) {
      missing.unshift(path4.basename(ancestor));
      ancestor = path4.dirname(ancestor);
      continue;
    }
    if (!stat.isDirectory() || stat.isSymbolicLink() || await fs4.realpath(ancestor) !== ancestor) {
      throw new SafePathError("changed");
    }
    signal?.throwIfAborted();
    return { ancestor, missing };
  }
}
function directoryComponent(name) {
  if (!name || name === "." || name === ".." || name.includes(path4.sep) || name.includes("\0")) {
    throw new SafePathError("unsafe_path");
  }
}
async function pinLibraryRoot(requested, signal) {
  const { ancestor, missing } = await existingParent(requested, signal);
  const anchor = await pinDirectory(ancestor, ancestor);
  let current = anchor;
  try {
    for (const name of missing) {
      directoryComponent(name);
      await current.verify();
      signal?.throwIfAborted();
      verifyNow(current);
      await fs4.mkdir(current.child(name), { mode: 448 }).catch((cause) => {
        if (cause.code !== "EEXIST") {
          throw cause;
        }
      });
      signal?.throwIfAborted();
      await current.verify();
      const child = await pinDirectory(ancestor, path4.join(current.canonical, name));
      if (current !== anchor) {
        await current.close();
      }
      current = child;
    }
    signal?.throwIfAborted();
    await current.verify();
    if (await fs4.realpath(requested) !== requested) {
      throw new SafePathError("changed");
    }
    signal?.throwIfAborted();
    verifyNow(current);
    const root = await pinDirectory(requested, requested);
    try {
      signal?.throwIfAborted();
      verifyNow(root);
      return root;
    } catch (cause) {
      await root.close();
      throw cause;
    }
  } finally {
    if (current !== anchor) {
      await current.close();
    }
    await anchor.close();
  }
}

// src/lib/studio3d/library.ts
var MODEL_ID_RE = /^[a-z0-9][a-z0-9-]{0,47}$/;
var VERSION_ID_RE = /^v\d{2,4}-[a-z0-9-]{1,40}$/;
var LIBRARY_UUID_RE = /^[a-f0-9]{8}-[a-f0-9]{4}-[1-8][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
var LibraryError = class extends Error {
  code;
  constructor(code, message = "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0431\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0443 3D.") {
    super(message);
    this.name = "LibraryError";
    this.code = code;
  }
};
function lockError(error) {
  const code = error?.code;
  return typeof code === "string" && /^owner_(?:busy|unavailable|lost|closed)$/.test(code) ? new LibraryError(code) : error;
}
var modelKeys = /* @__PURE__ */ new Set([
  "schema",
  "id",
  "name",
  "project",
  "category",
  "tags",
  "notes",
  "origin",
  "mainVersion",
  "createdAt",
  "updatedAt"
]);
var versionKeys = /* @__PURE__ */ new Set([
  "schema",
  "id",
  "seq",
  "parent",
  "kind",
  "operation",
  "provider",
  "label",
  "origin",
  "status",
  "progress",
  "etaSeconds",
  "params",
  "idempotencyKey",
  "pool",
  "retryAt",
  "submittedAt",
  "intentId",
  "childId",
  "accountKey",
  "planIndex",
  "missedPolls",
  "inputs",
  "files",
  "stats",
  "task",
  "cost",
  "error",
  "rigCheck",
  "createdAt",
  "updatedAt",
  "savedTo",
  "views",
  "mainFileId",
  "waitReason"
]);
var letters = "\u0430\u0431\u0432\u0433\u0434\u0435\u0451\u0436\u0437\u0438\u0439\u043A\u043B\u043C\u043D\u043E\u043F\u0440\u0441\u0442\u0443\u0444\u0445\u0446\u0447\u0448\u0449\u044A\u044B\u044C\u044D\u044E\u044F".split("");
var latin = [
  "a",
  "b",
  "v",
  "g",
  "d",
  "e",
  "e",
  "zh",
  "z",
  "i",
  "y",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "r",
  "s",
  "t",
  "u",
  "f",
  "kh",
  "ts",
  "ch",
  "sh",
  "sch",
  "",
  "y",
  "",
  "e",
  "yu",
  "ya"
];
var transliteration = new Map(letters.map((letter, index) => [letter, latin[index]]));
function modelSlug(name) {
  const translated = [...name.toLowerCase()].map((letter) => transliteration.get(letter) ?? letter).join("");
  return translated.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 32).replace(/-$/, "") || "model";
}
function object(value, keys) {
  if (!value || typeof value !== "object" || Array.isArray(value) || Object.keys(value).some((key) => !keys.has(key))) {
    throw new LibraryError("invalid_schema");
  }
  return value;
}
function modelShape(model) {
  return {
    id: model.id,
    name: model.name,
    project: model.project,
    category: model.category,
    tags: model.tags,
    origin: model.origin,
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
    mainVersion: model.mainVersion,
    preview: null,
    versions: 0,
    active: 0,
    spent: 0,
    spending: [],
    sizeBytes: 0,
    has: {
      rig: false,
      animation: false,
      parts: false,
      images: false
    }
  };
}
function decodeModel(value, expectedId, libraryId) {
  const raw = object(value, modelKeys);
  if (raw.schema !== 1 || raw.id !== expectedId || !MODEL_ID_RE.test(expectedId) || typeof raw.notes !== "string" || raw.notes.length > 1e5 || !Array.isArray(raw.tags) || raw.tags.length > 20) {
    throw new LibraryError("invalid_schema");
  }
  const model = raw;
  parseStudio3d.models({
    libraryId,
    models: [modelShape(model)],
    total: 1,
    broken: []
  });
  if (model.mainVersion !== null && !VERSION_ID_RE.test(model.mainVersion)) {
    throw new LibraryError("invalid_schema");
  }
  return model;
}
function decodeVersion(value, expectedId, libraryId) {
  const raw = object(value, versionKeys);
  const version2 = raw;
  if (raw.schema !== 1 || raw.id !== expectedId || !VERSION_ID_RE.test(expectedId) || !Number.isSafeInteger(version2.seq) || version2.seq < 1 || version2.seq > 9999 || !expectedId.startsWith(`v${String(version2.seq).padStart(2, "0")}-`) || !Array.isArray(version2.files) || version2.files.length > 128 || !Array.isArray(version2.inputs) || !Number.isSafeInteger(version2.planIndex) || version2.planIndex < 0 || !Number.isSafeInteger(version2.missedPolls) || version2.missedPolls < 0) {
    throw new LibraryError("invalid_schema");
  }
  const names = /* @__PURE__ */ new Set();
  const ids = /* @__PURE__ */ new Set();
  for (const file of version2.files) {
    if (!file || typeof file !== "object" || Object.keys(file).some((key) => ![
      "id",
      "role",
      "name",
      "size",
      "sha256"
    ].includes(key)) || !isSafeName(file.name) || !isSafeName(file.id) || names.has(file.name) || ids.has(file.id) || !/^[a-f0-9]{64}$/.test(file.sha256)) {
      throw new LibraryError("invalid_schema");
    }
    names.add(file.name);
    ids.add(file.id);
  }
  for (const input2 of version2.inputs) {
    if (!input2 || typeof input2 !== "object" || Object.keys(input2).some((key) => !["role", "file"].includes(key)) || typeof input2.role !== "string" || typeof input2.file !== "string" || !(isSafeName(input2.file) || /^inputs\/[A-Za-z0-9][A-Za-z0-9._-]{0,120}$/.test(input2.file)) || input2.file.includes("..")) {
      throw new LibraryError("invalid_schema");
    }
  }
  for (const key of ["idempotencyKey", "retryAt", "submittedAt", "accountKey"]) {
    if (version2[key] !== null && typeof version2[key] !== "string") {
      throw new LibraryError("invalid_schema");
    }
  }
  if (version2.pool !== null && (!version2.pool || typeof version2.pool.key !== "string" || Object.keys(version2.pool).some((key) => !["key", "limit"].includes(key)) || version2.pool.limit !== null && (!Number.isSafeInteger(version2.pool.limit) || version2.pool.limit < 1))) {
    throw new LibraryError("invalid_schema");
  }
  const dto = versionProjection(version2, libraryId, () => "");
  parseStudio3d.version(dto);
  if (version2.mainFileId !== null && !ids.has(version2.mainFileId)) {
    throw new LibraryError("invalid_schema");
  }
  return version2;
}
function versionProjection(version2, libraryId, fileUrl, retry = { available: false, reason: null }) {
  return {
    libraryId,
    id: version2.id,
    seq: version2.seq,
    parent: version2.parent,
    kind: version2.kind,
    operation: version2.operation,
    provider: version2.provider,
    label: version2.label,
    status: version2.status,
    progress: version2.progress,
    etaSeconds: version2.etaSeconds,
    params: version2.params,
    files: version2.files.map((file) => ({ ...file, url: fileUrl(file.name) })),
    preview: version2.files.find((file) => file.role === "preview")?.name ? fileUrl(version2.files.find((file) => file.role === "preview").name) : null,
    stats: version2.stats,
    task: version2.task,
    cost: version2.cost,
    error: version2.error,
    origin: version2.origin,
    createdAt: version2.createdAt,
    updatedAt: version2.updatedAt,
    savedTo: version2.savedTo,
    rigCheck: version2.rigCheck,
    intentId: version2.intentId,
    childId: version2.childId,
    waitReason: version2.waitReason,
    retryAvailable: retry.available,
    retryReason: retry.reason,
    views: version2.views,
    mainFileId: version2.mainFileId
  };
}
function validateGraph(model, versions) {
  const byId = new Map(versions.map((version2) => [version2.id, version2]));
  const sequences = new Set(versions.map((version2) => version2.seq));
  if (byId.size !== versions.length || sequences.size !== versions.length || model.mainVersion !== null && !byId.has(model.mainVersion)) {
    throw new LibraryError("invalid_graph");
  }
  const finished = /* @__PURE__ */ new Set();
  for (const version2 of versions) {
    let current = version2;
    const visiting = /* @__PURE__ */ new Set();
    while (current && !finished.has(current.id)) {
      if (visiting.has(current.id) || current.parent !== null && !byId.has(current.parent)) {
        throw new LibraryError("invalid_graph");
      }
      visiting.add(current.id);
      current = current.parent === null ? void 0 : byId.get(current.parent);
    }
    for (const id2 of visiting) {
      finished.add(id2);
    }
  }
}
function decodeSettings(value) {
  const raw = object(value, /* @__PURE__ */ new Set(["saveFolders"]));
  if (!raw.saveFolders || typeof raw.saveFolders !== "object" || Array.isArray(raw.saveFolders)) {
    throw new LibraryError("invalid_settings");
  }
  const saveFolders = {};
  for (const [project2, repos] of Object.entries(raw.saveFolders)) {
    if (!isSafeName(project2) || !repos || typeof repos !== "object" || Array.isArray(repos)) {
      throw new LibraryError("invalid_settings");
    }
    saveFolders[project2] = {};
    for (const [repo, folder] of Object.entries(repos)) {
      if (!isSafeName(repo) || typeof folder !== "string" || folder.length > 500 || path5.isAbsolute(folder) || folder.split(/[\\/]/).some((segment) => segment === "..") || folder.includes("\0")) {
        throw new LibraryError("invalid_settings");
      }
      saveFolders[project2][repo] = folder;
    }
  }
  return { saveFolders };
}
function versionTemplate(model, id2, seq, input2, at, libraryId) {
  return decodeVersion({
    schema: 1,
    parent: null,
    operation: null,
    provider: null,
    label: "\u0424\u0430\u0439\u043B",
    origin: model.origin,
    status: "ready",
    progress: 100,
    etaSeconds: null,
    params: {},
    idempotencyKey: null,
    pool: null,
    retryAt: null,
    submittedAt: null,
    intentId: null,
    childId: null,
    accountKey: null,
    planIndex: 0,
    missedPolls: 0,
    inputs: [],
    files: [],
    stats: null,
    task: null,
    cost: {
      estimated: 0,
      actual: 0,
      free: true,
      unit: null,
      state: "free"
    },
    error: null,
    rigCheck: null,
    savedTo: [],
    views: [],
    mainFileId: null,
    waitReason: null,
    ...input2,
    id: id2,
    seq,
    createdAt: at,
    updatedAt: at
  }, id2, libraryId);
}
var Library = class {
  owner = null;
  root = null;
  identity = "";
  requestedDir;
  options;
  leases = /* @__PURE__ */ new Map();
  hashes = /* @__PURE__ */ new Map();
  plannedModels = /* @__PURE__ */ new Set();
  plannedSequences = /* @__PURE__ */ new Map();
  constructor(options) {
    this.options = options;
    this.requestedDir = path5.resolve(options.dir);
  }
  get dir() {
    return this.root?.canonical ?? this.requestedDir;
  }
  get analysis() {
    return this.options.analysis ?? {};
  }
  get libraryId() {
    return this.identity;
  }
  /**
   * Последний допуск POST проверяет root и lock синхронно после journal fsync.
   * Нового await между подтверждением identity и началом платного эффекта нет.
   */
  assertOwnerNow() {
    if (!this.owner || !this.root) {
      throw new LibraryError("owner_closed");
    }
    try {
      this.owner.assertHeld();
    } catch (error) {
      throw lockError(error);
    }
    const held = fstatSync2(this.root.handle.fd);
    const atPath = lstatSync2(this.root.canonical);
    try {
      this.owner.assertPathIdentityNow();
    } catch (error) {
      throw lockError(error);
    }
    if (!held.isDirectory() || !atPath.isDirectory() || atPath.isSymbolicLink() || held.dev !== atPath.dev || held.ino !== atPath.ino || realpathSync2(this.root.canonical) !== this.root.canonical) {
      throw new LibraryError("owner_lost");
    }
  }
  /**
   * Открытие явно вызывается lifecycle включённого плагина. Конструктор ничего
   * не создаёт, повторное ensure не сбрасывает UUID и не берёт второй flock.
   */
  async ensure() {
    await withPathLock(`studio3d:ensure:${this.requestedDir}`, async () => {
      if (this.owner) {
        await this.assertOwner();
        return;
      }
      this.options.signal?.throwIfAborted();
      const root = await pinLibraryRoot(this.requestedDir, this.options.signal);
      let owner = null;
      try {
        this.options.signal?.throwIfAborted();
        owner = await this.options.acquireLock({
          lockPath: root.child(".owner.lock"),
          timeoutMs: this.options.lockTimeoutMs ?? 100,
          timeoutCode: "owner_busy",
          unavailableCode: "owner_unavailable",
          lostCode: "owner_lost",
          label: "\u0431\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0438 3D"
        });
        this.options.signal?.throwIfAborted();
        await root.verify();
        this.options.signal?.throwIfAborted();
        this.owner = owner;
        this.root = root;
        let stored;
        try {
          stored = await readJson(this.dir, path5.join(this.dir, ".library.json"));
        } catch (error) {
          if (error.code !== "ENOENT") {
            throw error;
          }
        }
        this.options.signal?.throwIfAborted();
        if (stored === void 0) {
          this.identity = randomUUID2();
          await this.persist(path5.join(this.dir, ".library.json"), {
            schema: 1,
            libraryId: this.identity
          }, false);
        } else {
          const value = object(stored, /* @__PURE__ */ new Set(["schema", "libraryId"]));
          if (value.schema !== 1 || typeof value.libraryId !== "string" || !LIBRARY_UUID_RE.test(value.libraryId)) {
            throw new LibraryError("invalid_library");
          }
          this.identity = value.libraryId;
        }
        this.options.signal?.throwIfAborted();
        await ensureDirectory(this.dir, path5.join(this.dir, ".jobs"));
        this.options.signal?.throwIfAborted();
        await ensureDirectory(this.dir, path5.join(this.dir, ".uploads"));
        this.options.signal?.throwIfAborted();
        if (this.options.ensureGitignore) {
          await atomicWrite({
            root: this.dir,
            target: path5.join(this.dir, ".gitignore"),
            data: "*\n!.gitignore\n"
          }).catch((error) => {
            if (error.code !== "exists") {
              throw error;
            }
          });
        }
      } catch (error) {
        this.owner = null;
        this.root = null;
        await owner?.release();
        await root.close();
        throw lockError(error);
      }
    });
  }
  /**
   * Потеря inode lock или корня закрывает все последующие мутации. Замок не
   * удаляется при close, другой процесс продолжает ту же библиотеку и журнал.
   */
  async assertOwner() {
    if (!this.owner || !this.root) {
      throw new LibraryError("owner_closed");
    }
    try {
      this.owner.assertHeld();
    } catch (error) {
      throw lockError(error);
    }
    try {
      await this.owner.assertPathIdentity();
    } catch (error) {
      throw lockError(error);
    }
    await this.root.verify();
    const lock = await fs5.lstat(this.root.child(".owner.lock"));
    if (!lock.isFile() || lock.nlink !== 1) {
      throw new LibraryError("owner_lost");
    }
  }
  /**
   * Закрываются только дескрипторы этой библиотеки, без unlink owner.lock.
   * Scheduler останавливается вызывающим до close и может затем открыть её снова.
   */
  async close() {
    await withPathLock(`studio3d:ensure:${this.requestedDir}`, async () => {
      await this.owner?.release();
      await this.root?.close();
      this.owner = null;
      this.root = null;
      this.leases.clear();
      this.hashes.clear();
      this.plannedModels.clear();
      this.plannedSequences.clear();
    });
  }
  /**
   * Все собственные JSON идут через durable atomicWrite и проверку owner.
   * Fault hook применяется только тестами и не является настройкой HTTP API.
   */
  async persist(file, data, replace = true) {
    await this.assertOwner();
    await this.options.beforePersist?.(file);
    await atomicWrite({
      root: this.dir,
      target: file,
      data: `${JSON.stringify(data, null, 2)}
`,
      overwrite: replace,
      internalReplace: true
    });
  }
  /**
   * Новая папка выделяется атомарным mkdir в pinned parent. Существующее имя
   * означает коллизию, не разрешение переписать содержимое чужой модели.
   */
  async allocate(parent, name) {
    const directory = await pinDirectory(this.dir, parent);
    try {
      await this.assertOwner();
      await directory.verify();
      await fs5.mkdir(directory.child(name), { mode: 448 });
      await directory.handle.sync();
      return true;
    } catch (error) {
      if (error.code === "EEXIST") {
        return false;
      }
      throw error;
    } finally {
      await directory.close();
    }
  }
  timestamp() {
    return new Date((this.options.now ?? Date.now)()).toISOString();
  }
  hex() {
    const value = (this.options.randomHex ?? (() => randomBytes(2).toString("hex")))();
    if (!/^[a-f0-9]{4}$/.test(value)) {
      throw new LibraryError("invalid_random");
    }
    return value;
  }
  /**
   * Metadata полностью создаётся в новой папке; имя и UUID не зависят от prefs.
   * Два concurrent create не используют одну случайную папку даже при коллизии.
   */
  async createModel(input2) {
    return withPathLock(`${this.dir}:models`, async () => {
      await this.assertOwner();
      for (let attempt = 0; attempt < 100; attempt += 1) {
        const id2 = `${modelSlug(input2.name)}-${this.hex()}`;
        if (this.plannedModels.has(id2)) {
          continue;
        }
        const at = this.timestamp();
        const model = decodeModel({
          schema: 1,
          id: id2,
          name: input2.name,
          project: input2.project ?? null,
          category: input2.category ?? null,
          tags: input2.tags ?? [],
          notes: input2.notes ?? "",
          origin: input2.origin ?? "section",
          mainVersion: null,
          createdAt: at,
          updatedAt: at
        }, id2, this.libraryId);
        if (!await this.allocate(this.dir, id2)) {
          continue;
        }
        await ensureDirectory(this.dir, path5.join(this.dir, id2, "incoming"));
        await this.persist(path5.join(this.dir, id2, "model.json"), model, false);
        return model;
      }
      throw new LibraryError("id_collision");
    });
  }
  /**
   * Seq и случайное имя выделяются вместе под lock модели. Parent проверяется
   * по её текущим версиям, а не по произвольному пути из input.
   */
  async addVersion(modelId, input2) {
    return withPathLock(this.modelPath(modelId), async () => {
      await this.assertOwner();
      const entry = await this.readModel(modelId);
      const seq = this.nextSeq(modelId, entry.versions);
      const operation = input2.operation ?? "file";
      if (!/^[a-z0-9-]{1,32}$/.test(operation) || seq > 9999) {
        throw new LibraryError("invalid_version");
      }
      for (let attempt = 0; attempt < 100; attempt += 1) {
        const id2 = `v${String(seq).padStart(2, "0")}-${operation}-${this.hex()}`;
        const at = this.timestamp();
        const version2 = versionTemplate(entry.model, id2, seq, input2, at, this.libraryId);
        const model = {
          ...entry.model,
          mainVersion: entry.model.mainVersion ?? (version2.status === "ready" ? id2 : null),
          updatedAt: at
        };
        validateGraph(model, [...entry.versions, version2]);
        if (!await this.allocate(this.modelPath(modelId), id2)) {
          continue;
        }
        await this.persist(path5.join(this.modelPath(modelId), id2, "version.json"), version2, false);
        await this.persist(path5.join(this.modelPath(modelId), "model.json"), model);
        return version2;
      }
      throw new LibraryError("id_collision");
    });
  }
  /**
   * Seq учитывает ещё не опубликованные планы других намерений той же модели.
   * После recovery все планы materialize-ятся до открытия допуска новым заказам.
   */
  nextSeq(modelId, versions) {
    return Math.max(
      0,
      ...versions.map((version2) => version2.seq),
      ...this.plannedSequences.get(modelId) ?? []
    ) + 1;
  }
  /**
   * Model ID резервируется только в памяти под allocation lock. На диске ещё
   * нет проекции: durable intent с этим ID будет записан первым.
   */
  async planModel(input2) {
    return withPathLock(`${this.dir}:models`, async () => {
      await this.assertOwner();
      for (let attempt = 0; attempt < 100; attempt += 1) {
        const id2 = `${modelSlug(input2.name)}-${this.hex()}`;
        const existing = await fs5.lstat(this.modelPath(id2)).catch((error) => {
          if (error.code !== "ENOENT") {
            throw error;
          }
          return null;
        });
        if (existing || this.plannedModels.has(id2)) {
          continue;
        }
        const at = this.timestamp();
        const model = decodeModel({
          schema: 1,
          id: id2,
          name: input2.name,
          project: input2.project ?? null,
          category: input2.category ?? null,
          tags: input2.tags ?? [],
          notes: input2.notes ?? "",
          origin: input2.origin ?? "section",
          mainVersion: null,
          createdAt: at,
          updatedAt: at
        }, id2, this.libraryId);
        this.plannedModels.add(id2);
        return model;
      }
      throw new LibraryError("id_collision");
    });
  }
  /**
   * Каждая будущая версия получает собственные id/seq до записи намерения.
   * Parent проверяется по прежней модели, несколько clips не используют planIndex.
   */
  async planVersion(model, input2) {
    const modelId = typeof model === "string" ? model : model.id;
    return withPathLock(this.modelPath(modelId), async () => {
      await this.assertOwner();
      const entry = typeof model === "string" ? await this.readModel(model) : { model, versions: [] };
      const seq = this.nextSeq(modelId, entry.versions);
      const operation = input2.operation ?? "file";
      if (!/^[a-z0-9-]{1,32}$/.test(operation) || seq > 9999) {
        throw new LibraryError("invalid_version");
      }
      const id2 = `v${String(seq).padStart(2, "0")}-${operation}-${this.hex()}`;
      const version2 = versionTemplate(entry.model, id2, seq, input2, this.timestamp(), this.libraryId);
      validateGraph(entry.model, [...entry.versions, version2]);
      const sequences = this.plannedSequences.get(modelId) ?? /* @__PURE__ */ new Set();
      sequences.add(seq);
      this.plannedSequences.set(modelId, sequences);
      return version2;
    });
  }
  /**
   * Recovery создаёт сохранённый model ID, а существующие пользовательские
   * metadata сохраняются. Новое случайное имя вместо durable плана не выделяется.
   */
  async materializeModel(template) {
    return withPathLock(`${this.dir}:models`, async () => {
      await this.assertOwner();
      const model = decodeModel(template, template.id, this.libraryId);
      const folder = this.modelPath(model.id);
      let existing;
      try {
        existing = await readJson(this.dir, path5.join(folder, "model.json"));
      } catch (error) {
        if (error.code !== "ENOENT") {
          throw error;
        }
      }
      if (existing !== void 0) {
        this.plannedModels.delete(model.id);
        return decodeModel(existing, model.id, this.libraryId);
      }
      await this.allocate(this.dir, model.id);
      await ensureDirectory(this.dir, path5.join(folder, "incoming"));
      await this.persist(path5.join(folder, "model.json"), model, false);
      this.plannedModels.delete(model.id);
      return model;
    });
  }
  /**
   * Версия создаётся с journal id или возвращается по тому же intent/child.
   * Частично созданная папка восстанавливается до допуска первого внешнего POST.
   */
  async materializeVersion(modelId, template) {
    return withPathLock(this.modelPath(modelId), async () => {
      await this.assertOwner();
      const version2 = decodeVersion(template, template.id, this.libraryId);
      const folder = path5.join(this.modelPath(modelId), version2.id);
      let existing;
      try {
        existing = await readJson(this.dir, path5.join(folder, "version.json"));
      } catch (error) {
        if (error.code !== "ENOENT") {
          throw error;
        }
      }
      if (existing !== void 0) {
        const found = decodeVersion(existing, version2.id, this.libraryId);
        if (found.intentId !== version2.intentId || found.childId !== version2.childId) {
          throw new LibraryError("projection_conflict");
        }
        this.plannedSequences.get(modelId)?.delete(version2.seq);
        return found;
      }
      const entry = await this.readModel(modelId, { skipMissingVersion: version2.id });
      validateGraph(entry.model, [...entry.versions, version2]);
      await this.allocate(this.modelPath(modelId), version2.id);
      await this.persist(path5.join(folder, "version.json"), version2, false);
      this.plannedSequences.get(modelId)?.delete(version2.seq);
      return version2;
    });
  }
  /**
   * Отказ до durable intent освобождает только in-memory резервы identity.
   * Уже опубликованные папки/JSON и финансовый журнал этим методом не удаляются.
   */
  releasePlans(modelId, versions, releaseModel = false) {
    if (releaseModel) {
      this.plannedModels.delete(modelId);
    }
    for (const version2 of versions) {
      this.plannedSequences.get(modelId)?.delete(version2.seq);
    }
  }
  modelPath(id2) {
    if (!MODEL_ID_RE.test(id2)) {
      throw new LibraryError("invalid_model");
    }
    return path5.join(this.dir, id2);
  }
  /**
   * Версии читаются по существующим разрешённым каталогам, не списку путей JSON.
   * Полная graph проверка не позволяет cross-model mainVersion или parent.
   */
  async readModel(modelId, options = {}) {
    const directory = this.modelPath(modelId);
    const pinned = await pinDirectory(this.dir, directory);
    try {
      const model = decodeModel(
        await readJson(this.dir, path5.join(directory, "model.json")),
        modelId,
        this.libraryId
      );
      const names = await fs5.readdir(pinned.child("."), { withFileTypes: true });
      const versions = [];
      for (const entry of names) {
        if (!VERSION_ID_RE.test(entry.name)) {
          continue;
        }
        if (!entry.isDirectory() || entry.isSymbolicLink()) {
          throw new LibraryError("invalid_version");
        }
        try {
          versions.push(decodeVersion(await readJson(
            this.dir,
            path5.join(directory, entry.name, "version.json")
          ), entry.name, this.libraryId));
        } catch (error) {
          if (entry.name !== options.skipMissingVersion || error.code !== "ENOENT") {
            throw error;
          }
        }
      }
      validateGraph(model, versions);
      await pinned.verify();
      return { model, versions: versions.sort((a, b) => a.seq - b.seq) };
    } finally {
      await pinned.close();
    }
  }
  /**
   * Broken папка исключается отдельно, не скрывая остальные модели.
   * Служебные папки и symlink не становятся моделями только по имени.
   */
  async listModels() {
    if (!this.root) {
      throw new LibraryError("owner_closed");
    }
    await this.root.verify();
    const entries = [];
    const broken = [];
    for (const item of await fs5.readdir(this.root.child("."), { withFileTypes: true })) {
      if (!MODEL_ID_RE.test(item.name) || !item.isDirectory()) {
        continue;
      }
      try {
        entries.push(await this.readModel(item.name));
      } catch {
        broken.push(item.name);
      }
    }
    await this.root.verify();
    return { entries, broken: broken.sort() };
  }
  /**
   * Patch либо updater применяется к актуальному JSON внутри model lock.
   * Нельзя менять id/seq/schema и создавать цикл запоздалой записью родства.
   */
  async updateVersion(modelId, versionId, patch) {
    return withPathLock(this.modelPath(modelId), async () => {
      await this.assertOwner();
      const entry = await this.readModel(modelId);
      const current = entry.versions.find((version2) => version2.id === versionId);
      if (!current) {
        throw new LibraryError("version_not_found");
      }
      const changes = typeof patch === "function" ? patch(structuredClone(current)) : patch;
      if (changes.id !== void 0 || changes.seq !== void 0 || changes.schema !== void 0) {
        throw new LibraryError("immutable_version");
      }
      if (Object.entries(changes).every(([key, value]) => isDeepStrictEqual(current[key], value))) {
        return current;
      }
      const updated = decodeVersion(
        {
          ...current,
          ...changes,
          updatedAt: this.timestamp()
        },
        versionId,
        this.libraryId
      );
      const versions = entry.versions.map((version2) => version2.id === versionId ? updated : version2);
      validateGraph(entry.model, versions);
      await this.persist(path5.join(this.modelPath(modelId), versionId, "version.json"), updated);
      return updated;
    });
  }
  /**
   * Метаданные модели обновляются без изменения её identity. Main выбирается
   * только из её версий и сохраняется вместе с датой изменения.
   */
  async updateModel(modelId, patch) {
    return withPathLock(this.modelPath(modelId), async () => {
      await this.assertOwner();
      const entry = await this.readModel(modelId);
      if (patch.id !== void 0 || patch.schema !== void 0) {
        throw new LibraryError("immutable_model");
      }
      const model = decodeModel(
        {
          ...entry.model,
          ...patch,
          updatedAt: this.timestamp()
        },
        modelId,
        this.libraryId
      );
      validateGraph(model, entry.versions);
      await this.persist(path5.join(this.modelPath(modelId), "model.json"), model);
      return model;
    });
  }
  /**
   * Путь выдаётся только для существующей версии из этой модели.
   * Открытие конкретного файла дополнительно требует записи в manifest.
   */
  async versionDir(modelId, versionId) {
    if (!VERSION_ID_RE.test(versionId)) {
      throw new LibraryError("invalid_version");
    }
    const entry = await this.readModel(modelId);
    if (!entry.versions.some((version2) => version2.id === versionId)) {
      throw new LibraryError("version_not_found");
    }
    return path5.join(this.modelPath(modelId), versionId);
  }
  /**
   * Recovery после публикации файла до version.json принимает только exact SHA.
   * Необъявленное имя не обслуживается API, пока manifest не зафиксирован fsync.
   */
  async adoptVersionFile(modelId, versionId, name, expectedSha256, options) {
    return withPathLock(this.modelPath(modelId), async () => {
      await this.assertOwner();
      if (!isSafeName(name) || ["model.json", "version.json"].includes(name)) {
        throw new LibraryError("invalid_file");
      }
      const entry = await this.readModel(modelId);
      const version2 = entry.versions.find((item) => item.id === versionId);
      if (!version2) {
        throw new LibraryError("version_not_found");
      }
      const info = await verifiedHash(this.dir, path5.join(this.modelPath(modelId), versionId, name));
      if (info.sha256 !== expectedSha256) {
        throw new LibraryError("changed");
      }
      const file = {
        id: options.id ?? name,
        role: options.role ?? "file",
        name,
        size: info.size,
        sha256: info.sha256
      };
      const current = version2.files.find((item) => item.name === name);
      if (current && (current.sha256 !== file.sha256 || current.id !== file.id || current.role !== file.role)) {
        throw new LibraryError("changed");
      }
      const updated = decodeVersion({
        ...version2,
        files: [...version2.files.filter((item) => item.name !== name), file],
        updatedAt: this.timestamp()
      }, version2.id, this.libraryId);
      await this.persist(path5.join(this.modelPath(modelId), versionId, "version.json"), updated);
      return file;
    });
  }
  /**
   * File descriptor закрепляет manifest файл до отправки HTTP или copy.
   * Version JSON, inputs и случайное имя в папке не доступны этой ручкой.
   */
  async openVersionFile(modelId, versionId, name) {
    if (!isSafeName(name)) {
      throw new LibraryError("invalid_file");
    }
    const entry = await this.readModel(modelId);
    const version2 = entry.versions.find((item) => item.id === versionId);
    const file = version2?.files.find((item) => item.name === name);
    if (!file) {
      throw new LibraryError("file_not_found");
    }
    const opened = await openVerified(this.dir, path5.join(this.modelPath(modelId), versionId, name));
    if (opened.size !== file.size) {
      await opened.handle.close();
      throw new LibraryError("changed");
    }
    try {
      let cached = this.hashes.get(opened.canonical);
      if (cached?.revision !== opened.revision) {
        const hash = createHash2("sha256");
        await pipeline2(borrowedReadStream(opened.handle, opened.canonical), hash);
        await opened.verify();
        cached = { revision: opened.revision, sha256: hash.digest("hex") };
        if (this.hashes.size >= 512) {
          this.hashes.clear();
        }
        this.hashes.set(opened.canonical, cached);
      }
      if (cached.sha256 !== file.sha256) {
        throw new LibraryError("changed");
      }
      await opened.verify();
    } catch (error) {
      await opened.handle.close();
      throw error;
    }
    return { ...opened, file };
  }
  /**
   * Совместимый path helper также подтверждает fd до возврата канонического имени.
   * Потоковым читателям следует использовать openVersionFile и тот же дескриптор.
   */
  async filePath(modelId, versionId, name) {
    const opened = await this.openVersionFile(modelId, versionId, name);
    await opened.handle.close();
    return opened.canonical;
  }
  /**
   * Готовые байты публикуются в новую версию и добавляются в закрытый manifest.
   * Повторная запись требует старый SHA; свободный preview не заменяет модель.
   */
  async writeVersionFile(modelId, versionId, name, data, options = {}) {
    return this.storeFile(modelId, versionId, name, options, async (target, previous) => atomicWrite({
      root: this.dir,
      target,
      data,
      overwrite: options.replace && previous !== void 0,
      expectedSha256: previous?.sha256
    }));
  }
  /**
   * Вход копируется в независимый inode, не hardlink. В manifest попадают
   * только байты подтверждённой ревизии, а failure не создаёт доступного файла.
   */
  async copyIn(modelId, versionId, options) {
    return this.storeFile(modelId, versionId, options.name, options, async (target, previous) => safeCopy({
      ...options,
      targetRoot: this.dir,
      target,
      overwrite: options.replace && previous !== void 0,
      expectedSha256: previous?.sha256
    }));
  }
  /**
   * Общая транзакция файла/manifest сериализуется тем же lock модели.
   * Orphan при сбое JSON не становится доступен: чтение требует manifest.
   */
  async storeFile(modelId, versionId, name, options, write) {
    return withPathLock(this.modelPath(modelId), async () => {
      await this.assertOwner();
      if (!isSafeName(name) || ["model.json", "version.json"].includes(name)) {
        throw new LibraryError("invalid_file");
      }
      const entry = await this.readModel(modelId);
      const current = entry.versions.find((version2) => version2.id === versionId);
      if (!current) {
        throw new LibraryError("version_not_found");
      }
      const previous = current.files.find((file2) => file2.name === name);
      const result = await write(path5.join(this.modelPath(modelId), versionId, name), previous);
      const file = {
        id: options.id ?? previous?.id ?? `file-${randomBytes(8).toString("hex")}`,
        role: options.role ?? "file",
        name,
        ...result
      };
      const retired = options.replace && options.role === "preview" ? current.files.filter((item) => item.role === "preview" && item.name !== name) : [];
      const files = [...current.files.filter((item) => item.name !== name && !retired.includes(item)), file];
      const updated = decodeVersion({
        ...current,
        files,
        mainFileId: current.mainFileId ?? (["model", "file", "image"].includes(file.role) ? file.id : null),
        updatedAt: this.timestamp()
      }, versionId, this.libraryId);
      await this.persist(path5.join(this.modelPath(modelId), versionId, "version.json"), updated);
      if (retired.length) {
        const directory = await pinDirectory(this.dir, path5.join(this.modelPath(modelId), versionId));
        try {
          for (const previousPreview of retired) {
            await directory.verify();
            await fs5.unlink(directory.child(previousPreview.name)).catch((error) => {
              if (error.code !== "ENOENT") {
                throw error;
              }
            });
          }
          await directory.handle.sync();
        } finally {
          await directory.close();
        }
      }
      return result;
    });
  }
  /**
   * Lease действует на конкретный вход, дополняя persistent active statuses.
   * Несколько заданий удерживают один файл до освобождения последнего владельца.
   */
  lease(key, owner) {
    const owners = this.leases.get(key) ?? /* @__PURE__ */ new Set();
    owners.add(owner);
    this.leases.set(key, owners);
    return () => {
      owners.delete(owner);
      if (!owners.size) {
        this.leases.delete(key);
      }
      this.options.onLeaseChange?.();
    };
  }
  leaseCount() {
    return this.leases.size;
  }
  leaseVersion(modelId, versionId, owner) {
    return this.lease(`version:${modelId}:${versionId}`, owner);
  }
  leaseUpload(uploadId, owner) {
    return this.lease(`upload:${uploadId}`, owner);
  }
  protectedVersion(modelId, version2) {
    return ACTIVE_STATUSES.includes(version2.status) || this.leases.has(`version:${modelId}:${version2.id}`);
  }
  /**
   * Удаление модели не затрагивает .jobs, UUID и финансовые tombstones.
   * Все active/unknown версии и входы под lease блокируют это действие.
   */
  async deleteModel(modelId) {
    await withPathLock(this.modelPath(modelId), async () => {
      await this.assertOwner();
      const entry = await this.readModel(modelId);
      if (entry.versions.some((version2) => this.protectedVersion(modelId, version2))) {
        throw new LibraryError("active_jobs");
      }
      await this.removeDirectory(this.modelPath(modelId));
    });
  }
  /**
   * Потомок запрещает удаление родителя; main после удаления выбирается из ready.
   * Persistent журнал намерения остаётся вне папки версии при любом удалении.
   */
  async deleteVersion(modelId, versionId) {
    await withPathLock(this.modelPath(modelId), async () => {
      await this.assertOwner();
      const entry = await this.readModel(modelId);
      const version2 = entry.versions.find((item) => item.id === versionId);
      if (!version2) {
        throw new LibraryError("version_not_found");
      }
      if (this.protectedVersion(modelId, version2)) {
        throw new LibraryError("active_jobs");
      }
      if (entry.versions.some((item) => item.parent === versionId)) {
        throw new LibraryError("has_children");
      }
      const remaining = entry.versions.filter((item) => item.id !== versionId);
      const model = {
        ...entry.model,
        mainVersion: entry.model.mainVersion === versionId ? remaining.filter((item) => item.status === "ready").at(-1)?.id ?? null : entry.model.mainVersion,
        updatedAt: this.timestamp()
      };
      await this.persist(path5.join(this.modelPath(modelId), "model.json"), model);
      await this.removeDirectory(path5.join(this.modelPath(modelId), versionId));
    });
  }
  /**
   * Удаление закрепляет parent и проверяет каталог до recursive rm.
   * Symlink не становится каталогом удаления, корневые служебные папки не принимаются.
   */
  async removeDirectory(directory) {
    const pinned = await pinDirectory(this.dir, directory);
    const parent = await pinDirectory(this.dir, path5.dirname(directory));
    try {
      await this.assertOwner();
      await pinned.verify();
      await parent.verify();
      await fs5.rm(parent.child(path5.basename(directory)), { recursive: true });
      await parent.handle.sync();
    } finally {
      await pinned.close();
      await parent.close();
    }
  }
  /**
   * Облегчение удаляет только manifest model/base-model и считает фактический stat.
   * Превью/JSON сохраняются, основные и leased входы требуют отдельного допуска.
   */
  async lighten(modelId, versionId, options = {}) {
    return withPathLock(this.modelPath(modelId), async () => {
      await this.assertOwner();
      const entry = await this.readModel(modelId);
      const version2 = entry.versions.find((item) => item.id === versionId);
      if (!version2) {
        throw new LibraryError("version_not_found");
      }
      if (this.protectedVersion(modelId, version2)) {
        throw new LibraryError("active_jobs");
      }
      if (entry.model.mainVersion === versionId && !options.force) {
        throw new LibraryError("main_version");
      }
      const directory = await pinDirectory(this.dir, path5.join(this.modelPath(modelId), versionId));
      let freed = 0;
      try {
        for (const file of version2.files.filter((item) => ["model", "base-model"].includes(item.role))) {
          const opened = await openVerified(this.dir, path5.join(directory.canonical, file.name));
          await opened.verify();
          await directory.verify();
          await fs5.unlink(directory.child(file.name));
          freed += opened.size;
          await opened.handle.close();
        }
        await directory.handle.sync();
      } finally {
        await directory.close();
      }
      const files = version2.files.filter((file) => !["model", "base-model"].includes(file.role));
      const updated = decodeVersion({
        ...version2,
        files,
        mainFileId: files.some((file) => file.id === version2.mainFileId) ? version2.mainFileId : null,
        status: "lightened",
        updatedAt: this.timestamp()
      }, versionId, this.libraryId);
      await this.persist(path5.join(this.modelPath(modelId), versionId, "version.json"), updated);
      return freed;
    });
  }
  /**
   * Incoming перечисляет только обычные одноимённые 3D файлы в папке модели.
   * Импорт отдельно проверит сигнатуру/лимиты и создаст независимую копию.
   */
  async incoming(modelId) {
    await this.readModel(modelId);
    const directory = await pinDirectory(this.dir, path5.join(this.modelPath(modelId), "incoming"));
    const names = [];
    try {
      for (const item of await fs5.readdir(directory.child("."), { withFileTypes: true })) {
        if (!item.isFile() || !isExternalName(item.name) || !/\.(?:glb|fbx|obj|stl|splat)$/i.test(item.name)) {
          continue;
        }
        const opened = await openVerified(this.dir, path5.join(directory.canonical, item.name)).catch(() => null);
        if (opened) {
          names.push(item.name);
          await opened.handle.close();
        }
      }
      await directory.verify();
      return names.sort();
    } finally {
      await directory.close();
    }
  }
  /**
   * Учёт включает скрытые snapshots и partial, обход не следует symlink.
   * Категории суммируются в логические байты, не обещают освобождение reflink блоков.
   */
  async diskUsage() {
    const usage = {
      bytes: 0,
      modelBytes: 0,
      inputBytes: 0,
      temporaryBytes: 0,
      freeBytes: null
    };
    const stack = [this.dir];
    while (stack.length) {
      const current = stack.pop();
      const pinned = await pinDirectory(this.dir, current);
      try {
        for (const item of await fs5.readdir(pinned.child("."), { withFileTypes: true })) {
          const file = path5.join(current, item.name);
          if (item.isDirectory() && !item.isSymbolicLink()) {
            stack.push(file);
            continue;
          }
          if (!item.isFile()) {
            continue;
          }
          const stat = await fs5.lstat(pinned.child(item.name)).catch((error) => {
            if (error.code === "ENOENT") {
              return null;
            }
            throw error;
          });
          if (!stat?.isFile() || stat.nlink !== 1) {
            continue;
          }
          const relative = path5.relative(this.dir, file);
          const group = relative.startsWith(`.uploads${path5.sep}`) || /\.(?:part|tmp)$/.test(relative) ? "temporaryBytes" : relative.startsWith(`.jobs${path5.sep}`) ? "inputBytes" : "modelBytes";
          usage[group] += stat.size;
          usage.bytes += stat.size;
        }
        await pinned.verify();
      } finally {
        await pinned.close();
      }
    }
    const space = await fs5.statfs(this.dir).catch(() => null);
    usage.freeBytes = space ? space.bavail * space.bsize : null;
    return usage;
  }
  /**
   * Отсутствие настроек означает пустую таблицу, повреждённый JSON — явный отказ.
   * Settings не читается из live prefs и принадлежит конкретному library UUID.
   */
  async settings() {
    try {
      return decodeSettings(await readJson(this.dir, path5.join(this.dir, "settings.json")));
    } catch (error) {
      if (error.code === "ENOENT") {
        return { saveFolders: {} };
      }
      throw error;
    }
  }
  /**
   * Patch объединяет repo каждого проекта с актуальными settings под lock.
   * Независимые concurrent сохранения не стирают выбранную папку другого проекта.
   */
  async saveSettings(patch) {
    return withPathLock(`${this.dir}:settings`, async () => {
      const current = await this.settings();
      const changes = decodeSettings(patch);
      for (const [project2, repos] of Object.entries(changes.saveFolders)) {
        current.saveFolders[project2] = { ...current.saveFolders[project2], ...repos };
      }
      await this.persist(path5.join(this.dir, "settings.json"), current);
      return current;
    });
  }
  uploadsDir() {
    return path5.join(this.dir, ".uploads");
  }
  /**
   * Уборка проходит под общим lock uploads и пропускает действующие lease.
   * Старое имя не позволяет удалить ссылку наружу или вход продолжающегося заказа.
   */
  async cleanUploads(olderThanMs) {
    await withPathLock(`${this.dir}:uploads`, async () => {
      await this.assertOwner();
      const directory = await pinDirectory(this.dir, this.uploadsDir());
      try {
        for (const item of await fs5.readdir(directory.child("."), { withFileTypes: true })) {
          if (!isSafeName(item.name) || !item.isDirectory() || this.leases.has(`upload:${item.name}`)) {
            continue;
          }
          const stat = await fs5.lstat(directory.child(item.name));
          if (stat.isDirectory() && stat.mtimeMs < (this.options.now ?? Date.now)() - olderThanMs) {
            await this.removeDirectory(path5.join(this.uploadsDir(), item.name));
          }
        }
      } finally {
        await directory.close();
      }
    });
  }
};
function createLibrary(options) {
  return new Library(options);
}

// src/lib/studio3d/intents.ts
var CHILD_STAGES = [
  "prepared",
  "submitting",
  "accepted",
  "rejected",
  "unknown",
  "unresolved",
  "done"
];
var IntentError = class extends Error {
  code;
  constructor(code) {
    super(code === "stale_library" ? "\u0411\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0430 \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0430\u0441\u044C \u2014 \u0441\u0442\u0430\u0440\u044B\u0439 \u0437\u0430\u043F\u0440\u043E\u0441 \u043D\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D." : code === "idempotency_conflict" ? "\u042D\u0442\u043E\u0442 \u043A\u043B\u044E\u0447 \u0443\u0436\u0435 \u043E\u0442\u043D\u043E\u0441\u0438\u0442\u0441\u044F \u043A \u0434\u0440\u0443\u0433\u043E\u043C\u0443 \u0437\u0430\u043F\u0440\u043E\u0441\u0443." : "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E \u043F\u0440\u043E\u0447\u0438\u0442\u0430\u0442\u044C \u0438\u043B\u0438 \u0437\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u0436\u0443\u0440\u043D\u0430\u043B \u0437\u0430\u043A\u0430\u0437\u043E\u0432.");
    this.name = "IntentError";
    this.code = code;
  }
};
var recordKeys = /* @__PURE__ */ new Set([
  "schema",
  "kind",
  "intentId",
  "libraryId",
  "request",
  "requestFingerprint",
  "executionFingerprint",
  "accountKey",
  "provider",
  "operation",
  "values",
  "confirmedPrice",
  "unit",
  "catalogVersion",
  "context",
  "model",
  "modelId",
  "parentVersionId",
  "inputs",
  "children",
  "projectionReady",
  "preparation",
  "batch",
  "batchParent",
  "createdAt",
  "updatedAt",
  "revision"
]);
var childKeys = /* @__PURE__ */ new Set([
  "childId",
  "operation",
  "values",
  "plan",
  "version",
  "stage",
  "status",
  "progress",
  "etaSeconds",
  "estimated",
  "actual",
  "paymentState",
  "taskId",
  "taskType",
  "pool",
  "retryAt",
  "submittedAt",
  "updatedAt",
  "completedAt",
  "waitReason",
  "error",
  "remote",
  "candidates",
  "missedPolls",
  "notified",
  "confirmationExpired",
  "balanceBefore",
  "chargedAt",
  "actualSource",
  "waitingSince"
]);
function canonicalJson(value, depth = 0) {
  if (depth > 32) {
    throw new IntentError("invalid_request");
  }
  if (value === null || typeof value === "boolean" || typeof value === "string") {
    return JSON.stringify(value);
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      throw new IntentError("invalid_request");
    }
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map((entry) => canonicalJson(entry, depth + 1)).join(",")}]`;
  }
  if (value && typeof value === "object" && [Object.prototype, null].includes(Object.getPrototypeOf(value))) {
    const fields = Object.entries(value).filter(([, entry]) => entry !== void 0).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0);
    return `{${fields.map(([key, entry]) => `${JSON.stringify(key)}:${canonicalJson(entry, depth + 1)}`).join(",")}}`;
  }
  throw new IntentError("invalid_request");
}
function requestFingerprint(request2) {
  return createHash3("sha256").update(canonicalJson(request2)).digest("hex");
}
function validateRecord(value, expectedId, library) {
  if (!value || typeof value !== "object" || Array.isArray(value) || Object.keys(value).some((key) => !recordKeys.has(key))) {
    throw new IntentError("invalid_intent");
  }
  const record = value;
  if (record.schema !== 1 || record.intentId !== expectedId || !LIBRARY_UUID_RE.test(expectedId) || record.libraryId !== library.libraryId || !["run", "batch"].includes(record.kind) || !["pending", "complete"].includes(record.preparation) || !Array.isArray(record.children) || record.children.length > 50 || !Array.isArray(record.inputs) || record.inputs.length > 128 || typeof record.projectionReady !== "boolean" || !Number.isFinite(record.confirmedPrice) || record.confirmedPrice < 0 || !Number.isSafeInteger(record.revision) || record.revision < 0 || record.requestFingerprint !== requestFingerprint(record.request) || record.batchParent !== null && !LIBRARY_UUID_RE.test(record.batchParent)) {
    throw new IntentError("invalid_intent");
  }
  for (const key of [
    "provider",
    "operation",
    "catalogVersion",
    "executionFingerprint",
    "createdAt",
    "updatedAt"
  ]) {
    if (typeof record[key] !== "string" || !record[key] || record[key].length > 512) {
      throw new IntentError("invalid_intent");
    }
  }
  if (record.accountKey !== null && (typeof record.accountKey !== "string" || !record.accountKey || record.accountKey.length > 512)) {
    throw new IntentError("invalid_intent");
  }
  const ids = /* @__PURE__ */ new Set();
  const files = /* @__PURE__ */ new Set();
  for (const input2 of record.inputs) {
    if (!input2 || typeof input2 !== "object" || Object.keys(input2).some((key) => ![
      "role",
      "name",
      "size",
      "sha256",
      "native"
    ].includes(key)) || input2.name !== null && (!isSafeName(input2.name) || files.has(input2.name)) || !["primary", "front", "left", "back", "right"].includes(input2.role) || (input2.name === null ? input2.size !== null || input2.sha256 !== null || input2.native === null : !Number.isSafeInteger(input2.size) || input2.size < 0 || !/^[a-f0-9]{64}$/.test(input2.sha256))) {
      throw new IntentError("invalid_intent");
    }
    if (input2.name) {
      files.add(input2.name);
    }
    if (input2.native !== null && (!input2.native || typeof input2.native !== "object" || Object.keys(input2.native).some((key) => !["taskId", "taskType", "accountKey"].includes(key)) || typeof input2.native.taskId !== "string" || !input2.native.taskId || input2.native.taskId.length > 200 || typeof input2.native.taskType !== "string" || !input2.native.taskType || input2.native.accountKey !== record.accountKey)) {
      throw new IntentError("invalid_intent");
    }
  }
  const allowed = new Set(record.inputs.filter((input2) => input2.name !== null).map((input2) => path6.join(library.dir, ".jobs", expectedId, "inputs", input2.name)));
  for (const child of record.children) {
    if (!child || typeof child !== "object" || Object.keys(child).some((key) => !childKeys.has(key)) || !isSafeName(child.childId) || ids.has(child.childId) || !CHILD_STAGES.includes(child.stage) || !VERSION_STATUSES.includes(child.status) || !PAYMENT_STATES.includes(child.paymentState) || !Number.isFinite(child.estimated) || child.estimated < 0 || child.actual !== null && (!Number.isFinite(child.actual) || child.actual < 0) || child.chargedAt != null && (typeof child.chargedAt !== "string" || !Number.isFinite(Date.parse(child.chargedAt))) || child.actualSource != null && !["task", "usage"].includes(child.actualSource) || !Number.isInteger(child.progress) || child.progress < 0 || child.progress > 100 || !Array.isArray(child.candidates) || typeof child.notified !== "boolean" || typeof child.confirmationExpired !== "boolean") {
      throw new IntentError("invalid_intent");
    }
    ids.add(child.childId);
    validatePayload(child.plan?.payload, allowed, library.dir);
  }
  validateTypedFields(record, library);
  if (record.kind === "batch") {
    if (!record.batch || record.modelId !== null || record.children.length || record.batchParent !== null || !Array.isArray(record.batch.rows) || !record.batch.rows.length || record.batch.rows.length > 50 || record.batch.snapshotHash !== requestFingerprint(record.batch.snapshot)) {
      throw new IntentError("invalid_intent");
    }
    parseStudio3d.batchQuote({
      libraryId: record.libraryId,
      snapshot: record.batch.snapshot,
      snapshotHash: record.batch.snapshotHash,
      totalEstimated: record.confirmedPrice,
      unit: record.unit
    });
    const rowIds = /* @__PURE__ */ new Set();
    for (const row of record.batch.rows) {
      if (!row || Object.keys(row).some((key) => !["childId", "intentId", "template"].includes(key)) || !isSafeName(row.childId) || rowIds.has(row.intentId) || row.template?.kind !== "run" || row.template.batchParent !== record.intentId) {
        throw new IntentError("invalid_intent");
      }
      rowIds.add(row.intentId);
      validateRecord(row.template, row.intentId, library);
    }
  } else if (record.batch !== null) {
    throw new IntentError("invalid_intent");
  }
  return record;
}
function validateTypedFields(record, library) {
  try {
    parseStudio3d.values(record.values);
    parseStudio3d.unit(record.unit);
    validateContext(record.context);
    if (record.modelId !== null && !MODEL_ID_RE.test(record.modelId)) {
      throw new IntentError("invalid_intent");
    }
    if (record.parentVersionId !== null && !VERSION_ID_RE.test(record.parentVersionId)) {
      throw new IntentError("invalid_intent");
    }
    if (record.model !== null) {
      if (record.model.id !== record.modelId) {
        throw new IntentError("invalid_intent");
      }
      decodeModel(record.model, record.model.id, library.libraryId);
    }
    for (const child of record.children) {
      parseStudio3d.values(child.values);
      if (child.operation !== record.operation || !isSafeName(child.operation) || child.balanceBefore !== null && (!Number.isFinite(child.balanceBefore) || child.balanceBefore < 0) || !Number.isSafeInteger(child.missedPolls) || child.missedPolls < 0 || child.retryAt !== null && (!Number.isFinite(child.retryAt) || child.retryAt < 0) || child.etaSeconds !== null && (!Number.isFinite(child.etaSeconds) || child.etaSeconds < 0) || child.candidates.length > 100) {
        throw new IntentError("invalid_intent");
      }
      if (child.plan !== null && (!child.plan || Object.keys(child.plan).some((key) => ![
        "childId",
        "label",
        "values",
        "taskType",
        "payload"
      ].includes(key)) || child.plan.childId !== child.childId || typeof child.plan.label !== "string" || child.plan.label.length > 1e3 || child.plan.taskType !== child.taskType || canonicalJson(child.plan.values) !== canonicalJson(child.values))) {
        throw new IntentError("invalid_intent");
      }
      if (child.version) {
        decodeVersion(child.version, child.version.id, library.libraryId);
        if (child.version.intentId !== record.intentId || child.version.childId !== child.childId || child.version.accountKey !== record.accountKey || child.version.provider !== record.provider || child.version.operation !== child.operation) {
          throw new IntentError("invalid_intent");
        }
      }
      if (child.taskId !== null && (typeof child.taskId !== "string" || !/^[A-Za-z0-9][A-Za-z0-9_-]{7,100}$/.test(child.taskId))) {
        throw new IntentError("invalid_intent");
      }
      if (child.stage === "accepted" && child.taskId === null) {
        throw new IntentError("invalid_intent");
      }
      if (child.remote && (child.remote.id !== child.taskId || child.remote.type !== child.taskType || !Array.isArray(child.remote.outputs) || child.remote.outputs.length > 128 || !Array.isArray(child.remote.requiredRoles) || child.remote.requiredRoles.length > 128)) {
        throw new IntentError("invalid_intent");
      }
    }
  } catch {
    throw new IntentError("invalid_intent");
  }
}
function validateContext(context) {
  if (!context || typeof context !== "object" || Object.keys(context).some((key) => ![
    "kind",
    "format",
    "stats",
    "params",
    "nativeTaskType",
    "rigCheck",
    "views"
  ].includes(key)) || context.kind !== null && !VERSION_KINDS.includes(context.kind) || context.format !== null && !/^[a-z0-9]{1,10}$/.test(context.format) || !Array.isArray(context.views) || context.views.length > 4 || new Set(context.views).size !== context.views.length || context.views.some((view) => !["front", "left", "back", "right"].includes(view)) || context.nativeTaskType !== null && (typeof context.nativeTaskType !== "string" || context.nativeTaskType.length > 200)) {
    throw new IntentError("invalid_intent");
  }
  if (context.params !== null) {
    parseStudio3d.values(context.params);
  }
  if (context.rigCheck !== null && (!context.rigCheck || Object.keys(context.rigCheck).some((key) => ![
    "riggable",
    "rigType"
  ].includes(key)) || typeof context.rigCheck.riggable !== "boolean" || context.rigCheck.rigType !== null && typeof context.rigCheck.rigType !== "string")) {
    throw new IntentError("invalid_intent");
  }
  if (context.stats?.size !== void 0 && context.stats.size !== null && (context.stats.size.length !== 3 || context.stats.size.some((size) => !Number.isFinite(size) || size < 0))) {
    throw new IntentError("invalid_intent");
  }
  if (context.stats !== null) {
    parseStudio3d.stats({
      triangles: 0,
      vertices: 0,
      meshes: 0,
      materials: 0,
      bones: 0,
      animations: [],
      textures: [],
      size: null,
      facing: null,
      parts: [],
      extensions: [],
      ...context.stats
    });
  }
}
function validatePayload(value, allowed, root) {
  if (!value || typeof value !== "object") {
    return;
  }
  const stack = [value];
  let count = 0;
  while (stack.length) {
    const current = stack.pop();
    count += 1;
    if (count > 1e4) {
      throw new IntentError("invalid_intent");
    }
    for (const [key, item] of Object.entries(current)) {
      if (key === "file" && item && typeof item === "object" && !Array.isArray(item)) {
        const file = item;
        if (typeof file.path === "string" && (!allowed.has(file.path) || file.root !== void 0 && file.root !== root)) {
          throw new IntentError("invalid_intent");
        }
      }
      if (item && typeof item === "object") {
        stack.push(item);
      }
    }
  }
}
var Intents = class {
  options;
  records = /* @__PURE__ */ new Map();
  loaded = false;
  loading = null;
  constructor(options) {
    this.options = options;
  }
  assertId(id2) {
    if (!LIBRARY_UUID_RE.test(id2)) {
      throw new IntentError("invalid_intent");
    }
  }
  directory(id2) {
    this.assertId(id2);
    return path6.join(this.options.library.dir, ".jobs", id2);
  }
  inputPath(id2, name) {
    if (!isSafeName(name)) {
      throw new IntentError("invalid_intent");
    }
    return path6.join(this.directory(id2), "inputs", name);
  }
  /**
   * Load вызывается только при включённом lifecycle и восстанавливает весь журнал.
   * Битая schema закрывает dispatch, а orphan без intent не считается оплаченным заказом.
   */
  async load() {
    if (this.loaded) {
      return;
    }
    this.loading ??= this.loadSnapshot().catch((error) => {
      this.loading = null;
      throw error;
    });
    await this.loading;
  }
  /**
   * Одно initial чтение разделяется всеми ключами. Поздняя копия списка не
   * очищает cache поверх уже записанного соседнего намерения.
   */
  async loadSnapshot() {
    const library = this.options.library;
    await library.assertOwner();
    const directory = await pinDirectory(library.dir, path6.join(library.dir, ".jobs"));
    const loaded = /* @__PURE__ */ new Map();
    try {
      for (const item of await fs6.readdir(directory.child("."), { withFileTypes: true })) {
        if (!LIBRARY_UUID_RE.test(item.name)) {
          continue;
        }
        if (!item.isDirectory() || item.isSymbolicLink()) {
          throw new IntentError("invalid_intent");
        }
        let raw;
        try {
          await this.options.beforeRead?.(item.name);
          raw = await readJson(
            library.dir,
            path6.join(this.directory(item.name), "intent.json"),
            16 * 1024 * 1024
          );
        } catch (error) {
          if (error.code === "ENOENT") {
            continue;
          }
          throw error;
        }
        loaded.set(item.name, validateRecord(raw, item.name, library));
      }
      await directory.verify();
      this.records.clear();
      for (const [id2, record] of loaded) {
        this.records.set(id2, record);
      }
      this.loaded = true;
    } finally {
      await directory.close();
    }
  }
  /**
   * Get возвращает копию, чтобы случайная мутация не опередила fsync.
   * Старый libraryId отклоняется до просмотра ключей другой библиотеки.
   */
  async get(id2, libraryId = this.options.library.libraryId) {
    this.assertId(id2);
    if (libraryId !== this.options.library.libraryId) {
      throw new IntentError("stale_library");
    }
    if (!this.loaded) {
      await this.load();
    }
    const record = this.records.get(id2);
    return record ? structuredClone(record) : null;
  }
  /**
   * Список сохраняет метаданные всех терминальных/удалённых/unknown намерений.
   * Никакой срок не удаляет ключ и финансовый исход автоматически.
   */
  async list() {
    if (!this.loaded) {
      await this.load();
    }
    return [...this.records.values()].map((record) => structuredClone(record));
  }
  /**
   * Reserve атомарно сравнивает исходный fingerprint и фиксирует единственный UUID.
   * Свои входы уже скопированы, а проекции/POST создаются только после успешного fsync.
   */
  async reserve(source) {
    const library = this.options.library;
    if (source.libraryId !== library.libraryId) {
      throw new IntentError("stale_library");
    }
    this.assertId(source.intentId);
    return withPathLock(`studio3d:intent:${library.dir}:${source.intentId}`, async () => {
      const previous = await this.get(source.intentId);
      if (previous) {
        if (previous.requestFingerprint !== source.requestFingerprint) {
          throw new IntentError("idempotency_conflict");
        }
        return { created: false, record: previous };
      }
      const record = validateRecord(structuredClone(source), source.intentId, library);
      await ensureDirectory(library.dir, this.directory(source.intentId));
      await this.write(record, false);
      return { created: true, record: structuredClone(record) };
    });
  }
  /**
   * Callback изменяет отдельную копию под lock, durable запись предшествует cache.
   * Fault после fsync уже виден recovery; ошибка до fsync не меняет старое состояние.
   */
  async update(id2, change) {
    return withPathLock(`studio3d:intent:${this.options.library.dir}:${id2}`, async () => {
      const record = await this.get(id2);
      if (!record) {
        throw new IntentError("intent_not_found");
      }
      const identity = record.requestFingerprint;
      const previous = canonicalJson(record);
      change(record);
      if (record.requestFingerprint !== identity || record.intentId !== id2) {
        throw new IntentError("immutable_intent");
      }
      if (canonicalJson(record) === previous) {
        return structuredClone(record);
      }
      record.revision += 1;
      validateRecord(record, id2, this.options.library);
      await this.write(record, true);
      return structuredClone(record);
    });
  }
  /**
   * Запись проходит owner lock и durable atomic publish библиотеки.
   * После успешного fsync cache заменяется целиком, никогда частично.
   */
  async write(record, replace) {
    if (Buffer.byteLength(JSON.stringify(record, null, 2)) > 16 * 1024 * 1024) {
      throw new IntentError("invalid_intent");
    }
    await this.options.beforeWrite?.(structuredClone(record));
    await this.options.library.persist(
      path6.join(this.directory(record.intentId), "intent.json"),
      record,
      replace
    );
    this.records.set(record.intentId, structuredClone(record));
    await this.options.afterWrite?.(structuredClone(record));
  }
};
function createIntents(options) {
  return new Intents(options);
}

// src/lib/studio3d/providers.ts
import path8 from "node:path";

// src/lib/studio3d/local.ts
import { promises as fs7 } from "node:fs";
import path7 from "node:path";
var HALF = Math.SQRT1_2;
var TURNS = {
  y90: {
    rotation: [0, HALF, 0, HALF],
    label: "\u041F\u043E\u0432\u043E\u0440\u043E\u0442 \u043D\u0430 90\xB0 \u043F\u0440\u043E\u0442\u0438\u0432 \u0447\u0430\u0441\u043E\u0432\u043E\u0439"
  },
  "y-90": {
    rotation: [0, -HALF, 0, HALF],
    label: "\u041F\u043E\u0432\u043E\u0440\u043E\u0442 \u043D\u0430 90\xB0 \u043F\u043E \u0447\u0430\u0441\u043E\u0432\u043E\u0439"
  },
  y180: {
    rotation: [0, 1, 0, 0],
    label: "\u041F\u043E\u0432\u043E\u0440\u043E\u0442 \u043D\u0430 180\xB0"
  }
};
function rotateFields(context) {
  const facing = context.stats?.facing;
  const hint = facing === "z" ? "\u0421\u0435\u0439\u0447\u0430\u0441 \u0444\u0438\u0433\u0443\u0440\u0430 \u0441\u043C\u043E\u0442\u0440\u0438\u0442 \u0432\u0434\u043E\u043B\u044C Z; Tripo \u043E\u0445\u043E\u0442\u043D\u0435\u0435 \u043E\u0441\u043D\u0430\u0449\u0430\u0435\u0442 \u043C\u043E\u0434\u0435\u043B\u044C, \u0441\u043C\u043E\u0442\u0440\u044F\u0449\u0443\u044E \u0432\u0434\u043E\u043B\u044C X." : "\u041F\u043E\u0432\u043E\u0440\u043E\u0442 \u0432\u043E\u043A\u0440\u0443\u0433 \u0432\u0435\u0440\u0442\u0438\u043A\u0430\u043B\u044C\u043D\u043E\u0439 \u043E\u0441\u0438; \u0441\u043A\u0435\u043B\u0435\u0442 \u0438 \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u044F \u043F\u043E\u0432\u043E\u0440\u0430\u0447\u0438\u0432\u0430\u044E\u0442\u0441\u044F \u0432\u043C\u0435\u0441\u0442\u0435 \u0441 \u043C\u043E\u0434\u0435\u043B\u044C\u044E.";
  return [{
    id: "turn",
    kind: "select",
    label: "\u041F\u043E\u0432\u043E\u0440\u043E\u0442",
    default: "y90",
    hint,
    options: [
      {
        value: "y90",
        label: "\u041D\u0430 90\xB0 \u043F\u0440\u043E\u0442\u0438\u0432 \u0447\u0430\u0441\u043E\u0432\u043E\u0439",
        hint: "\u0412\u0437\u0433\u043B\u044F\u0434 \u0441 +Z \u043D\u0430 +X."
      },
      {
        value: "y-90",
        label: "\u041D\u0430 90\xB0 \u043F\u043E \u0447\u0430\u0441\u043E\u0432\u043E\u0439",
        hint: "\u0412\u0437\u0433\u043B\u044F\u0434 \u0441 +X \u043D\u0430 +Z."
      },
      {
        value: "y180",
        label: "\u041D\u0430 180\xB0"
      }
    ]
  }];
}
function scaleFields(context) {
  const height = context.stats?.size?.[1];
  return [{
    id: "height",
    kind: "number",
    label: "\u0420\u043E\u0441\u0442, \u043C",
    required: true,
    min: 0.01,
    max: 1e3,
    hint: typeof height === "number" ? `\u0421\u0435\u0439\u0447\u0430\u0441 ${height.toLocaleString("ru-RU")} \u043C.` : void 0
  }];
}
function validateLocal(operation, raw, context) {
  const builders = {
    rotate: rotateFields,
    scale: scaleFields
  };
  const fields = builders[operation]?.(context) ?? null;
  if (!fields) {
    return {
      values: {},
      errors: [{
        field: null,
        message: "\u041F\u043E\u043C\u043E\u0449\u043D\u0438\u043A \u044D\u0442\u043E\u0433\u043E \u043D\u0435 \u0443\u043C\u0435\u0435\u0442."
      }],
      warnings: []
    };
  }
  const result = normalizeValues(fields, raw);
  if (context.format !== "glb") {
    result.errors.push({
      field: null,
      message: "\u041F\u043E\u043C\u043E\u0449\u043D\u0438\u043A\u0438 \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u0441 GLB."
    });
  }
  const height = context.stats?.size?.[1];
  if (operation === "scale" && !(typeof height === "number" && height > 0)) {
    result.errors.push({
      field: null,
      message: "\u0412\u044B\u0441\u043E\u0442\u0430 \u043C\u043E\u0434\u0435\u043B\u0438 \u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430 \u2014 \u0440\u043E\u0441\u0442 \u0437\u0430\u0434\u0430\u0442\u044C \u043D\u0435\u043B\u044C\u0437\u044F."
    });
  }
  return result;
}
function createLocalStudio(analysis = {}) {
  return {
    id: "local",
    name: "\u041B\u043E\u043A\u0430\u043B\u044C\u043D\u043E",
    local: true,
    unit: null,
    usdPerUnit: null,
    available: () => true,
    operations(context) {
      return [
        {
          operation: "rotate",
          fields: rotateFields(context)
        },
        {
          operation: "scale",
          fields: scaleFields(context)
        }
      ];
    },
    validate: validateLocal,
    quote: () => ({
      total: 0,
      lines: [],
      unit: null,
      usd: null,
      note: null
    }),
    run: (request2) => runLocal(request2, analysis)
  };
}
async function runLocal(request2, analysis) {
  let label;
  let options;
  if (request2.operation === "rotate") {
    const turn = TURNS[String(request2.values.turn)];
    if (!turn) {
      throw new Error("\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u044B\u0439 \u043F\u043E\u0432\u043E\u0440\u043E\u0442 \u043C\u043E\u0434\u0435\u043B\u0438.");
    }
    options = {
      rotation: turn?.rotation,
      name: "grigdesk-rotate"
    };
    label = turn?.label ?? "\u041F\u043E\u0432\u043E\u0440\u043E\u0442";
  } else if (request2.operation === "scale") {
    const height = Number(request2.values.height);
    const current = (await inspectGlbFile(request2.inputPath, {
      ...analysis,
      root: request2.root,
      signal: request2.signal
    })).size?.[1] ?? 0;
    if (!(current > 0) || !(height > 0)) {
      throw new Error("\u0412\u044B\u0441\u043E\u0442\u0430 \u043C\u043E\u0434\u0435\u043B\u0438 \u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430 \u2014 \u0440\u043E\u0441\u0442 \u0437\u0430\u0434\u0430\u0442\u044C \u043D\u0435\u043B\u044C\u0437\u044F.");
    }
    options = {
      scale: height / current,
      name: "grigdesk-scale"
    };
    label = `\u0420\u043E\u0441\u0442 ${height.toLocaleString("ru-RU")} \u043C`;
  } else {
    throw new Error("\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u044B\u0439 \u043F\u043E\u043C\u043E\u0449\u043D\u0438\u043A.");
  }
  await fs7.mkdir(request2.outputDir, { recursive: true });
  await rewriteGlbFile(request2.inputPath, path7.join(request2.outputDir, "model.glb"), options, {
    ...analysis,
    root: request2.root,
    signal: request2.signal
  });
  return {
    files: [{
      role: "model",
      name: "model.glb"
    }],
    label
  };
}

// src/lib/studio3d/provider.ts
var ProviderFailure = class extends Error {
  error;
  submitted;
  constructor(error, submitted) {
    super(error.message);
    this.error = error;
    this.submitted = submitted;
  }
};
var START_CONTEXT = {
  kind: null,
  format: null,
  stats: null,
  params: null,
  nativeTaskType: null,
  rigCheck: null,
  views: []
};
var providerErrorKinds = /* @__PURE__ */ new Set([
  "auth",
  "credits",
  "busy",
  "rate",
  "params",
  "input",
  "moderation",
  "complex",
  "expired",
  "not-found",
  "server",
  "network",
  "unknown"
]);
function isProviderFailure(value) {
  if (!value || typeof value !== "object") {
    return false;
  }
  const candidate = value;
  if (candidate.submitted !== true && candidate.submitted !== false && candidate.submitted !== null) {
    return false;
  }
  if (!candidate.error || typeof candidate.error !== "object" || Array.isArray(candidate.error)) {
    return false;
  }
  const error = candidate.error;
  return typeof error.kind === "string" && providerErrorKinds.has(error.kind) && typeof error.message === "string" && (error.code === null || typeof error.code === "number" && Number.isFinite(error.code)) && (error.detail === null || typeof error.detail === "string") && (error.retryAfterMs === null || typeof error.retryAfterMs === "number" && Number.isFinite(error.retryAfterMs) && error.retryAfterMs >= 0);
}

// src/lib/studio3d/providers.ts
function studioProviders({ providers, local = createLocalStudio() }) {
  return providers.filter((provider) => provider.id !== "local").concat(local);
}
function inputContext(version2, provider, captured) {
  if (!version2) {
    return structuredClone(START_CONTEXT);
  }
  const account = captured ?? provider.snapshot?.();
  const native = version2.task?.provider === provider.id && version2.accountKey !== null && version2.accountKey === account?.accountKey && version2.status !== "remote";
  const file = version2.files.find((item) => item.id === version2.mainFileId) ?? version2.files.find((item) => ["model", "file", "image"].includes(item.role));
  return {
    kind: version2.kind,
    format: file ? path8.extname(file.name).slice(1).toLowerCase() : null,
    stats: version2.stats,
    params: version2.params,
    nativeTaskType: native ? version2.task.type : null,
    rigCheck: version2.rigCheck?.status === "ready" ? {
      riggable: version2.rigCheck.riggable,
      rigType: version2.rigCheck.rigType
    } : null,
    views: version2.views
  };
}
function reasonFor(operation, context, provider, available) {
  if (!available) {
    return `\u041D\u0443\u0436\u0435\u043D \u043A\u043B\u044E\u0447 ${provider.name} \u2014 \xAB\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u2192 \u0418\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u0438\xBB.`;
  }
  if (operation.needsNative && !provider.nativeAccepts?.(operation.operation, context.nativeTaskType)) {
    return operation.operation === "animate" ? `\u0414\u043B\u044F \u044D\u0442\u043E\u0433\u043E \u0448\u0430\u0433\u0430 \u043D\u0443\u0436\u043D\u0430 \u0432\u0435\u0440\u0441\u0438\u044F, \u0433\u0434\u0435 \u0441\u043A\u0435\u043B\u0435\u0442, \u043F\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043D\u044B\u0439 ${provider.name}.` : "\u0414\u043B\u044F \u044D\u0442\u043E\u0433\u043E \u0448\u0430\u0433\u0430 \u043D\u0443\u0436\u043D\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F \u044D\u0442\u043E\u0433\u043E \u0438\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044F.";
  }
  if (operation.needsNative && operation.fields.some((field) => field.kind === "multiselect" && field.required && !field.options?.length)) {
    return "\u0412\u0435\u0440\u0441\u0438\u044F \u0438 \u0442\u0438\u043F \u0441\u043A\u0435\u043B\u0435\u0442\u0430 \u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u044B \u2014 \u043D\u0430\u0431\u043E\u0440 \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u0439 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D.";
  }
  if (provider.local && context.format !== "glb") {
    return "\u041F\u043E\u043C\u043E\u0449\u043D\u0438\u043A\u0438 \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u0441 \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D\u043D\u044B\u043C GLB.";
  }
  if (provider.local && operation.operation === "scale" && !((context.stats?.size?.[1] ?? 0) > 0)) {
    return "\u0412\u044B\u0441\u043E\u0442\u0430 \u043C\u043E\u0434\u0435\u043B\u0438 \u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430 \u2014 \u0440\u043E\u0441\u0442 \u0437\u0430\u0434\u0430\u0442\u044C \u043D\u0435\u043B\u044C\u0437\u044F.";
  }
  return null;
}
async function offersFor(options) {
  const result = [];
  const specs = operationsFor(options.version?.kind ?? options.context?.kind ?? "start");
  for (const provider of options.providers) {
    const captured = provider.snapshot?.();
    let context = options.version ? inputContext(options.version, provider, captured) : structuredClone(options.context ?? START_CONTEXT);
    const available = await provider.available();
    if (available && context.nativeTaskType && options.version?.task && provider.poll && captured) {
      try {
        const response = await provider.poll([options.version.task.id], captured);
        const source = response.tasks.find((task) => task.id === options.version.task.id);
        if (source?.state !== "success" || source.type !== context.nativeTaskType) {
          context = { ...context, nativeTaskType: null };
        }
      } catch {
        context = { ...context, nativeTaskType: null };
      }
    }
    if (captured && !provider.isCurrent?.(captured)) {
      context = { ...context, nativeTaskType: null };
    }
    for (const operation of provider.operations(context)) {
      const spec = specs.find((item) => item.id === operation.operation);
      if (!spec) {
        continue;
      }
      const normalized = normalizeValues(operation.fields, {});
      const quote2 = provider.quote(operation.operation, normalized.values, context);
      const reason = reasonFor(operation, context, provider, available);
      result.push({
        provider: provider.id,
        providerName: provider.name,
        local: provider.local,
        operation: operation.operation,
        label: spec.label,
        group: spec.group,
        fields: structuredClone(operation.fields),
        presets: structuredClone(operation.presets ?? []),
        note: operation.note ?? null,
        priceKnown: operation.priceKnown !== false && quote2.total !== null && Number.isFinite(quote2.total),
        available: reason === null,
        reason,
        quote: quote2
      });
    }
  }
  return result;
}

// src/lib/studio3d/jobInputs.ts
async function pinSnapshots(library, intents, record) {
  const pinned = [];
  try {
    for (const snapshot2 of record.inputs) {
      if (!snapshot2.name) {
        continue;
      }
      const opened = await openVerified(library.dir, intents.inputPath(record.intentId, snapshot2.name));
      pinned.push(opened);
      const hash = createHash4("sha256");
      await pipeline3(borrowedReadStream(opened.handle, opened.canonical), hash);
      await opened.verify();
      if (opened.size !== snapshot2.size || hash.digest("hex") !== snapshot2.sha256) {
        throw new IntentError("snapshot_changed");
      }
    }
    return {
      /**
       * Последняя проверка не уступает управление между durable submitting и POST.
       * Замена пути или содержимого открытого снимка отменяет отправку.
       */
      verifyNow() {
        library.assertOwnerNow();
        for (const opened of pinned) {
          const current = fstatSync3(opened.handle.fd, { bigint: true });
          const atPath = lstatSync3(opened.canonical, { bigint: true });
          if (fileRevision(current) !== opened.revision || fileRevision(atPath) !== opened.revision || !atPath.isFile() || atPath.isSymbolicLink() || realpathSync3(opened.canonical) !== opened.canonical) {
            throw new IntentError("snapshot_changed");
          }
        }
      },
      close: async () => {
        await Promise.all(pinned.map((opened) => opened.handle.close()));
      }
    };
  } catch (error) {
    await Promise.all(pinned.map((opened) => opened.handle.close()));
    throw error;
  }
}
async function selectJobInputs(library, request2, provider, captured) {
  const releases = [];
  try {
    if (request2.versionId && !request2.modelId) {
      throw new IntentError("invalid_input");
    }
    const entry = request2.modelId ? await library.readModel(request2.modelId) : null;
    const version2 = entry?.versions.find((item) => item.id === request2.versionId) ?? null;
    if (request2.versionId && !version2) {
      throw new IntentError("invalid_input");
    }
    if (version2 && request2.uploads?.length) {
      throw new IntentError("invalid_input");
    }
    const context = inputContext(version2, provider, captured);
    const inputs = [];
    if (version2 && request2.modelId) {
      releases.push(library.leaseVersion(request2.modelId, version2.id, request2.idempotencyKey));
      const native = context.nativeTaskType && version2.task && captured ? {
        taskId: version2.task.id,
        taskType: version2.task.type,
        accountKey: captured.accountKey
      } : null;
      const files = version2.kind === "views" ? version2.files.filter((file) => ["front", "left", "back", "right"].includes(file.role)) : [version2.files.find((file) => file.id === version2.mainFileId) ?? version2.files.find((file) => ["model", "file", "image"].includes(file.role))].filter(Boolean);
      for (const file of files) {
        const opened = await library.openVersionFile(request2.modelId, version2.id, file.name);
        await opened.handle.close();
        inputs.push({
          role: version2.kind === "views" ? file.role : "primary",
          native,
          file: {
            path: opened.canonical,
            root: library.dir,
            name: file.name
          }
        });
      }
      if (!files.length && native) {
        inputs.push({
          role: "primary",
          native,
          file: null
        });
      }
    }
    const roles = /* @__PURE__ */ new Set();
    for (const item of request2.uploads ?? []) {
      if (!isSafeName(item.uploadId) || roles.has(item.role)) {
        throw new IntentError("invalid_input");
      }
      roles.add(item.role);
      releases.push(library.leaseUpload(item.uploadId, request2.idempotencyKey));
      const folder = path9.join(library.dir, ".uploads", item.uploadId);
      const upload2 = parseStudio3d.upload(await readJson(library.dir, path9.join(folder, "upload.json")));
      if (upload2.libraryId !== library.libraryId || upload2.uploadId !== item.uploadId || !isSafeName(upload2.name)) {
        throw new IntentError("invalid_input");
      }
      const file = path9.join(folder, upload2.name);
      const checked = await verifiedHash(library.dir, file);
      if (checked.size !== upload2.size) {
        throw new IntentError("invalid_input");
      }
      inputs.push({
        role: item.role,
        native: null,
        file: {
          path: file,
          name: upload2.name,
          root: library.dir
        }
      });
      context.kind = item.role === "primary" ? upload2.kind : "views";
      context.format = path9.extname(upload2.name).slice(1).toLowerCase();
      context.stats = upload2.stats;
      if (item.role !== "primary") {
        context.views = [...context.views, item.role];
      }
    }
    if (request2.operation === "views-to-model" && (inputs.length < 2 || inputs.length > 4 || !inputs.some((input2) => input2.role === "front") || inputs.some((input2) => input2.role === "primary"))) {
      throw new IntentError("invalid_input");
    }
    return {
      context,
      version: version2,
      inputs,
      release: () => releases.forEach((release) => release())
    };
  } catch (error) {
    releases.forEach((release) => release());
    throw error;
  }
}
async function snapshotInputs(library, intents, intentId, inputs) {
  await ensureDirectory(library.dir, path9.join(intents.directory(intentId), "inputs"));
  const snapshots = [];
  const resolved = [];
  for (const [index, input2] of inputs.entries()) {
    const extension = input2.file ? path9.extname(input2.file.name).toLowerCase() : "";
    const name = input2.file ? `${index + 1}-${input2.role}${extension}` : null;
    let info = null;
    if (input2.file && name) {
      info = await safeCopy({
        sourceRoot: input2.file.root ?? path9.dirname(input2.file.path),
        source: input2.file.path,
        targetRoot: library.dir,
        target: intents.inputPath(intentId, name),
        maxBytes: 150 * 1024 * 1024
      });
    }
    const native = input2.native?.accountKey ? {
      taskId: input2.native.taskId,
      taskType: input2.native.taskType,
      accountKey: input2.native.accountKey
    } : null;
    snapshots.push({
      role: input2.role,
      name,
      size: info?.size ?? null,
      sha256: info?.sha256 ?? null,
      native
    });
    resolved.push({
      role: input2.role,
      native,
      file: name ? {
        path: intents.inputPath(intentId, name),
        name,
        root: library.dir
      } : null
    });
  }
  return { inputs: resolved, snapshots };
}
async function retainedInputs(library, intents, intentId, snapshots) {
  for (const input2 of snapshots) {
    if (!input2.name) {
      continue;
    }
    try {
      const info = await verifiedHash(library.dir, intents.inputPath(intentId, input2.name));
      if (info.size !== input2.size || info.sha256 !== input2.sha256) {
        return false;
      }
    } catch {
      return false;
    }
  }
  return true;
}
async function discardInputs(library, intents, intentId) {
  await library.assertOwner();
  const parent = await pinDirectory(library.dir, intents.directory(intentId)).catch((error) => {
    if (error.code === "ENOENT") {
      return null;
    }
    throw error;
  });
  if (!parent) {
    return;
  }
  try {
    await parent.verify();
    await fs8.rm(parent.child("inputs"), { recursive: true, force: true });
    await parent.handle.sync();
    await parent.verify();
  } finally {
    await parent.handle.close();
  }
}

// src/server/runtime.ts
import { randomUUID as randomUUID6 } from "node:crypto";
import { promises as fs14 } from "node:fs";
import os from "node:os";
import path18 from "node:path";

// src/lib/studio3d/jobBatches.ts
import { createHash as createHash5 } from "node:crypto";

// src/lib/studio3d/jobErrors.ts
var JobError = class extends IntentError {
  data;
  constructor(code, data = null) {
    super(code);
    this.data = data;
  }
};
var InjectedCrash = class extends Error {
  constructor(cause) {
    super(cause instanceof Error ? cause.message : "\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u0432 \u043F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C\u043E\u0439 durable \u0433\u0440\u0430\u043D\u0438\u0446\u0435.");
    this.name = "StudioJobInjectedCrash";
  }
};
function fallbackError(kind, message) {
  return {
    kind,
    code: null,
    message,
    detail: null,
    retryAfterMs: null
  };
}

// src/lib/studio3d/jobRequest.ts
var runKeys = /* @__PURE__ */ new Set([
  "libraryId",
  "idempotencyKey",
  "provider",
  "operation",
  "values",
  "expectedPrice",
  "modelId",
  "versionId",
  "uploads",
  "name",
  "project",
  "category"
]);
function validateRunRequest(value) {
  if (!value || typeof value !== "object" || Array.isArray(value) || Object.keys(value).some((key) => !runKeys.has(key))) {
    throw new JobError("invalid_request");
  }
  const request2 = value;
  if (!LIBRARY_UUID_RE.test(request2.libraryId) || !LIBRARY_UUID_RE.test(request2.idempotencyKey) || !isSafeName(request2.provider) || !isSafeName(request2.operation) || !request2.values || typeof request2.values !== "object" || Array.isArray(request2.values) || !Number.isFinite(request2.expectedPrice) || request2.expectedPrice < 0 || request2.name !== void 0 && (typeof request2.name !== "string" || !request2.name.trim() || request2.name.length > 200) || request2.modelId !== void 0 && !isSafeName(request2.modelId) || request2.versionId !== void 0 && !isSafeName(request2.versionId) || request2.project !== void 0 && request2.project !== null && !isSafeName(request2.project) || request2.category !== void 0 && request2.category !== null && !["character", "prop", "part", "scene"].includes(request2.category)) {
    throw new JobError("invalid_request");
  }
  if (request2.uploads !== void 0 && (!Array.isArray(request2.uploads) || request2.uploads.length > 4 || request2.uploads.some((item) => !item || typeof item !== "object" || Object.keys(item).some((key) => !["uploadId", "role"].includes(key)) || !isSafeName(item.uploadId) || !["primary", "front", "left", "back", "right"].includes(item.role)))) {
    throw new JobError("invalid_request");
  }
  if (Buffer.byteLength(canonicalJson(request2)) > 256 * 1024) {
    throw new JobError("invalid_request");
  }
  return structuredClone(request2);
}
function requirePrice(quote2, expected) {
  if (quote2.total === null || !Number.isFinite(quote2.total) || quote2.total < 0 || !Number.isSafeInteger(Math.round(quote2.total * 100))) {
    throw new JobError("price_unknown", { quote: quote2 });
  }
  if (Math.round(quote2.total * 100) !== Math.round(expected * 100)) {
    throw new JobError("price_changed", { quote: quote2 });
  }
  return quote2.total;
}

// src/lib/studio3d/jobBatches.ts
function createJobBatches(ports) {
  const quoteBatch = async (input2) => {
    ports.admission.capture(input2.libraryId);
    if (!Array.isArray(input2.rows) || !input2.rows.length || input2.rows.length > 50) {
      throw new JobError("invalid_batch");
    }
    const rows2 = [];
    const catalogs = [];
    let unit = null;
    let unitSet = false;
    for (const row of input2.rows) {
      if (Object.keys(row).some((key) => ![
        "provider",
        "operation",
        "values",
        "name",
        "project",
        "category",
        "expectedPrice"
      ].includes(key))) {
        throw new JobError("invalid_batch");
      }
      const provider = ports.lookupProvider(row.provider);
      const captured = provider?.snapshot?.();
      const spec = operationSpec(row.operation);
      if (!provider || !spec?.inputs.includes("text") || !await provider.available() || captured && !provider.isCurrent?.(captured)) {
        throw new JobError("invalid_batch");
      }
      const validation2 = provider.validate(row.operation, row.values, START_CONTEXT);
      if (validation2.errors.length) {
        throw new JobError("validation_failed", { validation: validation2 });
      }
      const quote2 = provider.quote(row.operation, validation2.values, START_CONTEXT);
      const price = requirePrice(quote2, quote2.total);
      if (unitSet && requestFingerprint(unit) !== requestFingerprint(quote2.unit)) {
        throw new JobError("mixed_units");
      }
      unit = quote2.unit;
      unitSet = true;
      const request2 = validateRunRequest({
        ...row,
        values: validation2.values,
        expectedPrice: price,
        libraryId: input2.libraryId,
        idempotencyKey: "00000000-0000-4000-8000-000000000001"
      });
      rows2.push({
        provider: request2.provider,
        operation: request2.operation,
        values: request2.values,
        name: request2.name,
        project: request2.project ?? null,
        category: request2.category ?? null,
        expectedPrice: price
      });
      catalogs.push({
        provider: provider.id,
        fields: provider.operations(START_CONTEXT),
        unit: quote2.unit
      });
    }
    const totalEstimated = rows2.reduce((sum, row) => sum + row.expectedPrice, 0);
    const snapshot2 = {
      libraryId: input2.libraryId,
      rows: rows2,
      catalogVersion: requestFingerprint(catalogs),
      totalEstimated,
      unit
    };
    return parseStudio3d.batchQuote({
      libraryId: input2.libraryId,
      snapshot: snapshot2,
      snapshotHash: requestFingerprint(snapshot2),
      totalEstimated,
      unit
    });
  };
  const rowId = (batchId, index) => {
    const hash = createHash5("sha256").update(`${batchId}:row:${index}`).digest("hex");
    const uuid3 = `${hash.slice(0, 12)}4${hash.slice(13, 16)}8${hash.slice(17, 32)}`;
    return `${uuid3.slice(0, 8)}-${uuid3.slice(8, 12)}-${uuid3.slice(12, 16)}-${uuid3.slice(
      16,
      20
    )}-${uuid3.slice(20)}`;
  };
  const materializeBatch = async (record) => {
    if (!record.batch || record.preparation === "complete") {
      return;
    }
    for (const row of record.batch.rows) {
      const { record: current } = await ports.intents.reserve(row.template);
      if (current.batchParent !== record.intentId) {
        throw new JobError("idempotency_conflict");
      }
      await ports.materialize(current);
      await ports.injectFault("after-batch-row", record);
    }
    await ports.intents.update(record.intentId, (current) => {
      current.preparation = "complete";
      current.updatedAt = ports.at();
    });
  };
  const batchBlocked = async (record) => {
    if (!record.batchParent) {
      return false;
    }
    const parent = await ports.intents.get(record.batchParent);
    if (parent?.preparation !== "complete") {
      return true;
    }
    for (const row of parent.batch?.rows ?? []) {
      const sibling = await ports.intents.get(row.intentId);
      if (sibling?.children.some((child) => ["unknown", "unresolved"].includes(child.stage) || child.confirmationExpired)) {
        await ports.change(
          record.intentId,
          record.children[0].childId,
          { waitReason: "\u041F\u0430\u0447\u043A\u0430 \u043F\u0440\u0438\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430 \u2014 \u0440\u0430\u0437\u0431\u0435\u0440\u0438\u0442\u0435 \u0438\u0441\u0445\u043E\u0434 \u0438\u043B\u0438 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u043D\u043E\u0432\u0443\u044E \u0446\u0435\u043D\u0443." }
        );
        return true;
      }
    }
    return false;
  };
  const batch = async (intentId, libraryId = ports.library.libraryId) => {
    ports.admission.capture(libraryId);
    const parent = await ports.intents.get(intentId, libraryId);
    if (!parent?.batch) {
      throw new JobError("intent_not_found");
    }
    const children = [];
    for (const row of parent.batch.rows) {
      const record = await ports.intents.get(row.intentId);
      const statuses = record?.children.map((child) => child.status) ?? ["waiting"];
      const status2 = statuses.includes("unknown") ? "unknown" : statuses.every((item) => item === "ready") ? "ready" : statuses.includes("waiting") ? "waiting" : statuses[0];
      children.push({
        childId: row.childId,
        intentId: row.intentId,
        modelId: record?.modelId ?? null,
        status: status2,
        estimated: record?.confirmedPrice ?? row.template.confirmedPrice
      });
    }
    const status = children.some((child) => child.status === "unknown") ? "unknown" : children.every((child) => child.status === "ready") ? "ready" : children.every((child) => !ACTIVE_STATUSES.includes(child.status)) ? "failed" : "waiting";
    return parseStudio3d.batchRun({
      intentId,
      libraryId,
      children,
      totalEstimated: parent.confirmedPrice,
      unit: parent.unit,
      status
    });
  };
  const acceptBatch = async (input2, fingerprint) => {
    const { library, intents } = ports;
    const previous = await intents.get(input2.idempotencyKey, input2.libraryId);
    if (previous) {
      if (previous.kind !== "batch" || previous.requestFingerprint !== fingerprint) {
        throw new JobError("idempotency_conflict");
      }
      await materializeBatch(previous);
      return batch(previous.intentId, input2.libraryId);
    }
    const token = ports.admission.capture(input2.libraryId);
    const decoded = parseStudio3d.batchQuote({
      libraryId: input2.libraryId,
      snapshot: input2.snapshot,
      snapshotHash: input2.snapshotHash,
      totalEstimated: input2.snapshot.totalEstimated,
      unit: input2.snapshot.unit
    });
    if (decoded.snapshot.libraryId !== input2.libraryId || input2.snapshotHash !== requestFingerprint(input2.snapshot)) {
      throw new JobError("invalid_batch");
    }
    const quote2 = await quoteBatch({ libraryId: input2.libraryId, rows: input2.snapshot.rows });
    if (quote2.snapshotHash !== input2.snapshotHash) {
      throw new JobError("price_changed", { quote: quote2 });
    }
    const templates = [];
    const capturedAccounts = [];
    let saved = false;
    try {
      for (const [index, row] of quote2.snapshot.rows.entries()) {
        const request2 = validateRunRequest({
          ...row,
          libraryId: input2.libraryId,
          idempotencyKey: rowId(input2.idempotencyKey, index)
        });
        const provider = ports.lookupProvider(row.provider);
        const captured = provider.snapshot?.();
        if (captured) {
          capturedAccounts.push({ provider, captured });
        }
        const selection = {
          context: structuredClone(START_CONTEXT),
          version: null,
          inputs: [],
          release: () => {
          }
        };
        templates.push(await ports.buildIntent(
          request2,
          requestFingerprint(request2),
          token,
          provider,
          captured,
          selection,
          input2.idempotencyKey
        ));
      }
      const at = ports.at();
      const record = {
        schema: 1,
        kind: "batch",
        intentId: input2.idempotencyKey,
        libraryId: input2.libraryId,
        request: structuredClone(input2),
        requestFingerprint: fingerprint,
        executionFingerprint: input2.snapshotHash,
        accountKey: null,
        provider: "batch",
        operation: "batch",
        values: {},
        confirmedPrice: quote2.totalEstimated,
        unit: quote2.unit,
        catalogVersion: quote2.snapshot.catalogVersion,
        context: structuredClone(START_CONTEXT),
        model: null,
        modelId: null,
        parentVersionId: null,
        inputs: [],
        children: [],
        projectionReady: true,
        preparation: "pending",
        batch: {
          snapshot: quote2.snapshot,
          snapshotHash: quote2.snapshotHash,
          rows: templates.map((template, index) => ({
            childId: `row-${index + 1}`,
            intentId: template.intentId,
            template
          }))
        },
        batchParent: null,
        createdAt: at,
        updatedAt: at,
        revision: 0
      };
      await ports.admission.locked(async () => {
        if (!ports.admission.current(token) || capturedAccounts.some(({ provider, captured }) => !provider.isCurrent?.(captured))) {
          throw new JobError("admission_changed");
        }
        await intents.reserve(record);
      });
      saved = true;
      await ports.injectFault("after-batch-intent", record);
      await materializeBatch(record);
      ports.wake();
      return batch(record.intentId, input2.libraryId);
    } finally {
      if (!saved && !await intents.get(input2.idempotencyKey)) {
        for (const record of templates) {
          library.releasePlans(record.modelId, record.children.flatMap((child) => child.version ? [child.version] : []), true);
          await discardInputs(library, intents, record.intentId);
        }
      }
    }
  };
  return {
    quoteBatch,
    rowId,
    materializeBatch,
    batchBlocked,
    batch,
    acceptBatch
  };
}

// src/lib/studio3d/jobDownloads.ts
import path12 from "node:path";

// src/lib/studio3d/assetFormats.ts
import { spawn as spawn2 } from "node:child_process";
import { promises as fs9 } from "node:fs";
import path11 from "node:path";

// src/lib/studio3d/assetErrors.ts
var StudioHttpError = class extends Error {
  statusCode;
  code;
  extra;
  constructor(statusCode, code, message, extra = {}) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.extra = extra;
  }
};

// src/lib/studio3d/gltfResources.ts
import path10 from "node:path";
var NEIGHBORS = /* @__PURE__ */ new Set([".bin", ".png", ".jpg", ".jpeg", ".webp"]);
function validateGltf(value, standalone = false) {
  const json = value && typeof value === "object" ? value : {};
  const used = [
    ...Array.isArray(json.extensionsUsed) ? json.extensionsUsed : [],
    ...Array.isArray(json.extensionsRequired) ? json.extensionsRequired : []
  ];
  if (used.some((extension) => [
    "KHR_draco_mesh_compression",
    "KHR_texture_basisu"
  ].includes(String(extension)))) {
    throw new StudioHttpError(
      415,
      "unsupported_decoder",
      "Draco \u0438 KTX2 \u043F\u043E\u043A\u0430 \u043D\u0435 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0430\u043D\u044B. \u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u0435 \u043E\u0431\u044B\u0447\u043D\u044B\u0439 GLB."
    );
  }
  for (const entry of [
    ...Array.isArray(json.buffers) ? json.buffers : [],
    ...Array.isArray(json.images) ? json.images : []
  ]) {
    const uri = entry?.uri;
    if (uri === void 0) {
      continue;
    }
    if (typeof uri !== "string" || uri.length > 16 * 1024 * 1024) {
      throw new StudioHttpError(415, "external_resources", "\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u0440\u0435\u0441\u0443\u0440\u0441 \u043C\u043E\u0434\u0435\u043B\u0438.");
    }
    if (/^data:(?:image\/(?:png|jpeg|webp)|application\/octet-stream);base64,[a-z0-9+/=]+$/i.test(uri)) {
      continue;
    }
    if (standalone) {
      throw new StudioHttpError(
        415,
        "external_resources",
        "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u0435 \u0441\u0430\u043C\u043E\u0441\u0442\u043E\u044F\u0442\u0435\u043B\u044C\u043D\u044B\u0439 GLB \u0431\u0435\u0437 \u0432\u043D\u0435\u0448\u043D\u0438\u0445 \u0440\u0435\u0441\u0443\u0440\u0441\u043E\u0432."
      );
    }
    if (uri.includes("\\") || uri.includes("%") || uri.startsWith("/") || uri.includes(":") || uri.split("/").some((part) => !part || part === "." || part === "..") || !NEIGHBORS.has(path10.extname(uri).toLowerCase())) {
      throw new StudioHttpError(
        415,
        "external_resources",
        "\u041C\u043E\u0434\u0435\u043B\u044C \u0441\u0441\u044B\u043B\u0430\u0435\u0442\u0441\u044F \u043D\u0430 \u0432\u043D\u0435\u0448\u043D\u0438\u0439 \u0438\u043B\u0438 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0439 \u0440\u0435\u0441\u0443\u0440\u0441."
      );
    }
  }
}
async function validateGlbResources(opened, standalone = false) {
  const header = Buffer.alloc(20);
  await opened.handle.read(header, 0, header.length, 0);
  const length = header.readUInt32LE(12);
  if (opened.size < 20 || header.toString("ascii", 0, 4) !== "glTF" || header.readUInt32LE(4) !== 2 || header.readUInt32LE(8) !== opened.size || header.readUInt32LE(16) !== 1313821514 || length < 4 || length > 16 * 1024 * 1024 || length % 4 || 20 + length > opened.size) {
    throw new StudioHttpError(415, "invalid_model", "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440 GLB.");
  }
  const bytes = Buffer.alloc(length);
  const read = await opened.handle.read(bytes, 0, length, 20);
  if (read.bytesRead !== length) {
    throw new StudioHttpError(415, "invalid_model", "JSON \u043C\u043E\u0434\u0435\u043B\u0438 \u043E\u0431\u0440\u0435\u0437\u0430\u043D.");
  }
  let document;
  try {
    document = JSON.parse(bytes.toString("utf8"));
  } catch {
    throw new StudioHttpError(415, "invalid_model", "JSON \u043C\u043E\u0434\u0435\u043B\u0438 \u043F\u043E\u0432\u0440\u0435\u0436\u0434\u0451\u043D.");
  }
  validateGltf(document, standalone);
  await opened.verify();
}

// src/lib/studio3d/fbxContainer.ts
import { inflateSync } from "node:zlib";
async function inspectBinaryFbx(handle, size, version2) {
  const wide = version2 >= 7500;
  const headerSize = wide ? 25 : 13;
  const deadline = Date.now() + 2e4;
  const assets = /* @__PURE__ */ new Map();
  const connections = [];
  const stack = [];
  let cursor = 27;
  let nodes = 0;
  let properties = 0;
  let expanded = 0;
  const read = async (at, length) => {
    if (!Number.isSafeInteger(at) || !Number.isSafeInteger(length) || at < 0 || length < 0 || at + length > size || length > 64 * 1024 * 1024 || Date.now() > deadline) {
      throw new StudioHttpError(415, "invalid_model", "\u0421\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430 FBX \u043F\u0440\u0435\u0432\u044B\u0448\u0430\u0435\u0442 \u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0435 \u0433\u0440\u0430\u043D\u0438\u0446\u044B.");
    }
    const bytes = Buffer.alloc(length);
    const result = await handle.read(bytes, 0, length, at);
    if (result.bytesRead !== length) {
      throw new StudioHttpError(415, "invalid_model", "FBX \u043E\u0431\u0440\u0435\u0437\u0430\u043D.");
    }
    return bytes;
  };
  const property = async (end) => {
    const type = (await read(cursor++, 1)).toString("ascii");
    const scalarSizes = {
      Y: 2,
      C: 1,
      I: 4,
      F: 4,
      D: 8,
      L: 8
    };
    const scalarSize = scalarSizes[type];
    if (scalarSize) {
      const value = await read(cursor, scalarSize);
      cursor += scalarSize;
      if (cursor > end) {
        throw new StudioHttpError(415, "invalid_model", "\u041F\u043E\u0432\u0440\u0435\u0436\u0434\u0451\u043D property FBX.");
      }
      if (type === "L") {
        return value.readBigInt64LE().toString();
      }
      if (type === "C") {
        return value[0] !== 0;
      }
      const number = type === "F" ? value.readFloatLE() : type === "D" ? value.readDoubleLE() : type === "Y" ? value.readInt16LE() : value.readInt32LE();
      if (!Number.isFinite(number)) {
        throw new StudioHttpError(415, "invalid_model", "\u041D\u0435\u0432\u0435\u0440\u043D\u043E\u0435 \u0447\u0438\u0441\u043B\u043E FBX.");
      }
      return number;
    }
    if (type === "S" || type === "R") {
      const length2 = (await read(cursor, 4)).readUInt32LE();
      cursor += 4;
      if (cursor + length2 > end || type === "S" && length2 > 128 * 1024) {
        throw new StudioHttpError(415, "invalid_model", "\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430 FBX.");
      }
      const value = type === "S" ? (await read(cursor, length2)).toString("utf8") : length2 > 0;
      cursor += length2;
      return value;
    }
    const widths = {
      f: 4,
      d: 8,
      i: 4,
      l: 8,
      b: 1,
      c: 1
    };
    const width = widths[type];
    if (!width) {
      throw new StudioHttpError(415, "invalid_model", "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u044B\u0439 property FBX.");
    }
    const meta = await read(cursor, 12);
    const count = meta.readUInt32LE(0);
    const encoding = meta.readUInt32LE(4);
    const length = meta.readUInt32LE(8);
    const decodedLength = count * width;
    cursor += 12;
    expanded += decodedLength;
    if (encoding > 1 || decodedLength > 64 * 1024 * 1024 || expanded > 150 * 1024 * 1024 || cursor + length > end || encoding === 0 && length !== decodedLength) {
      throw new StudioHttpError(415, "invalid_model", "\u041C\u0430\u0441\u0441\u0438\u0432 FBX \u043F\u0440\u0435\u0432\u044B\u0448\u0430\u0435\u0442 \u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0435 \u0433\u0440\u0430\u043D\u0438\u0446\u044B.");
    }
    const bytes = await read(cursor, length);
    let decoded = bytes;
    if (encoding === 1) {
      try {
        decoded = inflateSync(bytes, { maxOutputLength: Math.max(1, decodedLength) });
      } catch {
        throw new StudioHttpError(415, "invalid_model", "\u041F\u043E\u0432\u0440\u0435\u0436\u0434\u0451\u043D compressed \u043C\u0430\u0441\u0441\u0438\u0432 FBX.");
      }
    }
    if (decoded.length !== decodedLength) {
      throw new StudioHttpError(415, "invalid_model", "\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0434\u043B\u0438\u043D\u0430 \u043C\u0430\u0441\u0441\u0438\u0432\u0430 FBX.");
    }
    if (type === "f" || type === "d") {
      for (let index = 0; index < decoded.length; index += width) {
        const number = width === 4 ? decoded.readFloatLE(index) : decoded.readDoubleLE(index);
        if (!Number.isFinite(number)) {
          throw new StudioHttpError(415, "invalid_model", "\u041D\u0435\u0432\u0435\u0440\u043D\u043E\u0435 \u0447\u0438\u0441\u043B\u043E FBX.");
        }
      }
    }
    cursor += length;
    return null;
  };
  while (cursor + headerSize <= size) {
    while (stack.length && cursor === stack.at(-1).end) {
      stack.pop();
    }
    const start = cursor;
    const header = await read(cursor, headerSize);
    cursor += headerSize;
    if (header.every((byte) => byte === 0)) {
      if (!stack.length) {
        break;
      }
      if (cursor !== stack.at(-1).end) {
        throw new StudioHttpError(
          415,
          "invalid_model",
          "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043A\u043E\u043D\u0435\u0446 node FBX."
        );
      }
      stack.pop();
      continue;
    }
    nodes += 1;
    const end = wide ? Number(header.readBigUInt64LE(0)) : header.readUInt32LE(0);
    const count = wide ? Number(header.readBigUInt64LE(8)) : header.readUInt32LE(4);
    const length = wide ? Number(header.readBigUInt64LE(16)) : header.readUInt32LE(8);
    const nameLength = header[headerSize - 1];
    properties += count;
    if (!Number.isSafeInteger(end) || !Number.isSafeInteger(count) || !Number.isSafeInteger(length) || end > (stack.at(-1)?.end ?? size) || end < cursor + nameLength + length || end <= start || count > 1e5 || nodes > 1e5 || properties > 1e6 || stack.length >= 256) {
      throw new StudioHttpError(415, "invalid_model", "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0435 \u0433\u0440\u0430\u043D\u0438\u0446\u044B node FBX.");
    }
    const name = (await read(cursor, nameLength)).toString("utf8");
    cursor += nameLength;
    const propertyEnd = cursor + length;
    const values2 = [];
    for (let index = 0; index < count; index += 1) {
      values2.push(await property(propertyEnd));
    }
    if (cursor !== propertyEnd) {
      throw new StudioHttpError(
        415,
        "invalid_model",
        "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 propertiesLen FBX."
      );
    }
    let asset = stack.at(-1)?.asset ?? null;
    if (["Video", "Texture"].includes(name)) {
      asset = {
        id: String(values2[0] ?? ""),
        kind: name,
        file: false,
        embedded: false
      };
      if (assets.has(asset.id)) {
        throw new StudioHttpError(415, "invalid_model", "\u041F\u043E\u0432\u0442\u043E\u0440 ID \u0440\u0435\u0441\u0443\u0440\u0441\u0430 FBX.");
      }
      assets.set(asset.id, asset);
    }
    if (asset && [
      "FileName",
      "Filename",
      "RelativeFilename"
    ].includes(name)) {
      asset.file ||= Boolean(values2[0]);
    }
    if (asset && name === "Content") {
      asset.embedded ||= Boolean(values2[0]);
    }
    if (name === "C" && values2[0] === "OO") {
      connections.push([String(values2[1]), String(values2[2])]);
    }
    if (cursor < end) {
      stack.push({ end, asset });
    }
  }
  if (!nodes || stack.length) {
    throw new StudioHttpError(415, "invalid_model", "FBX \u043E\u0431\u0440\u0435\u0437\u0430\u043D.");
  }
  const embedded = [...assets.values()].filter((asset) => asset.embedded);
  const embeddedIds = new Set(embedded.map((asset) => asset.id));
  const linked = new Set(connections.filter(([child]) => embeddedIds.has(child)).map(([, parent]) => parent));
  for (const asset of assets.values()) {
    const embedded2 = asset.embedded || asset.kind === "Texture" && linked.has(asset.id);
    if (asset.file && !embedded2) {
      throw new StudioHttpError(415, "external_resources", "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u0435 FBX \u0441 \u0432\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u044B\u043C\u0438 \u0442\u0435\u043A\u0441\u0442\u0443\u0440\u0430\u043C\u0438 \u0438\u043B\u0438 GLB.");
    }
  }
}

// src/lib/studio3d/modelContainers.ts
async function inspectRecords(handle, size, start, stride, floatBytes) {
  const block = Math.floor(65536 / stride) * stride;
  for (let position = start; position < size; position += block) {
    const length = Math.min(block, size - position);
    const bytes = Buffer.alloc(length);
    const result = await handle.read(bytes, 0, length, position);
    if (result.bytesRead !== length || length % stride) {
      throw new StudioHttpError(415, "invalid_model", "\u041C\u043E\u0434\u0435\u043B\u044C \u043E\u0431\u0440\u0435\u0437\u0430\u043D\u0430.");
    }
    for (let record = 0; record < length; record += stride) {
      for (let offset = 0; offset < floatBytes; offset += 4) {
        if (!Number.isFinite(bytes.readFloatLE(record + offset))) {
          throw new StudioHttpError(415, "invalid_model", "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0435 \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u044B \u043C\u043E\u0434\u0435\u043B\u0438.");
        }
      }
    }
  }
}
async function inspectTextModel(root, file, ext) {
  const opened = await openVerified(root, file);
  const decoder = new TextDecoder("utf-8", { fatal: true });
  const deadline = Date.now() + 2e4;
  let tail = "";
  let vertices = 0;
  let faces = 0;
  let normals = 0;
  let uvs = 0;
  let facetVertices = 0;
  let facet = false;
  let depth = 0;
  let fbxVersion = 0;
  let fbxObjects = 0;
  const references = {
    vertices: 0,
    normals: 0,
    uvs: 0
  };
  const assets = [];
  const connections = [];
  let currentAsset;
  const lineOf = (raw) => {
    const line = raw.trim();
    if (!line || line.startsWith("#") || line.startsWith(";")) {
      return;
    }
    if (ext === ".fbx") {
      const version2 = /^FBXVersion:\s*(\d+)/.exec(line);
      const asset = /^(Video|Texture):\s*(\d+)/.exec(line);
      const link = /^C:\s*"OO",\s*(\d+),\s*(\d+)/.exec(line);
      if (version2) {
        fbxVersion = Number(version2[1]);
      }
      if (/^(Geometry|Model):/.test(line)) {
        fbxObjects += 1;
      }
      if (asset) {
        currentAsset = {
          id: asset[2],
          kind: asset[1],
          depth: depth + 1,
          file: false,
          embedded: false
        };
        assets.push(currentAsset);
      }
      if (link) {
        connections.push([link[1], link[2]]);
      }
      if (currentAsset && /^(?:RelativeFilename|FileName|Filename):\s*"[^"\s]/.test(line)) {
        currentAsset.file = true;
      }
      if (currentAsset && /^Content:\s*[^;]*"[a-z0-9+/=]+"/i.test(line)) {
        currentAsset.embedded = true;
      }
      const structural = line.replace(/"(?:[^"\\]|\\.)*"/g, '""').split(";")[0];
      for (const character of structural) {
        if (character === "{") {
          depth += 1;
        }
        if (character === "}") {
          depth -= 1;
        }
        if (depth < 0 || depth > 256) {
          throw new StudioHttpError(415, "invalid_model", "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0435 \u0441\u043A\u043E\u0431\u043A\u0438 FBX.");
        }
      }
      if (currentAsset && depth < currentAsset.depth) {
        currentAsset = void 0;
      }
      const numbers = /\ba:\s*([^}]+)/.exec(structural)?.[1];
      if (numbers && numbers.split(",").some((value) => !value.trim() || !Number.isFinite(Number(value)))) {
        throw new StudioHttpError(415, "invalid_model", "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043C\u0430\u0441\u0441\u0438\u0432 FBX.");
      }
      return;
    }
    if (/^mtllib\s/i.test(line)) {
      throw new StudioHttpError(
        415,
        "external_resources",
        "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u0435 \u0441\u0430\u043C\u043E\u0441\u0442\u043E\u044F\u0442\u0435\u043B\u044C\u043D\u044B\u0439 GLB \u0431\u0435\u0437 \u0432\u043D\u0435\u0448\u043D\u0438\u0445 \u0440\u0435\u0441\u0443\u0440\u0441\u043E\u0432."
      );
    }
    const vertex = ext === ".obj" ? /^v\s/.test(line) : /^vertex\s/.test(line);
    const vector = vertex || ext === ".obj" && /^vn\s/.test(line);
    if (vector || ext === ".obj" && /^vt\s/.test(line)) {
      const numbers = line.split(/\s+/).slice(1).map(Number);
      const minimum = vector ? 3 : 1;
      const maximum = vector ? 4 : 3;
      if (numbers.length < minimum || numbers.length > maximum || numbers.some((value) => !Number.isFinite(value))) {
        throw new StudioHttpError(415, "invalid_model", "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0435 \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u044B \u043C\u043E\u0434\u0435\u043B\u0438.");
      }
      if (vertex) {
        vertices += 1;
        facetVertices += 1;
      } else if (/^vn\s/.test(line)) {
        normals += 1;
      } else {
        uvs += 1;
      }
    }
    if (ext === ".obj" && /^f\s/.test(line)) {
      const entries = line.split(/\s+/).slice(1);
      if (entries.length < 3 || entries.length > 4096) {
        throw new StudioHttpError(415, "invalid_model", "\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0433\u0440\u0430\u043D\u044C OBJ.");
      }
      for (const entry of entries) {
        const parts = entry.split("/");
        if (parts.length > 3) {
          throw new StudioHttpError(415, "invalid_model", "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0438\u043D\u0434\u0435\u043A\u0441 OBJ.");
        }
        for (let index = 0; index < parts.length; index += 1) {
          const part = parts[index];
          if (!part && index > 0) {
            continue;
          }
          if (!/^-?\d+$/.test(part) || !Number.isSafeInteger(Number(part)) || Number(part) === 0) {
            throw new StudioHttpError(415, "invalid_model", "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0438\u043D\u0434\u0435\u043A\u0441 OBJ.");
          }
          const key = ["vertices", "uvs", "normals"][index];
          const count = key === "vertices" ? vertices : key === "uvs" ? uvs : normals;
          const value = Number(part);
          if (value < 0 && -value > count) {
            throw new StudioHttpError(415, "invalid_model", "\u0418\u043D\u0434\u0435\u043A\u0441 \u0432\u043D\u0435 OBJ.");
          }
          references[key] = Math.max(references[key], value);
        }
      }
      faces += 1;
    }
    if (ext === ".stl") {
      if (/^facet\s+normal\s/.test(line)) {
        if (facet || line.split(/\s+/).slice(2).length !== 3 || line.split(/\s+/).slice(2).some((value) => !Number.isFinite(Number(value)))) {
          throw new StudioHttpError(415, "invalid_model", "\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0433\u0440\u0430\u043D\u044C STL.");
        }
        facet = true;
        facetVertices = 0;
      }
      if (/^endfacet\b/.test(line)) {
        if (!facet || facetVertices !== 3) {
          throw new StudioHttpError(
            415,
            "invalid_model",
            "\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0433\u0440\u0430\u043D\u044C STL."
          );
        }
        facet = false;
        faces += 1;
      }
    }
  };
  try {
    if (opened.size > 150 * 1024 * 1024) {
      throw new StudioHttpError(
        413,
        "too_large",
        "\u041C\u043E\u0434\u0435\u043B\u044C \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u0430\u044F."
      );
    }
    for (let position = 0; position < opened.size; ) {
      if (Date.now() > deadline) {
        throw new StudioHttpError(415, "invalid_model", "\u041C\u043E\u0434\u0435\u043B\u044C \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0441\u043B\u043E\u0436\u043D\u0430\u044F.");
      }
      const bytes = Buffer.alloc(Math.min(65536, opened.size - position));
      const read = await opened.handle.read(bytes, 0, bytes.length, position);
      if (!read.bytesRead) {
        throw new StudioHttpError(415, "invalid_model", "\u041C\u043E\u0434\u0435\u043B\u044C \u043E\u0431\u0440\u0435\u0437\u0430\u043D\u0430.");
      }
      position += read.bytesRead;
      tail += decoder.decode(bytes.subarray(0, read.bytesRead), { stream: true });
      if (tail.length > 1024 * 1024 || tail.includes("\0")) {
        throw new StudioHttpError(415, "invalid_model", "\u0421\u0442\u0440\u043E\u043A\u0430 \u043C\u043E\u0434\u0435\u043B\u0438 \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0434\u043B\u0438\u043D\u043D\u0430\u044F \u0438\u043B\u0438 \u043F\u043E\u0432\u0440\u0435\u0436\u0434\u0435\u043D\u0430.");
      }
      const lines = tail.split(/\r?\n/);
      tail = lines.pop() ?? "";
      for (const raw of lines) {
        lineOf(raw);
      }
    }
    lineOf(tail + decoder.decode());
    await opened.verify();
    if (ext === ".fbx") {
      if (fbxVersion < 7e3 || fbxVersion > 8e3 || !fbxObjects || depth !== 0) {
        throw new StudioHttpError(415, "invalid_model", "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440 FBX.");
      }
      const embeddedIds = new Set(assets.filter((asset) => asset.embedded).map((asset) => asset.id));
      const linked = new Set(connections.filter(([child]) => embeddedIds.has(child)).map(([
        ,
        parent
      ]) => parent));
      for (const asset of assets) {
        const embedded = asset.embedded || asset.kind === "Texture" && linked.has(asset.id);
        if (asset.file && !embedded) {
          throw new StudioHttpError(
            415,
            "external_resources",
            "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u0435 FBX \u0441 \u0432\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u044B\u043C\u0438 \u0442\u0435\u043A\u0441\u0442\u0443\u0440\u0430\u043C\u0438 \u0438\u043B\u0438 GLB."
          );
        }
      }
      return;
    }
    if (vertices < 3 || faces < 1 || facet || references.vertices > vertices || references.normals > normals || references.uvs > uvs) {
      throw new StudioHttpError(415, "invalid_model", "\u0412 \u043C\u043E\u0434\u0435\u043B\u0438 \u043D\u0435\u0442 \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u043E\u0439 \u0433\u0435\u043E\u043C\u0435\u0442\u0440\u0438\u0438.");
    }
  } finally {
    await opened.handle.close();
  }
}

// src/lib/studio3d/assetFormats.ts
var MODEL_EXT = /* @__PURE__ */ new Set([".glb", ".fbx", ".obj", ".stl", ".splat"]);
var IMAGE_MIME = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp"
};
var MODEL_LIMIT = 150 * 1024 * 1024;
var IMAGE_LIMIT = 20 * 1024 * 1024;
async function decode(command, args, fd, signal) {
  signal?.throwIfAborted();
  return new Promise((resolve, reject) => {
    const child = spawn2(command, args, { stdio: ["ignore", "pipe", "pipe", fd] });
    const chunks = [];
    let size = 0;
    let failed = false;
    const timer = setTimeout(() => {
      failed = true;
      child.kill("SIGKILL");
    }, 1e4);
    const rss = setInterval(async () => {
      const status = await fs9.readFile(`/proc/${child.pid}/status`, "utf8").catch(() => "");
      const kilobytes = Number(/^VmRSS:\s+(\d+)/m.exec(status)?.[1] ?? 0);
      if (kilobytes > 512 * 1024) {
        failed = true;
        child.kill("SIGKILL");
      }
    }, 100);
    const abort = () => {
      failed = true;
      child.kill("SIGKILL");
    };
    signal?.addEventListener("abort", abort, { once: true });
    child.stdout.on("data", (chunk) => {
      size += chunk.length;
      if (size > 128 * 1024) {
        failed = true;
        child.kill("SIGKILL");
      } else {
        chunks.push(chunk);
      }
    });
    child.stderr.resume();
    child.on("error", () => {
      clearTimeout(timer);
      clearInterval(rss);
      signal?.removeEventListener("abort", abort);
      reject(new StudioHttpError(415, "image_decode_failed", "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0434\u0435\u043A\u043E\u0434\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435."));
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      clearInterval(rss);
      signal?.removeEventListener("abort", abort);
      if (code !== 0 || failed) {
        reject(new StudioHttpError(
          415,
          "image_decode_failed",
          "\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u043F\u043E\u0432\u0440\u0435\u0436\u0434\u0435\u043D\u043E \u0438\u043B\u0438 \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0441\u043B\u043E\u0436\u043D\u043E\u0435."
        ));
      } else {
        resolve(Buffer.concat(chunks).toString("utf8"));
      }
    });
  });
}
async function inspectImage(root, file, mime, signal) {
  signal?.throwIfAborted();
  const ext = path11.extname(file).toLowerCase();
  const expected = IMAGE_MIME[ext];
  const opened = await openVerified(root, file);
  try {
    if (!expected || mime && mime !== expected) {
      throw new StudioHttpError(415, "unsupported_type", "\u041D\u0443\u0436\u043D\u0430 PNG, JPEG \u0438\u043B\u0438 WebP \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0430.");
    }
    if (opened.size > IMAGE_LIMIT) {
      throw new StudioHttpError(413, "too_large", "\u041A\u0430\u0440\u0442\u0438\u043D\u043A\u0430 \u0434\u043E\u043B\u0436\u043D\u0430 \u0431\u044B\u0442\u044C \u0434\u043E 20 \u041C\u0438\u0411.");
    }
    const head = Buffer.alloc(32);
    await opened.handle.read(head, 0, head.length, 0);
    const extension = head.subarray(0, 8).equals(Buffer.from("89504e470d0a1a0a", "hex")) ? ".png" : head.toString("ascii", 0, 4) === "RIFF" && head.toString("ascii", 8, 12) === "WEBP" ? ".webp" : head[0] === 255 && head[1] === 216 && head[2] === 255 ? ".jpg" : null;
    if (!extension || mime && mime !== IMAGE_MIME[extension]) {
      throw new StudioHttpError(415, "unsupported_type", "\u0421\u0438\u0433\u043D\u0430\u0442\u0443\u0440\u0430 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F \u043D\u0435 \u0441\u043E\u0432\u043F\u0430\u0434\u0430\u0435\u0442 \u0441 \u0444\u043E\u0440\u043C\u0430\u0442\u043E\u043C.");
    }
    const metadata = JSON.parse(await decode("ffprobe", [
      "-v",
      "error",
      "-protocol_whitelist",
      "file,pipe",
      "-max_alloc",
      "268435456",
      "-show_entries",
      "stream=width,height",
      "-of",
      "json",
      "/proc/self/fd/3"
    ], opened.handle.fd, signal));
    const width = metadata.streams?.[0]?.width ?? 0;
    const height = metadata.streams?.[0]?.height ?? 0;
    if (!Number.isSafeInteger(width) || !Number.isSafeInteger(height) || width <= 0 || height <= 0) {
      throw new StudioHttpError(415, "image_decode_failed", "\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u043D\u0435 \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u0442 \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439.");
    }
    if (width * height > 64e6) {
      throw new StudioHttpError(413, "too_large", "\u041A\u0430\u0440\u0442\u0438\u043D\u043A\u0430 \u0434\u043E\u043B\u0436\u043D\u0430 \u0431\u044B\u0442\u044C \u0434\u043E 64 \u043C\u0435\u0433\u0430\u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439.");
    }
    const decoded = await decode("ffmpeg", [
      "-v",
      "error",
      "-nostdin",
      "-protocol_whitelist",
      "file,pipe",
      "-threads",
      "1",
      "-max_alloc",
      "268435456",
      "-err_detect",
      "explode",
      "-i",
      "/proc/self/fd/3",
      "-frames:v",
      "1",
      "-f",
      "framemd5",
      "pipe:1"
    ], opened.handle.fd, signal);
    if (!/^\d+,\s+\d+,/m.test(decoded)) {
      throw new StudioHttpError(415, "image_decode_failed", "\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u043D\u0435 \u0434\u0435\u043A\u043E\u0434\u0438\u0440\u0443\u0435\u0442\u0441\u044F.");
    }
    await opened.verify();
    return {
      width,
      height,
      extension
    };
  } finally {
    await opened.handle.close();
  }
}
async function inspectModel(root, file, signal, analysis = {}) {
  const ext = path11.extname(file).toLowerCase();
  if (!MODEL_EXT.has(ext)) {
    throw new StudioHttpError(
      415,
      "unsupported_type",
      "\u041D\u0443\u0436\u0435\u043D GLB, FBX, OBJ, STL \u0438\u043B\u0438 splat. GLTF \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u0435 \u043A\u0430\u043A GLB."
    );
  }
  const opened = await openVerified(root, file);
  const header = Buffer.alloc(128);
  try {
    if (opened.size > MODEL_LIMIT) {
      throw new StudioHttpError(413, "too_large", "\u041C\u043E\u0434\u0435\u043B\u044C \u0434\u043E\u043B\u0436\u043D\u0430 \u0431\u044B\u0442\u044C \u0434\u043E 150 \u041C\u0438\u0411.");
    }
    await opened.handle.read(header, 0, header.length, 0);
    if (ext === ".glb") {
      if (header.toString("ascii", 0, 4) !== "glTF") {
        throw new StudioHttpError(415, "invalid_model", "\u041F\u043E\u0432\u0440\u0435\u0436\u0434\u0451\u043D GLB.");
      }
      await validateGlbResources(opened, true);
    } else if (ext === ".stl") {
      const triangles = header.readUInt32LE(80);
      if (opened.size === 84 + triangles * 50 && triangles > 0) {
        await inspectRecords(opened.handle, opened.size, 84, 50, 48);
        await opened.verify();
        return null;
      }
    } else if (ext === ".fbx") {
      const binary = header.toString("ascii", 0, 23) === "Kaydara FBX Binary  \0\0";
      const version2 = binary ? header.readUInt32LE(23) : 0;
      if (binary && version2 >= 7e3 && version2 <= 8e3 && opened.size > 64) {
        await inspectBinaryFbx(opened.handle, opened.size, version2);
        await opened.verify();
        return null;
      }
      if (binary) {
        throw new StudioHttpError(415, "invalid_model", "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440 FBX.");
      }
    } else if (ext === ".splat") {
      if (!opened.size || opened.size % 32 !== 0) {
        throw new StudioHttpError(415, "invalid_model", "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440 splat.");
      }
      await inspectRecords(opened.handle, opened.size, 0, 32, 24);
      await opened.verify();
      return null;
    }
    await opened.verify();
  } finally {
    await opened.handle.close();
  }
  if (ext === ".glb") {
    return inspectGlbFile(file, {
      ...analysis,
      root,
      signal
    });
  }
  await inspectTextModel(root, file, ext);
  return null;
}

// src/lib/studio3d/jobDownloads.ts
function createJobDownloads(ports) {
  const publishFile = async (record, child, source, name, role, id2) => {
    const library = ports.library;
    try {
      await library.copyIn(record.modelId, child.version.id, {
        sourceRoot: library.dir,
        source,
        name,
        role,
        id: id2
      });
    } catch (error) {
      if (error.code !== "exists") {
        throw error;
      }
      const sourceInfo = await verifiedHash(library.dir, source);
      await library.adoptVersionFile(
        record.modelId,
        child.version.id,
        name,
        sourceInfo.sha256,
        { role, id: id2 }
      );
    }
  };
  const refreshOutput = async (record, child, outputId) => {
    const provider = ports.lookupProvider(record.provider);
    const captured = provider?.snapshot?.();
    if (!captured || captured.accountKey !== record.accountKey || !provider?.isCurrent?.(captured)) {
      throw new JobError("account_changed");
    }
    const response = await provider.poll([child.taskId], captured);
    const remote = response.tasks.find((item) => item.id === child.taskId && item.type === child.taskType);
    const output = remote?.outputs.find((item) => item.id === outputId);
    if (!provider.isCurrent?.(captured) || !output) {
      throw new JobError("output_unavailable");
    }
    return output.url;
  };
  const downloadResult = async (intentId, childId) => {
    const record = await ports.intents.get(intentId);
    const child = record.children.find((item) => item.childId === childId);
    const remote = child.remote;
    if (!remote || !record.modelId || !child.version || child.status === "ready") {
      return;
    }
    try {
      const missing = remote.requiredRoles.filter((role) => !remote.outputs.some((output) => output.role === role));
      if (missing.length || !remote.requiredRoles.length || child.version.kind !== "views" && remote.mainFileId === null) {
        throw new Error("missing_outputs");
      }
      const directory = path12.join(ports.intents.directory(intentId), "downloads", childId);
      await ensureDirectory(ports.library.dir, directory);
      const pinned = await pinDirectory(ports.library.dir, directory);
      const completed = [];
      let stats2 = null;
      const required = new Set(remote.requiredRoles.map((role) => remote.outputs.find((output) => output.id === remote.mainFileId && output.role === role)?.id ?? remote.outputs.find((output) => output.role === role)?.id));
      if (remote.mainFileId) {
        required.add(remote.mainFileId);
      }
      try {
        for (const output of remote.outputs) {
          try {
            if (!isSafeName(output.name)) {
              throw new Error("unsafe_output");
            }
            const destination = path12.join(directory, output.name);
            const existing = await verifiedHash(ports.library.dir, destination).catch(() => null);
            let downloaded = existing;
            if (!downloaded) {
              await pinned.verify();
              downloaded = await ports.download({
                url: output.url,
                dest: pinned.child(output.name),
                refresh: () => refreshOutput(record, child, output.id),
                signal: ports.signal
              });
              await pinned.verify();
              await pinned.handle.sync();
            }
            const confirmed = await verifiedHash(ports.library.dir, destination);
            if (confirmed.sha256 !== downloaded.sha256 || confirmed.size !== downloaded.size) {
              throw new Error("changed_output");
            }
            if (["model", "base-model"].includes(output.role)) {
              const inspected = await inspectModel(
                ports.library.dir,
                destination,
                ports.signal,
                ports.library.analysis
              );
              if (output.id === remote.mainFileId) {
                stats2 = inspected;
              }
            } else if (output.role === "file" && MODEL_EXT.has(path12.extname(output.name).toLowerCase())) {
              await inspectModel(ports.library.dir, destination, ports.signal, ports.library.analysis);
            } else if (output.role !== "file") {
              const image = await inspectImage(
                ports.library.dir,
                destination,
                void 0,
                ports.signal
              );
              const name = path12.basename(output.name, path12.extname(output.name)) + image.extension;
              completed.push({
                output: { ...output, name },
                path: destination,
                sha256: confirmed.sha256
              });
              await ports.injectFault("after-download", record, child);
              continue;
            }
            completed.push({
              output,
              path: destination,
              sha256: confirmed.sha256
            });
            await ports.injectFault("after-download", record, child);
          } catch (error) {
            if (error instanceof InjectedCrash || required.has(output.id) || ports.isStopped()) {
              throw error;
            }
          }
        }
      } finally {
        await pinned.close();
      }
      for (const item of completed) {
        if (ports.isStopped()) {
          return;
        }
        await publishFile(record, child, item.path, item.output.name, item.output.role, item.output.id);
      }
      await ports.library.updateVersion(record.modelId, child.version.id, {
        stats: stats2,
        kind: refineKind(child.version.kind, stats2),
        mainFileId: remote.mainFileId,
        views: remote.views
      });
      const updated = await ports.change(intentId, childId, {
        stage: "done",
        status: "ready",
        progress: 100,
        error: null,
        waitReason: null,
        completedAt: ports.at()
      });
      ports.refreshLease(updated, updated.children.find((item) => item.childId === childId));
      const entry = await ports.library.readModel(record.modelId);
      if (!entry.model.mainVersion) {
        await ports.library.updateModel(record.modelId, { mainVersion: child.version.id });
      }
      await ports.notify(intentId, childId);
    } catch (error) {
      if (error instanceof InjectedCrash) {
        throw error;
      }
      if (ports.isStopped()) {
        return;
      }
      const updated = await ports.change(intentId, childId, {
        stage: "accepted",
        status: "failed",
        error: fallbackError(
          "network",
          "\u0413\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044F \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430, \u043D\u043E \u0444\u0430\u0439\u043B\u044B \u043D\u0435 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u044B. \u0421\u043A\u0430\u0447\u0430\u0442\u044C \u0441\u043D\u043E\u0432\u0430 \u2014 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E."
        ),
        waitReason: null,
        completedAt: ports.at()
      });
      ports.refreshLease(updated, updated.children.find((item) => item.childId === childId));
      ports.broadcast("studio-changed", {
        intentId,
        childId,
        modelId: record.modelId,
        status: "failed"
      });
    }
  };
  return {
    publishFile,
    refreshOutput,
    downloadResult
  };
}

// src/lib/studio3d/jobDownloadQueue.ts
function createJobDownloadQueue(ports) {
  const downloading = /* @__PURE__ */ new Map();
  const waiting = [];
  const downloadKey = (intentId, childId) => `${intentId}:${childId}`;
  const enqueue = (intentId, childId) => {
    const key = downloadKey(intentId, childId);
    if (!downloading.has(key) && !waiting.some((item) => downloadKey(item.intentId, item.childId) === key)) {
      waiting.push({ intentId, childId });
    }
  };
  const pump = () => {
    while (!ports.isStopped() && downloading.size < 2 && waiting.length) {
      const item = waiting.shift();
      const key = downloadKey(item.intentId, item.childId);
      const promise = ports.run(item.intentId, item.childId).finally(() => {
        downloading.delete(key);
        pump();
        ports.onIdle?.();
      });
      downloading.set(key, promise);
      void promise.catch(() => {
      });
    }
  };
  const settle = async () => {
    while (downloading.size || waiting.length) {
      pump();
      await Promise.all([...downloading.values()]);
    }
  };
  const clearWaiting = () => {
    waiting.length = 0;
  };
  const waitActive = async () => {
    await Promise.allSettled([...downloading.values()]);
  };
  return {
    enqueue,
    pump,
    activeCount: () => downloading.size,
    settle,
    clearWaiting,
    waitActive
  };
}

// src/lib/studio3d/jobReservations.ts
function unreflectedReservationAmount(holds, available) {
  const pending = holds.filter((item) => item.accepted && item.balanceBefore !== null);
  const before = Math.max(0, ...pending.map((item) => item.balanceBefore));
  const reflected = available === null ? 0 : Math.max(0, before - available);
  return holds.filter((item) => !item.accepted || item.balanceBefore === null).reduce((total, item) => total + item.amount, 0) + Math.max(0, pending.reduce((total, item) => total + item.amount, 0) - reflected);
}

// src/lib/studio3d/jobs.ts
import { promises as fs11 } from "node:fs";
import path14 from "node:path";
import { isDeepStrictEqual as isDeepStrictEqual2 } from "node:util";

// src/lib/studio3d/admission.ts
import { randomUUID as randomUUID3 } from "node:crypto";
var Admission = class {
  key = `studio3d:admission:${randomUUID3()}`;
  generation = 1;
  enabled = true;
  closing = false;
  libraryId;
  pending = 0;
  onRelease;
  constructor(libraryId, onRelease) {
    this.onRelease = onRelease;
    this.libraryId = libraryId;
  }
  /**
   * Snapshot снимается синхронно до первого await и повторяется перед POST.
   * Чужая библиотека проверяется прежде поиска UUID и любых файловых эффектов.
   */
  capture(libraryId) {
    if (libraryId !== this.libraryId) {
      throw new IntentError("stale_library");
    }
    if (!this.enabled || this.closing) {
      throw new IntentError("plugin_disabled");
    }
    return { generation: this.generation, libraryId: this.libraryId };
  }
  current(token) {
    return this.enabled && !this.closing && token.generation === this.generation && token.libraryId === this.libraryId;
  }
  canAccept() {
    return this.enabled && !this.closing;
  }
  pendingCount() {
    return this.pending;
  }
  /**
   * Lease удерживает выбранную библиотеку во время copy вне короткого lock.
   * Идемпотентный release позволяет безопасно завершить любой путь отказа.
   */
  lease() {
    let released = false;
    this.pending += 1;
    return () => {
      if (!released) {
        released = true;
        this.pending -= 1;
        this.onRelease?.();
      }
    };
  }
  /**
   * Смена допуска инвалидирует все прежние подготовленные токены в памяти.
   * Опрос принятых заказов остаётся обязанностью прежнего worker и библиотеки.
   */
  configure(input2) {
    this.generation += 1;
    this.enabled = input2.enabled;
    this.closing = input2.closing ?? false;
    this.libraryId = input2.libraryId ?? this.libraryId;
  }
  locked(callback) {
    return withPathLock(this.key, callback);
  }
};
function createAdmission(libraryId, onRelease) {
  return new Admission(libraryId, onRelease);
}

// src/lib/studio3d/download.ts
import { createHash as createHash6, randomUUID as randomUUID4 } from "node:crypto";
import {
  closeSync,
  constants as FS4,
  createWriteStream as createWriteStream2,
  fstatSync as fstatSync4,
  ftruncateSync,
  openSync,
  promises as fs10
} from "node:fs";
import { Readable as Readable2, Transform as Transform2 } from "node:stream";
import { pipeline as pipeline4 } from "node:stream/promises";
import { setTimeout as pause } from "node:timers/promises";

// src/lib/studio3d/publicDownload.ts
import { lookup } from "node:dns/promises";
import { request } from "node:https";
import { isIP } from "node:net";
import { Readable } from "node:stream";

// src/lib/kimi/egressPolicy.ts
import net from "node:net";
import { domainToASCII } from "node:url";
var BLOCKED_HOSTS = /* @__PURE__ */ new Set(["localhost", "localhost.localdomain"]);
function normalizeEgressHost(hostname) {
  const value = domainToASCII(String(hostname ?? "").trim().replace(/\.$/, "").toLowerCase());
  if (!value || value.includes("\0") || value.includes("/")) throw new Error("invalid_egress_host");
  if (net.isIP(value)) throw new Error("ip_literal_forbidden");
  if (BLOCKED_HOSTS.has(value) || value.endsWith(".localhost") || value.endsWith(".local")) {
    throw new Error("local_hostname_forbidden");
  }
  return value;
}
function isBlockedEgressIp(address) {
  if (net.isIP(address) === 4) {
    const [a = 0, b = 0, c = 0] = address.split(".").map(Number);
    return a === 0 || a === 10 || a === 127 || a === 100 && b >= 64 && b <= 127 || a === 169 && b === 254 || a === 172 && b >= 16 && b <= 31 || a === 192 && b === 0 && c === 0 || a === 192 && b === 0 && c === 2 || a === 192 && b === 168 || a === 198 && (b === 18 || b === 19) || a === 198 && b === 51 && c === 100 || a === 203 && b === 0 && c === 113 || a >= 224;
  }
  if (net.isIP(address) === 6) {
    const value = address.toLowerCase();
    if (value.startsWith("::ffff:")) {
      const mapped = value.slice("::ffff:".length);
      if (net.isIP(mapped) === 4) return isBlockedEgressIp(mapped);
      const halves = mapped.split(":");
      if (halves.length === 2) {
        const v4 = halves.flatMap((half) => {
          const n = Number.parseInt(half, 16);
          return [n >>> 8 & 255, n & 255];
        }).join(".");
        if (net.isIP(v4) === 4) return isBlockedEgressIp(v4);
      }
      return true;
    }
    return value === "::" || value === "::1" || value.startsWith("fc") || value.startsWith("fd") || value.startsWith("fe8") || value.startsWith("fe9") || value.startsWith("fea") || value.startsWith("feb") || value.startsWith("ff") || value.startsWith("100:") || value.startsWith("2001:db8:") || value === "fe80::1";
  }
  return true;
}

// src/lib/studio3d/publicDownload.ts
function blocked(address) {
  const normalized = isIP(address) === 6 ? new URL(`https://[${address}]/`).hostname.slice(1, -1) : address;
  return isBlockedEgressIp(normalized) || normalized.startsWith("::") && !normalized.startsWith("::ffff:") || /^fe[c-f]/i.test(normalized);
}
async function pinnedResponse(url, options, chosen) {
  if (options.signal?.aborted) {
    throw new Error("download_aborted");
  }
  return new Promise((resolve, reject) => {
    const outgoing = request(url, {
      method: "GET",
      agent: false,
      headers: Object.fromEntries(new Headers(options.headers)),
      signal: options.signal ?? void 0,
      family: chosen.family,
      lookup: (_hostname, _options, callback) => callback(null, chosen.address, chosen.family)
    }, (incoming) => {
      const responseHeaders = new Headers();
      for (const [name, value] of Object.entries(incoming.headers)) {
        if (value !== void 0) {
          responseHeaders.set(name, Array.isArray(value) ? value.join(", ") : value);
        }
      }
      resolve(new Response(Readable.toWeb(incoming), {
        status: incoming.statusCode ?? 502,
        headers: responseHeaders
      }));
    });
    outgoing.once("error", reject);
    outgoing.end();
  });
}
function createPublicDownload(deps = {}) {
  return async (input2, options = {}) => {
    let url = new URL(typeof input2 === "string" ? input2 : input2 instanceof URL ? input2.href : input2.url);
    for (let redirects = 0; ; redirects += 1) {
      if (url.protocol !== "https:" || url.username || url.password || url.port && url.port !== "443") {
        throw new Error("unsafe_download_url");
      }
      const hostname = url.hostname.replace(/^\[|\]$/g, "");
      const literal = isIP(hostname);
      const host = literal ? hostname : normalizeEgressHost(hostname);
      const records = literal ? [{ address: host, family: literal }] : await (deps.lookupAll ?? ((name) => lookup(name, { all: true, verbatim: true })))(host);
      if (!records.length || records.some((entry) => blocked(entry.address))) {
        throw new Error("unsafe_download_address");
      }
      const headers = new Headers(options.headers);
      headers.delete("authorization");
      headers.delete("cookie");
      const response = await (deps.connect ?? pinnedResponse)(url, { ...options, headers }, records[0]);
      if (![301, 302, 303, 307, 308].includes(response.status)) {
        return response;
      }
      const location = response.headers.get("location");
      void response.body?.cancel().catch(() => {
      });
      if (!location || redirects >= 3) {
        throw new Error("unsafe_download_redirect");
      }
      url = new URL(location, url);
    }
  };
}
var fetchPublicDownload = createPublicDownload();

// src/lib/studio3d/download.ts
var DownloadError = class extends Error {
  code;
  constructor(code, message) {
    super(message);
    this.code = code;
  }
};
async function sizeOf(file) {
  try {
    const stat = await fs10.lstat(file);
    if (!stat.isFile() || stat.nlink !== 1) {
      throw new DownloadError("disk", "\u041D\u0435\u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u044B\u0439 \u0447\u0430\u0441\u0442\u0438\u0447\u043D\u044B\u0439 \u0444\u0430\u0439\u043B.");
    }
    return stat.size;
  } catch (error) {
    if (error.code === "ENOENT") {
      return 0;
    }
    throw diskFailure(error);
  }
}
async function hashFile(file) {
  const hash = createHash6("sha256");
  const handle = await fs10.open(file, FS4.O_RDONLY | FS4.O_NOFOLLOW | FS4.O_NONBLOCK);
  try {
    await pipeline4(handle.createReadStream({ autoClose: false }), hash);
  } finally {
    await handle.close();
  }
  return hash.digest("hex");
}
function fileWriter(file, flags) {
  const descriptor = openSync(file, flags & ~FS4.O_TRUNC, 384);
  const stat = fstatSync4(descriptor);
  if (!stat.isFile() || stat.nlink !== 1) {
    closeSync(descriptor);
    throw new DownloadError("disk", "\u041D\u0435\u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u044B\u0439 \u0447\u0430\u0441\u0442\u0438\u0447\u043D\u044B\u0439 \u0444\u0430\u0439\u043B.");
  }
  if (flags & FS4.O_TRUNC) {
    ftruncateSync(descriptor, 0);
  }
  return createWriteStream2(file, { fd: descriptor, autoClose: true });
}
function strongValidator(raw) {
  return raw && /^"[^"\r\n]{1,512}"$/.test(raw) ? raw : null;
}
async function partialMetadata(file) {
  let handle;
  try {
    handle = await fs10.open(file, FS4.O_RDONLY | FS4.O_NOFOLLOW);
    const stat = await handle.stat();
    if (!stat.isFile() || stat.nlink !== 1 || stat.size > 4096) {
      return null;
    }
    const parsed = JSON.parse(await handle.readFile("utf8"));
    return parsed && typeof parsed.url === "string" && strongValidator(parsed.validator) && (parsed.total === null || Number.isSafeInteger(parsed.total) && parsed.total >= 0) ? parsed : null;
  } catch {
    return null;
  } finally {
    await handle?.close();
  }
}
async function writeMetadata(file, value) {
  const temp = `${file}.${randomUUID4()}.tmp`;
  try {
    await fs10.writeFile(temp, JSON.stringify(value), { flag: "wx", mode: 384 });
    await fs10.rename(temp, file);
  } finally {
    await fs10.rm(temp, { force: true });
  }
}
function diskFailure(error) {
  return error instanceof DownloadError ? error : new DownloadError("disk", "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0444\u0430\u0439\u043B \u2014 \u043F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043C\u0435\u0441\u0442\u043E \u0438 \u0434\u043E\u0441\u0442\u0443\u043F \u043A \u0431\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0435.");
}
function rangeOf(response, have, previous) {
  const rawLength = response.headers.get("content-length");
  const length = rawLength !== null && /^\d+$/.test(rawLength) ? Number(rawLength) : null;
  if (length !== null && !Number.isSafeInteger(length)) {
    throw new DownloadError("invalid-range", "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0440\u0430\u0437\u043C\u0435\u0440 \u043E\u0442\u0432\u0435\u0442\u0430 CDN.");
  }
  if (response.status === 200) {
    return {
      total: length,
      expected: length,
      append: false
    };
  }
  const match = /^bytes (\d+)-(\d+)\/(\d+)$/.exec(response.headers.get("content-range") ?? "");
  const [start, end, total] = match ? match.slice(1).map(Number) : [];
  if (!match || !previous || have === 0 || start !== have || !Number.isSafeInteger(total) || !Number.isSafeInteger(end) || end < start || end >= total || previous.total !== null && total !== previous.total || length !== null && length !== end - start + 1) {
    throw new DownloadError("invalid-range", "CDN \u0432\u0435\u0440\u043D\u0443\u043B \u043D\u0435\u0441\u043E\u0433\u043B\u0430\u0441\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D.");
  }
  return {
    total,
    expected: end - start + 1,
    append: true
  };
}
async function downloadAttempt(options, url, part, meta) {
  const maximum = options.maxBytes ?? 1024 ** 3;
  const idleMs = options.idleTimeoutMs ?? 6e4;
  const controller = new AbortController();
  const onAbort = () => controller.abort();
  options.signal?.addEventListener("abort", onAbort, { once: true });
  let timer;
  let received = 0;
  let response = null;
  const previous = await partialMetadata(meta);
  const partialSize = await sizeOf(part);
  const resumable = previous?.url === url && strongValidator(previous.validator);
  const have = resumable ? partialSize : 0;
  const resetTimer = () => {
    clearTimeout(timer);
    timer = setTimeout(() => controller.abort(), idleMs);
  };
  const aborted = new Promise((_resolve, reject) => {
    controller.signal.addEventListener("abort", () => reject(new Error("download_timeout")), { once: true });
  });
  if (options.signal?.aborted) {
    options.signal.removeEventListener("abort", onAbort);
    throw new DownloadError("aborted", "\u0421\u043A\u0430\u0447\u0438\u0432\u0430\u043D\u0438\u0435 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E.");
  }
  if (partialSize > maximum) {
    throw new DownloadError("too-large", "\u0424\u0430\u0439\u043B \u0431\u043E\u043B\u044C\u0448\u0435 \u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u043E\u0433\u043E \u0440\u0430\u0437\u043C\u0435\u0440\u0430.");
  }
  resetTimer();
  try {
    response = await Promise.race([(options.fetchImpl ?? fetchPublicDownload)(url, {
      redirect: "manual",
      headers: have > 0 ? { Range: `bytes=${have}-`, "If-Range": previous.validator } : {},
      signal: controller.signal
    }), aborted]);
    if ([401, 403, 404, 410].includes(response.status)) {
      return "expired";
    }
    if (response.status === 416) {
      await fs10.rm(part, { force: true });
      await fs10.rm(meta, { force: true });
      return "retry";
    }
    if (![200, 206].includes(response.status) || !response.body) {
      return "retry";
    }
    const validator = strongValidator(response.headers.get("etag"));
    if (response.status === 206 && (!validator || validator !== previous?.validator || !have)) {
      await fs10.rm(part, { force: true });
      await fs10.rm(meta, { force: true });
      return "retry";
    }
    const range = rangeOf(response, have, previous);
    if (range.total !== null && range.total > maximum) {
      throw new DownloadError("too-large", "\u0424\u0430\u0439\u043B \u0431\u043E\u043B\u044C\u0448\u0435 \u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u043E\u0433\u043E \u0440\u0430\u0437\u043C\u0435\u0440\u0430.");
    }
    if (validator) {
      await writeMetadata(meta, {
        url,
        validator,
        total: range.total
      });
    } else {
      await fs10.rm(meta, { force: true });
    }
    const flags = FS4.O_WRONLY | FS4.O_CREAT | FS4.O_NOFOLLOW | (range.append ? FS4.O_APPEND : FS4.O_TRUNC);
    const guard = new Transform2({
      /**
       * Лимит и срок обновляются до передачи chunk на диск. Переполнение
       * останавливает pipeline, не оставляя опубликованный частичный результат.
       */
      transform(chunk, _encoding, done) {
        received += chunk.length;
        resetTimer();
        if (received + (range.append ? have : 0) > maximum) {
          done(new DownloadError("too-large", "\u0424\u0430\u0439\u043B \u0431\u043E\u043B\u044C\u0448\u0435 \u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u043E\u0433\u043E \u0440\u0430\u0437\u043C\u0435\u0440\u0430."));
          return;
        }
        done(null, chunk);
      }
    });
    let writer;
    try {
      writer = options.createWriter?.(part, flags) ?? fileWriter(part, flags);
      writer.on("error", (error) => {
        if (error.code === "ENOSPC") {
          guard.destroy(diskFailure(error));
        }
      });
    } catch (error) {
      throw diskFailure(error);
    }
    await pipeline4(
      Readable2.fromWeb(response.body),
      guard,
      writer,
      { signal: controller.signal }
    );
    const actual = await sizeOf(part);
    if (range.expected !== null && received !== range.expected || range.total !== null && actual !== range.total) {
      return "retry";
    }
    return "done";
  } catch (error) {
    if (options.signal?.aborted) {
      throw new DownloadError("aborted", "\u0421\u043A\u0430\u0447\u0438\u0432\u0430\u043D\u0438\u0435 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E.");
    }
    if (error instanceof DownloadError) {
      throw error;
    }
    if (["ENOSPC", "EDQUOT", "EACCES", "EROFS", "EIO", "ENOENT", "ENOTDIR", "ELOOP"].includes(error.code ?? "")) {
      throw diskFailure(error);
    }
    return "retry";
  } finally {
    clearTimeout(timer);
    options.signal?.removeEventListener("abort", onAbort);
    void response?.body?.cancel().catch(() => {
    });
  }
}
async function downloadToFile(options) {
  const part = `${options.dest}.part`;
  const meta = `${part}.meta.json`;
  const attempts = options.attempts ?? 6;
  const sleep = options.sleep ?? pause;
  let url = options.url;
  let refreshes = 0;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    if (options.signal?.aborted) {
      throw new DownloadError("aborted", "\u0421\u043A\u0430\u0447\u0438\u0432\u0430\u043D\u0438\u0435 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E.");
    }
    const result = await downloadAttempt(options, url, part, meta);
    if (result === "done") {
      const size = await sizeOf(part);
      const sha256 = await hashFile(part);
      const handle = await fs10.open(part, FS4.O_RDONLY | FS4.O_NOFOLLOW);
      try {
        await handle.sync();
      } finally {
        await handle.close();
      }
      await fs10.rename(part, options.dest);
      await fs10.rm(meta, { force: true });
      return { size, sha256 };
    }
    if (result === "expired") {
      if (!options.refresh || refreshes >= 3) {
        throw new DownloadError("expired", "\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u0444\u0430\u0439\u043B \u043F\u0440\u043E\u0442\u0443\u0445\u043B\u0430, \u0430 \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u0435\u0451 \u043D\u0435\u0447\u0435\u043C.");
      }
      refreshes += 1;
      url = await options.refresh();
      continue;
    }
    if (attempt < attempts) {
      await sleep(Math.min(1e3 * 2 ** (attempt - 1), 15e3));
    }
  }
  throw new DownloadError("gave-up", `\u0424\u0430\u0439\u043B \u043D\u0435 \u0441\u043A\u0430\u0447\u0430\u043B\u0441\u044F \u0437\u0430 ${attempts} \u043F\u043E\u043F\u044B\u0442\u043E\u043A.`);
}

// src/lib/studio3d/search.ts
import path13 from "node:path";
function normalizeSearch(value) {
  return value.toLocaleLowerCase("ru-RU").replace(/ё/g, "\u0435").replace(/#/g, " ").replace(/\s+/g, " ").trim();
}
function spendingFor(lines) {
  const groups = /* @__PURE__ */ new Map();
  for (const line of lines) {
    if (line.cost.free) {
      continue;
    }
    const unit = line.cost.unit;
    const provider = line.provider ?? "unknown";
    const key = JSON.stringify([provider, unit?.one, unit?.few, unit?.many]);
    const group = groups.get(key) ?? {
      provider,
      unit,
      actual: 0,
      estimated: 0,
      refunded: 0,
      unknownCount: 0,
      unknownEstimated: 0
    };
    group.estimated += line.cost.estimated ?? 0;
    if (line.cost.state === "refunded") {
      group.refunded += line.cost.actual ?? 0;
    } else if (line.cost.actual !== null && ["charged", "unknown"].includes(line.cost.state)) {
      group.actual += line.cost.actual;
    }
    if (line.cost.state === "unknown" || line.cost.actual === null && ["charged", "refunded"].includes(line.cost.state)) {
      group.unknownCount += 1;
      group.unknownEstimated += line.cost.estimated ?? 0;
    }
    groups.set(key, group);
  }
  return [...groups.values()];
}
function summarizeModel(model, versions, fileUrl) {
  const main = versions.find((version2) => version2.id === model.mainVersion);
  const previewVersion = main?.files.some((file) => file.role === "preview") ? main : versions.filter((version2) => version2.status === "ready" && version2.files.some((file) => file.role === "preview")).at(-1);
  const preview = previewVersion?.files.find((file) => file.role === "preview");
  const spending = spendingFor(versions);
  const materialGroups = spending.filter((group) => group.actual > 0 || group.estimated > 0);
  return {
    id: model.id,
    name: model.name,
    project: model.project,
    category: model.category,
    tags: model.tags,
    origin: model.origin,
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
    mainVersion: model.mainVersion,
    preview: preview && previewVersion ? fileUrl(model.id, previewVersion.id, preview.name) : null,
    versions: versions.length,
    active: versions.filter((version2) => ACTIVE_STATUSES.includes(version2.status)).length,
    spent: materialGroups.length > 1 ? null : materialGroups[0]?.actual ?? 0,
    spending,
    sizeBytes: versions.reduce((total, version2) => total + version2.files.reduce((bytes, file) => bytes + file.size, 0), 0),
    has: {
      rig: versions.some((version2) => ["rigged", "animated"].includes(version2.kind) || (version2.stats?.bones ?? 0) > 0),
      animation: versions.some((version2) => version2.kind === "animated" || (version2.stats?.animations.length ?? 0) > 0),
      parts: versions.some((version2) => version2.kind === "parts" || (version2.stats?.parts.length ?? 0) > 1),
      images: versions.some((version2) => ["image", "views"].includes(version2.kind) || version2.files.some((file) => ["image", "front", "left", "back", "right"].includes(file.role)))
    }
  };
}
function haystack(entry) {
  const category2 = MODEL_CATEGORIES.find((item) => item.id === entry.model.category)?.label ?? "";
  const pieces = [
    entry.model.name,
    entry.model.notes,
    entry.model.project ?? "",
    category2,
    ...entry.model.tags
  ];
  for (const version2 of entry.versions) {
    pieces.push(version2.label, operationSpec(version2.operation ?? "")?.label ?? "", version2.task?.id ?? "");
    for (const key of ["prompt", "negative_prompt", "hint"]) {
      const value = version2.params[key];
      if (typeof value === "string") {
        pieces.push(value);
      }
    }
    pieces.push(
      ...version2.files.map((file) => file.name),
      ...version2.savedTo.map((file) => path13.basename(file.path))
    );
  }
  return normalizeSearch(pieces.join(" "));
}
function searchModels(entries, query, fileUrl) {
  const words = normalizeSearch(query.q ?? "").split(" ").filter(Boolean);
  const required = (query.has ?? "").split(",").filter(Boolean);
  const from = query.from ? Date.parse(query.from) : null;
  const to = query.to ? Date.parse(query.to) : null;
  const filtered = entries.filter((entry) => {
    const model = entry.model;
    const summary = summarizeModel(model, entry.versions, fileUrl);
    const text3 = haystack(entry);
    const updated = Date.parse(model.updatedAt);
    return (!query.project || model.project === query.project) && (!query.category || model.category === query.category) && (!query.origin || model.origin === query.origin) && (!query.provider || entry.versions.some((version2) => version2.provider === query.provider)) && (from === null || updated >= from) && (to === null || updated <= to) && words.every((word) => text3.includes(word)) && required.every((flag2) => Object.hasOwn(summary.has, flag2) && summary.has[flag2]);
  }).map((entry) => summarizeModel(entry.model, entry.versions, fileUrl));
  filtered.sort((a, b) => {
    const compare = query.sort === "name" ? a.name.localeCompare(b.name, "ru") : query.sort === "spent" ? (b.spent ?? -1) - (a.spent ?? -1) : Date.parse(query.sort === "created" ? b.createdAt : b.updatedAt) - Date.parse(query.sort === "created" ? a.createdAt : a.updatedAt);
    return compare || a.id.localeCompare(b.id);
  });
  const offset = Math.max(0, Math.trunc(query.offset ?? 0));
  const limit = Math.min(200, Math.max(1, Math.trunc(query.limit ?? 50)));
  return { models: filtered.slice(offset, offset + limit), total: filtered.length };
}

// src/lib/studio3d/jobProjections.ts
function publicJobError(child) {
  return child.error ? {
    kind: child.error.kind,
    message: child.error.message,
    detail: child.error.detail
  } : null;
}
async function retryInfo(record, child, library, intents) {
  if (["unknown", "unresolved", "submitting"].includes(child.stage)) {
    return { available: false, reason: "\u0417\u0430\u043A\u0430\u0437 \u043C\u043E\u0433 \u0431\u044B\u0442\u044C \u043F\u0440\u0438\u043D\u044F\u0442 \u0438 \u043E\u043F\u043B\u0430\u0447\u0435\u043D \u2014 \u0441\u043D\u0430\u0447\u0430\u043B\u0430 \u0440\u0430\u0437\u0431\u0435\u0440\u0438\u0442\u0435 \u0438\u0441\u0445\u043E\u0434." };
  }
  if (child.remote?.state === "success") {
    return { available: false, reason: "\u0413\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044F \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0430; \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E\u0435 \u0441\u043A\u0430\u0447\u0438\u0432\u0430\u043D\u0438\u0435." };
  }
  const unsubmittedConfirmation = child.stage === "prepared" && child.confirmationExpired;
  if (!unsubmittedConfirmation && (child.status !== "failed" || !["done", "rejected"].includes(child.stage))) {
    return { available: false, reason: null };
  }
  if (!await retainedInputs(library, intents, record.intentId, record.inputs)) {
    return { available: false, reason: "\u0421\u0440\u043E\u043A \u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F \u0432\u0445\u043E\u0434\u043E\u0432 \u0438\u0441\u0442\u0451\u043A \u2014 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0438\u0445 \u0437\u0430\u043D\u043E\u0432\u043E." };
  }
  return { available: true, reason: null };
}
async function runProjection2(record, library, intents, fileUrl) {
  let entry = null;
  if (record.modelId) {
    try {
      entry = await library.readModel(record.modelId);
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw error;
      }
    }
  }
  const versions = [];
  for (const child of record.children) {
    const version2 = entry?.versions.find((item) => item.id === child.version?.id);
    if (version2 && record.modelId) {
      versions.push(versionProjection(
        version2,
        library.libraryId,
        (name) => fileUrl(record.modelId, version2.id, name),
        await retryInfo(record, child, library, intents)
      ));
    }
  }
  const deleted = entry === null || record.children.some((child) => child.version && !entry.versions.some((version2) => version2.id === child.version.id));
  return parseStudio3d.run({
    libraryId: library.libraryId,
    intentId: record.intentId,
    deleted,
    checkJobId: record.operation === "rig-check" ? record.intentId : null,
    model: !deleted && entry ? summarizeModel(entry.model, entry.versions, fileUrl) : null,
    versions: deleted ? [] : versions
  });
}
async function jobProjection(record, library, intents) {
  let deleted = false;
  let existingVersions = [];
  if (record.modelId) {
    try {
      existingVersions = (await library.readModel(record.modelId)).versions.map((version2) => version2.id);
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw error;
      }
      deleted = true;
    }
  }
  const children = [];
  for (const child of record.children) {
    const retry = await retryInfo(record, child, library, intents);
    children.push({
      childId: child.childId,
      versionId: deleted || !existingVersions.includes(child.version?.id ?? "") ? null : child.version?.id ?? null,
      operation: child.operation,
      provider: record.provider,
      status: child.status,
      waitReason: child.waitReason,
      estimated: child.estimated,
      actual: child.actual,
      unit: record.unit,
      paymentState: child.paymentState,
      taskId: child.taskId,
      candidates: child.candidates,
      retryAvailable: retry.available,
      retryReason: retry.reason,
      error: publicJobError(child)
    });
  }
  return parseStudio3d.job({
    intentId: record.intentId,
    libraryId: record.libraryId,
    deleted,
    modelId: deleted ? null : record.modelId,
    children,
    updatedAt: record.updatedAt
  });
}
async function taskProjection(record, child, library, intents) {
  const job2 = await jobProjection(record, library, intents);
  const item = job2.children.find((entry) => entry.childId === child.childId);
  return {
    intentId: record.intentId,
    childId: child.childId,
    modelId: job2.modelId,
    modelName: job2.deleted ? null : record.model?.name ?? null,
    versionId: item.versionId,
    label: child.plan?.label ?? child.operation,
    provider: record.provider,
    status: child.status,
    progress: child.progress,
    etaSeconds: child.etaSeconds,
    estimated: child.estimated,
    actual: child.actual,
    paymentState: child.paymentState,
    unit: record.unit,
    waitReason: child.waitReason,
    retryAvailable: item.retryAvailable,
    retryReason: item.retryReason,
    error: item.error,
    updatedAt: child.updatedAt
  };
}

// src/lib/studio3d/jobs.ts
var TASK_ID_RE = /^[A-Za-z0-9][A-Za-z0-9_-]{7,100}$/;
var Jobs = class {
  admission;
  options;
  providers;
  inflight = /* @__PURE__ */ new Map();
  reservations = /* @__PURE__ */ new Map();
  balances = /* @__PURE__ */ new Map();
  leases = /* @__PURE__ */ new Map();
  downloadQueue;
  downloads;
  batches;
  snapshotLeases = /* @__PURE__ */ new Map();
  inflightBatches = /* @__PURE__ */ new Map();
  timer = null;
  ticking = null;
  stopping = null;
  stopped = false;
  localActive = false;
  stopController = new AbortController();
  constructor(options) {
    this.options = options;
    this.providers = new Map(options.providers.map((provider) => [provider.id, provider]));
    this.admission = options.admission ?? createAdmission(options.library.libraryId);
    this.downloadQueue = createJobDownloadQueue({
      run: (intentId, childId) => this.downloadResult(intentId, childId),
      isStopped: () => this.stopped,
      onIdle: this.options.onIdle
    });
    this.downloads = createJobDownloads({
      library: this.options.library,
      intents: this.options.intents,
      signal: this.stopController.signal,
      at: () => this.at(),
      isStopped: () => this.stopped,
      lookupProvider: (id2) => this.providers.get(id2),
      download: (options2) => (this.options.download ?? downloadToFile)(options2),
      change: (intentId, childId, patch) => this.change(intentId, childId, patch),
      notify: (intentId, childId) => this.notify(intentId, childId),
      broadcast: (name, data) => this.broadcast(name, data),
      injectFault: (boundary, record, child) => this.injectFault(boundary, record, child),
      refreshLease: (record, child) => this.refreshLease(record, child)
    });
    this.batches = createJobBatches({
      library: this.options.library,
      intents: this.options.intents,
      admission: this.admission,
      lookupProvider: (id2) => this.providers.get(id2),
      at: () => this.at(),
      buildIntent: (...args) => this.buildIntent(...args),
      materialize: (record) => this.materialize(record),
      change: (intentId, childId, patch) => this.change(intentId, childId, patch),
      injectFault: (boundary, record, child) => this.injectFault(boundary, record, child),
      wake: () => this.wake()
    });
  }
  now() {
    return (this.options.now ?? Date.now)();
  }
  at() {
    return new Date(this.now()).toISOString();
  }
  key(intentId, childId) {
    return `${intentId}:${childId}`;
  }
  accountScope(record) {
    return JSON.stringify([record.provider, record.accountKey, record.unit]);
  }
  /**
   * State соединяет баланс поставщика и ещё не отражённые локальные резервы текущего аккаунта.
   * Frozen уже исключён из upstream available; повторно вычитать его нельзя.
   */
  async balanceView(provider, captured, balance) {
    if (!balance || !Number.isFinite(balance.available) || !Number.isFinite(balance.reserved) || balance.available < 0 || balance.reserved < 0) {
      return null;
    }
    if (!captured) {
      return balance;
    }
    const scope = JSON.stringify([provider.id, captured.accountKey, provider.unit]);
    const holds = new Map([...this.reservations.entries()].filter(([, item]) => item.account === scope));
    for (const record of await this.options.intents.list()) {
      if (record.provider !== provider.id || record.accountKey !== captured.accountKey) {
        continue;
      }
      for (const child of record.children) {
        const key = this.key(record.intentId, child.childId);
        if (["submitting", "unknown", "accepted"].includes(child.stage) && child.remote?.state !== "success") {
          holds.set(key, {
            account: scope,
            amount: child.actual ?? child.estimated,
            pool: child.pool?.key ?? record.operation,
            limit: child.pool?.limit ?? null,
            accepted: child.stage === "accepted",
            balanceBefore: child.balanceBefore
          });
        } else if (child.stage !== "prepared") {
          holds.delete(key);
        }
      }
    }
    const unreflected = unreflectedReservationAmount([...holds.values()], balance.available);
    return {
      available: Math.max(0, balance.available - unreflected),
      reserved: balance.reserved + unreflected
    };
  }
  fileUrl() {
    return this.options.fileUrl;
  }
  /**
   * Fault injection изображает падение процесса, а не сетевой отказ поставщика.
   * Путь recovery сохраняет последнее fsync состояние без переписывания на failed.
   */
  async injectFault(boundary, record, child) {
    try {
      await this.options.fault?.(boundary, record, child);
    } catch (error) {
      throw new InjectedCrash(error);
    }
  }
  /**
   * Один in-flight promise объединяет нажатия до fsync, пока intent ещё нет.
   * Конфликт проверяется по исходному JSON и не ждёт copy чужого payload.
   */
  async run(value) {
    return this.runSelected(value);
  }
  /**
   * Selector принадлежит конкретному нажатию, не изменяет общий worker.
   * In-flight UUID объединяет обычные run и retry до первой durable записи.
   */
  async runSelected(value, selector = this.options.selectInputs ?? selectJobInputs) {
    if (this.stopped) {
      throw new JobError("worker_stopped");
    }
    const request2 = validateRunRequest(value);
    const token = this.admission.capture(request2.libraryId);
    const fingerprint = requestFingerprint(request2);
    const active = this.inflight.get(request2.idempotencyKey);
    if (this.inflightBatches.has(request2.idempotencyKey)) {
      throw new JobError("idempotency_conflict");
    }
    if (active) {
      if (active.fingerprint !== fingerprint) {
        return Promise.reject(new JobError("idempotency_conflict"));
      }
      return active.promise;
    }
    const release = this.admission.lease();
    const promise = this.accept(request2, fingerprint, token, selector).finally(() => {
      this.inflight.delete(request2.idempotencyKey);
      release();
    });
    this.inflight.set(request2.idempotencyKey, { fingerprint, promise });
    return promise;
  }
  /**
   * Сначала replay, затем capture account, проверка, snapshots и durable reserve.
   * Проекции materialize-ятся после journal; HTTP возвращает waiting без сети POST.
   */
  async accept(request2, fingerprint, token, selector) {
    const { library, intents } = this.options;
    const previous = await intents.get(request2.idempotencyKey, request2.libraryId);
    if (previous) {
      if (previous.requestFingerprint !== fingerprint) {
        throw new JobError("idempotency_conflict");
      }
      await this.materialize(previous);
      return runProjection2(previous, library, intents, this.fileUrl());
    }
    const provider = this.providers.get(request2.provider);
    const captured = provider?.snapshot?.();
    if (!provider || !await provider.available()) {
      throw new JobError("provider_unavailable");
    }
    const selection = await selector(library, request2, provider, captured);
    let model = null;
    const versions = [];
    let saved = false;
    try {
      const record = await this.buildIntent(request2, fingerprint, token, provider, captured, selection);
      model = record.model;
      versions.push(...record.children.flatMap((child) => child.version ? [child.version] : []));
      await this.admission.locked(async () => {
        if (!this.admission.current(token) || captured && !provider.isCurrent?.(captured)) {
          throw new JobError("admission_changed");
        }
        if (record.operation === "rig-check" && (await intents.list()).some((item) => item.operation === "rig-check" && item.modelId === record.modelId && item.parentVersionId === record.parentVersionId && item.children.some((child) => ACTIVE_STATUSES.includes(child.status)))) {
          throw new JobError("check_active");
        }
        await intents.reserve(record);
      });
      saved = true;
      await this.injectFault("after-intent", record);
      await this.materialize(record);
      this.wake();
      return runProjection2(await intents.get(record.intentId), library, intents, this.fileUrl());
    } catch (error) {
      if (!saved && !await intents.get(request2.idempotencyKey)) {
        if (model) {
          library.releasePlans(model.id, versions, !request2.modelId);
        }
        await discardInputs(library, intents, request2.idempotencyKey);
      }
      throw error;
    } finally {
      selection.release();
    }
  }
  /**
   * Подготовка строит полный воспроизводимый шаблон без проекций и POST.
   * Batch сохраняет все шаблоны сразу, чтобы recovery не пересоздавал каталог/IDs.
   */
  async buildIntent(request2, fingerprint, token, provider, captured, selection, batchParent = null) {
    const { library, intents } = this.options;
    let model = null;
    const versions = [];
    try {
      const spec = operationSpec(request2.operation);
      const validation2 = provider.validate(request2.operation, request2.values, selection.context);
      const offered = provider.operations(selection.context).some((item) => item.operation === request2.operation);
      if (!spec || !offered || validation2.errors.length || selection.context.kind !== null && !spec.inputs.includes(selection.context.kind)) {
        throw new JobError("validation_failed", { validation: validation2 });
      }
      if (!spec.inputs.includes("text") && !selection.inputs.length) {
        throw new JobError("validation_failed", { message: "\u041D\u0443\u0436\u0435\u043D \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D\u043D\u044B\u0439 \u0432\u0445\u043E\u0434 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F." });
      }
      const values2 = validation2.values;
      const quote2 = provider.quote(request2.operation, values2, selection.context);
      const price = requirePrice(quote2, request2.expectedPrice);
      if (!this.admission.current(token) || captured && !provider.isCurrent?.(captured)) {
        throw new JobError("admission_changed");
      }
      if (request2.operation === "rig-check" && selection.version?.rigCheck?.status === "pending") {
        throw new JobError("check_active");
      }
      const copied = await snapshotInputs(library, intents, request2.idempotencyKey, selection.inputs);
      const planned = provider.local ? [{
        childId: "child-1",
        label: spec.label,
        values: values2,
        taskType: "local",
        payload: null
      }] : provider.plan?.({
        operation: request2.operation,
        values: values2,
        inputs: copied.inputs,
        context: selection.context
      });
      if (!planned?.length || planned.length > 50 || new Set(planned.map((child) => child.childId)).size !== planned.length || planned.some((child) => !isSafeName(child.childId))) {
        throw new JobError("invalid_plan");
      }
      const children = [];
      const at = this.at();
      model = request2.modelId ? (await library.readModel(request2.modelId)).model : await library.planModel({
        name: request2.name ?? spec.label,
        project: request2.project ?? null,
        category: request2.category ?? null
      });
      for (const [index, plan] of planned.entries()) {
        const childPrice = requirePrice(
          provider.quote(request2.operation, plan.values, selection.context),
          planned.length === 1 ? price : provider.quote(
            request2.operation,
            plan.values,
            selection.context
          ).total
        );
        const version2 = spec.output === "check" ? null : await library.planVersion(
          request2.modelId ?? model,
          {
            kind: spec.output === "same" ? selection.version?.kind ?? "model" : spec.output,
            operation: request2.operation,
            provider: provider.id,
            label: plan.label,
            parent: request2.versionId ?? null,
            params: plan.values,
            status: "waiting",
            intentId: request2.idempotencyKey,
            childId: plan.childId,
            idempotencyKey: request2.idempotencyKey,
            accountKey: captured?.accountKey ?? null,
            planIndex: index,
            cost: {
              estimated: childPrice,
              actual: provider.local ? 0 : null,
              free: provider.local,
              unit: quote2.unit,
              state: provider.local ? "free" : "unpaid"
            }
          }
        );
        if (version2) {
          versions.push(version2);
        }
        children.push({
          childId: plan.childId,
          operation: request2.operation,
          values: plan.values,
          plan,
          version: version2,
          stage: "prepared",
          status: "waiting",
          progress: 0,
          etaSeconds: null,
          estimated: childPrice,
          actual: provider.local ? 0 : null,
          paymentState: provider.local ? "free" : "unpaid",
          balanceBefore: null,
          taskId: null,
          taskType: plan.taskType,
          pool: provider.pool?.(request2.operation, plan.values) ?? null,
          retryAt: null,
          submittedAt: null,
          updatedAt: at,
          completedAt: null,
          waitReason: null,
          error: null,
          remote: null,
          candidates: [],
          missedPolls: 0,
          notified: false,
          confirmationExpired: false
        });
      }
      if (Math.round(children.reduce((sum, child) => sum + child.estimated, 0) * 100) !== Math.round(price * 100)) {
        throw new JobError("invalid_plan_price");
      }
      const record = {
        schema: 1,
        kind: "run",
        intentId: request2.idempotencyKey,
        libraryId: library.libraryId,
        request: request2,
        requestFingerprint: fingerprint,
        executionFingerprint: requestFingerprint({
          values: values2,
          inputs: copied.snapshots,
          context: selection.context,
          parent: request2.versionId ?? null
        }),
        accountKey: captured?.accountKey ?? null,
        provider: provider.id,
        operation: request2.operation,
        values: values2,
        confirmedPrice: price,
        unit: quote2.unit,
        catalogVersion: requestFingerprint({
          fields: provider.operations(selection.context),
          unit: quote2.unit
        }),
        context: selection.context,
        model,
        modelId: model.id,
        parentVersionId: request2.versionId ?? null,
        inputs: copied.snapshots,
        children,
        projectionReady: false,
        preparation: "complete",
        batch: null,
        batchParent,
        createdAt: at,
        updatedAt: at,
        revision: 0
      };
      return record;
    } catch (error) {
      if (model) {
        library.releasePlans(model.id, versions, !request2.modelId);
      }
      await discardInputs(library, intents, request2.idempotencyKey);
      throw error;
    }
  }
  /**
   * Только незавершённая initial проекция восстанавливается из шаблонов.
   * Удалённая после завершения модель остаётся tombstone, не воскресает при restart.
   */
  async materialize(record) {
    if (record.projectionReady || !record.model || !record.modelId) {
      return;
    }
    await this.options.library.materializeModel(record.model);
    for (const child of record.children) {
      if (child.version) {
        await this.options.library.materializeVersion(record.modelId, child.version);
      }
      await this.injectFault("after-projection", record, child);
    }
    await this.options.intents.update(record.intentId, (current) => {
      current.projectionReady = true;
    });
    await this.project(record.intentId);
    for (const child of record.children) {
      this.refreshLease(record, child);
    }
  }
  /**
   * Journal читается заново под projection lock, чтобы поздний poll не откатил
   * более свежую запись. Files/stats/user metadata сохраняются updater-ом.
   */
  async project(intentId) {
    await withPathLock(`studio3d:projection:${this.options.library.dir}:${intentId}`, async () => {
      const record = await this.options.intents.get(intentId);
      if (!record?.modelId || !record.projectionReady) {
        return;
      }
      for (const child of record.children) {
        try {
          if (child.version) {
            await this.options.library.updateVersion(record.modelId, child.version.id, {
              status: child.status,
              progress: child.progress,
              etaSeconds: child.etaSeconds,
              task: child.taskId ? {
                provider: record.provider,
                id: child.taskId,
                type: child.taskType
              } : null,
              cost: {
                estimated: child.estimated,
                actual: child.actual,
                free: child.paymentState === "free",
                unit: record.unit,
                state: child.paymentState
              },
              error: publicJobError(child),
              waitReason: child.waitReason,
              retryAt: child.retryAt === null ? null : new Date(child.retryAt).toISOString(),
              submittedAt: child.submittedAt,
              missedPolls: child.missedPolls
            });
          } else if (record.operation === "rig-check" && record.parentVersionId) {
            const common = {
              jobId: record.intentId,
              childId: child.childId,
              at: child.updatedAt
            };
            const riggable = child.remote?.extra.riggable;
            const check = child.status === "ready" && typeof riggable === "boolean" ? {
              ...common,
              status: "ready",
              riggable,
              rigType: typeof child.remote?.extra.rigType === "string" ? child.remote.extra.rigType : null
            } : child.status === "failed" ? {
              ...common,
              status: "failed",
              error: publicJobError(child) ?? {
                kind: "unknown",
                message: "\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u043D\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u043B\u0430\u0441\u044C.",
                detail: null
              }
            } : ["unknown", "unresolved"].includes(child.status) ? {
              ...common,
              status: child.status,
              error: publicJobError(child)
            } : { ...common, status: "pending" };
            await this.options.library.updateVersion(
              record.modelId,
              record.parentVersionId,
              { rigCheck: check }
            );
          }
        } catch (error) {
          if (!["ENOENT", "version_not_found"].includes(error.code ?? "")) {
            throw error;
          }
        }
      }
    });
  }
  /**
   * Каждое изменение сначала fsync журнала, затем отдельная файловая проекция.
   * Снимок child из вызывающего poll не заменяет более свежие поля соседнего worker.
   */
  async change(intentId, childId, patch, guard) {
    let terminalChanged = false;
    const updated = await this.options.intents.update(intentId, (record) => {
      const child = record.children.find((item) => item.childId === childId);
      if (!child) {
        throw new JobError("child_not_found");
      }
      if (guard && !guard(child)) {
        return;
      }
      const changes = { ...patch };
      if (Object.hasOwn(patch, "actual") && patch.actualSource !== "usage") {
        if (child.actualSource === "usage" || patch.actual === null && child.actual !== null) {
          changes.actual = child.actual;
          changes.actualSource = child.actualSource;
          changes.chargedAt = child.chargedAt;
          if (patch.paymentState !== "refunded") {
            changes.paymentState = child.paymentState;
          }
        } else if (patch.actual !== null && patch.actual !== void 0) {
          changes.actualSource = "task";
          changes.chargedAt = child.chargedAt ?? this.at();
        }
      }
      if (patch.actualSource === "usage" && child.paymentState === "refunded") {
        changes.paymentState = "refunded";
      }
      if (Object.entries(changes).every(([key, value]) => isDeepStrictEqual2(child[key], value))) {
        return;
      }
      terminalChanged = patch.status === "failed" && child.status !== patch.status && (patch.stage ?? child.stage) !== "done";
      Object.assign(child, changes, { updatedAt: this.at() });
      record.updatedAt = this.at();
    });
    await this.project(intentId);
    for (const child of updated.children) {
      this.refreshLease(updated, child);
    }
    if (terminalChanged) {
      await this.terminalNotification(intentId, childId);
    }
    return updated;
  }
  /**
   * Lease защищает parent проверок и версии заданий до терминального исхода.
   * Unknown активен бессрочно; close-unknown освобождает лишь локальную защиту.
   */
  refreshLease(record, child) {
    const key = this.key(record.intentId, child.childId);
    const versionId = child.version?.id ?? record.parentVersionId;
    if (ACTIVE_STATUSES.includes(child.status) && record.modelId && versionId) {
      if (!this.leases.has(key)) {
        this.leases.set(key, this.options.library.leaseVersion(record.modelId, versionId, key));
      }
    } else {
      this.leases.get(key)?.();
      this.leases.delete(key);
    }
  }
  /**
   * Резервы восстанавливаются по accountKey и child, не по текущему ключу доступа.
   * Accepted занимает pool, unknown также держит расчётные деньги до решения.
   */
  rebuildReservations(records) {
    for (const record of records) {
      for (const child of record.children) {
        this.refreshLease(record, child);
        const key = this.key(record.intentId, child.childId);
        if (["submitting", "unknown", "accepted"].includes(child.stage) && record.accountKey && child.remote?.state !== "success") {
          this.reservations.set(key, {
            account: this.accountScope(record),
            amount: child.actual ?? child.estimated,
            pool: child.pool?.key ?? record.operation,
            limit: child.pool?.limit ?? null,
            accepted: child.stage === "accepted",
            balanceBefore: child.balanceBefore
          });
        } else if (!this.localActive) {
          this.reservations.delete(key);
        }
      }
    }
  }
  /**
   * Timer принадлежит серверу и живёт без вкладки. Ошибка одного такта не
   * удаляет durable состояние; следующий читает его заново с обычной задержкой.
   */
  wake(delay = 0) {
    if (this.stopped || this.timer !== null) {
      return;
    }
    const callback = () => {
      this.timer = null;
      void this.tick().catch(() => {
        this.wake(15e3);
      });
    };
    this.timer = this.options.setTimer ? this.options.setTimer(callback, delay) : setTimeout(callback, delay);
    this.timer?.unref?.();
  }
  /**
   * Одновременные ticks разделяют одно обещание. Downloads идут отдельно и
   * не задерживают пакетный poll остальных задач при медленном CDN.
   */
  tick() {
    if (this.stopped) {
      return Promise.resolve();
    }
    this.ticking ??= this.performTick().finally(() => {
      this.ticking = null;
      this.options.onIdle?.();
    });
    return this.ticking;
  }
  /**
   * Ошибка отдельной записи оставляет её журнал для следующего такта и не держит соседей.
   * Инъекция аварии остаётся исключением, чтобы проверки восстановления видели точку сбоя.
   */
  async isolate(work) {
    try {
      await work();
      return true;
    } catch (error) {
      if (error instanceof InjectedCrash) {
        throw error;
      }
      return false;
    }
  }
  /**
   * Сначала читаются принятые задачи, потом допускаются prepared дети.
   * Сбой одного provider/child не препятствует наблюдению остальных.
   */
  async performTick() {
    let records = await this.options.intents.list();
    for (const record of records) {
      if (record.kind === "batch" && record.preparation === "pending") {
        await this.isolate(() => this.batches.materializeBatch(record));
      }
      for (const child of record.children) {
        if (child.stage === "submitting" && !child.taskId) {
          await this.isolate(() => this.change(record.intentId, child.childId, {
            stage: "unknown",
            status: "unknown",
            paymentState: "unknown",
            waitReason: "\u041E\u0442\u0432\u0435\u0442 \u043D\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0443 \u043D\u0435 \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D; \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u0430\u044F \u043E\u043F\u043B\u0430\u0442\u0430 \u0437\u0430\u043F\u0440\u0435\u0449\u0435\u043D\u0430."
          }, (current) => current.stage === "submitting" && !current.taskId));
        }
      }
    }
    records = await this.options.intents.list();
    this.rebuildReservations(records);
    await this.pollRecords(records);
    await this.findUnknown(records);
    records = await this.options.intents.list();
    this.rebuildReservations(records);
    const groups = new Map(records.map((record) => [record.intentId, record]));
    const rows2 = new Map(records.flatMap((record) => record.batch?.rows.map((row, index) => [row.intentId, index]) ?? []));
    records.sort((a, b) => {
      const aGroup = a.batchParent ?? a.intentId;
      const bGroup = b.batchParent ?? b.intentId;
      const aTime = groups.get(aGroup)?.createdAt ?? a.createdAt;
      const bTime = groups.get(bGroup)?.createdAt ?? b.createdAt;
      return aTime.localeCompare(bTime) || aGroup.localeCompare(bGroup) || (rows2.get(a.intentId) ?? -1) - (rows2.get(b.intentId) ?? -1);
    });
    for (const record of records) {
      if (!record.projectionReady && record.kind === "run") {
        if (!await this.isolate(() => this.materialize(record))) {
          continue;
        }
      }
      for (const child of record.children) {
        if (child.stage === "prepared" && child.waitingSince && this.now() - Date.parse(child.waitingSince) >= 864e5) {
          await this.isolate(() => this.closeFundsWait(record, child));
          continue;
        }
        if (child.stage === "prepared" && !child.confirmationExpired && (child.retryAt === null || child.retryAt <= this.now()) && !await this.batches.batchBlocked(record)) {
          await this.isolate(() => this.dispatch(record, child));
        }
        if (child.stage === "accepted" && child.remote?.state === "success" && child.status !== "failed") {
          this.enqueueDownload(record.intentId, child.childId);
        }
        if (child.stage === "done") {
          await this.isolate(() => this.notify(record.intentId, child.childId));
        }
      }
    }
    this.pumpDownloads();
    if ((await this.options.intents.list()).some((record) => record.children.some((child) => ACTIVE_STATUSES.includes(child.status)))) {
      this.wake(3e3);
    }
  }
  /**
   * Сутки без денег — решение человека не появится само. Позиция закрывается
   * без оплаты: POST не уходил, резерв у исполнителя не создавался.
   */
  async closeFundsWait(record, child) {
    const updated = await this.change(record.intentId, child.childId, {
      stage: "rejected",
      status: "failed",
      paymentState: "unpaid",
      retryAt: null,
      waitingSince: null,
      completedAt: this.at(),
      waitReason: "\u041D\u0435 \u0445\u0432\u0430\u0442\u0438\u043B\u043E \u0441\u0440\u0435\u0434\u0441\u0442\u0432 \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 \u0441\u0443\u0442\u043E\u043A"
    });
    this.reservations.delete(this.key(record.intentId, child.childId));
    this.refreshLease(updated, updated.children.find((item) => item.childId === child.childId));
  }
  /**
   * Все позиции одного аккаунта разделяют бесплатное чтение баланса на 30 секунд.
   * Обещание кешируется до ответа, а отсутствие и отказ не создают шквал повторов за такт.
   */
  readBalance(provider, captured) {
    const key = JSON.stringify([provider.id, captured.accountKey]);
    const cached = this.balances.get(key);
    if (cached && this.now() - cached.at < 3e4) {
      return cached.value;
    }
    const value = Promise.resolve().then(() => provider.balance?.(captured)).then((balance) => {
      if (!balance || !Number.isFinite(balance.available) || balance.available < 0 || !Number.isFinite(balance.reserved) || balance.reserved < 0) {
        return null;
      }
      return balance;
    }).catch(() => null);
    this.balances.set(key, { at: this.now(), value });
    return value;
  }
  /**
   * Баланс и бесплатная prepare находятся вне lifecycle lock. Локальный reserve
   * учитывается до upload, а последний допуск/цена повторяются после каждого await.
   */
  async dispatch(record, child) {
    const provider = this.providers.get(record.provider);
    const captured = provider?.snapshot?.();
    if (!provider || !this.admission.canAccept() || this.stopped) {
      return;
    }
    if (!provider.local && (!captured || captured.accountKey !== record.accountKey || !provider.isCurrent?.(captured))) {
      await this.change(record.intentId, child.childId, { waitReason: "\u0412\u0435\u0440\u043D\u0438\u0442\u0435 \u0434\u043E\u0441\u0442\u0443\u043F \u0438\u0441\u0445\u043E\u0434\u043D\u043E\u0433\u043E \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430." });
      return;
    }
    const token = this.admission.capture(record.libraryId);
    const key = this.key(record.intentId, child.childId);
    if (!await retainedInputs(this.options.library, this.options.intents, record.intentId, record.inputs)) {
      await this.change(record.intentId, child.childId, {
        stage: "rejected",
        status: "failed",
        error: fallbackError("input", "\u0421\u043E\u0445\u0440\u0430\u043D\u0451\u043D\u043D\u044B\u0435 \u0432\u0445\u043E\u0434\u044B \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B \u2014 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0438\u0445 \u0437\u0430\u043D\u043E\u0432\u043E."),
        paymentState: provider.local ? "free" : "unpaid",
        completedAt: this.at()
      });
      return;
    }
    if (provider.local) {
      await this.runLocal(record, child, provider);
      return;
    }
    let balance = null;
    try {
      balance = await this.readBalance(provider, captured);
      if (balance && (!Number.isFinite(balance.available) || balance.available < 0 || !Number.isFinite(balance.reserved) || balance.reserved < 0)) {
        balance = null;
      }
    } catch {
      await this.change(record.intentId, child.childId, { waitReason: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u0431\u0430\u043B\u0430\u043D\u0441." });
      return;
    }
    const allowed = await this.admission.locked(async () => {
      if (!this.admission.current(token) || !provider.isCurrent?.(captured)) {
        return false;
      }
      const latest = await this.options.intents.get(record.intentId);
      const current = latest.children.find((item) => item.childId === child.childId);
      if (current.stage !== "prepared" || current.confirmationExpired || !await this.priceCurrent(latest, current, provider)) {
        return false;
      }
      const held = [...this.reservations.entries()].filter(([id2, item]) => id2 !== key && item.account === this.accountScope(record));
      const pool = current.pool;
      const busy = pool?.limit !== null && pool?.limit !== void 0 && held.filter(([, item]) => item.pool === pool.key).length >= pool.limit;
      const reserved = unreflectedReservationAmount(held.map(([, item]) => item), balance?.available ?? null);
      if (busy || balance === null || balance === void 0 || balance.available < reserved + child.estimated) {
        await this.change(record.intentId, child.childId, {
          waitReason: busy ? "\u0416\u0434\u0451\u0442 \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u043E\u0433\u043E \u0441\u043B\u043E\u0442\u0430." : balance ? balance.available >= child.estimated && reserved > 0 ? "\u0416\u0434\u0451\u0442 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F \u043F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0445 \u0441\u043F\u0438\u0441\u0430\u043D\u0438\u0439." : "\u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0441\u0440\u0435\u0434\u0441\u0442\u0432." : "\u0411\u0430\u043B\u0430\u043D\u0441 \u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u0435\u043D.",
          ...busy ? {} : { waitingSince: current.waitingSince ?? this.at() }
        });
        return false;
      }
      this.reservations.set(key, {
        account: this.accountScope(record),
        amount: child.estimated,
        pool: pool?.key ?? child.operation,
        limit: pool?.limit ?? null,
        accepted: false,
        balanceBefore: balance.available
      });
      await this.change(record.intentId, child.childId, { balanceBefore: balance.available });
      return true;
    });
    if (!allowed) {
      return;
    }
    let snapshots;
    try {
      snapshots = await pinSnapshots(this.options.library, this.options.intents, record);
    } catch {
      this.reservations.delete(key);
      await this.change(record.intentId, child.childId, {
        stage: "rejected",
        status: "failed",
        paymentState: "unpaid",
        completedAt: this.at(),
        error: fallbackError("input", "\u0421\u043E\u0445\u0440\u0430\u043D\u0451\u043D\u043D\u044B\u0439 \u0441\u043D\u0438\u043C\u043E\u043A \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u2014 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0430 \u043D\u0435 \u043E\u043F\u043B\u0430\u0447\u0435\u043D\u0430.")
      });
      return;
    }
    try {
      let prepared;
      try {
        prepared = await provider.prepare(child.plan, captured);
      } catch (error) {
        this.reservations.delete(key);
        if (!this.admission.current(token) || !provider.isCurrent?.(captured)) {
          await this.change(
            record.intentId,
            child.childId,
            { waitReason: "\u0414\u043E\u043F\u0443\u0441\u043A \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0441\u044F \u0432\u043E \u0432\u0440\u0435\u043C\u044F \u043F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0438." }
          );
          return;
        }
        const failure = isProviderFailure(error) ? error.error : fallbackError("input", "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u0438\u0442\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D\u043D\u044B\u0439 \u0432\u0445\u043E\u0434.");
        await this.change(record.intentId, child.childId, {
          stage: "rejected",
          status: "failed",
          error: failure,
          paymentState: "unpaid",
          completedAt: this.at()
        });
        return;
      }
      const sending = await this.admission.locked(async () => {
        if (!this.admission.current(token) || !provider.isCurrent?.(captured) || this.stopped) {
          this.reservations.delete(key);
          await this.change(
            record.intentId,
            child.childId,
            { waitReason: "\u0414\u043E\u043F\u0443\u0441\u043A \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0441\u044F \u0432\u043E \u0432\u0440\u0435\u043C\u044F \u043F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0438." }
          );
          return null;
        }
        const latest = await this.options.intents.get(record.intentId);
        const current = latest.children.find((item) => item.childId === child.childId);
        if (current.stage !== "prepared" || current.confirmationExpired || !await this.priceCurrent(latest, current, provider) || await this.batches.batchBlocked(latest)) {
          this.reservations.delete(key);
          return null;
        }
        await this.change(record.intentId, child.childId, {
          stage: "submitting",
          status: "waiting",
          paymentState: "reserved",
          submittedAt: this.at(),
          waitReason: null
        });
        await this.injectFault("before-send", latest, current);
        if (!this.admission.current(token) || !provider.isCurrent?.(captured) || this.stopped) {
          this.reservations.delete(key);
          await this.change(record.intentId, child.childId, {
            stage: "prepared",
            status: "waiting",
            paymentState: "unpaid",
            submittedAt: null,
            waitReason: "\u0414\u043E\u043F\u0443\u0441\u043A \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0441\u044F \u043F\u0435\u0440\u0435\u0434 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u043E\u0439."
          });
          return null;
        }
        if (!this.priceMatches(latest, current, provider)) {
          this.reservations.delete(key);
          await this.change(record.intentId, child.childId, {
            stage: "prepared",
            status: "waiting",
            paymentState: "unpaid",
            submittedAt: null,
            confirmationExpired: true,
            waitReason: "price_changed"
          });
          return null;
        }
        try {
          snapshots.verifyNow();
        } catch (error) {
          this.reservations.delete(key);
          await this.change(record.intentId, child.childId, {
            stage: "rejected",
            status: "failed",
            paymentState: "unpaid",
            submittedAt: null,
            completedAt: this.at(),
            error: fallbackError("input", "\u0418\u0441\u0445\u043E\u0434\u043D\u044B\u0439 \u0441\u043D\u0438\u043C\u043E\u043A \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0441\u044F \u2014 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0430 \u043D\u0435 \u043E\u043F\u043B\u0430\u0447\u0435\u043D\u0430.")
          });
          return null;
        }
        try {
          return { response: provider.send(prepared, captured) };
        } catch (error) {
          return { response: Promise.reject(error) };
        }
      });
      if (!sending) {
        return;
      }
      let submitted;
      try {
        submitted = await sending.response;
        if (!TASK_ID_RE.test(submitted.taskId) || submitted.taskType !== child.taskType) {
          throw new ProviderFailure(fallbackError("unknown", "\u041E\u0442\u0432\u0435\u0442 \u043D\u0435 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u043B \u043D\u043E\u043C\u0435\u0440 \u0437\u0430\u043A\u0430\u0437\u0430."), null);
        }
      } catch (error) {
        const failure = isProviderFailure(error) ? error : new ProviderFailure(fallbackError("network", "\u0418\u0441\u0445\u043E\u0434 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 \u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u0435\u043D."), null);
        if (failure.submitted !== false) {
          await this.change(record.intentId, child.childId, {
            stage: "unknown",
            status: "unknown",
            paymentState: "unknown",
            error: failure.error,
            waitReason: "\u0417\u0430\u043A\u0430\u0437 \u043C\u043E\u0433 \u0431\u044B\u0442\u044C \u043F\u0440\u0438\u043D\u044F\u0442 \u0438 \u043E\u043F\u043B\u0430\u0447\u0435\u043D."
          });
        } else {
          this.reservations.delete(key);
          const waiting = ["busy", "rate", "credits"].includes(failure.error.kind);
          await this.change(record.intentId, child.childId, {
            stage: waiting ? "prepared" : "rejected",
            status: waiting ? "waiting" : "failed",
            paymentState: "unpaid",
            error: failure.error,
            retryAt: waiting ? this.now() + (failure.error.retryAfterMs ?? 15e3) : null,
            completedAt: waiting ? null : this.at(),
            waitReason: waiting ? failure.error.message : null,
            ...failure.error.kind === "credits" ? { waitingSince: child.waitingSince ?? this.at() } : {}
          });
        }
        return;
      }
      await this.injectFault("after-send", record, child);
      await this.options.intents.update(record.intentId, (latest) => {
        const current = latest.children.find((item) => item.childId === child.childId);
        Object.assign(current, {
          stage: "accepted",
          status: "queued",
          taskId: submitted.taskId,
          taskType: submitted.taskType,
          error: null,
          retryAt: null,
          updatedAt: this.at()
        });
        latest.updatedAt = this.at();
      });
      await this.injectFault("after-task-id", record, child);
      await this.project(record.intentId);
      const held = this.reservations.get(key);
      if (held) {
        held.accepted = true;
      }
      this.broadcast("studio-changed", { intentId: record.intentId, modelId: record.modelId });
    } finally {
      await snapshots.close();
    }
  }
  /**
   * Цена waiting пересчитывается целиком для исходного списка children.
   * После изменения требуется новое нажатие даже если старая цена вернулась.
   */
  async priceCurrent(record, child, provider) {
    if (!this.priceMatches(record, child, provider)) {
      await this.change(record.intentId, child.childId, {
        confirmationExpired: true,
        waitReason: "price_changed",
        error: fallbackError("params", "\u0426\u0435\u043D\u0430 \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0430\u0441\u044C \u2014 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u043D\u043E\u0432\u044B\u0439 \u0440\u0430\u0441\u0447\u0451\u0442.")
      });
      return false;
    }
    return true;
  }
  /**
   * Последняя цена/нормализация проверяются синхронно после fsync submitting.
   * Новая версия каталога требует нового подтверждения, сохраняя replay старого UUID.
   */
  priceMatches(record, child, provider) {
    try {
      const quote2 = provider.quote(record.operation, record.values, record.context);
      const current = provider.quote(child.operation, child.values, record.context);
      const validation2 = provider.validate(child.operation, child.values, record.context);
      return quote2.total !== null && current.total !== null && Number.isFinite(quote2.total) && Number.isFinite(current.total) && current.total >= 0 && quote2.total >= 0 && Math.round(quote2.total * 100) === Math.round(record.confirmedPrice * 100) && Math.round(current.total * 100) === Math.round(child.estimated * 100) && requestFingerprint(quote2.unit) === requestFingerprint(record.unit) && validation2.errors.length === 0 && canonicalJson(validation2.values) === canonicalJson(child.values) && record.catalogVersion === requestFingerprint({
        fields: provider.operations(record.context),
        unit: quote2.unit
      });
    } catch {
      return false;
    }
  }
  /**
   * Poll разделён по provider/account, выдаёт не более 100 ID за вызов.
   * Смена доступа после ответа запрещает запись чужих результатов в старый intent.
   */
  async pollRecords(records) {
    for (const provider of this.providers.values()) {
      const captured = provider.snapshot?.();
      for (const record of records.filter((item) => item.provider === provider.id && item.accountKey !== captured?.accountKey)) {
        for (const child of record.children.filter((item) => item.stage === "accepted" || item.stage === "unknown")) {
          if (child.waitReason !== "\u0412\u0435\u0440\u043D\u0438\u0442\u0435 \u0434\u043E\u0441\u0442\u0443\u043F \u0438\u0441\u0445\u043E\u0434\u043D\u043E\u0433\u043E \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430.") {
            await this.isolate(() => this.change(record.intentId, child.childId, {
              waitReason: "\u0412\u0435\u0440\u043D\u0438\u0442\u0435 \u0434\u043E\u0441\u0442\u0443\u043F \u0438\u0441\u0445\u043E\u0434\u043D\u043E\u0433\u043E \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430."
            }));
          }
        }
      }
      const pairs = records.filter((record) => record.provider === provider.id && record.accountKey === captured?.accountKey).flatMap((record) => record.children.filter((child) => child.stage === "accepted" && child.taskId && child.remote?.state !== "success" && (child.retryAt === null || child.retryAt <= this.now())).map((child) => ({ record, child })));
      if (!captured || !provider.poll || !provider.isCurrent?.(captured)) {
        continue;
      }
      for (let offset = 0; offset < pairs.length; offset += 100) {
        const group = pairs.slice(offset, offset + 100);
        let response;
        try {
          response = await provider.poll(group.map(({ child }) => child.taskId), captured);
        } catch (error) {
          if (!provider.isCurrent?.(captured)) {
            continue;
          }
          const retry = isProviderFailure(error) ? error.error.retryAfterMs ?? 15e3 : 15e3;
          for (const { record, child } of group) {
            await this.isolate(() => this.change(record.intentId, child.childId, {
              retryAt: this.now() + retry,
              waitReason: "\u041D\u0435\u0442 \u0441\u0432\u044F\u0437\u0438 \u2014 \u043D\u0430\u0431\u043B\u044E\u0434\u0435\u043D\u0438\u0435 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u0441\u044F."
            }));
          }
          continue;
        }
        if (!provider.isCurrent?.(captured) || this.stopped) {
          continue;
        }
        for (const { record, child } of group) {
          const remote = response.tasks.find((item) => item.id === child.taskId);
          if (!remote || remote.type !== child.taskType) {
            await this.isolate(() => this.change(record.intentId, child.childId, {
              missedPolls: child.missedPolls + 1,
              retryAt: child.missedPolls >= 2 ? this.now() + 6e4 : null,
              waitReason: child.missedPolls >= 2 ? MISSING_TASK_WAIT_REASON : "\u0417\u0430\u043A\u0430\u0437 \u043F\u043E\u043A\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D; \u043F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0434\u043E\u0441\u0442\u0443\u043F."
            }));
            continue;
          }
          await this.isolate(() => this.observe(record, child, remote));
        }
      }
    }
  }
  /**
   * Success фиксирует списание до CDN, fail/refund только подтверждённый ответ.
   * Missing result у проверки не выдаёт ready без достоверного riggable.
   */
  async observe(record, child, remote) {
    const common = {
      remote,
      progress: remote.progress,
      etaSeconds: remote.etaSeconds,
      missedPolls: 0,
      retryAt: null,
      waitReason: null,
      error: null
    };
    if (remote.state === "success") {
      const check = record.operation === "rig-check";
      const valid = !check || typeof remote.extra.riggable === "boolean";
      const updated = await this.change(record.intentId, child.childId, {
        ...common,
        stage: check ? "done" : "accepted",
        status: check ? valid ? "ready" : "failed" : "downloading",
        actual: remote.cost,
        paymentState: child.estimated === 0 && !(remote.cost > 0) ? "free" : "charged",
        completedAt: check ? this.at() : null,
        error: valid ? null : fallbackError("unknown", "\u041F\u043E\u0441\u0442\u0430\u0432\u0449\u0438\u043A \u043D\u0435 \u0432\u0435\u0440\u043D\u0443\u043B \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438.")
      });
      this.reservations.delete(this.key(record.intentId, child.childId));
      this.refreshLease(updated, updated.children.find((item) => item.childId === child.childId));
      if (check) {
        await this.notify(record.intentId, child.childId);
      } else {
        this.enqueueDownload(record.intentId, child.childId);
      }
    } else if (["failed", "cancelled", "banned", "expired"].includes(remote.state)) {
      const refunded = remote.error?.message.includes("\u041A\u0440\u0435\u0434\u0438\u0442\u044B \u0432\u0435\u0440\u043D\u0443\u043B\u0438\u0441\u044C") === true;
      const updated = await this.change(record.intentId, child.childId, {
        ...common,
        stage: "done",
        status: "failed",
        completedAt: this.at(),
        actual: remote.cost,
        paymentState: refunded ? "refunded" : child.estimated === 0 && !(remote.cost > 0) ? "free" : remote.cost !== null ? "charged" : "unknown",
        error: remote.error ?? fallbackError("unknown", "\u041F\u043E\u0441\u0442\u0430\u0432\u0449\u0438\u043A \u0441\u043E\u043E\u0431\u0449\u0438\u043B \u043E\u0431 \u043E\u0442\u043A\u0430\u0437\u0435 \u0437\u0430\u0434\u0430\u0447\u0438.")
      });
      this.reservations.delete(this.key(record.intentId, child.childId));
      this.refreshLease(updated, updated.children.find((item) => item.childId === child.childId));
      await this.notify(record.intentId, child.childId);
    } else {
      await this.change(record.intentId, child.childId, {
        ...common,
        status: remote.state === "running" ? "running" : "queued"
      });
      this.broadcast("studio-progress", {
        intentId: record.intentId,
        childId: child.childId,
        modelId: record.modelId,
        versionId: child.version?.id ?? null,
        status: remote.state === "running" ? "running" : "queued",
        progress: remote.progress,
        etaSeconds: remote.etaSeconds
      });
    }
  }
  /**
   * History лишь предлагает кандидатов того же аккаунта/времени/типа.
   * Даже единственное совпадение не доказывает корреляцию с GrigDesk POST.
   */
  async findUnknown(records) {
    for (const provider of this.providers.values()) {
      const captured = provider.snapshot?.();
      const targets = records.filter((record) => record.provider === provider.id && record.accountKey === captured?.accountKey && record.children.some((child) => child.stage === "unknown" && (child.retryAt === null || child.retryAt <= this.now())));
      if (!targets.length || !captured || !provider.history || !provider.isCurrent?.(captured)) {
        continue;
      }
      let history;
      try {
        history = await provider.history(captured);
      } catch {
        continue;
      }
      if (!provider.isCurrent?.(captured) || this.stopped) {
        continue;
      }
      for (const record of targets) {
        for (const child of record.children.filter((item) => item.stage === "unknown")) {
          const start = Date.parse(child.submittedAt ?? record.createdAt) - 6e4;
          const candidates = history.filter((item) => item.type === child.taskType && item.createdAt !== null && Date.parse(item.createdAt) >= start && Date.parse(item.createdAt) <= start + 16 * 6e4).slice(0, 100).map((item) => ({ ...item }));
          await this.isolate(() => this.change(record.intentId, child.childId, {
            candidates,
            retryAt: this.now() + (this.now() - start > 10 * 6e4 ? 6e4 : 15e3)
          }));
        }
      }
    }
  }
  broadcast(name, data) {
    this.options.broadcast?.(name, { libraryId: this.options.library.libraryId, ...data });
  }
  /**
   * Флаг уведомления фиксируется до SSE: restart не повторяет terminal toast.
   * При разрыве доставки browser перечитает журнал через общую reconnect подписку.
   */
  async notify(intentId, childId) {
    const record = await this.options.intents.get(intentId);
    const child = record?.children.find((item) => item.childId === childId);
    if (!record || !child || child.notified || child.stage !== "done") {
      return;
    }
    await this.injectFault("after-done", record, child);
    await this.options.intents.update(intentId, (latest) => {
      latest.children.find((item) => item.childId === childId).notified = true;
    });
    await this.injectFault("after-notified", record, child);
    await this.terminalNotification(intentId, childId);
    this.broadcast("studio-changed", {
      intentId,
      childId,
      modelId: record.modelId,
      versionId: child.version?.id ?? null,
      status: child.status,
      terminal: true
    });
  }
  /**
   * Доставка UI уведомления не меняет durable финансовый исход задания.
   * При отказе live канала тот же исход восстановит snapshot из jobs.tasks.
   */
  async terminalNotification(intentId, childId) {
    try {
      await this.options.onTerminal?.(intentId, childId);
    } catch {
    }
  }
  /**
   * Очередь CDN дедуплицируется по intent/child и ограничена двумя потоками.
   * Tick продолжает poll, даже когда загрузка другой модели занимает минуты.
   */
  enqueueDownload(intentId, childId) {
    this.downloadQueue.enqueue(intentId, childId);
  }
  pumpDownloads() {
    this.downloadQueue.pump();
  }
  /**
   * Публикуются только полные required roles после подтверждения fd/SHA.
   * Remote success остаётся charged при ошибке CDN и разрешает free redownload.
   */
  downloadResult(intentId, childId) {
    return this.downloads.downloadResult(intentId, childId);
  }
  /**
   * Протухший CDN URL обновляется только бесплатным poll того же account/task.
   * Смена доступа не подменяет результаты и не вызывает нового POST.
   */
  refreshOutput(record, child, outputId) {
    return this.downloads.refreshOutput(record, child, outputId);
  }
  /**
   * Повтор публикации после сбоя JSON принимает лишь тот же SHA destination.
   * Orphan файл не обслуживается API до явной durable записи его manifest.
   */
  publishFile(record, child, source, name, role, id2) {
    return this.downloads.publishFile(record, child, source, name, role, id2);
  }
  /**
   * Локальное действие публикует результат из своей temporary папки и не
   * использует cloud submitting. Crash можно пересчитать без списания денег.
   */
  async runLocal(record, child, provider) {
    if (this.localActive || !child.version || !record.inputs[0]?.name) {
      return;
    }
    this.localActive = true;
    const outputDir = path14.join(this.options.intents.directory(record.intentId), "local", child.childId);
    try {
      await this.change(record.intentId, child.childId, { status: "running" });
      await ensureDirectory(this.options.library.dir, outputDir);
      await fs11.rm(path14.join(outputDir, "model.glb"), { force: true });
      const result = await provider.run({
        operation: child.operation,
        values: child.values,
        inputPath: this.options.intents.inputPath(record.intentId, record.inputs[0].name),
        context: record.context,
        outputDir,
        root: this.options.library.dir,
        signal: this.stopController.signal
      });
      if (this.stopped) {
        return;
      }
      for (const file of result.files) {
        await this.publishFile(record, child, path14.join(outputDir, file.name), file.name, file.role);
      }
      const main = result.files.find((file) => file.role === "model");
      const stats2 = main ? await inspectGlbFile(path14.join(outputDir, main.name), {
        ...this.options.library.analysis,
        root: this.options.library.dir,
        signal: this.stopController.signal
      }) : null;
      await this.options.library.updateVersion(record.modelId, child.version.id, {
        stats: stats2,
        label: result.label,
        kind: refineKind(child.version.kind, stats2)
      });
      const updated = await this.change(record.intentId, child.childId, {
        stage: "done",
        status: "ready",
        progress: 100,
        completedAt: this.at(),
        actual: 0,
        paymentState: "free"
      });
      this.refreshLease(updated, updated.children.find((item) => item.childId === child.childId));
      await this.notify(record.intentId, child.childId);
    } catch (error) {
      if (error instanceof InjectedCrash) {
        throw error;
      }
      if (!this.stopped) {
        await this.change(record.intentId, child.childId, {
          stage: "done",
          status: "failed",
          error: fallbackError("input", "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u0442\u044C GLB; \u0438\u0441\u0445\u043E\u0434\u043D\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0430."),
          paymentState: "free",
          completedAt: this.at()
        });
      }
    } finally {
      this.localActive = false;
      this.options.onIdle?.();
    }
  }
  /**
   * Recovery завершает initial проекции до допуска POST и консервативно
   * превращает durable submitting без ID в unknown без повторной отправки.
   */
  async resume() {
    await this.options.intents.load();
    const records = await this.options.intents.list();
    for (const record of records) {
      if (record.kind === "batch") {
        await this.batches.materializeBatch(record);
      }
      await this.materialize(record);
      for (const child of record.children) {
        if (child.stage === "submitting" && !child.taskId) {
          await this.change(record.intentId, child.childId, {
            stage: "unknown",
            status: "unknown",
            paymentState: "unknown",
            waitReason: "\u0417\u0430\u043A\u0430\u0437 \u043C\u043E\u0433 \u0431\u044B\u0442\u044C \u043F\u0440\u0438\u043D\u044F\u0442 \u0434\u043E \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A\u0430."
          }, (current) => current.stage === "submitting" && !current.taskId);
        }
      }
      await this.project(record.intentId);
    }
    this.rebuildReservations(await this.options.intents.list());
    this.wake();
  }
  /**
   * Получение UUID не разрешает inputs заново и не проверяет текущую цену.
   * Library admission проверяется прежде чтения независимого durable журнала.
   */
  async job(id2, libraryId = this.options.library.libraryId) {
    this.admission.capture(libraryId);
    const record = await this.options.intents.get(id2, libraryId);
    if (!record) {
      throw new JobError("intent_not_found");
    }
    return jobProjection(record, this.options.library, this.options.intents);
  }
  /**
   * Разбор unknown связывает выбранный человеком ID под общим lock аккаунта.
   * Бесплатный poll подтверждает тип и доступ; второй child не присваивает тот же ID.
   */
  async reconcile(intentId, childId, input2) {
    const token = this.admission.capture(input2.libraryId);
    const record = await this.options.intents.get(intentId, input2.libraryId);
    const child = record?.children.find((item) => item.childId === childId);
    const provider = record ? this.providers.get(record.provider) : null;
    const captured = provider?.snapshot?.();
    if (!record) {
      throw new JobError("intent_not_found");
    }
    if (!child) {
      throw new JobError("child_not_found");
    }
    if (!record || !child || !["unknown", "unresolved"].includes(child.stage) || !TASK_ID_RE.test(input2.taskId) || !captured || captured.accountKey !== record.accountKey) {
      throw new JobError("reconcile_unavailable");
    }
    const response = await provider.poll([input2.taskId], captured);
    const remote = response.tasks.find((item) => item.id === input2.taskId);
    if (!remote || remote.type !== child.taskType || !provider.isCurrent?.(captured)) {
      throw new JobError("reconcile_unavailable");
    }
    await this.admission.locked(async () => {
      if (!this.admission.current(token) || !provider.isCurrent?.(captured)) {
        throw new JobError("admission_changed");
      }
      const records = await this.options.intents.list();
      const latest = records.find((item) => item.intentId === intentId);
      const current = latest.children.find((item) => item.childId === childId);
      if (current.taskId === input2.taskId && ["accepted", "done"].includes(current.stage)) {
        return;
      }
      if (!["unknown", "unresolved"].includes(current.stage)) {
        throw new JobError("reconcile_unavailable");
      }
      if (records.some((item) => item.provider === record.provider && item.accountKey === record.accountKey && item.children.some((candidate) => candidate.taskId === input2.taskId && (item.intentId !== intentId || candidate.childId !== childId)))) {
        throw new JobError("task_already_linked");
      }
      await this.change(intentId, childId, {
        stage: "accepted",
        status: "queued",
        taskId: input2.taskId,
        retryAt: null,
        waitReason: null,
        error: null,
        remote: null,
        completedAt: null,
        notified: false,
        paymentState: "reserved"
      });
    });
    this.wake();
    return this.job(intentId, input2.libraryId);
  }
  /**
   * Close не отменяет задачу у provider и не обещает refund. Tombstone и unknown
   * расход сохраняются; поздний явный reconcile ещё может уточнить исход.
   */
  async closeUnknown(intentId, childId, libraryId) {
    const token = this.admission.capture(libraryId);
    await this.admission.locked(async () => {
      if (!this.admission.current(token)) {
        throw new JobError("admission_changed");
      }
      const record = await this.options.intents.get(intentId, libraryId);
      const child = record?.children.find((item) => item.childId === childId);
      if (!record) {
        throw new JobError("intent_not_found");
      }
      if (!child) {
        throw new JobError("child_not_found");
      }
      const missingAccepted = child.stage === "accepted" && child.missedPolls >= 3;
      if (child.stage !== "unknown" && child.stage !== "prepared" && !missingAccepted) {
        throw new JobError("close_unknown_unavailable");
      }
      if (child.stage === "prepared") {
        const cancelled = await this.change(intentId, childId, {
          stage: "rejected",
          status: "failed",
          paymentState: "unpaid",
          retryAt: null,
          waitingSince: null,
          completedAt: this.at(),
          waitReason: "\u041E\u0442\u043C\u0435\u043D\u0435\u043D\u043E \u0434\u043E \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438: \u043E\u043F\u043B\u0430\u0442\u044B \u043D\u0435 \u0431\u044B\u043B\u043E."
        });
        this.reservations.delete(this.key(intentId, childId));
        this.refreshLease(cancelled, cancelled.children.find((item) => item.childId === childId));
      } else {
        const updated = await this.change(intentId, childId, {
          stage: "unresolved",
          status: "unresolved",
          paymentState: "unknown",
          retryAt: null,
          completedAt: this.at(),
          waitReason: "\u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u043F\u0440\u0435\u043A\u0440\u0430\u0449\u0435\u043D\u043E. \u0417\u0430\u043A\u0430\u0437 \u043C\u043E\u0433 \u0431\u044B\u0442\u044C \u043F\u0440\u0438\u043D\u044F\u0442 \u0438 \u043E\u043F\u043B\u0430\u0447\u0435\u043D; \u044D\u0442\u043E \u043D\u0435 \u043E\u0442\u043C\u0435\u043D\u0430 \u0443 \u043F\u043E\u0441\u0442\u0430\u0432\u0449\u0438\u043A\u0430."
        });
        this.reservations.delete(this.key(intentId, childId));
        this.refreshLease(updated, updated.children.find((item) => item.childId === childId));
        if (record.batchParent) {
          const parent = await this.options.intents.get(record.batchParent);
          for (const row of parent?.batch?.rows ?? []) {
            const sibling = await this.options.intents.get(row.intentId);
            for (const pending of sibling?.children ?? []) {
              if (pending.stage === "prepared") {
                await this.change(sibling.intentId, pending.childId, {
                  stage: "rejected",
                  status: "failed",
                  paymentState: "unpaid",
                  waitReason: "\u041D\u0435\u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430 \u0437\u0430\u043A\u0440\u044B\u0442\u0430 \u043F\u0440\u0438 \u043F\u0440\u0435\u043A\u0440\u0430\u0449\u0435\u043D\u0438\u0438 \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u044F \u043F\u0430\u0447\u043A\u0438.",
                  completedAt: this.at()
                });
              }
            }
          }
        }
      }
    });
    return this.job(intentId, libraryId);
  }
  /**
   * Retry создаёт новое durable намерение и сестру только для доказанного отказа.
   * Исходные snapshots копируются в новый UUID, новый quote подтверждается отдельно.
   */
  async retry(intentId, childId, input2) {
    this.admission.capture(input2.libraryId);
    const record = await this.options.intents.get(intentId, input2.libraryId);
    const child = record?.children.find((item) => item.childId === childId);
    if (!record || !child) {
      throw new JobError("retry_unavailable");
    }
    const source = record.request;
    const request2 = {
      ...source,
      libraryId: input2.libraryId,
      idempotencyKey: input2.idempotencyKey,
      expectedPrice: input2.expectedPrice,
      values: child.values,
      uploads: void 0,
      modelId: record.modelId,
      versionId: record.parentVersionId ?? void 0
    };
    const retrySelector = async () => {
      await withPathLock(`studio3d:gc:${this.options.library.dir}:${record.intentId}`, async () => {
        if (!(await retryInfo(record, child, this.options.library, this.options.intents)).available) {
          throw new JobError("retry_unavailable");
        }
        this.snapshotLeases.set(record.intentId, (this.snapshotLeases.get(record.intentId) ?? 0) + 1);
      });
      return {
        context: record.context,
        version: child.version,
        inputs: record.inputs.map((snapshot2) => ({
          role: snapshot2.role,
          native: snapshot2.native,
          file: snapshot2.name ? {
            path: this.options.intents.inputPath(intentId, snapshot2.name),
            name: snapshot2.name,
            root: this.options.library.dir
          } : null
        })),
        release: () => {
          const count = (this.snapshotLeases.get(record.intentId) ?? 1) - 1;
          if (count > 0) {
            this.snapshotLeases.set(record.intentId, count);
          } else {
            this.snapshotLeases.delete(record.intentId);
          }
        }
      };
    };
    const result = await this.runSelected(request2, retrySelector);
    if (child.stage === "prepared" && child.confirmationExpired) {
      await this.admission.locked(async () => {
        const latest = await this.options.intents.get(intentId);
        const current = latest?.children.find((item) => item.childId === childId);
        if (current?.stage === "prepared") {
          await this.change(intentId, childId, {
            stage: "rejected",
            status: "failed",
            paymentState: "unpaid",
            completedAt: this.at(),
            waitReason: "\u041D\u043E\u0432\u0430\u044F \u0446\u0435\u043D\u0430 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0430 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u044B\u043C \u0437\u0430\u043A\u0430\u0437\u043E\u043C; \u044D\u0442\u0430 \u043F\u043E\u0437\u0438\u0446\u0438\u044F \u043D\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0430."
          });
        }
      });
    }
    return result;
  }
  /**
   * Free redownload сохраняет task ID/расход и повторяет только CDN GET.
   * Обычный paid retry для этого состояния недоступен.
   */
  async redownload(intentId, childId, libraryId) {
    this.admission.capture(libraryId);
    const record = await this.options.intents.get(intentId, libraryId);
    const child = record?.children.find((item) => item.childId === childId);
    if (!record || !child || child.remote?.state !== "success" || child.status !== "failed") {
      throw new JobError("redownload_unavailable");
    }
    await this.change(intentId, childId, {
      status: "downloading",
      completedAt: null,
      error: null
    });
    this.enqueueDownload(intentId, childId);
    this.pumpDownloads();
    return this.job(intentId, libraryId);
  }
  /**
   * Расходы вычисляются по постоянному журналу, не по существующим моделям.
   * Дата фильтрует время принятия; estimated/refund/unknown остаются отдельными.
   */
  async spending(from = -Infinity, to = Infinity) {
    const records = await this.options.intents.list();
    return spendingFor(records.filter((record) => Date.parse(record.createdAt) >= from && Date.parse(record.createdAt) <= to).flatMap((record) => record.children.map((child) => ({
      provider: record.provider,
      cost: {
        estimated: child.estimated,
        actual: child.actual,
        unit: record.unit,
        free: child.paymentState === "free",
        state: child.paymentState
      }
    }))));
  }
  /**
   * Строки задач читаются из постоянного журнала и адресуются childId.
   * Удаление model projection не стирает финансовый или неизвестный исход.
   */
  async tasks() {
    const records = await this.options.intents.list();
    const rows2 = [];
    for (const record of records) {
      for (const child of record.children) {
        rows2.push(await taskProjection(record, child, this.options.library, this.options.intents));
      }
    }
    return rows2.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }
  /**
   * История списаний связывается только по exact task/provider/captured account.
   * Durable actual предшествует проекции; unknown без taskId не получает догадку.
   */
  async observeUsage(providerId, captured, usages) {
    const provider = this.providers.get(providerId);
    if (this.stopped || !provider?.isCurrent?.(captured)) {
      return;
    }
    const known = new Map(usages.filter((usage) => usage.credits !== null && Number.isFinite(usage.credits) && usage.credits >= 0).map((usage) => [usage.taskId, usage]));
    for (const record of await this.options.intents.list()) {
      if (record.kind !== "run" || record.provider !== providerId || record.accountKey !== captured.accountKey) {
        continue;
      }
      for (const child of record.children) {
        const usage = child.taskId ? known.get(child.taskId) : null;
        if (!usage || usage.type !== child.taskType || this.stopped || !provider.isCurrent?.(captured)) {
          continue;
        }
        if (child.actual === usage.credits && child.actualSource === "usage" && child.chargedAt) {
          continue;
        }
        await this.change(record.intentId, child.childId, {
          actual: usage.credits,
          actualSource: "usage",
          chargedAt: usage.createdAt ?? child.chargedAt ?? this.at(),
          paymentState: child.paymentState === "refunded" ? "refunded" : child.estimated === 0 && usage.credits === 0 ? "free" : "charged"
        });
      }
    }
  }
  /**
   * Все строки считаются и проверяются до подготовки batch. Сумма имеет одну
   * единицу; смешанные валюты не превращаются в общий итог подтверждения.
   */
  quoteBatch(input2) {
    return this.batches.quoteBatch(input2);
  }
  /**
   * Batch replay проверяет исходный fingerprint до текущего каталога. Новый
   * batch проверяет весь snapshot и сохраняет parent перед всеми row intents.
   */
  async runBatch(input2) {
    this.admission.capture(input2.libraryId);
    if (Object.keys(input2).some((key) => ![
      "libraryId",
      "idempotencyKey",
      "snapshot",
      "snapshotHash"
    ].includes(key)) || !LIBRARY_UUID_RE.test(input2.idempotencyKey)) {
      throw new JobError("invalid_batch");
    }
    const fingerprint = requestFingerprint(input2);
    const active = this.inflightBatches.get(input2.idempotencyKey);
    if (this.inflight.has(input2.idempotencyKey)) {
      throw new JobError("idempotency_conflict");
    }
    if (active) {
      if (active.fingerprint !== fingerprint) {
        throw new JobError("idempotency_conflict");
      }
      return active.promise;
    }
    const release = this.admission.lease();
    const promise = this.batches.acceptBatch(input2, fingerprint).finally(() => {
      this.inflightBatches.delete(input2.idempotencyKey);
      release();
    });
    this.inflightBatches.set(input2.idempotencyKey, { fingerprint, promise });
    return promise;
  }
  /**
   * Статус каждой строки берётся с сервера; родительский снимок не теряется
   * при reload, а успешно оплаченная строка никогда не отправляется снова.
   */
  batch(intentId, libraryId = this.options.library.libraryId) {
    return this.batches.batch(intentId, libraryId);
  }
  /**
   * GC удаляет лишь terminal snapshots после семи суток и uploads после суток.
   * Активные/unknown заказы и lease повторного copy сохраняют свои входы.
   */
  async cleanup() {
    const { library, intents } = this.options;
    const records = await intents.list();
    for (const record of records) {
      if (!record.children.length || this.snapshotLeases.has(record.intentId) || record.children.some((child) => ACTIVE_STATUSES.includes(child.status)) || record.children.some((child) => !child.completedAt || this.now() - Date.parse(child.completedAt) < 7 * 864e5)) {
        continue;
      }
      await withPathLock(`studio3d:gc:${library.dir}:${record.intentId}`, async () => {
        if (this.snapshotLeases.has(record.intentId)) {
          return;
        }
        const current = await intents.get(record.intentId);
        if (current?.children.some((child) => ACTIVE_STATUSES.includes(child.status))) {
          return;
        }
        const pinned = await pinDirectory(library.dir, intents.directory(record.intentId));
        try {
          for (const name of ["inputs", "downloads", "local"]) {
            await pinned.verify();
            await fs11.rm(pinned.child(name), { recursive: true, force: true });
          }
          await pinned.verify();
          await pinned.handle.sync();
        } finally {
          await pinned.close();
        }
      });
    }
    await library.cleanUploads(864e5);
  }
  /**
   * Проверка busy включает отсутствие версий у rig-check и отдельные downloads.
   * Pending lease допуска защищает библиотеку во время acceptance copy.
   */
  async busy() {
    return this.ticking !== null || this.admission.pendingCount() > 0 || this.localActive || this.downloadQueue.activeCount() > 0 || (await this.options.intents.list()).some((record) => record.children.some((child) => ACTIVE_STATUSES.includes(child.status)));
  }
  /**
   * Тесты/закрытие могут дождаться своей download очереди без удержания poll lock.
   * Сетевой tick не вызывает это ожидание и остаётся независимым от CDN.
   */
  settle() {
    return this.downloadQueue.settle();
  }
  /**
   * Stop прекращает новые sends и таймер, затем ждёт только собственную работу.
   * Durable записи остаются для resume; library owner закрывает lifecycle позже.
   */
  stop() {
    this.stopping ??= this.performStop();
    return this.stopping;
  }
  /**
   * Один barrier разделяется повторными stop, чтобы старый экземпляр не
   * отменял чтения нового worker через общий capability после закрытия.
   */
  async performStop() {
    this.stopped = true;
    this.stopController.abort();
    for (const provider of this.providers.values()) {
      provider.cancelReads?.();
    }
    if (this.timer !== null) {
      if (this.options.clearTimer) {
        this.options.clearTimer(this.timer);
      } else {
        clearTimeout(this.timer);
      }
    }
    this.timer = null;
    this.downloadQueue.clearWaiting();
    await this.ticking;
    await this.downloadQueue.waitActive();
    for (const release of this.leases.values()) {
      release();
    }
    this.leases.clear();
  }
};
function createJobs(options) {
  return new Jobs(options);
}

// src/lib/studio3d/importer.ts
import { promises as fs12 } from "node:fs";
import path15 from "node:path";
import { isDeepStrictEqual as isDeepStrictEqual3 } from "node:util";
var EXCLUDED = /* @__PURE__ */ new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  "venv",
  ".venv",
  "__pycache__",
  ".cache",
  "chats",
  "telegram",
  "github",
  "credentials",
  "credential",
  ".codex",
  ".claude",
  ".agents",
  ".aws",
  ".ssh",
  ".tripo",
  ".state",
  "conversations",
  "sessions"
]);
var MODELS = /* @__PURE__ */ new Set([".glb", ".fbx", ".obj", ".stl", ".splat"]);
var IMAGES = /* @__PURE__ */ new Set([".png", ".jpg", ".jpeg", ".webp"]);
var VIEWS = ["front", "left", "back", "right"];
var TASK_ID = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i;
function importName(directory) {
  const name = path15.basename(directory).replace(/-[a-f0-9]{8}$/i, "");
  const generic = /^(model|tripo|out|high|low|rig|tripo-out|out-.+)$/i.test(name);
  let parent = path15.dirname(directory);
  while (/^(tripo|out|tripo-out|out-.+)$/i.test(path15.basename(parent)) && path15.dirname(parent) !== parent) {
    parent = path15.dirname(parent);
  }
  return generic ? `${path15.basename(parent)} \xB7 ${name}` : name;
}
function createImporter(options) {
  return new Importer(options);
}
var Importer = class {
  options;
  providers;
  index = null;
  stopped = false;
  abort = new AbortController();
  constructor(options) {
    this.options = options;
    this.providers = new Map(options.providers.map((provider) => [provider.id, provider]));
  }
  now() {
    return (this.options.now ?? Date.now)();
  }
  enabled() {
    return !this.stopped && (this.options.enabled?.() ?? true);
  }
  key(provider, accountKey, taskId) {
    return JSON.stringify([provider, accountKey, taskId]);
  }
  /**
   * Единый lock покрывает scan, history и ручной import, включая durable index.
   * Одновременный источник дополняет одну задачу, не выделяет вторую модель.
   */
  locked(action) {
    return withPathLock(`${this.options.library.dir}:importer`, async () => {
      if (!this.enabled()) {
        throw new Error("plugin_disabled");
      }
      await this.load();
      return action();
    });
  }
  /**
   * Индекс имеет лимит и закрытый корневой контракт; записи проверяются заново.
   * Диск не может добавить provider, task ID или файловый root вне текущего scope.
   */
  async load() {
    if (this.index) {
      return;
    }
    const library = this.options.library;
    const raw = await readJson(
      library.dir,
      path15.join(library.dir, ".jobs", "imports-index.json"),
      16 * 1024 * 1024
    ).catch((error) => {
      if (error.code === "ENOENT") {
        return null;
      }
      throw error;
    });
    if (raw === null) {
      this.index = {
        schema: 1,
        libraryId: library.libraryId,
        observations: [],
        historyPartial: true,
        historyError: null
      };
      return;
    }
    const data = raw;
    if (!data || data.schema !== 1 || data.libraryId !== library.libraryId || Object.keys(data).some((key) => ![
      "schema",
      "libraryId",
      "observations",
      "historyPartial",
      "historyError",
      "diskScanned"
    ].includes(key)) || !Array.isArray(data.observations) || data.observations.length > 1e4 || typeof data.historyPartial !== "boolean" || data.historyError !== null && typeof data.historyError !== "string" || data.diskScanned !== void 0 && typeof data.diskScanned !== "boolean") {
      throw new Error("invalid_import_index");
    }
    const keys = /* @__PURE__ */ new Set();
    for (const item of data.observations) {
      if (!this.providers.has(item.provider) || !TASK_ID.test(item.record?.taskId) || item.key !== this.key(item.provider, item.accountKey, item.record.taskId) || keys.has(item.key) || !Array.isArray(item.assets) || item.assets.length > 128 || !Array.isArray(item.obsolete) || item.obsolete.length > 128 || typeof item.tombstone !== "boolean" || typeof item.nativeVerified !== "boolean" || !["raw", "cli"].includes(item.record.source)) {
        throw new Error("invalid_import_index");
      }
      parseStudio3d.values(item.record.params);
      parseStudio3d.unit(item.unit);
      for (const asset of item.assets) {
        if (!isSafeName(asset.name) || typeof asset.root !== "string" || typeof asset.source !== "string" || path15.dirname(asset.source) === asset.source || !["model", "image", "preview", ...VIEWS].includes(asset.role)) {
          throw new Error("invalid_import_index");
        }
      }
      keys.add(item.key);
    }
    this.index = data;
  }
  /**
   * Публикуется весь накопленный снимок с fsync; короткий API ответ не удаляет историю.
   * Сбой записи виден caller-у и не объявляет импорт завершённым.
   */
  async persist() {
    if (Buffer.byteLength(JSON.stringify(this.index)) > 16 * 1024 * 1024) {
      throw new Error("import_index_limit");
    }
    await this.options.library.persist(
      path15.join(this.options.library.dir, ".jobs", "imports-index.json"),
      this.index
    );
  }
  /**
   * Realpath только у доверенного корня; вложенные ссылки обход не разыменовывает.
   * Повторные корни и сама библиотека исключаются до чтения task.json.
   */
  async roots() {
    const result = /* @__PURE__ */ new Set();
    for (const root of await this.options.roots()) {
      const canonical = await fs12.realpath(root).catch(() => null);
      if (canonical && canonical !== this.options.library.dir) {
        result.add(canonical);
      }
    }
    return [...result];
  }
  /**
   * Файлы выбираются по роли и расширению, не по URL или произвольному CLI path.
   * Только обычные соседние файлы с безопасными именами могут стать copy source.
   */
  async assets(root, directory, record) {
    const entries = await fs12.readdir(directory, { withFileTypes: true });
    const files = entries.filter((entry) => entry.isFile() && isExternalName(entry.name)).map((entry) => entry.name).sort();
    const operation = this.providers.get(this.findProvider(record))?.taskOperation?.(record.type);
    const kind = operation ? operationSpec(operation)?.output : "model";
    const result = [];
    const add = (name, role) => {
      if (name && !result.some((asset) => asset.name === name)) {
        result.push({
          root,
          source: path15.join(directory, name),
          name: isSafeName(name) ? name : `${role}${path15.extname(name).toLowerCase()}`,
          role
        });
      }
    };
    if (kind === "views") {
      for (const view of VIEWS) {
        add(files.find((name) => name.startsWith(`${view}_view.`) && IMAGES.has(path15.extname(name).toLowerCase())), view);
      }
    } else if (kind === "image") {
      add(files.find((name) => IMAGES.has(path15.extname(name).toLowerCase())), "image");
    } else {
      const model = files.find((name) => /^(model|pbr_model)\./.test(name) && MODELS.has(path15.extname(name).toLowerCase())) ?? files.find((name) => MODELS.has(path15.extname(name).toLowerCase()));
      add(model, "model");
    }
    add(files.find((name) => /^(preview|rendered_image)\./.test(name) && IMAGES.has(path15.extname(name).toLowerCase())) ?? files.find((name) => IMAGES.has(path15.extname(name).toLowerCase())), "preview");
    return result;
  }
  findProvider(record) {
    return [...this.providers.values()].find((provider) => provider.taskOperation?.(record.type))?.id ?? "";
  }
  /**
   * Disk provenance без аккаунта остаётся непроверенным даже при текущем ключе.
   * Совпавшее наблюдение истории дополняет расход, но не предоставляет native права.
   */
  observe(provider, record, accountKey, name, assets) {
    const list = this.index.observations;
    let item = list.find((entry) => entry.provider === provider.id && entry.record.taskId === record.taskId && (entry.accountKey === accountKey || entry.accountKey === null || accountKey === null));
    if (!item) {
      if (list.length >= 1e4) {
        throw new Error("import_index_limit");
      }
      item = {
        key: this.key(provider.id, accountKey, record.taskId),
        provider: provider.id,
        accountKey,
        nativeVerified: accountKey !== null,
        unit: provider.unit,
        record,
        usage: null,
        name,
        assets: [],
        model: null,
        version: null,
        modelId: null,
        versionId: null,
        tombstone: false,
        label: null,
        obsolete: []
      };
      list.push(item);
    } else if (record.source === "cli" || assets.length > 0 || item.record.status === "unknown") {
      item.record = record;
    }
    if (assets.length > 0) {
      const existingDepth = Math.max(0, ...item.assets.map((asset) => asset.source.split(path15.sep).length));
      const depth = Math.max(...assets.map((asset) => asset.source.split(path15.sep).length));
      if (depth > existingDepth) {
        item.name = name;
      }
      for (const asset of assets) {
        if (!item.assets.some((current) => current.source === asset.source)) {
          item.assets.push(asset);
        }
      }
    }
    return item;
  }
  /**
   * Скан имеет общий deadline и отдельный бюджет каждого корня. Он читает только
   * task.json ≤1 МиБ, собирает все записи до построения родства, причины partial явные.
   */
  async scan({ automatic = false } = {}) {
    return this.locked(async () => {
      if (automatic && this.index.diskScanned) {
        return parseStudio3d.scan({
          libraryId: this.options.library.libraryId,
          found: 0,
          imported: 0,
          skipped: 0,
          partial: false,
          reasons: []
        });
      }
      const roots = await this.roots();
      const deadline = this.now() + Math.min(2e4, this.options.limits?.deadlineMs ?? 2e4);
      const wallDeadline = Date.now() + Math.min(2e4, this.options.limits?.deadlineMs ?? 2e4);
      const reasons = [];
      let found = 0;
      let skipped = 0;
      const selected = /* @__PURE__ */ new Set();
      for (const root of roots) {
        let count = 0;
        const stack = [{ directory: root, depth: 0 }];
        while (stack.length > 0) {
          if (this.now() >= deadline || Date.now() >= wallDeadline || !this.enabled()) {
            reasons.push("\u0421\u043A\u0430\u043D \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D \u043F\u043E \u0441\u0440\u043E\u043A\u0443 \u0438\u043B\u0438 \u0432\u044B\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044E \u043F\u043B\u0430\u0433\u0438\u043D\u0430.");
            break;
          }
          const current = stack.pop();
          const entries = await fs12.readdir(current.directory, { withFileTypes: true }).catch(() => null);
          if (!entries) {
            reasons.push("\u0427\u0430\u0441\u0442\u044C \u043F\u0430\u043F\u043E\u043A \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430.");
            continue;
          }
          for (const entry of entries) {
            count += 1;
            if (count > Math.min(5e4, this.options.limits?.entries ?? 5e4)) {
              reasons.push("\u0414\u043E\u0441\u0442\u0438\u0433\u043D\u0443\u0442 \u043F\u0440\u0435\u0434\u0435\u043B \u0437\u0430\u043F\u0438\u0441\u0435\u0439 \u043A\u043E\u0440\u043D\u044F.");
              stack.length = 0;
              break;
            }
            const file = path15.join(current.directory, entry.name);
            if (entry.isDirectory() && !EXCLUDED.has(entry.name) && file !== this.options.library.dir && !(entry.name === "local" && path15.basename(current.directory) === "docs")) {
              if (current.depth < Math.min(8, this.options.limits?.depth ?? 8)) {
                stack.push({ directory: file, depth: current.depth + 1 });
              } else {
                reasons.push("\u0414\u043E\u0441\u0442\u0438\u0433\u043D\u0443\u0442 \u043F\u0440\u0435\u0434\u0435\u043B \u0433\u043B\u0443\u0431\u0438\u043D\u044B.");
              }
            }
            if (!entry.isFile() || entry.name !== "task.json") {
              continue;
            }
            try {
              const json = await readJson(root, file, 1024 * 1024);
              let recognized = false;
              for (const provider of this.providers.values()) {
                const record = provider.recognizeRecord?.(json);
                if (!record) {
                  continue;
                }
                const item = this.observe(
                  provider,
                  record,
                  null,
                  importName(current.directory),
                  await this.assets(root, current.directory, record)
                );
                selected.add(item.key);
                found += 1;
                recognized = true;
                break;
              }
              if (!recognized) {
                skipped += 1;
              }
            } catch {
              skipped += 1;
              reasons.push("\u0417\u0430\u043F\u0438\u0441\u044C \u0438\u043B\u0438 \u0430\u0441\u0441\u0435\u0442 \u043D\u0435 \u043F\u0440\u043E\u0448\u043B\u0438 \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0435 \u0447\u0442\u0435\u043D\u0438\u0435.");
            }
          }
        }
      }
      await this.persist();
      const imported = await this.importOrdered(selected, "import", false, reasons);
      skipped += this.index.observations.filter((item) => selected.has(item.key) && this.providers.get(item.provider)?.taskOperation?.(item.record.type) === "rig-check" && !this.parent(item)?.versionId).length;
      await this.cleanObsolete(reasons);
      this.index.diskScanned = true;
      await this.persist();
      return parseStudio3d.scan({
        libraryId: this.options.library.libraryId,
        found,
        imported,
        skipped,
        partial: reasons.length > 0,
        reasons: [...new Set(reasons)]
      });
    });
  }
  /**
   * Родитель обрабатывается первым независимо от даты. Цикл и отсутствующий parent
   * не замалчиваются; поздний parent переносит одну задачу, не создаёт второй identity.
   */
  async importOrdered(selected, origin, explicit, reasons) {
    const visiting = /* @__PURE__ */ new Set();
    const visited = /* @__PURE__ */ new Set();
    let imported = 0;
    const visit = async (item) => {
      if (visited.has(item.key)) {
        return;
      }
      if (visiting.has(item.key)) {
        reasons.push("\u0426\u0438\u043A\u043B \u043F\u0440\u043E\u0438\u0441\u0445\u043E\u0436\u0434\u0435\u043D\u0438\u044F \u0437\u0430\u0434\u0430\u0447\u0438: \u0441\u0432\u044F\u0437\u044C \u043D\u0435 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430.");
        return;
      }
      visiting.add(item.key);
      const parent = this.parent(item);
      if (parent) {
        await visit(parent);
      } else if (item.record.inputTaskId) {
        reasons.push("\u0420\u043E\u0434\u0438\u0442\u0435\u043B\u044C \u0435\u0449\u0451 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D; \u0437\u0430\u0434\u0430\u0447\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0430 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u043E.");
      }
      visiting.delete(item.key);
      visited.add(item.key);
      try {
        if (await this.importOne(item, origin, explicit, null, parent)) {
          imported += 1;
        }
      } catch {
        reasons.push("\u041E\u0434\u043D\u0430 \u0437\u0430\u0434\u0430\u0447\u0430 \u043D\u0435 \u0438\u043C\u043F\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0430; \u043E\u0441\u0442\u0430\u043B\u044C\u043D\u044B\u0435 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u043D\u044B.");
      }
    };
    for (const item of this.index.observations.filter((entry) => selected.has(entry.key))) {
      await visit(item);
    }
    return imported;
  }
  parent(item) {
    return this.index.observations.find((entry) => entry.provider === item.provider && entry.record.taskId === item.record.inputTaskId && (entry.accountKey === item.accountKey || entry.accountKey === null || item.accountKey === null)) ?? null;
  }
  /**
   * Tombstone выставляется только после известной опубликованной проекции.
   * Незавершённый planned template после crash materialize-ится с прежними ID.
   */
  async existing(item) {
    if (!item.modelId) {
      return null;
    }
    const entry = await this.options.library.readModel(item.modelId).catch((error) => {
      if (error.code === "ENOENT") {
        return null;
      }
      throw error;
    });
    if (!entry || !entry.versions.some((version2) => version2.id === item.versionId)) {
      item.tombstone = true;
    }
    return entry;
  }
  /**
   * Сначала durable план, затем materialize и независимые copy. Версия ready
   * требует model/image либо фронт и второй вид; preview не заменяет результат.
   */
  async importOne(item, origin, explicit, remote, parent = this.parent(item), captured) {
    const library = this.options.library;
    const provider = this.providers.get(item.provider);
    const operation = provider.taskOperation?.(item.record.type);
    if (!operation) {
      return false;
    }
    let entry = await this.existing(item);
    if (item.tombstone && !explicit) {
      return false;
    }
    if (operation === "rig-check") {
      const target = parent && await this.existing(parent);
      if (target && parent.versionId && item.record.rigResult) {
        await library.updateVersion(target.model.id, parent.versionId, {
          rigCheck: {
            status: "ready",
            riggable: item.record.rigResult.riggable,
            rigType: item.record.rigResult.rigType,
            at: item.record.completedAt ?? new Date(this.now()).toISOString(),
            jobId: item.record.taskId,
            childId: "import-check"
          }
        });
      }
      return false;
    }
    const parentEntry = parent && !parent.tombstone ? await this.existing(parent) : null;
    const parentVersionId = parentEntry ? parent.versionId : null;
    const relocating = entry && parentEntry && entry.model.id !== parentEntry.model.id;
    let created = !entry || Boolean(relocating);
    if (item.tombstone && explicit) {
      item.model = null;
      item.version = null;
      item.modelId = null;
      item.versionId = null;
      item.tombstone = false;
      entry = null;
      created = true;
    }
    if (relocating) {
      item.obsolete.push({
        modelId: item.modelId,
        versionId: item.versionId,
        model: item.model,
        preview: item.importedPreview ?? null
      });
      item.model = null;
      item.version = null;
      item.modelId = null;
      item.versionId = null;
      entry = null;
    }
    if (!item.version) {
      const spec = operationSpec(operation);
      const output = spec.output;
      const kind = output === "same" || output === "check" ? "model" : output;
      const model = parentEntry?.model ?? await library.planModel({ name: item.name, origin });
      const version3 = await library.planVersion(parentEntry ? model.id : model, {
        kind,
        operation,
        parent: parentVersionId,
        provider: provider.id,
        label: spec.label,
        status: "remote",
        task: {
          provider: provider.id,
          id: item.record.taskId,
          type: item.record.type
        },
        params: item.record.params,
        origin,
        accountKey: item.nativeVerified ? item.accountKey : null,
        createdAt: item.record.createdAt ?? new Date(this.now()).toISOString(),
        cost: {
          estimated: null,
          actual: item.usage?.credits ?? item.record.credits,
          free: false,
          unit: item.unit,
          state: (item.usage?.credits ?? item.record.credits) === null ? "unknown" : "charged"
        }
      });
      version3.createdAt = item.record.createdAt ?? version3.createdAt;
      item.model = model;
      item.version = version3;
      await this.persist();
    }
    if (!entry) {
      await library.materializeModel(item.model);
      await library.materializeVersion(item.model.id, item.version);
      item.modelId = item.model.id;
      item.versionId = item.version.id;
      await this.persist();
    }
    let version2 = (await library.readModel(item.modelId)).versions.find((v) => v.id === item.versionId);
    if (parentVersionId && parentEntry?.model.id === item.modelId && version2.parent !== parentVersionId) {
      version2 = await library.updateVersion(item.modelId, version2.id, { parent: parentVersionId });
    }
    const roots = await this.roots();
    const retained = [];
    const releases = [];
    try {
      for (const old of item.obsolete) {
        const previous = await library.readModel(old.modelId).catch(() => null);
        const source = previous?.versions.find((candidate) => candidate.id === old.versionId);
        if (!source) {
          continue;
        }
        releases.push(library.leaseVersion(old.modelId, old.versionId, `import-${version2.id}`));
        for (const file of source.files) {
          const opened = await library.openVersionFile(old.modelId, old.versionId, file.name);
          await opened.handle.close();
          retained.push({
            root: library.dir,
            source: await library.filePath(old.modelId, old.versionId, file.name),
            name: file.name,
            role: file.role
          });
        }
      }
      for (const asset of [...retained, ...item.assets]) {
        if (!retained.includes(asset) && !roots.includes(asset.root) || version2.files.some((file) => file.role === asset.role)) {
          continue;
        }
        try {
          await library.copyIn(item.modelId, version2.id, {
            sourceRoot: asset.root,
            source: asset.source,
            name: asset.name,
            role: asset.role,
            maxBytes: 150 * 1024 * 1024
          }).catch(async (error) => {
            if (error.code !== "exists") {
              throw error;
            }
            const source = await verifiedHash(asset.root, asset.source);
            await library.adoptVersionFile(
              item.modelId,
              version2.id,
              asset.name,
              source.sha256,
              { role: asset.role }
            );
          });
          version2 = (await library.readModel(item.modelId)).versions.find((v) => v.id === version2.id);
        } catch {
          item.label = "\u041E\u0434\u0438\u043D \u0438\u0437 \u0438\u0441\u0445\u043E\u0434\u043D\u044B\u0445 \u0444\u0430\u0439\u043B\u043E\u0432 \u0438\u0437\u043C\u0435\u043D\u0451\u043D \u0438\u043B\u0438 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D.";
        }
      }
    } finally {
      for (const release of releases) {
        release();
      }
    }
    if (!this.complete(version2) && remote?.state === "success") {
      await this.download(item, remote, captured);
      version2 = (await library.readModel(item.modelId)).versions.find((v) => v.id === version2.id);
    }
    if (this.complete(version2)) {
      const main = version2.files.find((file) => ["model", "image", "front"].includes(file.role));
      let stats2 = null;
      for (const file of version2.files.filter((file2) => ["model", "image", ...VIEWS].includes(file2.role))) {
        const source = await library.filePath(item.modelId, version2.id, file.name);
        if (file.role === "model") {
          const inspected = await inspectModel(library.dir, source, this.abort.signal, library.analysis);
          if (file.id === main.id) {
            stats2 = inspected;
          }
        } else {
          await inspectImage(library.dir, source, void 0, this.abort.signal);
        }
      }
      const kind = stats2 ? refineKind(version2.kind, stats2) : version2.kind;
      const views = VIEWS.filter((view) => version2.files.some((file) => file.role === view));
      version2 = await library.updateVersion(item.modelId, version2.id, {
        status: "ready",
        progress: 100,
        stats: stats2,
        kind,
        mainFileId: main.id,
        views,
        waitReason: null,
        error: null
      });
      if (!(await library.readModel(item.modelId)).model.mainVersion) {
        await library.updateModel(item.modelId, { mainVersion: version2.id });
      }
    } else {
      await library.updateVersion(item.modelId, version2.id, {
        status: "remote",
        waitReason: "\u041E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0444\u0430\u0439\u043B\u044B \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0430 \u0435\u0449\u0451 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u044B."
      });
    }
    if (item.importedPreview === void 0) {
      item.importedPreview = version2.files.find((file) => file.role === "preview")?.sha256 ?? null;
    }
    this.options.broadcast?.("studio-changed", {
      libraryId: library.libraryId,
      modelId: item.modelId,
      versionId: item.versionId,
      status: version2.status,
      at: new Date(this.now()).toISOString()
    });
    return created;
  }
  complete(version2) {
    if (version2.kind === "views") {
      return version2.files.some((file) => file.role === "front") && version2.files.filter((file) => VIEWS.includes(file.role)).length >= 2;
    }
    return version2.files.some((file) => file.role === (version2.kind === "image" ? "image" : "model"));
  }
  /**
   * Remote download использует тот же инъецированный bounded transport, что worker.
   * Директория закреплена fd, expiry URL обновляет только бесплатный poll того же task.
   */
  async download(item, remote, verifiedAccount) {
    const library = this.options.library;
    const provider = this.providers.get(item.provider);
    const captured = verifiedAccount ?? provider.snapshot?.();
    if (!captured || !verifiedAccount && captured.accountKey !== item.accountKey || !provider.isCurrent?.(captured)) {
      throw new Error("account_changed");
    }
    const directory = path15.join(library.dir, ".jobs", "imports", item.record.taskId);
    await ensureDirectory(library.dir, directory);
    const pinned = await pinDirectory(library.dir, directory);
    try {
      for (const output of remote.outputs) {
        if (!this.enabled() || !provider.isCurrent?.(captured)) {
          throw new Error("account_changed");
        }
        await pinned.verify();
        const version2 = (await library.readModel(item.modelId)).versions.find((entry) => entry.id === item.versionId);
        const registered = version2.files.find((file) => file.id === output.id || file.name === output.name && file.role === output.role);
        if (registered) {
          const existing = await library.openVersionFile(item.modelId, item.versionId, registered.name);
          await existing.handle.close();
          continue;
        }
        const target = pinned.child(output.name);
        await (this.options.download ?? downloadToFile)({
          url: output.url,
          dest: target,
          signal: this.abort.signal,
          refresh: async () => {
            const result = await provider.poll([remote.id], captured);
            const refreshed = result.tasks.find((task) => task.id === remote.id);
            const url = refreshed?.outputs.find((asset) => asset.id === output.id)?.url;
            if (!provider.isCurrent?.(captured) || !url) {
              throw new Error("account_changed");
            }
            return url;
          }
        });
        await pinned.verify();
        let name = output.name;
        if (!["model", "base-model", "file"].includes(output.role)) {
          const image = await inspectImage(
            library.dir,
            path15.join(directory, output.name),
            void 0,
            this.abort.signal
          );
          name = path15.basename(output.name, path15.extname(output.name)) + image.extension;
        }
        await library.copyIn(item.modelId, item.versionId, {
          sourceRoot: library.dir,
          source: path15.join(directory, output.name),
          name,
          role: output.role,
          id: output.id
        }).catch(async (error) => {
          if (error.code !== "exists") {
            throw error;
          }
          const downloaded = await verifiedHash(library.dir, path15.join(directory, output.name));
          await library.adoptVersionFile(
            item.modelId,
            item.versionId,
            name,
            downloaded.sha256,
            { role: output.role, id: output.id }
          );
        });
      }
    } finally {
      await pinned.handle.close();
    }
    const parent = await pinDirectory(library.dir, path15.dirname(directory));
    try {
      await parent.verify();
      await fs12.rm(parent.child(item.record.taskId), { recursive: true, force: true });
    } finally {
      await parent.close();
    }
  }
  /**
   * После переноса потомков удаляются старые импортные проекции. Неперемещённые
   * пользовательские дети удерживают прежнюю версию и явное предупреждение.
   */
  async cleanObsolete(reasons) {
    const library = this.options.library;
    for (const item of this.index.observations) {
      const current = item.modelId ? await library.readModel(item.modelId).catch(() => null) : null;
      const replacement = current?.versions.find((version2) => version2.id === item.versionId);
      if (replacement?.status !== "ready") {
        if (item.obsolete.length) {
          reasons.push("\u041F\u0440\u0435\u0436\u043D\u044F\u044F \u043F\u0440\u043E\u0435\u043A\u0446\u0438\u044F \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0430 \u0434\u043E \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u043D\u043E\u0432\u043E\u0439 \u043A\u043E\u043F\u0438\u0438.");
        }
        continue;
      }
      const retained = [];
      for (const old of item.obsolete.slice().reverse()) {
        try {
          const entry = await library.readModel(old.modelId);
          const fields = ["name", "notes", "tags", "category", "project"];
          const edited = !old.model || fields.some((field) => !isDeepStrictEqual3(entry.model[field], old.model[field])) || entry.versions.some((version2) => version2.savedTo.length) || (entry.versions.find((version2) => version2.id === old.versionId)?.files.find((file) => file.role === "preview")?.sha256 ?? null) !== (old.preview ?? null);
          if (edited) {
            retained.push(old);
            reasons.push("\u041F\u0440\u0435\u0436\u043D\u044F\u044F \u043C\u043E\u0434\u0435\u043B\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0430: \u0432 \u043D\u0435\u0439 \u0435\u0441\u0442\u044C \u043F\u0440\u0430\u0432\u043A\u0438 \u0447\u0435\u043B\u043E\u0432\u0435\u043A\u0430 \u0438\u043B\u0438 \u043F\u0440\u0435\u0432\u044C\u044E.");
            continue;
          }
          if (entry.versions.length === 1) {
            await library.deleteModel(old.modelId);
          } else {
            await library.deleteVersion(old.modelId, old.versionId);
          }
        } catch (error) {
          if (error.code !== "ENOENT") {
            retained.push(old);
            reasons.push("\u0421\u0442\u0430\u0440\u0443\u044E \u043F\u0440\u043E\u0435\u043A\u0446\u0438\u044E \u0443\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u044E\u0442 \u0435\u0451 \u043F\u043E\u0442\u043E\u043C\u043A\u0438 \u0438\u043B\u0438 \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435.");
          }
        }
      }
      item.obsolete = retained;
    }
  }
  /**
   * История накапливается по provider/account/task, известные заказы исключаются
   * из внешних. Смена ключа после await не смешивает ни строки, ни единицы расходов.
   */
  async syncHistory({ autoImport = false } = {}) {
    return this.locked(async () => {
      const errors = [];
      for (const provider of this.providers.values()) {
        const captured = provider.snapshot?.();
        if (!captured || !provider.history || !await provider.available()) {
          continue;
        }
        try {
          const usages = await provider.history(captured);
          if (!this.enabled() || !provider.isCurrent?.(captured)) {
            continue;
          }
          for (const usage of usages) {
            const record = {
              taskId: usage.taskId,
              type: usage.type,
              createdAt: usage.createdAt,
              completedAt: null,
              credits: usage.credits,
              prompt: null,
              inputTaskId: null,
              params: {},
              status: "unknown",
              rigResult: null,
              source: "raw"
            };
            const item = this.observe(
              provider,
              record,
              captured.accountKey,
              `\u0417\u0430\u043A\u0430\u0437 ${usage.taskId.slice(0, 8)}`,
              []
            );
            item.usage = usage;
          }
          await this.persist();
          await this.options.observeUsage?.(provider.id, captured, usages);
          if (autoImport) {
            const known = await this.knownTasks();
            const candidates = this.index.observations.filter((item) => item.provider === provider.id && item.accountKey === captured.accountKey && !item.tombstone && !known.has(item.key));
            for (let start = 0; start < candidates.length; start += 100) {
              const slice = candidates.slice(start, start + 100);
              const result = await provider.poll(slice.map((item) => item.record.taskId), captured);
              if (!this.enabled() || !provider.isCurrent?.(captured)) {
                break;
              }
              for (const task of result.tasks) {
                const item = slice.find((candidate) => candidate.record.taskId === task.id);
                await this.importRemote(item, task, captured, false).catch(() => {
                  item.label = "\u0424\u0430\u0439\u043B\u044B \u043D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0431\u0440\u0430\u0442\u044C. \u041C\u043E\u0436\u043D\u043E \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E.";
                });
              }
            }
          }
        } catch {
          errors.push(`\u0418\u0441\u0442\u043E\u0440\u0438\u044F ${provider.name} \u0432\u0440\u0435\u043C\u0435\u043D\u043D\u043E \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430.`);
        }
      }
      this.index.historyPartial = true;
      this.index.historyError = errors.join(" ") || null;
      await this.persist();
      return this.externalTasksUnlocked();
    });
  }
  /**
   * Poll даёт состояние и подтверждённые поля, не создаёт облачный заказ.
   * Проверки показываются в истории; expired не превращается в пустую ready модель.
   */
  async importRemote(item, task, captured, explicit) {
    const provider = this.providers.get(item.provider);
    if (!provider.isCurrent?.(captured) || task.id !== item.record.taskId || task.type !== item.record.type) {
      throw new Error("account_changed");
    }
    item.record.status = task.state;
    item.record.params = parseStudio3d.values(task.extra.params ?? item.record.params);
    item.record.inputTaskId = typeof task.extra.inputTaskId === "string" ? task.extra.inputTaskId : item.record.inputTaskId;
    item.record.createdAt = task.createdAt ?? item.record.createdAt;
    item.record.completedAt = task.completedAt ?? item.record.completedAt;
    if (task.state === "expired") {
      item.label = "Tripo \u0443\u0434\u0430\u043B\u0438\u043B \u0444\u0430\u0439\u043B\u044B \u044D\u0442\u043E\u0433\u043E \u0437\u0430\u043A\u0430\u0437\u0430.";
      return;
    }
    if (provider.taskOperation?.(task.type) === "rig-check") {
      item.label = "\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0441\u043A\u0435\u043B\u0435\u0442\u0430 \u2014 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u043E\u0439 \u043C\u043E\u0434\u0435\u043B\u0438 \u043D\u0435\u0442.";
      return;
    }
    if (task.state !== "success") {
      item.label = task.error?.message ?? "\u0417\u0430\u043A\u0430\u0437 \u0435\u0449\u0451 \u043D\u0435 \u0437\u0430\u0432\u0435\u0440\u0448\u0451\u043D.";
      return;
    }
    await this.importOne(item, "agent", explicit, task, this.parent(item), captured);
  }
  /**
   * Явный импорт может восстановить удалённую задачу; автоматический — нет.
   * Captured account обязан совпасть после бесплатного poll до публикации.
   */
  async importTask(providerId, taskId) {
    return this.locked(async () => {
      const provider = this.providers.get(providerId);
      const captured = provider?.snapshot?.();
      if (!provider?.poll || !captured || !TASK_ID.test(taskId)) {
        throw new Error("provider_unavailable");
      }
      const result = await provider.poll([taskId], captured);
      const task = result.tasks.find((entry) => entry.id === taskId);
      if (!task || !provider.isCurrent?.(captured)) {
        throw new Error("task_unavailable");
      }
      const item = this.observe(provider, {
        taskId,
        type: task.type,
        createdAt: task.createdAt,
        completedAt: task.completedAt,
        credits: task.cost,
        prompt: null,
        inputTaskId: null,
        params: {},
        status: task.state,
        rigResult: null,
        source: "raw"
      }, captured.accountKey, `\u0417\u0430\u043A\u0430\u0437 ${taskId.slice(0, 8)}`, []);
      await this.importRemote(item, task, captured, true);
      await this.persist();
      if (!item.modelId) {
        throw new Error("task_unavailable");
      }
      return { libraryId: this.options.library.libraryId, modelId: item.modelId };
    });
  }
  /**
   * Известные task IDs берутся и из моделей, и из постоянного журнала заказов.
   * Удалённая модель раздела не появляется заново через наблюдение истории.
   */
  async knownTasks() {
    const known = /* @__PURE__ */ new Set();
    for (const entry of (await this.options.library.listModels()).entries) {
      for (const version2 of entry.versions) {
        if (version2.task) {
          known.add(this.key(version2.task.provider, version2.accountKey, version2.task.id));
        }
      }
    }
    for (const intent of await this.options.intents?.list() ?? []) {
      for (const child of intent.children) {
        if (child.taskId) {
          known.add(this.key(intent.provider, intent.accountKey, child.taskId));
        }
      }
    }
    return known;
  }
  /**
   * Внешняя строка не включает accountKey, signed URL или путь к task.json.
   * Накопленные tombstones остаются для dedup, но не выдаются как новый заказ.
   */
  async externalTasksUnlocked() {
    const known = await this.knownTasks();
    for (const item of this.index.observations) {
      await this.existing(item);
    }
    return this.index.observations.filter((item) => item.usage && !item.modelId && !item.tombstone && this.providers.get(item.provider)?.snapshot?.()?.accountKey === item.accountKey && !known.has(item.key) && !known.has(this.key(item.provider, null, item.record.taskId))).map((item) => ({
      provider: item.provider,
      taskId: item.record.taskId,
      type: item.record.type,
      label: item.label ?? item.name,
      credits: item.usage?.credits ?? item.record.credits,
      createdAt: item.record.createdAt,
      modelId: null
    }));
  }
  async externalTasks() {
    return this.locked(() => this.externalTasksUnlocked());
  }
  /**
   * Неделя считается по уникальным известным задачам, отдельно по единицам.
   * Журнал раздела имеет приоритет над usage, короткая история всегда partial.
   */
  async week() {
    return this.locked(async () => {
      const cutoff = this.now() - 7 * 864e5;
      const latest = this.now();
      let partial = this.index.historyPartial;
      const intents = await this.options.intents?.list() ?? [];
      const own = new Set(intents.flatMap((intent) => intent.children.filter((child) => child.taskId).map((child) => this.key(intent.provider, intent.accountKey, child.taskId))));
      const ownUnknown = new Set(intents.flatMap((intent) => intent.children.filter((child) => child.taskId).map((child) => this.key(intent.provider, null, child.taskId))));
      const sectionLines = intents.flatMap((intent) => intent.children.filter((child) => {
        const at = child.chargedAt ?? child.completedAt ?? child.submittedAt ?? intent.createdAt;
        const when = Date.parse(at);
        if (!Number.isFinite(when)) {
          partial = true;
        }
        return when >= cutoff && when <= latest;
      }).map((child) => ({
        provider: intent.provider,
        cost: {
          estimated: child.estimated,
          actual: child.actual,
          free: intent.provider === "local" || child.paymentState === "free",
          unit: intent.unit,
          state: child.paymentState
        }
      })));
      const externalLines = [];
      for (const item of this.index.observations) {
        if (own.has(item.key) || item.accountKey === null && ownUnknown.has(item.key) || !item.usage && item.record.credits === null) {
          continue;
        }
        const at = item.usage?.createdAt ?? item.record.completedAt ?? item.record.createdAt;
        const when = at ? Date.parse(at) : NaN;
        if (!Number.isFinite(when)) {
          partial = true;
          continue;
        }
        if (when < cutoff || when > latest) {
          continue;
        }
        const actual = item.usage?.credits ?? item.record.credits;
        externalLines.push({
          provider: item.provider,
          cost: {
            estimated: null,
            actual,
            free: false,
            unit: item.unit,
            state: actual === null ? "unknown" : "charged"
          }
        });
      }
      const groupKey = (item) => JSON.stringify([item.provider, item.unit?.one, item.unit?.few, item.unit?.many]);
      const section = new Map(spendingFor(sectionLines).map((item) => [groupKey(item), item.actual]));
      const external = new Map(spendingFor(externalLines).map((item) => [groupKey(item), item.actual]));
      const reserved = /* @__PURE__ */ new Map();
      const lines = [...sectionLines, ...externalLines];
      for (const intent of intents) {
        const key = groupKey({ provider: intent.provider, unit: intent.unit });
        for (const child of intent.children) {
          if (!["submitting", "accepted", "unknown"].includes(child.stage) || child.remote?.state === "success" || intent.provider === "local" || child.paymentState === "free") {
            continue;
          }
          reserved.set(key, (reserved.get(key) || 0) + (child.actual ?? child.estimated));
          if (!section.has(key) && !external.has(key)) {
            lines.push({
              provider: intent.provider,
              cost: {
                estimated: null,
                actual: null,
                free: false,
                unit: intent.unit,
                state: "unpaid"
              }
            });
          }
        }
      }
      return {
        partial,
        groups: spendingFor(lines).map((item) => ({
          ...item,
          sectionActual: section.get(groupKey(item)) || 0,
          externalActual: external.get(groupKey(item)) || 0,
          reserved: reserved.get(groupKey(item)) || 0
        })),
        historyError: this.index.historyError
      };
    });
  }
  /**
   * Остановка отменяет только свои скачивания. Сохранившаяся запись и task ID
   * остаются доступны следующему lifecycle без новой платной отправки.
   */
  async stop() {
    this.stopped = true;
    this.abort.abort();
    await withPathLock(`${this.options.library.dir}:importer`, async () => {
    });
  }
};

// src/server/libraryOperations.ts
import { randomUUID as randomUUID5 } from "node:crypto";
import { promises as fs13 } from "node:fs";
import path16 from "node:path";

// src/server/errors.ts
function publicStudioError(error) {
  if (isProviderFailure(error)) {
    return { status: 502, body: {
      error: "provider_error",
      message: error.error.message,
      providerError: {
        kind: error.error.kind,
        message: error.error.message,
        detail: error.error.detail
      }
    } };
  }
  if (error instanceof StudioHttpError) {
    return { status: error.statusCode, body: {
      error: error.code,
      message: error.message,
      ...error.extra
    } };
  }
  const source = error && typeof error === "object" ? error : {};
  const code = source.code ?? "";
  const extra = {};
  if (error instanceof JobError && error.data && typeof error.data === "object") {
    const data = error.data;
    if (["price_changed", "price_unknown"].includes(code) && data.quote) {
      extra.quote = parseStudio3d.price(data.quote);
    }
    if (code === "validation_failed" && data.validation) {
      extra.validation = parseStudio3d.validation(data.validation);
    }
  }
  const conflicts = [
    "stale_library",
    "library_busy",
    "library_unavailable",
    "price_changed",
    "price_unknown",
    "idempotency_conflict",
    "provider_unavailable",
    "has_children",
    "main_version",
    "leased",
    "retry_unavailable",
    "task_already_linked",
    "account_changed",
    "not_unknown",
    "exists",
    "changed"
  ];
  if (conflicts.includes(code)) {
    return { status: 409, body: {
      error: code,
      message: code === "stale_library" ? "\u0411\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0430 \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0430\u0441\u044C. \u041E\u0431\u043D\u043E\u0432\u0438\u0442\u0435 \u0440\u0430\u0437\u0434\u0435\u043B." : code === "library_busy" ? "\u0414\u043E\u0436\u0434\u0438\u0442\u0435\u0441\u044C \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u0438\u044F \u0437\u0430\u0434\u0430\u043D\u0438\u0439 \u0438 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0439 \u0441 \u0444\u0430\u0439\u043B\u0430\u043C\u0438." : code === "price_changed" ? "\u0426\u0435\u043D\u0430 \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0430\u0441\u044C. \u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u043D\u043E\u0432\u044B\u0439 \u0440\u0430\u0441\u0447\u0451\u0442." : "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u0441\u0435\u0439\u0447\u0430\u0441 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E.",
      ...extra
    } };
  }
  if (code === "validation_failed") {
    return { status: 422, body: {
      error: code,
      message: "\u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B.",
      ...extra
    } };
  }
  if (code === "plugin_disabled") {
    return { status: 404, body: { error: code, message: "\u041F\u043B\u0430\u0433\u0438\u043D \xAB3D\xBB \u0432\u044B\u043A\u043B\u044E\u0447\u0435\u043D." } };
  }
  if ([
    "ENOENT",
    "file_not_found",
    "version_not_found",
    "job_not_found",
    "child_not_found",
    "intent_not_found"
  ].includes(code)) {
    return { status: 404, body: { error: "not_found", message: "\u041E\u0431\u044A\u0435\u043A\u0442 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D." } };
  }
  if (source.statusCode === 413) {
    return { status: 413, body: { error: "too_large", message: "\u0424\u0430\u0439\u043B \u043F\u0440\u0435\u0432\u044B\u0448\u0430\u0435\u0442 \u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0439 \u0440\u0430\u0437\u043C\u0435\u0440." } };
  }
  return { status: 400, body: {
    error: code && /^[a-z_]+$/.test(code) ? code : "invalid_request",
    message: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E \u0432\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u0437\u0430\u043F\u0440\u043E\u0441."
  } };
}

// src/server/libraryOperations.ts
function studioFileUrl(prefix, modelId, versionId, name) {
  return `${prefix}/files/${encodeURIComponent(modelId)}/${encodeURIComponent(versionId)}/${encodeURIComponent(name)}`;
}
function createLibraryOperations(context, options) {
  const { library, intents } = context;
  const fileUrl = (model, version3, name) => studioFileUrl(options.prefix, model, version3, name);
  const changed = (modelId, versionId = null, status = "ready") => {
    options.check();
    if (status === "deleted") {
      options.dismissModel?.(modelId);
    }
    options.broadcast?.("studio-changed", {
      libraryId: library.libraryId,
      modelId,
      versionId,
      status,
      at: (/* @__PURE__ */ new Date()).toISOString()
    });
  };
  const projection = async (modelId, version3) => {
    const record = version3.intentId ? await intents.get(version3.intentId) : null;
    const child = record?.children.find((item) => item.childId === version3.childId);
    const retry = record && child ? await retryInfo(record, child, library, intents) : { available: false, reason: null };
    return versionProjection(
      version3,
      library.libraryId,
      (name) => fileUrl(modelId, version3.id, name),
      retry
    );
  };
  const version2 = async (modelId, versionId) => {
    const entry = await library.readModel(modelId);
    const item = entry.versions.find((item2) => item2.id === versionId);
    if (!item) {
      throw new StudioHttpError(404, "version_not_found", "\u0412\u0435\u0440\u0441\u0438\u044F \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430.");
    }
    return item;
  };
  const detail = async (modelId) => {
    const entry = await library.readModel(modelId);
    return parseStudio3d.model({
      libraryId: library.libraryId,
      model: summarizeModel(entry.model, entry.versions, fileUrl),
      notes: entry.model.notes,
      versions: await Promise.all(entry.versions.map((item) => projection(modelId, item))),
      incoming: await library.incoming(modelId),
      modelDirectory: path16.join(library.dir, modelId),
      saveFolders: (await library.settings()).saveFolders
    });
  };
  const sourceFor = async (input2, modelId) => {
    if ([input2.uploadId, input2.path, input2.incoming].filter((value) => value !== void 0).length !== 1) {
      throw new StudioHttpError(400, "invalid_input", "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0440\u043E\u0432\u043D\u043E \u043E\u0434\u0438\u043D \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u0444\u0430\u0439\u043B\u0430.");
    }
    let release = () => {
    };
    try {
      if (input2.path) {
        const source = await context.files.openSource(input2.path, input2.scope ?? "");
        return { ...source, release };
      }
      let file;
      if (input2.uploadId) {
        if (!isSafeName(input2.uploadId)) {
          throw new StudioHttpError(400, "invalid_input", "\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u0430\u044F \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0430.");
        }
        release = library.leaseUpload(input2.uploadId, randomUUID5());
        const folder = path16.join(library.uploadsDir(), input2.uploadId);
        const upload2 = parseStudio3d.upload(await readJson(library.dir, path16.join(folder, "upload.json")));
        if (upload2.libraryId !== library.libraryId || upload2.uploadId !== input2.uploadId || !isSafeName(upload2.name) || upload2.kind !== "model") {
          throw new StudioHttpError(415, "unsupported_type", "\u0414\u043B\u044F \u043C\u043E\u0434\u0435\u043B\u0438 \u043D\u0443\u0436\u0435\u043D \u0441\u0430\u043C\u043E\u0441\u0442\u043E\u044F\u0442\u0435\u043B\u044C\u043D\u044B\u0439 3D-\u0444\u0430\u0439\u043B.");
        }
        file = path16.join(folder, upload2.name);
      } else {
        if (!modelId || !isExternalName(input2.incoming) || !(await library.incoming(modelId)).includes(input2.incoming)) {
          throw new StudioHttpError(404, "file_not_found", "\u0424\u0430\u0439\u043B incoming \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D.");
        }
        file = path16.join(library.dir, modelId, "incoming", input2.incoming);
      }
      return {
        opened: await openVerified(library.dir, file),
        root: library.dir,
        release
      };
    } catch (error) {
      release();
      throw error;
    }
  };
  const addFile = async (modelId, input2, source) => {
    const entry = await library.readModel(modelId);
    if (input2.parentVersionId && !entry.versions.some((item) => item.id === input2.parentVersionId)) {
      throw new StudioHttpError(404, "version_not_found", "\u0420\u043E\u0434\u0438\u0442\u0435\u043B\u044C\u0441\u043A\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430.");
    }
    const stats2 = await inspectModel(source.root, source.opened.canonical, void 0, library.analysis);
    await source.opened.verify();
    options.check();
    const created = await library.addVersion(modelId, {
      kind: "model",
      origin: "file",
      parent: input2.parentVersionId ?? null,
      label: input2.label?.trim() || "\u0421\u0432\u043E\u0439 \u0444\u0430\u0439\u043B",
      stats: stats2
    });
    const release = library.leaseVersion(modelId, created.id, randomUUID5());
    try {
      const name = `model${path16.extname(source.opened.canonical).toLowerCase()}`;
      await library.copyIn(modelId, created.id, {
        sourceRoot: source.root,
        source: source.opened.canonical,
        name,
        role: "model",
        maxBytes: MODEL_LIMIT,
        beforePublish: async () => {
          await source.opened.verify();
          options.check();
        }
      });
      options.check();
      const item = await version2(modelId, created.id);
      changed(modelId, item.id);
      return projection(modelId, item);
    } catch (error) {
      release();
      await library.deleteVersion(modelId, created.id).catch(() => {
      });
      throw error;
    } finally {
      release();
    }
  };
  const createModel = async (input2) => {
    const source = await sourceFor(input2);
    let modelId = null;
    try {
      await inspectModel(source.root, source.opened.canonical, void 0, library.analysis);
      await source.opened.verify();
      options.check();
      const model = await library.createModel({
        name: input2.name?.trim() || path16.basename(
          source.opened.canonical,
          path16.extname(source.opened.canonical)
        ),
        project: input2.project ?? null,
        category: input2.category ?? null,
        origin: "file"
      });
      modelId = model.id;
      const imported = await addFile(model.id, input2, source);
      const result = await detail(model.id);
      return parseStudio3d.createdModel({
        libraryId: library.libraryId,
        model: result.model,
        version: imported
      });
    } catch (error) {
      if (modelId) {
        await library.deleteModel(modelId).catch(() => {
        });
      }
      throw error;
    } finally {
      await source.opened.handle.close();
      source.release();
    }
  };
  const fromFile = async (modelId, input2) => {
    const source = await sourceFor(input2, modelId);
    try {
      return await addFile(modelId, input2, source);
    } finally {
      await source.opened.handle.close();
      source.release();
    }
  };
  const save = async (modelId, versionId, input2) => {
    const service = options.projects?.();
    const project2 = await service?.read(input2.projectId);
    const repo = project2?.repos.find((repo2) => repo2.key === input2.repoKey);
    if (!repo || project2?.archivedAt) {
      throw new StudioHttpError(404, "project_not_found", "\u0420\u0435\u043F\u043E\u0437\u0438\u0442\u043E\u0440\u0438\u0439 \u043F\u0440\u043E\u0435\u043A\u0442\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D.");
    }
    if (path16.isAbsolute(input2.folder) || input2.folder.includes("\\") || input2.folder !== "" && input2.folder.split("/").some((part) => !isExternalName(part)) || !isExternalName(input2.fileName)) {
      throw new StudioHttpError(400, "invalid_folder", "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0442\u043D\u043E\u0441\u0438\u0442\u0435\u043B\u044C\u043D\u0443\u044E \u043F\u0430\u043F\u043A\u0443 \u0438 \u043E\u0431\u044B\u0447\u043D\u043E\u0435 \u0438\u043C\u044F \u0444\u0430\u0439\u043B\u0430.");
    }
    const item = await version2(modelId, versionId);
    const file = item.files.find((file2) => file2.id === item.mainFileId);
    if (!file) {
      throw new StudioHttpError(404, "file_not_found", "\u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0439 \u0444\u0430\u0439\u043B \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442.");
    }
    if (path16.extname(input2.fileName).toLowerCase() !== path16.extname(file.name).toLowerCase()) {
      throw new StudioHttpError(
        400,
        "format_requires_export",
        "\u0420\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u0438\u0435 \u0434\u043E\u043B\u0436\u043D\u043E \u0441\u043E\u0432\u043F\u0430\u0434\u0430\u0442\u044C \u0441 \u0433\u043E\u0442\u043E\u0432\u044B\u043C \u0444\u0430\u0439\u043B\u043E\u043C. \u0414\u043B\u044F \u0434\u0440\u0443\u0433\u043E\u0433\u043E \u0444\u043E\u0440\u043C\u0430\u0442\u0430 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u0448\u0430\u0433 \xAB\u042D\u043A\u0441\u043F\u043E\u0440\u0442\xBB."
      );
    }
    const root = await fs13.realpath(repo.dir);
    const target = path16.join(root, input2.folder, input2.fileName);
    const opened = await library.openVersionFile(modelId, versionId, file.name);
    const release = library.leaseVersion(modelId, versionId, randomUUID5());
    try {
      options.check();
      await ensureDirectory(root, path16.dirname(target));
      let result;
      try {
        result = await safeCopy({
          sourceRoot: library.dir,
          source: opened.canonical,
          targetRoot: root,
          target,
          overwrite: input2.overwrite,
          expectedSha256: input2.expectedSha256,
          beforePublish: async () => {
            await opened.verify();
            options.check();
            const fresh = await service.read(input2.projectId);
            const freshRepo = fresh.repos.find((repo2) => repo2.key === input2.repoKey)?.dir ?? "";
            if (fresh.archivedAt || await fs13.realpath(freshRepo) !== root) {
              throw new StudioHttpError(409, "project_changed", "\u0420\u0435\u043F\u043E\u0437\u0438\u0442\u043E\u0440\u0438\u0439 \u043F\u0440\u043E\u0435\u043A\u0442\u0430 \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0441\u044F.");
            }
          }
        });
      } catch (error) {
        const code = error.code;
        if (code === "exists" || code === "changed") {
          const previous = await verifiedHash(root, target).catch(() => null);
          throw new StudioHttpError(
            409,
            code,
            "\u0424\u0430\u0439\u043B \u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0441\u044F. \u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u0430\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u044B\u0439 SHA.",
            { sha256: previous?.sha256 ?? null }
          );
        }
        throw error;
      }
      const at = (/* @__PURE__ */ new Date()).toISOString();
      await library.updateVersion(modelId, versionId, (current) => ({
        savedTo: [...current.savedTo.filter((saved) => saved.path !== target), {
          path: target,
          at,
          sha256: result.sha256
        }]
      }));
      await library.saveSettings({ saveFolders: { [input2.projectId]: { [input2.repoKey]: input2.folder } } });
      changed(modelId, versionId);
      return parseStudio3d.save({
        libraryId: library.libraryId,
        path: target,
        overwritten: !!input2.overwrite
      });
    } finally {
      release();
      await opened.handle.close();
    }
  };
  const preview = async (modelId, versionId, bytes, mime) => {
    await version2(modelId, versionId);
    if (bytes.length > 5 * 1024 * 1024) {
      throw new StudioHttpError(413, "too_large", "\u041F\u0440\u0435\u0432\u044C\u044E \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u0434\u043E 5 \u041C\u0438\u0411.");
    }
    if (!["image/png", "image/webp"].includes(mime)) {
      throw new StudioHttpError(415, "unsupported_type", "\u041F\u0440\u0435\u0432\u044C\u044E \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C PNG \u0438\u043B\u0438 WebP.");
    }
    const ext = mime === "image/png" ? ".png" : ".webp";
    const name = `preview${ext}`;
    const folderName = randomUUID5();
    const folder = path16.join(library.uploadsDir(), folderName);
    await ensureDirectory(library.dir, folder);
    const parent = await pinDirectory(library.dir, library.uploadsDir());
    const release = library.leaseVersion(modelId, versionId, randomUUID5());
    try {
      await atomicWrite({
        root: library.dir,
        target: path16.join(folder, name),
        data: bytes
      });
      await inspectImage(library.dir, path16.join(folder, name), mime);
      options.check();
      await library.writeVersionFile(modelId, versionId, name, bytes, { role: "preview", replace: true });
      changed(modelId, versionId);
      return projection(modelId, await version2(modelId, versionId));
    } finally {
      release();
      await parent.verify();
      await fs13.rm(parent.child(folderName), { recursive: true, force: true });
      await parent.close();
    }
  };
  const list = async (query) => {
    const current = await library.listModels();
    return parseStudio3d.models({
      libraryId: library.libraryId,
      ...searchModels(current.entries, query, fileUrl),
      broken: current.broken
    });
  };
  return {
    detail,
    projection,
    version: version2,
    list,
    createModel,
    fromFile,
    save,
    preview,
    changed
  };
}

// src/server/files.ts
import { randomBytes as randomBytes2, createHash as createHash7 } from "node:crypto";
import { createReadStream as createReadStream2 } from "node:fs";
import path17 from "node:path";
import { Transform as Transform3 } from "node:stream";
import { pipeline as pipeline5 } from "node:stream/promises";
var VIEW_MODELS = /* @__PURE__ */ new Set([".glb", ".gltf", ".fbx", ".obj", ".stl", ".splat"]);
var NEIGHBORS2 = /* @__PURE__ */ new Set([".bin", ".png", ".jpg", ".jpeg", ".webp"]);
var MIME = {
  ".glb": "model/gltf-binary",
  ".gltf": "model/gltf+json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp"
};
async function hashOpened(opened) {
  const hash = createHash7("sha256");
  await pipeline5(borrowedReadStream(opened.handle, opened.canonical), hash);
  await opened.verify();
  return hash.digest("hex");
}
async function sendStudioFile(request2, reply, opened, sha256, parseByteRange) {
  const etag = `"${sha256}"`;
  const ifRange = request2.headers["if-range"];
  const header = ifRange && ifRange !== etag ? void 0 : request2.headers.range;
  const range = parseByteRange(header, opened.size);
  const contentType = MIME[path17.extname(opened.canonical).toLowerCase()] ?? "application/octet-stream";
  reply.header("Content-Type", contentType);
  reply.header("ETag", etag);
  reply.header("Accept-Ranges", "bytes");
  reply.header("Cache-Control", "private, no-cache");
  reply.header("X-Content-Type-Options", "nosniff");
  if (range === "invalid" || header && range === null) {
    await opened.handle.close();
    return reply.code(416).header("Content-Range", `bytes */${opened.size}`).send();
  }
  const start = range?.start ?? 0;
  const end = range?.end ?? opened.size - 1;
  reply.code(range ? 206 : 200);
  reply.header("Content-Length", range ? end - start + 1 : opened.size);
  if (range) {
    reply.header("Content-Range", `bytes ${start}-${end}/${opened.size}`);
  }
  if (request2.method === "HEAD" || opened.size === 0) {
    await opened.verify();
    await opened.handle.close();
    return reply.send();
  }
  const source = createReadStream2(opened.canonical, {
    fd: opened.handle,
    autoClose: false,
    start,
    end
  });
  const guard = new Transform3({
    transform(chunk, _encoding, callback) {
      callback(null, chunk);
    },
    flush(callback) {
      opened.verify().then(() => callback(), () => callback(new Error("file_changed")));
    }
  });
  source.on("error", (error) => guard.destroy(error));
  guard.on("close", () => {
    source.destroy();
    void opened.handle.close();
  });
  source.pipe(guard);
  return reply.send(guard);
}
function createStudioFiles(options) {
  const tokens = /* @__PURE__ */ new Map();
  const now = options.now ?? Date.now;
  const roots = async (scope) => {
    const declared = await options.reader.roots(scope);
    const projects = await options.projectRoots();
    const paths = [...declared.map((root) => root.path), ...projects, options.library.dir];
    const canonical = await Promise.all(paths.map((root) => fsRoot(root)));
    return [...new Set(canonical.filter((root) => Boolean(root)))];
  };
  const openSource = async (input2, scope = "") => {
    if (!options.enabled() || !path17.isAbsolute(input2) || input2.includes("\0")) {
      throw new StudioHttpError(403, "outside_roots", "\u041F\u0443\u0442\u044C \u0432\u043D\u0435 \u0440\u0430\u0437\u0440\u0435\u0448\u0451\u043D\u043D\u043E\u0439 \u043E\u0431\u043B\u0430\u0441\u0442\u0438.");
    }
    const currentRoots = (await roots(scope)).sort((a, b) => b.length - a.length);
    const root = currentRoots.find((root2) => input2 === root2 || input2.startsWith(`${root2}${path17.sep}`));
    if (!root || !await insideRoot(root, input2)) {
      throw new StudioHttpError(403, "outside_roots", "\u041C\u043E\u0434\u0435\u043B\u044C \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u0441\u044F \u0432\u043D\u0435 \u0440\u0430\u0437\u0440\u0435\u0448\u0451\u043D\u043D\u044B\u0445 \u043A\u043E\u0440\u043D\u0435\u0439.");
    }
    return { opened: await openVerified(root, input2), root };
  };
  const resolve = async (input2, scope = "") => {
    const { opened, root } = await openSource(input2, scope);
    try {
      const ext = path17.extname(opened.canonical).toLowerCase();
      if (!VIEW_MODELS.has(ext)) {
        throw new StudioHttpError(415, "unsupported_type", "\u0424\u0430\u0439\u043B \u043D\u0435 \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u043C\u043E\u0439 \u043C\u043E\u0434\u0435\u043B\u044C\u044E.");
      }
      if (opened.size > 150 * 1024 * 1024) {
        throw new StudioHttpError(413, "too_large", "\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u043C\u043E\u0434\u0435\u043B\u0438 \u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u0434\u043E 150 \u041C\u0438\u0411.");
      }
      if (ext === ".gltf") {
        if (opened.size > 16 * 1024 * 1024) {
          throw new StudioHttpError(413, "too_large", "JSON \u043C\u043E\u0434\u0435\u043B\u0438 \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u043E\u0439.");
        }
        validateGltf(JSON.parse(await opened.handle.readFile("utf8")));
      }
      if (ext === ".glb") {
        await validateGlbResources(opened);
      }
      const sha256 = await hashOpened(opened);
      const token = randomBytes2(24).toString("hex");
      for (const [id2, entry] of tokens) {
        if (entry.expires <= now()) {
          tokens.delete(id2);
        }
      }
      if (tokens.size >= 256) {
        tokens.delete(tokens.keys().next().value);
      }
      tokens.set(token, {
        expires: now() + 36e5,
        main: opened.canonical,
        directory: path17.dirname(opened.canonical),
        root,
        scope,
        revisions: /* @__PURE__ */ new Map([[opened.canonical, opened.revision]])
      });
      let libraryRef = null;
      for (const entry of (await options.library.listModels()).entries) {
        for (const version2 of entry.versions) {
          if (version2.files.some((file) => file.sha256 === sha256 && path17.join(options.library.dir, entry.model.id, version2.id, file.name) === opened.canonical) || version2.savedTo.some((saved) => saved.path === opened.canonical && saved.sha256 === sha256)) {
            libraryRef = { modelId: entry.model.id, versionId: version2.id };
          }
        }
      }
      return {
        libraryId: options.library.libraryId,
        url: `${options.prefix}/viewer/file/${token}/${encodeURIComponent(path17.basename(opened.canonical))}`,
        name: path17.basename(opened.canonical),
        ext: ext.slice(1),
        size: opened.size,
        libraryRef
      };
    } finally {
      await opened.handle.close();
    }
  };
  const viewerFile = async (token, relative) => {
    const entry = tokens.get(token);
    if (!entry || !options.enabled() || entry.expires <= now() || relative.startsWith("/") || relative.includes("\\") || relative.includes("%") || relative.split("/").some((part) => !part || part === ".." || part === ".")) {
      throw new StudioHttpError(404, "not_found", "\u0421\u0441\u044B\u043B\u043A\u0430 \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430 \u0431\u043E\u043B\u044C\u0448\u0435 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430.");
    }
    const file = path17.resolve(entry.directory, relative);
    if (file !== entry.main && !NEIGHBORS2.has(path17.extname(file).toLowerCase())) {
      throw new StudioHttpError(404, "not_found", "\u0420\u0435\u0441\u0443\u0440\u0441 \u043C\u043E\u0434\u0435\u043B\u0438 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D.");
    }
    if (!(await roots(entry.scope)).includes(entry.root) || !await insideRoot(entry.directory, file)) {
      throw new StudioHttpError(404, "not_found", "\u041E\u0431\u043B\u0430\u0441\u0442\u044C \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430 \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0430\u0441\u044C.");
    }
    const opened = await openVerified(entry.root, file);
    try {
      const revision2 = entry.revisions.get(file);
      if (revision2 && revision2 !== opened.revision) {
        throw new StudioHttpError(404, "not_found", "\u0424\u0430\u0439\u043B \u043C\u043E\u0434\u0435\u043B\u0438 \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0441\u044F.");
      }
      entry.revisions.set(file, opened.revision);
      return { opened, sha256: await hashOpened(opened) };
    } catch (error) {
      await opened.handle.close();
      throw error;
    }
  };
  return {
    openSource,
    resolve,
    viewerFile,
    clear: () => tokens.clear()
  };
}
async function fsRoot(root) {
  const { promises: fs17 } = await import("node:fs");
  try {
    const canonical = await fs17.realpath(root);
    return (await fs17.stat(canonical)).isDirectory() ? canonical : null;
  } catch {
    return null;
  }
}

// src/server/runtime.ts
function studioSettings(raw) {
  const values2 = raw && typeof raw === "object" ? raw : {};
  if (values2.libraryDir !== void 0 && typeof values2.libraryDir !== "string") {
    throw new StudioHttpError(400, "invalid_settings", "\u041F\u0430\u043F\u043A\u0430 \u0431\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0438 \u0434\u043E\u043B\u0436\u043D\u0430 \u0431\u044B\u0442\u044C \u0441\u0442\u0440\u043E\u043A\u043E\u0439.");
  }
  const lowDiskGb = values2.lowDiskGb ?? 10;
  if (typeof lowDiskGb !== "number" || !Number.isFinite(lowDiskGb) || lowDiskGb < 1 || lowDiskGb > 1e3 || values2.autoImport !== void 0 && typeof values2.autoImport !== "boolean") {
    throw new StudioHttpError(400, "invalid_settings", "\u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u0431\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0438.");
  }
  return {
    autoImport: values2.autoImport !== false,
    lowDiskGb,
    libraryDir: String(values2.libraryDir ?? "")
  };
}
function downloadPool(download) {
  let running = 0;
  const queue = [];
  return (request2) => new Promise((resolve, reject) => {
    const start = () => {
      running += 1;
      Promise.resolve().then(() => download(request2)).then(resolve, reject).finally(() => {
        running -= 1;
        queue.shift()?.();
      });
    };
    if (running < 2) {
      start();
    } else {
      queue.push(start);
    }
  });
}
function createStudioRuntime(options) {
  return new StudioRuntimeInstance(options);
}
var StudioRuntimeInstance = class {
  admission = createAdmission(randomUUID6(), () => {
    void this.requestIdleRelease();
  });
  options;
  context = null;
  generation = 0;
  unavailableId = randomUUID6();
  unavailable = null;
  historyTimer = null;
  balances = /* @__PURE__ */ new Map();
  download;
  closing = false;
  closeController = new AbortController();
  preparations = /* @__PURE__ */ new Set();
  contexts = /* @__PURE__ */ new Set();
  scopes = /* @__PURE__ */ new Set();
  closedContexts = /* @__PURE__ */ new WeakMap();
  idleRelease = null;
  idleAgain = false;
  constructor(options) {
    this.options = options;
    this.download = downloadPool(options.download ?? downloadToFile);
    this.admission.configure({ enabled: false });
  }
  current(context, generation) {
    return this.context === context && generation === this.generation && this.options.enabled() && !this.closing;
  }
  /**
   * Snapshot допускается только для включённого и подготовленного контекста.
   * Поколение позволяет отклонить ответ операции после смены библиотеки.
   */
  snapshot() {
    if (!this.options.enabled()) {
      throw new StudioHttpError(404, "plugin_disabled", "\u041F\u043B\u0430\u0433\u0438\u043D \xAB3D\xBB \u0432\u044B\u043A\u043B\u044E\u0447\u0435\u043D.");
    }
    if (!this.context || this.unavailable) {
      throw new StudioHttpError(409, "library_unavailable", "\u041F\u0430\u043F\u043A\u0430 \u0431\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0438 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430.");
    }
    return { context: this.context, generation: this.generation };
  }
  /**
   * Lexical пересечения закрываются синхронно до любых mkdir/marker/flock.
   * Runtime root допустим как предок библиотеки, заменяемые деревья — ни в одну сторону.
   */
  directory(settings) {
    const candidate = settings.libraryDir || this.options.environment.defaultLibraryDir;
    if (!path18.isAbsolute(candidate) || candidate.includes("\0") || /%(?:2e|2f|5c)/i.test(candidate)) {
      throw new StudioHttpError(409, "invalid_library_dir", "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0430\u0431\u0441\u043E\u043B\u044E\u0442\u043D\u0443\u044E \u043F\u0430\u043F\u043A\u0443 \u0431\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0438.");
    }
    const target = path18.resolve(candidate);
    if (target === path18.parse(target).root || target === os.homedir() || target === path18.resolve(this.options.environment.runtimeRoot) || target.split(path18.sep).includes(".git") || this.protectedDirectories().some((directory) => intersects(target, directory))) {
      throw new StudioHttpError(409, "invalid_library_dir", "\u042D\u0442\u0430 \u043F\u0430\u043F\u043A\u0430 \u0437\u0430\u043D\u044F\u0442\u0430 \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u044B\u043C \u0445\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0435\u043C.");
    }
    return target;
  }
  protectedDirectories() {
    return [
      ...this.options.environment.protectedDirs,
      this.options.pluginDir,
      this.options.generationRoot
    ].map((directory) => path18.resolve(directory));
  }
  /**
   * Канонизация ближайшего существующего предка работает и для отсутствующего потомка.
   * Signal проверяется после каждого await до возможности создания библиотеки.
   */
  async checkedDirectory(settings, signal) {
    const requested = this.directory(settings);
    const target = await canonicalDirectory2(requested, signal);
    const protectedDirs = [];
    for (const directory of this.protectedDirectories()) {
      protectedDirs.push(await canonicalDirectory2(directory, signal));
      checkPreparation(signal);
    }
    this.directory({ ...settings, libraryDir: target });
    if (target === await canonicalDirectory2(os.homedir(), signal) || target === await canonicalDirectory2(this.options.environment.runtimeRoot, signal) || protectedDirs.some((directory) => intersects(target, directory))) {
      throw new StudioHttpError(409, "invalid_library_dir", "\u042D\u0442\u0430 \u043F\u0430\u043F\u043A\u0430 \u0437\u0430\u043D\u044F\u0442\u0430 \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u044B\u043C \u0445\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0435\u043C.");
    }
    checkPreparation(signal);
    return target;
  }
  /**
   * Только подготовка нового context владеет его scope/library до commit.
   * Поздний abort закрывает именно эти ресурсы, сохраняя прежний context.
   */
  async prepareContext(settings, signal) {
    const requested = await this.checkedDirectory(settings, signal);
    let analysis = null;
    let library = null;
    try {
      checkPreparation(signal);
      analysis = await this.options.createAnalysis?.() ?? null;
      if (analysis) {
        this.scopes.add(analysis);
      }
      checkPreparation(signal);
      if (await this.checkedDirectory(settings, signal) !== requested) {
        throw new StudioHttpError(
          409,
          "invalid_library_dir",
          "\u041F\u0430\u043F\u043A\u0430 \u0431\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0438 \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0430\u0441\u044C \u043F\u0440\u0438 \u043F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0435."
        );
      }
      checkPreparation(signal);
      library = createLibrary({
        dir: requested,
        acquireLock: this.options.core.acquireKernelFileLock,
        analysis: analysis?.deps() ?? this.options.analysis,
        ensureGitignore: requested.startsWith(this.options.environment.runtimeRoot + path18.sep),
        now: this.options.now,
        signal,
        onLeaseChange: () => this.requestIdleRelease()
      });
      await library.ensure();
      checkPreparation(signal);
      await this.checkedDirectory({ ...settings, libraryDir: library.dir }, signal);
      if (await this.checkedDirectory(settings, signal) !== requested) {
        throw new StudioHttpError(
          409,
          "invalid_library_dir",
          "\u041F\u0430\u043F\u043A\u0430 \u0431\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0438 \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0430\u0441\u044C \u043F\u0440\u0438 \u043F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0435."
        );
      }
      checkPreparation(signal);
      const capabilities = await this.options.core.getProviders("3d");
      checkPreparation(signal);
      const providers = studioProviders({
        providers: capabilities,
        local: createLocalStudio(library.analysis)
      });
      const intents = createIntents({ library });
      await intents.load();
      checkPreparation(signal);
      const jobs = createJobs({
        library,
        intents,
        providers,
        admission: this.admission,
        broadcast: this.options.broadcast,
        download: this.download,
        now: this.options.now,
        onIdle: () => this.requestIdleRelease(),
        onTerminal: (intentId, childId) => this.notifyTerminal(context, intentId, childId),
        fileUrl: (model, version2, name) => studioFileUrl(this.options.prefix, model, version2, name)
      });
      const importer = this.newImporter(library, intents, providers, jobs);
      const files = createStudioFiles({
        library,
        reader: this.options.documentReader,
        now: this.options.now,
        enabled: () => this.options.enabled() && !this.unavailable && this.context?.library === library,
        projectRoots: () => this.projectRoots(),
        prefix: this.options.prefix
      });
      const context = {
        library,
        intents,
        jobs,
        importer,
        files,
        providers,
        analysis
      };
      this.contexts.add(context);
      return context;
    } catch (error) {
      analysis?.abort();
      await analysis?.close();
      await library?.close();
      if (analysis) {
        this.scopes.delete(analysis);
      }
      checkPreparation(signal);
      throw error;
    }
  }
  newImporter(library, intents, providers, jobs) {
    return createImporter({
      library,
      intents,
      providers,
      roots: async () => [this.options.environment.runtimeRoot, ...await this.projectRoots()],
      enabled: () => this.options.enabled() && !this.unavailable && this.context?.library === library,
      download: this.download,
      now: this.options.now,
      broadcast: this.options.broadcast,
      observeUsage: (provider, captured, usages) => jobs.observeUsage(provider, captured, usages)
    });
  }
  /**
   * Проекты читаются заново; архивность приходит из публичного archivedAt.
   * Ранее открытый viewer token не сохраняет права удалённого проекта.
   */
  async projectRoots() {
    const projects = await this.options.projects?.()?.list() ?? [];
    return projects.filter((project2) => !project2.archivedAt).flatMap((project2) => project2.repos.map((repo) => repo.dir));
  }
  /**
   * Prepare и paid send разделяют один admission lock до commit/rollback.
   * Abort после ready запускает rollback; commit никогда не разрешён после abort.
   */
  async prepareChange(change, externalSignal) {
    const signal = externalSignal ? AbortSignal.any([externalSignal, this.closeController.signal]) : this.closeController.signal;
    await this.idleRelease;
    checkPreparation(signal);
    let resolveReady;
    let rejectReady;
    let release;
    const ready = new Promise((resolve, reject) => {
      resolveReady = resolve;
      rejectReady = reject;
    });
    const hold = new Promise((resolve) => {
      release = resolve;
    });
    let old = null;
    let prepared = null;
    let enabled = false;
    let committed = false;
    let finished = false;
    let transition = null;
    const onAbort = () => {
      if (transition && !committed) {
        void transition.rollback().catch(() => {
        });
      }
    };
    signal.addEventListener("abort", onAbort, { once: true });
    const locked = this.admission.locked(async () => {
      try {
        checkPreparation(signal);
        const current = studioSettings({ ...this.options.defaults, ...this.options.settings() });
        const settings = change.values === void 0 ? current : studioSettings({ ...current, ...change.values });
        enabled = change.enabled ?? this.options.enabled();
        old = this.context;
        const requested = await this.checkedDirectory(settings, signal);
        const same = old && requested === old.library.dir;
        checkPreparation(signal);
        if (old && !same && (old.library.leaseCount() > 0 || await old.jobs.busy())) {
          throw new StudioHttpError(409, "library_busy", "\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u0435 \u0437\u0430\u0434\u0430\u043D\u0438\u044F \u0438 \u0440\u0430\u0437\u0431\u0435\u0440\u0438\u0442\u0435 unknown.");
        }
        checkPreparation(signal);
        prepared = enabled && !same ? await this.prepareContext(settings, signal) : old;
        checkPreparation(signal);
        transition = {
          commit: () => {
            checkPreparation(signal);
            if (finished) {
              return;
            }
            finished = true;
            committed = true;
            this.context = prepared;
            this.unavailable = null;
            this.generation += 1;
            this.balances.clear();
            this.stopHistory();
            old?.files.clear();
            this.admission.configure({
              enabled,
              libraryId: prepared?.library.libraryId ?? this.unavailableId
            });
            signal.removeEventListener("abort", onAbort);
            release();
          },
          rollback: async () => {
            if (!finished) {
              finished = true;
              signal.removeEventListener("abort", onAbort);
              try {
                if (prepared && prepared !== old) {
                  await this.closeContext(prepared);
                }
              } finally {
                release();
              }
            }
            await locked;
          },
          afterCommit: async () => {
            await locked;
            if (!committed) {
              return;
            }
            if (old && old !== prepared) {
              await this.closeContext(old);
            }
            if (enabled && prepared && !this.closing) {
              await prepared.importer.stop();
              if (this.closing || this.context !== prepared || !this.options.enabled()) {
                return;
              }
              prepared.importer = this.newImporter(
                prepared.library,
                prepared.intents,
                prepared.providers,
                prepared.jobs
              );
              await prepared.jobs.resume();
              if (!this.closing && this.context === prepared && this.options.enabled()) {
                this.startHistory(prepared);
              }
            } else {
              await prepared?.importer.stop();
              prepared?.providers.forEach((provider) => provider.cancelReads?.());
              await this.requestIdleRelease();
            }
          }
        };
        resolveReady(transition);
        await hold;
      } catch (error) {
        if (prepared && prepared !== old && !committed) {
          await this.closeContext(prepared);
        }
        signal.removeEventListener("abort", onAbort);
        release();
        rejectReady(error);
      }
    });
    this.preparations.add(locked);
    void locked.then(() => this.preparations.delete(locked), (error) => {
      this.preparations.delete(locked);
      rejectReady(error);
    });
    return ready;
  }
  /**
   * Проверка вызывается событиями disable/job completion/lease release, без timer.
   * Повторная сверка под admission lock предшествует отделению idle context.
   */
  requestIdleRelease() {
    if (this.closing || this.options.enabled() || !this.context) {
      return Promise.resolve();
    }
    if (this.idleRelease) {
      this.idleAgain = true;
      return this.idleRelease;
    }
    const task = Promise.resolve().then(async () => {
      const context = await this.admission.locked(async () => {
        const current = this.context;
        const generation = this.generation;
        if (!current || this.closing || this.options.enabled() || current.library.leaseCount() > 0 || this.admission.pendingCount() > 0 || await current.jobs.busy()) {
          return null;
        }
        if (this.context !== current || this.generation !== generation || this.options.enabled() || this.admission.pendingCount() > 0 || current.library.leaseCount() > 0) {
          return null;
        }
        this.context = null;
        this.generation += 1;
        return current;
      });
      if (context) {
        await this.closeContext(context);
      }
    });
    this.idleRelease = task.finally(() => {
      this.idleRelease = null;
      if (this.idleAgain) {
        this.idleAgain = false;
        queueMicrotask(() => {
          void this.requestIdleRelease();
        });
      }
    });
    void this.idleRelease.catch(() => {
    });
    return this.idleRelease;
  }
  /**
   * Analysis abort предшествует jobs.stop/importer.stop, которые могут ждать worker.
   * Один cleanup barrier закрывает только context и его lifetime flock.
   */
  closeContext(context) {
    const existing = this.closedContexts.get(context);
    if (existing) {
      return existing;
    }
    context.analysis?.abort();
    const closing = (async () => {
      context.files.clear();
      await Promise.all([context.jobs.stop(), context.importer.stop()]);
      await context.analysis?.close();
      await context.library.close();
      this.contexts.delete(context);
      if (context.analysis) {
        this.scopes.delete(context.analysis);
      }
    })();
    this.closedContexts.set(context, closing);
    return closing;
  }
  /**
   * Диагностика replacement учитывает подготовку, фоновые задания и открытые файлы.
   * Unknown остаётся занятой библиотекой до явного решения человека.
   */
  async busyReason() {
    if (this.preparations.size || this.idleRelease || this.admission.pendingCount() > 0) {
      return "\u0411\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0430 3D \u0437\u0430\u0432\u0435\u0440\u0448\u0430\u0435\u0442 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u044E.";
    }
    for (const context of this.contexts) {
      if (context.library.leaseCount() > 0 || await context.jobs.busy()) {
        return "\u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u0435 \u0437\u0430\u0434\u0430\u043D\u0438\u044F 3D \u0438 \u0440\u0430\u0437\u0431\u0435\u0440\u0438\u0442\u0435 \u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u044B\u0435 \u0438\u0441\u0445\u043E\u0434\u044B.";
      }
    }
    return null;
  }
  /**
   * onReady выключенного плагина не открывает диск. Недоступность configured root
   * видна в state, но не срывает весь GrigDesk; mutations остаются закрыты.
   */
  async start() {
    if (!this.options.enabled()) {
      return;
    }
    try {
      const transition = await this.prepareChange({ enabled: true });
      transition.commit();
      await transition.afterCommit();
    } catch {
      this.unavailable = "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0442\u043A\u0440\u044B\u0442\u044C \u0438 \u0437\u0430\u043A\u0440\u0435\u043F\u0438\u0442\u044C \u043F\u0430\u043F\u043A\u0443 \u0431\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0438.";
    }
  }
  /**
   * Первичный scan запускается один раз на библиотеку, затем только history.
   * Все фоновые отказы изолированы, refresh вручную доступен через API.
   */
  startHistory(context) {
    const generation = this.generation;
    if (studioSettings(this.options.settings()).autoImport) {
      void context.importer.scan({ automatic: true }).catch(() => {
      });
    }
    const refresh = async () => {
      if (!this.current(context, generation)) {
        return;
      }
      await context.importer.syncHistory({ autoImport: studioSettings(this.options.settings()).autoImport }).catch(() => {
      });
      await context.jobs.cleanup().catch(() => {
      });
      await context.library.cleanUploads(864e5).catch(() => {
      });
      if (this.current(context, generation)) {
        this.scheduleHistory(refresh, 15 * 6e4);
      }
    };
    this.scheduleHistory(refresh, 6e4);
  }
  /**
   * Собственный timer можно заменить изолированными часами offline-теста.
   * Production timer не удерживает процесс, но close обязательно его снимает.
   */
  scheduleHistory(callback, delay) {
    if (this.options.setHistoryTimer) {
      this.historyTimer = this.options.setHistoryTimer(callback, delay);
    } else {
      const timer = setTimeout(callback, delay);
      timer.unref();
      this.historyTimer = timer;
    }
  }
  /**
   * Снимает только timer этого runtime при disable, смене настроек и close.
   * Инъецированные offline часы освобождаются через тот же lifecycle.
   */
  stopHistory() {
    if (this.historyTimer !== null) {
      if (this.options.clearHistoryTimer) {
        this.options.clearHistoryTimer(this.historyTimer);
      } else {
        clearTimeout(this.historyTimer);
      }
      this.historyTimer = null;
    }
  }
  /**
   * Snapshot читает только массив публичных строк durable jobs текущей библиотеки.
   * Поздний ответ прежней library/generation не маркируется как исход новой.
   */
  async notifications(signal) {
    const context = this.context;
    const generation = this.generation;
    return context ? this.contextNotifications(context, generation, signal) : [];
  }
  /**
   * Live использует ту же проекцию, что восстановление, после durable child update.
   * Между последней identity проверкой и emit нет await.
   */
  async notifyTerminal(context, intentId, childId) {
    const generation = this.generation;
    const items = await this.contextNotifications(context, generation);
    if (!this.current(context, generation)) {
      return;
    }
    for (const item of items) {
      if (item.dedupKey === `${context.library.libraryId}:${intentId}:${childId}:ready` || item.dedupKey === `${context.library.libraryId}:${intentId}:${childId}:failed`) {
        this.options.broadcast?.("notification", { ...item });
      }
    }
  }
  /**
   * Library UUID и runtime generation фиксируются перед единственным await jobs.tasks.
   * Signal и identity повторяются после чтения, не разрешая history/HTTP побочных эффектов.
   */
  async contextNotifications(context, generation, signal) {
    const libraryId = context.library.libraryId;
    if (signal?.aborted || !this.current(context, generation) || this.unavailable) {
      return [];
    }
    let rows2;
    try {
      rows2 = await context.jobs.tasks();
    } catch (error) {
      if (signal?.aborted || !this.current(context, generation) || context.library.libraryId !== libraryId) {
        return [];
      }
      throw error;
    }
    if (signal?.aborted || !this.current(context, generation) || this.unavailable || context.library.libraryId !== libraryId) {
      return [];
    }
    return projectStudioNotifications(libraryId, rows2, (this.options.now ?? Date.now)());
  }
  /**
   * Баланс кешируется по captured account ровно на минуту. Ответ другого аккаунта
   * после await не становится состоянием текущей карточки исполнителя.
   */
  async state() {
    const context = this.context;
    const generation = this.generation;
    const settings = studioSettings({
      ...this.options.defaults,
      ...this.options.settings()
    });
    const now = (this.options.now ?? Date.now)();
    if (!context || this.unavailable) {
      return parseStudio3d.state({
        libraryId: this.unavailableId,
        library: {
          dir: settings.libraryDir || this.options.environment.defaultLibraryDir,
          ok: false,
          error: this.unavailable ?? "\u0411\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0430 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430.",
          bytes: 0,
          freeBytes: null,
          lowDisk: false,
          modelBytes: 0,
          inputBytes: 0,
          temporaryBytes: 0
        },
        providers: [],
        active: 0,
        autoImport: settings.autoImport
      });
    }
    let usage;
    let usageError = null;
    try {
      usage = await context.library.diskUsage();
    } catch {
      if (!this.current(context, generation)) {
        throw new StudioHttpError(409, "stale_library", "\u041A\u043E\u043D\u0442\u0435\u043A\u0441\u0442 \u0431\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0438 \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0441\u044F.");
      }
      try {
        await context.library.assertOwner();
      } catch {
        this.unavailable = "\u041F\u0430\u043F\u043A\u0430 \u0431\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0438 \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0430\u0441\u044C \u0438\u043B\u0438 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430. \u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0435 \u0435\u0451 \u0438\u043B\u0438 \u0441\u043C\u0435\u043D\u0438\u0442\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0443.";
        this.admission.configure({ enabled: false });
        return this.state();
      }
      usageError = "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u0434\u0441\u0447\u0438\u0442\u0430\u0442\u044C \u043C\u0435\u0441\u0442\u043E \u043D\u0430 \u0434\u0438\u0441\u043A\u0435. \u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0435 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442 \u043F\u043E\u0434\u0441\u0447\u0451\u0442.";
      usage = {
        bytes: 0,
        modelBytes: 0,
        inputBytes: 0,
        temporaryBytes: 0
      };
    }
    const providers = [];
    for (const provider of context.providers) {
      const captured = provider.snapshot?.();
      const available = await provider.available();
      const key = `${provider.id}:${captured?.accountKey ?? "local"}`;
      let balance = this.balances.get(key);
      if (available && provider.balance && (!balance || now - balance.at >= 6e4)) {
        const value = await provider.balance(captured).catch(() => null);
        balance = { at: now, value: captured && !provider.isCurrent?.(captured) ? null : value };
        this.balances.set(key, balance);
      }
      if (captured && !provider.isCurrent?.(captured)) {
        throw new StudioHttpError(409, "account_changed", "\u0414\u043E\u0441\u0442\u0443\u043F \u0438\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044F \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0441\u044F. \u041E\u0431\u043D\u043E\u0432\u0438\u0442\u0435 \u0440\u0430\u0437\u0434\u0435\u043B.");
      }
      providers.push({
        id: provider.id,
        name: provider.name,
        available,
        local: provider.local,
        unit: provider.unit,
        balance: available ? await context.jobs.balanceView(
          provider,
          captured,
          balance?.value ?? null
        ) : null,
        billingUrl: captured?.billingUrl ?? null
      });
    }
    const disk = await (this.options.statfs ?? fs14.statfs)(context.library.dir).catch(() => null);
    const freeBytes = disk ? Number(disk.bavail) * Number(disk.bsize) : null;
    const active = (await context.jobs.tasks()).filter((row) => ACTIVE_STATUSES.includes(row.status)).length;
    if (!this.current(context, generation)) {
      throw new StudioHttpError(409, "stale_library", "\u041A\u043E\u043D\u0442\u0435\u043A\u0441\u0442 \u0431\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0438 \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0441\u044F.");
    }
    return parseStudio3d.state({
      libraryId: context.library.libraryId,
      library: {
        dir: context.library.dir,
        ok: true,
        error: usageError,
        ...usage,
        freeBytes,
        lowDisk: freeBytes !== null && freeBytes < settings.lowDiskGb * 1024 ** 3
      },
      providers,
      active,
      autoImport: settings.autoImport
    });
  }
  /**
   * onClose закрывает допуск до ожидания собственной работы и отменяет её чтения.
   * Owner lock освобождается после durable исходов, а не одновременно с записью worker.
   */
  async close() {
    this.closing = true;
    this.closeController.abort();
    this.stopHistory();
    this.admission.configure({ enabled: false, closing: true });
    for (const scope of this.scopes) {
      scope.abort();
    }
    await Promise.allSettled([...this.preparations]);
    await this.idleRelease;
    await Promise.all([...this.contexts].map((context) => this.closeContext(context)));
    this.context = null;
  }
};
function intersects(one, two) {
  return one === two || one.startsWith(two + path18.sep) || two.startsWith(one + path18.sep);
}
function checkPreparation(signal) {
  if (signal?.aborted) {
    throw new StudioHttpError(409, "plugin_change_aborted", "\u041F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0430 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u043E\u0442\u043C\u0435\u043D\u0435\u043D\u0430.");
  }
}
async function canonicalDirectory2(candidate, signal) {
  let ancestor = path18.resolve(candidate);
  const suffix = [];
  for (; ; ) {
    checkPreparation(signal);
    try {
      const canonical = await fs14.realpath(ancestor);
      checkPreparation(signal);
      return path18.join(canonical, ...suffix);
    } catch (error) {
      checkPreparation(signal);
      if (error.code !== "ENOENT") {
        throw error;
      }
      suffix.unshift(path18.basename(ancestor));
      ancestor = path18.dirname(ancestor);
    }
  }
}

// src/server/uploads.ts
import { randomUUID as randomUUID7 } from "node:crypto";
import { constants, createWriteStream as createWriteStream3, promises as fs15 } from "node:fs";
import path19 from "node:path";
import { Transform as Transform4 } from "node:stream";
import { pipeline as pipeline6 } from "node:stream/promises";
async function receiveUpload(request2, library, check) {
  const uploadId = randomUUID7();
  const folder = path19.join(library.uploadsDir(), uploadId);
  let libraryId = null;
  let uploaded = null;
  let pinned = null;
  let published = false;
  try {
    for await (const part of request2.parts({
      limits: {
        fileSize: MODEL_LIMIT,
        files: 1,
        fields: 1,
        parts: 2,
        fieldSize: 128
      }
    })) {
      if (part.type === "field") {
        if (part.fieldname !== "libraryId" || libraryId !== null || typeof part.value !== "string") {
          throw new StudioHttpError(400, "invalid_request", "\u041F\u0435\u0440\u0435\u0434\u0430\u0439\u0442\u0435 libraryId \u0438 \u043E\u0434\u0438\u043D \u0444\u0430\u0439\u043B.");
        }
        libraryId = part.value;
        check(libraryId);
        continue;
      }
      if (!libraryId || uploaded || part.fieldname !== "file") {
        throw new StudioHttpError(400, "invalid_request", "\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u043F\u0435\u0440\u0435\u0434\u0430\u0439\u0442\u0435 libraryId, \u0437\u0430\u0442\u0435\u043C \u043E\u0434\u0438\u043D \u0444\u0430\u0439\u043B.");
      }
      check(libraryId);
      const ext = path19.extname(part.filename).toLowerCase();
      const image = Object.hasOwn(IMAGE_MIME, ext);
      if (!image && !MODEL_EXT.has(ext) || part.filename.length > 256) {
        throw new StudioHttpError(415, "unsupported_type", "\u041D\u0443\u0436\u043D\u0430 \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0430 \u0438\u043B\u0438 \u0441\u0430\u043C\u043E\u0441\u0442\u043E\u044F\u0442\u0435\u043B\u044C\u043D\u0430\u044F 3D-\u043C\u043E\u0434\u0435\u043B\u044C.");
      }
      const name = `input${ext}`;
      const limit = image ? IMAGE_LIMIT : MODEL_LIMIT;
      await ensureDirectory(library.dir, folder);
      pinned = await pinDirectory(library.dir, folder);
      const handle = await fs15.open(
        pinned.child(name),
        constants.O_WRONLY | constants.O_CREAT | constants.O_EXCL | constants.O_NOFOLLOW,
        384
      );
      const destination = createWriteStream3(pinned.child(name), { fd: handle, autoClose: false });
      let size = 0;
      try {
        const bounded = new Transform4({
          /**
           * Каждый chunk повторяет допуск и учитывается до записи на диск.
           * Потоковый предел прекращает upload с типизированным отказом.
           */
          transform(bytes, _encoding, done) {
            size += bytes.length;
            try {
              check(libraryId);
              if (size > limit) {
                throw new StudioHttpError(413, "too_large", "\u0424\u0430\u0439\u043B \u043F\u0440\u0435\u0432\u044B\u0448\u0430\u0435\u0442 \u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0439 \u0440\u0430\u0437\u043C\u0435\u0440.");
              }
              done(null, bytes);
            } catch (error) {
              done(error);
            }
          }
        });
        await pipeline6(part.file, bounded, destination);
        if (part.file.truncated) {
          throw new StudioHttpError(413, "too_large", "\u0424\u0430\u0439\u043B \u043F\u0440\u0435\u0432\u044B\u0448\u0430\u0435\u0442 \u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0439 \u0440\u0430\u0437\u043C\u0435\u0440.");
        }
        await handle.sync();
      } finally {
        destination.destroy();
        await handle.close();
      }
      const file = path19.join(folder, name);
      const dimensions = image ? await inspectImage(library.dir, file, part.mimetype) : null;
      const stats2 = image ? null : await inspectModel(library.dir, file, void 0, library.analysis);
      const verified = await verifiedHash(library.dir, file);
      check(libraryId);
      await pinned.verify();
      uploaded = parseStudio3d.upload({
        libraryId: library.libraryId,
        uploadId,
        name,
        kind: image ? "image" : "model",
        size: verified.size,
        stats: stats2,
        width: dimensions?.width ?? null,
        height: dimensions?.height ?? null
      });
    }
    if (!uploaded || !libraryId) {
      throw new StudioHttpError(400, "invalid_request", "\u041F\u0435\u0440\u0435\u0434\u0430\u0439\u0442\u0435 \u043E\u0434\u0438\u043D \u0444\u0430\u0439\u043B.");
    }
    check(libraryId);
    await library.persist(path19.join(folder, "upload.json"), uploaded, false);
    published = true;
    return uploaded;
  } finally {
    if (!published && pinned) {
      const parent = await pinDirectory(library.dir, library.uploadsDir());
      try {
        await pinned.verify();
        await parent.verify();
        await fs15.rm(parent.child(uploadId), { recursive: true, force: true });
      } finally {
        await parent.close();
      }
    }
    await pinned?.close();
  }
}

// src/server/schemas.ts
var import_ajv = __toESM(require_ajv(), 1);
var uuid2 = {
  type: "string",
  maxLength: 36,
  pattern: "^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[1-8][a-fA-F0-9]{3}-[89abAB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}$"
};
var id = {
  type: "string",
  minLength: 1,
  maxLength: 128,
  pattern: "^[A-Za-z0-9][A-Za-z0-9_-]*$"
};
var fileName = {
  type: "string",
  minLength: 1,
  maxLength: 200,
  pattern: "^[A-Za-z0-9][A-Za-z0-9._-]*$"
};
var amount2 = {
  type: "number",
  minimum: 0,
  maximum: 1e12
};
var flag = { type: "boolean" };
function text2(maxLength = 4096, minLength = 0) {
  return {
    type: "string",
    minLength,
    maxLength
  };
}
var externalFileName = text2(200, 1);
function object2(properties = {}, required = []) {
  return {
    type: "object",
    properties,
    required,
    additionalProperties: false,
    maxProperties: 64
  };
}
var category = { anyOf: [
  { type: "null" },
  { type: "string", enum: ["character", "prop", "part", "scene"] }
] };
var project = { anyOf: [{ type: "null" }, id] };
var values = {
  type: "object",
  maxProperties: 64,
  propertyNames: {
    type: "string",
    maxLength: 64,
    pattern: "^[A-Za-z0-9_-]+$"
  },
  additionalProperties: {
    anyOf: [
      text2(16384),
      {
        type: "number",
        minimum: -1e12,
        maximum: 1e12
      },
      flag,
      { type: "null" },
      {
        type: "array",
        maxItems: 128,
        items: text2(256)
      },
      {
        type: "array",
        maxItems: 4,
        items: object2({
          view: { type: "string", enum: ["front", "left", "back", "right"] },
          prompt: text2(4096)
        }, ["view", "prompt"])
      }
    ]
  }
};
var uploads = {
  type: "array",
  maxItems: 4,
  items: object2({
    role: { type: "string", enum: ["primary", "front", "left", "back", "right"] },
    uploadId: uuid2
  }, ["role", "uploadId"])
};
var input = {
  modelId: id,
  versionId: id,
  uploads
};
var runProperties = {
  libraryId: uuid2,
  idempotencyKey: uuid2,
  provider: id,
  operation: id,
  values,
  expectedPrice: amount2,
  ...input,
  name: text2(200, 1),
  project,
  category
};
var batchRow2 = object2({
  provider: id,
  operation: id,
  values,
  name: text2(200, 1),
  project,
  category,
  expectedPrice: amount2
}, ["provider", "operation", "values", "name", "project", "category", "expectedPrice"]);
var rows = {
  type: "array",
  minItems: 1,
  maxItems: 50,
  items: batchRow2
};
var snapshot = object2({
  libraryId: uuid2,
  rows,
  catalogVersion: text2(1e4, 1),
  totalEstimated: amount2,
  unit: { anyOf: [{ type: "null" }, object2({
    one: text2(128, 1),
    few: text2(128, 1),
    many: text2(128, 1)
  }, ["one", "few", "many"])] }
}, ["libraryId", "rows", "catalogVersion", "totalEstimated", "unit"]);
var withLibrary = (properties = {}, required = []) => object2({ libraryId: uuid2, ...properties }, ["libraryId", ...required]);
function installStudioValidation(server) {
  const strict = new import_ajv.Ajv({
    removeAdditional: false,
    coerceTypes: false,
    allErrors: false
  });
  const query = new import_ajv.Ajv({
    removeAdditional: false,
    coerceTypes: true,
    allErrors: false
  });
  server.setValidatorCompiler(({ schema, httpPart }) => (httpPart === "querystring" ? query : strict).compile(schema));
}

// src/server/index.ts
function param(request2, key) {
  const value = request2.params[key];
  if (typeof value !== "string") {
    throw new StudioHttpError(400, "invalid_request", "\u041E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440 \u0430\u0434\u0440\u0435\u0441\u0430.");
  }
  return value;
}
function requireEnvironment(options) {
  const core = options.core;
  if (typeof core.environment !== "function" || typeof core.project !== "function" || typeof core.listProjects !== "function" || typeof core.getProviders !== "function" || typeof core.acquireKernelFileLock !== "function" || typeof core.parseByteRange !== "function" || typeof core.documents?.roots !== "function" || typeof core.emit !== "function" || !options.plugin.dir || !path20.isAbsolute(options.plugin.dir) || !path20.isAbsolute(options.config.userPluginsDir)) {
    throw new StudioHttpError(409, "capability_unavailable", "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u0435 \u044F\u0434\u0440\u043E \u0434\u043B\u044F \u0440\u0430\u0431\u043E\u0442\u044B Studio3D.");
  }
  const environment = core.environment();
  if (!path20.isAbsolute(environment.runtimeRoot) || !path20.isAbsolute(environment.defaultLibraryDir) || !path20.isAbsolute(environment.nodeExecutable) || !Array.isArray(environment.protectedDirs) || environment.protectedDirs.some((directory) => !path20.isAbsolute(directory))) {
    throw new StudioHttpError(409, "capability_unavailable", "\u041F\u0443\u0442\u0438 runtime Studio3D \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B.");
  }
  return environment;
}
async function validateWorker(worker, generationRoot) {
  const file = fileURLToPath2(worker);
  const parent = path20.dirname(file);
  try {
    const [directory, entry, canonicalRoot, canonicalFile] = await Promise.all([
      fs16.lstat(parent),
      fs16.lstat(file),
      fs16.realpath(generationRoot),
      fs16.realpath(file)
    ]);
    if (!directory.isDirectory() || directory.isSymbolicLink() || !entry.isFile() || entry.isSymbolicLink() || entry.nlink !== 1 || canonicalRoot !== generationRoot || canonicalFile !== file || !file.startsWith(canonicalRoot + path20.sep)) {
      throw new Error("unsafe worker");
    }
  } catch {
    throw new StudioHttpError(409, "worker_unavailable", "GLB worker Studio3D \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0432\u044B\u043F\u0443\u0441\u043A.");
  }
}
function projectService(core) {
  return {
    list: () => core.listProjects(),
    /**
     * Missing public project сохраняет HTTP404 и безопасный product code.
     * Остальные ошибки сервиса не превращаются в выдуманный отсутствующий проект.
     */
    async read(id2) {
      try {
        return await core.project(id2);
      } catch (error) {
        const source = error;
        if (source?.statusCode === 404 || source?.status === 404) {
          throw new StudioHttpError(404, "project_not_found", "\u041F\u0440\u043E\u0435\u043A\u0442 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D.");
        }
        throw error;
      }
    }
  };
}
async function registerStudioServer(fastify, options, composition = {}) {
  const environment = requireEnvironment(options);
  const entryUrl = new URL(composition.entryUrl ?? import.meta.url);
  const generationRoot = fileURLToPath2(new URL(".", entryUrl));
  const workerUrl = new URL("./runtime/analysisWorker.mjs", entryUrl);
  const defaults = Object.fromEntries(options.plugin.settings.map((setting) => [setting.key, setting.default]));
  const prefs = () => options.prefs.read();
  const settings = () => {
    const values2 = prefs().pluginSettings;
    return { ...defaults, ...values2?.[options.plugin.id] };
  };
  const enabled = () => {
    const plugins = prefs().plugins;
    return plugins && Object.hasOwn(plugins, options.plugin.id) ? plugins[options.plugin.id] === true : options.plugin.defaultEnabled === true;
  };
  const projects = projectService(options.core);
  const broadcast = (name, data) => options.core.emit(name, data);
  const runtime = createStudioRuntime({
    ...composition.runtime,
    core: options.core,
    environment: {
      ...environment,
      protectedDirs: [...environment.protectedDirs, options.config.userPluginsDir]
    },
    pluginDir: options.plugin.dir,
    generationRoot: path20.resolve(generationRoot),
    prefix: options.prefix,
    defaults,
    documentReader: options.core.documents,
    projects: () => projects,
    createAnalysis: async () => {
      if (composition.analysis) {
        return createAnalysisScope({
          nodeExecutable: composition.analysis.nodeExecutable,
          workerUrl: composition.analysis.workerUrl
        });
      }
      await validateWorker(workerUrl, path20.resolve(generationRoot));
      return createAnalysisScope({ nodeExecutable: environment.nodeExecutable, workerUrl });
    },
    broadcast,
    enabled,
    settings
  });
  fastify.decorate("studio3d", runtime);
  options.lifecycle.prepareChange = (change, signal) => runtime.prepareChange(change, signal);
  options.lifecycle.busyReason = () => runtime.busyReason();
  options.lifecycle.notifications = (signal) => runtime.notifications(signal);
  fastify.addHook("onReady", () => {
    void runtime.start();
  });
  fastify.addHook("onClose", () => runtime.close());
  await fastify.register(async (server) => {
    installStudioValidation(server);
    server.addContentTypeParser(
      ["image/png", "image/webp"],
      {
        parseAs: "buffer",
        bodyLimit: 5 * 1024 * 1024
      },
      (_request, body, done) => done(null, body)
    );
    server.setErrorHandler((error, _request, reply) => {
      if (error.validation) {
        return reply.code(400).send({ error: "invalid_request", message: "\u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043F\u043E\u043B\u044F \u0437\u0430\u043F\u0440\u043E\u0441\u0430." });
      }
      const result = publicStudioError(error);
      return reply.code(result.status).send(result.body);
    });
    server.addHook("onRequest", async (request2, reply) => {
      if (!enabled()) {
        return reply.code(404).send({ error: "plugin_disabled", message: "\u041F\u043B\u0430\u0433\u0438\u043D \xAB3D\xBB \u0432\u044B\u043A\u043B\u044E\u0447\u0435\u043D." });
      }
      const routeUrl = request2.routeOptions?.url || "";
      const paid = /\/(?:run|retry|reconcile|close-unknown)(?:\?|$)/.test(routeUrl);
      if (paid && request2.authKind !== "session") {
        return reply.code(403).send({
          error: "human_session_required",
          message: "\u041D\u0443\u0436\u043D\u043E \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u0447\u0435\u043B\u043E\u0432\u0435\u043A\u0430 \u0432 \u043E\u043A\u043D\u0435."
        });
      }
      const release = await runtime.admission.locked(async () => enabled() ? runtime.admission.lease() : null);
      if (!release) {
        return reply.code(404).send({ error: "plugin_disabled", message: "\u041F\u043B\u0430\u0433\u0438\u043D \xAB3D\xBB \u0432\u044B\u043A\u043B\u044E\u0447\u0435\u043D." });
      }
      const events = ["finish", "close", "error"];
      let released = false;
      const complete = () => {
        if (released) {
          return;
        }
        released = true;
        for (const event of events) {
          reply.raw.removeListener(event, complete);
        }
        release();
      };
      for (const event of events) {
        reply.raw.once(event, complete);
      }
    });
    const route = (method, url, parts, handler, libraryRequired = method !== "GET") => {
      const binaryFile = method === "GET" && (url.startsWith("/files/") || url.startsWith("/viewer/file/"));
      server.route({
        method: binaryFile ? ["GET", "HEAD"] : method,
        exposeHeadRoute: false,
        url,
        bodyLimit: url.startsWith("/batches/") ? 16 * 1024 * 1024 : url.endsWith("/preview") ? 5 * 1024 * 1024 : 1024 * 1024,
        schema: {
          querystring: object2(),
          params: object2(),
          ...parts
        },
        handler: async (raw, reply) => {
          const request2 = raw;
          const captured = runtime.snapshot();
          const { context, generation } = captured;
          const libraryId = request2.body?.libraryId ?? request2.query?.libraryId;
          const check = (explicitId) => {
            if (explicitId !== void 0 || libraryRequired) {
              runtime.admission.capture(String(explicitId ?? libraryId ?? ""));
            }
            if (!runtime.current(context, generation)) {
              throw new StudioHttpError(409, "stale_library", "\u041A\u043E\u043D\u0442\u0435\u043A\u0441\u0442 \u0431\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0438 \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0441\u044F.");
            }
          };
          if (url !== "/uploads") {
            check();
          }
          const release = libraryRequired || method !== "GET" ? await runtime.admission.locked(async () => {
            if (url !== "/uploads") {
              check();
            }
            return runtime.admission.lease();
          }) : () => {
          };
          const operations = createLibraryOperations(context, {
            check,
            projects: () => projects,
            prefix: options.prefix,
            dismissModel: (modelId) => options.core.emit("notification", dismissStudioModel(modelId)),
            broadcast
          });
          try {
            const result = await handler(context, request2, reply, operations, check);
            if (!reply.sent) {
              check(url === "/uploads" ? context.library.libraryId : void 0);
            }
            return result;
          } finally {
            release();
          }
        }
      });
    };
    server.get(
      "/state",
      { schema: { querystring: object2(), params: object2() } },
      async () => runtime.state()
    );
    route("GET", "/models", { querystring: object2({
      q: text2(1024),
      project: id,
      category: text2(32),
      has: text2(128),
      origin: text2(32),
      provider: id,
      from: text2(32),
      to: text2(32),
      sort: { type: "string", enum: ["updated", "created", "name", "spent"] },
      offset: {
        type: "integer",
        minimum: 0,
        maximum: 1e6
      },
      limit: {
        type: "integer",
        minimum: 1,
        maximum: 200
      }
    }) }, async (_context, request2, _reply, operations) => operations.list(request2.query));
    const modelParams = object2({ id }, ["id"]);
    const versionParams = object2({ id, vid: id }, ["id", "vid"]);
    route(
      "GET",
      "/models/:id",
      { params: modelParams },
      async (_context, request2, _reply, operations) => operations.detail(param(request2, "id"))
    );
    route("POST", "/models", { body: withLibrary({
      name: text2(200, 1),
      project,
      category,
      uploadId: uuid2,
      path: text2(4096, 1),
      scope: text2(256)
    }) }, async (_context, request2, _reply, operations) => operations.createModel(request2.body));
    route("PATCH", "/models/:id", { params: modelParams, body: withLibrary({
      name: text2(200, 1),
      project,
      category,
      tags: {
        type: "array",
        maxItems: 32,
        items: text2(64, 1)
      },
      notes: text2(16384),
      mainVersion: { anyOf: [id, { type: "null" }] }
    }) }, async (context, request2, _reply, operations) => {
      const { libraryId: _libraryId, ...patch } = request2.body;
      await context.library.updateModel(
        param(request2, "id"),
        patch
      );
      operations.changed(param(request2, "id"));
      return operations.detail(param(request2, "id"));
    });
    route(
      "DELETE",
      "/models/:id",
      { params: modelParams, querystring: withLibrary() },
      async (context, request2, _reply, operations) => {
        await context.library.deleteModel(param(request2, "id"));
        operations.changed(param(request2, "id"), null, "deleted");
        return { libraryId: context.library.libraryId, ok: true };
      }
    );
    route(
      "DELETE",
      "/models/:id/versions/:vid",
      { params: versionParams, querystring: withLibrary() },
      async (context, request2, _reply, operations) => {
        await context.library.deleteVersion(param(request2, "id"), param(request2, "vid"));
        operations.changed(param(request2, "id"), param(request2, "vid"), "deleted");
        return { libraryId: context.library.libraryId, ok: true };
      }
    );
    route("POST", "/models/:id/versions/:vid/lighten", {
      params: versionParams,
      body: withLibrary({ force: flag })
    }, async (context, request2, _reply, operations) => {
      const freed = await context.library.lighten(
        param(request2, "id"),
        param(request2, "vid"),
        { force: request2.body.force }
      );
      operations.changed(param(request2, "id"), param(request2, "vid"), "lightened");
      return parseStudio3d.lighten({ libraryId: context.library.libraryId, freed });
    });
    route("POST", "/models/:id/versions/from-file", {
      params: modelParams,
      body: withLibrary({
        incoming: externalFileName,
        uploadId: uuid2,
        parentVersionId: id,
        label: text2(200)
      })
    }, async (_context, request2, _reply, operations) => operations.fromFile(
      param(request2, "id"),
      request2.body
    ));
    route("POST", "/models/:id/versions/:vid/save", {
      params: versionParams,
      body: withLibrary({
        projectId: id,
        repoKey: id,
        folder: text2(2048),
        fileName: externalFileName,
        overwrite: flag,
        expectedSha256: { type: "string", pattern: "^[a-f0-9]{64}$" }
      }, ["projectId", "repoKey", "folder", "fileName"])
    }, async (_context, request2, _reply, operations) => operations.save(
      param(request2, "id"),
      param(request2, "vid"),
      request2.body
    ));
    route("POST", "/models/:id/versions/:vid/preview", {
      params: versionParams,
      querystring: withLibrary()
    }, async (_context, request2, _reply, operations) => operations.preview(
      param(request2, "id"),
      param(request2, "vid"),
      request2.body,
      String(request2.headers["content-type"]).split(";")[0] ?? ""
    ));
    route("POST", "/models/:id/versions/:vid/retry", {
      params: versionParams,
      body: withLibrary(
        {
          idempotencyKey: uuid2,
          expectedPrice: amount2
        },
        ["idempotencyKey", "expectedPrice"]
      )
    }, async (context, request2, reply, operations) => {
      const item = await operations.version(param(request2, "id"), param(request2, "vid"));
      if (!item.intentId || !item.childId) {
        throw new StudioHttpError(409, "retry_unavailable", "\u0423 \u0432\u0435\u0440\u0441\u0438\u0438 \u043D\u0435\u0442 \u0437\u0430\u043A\u0430\u0437\u0430 \u0434\u043B\u044F \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u044F.");
      }
      const result = await context.jobs.retry(
        item.intentId,
        item.childId,
        request2.body
      );
      return reply.code(202).send(result);
    });
    route(
      "POST",
      "/models/:id/versions/:vid/redownload",
      {
        params: versionParams,
        body: withLibrary()
      },
      async (context, request2, _reply, operations) => {
        const item = await operations.version(param(request2, "id"), param(request2, "vid"));
        if (item.intentId && item.childId) {
          await context.jobs.redownload(item.intentId, item.childId, context.library.libraryId);
        } else if (item.task) {
          await context.importer.importTask(item.task.provider, item.task.id);
        } else {
          throw new StudioHttpError(409, "redownload_unavailable", "\u0423\u0434\u0430\u043B\u0451\u043D\u043D\u044B\u0439 \u0444\u0430\u0439\u043B \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D.");
        }
        return operations.projection(param(request2, "id"), await operations.version(param(
          request2,
          "id"
        ), param(request2, "vid")));
      }
    );
    route("GET", "/files/:modelId/:versionId/:name", { params: object2({
      modelId: id,
      versionId: id,
      name: fileName
    }, ["modelId", "versionId", "name"]) }, async (context, request2, reply) => {
      if (!isSafeName(param(request2, "name"))) {
        throw new StudioHttpError(400, "invalid_file", "\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u043E\u0435 \u0438\u043C\u044F \u0444\u0430\u0439\u043B\u0430.");
      }
      const opened = await context.library.openVersionFile(
        param(request2, "modelId"),
        param(request2, "versionId"),
        param(request2, "name")
      );
      return sendStudioFile(request2, reply, opened, opened.file.sha256, options.core.parseByteRange);
    });
    route(
      "POST",
      "/offers",
      { body: withLibrary(input) },
      async (context, request2) => {
        const provider = context.providers[0];
        const selected = await selectJobInputs(context.library, {
          ...request2.body,
          idempotencyKey: randomUUID8(),
          operation: "offers"
        }, provider, provider.snapshot?.());
        try {
          return parseStudio3d.offers({
            libraryId: context.library.libraryId,
            offers: await offersFor({
              providers: context.providers,
              version: selected.version,
              context: selected.context
            })
          });
        } finally {
          selected.release();
        }
      }
    );
    route("POST", "/quote", { body: withLibrary({
      ...input,
      provider: id,
      operation: id,
      values
    }, ["provider", "operation", "values"]) }, async (context, request2) => {
      const provider = context.providers.find((item) => item.id === request2.body.provider);
      if (!provider || !await provider.available()) {
        throw new StudioHttpError(409, "provider_unavailable", "\u0418\u0441\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D.");
      }
      const selected = await selectJobInputs(
        context.library,
        { ...request2.body, idempotencyKey: randomUUID8() },
        provider,
        provider.snapshot?.()
      );
      try {
        const validation2 = provider.validate(
          String(request2.body.operation),
          request2.body.values,
          selected.context
        );
        const quote2 = provider.quote(String(request2.body.operation), validation2.values, selected.context);
        return parseStudio3d.quote({
          libraryId: context.library.libraryId,
          quote: quote2,
          validation: validation2
        });
      } finally {
        selected.release();
      }
    });
    route(
      "POST",
      "/run",
      { body: object2(
        runProperties,
        ["libraryId", "idempotencyKey", "provider", "operation", "values", "expectedPrice"]
      ) },
      async (context, request2, reply) => reply.code(202).send(await context.jobs.run(request2.body))
    );
    route(
      "GET",
      "/jobs/:id",
      { params: modelParams, querystring: withLibrary() },
      async (context, request2) => context.jobs.job(
        param(request2, "id"),
        String(request2.query.libraryId)
      ),
      true
    );
    const childParams = object2({ id: uuid2, childId: id }, ["id", "childId"]);
    route("POST", "/jobs/:id/children/:childId/reconcile", {
      params: childParams,
      body: withLibrary({ taskId: id }, ["taskId"])
    }, async (context, request2) => context.jobs.reconcile(
      param(request2, "id"),
      param(request2, "childId"),
      request2.body
    ));
    route("POST", "/jobs/:id/children/:childId/close-unknown", {
      params: childParams,
      body: withLibrary()
    }, async (context, request2) => context.jobs.closeUnknown(
      param(request2, "id"),
      param(request2, "childId"),
      String(request2.body.libraryId)
    ));
    route(
      "POST",
      "/batches/quote",
      { body: withLibrary({ rows }, ["rows"]) },
      async (context, request2) => context.jobs.quoteBatch(
        request2.body
      )
    );
    route("POST", "/batches/run", { body: withLibrary({
      idempotencyKey: uuid2,
      snapshot,
      snapshotHash: { type: "string", pattern: "^[a-f0-9]{64}$" }
    }, ["idempotencyKey", "snapshot", "snapshotHash"]) }, async (context, request2, reply) => reply.code(202).send(await context.jobs.runBatch(
      request2.body
    )));
    route("POST", "/uploads", {}, async (context, request2, _reply, _operations, check) => receiveUpload(request2, context.library, check), false);
    route(
      "GET",
      "/tasks",
      { querystring: object2({ refresh: { type: "integer", enum: [1] } }) },
      async (context, request2) => {
        if (request2.query.refresh === 1) {
          await context.importer.syncHistory({ autoImport: settings().autoImport !== false });
        }
        const tasks = await context.jobs.tasks();
        const week = await context.importer.week();
        const cutoff = Date.now() - 864e5;
        return parseStudio3d.tasks({
          libraryId: context.library.libraryId,
          active: tasks.filter((row) => ACTIVE_STATUSES.includes(row.status)),
          recent: tasks.filter((row) => !ACTIVE_STATUSES.includes(row.status) && Date.parse(row.updatedAt) >= cutoff),
          external: await context.importer.externalTasks(),
          week: { partial: week.partial, groups: week.groups },
          historyPartial: week.partial,
          historyError: week.historyError
        });
      }
    );
    route("POST", "/tasks/:provider/:taskId/import", { params: object2({
      provider: id,
      taskId: id
    }, ["provider", "taskId"]), body: withLibrary() }, async (context, request2) => parseStudio3d.imported(await context.importer.importTask(
      param(request2, "provider"),
      param(request2, "taskId")
    )));
    route("POST", "/scan", { body: withLibrary() }, async (context) => parseStudio3d.scan(await context.importer.scan()));
    route("POST", "/viewer/resolve", { body: withLibrary({
      path: text2(4096, 1),
      scope: text2(256)
    }, ["path"]) }, async (context, request2) => parseStudio3d.viewer(
      await context.files.resolve(String(request2.body.path), String(request2.body.scope ?? ""))
    ));
    route("GET", "/viewer/file/:token/*", { params: object2({
      token: { type: "string", pattern: "^[a-f0-9]{48}$" },
      "*": text2(4096, 1)
    }, ["token", "*"]) }, async (context, request2, reply) => {
      const file = await context.files.viewerFile(param(request2, "token"), param(request2, "*"));
      return sendStudioFile(request2, reply, file.opened, file.sha256, options.core.parseByteRange);
    });
  });
  return runtime;
}
async function studio3dModule(app, options) {
  await registerStudioServer(app, options);
}
export {
  studio3dModule as default,
  registerStudioServer
};
