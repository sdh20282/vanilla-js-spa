export default class Component {
  state;
  props;
  target;

  constructor(target, props) {
    this.target = target;
    this.props = props;
    this.setup();
    this.render();
    this.setEvent();
  }

  setup() { }; // state 초기화

  templete() { return `` }; // 렌더링 할 HTML 반환

  componentDidMount() { }; // 렌더링 직후 수행해야 할 로직

  setEvent() { }; // 이벤트 

  render() {
    this.target.innerHTML = this.templete();
    this.componentDidMount();
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render(); // state가 변경되면 재렌더링 수행
  }
}