async function getCrypto() {
  const response = await fetch('https://api.coingecko.com/api/v3/coins/list');
  const data = await response.json();
  console.log(data);
}
getCrypto();
