console.log("hello world");

// Client_id =d405829ff0871721459fd4cd5a7adfd4
// Private_id =546823550cecae6d687b96c795452d5cbf217804
// hash =29fc3fde6b5098622a3732b4fe5d1e54
//hash2=29FC3FDE6B5098622A3732B4FE5D1E54
//link=https://gateway.marvel.com:443/v1/public/characters?name=${name}&limit=60&apikey=d405829ff0871721459fd4cd5a7adfd4

// const form = document.querySelector("#form");
// let input = document.querySelector(".input-field").value;
// const h = document.querySelector(".h");
// form.addEventListener("submit", function (e) {
//   e.preventDefault();

//   renderHTML();
// });

// const renderHTML = function () {
//   const html = `
//                 <p>${document.querySelector(".input-field").value}</p>
//                 `;

//   h.insertAdjecentHTML("afterbegin", html);
// };

//https://gateway.marvel.com:443/v1/public/events/116?apikey=d405829ff0871721459fd4cd5a7adfd4
class MarvelComic {
  _API__LINK = `http://gateway.marvel.com/v1/public/comics?ts=1&apikey=d405829ff0871721459fd4cd5a7adfd4&hash=29fc3fde6b5098622a3732b4fe5d1e54`;
  __HASH = "29fc3fde6b5098622a3732b4fe5d1e54";
  __API__KEY = "d405829ff0871721459fd4cd5a7adfd4";
  character__section = document.querySelector(".character-section");
  movie__detail = document.querySelector(".movie-detail");
  form = document.querySelector("#form");

  constructor() {
    this.form.addEventListener("submit", this.search.bind(this));
  }

  search(e) {
    e.preventDefault();
    const inputField = document.querySelector(".input-field").value;

    this.getData(inputField);
    this.clear();
  }

  clear() {
    this.character__section.innerHTML = "";
    document.querySelector(".input-field").value = "";
  }
  getData(name) {
    fetch(
      `https://gateway.marvel.com:443/v1/public/characters?name=${name}&limit=60&apikey=d405829ff0871721459fd4cd5a7adfd4`
    )
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((res) => {
        console.log(res);
        this.data(...res.data.results);
        // console.log(res.data.results);
      });
  }
  getEventID(id) {
    fetch(
      `https://gateway.marvel.com:443/v1/public/events/${id}?apikey=d405829ff0871721459fd4cd5a7adfd4`
    )
      .then((res) => {
        // console.log(res);
        return res.json();
      })
      .then((res) => {
        // console.log(res);
        this.getImageData(...res.data.results);
      });
  }
  getImageData(data) {
    const characterImage = {
      image: data.thumbnail,
    };
    // console.log(characterImage.image);
    this.seriesMarkup(characterImage.image);
  }
  data(res) {
    const characterData = {
      name: res.name,
      description: res.description,
      image: res.thumbnail,
      events: res.events.items,
      urls: res.urls,
    };

    this.characterMarkup(characterData);
    this.getID(characterData.events);
  }

  //  let newArray = [];
  //   for(let i = 0; i < arrays.length; i++) {
  //       newArray.push(...arrays[i]);
  //   }
  getID(events) {
    const data = events.splice(2);

    data
      .map((element, i) => {
        return element.resourceURI;
      })
      .forEach((element) => {
        const data = element.slice(-3);
        if (data.startsWith("/")) return;

        this.getEventID(data);
      });
  }
  characterMarkup(data) {
    const html = `<div class="character-img">
                      <img src="${
                        data.image.path + "." + data.image.extension
                      }" alt="${data.name}" />
                    </div>
                    <div class="character-description">
                      <h1 class="character-name">${data.name}</h1>
                      <p>
                       ${data.description}
                      </p>
                      <a class="btn primary-btn" href="${
                        data.urls[1].url
                      }">learn more</a>
                  </div>
    
    `;
    this.character__section.insertAdjacentHTML("afterbegin", html);
  }

  seriesMarkup(data) {
    const path = `${data.path + "." + data.extension}?`;

    const html = `
          <img src="${path}" alt="" />
        
       
    `;
    document.querySelector(".comics").insertAdjacentHTML("afterbegin", html);
  }
}

const app = new MarvelComic();
