import { AnypointInput } from "@anypoint-web-components/anypoint-input";
import { EventsTargetMixin, EventsTargetMixinConstructor } from '@advanced-rest-client/events-target-mixin';
import { TemplateResult } from "lit-html";

export { HttpMethodSelectorMixin };

declare function HttpMethodSelectorMixin<T extends new (...args: any[]) => {}>(base: T): T & HttpMethodSelectorMixinConstructor & EventsTargetMixinConstructor;

interface HttpMethodSelectorMixinConstructor {
  new(...args: any[]): HttpMethodSelectorMixin;
}

export { HttpMethodSelectorMixinConstructor };

export const PrimaryOperations: string[];
export const SecondaryOperations: string[];

/**
 * @fires method-changed
 * @fires ispayload-changed
 * @fires rendercustom-changed
 * @fires request-is-payload-changed
 * @fires request-method-changed
 */
interface HttpMethodSelectorMixin extends EventsTargetMixin {
  /**
   * Currently selected HTTP method.
   * @attribute
   */
  method: string;
  /**
   * True if the request for selected HTTP method can carry a payload. It
   * is defined in HTTP spec.
   */
  _isPayload: boolean;
  /**
   * Set to true when the user opens the dropdown menu
   * @attribute
   */
  methodMenuOpened: boolean;
  /**
   * When set it allows to render a custom method selector
   * @attribute
   */
  renderCustom: boolean;
  /**
   * When set the editor is in read only mode.
   * @attribute
   */
  readOnly: boolean;
  /**
   * Enables outlined theme.
   * @attribute
   */
  outlined: boolean;
  /**
   * Enables compatibility with Anypoint components.
   * @attribute
   */
  compatibility: boolean;
  /**
   * @deprecated Use `compatibility` instead
   * @attribute
   */
  legacy: boolean;
  /**
   * Makes the dropdown label to be hidden when has a value.
   * @attribute
   */
  noLabelFloat: boolean;

  readonly isPayload: boolean;

  /**
   * Registers a callback function for `method-changed` event
   */
  onmethod: EventListener;
  /**
   * Registers a callback function for `ispayload-changed` event
   */
  onispayload: EventListener;

  readonly standardMethods: string[];
  readonly inputElement: AnypointInput;

  /**
   * Registers an event handler for given type
   * @param eventType Event type (name)
   * @param value The handler to register
   */
  _registerCallback(eventType: string, value: EventListener): void;

  _attachListeners(node: EventTarget): void;

  _detachListeners(node: EventTarget): void;

  /**
   * Computes if the payload can carry a payload.
   */
  _computeIsPayload(method: string): boolean;

  /**
   * Handler for `isPayload` property change.
   */
  _onIsPayloadChanged(value: boolean): void;

  /**
   * Handler for `method` property change.
   */
  _methodChanged(method?: string): void;

  /**
   * Responds to an event requesting status check for `isPayload` property by setting the `value`
   * property on the event and canceling the event.
   */
  _isPayloadStatusHandler(e: CustomEvent): void;

  /**
   * If the event source is not this element it will update the method value.
   */
  _methodChangedHandler(e: CustomEvent): void;

  validateCustom(): boolean;

  closeCustom(): void;

  /**
   * Checks if there is an empty method name and if it is it will set `renderCustom` property
   * that controls rendering of a custom method input.
   */
  _dropdownMenuOpened(opened: boolean, method: string): void;

  _openedHandler(e: CustomEvent): void;

  _methodHandler(e: CustomEvent): void;

  /**
   * @returns The template for the custom input element.
   */
  _customInputTemplate(): TemplateResult|string;
}
