import reactive from "./Reactivity.js";

export default class Component extends HTMLElement {
  state;
  components;
  props;

  constructor() {
    super();

    this.state = this.state || {};
    this.components = this.components || {};
    this.props = this.props || {};
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  // props를 얻기 위한 함수
  getProps() {
    const props = {};

    for (const attr of this.attributes) {
      props[attr.name] = attr.value;
    }

    return props;
  }

  // custom element가 DOM에 처음 연결될 때 동작
  connectedCallback() {
    this.props = this.getProps();
    this.renderComponent();
  }

  // custom element가 업데이트 될 때 동작
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.props[name] = newValue;
      this.renderComponent();
    }
  }

  // custom element가 DOM에서 제거될 때 동작
  disconnectedCallback() { }

  // stat, props 등을 사용하기 위한 초기화 함수
  init() {
    this.initReactiveProxy();
  }

  // reactivity를 위한 초기화 함수
  initReactiveProxy() {
    this.state = reactive({ target: this.state, callback: this.renderComponent.bind(this) });

    this.renderComponent();
  }

  // component의 html
  render() {
    return ``;
  }

  setEvent() { };

  // render를 위한 함수
  renderComponent() {
    this.shadow.innerHTML = this.render();
    this.setEvent();

    for (const component in this.components) {
      if (!customElements.get(component)) {
        customElements.define(component, this.components[component]);
      }
    }
  }
}