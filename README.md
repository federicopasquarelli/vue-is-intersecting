# Vue Is Intersecting

<a href="https://vuejs.org/"><img src="https://img.shields.io/badge/vue-2.6-brightgreen"/></a>

Vuejs directive to detect when an element enters into the viewport

view <a href="https://verylazyloading.herokuapp.com/">demo</a>

# Installation

Via npm:

```bash
npm install vue-is-intersecting
```

Via yarn:

```bash
yarn add vue-is-intersecting
```

## Import

```js
import Vue from "vue";
import IsIntersecting from "vue-is-intersecting";

Vue.use(IsIntersecting);
```

# Usage

## CSS Binding

pass data through the modifiers
NB: by default the callback is debounced after 500ms that the binding item enters the viewport, to fire the callback immediately use the instant modifier

```html
<div v-is-intersecting[myData]="myMethod">Hello</div>
```

unique modifier fires the callback only once

```html
<div v-is-intersecting.unique="myMethod">Hello</div>
```

instant modifier fires the callback immediately, no debounce

```html
<div v-is-intersecting.instant="myMethod">Hello</div>
```

curret modifier triggers 2 different callbacks when the element enters or exit the viewport

```html
<div v-is-intersecting.current="[enterMethod, exitMethod]">Hello</div>
```
