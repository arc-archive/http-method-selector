import { html } from 'lit-html';
import { DemoPage } from '@advanced-rest-client/arc-demo-helper';
import '@advanced-rest-client/arc-demo-helper/arc-interactive-demo.js';
import '@anypoint-web-components/anypoint-styles/colors.js';
import '@anypoint-web-components/anypoint-checkbox/anypoint-checkbox.js';
import '../http-method-selector.js';
import '../http-method-selector-mini.js';

class ComponentDemo extends DemoPage {
  constructor() {
    super();

    this.initObservableProperties([
      'demoOutlined', 'demoCompatibility', 'readOnly', 'miniReadOnly',
      'miniOutlined', 'miniCompatibility'
    ]);

    this.componentName = 'http-method-selector';
    this.demoStates = ['Filled', 'Outlined', 'Anypoint'];
    this.readOnly = false;
    this.miniReadOnly = false;
    this.miniOutlined = false;
    this.miniCompatibility = false;
    this.renderViewControls = true;

    this._mainDemoStateHandler = this._mainDemoStateHandler.bind(this);
    this._toggleMainOption = this._toggleMainOption.bind(this);
    this._miniStateHandler = this._miniStateHandler.bind(this);
  }

  _mainDemoStateHandler(e) {
    const state = e.detail.value;
    this.demoOutlined = state === 1;
    this.demoCompatibility = state === 2;
    this._updateCompatibility();
  }

  _miniStateHandler(e) {
    const state = e.detail.value;
    this.miniOutlined = state === 1;
    this.miniCompatibility = state === 2;
  }

  _demoTemplate() {
    const {
      readOnly,
      demoStates,
      darkThemeActive,
      demoOutlined,
      demoCompatibility
    } = this;
    return html`<section class="documentation-section">
      <h2>Interactive demo</h2>
      <p>
        This demo lets you preview the HTTP method selector element with various
        configuration options.
      </p>

      <arc-interactive-demo
        .states="${demoStates}"
        @state-changed="${this._mainDemoStateHandler}"
        ?dark="${darkThemeActive}"
      >
        <http-method-selector
          slot="content"
          ?readOnly="${readOnly}"
          ?outlined="${demoOutlined}"
          ?compatibility="${demoCompatibility}"></http-method-selector>

        <label slot="options" id="mainOptionsLabel">Options</label>
        <anypoint-checkbox
          aria-describedby="mainOptionsLabel"
          slot="options"
          name="readOnly"
          @change="${this._toggleMainOption}"
          >Read only</anypoint-checkbox
        >
      </arc-interactive-demo>
    </section>`;
  }

  _miniTemplate() {
    const {
      miniReadOnly,
      demoStates,
      darkThemeActive,
      miniOutlined,
      miniCompatibility
    } = this;
    return html`<section class="documentation-section">
      <h2>Version "mini"</h2>

      <arc-interactive-demo
        .states="${demoStates}"
        @state-changed="${this._miniStateHandler}"
        ?dark="${darkThemeActive}"
      >
        <http-method-selector-mini
          slot="content"
          ?readOnly="${miniReadOnly}"
          ?outlined="${miniOutlined}"
          ?compatibility="${miniCompatibility}"></http-method-selector-mini>

        <label slot="options" id="mainOptionsLabel">Options</label>
        <anypoint-checkbox
          aria-describedby="mainOptionsLabel"
          slot="options"
          name="miniReadOnly"
          @change="${this._toggleMainOption}"
          >Read only</anypoint-checkbox
        >
      </arc-interactive-demo>
    </section>`;
  }

  contentTemplate() {
    return html`
      ${this._demoTemplate()}
      ${this._miniTemplate()}
    `;
  }
}
const instance = new ComponentDemo();
instance.render();
