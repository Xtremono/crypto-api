const button = document.getElementById("button");
const input = document.getElementById("input");
const result = document.getElementById("result");

async function getCrypto(cryptoName) {
  const response = await fetch('https://api.coingecko.com/api/v3/coins/list');
  const data = await response.json();

  const coin = data.find(c => {
    return c.name.toLowerCase() === cryptoName.toLowerCase() ||
      c.symbol.toLowerCase() === cryptoName.toLowerCase();
  });

  if (!coin) {
    console.log("No se encontró esa cripto 😢");
    result.textContent = "No se encontró esa cripto 😢";
  } else {
    console.log(`Cripto encontrada: ${coin.name} (${coin.symbol})`);
    const usd = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coin.id}&vs_currencies=usd`);
    const usdData = await usd.json();
    result.textContent = `Cripto encontrada: ${coin.name} (${coin.symbol}) - Precio: $${usdData[coin.id].usd}`;
  }

}

button.addEventListener("click", () => {
  const cryptoName = input.value.trim();
  getCrypto(cryptoName);
});


input.addEventListener("keydown", (event) => {
  if (event.key === " " || event.key === "Enter") {
    const cryptoName = input.value.trim();
    getCrypto(cryptoName);
  }
});
