/*
Third part
*/
//= ../bower_components/jquery/dist/jquery.js
//= ../bower_components/bootstrap/js/carousel.js
// = ../bower_components/lodash/lodash.js
// = ../bower_components/jquery.transit/jquery.transit.js
// = ../bower_components/jquery.browser/dist/jquery.browser.js

/*//= touchswipe.js*/
$(document).bind("mobileinit", function() {
  $.mobile.defaultHomeScroll = 0;
  $.mobile.autoInitializePage = false;
  $.mobile.ajaxEnabled = false;

  var silentScroll = $.mobile.silentScroll;
  $.mobile.silentScroll = function( ypos ) {
  if ( $.type( ypos ) !== "number" ) {
    // FIX : prevent auto scroll to top after page load
          return;
      } else {
          silentScroll.apply(this, arguments);
      }
  }
});
//= jquery.mobile.js

//= _header.js
//= _watcher.js
//= _map.js
//= _survey.js

var scrollToElement = function(el) {
  $('html, body').animate({
      scrollTop: $(el).offset().top
  }, 1000);
};

;(function(window) {
    "use strict";

    var $ = window.jQuery;
    if(location.hash) {
      $.mobile.hashListeningEnabled = false;
      $.mobile.linkBindingEnabled = false;
      console.log(12312);
      setTimeout(function() {
        //$.mobile.silentScroll($(location.hash).offset().top - $(window).scrollTop());

      }, 1000);
    }
    $("a").attr("rel","external");

    $('a').each(function(e) {
      $(this).attr('data-role', 'none');
    });

    window.Header();
    window.Watcher();
    window.Map();

    $(function() {
      var initYouTubePopups = function() {
        setTimeout(function() {
          $('.js-video-open').each(function(ev, el) {
            $(el).unbind();

            $(el).on('click', function() {
              //var _videoLink = ($(this).attr('youtube_link')) ? youtubeParser($(this).attr('youtube_link')) : youtubeParser($(this).attr('data-video-url'));
              var _videoLink = $(this).attr('youtube_link') ? youtubeParser($(this).attr('youtube_link')) :  $(this).attr('data-video-url').split('/')[$(this).attr('data-video-url').split('/').length - 1];
              $('body').append('<div class="js-video-popup youtube_popup"> <div class="bg"></div><i class="js-video-popup-close icon icon-close hidden-mobile"></i> <i class="js-video-popup-close icon only-mobile icon-count_close"></i> <div class="video_player"> </div></div>');
              $('.js-video-popup').fadeIn();
              if($(this).attr('youtube_link')) {
                $('.js-video-popup').find('.video_player').html('<iframe id="ytplayer" type="text/html" width="' + $('.video_player').width() + '" height="' + $('.video_player').height() + '" src="https://www.youtube.com/embed/' + _videoLink + '" frameborder="0" allowfullscreen></iframe>');

              } else {
                $('.js-video-popup').find('.video_player').html('<script src="//fast.wistia.com/embed/medias/' + _videoLink + '.jsonp" async></script><script src="//fast.wistia.com/assets/external/E-v1.js" async></script><div class="wistia_embed wistia_async_' + _videoLink + '" style="height:100%;width:100%">&nbsp;</div>');
              }

              $('.js-video-popup-close').on('click', function() {
                $('.js-video-popup').find('.video_player').html('');
                $('.js-video-popup').fadeOut();
                $('.js-video-popup').remove();
                $('.js-video-popup-close').unbind();
              });
            });
          });
        }, 1000);
      };

      var body = $('body');
      var el = {
        scrollBtn: $('.js-scrollup')
      };

      initYouTubePopups();

      el.scrollBtn.click(function() {
        body.animate({ scrollTop: 0 }, "slow");
        return false;
      });

      function youtubeParser(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
      }

      $('.carousel').each(function(e) {
        $(this).carousel();
        initYouTubePopups();
      });

      $(".carousel-inner").on("swipeleft",function(){
        console.log("swipeleft");
        $(this).parent().carousel('next');
        initYouTubePopups();
      });

      $(".carousel-inner").on("swiperight",function(){
        console.log('right');
        $(this).parent().carousel('prev');
        initYouTubePopups();
      });

      /*$(".carousel-inner").swipe( {
				//Generic swipe handler for all directions
        allowPageScroll: "horizontal",
				swipeLeft:function(event, direction, distance, duration, fingerCount) {
  				$(this).parent().carousel('next');
				},
				swipeRight: function() {
          $(this).parent().carousel('prev');
				},
				//Default is 75px, set to 0 for demo so any distance triggers swipe
				threshold: 50
			});*/

      $('.js-switcher-1').on('click', function() {
        $('.js-switchcase-2').hide();
        $('.js-switcher-2').removeClass('active');
        $('.js-switchcase-1').show();
        $('.js-switcher-1').addClass('active');
      });

      $('.js-switcher-2').on('click', function() {
        $('.js-switchcase-1').hide();
        $('.js-switcher-1').removeClass('active');
        $('.js-switchcase-2').show();
        $('.js-switcher-2').addClass('active');
      });

      $('.js-switcher-3').on('click', function() {
        $('.js-switchcase-4').hide();
        $('.js-switcher-4').removeClass('active');
        $('.js-switchcase-3').show();
        $('.js-switcher-3').addClass('active');
      });

      $('.js-switcher-4').on('click', function() {
        $('.js-switchcase-3').hide();
        $('.js-switcher-3').removeClass('active');
        $('.js-switchcase-4').show();
        $('.js-switcher-4').addClass('active');
      });

      $('.carousel .item').each(function() {
        var next = $(this).next();
        if (!next.length) {
          next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));

        if (next.next().length>0) {
          next.next().children(':first-child').clone().appendTo($(this));
        }
        else {
          $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
        }
      });

      $('.j-open-cert').on('click', function() {
        $('.certificate_popup').addClass('active');

        var _items = $('.certificate_popup').find('.cert-item');
        $('.certificate_popup').find('.js-cert-indicator').html("");
        _items.each(function(id, ev) {
          $('.certificate_popup').find('.js-cert-indicator').append( $('<li class="indicator"></li>') );
        });

        $('.certificate_popup').find('.js-cert-indicator li:first-child').addClass('active');

        $('.j-cert-back').on('click', function() {
          var _items = $('.certificate_popup').find('.cert-item');
          var _id = 0;

          _items.each(function(id, ev) {
            if($(ev).hasClass('active')) {
              $(ev).removeClass('active');
              $('.certificate_popup').find('.js-cert-indicator li').eq(id).removeClass('active');
              _id = id - 1;

              if(id == 0) {
                _id =  _items.length - 1;
              }

              _items.eq(_id).addClass('active');
              $('.certificate_popup').find('.js-cert-indicator li').eq(_id).addClass('active');
              return false
            }
          });
        });

        $('.j-cert-next').on('click', function(e) {
          var _items = $('.certificate_popup').find('.cert-item');
          var _id = 0;

          _items.each(function(id, ev) {
            if($(ev).hasClass('active')) {
              $(ev).removeClass('active');
              $('.certificate_popup').find('.js-cert-indicator li').eq(id).removeClass('active');
              _id = id + 1;

              if(id == _items.length - 1) {
                _id = 0;
              }

              _items.eq(_id).addClass('active');
              $('.certificate_popup').find('.js-cert-indicator li').eq(_id).addClass('active');
              return false;
            }
          });
        });
      });

      $('.j-open-cert-1').on('click', function() {
        $('.j-certificate_popup-1').addClass('active');

        var _items = $('.j-certificate_popup-1').find('.cert-item');
        $('.j-certificate_popup-1').find('.js-cert-indicator').html("");
        _items.each(function(id, ev) {
          $('.j-certificate_popup-1').find('.js-cert-indicator').append( $('<li class="indicator"></li>') );
        });

        $('.j-certificate_popup-1').find('.js-cert-indicator li:first-child').addClass('active');

        $('.j-cert-back').on('click', function() {
          var _items = $('.j-certificate_popup-1').find('.cert-item');
          var _id = 0;

          _items.each(function(id, ev) {
            if($(ev).hasClass('active')) {
              $(ev).removeClass('active');
              $('.j-certificate_popup-1').find('.js-cert-indicator li').eq(id).removeClass('active');
              _id = id - 1;

              if(id == 0) {
                _id =  _items.length - 1;
              }

              _items.eq(_id).addClass('active');
              $('.j-certificate_popup-1').find('.js-cert-indicator li').eq(_id).addClass('active');
              return false
            }
          });
        });

        $('.j-cert-next').on('click', function(e) {
          var _items = $('.j-certificate_popup-1').find('.cert-item');
          var _id = 0;

          _items.each(function(id, ev) {
            if($(ev).hasClass('active')) {
              $(ev).removeClass('active');
              $('.j-certificate_popup-1').find('.js-cert-indicator li').eq(id).removeClass('active');
              _id = id + 1;

              if(id == _items.length - 1) {
                _id = 0;
              }

              _items.eq(_id).addClass('active');
              $('.j-certificate_popup-1').find('.js-cert-indicator li').eq(_id).addClass('active');
              return false;
            }
          });
        });
      });

      $('.j-open-cert-2').on('click', function() {
        $('.j-certificate_popup-2').addClass('active');

        var _items = $('.j-certificate_popup-2').find('.cert-item');
        $('.j-certificate_popup-2').find('.js-cert-indicator').html("");
        _items.each(function(id, ev) {
          $('.j-certificate_popup-2').find('.js-cert-indicator').append( $('<li class="indicator"></li>') );
        });

        $('.j-certificate_popup-2').find('.js-cert-indicator li:first-child').addClass('active');

        $('.j-cert-back').on('click', function() {
          var _items = $('.j-certificate_popup-2').find('.cert-item');
          var _id = 0;

          _items.each(function(id, ev) {
            if($(ev).hasClass('active')) {
              $(ev).removeClass('active');
              $('.j-certificate_popup-2').find('.js-cert-indicator li').eq(id).removeClass('active');
              _id = id - 1;

              if(id == 0) {
                _id =  _items.length - 1;
              }

              _items.eq(_id).addClass('active');
              $('.j-certificate_popup-2').find('.js-cert-indicator li').eq(_id).addClass('active');
              return false
            }
          });
        });

        $('.j-cert-next').on('click', function(e) {
          var _items = $('.j-certificate_popup-2').find('.cert-item');
          var _id = 0;

          _items.each(function(id, ev) {
            if($(ev).hasClass('active')) {
              $(ev).removeClass('active');
              $('.j-certificate_popup-2').find('.js-cert-indicator li').eq(id).removeClass('active');
              _id = id + 1;

              if(id == _items.length - 1) {
                _id = 0;
              }

              _items.eq(_id).addClass('active');
              $('.j-certificate_popup-2').find('.js-cert-indicator li').eq(_id).addClass('active');
              return false;
            }
          });
        });
      });

      $('.j-cert-popup-close').on('click', function() {
        $('.certificate_popup').removeClass('active');

        $('.j-cert-back').unbind('click');
        $('.j-cert-next').unbind('click');
      });
    });
}(window));

$(document).on("mobileinit", function () {

});
