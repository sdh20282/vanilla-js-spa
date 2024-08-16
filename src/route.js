// import Dashboard from "./pages/dashboard/Dashboard.js";
// import Post from "./pages/post/Post.js";
// import Setting from "./pages/setting/Setting.js";
// import NotFound from "./pages/notfound/NotFound.js";

// export const routes = {
//   "/": Dashboard,
//   "/posts": Post,
//   "/settings": Setting,
//   "/404": NotFound,
// };

export const routes = {
  "/": () => import("./pages/dashboard/Dashboard.js"),
  "/posts": () => import("./pages/post/Post.js"),
  "/settings": () => import("./pages/setting/Setting.js"),
  "/404": () => import("./pages/notfound/NotFound.js"),
};