module.exports =
webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/* no static exports found */
/* all exports used */
/*!******************************************************!*\
  !*** ../~/ns-vue-loader/lib/component-normalizer.js ***!
  \******************************************************/
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.template = compiledTemplate.template
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 14 */,
/* 15 */
/* exports provided: Store, install, mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers, default */
/* exports used: default, mapState, mapGetters, mapActions */
/*!**********************************!*\
  !*** ../~/vuex/dist/vuex.esm.js ***!
  \**********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* unused harmony export Store */
/* unused harmony export install */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return mapState; });
/* unused harmony export mapMutations */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return mapActions; });
/* unused harmony export createNamespacedHelpers */
/**
 * vuex v2.5.0
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (process.env.NODE_ENV !== 'production') {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (process.env.NODE_ENV !== 'production') {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (process.env.NODE_ENV !== 'production') {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    process.env.NODE_ENV !== 'production' &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (process.env.NODE_ENV !== 'production') {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (process.env.NODE_ENV !== 'production') {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (process.env.NODE_ENV !== 'production' && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (process.env.NODE_ENV !== 'production' && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (process.env.NODE_ENV !== 'production') {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (process.env.NODE_ENV !== 'production' && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (process.env.NODE_ENV !== 'production' && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '2.5.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["a"] = (index_esm);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! ./../../process/browser.js */ 55)))

/***/ }),
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */
/* no static exports found */
/* exports used: default */
/*!*********************************************************!*\
  !*** ../~/nativescript-plugin-firebase/firebase.ios.js ***!
  \*********************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var firebase_common_1 = __webpack_require__(/*! ./firebase-common */ 141);
var application = __webpack_require__(/*! tns-core-modules/application */ 22);
var applicationSettings = __webpack_require__(/*! tns-core-modules/application-settings */ 56);
var utils = __webpack_require__(/*! tns-core-modules/utils/utils */ 1);
var types = __webpack_require__(/*! tns-core-modules/utils/types */ 6);
var platform = __webpack_require__(/*! tns-core-modules/platform */ 3);
var enums_1 = __webpack_require__(/*! tns-core-modules/ui/enums */ 25);
firebase_common_1.firebase._messagingConnected = null;
firebase_common_1.firebase._pendingNotifications = [];
firebase_common_1.firebase._receivedPushTokenCallback = null;
firebase_common_1.firebase._gIDAuthentication = null;
firebase_common_1.firebase._cachedInvitation = null;
firebase_common_1.firebase._cachedDynamicLink = null;
firebase_common_1.firebase._configured = false;
var invokeOnRunLoop = (function () {
    var runloop = CFRunLoopGetMain();
    return function (func) {
        CFRunLoopPerformBlock(runloop, kCFRunLoopDefaultMode, func);
        CFRunLoopWakeUp(runloop);
    };
})();
firebase_common_1.firebase._addObserver = function (eventName, callback) {
    var queue = utils.ios.getter(NSOperationQueue, NSOperationQueue.mainQueue);
    return utils.ios.getter(NSNotificationCenter, NSNotificationCenter.defaultCenter).addObserverForNameObjectQueueUsingBlock(eventName, null, queue, callback);
};
var handleRemoteNotification = function (app, userInfo) {
    var userInfoJSON = firebase_common_1.firebase.toJsObject(userInfo);
    var aps = userInfo.objectForKey("aps");
    if (aps !== null) {
        var alrt = aps.objectForKey("alert");
        if (alrt !== null && alrt.objectForKey) {
            userInfoJSON.title = alrt.objectForKey("title");
            userInfoJSON.body = alrt.objectForKey("body");
        }
    }
    firebase_common_1.firebase._pendingNotifications.push(userInfoJSON);
    if (app.applicationState === 0) {
        userInfoJSON.foreground = true;
        if (firebase_common_1.firebase._receivedNotificationCallback !== null) {
            firebase_common_1.firebase._processPendingNotifications();
        }
    }
    else {
        userInfoJSON.foreground = false;
    }
};
function addBackgroundRemoteNotificationHandler(appDelegate) {
    if (typeof (FIRMessaging) !== "undefined") {
        appDelegate.prototype.applicationDidReceiveRemoteNotificationFetchCompletionHandler = function (app, notification, completionHandler) {
            if (FIRAuth.auth().canHandleNotification(notification)) {
                completionHandler(1);
                return;
            }
            completionHandler(0);
            handleRemoteNotification(app, notification);
        };
    }
}
firebase_common_1.firebase.addAppDelegateMethods = function (appDelegate) {
    appDelegate.prototype.applicationDidFinishLaunchingWithOptions = function (application, launchOptions) {
        if (!firebase_common_1.firebase._configured) {
            firebase_common_1.firebase._configured = true;
            FIRApp.configure();
        }
        if (launchOptions && typeof (FIRMessaging) !== "undefined") {
            var remoteNotification = launchOptions.objectForKey(UIApplicationLaunchOptionsRemoteNotificationKey);
            if (remoteNotification) {
                handleRemoteNotification(application, remoteNotification);
            }
        }
        if (typeof (FBSDKApplicationDelegate) !== "undefined") {
            FBSDKApplicationDelegate.sharedInstance().applicationDidFinishLaunchingWithOptions(application, launchOptions);
        }
        return true;
    };
    if (typeof (FBSDKApplicationDelegate) !== "undefined" || typeof (GIDSignIn) !== "undefined" || typeof (FIRInvites) !== "undefined" || typeof (FIRDynamicLink) !== "undefined") {
        appDelegate.prototype.applicationOpenURLSourceApplicationAnnotation = function (application, url, sourceApplication, annotation) {
            var result = false;
            if (typeof (FBSDKApplicationDelegate) !== "undefined") {
                result = FBSDKApplicationDelegate.sharedInstance().applicationOpenURLSourceApplicationAnnotation(application, url, sourceApplication, annotation);
            }
            if (typeof (GIDSignIn) !== "undefined") {
                result = result || GIDSignIn.sharedInstance().handleURLSourceApplicationAnnotation(url, sourceApplication, annotation);
            }
            if (typeof (FIRInvites) !== "undefined") {
                var receivedInvite = FIRInvites.handleURLSourceApplicationAnnotation(url, sourceApplication, annotation);
                if (receivedInvite) {
                    console.log("Deep link from " + sourceApplication + ", Invite ID: " + receivedInvite.inviteId + ", App URL: " + receivedInvite.deepLink);
                    firebase_common_1.firebase._cachedInvitation = {
                        deepLink: receivedInvite.deepLink,
                        matchType: receivedInvite.matchType,
                        invitationId: receivedInvite.inviteId
                    };
                    result = true;
                }
            }
            if (typeof (FIRDynamicLink) !== "undefined") {
                var dynamicLink = FIRDynamicLinks.dynamicLinks().dynamicLinkFromCustomSchemeURL(url);
                if (dynamicLink) {
                    console.log(">>> dynamicLink.url.absoluteString: " + dynamicLink.url.absoluteString);
                    firebase_common_1.firebase._cachedDynamicLink = {
                        url: dynamicLink.url.absoluteString,
                        matchConfidence: dynamicLink.matchConfidence,
                        minimumAppVersion: dynamicLink.minimumAppVersion
                    };
                    result = true;
                }
            }
            return result;
        };
    }
    if (typeof (FBSDKApplicationDelegate) !== "undefined" || typeof (GIDSignIn) !== "undefined" || typeof (FIRDynamicLink) !== "undefined") {
        appDelegate.prototype.applicationOpenURLOptions = function (application, url, options) {
            var result = false;
            if (typeof (FBSDKApplicationDelegate) !== "undefined") {
                result = FBSDKApplicationDelegate.sharedInstance().applicationOpenURLSourceApplicationAnnotation(application, url, options.valueForKey(UIApplicationOpenURLOptionsSourceApplicationKey), options.valueForKey(UIApplicationOpenURLOptionsAnnotationKey));
            }
            if (typeof (GIDSignIn) !== "undefined") {
                result = result || GIDSignIn.sharedInstance().handleURLSourceApplicationAnnotation(url, options.valueForKey(UIApplicationOpenURLOptionsSourceApplicationKey), options.valueForKey(UIApplicationOpenURLOptionsAnnotationKey));
            }
            if (typeof (FIRDynamicLink) !== "undefined") {
                var dynamicLinks = FIRDynamicLinks.dynamicLinks();
                var dynamicLink = dynamicLinks.dynamicLinkFromCustomSchemeURL(url);
                if (dynamicLink) {
                    if (dynamicLink.url !== null) {
                        console.log(">>> dynamicLink.url.absoluteString: " + dynamicLink.url.absoluteString);
                        if (firebase_common_1.firebase._dynamicLinkCallback) {
                            firebase_common_1.firebase._dynamicLinkCallback({
                                url: dynamicLink.url.absoluteString,
                                matchConfidence: dynamicLink.matchConfidence,
                                minimumAppVersion: dynamicLink.minimumAppVersion
                            });
                        }
                        else {
                            firebase_common_1.firebase._cachedDynamicLink = {
                                url: dynamicLink.url.absoluteString,
                                matchConfidence: dynamicLink.matchConfidence,
                                minimumAppVersion: dynamicLink.minimumAppVersion
                            };
                        }
                        result = true;
                    }
                }
            }
            return result;
        };
    }
    if (typeof (FIRDynamicLink) !== "undefined") {
        appDelegate.prototype.applicationContinueUserActivityRestorationHandler = function (application, userActivity, restorationHandler) {
            var result = false;
            if (typeof (FIRDynamicLink) !== "undefined") {
                if (userActivity.webpageURL) {
                    result = FIRDynamicLinks.dynamicLinks().handleUniversalLinkCompletion(userActivity.webpageURL, function (dynamicLink, error) {
                        if (dynamicLink.url !== null) {
                            console.log(">>> dynamicLink.url.absoluteString: " + dynamicLink.url.absoluteString);
                            if (firebase_common_1.firebase._dynamicLinkCallback) {
                                firebase_common_1.firebase._dynamicLinkCallback({
                                    url: dynamicLink.url.absoluteString,
                                    matchConfidence: dynamicLink.matchConfidence,
                                    minimumAppVersion: dynamicLink.minimumAppVersion
                                });
                            }
                            else {
                                firebase_common_1.firebase._cachedDynamicLink = {
                                    url: dynamicLink.url.absoluteString,
                                    matchConfidence: dynamicLink.matchConfidence,
                                    minimumAppVersion: dynamicLink.minimumAppVersion
                                };
                            }
                        }
                    });
                }
            }
            return result;
        };
    }
    addBackgroundRemoteNotificationHandler(appDelegate);
};
firebase_common_1.firebase.fetchProvidersForEmail = function (email) {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof (email) !== "string") {
                reject("A parameter representing an email address is required.");
                return;
            }
            FIRAuth.auth().fetchProvidersForEmailCompletion(email, function (providerNSArray, error) {
                if (error) {
                    reject(error.localizedDescription);
                }
                else {
                    resolve(firebase_common_1.firebase.toJsObject(providerNSArray));
                }
            });
        }
        catch (ex) {
            console.log("Error in firebase.fetchProvidersForEmail: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.getCurrentPushToken = function () {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof (FIRMessaging) === "undefined") {
                reject("Enable FIRMessaging in Podfile first");
                return;
            }
            resolve(FIRMessaging.messaging().FCMToken);
        }
        catch (ex) {
            console.log("Error in firebase.getCurrentPushToken: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.addOnMessageReceivedCallback = function (callback) {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof (FIRMessaging) === "undefined") {
                reject("Enable FIRMessaging in Podfile first");
                return;
            }
            firebase_common_1.firebase._receivedNotificationCallback = callback;
            firebase_common_1.firebase._registerForRemoteNotifications();
            firebase_common_1.firebase._processPendingNotifications();
            resolve();
        }
        catch (ex) {
            console.log("Error in firebase.addOnMessageReceivedCallback: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.addOnDynamicLinkReceivedCallback = function (callback) {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof (FIRDynamicLink) === "undefined") {
                reject("Enable FIRInvites in Podfile first");
                return;
            }
            firebase_common_1.firebase._dynamicLinkCallback = callback;
            if (firebase_common_1.firebase._cachedDynamicLink !== null) {
                callback(firebase_common_1.firebase._cachedDynamicLink);
                firebase_common_1.firebase._cachedDynamicLink = null;
            }
            resolve();
        }
        catch (ex) {
            console.log("Error in firebase.addOnDynamicLinkReceivedCallback: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.addOnPushTokenReceivedCallback = function (callback) {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof (FIRMessaging) === "undefined") {
                reject("Enable FIRMessaging in Podfile first");
                return;
            }
            firebase_common_1.firebase._receivedPushTokenCallback = callback;
            if (firebase_common_1.firebase._pushToken) {
                callback(firebase_common_1.firebase._pushToken);
            }
            firebase_common_1.firebase._registerForRemoteNotifications();
            firebase_common_1.firebase._processPendingNotifications();
            resolve();
        }
        catch (ex) {
            console.log("Error in firebase.addOnPushTokenReceivedCallback: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.unregisterForPushNotifications = function () {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof (FIRMessaging) === "undefined") {
                reject("Enable FIRMessaging in Podfile first");
                return;
            }
            utils.ios.getter(UIApplication, UIApplication.sharedApplication).unregisterForRemoteNotifications();
            resolve();
        }
        catch (ex) {
            console.log("Error in firebase.unregisterForPushNotifications: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase._processPendingNotifications = function () {
    var app = utils.ios.getter(UIApplication, UIApplication.sharedApplication);
    if (!app) {
        application.on("launch", function () {
            firebase_common_1.firebase._processPendingNotifications();
        });
        return;
    }
    if (firebase_common_1.firebase._receivedNotificationCallback !== null) {
        for (var p in firebase_common_1.firebase._pendingNotifications) {
            var userInfoJSON = firebase_common_1.firebase._pendingNotifications[p];
            if (userInfoJSON.aps && userInfoJSON.aps.alert) {
                userInfoJSON.title = userInfoJSON.aps.alert.title;
                userInfoJSON.body = userInfoJSON.aps.alert.body;
            }
            userInfoJSON.data = userInfoJSON;
            userInfoJSON.aps = undefined;
            firebase_common_1.firebase._receivedNotificationCallback(userInfoJSON);
        }
        firebase_common_1.firebase._pendingNotifications = [];
        app.applicationIconBadgeNumber = 0;
    }
};
firebase_common_1.firebase._messagingConnectWithCompletion = function () {
    return new Promise(function (resolve, reject) {
        FIRMessaging.messaging().connectWithCompletion(function (error) {
            if (error) {
                return reject(error);
            }
            firebase_common_1.firebase._messagingConnected = true;
            resolve();
        });
    });
};
firebase_common_1.firebase._onTokenRefreshNotification = function (token) {
    firebase_common_1.firebase._pushToken = token;
    if (firebase_common_1.firebase._receivedPushTokenCallback) {
        firebase_common_1.firebase._receivedPushTokenCallback(token);
    }
    firebase_common_1.firebase._messagingConnectWithCompletion();
};
firebase_common_1.firebase._registerForRemoteNotificationsRanThisSession = false;
firebase_common_1.firebase._registerForRemoteNotifications = function () {
    var app = utils.ios.getter(UIApplication, UIApplication.sharedApplication);
    if (!app) {
        application.on("launch", function () {
            firebase_common_1.firebase._registerForRemoteNotifications();
        });
        return;
    }
    if (firebase_common_1.firebase._registerForRemoteNotificationsRanThisSession) {
    }
    firebase_common_1.firebase._registerForRemoteNotificationsRanThisSession = true;
    if (parseInt(platform.device.osVersion) >= 10) {
        var authorizationOptions = 4 | 2 | 1;
        var curNotCenter = utils.ios.getter(UNUserNotificationCenter, UNUserNotificationCenter.currentNotificationCenter);
        curNotCenter.requestAuthorizationWithOptionsCompletionHandler(authorizationOptions, function (granted, error) {
            if (!error) {
                if (app === null) {
                    app = utils.ios.getter(UIApplication, UIApplication.sharedApplication);
                }
                if (app !== null) {
                    invokeOnRunLoop(function () {
                        app.registerForRemoteNotifications();
                    });
                }
            }
            else {
                console.log("Error requesting push notification auth: " + error);
            }
        });
        firebase_common_1.firebase._userNotificationCenterDelegate = UNUserNotificationCenterDelegateImpl.new().initWithCallback(function (unnotification) {
            var userInfo = unnotification.request.content.userInfo;
            var userInfoJSON = firebase_common_1.firebase.toJsObject(userInfo);
            userInfoJSON.foreground = true;
            firebase_common_1.firebase._pendingNotifications.push(userInfoJSON);
            if (firebase_common_1.firebase._receivedNotificationCallback !== null) {
                firebase_common_1.firebase._processPendingNotifications();
            }
        });
        curNotCenter.delegate = firebase_common_1.firebase._userNotificationCenterDelegate;
        firebase_common_1.firebase._firebaseRemoteMessageDelegate = FIRMessagingDelegateImpl.new().initWithCallback(function (appDataDictionary) {
            var userInfoJSON = firebase_common_1.firebase.toJsObject(appDataDictionary);
            firebase_common_1.firebase._pendingNotifications.push(userInfoJSON);
            var asJs = firebase_common_1.firebase.toJsObject(appDataDictionary.objectForKey("notification"));
            if (asJs) {
                userInfoJSON.title = asJs.title;
                userInfoJSON.body = asJs.body;
            }
            var app = utils.ios.getter(UIApplication, UIApplication.sharedApplication);
            if (app.applicationState === 0) {
                userInfoJSON.foreground = true;
                if (firebase_common_1.firebase._receivedNotificationCallback !== null) {
                    firebase_common_1.firebase._processPendingNotifications();
                }
            }
            else {
                userInfoJSON.foreground = false;
            }
        });
        FIRMessaging.messaging().remoteMessageDelegate = firebase_common_1.firebase._firebaseRemoteMessageDelegate;
    }
    else {
        var notificationTypes = 4 | 1 | 2 | 1;
        var notificationSettings = UIUserNotificationSettings.settingsForTypesCategories(notificationTypes, null);
        invokeOnRunLoop(function () {
            app.registerForRemoteNotifications();
        });
        app.registerUserNotificationSettings(notificationSettings);
    }
};
function getAppDelegate() {
    if (application.ios.delegate === undefined) {
        var UIApplicationDelegateImpl = (function (_super) {
            __extends(UIApplicationDelegateImpl, _super);
            function UIApplicationDelegateImpl() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            UIApplicationDelegateImpl.ObjCProtocols = [UIApplicationDelegate];
            return UIApplicationDelegateImpl;
        }(UIResponder));
        application.ios.delegate = UIApplicationDelegateImpl;
    }
    return application.ios.delegate;
}
function prepAppDelegate() {
    if (typeof (FIRMessaging) !== "undefined") {
        firebase_common_1.firebase._addObserver("com.firebase.iid.notif.refresh-token", function (notification) { return firebase_common_1.firebase._onTokenRefreshNotification(notification.object); });
        firebase_common_1.firebase._addObserver(UIApplicationDidFinishLaunchingNotification, function (appNotification) {
            if (applicationSettings.getBoolean("registered", false)) {
                firebase_common_1.firebase._registerForRemoteNotifications();
            }
        });
        firebase_common_1.firebase._addObserver(UIApplicationDidBecomeActiveNotification, function (appNotification) {
            firebase_common_1.firebase._processPendingNotifications();
            if (!firebase_common_1.firebase._messagingConnected) {
                firebase_common_1.firebase._messagingConnectWithCompletion();
            }
        });
        firebase_common_1.firebase._addObserver(UIApplicationDidEnterBackgroundNotification, function (appNotification) {
            if (firebase_common_1.firebase._messagingConnected) {
                FIRMessaging.messaging().disconnect();
            }
        });
        firebase_common_1.firebase._addObserver(UIApplicationWillEnterForegroundNotification, function (appNotification) {
            if (firebase_common_1.firebase._messagingConnected !== null) {
                FIRMessaging.messaging().connectWithCompletion(function (error) {
                    if (!error) {
                        firebase_common_1.firebase._messagingConnected = true;
                    }
                });
            }
        });
    }
    firebase_common_1.firebase.addAppDelegateMethods(getAppDelegate());
}
prepAppDelegate();
firebase_common_1.firebase.toJsObject = function (objCObj) {
    if (objCObj === null || typeof objCObj !== "object") {
        return objCObj;
    }
    var node, key, i, l, oKeyArr = objCObj.allKeys;
    if (oKeyArr === undefined) {
        node = [];
        for (i = 0, l = objCObj.count; i < l; i++) {
            key = objCObj.objectAtIndex(i);
            node.push(firebase_common_1.firebase.toJsObject(key));
        }
    }
    else {
        node = {};
        for (i = 0, l = oKeyArr.count; i < l; i++) {
            key = oKeyArr.objectAtIndex(i);
            var val = objCObj.valueForKey(key);
            if (val === null) {
                node[key] = null;
                continue;
            }
            switch (types.getClass(val)) {
                case 'NSArray':
                case 'NSMutableArray':
                    node[key] = firebase_common_1.firebase.toJsObject(val);
                    break;
                case 'NSDictionary':
                case 'NSMutableDictionary':
                    node[key] = firebase_common_1.firebase.toJsObject(val);
                    break;
                case 'String':
                    node[key] = String(val);
                    break;
                case 'Boolean':
                    node[key] = val;
                    break;
                case 'Number':
                case 'NSDecimalNumber':
                    node[key] = Number(String(val));
                    break;
                case 'Date':
                    node[key] = new Date(val);
                    break;
                case 'FIRDocumentReference':
                    var path = val.path;
                    var lastSlashIndex = path.lastIndexOf("/");
                    node[key] = firebase_common_1.firebase.firestore._getDocumentReference(val, path.substring(0, lastSlashIndex), path.substring(lastSlashIndex + 1));
                    break;
                case 'FIRGeoPoint':
                    node[key] = {
                        latitude: val.latitude,
                        longitude: val.longitude
                    };
                    break;
                default:
                    console.log("Please report this at https://github.com/EddyVerbruggen/nativescript-plugin-firebase/issues: iOS toJsObject is missing a converter for class '" + types.getClass(val) + "'. Casting to String as a fallback.");
                    node[key] = String(val);
            }
        }
    }
    return node;
};
firebase_common_1.firebase.getCallbackData = function (type, snapshot) {
    return {
        type: type,
        key: snapshot.key,
        value: firebase_common_1.firebase.toJsObject(snapshot.value)
    };
};
firebase_common_1.firebase.authStateListener = null;
firebase_common_1.firebase.init = function (arg) {
    return new Promise(function (resolve, reject) {
        if (firebase_common_1.firebase.initialized) {
            reject("Firebase already initialized");
        }
        firebase_common_1.firebase.initialized = true;
        try {
            try {
                if (typeof (FIRServerValue) !== "undefined") {
                    firebase_common_1.firebase.ServerValue = {
                        TIMESTAMP: FIRServerValue.timestamp()
                    };
                }
            }
            catch (ignore) {
            }
            arg = arg || {};
            if (FIROptions.defaultOptions() !== null) {
                FIROptions.defaultOptions().deepLinkURLScheme = utils.ios.getter(NSBundle, NSBundle.mainBundle).bundleIdentifier;
            }
            if (!firebase_common_1.firebase._configured) {
                firebase_common_1.firebase._configured = true;
                FIRApp.configure();
            }
            if (typeof (FIRDatabase) !== "undefined") {
                if (arg.persist) {
                    FIRDatabase.database().persistenceEnabled = true;
                }
                firebase_common_1.firebase.instance = FIRDatabase.database().reference();
            }
            if (typeof (FIRFirestore) !== "undefined") {
                if (arg.persist === false) {
                    var fIRFirestoreSettings = FIRFirestoreSettings.new();
                    fIRFirestoreSettings.persistenceEnabled = false;
                    FIRFirestore.firestore().settings = fIRFirestoreSettings;
                }
            }
            if (arg.iOSEmulatorFlush) {
                try {
                    FIRAuth.auth().signOut();
                }
                catch (signOutErr) {
                    console.log('Sign out of Firebase error: ' + signOutErr);
                }
            }
            if (arg.onAuthStateChanged) {
                firebase_common_1.firebase.authStateListener = function (auth, user) {
                    arg.onAuthStateChanged({
                        loggedIn: user !== null,
                        user: toLoginResult(user)
                    });
                };
                FIRAuth.auth().addAuthStateDidChangeListener(firebase_common_1.firebase.authStateListener);
            }
            if (!firebase_common_1.firebase.authStateListener) {
                firebase_common_1.firebase.authStateListener = function (auth, user) {
                    firebase_common_1.firebase.notifyAuthStateListeners({
                        loggedIn: user !== null,
                        user: toLoginResult(user)
                    });
                };
                FIRAuth.auth().addAuthStateDidChangeListener(firebase_common_1.firebase.authStateListener);
            }
            if (arg.onDynamicLinkCallback !== undefined) {
                firebase_common_1.firebase.addOnDynamicLinkReceivedCallback(arg.onDynamicLinkCallback);
            }
            if (typeof (FBSDKAppEvents) !== "undefined") {
                FBSDKAppEvents.activateApp();
            }
            if (typeof (FIRMessaging) !== "undefined") {
                if (arg.onMessageReceivedCallback !== undefined || arg.onPushTokenReceivedCallback !== undefined) {
                    if (arg.onMessageReceivedCallback !== undefined) {
                        firebase_common_1.firebase.addOnMessageReceivedCallback(arg.onMessageReceivedCallback);
                    }
                    if (arg.onPushTokenReceivedCallback !== undefined) {
                        firebase_common_1.firebase.addOnPushTokenReceivedCallback(arg.onPushTokenReceivedCallback);
                    }
                }
            }
            if (arg.storageBucket) {
                if (typeof (FIRStorage) === "undefined") {
                    reject("Uncomment Storage in the plugin's Podfile first");
                    return;
                }
                firebase_common_1.firebase.storage = FIRStorage.storage().referenceForURL(arg.storageBucket);
            }
            resolve(firebase_common_1.firebase.instance);
        }
        catch (ex) {
            console.log("Error in firebase.init: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.analytics.logEvent = function (arg) {
    return new Promise(function (resolve, reject) {
        try {
            if (arg.key === undefined) {
                reject("Argument 'key' is missing");
                return;
            }
            var dic = NSMutableDictionary.new();
            if (arg.parameters !== undefined) {
                for (var p in arg.parameters) {
                    var param = arg.parameters[p];
                    if (param.value !== undefined) {
                        dic.setObjectForKey(param.value, param.key);
                    }
                }
            }
            FIRAnalytics.logEventWithNameParameters(arg.key, dic);
            resolve();
        }
        catch (ex) {
            console.log("Error in firebase.analytics.logEvent: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.analytics.setUserProperty = function (arg) {
    return new Promise(function (resolve, reject) {
        try {
            if (arg.key === undefined) {
                reject("Argument 'key' is missing");
                return;
            }
            if (arg.value === undefined) {
                reject("Argument 'value' is missing");
                return;
            }
            FIRAnalytics.setUserPropertyStringForName(arg.value, arg.key);
            resolve();
        }
        catch (ex) {
            console.log("Error in firebase.analytics.setUserProperty: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.analytics.setScreenName = function (arg) {
    return new Promise(function (resolve, reject) {
        try {
            if (arg.screenName === undefined) {
                reject("Argument 'screenName' is missing");
                return;
            }
            FIRAnalytics.setScreenNameScreenClass(arg.screenName, null);
            resolve();
        }
        catch (ex) {
            console.log("Error in firebase.analytics.setScreenName: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.admob.showBanner = function (arg) {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof (GADRequest) === "undefined") {
                reject("Uncomment AdMob in the plugin's Podfile first");
                return;
            }
            if (firebase_common_1.firebase.admob.adView !== null && firebase_common_1.firebase.admob.adView !== undefined) {
                firebase_common_1.firebase.admob.adView.removeFromSuperview();
                firebase_common_1.firebase.admob.adView = null;
            }
            firebase_common_1.firebase.admob.defaults.view = utils.ios.getter(UIApplication, UIApplication.sharedApplication).keyWindow.rootViewController.view;
            var settings = firebase_common_1.firebase.merge(arg, firebase_common_1.firebase.admob.defaults);
            var view = settings.view;
            var bannerType = firebase_common_1.firebase.admob._getBannerType(settings.size);
            var adWidth = bannerType.size.width === 0 ? view.frame.size.width : bannerType.size.width;
            var adHeight = bannerType.size.smartHeight ? bannerType.size.smartHeight : bannerType.size.height;
            var originX = (view.frame.size.width - adWidth) / 2;
            var originY = settings.margins.top > -1 ? settings.margins.top : (settings.margins.bottom > -1 ? view.frame.size.height - adHeight - settings.margins.bottom : 0.0);
            var origin = CGPointMake(originX, originY);
            firebase_common_1.firebase.admob.adView = GADBannerView.alloc().initWithAdSizeOrigin(bannerType, origin);
            firebase_common_1.firebase.admob.adView.adUnitID = settings.iosBannerId;
            var adRequest = GADRequest.request();
            if (settings.testing) {
                var testDevices = [];
                try {
                    testDevices.push(kGADSimulatorID);
                }
                catch (ignore) {
                }
                if (settings.iosTestDeviceIds) {
                    testDevices = testDevices.concat(settings.iosTestDeviceIds);
                }
                adRequest.testDevices = testDevices;
            }
            firebase_common_1.firebase.admob.adView.rootViewController = utils.ios.getter(UIApplication, UIApplication.sharedApplication).keyWindow.rootViewController;
            firebase_common_1.firebase.admob.adView.loadRequest(adRequest);
            view.addSubview(firebase_common_1.firebase.admob.adView);
            application.on(application.orientationChangedEvent, function (data) {
                if (firebase_common_1.firebase.admob.adView !== null) {
                    firebase_common_1.firebase.admob.hideBanner().then(function (res) {
                        firebase_common_1.firebase.admob.createBanner(arg);
                    });
                }
            });
            resolve();
        }
        catch (ex) {
            console.log("Error in firebase.admob.showBanner: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.admob.showInterstitial = function (arg) {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof (GADRequest) === "undefined") {
                reject("Uncomment AdMob in the plugin's Podfile first");
                return;
            }
            var settings = firebase_common_1.firebase.merge(arg, firebase_common_1.firebase.admob.defaults);
            firebase_common_1.firebase.admob.interstitialView = GADInterstitial.alloc().initWithAdUnitID(settings.iosInterstitialId);
            var delegate_1 = GADInterstitialDelegateImpl.new().initWithCallback(function (ad, error) {
                if (error) {
                    reject(error);
                }
                else {
                    firebase_common_1.firebase.admob.interstitialView.presentFromRootViewController(utils.ios.getter(UIApplication, UIApplication.sharedApplication).keyWindow.rootViewController);
                    resolve();
                }
                CFRelease(delegate_1);
                delegate_1 = undefined;
            });
            CFRetain(delegate_1);
            firebase_common_1.firebase.admob.interstitialView.delegate = delegate_1;
            var adRequest = GADRequest.request();
            if (settings.testing) {
                var testDevices = [];
                try {
                    testDevices.push(kGADSimulatorID);
                }
                catch (ignore) {
                }
                if (settings.iosTestDeviceIds) {
                    testDevices = testDevices.concat(settings.iosTestDeviceIds);
                }
                adRequest.testDevices = testDevices;
            }
            firebase_common_1.firebase.admob.interstitialView.loadRequest(adRequest);
        }
        catch (ex) {
            console.log("Error in firebase.admob.showInterstitial: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.admob.hideBanner = function () {
    return new Promise(function (resolve, reject) {
        try {
            if (firebase_common_1.firebase.admob.adView !== null) {
                firebase_common_1.firebase.admob.adView.removeFromSuperview();
                firebase_common_1.firebase.admob.adView = null;
            }
            resolve();
        }
        catch (ex) {
            console.log("Error in firebase.admob.hideBanner: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.admob._getBannerType = function (size) {
    if (size === firebase_common_1.firebase.admob.AD_SIZE.BANNER) {
        return { "size": { "width": 320, "height": 50 }, "flags": 0 };
    }
    else if (size === firebase_common_1.firebase.admob.AD_SIZE.LARGE_BANNER) {
        return { "size": { "width": 320, "height": 100 }, "flags": 0 };
    }
    else if (size === firebase_common_1.firebase.admob.AD_SIZE.MEDIUM_RECTANGLE) {
        return { "size": { "width": 300, "height": 250 }, "flags": 0 };
    }
    else if (size === firebase_common_1.firebase.admob.AD_SIZE.FULL_BANNER) {
        return { "size": { "width": 468, "height": 60 }, "flags": 0 };
    }
    else if (size === firebase_common_1.firebase.admob.AD_SIZE.LEADERBOARD) {
        return { "size": { "width": 728, "height": 90 }, "flags": 0 };
    }
    else if (size === firebase_common_1.firebase.admob.AD_SIZE.SKYSCRAPER) {
        return { "size": { "width": 120, "height": 600 }, "flags": 0 };
    }
    else if (size === firebase_common_1.firebase.admob.AD_SIZE.SMART_BANNER || size === firebase_common_1.firebase.admob.AD_SIZE.FLUID) {
        var orientation_1 = utils.ios.getter(UIDevice, UIDevice.currentDevice).orientation;
        var isIPad = platform.device.deviceType === enums_1.DeviceType.Tablet;
        if (orientation_1 === 1 || orientation_1 === 2) {
            return { "size": { "width": 0, "height": 0, "smartHeight": isIPad ? 90 : 50 }, "flags": 18 };
        }
        else {
            return { "size": { "width": 0, "height": 0, "smartHeight": isIPad ? 90 : 32 }, "flags": 26 };
        }
    }
    else {
        return { "size": { "width": -1, "height": -1 }, "flags": 0 };
    }
};
firebase_common_1.firebase.getRemoteConfig = function (arg) {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof (FIRRemoteConfig) === "undefined") {
                reject("Uncomment RemoteConfig in the plugin's Podfile first");
                return;
            }
            if (arg.properties === undefined) {
                reject("Argument 'properties' is missing");
                return;
            }
            var firebaseRemoteConfig_1 = FIRRemoteConfig.remoteConfig();
            firebaseRemoteConfig_1.configSettings = new FIRRemoteConfigSettings({ developerModeEnabled: arg.developerMode || false });
            var dic = NSMutableDictionary.new();
            for (var p in arg.properties) {
                var prop = arg.properties[p];
                if (prop.default !== undefined) {
                    dic.setObjectForKey(prop.default, prop.key);
                }
            }
            firebaseRemoteConfig_1.setDefaults(dic);
            var onCompletion = function (remoteConfigFetchStatus, error) {
                if (remoteConfigFetchStatus === 1 ||
                    remoteConfigFetchStatus === 3) {
                    var activated = firebaseRemoteConfig_1.activateFetched();
                    var result = {
                        lastFetch: firebaseRemoteConfig_1.lastFetchTime,
                        throttled: remoteConfigFetchStatus === 3,
                        properties: {}
                    };
                    for (var p in arg.properties) {
                        var prop = arg.properties[p];
                        var key = prop.key;
                        var value = firebaseRemoteConfig_1.configValueForKey(key).stringValue;
                        result.properties[key] = firebase_common_1.firebase.strongTypeify(value);
                    }
                    resolve(result);
                }
                else {
                    reject(error.localizedDescription);
                }
            };
            var expirationDuration = arg.cacheExpirationSeconds || 43200;
            firebaseRemoteConfig_1.fetchWithExpirationDurationCompletionHandler(expirationDuration, onCompletion);
        }
        catch (ex) {
            console.log("Error in firebase.getRemoteConfig: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.getCurrentUser = function (arg) {
    return new Promise(function (resolve, reject) {
        try {
            var fAuth = FIRAuth.auth();
            if (fAuth === null) {
                reject("Run init() first!");
                return;
            }
            var user = fAuth.currentUser;
            if (user) {
                resolve(toLoginResult(user));
            }
            else {
                reject();
            }
        }
        catch (ex) {
            console.log("Error in firebase.getCurrentUser: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.sendEmailVerification = function () {
    return new Promise(function (resolve, reject) {
        try {
            var fAuth = FIRAuth.auth();
            if (fAuth === null) {
                reject("Run init() first!");
                return;
            }
            var user = fAuth.currentUser;
            if (user) {
                var onCompletion = function (error) {
                    if (error) {
                        reject(error.localizedDescription);
                    }
                    else {
                        resolve(true);
                    }
                };
                user.sendEmailVerificationWithCompletion(onCompletion);
            }
            else {
                reject("Log in first");
            }
        }
        catch (ex) {
            console.log("Error in firebase.sendEmailVerification: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.logout = function (arg) {
    return new Promise(function (resolve, reject) {
        try {
            FIRAuth.auth().signOut();
            if (typeof (GIDSignIn) !== "undefined") {
                GIDSignIn.sharedInstance().disconnect();
            }
            if (typeof (FBSDKLoginManager) !== "undefined") {
                FBSDKLoginManager.alloc().logOut();
            }
            resolve();
        }
        catch (ex) {
            console.log("Error in firebase.logout: " + ex);
            reject(ex);
        }
    });
};
function toLoginResult(user) {
    if (!user) {
        return false;
    }
    var providers = [];
    for (var i = 0, l = user.providerData.count; i < l; i++) {
        var firUserInfo = user.providerData.objectAtIndex(i);
        var pid = firUserInfo.valueForKey("providerID");
        if (pid === 'facebook.com' && typeof (FBSDKAccessToken) !== "undefined") {
            var fbCurrentAccessToken = FBSDKAccessToken.currentAccessToken();
            providers.push({ id: pid, token: fbCurrentAccessToken ? fbCurrentAccessToken.tokenString : null });
        }
        else {
            providers.push({ id: pid });
        }
    }
    return {
        uid: user.uid,
        anonymous: user.anonymous,
        isAnonymous: user.anonymous,
        providers: providers,
        profileImageURL: user.photoURL ? user.photoURL.absoluteString : null,
        email: user.email,
        emailVerified: user.emailVerified,
        name: user.displayName,
        phoneNumber: user.phoneNumber,
        refreshToken: user.refreshToken
    };
}
firebase_common_1.firebase.getAuthToken = function (arg) {
    return new Promise(function (resolve, reject) {
        try {
            var fAuth = FIRAuth.auth();
            if (fAuth === null) {
                reject("Run init() first!");
                return;
            }
            var user = fAuth.currentUser;
            if (user) {
                var onCompletion = function (token, error) {
                    if (error) {
                        reject(error.localizedDescription);
                    }
                    else {
                        resolve(token);
                    }
                };
                user.getTokenForcingRefreshCompletion(arg.forceRefresh, onCompletion);
            }
            else {
                reject("Log in first");
            }
        }
        catch (ex) {
            console.log("Error in firebase.getAuthToken: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.login = function (arg) {
    return new Promise(function (resolve, reject) {
        try {
            var onCompletion_1 = function (user, error) {
                if (error) {
                    if (typeof (GIDSignIn) !== "undefined") {
                        GIDSignIn.sharedInstance().disconnect();
                    }
                    reject(error.localizedDescription);
                }
                else {
                    resolve(toLoginResult(user));
                    firebase_common_1.firebase.notifyAuthStateListeners({
                        loggedIn: true,
                        user: user
                    });
                }
            };
            var fAuth_1 = FIRAuth.auth();
            if (fAuth_1 === null) {
                reject("Run init() first!");
                return;
            }
            firebase_common_1.firebase.moveLoginOptionsToObjects(arg);
            if (arg.type === firebase_common_1.firebase.LoginType.ANONYMOUS) {
                fAuth_1.signInAnonymouslyWithCompletion(onCompletion_1);
            }
            else if (arg.type === firebase_common_1.firebase.LoginType.PASSWORD) {
                if (!arg.passwordOptions || !arg.passwordOptions.email || !arg.passwordOptions.password) {
                    reject("Auth type PASSWORD requires an 'passwordOptions.email' and 'passwordOptions.password' argument");
                    return;
                }
                var fIRAuthCredential_1 = FIREmailAuthProvider.credentialWithEmailPassword(arg.passwordOptions.email, arg.passwordOptions.password);
                if (fAuth_1.currentUser) {
                    var onCompletionLink = function (user, error) {
                        if (error) {
                            log("--- linking error: " + error.localizedDescription);
                            fAuth_1.signInWithCredentialCompletion(fIRAuthCredential_1, onCompletion_1);
                        }
                        else {
                            onCompletion_1(user);
                        }
                    };
                    fAuth_1.currentUser.linkWithCredentialCompletion(fIRAuthCredential_1, onCompletionLink);
                }
                else {
                    fAuth_1.signInWithEmailPasswordCompletion(arg.passwordOptions.email, arg.passwordOptions.password, onCompletion_1);
                }
            }
            else if (arg.type === firebase_common_1.firebase.LoginType.PHONE) {
                if (!arg.phoneOptions || !arg.phoneOptions.phoneNumber) {
                    reject("Auth type PHONE requires a 'phoneOptions.phoneNumber' argument");
                    return;
                }
                FIRPhoneAuthProvider.provider().verifyPhoneNumberCompletion(arg.phoneOptions.phoneNumber, function (verificationID, error) {
                    if (error) {
                        reject(error.localizedDescription);
                        return;
                    }
                    firebase_common_1.firebase.requestPhoneAuthVerificationCode(function (userResponse) {
                        var fIRAuthCredential = FIRPhoneAuthProvider.provider().credentialWithVerificationIDVerificationCode(verificationID, userResponse);
                        if (fAuth_1.currentUser) {
                            var onCompletionLink = function (user, error) {
                                if (error) {
                                    fAuth_1.signInWithCredentialCompletion(fIRAuthCredential, onCompletion_1);
                                }
                                else {
                                    onCompletion_1(user);
                                }
                            };
                            fAuth_1.currentUser.linkWithCredentialCompletion(fIRAuthCredential, onCompletionLink);
                        }
                        else {
                            fAuth_1.signInWithCredentialCompletion(fIRAuthCredential, onCompletion_1);
                        }
                    }, arg.phoneOptions.verificationPrompt);
                });
            }
            else if (arg.type === firebase_common_1.firebase.LoginType.CUSTOM) {
                if (!arg.customOptions || (!arg.customOptions.token && !arg.customOptions.tokenProviderFn)) {
                    reject("Auth type CUSTOM requires a 'customOptions.token' or 'customOptions.tokenProviderFn' argument");
                    return;
                }
                if (arg.customOptions.token) {
                    fAuth_1.signInWithCustomTokenCompletion(arg.customOptions.token, onCompletion_1);
                }
                else if (arg.customOptions.tokenProviderFn) {
                    arg.customOptions.tokenProviderFn()
                        .then(function (token) {
                        fAuth_1.signInWithCustomTokenCompletion(token, onCompletion_1);
                    }, function (error) {
                        reject(error);
                    });
                }
            }
            else if (arg.type === firebase_common_1.firebase.LoginType.FACEBOOK) {
                if (typeof (FBSDKLoginManager) === "undefined") {
                    reject("Facebook SDK not installed - see Podfile");
                    return;
                }
                var onFacebookCompletion = function (fbSDKLoginManagerLoginResult, error) {
                    if (error) {
                        console.log("Facebook login error " + error);
                        reject(error.localizedDescription);
                    }
                    else if (fbSDKLoginManagerLoginResult.isCancelled) {
                        reject("login cancelled");
                    }
                    else {
                        var fIRAuthCredential_2 = FIRFacebookAuthProvider.credentialWithAccessToken(FBSDKAccessToken.currentAccessToken().tokenString);
                        if (fAuth_1.currentUser) {
                            var onCompletionLink = function (user, error) {
                                if (error) {
                                    log("--- linking error: " + error.localizedDescription);
                                    fAuth_1.signInWithCredentialCompletion(fIRAuthCredential_2, onCompletion_1);
                                }
                                else {
                                    onCompletion_1(user);
                                }
                            };
                            fAuth_1.currentUser.linkWithCredentialCompletion(fIRAuthCredential_2, onCompletionLink);
                        }
                        else {
                            fAuth_1.signInWithCredentialCompletion(fIRAuthCredential_2, onCompletion_1);
                        }
                    }
                };
                var fbSDKLoginManager = FBSDKLoginManager.new();
                var scope = ["public_profile", "email"];
                if (arg.facebookOptions && arg.facebookOptions.scope) {
                    scope = arg.facebookOptions.scope;
                }
                fbSDKLoginManager.logInWithReadPermissionsFromViewControllerHandler(scope, null, onFacebookCompletion);
            }
            else if (arg.type === firebase_common_1.firebase.LoginType.GOOGLE) {
                if (typeof (GIDSignIn) === "undefined") {
                    reject("Google Sign In not installed - see Podfile");
                    return;
                }
                var sIn = GIDSignIn.sharedInstance();
                sIn.uiDelegate = application.ios.rootController;
                sIn.clientID = FIRApp.defaultApp().options.clientID;
                if (arg.googleOptions && arg.googleOptions.hostedDomain) {
                    sIn.hostedDomain = arg.googleOptions.hostedDomain;
                }
                var delegate_2 = GIDSignInDelegateImpl.new().initWithCallback(function (user, error) {
                    if (error === null) {
                        firebase_common_1.firebase._gIDAuthentication = user.authentication;
                        var fIRAuthCredential_3 = FIRGoogleAuthProvider.credentialWithIDTokenAccessToken(firebase_common_1.firebase._gIDAuthentication.idToken, firebase_common_1.firebase._gIDAuthentication.accessToken);
                        if (fAuth_1.currentUser) {
                            var onCompletionLink = function (user, error) {
                                if (error) {
                                    fAuth_1.signInWithCredentialCompletion(fIRAuthCredential_3, onCompletion_1);
                                }
                                else {
                                    onCompletion_1(user);
                                }
                            };
                            fAuth_1.currentUser.linkWithCredentialCompletion(fIRAuthCredential_3, onCompletionLink);
                        }
                        else {
                            fAuth_1.signInWithCredentialCompletion(fIRAuthCredential_3, onCompletion_1);
                        }
                    }
                    else {
                        reject(error.localizedDescription);
                    }
                    CFRelease(delegate_2);
                    delegate_2 = undefined;
                });
                CFRetain(delegate_2);
                sIn.delegate = delegate_2;
                sIn.signIn();
            }
            else {
                reject("Unsupported auth type: " + arg.type);
            }
        }
        catch (ex) {
            console.log("Error in firebase.login: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.reauthenticate = function (arg) {
    return new Promise(function (resolve, reject) {
        try {
            var fAuth = FIRAuth.auth();
            if (fAuth === null) {
                reject("Run init() first!");
                return;
            }
            var user = fAuth.currentUser;
            if (user === null) {
                reject("no current user");
                return;
            }
            firebase_common_1.firebase.moveLoginOptionsToObjects(arg);
            var authCredential = null;
            if (arg.type === firebase_common_1.firebase.LoginType.PASSWORD) {
                if (!arg.passwordOptions || !arg.passwordOptions.email || !arg.passwordOptions.password) {
                    reject("Auth type PASSWORD requires an 'passwordOptions.email' and 'passwordOptions.password' argument");
                    return;
                }
                authCredential = FIREmailAuthProvider.credentialWithEmailPassword(arg.passwordOptions.email, arg.passwordOptions.password);
            }
            else if (arg.type === firebase_common_1.firebase.LoginType.GOOGLE) {
                if (!firebase_common_1.firebase._gIDAuthentication) {
                    reject("Not currently logged in with Google");
                    return;
                }
                authCredential = FIRGoogleAuthProvider.credentialWithIDTokenAccessToken(firebase_common_1.firebase._gIDAuthentication.idToken, firebase_common_1.firebase._gIDAuthentication.accessToken);
            }
            else if (arg.type === firebase_common_1.firebase.LoginType.FACEBOOK) {
                var currentAccessToken = FBSDKAccessToken.currentAccessToken();
                if (!currentAccessToken) {
                    reject("Not currently logged in with Facebook");
                    return;
                }
                authCredential = FIRFacebookAuthProvider.credentialWithAccessToken(currentAccessToken.tokenString);
            }
            if (authCredential === null) {
                reject("arg.type should be one of LoginType.PASSWORD | LoginType.GOOGLE | LoginType.FACEBOOK");
                return;
            }
            var onCompletion = function (error) {
                if (error) {
                    reject(error.localizedDescription);
                }
                else {
                    resolve();
                }
            };
            user.reauthenticateWithCredentialCompletion(authCredential, onCompletion);
        }
        catch (ex) {
            console.log("Error in firebase.reauthenticate: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.reloadUser = function () {
    return new Promise(function (resolve, reject) {
        try {
            var user = FIRAuth.auth().currentUser;
            if (user === null) {
                reject("no current user");
                return;
            }
            var onCompletion = function (error) {
                if (error) {
                    reject(error.localizedDescription);
                }
                else {
                    resolve();
                }
            };
            user.reloadWithCompletion(onCompletion);
        }
        catch (ex) {
            console.log("Error in firebase.reloadUser: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.resetPassword = function (arg) {
    return new Promise(function (resolve, reject) {
        try {
            var onCompletion = function (error) {
                if (error) {
                    reject(error.localizedDescription);
                }
                else {
                    resolve();
                }
            };
            if (!arg.email) {
                reject("Resetting a password requires an email argument");
            }
            else {
                FIRAuth.auth().sendPasswordResetWithEmailCompletion(arg.email, onCompletion);
            }
        }
        catch (ex) {
            console.log("Error in firebase.resetPassword: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.changePassword = function (arg) {
    return new Promise(function (resolve, reject) {
        try {
            var onCompletion = function (error) {
                if (error) {
                    reject(error.localizedDescription);
                }
                else {
                    resolve();
                }
            };
            if (!arg.email || !arg.oldPassword || !arg.newPassword) {
                reject("Changing a password requires an email and an oldPassword and a newPassword arguments");
            }
            else {
                var user = FIRAuth.auth().currentUser;
                if (user === null) {
                    reject("no current user");
                }
                else {
                    user.updatePasswordCompletion(arg.newPassword, onCompletion);
                }
            }
        }
        catch (ex) {
            console.log("Error in firebase.changePassword: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.createUser = function (arg) {
    return new Promise(function (resolve, reject) {
        try {
            var onCompletion = function (user, error) {
                if (error) {
                    reject(error.localizedDescription);
                }
                else {
                    resolve({
                        key: user.uid
                    });
                }
            };
            if (!arg.email || !arg.password) {
                reject("Creating a user requires an email and password argument");
            }
            else {
                FIRAuth.auth().createUserWithEmailPasswordCompletion(arg.email, arg.password, onCompletion);
            }
        }
        catch (ex) {
            console.log("Error in firebase.createUser: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.deleteUser = function (arg) {
    return new Promise(function (resolve, reject) {
        try {
            var user = FIRAuth.auth().currentUser;
            if (user === null) {
                reject("no current user");
                return;
            }
            var onCompletion = function (error) {
                if (error) {
                    reject(error.localizedDescription);
                }
                else {
                    resolve();
                }
            };
            user.deleteWithCompletion(onCompletion);
        }
        catch (ex) {
            console.log("Error in firebase.deleteUser: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.updateProfile = function (arg) {
    return new Promise(function (resolve, reject) {
        try {
            var onCompletion = function (error) {
                if (error) {
                    reject(error.localizedDescription);
                }
                else {
                    resolve();
                }
            };
            var fAuth = FIRAuth.auth();
            if (fAuth === null) {
                reject("Run init() first!");
                return;
            }
            if (!arg.displayName && !arg.photoURL) {
                reject("Updating a profile requires a displayName and / or a photoURL argument");
            }
            else {
                var user = fAuth.currentUser;
                if (user) {
                    var changeRequest = user.profileChangeRequest();
                    changeRequest.displayName = arg.displayName;
                    changeRequest.photoURL = NSURL.URLWithString(arg.photoURL);
                    changeRequest.commitChangesWithCompletion(onCompletion);
                }
                else {
                    reject();
                }
            }
        }
        catch (ex) {
            console.log("Error in firebase.updateProfile: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase._addObservers = function (to, updateCallback) {
    var listeners = [];
    listeners.push(to.observeEventTypeWithBlock(0, function (snapshot) {
        updateCallback(firebase_common_1.firebase.getCallbackData('ChildAdded', snapshot));
    }));
    listeners.push(to.observeEventTypeWithBlock(1, function (snapshot) {
        updateCallback(firebase_common_1.firebase.getCallbackData('ChildRemoved', snapshot));
    }));
    listeners.push(to.observeEventTypeWithBlock(2, function (snapshot) {
        updateCallback(firebase_common_1.firebase.getCallbackData('ChildChanged', snapshot));
    }));
    listeners.push(to.observeEventTypeWithBlock(3, function (snapshot) {
        updateCallback(firebase_common_1.firebase.getCallbackData('ChildMoved', snapshot));
    }));
    return listeners;
};
firebase_common_1.firebase.keepInSync = function (path, switchOn) {
    return new Promise(function (resolve, reject) {
        try {
            var where = firebase_common_1.firebase.instance.childByAppendingPath(path);
            where.keepSynced(switchOn);
            resolve();
        }
        catch (ex) {
            console.log("Error in firebase.keepInSync: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.addChildEventListener = function (updateCallback, path) {
    return new Promise(function (resolve, reject) {
        try {
            var where = path === undefined ? firebase_common_1.firebase.instance : firebase_common_1.firebase.instance.childByAppendingPath(path);
            resolve({
                path: path,
                listeners: firebase_common_1.firebase._addObservers(where, updateCallback)
            });
        }
        catch (ex) {
            console.log("Error in firebase.addChildEventListener: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.addValueEventListener = function (updateCallback, path) {
    return new Promise(function (resolve, reject) {
        try {
            var where = path === undefined ? firebase_common_1.firebase.instance : firebase_common_1.firebase.instance.childByAppendingPath(path);
            var listener = where.observeEventTypeWithBlockWithCancelBlock(4, function (snapshot) {
                updateCallback(firebase_common_1.firebase.getCallbackData('ValueChanged', snapshot));
            }, function (firebaseError) {
                updateCallback({
                    error: firebaseError.localizedDescription
                });
            });
            resolve({
                path: path,
                listeners: [listener]
            });
        }
        catch (ex) {
            console.log("Error in firebase.addChildEventListener: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.getValue = function (path) {
    return new Promise(function (resolve, reject) {
        try {
            var where = path === undefined ? firebase_common_1.firebase.instance : firebase_common_1.firebase.instance.childByAppendingPath(path);
            var listener = where.observeSingleEventOfTypeWithBlockWithCancelBlock(4, function (snapshot) {
                resolve(firebase_common_1.firebase.getCallbackData('ValueChanged', snapshot));
            }, function (firebaseError) {
                reject(firebaseError.localizedDescription);
            });
        }
        catch (ex) {
            console.log("Error in firebase.getValue: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.removeEventListeners = function (listeners, path) {
    return new Promise(function (resolve, reject) {
        try {
            var where = path === undefined ? firebase_common_1.firebase.instance : firebase_common_1.firebase.instance.childByAppendingPath(path);
            for (var i = 0; i < listeners.length; i++) {
                var listener = listeners[i];
                where.removeObserverWithHandle(listener);
            }
            resolve();
        }
        catch (ex) {
            console.log("Error in firebase.removeEventListeners: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.push = function (path, val) {
    return new Promise(function (resolve, reject) {
        try {
            var ref = firebase_common_1.firebase.instance.childByAppendingPath(path).childByAutoId();
            ref.setValue(val);
            resolve({
                key: ref.key
            });
        }
        catch (ex) {
            console.log("Error in firebase.push: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.setValue = function (path, val) {
    return new Promise(function (resolve, reject) {
        try {
            firebase_common_1.firebase.instance.childByAppendingPath(path).setValue(val);
            resolve();
        }
        catch (ex) {
            console.log("Error in firebase.setValue: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.update = function (path, val) {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof val === "object") {
                firebase_common_1.firebase.instance.childByAppendingPath(path).updateChildValues(val);
            }
            else {
                var lastPartOfPath = path.lastIndexOf("/");
                var pathPrefix = path.substring(0, lastPartOfPath);
                var pathSuffix = path.substring(lastPartOfPath + 1);
                var updateObject = '{"' + pathSuffix + '" : "' + val + '"}';
                firebase_common_1.firebase.instance.childByAppendingPath(pathPrefix).updateChildValues(JSON.parse(updateObject));
            }
            resolve();
        }
        catch (ex) {
            console.log("Error in firebase.update: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.query = function (updateCallback, path, options) {
    return new Promise(function (resolve, reject) {
        try {
            var where = path === undefined ? firebase_common_1.firebase.instance : firebase_common_1.firebase.instance.childByAppendingPath(path);
            var query = void 0;
            if (options.orderBy.type === firebase_common_1.firebase.QueryOrderByType.KEY) {
                query = where.queryOrderedByKey();
            }
            else if (options.orderBy.type === firebase_common_1.firebase.QueryOrderByType.VALUE) {
                query = where.queryOrderedByValue();
            }
            else if (options.orderBy.type === firebase_common_1.firebase.QueryOrderByType.PRIORITY) {
                query = where.queryOrderedByPriority();
            }
            else if (options.orderBy.type === firebase_common_1.firebase.QueryOrderByType.CHILD) {
                if (options.orderBy.value === undefined || options.orderBy.value === null) {
                    reject("When orderBy.type is 'child' you must set orderBy.value as well.");
                    return;
                }
                query = where.queryOrderedByChild(options.orderBy.value);
            }
            else {
                reject("Invalid orderBy.type, use constants like firebase.QueryOrderByType.VALUE");
                return;
            }
            if (options.range && options.range.type) {
                if (options.range.type === firebase_common_1.firebase.QueryRangeType.START_AT) {
                    query = query.queryStartingAtValue(options.range.value);
                }
                else if (options.range.type === firebase_common_1.firebase.QueryRangeType.END_AT) {
                    query = query.queryEndingAtValue(options.range.value);
                }
                else if (options.range.type === firebase_common_1.firebase.QueryRangeType.EQUAL_TO) {
                    query = query.queryEqualToValue(options.range.value);
                }
                else {
                    reject("Invalid range.type, use constants like firebase.QueryRangeType.START_AT");
                    return;
                }
            }
            if (options.ranges) {
                for (var i = 0; i < options.ranges.length; i++) {
                    var range = options.ranges[i];
                    if (range.value === undefined || range.value === null) {
                        reject("Please set ranges[" + i + "].value");
                        return;
                    }
                    if (range.type === firebase_common_1.firebase.QueryRangeType.START_AT) {
                        query = query.queryStartingAtValue(range.value);
                    }
                    else if (range.type === firebase_common_1.firebase.QueryRangeType.END_AT) {
                        query = query.queryEndingAtValue(range.value);
                    }
                    else if (range.type === firebase_common_1.firebase.QueryRangeType.EQUAL_TO) {
                        query = query.queryEqualToValue(range.value);
                    }
                    else {
                        reject("Invalid ranges[" + i + "].type, use constants like firebase.QueryRangeType.START_AT");
                        return;
                    }
                }
            }
            if (options.limit && options.limit.type) {
                if (options.limit.value === undefined || options.limit.value === null) {
                    reject("Please set limit.value");
                    return;
                }
                if (options.limit.type === firebase_common_1.firebase.QueryLimitType.FIRST) {
                    query = query.queryLimitedToFirst(options.limit.value);
                }
                else if (options.limit.type === firebase_common_1.firebase.QueryLimitType.LAST) {
                    query = query.queryLimitedToLast(options.limit.value);
                }
                else {
                    reject("Invalid limit.type, use constants like firebase.queryOptions.limitType.FIRST");
                    return;
                }
            }
            if (options.singleEvent) {
                query.observeSingleEventOfTypeWithBlock(4, function (snapshot) {
                    if (updateCallback)
                        updateCallback(firebase_common_1.firebase.getCallbackData('ValueChanged', snapshot));
                    resolve(firebase_common_1.firebase.getCallbackData('ValueChanged', snapshot));
                });
            }
            else {
                resolve({
                    path: path,
                    listeners: firebase_common_1.firebase._addObservers(query, updateCallback)
                });
            }
        }
        catch (ex) {
            console.log("Error in firebase.query: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.remove = function (path) {
    return new Promise(function (resolve, reject) {
        try {
            firebase_common_1.firebase.instance.childByAppendingPath(path).setValue(null);
            resolve();
        }
        catch (ex) {
            console.log("Error in firebase.remove: " + ex);
            reject(ex);
        }
    });
};
function getStorageRef(reject, arg) {
    if (typeof (FIRStorage) === "undefined") {
        reject("Uncomment Storage in the plugin's Podfile first");
        return;
    }
    if (!arg.remoteFullPath) {
        reject("remoteFullPath is mandatory");
        return;
    }
    return arg.bucket ? FIRStorage.storage().referenceForURL(arg.bucket) : firebase_common_1.firebase.storage;
}
firebase_common_1.firebase.uploadFile = function (arg) {
    return new Promise(function (resolve, reject) {
        try {
            var onCompletion = function (metadata, error) {
                if (error) {
                    reject(error.localizedDescription);
                }
                else {
                    resolve({
                        name: metadata.name,
                        url: metadata.downloadURL() ? metadata.downloadURL().absoluteString : null,
                        contentType: metadata.contentType,
                        created: metadata.timeCreated,
                        updated: metadata.updated,
                        bucket: metadata.bucket,
                        size: metadata.size
                    });
                }
            };
            var storageRef = getStorageRef(reject, arg);
            if (!storageRef) {
                return;
            }
            var fIRStorageReference = storageRef.child(arg.remoteFullPath);
            var fIRStorageUploadTask = null;
            if (arg.localFile) {
                if (typeof (arg.localFile) !== "object") {
                    reject("localFile argument must be a File object; use file-system module to create one");
                    return;
                }
                fIRStorageUploadTask = fIRStorageReference.putFileMetadataCompletion(NSURL.fileURLWithPath(arg.localFile.path), null, onCompletion);
            }
            else if (arg.localFullPath) {
                fIRStorageUploadTask = fIRStorageReference.putFileMetadataCompletion(NSURL.fileURLWithPath(arg.localFullPath), null, onCompletion);
            }
            else {
                reject("One of localFile or localFullPath is required");
                return;
            }
            if (fIRStorageUploadTask !== null) {
                var fIRStorageHandle = fIRStorageUploadTask.observeStatusHandler(2, function (snapshot) {
                    if (!snapshot.error && typeof (arg.onProgress) === "function") {
                        arg.onProgress({
                            fractionCompleted: snapshot.progress.fractionCompleted,
                            percentageCompleted: Math.round(snapshot.progress.fractionCompleted * 100)
                        });
                    }
                });
            }
        }
        catch (ex) {
            console.log("Error in firebase.uploadFile: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.downloadFile = function (arg) {
    return new Promise(function (resolve, reject) {
        try {
            var onCompletion = function (url, error) {
                if (error) {
                    reject(error.localizedDescription);
                }
                else {
                    resolve(url.absoluteString);
                }
            };
            var storageRef = getStorageRef(reject, arg);
            if (!storageRef) {
                return;
            }
            var fIRStorageReference = storageRef.child(arg.remoteFullPath);
            var localFilePath = void 0;
            if (arg.localFile) {
                if (typeof (arg.localFile) !== "object") {
                    reject("localFile argument must be a File object; use file-system module to create one");
                    return;
                }
                localFilePath = arg.localFile.path;
            }
            else if (arg.localFullPath) {
                localFilePath = arg.localFullPath;
            }
            else {
                reject("One of localFile or localFullPath is required");
                return;
            }
            var localFileUrl = NSURL.fileURLWithPath(localFilePath);
            var fIRStorageDownloadTask = fIRStorageReference.writeToFileCompletion(localFileUrl, onCompletion);
        }
        catch (ex) {
            console.log("Error in firebase.downloadFile: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.getDownloadUrl = function (arg) {
    return new Promise(function (resolve, reject) {
        try {
            var onCompletion = function (url, error) {
                if (error) {
                    reject(error.localizedDescription);
                }
                else {
                    resolve(url.absoluteString);
                }
            };
            var storageRef = getStorageRef(reject, arg);
            if (!storageRef) {
                return;
            }
            var fIRStorageReference = storageRef.child(arg.remoteFullPath);
            fIRStorageReference.downloadURLWithCompletion(onCompletion);
        }
        catch (ex) {
            console.log("Error in firebase.getDownloadUrl: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.deleteFile = function (arg) {
    return new Promise(function (resolve, reject) {
        try {
            var onCompletion = function (error) {
                if (error) {
                    reject(error.localizedDescription);
                }
                else {
                    resolve();
                }
            };
            var storageRef = getStorageRef(reject, arg);
            if (!storageRef) {
                return;
            }
            var fIRStorageFileRef = storageRef.child(arg.remoteFullPath);
            fIRStorageFileRef.deleteWithCompletion(onCompletion);
        }
        catch (ex) {
            console.log("Error in firebase.deleteFile: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.subscribeToTopic = function (topicName) {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof (FIRMessaging) === "undefined") {
                reject("Enable FIRMessaging in Podfile first");
                return;
            }
            if (topicName.indexOf("/topics/") === -1) {
                topicName = "/topics/" + topicName;
            }
            FIRMessaging.messaging().subscribeToTopic(topicName);
            resolve();
        }
        catch (ex) {
            console.log("Error in firebase.subscribeToTopic: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.unsubscribeFromTopic = function (topicName) {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof (FIRMessaging) === "undefined") {
                reject("Enable FIRMessaging in Podfile first");
                return;
            }
            if (topicName.indexOf("/topics/") === -1) {
                topicName = "/topics/" + topicName;
            }
            FIRMessaging.messaging().unsubscribeFromTopic(topicName);
            resolve();
        }
        catch (ex) {
            console.log("Error in firebase.unsubscribeFromTopic: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.sendCrashLog = function (arg) {
    return new Promise(function (resolve, reject) {
        try {
            resolve();
        }
        catch (ex) {
            console.log("Error in firebase.sendCrashLog: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.invites.sendInvitation = function (arg) {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof (FIRInvites) === "undefined") {
                reject("Make sure 'Firebase/Invites' is in the plugin's Podfile");
                return;
            }
            if (!arg.message || !arg.title) {
                reject("The mandatory 'message' or 'title' argument is missing");
                return;
            }
            var inviteDialog = FIRInvites.inviteDialog();
            inviteDialog.performSelectorWithObject("setMessage:", arg.message);
            inviteDialog.performSelectorWithObject("setTitle:", arg.title);
            if (arg.deepLink) {
                inviteDialog.performSelectorWithObject("setDeepLink:", arg.deeplink);
            }
            if (arg.callToActionText) {
                inviteDialog.performSelectorWithObject("setCallToActionText:", arg.callToActionText);
            }
            if (arg.customImage) {
                inviteDialog.performSelectorWithObject("setCustomImage:", arg.customImage);
            }
            if (arg.androidClientID) {
                var targetApplication = FIRInvitesTargetApplication.new();
                targetApplication.androidClientID = arg.androidClientID;
                inviteDialog.performSelectorWithObject("setOtherPlatformsTargetApplication:", targetApplication);
            }
            var delegate_3 = FIRInviteDelegateImpl.new().initWithCallback(function (invitationIds, error) {
                if (error === null) {
                    var ids = firebase_common_1.firebase.toJsObject(invitationIds);
                    resolve({
                        count: invitationIds.count,
                        invitationIds: ids
                    });
                }
                else {
                    reject(error.localizedDescription);
                }
                CFRelease(delegate_3);
                delegate_3 = undefined;
            });
            CFRetain(delegate_3);
            inviteDialog.performSelectorWithObject("setInviteDelegate:", delegate_3);
            inviteDialog.performSelector("open");
        }
        catch (ex) {
            console.log("Error in firebase.sendInvitation: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.invites.getInvitation = function () {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof (FIRInvites) === "undefined") {
                reject("Make sure 'Firebase/Invites' is in the plugin's Podfile");
                return;
            }
            if (firebase_common_1.firebase._cachedInvitation !== null) {
                resolve(firebase_common_1.firebase._cachedInvitation);
                firebase_common_1.firebase.cachedInvitation = null;
            }
            else {
                reject("Not launched by invitation");
            }
        }
        catch (ex) {
            console.log("Error in firebase.getInvitation: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.firestore.collection = function (collectionPath) {
    try {
        if (typeof (FIRFirestore) === "undefined") {
            console.log("Make sure 'Firebase/Firestore' is in the plugin's Podfile");
            return null;
        }
        var fIRCollectionReference_1 = FIRFirestore.firestore().collectionWithPath(collectionPath);
        return {
            id: fIRCollectionReference_1.collectionID,
            doc: function (documentPath) { return firebase_common_1.firebase.firestore.doc(collectionPath, documentPath); },
            add: function (document) { return firebase_common_1.firebase.firestore.add(collectionPath, document); },
            get: function () { return firebase_common_1.firebase.firestore.get(collectionPath); },
            where: function (fieldPath, opStr, value) { return firebase_common_1.firebase.firestore.where(collectionPath, fieldPath, opStr, value); },
            orderBy: function (fieldPath, directionStr) { return firebase_common_1.firebase.firestore.orderBy(collectionPath, fieldPath, directionStr, fIRCollectionReference_1); },
            limit: function (limit) { return firebase_common_1.firebase.firestore.limit(collectionPath, limit, fIRCollectionReference_1); },
            onSnapshot: function (callback) { return firebase_common_1.firebase.firestore.onCollectionSnapshot(fIRCollectionReference_1, callback); }
        };
    }
    catch (ex) {
        console.log("Error in firebase.firestore.collection: " + ex);
        return null;
    }
};
firebase_common_1.firebase.firestore.onDocumentSnapshot = function (docRef, callback) {
    var listener = docRef.addSnapshotListener(function (snapshot, error) {
        callback(new firebase_common_1.DocumentSnapshot(snapshot ? snapshot.documentID : null, !!snapshot, snapshot ? function () { return firebase_common_1.firebase.toJsObject(snapshot.data()); } : null));
    });
    if (listener.remove === undefined) {
        return function () {
            callback = function () {
            };
        };
    }
    else {
        return function () { return listener.remove(); };
    }
};
firebase_common_1.firebase.firestore.onCollectionSnapshot = function (colRef, callback) {
    var listener = colRef.addSnapshotListener(function (snapshot, error) {
        var docSnapshots = [];
        var _loop_1 = function (i, l) {
            var document_1 = snapshot.documents.objectAtIndex(i);
            docSnapshots.push(new firebase_common_1.DocumentSnapshot(document_1.documentID, true, function () { return firebase_common_1.firebase.toJsObject(document_1.data()); }));
        };
        for (var i = 0, l = snapshot.documents.count; i < l; i++) {
            _loop_1(i, l);
        }
        var snap = new firebase_common_1.QuerySnapshot();
        snap.docSnapshots = docSnapshots;
        callback(snap);
    });
    if (listener.remove === undefined) {
        return function () {
            callback = function () {
            };
        };
    }
    else {
        return function () { return listener.remove(); };
    }
};
firebase_common_1.firebase.firestore._getDocumentReference = function (fIRDocumentReference, collectionPath, documentPath) {
    return {
        id: fIRDocumentReference.documentID,
        collection: function (cp) { return firebase_common_1.firebase.firestore.collection(collectionPath + "/" + documentPath + "/" + cp); },
        set: function (data, options) { return firebase_common_1.firebase.firestore.set(collectionPath, fIRDocumentReference.documentID, data, options); },
        get: function () { return firebase_common_1.firebase.firestore.getDocument(collectionPath, fIRDocumentReference.documentID); },
        update: function (data) { return firebase_common_1.firebase.firestore.update(collectionPath, fIRDocumentReference.documentID, data); },
        delete: function () { return firebase_common_1.firebase.firestore.delete(collectionPath, fIRDocumentReference.documentID); },
        onSnapshot: function (callback) { return firebase_common_1.firebase.firestore.onDocumentSnapshot(fIRDocumentReference, callback); },
        ios: fIRDocumentReference
    };
};
firebase_common_1.firebase.firestore.doc = function (collectionPath, documentPath) {
    try {
        if (typeof (FIRFirestore) === "undefined") {
            console.log("Make sure 'Firebase/Firestore' is in the plugin's Podfile");
            return null;
        }
        var fIRCollectionReference = FIRFirestore.firestore().collectionWithPath(collectionPath);
        var fIRDocumentReference = documentPath ? fIRCollectionReference.documentWithPath(documentPath) : fIRCollectionReference.documentWithAutoID();
        return firebase_common_1.firebase.firestore._getDocumentReference(fIRDocumentReference, collectionPath, documentPath);
    }
    catch (ex) {
        console.log("Error in firebase.firestore.doc: " + ex);
        return null;
    }
};
firebase_common_1.firebase.firestore.add = function (collectionPath, document) {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof (FIRFirestore) === "undefined") {
                reject("Make sure 'Firebase/Firestore' is in the plugin's Podfile");
                return;
            }
            var defaultFirestore = FIRFirestore.firestore();
            var fIRDocumentReference_1 = defaultFirestore
                .collectionWithPath(collectionPath)
                .addDocumentWithDataCompletion(document, function (error) {
                if (error) {
                    reject(error.localizedDescription);
                }
                else {
                    resolve({
                        id: fIRDocumentReference_1.documentID,
                        collection: function (cp) { return firebase_common_1.firebase.firestore.collection(cp); },
                        set: function (data, options) { return firebase_common_1.firebase.firestore.set(collectionPath, fIRDocumentReference_1.documentID, data, options); },
                        get: function () { return firebase_common_1.firebase.firestore.getDocument(collectionPath, fIRDocumentReference_1.documentID); },
                        update: function (data) { return firebase_common_1.firebase.firestore.update(collectionPath, fIRDocumentReference_1.documentID, data); },
                        delete: function () { return firebase_common_1.firebase.firestore.delete(collectionPath, fIRDocumentReference_1.documentID); },
                        onSnapshot: function (callback) { return firebase_common_1.firebase.firestore.onDocumentSnapshot(fIRDocumentReference_1, callback); }
                    });
                }
            });
        }
        catch (ex) {
            console.log("Error in firebase.firestore.add: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.firestore.set = function (collectionPath, documentPath, document, options) {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof (FIRFirestore) === "undefined") {
                reject("Make sure 'Firebase/Firestore' is in the plugin's Podfile");
                return;
            }
            var docRef = FIRFirestore.firestore()
                .collectionWithPath(collectionPath)
                .documentWithPath(documentPath);
            if (options && options.merge) {
                docRef.setDataOptionsCompletion(document, FIRSetOptions.merge(), function (error) {
                    if (error) {
                        reject(error.localizedDescription);
                    }
                    else {
                        resolve();
                    }
                });
            }
            else {
                docRef.setDataCompletion(document, function (error) {
                    if (error) {
                        reject(error.localizedDescription);
                    }
                    else {
                        resolve();
                    }
                });
            }
        }
        catch (ex) {
            console.log("Error in firebase.firestore.set: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.firestore.update = function (collectionPath, documentPath, document) {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof (FIRFirestore) === "undefined") {
                reject("Make sure 'Firebase/Firestore' is in the plugin's Podfile");
                return;
            }
            var docRef = FIRFirestore.firestore()
                .collectionWithPath(collectionPath)
                .documentWithPath(documentPath);
            docRef.updateDataCompletion(document, function (error) {
                if (error) {
                    reject(error.localizedDescription);
                }
                else {
                    resolve();
                }
            });
        }
        catch (ex) {
            console.log("Error in firebase.firestore.update: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.firestore.delete = function (collectionPath, documentPath) {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof (FIRFirestore) === "undefined") {
                reject("Make sure 'Firebase/Firestore' is in the plugin's Podfile");
                return;
            }
            var docRef = FIRFirestore.firestore()
                .collectionWithPath(collectionPath)
                .documentWithPath(documentPath);
            docRef.deleteDocumentWithCompletion(function (error) {
                if (error) {
                    reject(error.localizedDescription);
                }
                else {
                    resolve();
                }
            });
        }
        catch (ex) {
            console.log("Error in firebase.firestore.delete: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.firestore.getCollection = function (collectionPath) {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof (FIRFirestore) === "undefined") {
                reject("Make sure 'Firebase/Firestore' is in the plugin's Podfile");
                return;
            }
            var defaultFirestore = FIRFirestore.firestore();
            var fIRDocumentReference = defaultFirestore
                .collectionWithPath(collectionPath)
                .getDocumentsWithCompletion(function (snapshot, error) {
                if (error) {
                    reject(error.localizedDescription);
                }
                else {
                    var docSnapshots = [];
                    var _loop_2 = function (i, l) {
                        var document_2 = snapshot.documents.objectAtIndex(i);
                        docSnapshots.push(new firebase_common_1.DocumentSnapshot(document_2.documentID, true, function () { return firebase_common_1.firebase.toJsObject(document_2.data()); }));
                    };
                    for (var i = 0, l = snapshot.documents.count; i < l; i++) {
                        _loop_2(i, l);
                    }
                    var snap = new firebase_common_1.QuerySnapshot();
                    snap.docSnapshots = docSnapshots;
                    resolve(snap);
                }
            });
        }
        catch (ex) {
            console.log("Error in firebase.firestore.getCollection: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.firestore.get = function (collectionPath) {
    return firebase_common_1.firebase.firestore.getCollection(collectionPath);
};
firebase_common_1.firebase.firestore.getDocument = function (collectionPath, documentPath) {
    return new Promise(function (resolve, reject) {
        try {
            if (typeof (FIRFirestore) === "undefined") {
                reject("Make sure 'Firebase/Firestore' is in the plugin's Podfile");
                return;
            }
            FIRFirestore.firestore()
                .collectionWithPath(collectionPath)
                .documentWithPath(documentPath)
                .getDocumentWithCompletion(function (snapshot, error) {
                if (error) {
                    reject(error.localizedDescription);
                }
                else {
                    var exists_1 = snapshot.exists;
                    resolve(new firebase_common_1.DocumentSnapshot(exists_1 ? snapshot.documentID : null, exists_1, function () { return exists_1 ? firebase_common_1.firebase.toJsObject(snapshot.data()) : null; }));
                }
            });
        }
        catch (ex) {
            console.log("Error in firebase.firestore.getDocument: " + ex);
            reject(ex);
        }
    });
};
firebase_common_1.firebase.firestore._getQuery = function (collectionPath, query) {
    return {
        get: function () { return new Promise(function (resolve, reject) {
            query.getDocumentsWithCompletion(function (snapshot, error) {
                if (error) {
                    reject(error.localizedDescription);
                }
                else {
                    console.log(">> .where, snapshot: " + snapshot);
                    var docSnapshots = [];
                    var _loop_3 = function (i, l) {
                        var document_3 = snapshot.documents.objectAtIndex(i);
                        docSnapshots.push(new firebase_common_1.DocumentSnapshot(document_3.documentID, true, function () { return firebase_common_1.firebase.toJsObject(document_3.data()); }));
                    };
                    for (var i = 0, l = snapshot.documents.count; i < l; i++) {
                        _loop_3(i, l);
                    }
                    var snap = new firebase_common_1.QuerySnapshot();
                    snap.docSnapshots = docSnapshots;
                    resolve(snap);
                }
            });
        }); },
        where: function (fp, os, v) { return firebase_common_1.firebase.firestore.where(collectionPath, fp, os, v, query); },
        orderBy: function (fp, directionStr) { return firebase_common_1.firebase.firestore.orderBy(collectionPath, fp, directionStr, query); },
        limit: function (limit) { return firebase_common_1.firebase.firestore.limit(collectionPath, limit, query); },
        onSnapshot: function (callback) { return firebase_common_1.firebase.firestore.onCollectionSnapshot(query, callback); }
    };
};
firebase_common_1.firebase.firestore.where = function (collectionPath, fieldPath, opStr, value, query) {
    try {
        if (typeof (FIRFirestore) === "undefined") {
            console.log("Make sure 'Firebase/Firestore' is in the plugin's Podfile");
            return null;
        }
        query = query || FIRFirestore.firestore().collectionWithPath(collectionPath);
        if (opStr === "<") {
            query = query.queryWhereFieldIsLessThan(fieldPath, value);
        }
        else if (opStr === "<=") {
            query = query.queryWhereFieldIsLessThanOrEqualTo(fieldPath, value);
        }
        else if (opStr === "==") {
            query = query.queryWhereFieldIsEqualTo(fieldPath, value);
        }
        else if (opStr === ">=") {
            query = query.queryWhereFieldIsGreaterThanOrEqualTo(fieldPath, value);
        }
        else if (opStr === ">") {
            query = query.queryWhereFieldIsGreaterThan(fieldPath, value);
        }
        else {
            console.log("Illegal argument for opStr: " + opStr);
            return null;
        }
        return firebase_common_1.firebase.firestore._getQuery(collectionPath, query);
    }
    catch (ex) {
        console.log("Error in firebase.firestore.where: " + ex);
        return null;
    }
};
firebase_common_1.firebase.firestore.orderBy = function (collectionPath, fieldPath, direction, query) {
    query = query.queryOrderedByFieldDescending(fieldPath, direction === "desc");
    return firebase_common_1.firebase.firestore._getQuery(collectionPath, query);
};
firebase_common_1.firebase.firestore.limit = function (collectionPath, limit, query) {
    query = query.queryLimitedTo(limit);
    return firebase_common_1.firebase.firestore._getQuery(collectionPath, query);
};
var UNUserNotificationCenterDelegateImpl = (function (_super) {
    __extends(UNUserNotificationCenterDelegateImpl, _super);
    function UNUserNotificationCenterDelegateImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UNUserNotificationCenterDelegateImpl.new = function () {
        if (UNUserNotificationCenterDelegateImpl.ObjCProtocols.length === 0 && typeof (UNUserNotificationCenterDelegate) !== "undefined") {
            UNUserNotificationCenterDelegateImpl.ObjCProtocols.push(UNUserNotificationCenterDelegate);
        }
        return _super.new.call(this);
    };
    UNUserNotificationCenterDelegateImpl.prototype.initWithCallback = function (callback) {
        this.callback = callback;
        return this;
    };
    UNUserNotificationCenterDelegateImpl.prototype.userNotificationCenterWillPresentNotificationWithCompletionHandler = function (center, notification, completionHandler) {
        this.callback(notification);
    };
    UNUserNotificationCenterDelegateImpl.ObjCProtocols = [];
    return UNUserNotificationCenterDelegateImpl;
}(NSObject));
var FIRInviteDelegateImpl = (function (_super) {
    __extends(FIRInviteDelegateImpl, _super);
    function FIRInviteDelegateImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FIRInviteDelegateImpl.new = function () {
        if (FIRInviteDelegateImpl.ObjCProtocols.length === 0 && typeof (FIRInviteDelegate) !== "undefined") {
            FIRInviteDelegateImpl.ObjCProtocols.push(FIRInviteDelegate);
        }
        return _super.new.call(this);
    };
    FIRInviteDelegateImpl.prototype.initWithCallback = function (callback) {
        this.callback = callback;
        return this;
    };
    FIRInviteDelegateImpl.prototype.inviteFinishedWithInvitationsError = function (invitationIds, error) {
        this.callback(invitationIds, error);
    };
    FIRInviteDelegateImpl.ObjCProtocols = [];
    return FIRInviteDelegateImpl;
}(NSObject));
var FIRMessagingDelegateImpl = (function (_super) {
    __extends(FIRMessagingDelegateImpl, _super);
    function FIRMessagingDelegateImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FIRMessagingDelegateImpl.new = function () {
        if (FIRMessagingDelegateImpl.ObjCProtocols.length === 0 && typeof (FIRMessagingDelegate) !== "undefined") {
            FIRMessagingDelegateImpl.ObjCProtocols.push(FIRMessagingDelegate);
        }
        return _super.new.call(this);
    };
    FIRMessagingDelegateImpl.prototype.initWithCallback = function (callback) {
        this.callback = callback;
        return this;
    };
    FIRMessagingDelegateImpl.prototype.applicationReceivedRemoteMessage = function (remoteMessage) {
        this.callback(remoteMessage.appData);
    };
    FIRMessagingDelegateImpl.prototype.messagingDidReceiveMessage = function (messaging, remoteMessage) {
        this.callback(remoteMessage.appData);
    };
    FIRMessagingDelegateImpl.prototype.messagingDidRefreshRegistrationToken = function (messaging, fcmToken) {
        console.log(">> fcmToken refreshed: " + fcmToken);
        firebase_common_1.firebase._onTokenRefreshNotification(fcmToken);
    };
    FIRMessagingDelegateImpl.ObjCProtocols = [];
    return FIRMessagingDelegateImpl;
}(NSObject));
var GADInterstitialDelegateImpl = (function (_super) {
    __extends(GADInterstitialDelegateImpl, _super);
    function GADInterstitialDelegateImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GADInterstitialDelegateImpl.new = function () {
        if (GADInterstitialDelegateImpl.ObjCProtocols.length === 0 && typeof (GADInterstitialDelegate) !== "undefined") {
            GADInterstitialDelegateImpl.ObjCProtocols.push(GADInterstitialDelegate);
        }
        return _super.new.call(this);
    };
    GADInterstitialDelegateImpl.prototype.initWithCallback = function (callback) {
        this.callback = callback;
        return this;
    };
    GADInterstitialDelegateImpl.prototype.interstitialDidReceiveAd = function (ad) {
        this.callback(ad);
    };
    GADInterstitialDelegateImpl.prototype.interstitialDidFailToReceiveAdWithError = function (ad, error) {
        this.callback(ad, error);
    };
    GADInterstitialDelegateImpl.ObjCProtocols = [];
    return GADInterstitialDelegateImpl;
}(NSObject));
var GIDSignInDelegateImpl = (function (_super) {
    __extends(GIDSignInDelegateImpl, _super);
    function GIDSignInDelegateImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GIDSignInDelegateImpl.new = function () {
        if (GIDSignInDelegateImpl.ObjCProtocols.length === 0 && typeof (GIDSignInDelegate) !== "undefined") {
            GIDSignInDelegateImpl.ObjCProtocols.push(GIDSignInDelegate);
        }
        return _super.new.call(this);
    };
    GIDSignInDelegateImpl.prototype.initWithCallback = function (callback) {
        this.callback = callback;
        return this;
    };
    GIDSignInDelegateImpl.prototype.signInDidSignInForUserWithError = function (signIn, user, error) {
        this.callback(user, error);
    };
    GIDSignInDelegateImpl.ObjCProtocols = [];
    return GIDSignInDelegateImpl;
}(NSObject));
module.exports = firebase_common_1.firebase;


/***/ }),
/* 32 */
/* no static exports found */
/* exports used: default */
/*!*******************************************!*\
  !*** ../~/nativescript-vue/dist/index.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*!
 * NativeScript-Vue v0.7.8
 * (Using Vue v2.5.13)
 * (c) 2017-2018 rigor789
 * Released under the MIT license.
 */



function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var application = __webpack_require__(/*! application */ 22);
var application__default = _interopDefault(application);
var view = __webpack_require__(/*! ui/core/view */ 0);
var contentView = __webpack_require__(/*! ui/content-view */ 9);
var layoutBase = __webpack_require__(/*! ui/layouts/layout-base */ 4);
var page = __webpack_require__(/*! ui/page */ 28);
var frame = __webpack_require__(/*! ui/frame */ 26);

/*  */

var emptyObject = Object.freeze({});

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value e.g. [object Object]
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start$$1) {
  start$$1 = start$$1 || 0;
  var i = list.length - start$$1;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start$$1];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

/*  */

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */


// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;


if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer = false;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: 'development' !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: 'development' !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
})

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

{
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm || {};
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */


var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode, deep) {
  var componentOptions = vnode.componentOptions;
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.isCloned = true;
  if (deep) {
    if (vnode.children) {
      cloned.children = cloneVNodes(vnode.children, true);
    }
    if (componentOptions && componentOptions.children) {
      componentOptions.children = cloneVNodes(componentOptions.children, true);
    }
  }
  return cloned
}

function cloneVNodes (vnodes, deep) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i], deep);
  }
  return res
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
].forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ('development' !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    'development' !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    'development' !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
{
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      'development' !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    'development' !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && 'development' !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!/^[a-zA-Z][\w-]*$/.test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'can only contain alphanumeric characters and the hyphen, ' +
      'and must start with a letter.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ('development' !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ('development' !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      "Invalid prop: type check failed for prop \"" + name + "\"." +
      " Expected " + (expectedTypes.map(capitalize).join(', ')) +
      ", got " + (toRawType(value)) + ".",
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

/*  */

function handleError (err, vm, info) {
  if (vm) {
    var cur = vm;
    while ((cur = cur.$parent)) {
      var hooks = cur.$options.errorCaptured;
      if (hooks) {
        for (var i = 0; i < hooks.length; i++) {
          try {
            var capture = hooks[i].call(cur, err, vm, info) === false;
            if (capture) { return }
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info);
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      logError(e, null, 'config.errorHandler');
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */
/* globals MessageChannel */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using both micro and macro tasks.
// In < 2.4 we used micro tasks everywhere, but there are some scenarios where
// micro tasks have too high a priority and fires in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using macro tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use micro task by default, but expose a way to force macro task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc;
var macroTimerFunc;
var useMacroTask = false;

// Determine (macro) Task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  // PhantomJS
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = function () {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

// Determine MicroTask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  microTimerFunc = function () {
    p.then(flushCallbacks);
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a Task instead of a MicroTask.
 */


function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

var elementMap = new Map();

var defaultViewMeta = {
  skipAddToDom: false,
  isUnaryTag: false,
  tagNamespace: '',
  canBeLeftOpen: false,
  model: {
    prop: 'text',
    event: 'textChange'
  }
};

function normalizeElementName(elementName) {
  return elementName.replace(/-/g, '').toLowerCase()
}

function registerElement(elementName, resolver, meta) {
  elementName = normalizeElementName(elementName);

  meta = Object.assign({}, defaultViewMeta, meta);

  if (elementMap.has(elementName)) {
    throw new Error(("Element for " + elementName + " already registered."))
  }

  var entry = { resolver: resolver, meta: meta };
  elementMap.set(elementName.toLowerCase(), entry);
}

function getViewClass(elementName) {
  elementName = normalizeElementName(elementName);
  var entry = elementMap.get(elementName.toLowerCase());

  if (!entry) {
    throw new TypeError(("No known component for element " + elementName + "."))
  }

  try {
    return entry.resolver()
  } catch (e) {
    throw new TypeError(("Could not load view for: " + elementName + ". " + e))
  }
}

function getViewMeta(nodeName) {
  nodeName = normalizeElementName(nodeName);

  var meta = defaultViewMeta;
  var entry = elementMap.get(nodeName.toLowerCase());

  if (entry && entry.meta) {
    meta = entry.meta;
  }

  return meta
}

function isKnownView(elementName) {
  elementName = normalizeElementName(elementName);

  return elementMap.has(elementName.toLowerCase())
}

registerElement(
  'AbsoluteLayout',
  function () { return __webpack_require__(/*! ui/layouts/absolute-layout */ 81).AbsoluteLayout; }
);
registerElement(
  'ActivityIndicator',
  function () { return __webpack_require__(/*! ui/activity-indicator */ 63).ActivityIndicator; }
);
registerElement('Border', function () { return __webpack_require__(/*! ui/border */ 66).Border; });
registerElement('Button', function () { return __webpack_require__(/*! ui/button */ 41).Button; });
registerElement('ContentView', function () { return __webpack_require__(/*! ui/content-view */ 9).ContentView; });
registerElement('DatePicker', function () { return __webpack_require__(/*! ui/date-picker */ 72).DatePicker; }, {
  model: {
    prop: 'date',
    event: 'dateChange'
  }
});
registerElement(
  'DockLayout',
  function () { return __webpack_require__(/*! ui/layouts/dock-layout */ 83).DockLayout; }
);
registerElement(
  'GridLayout',
  function () { return __webpack_require__(/*! ui/layouts/grid-layout */ 87).GridLayout; }
);
registerElement('HtmlView', function () { return __webpack_require__(/*! ui/html-view */ 78).HtmlView; });
registerElement('Image', function () { return __webpack_require__(/*! ui/image */ 44).Image; });
registerElement('img', function () { return __webpack_require__(/*! ui/image */ 44).Image; });
registerElement('Label', function () { return __webpack_require__(/*! ui/label */ 20).Label; });
registerElement('ListPicker', function () { return __webpack_require__(/*! ui/list-picker */ 92).ListPicker; }, {
  model: {
    prop: 'selectedIndex',
    event: 'selectedIndexChange'
  }
});
registerElement('NativeActionBar', function () { return __webpack_require__(/*! ui/action-bar */ 18).ActionBar; });
registerElement('NativeActionItem', function () { return __webpack_require__(/*! ui/action-bar */ 18).ActionItem; });
registerElement('NativeListView', function () { return __webpack_require__(/*! ui/list-view */ 94).ListView; });
registerElement(
  'NativeNavigationButton',
  function () { return __webpack_require__(/*! ui/action-bar */ 18).NavigationButton; }
);
registerElement('Page', function () { return __webpack_require__(/*! ui/page */ 28).Page; }, {
  skipAddToDom: true
});
registerElement('Placeholder', function () { return __webpack_require__(/*! ui/placeholder */ 29).Placeholder; });
registerElement('Progress', function () { return __webpack_require__(/*! ui/progress */ 97).Progress; });
registerElement(
  'ProxyViewContainer',
  function () { return __webpack_require__(/*! ui/proxy-view-container */ 21).ProxyViewContainer; }
);
registerElement('Repeater', function () { return __webpack_require__(/*! ui/repeater */ 98).Repeater; });
registerElement('ScrollView', function () { return __webpack_require__(/*! ui/scroll-view */ 100).ScrollView; });
registerElement('SearchBar', function () { return __webpack_require__(/*! ui/search-bar */ 102).SearchBar; }, {
  model: {
    prop: 'text',
    event: 'textChange'
  }
});
registerElement(
  'SegmentedBar',
  function () { return __webpack_require__(/*! ui/segmented-bar */ 45).SegmentedBar; },
  {
    model: {
      prop: 'selectedIndex',
      event: 'selectedIndexChange'
    }
  }
);
registerElement(
  'SegmentedBarItem',
  function () { return __webpack_require__(/*! ui/segmented-bar */ 45).SegmentedBarItem; }
);
registerElement('Slider', function () { return __webpack_require__(/*! ui/slider */ 105).Slider; }, {
  model: {
    prop: 'value',
    event: 'valueChange'
  }
});
registerElement(
  'StackLayout',
  function () { return __webpack_require__(/*! ui/layouts/stack-layout */ 27).StackLayout; }
);
registerElement(
  'FlexboxLayout',
  function () { return __webpack_require__(/*! ui/layouts/flexbox-layout */ 85).FlexboxLayout; }
);
registerElement('Switch', function () { return __webpack_require__(/*! ui/switch */ 108).Switch; }, {
  model: {
    prop: 'checked',
    event: 'checkedChange'
  }
});

registerElement('NativeTabView', function () { return __webpack_require__(/*! ui/tab-view */ 48).TabView; }, {
  model: {
    prop: 'selectedIndex',
    event: 'selectedIndexChange'
  }
});
registerElement('NativeTabViewItem', function () { return __webpack_require__(/*! ui/tab-view */ 48).TabViewItem; }, {
  skipAddToDom: true
});

registerElement('TextField', function () { return __webpack_require__(/*! ui/text-field */ 49).TextField; });
registerElement('TextView', function () { return __webpack_require__(/*! ui/text-view */ 112).TextView; });
registerElement('TimePicker', function () { return __webpack_require__(/*! ui/time-picker */ 114).TimePicker; }, {
  model: {
    prop: 'time',
    event: 'timeChange'
  }
});
registerElement('WebView', function () { return __webpack_require__(/*! ui/web-view */ 117).WebView; });
registerElement(
  'WrapLayout',
  function () { return __webpack_require__(/*! ui/layouts/wrap-layout */ 180).WrapLayout; }
);
registerElement(
  'FormattedString',
  function () { return __webpack_require__(/*! text/formatted-string */ 38).FormattedString; }
);
registerElement('Span', function () { return __webpack_require__(/*! text/span */ 39).Span; });

registerElement(
  'DetachedContainer',
  function () { return __webpack_require__(/*! ui/proxy-view-container */ 21).ProxyViewContainer; },
  {
    skipAddToDom: true
  }
);
registerElement('DetachedText', function () { return __webpack_require__(/*! ui/placeholder */ 29).Placeholder; }, {
  skipAddToDom: true
});
registerElement('Comment', function () { return __webpack_require__(/*! ui/placeholder */ 29).Placeholder; });
registerElement(
  'Document',
  function () { return __webpack_require__(/*! ui/proxy-view-container */ 21).ProxyViewContainer; },
  {
    skipAddToDom: true
  }
);

function isView(view$$1) {
  return view$$1 instanceof view.View
}

function isLayout(view$$1) {
  return view$$1 instanceof layoutBase.LayoutBase
}

function isContentView(view$$1) {
  return view$$1 instanceof contentView.ContentView
}

function insertChild(parentNode, childNode, atIndex) {
  if ( atIndex === void 0 ) atIndex = -1;

  if (!parentNode || childNode.meta.skipAddToDom) {
    return
  }

  var parentView = parentNode.nativeView;
  var childView = childNode.nativeView;

  if (isLayout(parentView)) {
    if (childView.parent === parentView) {
      var index = parentView.getChildIndex(childView);
      if (index !== -1) {
        parentView.removeChild(childView);
      }
    }
    if (atIndex !== -1) {
      parentView.insertChild(childView, atIndex);
    } else {
      parentView.addChild(childView);
    }
  } else if (isContentView(parentView)) {
    if (childNode.nodeType === 8) {
      parentView._addView(childView, atIndex);
    } else {
      parentView.content = childView;
    }
  } else if (parentView && parentView._addChildFromBuilder) {
    parentView._addChildFromBuilder(
      childNode._nativeView.constructor.name,
      childView
    );
  } else {
    // throw new Error("Parent can"t contain children: " + parent.nodeName + ", " + parent);
  }
}

function removeChild$1(parentNode, childNode) {
  if (!parentNode || childNode.meta.skipAddToDom) {
    return
  }

  var parentView = parentNode.nativeView;
  var childView = childNode.nativeView;

  if (isLayout(parentView)) {
    parentView.removeChild(childView);
  } else if (isContentView(parentView)) {
    if (parentView.content === childView) {
      parentView.content = null;
    }

    if (childNode.nodeType === 8) {
      parentView._removeView(childView);
    }
  } else if (isView(parentView)) {
    parentView._removeView(childView);
  } else {
    // throw new Error("Unknown parent type: " + parent);
  }
}

var XML_ATTRIBUTES = Object.freeze([
  'style',
  'rows',
  'columns',
  'fontAttributes'
]);

var ViewNode = function ViewNode() {
  this.nodeType = null;
  this._tagName = null;
  this.parentNode = null;
  this.childNodes = [];
  this.prevSibling = null;
  this.nextSibling = null;

  this._ownerDocument = null;
  this._nativeView = null;
  this._meta = null;

  /* istanbul ignore next
       * make vue happy :)
       */
  this.hasAttribute = this.removeAttribute = function () { return false; };
};

var prototypeAccessors$1 = { tagName: { configurable: true },firstChild: { configurable: true },lastChild: { configurable: true },nativeView: { configurable: true },meta: { configurable: true },ownerDocument: { configurable: true } };

/* istanbul ignore next */
ViewNode.prototype.toString = function toString () {
  return ((this.constructor.name) + "(" + (this.tagName) + ")")
};

prototypeAccessors$1.tagName.set = function (name) {
  this._tagName = normalizeElementName(name);
};

prototypeAccessors$1.tagName.get = function () {
  return this._tagName
};

prototypeAccessors$1.firstChild.get = function () {
  return this.childNodes.length ? this.childNodes[0] : null
};

prototypeAccessors$1.lastChild.get = function () {
  return this.childNodes.length
    ? this.childNodes[this.childNodes.length - 1]
    : null
};

prototypeAccessors$1.nativeView.get = function () {
  return this._nativeView
};

prototypeAccessors$1.nativeView.set = function (view$$1) {
  if (this._nativeView) {
    throw new Error("Can't override native view.")
  }

  this._nativeView = view$$1;
};

prototypeAccessors$1.meta.get = function () {
  if (this._meta) {
    return this._meta
  }

  return (this._meta = getViewMeta(this.tagName))
};

/* istanbul ignore next */
prototypeAccessors$1.ownerDocument.get = function () {
  if (this._ownerDocument) {
    return this._ownerDocument
  }

  var el = this;
  while ((el = el.parentNode).nodeType !== 9) {
    // do nothing
  }

  return (this._ownerDocument = el)
};

/* istanbul ignore next */
ViewNode.prototype.setAttribute = function setAttribute (key, value) {
  try {
    if (XML_ATTRIBUTES.indexOf(key) !== -1) {
      this.nativeView._applyXmlAttribute(key, value);
    } else {
      this.nativeView[key] = value;
    }
  } catch (e) {
    throw new Error(((this.tagName) + " has no property " + key + ". (" + e + ")"))
  }
};

/* istanbul ignore next */
ViewNode.prototype.setStyle = function setStyle (property, value) {
  if (!(value = value.trim()).length) {
    return
  }

  if (property.endsWith('Align')) {
    // NativeScript uses Alignment instead of Align, this ensures that text-align works
    property += 'ment';
  }
  this.nativeView.style[property] = value;
};

/* istanbul ignore next */
ViewNode.prototype.setText = function setText (text) {
  if (this.nodeType === 3) {
    this.parentNode.setText(text);
  } else {
    this.setAttribute('text', text);
  }
};

/* istanbul ignore next */
ViewNode.prototype.addEventListener = function addEventListener (event, handler) {
  this.nativeView.on(event, handler);
};

/* istanbul ignore next */
ViewNode.prototype.removeEventListener = function removeEventListener (event) {
  this.nativeView.off(event);
};

ViewNode.prototype.insertBefore = function insertBefore (childNode, referenceNode) {
  if (!childNode) {
    throw new Error("Can't insert child.")
  }

  if (referenceNode && referenceNode.parentNode !== this) {
    throw new Error(
      "Can't insert child, because the reference node has a different parent."
    )
  }

  if (childNode.parentNode && childNode.parentNode !== this) {
    throw new Error(
      "Can't insert child, because it already has a different parent."
    )
  }

  if (childNode.parentNode === this) {
    throw new Error("Can't insert child, because it is already a child.")
  }

  var index = this.childNodes.indexOf(referenceNode);

  childNode.parentNode = this;
  childNode.nextSibling = referenceNode;
  childNode.prevSibling = this.childNodes[index - 1];

  referenceNode.prevSibling = childNode;
  this.childNodes.splice(index, 0, childNode);

  insertChild(this, childNode, index);
};

ViewNode.prototype.appendChild = function appendChild (childNode) {
  if (!childNode) {
    throw new Error("Can't append child.")
  }

  if (childNode.parentNode && childNode.parentNode !== this) {
    throw new Error(
      "Can't append child, because it already has a different parent."
    )
  }

  if (childNode.parentNode === this) {
    throw new Error("Can't append child, because it is already a child.")
  }

  childNode.parentNode = this;

  if (this.lastChild) {
    childNode.prevSibling = this.lastChild;
    this.lastChild.nextSibling = childNode;
  }

  this.childNodes.push(childNode);

  insertChild(this, childNode, this.childNodes.length - 1);
};

ViewNode.prototype.removeChild = function removeChild (childNode) {
  if (!childNode) {
    throw new Error("Can't remove child.")
  }

  if (!childNode.parentNode) {
    throw new Error("Can't remove child, because it has no parent.")
  }

  if (childNode.parentNode !== this) {
    throw new Error("Can't remove child, because it has a different parent.")
  }

  childNode.parentNode = null;

  if (childNode.prevSibling) {
    childNode.prevSibling.nextSibling = childNode.nextSibling;
  }

  if (childNode.nextSibling) {
    childNode.nextSibling.prevSibling = childNode.prevSibling;
  }

  this.childNodes = this.childNodes.filter(function (node) { return node !== childNode; });

  removeChild$1(this, childNode);
};

Object.defineProperties( ViewNode.prototype, prototypeAccessors$1 );

var VUE_ELEMENT_REF = '__vue_element_ref__';

var ElementNode = (function (ViewNode$$1) {
  function ElementNode(tagName) {
    ViewNode$$1.call(this);

    this.nodeType = 1;
    this.tagName = tagName;

    var viewClass = getViewClass(tagName);
    this._nativeView = new viewClass();
    this._nativeView[VUE_ELEMENT_REF] = this;
  }

  if ( ViewNode$$1 ) ElementNode.__proto__ = ViewNode$$1;
  ElementNode.prototype = Object.create( ViewNode$$1 && ViewNode$$1.prototype );
  ElementNode.prototype.constructor = ElementNode;

  ElementNode.prototype.appendChild = function appendChild (childNode) {
    ViewNode$$1.prototype.appendChild.call(this, childNode);

    if (childNode.nodeType === 3) {
      this.setText(childNode.text);
    }
  };

  ElementNode.prototype.insertBefore = function insertBefore (childNode, referenceNode) {
    ViewNode$$1.prototype.insertBefore.call(this, childNode, referenceNode);

    if (childNode.nodeType === 3) {
      this.setText(childNode.text);
    }
  };

  ElementNode.prototype.removeChild = function removeChild (childNode) {
    ViewNode$$1.prototype.removeChild.call(this, childNode);

    if (childNode.nodeType === 3) {
      this.setText('');
    }
  };

  return ElementNode;
}(ViewNode));

var TextNode = (function (ElementNode$$1) {
  function TextNode(text) {
    ElementNode$$1.call(this, 'comment');

    this.nodeType = 8;
    this.text = text;
  }

  if ( ElementNode$$1 ) TextNode.__proto__ = ElementNode$$1;
  TextNode.prototype = Object.create( ElementNode$$1 && ElementNode$$1.prototype );
  TextNode.prototype.constructor = TextNode;

  return TextNode;
}(ElementNode));

var TextNode$1 = (function (ViewNode$$1) {
  function TextNode(text) {
    ViewNode$$1.call(this);

    this.nodeType = 3;
    this.text = text;

    this._meta = {
      skipAddToDom: true
    };
  }

  if ( ViewNode$$1 ) TextNode.__proto__ = ViewNode$$1;
  TextNode.prototype = Object.create( ViewNode$$1 && ViewNode$$1.prototype );
  TextNode.prototype.constructor = TextNode;

  TextNode.prototype.setText = function setText (text) {
    this.text = text;
    this.parentNode.setText(text);
  };

  return TextNode;
}(ViewNode));

var DocumentNode = (function (ViewNode$$1) {
  function DocumentNode() {
    ViewNode$$1.call(this);

    this.nodeType = 9;
    this.documentElement = new ElementNode('document');

    // make static methods accessible via this
    this.createComment = this.constructor.createComment;
    this.createElement = this.constructor.createElement;
    this.createElementNS = this.constructor.createElementNS;
    this.createTextNode = this.constructor.createTextNode;
  }

  if ( ViewNode$$1 ) DocumentNode.__proto__ = ViewNode$$1;
  DocumentNode.prototype = Object.create( ViewNode$$1 && ViewNode$$1.prototype );
  DocumentNode.prototype.constructor = DocumentNode;

  DocumentNode.createComment = function createComment (text) {
    return new TextNode(text)
  };

  DocumentNode.createElement = function createElement (tagName) {
    return new ElementNode(tagName)
  };

  DocumentNode.createElementNS = function createElementNS (namespace, tagName) {
    return new ElementNode(namespace + ':' + tagName)
  };

  DocumentNode.createTextNode = function createTextNode (text) {
    return new TextNode$1(text)
  };

  return DocumentNode;
}(ViewNode));

var isReservedTag = makeMap('template', true);

var canBeLeftOpenTag = function(el) {
  return getViewMeta(el).canBeLeftOpenTag
};

var isUnaryTag = function(el) {
  return getViewMeta(el).isUnaryTag
};

function mustUseProp() {
  // console.log('mustUseProp')
}

function getTagNamespace(el) {
  return getViewMeta(el).tagNamespace
}

function isUnknownElement(el) {
  return !isKnownView(el)
}

function isPage(el) {
  return el && el.tagName === 'page'
}



var VUE_VERSION = '2.5.13';
var NS_VUE_VERSION = '0.7.8';

var infoTrace = once(function () {
  console.log(
    "NativeScript-Vue has \"Vue.config.silent\" set to true, to see output logs set it to false."
  );
});

function trace(message) {
  if (Vue$3.config.silent) {
    return infoTrace()
  }

  console.log(
    ("{NSVue (Vue: " + VUE_VERSION + " | NSVue: " + NS_VUE_VERSION + ")} -> " + message)
  );
}

function before(original, thisArg, wrap) {
  var __slice = Array.prototype.slice;
  return function() {
    var args = __slice.call(arguments);
    wrap.apply(null, args);
    original.apply(thisArg, args);
  }
}

function after(original, thisArg, wrap) {
  var __slice = Array.prototype.slice;
  return function() {
    var args = __slice.call(arguments);
    wrap.apply(null, args);
    original.apply(thisArg, args);
  }
}

function deepProxy(object, depth) {
  if ( depth === void 0 ) depth = 0;

  return new Proxy(object, {
    get: function get() {
      if (depth > 10) {
        throw new Error('deepProxy over 10 deep.')
      }
      return deepProxy({}, depth + 1)
    }
  })
}

var namespaceMap = {};

function createElement(tagName, vnode) {
  trace(("CreateElement(" + tagName + ")"));
  return DocumentNode.createElement(tagName)
}

function createElementNS(namespace, tagName) {
  trace(("CreateElementNS(" + namespace + "#" + tagName + ")"));
  return DocumentNode.createElementNS(namespace, tagName)
}

function createTextNode(text) {
  trace(("CreateTextNode(" + text + ")"));
  return DocumentNode.createTextNode(text)
}

function createComment(text) {
  trace(("CreateComment(" + text + ")"));

  return DocumentNode.createComment(text)
}

function insertBefore(parentNode, newNode, referenceNode) {
  trace(("InsertBefore(" + parentNode + ", " + newNode + ", " + referenceNode + ")"));
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild(node, child) {
  trace(("RemoveChild(" + node + ", " + child + ")"));
  node.removeChild(child);
}

function appendChild(node, child) {
  trace(("AppendChild(" + node + ", " + child + ")"));

  node.appendChild(child);
}

function parentNode(node) {
  trace(("ParentNode(" + node + ")"));

  return node.parentNode
}

function nextSibling(node) {
  trace(("NextSibling(" + node + ")"));

  return node.nextSibling
}

function tagName(elementNode) {
  trace(("TagName(" + elementNode + ")"));

  return elementNode.tagName
}

function setTextContent(node, text) {
  trace(("SetTextContent(" + node + ", " + text + ")"));

  node.setText(text);
}

function setAttribute(node, key, val) {
  trace(("SetAttribute(" + node + ", " + key + ", " + val + ")"));

  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	namespaceMap: namespaceMap,
	createElement: createElement,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
}

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ('development' !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$1 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$1; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = expOrFn.toString();
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      'development' !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

var mark;
var measure;

{
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, def, cur, old, event;
  for (name in on) {
    def = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    /* istanbul ignore if */
    if (isUndef(cur)) {
      'development' !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      'development' !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                "timeout (" + (res.timeout) + "ms)"
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once) {
  if (once) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break
        }
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if ('development' !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, null, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = (parentVnode.data && parentVnode.data.attrs) || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */



var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);









var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove () {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove.listeners = listeners;
    return remove
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if ('development' !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setAttribute(vnode.elm, i, '');
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start$$1, end) {
    for (var i = start$$1; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if ('development' !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if ('development' !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

function updateAttrs(oldVnode, vnode) {
  if (!oldVnode.data.attrs && !vnode.data.attrs) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (attrs.__ob__) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      elm.setAttribute(key, cur);
    }
  }
  for (key in oldAttrs) {
    if (attrs[key] == null) {
      elm.setAttribute(key);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
}

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');


var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

/**
 * Query an element selector if it's not an element already.
 */

function updateClass(oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    !data.staticClass &&
    !data.class &&
    (!oldData || (!oldData.staticClass && !oldData.class))
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (transitionClass) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var class_ = {
  create: updateClass,
  update: updateClass
}

var target$1;

function add$1(event, handler, once, capture) {
  if (capture) {
    console.log('bubble phase not supported');
    return
  }
  if (once) {
    var oldHandler = handler;
    var _target = target$1; // save current target element in closure
    handler = function(ev) {
      var res =
        arguments.length === 1
          ? oldHandler(ev)
          : oldHandler.apply(null, arguments);
      if (res !== null) {
        remove$2(event, null, null, _target);
      }
    };
  }
  target$1.addEventListener(event, handler);
}

function remove$2(event, handler, capture, _target) {
  (_target || target$1).removeEventListener(event);
}

function updateDOMListeners(oldVnode, vnode) {
  if (!oldVnode.data.on && !vnode.data.on) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
}

var normalize = cached(camelize);

function createStyle(oldVnode, vnode) {
  // console.log(`\t\t ===> createStyle(${oldVnode}, ${vnode})`)
  if (!vnode.data.staticStyle) {
    updateStyle(oldVnode, vnode);
    return
  }
  var elm = vnode.elm;
  var staticStyle = vnode.data.staticStyle;
  for (var name in staticStyle) {
    if (staticStyle[name]) {
      elm.setStyle(normalize(name), staticStyle[name]);
    }
  }
  updateStyle(oldVnode, vnode);
}

function updateStyle(oldVnode, vnode) {
  if (!oldVnode.data.style && !vnode.data.style) {
    return
  }
  var cur, name;
  var elm = vnode.elm;
  var oldStyle = oldVnode.data.style || {};
  var style = vnode.data.style || {};

  var needClone = style.__ob__;

  // handle array syntax
  if (Array.isArray(style)) {
    style = vnode.data.style = toObject$1(style);
  }

  // clone the style for future updates,
  // in case the user mutates the style object in-place.
  if (needClone) {
    style = vnode.data.style = extend({}, style);
  }

  for (name in oldStyle) {
    if (!style[name]) {
      elm.setStyle(normalize(name), '');
    }
  }
  for (name in style) {
    cur = style[name];
    elm.setStyle(normalize(name), cur);
  }
}

function toObject$1(arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

var style = {
  create: createStyle,
  update: updateStyle
}

var platformModules = [attrs, class_, events, style]

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
}

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
]

var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({
  nodeOps: nodeOps,
  modules: modules
});

var he = {
  decode: decode
}

function decode(html) {
  // todo?
  return html
}

/*  */

var isUnaryTag$1 = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag$1 = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp(("^<" + qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
var comment = /^<!--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10|#9);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag = options.isUnaryTag || no;
  var canBeLeftOpenTag = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd));
            }
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          if (shouldIgnoreFirstNewline(lastTag, html)) {
            advance(1);
          }
          continue
        }
      }

      var text = (void 0), rest = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!--([\s\S]*?)-->/g, '$1')
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if ('development' !== 'production' && !stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start$$1 = html.match(startTagOpen);
    if (start$$1) {
      var match = {
        tagName: start$$1[1],
        attrs: [],
        start: index
      };
      advance(start$$1[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag(tagName) || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
        ? options.shouldDecodeNewlinesForHref
        : options.shouldDecodeNewlines;
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start$$1, end) {
    var pos, lowerCasedTagName;
    if (start$$1 == null) { start$$1 = index; }
    if (end == null) { end = index; }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if ('development' !== 'production' &&
          (i > pos || !tagName) &&
          options.warn
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start$$1, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start$$1, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start$$1, end);
      }
      if (options.end) {
        options.end(tagName, start$$1, end);
      }
    }
  }
}

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + "," + args)
  }
}

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});



function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var rawTokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index, tokenValue;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      rawTokens.push(tokenValue = text.slice(lastIndex, index));
      tokens.push(JSON.stringify(tokenValue));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    rawTokens.push({ '@binding': exp });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex));
    tokens.push(JSON.stringify(tokenValue));
  }
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
        "? " + baseValueExpression + ".trim()" +
        ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: ("\"" + value + "\""),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var res = parseModel(value);
  if (res.key === null) {
    return (value + "=" + assignment)
  } else {
    return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
  }
}

/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */

var len;
var str;
var chr;
var index$1;
var expressionPos;
var expressionEndPos;



function parseModel (val) {
  len = val.length;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index$1 = val.lastIndexOf('.');
    if (index$1 > -1) {
      return {
        exp: val.slice(0, index$1),
        key: '"' + val.slice(index$1 + 1) + '"'
      }
    } else {
      return {
        exp: val,
        key: null
      }
    }
  }

  str = val;
  index$1 = expressionPos = expressionEndPos = 0;

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue compiler]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
  el.plain = false;
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
  el.plain = false;
}

// add a raw attr (use this in preTransforms)
function addRawAttr (el, name, value) {
  el.attrsMap[name] = value;
  el.attrsList.push({ name: name, value: value });
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
  el.plain = false;
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn
) {
  modifiers = modifiers || emptyObject;
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    'development' !== 'production' && warn &&
    modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.'
    );
  }

  // check capture modifier
  if (modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  /* istanbul ignore if */
  if (modifiers.passive) {
    delete modifiers.passive;
    name = '&' + name; // mark the event as passive
  }

  // normalize click.right and click.middle since they don't actually fire
  // this is technically browser-specific, but at least for now browsers are
  // the only target envs that have right/middle clicks.
  if (name === 'click') {
    if (modifiers.right) {
      name = 'contextmenu';
      delete modifiers.right;
    } else if (modifiers.middle) {
      name = 'mouseup';
    }
  }

  var events;
  if (modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }

  var newHandler = { value: value };
  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers;
  }

  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }

  el.plain = false;
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.
function getAndRemoveAttr (
  el,
  name,
  removeFromMap
) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name];
  }
  return val
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var stripParensRE = /^\(|\)$/g;

var argRE = /:(.*)$/;
var bindRE = /^:|^v-bind:/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(he.decode);

// configurable state
var warn$1;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;



function createASTElement (
  tag,
  attrs,
  parent
) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    parent: parent,
    children: []
  }
}

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$1 = options.warn || baseWarn;

  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg) {
    if (!warned) {
      warned = true;
      warn$1(msg);
    }
  }

  function closeElement (element) {
    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
    // apply post-transforms
    for (var i = 0; i < postTransforms.length; i++) {
      postTransforms[i](element, options);
    }
  }

  parseHTML(template, {
    warn: warn$1,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    start: function start$$1 (tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = createASTElement(tag, attrs, currentParent);
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        'development' !== 'production' && warn$1(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.'
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        // structural directives
        processFor(element);
        processIf(element);
        processOnce(element);
        // element-scope stuff
        processElement(element, options);
      }

      function checkRootConstraints (el) {
        {
          if (el.tag === 'slot' || el.tag === 'template') {
            warnOnce(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes.'
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warnOnce(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements.'
            );
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else {
          warnOnce(
            "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead."
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        closeElement(element);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      closeElement(element);
    },

    chars: function chars (text) {
      if (!currentParent) {
        {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.'
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored.")
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var res;
        if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: res.expression,
            tokens: res.tokens,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    },
    comment: function comment (text) {
      currentParent.children.push({
        type: 3,
        text: text,
        isComment: true
      });
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processElement (element, options) {
  processKey(element);

  // determine whether this is a plain element after
  // removing structural attributes
  element.plain = !element.key && !element.attrsList.length;

  processRef(element);
  processSlot(element);
  processComponent(element);
  for (var i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element;
  }
  processAttrs(element);
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if ('development' !== 'production' && el.tag === 'template') {
      warn$1("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var res = parseFor(exp);
    if (res) {
      extend(el, res);
    } else {
      warn$1(
        ("Invalid v-for expression: " + exp)
      );
    }
  }
}

function parseFor (exp) {
  var inMatch = exp.match(forAliasRE);
  if (!inMatch) { return }
  var res = {};
  res.for = inMatch[2].trim();
  var alias = inMatch[1].trim().replace(stripParensRE, '');
  var iteratorMatch = alias.match(forIteratorRE);
  if (iteratorMatch) {
    res.alias = alias.replace(forIteratorRE, '');
    res.iterator1 = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim();
    }
  } else {
    res.alias = alias;
  }
  return res
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else {
    warn$1(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if."
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if ('development' !== 'production' && children[i].text !== ' ') {
        warn$1(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored."
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if ('development' !== 'production' && el.key) {
      warn$1(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotScope;
    if (el.tag === 'template') {
      slotScope = getAndRemoveAttr(el, 'scope');
      /* istanbul ignore if */
      if ('development' !== 'production' && slotScope) {
        warn$1(
          "the \"scope\" attribute for scoped slots have been deprecated and " +
          "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
          "can also be used on plain elements in addition to <template> to " +
          "denote scoped slots.",
          true
        );
      }
      el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
    } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
      /* istanbul ignore if */
      if ('development' !== 'production' && el.attrsMap['v-for']) {
        warn$1(
          "Ambiguous combined usage of slot-scope and v-for on <" + (el.tag) + "> " +
          "(v-for takes higher priority). Use a wrapper <template> for the " +
          "scoped slot to make it clearer.",
          true
        );
      }
      el.slotScope = slotScope;
    }
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
      // preserve slot as an attribute for native shadow DOM compat
      // only for non-scoped slots.
      if (el.tag !== 'template' && !el.slotScope) {
        addAttr(el, 'slot', slotTarget);
      }
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            addHandler(
              el,
              ("update:" + (camelize(name))),
              genAssignmentCode(value, "$event")
            );
          }
        }
        if (isProp || (
          !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
        )) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers, false, warn$1);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if ('development' !== 'production' && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      {
        var res = parseText(value, delimiters);
        if (res) {
          warn$1(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr(el, name, JSON.stringify(value));
      // #6887 firefox doesn't update muted state if set via attribute
      // even immediately after element creation
      if (!el.component &&
          name === 'muted' &&
          platformMustUseProp(el.tag, el.attrsMap.type, name)) {
        addProp(el, name, 'true');
      }
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      'development' !== 'production' &&
      map[attrs[i].name] && !isIE && !isEdge
    ) {
      warn$1('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

// keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative,
  warn
) {
  var res = isNative ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    res += "\"" + name + "\":" + (genHandler(name, events[name])) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    if (isMethodPath || isFunctionExpression) {
      return handler.value
    }
    /* istanbul ignore if */
    return ("function($event){" + (handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else if (key === 'exact') {
        var modifiers = (handler.modifiers);
        genModifierCode += genGuard(
          ['ctrl', 'shift', 'alt', 'meta']
            .filter(function (keyModifier) { return !modifiers[keyModifier]; })
            .map(function (keyModifier) { return ("$event." + keyModifier + "Key"); })
            .join('||')
        );
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? handler.value + '($event)'
      : isFunctionExpression
        ? ("(" + (handler.value) + ")($event)")
        : handler.value;
    /* istanbul ignore if */
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var code = keyCodes[key];
  return (
    "_k($event.keyCode," +
    (JSON.stringify(key)) + "," +
    (JSON.stringify(code)) + "," +
    "$event.key)"
  )
}

/*  */

function on (el, dir) {
  if ('development' !== 'production' && dir.modifiers) {
    warn("v-on without argument does not support modifiers.");
  }
  el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
}

/*  */

var CodegenState = function CodegenState (options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) { return !isReservedTag(el.tag); };
  this.onceId = 0;
  this.staticRenderFns = [];
};



function generate (
  ast,
  options
) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: state.staticRenderFns
  }
}

function genElement (el, state) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data = el.plain ? undefined : genData(el, state);

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el, state) {
  el.staticProcessed = true;
  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      'development' !== 'production' && state.warn(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el, state)
    }
    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
  } else {
    return genStatic(el, state)
  }
}

function genIf (
  el,
  state,
  altGen,
  altEmpty
) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions (
  conditions,
  state,
  altGen,
  altEmpty
) {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}

function genFor (
  el,
  state,
  altGen,
  altHelper
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if ('development' !== 'production' &&
    state.maybeComponent(el) &&
    el.tag !== 'slot' &&
    el.tag !== 'template' &&
    !el.key
  ) {
    state.warn(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + ((altGen || genElement)(el, state)) +
    '})'
}

function genData (el, state) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false, state.warn)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true, state.warn)) + ",";
  }
  // slot target
  // only for non-scoped slots
  if (el.slotTarget && !el.slotScope) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots, state)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data
}

function genDirectives (el, state) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el, state) {
  var ast = el.children[0];
  if ('development' !== 'production' && (
    el.children.length !== 1 || ast.type !== 1
  )) {
    state.warn('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (
  slots,
  state
) {
  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) {
      return genScopedSlot(key, slots[key], state)
    }).join(',')) + "])")
}

function genScopedSlot (
  key,
  el,
  state
) {
  if (el.for && !el.forProcessed) {
    return genForScopedSlot(key, el, state)
  }
  var fn = "function(" + (String(el.slotScope)) + "){" +
    "return " + (el.tag === 'template'
      ? el.if
        ? ((el.if) + "?" + (genChildren(el, state) || 'undefined') + ":undefined")
        : genChildren(el, state) || 'undefined'
      : genElement(el, state)) + "}";
  return ("{key:" + key + ",fn:" + fn + "}")
}

function genForScopedSlot (
  key,
  el,
  state
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genScopedSlot(key, el, state)) +
    '})'
}

function genChildren (
  el,
  state,
  checkSkip,
  altGenElement,
  altGenNode
) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      return (altGenElement || genElement)(el$1, state)
    }
    var normalizationType = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0;
    var gen = altGenNode || genNode;
    return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (
  children,
  maybeComponent
) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node, state) {
  if (node.type === 1) {
    return genElement(node, state)
  } if (node.type === 3 && node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genComment (comment) {
  return ("_e(" + (JSON.stringify(comment.text)) + ")")
}

function genSlot (el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (
  componentName,
  el,
  state
) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return ("_c(" + componentName + "," + (genData(el, state)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    /* istanbul ignore if */
    {
      res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
    }
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors
}

function checkNode (node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), errors);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), errors);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkEvent (exp, text, errors) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);
  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    errors.push(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
    );
  }
  checkExpression(exp, text, errors);
}

function checkFor (node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier (
  ident,
  type,
  text,
  errors
) {
  if (typeof ident === 'string') {
    try {
      new Function(("var " + ident + "=_"));
    } catch (e) {
      errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
    }
  }
}

function checkExpression (exp, text, errors) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\"\n  Raw expression: " + (text.trim())
      );
    } else {
      errors.push(
        "invalid expression: " + (e.message) + " in\n\n" +
        "    " + exp + "\n\n" +
        "  Raw expression: " + (text.trim()) + "\n"
      );
    }
  }
}

/*  */

function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = extend({}, options);
    var warn$$1 = options.warn || warn;
    delete options.warn;

    /* istanbul ignore if */
    {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn$$1(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    {
      if (compiled.errors && compiled.errors.length) {
        warn$$1(
          "Error compiling template:\n\n" + template + "\n\n" +
          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
          vm
        );
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn$$1(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (cache[key] = res)
  }
}

/*  */

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];
      finalOptions.warn = function (msg, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives || null),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      var compiled = baseCompile(template, finalOptions);
      {
        errors.push.apply(errors, detectErrors(compiled.ast));
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}

/*  */

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  if (options.optimize !== false) {
    optimize(ast, options);
  }
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
});

function transformNode(el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if ('development' !== 'production' && staticClass) {
    var expression = parseText(staticClass, options.delimiters);
    if (expression) {
      warn(
        "class=\"" + staticClass + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div class="{{ val }}">, use <div :class="val">.'
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData$1(el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var class_$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData$1
}

var normalize$1 = cached(camelize);

function transformNode$1(el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  var ref = parseStaticStyle(staticStyle, options);
  var dynamic = ref.dynamic;
  var styleResult = ref.styleResult;
  if ('development' !== 'production' && dynamic) {
    warn(
      "style=\"" + (String(staticStyle)) + "\": " +
        'Interpolation inside attributes has been deprecated. ' +
        'Use v-bind or the colon shorthand instead.'
    );
  }
  if (!dynamic && styleResult) {
    el.staticStyle = styleResult;
  }
  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  } else if (dynamic) {
    el.styleBinding = styleResult;
  }
}

function genData$2(el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:" + (el.styleBinding) + ",";
  }
  return data
}

function parseStaticStyle(staticStyle, options) {
  // "width: 200px; height: 200px;" -> {width: 200, height: 200}
  // "width: 200px; height: {{y}}" -> {width: 200, height: y}
  var dynamic = false;
  var styleResult = '';
  if (staticStyle) {
    var styleList = staticStyle
      .trim()
      .split(';')
      .map(function (style) {
        var result = style.trim().split(':');
        if (result.length !== 2) {
          return
        }
        var key = normalize$1(result[0].trim());
        var value = result[1].trim();
        var dynamicValue = parseText(value, options.delimiters);
        if (dynamicValue) {
          dynamic = true;
          return key + ':' + dynamicValue
        }
        return key + ':' + JSON.stringify(value)
      })
      .filter(function (result) { return result; });
    if (styleList.length) {
      styleResult = '{' + styleList.join(',') + '}';
    }
  }
  return { dynamic: dynamic, styleResult: styleResult }
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$2
}

function preTransformNode(el) {
  if (normalizeElementName(el.tag) !== 'listview') {
    return
  }

  var vfor = getAndRemoveAttr(el, 'v-for');
  delete el.attrsMap['v-for'];
  if ('development' !== 'production' && vfor) {
    warn(
      "The v-for directive is not supported on a " + (el.tag) + ", " +
        'Use the "for" attribute instead. For example, instead of ' +
        "<" + (el.tag) + " v-for=\"" + vfor + "\"> use <" + (el.tag) + " for=\"" + vfor + "\">."
    );
  }

  var exp = getAndRemoveAttr(el, 'for') || vfor;
  if (!exp) { return }

  var res = parseFor(exp);
  if (!res) {
    {
      warn(("Invalid for expression: " + exp));
    }
    return
  }

  addRawAttr(el, ':items', res.for);
  addRawAttr(el, '+alias', res.alias);

  if (res.iterator1) {
    addRawAttr(el, '+index', res.iterator1);
  }
}

var listView = {
  preTransformNode: preTransformNode
}

function preTransformNode$1(el) {
  if (el.parent && el.parent.tag === 'v-template') {
    var alias = el.parent.parent.attrsMap['+alias'] || 'item';
    var index = el.parent.parent.attrsMap['+index'] || '$index';
    el.slotScope = buildScopeString(alias, index);
  }
}

var vTemplate = {
  preTransformNode: preTransformNode$1
}

function buildScopeString(alias, index) {
  return ("{ " + alias + ", " + index + ", $even, $odd }")
}

// transforms ~test -> v-view:test
function transformNode$2(el) {
  var attr = Object.keys(el.attrsMap).find(function (attr) { return attr.startsWith('~'); });

  if (attr) {
    var attrName = attr.substr(1);
    var ref = attrName.split('.');
    var arg = ref[0];
    var modifiers = ref.slice(1);
    modifiers = modifiers.reduce(function (mods, mod) {
      mods[mod] = true;
      return mods
    }, {});
    getAndRemoveAttr(el, attr);
    addDirective(el, 'view', ("v-view:" + attrName), '', arg, modifiers);
  }
}

var view$1 = {
  transformNode: transformNode$2
}

var modules$1 = [class_$1, style$1, vTemplate, listView, view$1]

function model(el, dir, _warn) {
  if (el.type === 1 && isKnownView(el.tag)) {
    genDefaultModel(el, dir.value, dir.modifiers);
  } else {
    genComponentModel(el, dir.value, dir.modifiers);
  }
}

function genDefaultModel(el, value, modifiers) {
  var ref = modifiers || {};
  var trim = ref.trim;
  var number = ref.number;
  var ref$1 = getViewMeta(el.tag).model;
  var prop = ref$1.prop;
  var event = ref$1.event;

  var valueExpression = "$event.value" + (trim ? '.trim()' : '');

  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);

  addAttr(el, prop, ("(" + value + ")"));
  addHandler(el, event, code, null, true);
}

var directives$1 = {
  model: model
}

var baseOptions = {
  modules: modules$1,
  directives: directives$1,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  preserveWhitespace: false,
  staticKeys: genStaticKeys(modules$1)
};

var ref$1 = createCompiler(baseOptions);
var compileToFunctions = ref$1.compileToFunctions;

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

{
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    'development' !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      'development' !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ('development' !== 'production' && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : userDef;
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  if ('development' !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    {
      if (methods[key] == null) {
        warn(
          "Method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  keyOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(keyOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    observerState.shouldConvert = false;
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      {
        defineReactive(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      }
    });
    observerState.shouldConvert = true;
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject).filter(function (key) {
        /* istanbul ignore next */
        return Object.getOwnPropertyDescriptor(inject, key).enumerable
      })
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ('development' !== 'production' && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes) {
      if ('development' !== 'production' && slotNodes._rendered) {
        warn(
          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
          "- this will likely cause render errors.",
          this
        );
      }
      slotNodes._rendered = true;
    }
    nodes = slotNodes || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias,
  eventKeyName
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (keyCodes) {
    if (Array.isArray(keyCodes)) {
      return keyCodes.indexOf(eventKeyCode) === -1
    } else {
      return keyCodes !== eventKeyCode
    }
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      'development' !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic$1(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic$1(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic$1 (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      'development' !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var options = Ctor.options;
  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () { return resolveSlots(children, parent); };

  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm = Object.create(parent);
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement$1(contextVm, a, b, c, d, needNormalization);
      if (vnode) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement$1(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    vnode.fnContext = contextVm;
    vnode.fnOptions = options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }

  return vnode
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  // Weex specific: invoke recycle-list optimized @render function for
  // extracting cell-slot template.
  // https://github.com/Hanks10100/weex-native-directive/tree/master/component
  /* istanbul ignore if */
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var options = {
    _isComponent: true,
    parent: parent,
    _parentVnode: vnode,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement$1 (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    'development' !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ('development' !== 'production' &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (isDef(vnode)) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force))) {
        applyNS(child, ns, force);
      }
    }
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement$1(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement$1(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  }
}

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // if the parent didn't update, the slot nodes will be the ones from
      // last render. They need to be cloned to ensure "freshness" for this render.
      for (var key in vm.$slots) {
        var slot = vm.$slots[key];
        // _rendered is a flag added by renderSlot, but may not be present
        // if the slot is passed from manually written render functions
        if (slot._rendered || (slot[0] && slot[0].elm)) {
          vm.$slots[key] = cloneVNodes(slot, true /* deep */);
        }
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      {
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e) {
            handleError(e, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ('development' !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

var uid$2 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$2++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ('development' !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    {
      initProxy(vm);
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if ('development' !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if ('development' !== 'production' &&
    !(this instanceof Vue$3)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ('development' !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ('development' !== 'production' && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache, key, this$1.keys);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
}

var builtInComponents = {
  KeepAlive: KeepAlive
}

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

Vue$3.version = '2.5.13';

var ActionBar = {
  name: 'action-bar',

  template: "<native-action-bar ref=\"actionBar\"><slot></slot></native-action-bar>",

  props: {
    title: {
      type: String,
      required: false
    }
  },

  mounted: function mounted() {
    var this$1 = this;

    this.$nextTick(function () {
      if (this$1.$parent.$el.tagName !== 'page') {
        warn(
          'Make sure you are placing the <ActionBar> component as a direct child of a <Page> element.'
        );
        return
      }

      var page$$1 = this$1.$parent.$el.nativeView;

      page$$1.actionBar = this$1.$refs.actionBar.nativeView;
      page$$1.actionBarHidden = false;
      if (this$1.title) {
        this$1.$refs.actionBar.setAttribute('title', this$1.title);
      }
      page$$1.actionBar.update();
    });
  },

  watch: {
    title: function title(newVal) {
      this.$refs.actionBar.setAttribute('title', newVal);
    }
  }
}

var ActionItem = {
  name: 'action-item',

  template: "\n    <native-action-item ref=\"actionItem\" @tap=\"onTap\">\n      <slot></slot>\n    </native-action-item>\n  ",

  props: {
    text: {
      type: String
    },
    icon: {
      type: String
    },
    'android.position': {
      type: String
    },
    'android.systemIcon': {
      type: String
    },
    'ios.position': {
      type: String
    },
    'ios.systemIcon': {
      type: String | Number
    }
  },

  mounted: function mounted() {
    var _nativeView = this.$refs.actionItem.nativeView;

    if (this.text) {
      _nativeView.text = this.text;
    }

    if (this.icon) {
      _nativeView.icon = this.icon;
    }

    if (_nativeView.android && this['android.systemIcon']) {
      _nativeView.android.systemIcon = this['android.systemIcon'];
    }

    if (_nativeView.android && this['android.position']) {
      _nativeView.android.position = this['android.position'];
    }

    if (_nativeView.ios && this['ios.systemIcon']) {
      _nativeView.ios.systemIcon = this['ios.systemIcon'];
    }

    if (_nativeView.ios && this['ios.position']) {
      _nativeView.ios.position = this['ios.position'];
    }
  },

  methods: {
    onTap: function onTap(args) {
      this.$emit('tap', args);
    }
  }
}

var VUE_VIEW = '__vueVNodeRef__';

var tid = 0;
var VTemplate = {
  name: 'v-template',

  props: {
    name: {
      type: String
    },
    if: {
      type: String
    }
  },

  mounted: function mounted() {
    if (!this.$scopedSlots.default) {
      return
    }

    this.$templates = this.$el.parentNode.$templates = this.$parent.$templates =
      this.$parent.$templates || new TemplateBag();
    this.$templates.registerTemplate(
      this.$props.name || (this.$props.if ? ("v-template-" + (tid++)) : 'default'),
      this.$props.if,
      this.$scopedSlots.default
    );
  },

  render: function render(h) {}
}

var TemplateBag = function TemplateBag() {
  this._templateMap = new Map();
};

var prototypeAccessors$2 = { selectorFn: { configurable: true } };

TemplateBag.prototype.registerTemplate = function registerTemplate (name, condition, scopedFn) {
  this._templateMap.set(name, {
    scopedFn: scopedFn,
    conditionFn: this.getConditionFn(condition),
    keyedTemplate: new VueKeyedTemplate(name, scopedFn)
  });
};

prototypeAccessors$2.selectorFn.get = function () {
  var self = this;
  return function templateSelectorFn(item) {
    var iterator = self._templateMap.entries();
    var curr;
    while ((curr = iterator.next().value)) {
      var name = curr[0];
        var conditionFn = curr[1].conditionFn;
      try {
        if (conditionFn(item)) {
          return name
        }
      } catch (err) {}
    }
    return 'default'
  }
};

TemplateBag.prototype.getConditionFn = function getConditionFn (condition) {
  return new Function('ctx', ("with(ctx) { return !!(" + condition + ") }"))
};

TemplateBag.prototype.getKeyedTemplate = function getKeyedTemplate (name) {
  return this._templateMap.get(name).keyedTemplate
};

TemplateBag.prototype.patchTemplate = function patchTemplate (name, context, oldVnode) {
  var vnode = this._templateMap.get(name).scopedFn(context);
  var nativeView = patch(oldVnode, vnode).nativeView;
  nativeView[VUE_VIEW] = vnode;

  return nativeView
};

TemplateBag.prototype.getAvailable = function getAvailable () {
  return Array.from(this._templateMap.keys())
};

TemplateBag.prototype.getKeyedTemplates = function getKeyedTemplates () {
  return Array.from(this._templateMap.values()).map(
    function (ref) {
        var keyedTemplate = ref.keyedTemplate;

        return keyedTemplate;
    }
  )
};

Object.defineProperties( TemplateBag.prototype, prototypeAccessors$2 );

var VueKeyedTemplate = function VueKeyedTemplate(key, scopedFn) {
  this._key = key;
  this._scopedFn = scopedFn;
};

var prototypeAccessors$1$1 = { key: { configurable: true } };

prototypeAccessors$1$1.key.get = function () {
  return this._key
};

VueKeyedTemplate.prototype.createView = function createView () {
  var vnode = this._scopedFn(deepProxy({}));
  var nativeView = patch(null, vnode).nativeView;
  nativeView[VUE_VIEW] = vnode;
  return nativeView
};

Object.defineProperties( VueKeyedTemplate.prototype, prototypeAccessors$1$1 );

var ListView = {
  name: 'list-view',
  props: {
    items: {
      type: Array,
      required: true
    },
    separatorColor: {
      type: String
    },
    '+alias': {
      type: String,
      default: 'item'
    },
    '+index': {
      type: String
    }
  },

  render: function render(h) {
    return h(
      'native-list-view',
      {
        ref: 'listView',
        on: this._on,
        domProps: {
          items: this.items,
          separatorColor: this.separatorColor
        }
      },
      this.$slots.default
    )
  },

  watch: {
    items: {
      handler: function handler(newVal) {
        this.$refs.listView.setAttribute('items', newVal);
        this.$refs.listView.nativeView.refresh();
      },
      deep: true
    }
  },

  created: function created() {
    var this$1 = this;

    this._on = {
      itemLoading: this.onItemLoading,
      itemTap: function (args) { return this$1.$emit(
          'itemTap',
          Object.assign({ item: this$1.items[args.index] }, args)
        ); },
      loaded: function (args) { return this$1.$emit('loaded', args); },
      unloaded: function (args) { return this$1.$emit('unloaded', args); },
      loadMoreItems: function (args) { return this$1.$emit('loadMoreItems', args); }
    };
  },

  mounted: function mounted() {
    var this$1 = this;

    this.getItemContext = function (item, index) { return getItemContext(item, index, this$1.$props['+alias'], this$1.$props['+index']); };

    this.$refs.listView.setAttribute('items', this.items);
    this.$refs.listView.setAttribute(
      '_itemTemplatesInternal',
      this.$templates.getKeyedTemplates()
    );
    this.$refs.listView.setAttribute('_itemTemplateSelector', function (item, index) {
      return this$1.$templates.selectorFn(this$1.getItemContext(item, index))
    });
  },

  methods: {
    onItemLoading: function onItemLoading(args) {
      var index = args.index;
      var items = args.object.items;

      var currentItem =
        typeof items.getItem === 'function'
          ? items.getItem(index)
          : items[index];

      var name = args.object._itemTemplateSelector(context, index, items);
      var context = this.getItemContext(currentItem, index);
      var oldVnode = args.view && args.view[VUE_VIEW];

      args.view = this.$templates.patchTemplate(name, context, oldVnode);
    }
  }
}

function getItemContext(item, index, alias, index_alias) {
  var obj;

  return ( obj = {}, obj[alias] = item, obj[index_alias || '$index'] = index, obj.$even = index % 2 === 0, obj.$odd = index % 2 !== 0, obj)
}

var NavigationButton = {
  name: 'navigation-button',

  template: "<native-navigation-button ref=\"navigationButton\" @tap=\"onTap\" />",

  props: {
    text: {
      type: String
    },
    'android.systemIcon': {
      type: String
    }
  },

  mounted: function mounted() {
    var _nativeView = this.$refs.navigationButton.nativeView;

    if (this.text) {
      _nativeView.text = this.text;
    }

    if (_nativeView.android && this['android.systemIcon']) {
      _nativeView.android.systemIcon = this['android.systemIcon'];
    }
  },

  methods: {
    onTap: function onTap(args) {
      this.$emit('tap', args);
    }
  }
}

var RouterPage = {
  name: 'router-page',
  functional: true,

  render: function render(h, ref) {
    var parent = ref.parent;

    if (!parent.__is_root__) {
      warn('<router-page> should be a direct child of the root instance.');
    }

    parent.$options.pageRouting = true;
  }
}

var TabView = {
  name: 'tab-view',

  model: {
    prop: 'tab',
    event: 'tabChange'
  },

  props: {
    tab: {
      type: Number,
      default: 0
    }
  },

  render: function render(h) {
    var this$1 = this;

    return h(
      'native-tab-view',
      {
        ref: 'tabView',
        on: {
          selectedIndexChange: function (ref) {
            var value = ref.value;

            return this$1.$emit('tabChange', value);
    }
        },
        attrs: {
          selectedIndex: this.$props.tab
        }
      },
      this.$slots.default
    )
  },

  methods: {
    registerTab: function registerTab(tabView) {
      var items = this.$refs.tabView.nativeView.items || [];

      this.$refs.tabView.setAttribute('items', items.concat([tabView]));
    }
  }
}

var TabViewItem = {
  name: 'tab-view-item',

  template: "<native-tab-view-item ref=\"tabViewItem\"><slot></slot></native-tab-view-item>",

  mounted: function mounted() {
    if (this.$el.childNodes.length > 1) {
      warn('TabViewItem should contain only 1 root element', this);
    }

    var _nativeView = this.$refs.tabViewItem.nativeView;
    _nativeView.view = this.$el.childNodes[0].nativeView;
    this.$parent.registerTab(_nativeView);
  }
}

var platformComponents = {
  ActionBar: ActionBar,
  ActionItem: ActionItem,
  ListView: ListView,
  NavigationButton: NavigationButton,
  RouterPage: RouterPage,
  TabView: TabView,
  TabViewItem: TabViewItem,
  VTemplate: VTemplate
}

function show(el, show) {
  el.setAttribute('visibility', show ? 'visible' : 'collapsed');
}

var show$1 = {
  inserted: function inserted(el, ref) {
    var value = ref.value;

    show(el, value);
  },
  update: function update(el, ref) {
    var value = ref.value;

    show(el, value);
  }
}

var view$2 = {
  inserted: function inserted(el, ref) {
    var arg = ref.arg;
    var modifiers = ref.modifiers;

    var parent = el.parentNode.nativeView;

    if (parent) {
      if (modifiers.array) {
        parent[arg] = (parent[arg] || []).push(el.nativeView);
      } else {
        parent[arg] = el.nativeView;
      }
    }
  }
}

var platformDirectives = {
  show: show$1,
  view: view$2
}

var VUE_VM_REF = '__vue_vm_ref__';

Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isUnknownElement = isUnknownElement;

Vue$3.$document = Vue$3.prototype.$document = new DocumentNode();

Vue$3.registerElement = registerElement;

Vue$3.options.directives = platformDirectives;
Vue$3.options.components = platformComponents;

Vue$3.prototype.__patch__ = patch;

Vue$3.prototype.$start = function() {
  this.__is_root__ = true;

  var placeholder = this.$document.createComment('placeholder');

  this.$mount(placeholder);
};

var mount = function(el, hydrating) {
  if (this.__is_root__ && !this.__started__) {
    var self = this;
    application.start({
      create: function create() {
        // Call mountComponent in the create callback when the IOS app loop has started
        // https://github.com/rigor789/nativescript-vue/issues/24
        mountComponent(self, el, hydrating);
        self.__started__ = true;

        var page$$1 = isPage(self.$el) ? self.$el.nativeView : new page.Page();

        if (!isPage(self.$el)) {
          page$$1.content = self.$el.nativeView;
        }

        page$$1[VUE_VM_REF] = self;

        return page$$1
      }
    });
  } else {
    mountComponent(this, el, hydrating);
  }
};

Vue$3.prototype.$mount = function(el, hydrating) {
  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template && typeof template !== 'string') {
      warn('invalid template option: ' + template, this);
      return this
    }

    if (template) {
      var ref = compileToFunctions(
        template,
        {
          delimiters: options.delimiters
        },
        this
      );
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;
    }
  }
  return mount.call(this, el, hydrating)
};

Vue$3.compile = compileToFunctions;
Vue$3.prototype.$renderTemplate = function(template, context, oldVnode) {
  var slot = template;
  if (typeof template !== 'function') {
    slot = this.$scopedSlots[template]
      ? this.$scopedSlots[template]
      : this.$scopedSlots.default;
  }

  var vnode = slot(context)[0];
  this.__patch__(oldVnode, vnode);

  return vnode
};

var arrayMap = function (xs, f) {
    if (xs.map) { return xs.map(f); }
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        var x = xs[i];
        if (hasOwn$2.call(xs, i)) { res.push(f(x, i, xs)); }
    }
    return res;
};

var hasOwn$2 = Object.prototype.hasOwnProperty;

var indexOf = [].indexOf;

var indexof = function(arr, obj){
  if (indexOf) { return arr.indexOf(obj); }
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) { return i; }
  }
  return -1;
};

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

var hasOwn$3 = Object.prototype.hasOwnProperty;
var toString$1 = Object.prototype.toString;

var foreach = function forEach (obj, fn, ctx) {
    if (toString$1.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn$3.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};

var hasOwn$4 = Object.prototype.hasOwnProperty;

var arrayReduce = function (xs, f, acc) {
    var hasAcc = arguments.length >= 3;
    if (hasAcc && xs.reduce) { return xs.reduce(f, acc); }
    if (xs.reduce) { return xs.reduce(f); }
    
    for (var i = 0; i < xs.length; i++) {
        if (!hasOwn$4.call(xs, i)) { continue; }
        if (!hasAcc) {
            acc = xs[i];
            hasAcc = true;
            continue;
        }
        acc = f(acc, xs[i], i);
    }
    return acc;
};

var hasOwn$5 = Object.prototype.hasOwnProperty;
var toString$3 = Object.prototype.toString;

var isFunction$1 = function (fn) {
	return (typeof fn === 'function' && !(fn instanceof RegExp)) || toString$3.call(fn) === '[object Function]';
};

var foreach$2 = function forEach(obj, fn) {
	if (!isFunction$1(fn)) {
		throw new TypeError('iterator must be a function');
	}
	var i, k,
		isString = typeof obj === 'string',
		l = obj.length,
		context = arguments.length > 2 ? arguments[2] : null;
	if (l === +l) {
		for (i = 0; i < l; i++) {
			if (context === null) {
				fn(isString ? obj.charAt(i) : obj[i], i, obj);
			} else {
				fn.call(context, isString ? obj.charAt(i) : obj[i], i, obj);
			}
		}
	} else {
		for (k in obj) {
			if (hasOwn$5.call(obj, k)) {
				if (context === null) {
					fn(obj[k], k, obj);
				} else {
					fn.call(context, obj[k], k, obj);
				}
			}
		}
	}
};

var toString$4 = Object.prototype.toString;

var isArguments = function isArguments(value) {
	var str = toString$4.call(value);
	var isArguments = str === '[object Arguments]';
	if (!isArguments) {
		isArguments = str !== '[object Array]'
			&& value !== null
			&& typeof value === 'object'
			&& typeof value.length === 'number'
			&& value.length >= 0
			&& toString$4.call(value.callee) === '[object Function]';
	}
	return isArguments;
};

// modified from https://github.com/es-shims/es5-shim
var has$1 = Object.prototype.hasOwnProperty;
var toString$2 = Object.prototype.toString;
var hasDontEnumBug = !({'toString': null}).propertyIsEnumerable('toString');
var hasProtoEnumBug = (function () {}).propertyIsEnumerable('prototype');
var dontEnums = [
		"toString",
		"toLocaleString",
		"valueOf",
		"hasOwnProperty",
		"isPrototypeOf",
		"propertyIsEnumerable",
		"constructor"
	];

var keysShim = function keys(object) {
	var isObject = object !== null && typeof object === 'object',
		isFunction = toString$2.call(object) === '[object Function]',
		isArguments$$1 = isArguments(object),
		theKeys = [];

	if (!isObject && !isFunction && !isArguments$$1) {
		throw new TypeError("Object.keys called on a non-object");
	}

	if (isArguments$$1) {
		foreach$2(object, function (value, index) {
			theKeys.push(index);
		});
	} else {
		var name,
			skipProto = hasProtoEnumBug && isFunction;

		for (name in object) {
			if (!(skipProto && name === 'prototype') && has$1.call(object, name)) {
				theKeys.push(name);
			}
		}
	}

	if (hasDontEnumBug) {
		var ctor = object.constructor,
			skipConstructor = ctor && ctor.prototype === object;

		foreach$2(dontEnums, function (dontEnum) {
			if (!(skipConstructor && dontEnum === 'constructor') && has$1.call(object, dontEnum)) {
				theKeys.push(dontEnum);
			}
		});
	}
	return theKeys;
};

keysShim.shim = function shimObjectKeys() {
	if (!Object.keys) {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

var objectKeys$1 = keysShim;

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var json3 = createCommonjsModule(function (module, exports) {
/*! JSON v3.3.0 | http://bestiejs.github.io/json3 | Copyright 2012-2014, Kit Cambridge | http://kit.mit-license.org */
(function (root) {
  // Detect the `define` function exposed by asynchronous module loaders. The
  // strict `define` check is necessary for compatibility with `r.js`.
  var isLoader = typeof undefined === "function" && undefined.amd;

  // Use the `global` object exposed by Node (including Browserify via
  // `insert-module-globals`), Narwhal, and Ringo as the default context.
  // Rhino exports a `global` function instead.
  var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal;
  if (freeGlobal && (freeGlobal["global"] === freeGlobal || freeGlobal["window"] === freeGlobal)) {
    root = freeGlobal;
  }

  // Public: Initializes JSON 3 using the given `context` object, attaching the
  // `stringify` and `parse` functions to the specified `exports` object.
  function runInContext(context, exports) {
    context || (context = root["Object"]());
    exports || (exports = root["Object"]());

    // Native constructor aliases.
    var Number = context["Number"] || root["Number"],
        String = context["String"] || root["String"],
        Object = context["Object"] || root["Object"],
        Date = context["Date"] || root["Date"],
        SyntaxError = context["SyntaxError"] || root["SyntaxError"],
        TypeError = context["TypeError"] || root["TypeError"],
        Math = context["Math"] || root["Math"],
        nativeJSON = context["JSON"] || root["JSON"];

    // Delegate to the native `stringify` and `parse` implementations.
    if (typeof nativeJSON == "object" && nativeJSON) {
      exports.stringify = nativeJSON.stringify;
      exports.parse = nativeJSON.parse;
    }

    // Convenience aliases.
    var objectProto = Object.prototype,
        getClass = objectProto.toString,
        isProperty, forEach, undef;

    // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
    var isExtended = new Date(-3509827334573292);
    try {
      // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
      // results for certain dates in Opera >= 10.53.
      isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
        // Safari < 2.0.2 stores the internal millisecond time value correctly,
        // but clips the values returned by the date methods to the range of
        // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
        isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
    } catch (exception) {}

    // Internal: Determines whether the native `JSON.stringify` and `parse`
    // implementations are spec-compliant. Based on work by Ken Snyder.
    function has(name) {
      if (has[name] !== undef) {
        // Return cached feature test result.
        return has[name];
      }
      var isSupported;
      if (name == "bug-string-char-index") {
        // IE <= 7 doesn't support accessing string characters using square
        // bracket notation. IE 8 only supports this for primitives.
        isSupported = "a"[0] != "a";
      } else if (name == "json") {
        // Indicates whether both `JSON.stringify` and `JSON.parse` are
        // supported.
        isSupported = has("json-stringify") && has("json-parse");
      } else {
        var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
        // Test `JSON.stringify`.
        if (name == "json-stringify") {
          var stringify = exports.stringify, stringifySupported = typeof stringify == "function" && isExtended;
          if (stringifySupported) {
            // A test function object with a custom `toJSON` method.
            (value = function () {
              return 1;
            }).toJSON = value;
            try {
              stringifySupported =
                // Firefox 3.1b1 and b2 serialize string, number, and boolean
                // primitives as object literals.
                stringify(0) === "0" &&
                // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
                // literals.
                stringify(new Number()) === "0" &&
                stringify(new String()) == '""' &&
                // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
                // does not define a canonical JSON representation (this applies to
                // objects with `toJSON` properties as well, *unless* they are nested
                // within an object or array).
                stringify(getClass) === undef &&
                // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
                // FF 3.1b3 pass this test.
                stringify(undef) === undef &&
                // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
                // respectively, if the value is omitted entirely.
                stringify() === undef &&
                // FF 3.1b1, 2 throw an error if the given value is not a number,
                // string, array, object, Boolean, or `null` literal. This applies to
                // objects with custom `toJSON` methods as well, unless they are nested
                // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
                // methods entirely.
                stringify(value) === "1" &&
                stringify([value]) == "[1]" &&
                // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
                // `"[null]"`.
                stringify([undef]) == "[null]" &&
                // YUI 3.0.0b1 fails to serialize `null` literals.
                stringify(null) == "null" &&
                // FF 3.1b1, 2 halts serialization if an array contains a function:
                // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
                // elides non-JSON values from objects and arrays, unless they
                // define custom `toJSON` methods.
                stringify([undef, getClass, null]) == "[null,null,null]" &&
                // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
                // where character escape codes are expected (e.g., `\b` => `\u0008`).
                stringify({ "a": [value, true, false, null, "\x00\b\n\f\r\t"] }) == serialized &&
                // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
                stringify(null, value) === "1" &&
                stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" &&
                // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
                // serialize extended years.
                stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
                // The milliseconds are optional in ES 5, but required in 5.1.
                stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
                // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
                // four-digit years instead of six-digit years. Credits: @Yaffle.
                stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
                // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
                // values less than 1000. Credits: @Yaffle.
                stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
            } catch (exception) {
              stringifySupported = false;
            }
          }
          isSupported = stringifySupported;
        }
        // Test `JSON.parse`.
        if (name == "json-parse") {
          var parse = exports.parse;
          if (typeof parse == "function") {
            try {
              // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
              // Conforming implementations should also coerce the initial argument to
              // a string prior to parsing.
              if (parse("0") === 0 && !parse(false)) {
                // Simple parsing test.
                value = parse(serialized);
                var parseSupported = value["a"].length == 5 && value["a"][0] === 1;
                if (parseSupported) {
                  try {
                    // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
                    parseSupported = !parse('"\t"');
                  } catch (exception) {}
                  if (parseSupported) {
                    try {
                      // FF 4.0 and 4.0.1 allow leading `+` signs and leading
                      // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
                      // certain octal literals.
                      parseSupported = parse("01") !== 1;
                    } catch (exception) {}
                  }
                  if (parseSupported) {
                    try {
                      // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
                      // points. These environments, along with FF 3.1b1 and 2,
                      // also allow trailing commas in JSON objects and arrays.
                      parseSupported = parse("1.") !== 1;
                    } catch (exception) {}
                  }
                }
              }
            } catch (exception) {
              parseSupported = false;
            }
          }
          isSupported = parseSupported;
        }
      }
      return has[name] = !!isSupported;
    }

    if (!has("json")) {
      // Common `[[Class]]` name aliases.
      var functionClass = "[object Function]",
          dateClass = "[object Date]",
          numberClass = "[object Number]",
          stringClass = "[object String]",
          arrayClass = "[object Array]",
          booleanClass = "[object Boolean]";

      // Detect incomplete support for accessing string characters by index.
      var charIndexBuggy = has("bug-string-char-index");

      // Define additional utility methods if the `Date` methods are buggy.
      if (!isExtended) {
        var floor = Math.floor;
        // A mapping between the months of the year and the number of days between
        // January 1st and the first of the respective month.
        var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        // Internal: Calculates the number of days between the Unix epoch and the
        // first day of the given month.
        var getDay = function (year, month) {
          return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
        };
      }

      // Internal: Determines if a property is a direct property of the given
      // object. Delegates to the native `Object#hasOwnProperty` method.
      if (!(isProperty = objectProto.hasOwnProperty)) {
        isProperty = function (property) {
          var members = {}, constructor;
          if ((members.__proto__ = null, members.__proto__ = {
            // The *proto* property cannot be set multiple times in recent
            // versions of Firefox and SeaMonkey.
            "toString": 1
          }, members).toString != getClass) {
            // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
            // supports the mutable *proto* property.
            isProperty = function (property) {
              // Capture and break the objectgs prototype chain (see section 8.6.2
              // of the ES 5.1 spec). The parenthesized expression prevents an
              // unsafe transformation by the Closure Compiler.
              var original = this.__proto__, result = property in (this.__proto__ = null, this);
              // Restore the original prototype chain.
              this.__proto__ = original;
              return result;
            };
          } else {
            // Capture a reference to the top-level `Object` constructor.
            constructor = members.constructor;
            // Use the `constructor` property to simulate `Object#hasOwnProperty` in
            // other environments.
            isProperty = function (property) {
              var parent = (this.constructor || constructor).prototype;
              return property in this && !(property in parent && this[property] === parent[property]);
            };
          }
          members = null;
          return isProperty.call(this, property);
        };
      }

      // Internal: A set of primitive types used by `isHostType`.
      var PrimitiveTypes = {
        "boolean": 1,
        "number": 1,
        "string": 1,
        "undefined": 1
      };

      // Internal: Determines if the given object `property` value is a
      // non-primitive.
      var isHostType = function (object, property) {
        var type = typeof object[property];
        return type == "object" ? !!object[property] : !PrimitiveTypes[type];
      };

      // Internal: Normalizes the `for...in` iteration algorithm across
      // environments. Each enumerated key is yielded to a `callback` function.
      forEach = function (object, callback) {
        var size = 0, Properties, members, property;

        // Tests for bugs in the current environment's `for...in` algorithm. The
        // `valueOf` property inherits the non-enumerable flag from
        // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
        (Properties = function () {
          this.valueOf = 0;
        }).prototype.valueOf = 0;

        // Iterate over a new instance of the `Properties` class.
        members = new Properties();
        for (property in members) {
          // Ignore all properties inherited from `Object.prototype`.
          if (isProperty.call(members, property)) {
            size++;
          }
        }
        Properties = members = null;

        // Normalize the iteration algorithm.
        if (!size) {
          // A list of non-enumerable properties inherited from `Object.prototype`.
          members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
          // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
          // properties.
          forEach = function (object, callback) {
            var isFunction = getClass.call(object) == functionClass, property, length;
            var hasProperty = !isFunction && typeof object.constructor != "function" && isHostType(object, "hasOwnProperty") ? object.hasOwnProperty : isProperty;
            for (property in object) {
              // Gecko <= 1.0 enumerates the `prototype` property of functions under
              // certain conditions; IE does not.
              if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
                callback(property);
              }
            }
            // Manually invoke the callback for each non-enumerable property.
            for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property)){  }
          };
        } else if (size == 2) {
          // Safari <= 2.0.4 enumerates shadowed properties twice.
          forEach = function (object, callback) {
            // Create a set of iterated properties.
            var members = {}, isFunction = getClass.call(object) == functionClass, property;
            for (property in object) {
              // Store each property name to prevent double enumeration. The
              // `prototype` property of functions is not enumerated due to cross-
              // environment inconsistencies.
              if (!(isFunction && property == "prototype") && !isProperty.call(members, property) && (members[property] = 1) && isProperty.call(object, property)) {
                callback(property);
              }
            }
          };
        } else {
          // No bugs detected; use the standard `for...in` algorithm.
          forEach = function (object, callback) {
            var isFunction = getClass.call(object) == functionClass, property, isConstructor;
            for (property in object) {
              if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
                callback(property);
              }
            }
            // Manually invoke the callback for the `constructor` property due to
            // cross-environment inconsistencies.
            if (isConstructor || isProperty.call(object, (property = "constructor"))) {
              callback(property);
            }
          };
        }
        return forEach(object, callback);
      };

      // Public: Serializes a JavaScript `value` as a JSON string. The optional
      // `filter` argument may specify either a function that alters how object and
      // array members are serialized, or an array of strings and numbers that
      // indicates which properties should be serialized. The optional `width`
      // argument may be either a string or number that specifies the indentation
      // level of the output.
      if (!has("json-stringify")) {
        // Internal: A map of control characters and their escaped equivalents.
        var Escapes = {
          92: "\\\\",
          34: '\\"',
          8: "\\b",
          12: "\\f",
          10: "\\n",
          13: "\\r",
          9: "\\t"
        };

        // Internal: Converts `value` into a zero-padded string such that its
        // length is at least equal to `width`. The `width` must be <= 6.
        var leadingZeroes = "000000";
        var toPaddedString = function (width, value) {
          // The `|| 0` expression is necessary to work around a bug in
          // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
          return (leadingZeroes + (value || 0)).slice(-width);
        };

        // Internal: Double-quotes a string `value`, replacing all ASCII control
        // characters (characters with code unit values between 0 and 31) with
        // their escaped equivalents. This is an implementation of the
        // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
        var unicodePrefix = "\\u00";
        var quote = function (value) {
          var result = '"', index = 0, length = value.length, useCharIndex = !charIndexBuggy || length > 10;
          var symbols = useCharIndex && (charIndexBuggy ? value.split("") : value);
          for (; index < length; index++) {
            var charCode = value.charCodeAt(index);
            // If the character is a control character, append its Unicode or
            // shorthand escape sequence; otherwise, append the character as-is.
            switch (charCode) {
              case 8: case 9: case 10: case 12: case 13: case 34: case 92:
                result += Escapes[charCode];
                break;
              default:
                if (charCode < 32) {
                  result += unicodePrefix + toPaddedString(2, charCode.toString(16));
                  break;
                }
                result += useCharIndex ? symbols[index] : value.charAt(index);
            }
          }
          return result + '"';
        };

        // Internal: Recursively serializes an object. Implements the
        // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
        var serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
          var value, className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, result;
          try {
            // Necessary for host object support.
            value = object[property];
          } catch (exception) {}
          if (typeof value == "object" && value) {
            className = getClass.call(value);
            if (className == dateClass && !isProperty.call(value, "toJSON")) {
              if (value > -1 / 0 && value < 1 / 0) {
                // Dates are serialized according to the `Date#toJSON` method
                // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
                // for the ISO 8601 date time string format.
                if (getDay) {
                  // Manually compute the year, month, date, hours, minutes,
                  // seconds, and milliseconds if the `getUTC*` methods are
                  // buggy. Adapted from @Yaffle's `date-shim` project.
                  date = floor(value / 864e5);
                  for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++){  }
                  for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++){  }
                  date = 1 + date - getDay(year, month);
                  // The `time` value specifies the time within the day (see ES
                  // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
                  // to compute `A modulo B`, as the `%` operator does not
                  // correspond to the `modulo` operation for negative numbers.
                  time = (value % 864e5 + 864e5) % 864e5;
                  // The hours, minutes, seconds, and milliseconds are obtained by
                  // decomposing the time within the day. See section 15.9.1.10.
                  hours = floor(time / 36e5) % 24;
                  minutes = floor(time / 6e4) % 60;
                  seconds = floor(time / 1e3) % 60;
                  milliseconds = time % 1e3;
                } else {
                  year = value.getUTCFullYear();
                  month = value.getUTCMonth();
                  date = value.getUTCDate();
                  hours = value.getUTCHours();
                  minutes = value.getUTCMinutes();
                  seconds = value.getUTCSeconds();
                  milliseconds = value.getUTCMilliseconds();
                }
                // Serialize extended years correctly.
                value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) +
                  "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
                  // Months, dates, hours, minutes, and seconds should have two
                  // digits; milliseconds should have three.
                  "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
                  // Milliseconds are optional in ES 5.0, but required in 5.1.
                  "." + toPaddedString(3, milliseconds) + "Z";
              } else {
                value = null;
              }
            } else if (typeof value.toJSON == "function" && ((className != numberClass && className != stringClass && className != arrayClass) || isProperty.call(value, "toJSON"))) {
              // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
              // `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
              // ignores all `toJSON` methods on these objects unless they are
              // defined directly on an instance.
              value = value.toJSON(property);
            }
          }
          if (callback) {
            // If a replacement function was provided, call it to obtain the value
            // for serialization.
            value = callback.call(object, property, value);
          }
          if (value === null) {
            return "null";
          }
          className = getClass.call(value);
          if (className == booleanClass) {
            // Booleans are represented literally.
            return "" + value;
          } else if (className == numberClass) {
            // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
            // `"null"`.
            return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
          } else if (className == stringClass) {
            // Strings are double-quoted and escaped.
            return quote("" + value);
          }
          // Recursively serialize objects and arrays.
          if (typeof value == "object") {
            // Check for cyclic structures. This is a linear search; performance
            // is inversely proportional to the number of unique nested objects.
            for (length = stack.length; length--;) {
              if (stack[length] === value) {
                // Cyclic structures cannot be serialized by `JSON.stringify`.
                throw TypeError();
              }
            }
            // Add the object to the stack of traversed objects.
            stack.push(value);
            results = [];
            // Save the current indentation level and indent one additional level.
            prefix = indentation;
            indentation += whitespace;
            if (className == arrayClass) {
              // Recursively serialize array elements.
              for (index = 0, length = value.length; index < length; index++) {
                element = serialize(index, value, callback, properties, whitespace, indentation, stack);
                results.push(element === undef ? "null" : element);
              }
              result = results.length ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
            } else {
              // Recursively serialize object members. Members are selected from
              // either a user-specified list of property names, or the object
              // itself.
              forEach(properties || value, function (property) {
                var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
                if (element !== undef) {
                  // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
                  // is not the empty string, let `member` {quote(property) + ":"}
                  // be the concatenation of `member` and the `space` character."
                  // The "`space` character" refers to the literal space
                  // character, not the `space` {width} argument provided to
                  // `JSON.stringify`.
                  results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
                }
              });
              result = results.length ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
            }
            // Remove the object from the traversed object stack.
            stack.pop();
            return result;
          }
        };

        // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
        exports.stringify = function (source, filter, width) {
          var whitespace, callback, properties, className;
          if (typeof filter == "function" || typeof filter == "object" && filter) {
            if ((className = getClass.call(filter)) == functionClass) {
              callback = filter;
            } else if (className == arrayClass) {
              // Convert the property names array into a makeshift set.
              properties = {};
              for (var index = 0, length = filter.length, value; index < length; value = filter[index++], (className = getClass.call(value), className == stringClass || className == numberClass) && (properties[value] = 1)){  }
            }
          }
          if (width) {
            if ((className = getClass.call(width)) == numberClass) {
              // Convert the `width` to an integer and create a string containing
              // `width` number of space characters.
              if ((width -= width % 1) > 0) {
                for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " "){  }
              }
            } else if (className == stringClass) {
              whitespace = width.length <= 10 ? width : width.slice(0, 10);
            }
          }
          // Opera <= 7.54u2 discards the values associated with empty string keys
          // (`""`) only if they are used directly within an object member list
          // (e.g., `!("" in { "": 1})`).
          return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
        };
      }

      // Public: Parses a JSON source string.
      if (!has("json-parse")) {
        var fromCharCode = String.fromCharCode;

        // Internal: A map of escaped control characters and their unescaped
        // equivalents.
        var Unescapes = {
          92: "\\",
          34: '"',
          47: "/",
          98: "\b",
          116: "\t",
          110: "\n",
          102: "\f",
          114: "\r"
        };

        // Internal: Stores the parser state.
        var Index, Source;

        // Internal: Resets the parser state and throws a `SyntaxError`.
        var abort = function () {
          Index = Source = null;
          throw SyntaxError();
        };

        // Internal: Returns the next token, or `"$"` if the parser has reached
        // the end of the source string. A token may be a string, number, `null`
        // literal, or Boolean literal.
        var lex = function () {
          var source = Source, length = source.length, value, begin, position, isSigned, charCode;
          while (Index < length) {
            charCode = source.charCodeAt(Index);
            switch (charCode) {
              case 9: case 10: case 13: case 32:
                // Skip whitespace tokens, including tabs, carriage returns, line
                // feeds, and space characters.
                Index++;
                break;
              case 123: case 125: case 91: case 93: case 58: case 44:
                // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
                // the current position.
                value = charIndexBuggy ? source.charAt(Index) : source[Index];
                Index++;
                return value;
              case 34:
                // `"` delimits a JSON string; advance to the next character and
                // begin parsing the string. String tokens are prefixed with the
                // sentinel `@` character to distinguish them from punctuators and
                // end-of-string tokens.
                for (value = "@", Index++; Index < length;) {
                  charCode = source.charCodeAt(Index);
                  if (charCode < 32) {
                    // Unescaped ASCII control characters (those with a code unit
                    // less than the space character) are not permitted.
                    abort();
                  } else if (charCode == 92) {
                    // A reverse solidus (`\`) marks the beginning of an escaped
                    // control character (including `"`, `\`, and `/`) or Unicode
                    // escape sequence.
                    charCode = source.charCodeAt(++Index);
                    switch (charCode) {
                      case 92: case 34: case 47: case 98: case 116: case 110: case 102: case 114:
                        // Revive escaped control characters.
                        value += Unescapes[charCode];
                        Index++;
                        break;
                      case 117:
                        // `\u` marks the beginning of a Unicode escape sequence.
                        // Advance to the first character and validate the
                        // four-digit code point.
                        begin = ++Index;
                        for (position = Index + 4; Index < position; Index++) {
                          charCode = source.charCodeAt(Index);
                          // A valid sequence comprises four hexdigits (case-
                          // insensitive) that form a single hexadecimal value.
                          if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                            // Invalid Unicode escape sequence.
                            abort();
                          }
                        }
                        // Revive the escaped character.
                        value += fromCharCode("0x" + source.slice(begin, Index));
                        break;
                      default:
                        // Invalid escape sequence.
                        abort();
                    }
                  } else {
                    if (charCode == 34) {
                      // An unescaped double-quote character marks the end of the
                      // string.
                      break;
                    }
                    charCode = source.charCodeAt(Index);
                    begin = Index;
                    // Optimize for the common case where a string is valid.
                    while (charCode >= 32 && charCode != 92 && charCode != 34) {
                      charCode = source.charCodeAt(++Index);
                    }
                    // Append the string as-is.
                    value += source.slice(begin, Index);
                  }
                }
                if (source.charCodeAt(Index) == 34) {
                  // Advance to the next character and return the revived string.
                  Index++;
                  return value;
                }
                // Unterminated string.
                abort();
              default:
                // Parse numbers and literals.
                begin = Index;
                // Advance past the negative sign, if one is specified.
                if (charCode == 45) {
                  isSigned = true;
                  charCode = source.charCodeAt(++Index);
                }
                // Parse an integer or floating-point value.
                if (charCode >= 48 && charCode <= 57) {
                  // Leading zeroes are interpreted as octal literals.
                  if (charCode == 48 && (charCode = source.charCodeAt(Index + 1), charCode >= 48 && charCode <= 57)) {
                    // Illegal octal literal.
                    abort();
                  }
                  isSigned = false;
                  // Parse the integer component.
                  for (; Index < length && (charCode = source.charCodeAt(Index), charCode >= 48 && charCode <= 57); Index++){  }
                  // Floats cannot contain a leading decimal point; however, this
                  // case is already accounted for by the parser.
                  if (source.charCodeAt(Index) == 46) {
                    position = ++Index;
                    // Parse the decimal component.
                    for (; position < length && (charCode = source.charCodeAt(position), charCode >= 48 && charCode <= 57); position++){  }
                    if (position == Index) {
                      // Illegal trailing decimal.
                      abort();
                    }
                    Index = position;
                  }
                  // Parse exponents. The `e` denoting the exponent is
                  // case-insensitive.
                  charCode = source.charCodeAt(Index);
                  if (charCode == 101 || charCode == 69) {
                    charCode = source.charCodeAt(++Index);
                    // Skip past the sign following the exponent, if one is
                    // specified.
                    if (charCode == 43 || charCode == 45) {
                      Index++;
                    }
                    // Parse the exponential component.
                    for (position = Index; position < length && (charCode = source.charCodeAt(position), charCode >= 48 && charCode <= 57); position++){  }
                    if (position == Index) {
                      // Illegal empty exponent.
                      abort();
                    }
                    Index = position;
                  }
                  // Coerce the parsed value to a JavaScript number.
                  return +source.slice(begin, Index);
                }
                // A negative sign may only precede numbers.
                if (isSigned) {
                  abort();
                }
                // `true`, `false`, and `null` literals.
                if (source.slice(Index, Index + 4) == "true") {
                  Index += 4;
                  return true;
                } else if (source.slice(Index, Index + 5) == "false") {
                  Index += 5;
                  return false;
                } else if (source.slice(Index, Index + 4) == "null") {
                  Index += 4;
                  return null;
                }
                // Unrecognized token.
                abort();
            }
          }
          // Return the sentinel `$` character if the parser has reached the end
          // of the source string.
          return "$";
        };

        // Internal: Parses a JSON `value` token.
        var get = function (value) {
          var results, hasMembers;
          if (value == "$") {
            // Unexpected end of input.
            abort();
          }
          if (typeof value == "string") {
            if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
              // Remove the sentinel `@` character.
              return value.slice(1);
            }
            // Parse object and array literals.
            if (value == "[") {
              // Parses a JSON array, returning a new JavaScript array.
              results = [];
              for (;; hasMembers || (hasMembers = true)) {
                value = lex();
                // A closing square bracket marks the end of the array literal.
                if (value == "]") {
                  break;
                }
                // If the array literal contains elements, the current token
                // should be a comma separating the previous element from the
                // next.
                if (hasMembers) {
                  if (value == ",") {
                    value = lex();
                    if (value == "]") {
                      // Unexpected trailing `,` in array literal.
                      abort();
                    }
                  } else {
                    // A `,` must separate each array element.
                    abort();
                  }
                }
                // Elisions and leading commas are not permitted.
                if (value == ",") {
                  abort();
                }
                results.push(get(value));
              }
              return results;
            } else if (value == "{") {
              // Parses a JSON object, returning a new JavaScript object.
              results = {};
              for (;; hasMembers || (hasMembers = true)) {
                value = lex();
                // A closing curly brace marks the end of the object literal.
                if (value == "}") {
                  break;
                }
                // If the object literal contains members, the current token
                // should be a comma separator.
                if (hasMembers) {
                  if (value == ",") {
                    value = lex();
                    if (value == "}") {
                      // Unexpected trailing `,` in object literal.
                      abort();
                    }
                  } else {
                    // A `,` must separate each object member.
                    abort();
                  }
                }
                // Leading commas are not permitted, object property names must be
                // double-quoted strings, and a `:` must separate each property
                // name and value.
                if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
                  abort();
                }
                results[value.slice(1)] = get(lex());
              }
              return results;
            }
            // Unexpected token encountered.
            abort();
          }
          return value;
        };

        // Internal: Updates a traversed object member.
        var update = function (source, property, callback) {
          var element = walk(source, property, callback);
          if (element === undef) {
            delete source[property];
          } else {
            source[property] = element;
          }
        };

        // Internal: Recursively traverses a parsed JSON object, invoking the
        // `callback` function for each value. This is an implementation of the
        // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
        var walk = function (source, property, callback) {
          var value = source[property], length;
          if (typeof value == "object" && value) {
            // `forEach` can't be used to traverse an array in Opera <= 8.54
            // because its `Object#hasOwnProperty` implementation returns `false`
            // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
            if (getClass.call(value) == arrayClass) {
              for (length = value.length; length--;) {
                update(value, length, callback);
              }
            } else {
              forEach(value, function (property) {
                update(value, property, callback);
              });
            }
          }
          return callback.call(source, property, value);
        };

        // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
        exports.parse = function (source, callback) {
          var result, value;
          Index = 0;
          Source = "" + source;
          result = get(lex());
          // If a JSON string contains multiple tokens, it is invalid.
          if (lex() != "$") {
            abort();
          }
          // Reset the parser state.
          Index = Source = null;
          return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
        };
      }
    }

    exports["runInContext"] = runInContext;
    return exports;
  }

  if ('object' == "object" && exports && !exports.nodeType && !isLoader) {
    // Export for CommonJS environments.
    runInContext(root, exports);
  } else {
    // Export for web browsers and JavaScript engines.
    var nativeJSON = root.JSON;
    var JSON3 = runInContext(root, (root["JSON3"] = {
      // Public: Restores the original value of the global `JSON` object and
      // returns a reference to the `JSON3` object.
      "noConflict": function () {
        root.JSON = nativeJSON;
        return JSON3;
      }
    }));

    root.JSON = {
      "parse": JSON3.parse,
      "stringify": JSON3.stringify
    };
  }

  // Export for asynchronous module loaders.
  if (isLoader) {
    undefined(function () {
      return JSON3;
    });
  }
}(commonjsGlobal));
});

/**
 * Module dependencies.
 */









/**
 * Make sure `Object.keys` work for `undefined`
 * values that are still there, like `document.all`.
 * http://lists.w3.org/Archives/Public/public-html/2009Jun/0546.html
 *
 * @api private
 */

function objectKeys(val){
  if (Object.keys) { return Object.keys(val); }
  return objectKeys$1(val);
}

/**
 * Module exports.
 */

var utilInspect = inspect;

/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 * @license MIT (© Joyent)
 */
/* legacy: obj, showHidden, depth, colors*/

function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) { ctx.depth = arguments[2]; }
  if (arguments.length >= 4) { ctx.colors = arguments[3]; }
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    _extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) { ctx.showHidden = false; }
  if (isUndefined(ctx.depth)) { ctx.depth = 2; }
  if (isUndefined(ctx.colors)) { ctx.colors = false; }
  if (isUndefined(ctx.customInspect)) { ctx.customInspect = true; }
  if (ctx.colors) { ctx.stylize = stylizeWithColor; }
  return formatValue(ctx, obj, ctx.depth);
}

// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};

function stylizeNoColor(str, styleType) {
  return str;
}

function isBoolean(arg) {
  return typeof arg === 'boolean';
}

function isUndefined(arg) {
  return arg === void 0;
}

function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}

function isFunction(arg) {
  return typeof arg === 'function';
}

function isString(arg) {
  return typeof arg === 'string';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isNull(arg) {
  return arg === null;
}

function hasOwn$1(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

function isRegExp$1(re) {
  return isObject$1(re) && objectToString(re) === '[object RegExp]';
}

function isObject$1(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isError(e) {
  return isObject$1(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}

function isDate(d) {
  return isObject$1(d) && objectToString(d) === '[object Date]';
}

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

function arrayToHash(array) {
  var hash = {};

  foreach(array, function(val, idx) {
    hash[val] = true;
  });

  return hash;
}

function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwn$1(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  foreach(keys, function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}

function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}

function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = objectKeys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden && Object.getOwnPropertyNames) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (indexof(keys, 'message') >= 0 || indexof(keys, 'description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp$1(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isarray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp$1(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp$1(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = arrayMap(keys, function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}

function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = { value: value[key] };
  if (Object.getOwnPropertyDescriptor) {
    desc = Object.getOwnPropertyDescriptor(value, key) || desc;
  }
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwn$1(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (indexof(ctx.seen, desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = arrayMap(str.split('\n'), function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + arrayMap(str.split('\n'), function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = json3.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}

function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    { return ctx.stylize('undefined', 'undefined'); }
  if (isString(value)) {
    var simple = '\'' + json3.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    { return ctx.stylize('' + value, 'number'); }
  if (isBoolean(value))
    { return ctx.stylize('' + value, 'boolean'); }
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    { return ctx.stylize('null', 'null'); }
}

function reduceToSingleString(output, base, braces) {
  var length = arrayReduce(output, function(prev, cur) {
    if (cur.indexOf('\n') >= 0) {  }
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}

function _extend(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject$1(add)) { return origin; }

  var keys = objectKeys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
}

var ModalPlugin = {
  install: function install(Vue) {
    Vue.prototype.$showModal = function(
      component,
      options
    ) {
      var this$1 = this;
      if ( options === void 0 ) options = { context: null, fullscreen: false };

      return new Promise(function (resolve) {
        var placeholder = this$1.$document.createComment('placeholder');

        var contentComponent = Vue.extend(component);
        var vm = new contentComponent(options.context);

        contentComponent.prototype.$modal = {
          close: function close(data) {
            resolve(data);
            modalPage.closeModal();
            setTimeout(function () {
              vm.$destroy();
            });
          }
        };

        vm.$mount(placeholder);
        var modalPage = isPage(vm.$el) ? vm.$el.nativeView : new page.Page();

        if (!isPage(vm.$el)) {
          modalPage.content = vm.$el.nativeView;
        }

        this$1.$root.$el.nativeView.showModal(
          modalPage,
          null,
          resolve,
          options.fullscreen
        );
      })
    };
  }
}

var NavigatorPlugin = {
  install: function install(Vue) {
    Vue.navigateBack = Vue.prototype.$navigateBack = function() {
      return frame.topmost().goBack()
    };

    Vue.navigateTo = Vue.prototype.$navigateTo = function(
      component,
      options,
      pageCb
    ) {
      if ( options === void 0 ) options = {};
      if ( pageCb === void 0 ) pageCb = function () {};

      return new Promise(function (resolve) {
        var frame$$1 = frame.topmost();
        var navigate = frame$$1 ? frame$$1.navigate : application.start;

        if (isPage(component)) {
          return navigate(
            Object.assign(options, {
              create: function create() {
                return component
              }
            })
          )
        }

        var placeholder = Vue.$document.createComment('placeholder');

        var vm = component;
        if (!component.__is_root__) {
          var contentComponent = Vue.extend(component);
          vm = new contentComponent(options.context);
          vm.$mount(placeholder);
        }

        var toPage = isPage(vm.$el) ? vm.$el.nativeView : new page.Page();

        if (!isPage(vm.$el)) {
          toPage.content = vm.$el.nativeView;
        }

        toPage[VUE_VM_REF] = vm;

        navigate.call(
          frame$$1,
          Object.assign(
            {
              create: function () {
                if (frame$$1) {
                  toPage.disposeNativeView = after(
                    toPage.disposeNativeView,
                    toPage,
                    function () {
                      vm.$destroy();
                    }
                  );
                }

                pageCb(toPage);
                resolve(toPage);
                return toPage
              }
            },
            options
          )
        );
      })
    };
  }
}

function patchRouter(router, Vue) {
  if (router.__patched_for_page_routing__) {
    return
  }
  router.__patched_for_page_routing__ = true;

  // The problem: When using router.replace() to set the initial route
  // the history index stays -1, which then causes an issue when visiting a route,
  // going back, and then trying to visit again (the active route is not changed on nav back)
  // This fixes it, since it allows the router.go logic to run
  router.history.index = 0;

  // initial navigation states
  router.isBackNavigation = false;
  router.shouldNavigate = true;
  router.pageStack = [];
  router.pageTransition = null;

  router.setPageTransition = function (transition, duration, curve) {
    if (typeof transition === 'string') {
      return (router.pageTransition = {
        name: transition,
        duration: duration,
        curve: curve
      })
    }

    router.pageTransition = transition;
  };

  router._beginBackNavigation = function (shouldNavigate) {
    if ( shouldNavigate === void 0 ) shouldNavigate = true;

    if (router.isBackNavigation) {
      throw new Error(
        'router._beginBackNavigation was called while already navigating back.'
      )
    }

    router.isBackNavigation = true;
    router.shouldNavigate = shouldNavigate;
  };

  router._finishBackNavigation = function () {
    if (!router.isBackNavigation) {
      throw new Error(
        'router._finishBackNavigation was called while there was no back navigation.'
      )
    }

    router.isBackNavigation = false;
  };

  router.go = before(router.go, router, function (n) {
    if (n === -1 && !router.isBackNavigation) {
      router._beginBackNavigation();
    }
  });

  router.afterEach(function () {
    if (router.isBackNavigation) {
      if (router.shouldNavigate) {
        Vue.navigateBack();
      }
      router.pageStack.pop();
      var page$$1 = router.pageStack[router.pageStack.length - 1];

      var callback = function (ref) {
        var isBackNavigation = ref.isBackNavigation;

        if (isBackNavigation) {
          router._finishBackNavigation();
        }
        page$$1.off(page.Page.navigatedToEvent, callback);
      };

      page$$1.on(page.Page.navigatedToEvent, callback);

      return
    }

    var component = router.getMatchedComponents()[0];

    Vue.navigateTo(component, {
      context: { router: router },
      transition: router.pageTransition
      // Todo: add transitionAndroid and transitionIOS
    }).then(function (page$$1) {
      router.pageStack.push(page$$1);

      page$$1.on(page.Page.navigatedFromEvent, function (ref) {
        var isBackNavigation = ref.isBackNavigation;

        if (isBackNavigation && !router.isBackNavigation) {
          router._beginBackNavigation(false);
          router.back();
        }
      });
    });
  });
}

var RouterPlugin = {
  install: function install(Vue) {
    Vue.mixin({
      beforeCreate: function beforeCreate() {
        var this$1 = this;

        if (!this.$options.router) {
          // If there is no router, we don't care
          return
        }

        var router = this.$options.router;
        var self = this;

        patchRouter(router, Vue);

        // Overwrite the default $start function
        this.$start = function () {
          this$1.__is_root__ = true;
          this$1.__started__ = true; // skips the default start procedure

          // Mount the root component
          var placeholder = Vue.$document.createComment('placeholder');
          self.$mount(placeholder);

          var initial = router.getMatchedComponents()[0];

          this$1.$navigateTo(
            initial,
            {
              context: { router: router },
              clearHistory: true
            },
            function (page$$1) {
              router.pageStack.push(page$$1);
            }
          );
        };
      }
    });
  }
}

// This is required because some of the third party plugins rely on this
// and cause errors since there is no process variable in {N}.
global.process = global.process || {};
global.process.env = global.process.env || {};

// import DecoderPlugin from './plugins/decoder-plugin'
Vue$3.use(ModalPlugin);
Vue$3.use(NavigatorPlugin);
// Vue.use(DecoderPlugin)
Vue$3.use(RouterPlugin);

console.log = (function(log, inspect, Vue) {
  return function() {
    return log.apply(
      this,
      Array.prototype.map.call(arguments, function(arg) {
        return inspect(arg, { depth: 1, colors: Vue.config.debug })
      })
    )
  }
})(console.log, utilInspect, Vue$3);

console.keys = function(object) {
  console.log(Object.keys(object));
};

// this fixes the issue of resuming the application
// however this might not be the desired functionality
// Todo: figure out if there is a better way to fix application resume.
application__default.on(application__default.exitEvent, function () {
  var frame$$1 = frame.topmost();
  if (frame$$1) {
    frame$$1.eachChildView(function (child) {
      var vm = child[VUE_VM_REF];

      if (vm) {
        vm.$destroy();
      }
      frame$$1._removeView(child);
    });
  }
});

global.__onLiveSyncCore = function () {
  var frame$$1 = frame.topmost();
  if (frame$$1) {
    if (frame$$1.currentPage && frame$$1.currentPage.modal) {
      frame$$1.currentPage.modal.closeModal();
    }
    // Todo: make sure that the before-livesync hook is installed, because otherwise the page will always get reloaded.
    // const currentEntry = frame._currentEntry && frame._currentEntry.entry
    // if (currentEntry) {

    // const newEntry = {
    //   animated: false,
    //   clearHistory: true,
    //   create: () => {  } ,
    //   backstackVisible: currentEntry.backstackVisible
    // }
    // frame.navigate(newEntry)
    // }
  }
};

module.exports = Vue$3;


/***/ }),
/* 33 */
/* exports provided: default */
/* exports used: default */
/*!*************************************!*\
  !*** ./services/FirebaseService.js ***!
  \*************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tns_core_modules_http__ = __webpack_require__(/*! tns-core-modules/http */ 37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tns_core_modules_http___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tns_core_modules_http__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BackendService__ = __webpack_require__(/*! ./BackendService */ 53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nativescript_plugin_firebase__ = __webpack_require__(/*! nativescript-plugin-firebase */ 31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nativescript_plugin_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_nativescript_plugin_firebase__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var FirebaseService = function (_BackendService) {
  _inherits(FirebaseService, _BackendService);

  function FirebaseService() {
    _classCallCheck(this, FirebaseService);

    return _possibleConstructorReturn(this, (FirebaseService.__proto__ || Object.getPrototypeOf(FirebaseService)).apply(this, arguments));
  }

  _createClass(FirebaseService, [{
    key: 'getMessage',
    value: function getMessage() {
      __WEBPACK_IMPORTED_MODULE_2_nativescript_plugin_firebase___default.a.addOnMessageReceivedCallback(function (data) {
        alert(JSON.stringify(data));
      });
    }
  }, {
    key: 'login',
    value: function login(user) {
      return __WEBPACK_IMPORTED_MODULE_2_nativescript_plugin_firebase___default.a.login({
        type: __WEBPACK_IMPORTED_MODULE_2_nativescript_plugin_firebase___default.a.LoginType.PASSWORD,
        passwordOptions: {
          email: user.email,
          password: user.password
        }
      }).then(function (result) {
        __WEBPACK_IMPORTED_MODULE_1__BackendService__["a" /* default */].token = result.uid;
        return JSON.stringify(result);
      }, function (errorMessage) {
        alert(errorMessage);
      });
    }
  }, {
    key: 'register',
    value: function register(user) {
      return __WEBPACK_IMPORTED_MODULE_2_nativescript_plugin_firebase___default.a.createUser({
        email: user.email,
        password: user.password
      }).then(function (result) {
        return JSON.stringify(result);
      }, function (errorMessage) {
        alert(errorMessage);
      });
    }
  }, {
    key: 'resetPassword',
    value: function resetPassword(email) {
      return __WEBPACK_IMPORTED_MODULE_2_nativescript_plugin_firebase___default.a.resetPassword({
        email: email
      }).then(function (result) {
        alert(JSON.stringify(result));
      }, function (errorMessage) {
        alert(errorMessage);
      }).catch(this.handleErrors);
    }
  }, {
    key: 'logout',
    value: function logout() {
      __WEBPACK_IMPORTED_MODULE_1__BackendService__["a" /* default */].token = "";
      __WEBPACK_IMPORTED_MODULE_2_nativescript_plugin_firebase___default.a.logout();
    }
  }]);

  return FirebaseService;
}(__WEBPACK_IMPORTED_MODULE_1__BackendService__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (FirebaseService);

/***/ }),
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */
/* exports provided: default */
/* exports used: default */
/*!************************************!*\
  !*** ./services/BackendService.js ***!
  \************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tns_core_modules_application_settings__ = __webpack_require__(/*! tns-core-modules/application-settings */ 56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tns_core_modules_application_settings___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tns_core_modules_application_settings__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var tokenKey = "token";

/**
 * Parent service class. Has common configs and methods.
 */

var BackendService = function () {
  function BackendService() {
    _classCallCheck(this, BackendService);
  }

  _createClass(BackendService, [{
    key: "isLoggedIn",
    value: function isLoggedIn() {
      return !!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tns_core_modules_application_settings__["getString"])(tokenKey);
    }
  }, {
    key: "token",
    get: function get() {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tns_core_modules_application_settings__["getString"])(tokenKey);
    },
    set: function set(newToken) {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_tns_core_modules_application_settings__["setString"])(tokenKey, newToken);
    }
  }]);

  return BackendService;
}();

/* harmony default export */ __webpack_exports__["a"] = (BackendService);

/***/ }),
/* 54 */
/* exports provided: default */
/* exports used: default */
/*!************************!*\
  !*** ./store/store.js ***!
  \************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_nativescript_vue__ = __webpack_require__(/*! nativescript-vue */ 32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_nativescript_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_nativescript_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(/*! vuex */ 15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nativescript_plugin_firebase__ = __webpack_require__(/*! nativescript-plugin-firebase */ 31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nativescript_plugin_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_nativescript_plugin_firebase__);




__WEBPACK_IMPORTED_MODULE_0_nativescript_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */]);

var state = {
  user: null,
  message: null,
  info: null,
  student: null,
  classrooms: [],
  assignments: [],
  activeClassroom: null,
  activeAssignment: null
};

var getters = {
  classroom: function classroom(state) {
    return state.classrooms.find(function (classroom) {
      return classroom.id === state.activeClassroom;
    });
  },
  assignment: function assignment(state) {
    return state.assignments.find(function (assignment) {
      return assignment.id === state.activeAssignment;
    });
  }
};

var mutations = {
  setUser: function setUser(state, user) {
    state.user = user;
  },
  setActiveClassroom: function setActiveClassroom(state, id) {
    state.activeClassroom = id;
  },
  setActiveAssignment: function setActiveAssignment(state, id) {
    state.activeAssignment = id;
  },
  setStudent: function setStudent(state, student) {
    state.message = '';
    state.student = student;
  },
  setClassrooms: function setClassrooms(state, classrooms) {
    state.classrooms = classrooms;
  },
  setAssignments: function setAssignments(state, assignments) {
    state.assignments = assignments;
  },
  setMessage: function setMessage(state, message) {
    state.message = message;
  },
  setInfo: function setInfo(state, info) {
    state.info = info;
    //timeout the view
    setTimeout(function () {
      state.info = '';
    }, 2000);
  }
};

var actions = {
  fetchClassrooms: function fetchClassrooms(_ref) {
    var state = _ref.state,
        commit = _ref.commit;

    __WEBPACK_IMPORTED_MODULE_2_nativescript_plugin_firebase___default.a.getCurrentUser().then(function (user) {
      var path = "/Users/" + user.uid + "/Classes";
      var onValueEvent = function onValueEvent(result) {
        if (result.error) {
          console.log(result.error);
        } else {
          console.log(JSON.stringify(result.value));
          var obj = result.value;
          var classrooms = Object.keys(obj || {}).map(function (key) {
            return {
              id: key,
              ClassName: obj[key].ClassName
            };
          });
          commit('setClassrooms', classrooms);
        }
      };

      __WEBPACK_IMPORTED_MODULE_2_nativescript_plugin_firebase___default.a.addValueEventListener(onValueEvent, path).then(function (result) {
        that._listenerWrapper = result;
        console.log("firebase.addValueEventListener added");
      }, function (error) {
        console.log("firebase.addValueEventListener error: " + error);
      });
    });
  },
  fetchAssignments: function fetchAssignments(_ref2, id) {
    var commit = _ref2.commit;


    var onQueryEvent = function onQueryEvent(result) {
      if (result.error) {
        console.log(result.error);
      } else {
        console.log(JSON.stringify(result.value));
        var obj = result.value;
        var assignments = Object.keys(obj || {}).map(function (key) {
          return {
            id: key,
            Title: obj[key].Title,
            Text: obj[key].Text
          };
        });
        commit('setAssignments', assignments);
      }
    };

    __WEBPACK_IMPORTED_MODULE_2_nativescript_plugin_firebase___default.a.query(onQueryEvent, "/Assignments", {
      singleEvent: true,
      orderBy: {
        type: __WEBPACK_IMPORTED_MODULE_2_nativescript_plugin_firebase___default.a.QueryOrderByType.CHILD,
        value: 'ClassId'
      },
      range: {
        type: __WEBPACK_IMPORTED_MODULE_2_nativescript_plugin_firebase___default.a.QueryRangeType.EQUAL_TO,
        value: id
      }
    });
  },
  updateUser: function updateUser(_ref3, payload) {
    var commit = _ref3.commit;

    __WEBPACK_IMPORTED_MODULE_2_nativescript_plugin_firebase___default.a.update('/Users/' + payload.uid, {
      DisplayName: payload.email,
      Email: payload.name,
      id: payload.uid,
      updateTs: __WEBPACK_IMPORTED_MODULE_2_nativescript_plugin_firebase___default.a.ServerValue.TIMESTAMP
    }).then(function () {
      //commit('setUser', payload);
    }, function (error) {
      console.log("firebase.setValue error: " + error);
    });
  },
  fetchCurrentUser: function fetchCurrentUser(_ref4) {
    var commit = _ref4.commit;

    __WEBPACK_IMPORTED_MODULE_2_nativescript_plugin_firebase___default.a.getCurrentUser().then(function (user) {
      commit('setUser', user);
    }, function (errorMessage) {
      console.log(errorMessage);
    });
  }
};

var storeConf = {
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
};

/* harmony default export */ __webpack_exports__["a"] = (storeConf);

/***/ }),
/* 55 */
/* no static exports found */
/* all exports used */
/*!*******************************!*\
  !*** ../~/process/browser.js ***!
  \*******************************/
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 56 */
/* no static exports found */
/* all exports used */
/*!******************************************************************************!*\
  !*** ../~/tns-core-modules/application-settings/application-settings.ios.js ***!
  \******************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

Object.defineProperty(exports, "__esModule", { value: true });
var Common = __webpack_require__(/*! ./application-settings-common */ 155);
var utils = __webpack_require__(/*! ../utils/utils */ 1);
var userDefaults = utils.ios.getter(NSUserDefaults, NSUserDefaults.standardUserDefaults);
exports.hasKey = function (key) {
    Common.checkKey(key);
    return userDefaults.objectForKey(key) !== null;
};
exports.getBoolean = function (key, defaultValue) {
    Common.checkKey(key);
    if (exports.hasKey(key)) {
        return userDefaults.boolForKey(key);
    }
    return defaultValue;
};
exports.getString = function (key, defaultValue) {
    Common.checkKey(key);
    if (exports.hasKey(key)) {
        return userDefaults.stringForKey(key);
    }
    return defaultValue;
};
exports.getNumber = function (key, defaultValue) {
    Common.checkKey(key);
    if (exports.hasKey(key)) {
        return userDefaults.doubleForKey(key);
    }
    return defaultValue;
};
exports.setBoolean = function (key, value) {
    Common.checkKey(key);
    Common.ensureValidValue(value, "boolean");
    userDefaults.setBoolForKey(value, key);
};
exports.setString = function (key, value) {
    Common.checkKey(key);
    Common.ensureValidValue(value, "string");
    userDefaults.setObjectForKey(value, key);
};
exports.setNumber = function (key, value) {
    Common.checkKey(key);
    Common.ensureValidValue(value, "number");
    userDefaults.setDoubleForKey(value, key);
};
exports.remove = function (key) {
    Common.checkKey(key);
    userDefaults.removeObjectForKey(key);
};
exports.clear = function () {
    userDefaults.removePersistentDomainForName(utils.ios.getter(NSBundle, NSBundle.mainBundle).bundleIdentifier);
};
exports.flush = function () {
    return userDefaults.synchronize();
};
//# sourceMappingURL=application-settings.ios.js.map

/***/ }),
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */
/* no static exports found */
/* all exports used */
/*!**************************************************************************!*\
  !*** ../~/tns-core-modules/ui/layouts/wrap-layout/wrap-layout-common.js ***!
  \**************************************************************************/
/***/ (function(module, exports, __webpack_require__) {

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var layout_base_1 = __webpack_require__(/*! ../layout-base */ 4);
__export(__webpack_require__(/*! ../layout-base */ 4));
var WrapLayoutBase = (function (_super) {
    __extends(WrapLayoutBase, _super);
    function WrapLayoutBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return WrapLayoutBase;
}(layout_base_1.LayoutBase));
exports.WrapLayoutBase = WrapLayoutBase;
WrapLayoutBase.prototype.recycleNativeView = "auto";
exports.itemWidthProperty = new layout_base_1.Property({
    name: "itemWidth", defaultValue: "auto", affectsLayout: layout_base_1.isIOS, valueConverter: function (v) { return layout_base_1.Length.parse(v); },
    valueChanged: function (target, oldValue, newValue) { return target.effectiveItemWidth = layout_base_1.Length.toDevicePixels(newValue, -1); }
});
exports.itemWidthProperty.register(WrapLayoutBase);
exports.itemHeightProperty = new layout_base_1.Property({
    name: "itemHeight", defaultValue: "auto", affectsLayout: layout_base_1.isIOS, valueConverter: function (v) { return layout_base_1.Length.parse(v); },
    valueChanged: function (target, oldValue, newValue) { return target.effectiveItemHeight = layout_base_1.Length.toDevicePixels(newValue, -1); }
});
exports.itemHeightProperty.register(WrapLayoutBase);
var converter = layout_base_1.makeParser(layout_base_1.makeValidator("horizontal", "vertical"));
exports.orientationProperty = new layout_base_1.Property({ name: "orientation", defaultValue: "horizontal", affectsLayout: layout_base_1.isIOS, valueConverter: converter });
exports.orientationProperty.register(WrapLayoutBase);
//# sourceMappingURL=wrap-layout-common.js.map

/***/ }),
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */
/* exports provided: default */
/* exports used: default */
/*!**********************************************!*\
  !*** ../~/vue-router/dist/vue-router.esm.js ***!
  \**********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
  * vue-router v2.8.1
  * (c) 2017 Evan You
  * @license MIT
  */
/*  */

function assert (condition, message) {
  if (!condition) {
    throw new Error(("[vue-router] " + message))
  }
}

function warn (condition, message) {
  if (process.env.NODE_ENV !== 'production' && !condition) {
    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
  }
}

function isError (err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1
}

var View = {
  name: 'router-view',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render (_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    data.routerView = true;

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      if (parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children)
    }

    var matched = route.matched[depth];
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null;
      return h()
    }

    var component = cache[name] = matched.components[name];

    // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks
    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];
      if (
        (val && current !== vm) ||
        (!val && current === vm)
      ) {
        matched.instances[name] = val;
      }
    }

    // also register instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    };

    // resolve props
    var propsToPass = data.props = resolveProps(route, matched.props && matched.props[name]);
    if (propsToPass) {
      // clone to prevent mutation
      propsToPass = data.props = extend({}, propsToPass);
      // pass non-declared props as attrs
      var attrs = data.attrs = data.attrs || {};
      for (var key in propsToPass) {
        if (!component.props || !(key in component.props)) {
          attrs[key] = propsToPass[key];
          delete propsToPass[key];
        }
      }
    }

    return h(component, data, children)
  }
};

function resolveProps (route, config) {
  switch (typeof config) {
    case 'undefined':
      return
    case 'object':
      return config
    case 'function':
      return config(route)
    case 'boolean':
      return config ? route.params : undefined
    default:
      if (process.env.NODE_ENV !== 'production') {
        warn(
          false,
          "props in \"" + (route.path) + "\" is a " + (typeof config) + ", " +
          "expecting an object, function or boolean."
        );
      }
  }
}

function extend (to, from) {
  for (var key in from) {
    to[key] = from[key];
  }
  return to
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function (str) { return encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ','); };

var decode = decodeURIComponent;

function resolveQuery (
  query,
  extraQuery,
  _parseQuery
) {
  if ( extraQuery === void 0 ) extraQuery = {};

  var parse = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse(query || '');
  } catch (e) {
    process.env.NODE_ENV !== 'production' && warn(false, e.message);
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    parsedQuery[key] = extraQuery[key];
  }
  return parsedQuery
}

function parseQuery (query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0
      ? decode(parts.join('='))
      : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res
}

function stringifyQuery (obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encode(key)
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&')
    }

    return encode(key) + '=' + encode(val)
  }).filter(function (x) { return x.length > 0; }).join('&') : null;
  return res ? ("?" + res) : ''
}

/*  */


var trailingSlashRE = /\/?$/;

function createRoute (
  record,
  location,
  redirectedFrom,
  router
) {
  var stringifyQuery$$1 = router && router.options.stringifyQuery;

  var query = location.query || {};
  try {
    query = clone(query);
  } catch (e) {}

  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery$$1),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery$$1);
  }
  return Object.freeze(route)
}

function clone (value) {
  if (Array.isArray(value)) {
    return value.map(clone)
  } else if (value && typeof value === 'object') {
    var res = {};
    for (var key in value) {
      res[key] = clone(value[key]);
    }
    return res
  } else {
    return value
  }
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch (record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res
}

function getFullPath (
  ref,
  _stringifyQuery
) {
  var path = ref.path;
  var query = ref.query; if ( query === void 0 ) query = {};
  var hash = ref.hash; if ( hash === void 0 ) hash = '';

  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash
}

function isSameRoute (a, b) {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  } else {
    return false
  }
}

function isObjectEqual (a, b) {
  if ( a === void 0 ) a = {};
  if ( b === void 0 ) b = {};

  // handle null value #1566
  if (!a || !b) { return a === b }
  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key];
    // check nested equality
    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isObjectEqual(aVal, bVal)
    }
    return String(aVal) === String(bVal)
  })
}

function isIncludedRoute (current, target) {
  return (
    current.path.replace(trailingSlashRE, '/').indexOf(
      target.path.replace(trailingSlashRE, '/')
    ) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes (current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var Link = {
  name: 'router-link',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render (h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(this.to, current, this.append);
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;

    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass;
    // Support global empty active class
    var activeClassFallback = globalActiveClass == null
            ? 'router-link-active'
            : globalActiveClass;
    var exactActiveClassFallback = globalExactActiveClass == null
            ? 'router-link-exact-active'
            : globalExactActiveClass;
    var activeClass = this.activeClass == null
            ? activeClassFallback
            : this.activeClass;
    var exactActiveClass = this.exactActiveClass == null
            ? exactActiveClassFallback
            : this.exactActiveClass;
    var compareTarget = location.path
      ? createRoute(null, location, null, router)
      : route;

    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact
      ? classes[exactActiveClass]
      : isIncludedRoute(current, compareTarget);

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location);
        } else {
          router.push(location);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) { on[e] = handler; });
    } else {
      on[this.event] = handler;
    }

    var data = {
      class: classes
    };

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var extend = _Vue.util.extend;
        var aData = a.data = extend({}, a.data);
        aData.on = on;
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default)
  }
};

function guardEvent (e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) { return }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) { return }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) { return }
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');
    if (/\b_blank\b/i.test(target)) { return }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true
}

function findAnchor (children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

var _Vue;

function install (Vue) {
  if (install.installed && _Vue === Vue) { return }
  install.installed = true;

  _Vue = Vue;

  var isDef = function (v) { return v !== undefined; };

  var registerInstance = function (vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed () {
      registerInstance(this);
    }
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this._routerRoot._router }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get () { return this._routerRoot._route }
  });

  Vue.component('router-view', View);
  Vue.component('router-link', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function resolvePath (
  relative,
  base,
  append
) {
  var firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/')
}

function parsePath (path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  }
}

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}

pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

/*  */

// $flow-disable-line
var regexpCompileCache = Object.create(null);

function fillParams (
  path,
  params,
  routeMsg
) {
  try {
    var filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = pathToRegexp_1.compile(path));
    return filler(params || {}, { pretty: true })
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      warn(false, ("missing param for " + routeMsg + ": " + (e.message)));
    }
    return ''
  }
}

/*  */

function createRouteMap (
  routes,
  oldPathList,
  oldPathMap,
  oldNameMap
) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || [];
  // $flow-disable-line
  var pathMap = oldPathMap || Object.create(null);
  // $flow-disable-line
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });

  // ensure wildcard routes are always at the end
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  }
}

function addRouteRecord (
  pathList,
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  var path = route.path;
  var name = route.name;
  if (process.env.NODE_ENV !== 'production') {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(
      typeof route.component !== 'string',
      "route config \"component\" for path: " + (String(path || name)) + " cannot be a " +
      "string id. Use an actual component instead."
    );
  }

  var pathToRegexpOptions = route.pathToRegexpOptions || {};
  var normalizedPath = normalizePath(
    path,
    parent,
    pathToRegexpOptions.strict
  );

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null
      ? {}
      : route.components
        ? route.props
        : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (process.env.NODE_ENV !== 'production') {
      if (route.name && !route.redirect && route.children.some(function (child) { return /^\/?$/.test(child.path); })) {
        warn(
          false,
          "Named Route '" + (route.name) + "' has a default child route. " +
          "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
          "the default child route will not be rendered. Remove the name from " +
          "this route and use the name of the default child route for named " +
          "links instead."
        );
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs
        ? cleanPath((matchAs + "/" + (child.path)))
        : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias)
      ? route.alias
      : [route.alias];

    aliases.forEach(function (alias) {
      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(
        pathList,
        pathMap,
        nameMap,
        aliasRoute,
        parent,
        record.path || '/' // matchAs
      );
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if (process.env.NODE_ENV !== 'production' && !matchAs) {
      warn(
        false,
        "Duplicate named routes definition: " +
        "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
      );
    }
  }
}

function compileRouteRegex (path, pathToRegexpOptions) {
  var regex = pathToRegexp_1(path, [], pathToRegexpOptions);
  if (process.env.NODE_ENV !== 'production') {
    var keys = Object.create(null);
    regex.keys.forEach(function (key) {
      warn(!keys[key.name], ("Duplicate param keys in route with path: \"" + path + "\""));
      keys[key.name] = true;
    });
  }
  return regex
}

function normalizePath (path, parent, strict) {
  if (!strict) { path = path.replace(/\/$/, ''); }
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + "/" + path))
}

/*  */


function normalizeLocation (
  raw,
  current,
  append,
  router
) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next.name || next._normalized) {
    return next
  }

  // relative params
  if (!next.path && next.params && current) {
    next = assign({}, next);
    next._normalized = true;
    var params = assign(assign({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, ("path " + (current.path)));
    } else if (process.env.NODE_ENV !== 'production') {
      warn(false, "relative params navigation requires a current route.");
    }
    return next
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = (current && current.path) || '/';
  var path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : basePath;

  var query = resolveQuery(
    parsedPath.query,
    next.query,
    router && router.options.parseQuery
  );

  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  }
}

function assign (a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a
}

/*  */


function createMatcher (
  routes,
  router
) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes (routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match (
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        warn(record, ("Route with name '" + name + "' does not exist"));
      }
      if (!record) { return _createRoute(null, location) }
      var paramNames = record.regex.keys
        .filter(function (key) { return !key.optional; })
        .map(function (key) { return key.name; });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      if (record) {
        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
        return _createRoute(record, location, redirectedFrom)
      }
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect (
    record,
    location
  ) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function'
        ? originalRedirect(createRoute(record, location, null, router))
        : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || typeof redirect !== 'object') {
      if (process.env.NODE_ENV !== 'production') {
        warn(
          false, ("invalid redirect option: " + (JSON.stringify(redirect)))
        );
      }
      return _createRoute(null, location)
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."));
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location)
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location)
    } else {
      if (process.env.NODE_ENV !== 'production') {
        warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
      }
      return _createRoute(null, location)
    }
  }

  function alias (
    record,
    location,
    matchAs
  ) {
    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute (
    record,
    location,
    redirectedFrom
  ) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom, router)
  }

  return {
    match: match,
    addRoutes: addRoutes
  }
}

function matchRoute (
  regex,
  path,
  params
) {
  var m = path.match(regex);

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) {
      params[key.name] = val;
    }
  }

  return true
}

function resolveRecordPath (path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true)
}

/*  */


var positionStore = Object.create(null);

function setupScroll () {
  // Fix for #1585 for Firefox
  window.history.replaceState({ key: getStateKey() }, '');
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll (
  router,
  to,
  from,
  isPop
) {
  if (!router.app) {
    return
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior(to, from, isPop ? position : null);

    if (!shouldScroll) {
      return
    }

    if (typeof shouldScroll.then === 'function') {
      shouldScroll.then(function (shouldScroll) {
        scrollToPosition((shouldScroll), position);
      }).catch(function (err) {
        if (process.env.NODE_ENV !== 'production') {
          assert(false, err.toString());
        }
      });
    } else {
      scrollToPosition(shouldScroll, position);
    }
  });
}

function saveScrollPosition () {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition () {
  var key = getStateKey();
  if (key) {
    return positionStore[key]
  }
}

function getElementPosition (el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  }
}

function isValidPosition (obj) {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function normalizeOffset (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  }
}

function isNumber (v) {
  return typeof v === 'number'
}

function scrollToPosition (shouldScroll, position) {
  var isObject = typeof shouldScroll === 'object';
  if (isObject && typeof shouldScroll.selector === 'string') {
    var el = document.querySelector(shouldScroll.selector);
    if (el) {
      var offset = shouldScroll.offset && typeof shouldScroll.offset === 'object' ? shouldScroll.offset : {};
      offset = normalizeOffset(offset);
      position = getElementPosition(el, offset);
    } else if (isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }
  } else if (isObject && isValidPosition(shouldScroll)) {
    position = normalizePosition(shouldScroll);
  }

  if (position) {
    window.scrollTo(position.x, position.y);
  }
}

/*  */

var supportsPushState = inBrowser && (function () {
  var ua = window.navigator.userAgent;

  if (
    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
    ua.indexOf('Mobile Safari') !== -1 &&
    ua.indexOf('Chrome') === -1 &&
    ua.indexOf('Windows Phone') === -1
  ) {
    return false
  }

  return window.history && 'pushState' in window.history
})();

// use User Timing api (if present) for more accurate key precision
var Time = inBrowser && window.performance && window.performance.now
  ? window.performance
  : Date;

var _key = genKey();

function genKey () {
  return Time.now().toFixed(3)
}

function getStateKey () {
  return _key
}

function setStateKey (key) {
  _key = key;
}

function pushState (url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url);
    } else {
      _key = genKey();
      history.pushState({ key: _key }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState (url) {
  pushState(url, true);
}

/*  */

function runQueue (queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */

function resolveAsyncComponents (matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;

    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;

        var resolve = once(function (resolvedDef) {
          if (isESModule(resolvedDef)) {
            resolvedDef = resolvedDef.default;
          }
          // save resolved on async factory in case it's used elsewhere
          def.resolved = typeof resolvedDef === 'function'
            ? resolvedDef
            : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;
          if (pending <= 0) {
            next();
          }
        });

        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
          process.env.NODE_ENV !== 'production' && warn(false, msg);
          if (!error) {
            error = isError(reason)
              ? reason
              : new Error(msg);
            next(error);
          }
        });

        var res;
        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;
            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) { next(); }
  }
}

function flatMapComponents (
  matched,
  fn
) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) { return fn(
      m.components[key],
      m.instances[key],
      m, key
    ); })
  }))
}

function flatten (arr) {
  return Array.prototype.concat.apply([], arr)
}

var hasSymbol =
  typeof Symbol === 'function' &&
  typeof Symbol.toStringTag === 'symbol';

function isESModule (obj) {
  return obj.__esModule || (hasSymbol && obj[Symbol.toStringTag] === 'Module')
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once (fn) {
  var called = false;
  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    if (called) { return }
    called = true;
    return fn.apply(this, args)
  }
}

/*  */

var History = function History (router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
};

History.prototype.listen = function listen (cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady (cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError (errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo (location, onComplete, onAbort) {
    var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(route, function () {
    this$1.updateRoute(route);
    onComplete && onComplete(route);
    this$1.ensureURL();

    // fire ready cbs once
    if (!this$1.ready) {
      this$1.ready = true;
      this$1.readyCbs.forEach(function (cb) { cb(route); });
    }
  }, function (err) {
    if (onAbort) {
      onAbort(err);
    }
    if (err && !this$1.ready) {
      this$1.ready = true;
      this$1.readyErrorCbs.forEach(function (cb) { cb(err); });
    }
  });
};

History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
    var this$1 = this;

  var current = this.current;
  var abort = function (err) {
    if (isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) { cb(err); });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
  if (
    isSameRoute(route, current) &&
    // in the case the route map has been dynamically appended to
    route.matched.length === current.matched.length
  ) {
    this.ensureURL();
    return abort()
  }

  var ref = resolveQueue(this.current.matched, route.matched);
    var updated = ref.updated;
    var deactivated = ref.deactivated;
    var activated = ref.activated;

  var queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // in-component update hooks
    extractUpdateHooks(updated),
    // in-config enter guards
    activated.map(function (m) { return m.beforeEnter; }),
    // async components
    resolveAsyncComponents(activated)
  );

  this.pending = route;
  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort()
    }
    try {
      hook(route, current, function (to) {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(to);
        } else if (
          typeof to === 'string' ||
          (typeof to === 'object' && (
            typeof to.path === 'string' ||
            typeof to.name === 'string'
          ))
        ) {
          // next('/') or next({ path: '/' }) -> redirect
          abort();
          if (typeof to === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function () { return this$1.current === route; };
    // wait until async components are resolved before
    // extracting in-component enter guards
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort()
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) { cb(); });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute (route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase (base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = (baseEl && baseEl.getAttribute('href')) || '/';
      // strip full URL origin
      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue (
  current,
  next
) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractGuards (
  records,
  name,
  bind,
  reverse
) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
        : bind(guard, instance, match, key)
    }
  });
  return flatten(reverse ? guards.reverse() : guards)
}

function extractGuard (
  def,
  key
) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key]
}

function extractLeaveGuards (deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
}

function extractUpdateHooks (updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
}

function bindGuard (guard, instance) {
  if (instance) {
    return function boundRouteGuard () {
      return guard.apply(instance, arguments)
    }
  }
}

function extractEnterGuards (
  activated,
  cbs,
  isValid
) {
  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
    return bindEnterGuard(guard, match, key, cbs, isValid)
  })
}

function bindEnterGuard (
  guard,
  match,
  key,
  cbs,
  isValid
) {
  return function routeEnterGuard (to, from, next) {
    return guard(to, from, function (cb) {
      next(cb);
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
    })
  }
}

function poll (
  cb, // somehow flow cannot infer this is a function
  instances,
  key,
  isValid
) {
  if (instances[key]) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

/*  */


var HTML5History = (function (History$$1) {
  function HTML5History (router, base) {
    var this$1 = this;

    History$$1.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;

    if (expectScroll) {
      setupScroll();
    }

    var initLocation = getLocation(this.base);
    window.addEventListener('popstate', function (e) {
      var current = this$1.current;

      // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.
      var location = getLocation(this$1.base);
      if (this$1.current === START && location === initLocation) {
        return
      }

      this$1.transitionTo(location, function (route) {
        if (expectScroll) {
          handleScroll(router, route, current, true);
        }
      });
    });
  }

  if ( History$$1 ) HTML5History.__proto__ = History$$1;
  HTML5History.prototype = Object.create( History$$1 && History$$1.prototype );
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go (n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL (push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
    return getLocation(this.base)
  };

  return HTML5History;
}(History));

function getLocation (base) {
  var path = window.location.pathname;
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash
}

/*  */


var HashHistory = (function (History$$1) {
  function HashHistory (router, base, fallback) {
    History$$1.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return
    }
    ensureSlash();
  }

  if ( History$$1 ) HashHistory.__proto__ = History$$1;
  HashHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners () {
    var this$1 = this;

    var router = this.router;
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    window.addEventListener(supportsPushState ? 'popstate' : 'hashchange', function () {
      var current = this$1.current;
      if (!ensureSlash()) {
        return
      }
      this$1.transitionTo(getHash(), function (route) {
        if (supportsScroll) {
          handleScroll(this$1.router, route, current, true);
        }
        if (!supportsPushState) {
          replaceHash(route.fullPath);
        }
      });
    });
  };

  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.go = function go (n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL (push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    return getHash()
  };

  return HashHistory;
}(History));

function checkFallback (base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(
      cleanPath(base + '/#' + location)
    );
    return true
  }
}

function ensureSlash () {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash('/' + path);
  return false
}

function getHash () {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  return index === -1 ? '' : href.slice(index + 1)
}

function getUrl (path) {
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  return (base + "#" + path)
}

function pushHash (path) {
  if (supportsPushState) {
    pushState(getUrl(path));
  } else {
    window.location.hash = path;
  }
}

function replaceHash (path) {
  if (supportsPushState) {
    replaceState(getUrl(path));
  } else {
    window.location.replace(getUrl(path));
  }
}

/*  */


var AbstractHistory = (function (History$$1) {
  function AbstractHistory (router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if ( History$$1 ) AbstractHistory.__proto__ = History$$1;
  AbstractHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
      this$1.index++;
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.go = function go (n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(route, function () {
      this$1.index = targetIndex;
      this$1.updateRoute(route);
    });
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/'
  };

  AbstractHistory.prototype.ensureURL = function ensureURL () {
    // noop
  };

  return AbstractHistory;
}(History));

/*  */

var VueRouter = function VueRouter (options) {
  if ( options === void 0 ) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break
    default:
      if (process.env.NODE_ENV !== 'production') {
        assert(false, ("invalid mode: " + mode));
      }
  }
};

var prototypeAccessors = { currentRoute: { configurable: true } };

VueRouter.prototype.match = function match (
  raw,
  current,
  redirectedFrom
) {
  return this.matcher.match(raw, current, redirectedFrom)
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current
};

VueRouter.prototype.init = function init (app /* Vue component instance */) {
    var this$1 = this;

  process.env.NODE_ENV !== 'production' && assert(
    install.installed,
    "not installed. Make sure to call `Vue.use(VueRouter)` " +
    "before creating root instance."
  );

  this.apps.push(app);

  // main app already initialized.
  if (this.app) {
    return
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function () {
      history.setupListeners();
    };
    history.transitionTo(
      history.getCurrentLocation(),
      setupHashListener,
      setupHashListener
    );
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach (fn) {
  return registerHook(this.beforeHooks, fn)
};

VueRouter.prototype.beforeResolve = function beforeResolve (fn) {
  return registerHook(this.resolveHooks, fn)
};

VueRouter.prototype.afterEach = function afterEach (fn) {
  return registerHook(this.afterHooks, fn)
};

VueRouter.prototype.onReady = function onReady (cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError (errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push (location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};

VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort);
};

VueRouter.prototype.go = function go (n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back () {
  this.go(-1);
};

VueRouter.prototype.forward = function forward () {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
  var route = to
    ? to.matched
      ? to
      : this.resolve(to).route
    : this.currentRoute;
  if (!route) {
    return []
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key]
    })
  }))
};

VueRouter.prototype.resolve = function resolve (
  to,
  current,
  append
) {
  var location = normalizeLocation(
    to,
    current || this.history.current,
    append,
    this
  );
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  }
};

VueRouter.prototype.addRoutes = function addRoutes (routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties( VueRouter.prototype, prototypeAccessors );

function registerHook (list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) { list.splice(i, 1); }
  }
}

function createHref (base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = install;
VueRouter.version = '2.8.1';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

/* harmony default export */ __webpack_exports__["a"] = (VueRouter);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(/*! ./../../process/browser.js */ 55)))

/***/ }),
/* 121 */,
/* 122 */
/* exports provided: default */
/* exports used: default */
/*!**************************!*\
  !*** ./router/routes.js ***!
  \**************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_nativescript_vue__ = __webpack_require__(/*! nativescript-vue */ 32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_nativescript_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_nativescript_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(/*! vue-router */ 120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Home_Home_vue__ = __webpack_require__(/*! @/components/Home/Home.vue */ 145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Login_Login_vue__ = __webpack_require__(/*! @/components/Login/Login.vue */ 146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Assignments_Assignments_vue__ = __webpack_require__(/*! @/components/Assignments/Assignments.vue */ 144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_Assignment_Assignment_vue__ = __webpack_require__(/*! @/components/Assignment/Assignment.vue */ 143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__store_store_js__ = __webpack_require__(/*! @/store/store.js */ 54);










__WEBPACK_IMPORTED_MODULE_0_nativescript_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

var router = new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
  routes: [{
    path: '/login',
    component: __WEBPACK_IMPORTED_MODULE_3__components_Login_Login_vue__["a" /* default */],
    meta: { hiddenActionBar: true }
  }, {
    path: '/home',
    component: __WEBPACK_IMPORTED_MODULE_2__components_Home_Home_vue__["a" /* default */],
    meta: { requiresAuth: true }
  }, {
    path: '/assignments/:id',
    component: __WEBPACK_IMPORTED_MODULE_4__components_Assignments_Assignments_vue__["a" /* default */],
    meta: { requiresAuth: true }
  }, {
    path: '/assignment/:id',
    component: __WEBPACK_IMPORTED_MODULE_5__components_Assignment_Assignment_vue__["a" /* default */],
    meta: { requiresAuth: true }
  }, { path: '*', redirect: '/login' }]
});
router.beforeEach(function (to, from, next) {
  var requiresAuth = to.matched.some(function (record) {
    return record.meta.requiresAuth;
  });

  if (requiresAuth && !__WEBPACK_IMPORTED_MODULE_6__store_store_js__["a" /* default */].state.user) next('auth');else next();
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 123 */
/* exports provided: setStatusBarColors */
/* exports used: setStatusBarColors */
/*!****************************!*\
  !*** ./utils/statusBar.js ***!
  \****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = setStatusBarColors;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_application__ = __webpack_require__(/*! application */ 22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_application___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_application__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_platform__ = __webpack_require__(/*! platform */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_platform___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_platform__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_utils_utils__ = __webpack_require__(/*! utils/utils */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_utils_utils___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_utils_utils__);




function setStatusBarColors() {
  // Make the iOS status bar transparent with white text.
  if (__WEBPACK_IMPORTED_MODULE_0_application__["ios"]) {
    __WEBPACK_IMPORTED_MODULE_0_application__["on"]("launch", function () {
      __WEBPACK_IMPORTED_MODULE_2_utils_utils__["ios"].getter(UIApplication, UIApplication.sharedApplication).statusBarStyle = UIStatusBarStyle.LightContent;
    });
  }

  // Make the Android status bar transparent.
  // See http://bradmartin.net/2016/03/10/fullscreen-and-navigation-bar-color-in-a-nativescript-android-app/
  // for details on the technique used.
  if (__WEBPACK_IMPORTED_MODULE_0_application__["android"] && __WEBPACK_IMPORTED_MODULE_1_platform__["device"].sdkVersion >= "21") {
    __WEBPACK_IMPORTED_MODULE_0_application__["android"].on("activityStarted", function () {
      var View = android.view.View;
      var window = __WEBPACK_IMPORTED_MODULE_0_application__["android"].startActivity.getWindow();
      window.setStatusBarColor(0x000000);

      var decorView = window.getDecorView();
      decorView.setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_STABLE | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
    });
  }
}

/***/ }),
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */
/* no static exports found */
/* all exports used */
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_nativescript_vue__ = __webpack_require__(/*! nativescript-vue */ 32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_nativescript_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_nativescript_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(/*! vuex */ 15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nativescript_plugin_firebase__ = __webpack_require__(/*! nativescript-plugin-firebase */ 31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_nativescript_plugin_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_nativescript_plugin_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__router_routes__ = __webpack_require__(/*! ./router/routes */ 122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_tns_core_modules_platform__ = __webpack_require__(/*! tns-core-modules/platform */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_tns_core_modules_platform___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_tns_core_modules_platform__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_BackendService__ = __webpack_require__(/*! ./services/BackendService */ 53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_statusBar__ = __webpack_require__(/*! ./utils/statusBar */ 123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_css__ = __webpack_require__(/*! ./app.css */ 125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__app_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__store_store_js__ = __webpack_require__(/*! ./store/store.js */ 54);




__WEBPACK_IMPORTED_MODULE_0_nativescript_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */]);

//Vue.config.console.silent();






//store

var store = new __WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */].Store(__WEBPACK_IMPORTED_MODULE_8__store_store_js__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_0_nativescript_vue___default.a.prototype.$store = store;

global.process = { env: {} // hack! a build process should replace process.env's with static strings.
};var backendService = new __WEBPACK_IMPORTED_MODULE_5__services_BackendService__["a" /* default */]();
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_statusBar__["a" /* setStatusBarColors */])();

__WEBPACK_IMPORTED_MODULE_2_nativescript_plugin_firebase___default.a.init({
  onAuthStateChanged: function onAuthStateChanged(data) {
    // optional
    console.log((data.loggedIn ? "Logged in to firebase" : "Logged out from firebase") + " (init's onAuthStateChanged callback)");
    if (data.loggedIn) {
      backendService.token = data.user.uid;
      store.commit('setUser', data.user);
      __WEBPACK_IMPORTED_MODULE_3__router_routes__["a" /* default */].replace('/home');
    } else {
      backendService.token = "";
      __WEBPACK_IMPORTED_MODULE_3__router_routes__["a" /* default */].replace('/login');
    }
  },
  persist: false
}).then(function () {
  return function (error) {
    return console.log('firebase.init error: ' + error);
  };
});

new __WEBPACK_IMPORTED_MODULE_0_nativescript_vue___default.a({
  router: __WEBPACK_IMPORTED_MODULE_3__router_routes__["a" /* default */],
  store: store,
  computed: {
    pageClasses: function pageClasses() {
      return {
        // add top class so we can apply styles to specific platforms
        'platform-ios': __WEBPACK_IMPORTED_MODULE_4_tns_core_modules_platform__["isIOS"],
        'platform-android': __WEBPACK_IMPORTED_MODULE_4_tns_core_modules_platform__["isAndroid"]
      };
    }
  },

  template: '\n    <page ref="page" :class="pageClasses">\n      <router-view></router-view>\n    </page>\n    ',

  methods: {},

  mounted: function mounted() {

    // force first redirect
    if (backendService.isLoggedIn()) {
      __WEBPACK_IMPORTED_MODULE_3__router_routes__["a" /* default */].replace('/home');
    } else {
      __WEBPACK_IMPORTED_MODULE_3__router_routes__["a" /* default */].replace('/login');
    }
  }
}).$start();

/***/ }),
/* 128 */
/* exports provided: default */
/* exports used: default */
/*!************************!*\
  !*** ./models/User.js ***!
  \************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function _class() {
    _classCallCheck(this, _class);

    this.email = '';
    this.password = '';
};

/* harmony default export */ __webpack_exports__["a"] = (_class);

/***/ }),
/* 129 */
/* exports provided: default */
/* exports used: default */
/*!************************!*\
  !*** ./utils/alert.js ***!
  \************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = alert;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ui_dialogs__ = __webpack_require__(/*! ui/dialogs */ 19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ui_dialogs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ui_dialogs__);


function alert(message) {
    return __WEBPACK_IMPORTED_MODULE_0_ui_dialogs__["alert"]({
        title: "Elocute",
        okButtonText: "OK",
        message: message
    });
}

/***/ }),
/* 130 */,
/* 131 */
/* exports provided: default */
/* exports used: default */
/*!*************************************************************************************************************************************!*\
  !*** ../~/babel-loader/lib!../~/ns-vue-loader/lib/selector.js?type=script&index=0&bustCache!./components/Assignment/Assignment.vue ***!
  \*************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(/*! vuex */ 15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nativescript_speech_recognition__ = __webpack_require__(/*! nativescript-speech-recognition */ 142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nativescript_speech_recognition___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_nativescript_speech_recognition__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'assignment',
  data: function data() {
    return {
      isSpeaking: false,
      speechRecognition: new __WEBPACK_IMPORTED_MODULE_1_nativescript_speech_recognition__["SpeechRecognition"]()
      //transcription: SpeechRecognitionTranscription
    };
  },
  computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapState */])(['user', 'activeClassroom']), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["c" /* mapGetters */])(['assignment'])),
  watch: {
    '$route.params.id': {
      handler: function handler(id) {
        this.$store.commit('setActiveAssignment', this.$route.params.id);
      },

      immediate: true
    }
  },
  mounted: function mounted() {
    this.speechRecognition.requestPermission().then(function (granted) {
      console.log("Granted? " + granted);
      alert(granted);
    });
  },
  created: function created() {
    this.init();
  },

  methods: {
    init: function init() {
      //this errors
      this.speechRecognition.available().then(function (available) {
        console.log(available);
      });
    },
    requestPermission: function requestPermission() {
      this.speechRecognition.requestPermission().then(function (granted) {
        console.log("Granted? " + granted);
        alert(granted);
      });
    },
    goBack: function goBack() {
      this.$navigateBack();
    },
    startListening: function startListening() {
      this.speechRecognition.startListening({
        onResult: function onResult(transcription) {
          console.log(transcription.text, transcription.finished);
        },
        returnPartialResults: true,
        locale: 'en-US'
      }).then(function (started) {}, function (errorMessage) {
        console.log('Error while trying to start listening: ' + errorMessage);
      });

      /*const options = {
          locale: 'en-US',
          onResult: (transcription) => {
              console.log(transcription.text,transcription.finished);
              this.transcription = transcription;
          }
      }
      this.speechRecognition.startListening(options).then(() => {
          //this.showActivityIndicator();
          console.log("Started")
      }, error => {
          //this.hideActivityIndicator();
          console.log(error)
      })*/
    },
    stopListening: function stopListening() {
      this.speechRecognition.stopListening().then(function () {
        //this.hideActivityIndicator();
        console.log("Stopped");
      });
    },
    showActivityIndicator: function showActivityIndicator() {
      //this.isSpeaking = true;
    },
    hideActivityIndicator: function hideActivityIndicator() {
      //this.isSpeaking = false;
    }
  }
});

/***/ }),
/* 132 */
/* exports provided: default */
/* exports used: default */
/*!***************************************************************************************************************************************!*\
  !*** ../~/babel-loader/lib!../~/ns-vue-loader/lib/selector.js?type=script&index=0&bustCache!./components/Assignments/Assignments.vue ***!
  \***************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_FirebaseService__ = __webpack_require__(/*! ../../services/FirebaseService */ 33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(/*! vue-router */ 120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(/*! vuex */ 15);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var firebaseService = new __WEBPACK_IMPORTED_MODULE_0__services_FirebaseService__["a" /* default */]();



/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'assignments',
    computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_vuex__["b" /* mapState */])(['classrooms', 'activeClassroom', 'assignments']), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_vuex__["c" /* mapGetters */])(['classroom', 'assignment'])),
    data: function data() {
        return {
            item: {}
        };
    },
    created: function created() {
        this.init();
    },

    methods: {
        init: function init() {
            this.$store.dispatch('fetchAssignments', this.$route.params.id);
        },
        getAssignment: function getAssignment(id) {
            this.$router.push('/assignment/' + id);
        },
        logout: function logout() {
            firebaseService.logout();
            this.$router.push('/login');
        },
        goBack: function goBack() {
            this.$navigateBack();
        }
    }

});

/***/ }),
/* 133 */
/* exports provided: default */
/* exports used: default */
/*!*************************************************************************************************************************!*\
  !*** ../~/babel-loader/lib!../~/ns-vue-loader/lib/selector.js?type=script&index=0&bustCache!./components/Home/Home.vue ***!
  \*************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_FirebaseService__ = __webpack_require__(/*! ../../services/FirebaseService */ 33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(/*! vuex */ 15);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var firebaseService = new __WEBPACK_IMPORTED_MODULE_0__services_FirebaseService__["a" /* default */]();



/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'home',
    computed: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapState */])(['classrooms'])),
    data: function data() {
        return {
            item: {}
        };
    },
    created: function created() {
        this.init();
    },


    methods: _extends({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["d" /* mapActions */])(['fetchClassrooms']), {
        init: function init() {
            this.fetchClassrooms();
        },
        getAssignments: function getAssignments(id) {
            this.$router.replace('/assignments/' + id);
        },
        logout: function logout() {
            firebaseService.logout();
            this.$router.replace('/login');
        }
    })

});

/***/ }),
/* 134 */
/* exports provided: default */
/* exports used: default */
/*!***************************************************************************************************************************!*\
  !*** ../~/babel-loader/lib!../~/ns-vue-loader/lib/selector.js?type=script&index=0&bustCache!./components/Login/Login.vue ***!
  \***************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tns_core_modules_platform__ = __webpack_require__(/*! tns-core-modules/platform */ 3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tns_core_modules_platform___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_tns_core_modules_platform__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__LoginInitial_vue__ = __webpack_require__(/*! ./LoginInitial.vue */ 147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__LoginMain_vue__ = __webpack_require__(/*! ./LoginMain.vue */ 148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ui_enums__ = __webpack_require__(/*! ui/enums */ 25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ui_enums___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ui_enums__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    LoginInitial: __WEBPACK_IMPORTED_MODULE_1__LoginInitial_vue__["a" /* default */],
    LoginMain: __WEBPACK_IMPORTED_MODULE_2__LoginMain_vue__["a" /* default */]
  },
  data: function data() {
    return {
      state: 'initial'
    };
  },

  computed: {
    pageClasses: function pageClasses() {
      return {
        // add top class so we can apply styles to specific platforms
        'platform-ios': __WEBPACK_IMPORTED_MODULE_0_tns_core_modules_platform__["isIOS"],
        'platform-android': __WEBPACK_IMPORTED_MODULE_0_tns_core_modules_platform__["isAndroid"]
      };
    }
  },
  methods: {
    showMainContent: function showMainContent() {
      var _this = this;

      this.$refs.logoContainer.nativeView.animate({
        translate: { x: 0, y: __WEBPACK_IMPORTED_MODULE_0_tns_core_modules_platform__["isAndroid"] ? -70 : -50 },
        duration: 500,
        curve: __WEBPACK_IMPORTED_MODULE_3_ui_enums__["AnimationCurve"].easeIn }).then(function () {
        _this.state = 'main';
      });
    }
  },
  mounted: function mounted() {}
});

/***/ }),
/* 135 */
/* exports provided: default */
/* exports used: default */
/*!**********************************************************************************************************************************!*\
  !*** ../~/babel-loader/lib!../~/ns-vue-loader/lib/selector.js?type=script&index=0&bustCache!./components/Login/LoginInitial.vue ***!
  \**********************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'login-initial',
  props: {
    visible: Boolean
  },
  methods: {
    welcome: function welcome() {
      var _this = this;

      // fadeout and notify parent element when finished
      this.$refs.initialContainer.nativeView.animate({
        opacity: 0,
        duration: 500
      }).then(function () {
        _this.$emit('login');
      });
    }
  }
});

/***/ }),
/* 136 */
/* exports provided: default */
/* exports used: default */
/*!*******************************************************************************************************************************!*\
  !*** ../~/babel-loader/lib!../~/ns-vue-loader/lib/selector.js?type=script&index=0&bustCache!./components/Login/LoginMain.vue ***!
  \*******************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ui_animation__ = __webpack_require__(/*! ui/animation */ 23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ui_animation___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ui_animation__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ui_dialogs__ = __webpack_require__(/*! ui/dialogs */ 19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ui_dialogs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ui_dialogs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_tns_core_modules_color__ = __webpack_require__(/*! tns-core-modules/color */ 14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_tns_core_modules_color___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_tns_core_modules_color__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_tns_core_modules_connectivity__ = __webpack_require__(/*! tns-core-modules/connectivity */ 158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_tns_core_modules_connectivity___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_tns_core_modules_connectivity__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_User__ = __webpack_require__(/*! ../../models/User */ 128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_FirebaseService__ = __webpack_require__(/*! ../../services/FirebaseService */ 33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_alert__ = __webpack_require__(/*! ../../utils/alert */ 129);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








var firebaseService = new __WEBPACK_IMPORTED_MODULE_5__services_FirebaseService__["a" /* default */]();

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'login-main',
  props: {
    visible: Boolean
  },
  data: function data() {
    return {
      isLoggingIn: true,
      isAuthenticating: false,
      user: new __WEBPACK_IMPORTED_MODULE_4__models_User__["a" /* default */]()
    };
  },

  watch: {
    visible: function visible(val) {
      // when element turns visible, start animations
      if (val) {
        var animations = [];
        animations.push({ target: this.$refs.mainContainer.nativeView, opacity: 1, duration: 500 });
        // Slide up the form controls and sign up container.
        animations.push({ target: this.$refs.signUpStack.nativeView, translate: { x: 0, y: 0 }, opacity: 1, delay: 500, duration: 150 });
        animations.push({ target: this.$refs.formControls.nativeView, translate: { x: 0, y: 0 }, opacity: 1, delay: 650, duration: 150 });
        // Kick off the animation queue
        new __WEBPACK_IMPORTED_MODULE_0_ui_animation__["Animation"](animations, false).play();
      }
    }
  },
  methods: {
    toggleDisplay: function toggleDisplay() {
      this.isLoggingIn = !this.isLoggingIn;
      var mainContainer = this.$refs.mainContainer.nativeView;
      mainContainer.animate({
        backgroundColor: this.isLoggingIn ? new __WEBPACK_IMPORTED_MODULE_2_tns_core_modules_color__["Color"]("#F3F3F3") : new __WEBPACK_IMPORTED_MODULE_2_tns_core_modules_color__["Color"]("#131426"),
        duration: 200
      });
    },
    focusPassword: function focusPassword() {
      this.$refs.password.nativeView.focus();
    },
    submit: function submit() {
      this.isAuthenticating = true;
      if (this.isLoggingIn) {
        this.login();
      } else {
        this.signUp();
      }
    },
    navigate: function navigate() {
      this.$router.push('/home');
    },
    login: function login() {
      var _this = this;

      if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_tns_core_modules_connectivity__["getConnectionType"])() === __WEBPACK_IMPORTED_MODULE_3_tns_core_modules_connectivity__["connectionType"].none) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_alert__["a" /* default */])("Elocute requires an internet connection to log in.");
        return;
      }
      return firebaseService.login(this.user).then(function () {
        _this.isAuthenticating = false;
        _this.$router.push('/home');
      }).catch(function (error) {
        console.error(error);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_alert__["a" /* default */])("Unfortunately we could not find your account.");
        _this.isAuthenticating = false;
      });
    },
    signUp: function signUp() {
      var _this2 = this;

      if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_tns_core_modules_connectivity__["getConnectionType"])() === __WEBPACK_IMPORTED_MODULE_3_tns_core_modules_connectivity__["connectionType"].none) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_alert__["a" /* default */])("Elocute requires an internet connection to register.");
        return;
      }
      firebaseService.register(this.user).then(function () {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_alert__["a" /* default */])("Your account was successfully created.");
        _this2.isAuthenticating = false;
        _this2.toggleDisplay();
      }).catch(function (error) {
        // TODO: Verify if this works
        if (error.match(/same user/)) {
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_alert__["a" /* default */])("This email address is already in use.");
        } else {
          __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_alert__["a" /* default */])("Unfortunately we were unable to create your account.");
        }
        _this2.isAuthenticating = false;
      });
    },
    forgotPassword: function forgotPassword() {
      var _this3 = this;

      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ui_dialogs__["prompt"])({
        title: "Forgot Password",
        message: "Enter the email address you used to register for Elocute to reset your password.",
        defaultText: "",
        okButtonText: "Ok",
        cancelButtonText: "Cancel"
      }).then(function (data) {
        if (data.result) {
          _this3.isAuthenticating = true;
          firebaseService.resetPassword(data.text.trim()).then(function () {
            _this3.isAuthenticating = false;
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_alert__["a" /* default */])("Your password was successfully reset. Please check your email for instructions on choosing a new password.");
          }).catch(function (error) {
            _this3.isAuthenticating = false;
            console.log('Error resetting password: ' + error);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_alert__["a" /* default */])("Unfortunately, an error occurred resetting your password.");
          });
        }
      });
    }
  },
  mounted: function mounted() {
    console.log('LoginOrSignup mounted');
  }
});

/***/ }),
/* 137 */
/* no static exports found */
/* all exports used */
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../~/extract-text-webpack-plugin/loader.js?{"id":2,"omit":0,"remove":true}!../~/css-loader!../~/ns-vue-loader/lib/style-compiler?{"vue":true,"id":"data-v-f86a44b8","scoped":false,"hasInlineConfig":false}!../~/ns-vue-loader/lib/selector.js?type=styles&index=0&bustCache!./components/Assignment/Assignment.vue ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 138 */
/* no static exports found */
/* all exports used */
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../~/extract-text-webpack-plugin/loader.js?{"id":2,"omit":1,"remove":true}!../~/vue-style-loader!../~/css-loader?{"url":false}!../~/ns-vue-loader/lib/style-compiler?{"vue":true,"id":"data-v-122328bc","scoped":false,"hasInlineConfig":false}!../~/sass-loader/lib/loader.js!../~/ns-vue-loader/lib/selector.js?type=styles&index=0&bustCache!./components/Login/LoginInitial.vue ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 139 */
/* no static exports found */
/* all exports used */
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../~/extract-text-webpack-plugin/loader.js?{"id":2,"omit":1,"remove":true}!../~/vue-style-loader!../~/css-loader?{"url":false}!../~/ns-vue-loader/lib/style-compiler?{"vue":true,"id":"data-v-15b7021e","scoped":false,"hasInlineConfig":false}!../~/sass-loader/lib/loader.js!../~/ns-vue-loader/lib/selector.js?type=styles&index=0&bustCache!./components/Login/LoginMain.vue ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 140 */
/* no static exports found */
/* all exports used */
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../~/extract-text-webpack-plugin/loader.js?{"id":2,"omit":1,"remove":true}!../~/vue-style-loader!../~/css-loader?{"url":false}!../~/ns-vue-loader/lib/style-compiler?{"vue":true,"id":"data-v-dc03ccd0","scoped":false,"hasInlineConfig":false}!../~/sass-loader/lib/loader.js!../~/ns-vue-loader/lib/selector.js?type=styles&index=0&bustCache!./components/Login/Login.vue ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 141 */
/* no static exports found */
/* all exports used */
/*!************************************************************!*\
  !*** ../~/nativescript-plugin-firebase/firebase-common.js ***!
  \************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dialogs_1 = __webpack_require__(/*! tns-core-modules/ui/dialogs */ 19);
exports.firebase = {
    initialized: false,
    instance: null,
    storage: null,
    firebaseRemoteConfig: null,
    authStateListeners: [],
    _receivedNotificationCallback: null,
    _dynamicLinkCallback: null,
    analytics: {},
    firestore: {},
    invites: {
        MATCH_TYPE: {
            WEAK: 0,
            STRONG: 1
        }
    },
    dynamicLinks: {
        MATCH_CONFIDENCE: {
            WEAK: 0,
            STRONG: 1
        }
    },
    admob: {
        AD_SIZE: {
            SMART_BANNER: "SMART",
            LARGE_BANNER: "LARGE",
            BANNER: "BANNER",
            MEDIUM_RECTANGLE: "MEDIUM",
            FULL_BANNER: "FULL",
            LEADERBOARD: "LEADERBOARD",
            SKYSCRAPER: "SKYSCRAPER",
            FLUID: "FLUID"
        },
        defaults: {
            margins: {
                top: -1,
                bottom: -1
            },
            testing: false,
            size: "SMART"
        }
    },
    LoginType: {
        ANONYMOUS: "anonymous",
        PASSWORD: "password",
        PHONE: "phone",
        CUSTOM: "custom",
        FACEBOOK: "facebook",
        GOOGLE: "google"
    },
    QueryOrderByType: {
        KEY: "key",
        VALUE: "value",
        CHILD: "child",
        PRIORITY: "priority"
    },
    QueryLimitType: {
        FIRST: "first",
        LAST: "last"
    },
    QueryRangeType: {
        START_AT: "startAt",
        END_AT: "endAt",
        EQUAL_TO: "equalTo"
    },
    addAuthStateListener: function (listener) {
        if (exports.firebase.authStateListeners.indexOf(listener) === -1) {
            exports.firebase.authStateListeners.push(listener);
        }
        return true;
    },
    removeAuthStateListener: function (listener) {
        var index = exports.firebase.authStateListeners.indexOf(listener);
        if (index >= 0) {
            exports.firebase.authStateListeners.splice(index, 1);
            return true;
        }
        else {
            return false;
        }
    },
    hasAuthStateListener: function (listener) {
        return exports.firebase.authStateListeners.indexOf(listener) >= 0;
    },
    notifyAuthStateListeners: function (data) {
        exports.firebase.authStateListeners.forEach(function (listener) {
            try {
                if (listener.thisArg) {
                    listener.onAuthStateChanged.call(listener.thisArg, data);
                }
                else {
                    listener.onAuthStateChanged(data);
                }
            }
            catch (ex) {
                console.error("Firebase AuthStateListener failed to trigger", listener, ex);
            }
        });
    },
    strongTypeify: function (value) {
        if (value === "true") {
            value = true;
        }
        else if (value === "false") {
            value = false;
        }
        else if (parseFloat(value) === value) {
            value = parseFloat(value);
        }
        else if (parseInt(value) === value) {
            value = parseInt(value);
        }
        return value;
    },
    requestPhoneAuthVerificationCode: function (onUserResponse, verificationPrompt) {
        dialogs_1.prompt(verificationPrompt || "Verification code").then(function (promptResult) {
            if (!promptResult.result) {
                return;
            }
            onUserResponse(promptResult.text);
        });
    },
    moveLoginOptionsToObjects: function (loginOptions) {
        if (loginOptions.email) {
            console.log("Please update your code: the 'email' property is deprecated and now expected at 'passwordOptions.email'");
            if (!loginOptions.passwordOptions) {
                loginOptions.passwordOptions = {};
            }
            if (!loginOptions.passwordOptions.email) {
                loginOptions.passwordOptions.email = loginOptions.email;
            }
        }
        if (loginOptions.password) {
            console.log("Please update your code: the 'password' property is deprecated and now expected at 'passwordOptions.password'");
            if (!loginOptions.passwordOptions) {
                loginOptions.passwordOptions = {};
            }
            if (!loginOptions.passwordOptions.password) {
                loginOptions.passwordOptions.password = loginOptions.password;
            }
        }
        if (loginOptions.token) {
            console.log("Please update your code: the 'token' property is deprecated and now expected at 'customOptions.token'");
            if (!loginOptions.customOptions) {
                loginOptions.customOptions = {};
            }
            if (!loginOptions.customOptions.token) {
                loginOptions.customOptions.token = loginOptions.token;
            }
        }
        if (loginOptions.tokenProviderFn) {
            console.log("Please update your code: the 'tokenProviderFn' property is deprecated and now expected at 'customOptions.tokenProviderFn'");
            if (!loginOptions.customOptions) {
                loginOptions.customOptions = {};
            }
            if (!loginOptions.customOptions.tokenProviderFn) {
                loginOptions.customOptions.tokenProviderFn = loginOptions.tokenProviderFn;
            }
        }
        if (loginOptions.scope) {
            console.log("Please update your code: the 'scope' property is deprecated and now expected at 'facebookOptions.scope'");
            if (!loginOptions.facebookOptions) {
                loginOptions.facebookOptions = {};
            }
            if (!loginOptions.facebookOptions.scope) {
                loginOptions.facebookOptions.scope = loginOptions.scope;
            }
        }
    },
    merge: function (obj1, obj2) {
        var result = {};
        for (var i in obj1) {
            if ((i in obj2) && (typeof obj1[i] === "object") && (i !== null)) {
                result[i] = exports.firebase.merge(obj1[i], obj2[i]);
            }
            else {
                result[i] = obj1[i];
            }
        }
        for (var i in obj2) {
            if (i in result) {
                continue;
            }
            result[i] = obj2[i];
        }
        return result;
    }
};
var DocumentSnapshot = (function () {
    function DocumentSnapshot(id, exists, data) {
        this.id = id;
        this.exists = exists;
        this.data = data;
    }
    return DocumentSnapshot;
}());
exports.DocumentSnapshot = DocumentSnapshot;
var QuerySnapshot = (function () {
    function QuerySnapshot() {
    }
    QuerySnapshot.prototype.forEach = function (callback, thisArg) {
        this.docSnapshots.map(function (snapshot) { return callback(snapshot); });
    };
    return QuerySnapshot;
}());
exports.QuerySnapshot = QuerySnapshot;


/***/ }),
/* 142 */
/* no static exports found */
/* exports used: SpeechRecognition */
/*!**********************************************************************!*\
  !*** ../~/nativescript-speech-recognition/speech-recognition.ios.js ***!
  \**********************************************************************/
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SpeechRecognition = (function () {
    function SpeechRecognition() {
        this.recognitionRequest = null;
        this.audioEngine = null;
        this.speechRecognizer = null;
        this.recognitionTask = null;
        this.inputNode = null;
        this.audioSession = null;
        this.audioEngine = AVAudioEngine.new();
    }
    SpeechRecognition.prototype.available = function () {
        return new Promise(function (resolve, reject) {
            resolve(SFSpeechRecognizer.new().available);
        });
    };
    SpeechRecognition.prototype.requestPermission = function () {
        return new Promise(function (resolve, reject) {
            SFSpeechRecognizer.requestAuthorization(function (status) {
                if (status !== 3) {
                    resolve(false);
                    return;
                }
                AVAudioSession.sharedInstance().requestRecordPermission(function (granted) {
                    resolve(granted);
                });
            });
        });
    };
    SpeechRecognition.prototype.startListening = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (options.locale) {
                var locale = NSLocale.alloc().initWithLocaleIdentifier(options.locale);
                _this.speechRecognizer = SFSpeechRecognizer.alloc().initWithLocale(locale);
            }
            else {
                _this.speechRecognizer = SFSpeechRecognizer.new();
            }
            if (_this.recognitionTask !== null) {
                _this.recognitionTask.cancel();
                _this.recognitionTask = null;
            }
            SFSpeechRecognizer.requestAuthorization(function (status) {
                if (status !== 3) {
                    reject("Not authorized");
                    return;
                }
                _this.audioSession = AVAudioSession.sharedInstance();
                _this.audioSession.setCategoryError(AVAudioSessionCategoryRecord);
                _this.audioSession.setModeError(AVAudioSessionModeMeasurement);
                _this.audioSession.setActiveWithOptionsError(true, 1);
                _this.recognitionRequest = SFSpeechAudioBufferRecognitionRequest.new();
                if (!_this.recognitionRequest) {
                    reject("Unable to create an SFSpeechAudioBufferRecognitionRequest object");
                    return;
                }
                _this.inputNode = _this.audioEngine.inputNode;
                if (!_this.inputNode) {
                    reject("Audio engine has no input node");
                    return;
                }
                _this.recognitionRequest.shouldReportPartialResults = options.returnPartialResults;
                _this.recognitionTask = _this.speechRecognizer.recognitionTaskWithRequestResultHandler(_this.recognitionRequest, function (result, error) {
                    if (result !== null) {
                        options.onResult({
                            finished: result.final,
                            text: result.bestTranscription.formattedString
                        });
                    }
                    if (error !== null || (result !== null && result.final)) {
                        _this.audioEngine.stop();
                        _this.inputNode.removeTapOnBus(0);
                        _this.audioSession.setCategoryError(AVAudioSessionCategoryPlayback);
                        _this.audioSession.setModeError(AVAudioSessionModeDefault);
                        _this.recognitionRequest = null;
                        _this.recognitionTask = null;
                    }
                    if (error !== null) {
                        console.log("error in handler: " + error.localizedDescription);
                    }
                });
                var that = _this;
                var recordingFormat = _this.inputNode.outputFormatForBus(0);
                _this.inputNode.installTapOnBusBufferSizeFormatBlock(0, 1024, recordingFormat, function (buffer, when) {
                    that.recognitionRequest.appendAudioPCMBuffer(buffer);
                });
                _this.audioEngine.prepare();
                resolve(_this.audioEngine.startAndReturnError());
            });
        });
    };
    SpeechRecognition.prototype.stopListening = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.audioEngine.running) {
                reject("Not running");
                return;
            }
            _this.audioEngine.stop();
            _this.recognitionRequest.endAudio();
            _this.audioSession.setCategoryError(AVAudioSessionCategoryPlayback);
            _this.audioSession.setModeError(AVAudioSessionModeDefault);
            _this.speechRecognizer = null;
            _this.recognitionTask = null;
            resolve();
        });
    };
    return SpeechRecognition;
}());
exports.SpeechRecognition = SpeechRecognition;
//# sourceMappingURL=speech-recognition.ios.js.map

/***/ }),
/* 143 */
/* exports provided: default */
/* exports used: default */
/*!**********************************************!*\
  !*** ./components/Assignment/Assignment.vue ***!
  \**********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_ns_vue_loader_lib_selector_type_script_index_0_bustCache_Assignment_vue__ = __webpack_require__(/*! !babel-loader!../../../~/ns-vue-loader/lib/selector?type=script&index=0&bustCache!./Assignment.vue */ 131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_ns_vue_loader_lib_template_compiler_index_id_data_v_f86a44b8_hasScoped_false_buble_transforms_node_modules_ns_vue_loader_lib_selector_type_template_index_0_bustCache_Assignment_vue__ = __webpack_require__(/*! !../../../~/ns-vue-loader/lib/template-compiler/index?{"id":"data-v-f86a44b8","hasScoped":false,"buble":{"transforms":{}}}!../../../~/ns-vue-loader/lib/selector?type=template&index=0&bustCache!./Assignment.vue */ 154);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(/*! !../../../~/extract-text-webpack-plugin/loader.js?{"id":2,"omit":0,"remove":true}!css-loader!../../../~/ns-vue-loader/lib/style-compiler/index?{"vue":true,"id":"data-v-f86a44b8","scoped":false,"hasInlineConfig":false}!../../../~/ns-vue-loader/lib/selector?type=styles&index=0&bustCache!./Assignment.vue */ 137)
}
var normalizeComponent = __webpack_require__(/*! ../../../~/ns-vue-loader/lib/component-normalizer */ 13)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_ns_vue_loader_lib_selector_type_script_index_0_bustCache_Assignment_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_ns_vue_loader_lib_template_compiler_index_id_data_v_f86a44b8_hasScoped_false_buble_transforms_node_modules_ns_vue_loader_lib_selector_type_template_index_0_bustCache_Assignment_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components/Assignment/Assignment.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f86a44b8", Component.options)
  } else {
    hotAPI.reload("data-v-f86a44b8", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 144 */
/* exports provided: default */
/* exports used: default */
/*!************************************************!*\
  !*** ./components/Assignments/Assignments.vue ***!
  \************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_ns_vue_loader_lib_selector_type_script_index_0_bustCache_Assignments_vue__ = __webpack_require__(/*! !babel-loader!../../../~/ns-vue-loader/lib/selector?type=script&index=0&bustCache!./Assignments.vue */ 132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_ns_vue_loader_lib_template_compiler_index_id_data_v_381339d2_hasScoped_false_buble_transforms_node_modules_ns_vue_loader_lib_selector_type_template_index_0_bustCache_Assignments_vue__ = __webpack_require__(/*! !../../../~/ns-vue-loader/lib/template-compiler/index?{"id":"data-v-381339d2","hasScoped":false,"buble":{"transforms":{}}}!../../../~/ns-vue-loader/lib/selector?type=template&index=0&bustCache!./Assignments.vue */ 151);
var disposed = false
var normalizeComponent = __webpack_require__(/*! ../../../~/ns-vue-loader/lib/component-normalizer */ 13)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_ns_vue_loader_lib_selector_type_script_index_0_bustCache_Assignments_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_ns_vue_loader_lib_template_compiler_index_id_data_v_381339d2_hasScoped_false_buble_transforms_node_modules_ns_vue_loader_lib_selector_type_template_index_0_bustCache_Assignments_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components/Assignments/Assignments.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-381339d2", Component.options)
  } else {
    hotAPI.reload("data-v-381339d2", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 145 */
/* exports provided: default */
/* exports used: default */
/*!**********************************!*\
  !*** ./components/Home/Home.vue ***!
  \**********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_ns_vue_loader_lib_selector_type_script_index_0_bustCache_Home_vue__ = __webpack_require__(/*! !babel-loader!../../../~/ns-vue-loader/lib/selector?type=script&index=0&bustCache!./Home.vue */ 133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_ns_vue_loader_lib_template_compiler_index_id_data_v_9681c438_hasScoped_false_buble_transforms_node_modules_ns_vue_loader_lib_selector_type_template_index_0_bustCache_Home_vue__ = __webpack_require__(/*! !../../../~/ns-vue-loader/lib/template-compiler/index?{"id":"data-v-9681c438","hasScoped":false,"buble":{"transforms":{}}}!../../../~/ns-vue-loader/lib/selector?type=template&index=0&bustCache!./Home.vue */ 152);
var disposed = false
var normalizeComponent = __webpack_require__(/*! ../../../~/ns-vue-loader/lib/component-normalizer */ 13)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_ns_vue_loader_lib_selector_type_script_index_0_bustCache_Home_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_ns_vue_loader_lib_template_compiler_index_id_data_v_9681c438_hasScoped_false_buble_transforms_node_modules_ns_vue_loader_lib_selector_type_template_index_0_bustCache_Home_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components/Home/Home.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9681c438", Component.options)
  } else {
    hotAPI.reload("data-v-9681c438", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 146 */
/* exports provided: default */
/* exports used: default */
/*!************************************!*\
  !*** ./components/Login/Login.vue ***!
  \************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_ns_vue_loader_lib_selector_type_script_index_0_bustCache_Login_vue__ = __webpack_require__(/*! !babel-loader!../../../~/ns-vue-loader/lib/selector?type=script&index=0&bustCache!./Login.vue */ 134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_ns_vue_loader_lib_template_compiler_index_id_data_v_dc03ccd0_hasScoped_false_buble_transforms_node_modules_ns_vue_loader_lib_selector_type_template_index_0_bustCache_Login_vue__ = __webpack_require__(/*! !../../../~/ns-vue-loader/lib/template-compiler/index?{"id":"data-v-dc03ccd0","hasScoped":false,"buble":{"transforms":{}}}!../../../~/ns-vue-loader/lib/selector?type=template&index=0&bustCache!./Login.vue */ 153);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(/*! !../../../~/extract-text-webpack-plugin/loader.js?{"id":2,"omit":1,"remove":true}!vue-style-loader!css-loader?{"url":false}!../../../~/ns-vue-loader/lib/style-compiler/index?{"vue":true,"id":"data-v-dc03ccd0","scoped":false,"hasInlineConfig":false}!sass-loader!../../../~/ns-vue-loader/lib/selector?type=styles&index=0&bustCache!./Login.vue */ 140)
}
var normalizeComponent = __webpack_require__(/*! ../../../~/ns-vue-loader/lib/component-normalizer */ 13)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_ns_vue_loader_lib_selector_type_script_index_0_bustCache_Login_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_ns_vue_loader_lib_template_compiler_index_id_data_v_dc03ccd0_hasScoped_false_buble_transforms_node_modules_ns_vue_loader_lib_selector_type_template_index_0_bustCache_Login_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components/Login/Login.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-dc03ccd0", Component.options)
  } else {
    hotAPI.reload("data-v-dc03ccd0", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 147 */
/* exports provided: default */
/* exports used: default */
/*!*******************************************!*\
  !*** ./components/Login/LoginInitial.vue ***!
  \*******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_ns_vue_loader_lib_selector_type_script_index_0_bustCache_LoginInitial_vue__ = __webpack_require__(/*! !babel-loader!../../../~/ns-vue-loader/lib/selector?type=script&index=0&bustCache!./LoginInitial.vue */ 135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_ns_vue_loader_lib_template_compiler_index_id_data_v_122328bc_hasScoped_false_buble_transforms_node_modules_ns_vue_loader_lib_selector_type_template_index_0_bustCache_LoginInitial_vue__ = __webpack_require__(/*! !../../../~/ns-vue-loader/lib/template-compiler/index?{"id":"data-v-122328bc","hasScoped":false,"buble":{"transforms":{}}}!../../../~/ns-vue-loader/lib/selector?type=template&index=0&bustCache!./LoginInitial.vue */ 149);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(/*! !../../../~/extract-text-webpack-plugin/loader.js?{"id":2,"omit":1,"remove":true}!vue-style-loader!css-loader?{"url":false}!../../../~/ns-vue-loader/lib/style-compiler/index?{"vue":true,"id":"data-v-122328bc","scoped":false,"hasInlineConfig":false}!sass-loader!../../../~/ns-vue-loader/lib/selector?type=styles&index=0&bustCache!./LoginInitial.vue */ 138)
}
var normalizeComponent = __webpack_require__(/*! ../../../~/ns-vue-loader/lib/component-normalizer */ 13)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_ns_vue_loader_lib_selector_type_script_index_0_bustCache_LoginInitial_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_ns_vue_loader_lib_template_compiler_index_id_data_v_122328bc_hasScoped_false_buble_transforms_node_modules_ns_vue_loader_lib_selector_type_template_index_0_bustCache_LoginInitial_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components/Login/LoginInitial.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-122328bc", Component.options)
  } else {
    hotAPI.reload("data-v-122328bc", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 148 */
/* exports provided: default */
/* exports used: default */
/*!****************************************!*\
  !*** ./components/Login/LoginMain.vue ***!
  \****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_ns_vue_loader_lib_selector_type_script_index_0_bustCache_LoginMain_vue__ = __webpack_require__(/*! !babel-loader!../../../~/ns-vue-loader/lib/selector?type=script&index=0&bustCache!./LoginMain.vue */ 136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_ns_vue_loader_lib_template_compiler_index_id_data_v_15b7021e_hasScoped_false_buble_transforms_node_modules_ns_vue_loader_lib_selector_type_template_index_0_bustCache_LoginMain_vue__ = __webpack_require__(/*! !../../../~/ns-vue-loader/lib/template-compiler/index?{"id":"data-v-15b7021e","hasScoped":false,"buble":{"transforms":{}}}!../../../~/ns-vue-loader/lib/selector?type=template&index=0&bustCache!./LoginMain.vue */ 150);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(/*! !../../../~/extract-text-webpack-plugin/loader.js?{"id":2,"omit":1,"remove":true}!vue-style-loader!css-loader?{"url":false}!../../../~/ns-vue-loader/lib/style-compiler/index?{"vue":true,"id":"data-v-15b7021e","scoped":false,"hasInlineConfig":false}!sass-loader!../../../~/ns-vue-loader/lib/selector?type=styles&index=0&bustCache!./LoginMain.vue */ 139)
}
var normalizeComponent = __webpack_require__(/*! ../../../~/ns-vue-loader/lib/component-normalizer */ 13)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_ns_vue_loader_lib_selector_type_script_index_0_bustCache_LoginMain_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_ns_vue_loader_lib_template_compiler_index_id_data_v_15b7021e_hasScoped_false_buble_transforms_node_modules_ns_vue_loader_lib_selector_type_template_index_0_bustCache_LoginMain_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "components/Login/LoginMain.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-15b7021e", Component.options)
  } else {
    hotAPI.reload("data-v-15b7021e", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 149 */
/* exports provided: default */
/* exports used: default */
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ../~/ns-vue-loader/lib/template-compiler?{"id":"data-v-122328bc","hasScoped":false,"buble":{"transforms":{}}}!../~/ns-vue-loader/lib/selector.js?type=template&index=0&bustCache!./components/Login/LoginInitial.vue ***!
  \****************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var esExports = { template: '  \n  <StackLayout ref=\"initialContainer\" class=\"initial-container\" :visibility=\"visible?\'visible\':\'collapse\'\">\n    <Label text=\"Elocute\" class=\"initial-label\"></Label>\n    <StackLayout @tap=\"welcome()\" class=\"initial-button\">\n      <Label text=\"Welcome\" class=\"initial-button-label\"></Label>\n    </StackLayout>\n  </StackLayout>\n  ' }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 150 */
/* exports provided: default */
/* exports used: default */
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ../~/ns-vue-loader/lib/template-compiler?{"id":"data-v-15b7021e","hasScoped":false,"buble":{"transforms":{}}}!../~/ns-vue-loader/lib/selector.js?type=template&index=0&bustCache!./components/Login/LoginMain.vue ***!
  \*************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var esExports = { template: '  \n  <StackLayout ref=\"mainContainer\" class=\"main-container\" :visibility=\"visible?\'visible\':\'collapse\'\">\n    <Label class=\"main-label\" text=\"Elocute\" :color=\"isLoggingIn? \'black\' : \'white\'\"></Label>\n  \n    <GridLayout ref=\"formControls\" class=\"form-controls\" rows=\"auto, auto\" translateY=\"50\">\n      <TextField\n        hint=\"Email Address\"\n        keyboardType=\"email\"\n        returnKeyType=\"next\"\n        @returnPress=\"focusPassword()\"\n        v-model=\"user.email\"\n        :iEnabled=\"!isAuthenticating\"\n        autocorrect=\"false\"\n        autocapitalizationType=\"none\"\n        :class=\"{ light: !isLoggingIn}\"\n        row=\"0\"></TextField>\n      <TextField ref=\"password\"\n        hint=\"Password\"\n        secure=\"true\"\n        returnKeyType=\"done\"\n        @returnPress=\"submit()\"\n        v-model=\"user.password\"\n        :isEnabled=\"!isAuthenticating\"\n        :class=\"{ light: !isLoggingIn }\"\n        row=\"1\"></TextField>\n  \n      <ActivityIndicator :busy=\"isAuthenticating\" rowSpan=\"2\"></ActivityIndicator>\n    </GridLayout>\n  \n    <Button\n      :text=\"isLoggingIn ? \'Login\' : \'Sign up\'\"\n      :isEnabled=\"!isAuthenticating\"\n      class=\"submit-button\"\n      @tap=\"submit()\"></Button>\n  \n    <Label\n      class=\"forgot-password-label\"\n      text=\"Forgot password?\"\n      @tap=\"forgotPassword()\"\n      :opacity=\"isLoggingIn ? 1 : 0\"></Label>\n  \n    <StackLayout ref=\"signUpStack\" class=\"sign-up-stack\" @tap=\"toggleDisplay()\" translateY=\"50\">\n      <Label :text=\"isLoggingIn ? \'Sign up here\' : \'Back to login\'\"></Label>\n    </StackLayout>\n  </StackLayout>\n  ' }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 151 */
/* exports provided: default */
/* exports used: default */
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ../~/ns-vue-loader/lib/template-compiler?{"id":"data-v-381339d2","hasScoped":false,"buble":{"transforms":{}}}!../~/ns-vue-loader/lib/selector.js?type=template&index=0&bustCache!./components/Assignments/Assignments.vue ***!
  \*********************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var esExports = { template: '  \n  <Page ref=\"page\" actionBarHidden=\"true\" backgroundSpanUnderStatusBar=\"true\">\n    <StackLayout>\n      <GridLayout class=\"action-bar\" rows=\"*\" columns=\"20,2*,20\">\n        <Image src=\"~/images/back.png\" col=\"0\" row=\"0\" class=\"header-icon\" @tap=\"goBack()\"/>\n        <Label col=\"1\" row=\"0\" class=\"header\" text=\"My Assignments\"></Label>\n        <Image src=\"~/images/logout.png\" class=\"header-icon\" col=\"2\" row=\"0\" @tap=\"logout()\"/>\n      </GridLayout>\n      <StackLayout class=\"container\">\n          <Image src=\"~/images/header\"/>        \n          <ScrollView style=\"height: 100%\">\n              <StackLayout>\n                  <StackLayout class=\"card\" v-for=\"item in assignments\" v-bind:key=\"item.id\" @tap=\"getAssignment(item.id)\">\n                      <Label textWrap=\"true\" :text=\"item.Title\"></Label>\n                  </StackLayout>                \n              </StackLayout>\n          </ScrollView>\n      </StackLayout>\n  </StackLayout>\n  </Page>\n  ' }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 152 */
/* exports provided: default */
/* exports used: default */
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ../~/ns-vue-loader/lib/template-compiler?{"id":"data-v-9681c438","hasScoped":false,"buble":{"transforms":{}}}!../~/ns-vue-loader/lib/selector.js?type=template&index=0&bustCache!./components/Home/Home.vue ***!
  \*******************************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var esExports = { template: '  \n  <Page ref=\"page\" actionBarHidden=\"true\" backgroundSpanUnderStatusBar=\"true\">\n    <StackLayout>\n      <GridLayout class=\"action-bar\" rows=\"*\" columns=\"3*,20\">\n        <Label col=\"0\" row=\"0\" class=\"header\" text=\"Welcome to Elocute!\"></Label>\n        <Image src=\"~/images/logout.png\" class=\"header-icon\" col=\"1\" row=\"0\" @tap=\"logout()\"/>\n      </GridLayout>\n      <StackLayout class=\"container\">\n          <Image src=\"~/images/header\"/>        \n          <ScrollView style=\"height: 100%\">\n              <StackLayout>\n                  <StackLayout class=\"card\" v-for=\"item in classrooms\" v-bind:key=\"item.id\" @tap=\"getAssignments(item.id)\">\n                      <Label :text=\"item.ClassName\"></Label>\n                  </StackLayout>                \n              </StackLayout>\n          </ScrollView>\n      </StackLayout>\n  \n  </StackLayout>\n  </Page>\n  ' }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 153 */
/* exports provided: default */
/* exports used: default */
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ../~/ns-vue-loader/lib/template-compiler?{"id":"data-v-dc03ccd0","hasScoped":false,"buble":{"transforms":{}}}!../~/ns-vue-loader/lib/selector.js?type=template&index=0&bustCache!./components/Login/Login.vue ***!
  \*********************************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var esExports = { template: '  \n  <Page ref=\"page\" :class=\"pageClasses\" actionBarHidden=\"true\" backgroundSpanUnderStatusBar=\"true\">\n    <GridLayout class=\'login\'>\n      \n      <LoginInitial ref=\"loginInitial\" @login=\"showMainContent()\" :visible=\"state === \'initial\'\"></LoginInitial>\n      <LoginMain ref=\"loginMain\" :visible=\"state === \'main\'\"></LoginMain>\n  \n      <AbsoluteLayout marginTop=\"-340\" ref=\"logoContainer\" class=\"logo-container\">\n        <Image translateY=\"0\" src=\"res://seal\" stretch=\"none\"/>\n      </AbsoluteLayout>\n  \n    </GridLayout>\n  </Page>\n  ' }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 154 */
/* exports provided: default */
/* exports used: default */
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ../~/ns-vue-loader/lib/template-compiler?{"id":"data-v-f86a44b8","hasScoped":false,"buble":{"transforms":{}}}!../~/ns-vue-loader/lib/selector.js?type=template&index=0&bustCache!./components/Assignment/Assignment.vue ***!
  \*******************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var esExports = { template: '  \n  <Page ref=\"page\" actionBarHidden=\"true\" backgroundSpanUnderStatusBar=\"true\">\n    <StackLayout>\n      <GridLayout class=\"action-bar\" rows=\"*\" columns=\"20,2*,20\">\n        <Image src=\"~/images/back.png\" col=\"0\" row=\"0\" class=\"header-icon\" @tap=\"goBack()\"/>\n        <Label col=\"1\" row=\"0\" class=\"header\" :text=\"assignment.Title\"></Label>\n        <Image src=\"~/images/logout.png\" class=\"header-icon\" col=\"2\" row=\"0\" @tap=\"logout()\"/>\n      </GridLayout>\n      <StackLayout class=\"container\">\n          <Image src=\"~/images/header\"/>        \n          <ScrollView style=\"height: 100%\">\n              <StackLayout class=\"card\">\n                  <Label class=\"instruction\" textWrap=\"true\" text=\"Press the \'start\' button, then read this text aloud, slowly and clearly\"></Label>\n                  <Button class=\"btn start\" @tap=\"startListening()\" text=\"Start\"></Button>\n                  <StackLayout class=\"transcription\" >\n                      <Label textWrap=\"true\" :text=\"assignment.Text\"></Label>\n                  </StackLayout>\n                  <Button class=\"btn stop\" @tap=\"stopListening()\" text=\"Stop\"></Button>\n                  <activity-indicator :busy=\"isSpeaking\"></activity-indicator>\n                  <StackLayout class=\"shaded\">\n                      <Label #transcriptionLbl></Label>\n                  </StackLayout>\n                  <Button class=\"btn score\" text=\"Get my Score\"></Button>\n              </StackLayout>\n          </ScrollView>\n      </StackLayout>\n  </StackLayout>\n  </Page>\n  ' }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 155 */
/* no static exports found */
/* all exports used */
/*!*********************************************************************************!*\
  !*** ../~/tns-core-modules/application-settings/application-settings-common.js ***!
  \*********************************************************************************/
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.checkKey = function (key) {
    if (typeof key !== "string") {
        throw new Error("key: '" + key + "' must be a string");
    }
};
exports.ensureValidValue = function (value, valueType) {
    if (typeof value !== valueType) {
        throw new Error("value: '" + value + "' must be a " + valueType);
    }
};
//# sourceMappingURL=application-settings-common.js.map

/***/ }),
/* 156 */,
/* 157 */,
/* 158 */
/* no static exports found */
/* exports used: getConnectionType, connectionType */
/*!**************************************************************!*\
  !*** ../~/tns-core-modules/connectivity/connectivity.ios.js ***!
  \**************************************************************/
/***/ (function(module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
var connectionType;
(function (connectionType) {
    connectionType[connectionType["none"] = 0] = "none";
    connectionType[connectionType["wifi"] = 1] = "wifi";
    connectionType[connectionType["mobile"] = 2] = "mobile";
})(connectionType = exports.connectionType || (exports.connectionType = {}));
function _createReachability(host) {
    if (host) {
        return SCNetworkReachabilityCreateWithName(null, host);
    }
    else {
        var zeroAddress = new interop.Reference(sockaddr, {
            sa_len: 16,
            sa_family: 2
        });
        return SCNetworkReachabilityCreateWithAddress(null, zeroAddress);
    }
}
function _getReachabilityFlags(host) {
    var reachability = _createReachability(host);
    var flagsRef = new interop.Reference();
    var gotFlags = SCNetworkReachabilityGetFlags(reachability, flagsRef);
    if (!gotFlags) {
        return null;
    }
    return flagsRef.value;
}
function _getConnectionType(host) {
    var flags = _getReachabilityFlags(host);
    return _getConnectionTypeFromFlags(flags);
}
function _getConnectionTypeFromFlags(flags) {
    if (!flags) {
        return connectionType.none;
    }
    var isReachable = flags & 2;
    var connectionRequired = flags & 4;
    if (!isReachable || connectionRequired) {
        return connectionType.none;
    }
    var isWWAN = flags & 262144;
    if (isWWAN) {
        return connectionType.mobile;
    }
    return connectionType.wifi;
}
function getConnectionType() {
    return _getConnectionType();
}
exports.getConnectionType = getConnectionType;
function _reachabilityCallback(target, flags, info) {
    if (_connectionTypeChangedCallback) {
        var newConnectionType = _getConnectionTypeFromFlags(flags);
        _connectionTypeChangedCallback(newConnectionType);
    }
}
var _reachabilityCallbackFunctionRef = new interop.FunctionReference(_reachabilityCallback);
var _monitorReachabilityRef;
var _connectionTypeChangedCallback;
function startMonitoring(connectionTypeChangedCallback) {
    if (!_monitorReachabilityRef) {
        _monitorReachabilityRef = _createReachability();
        _connectionTypeChangedCallback = connectionTypeChangedCallback;
        SCNetworkReachabilitySetCallback(_monitorReachabilityRef, _reachabilityCallbackFunctionRef, null);
        SCNetworkReachabilityScheduleWithRunLoop(_monitorReachabilityRef, CFRunLoopGetCurrent(), kCFRunLoopDefaultMode);
    }
}
exports.startMonitoring = startMonitoring;
function stopMonitoring() {
    if (_monitorReachabilityRef) {
        SCNetworkReachabilityUnscheduleFromRunLoop(_monitorReachabilityRef, CFRunLoopGetCurrent(), kCFRunLoopDefaultMode);
        _monitorReachabilityRef = undefined;
        _connectionTypeChangedCallback = undefined;
    }
}
exports.stopMonitoring = stopMonitoring;
//# sourceMappingURL=connectivity.ios.js.map

/***/ }),
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */
/* no static exports found */
/* all exports used */
/*!***********************************************************************!*\
  !*** ../~/tns-core-modules/ui/layouts/wrap-layout/wrap-layout.ios.js ***!
  \***********************************************************************/
/***/ (function(module, exports, __webpack_require__) {

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var wrap_layout_common_1 = __webpack_require__(/*! ./wrap-layout-common */ 90);
__export(__webpack_require__(/*! ./wrap-layout-common */ 90));
var WrapLayout = (function (_super) {
    __extends(WrapLayout, _super);
    function WrapLayout() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._lengths = new Array();
        return _this;
    }
    WrapLayout.getChildMeasureSpec = function (parentMode, parentLength, itemLength) {
        if (itemLength > 0) {
            return wrap_layout_common_1.layout.makeMeasureSpec(itemLength, wrap_layout_common_1.layout.EXACTLY);
        }
        else if (parentMode === wrap_layout_common_1.layout.UNSPECIFIED) {
            return wrap_layout_common_1.layout.makeMeasureSpec(0, wrap_layout_common_1.layout.UNSPECIFIED);
        }
        else {
            return wrap_layout_common_1.layout.makeMeasureSpec(parentLength, wrap_layout_common_1.layout.AT_MOST);
        }
    };
    WrapLayout.prototype.onMeasure = function (widthMeasureSpec, heightMeasureSpec) {
        var _this = this;
        _super.prototype.onMeasure.call(this, widthMeasureSpec, heightMeasureSpec);
        var measureWidth = 0;
        var measureHeight = 0;
        var width = wrap_layout_common_1.layout.getMeasureSpecSize(widthMeasureSpec);
        var widthMode = wrap_layout_common_1.layout.getMeasureSpecMode(widthMeasureSpec);
        var height = wrap_layout_common_1.layout.getMeasureSpecSize(heightMeasureSpec);
        var heightMode = wrap_layout_common_1.layout.getMeasureSpecMode(heightMeasureSpec);
        var horizontalPaddingsAndMargins = this.effectivePaddingLeft + this.effectivePaddingRight + this.effectiveBorderLeftWidth + this.effectiveBorderRightWidth;
        var verticalPaddingsAndMargins = this.effectivePaddingTop + this.effectivePaddingBottom + this.effectiveBorderTopWidth + this.effectiveBorderBottomWidth;
        var availableWidth = widthMode === wrap_layout_common_1.layout.UNSPECIFIED ? Number.MAX_VALUE : width - horizontalPaddingsAndMargins;
        var availableHeight = heightMode === wrap_layout_common_1.layout.UNSPECIFIED ? Number.MAX_VALUE : height - verticalPaddingsAndMargins;
        var childWidthMeasureSpec = WrapLayout.getChildMeasureSpec(widthMode, availableWidth, this.effectiveItemWidth);
        var childHeightMeasureSpec = WrapLayout.getChildMeasureSpec(heightMode, availableHeight, this.effectiveItemHeight);
        var remainingWidth = availableWidth;
        var remainingHeight = availableHeight;
        this._lengths.length = 0;
        var rowOrColumn = 0;
        var maxLength = 0;
        var isVertical = this.orientation === "vertical";
        var useItemWidth = this.effectiveItemWidth > 0;
        var useItemHeight = this.effectiveItemHeight > 0;
        var itemWidth = this.effectiveItemWidth;
        var itemHeight = this.effectiveItemHeight;
        this.eachLayoutChild(function (child, last) {
            var desiredSize = wrap_layout_common_1.View.measureChild(_this, child, childWidthMeasureSpec, childHeightMeasureSpec);
            var childMeasuredWidth = useItemWidth ? itemWidth : desiredSize.measuredWidth;
            var childMeasuredHeight = useItemHeight ? itemHeight : desiredSize.measuredHeight;
            var isFirst = _this._lengths.length <= rowOrColumn;
            if (isVertical) {
                if (childMeasuredHeight > remainingHeight) {
                    rowOrColumn++;
                    maxLength = Math.max(maxLength, measureHeight);
                    measureHeight = childMeasuredHeight;
                    remainingHeight = availableHeight - childMeasuredHeight;
                    _this._lengths[isFirst ? rowOrColumn - 1 : rowOrColumn] = childMeasuredWidth;
                }
                else {
                    remainingHeight -= childMeasuredHeight;
                    measureHeight += childMeasuredHeight;
                }
            }
            else {
                if (childMeasuredWidth > remainingWidth) {
                    rowOrColumn++;
                    maxLength = Math.max(maxLength, measureWidth);
                    measureWidth = childMeasuredWidth;
                    remainingWidth = availableWidth - childMeasuredWidth;
                    _this._lengths[isFirst ? rowOrColumn - 1 : rowOrColumn] = childMeasuredHeight;
                }
                else {
                    remainingWidth -= childMeasuredWidth;
                    measureWidth += childMeasuredWidth;
                }
            }
            if (isFirst) {
                _this._lengths[rowOrColumn] = isVertical ? childMeasuredWidth : childMeasuredHeight;
            }
            else {
                _this._lengths[rowOrColumn] = Math.max(_this._lengths[rowOrColumn], isVertical ? childMeasuredWidth : childMeasuredHeight);
            }
        });
        if (isVertical) {
            measureHeight = Math.max(maxLength, measureHeight);
            this._lengths.forEach(function (value, index, array) {
                measureWidth += value;
            });
        }
        else {
            measureWidth = Math.max(maxLength, measureWidth);
            this._lengths.forEach(function (value, index, array) {
                measureHeight += value;
            });
        }
        measureWidth += horizontalPaddingsAndMargins;
        measureHeight += verticalPaddingsAndMargins;
        measureWidth = Math.max(measureWidth, this.effectiveMinWidth);
        measureHeight = Math.max(measureHeight, this.effectiveMinHeight);
        var widthAndState = wrap_layout_common_1.View.resolveSizeAndState(measureWidth, width, widthMode, 0);
        var heightAndState = wrap_layout_common_1.View.resolveSizeAndState(measureHeight, height, heightMode, 0);
        this.setMeasuredDimension(widthAndState, heightAndState);
    };
    WrapLayout.prototype.onLayout = function (left, top, right, bottom) {
        var _this = this;
        _super.prototype.onLayout.call(this, left, top, right, bottom);
        var isVertical = this.orientation === "vertical";
        var paddingLeft = this.effectiveBorderLeftWidth + this.effectivePaddingLeft;
        var paddingTop = this.effectiveBorderTopWidth + this.effectivePaddingTop;
        var paddingRight = this.effectiveBorderRightWidth + this.effectivePaddingRight;
        var paddingBottom = this.effectiveBorderBottomWidth + this.effectivePaddingBottom;
        var childLeft = paddingLeft;
        var childTop = paddingTop;
        var childrenLength;
        if (isVertical) {
            childrenLength = bottom - top - paddingBottom;
        }
        else {
            childrenLength = right - left - paddingRight;
        }
        var rowOrColumn = 0;
        this.eachLayoutChild(function (child, last) {
            var childHeight = child.getMeasuredHeight() + child.effectiveMarginTop + child.effectiveMarginBottom;
            var childWidth = child.getMeasuredWidth() + child.effectiveMarginLeft + child.effectiveMarginRight;
            var length = _this._lengths[rowOrColumn];
            if (isVertical) {
                childWidth = length;
                childHeight = _this.effectiveItemHeight > 0 ? _this.effectiveItemHeight : childHeight;
                var isFirst = childTop === paddingTop;
                if (childTop + childHeight > childrenLength) {
                    childTop = paddingTop;
                    if (!isFirst) {
                        childLeft += length;
                    }
                    rowOrColumn++;
                    childWidth = _this._lengths[isFirst ? rowOrColumn - 1 : rowOrColumn];
                }
            }
            else {
                childWidth = _this.effectiveItemWidth > 0 ? _this.effectiveItemWidth : childWidth;
                childHeight = length;
                var isFirst = childLeft === paddingLeft;
                if (childLeft + childWidth > childrenLength) {
                    childLeft = paddingLeft;
                    if (!isFirst) {
                        childTop += length;
                    }
                    rowOrColumn++;
                    childHeight = _this._lengths[isFirst ? rowOrColumn - 1 : rowOrColumn];
                }
            }
            wrap_layout_common_1.View.layoutChild(_this, child, childLeft, childTop, childLeft + childWidth, childTop + childHeight);
            if (isVertical) {
                childTop += childHeight;
            }
            else {
                childLeft += childWidth;
            }
        });
    };
    return WrapLayout;
}(wrap_layout_common_1.WrapLayoutBase));
exports.WrapLayout = WrapLayout;
//# sourceMappingURL=wrap-layout.ios.js.map

/***/ })
],[127]);