import reactive from "./Reactivity.js";

const events = ["click"];

export default class Component extends HTMLElement {
  state;
  components;
  props;
  eventHandler
  renderRaf;

  constructor() {
    super();

    this.state = this.state || {};
    this.components = this.components || {};
    this.props = this.props || {};
    this.eventHandler = this.eventHandler || {};
  }

  _getProps() {
    const props = {};

    for (const attr of this.attributes) {
      props[attr.name] = attr.value;
    }

    return props;
  }

  _initReactiveProxy() {
    this.state = reactive({ target: this.state, callback: this._updateComponent.bind(this) });
  }

  _addEvent() {
    for (const event of events) {
      this.eventHandler[event] = e => {
        const target = e.target;
        const handlerName = target.getAttribute(event);

        if (handlerName && this[handlerName]) {
          this[handlerName]();
        }
      };

      this.addEventListener(event, this.eventHandler[event]);
    }
  }

  _removeEvent() {
    for (const event of events) {
      if (this.eventHandler[event]) {
        this.removeEventListener(event, this.eventHandler[event]);
        this.eventHandler[event] = null;
      }
    }
  }

  _updateComponent() {
    if (this.renderRaf) {
      cancelAnimationFrame(this.renderRaf);
    }

    this.renderRaf = requestAnimationFrame(() => {
      this.beforeUpdate();
      this._renderComponent();
      this.updated();

      this.renderRaf = null;
    });
  }

  _renderComponent() {
    this._removeEvent();
    this.innerHTML = this.render();
    this._addEvent();

    for (const component in this.components) {
      if (!customElements.get(component)) {
        customElements.define(component, this.components[component]);
      }
    }
  }

  init() {
    this.beforeMount();
    this._initReactiveProxy();
    this.props = this._getProps();
    this._renderComponent();
    this.mounted();
  }

  beforeMount() { }

  mounted() { }

  beforeUpdate() { }

  updated() { }

  render() { return ``; }
}