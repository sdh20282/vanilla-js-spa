export default class Router {
  $root;
  $routes;

  constructor(routes) {
    this.$root = document.querySelector('#app');
    this.$routes = routes;
    this.initRouter();
  }

  async loadRouter() {
    // 현재 url과 일치하는 경로의 페이지 획득
    // 일치하는 페이지가 없을 경우 404 할당
    const match = this.$routes[location.pathname] ?? this.$routes["/404"];

    // 렌더링 에러 처리
    try {
      // 해당 페이지 클래스 생성 후 render
      customElements.define('single-page-application', (await match()).default);
    } catch (error) {
      // 추후 에러 페이지 작성 후 렌더링할 것
      console.log(error);
    }
  };

  initRouter() {
    // 뒤로가기 하거나 새로고침 했을 때 router도 그 페이지에 맞게 동작하도록 설정
    window.addEventListener("popstate", () => {
      this.loadRouter();
    });

    document.addEventListener("DOMContentLoaded", () => {
      // 클릭 이벤트가 발생했을 때, 해당 target이 data-link 속성을 가지고 있는 경우라면 페이지 이동 함수 실행
      // 별도로 history 설정해주는 함수를 만들어서 반환해서 사용해도 동작하지만 그렇게 할 경우 웹 접근성을 지키기 어렵고,(모든 a 태그의 동작을 막고, 해당 함수로 대체해야 한다.) 관리하기 버겁다고 생각됨
      document.body.addEventListener("click", e => {
        // shadow dom 외부 이벤트 리스너에서 shadow dom 내부의 이벤트 target은 shadow dom 그 자체가 됨
        // 따라서 이벤트 경로를 직접 찾아 해당 속성이 존재하는지 판단
        // shadow dom이 open일 경우에만 가능
        if (e.composedPath()[0].matches("[data-link]")) {
          e.preventDefault();

          history.pushState(null, null, e.target.href);
          this.loadRouter();
        }
      });

      this.loadRouter();
    });
  }
}