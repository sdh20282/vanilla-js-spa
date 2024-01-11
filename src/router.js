const navigateTo = (url) => {
  history.pushState(null, null, url);

  router();
}

const router = async () => {
  // lazy loading 적용
  const routes = [
    { path: "/", page: () => import("./pages/dashboard/Dashboard.js") },
    { path: "/posts", page: () => import("./pages/post/Post.js") },
    { path: "/settings", page: () => import("./pages/setting/Setting.js") },
    { path: "/404", page: () => import("./pages/notfound/NotFound.js") },
  ];

  // 현재 url과 일치하는 경로의 페이지 획득
  let match = routes.find((route) => route.path === location.pathname);

  // 일치하는 페이지가 없을 경우 404 할당
  if (!match) {
    match = routes[routes.length - 1];
  }

  // 렌더링 에러 처리
  try {
    // 해당 페이지 클래스 생성 후 render
    document.querySelector('#app').innerHTML = await (new (await match.page()).default).render();
  } catch (error) {
    // 추후 에러 페이지 작성 후 렌더링할 것
    console.log(error);
  }
};

const initRouter = () => {
  // 뒤로가기 하거나 새로고침 했을 때 router도 그 페이지에 맞게 동작하도록 설정
  window.addEventListener("popstate", () => {
    router();
  });

  document.addEventListener("DOMContentLoaded", () => {
    // 클릭 이벤트가 발생했을 때, 해당 target이 data-link 속성을 가지고 있는 경우라면 페이지 이동 함수 실행
    // 별도로 history 설정해주는 함수를 만들어서 반환해서 사용해도 동작하지만 그렇게 할 경우 웹 접근성을 지키기 어렵고,(모든 a 태그의 동작을 막고, 해당 함수로 대체해야 한다.) 관리하기 버겁다고 생각됨
    document.body.addEventListener("click", e => {
      if (e.target.matches("[data-link]")) {
        e.preventDefault();

        navigateTo(e.target.href);
      }
    });

    router();
  });
}

export default initRouter;