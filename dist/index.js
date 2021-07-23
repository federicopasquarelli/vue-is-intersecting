var uuidv4 = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0, v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
});

const counter = new WeakMap();
const reverseCounter = new WeakMap();
const wasIntersecting = new WeakMap();
const params = {
    handlers: new WeakMap(),
    debouncers: new WeakMap(),
    instant: new WeakMap(),
    uniques: new WeakMap(),
    callbacks: new WeakMap(),
    current: new WeakMap(),
};
const clear = (el, counter) => {
    if (!counter.get(el))
        return;
    clearTimeout(counter.get(el));
    counter.delete(el);
};
const unobserve = (target, observer) => {
    observer.unobserve(target);
    clear(target, counter);
};
const execute = (el, self) => {
    const isUnique = params.uniques.get(el);
    const getCallback = params.callbacks.get(el);
    const sendResponse = params.handlers.get(el);
    const current = params.current.get(el);
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
const setCounter = (reverse, target, self) => {
    const setter = reverse ? reverseCounter : counter;
    setter.set(target, setTimeout(() => {
        execute(target, self);
        clear(target, setter);
    }, 500));
};
const observer = new IntersectionObserver((entries, self) => {
    entries.forEach((entry) => {
        const instant = params.instant.get(entry.target);
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
const setInitialParams = (el, binding) => {
    params.callbacks.set(el, binding.arg);
    params.instant.set(el, binding.modifiers.instant);
    params.uniques.set(el, binding.modifiers.unique);
    params.current.set(el, binding.modifiers.current);
    params.debouncers.set(el, uuidv4());
    params.handlers.set(el, binding.value);
};
const removeParams = (el) => {
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
const isIntersecting = {
    bind: function (el, binding) {
        setInitialParams(el, binding);
        observer.observe(el);
    },
    unbind: function (el) {
        removeParams(el);
        observer.unobserve(el);
    },
};
const index = {
    install(Vue) {
        Vue.directive("is-intersecting", isIntersecting);
    },
};

export default index;
