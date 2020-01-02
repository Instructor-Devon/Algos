class TrieNode {
    constructor(value){
        this.value = value;
        this.parent = null;
        this.isWord = false;
        this.nextLetters = [];
    }

    toString() {
        // iterate backwards (traverse towards parent node)
        // until parent.value == ""
        let output = [];
        let node = this;
        while(node && node.value != "") {
            output.unshift(node.value);
            node = node.parent;
        }
        return output.join("");
    }
}

class Trie {
    constructor(){
        this.root = new TrieNode("");
    }

    insert(word) { // "dog"
        let currentNode = this.root;
        for(let idx = 0; idx < word.length; idx++){
            let nextLettersIndex = word.charCodeAt(idx) - 97;
            if (!currentNode.nextLetters[nextLettersIndex]){
                // we didn't find a reference to a node in that specific index where this letter would go.
                currentNode.nextLetters[nextLettersIndex] = new TrieNode(word[idx]);
            }
            let temp = currentNode;
            currentNode = currentNode.nextLetters[nextLettersIndex];
            currentNode.parent = temp;
        }
        currentNode.isWord = true;
    }
    contains(word) {
        // "do"
        let currentNode = this.root;

        // loop char in word
        for(let idx = 0; idx < word.length; idx++){
            let nextLettersIndex = word.charCodeAt(idx) - 97;

            // if no node at idx, word isn't there
            if (!currentNode.nextLetters[nextLettersIndex]) {
                return false;
            }
            currentNode = currentNode.nextLetters[nextLettersIndex];
        }
        return currentNode.isWord;

    }
    // "do" => ["dog", "dogma", "donut"]

    find(prefix) {
        let currentNode = this.root;
        let output = [];

        // for each letter in prefix
        for(let idx = 0; idx < prefix.length; idx++){
            // decend into trie until weve reached node at prefix end
            let nextLettersIndex = prefix.charCodeAt(idx) - 97;
            // if no node at prefix end
            if (!currentNode.nextLetters[nextLettersIndex]) {
                return output;
            }
            currentNode = currentNode.nextLetters[nextLettersIndex];
        }
        // weve found a node at prefix end
        // find all words that decend from a node
        findWords(currentNode, output);
        return output;
    }
}
// node => ["all", "words", "from", "node"]
function findWords(node, arr) {
    // base: node is word, push word to arr

    if(node.isWord) {
        arr.push(node.toString()) // we need to get "dog" from g node (somehow build a string from a node)
    }
    for(let child of node.nextLetters) {
        if(child) {
            findWords(child, arr);
        }
    }
}


let tr1 = new Trie();
tr1.insert("dog");
tr1.insert("dogma");
tr1.insert("date");
tr1.insert("donut");
console.log(tr1.find("do"));