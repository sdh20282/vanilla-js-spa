import Router from "./router.js";

// lazy loading 적용
const routes = {
  "/": () => import("./pages/dashboard/Dashboard.js"),
  "/posts": () => import("./pages/post/Post.js"),
  "/settings": () => import("./pages/setting/Setting.js"),
  "/404": () => import("./pages/notfound/NotFound.js"),
};

// initRouter();
const router = new Router(routes);