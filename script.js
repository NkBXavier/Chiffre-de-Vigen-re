document.getElementById('submit').addEventListener('click', function() {
    const text = document.getElementById('text').value;
    const key = document.getElementById('key').value;
    const operation = document.getElementById('operation').value;
    
    let result;
    if (operation === 'encrypt') {
        result = vigenereCipher(text, key, true);
    } else {
        result = vigenereCipher(text, key, false);
    }

    document.getElementById('result').value = result;
});

function vigenereCipher(text, key, encrypt = true) {
    const keyUpper = key.toUpperCase();
    let result = "";
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];

        if (char.match(/[a-zA-Z]/)) {
            const isUpperCase = char === char.toUpperCase();
            const base = isUpperCase ? 65 : 97;
            const charCode = char.charCodeAt(0) - base;
            const keyShift = keyUpper[keyIndex % keyUpper.length].charCodeAt(0) - 65;
            
            let newCharCode;
            if (encrypt) {
                newCharCode = (charCode + keyShift) % 26;
            } else {
                newCharCode = (charCode - keyShift + 26) % 26;
            }
            
            result += String.fromCharCode(newCharCode + base);
            keyIndex++;
        } else {
            result += char; // Conserver les caractères non alphabétiques
        }
    }

    return result;
}
