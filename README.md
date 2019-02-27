[![Published on NPM](https://img.shields.io/npm/v/@advanced-rest-client/http-method-selector.svg)](https://www.npmjs.com/package/@advanced-rest-client/http-method-selector)

[![Build Status](https://travis-ci.org/advanced-rest-client/http-method-selector.svg?branch=stage)](https://travis-ci.org/advanced-rest-client/http-method-selector)

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/advanced-rest-client/http-method-selector)

## &lt;http-method-selector&gt;

A HTTP method selector. Displays list of radio buttons with common
http methods and a dropdown with less common but still valid methods.

```html
<http-method-selector method="POST" is-payload></http-method-selector>
<http-method-selector-mini method="PUT" is-payload></http-method-selector-mini>
```

### API components

This components is a part of [API components ecosystem](https://elements.advancedrestclient.com/)

## Usage

### Installation
```
npm install --save @advanced-rest-client/http-method-selector
```

### In an html file

```html
<html>
  <head>
    <script type="module">
      import '@advanced-rest-client/http-method-selector/http-method-selector.js';
      import '@advanced-rest-client/http-method-selector/http-method-selector-mini.js';
    </script>
  </head>
  <body>
    <http-method-selector method="POST" is-payload></http-method-selector>
    <http-method-selector-mini method="PUT" is-payload></http-method-selector-mini>
  </body>
</html>
```

### In a Polymer 3 element

```js
import {PolymerElement, html} from '@polymer/polymer';
import '@advanced-rest-client/http-method-selector/http-method-selector.js';
import '@advanced-rest-client/http-method-selector/http-method-selector-mini.js';

class SampleElement extends PolymerElement {
  static get template() {
    return html`<http-method-selector method="POST" is-payload></http-method-selector>
    <http-method-selector-mini method="PUT" is-payload></http-method-selector-mini>`;
  }
}
customElements.define('sample-element', SampleElement);
```

### Installation

```sh
git clone https://github.com/advanced-rest-client/http-method-selector
cd api-url-editor
npm install
npm install -g polymer-cli
```

### Running the demo locally

```sh
polymer serve --npm
open http://127.0.0.1:<port>/demo/
```

### Running the tests
```sh
polymer test --npm
```
