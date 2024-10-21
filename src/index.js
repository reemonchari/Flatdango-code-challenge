document.addEventListener("DOMContentLoaded", () => {
const poster = document.getElementById("poster")
const title = document.getElementById("title")
const runtime = document.getElementById("runtime")
const showtime = document.getElementById("showtime")
const description = document.getElementById("film-info")
const ticketNum = document.getElementById("ticket-num")
const buyTicket = document.getElementById("buy-ticket")
let availableTickets 

function movieDetails(movie) {
    poster.src = movie.poster
    poster.alt = movie.title
    title.textContent = movie.title
    runtime.textContent = `${movie.runtime} minutes`
    showtime.textContent = movie.showtime
    description.textContent = movie.description
    availableTickets = movie.capacity - movie.tickets_sold
    ticketNum.textContent = `${availableTickets}`


buyTicket.addEventListener("click", () => {
    if (availableTickets > 0) {
        availableTickets--
        ticketNum.textContent = `${availableTickets}`
    }
    else {
        buyTicket.textContent = "Sold Out"
    }
})
}

fetch("http://localhost:3000/films/1")
.then(response => response.json())
.then(movie => movieDetails(movie))

const filmsList = document.getElementById("films")
fetch("http://localhost:3000/films")
.then(response => response.json())
.then(films => {
    films.forEach(film => {
        const filmItem = document.createElement("li")
        filmItem.className = "film item"
        filmItem.textContent = film.title
        filmItem.style.cursor = "pointer"
        filmItem.addEventListener("click", () => movieDetails(film))
        filmsList.appendChild(filmItem)
    })
})

})

