// 반응성을 위한 함수
const reactive = ({ target, callback }) => {
  // 프록시에서 사용하기 위한 핸들러
  const handler = {
    // getter 재정의
    get: function (target, property, receiver) {
      // array에서 원소를 추가, 삭제하거나
      // object에서 프로퍼티를 수정할 경우에는
      // 두 경우 모두 call by reference이기 때문에 get이 호출
      // 따라서 target의 타입이 null이 아니고, object일 경우에는 (array도 object 타입) 새로운 Proxy를 씌워 반환하여 mutable을 유지
      if (typeof target[property] === 'object' && target[property] !== null) {
        return new Proxy(target[property], handler);
      }

      return Reflect.get(target, property, receiver);
    },
    // setter 재정의
    set: function (target, property, value, receiver) {
      // 수정하고자 하는 값이 주어진 값과 다를 경우에만 
      if (target[property] !== value) {
        // 결과 반영
        Reflect.set(target, property, value, receiver);

        // 콜백 실행
        callback();
      }

      return true;
    }
  };

  // 프록시를 통한 reactivity 구현
  // Proxy가 Object.defineProperty 보다 가볍고 빠르다
  // Object.defineProperty가 좀 더 세부적인 설정을 할 수는 있지만 사실상 둘의 역할은 거의 동일
  // Object.defineProperty은 다른 property들도 다시 정의해주어야 함. 하지 않을 경우 없어져셔 불편..
  // 대신 Proxy는 옛날 버전에서는 지원해주지 않음
  const proxy = new Proxy(target, handler);

  return proxy;
}

export default reactive;