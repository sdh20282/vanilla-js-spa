export default class Router {
  $root;
  $routes;

  constructor(routes) {
    this.$root = document.querySelector('#app');
    this.$routes = routes;

    this.initRouter();
  }

  async loadRouter() {
    const matchClass = this.$routes[location.pathname] ?? this.$routes["/404"];

    try {
      const componentName = 'single-page-application' + location.pathname.replace(/\//g, '-');
      const componentClass = (await matchClass()).default;

      if (!customElements.get(componentName)) {
        customElements.define(componentName, componentClass);
      }

      this.$root.innerHTML = `<${componentName}></${componentName}>`;
    } catch (error) {
      console.log(error);
    }
  };

  initRouter() {
    window.addEventListener("popstate", () => {
      this.loadRouter();
    });

    document.addEventListener("DOMContentLoaded", () => {
      document.body.addEventListener("click", e => {
        if (e.target.tagName === "A") {
          e.preventDefault();

          history.pushState(null, null, e.target.href);
          this.loadRouter();
        }
      });

      this.loadRouter();
    });
  }
}