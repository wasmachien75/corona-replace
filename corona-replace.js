var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("words", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var words = [
        "conundrum",
        "concert",
        "cacao",
        "component",
        "cadmium",
        "catechesis",
        "calcium",
        "curatorium",
        "circus",
        "cirrhosis",
        "competition",
        "crêpe",
        "coprophilia",
        "cunnilingus",
        "credence",
        "corticoide",
        "consensus",
        "collage",
        "colonoscopy",
    ];
    exports.default = words;
});
define("corona-replace", ["require", "exports", "words"], function (require, exports, words_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    words_1 = __importDefault(words_1);
    function random() {
        var i = Math.floor(Math.random() * words_1.default.length);
        return words_1.default[i];
    }
    function replaceText(node, word) {
        if (["script", "head", "svg"].indexOf(node.nodeName) != -1)
            return;
        if (node.nodeType === node.TEXT_NODE) {
            if (node.textContent !== null) {
                node.textContent = node.textContent
                    .replace(/corona|covid/i, function (val) {
                    if (val == val.toLowerCase()) {
                        return word;
                    }
                    else if (val == val.toUpperCase()) {
                        return word.toUpperCase();
                    }
                    else {
                        return word[0].toUpperCase() + word.slice(1);
                    }
                });
            }
        }
        else {
            for (var i = 0; i < node.childNodes.length; i++) {
                replaceText(node.childNodes[i], word);
            }
        }
    }
    var replacementWord = random();
    var observer = new MutationObserver(function (mutations, observer) {
        var _a, _b;
        for (var _i = 0, mutations_1 = mutations; _i < mutations_1.length; _i++) {
            var m = mutations_1[_i];
            if (((_a = m.addedNodes) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                (_b = m.addedNodes) === null || _b === void 0 ? void 0 : _b.forEach(function (n) { return replacementWord; });
            }
        }
    });
    replaceText(document.body, replacementWord);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});
