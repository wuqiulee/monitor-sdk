import getSelector from "../utils/getSelector";
import getLastEvent from "../utils/getLastEvent";
export default function jsError() {
  window.addEventListener(
    "error",
    (event) => {
      const { message, filename, lineno, colno, error, target } = event;
      const lastEvent = getLastEvent();
      let log;
      // 脚本报错
      if (target?.src || target?.href) {
        log = {
          kind: "stability", // 监控指标的大类
          type: "error", // 小类型 这是一个错误
          errorType: "resourceError", // js或css资源加载错误
          filename: event.target.src || event.target.href, // 哪个文件报错了
          tagName: event.target.tagName, // 标签名
          selector: lastEvent ? getSelector(target) : "", // 最后交互事件
        };
      } else {
        log = {
          kind: "stability", // 监控指标的大类
          type: "error", // 小类型 这是一个错误
          errorType: "jsError", // 错误类型
          message, // 报错信息
          filename, // 报错文件名
          position: `${lineno}:${colno}`, // 报错位置
          stack: getLines(error.stack), // 错误堆栈
          selector: lastEvent ? getSelector(lastEvent.path) : "", // 最后交互事件
        };
      }
      console.log(event, log, lastEvent);
    },
    true
  );
}

function getLines(stack) {
  return stack
    .split("\n")
    .slice(1)
    .map((item) => item.replace(/^\s+at\s+/g, ""))
    .join("///");
}
