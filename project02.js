const myArticles = [
  { id: 1, title: "7 Practical CSS Tips" },
  { id: 2, title: "7 Practical Javascript Tips" },
  { id: 3, title: "7 Practical React Tips" },
];

const article = `<div class="row gy-5">
<div class="col-12">
  <div class="row">
    <div class="col-8">
      <div class="h-25 row">
        <div class="col-1">
          <img src="./assets/avatar_default.png" alt="..." />
        </div>
        <div class="col">
          <p>
            <b className="criticsName"></b> <small class="text-muted">in</small>
            <b>Movie review</b> <small class="text-muted" className="date"></small>
          </p>
        </div>
      </div>
      <div class="h-40 row">
      <p class="h3 title" id="title"></p>
      </div>
      <div class="h-25 row">
        <p id="description"></p>
      </div>

      <div class="h-5 row">
        <div class="col-10">
        <small>MPAA Rating:</small>
        <small class="text-muted" className:"rating"></small>

        </div>
        
        <div class="col-2">
          <img src="./assets/skeleton-rect.png" alt="..." />
          <img src="./assets/skeleton-rect.png" alt="..." />
          <img src="./assets/skeleton-rect.png" alt="..." />
        </div>
      </div>
    </div>

    <div class="col">
      <img className="news-image" class="img-fluid" alt="..." />
    </div>
  </div>
  <hr />
</div>
</div>
`;

function loadArticles(){
  const container = document.getElementById("container");
  const container2 = document.getElementById("container2");
  let fetchedArticles = "";

  function getCritics(){
  fetch ("https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=5PX4ZbceN0FHdvTbhQ75xKJ3escEpHHI")
  .then (function(promise){
    return promise.json();
  })

  .then(function(data){
    const res = data.results;
    fetchedArticles=data.results;
    res.forEach(element => {
      const newTitle = article.replace(
        `id="title">`,
        `id="title">${element.headline}`
      )

      const description = element.summary_short.length>150? element.summary_short.slice(0,150)+" ..." : element.summary_short;

      const newDescription=newTitle.replace(
        `id="description">`,
        `id="title">${description}`
      );

      const imageNews = element.multimedia.src;

      const newImage = newDescription.replace(
        `className="news-image"`,
        `className="news-image" src="${imageNews}"`
      );

      const critics = element.byline;
      const newAuthor = newImage.replace(
        `className="criticsName">`,
        `className="criticsName">${critics}`
      );

      const newDate = newAuthor.replace(
        `className="date">`,
        `className="date">${element.publication_date}`
      )

      const addRating = element.mpaa_rating.length>0 ? element.mpaa_rating:"none";

      const rating =newDate.replace(
        `className:"rating">`,
        `className:"rating">${addRating}`
      )

      container.innerHTML+=rating;

      handleClickOnTitle();

    });
  })
  .catch((e)=> console.log(e));
}

getCritics();

console.log(fetchedArticles);


function handleClickOnTitle(){
  const titles = document.querySelectorAll(".title");
  const buttons = document.querySelectorAll(".go-back");
  const data2 = document.querySelectorAll(".data2");
  
  for(let i =0; i<titles.length;i++){
    titles[i].addEventListener("click", () =>{
              container.style.display ="none"
              container2.style.display = "block ";
      
              const newTitle = document.querySelector(".title2");
              newTitle.innerHTML = titles[i].innerHTML;

              const descr = document.getElementById('description2') ;
              const critics2 = document.querySelector(".critics2");

              fetchedArticles.filter(
                (el) => {if (titles[i].textContent = el.headline){
                descr.textContent= "";
                descr.append(el.summary_short)[i]

              }})
              
})}

buttons.forEach((el)=>{
  el.addEventListener("click", () => {
    container.style.display = "block ";
    container2.style.display = "none";
  })
})

}
}


  



// 2. https://api.nytimes.com/svc/topstories/v2/home.json?api-key=gD9IU2QvCP1RIM33ArbttgsdVz8WnPkl
