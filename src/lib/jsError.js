import getSelector from "../utils/getSelector";
import getLastEvent from "../utils/getLastEvent";
export default function jsError() {
  window.addEventListener("error", (event) => {
    const { message, filename, lineno, colno, error } = event;
    const lastEvent = getLastEvent();
    const log = {
      kind: "stability", // 监控指标的大类
      type: "error", // 小类型 这是一个错误
      errorType: "jsError", // 错误类型
      message, // 报错信息
      filename, // 报错文件名
      position: `${lineno}:${colno}`, // 报错位置
      stack: getLines(error.stack), // 错误堆栈
      selector: lastEvent ? getSelector(lastEvent.path) : "", // 最后交互事件
    };
    console.log(event, log, lastEvent);
  });
}

function getLines(stack) {
  return stack
    .split("\n")
    .slice(1)
    .map((item) => item.replace(/^\s+at\s+/g, ""))
    .join("///");
}
