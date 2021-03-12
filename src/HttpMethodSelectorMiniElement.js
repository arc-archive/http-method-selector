/**
@license
Copyright 2017 The Advanced REST client authors <arc@mulesoft.com>
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
import { html, LitElement } from 'lit-element';
import '@anypoint-web-components/anypoint-dropdown-menu/anypoint-dropdown-menu.js';
import '@anypoint-web-components/anypoint-listbox/anypoint-listbox.js';
import '@anypoint-web-components/anypoint-item/anypoint-item.js';
import { HttpMethodSelectorMixin, PrimaryOperations, SecondaryOperations } from './HttpMethodSelectorMixin.js';
import elementStyles from './styles/Mini.js';

/** @typedef {import('lit-element').TemplateResult} TemplateResult */

const allOperations = PrimaryOperations.concat(SecondaryOperations);

/**
 * A HTTP method selector in a dropdown list of predefined HTTP methods.
 *
 * ### Example
 *
 * ```html
 * <http-method-selector-mini></http-method-selector-mini>
 * ```
 */
export class HttpMethodSelectorMiniElement extends HttpMethodSelectorMixin(LitElement) {
  get styles() {
    return elementStyles;
  }

  /**
   * @returns {TemplateResult}
   */
  render() {
    return html`<style>${this.styles}</style>
    ${this._customInputTemplate()}
    ${this._dropdownTemplate()}
    `;
  }

  /**
   * @returns {TemplateResult|string} The template for the dropdown element
   */
  _dropdownTemplate() {
    const {
      method,
      compatibility,
      outlined,
      readOnly,
      renderCustom,
      noLabelFloat,
      methodMenuOpened,
    } = this;
    if (renderCustom) {
      return '';
    }
    return html`
    <anypoint-dropdown-menu
      ?opened="${methodMenuOpened}"
      ?hidden="${renderCustom}"
      ?compatibility="${compatibility}"
      ?outlined="${outlined}"
      ?disabled="${readOnly}"
      ?nolabelfloat="${noLabelFloat}"
      @opened-changed="${this._openedHandler}"
    >
      <label slot="label">Method</label>
      <anypoint-listbox
        slot="dropdown-content"
        .selected="${method}"
        attrforselected="data-method"
        @selected-changed="${this._methodHandler}"
      >
        ${this._optionsTemplate()}
      </anypoint-listbox>
    </anypoint-dropdown-menu>
    `;
  }

  /**
   * @returns {TemplateResult|string} The template for the dropdown options
   */
  _optionsTemplate() {
    const { compatibility } = this;
    return html`
    ${allOperations.map((operation) => html`<anypoint-item ?compatibility="${compatibility}" data-method="${operation}">${operation}</anypoint-item>`)}
    <anypoint-item ?compatibility="${compatibility}" data-method="">custom</anypoint-item>
    `;
  }
}
