import { css } from 'lit-element';

export default css`
:host {
  display: block;
}

anypoint-dropdown-menu,
anypoint-input {
  margin: 12px 8px;
}

anypoint-dropdown-menu {
  width: var(--http-method-selector-mini-dropdown-width, 100px);
}

.custom-name {
  width: var(--http-method-selector-mini-input-width, 100px);
}

[hidden] {
  display: none !important;
}

anypoint-listbox {
  box-shadow: var(--anypoint-dropdown-shadow);
}
`;
