"use strict";
var words = [
    "conundrum",
    "concert",
    "cacao",
    "component",
    "curling",
    "cylinder",
    "cyber",
    "carbonara",
    "calzone",
    "cabriolet",
    "calculus",
    "calisthenics",
    "callcenter",
    "cardigan",
    "carpaccio",
    "chateaubriand",
    "circuit",
    "coffee",
    "coke",
    "coca-cola",
    "collaborator",
    "computer",
    "cornucopia",
    "cornetto",
    "cinema",
    "cadmium",
    "catechesis",
    "calcium",
    "curatorium",
    "circus",
    "cirrhosis",
    "crêpe",
    "coprophilia",
    "cunnilingus",
    "credence",
    "corticoide",
    "consensus",
    "collage",
    "colonoscopy",
    "chainsmoker"
];
function random() {
    var i = Math.floor(Math.random() * words.length);
    return words[i];
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
            (_b = m.addedNodes) === null || _b === void 0 ? void 0 : _b.forEach(function (n) { return replaceText(n, replacementWord); });
        }
    }
});
replaceText(document.body, replacementWord);
observer.observe(document.body, {
    childList: true,
    subtree: true
});
