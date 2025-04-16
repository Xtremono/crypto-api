const button = document.getElementById("button");
const input = document.getElementById("input");
const result = document.getElementById("result");

const getCrypto = async (cryptoName) => {
  const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoName.toLowerCase()}`);
  const data = await response.json();

  if (!data || !data.id) {
    result.textContent = "No se encontró esa cripto 😢";
    return;
  }

  const clp = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${data.id}&vs_currencies=clp`);
  const clpData = await clp.json();

  result.innerHTML = `<p>Cripto encontrada: ${data.name} (${data.symbol}) - Precio: $${clpData[data.id].clp}</p>`;

  const imageUrl = data.image.large;
  const imageElement = document.createElement('img');
  imageElement.src = imageUrl;
  imageElement.alt = `${data.name} logo`;
  imageElement.style.width = '50px';
  imageElement.style.height = '50px';

  result.appendChild(imageElement);
};

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

