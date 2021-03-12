import { css } from 'lit-element';

export default css`
:host {
  display: inline-flex;
  align-items: center;
  flex-direction: row;
}

:host > * {
  vertical-align: middle;
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

#closeCustom {
  padding: 0;
  width: 24px;
  height: 24px;
}

[hidden] {
  display: none !important;
}

anypoint-listbox {
  box-shadow: var(--anypoint-dropdown-shadow);
}
`;
