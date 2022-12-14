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
}