const words: string[] = [
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

function random(): string {
    let i = Math.floor(Math.random() * words.length)
    return words[i]
}

function replaceText(node: Node, word: string) {
    if (["script", "head", "svg"].indexOf(node.nodeName) != -1) return;
    if (node.nodeType === node.TEXT_NODE) {
        if (node.textContent !== null) {
            let text = node.textContent;
            node.textContent = node.textContent
                .replace(/corona|covid/ig, (val: string) => {
                    if (val == val.toLowerCase()) {
                        return word;
                    }
                    else if (val == val.toUpperCase()) {
                        return word.toUpperCase();
                    }
                    else {
                        return word[0].toUpperCase() + word.slice(1)
                    }
                });
        }
    }
    else {
        for (let i = 0; i < node.childNodes.length; i++) {
            replaceText(node.childNodes[i], word);
        }
    }

}

const replacementWord = random();

const observer = new MutationObserver(function (mutations, observer) {
    for (let m of mutations) {
        if (m.addedNodes?.length > 0) {
            m.addedNodes?.forEach((n) => replaceText(n, replacementWord));
        }
    }
});

replaceText(document.body, replacementWord);

observer.observe(document.body, {
    childList: true,
    subtree: true
});
