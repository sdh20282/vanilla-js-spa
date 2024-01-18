### sdh20282's SPA Framework 기록

---
### 23.01.07
프로젝트 초기 설정 및 SPA 라우터 구현
- express 활용
  - 기존에 클라이언트 사이드에서 해당 작업이 전부 이루어지도록 구현한 경험이 있음
  - 클라이언트 사이드에서만 처리할 경우 새로고침이나 url 직접 조작 시 이러한 부분을 처리해주지 못함 -> 브라우저에서는 해당 url로 get 메서드를 날려버리기 때문
  - 따라서 간단한 서버에서 미들웨어를 통해 이러한 작업을 처리
- a 태그일 경우에만 라우팅 시도
  - 기존 경험에서는 라우팅을 위한 함수를 작성하고, a 태그를 사용할 때 a 태그의 동작을 막고, 해당 함수를 호출
  - 은근히 불편하다고 판단하여 방식 변경, 이벤트 버블링을 통해 a 태그일 경우에만 시도

---
### 23.01.08
라우팅 조건 변경
- 데이터 속성이 지정되어 있을 경우에만 라우팅 시도
  - a 태그일 경우에 모두 라우팅을 시도할 경우 외부 링크로 이동해야 하는 경우에도 막힘
  - 기존의 방법을 유지하며 외부 링크를 위한 a 태그에는 버블링을 막아주어야 함, 관리하기 까다롭다고 생각
  - data-link 속성이 존재하는 경우에만 라우팅 시도

---
### 23.01.11
router에서 lazy loading 구현
- 페이지 로딩하는 부분에서 구현
  - 초기 페이지 로딩 시 네트워크 응답 완료 시간 40-50ms -> 30-40ms로 감소 및 모든 페이지를 받아오지 않는 것 확인

---
### 23.01.12
router object로 최적화
- 경로를 array -> object로 변경

---
### 23.01.14
router 변경
- router를 function -> class로 변경
  - routes를 router.js 파일 내부가 아닌 index.js에서 받도록 하여 좀 더 관리하기 용이하게 하고자 함
  - 해당 과정에서 initRouter 함수는 외부에서 동작시킬 필요가 없으므로 위치 변경

---
### 23.01.17
reactivity 구현
- Proxy를 이용하여 reactivity 구현
  - Proxy와 Object.defineProperty 중 Proxy 선택
  - 역할은 거의 비슷하지만 Proxy가 조금 더 빠르고 가벼움
  - constructor가 실행된 이후 state에 Proxy를 씌워야 정상 동작함

---
### 23.01.18
mutable reactivity 구현
- Proxy를 이용하여 mutable reactivity 구현
  - array에서 원소를 추가, 삭제하거나
  - object에서 프로퍼티를 수정할 경우에는
  - 두 경우 모두 call by reference이기 때문에 get이 호출
  - 따라서 getter를 재정의하여 target의 타입이 null이 아니고, object일 경우에는 새로운 Proxy를 씌워 반환하여 mutable을 유지