const cardsContainer = document.getElementById("cards");
const setsContainer = document.getElementById("sets");

async function fetchCards() {
    const res = await fetch("https://api.magicthegathering.io/v1/cards?pageSize=100"); // Fetch more cards
    const data = await res.json();

    // Shuffle the cards
    const shuffledCards = data.cards.sort(() => Math.random() - 0.5);

    // Render a random subset of 5 cards
    renderCards(shuffledCards.slice(0, 5));
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
            <p class="font-semibold">${card.name || "Unknown Name"}</p>
            <p class="text-sm text-gray-600">${card.type || "Unknown Type"}</p>
            <img src="${card.imageUrl || "https://via.placeholder.com/150"}" alt="${card.name || "Card Image"}" class="w-full h-auto mt-2 rounded" />
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
        setsContainer.appendChild(div);
    });
}

fetchCards();
fetchSets();