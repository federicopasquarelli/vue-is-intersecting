(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.vueIsIntersecting = {}));
}(this, (function (exports) { 'use strict';

  var uuidv4 = (function () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = (Math.random() * 16) | 0;
          var v = c === 'x' ? r : (r & 0x3) | 0x8;
          return v.toString(16);
      });
  });

  var counter = new WeakMap();
  var reverseCounter = new WeakMap();
  var wasIntersecting = new WeakMap();
  var params = {
      handlers: new WeakMap(),
      debouncers: new WeakMap(),
      instant: new WeakMap(),
      uniques: new WeakMap(),
      callbacks: new WeakMap(),
      current: new WeakMap(),
  };
  var clear = function (el, counter) {
      if (!counter.get(el))
          return;
      clearTimeout(counter.get(el));
      counter.delete(el);
  };
  var unobserve = function (target, observer) {
      observer.unobserve(target);
      clear(target, counter);
  };
  var execute = function (el, self) {
      var isUnique = params.uniques.get(el);
      var getCallback = params.callbacks.get(el);
      var sendResponse = params.handlers.get(el);
      var current = params.current.get(el);
      if (self && !wasIntersecting.get(el))
          wasIntersecting.set(el, true);
      if (current) {
          sendResponse[self ? 0 : 1](el, getCallback);
      }
      else {
          sendResponse(el, getCallback);
      }
      if (isUnique && self)
          unobserve(el, self);
  };
  var setCounter = function (reverse, target, self) {
      var setter = reverse ? reverseCounter : counter;
      setter.set(target, setTimeout(function () {
          execute(target, self);
          clear(target, setter);
      }, 500));
  };
  var observer = new IntersectionObserver(function (entries, self) {
      entries.forEach(function (entry) {
          var instant = params.instant.get(entry.target);
          // if is not intersecting clear the entry timeout for the lazyloader
          if (!entry.isIntersecting) {
              if (wasIntersecting.get(entry.target)) {
                  if (instant)
                      execute(entry.target);
                  if (reverseCounter.get(entry.target) || instant)
                      return;
                  setCounter(true, entry.target);
              }
              clear(entry.target, counter);
              return;
          }
          // if the entry has the instant modifier we execute the callback immediately
          // we need to apply this behaviour by default without the modifier
          if (instant) {
              execute(entry.target, self);
          }
          // skip the setTimeout in case the entry is instant
          if (counter.get(entry.target) || instant)
              return;
          setCounter(false, entry.target, self);
      });
  });
  var setInitialParams = function (el, binding) {
      params.callbacks.set(el, binding.arg);
      params.instant.set(el, binding.modifiers.instant);
      params.uniques.set(el, binding.modifiers.unique);
      params.current.set(el, binding.modifiers.current);
      params.debouncers.set(el, uuidv4());
      params.handlers.set(el, binding.value);
  };
  var removeParams = function (el) {
      params.callbacks.delete(el);
      params.instant.delete(el);
      params.uniques.delete(el);
      params.current.delete(el);
      params.debouncers.delete(el);
      params.handlers.delete(el);
      counter.delete(el);
      reverseCounter.delete(el);
      wasIntersecting.delete(el);
  };
  var isIntersecting = {
      bind: function (el, binding) {
          setInitialParams(el, binding);
          observer.observe(el);
      },
      unbind: function (el) {
          removeParams(el);
          observer.unobserve(el);
      },
  };
  var index = {
      install: function (Vue) {
          Vue.directive('is-intersecting', isIntersecting);
      },
  };

  exports.default = index;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
