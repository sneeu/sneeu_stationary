$ = jQuery
$current = null
$container = null
$prevArrow = $('<span class="prev"><label>&lsaquo;</label></span>')
$nextArrow = $('<span class="next"><label>&rsaquo;</label></span>')

update = ->
    $prevArrow.toggle($current.prev('article').length > 0)
    $nextArrow.toggle($current.next('article').length > 0)

    $('html, body').stop().animate({
        scrollTop: Math.min($('#wrapper').offset().top, $(window).scrollTop())
    }, 200)

    $current.siblings().removeClass('current')

    $current.siblings(':visible').fadeOut(100, ->
        $current.addClass('current').fadeIn(100))


    $container.animate({'height': $current.outerHeight(true)})

prev = ->
    $prev = $current.prev('article')
    if $prev.length > 0
        $current = $prev
        update()

next = ->
    $next = $current.next('article')
    if $next.length > 0
        $current = $next
        update()

$prevArrow.click(prev)
$nextArrow.click(next)

$(window).load ->
    $container = $('#content')
    $('#wrapper').append($prevArrow).append($nextArrow)

    $current = $('#content > article:first-child')
    $current.siblings('article').hide()
    update()
