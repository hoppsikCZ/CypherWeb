const form = document.querySelector("#hash-form");
const algorithmSelect = document.querySelector("#algorithm");
const input = document.querySelector("#hash-input");
const output = document.querySelector("#hash-output");
const status = document.querySelector("#hash-status");
const submitButton = form.querySelector('button[type="submit"]');

async function hashText(text, algorithm) {
    if (!globalThis.crypto?.subtle) {
        throw new Error("Web Crypto is unavailable. Open this page over HTTPS or localhost.");
    }

    const bytes = new TextEncoder().encode(text);
    const digest = await globalThis.crypto.subtle.digest(algorithm, bytes);
    return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    submitButton.disabled = true;
    output.value = "";
    status.textContent = "";

    try {
        output.value = await hashText(input.value, algorithmSelect.value);
    } catch (error) {
        status.textContent = error instanceof Error ? error.message : "Unable to generate the hash.";
    } finally {
        submitButton.disabled = false;
    }
});
