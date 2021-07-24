# Vue Is Intersecting

<a href="https://vuejs.org/"><img src="https://img.shields.io/badge/vue-2.6-brightgreen"/></a>

Vuejs directive to detect when an element enters into the viewport using the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API">intersection observer api</a>

## Installation

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

## Usage

pass the method that you want to use as a callback when the html element enters in the viewport<br />
NB: by default the callback is debounced after 500ms that the element bind enters the viewport, to execute the callback immediately use the instant modifier.

```html
<div v-is-intersecting[myData]="myMethod">Hello</div>
```

unique modifier executes the callback only once

```html
<div v-is-intersecting.unique="myMethod">Hello</div>
```

instant modifier executes the callback immediately, no debounce

```html
<div v-is-intersecting.instant="myMethod">Hello</div>
```

current modifier executes two different callbacks when the element enters or exit the viewport

```html
<div v-is-intersecting.current="[enterMethod, exitMethod]">Hello</div>
```
