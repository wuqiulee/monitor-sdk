const Events = ["click", "touchstart", "mousedown", "keydown", "mouseover"];
export default function getLastEvent() {
  let lastEvent = null;
  Events.forEach((eventType) => {
    document.addEventListener(
      eventType,
      (event) => {
        lastEvent = event;
      },
      {
        capture: true, //捕获阶段
        passive: true, //默认不阻止默认事件
      }
    );
  });
}
