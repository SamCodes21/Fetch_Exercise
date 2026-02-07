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
    const cardsRes = await fetch("https://api.magicthegathering.io/v1/cards?pageSize=100");
    const cardsData = await cardsRes.json();
    const setsRes = await fetch("https://api.magicthegathering.io/v1/sets");
    const setsData = await setsRes.json();
    renderSets(setsData.sets.slice(0, 5), cardsData.cards);
}

function renderCards(cards) {
    cardsContainer.innerHTML = "";
    cards.forEach(card => {
        const div = document.createElement("div");
        div.className = "p-2 border rounded";
        div.innerHTML = `
            <p class="font-semibold">${card.name || "Unknown Name"}</p>
            <p class="text-sm text-gray-600">${card.type || "Unknown Type"}</p>
            <p class="text-sm font-bold text-blue-600 mt-2">Cost: ${card.manaCost || "N/A"}</p>
            <img src="${card.imageUrl || "https://via.placeholder.com/150"}" alt="${card.name || "Card Image"}" class="w-full h-auto mt-2 rounded" />
        `;
        cardsContainer.appendChild(div);
    });
}

function renderSets(sets, cards) {
    setsContainer.innerHTML = "";
    sets.forEach(set => {
        const div = document.createElement("div");
        div.className = "p-2 border rounded flex justify-between items-start";
        const cardsInSet = cards.filter(card => card.setName === set.name).slice(0, 2);
        const cardNames = cardsInSet.map(card => card.name).join(", ") || "No cards";
        div.innerHTML = `
            <div>
                <p class="font-semibold">${set.name}</p>
                <p class="text-sm text-gray-600">${set.releaseDate || "N/A"}</p>
            </div>
            <p class="text-sm text-right text-purple-600">${cardNames}</p>
            `;
        setsContainer.appendChild(div);
    });
}

fetchCards();
fetchSets();