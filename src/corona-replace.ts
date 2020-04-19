import words from "./words"

function random(): string {
    let i = Math.floor(Math.random() * words.length)
    return words[i]
}

function replaceText(node: Node, word: string) {
    if (["script", "head", "svg"].indexOf(node.nodeName) != -1) return;
    if (node.nodeType === node.TEXT_NODE) {
        if (node.textContent !== null) {
            node.textContent = node.textContent
                .replace(/corona|covid/i, (val: string) => {
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
            m.addedNodes?.forEach((n) => replacementWord);
        }
    }
});

replaceText(document.body, replacementWord);

observer.observe(document.body, {
    childList: true,
    subtree: true
});
