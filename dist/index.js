"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrls = void 0;
var normalize_url_1 = __importDefault(require("normalize-url"));
var super_regex_1 = require("super-regex");
var url_regex_safe_1 = __importDefault(require("url-regex-safe"));
var getUrlsFromQueryParameters = function (url) {
    var e_1, _a;
    var returnValue = new Set();
    var searchParams = new URL(url.replace(/^(?:\/\/|(?:www\.))/i, "http://$2")).searchParams;
    try {
        for (var searchParams_1 = __values(searchParams), searchParams_1_1 = searchParams_1.next(); !searchParams_1_1.done; searchParams_1_1 = searchParams_1.next()) {
            var _b = __read(searchParams_1_1.value, 2), value = _b[1];
            if ((0, super_regex_1.isMatch)((0, url_regex_safe_1.default)({ exact: true }), value, { timeout: 500 })) {
                returnValue.add(value);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (searchParams_1_1 && !searchParams_1_1.done && (_a = searchParams_1.return)) _a.call(searchParams_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return returnValue;
};
var getUrls = function (text, options) {
    var e_2, _a, e_3, _b, e_4, _c, e_5, _d;
    var _e;
    if (options === void 0) { options = {}; }
    if (typeof text !== "string") {
        throw new TypeError("The `text` argument should be a string, got ".concat(typeof text));
    }
    if (options.exclude !== undefined && !Array.isArray(options.exclude)) {
        throw new TypeError("The `exclude` option must be an array");
    }
    var returnValue = new Set();
    var add = function (url) {
        try {
            returnValue.add((0, normalize_url_1.default)(url.trim().replace(/\.+$/, ""), options));
        }
        catch (_a) { }
    };
    var results = (0, super_regex_1.matches)((0, url_regex_safe_1.default)(options.requireSchemeOrWww === undefined
        ? undefined
        : {
            strict: options.requireSchemeOrWww,
            parens: true,
        }), text, {
        matchTimeout: 500,
    });
    try {
        for (var results_1 = __values(results), results_1_1 = results_1.next(); !results_1_1.done; results_1_1 = results_1.next()) {
            var url = results_1_1.value.match;
            add(url);
            if (options.extractFromQueryString) {
                var queryStringUrls = getUrlsFromQueryParameters(url);
                try {
                    for (var queryStringUrls_1 = (e_3 = void 0, __values(queryStringUrls)), queryStringUrls_1_1 = queryStringUrls_1.next(); !queryStringUrls_1_1.done; queryStringUrls_1_1 = queryStringUrls_1.next()) {
                        var queryStringUrl = queryStringUrls_1_1.value;
                        add(queryStringUrl);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (queryStringUrls_1_1 && !queryStringUrls_1_1.done && (_b = queryStringUrls_1.return)) _b.call(queryStringUrls_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (results_1_1 && !results_1_1.done && (_a = results_1.return)) _a.call(results_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    try {
        for (var _f = __values((_e = options.exclude) !== null && _e !== void 0 ? _e : []), _g = _f.next(); !_g.done; _g = _f.next()) {
            var excludedItem = _g.value;
            var regex = new RegExp(excludedItem);
            try {
                for (var returnValue_1 = (e_5 = void 0, __values(returnValue)), returnValue_1_1 = returnValue_1.next(); !returnValue_1_1.done; returnValue_1_1 = returnValue_1.next()) {
                    var item = returnValue_1_1.value;
                    if ((0, super_regex_1.isMatch)(regex, item, { timeout: 500 })) {
                        returnValue.delete(item);
                    }
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (returnValue_1_1 && !returnValue_1_1.done && (_d = returnValue_1.return)) _d.call(returnValue_1);
                }
                finally { if (e_5) throw e_5.error; }
            }
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (_g && !_g.done && (_c = _f.return)) _c.call(_f);
        }
        finally { if (e_4) throw e_4.error; }
    }
    return returnValue;
};
exports.getUrls = getUrls;
