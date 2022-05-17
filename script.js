const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];
//Show loading 
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
 
//Hide loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show new Quote
function newQuote(){
        loading();
        // Pick random Quote
        const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
        // Check if author field is blanked then print unknown
        if(!quote.author){
            authorText.textContent = 'Unknown';
        }
        else{
            authorText.textContent = quote.author;
        }
        // check quote length to determine styling
        if(quote.text.length >200){
            quoteText.classList.add('long-quote');
        }
        else{
            quoteText.classList.remove('long-quote');
        }
        // SEt quote , hide loader
        quoteText.textContent = quote.text;
        complete();
}
// Get Quote FROm API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
       //Fetch data manually
       //console.log(apiQuotes[12]);
       newQuote();
    }catch(error){
        //Catch Error Here
    }
}

// Tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);

// On load
getQuotes();