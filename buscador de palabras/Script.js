function escapeHtml(text) {
    return text.replace(/&/g, "&amp;")
               .replace(/</g, "&lt;")
               .replace(/>/g, "&gt;");
}

function search() {
    const text = document.getElementById("inputText").value;
    const term = document.getElementById("searchText").value.trim();
    if (!term) return;

    const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    let regex;

    if (term.includes(" ")) {
        regex = new RegExp(`(?<!\\w)${escapedTerm}(?!\\w)`, "gi");
    } else {
        regex = new RegExp(`(^|[\\s.,;:¡!¿?"'()\\[\\]{}])(${escapedTerm})(?=[\\s.,;:¡!¿?"'()\\[\\]{}]|$)`, "gi");
    }

    const matches = [...text.matchAll(regex)];
    const count = matches.length;

    document.getElementById("resultCount").textContent = `"${term}" found ${count} times.`;

    const escapedText = escapeHtml(text).replace(/\n/g, "<br>");

    const highlighted = escapedText.replace(regex, (match, before, word) =>
        `${before}<span class="highlight">${word}</span>`
    );

    document.getElementById("highlightedText").innerHTML = highlighted;
}

document.getElementById("searchBtn").addEventListener("click", search);
