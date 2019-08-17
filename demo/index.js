import { html } from 'lit-html';
import { ArcDemoPage } from '@advanced-rest-client/arc-demo-helper/ArcDemoPage.js';
import '@advanced-rest-client/arc-demo-helper/arc-interactive-demo.js';
import '@anypoint-web-components/anypoint-styles/colors.js';
import '@anypoint-web-components/anypoint-checkbox/anypoint-checkbox.js';
import '../http-method-selector.js';
import '../http-method-selector-mini.js';

class ApiDemo extends ArcDemoPage {
  constructor() {
    super();

    this.initObservableProperties([
      'demoOutlined', 'demoLegacy', 'readOnly', 'miniReadOnly',
      'miniOutlined', 'miniLegacy'
    ]);

    this.componentName = 'http-method-selector';
    this.demoStates = ['Filled', 'Outlined', 'Legacy'];
    this._mainDemoStateHandler = this._mainDemoStateHandler.bind(this);
    this._toggleMainOption = this._toggleMainOption.bind(this);
    this._miniStateHandler = this._miniStateHandler.bind(this);
  }

  _mainDemoStateHandler(e) {
    const state = e.detail.value;
    switch (state) {
      case 0:
        this.demoOutlined = false;
        this.demoLegacy = false;
        break;
      case 1:
        this.demoOutlined = true;
        this.demoLegacy = false;
        break;
      case 2:
        this.demoOutlined = false;
        this.demoLegacy = true;
        break;
    }
  }

  _miniStateHandler(e) {
    const state = e.detail.value;
    switch (state) {
      case 0:
        this.miniOutlined = false;
        this.miniLegacy = false;
        break;
      case 1:
        this.miniOutlined = true;
        this.miniLegacy = false;
        break;
      case 2:
        this.miniOutlined = false;
        this.miniLegacy = true;
        break;
    }
  }

  _toggleMainOption(e) {
    const { name, checked } = e.target;
    this[name] = checked;
  }

  _demoTemplate() {
    const {
      readOnly,
      demoStates,
      darkThemeActive,
      demoOutlined,
      demoLegacy
    } = this;
    return html`<section class="documentation-section">
      <h2>Interactive demo</h2>
      <p>
        This demo lets you preview the HTTP method selector element with various
        configuration options.
      </p>

      <arc-interactive-demo
        .states="${demoStates}"
        @state-chanegd="${this._mainDemoStateHandler}"
        ?dark="${darkThemeActive}"
      >
        <http-method-selector
          slot="content"
          ?readOnly="${readOnly}"
          ?outlined="${demoOutlined}"
          ?legacy="${demoLegacy}"></http-method-selector>

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
      miniLegacy
    } = this;
    return html`<section class="documentation-section">
      <h2>Version "mini"</h2>

      <arc-interactive-demo
        .states="${demoStates}"
        @state-chanegd="${this._miniStateHandler}"
        ?dark="${darkThemeActive}"
      >
        <http-method-selector-mini
          slot="content"
          ?readOnly="${miniReadOnly}"
          ?outlined="${miniOutlined}"
          ?legacy="${miniLegacy}"></http-method-selector-mini>

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
const instance = new ApiDemo();
instance.render();
window.demoInstance = instance;
