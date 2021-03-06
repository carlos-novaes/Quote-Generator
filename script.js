const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const wppBtn = document.getElementById('wpp-button');

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}
// Get Quote from API
async function getQuote() {
  showLoadingSpinner();
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl =
    'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    // if author is blank, add uknown
    if (data.quoteAuthor === '') {
      authorText.innerText = 'Unknown';
    } else {
      authorText.innerText = data.quoteAuthor;
    }

    // reduce font size for long quotes
    if (data.quoteText.length >= 120) {
      quoteText.classList.add('longe-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quoteText;
    removeLoadingSpinner();
  } catch (error) {}
}
// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

function wppQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const wppUrl = `whatsapp://send?text=${quote} - ${author}`;
  window.open(wppUrl, '_blank');
}

function changeColor() {
  let color1 = generateColor();
  let color2 = generateColor();
  let color3 = generateColor();

  document.body.style.background = `linear-gradient(90deg, rgb(${color1},${color2},${color3}) 0%, rgb(${color3},${color1},${color2}) 35%, rgb(${color2},${color3},${color1}) 100%)`;
}

function generateColor() {
  return Math.floor(Math.random() * 255);
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);
wppBtn.addEventListener('click', wppQuote);

// On load
getQuote();
