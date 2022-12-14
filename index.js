//DOM render functions
function renderOneQuote(quote) {
    //build quote
    let card = document.createElement('li')
    card.innerHTML = `
    <div class="card" style="width: 20rem;">
              <div class="card-body">
                <blockquote class="blockquote mb-0">
                    <p>${quote.text}</p>
                    <footer class="blockquote-footer">Quoted by <cite title="Source Title">${quote.author}</cite></footer>
                </blockquote>
                <br>
                <button id="deleteBTN" class="btn btn-outline-info">Delete</button>
              </div>
            </div>

            
    `
  
    //event listener on delete button
    card.querySelector('#deleteBTN').addEventListener('click', () => {
        card.remove()
        deleteQuote(quote.id)
    })

    //add quote to DOM
    document.getElementById('list').appendChild(card)
}

//event listener on the form
document.getElementById('form-details').addEventListener('submit', handleSubmit)

//event handler on submit
function handleSubmit(e) {
    let quoteObj = {
        text: e.target.quote.value,
        author: e.target.author.value
    }
    renderOneQuote(quote)
    newQuote(quoteObj)
}

//fetch requests
//get fetch for all quotes resources
function getAllQuotes() {
    fetch('http://localhost:3000/quotes/')
    .then(response => response.json())
    .then(quotes => quotes.forEach(quote => renderOneQuote(quote)))
}

//Initial Render
//get data and render our quotes to the DOM

function initialize() {
    getAllQuotes();
}
initialize()