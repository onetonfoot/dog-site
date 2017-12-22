function renderDogCarousel(dogJson) {
    let imgs = dogJson.photos.map((img, i) => {
        if (i == 0) {
            return `<div class="carousel-item active">
                <img src="data:image ;base64, ${img}" alt="dog image" />
            </div>`

        } else {
            return `<div class="carousel-item">
                <img src="data:image ;base64, ${img}" alt="dog image" />
            </div>`
        }
    })

    let thumbnail = dogJson.photos.map((img, i) => {
        if (i == 0) {
            return `<button data-target="#${dogJson._id}" data-slide-to="0" class="active thumbnail"><img src="data:image ;base64, ${img}" alt="dog image"/></button>`
        } else {
            return `<button data-target="#${dogJson._id}" class="thumbnail" data-slide-to="${i}" ><img src="data:image ;base64, ${img}" alt="dog image" /></button>`
        }
    })

    let s = `<div id="${dogJson._id}" class="carousel slide">
                        <div class="carousel-inner">
                            ${imgs.join("")}
                        </div>
                        </div>
                        <div class="mt-3 d-flex justify-content-center">
                            ${thumbnail.join("")}
                        </div>
                    </div>`
    return s
}