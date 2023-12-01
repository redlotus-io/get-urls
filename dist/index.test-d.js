"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tsd_1 = require("tsd");
var index_js_1 = require("./index.js");
var text = "Lorem ipsum dolor sit amet, //sindresorhus.com consectetuer adipiscing http://yeoman.io elit.";
(0, tsd_1.expectType)((0, index_js_1.getUrls)(text));
(0, tsd_1.expectType)((0, index_js_1.getUrls)(text, { extractFromQueryString: true }));
(0, tsd_1.expectType)((0, index_js_1.getUrls)(text, { exclude: ["foo"] }));
(0, tsd_1.expectType)((0, index_js_1.getUrls)(text, { defaultProtocol: "http" }));
