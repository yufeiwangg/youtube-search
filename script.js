$(document).ready(function(){
// ----- defining constants and loading the DOM ---- //
const reloadBtn = document.getElementById('search-button');
const hideToggle = document.getElementById('hide-toggle');
reloadBtn.addEventListener("click", reload);
const API = "AIzaSyAWpKIcScj1dNTRfV0yMiU-ICDCzhehJdw";
const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${document.getElementById("search-bar").value || emptySearch()}&key=${API}`;

function reload(){
    location.reload(); 
    return false
}

function emptySearch(){
    searchTerms = ["javascript", "python", "coding"];
    rand = Math.floor(Math.random() * searchTerms.length);
    return searchTerms[rand];
}

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log("data items[0] (id)" + data.items[0].id.videoId);
    let id = data.items[0].id.videoId;

    resultsLoop(data);
    
});

function mainVid(id){
    $('#video').html(`
    <iframe width="1008" height="567" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="encrypted-media" allowfullscreen></iframe>
    `);
}

function resultsLoop(data){
    console.log(data);
    $.each(data.items, function(i, item){
        var thumb = item.snippet.thumbnails.medium.url;
        var title = item.snippet.title;
        var desc = item.snippet.description.substring(0, 200);
        var vid = item.id.videoId;
        var channel = item.snippet.channelTitle;
        $('main').append(`
        <article class="item" data-key="${vid}">
            <img src="${thumb}" alt="" class="thumb">
            <div class="details">
                <h4>${title}</h4>
                <p>${channel}</p>
                <p class="desc">${desc}</p>
            </div>
        </article>`);
    })

    $('main').on('click', 'article', function(){
        var id = $(this).attr('data-key');
        mainVid(id);
        hideToggle.style.display = "none";
    })
}
})