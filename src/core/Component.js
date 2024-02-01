import reactive from "./Reactivity.js";

const events = ["click"];

export default class Component extends HTMLElement {
  // 상태
  state;

  // 하위 컴포넌트
  components;

  // 상위 컴포넌트로부터 전달된 props
  props;

  // 이벤트 핸들러에 대한 참조
  eventHandler;

  constructor() {
    super();

    this.state = this.state || {};
    this.components = this.components || {};
    this.props = this.props || {};
    this.eventHandler = this.eventHandler || {};

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

  // 이벤트를 위한 함수
  // 이벤트 위임을 통해 이벤트 처리
  addEvent() {
    for (const event of events) {
      this.eventHandler[event] = e => {
        const target = e.target;
        const handlerName = target.getAttribute(event);

        if (handlerName && this[handlerName]) {
          this[handlerName]();
        }
      };

      this.shadowRoot.addEventListener(event, this.eventHandler[event]);
    }
  }

  // 이벤트 제거를 위한 함수
  removeEvent() {
    for (const event of events) {
      if (this.eventHandler[event]) {
        this.shadowRoot.removeEventListener(event, this.eventHandler[event]);
        this.eventHandler[event] = null;
      }
    }
  }

  // render를 위한 함수
  renderComponent() {
    // 예약된 렌더링이 있으면 취소
    if (this.renderRaf) {
      cancelAnimationFrame(this.renderRaf);
    }

    // 다음 repaint 직전에 렌더링 수행을 예약
    this.renderRaf = requestAnimationFrame(() => {
      this.removeEvent();
      this.shadow.innerHTML = this.render();
      this.addEvent();


      for (const component in this.components) {
        if (!customElements.get(component)) {
          customElements.define(component, this.components[component]);
        }
      }

      // 렌더링 완료 후 예약 ID 초기화
      this.renderRaf = null;
    });
  }
}