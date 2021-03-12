import { TemplateResult, CSSResult, LitElement } from 'lit-element';
import { HttpMethodSelectorMixin } from './HttpMethodSelectorMixin.js';

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
  get styles(): CSSResult;

  _radioSelection(e: CustomEvent): void;

  render(): TemplateResult;

  /**
   * @returns The template for the primary operations selector
   */
  _mainOperationsSelectorTemplate(): TemplateResult;

  /**
   * @returns The template for the less used operations dropdown 
   */
  _secondaryOperationsSelectorTemplate(): TemplateResult;

  /**
   * @returns The template for the custom input element.
   */
  _customTemplate(): TemplateResult|string;
}
