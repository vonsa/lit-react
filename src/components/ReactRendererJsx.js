import { LitElement, html } from 'lit';
import { createRoot } from 'react-dom/client';

export class ReactRendererJsx extends LitElement {
  static get properties() {
    return {
      element: {
        type: Object,
      },
      _reactElement: {
        type: Object,
      },
    };
  }

  get container() {
    return this.shadowRoot.querySelector('.container');
  }

  update(changedProperties) {
    super.update(changedProperties);

    if (this._root) {
      this.renderReact();
    }
  }

  firstUpdated() {
    this._root = createRoot(this.container);
    this.renderReact();
  }

  renderReact() {
    this._root.render(this.element);
  }

  render() {
    return html`<div class="container"></div>`;
  }
}
