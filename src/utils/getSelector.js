export default function getSelector(path) {
  if (Array.isArray(path)) {
    return path
      .filter((ele) => {
        return ele !== document && ele !== window;
      })
      .map((ele) => {
        if (ele.id) {
          return `${ele.nodeName.toLowerCase()}#${ele.id}`;
        } else if (ele.className && typeof ele.className === "string") {
          return `${ele.nodeName.toLowerCase()}.${ele.className}`;
        } else {
          return element.nodeName.toLowerCase();
        }
      })
      .reverse()
      .join(" ");
  }
}
