    function createDogCard(dogJson) {

        let imgs = dogJson.photos.map((img,i) => {
            if ( i == 0){
            return `<div class="carousel-item active">
                       <img src="data:image ;base64, ${img}" alt="dog image" />
                    </div>`

            } else {
            return `<div class="carousel-item">
                      <img src="data:image ;base64, ${img}" alt="dog image" />
                    </div>`
            }
        })

        let li = dogJson.photos.map((img,i) => {
            if ( i == 0){
                return `<li data-target="#${dogJson._id}" data-slide-to="0" class="active"></li>`
            } else {
                return `<li data-target="#${dogJson._id}" data-slide-to="${i}" ></li>`
            }
        })

        let s = ` <div class="col-sm-6 col-lg-4">
                        <div class="card dog-card">
                            <div id="${dogJson._id}" class="carousel slide card-img-top" data-interval="false">
                                <ol class="carousel-indicators">
                                    ${li.join("")}
                                </ol>
                                <div class="carousel-inner">
                                    ${imgs.join("")}
                                </div>
                                <a class="carousel-control-prev" href="#${dogJson._id}" role="button" data-slide="prev">
                                    <i class="fa fa-chevron-left" aria-hidden="true"></i>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next" href="#${dogJson._id}" role="button" data-slide="next">
                                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                                    <span class="sr-only">Next</span>
                                </a>
                            </div>
                            <div class="card-body">
                                <h4 class="card-title">${dogJson.name}</h4>
                                <p class="card-text">${dogJson.description}</p>
                                <a href="/dog/${dogJson._id}" class="btn btn-primary">Go somewhere</a>
                            </div>
                        </div>
                    </div>`
                    return s
    }