import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
// import Button from './components/react-js/ButtonJsx.js';
import { ReactRendererJsx } from './components/ReactRendererJsx.js';
import Button from './components/Button.jsx';
import { createRoot } from 'react-dom/client';

customElements.define('react-renderer-jsx', ReactRendererJsx);

function getReactWithRoot(){
  const root = document.createElement('div');
  const reactRoot = createRoot(root);

  return function react(component) {
    reactRoot.render(component);

    return root
  }
}

const react = getReactWithRoot()

@customElement('my-element')
export class MyElement extends LitElement {
  @property({ type: Number })
  message = 'Hello there';

  @property({ type: String })
  eventDetail?: string;

  render() {
    return html`
      <react-renderer-jsx .element=${(
        <Button message={this.message} />
      )} @custom-click=${(event) => {
      event.stopPropagation();
      this.eventDetail = event.detail;
    }}></react-renderer-jsx>

    ${react(<Button message={this.message} />)}
    
    <button @click=${() =>
      (this.message = 'How are you?')}>Change message</button>

    ${
      this.eventDetail
        ? html`<p>Caught event detail: ${this.eventDetail}</p>`
        : ''
    }
    `;
  }

  static styles = css`
    :host {
      margin: 0 auto;
      text-align: center;
    }

    button {
      border-radius: 8px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      background-color: #1a1a1a;
      cursor: pointer;
      transition: border-color 0.25s;
    }
    button:hover {
      border-color: #646cff;
    }
    button:focus,
    button:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }

    @media (prefers-color-scheme: light) {
      a:hover {
        color: #747bff;
      }
      button {
        background-color: #f9f9f9;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement;
  }
}
