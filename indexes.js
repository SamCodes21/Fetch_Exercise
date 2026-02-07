const cardsContainer = document.getElementById("cards");
const setsContainer = document.getElementById("sets");

async function fetchCards() {
    const res = await fetch("https://api.magicthegathering.io/v1/cards?pageSize=5");
    const data = await res.json();
    renderCards(data.cards);
}

async function fetchSets() {
    const res = await fetch("https://api.magicthegathering.io/v1/sets");
    const data = await res.json();
    renderSets(data.sets.slice(0, 5));
}

function renderCards(cards) {
    cardsContainer.innerHTML = "";
    cards.forEach(card => {
        const div = document.createElement("div");
        div.className = "p-2 border rounded";
        div.innerHTML = `
            <p class="font-semibold">${card.name};</p>
            <p class="text-sm text-gray-600">${card.type || "Unknown type"}</p>
            `;
        cardsContainer.appendChild(div);
    });
}

function renderSets(sets) {
    setsContainer.innerHTML = "";
    sets.forEach(set => {
        const div = document.createElement("div");
        div.className = "p-2 border rounded";
        div.innerHTML = `
            <p class="font-semibold">${set.name};</p>
            <p class="text-sm text-gray-600">${set.releaseDate || "N/A"}</p>
            `;
        cardsContainer.appendChild(div);
    });
}

fetchCards();
fetchSets();