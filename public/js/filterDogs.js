$(function () {
    
            $("#range").ionRangeSlider({
                min: 0,
                max: 5000,
                from: 0,
                to: 5000,
                type: 'double',
                step: 1,
                prefix: "$",
            });
            $('#price-menu').bind('click', function (e) {
                e.stopPropagation()
            })
    
            $('.filter-btn').popover({
                container: 'body',
                html: true,
                offset: 2,
                content: function () {
                    return $(this).next('.popper-content').html();
                }
            });
    
            $('input[name="datepicker"]').daterangepicker({
                "autoApply": true
            });
    
            $('.daterangepicker').click(() => {
                $('.daterangepicker').css({
                    display: block
                })
            })
    
            //Gender buttons
            let current_gender;
    
            $('#male').click(function () {
                $(this).addClass("active")
                $('#female').removeClass("active")
                $('#both-gender').removeClass("active")
                $('.Female').hide()
                $('.Male').show()
            })
    
            $('#female').click(function () {
                $(this).addClass("active")
                $('#male').removeClass("active")
                $('#both-gender').removeClass("active")
                $('.Male').hide()
                $('.Female').show()
            })
    
            $('#both-gender').click(function () {
                $(this).addClass("active")
                $('#female').removeClass("active")
                $('#male').removeClass("active")
                $('.Female').show()
                $('.Male').show()
            })
    
            //Size
            current_size = null;
    
            $('#small').click(function () {
                $(this).addClass("active")
                $('#medium').removeClass("active")
                $('#large').removeClass("active")
                $('#all').removeClass("active")
                $('.Small').show()
                $('.Medium').hide()
                $('.Large').hide()
            })
    
            $('#medium').click(function () {
                $(this).addClass("active")
                $('#small').removeClass("active")
                $('#large').removeClass("active")
                $('#all').removeClass("active")
                $('.Small').hide()
                $('.Medium').show()
                $('.Large').hide()
            })
    
            $('#large').click(function () {
                $(this).addClass("active")
                $('#medium').removeClass("active")
                $('#large').removeClass("active")
                $('#all').removeClass("active")
                $('.Small').hide()
                $('.Medium').hide()
                $('.Large').show()
            })
    
            $('#all').click(function () {
                $(this).addClass("active")
                $('#medium').removeClass("active")
                $('#large').removeClass("active")
                $('#small').removeClass("active")
                $('.Small').show()
                $('.Medium').show()
                $('.Large').show()
            })
    
    
            //Breed
            $('#breed').keyup(function () {
                let str = $(this).val()
                $('.dog-col').each(function () {
                    let classes = $(this).attr('class')
                    if (!RegExp(`breed-${str}`).test(classes)) {
                        $(this).hide()
                    } else {
                        $(this).show()
                    }
                })
    
                $('#size').children().each(function(){
                    let classes = $(this).attr("class")
                    if (classes.includes("active")){
                        $(this).trigger("click")
                    }
                })
    
                $('#gender').children().each(function(){
                    let classes = $(this).attr("class")
                    if (classes.includes("active")){
                        $(this).trigger("click")
                    }
                })
            })
    
        });