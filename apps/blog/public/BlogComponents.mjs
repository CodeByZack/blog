// components/BlogLayout.tsx
import dayjs from "dayjs";
var BlogTitle = (props) => {
  var _a;
  const { post } = props;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h1", {
    className: "font-bold text-3xl md:text-5xl tracking-tight mb-4 dark:text-gray-400"
  }, post.title), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col md:flex-row justify-between items-start md:items-center w-full mt-2 mb-8"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center"
  }, /* @__PURE__ */ React.createElement("img", {
    alt: "\u884C\u8005\u3001\u7A7A\u5C71",
    height: 24,
    width: 24,
    src: "/avatar.jpg",
    className: "rounded-full"
  }), /* @__PURE__ */ React.createElement("span", {
    className: "text-sm my-4 md:my-0 text-gray-700 dark:text-gray-300 ml-2"
  }, "\u884C\u8005\u3001\u7A7A\u5C71 / ", dayjs(post.updatedAt).format("YYYY-MM-DD HH:mm:ss"))), /* @__PURE__ */ React.createElement("span", {
    className: "text-sm text-gray-500"
  }, (_a = post.readingTime) == null ? void 0 : _a.text)));
};

// components/BlogComponents.tsx
var components = {
  BlogTitle
};
var BlogComponents_default = components;
export {
  BlogComponents_default as default
};
