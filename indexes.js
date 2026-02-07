const cardsContainer = document.getElementById("cards");
const setsContainer = document.getElementById("sets");
let currentDisplayedCards = [];

async function fetchCards() {
    const res = await fetch("https://api.magicthegathering.io/v1/cards?pageSize=100"); // Fetch more cards
    const data = await res.json();

    // Group cards by mana color
    const colorGroups = {
        White: [],
        Blue: [],
        Black: [],
        Red: [],
        Green: [],
        Colorless: []
    };

    data.cards.forEach(card => {
        const colors = card.colors || ["Colorless"];
        colors.forEach(color => {
            if (colorGroups[color]) {
                colorGroups[color].push(card);
            }
        });
    });

    // Select one card from each color group (if available)
    const selectedCards = [];
    Object.values(colorGroups).forEach(group => {
        if (group.length > 0) {
            const randomCard = group[Math.floor(Math.random() * group.length)];
            selectedCards.push(randomCard);
        }
    });

    // Fill remaining slots with random cards if less than 5 cards are selected
    while (selectedCards.length < 5) {
        const randomCard = data.cards[Math.floor(Math.random() * data.cards.length)];
        if (!selectedCards.includes(randomCard)) {
            selectedCards.push(randomCard);
        }
    }

    // Store and render the selected cards
    currentDisplayedCards = selectedCards;
    renderCards(currentDisplayedCards);
}

async function fetchSets() {
    const setsRes = await fetch("https://api.magicthegathering.io/v1/sets");
    const setsData = await setsRes.json();
    renderSets(setsData.sets.slice(0, 5), currentDisplayedCards);
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