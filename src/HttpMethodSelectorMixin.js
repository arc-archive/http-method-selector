/**
@license
Copyright 2018 The Advanced REST client authors <arc@mulesoft.com>
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/

import { html } from 'lit-element';
import { EventsTargetMixin } from '@advanced-rest-client/events-target-mixin';
import '@advanced-rest-client/arc-icons/arc-icon.js';
import '@anypoint-web-components/anypoint-button/anypoint-icon-button.js';
import '@anypoint-web-components/anypoint-input/anypoint-input.js';

/** @typedef {import('lit-element').TemplateResult} TemplateResult */

export const PrimaryOperations = [
  'GET', 'POST', 'PUT', 'DELETE', 'PATCH',
];

export const SecondaryOperations = [
  'HEAD', 'CONNECT', 'OPTIONS', 'TRACE',
];

/**
 * A mixin to share common code between both method selectors.
 *
 * @param {typeof HTMLElement} base
 * @return {*}
 * @mixin
 */
export const HttpMethodSelectorMixin = (base) => class extends EventsTargetMixin(base) {
  static get properties() {
    return {
      /**
       * Currently selected HTTP method.
       */
      method: { type: String },
      /**
       * True if the request for selected HTTP method can carry a payload. It
       * is defined in HTTP spec.
       */
      _isPayload: { type: Boolean },
      /**
       * Set to true when the user opens the dropdown menu
       */
      methodMenuOpened: { type: Boolean },
      /**
       * When set it allows to render a custom method selector
       */
      renderCustom: { type: Boolean },
      /**
       * When set the editor is in read only mode.
       */
      readOnly: { type: Boolean },
      /**
       * Enables outlined theme.
       */
      outlined: { type: Boolean, reflect: true },
      /**
       * Enables compatibility with Anypoint components.
       */
      compatibility: { type: Boolean, reflect: true },
      /**
       * @deprecated Use `compatibility` instead
       */
      legacy: { type: Boolean },
      /**
       * Makes the dropdown label to be hidden when has a value.
       */
      noLabelFloat: { type: Boolean }
    };
  }

  get legacy() {
    return this.compatibility;
  }

  set legacy(value) {
    this.compatibility = value;
  }

  get method() {
    return this._method;
  }

  set method(value) {
    const old = this._method;
    /* istanbul ignore if */
    if (old === value) {
      return;
    }
    this._method = value;
    // @ts-ignore
    if (this.requestUpdate) {
      // @ts-ignore
      this.requestUpdate('method', old);
    }
    this._methodChanged(value);
    this._isPayload = this._computeIsPayload(value);
    this._dropdownMenuOpened(this.methodMenuOpened, value);
    this.dispatchEvent(new CustomEvent('method-changed', {
      detail: {
        value
      }
    }));
  }

  get isPayload() {
    return this._isPayload;
  }

  get _isPayload() {
    return this.__isPayload;
  }

  set _isPayload(value) {
    const old = this.__isPayload;
    /* istanbul ignore if */
    if (old === value) {
      return;
    }
    this.__isPayload = value;
    // @ts-ignore
    if (this.requestUpdate) {
      // @ts-ignore
      this.requestUpdate('_isPayload', old);
    }
    this._onIsPayloadChanged(value);
    this.dispatchEvent(new CustomEvent('ispayload-changed', {
      detail: {
        value
      }
    }));
  }

  get renderCustom() {
    return this._renderCustom;
  }

  set renderCustom(value) {
    const old = this._renderCustom;
    /* istanbul ignore if */
    if (old === value) {
      return;
    }
    this._renderCustom = value;
    // @ts-ignore
    if (this.requestUpdate) {
      // @ts-ignore
      this.requestUpdate('renderCustom', old);
    }
    this.dispatchEvent(new CustomEvent('rendercustom-changed', {
      detail: {
        value
      }
    }));
  }

  get methodMenuOpened() {
    return this._methodMenuOpened;
  }

  set methodMenuOpened(value) {
    const old = this._methodMenuOpened;
    /* istanbul ignore if */
    if (old === value) {
      return;
    }
    this._methodMenuOpened = value;
    // @ts-ignore
    if (this.requestUpdate) {
      // @ts-ignore
      this.requestUpdate('methodMenuOpened', old);
    }
    this._dropdownMenuOpened(value, this.method);
  }

  /**
   * @return {EventListener} Previously registered handler for `method-changed` event
   */
  get onmethod() {
    return this['_onmethod-changed'];
  }

  /**
   * Registers a callback function for `method-changed` event
   * @param {EventListener} value A callback to register. Pass `null` or `undefined`
   * to clear the listener.
   */
  set onmethod(value) {
    this._registerCallback('method-changed', value);
  }

  /**
   * @return {EventListener} Previously registered handler for `ispayload-changed` event
   */
  get onispayload() {
    return this['_onispayload-changed'];
  }

  /**
   * Registers a callback function for `ispayload-changed` event
   * @param {EventListener} value A callback to register. Pass `null` or `undefined`
   * to clear the listener.
   */
  set onispayload(value) {
    this._registerCallback('ispayload-changed', value);
  }

  constructor() {
    super();
    this._isPayloadStatusHandler = this._isPayloadStatusHandler.bind(this);
    this._methodChangedHandler = this._methodChangedHandler.bind(this);

    this.method = 'GET';
    this._isPayload = false;
    this.methodMenuOpened = false;
    this.renderCustom = false;
    this.compatibility = false;
    this.outlined = false;
    this.readOnly = false;
    this.noLabelFloat = false;
  }

  get standardMethods() {
    return [
      'get', 'post', 'put', 'delete', 'patch', 'head', 'connect',
      'options', 'trace'
    ];
  }

  get inputElement() {
    return this.shadowRoot && this.shadowRoot.querySelector('anypoint-input');
  }

  /**
   * Registers an event handler for given type
   * @param {string} eventType Event type (name)
   * @param {EventListener} value The handler to register
   */
  _registerCallback(eventType, value) {
    const key = `_on${eventType}`;
    if (this[key]) {
      this.removeEventListener(eventType, this[key]);
    }
    if (typeof value !== 'function') {
      this[key] = null;
      return;
    }
    this[key] = value;
    this.addEventListener(eventType, value);
  }

  /**
   * @param {EventTarget} node 
   */
  _attachListeners(node) {
    super._attachListeners(node);
    node.addEventListener('request-is-payload-status', this._isPayloadStatusHandler);
    node.addEventListener('request-method-changed', this._methodChangedHandler);
  }

  /**
   * @param {EventTarget} node 
   */
  _detachListeners(node) {
    super._detachListeners(node);
    node.removeEventListener('request-is-payload-status', this._isPayloadStatusHandler);
    node.removeEventListener('request-method-changed', this._methodChangedHandler);
  }

  /**
   * Computes if the payload can carry a payload.
   * @param {string} method 
   * @returns {boolean}
   */
  _computeIsPayload(method) {
    return !['GET', 'HEAD'].includes(method);
  }

  /**
   * Handler for `isPayload` property change.
   * @param {Boolean} value
   */
  _onIsPayloadChanged(value) {
    if (value === undefined) {
      return;
    }
    this.dispatchEvent(new CustomEvent('request-is-payload-changed', {
      cancelable: true,
      bubbles: true,
      composed: true,
      detail: {
        value
      }
    }));
  }

  /**
   * Handler for `method` property change.
   * @param {string=} method
   */
  _methodChanged(method) {
    if (method === undefined || this.__cancelMethodEvent) {
      return;
    }
    if (method && !this.renderCustom) {
      let m = String(method).toLowerCase();
      m = m.trim();
      if (m) {
        if (this.standardMethods.indexOf(m) === -1) {
          this.renderCustom = true;
        }
      }
    }
    this.dispatchEvent(new CustomEvent('request-method-changed', {
      cancelable: true,
      bubbles: true,
      composed: true,
      detail: {
        value: method
      }
    }));
  }

  /**
   * Responds to an event requesting status check for `isPayload` property by setting the `value`
   * property on the event and canceling the event.
   *
   * @param {CustomEvent} e
   */
  _isPayloadStatusHandler(e) {
    if (e.defaultPrevented) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    e.detail.value = this._isPayload;
  }

  /**
   * If the event source is not this element it will update the method value.
   *
   * @param {CustomEvent} e
   */
  _methodChangedHandler(e) {
    const node = /** @type HTMLElement */ (e.target)
    if (node === this) {
      return;
    }
    this.__cancelMethodEvent = true;
    this.method = e.detail.value;
    this.__cancelMethodEvent = undefined;

    setTimeout(() => this.validateCustom());
  }

  validateCustom() {
    const node = this.inputElement;
    if (node) {
      return node.validate();
    }
    return true;
  }

  closeCustom() {
    this.renderCustom = false;
    this.method = 'GET';
  }

  /**
   * Checks if there is an empty method name and if it is it will set `renderCustom` property
   * that controls rendering of a custom method input.
   *
   * @param {Boolean} opened
   * @param {String} method
   */
  _dropdownMenuOpened(opened, method) {
    if (!opened && method === '' && !this.renderCustom) {
      this.renderCustom = true;
      setTimeout(() => {
        const node = this.inputElement;
        if (node) {
          node.focus();
        }
      });
    }
  }

  /**
   * @param {CustomEvent} e 
   */
  _openedHandler(e) {
    this.methodMenuOpened = e.detail.value;
  }

  /**
   * @param {CustomEvent} e 
   */
  _methodHandler(e) {
    this.method = e.detail.value;
  }

  /**
   * @returns {TemplateResult|string} The template for the custom input element.
   */
  _customInputTemplate() {
    const {
      method,
      compatibility,
      outlined,
      readOnly,
      renderCustom,
      noLabelFloat
    } = this;
    if (!renderCustom) {
      return '';
    }
    return html`
    <anypoint-input
      class="custom-name"
      required
      autoValidate
      .value="${method}"
      @value-changed="${this._methodHandler}"
      ?disabled="${readOnly}"
      ?nolabelfloat="${noLabelFloat}"
      ?readonly="${readOnly}"
      ?compatibility="${compatibility}"
      ?outlined="${outlined}"
    >
      <label slot="label">Method</label>
      <anypoint-icon-button
        aria-label="Activate to clear and close custom editor"
        title="Clear and close custom editor"
        slot="suffix"
        @click="${this.closeCustom}"
      >
        <arc-icon icon="close"></arc-icon>
      </anypoint-icon-button>
    </anypoint-input>
    `;
  }
};
