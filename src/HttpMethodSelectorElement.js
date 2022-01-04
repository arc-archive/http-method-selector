/**
@license
Copyright 2016 The Advanced REST client authors <arc@mulesoft.com>
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
import '@anypoint-web-components/anypoint-radio-button/anypoint-radio-group.js';
import '@anypoint-web-components/anypoint-radio-button/anypoint-radio-button.js';
import '@anypoint-web-components/anypoint-dropdown-menu/anypoint-dropdown-menu.js';
import '@anypoint-web-components/anypoint-listbox/anypoint-listbox.js';
import '@anypoint-web-components/anypoint-item/anypoint-item.js';
import { HttpMethodSelectorMixin, PrimaryOperations, SecondaryOperations } from './HttpMethodSelectorMixin.js';
import elementStyles from './styles/Selector.js';

/** @typedef {import('lit-element').TemplateResult} TemplateResult */

/**
 * A HTTP method selector.
 *
 * Displays list of radio buttons with common
 * http methods and a dropdown with less common but still valid methods.
 *
 * User can define his own methods whe selects "custom" option in the dropdown menu.
 * Because of this the element do not support validation of any kind and hosting
 * application should provide one if required.
 */
export class HttpMethodSelectorElement extends HttpMethodSelectorMixin(LitElement) {
  get styles() {
    return elementStyles;
  }

  _radioSelection(e) {
    this.method = e.target.selected;
  }

  render() {
    return html`<style>${this.styles}</style>
    ${this._mainOperationsSelectorTemplate()}
    ${this._secondaryOperationsSelectorTemplate()}    
    ${this._customInputTemplate()}
    `;
  }

  /**
   * @returns {TemplateResult} The template for the primary operations selector
   */
  _mainOperationsSelectorTemplate() {
    const { method, readOnly } = this;
    return html`
    <anypoint-radio-group
      .selected="${method}"
      @selected="${this._radioSelection}"
      ?disabled="${readOnly}"
      attrforselected="name"
      aria-label="Select one of predefined HTTP methods"
    >
      ${PrimaryOperations.map((op) => html`<anypoint-radio-button ?disabled="${readOnly}" name="${op}">${op}</anypoint-radio-button>`)}
    </anypoint-radio-group>
    `;
  }

  /**
   * @returns {TemplateResult} The template for the less used operations dropdown 
   */
  _secondaryOperationsSelectorTemplate() {
    const { method, readOnly, compatibility, outlined, methodMenuOpened, renderCustom, noLabelFloat } = this;
    return html`
    <anypoint-dropdown-menu
      ?opened="${methodMenuOpened}"
      ?hidden="${renderCustom}"
      ?compatibility="${compatibility}"
      ?outlined="${outlined}"
      ?disabled="${readOnly}"
      ?nolabelfloat="${noLabelFloat}"
      aria-label="Select one of predefined other HTTP methods. Select custom to set custom method"
      @opened-changed="${this._openedHandler}"
    >
      <label slot="label">Other</label>
      <anypoint-listbox
        slot="dropdown-content"
        .selected="${method}"
        attrforselected="data-method"
        @selected-changed="${this._methodHandler}"
      >
      ${SecondaryOperations.map((op) => html`<anypoint-item ?compatibility="${compatibility}" data-method="${op}">${op}</anypoint-item>`)}
        <anypoint-item ?compatibility="${compatibility}" data-method="">custom</anypoint-item>
      </anypoint-listbox>
    </anypoint-dropdown-menu>
    `;
  }
}
