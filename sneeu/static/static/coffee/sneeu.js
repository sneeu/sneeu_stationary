(function() {
  var $, $container, $current, $nextArrow, $prevArrow, next, prev, update;
  $ = jQuery;
  $current = null;
  $container = null;
  $prevArrow = $('<span class="prev"><label>&lsaquo;</label></span>');
  $nextArrow = $('<span class="next"><label>&rsaquo;</label></span>');
  update = function() {
    $prevArrow.toggle($current.prev('article').length > 0);
    $nextArrow.toggle($current.next('article').length > 0);
    $('html, body').stop().animate({
      scrollTop: Math.min($('#wrapper').offset().top, $(window).scrollTop())
    }, 200);
    $current.siblings().removeClass('current');
    $current.siblings(':visible').fadeOut(100, function() {
      return $current.addClass('current').fadeIn(100);
    });
    return $container.animate({
      'height': $current.outerHeight(true)
    });
  };
  prev = function() {
    var $prev;
    $prev = $current.prev('article');
    if ($prev.length > 0) {
      $current = $prev;
      return update();
    }
  };
  next = function() {
    var $next;
    $next = $current.next('article');
    if ($next.length > 0) {
      $current = $next;
      return update();
    }
  };
  $prevArrow.click(prev);
  $nextArrow.click(next);
  $(window).load(function() {
    $container = $('#content');
    $('#wrapper').append($prevArrow).append($nextArrow);
    $current = $('#content > article:first-child');
    $current.siblings('article').hide();
    return update();
  });
}).call(this);
