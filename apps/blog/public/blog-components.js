import React from 'react';
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

// ../../node_modules/.pnpm/tsup@5.12.8_typescript@4.6.3/node_modules/tsup/assets/esm_shims.js
var init_esm_shims = __esm({
  "../../node_modules/.pnpm/tsup@5.12.8_typescript@4.6.3/node_modules/tsup/assets/esm_shims.js"() {
  }
});

// ../../node_modules/.pnpm/next@12.0.8/node_modules/next/dist/shared/lib/side-effect.js
var require_side_effect = __commonJS({
  "../../node_modules/.pnpm/next@12.0.8/node_modules/next/dist/shared/lib/side-effect.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _react = _interopRequireWildcard(__require("react"));
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      } else {
        var newObj = {};
        if (obj != null) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
              if (desc.get || desc.set) {
                Object.defineProperty(newObj, key, desc);
              } else {
                newObj[key] = obj[key];
              }
            }
          }
        }
        newObj.default = obj;
        return newObj;
      }
    }
    var isServer = typeof window === "undefined";
    var _class = class extends _react.Component {
      constructor(props) {
        super(props);
        this.emitChange = () => {
          if (this._hasHeadManager) {
            this.props.headManager.updateHead(this.props.reduceComponentsToState([
              ...this.props.headManager.mountedInstances
            ], this.props));
          }
        };
        this._hasHeadManager = this.props.headManager && this.props.headManager.mountedInstances;
        if (isServer && this._hasHeadManager) {
          this.props.headManager.mountedInstances.add(this);
          this.emitChange();
        }
      }
      componentDidMount() {
        if (this._hasHeadManager) {
          this.props.headManager.mountedInstances.add(this);
        }
        this.emitChange();
      }
      componentDidUpdate() {
        this.emitChange();
      }
      componentWillUnmount() {
        if (this._hasHeadManager) {
          this.props.headManager.mountedInstances.delete(this);
        }
        this.emitChange();
      }
      render() {
        return null;
      }
    };
    exports.default = _class;
  }
});

// ../../node_modules/.pnpm/next@12.0.8/node_modules/next/dist/shared/lib/amp-context.js
var require_amp_context = __commonJS({
  "../../node_modules/.pnpm/next@12.0.8/node_modules/next/dist/shared/lib/amp-context.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.AmpStateContext = void 0;
    var _react = _interopRequireDefault(__require("react"));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    var AmpStateContext = _react.default.createContext({});
    exports.AmpStateContext = AmpStateContext;
    if (process.env.NODE_ENV !== "production") {
      AmpStateContext.displayName = "AmpStateContext";
    }
  }
});

// ../../node_modules/.pnpm/next@12.0.8/node_modules/next/dist/shared/lib/head-manager-context.js
var require_head_manager_context = __commonJS({
  "../../node_modules/.pnpm/next@12.0.8/node_modules/next/dist/shared/lib/head-manager-context.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.HeadManagerContext = void 0;
    var _react = _interopRequireDefault(__require("react"));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    var HeadManagerContext = _react.default.createContext({});
    exports.HeadManagerContext = HeadManagerContext;
    if (process.env.NODE_ENV !== "production") {
      HeadManagerContext.displayName = "HeadManagerContext";
    }
  }
});

// ../../node_modules/.pnpm/next@12.0.8/node_modules/next/dist/shared/lib/amp.js
var require_amp = __commonJS({
  "../../node_modules/.pnpm/next@12.0.8/node_modules/next/dist/shared/lib/amp.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.isInAmpMode = isInAmpMode;
    exports.useAmp = useAmp;
    var _react = _interopRequireDefault(__require("react"));
    var _ampContext = require_amp_context();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function isInAmpMode({ ampFirst = false, hybrid = false, hasQuery = false } = {}) {
      return ampFirst || hybrid && hasQuery;
    }
    function useAmp() {
      return isInAmpMode(_react.default.useContext(_ampContext.AmpStateContext));
    }
  }
});

// ../../node_modules/.pnpm/next@12.0.8/node_modules/next/dist/shared/lib/head.js
var require_head = __commonJS({
  "../../node_modules/.pnpm/next@12.0.8/node_modules/next/dist/shared/lib/head.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.defaultHead = defaultHead;
    exports.default = void 0;
    var _react = _interopRequireWildcard(__require("react"));
    var _sideEffect = _interopRequireDefault(require_side_effect());
    var _ampContext = require_amp_context();
    var _headManagerContext = require_head_manager_context();
    var _amp = require_amp();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      } else {
        var newObj = {};
        if (obj != null) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};
              if (desc.get || desc.set) {
                Object.defineProperty(newObj, key, desc);
              } else {
                newObj[key] = obj[key];
              }
            }
          }
        }
        newObj.default = obj;
        return newObj;
      }
    }
    function defaultHead(inAmpMode = false) {
      const head = [
        /* @__PURE__ */ _react.default.createElement("meta", {
          charSet: "utf-8"
        })
      ];
      if (!inAmpMode) {
        head.push(/* @__PURE__ */ _react.default.createElement("meta", {
          name: "viewport",
          content: "width=device-width"
        }));
      }
      return head;
    }
    function onlyReactElement(list, child) {
      if (typeof child === "string" || typeof child === "number") {
        return list;
      }
      if (child.type === _react.default.Fragment) {
        return list.concat(_react.default.Children.toArray(child.props.children).reduce((fragmentList, fragmentChild) => {
          if (typeof fragmentChild === "string" || typeof fragmentChild === "number") {
            return fragmentList;
          }
          return fragmentList.concat(fragmentChild);
        }, []));
      }
      return list.concat(child);
    }
    var METATYPES = [
      "name",
      "httpEquiv",
      "charSet",
      "itemProp"
    ];
    function unique() {
      const keys = /* @__PURE__ */ new Set();
      const tags = /* @__PURE__ */ new Set();
      const metaTypes = /* @__PURE__ */ new Set();
      const metaCategories = {};
      return (h) => {
        let isUnique = true;
        let hasKey = false;
        if (h.key && typeof h.key !== "number" && h.key.indexOf("$") > 0) {
          hasKey = true;
          const key = h.key.slice(h.key.indexOf("$") + 1);
          if (keys.has(key)) {
            isUnique = false;
          } else {
            keys.add(key);
          }
        }
        switch (h.type) {
          case "title":
          case "base":
            if (tags.has(h.type)) {
              isUnique = false;
            } else {
              tags.add(h.type);
            }
            break;
          case "meta":
            for (let i = 0, len = METATYPES.length; i < len; i++) {
              const metatype = METATYPES[i];
              if (!h.props.hasOwnProperty(metatype))
                continue;
              if (metatype === "charSet") {
                if (metaTypes.has(metatype)) {
                  isUnique = false;
                } else {
                  metaTypes.add(metatype);
                }
              } else {
                const category = h.props[metatype];
                const categories = metaCategories[metatype] || /* @__PURE__ */ new Set();
                if ((metatype !== "name" || !hasKey) && categories.has(category)) {
                  isUnique = false;
                } else {
                  categories.add(category);
                  metaCategories[metatype] = categories;
                }
              }
            }
            break;
        }
        return isUnique;
      };
    }
    function reduceComponents(headElements, props) {
      return headElements.reduce((list, headElement) => {
        const headElementChildren = _react.default.Children.toArray(headElement.props.children);
        return list.concat(headElementChildren);
      }, []).reduce(onlyReactElement, []).reverse().concat(defaultHead(props.inAmpMode)).filter(unique()).reverse().map((c, i) => {
        const key = c.key || i;
        if (process.env.NODE_ENV !== "development" && process.env.__NEXT_OPTIMIZE_FONTS && !props.inAmpMode) {
          if (c.type === "link" && c.props["href"] && [
            "https://fonts.googleapis.com/css",
            "https://use.typekit.net/"
          ].some((url) => c.props["href"].startsWith(url))) {
            const newProps = __spreadValues({}, c.props || {});
            newProps["data-href"] = newProps["href"];
            newProps["href"] = void 0;
            newProps["data-optimized-fonts"] = true;
            return /* @__PURE__ */ _react.default.cloneElement(c, newProps);
          }
        }
        return /* @__PURE__ */ _react.default.cloneElement(c, {
          key
        });
      });
    }
    function Head({ children }) {
      const ampState = (0, _react).useContext(_ampContext.AmpStateContext);
      const headManager = (0, _react).useContext(_headManagerContext.HeadManagerContext);
      return /* @__PURE__ */ _react.default.createElement(_sideEffect.default, {
        reduceComponentsToState: reduceComponents,
        headManager,
        inAmpMode: (0, _amp).isInAmpMode(ampState)
      }, children);
    }
    var _default = Head;
    exports.default = _default;
  }
});

// ../../node_modules/.pnpm/next@12.0.8/node_modules/next/dist/shared/lib/to-base-64.js
var require_to_base_64 = __commonJS({
  "../../node_modules/.pnpm/next@12.0.8/node_modules/next/dist/shared/lib/to-base-64.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.toBase64 = toBase64;
    function toBase64(str) {
      if (typeof window === "undefined") {
        return Buffer.from(str).toString("base64");
      } else {
        return window.btoa(str);
      }
    }
  }
});

// ../../node_modules/.pnpm/next@12.0.8/node_modules/next/dist/server/image-config.js
var require_image_config = __commonJS({
  "../../node_modules/.pnpm/next@12.0.8/node_modules/next/dist/server/image-config.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.imageConfigDefault = exports.VALID_LOADERS = void 0;
    var VALID_LOADERS = [
      "default",
      "imgix",
      "cloudinary",
      "akamai",
      "custom"
    ];
    exports.VALID_LOADERS = VALID_LOADERS;
    var imageConfigDefault = {
      deviceSizes: [
        640,
        750,
        828,
        1080,
        1200,
        1920,
        2048,
        3840
      ],
      imageSizes: [
        16,
        32,
        48,
        64,
        96,
        128,
        256,
        384
      ],
      path: "/_next/image",
      loader: "default",
      domains: [],
      disableStaticImages: false,
      minimumCacheTTL: 60,
      formats: [
        "image/webp"
      ]
    };
    exports.imageConfigDefault = imageConfigDefault;
  }
});

// ../../node_modules/.pnpm/next@12.0.8/node_modules/next/dist/client/request-idle-callback.js
var require_request_idle_callback = __commonJS({
  "../../node_modules/.pnpm/next@12.0.8/node_modules/next/dist/client/request-idle-callback.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.cancelIdleCallback = exports.requestIdleCallback = void 0;
    var requestIdleCallback = typeof self !== "undefined" && self.requestIdleCallback && self.requestIdleCallback.bind(window) || function(cb) {
      let start = Date.now();
      return setTimeout(function() {
        cb({
          didTimeout: false,
          timeRemaining: function() {
            return Math.max(0, 50 - (Date.now() - start));
          }
        });
      }, 1);
    };
    exports.requestIdleCallback = requestIdleCallback;
    var cancelIdleCallback = typeof self !== "undefined" && self.cancelIdleCallback && self.cancelIdleCallback.bind(window) || function(id) {
      return clearTimeout(id);
    };
    exports.cancelIdleCallback = cancelIdleCallback;
  }
});

// ../../node_modules/.pnpm/next@12.0.8/node_modules/next/dist/client/use-intersection.js
var require_use_intersection = __commonJS({
  "../../node_modules/.pnpm/next@12.0.8/node_modules/next/dist/client/use-intersection.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.useIntersection = useIntersection;
    var _react = __require("react");
    var _requestIdleCallback = require_request_idle_callback();
    var hasIntersectionObserver = typeof IntersectionObserver !== "undefined";
    function useIntersection({ rootMargin, disabled }) {
      const isDisabled = disabled || !hasIntersectionObserver;
      const unobserve = (0, _react).useRef();
      const [visible, setVisible] = (0, _react).useState(false);
      const setRef = (0, _react).useCallback((el) => {
        if (unobserve.current) {
          unobserve.current();
          unobserve.current = void 0;
        }
        if (isDisabled || visible)
          return;
        if (el && el.tagName) {
          unobserve.current = observe(el, (isVisible) => isVisible && setVisible(isVisible), {
            rootMargin
          });
        }
      }, [
        isDisabled,
        rootMargin,
        visible
      ]);
      (0, _react).useEffect(() => {
        if (!hasIntersectionObserver) {
          if (!visible) {
            const idleCallback = (0, _requestIdleCallback).requestIdleCallback(() => setVisible(true));
            return () => (0, _requestIdleCallback).cancelIdleCallback(idleCallback);
          }
        }
      }, [
        visible
      ]);
      return [
        setRef,
        visible
      ];
    }
    function observe(element, callback, options) {
      const { id, observer, elements } = createObserver(options);
      elements.set(element, callback);
      observer.observe(element);
      return function unobserve() {
        elements.delete(element);
        observer.unobserve(element);
        if (elements.size === 0) {
          observer.disconnect();
          observers.delete(id);
        }
      };
    }
    var observers = /* @__PURE__ */ new Map();
    function createObserver(options) {
      const id = options.rootMargin || "";
      let instance = observers.get(id);
      if (instance) {
        return instance;
      }
      const elements = /* @__PURE__ */ new Map();
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const callback = elements.get(entry.target);
          const isVisible = entry.isIntersecting || entry.intersectionRatio > 0;
          if (callback && isVisible) {
            callback(isVisible);
          }
        });
      }, options);
      observers.set(id, instance = {
        id,
        observer,
        elements
      });
      return instance;
    }
  }
});

// ../../node_modules/.pnpm/next@12.0.8/node_modules/next/dist/client/image.js
var require_image = __commonJS({
  "../../node_modules/.pnpm/next@12.0.8/node_modules/next/dist/client/image.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = Image2;
    var _react = _interopRequireDefault(__require("react"));
    var _head = _interopRequireDefault(require_head());
    var _toBase64 = require_to_base_64();
    var _imageConfig = require_image_config();
    var _useIntersection = require_use_intersection();
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
          ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          }));
        }
        ownKeys.forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      }
      return target;
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null)
        return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0)
            continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key))
            continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null)
        return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0)
          continue;
        target[key] = source[key];
      }
      return target;
    }
    var loadedImageURLs = /* @__PURE__ */ new Set();
    var allImgs = /* @__PURE__ */ new Map();
    var perfObserver;
    var emptyDataURL = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    if (typeof window === "undefined") {
      global.__NEXT_IMAGE_IMPORTED = true;
    }
    var VALID_LOADING_VALUES = [
      "lazy",
      "eager",
      void 0
    ];
    var loaders = /* @__PURE__ */ new Map([
      [
        "default",
        defaultLoader
      ],
      [
        "imgix",
        imgixLoader
      ],
      [
        "cloudinary",
        cloudinaryLoader
      ],
      [
        "akamai",
        akamaiLoader
      ],
      [
        "custom",
        customLoader
      ]
    ]);
    var VALID_LAYOUT_VALUES = [
      "fill",
      "fixed",
      "intrinsic",
      "responsive",
      void 0
    ];
    function isStaticRequire(src) {
      return src.default !== void 0;
    }
    function isStaticImageData(src) {
      return src.src !== void 0;
    }
    function isStaticImport(src) {
      return typeof src === "object" && (isStaticRequire(src) || isStaticImageData(src));
    }
    var { deviceSizes: configDeviceSizes, imageSizes: configImageSizes, loader: configLoader, path: configPath, domains: configDomains } = process.env.__NEXT_IMAGE_OPTS || _imageConfig.imageConfigDefault;
    var allSizes = [
      ...configDeviceSizes,
      ...configImageSizes
    ];
    configDeviceSizes.sort((a, b) => a - b);
    allSizes.sort((a, b) => a - b);
    function getWidths(width, layout, sizes) {
      if (sizes && (layout === "fill" || layout === "responsive")) {
        const viewportWidthRe = /(^|\s)(1?\d?\d)vw/g;
        const percentSizes = [];
        for (let match; match = viewportWidthRe.exec(sizes); match) {
          percentSizes.push(parseInt(match[2]));
        }
        if (percentSizes.length) {
          const smallestRatio = Math.min(...percentSizes) * 0.01;
          return {
            widths: allSizes.filter((s) => s >= configDeviceSizes[0] * smallestRatio),
            kind: "w"
          };
        }
        return {
          widths: allSizes,
          kind: "w"
        };
      }
      if (typeof width !== "number" || layout === "fill" || layout === "responsive") {
        return {
          widths: configDeviceSizes,
          kind: "w"
        };
      }
      const widths = [
        ...new Set([
          width,
          width * 2
        ].map((w) => allSizes.find((p) => p >= w) || allSizes[allSizes.length - 1]))
      ];
      return {
        widths,
        kind: "x"
      };
    }
    function generateImgAttrs({ src, unoptimized, layout, width, quality, sizes, loader }) {
      if (unoptimized) {
        return {
          src,
          srcSet: void 0,
          sizes: void 0
        };
      }
      const { widths, kind } = getWidths(width, layout, sizes);
      const last = widths.length - 1;
      return {
        sizes: !sizes && kind === "w" ? "100vw" : sizes,
        srcSet: widths.map((w, i) => `${loader({
          src,
          quality,
          width: w
        })} ${kind === "w" ? w : i + 1}${kind}`).join(", "),
        src: loader({
          src,
          quality,
          width: widths[last]
        })
      };
    }
    function getInt(x) {
      if (typeof x === "number") {
        return x;
      }
      if (typeof x === "string") {
        return parseInt(x, 10);
      }
      return void 0;
    }
    function defaultImageLoader(loaderProps) {
      const load = loaders.get(configLoader);
      if (load) {
        return load(_objectSpread({
          root: configPath
        }, loaderProps));
      }
      throw new Error(`Unknown "loader" found in "next.config.js". Expected: ${_imageConfig.VALID_LOADERS.join(", ")}. Received: ${configLoader}`);
    }
    function handleLoading(img, src, layout, placeholder, onLoadingComplete) {
      if (!img) {
        return;
      }
      const handleLoad = () => {
        if (img.src !== emptyDataURL) {
          const p = "decode" in img ? img.decode() : Promise.resolve();
          p.catch(() => {
          }).then(() => {
            if (placeholder === "blur") {
              img.style.filter = "";
              img.style.backgroundSize = "";
              img.style.backgroundImage = "";
              img.style.backgroundPosition = "";
            }
            loadedImageURLs.add(src);
            if (onLoadingComplete) {
              const { naturalWidth, naturalHeight } = img;
              onLoadingComplete({
                naturalWidth,
                naturalHeight
              });
            }
            if (process.env.NODE_ENV !== "production") {
              var ref;
              if ((ref = img.parentElement) === null || ref === void 0 ? void 0 : ref.parentElement) {
                const parent = getComputedStyle(img.parentElement.parentElement);
                if (!parent.position) {
                } else if (layout === "responsive" && parent.display === "flex") {
                  console.warn(`Image with src "${src}" may not render properly as a child of a flex container. Consider wrapping the image with a div to configure the width.`);
                } else if (layout === "fill" && parent.position !== "relative" && parent.position !== "fixed") {
                  console.warn(`Image with src "${src}" may not render properly with a parent using position:"${parent.position}". Consider changing the parent style to position:"relative" with a width and height.`);
                }
              }
            }
          });
        }
      };
      if (img.complete) {
        handleLoad();
      } else {
        img.onload = handleLoad;
      }
    }
    function Image2(_param) {
      var { src, sizes, unoptimized = false, priority = false, loading, lazyBoundary = "200px", className, quality, width, height, objectFit, objectPosition, onLoadingComplete, loader = defaultImageLoader, placeholder = "empty", blurDataURL } = _param, all = _objectWithoutProperties(_param, ["src", "sizes", "unoptimized", "priority", "loading", "lazyBoundary", "className", "quality", "width", "height", "objectFit", "objectPosition", "onLoadingComplete", "loader", "placeholder", "blurDataURL"]);
      let rest = all;
      let layout = sizes ? "responsive" : "intrinsic";
      if ("layout" in rest) {
        if (rest.layout)
          layout = rest.layout;
        delete rest["layout"];
      }
      let staticSrc = "";
      if (isStaticImport(src)) {
        const staticImageData = isStaticRequire(src) ? src.default : src;
        if (!staticImageData.src) {
          throw new Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(staticImageData)}`);
        }
        blurDataURL = blurDataURL || staticImageData.blurDataURL;
        staticSrc = staticImageData.src;
        if (!layout || layout !== "fill") {
          height = height || staticImageData.height;
          width = width || staticImageData.width;
          if (!staticImageData.height || !staticImageData.width) {
            throw new Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(staticImageData)}`);
          }
        }
      }
      src = typeof src === "string" ? src : staticSrc;
      const widthInt = getInt(width);
      const heightInt = getInt(height);
      const qualityInt = getInt(quality);
      let isLazy = !priority && (loading === "lazy" || typeof loading === "undefined");
      if (src.startsWith("data:") || src.startsWith("blob:")) {
        unoptimized = true;
        isLazy = false;
      }
      if (typeof window !== "undefined" && loadedImageURLs.has(src)) {
        isLazy = false;
      }
      if (process.env.NODE_ENV !== "production") {
        if (!src) {
          throw new Error(`Image is missing required "src" property. Make sure you pass "src" in props to the \`next/image\` component. Received: ${JSON.stringify({
            width,
            height,
            quality
          })}`);
        }
        if (!VALID_LAYOUT_VALUES.includes(layout)) {
          throw new Error(`Image with src "${src}" has invalid "layout" property. Provided "${layout}" should be one of ${VALID_LAYOUT_VALUES.map(String).join(",")}.`);
        }
        if (typeof widthInt !== "undefined" && isNaN(widthInt) || typeof heightInt !== "undefined" && isNaN(heightInt)) {
          throw new Error(`Image with src "${src}" has invalid "width" or "height" property. These should be numeric values.`);
        }
        if (layout === "fill" && (width || height)) {
          console.warn(`Image with src "${src}" and "layout='fill'" has unused properties assigned. Please remove "width" and "height".`);
        }
        if (!VALID_LOADING_VALUES.includes(loading)) {
          throw new Error(`Image with src "${src}" has invalid "loading" property. Provided "${loading}" should be one of ${VALID_LOADING_VALUES.map(String).join(",")}.`);
        }
        if (priority && loading === "lazy") {
          throw new Error(`Image with src "${src}" has both "priority" and "loading='lazy'" properties. Only one should be used.`);
        }
        if (sizes && layout !== "fill" && layout !== "responsive") {
          console.warn(`Image with src "${src}" has "sizes" property but it will be ignored. Only use "sizes" with "layout='fill'" or "layout='responsive'".`);
        }
        if (placeholder === "blur") {
          if (layout !== "fill" && (widthInt || 0) * (heightInt || 0) < 1600) {
            console.warn(`Image with src "${src}" is smaller than 40x40. Consider removing the "placeholder='blur'" property to improve performance.`);
          }
          if (!blurDataURL) {
            const VALID_BLUR_EXT = [
              "jpeg",
              "png",
              "webp",
              "avif"
            ];
            throw new Error(`Image with src "${src}" has "placeholder='blur'" property but is missing the "blurDataURL" property.
          Possible solutions:
            - Add a "blurDataURL" property, the contents should be a small Data URL to represent the image
            - Change the "src" property to a static import with one of the supported file types: ${VALID_BLUR_EXT.join(",")}
            - Remove the "placeholder" property, effectively no blur effect
          Read more: https://nextjs.org/docs/messages/placeholder-blur-data-url`);
          }
        }
        if ("ref" in rest) {
          console.warn(`Image with src "${src}" is using unsupported "ref" property. Consider using the "onLoadingComplete" property instead.`);
        }
        if ("style" in rest) {
          console.warn(`Image with src "${src}" is using unsupported "style" property. Please use the "className" property instead.`);
        }
        if (!unoptimized) {
          const urlStr = loader({
            src,
            width: widthInt || 400,
            quality: qualityInt || 75
          });
          let url;
          try {
            url = new URL(urlStr);
          } catch (err) {
          }
          if (urlStr === src || url && url.pathname === src && !url.search) {
            console.warn(`Image with src "${src}" has a "loader" property that does not implement width. Please implement it or use the "unoptimized" property instead.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader-width`);
          }
        }
        if (typeof window !== "undefined" && !perfObserver && window.PerformanceObserver) {
          perfObserver = new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
              var ref;
              const imgSrc = (entry === null || entry === void 0 ? void 0 : (ref = entry.element) === null || ref === void 0 ? void 0 : ref.src) || "";
              const lcpImage = allImgs.get(imgSrc);
              if (lcpImage && !lcpImage.priority && lcpImage.placeholder !== "blur" && !lcpImage.src.startsWith("data:") && !lcpImage.src.startsWith("blob:")) {
                console.warn(`Image with src "${lcpImage.src}" was detected as the Largest Contentful Paint (LCP). Please add the "priority" property if this image is above the fold.
Read more: https://nextjs.org/docs/api-reference/next/image#priority`);
              }
            }
          });
          perfObserver.observe({
            type: "largest-contentful-paint",
            buffered: true
          });
        }
      }
      const [setRef, isIntersected] = (0, _useIntersection).useIntersection({
        rootMargin: lazyBoundary,
        disabled: !isLazy
      });
      const isVisible = !isLazy || isIntersected;
      const wrapperStyle = {
        boxSizing: "border-box",
        display: "block",
        overflow: "hidden",
        width: "initial",
        height: "initial",
        background: "none",
        opacity: 1,
        border: 0,
        margin: 0,
        padding: 0
      };
      const sizerStyle = {
        boxSizing: "border-box",
        display: "block",
        width: "initial",
        height: "initial",
        background: "none",
        opacity: 1,
        border: 0,
        margin: 0,
        padding: 0
      };
      let hasSizer = false;
      let sizerSvg;
      const imgStyle = {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        boxSizing: "border-box",
        padding: 0,
        border: "none",
        margin: "auto",
        display: "block",
        width: 0,
        height: 0,
        minWidth: "100%",
        maxWidth: "100%",
        minHeight: "100%",
        maxHeight: "100%",
        objectFit,
        objectPosition
      };
      const blurStyle = placeholder === "blur" ? {
        filter: "blur(20px)",
        backgroundSize: objectFit || "cover",
        backgroundImage: `url("${blurDataURL}")`,
        backgroundPosition: objectPosition || "0% 0%"
      } : {};
      if (layout === "fill") {
        wrapperStyle.display = "block";
        wrapperStyle.position = "absolute";
        wrapperStyle.top = 0;
        wrapperStyle.left = 0;
        wrapperStyle.bottom = 0;
        wrapperStyle.right = 0;
      } else if (typeof widthInt !== "undefined" && typeof heightInt !== "undefined") {
        const quotient = heightInt / widthInt;
        const paddingTop = isNaN(quotient) ? "100%" : `${quotient * 100}%`;
        if (layout === "responsive") {
          wrapperStyle.display = "block";
          wrapperStyle.position = "relative";
          hasSizer = true;
          sizerStyle.paddingTop = paddingTop;
        } else if (layout === "intrinsic") {
          wrapperStyle.display = "inline-block";
          wrapperStyle.position = "relative";
          wrapperStyle.maxWidth = "100%";
          hasSizer = true;
          sizerStyle.maxWidth = "100%";
          sizerSvg = `<svg width="${widthInt}" height="${heightInt}" xmlns="http://www.w3.org/2000/svg" version="1.1"/>`;
        } else if (layout === "fixed") {
          wrapperStyle.display = "inline-block";
          wrapperStyle.position = "relative";
          wrapperStyle.width = widthInt;
          wrapperStyle.height = heightInt;
        }
      } else {
        if (process.env.NODE_ENV !== "production") {
          throw new Error(`Image with src "${src}" must use "width" and "height" properties or "layout='fill'" property.`);
        }
      }
      let imgAttributes = {
        src: emptyDataURL,
        srcSet: void 0,
        sizes: void 0
      };
      if (isVisible) {
        imgAttributes = generateImgAttrs({
          src,
          unoptimized,
          layout,
          width: widthInt,
          quality: qualityInt,
          sizes,
          loader
        });
      }
      let srcString = src;
      if (process.env.NODE_ENV !== "production") {
        if (typeof window !== "undefined") {
          let fullUrl;
          try {
            fullUrl = new URL(imgAttributes.src);
          } catch (e) {
            fullUrl = new URL(imgAttributes.src, window.location.href);
          }
          allImgs.set(fullUrl.href, {
            src,
            priority,
            placeholder
          });
        }
      }
      let imageSrcSetPropName = "imagesrcset";
      let imageSizesPropName = "imagesizes";
      if (process.env.__NEXT_REACT_ROOT) {
        imageSrcSetPropName = "imageSrcSet";
        imageSizesPropName = "imageSizes";
      }
      const linkProps = {
        [imageSrcSetPropName]: imgAttributes.srcSet,
        [imageSizesPropName]: imgAttributes.sizes
      };
      return /* @__PURE__ */ _react.default.createElement("span", {
        style: wrapperStyle
      }, hasSizer ? /* @__PURE__ */ _react.default.createElement("span", {
        style: sizerStyle
      }, sizerSvg ? /* @__PURE__ */ _react.default.createElement("img", {
        style: {
          display: "block",
          maxWidth: "100%",
          width: "initial",
          height: "initial",
          background: "none",
          opacity: 1,
          border: 0,
          margin: 0,
          padding: 0
        },
        alt: "",
        "aria-hidden": true,
        src: `data:image/svg+xml;base64,${(0, _toBase64).toBase64(sizerSvg)}`
      }) : null) : null, /* @__PURE__ */ _react.default.createElement("img", Object.assign({}, rest, imgAttributes, {
        decoding: "async",
        "data-nimg": layout,
        className,
        ref: (img) => {
          setRef(img);
          handleLoading(img, srcString, layout, placeholder, onLoadingComplete);
        },
        style: _objectSpread({}, imgStyle, blurStyle)
      })), isLazy && /* @__PURE__ */ _react.default.createElement("noscript", null, /* @__PURE__ */ _react.default.createElement("img", Object.assign({}, rest, generateImgAttrs({
        src,
        unoptimized,
        layout,
        width: widthInt,
        quality: qualityInt,
        sizes,
        loader
      }), {
        decoding: "async",
        "data-nimg": layout,
        style: imgStyle,
        className,
        loading: loading || "lazy"
      }))), priority ? /* @__PURE__ */ _react.default.createElement(_head.default, null, /* @__PURE__ */ _react.default.createElement("link", Object.assign({
        key: "__nimg-" + imgAttributes.src + imgAttributes.srcSet + imgAttributes.sizes,
        rel: "preload",
        as: "image",
        href: imgAttributes.srcSet ? void 0 : imgAttributes.src
      }, linkProps))) : null);
    }
    function normalizeSrc(src) {
      return src[0] === "/" ? src.slice(1) : src;
    }
    function imgixLoader({ root, src, width, quality }) {
      const url = new URL(`${root}${normalizeSrc(src)}`);
      const params = url.searchParams;
      params.set("auto", params.get("auto") || "format");
      params.set("fit", params.get("fit") || "max");
      params.set("w", params.get("w") || width.toString());
      if (quality) {
        params.set("q", quality.toString());
      }
      return url.href;
    }
    function akamaiLoader({ root, src, width }) {
      return `${root}${normalizeSrc(src)}?imwidth=${width}`;
    }
    function cloudinaryLoader({ root, src, width, quality }) {
      const params = [
        "f_auto",
        "c_limit",
        "w_" + width,
        "q_" + (quality || "auto")
      ];
      const paramsString = params.join(",") + "/";
      return `${root}${paramsString}${normalizeSrc(src)}`;
    }
    function customLoader({ src }) {
      throw new Error(`Image with src "${src}" is missing "loader" prop.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader`);
    }
    function defaultLoader({ root, src, width, quality }) {
      if (process.env.NODE_ENV !== "production") {
        const missingValues = [];
        if (!src)
          missingValues.push("src");
        if (!width)
          missingValues.push("width");
        if (missingValues.length > 0) {
          throw new Error(`Next Image Optimization requires ${missingValues.join(", ")} to be provided. Make sure you pass them as props to the \`next/image\` component. Received: ${JSON.stringify({
            src,
            width,
            quality
          })}`);
        }
        if (src.startsWith("//")) {
          throw new Error(`Failed to parse src "${src}" on \`next/image\`, protocol-relative URL (//) must be changed to an absolute URL (http:// or https://)`);
        }
        if (!src.startsWith("/") && configDomains) {
          let parsedSrc;
          try {
            parsedSrc = new URL(src);
          } catch (err) {
            console.error(err);
            throw new Error(`Failed to parse src "${src}" on \`next/image\`, if using relative image it must start with a leading slash "/" or be an absolute URL (http:// or https://)`);
          }
          if (process.env.NODE_ENV !== "test" && !configDomains.includes(parsedSrc.hostname)) {
            throw new Error(`Invalid src prop (${src}) on \`next/image\`, hostname "${parsedSrc.hostname}" is not configured under images in your \`next.config.js\`
See more info: https://nextjs.org/docs/messages/next-image-unconfigured-host`);
          }
        }
      }
      return `${root}?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`;
    }
  }
});

// ../../node_modules/.pnpm/next@12.0.8/node_modules/next/image.js
var require_image2 = __commonJS({
  "../../node_modules/.pnpm/next@12.0.8/node_modules/next/image.js"(exports, module) {
    init_esm_shims();
    module.exports = require_image();
  }
});

// blog-components.tsx
init_esm_shims();

// Button.tsx
init_esm_shims();
var Button = (props) => {
  const { onClick, style, children } = props;
  return /* @__PURE__ */ React.createElement("button", {
    style,
    onClick
  }, children);
};
var Button_default = Button;

// ThemeIcon.tsx
init_esm_shims();
var ThemeIcon = (props) => {
  const { theme, setTheme } = props;
  return /* @__PURE__ */ React.createElement("button", {
    type: "button",
    className: "bg-gray-200 dark:bg-gray-800 rounded p-3",
    onClick: () => setTheme(theme === "dark" ? "light" : "dark")
  }, /* @__PURE__ */ React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    stroke: "currentColor",
    className: "h-4 w-4 text-gray-800 dark:text-gray-200"
  }, theme === "dark" ? /* @__PURE__ */ React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
  }) : /* @__PURE__ */ React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
  })));
};
var ThemeIcon_default = ThemeIcon;

// blog-components.tsx
var import_image = __toESM(require_image2());
var BlogComponents = {
  Button: Button_default,
  Image: import_image.default,
  ThemeIcon: ThemeIcon_default
};
var blog_components_default = BlogComponents;
export {
  BlogComponents,
  blog_components_default as default
};
