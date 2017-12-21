function renderReviewUser() {
    // '/review/user/xxxxxxxxxx'
    $.get('/review' + window.location.pathname).done(reviews => {
        console.log(reviews);
        reviews = reviews.reverse();
        for (let table = 0; table < Math.ceil(reviews.length / 3); table++) {
            $('#reviewCarousel .carousel-inner').append(`
                <div class="carousel-item">
                    <table class="review-table">
                        <tbody></tbody>
                    </table>
                </div>
            `);
            $('span#review-more-num-group').append(`
                <button class="review-more-num" data-target="#reviewCarousel" data-slide-to="${table}">${table + 1}</button>
            `);
        };

        if ($('span#review-more-num-group').children().length > 0) {
            $('span#review-more-num-group').parent().prepend(`
                <button class="review-more-prev" data-target="#reviewCarousel" role="button" data-slide="prev">
                    <i class="fa fa-chevron-left" aria-hidden="true"></i>
                    <span class="sr-only">Previous</span>
                </button>
            `);
            $('span#review-more-num-group').parent().append(`
                <button class="review-more-next" data-target="#reviewCarousel" role="button" data-slide="next">
                    <i class="fa fa-chevron-right" aria-hidden="true"></i>
                    <span class="sr-only">Next</span>
                </button>
            `);
        }
        $('#reviewCarousel .carousel-item:first-child').addClass('active');
        $('.review-more-num:first-child').addClass('review-more-current')

        for (let review = 0; review < reviews.length; review++) {
            let tableNum = Math.floor(review / 3) + 1;
            $('#reviewCarousel .carousel-item:nth-child(' + tableNum + ') tbody').append(`
                <tr>
                    <td valign="top" style="width: 80px">
                        <div class="review-pic-container">
                            <a href="/user/${reviews[review].author}" target="_blank">
                                <img class="review-pic" src="${reviews[review].authorPhoto[0]}" alt="Author photo">
                            </a>
                        </div>
                    </td>
                    <td valign="top">
                        <h5>${reviews[review].authorName}</h5>
                        <p>${reviews[review].text}</p>
                    </td>
                    <td valign="top">
                        <i class="fa fa-star checkmark" aria-hidden="true"></i>
                        <i class="fa fa-star checkmark" aria-hidden="true"></i>
                        <i class="fa fa-star checkmark" aria-hidden="true"></i>
                        <i class="fa fa-star checkmark" aria-hidden="true"></i>
                        <i class="fa fa-star checkmark" aria-hidden="true"></i>
                    </td>
                </tr>
            `);
            let indexInTable = (review % 3) + 1;
            for (let x = 1; x <= reviews[review].rating; x++) {
                $('#reviewCarousel .carousel-item:nth-child(' + tableNum + ') tr:nth-child('+ indexInTable + ') i:nth-child(' + x + ')').css({
                    color: 'rgb(232, 232, 0)'
                })
            }
        };

        // Calculate and render rating on page
        let sumRating = 0;
        reviews.forEach(review => {
            sumRating += review.rating
        });
        let meanRating = Math.round(sumRating/reviews.length);
        for (let x = 1; x <= meanRating; x++) {
            $('#dogRating i:nth-child(' + x + ')').css({
                color: 'rgb(232, 232, 0)'
            })
        }
        //$('#dogRating')

        // Highlight current carousel slide on review carousel
        $('#reviewCarousel').on('slide.bs.carousel', event => {
            $('.review-more-num:nth-child(' + (event.to + 1) + ')').addClass('review-more-current')
            $('.review-more-num:nth-child(' + (event.from + 1) + ')').removeClass('review-more-current')
        })
    });
}