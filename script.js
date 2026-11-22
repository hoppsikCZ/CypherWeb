const form = document.querySelector("#cipher-form");
const cipherSelect = document.querySelector("#cipher");
const shiftInput = document.querySelector("#shift");
const shiftOption = document.querySelector("#shift-option");
const actionSelect = document.querySelector("#action");

function transform(text, cipher, shift, action) {
    return [...text].map((character) => {
        const code = character.charCodeAt(0);
        const base = code >= 65 && code <= 90 ? 65 : code >= 97 && code <= 122 ? 97 : null;

        if (base === null) {
            return character;
        }

        const letter = code - base;
        if (cipher === "atbash") {
            return String.fromCharCode(base + 25 - letter);
        }

        const amount = cipher === "rot13" ? 13 : shift % 26;
        const direction = action === "decode" ? -1 : 1;
        return String.fromCharCode(base + (letter + direction * amount + 26) % 26);
    }).join("");
}

function updateOptions() {
    const isCaesar = cipherSelect.value === "caesar";
    const usesSameOperationToDecode = cipherSelect.value === "rot13" || cipherSelect.value === "atbash";
    shiftInput.disabled = !isCaesar;
    shiftOption.hidden = !isCaesar;
    actionSelect.disabled = usesSameOperationToDecode;
    if (usesSameOperationToDecode) {
        actionSelect.value = "encode";
    }
}

cipherSelect.addEventListener("change", updateOptions);
updateOptions();

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = form.elements.message.value;
    const shift = Number(shiftInput.value);
    form.elements.output.value = transform(message, cipherSelect.value, shift, actionSelect.value);
});
