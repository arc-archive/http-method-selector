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
import { TemplateResult, CSSResult , LitElement } from 'lit-element';
import { EventsTargetMixin } from '@advanced-rest-client/events-target-mixin';
import { HttpMethodSelectorMixin } from './HttpMethodSelectorMixin';

/**
 * A HTTP method selector in a dropdown list of predefined HTTP methods.
 *
 * ### Example
 *
 * ```html
 * <http-method-selector-mini></http-method-selector-mini>
 * ```
 */
export class HttpMethodSelectorMiniElement extends HttpMethodSelectorMixin(EventsTargetMixin(LitElement)) {
  get styles(): CSSResult;

  render(): TemplateResult;

  /**
   * @returns The template for the dropdown element
   */
  _dropdownTemplate(): TemplateResult|string;

  /**
   * @returns The template for the dropdown options
   */
  _optionsTemplate(): TemplateResult|string;
}
