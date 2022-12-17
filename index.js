//event listener on the whole document
document.addEventListener('DOMContentLoaded', () => {

    //initialization and declaration of random card
    let q = document.getElementById('q')
    let a = document.getElementById('a')
    const btn = document.getElementById('getBTN')
    
    //DOM render functions for random quotes
    
    function renderOneRandomQuote(quotes){
        let i = Math.round(Math.random() * 2000)
        q.innerText = quotes[i].text
        a.innerText = quotes[i].author
    }
    
    //fetch requests
    //get fetch for all random quotes resources
    function getAllRandomQuotes () {
        fetch(`https://type.fit/api/quotes`,)
            .then(response => response.json())
            .then(quotes => quotes.forEach(quote => renderOneRandomQuote(quotes)))   
    };
    
    //Initial Render
    //get data and render random quotes to the DOM
    function initializePublicAPI() {
        getAllRandomQuotes()
    }
    initializePublicAPI()
    
    btn.addEventListener('click', initializePublicAPI);
    
    })

//DOM render functions
function renderOneQuote(quote) {
    //build quote
    let card = document.createElement('li')
    card.innerHTML = `
    <div class="card" style="width: 100%;">
              <div class="card-body">
                <blockquote class="blockquote mb-0">
                    <p>${quote.text}</p>
                    <footer class="blockquote-footer">Quoted by <cite title="Source Title">${quote.author}</cite></footer>
                </blockquote>
                <br>
                <div id="dlt">
                <button id="deleteBTN" class="btn btn-outline-info">Delete</button>
                <i id='up' class="fa-solid fa-thumbs-up fa-2x"></i><span id='upLikes'> ${quote.likes}</span>
                <i id='down' class="fa-solid fa-thumbs-down fa-2x"></i><span id='downLikes'> ${quote.dislikes}</span>
                </div>
              </div>
            </div>

            
    `

    //event listener on like button
    card.querySelector('#up').addEventListener('click', () => {
        quote.likes += 1
        card.querySelector('#upLikes').innerHTML = quote.likes
        updateLikes(quote)
    })
    //event listener on dislike button
    card.querySelector('#down').addEventListener('click', () => {
        quote.dislikes += 1
        card.querySelector('#downLikes').innerHTML = quote.dislikes
        updateDislikes(quote)
    })
  
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
        author: e.target.author.value,
        likes: 0,
        dislikes: 0
    }
    renderOneQuote(quote)
    newQuote(quoteObj)
}

//fetch requests
//get fetch for all quotes resources
function getAllQuotes() {
    fetch('http://localhost:3000/quotes/')
    .then(res => res.json())
    .then(quotes => quotes.forEach(quote => renderOneQuote(quote)))
}

//fetch POST request
//add a quote on the quote resources
function newQuote(quoteObj) {
    fetch('http://localhost:3000/quotes', {
        method: 'POST',
        headers : {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(quoteObj)
    })
    .then(res => res.json())
    .then(quote => newQuote(quote))
}

//fetch PATCH request
//edit a quote on the quote resources
function updateLikes(quoteObj) {
    fetch(`http://localhost:3000/quotes/${quoteObj.id}`, {
        method: 'PATCH',
        headers : {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(quoteObj)
    })
    .then(res => res.json())
    .then(quote =>console.log(quote) )
}

//fetch PATCH request
//edit a quote on the quote resources
function updateDislikes(quoteObj) {
    fetch(`http://localhost:3000/quotes/${quoteObj.id}`, {
        method: 'PATCH',
        headers : {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(quoteObj)
    })
    .then(res => res.json())
    .then(quote =>console.log(quote) )
}

//fetch DELETE request
//delete a quote on the quote resources
function deleteQuote(id) {
    fetch(`http://localhost:3000/quotes/${id}`, {
        method: 'DELETE',
        headers : {
            'Content-Type':'application/json'
        }
    })
    .then(res => res.json())
    .then(quote => console.log(quote))
}

//Initial Render
//get data and render our quotes to the DOM

function initialize() {
    getAllQuotes();
}
initialize()