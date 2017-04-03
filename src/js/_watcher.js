;(function(window) {
    "use strict";

    var $ = window.jQuery;
    var body = $('body');
    var el = {
      fadeInUp: $('.js-fadeInUp').not('.js-fadeInUp__toggle'),
      fadeInUp_toggle: 'js-fadeInUp__toggle',
      fadeIn: $('.js-fadeIn').not('.js-fadeIn__toggle'),
      fadeIn_toggle: 'js-fadeIn__toggle',
      col_left: $('.js-col-left'),
      col_trigger: $('.js-col-trigger'),
      faq_collapse: $('.js-faq-collapse'),
    };
    var desktop_breakpoint = 1250;


    window.Watcher = function() {
      $(document).ready(function() {
        initTriggers();
        initEvents();
        initYoutube();
        initFormCalc();
        initArticle();
        initForm();
        //initYouTubePopups();

        $(document).on('scroll', function(){
          initTriggers();

          /*if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            console.log($('body').scrollTop());
            if($('body').scrollTop() > 100) {
              $('.share_icons').css('top', '10px');
              $('.share_icons').css('margin-top', '0');
            } else {
              $('.share_icons').css('top', 'initial');
              $('.share_icons').css('margin-top', '10px');
            }
          }*/
        });

        $(window).on('resize', function() {
          initYoutube();
        });

        /*$('.js-square').keyup(function() {
           $(this).val(function(i,v) {
             return v.replace(' м2','') + ' м2'; //remove exisiting, add back.
           });
         });*/
      })
    };
    var initForm = function() {
      $("form#job").submit(function(e) {
        e.preventDefault();
        var formData = new FormData(document.querySelector('form#job'));

        console.log(formData);

        $.ajax({
            url: '/wp-admin/admin-ajax.php?action=send_vacancy',
            type: 'POST',
            data: formData,
            async: false,
            success: function (data) {
              if(data.success) {
                if(CURRENT_LANG == 'ru') {
                  swal("Форма успешно отправлена.", "", "success");
                } else {
                  swal("Veidlapa veiksmīgi nosūtīts.", "", "success");
                }
              } else {
                if(CURRENT_LANG == 'ru') {
                  swal("При отправке формы произошла ошибка.", "Не все поля заполнены", "warning");
                } else {
                  swal("Iesniedzot veidlapu kļūda.", "Ne visi lauki ir aizpildīti", "warning");
                }
              }
            },
            error: function(data) {
              if(CURRENT_LANG == 'ru') {
                swal("При отправке формы произошла ошибка.", "", "warning");
              } else {
                swal("Iesniedzot veidlapu kļūda.", "", "warning");
              }
            },
            cache: false,
            contentType: false,
            processData: false
        });

        return false;
      });
    };

    var initArticle = function() {
      var article = $('.js-article');
      if(article) {
        article.find('img').each(function(id, item) {
          $(item).after("<div class='img-alt' style='width: " + $(item).css('width') + "'>" + $(item).attr('alt') + "</div>");
        });
      }
    };

    var initFormCalc = function() {
      $('.js-company-selector').change(function() {
        if($('.js-new-company').is(':checked')) {
          if($('.js-company-selector option:selected').val() == "0") {
            $('.js-company-form').each(function() {
              $(this).hide();
            });

            $('.js-new-company-0').show();
          } else if($('.js-company-selector option:selected').val() == "1") {
            $('.js-company-form').each(function() {
              $(this).hide();
            });

            $('.js-new-company-1').show();
          } else if($('.js-company-selector option:selected').val() == "2") {
            $('.js-company-form').each(function() {
              $(this).hide();
            });

            $('.js-new-company-2').show();
          }
        } else {
          if($('.js-exist-company').is(':checked')) {
            if($('.js-company-selector option:selected').val() == "0") {
              $('.js-company-form').each(function() {
                $(this).hide();
              });

              $('.js-exist-company-0').show();
            } else if($('.js-company-selector option:selected').val() == "1") {
              $('.js-company-form').each(function() {
                $(this).hide();
              });

              $('.js-exist-company-1').show();
            } else if($('.js-company-selector option:selected').val() == "2") {
              $('.js-company-form').each(function() {
                $(this).hide();
              });

              $('.js-exist-company-2').show();
            }
          }
        }
      });

      $('.js-new-company').change(function() {
        if($(this).is(':checked')) {
          $('.js-exist-company').prop('checked', false);
          if($('.js-company-selector option:selected').val() == "0") {
            $('.js-company-form').each(function() {
              $(this).hide();
            });

            $('.js-new-company-0').show();
          } else if($('.js-company-selector option:selected').val() == "1") {
            $('.js-company-form').each(function() {
              $(this).hide();
            });

            $('.js-new-company-1').show();
          } else if($('.js-company-selector option:selected').val() == "2") {
            $('.js-company-form').each(function() {
              $(this).hide();
            });

            $('.js-new-company-2').show();
          }
        } else {
          $('.js-company-form').each(function() {
            $(this).hide();
          });
        }
      });

      $('.js-exist-company').change(function() {
        if($(this).is(':checked')) {
          $('.js-new-company').prop('checked', false);
          if($('.js-company-selector option:selected').val() == "0") {
            $('.js-company-form').each(function() {
              $(this).hide();
            });

            $('.js-exist-company-0').show();
          } else if($('.js-company-selector option:selected').val() == "1") {
            $('.js-company-form').each(function() {
              $(this).hide();
            });

            $('.js-exist-company-1').show();
          } else if($('.js-company-selector option:selected').val() == "2") {
            $('.js-company-form').each(function() {
              $(this).hide();
            });

            $('.js-exist-company-2').show();
          }
        } else {
          $('.js-company-form').each(function() {
            $(this).hide();
          });
        }
      });

      var vals = {
        x1: 10,
        x2: 15,
        x3: 10
      };

      var val = vals.x3;

      $('.js-selected-city').change(function() {
        if($(".js-selected-city option:selected" ).val() == 1) {
          vals = {
            x1: 14,
            x2: 25,
            x3: 36,
            x4: 22.50,
            x5: 66
          };
        } else if($(".js-selected-city option:selected" ).val() == 2) {
          vals = {
            x1: 12.50,
            x2: 24.90,
            x3: 36,
            x4: 22.50,
            x5: 66
          };
        } else if($(".js-selected-city option:selected" ).val() == 3) {
          vals = {
            x1: 14.00,
            x2: 26.50,
            x3: 36,
            x4: 23.50,
            x5: 66
          };
        } else if($(".js-selected-city option:selected" ).val() == 4) {
          vals = {
            x1: 14.00,
            x2: 25,
            x3: 36,
            x4: 21.50,
            x5: 66
          };
        } else if($(".js-selected-city option:selected" ).val() == 5) {
          vals = {
            x1: 14.00,
            x2: 25,
            x3: 36,
            x4: 22.50,
            x5: 66
          };
        } else if($(".js-selected-city option:selected" ).val() == 6) {
          vals = {
            x1: 12.50,
            x2: 24.90,
            x3: 36,
            x4: 22.50,
            x5: 66
          };
        } else {
          vals = {
            x1: 0,
            x2: 0,
            x3: 0,
            x4: 0
          };
        }

        val = 0;

        if($('.calc_1').is(':checked')) {
            val = val + vals.x1;

            if($('.calc_3').is(':checked')) {
              val = vals.x1;
            } else {
              val = val + vals.x3;
            }

            if($('.calc_2').is(':checked')) {
              //val = val - vals.x2;
              //val = val - vals.x4;
              $('.calc_2').prop('checked', false);
            }

            if($('.calc_4').is(':checked')) {
              //val = val - vals.x2;
              //val = val - vals.x4;
              $('.calc_4').prop('checked', false);
            }

            putValue();
        } else if($('.calc_2').is(':checked')) {
            val = val + vals.x2;

            /*if($('.calc_3').is(':checked')) {
              val = vals.x2;
            } else {
              val = val + vals.x4;
            }*/

            if($('.calc_1').is(':checked')) {
              //val = val - vals.x1;
              //val = val - vals.x3;
              $('.calc_1').prop('checked', false);
            }

            if($('.calc_4').is(':checked')) {
              //val = val - vals.x2;
              //val = val - vals.x4;
              $('.calc_4').prop('checked', false);
            }

          putValue();
        } else if($('.calc_4').is(':checked')) {
            val = val + vals.x4;

            if($('.calc_3').is(':checked')) {
              val = vals.x4;
            } else {
              val = val + vals.x5;
            }

            if($('.calc_1').is(':checked')) {
              //val = val - vals.x1;
              //val = val - vals.x3;
              $('.calc_1').prop('checked', false);
            }

            if($('.calc_2').is(':checked')) {
              //val = val - vals.x2;
              //val = val - vals.x4;
              $('.calc_2').prop('checked', false);
            }

          putValue();
        }
      });



      $('.calc_1').change(function(){
        if(!$('.js-total-value').is(':visible') && $('.js-selected-city option:selected').val().length > 0) {
          $('.js-total-value').fadeIn();
        }
        val = 0;

        $('.calc_3').attr('disabled', false);
          if($(this).is(':checked')){
              val = val + vals.x1;
              if($('.calc_3').is(':checked')) {
                val = vals.x1;
              } else {
                val = val + vals.x3;
              }

              if($('.calc_2').is(':checked')) {
                //val = val - vals.x2;
                //val = val - vals.x4;
                $('.calc_2').prop('checked', false);
              }

              if($('.calc_4').is(':checked')) {
                //val = val - vals.x2;
                //val = val - vals.x4;
                $('.calc_4').prop('checked', false);
              }
          } else {
              val = 0;
          }



          putValue();
      });

      $('.calc_2').change(function() {
        if(!$('.js-total-value').is(':visible') && $('.js-selected-city option:selected').val().length > 0) {
          $('.js-total-value').fadeIn();
        }
        val = 0;
          if($(this).is(':checked')){
              val = val + vals.x2;

              $('.calc_3').prop('checked', true);
              $('.calc_3').attr('disabled', true);

              /*if($('.calc_3').is(':checked')) {
                val = vals.x2;
              } else {
                val = val + vals.x4;
              }*/

              if($('.calc_1').is(':checked')) {
                //val = val - vals.x1;
                //val = val - vals.x3;
                $('.calc_1').prop('checked', false);
              }

              if($('.calc_4').is(':checked')) {
                //val = val - vals.x1;
                //val = val - vals.x3;
                $('.calc_4').prop('checked', false);
              }
          } else {
            $('.calc_3').attr('disabled', false);
              val = 0;
          }



          putValue();
      });

      $(document).mouseup(function (e)
      {
          var container = $(".vacancy_popup .content");

          if (!container.is(e.target) // if the target of the click isn't the container...
              && container.has(e.target).length === 0) // ... nor a descendant of the container
          {
              $('.vacancy_popup').removeClass('active');
          }
      });

      $('.calc_4').change(function() {
        if(!$('.js-total-value').is(':visible') && $('.js-selected-city option:selected').val().length > 0) {
          $('.js-total-value').fadeIn();
        }
        val = 0;

        $('.calc_3').attr('disabled', false);
          if($(this).is(':checked')){
              val = val + vals.x4;

              if($('.calc_3').is(':checked')) {
                val = vals.x4;
              } else {
                val = val + vals.x5;
              }

              if($('.calc_1').is(':checked')) {
                //val = val - vals.x1;
                //val = val - vals.x3;
                $('.calc_1').prop('checked', false);
              }

              if($('.calc_2').is(':checked')) {
                //val = val - vals.x1;
                //val = val - vals.x3;
                $('.calc_2').prop('checked', false);
              }
          } else {
              val = 0;
          }



          putValue();
      });

      $('.calc_3').change(function() {
          if($(this).is(':checked')) {
            if($('.calc_1').is(':checked')) {
              val = val - vals.x3;
            }
            if($('.calc_2').is(':checked')) {
              //val = val - vals.x4;
            }

            if($('.calc_4').is(':checked')) {
              val = val - vals.x5;
            }
          } else {
            if($('.calc_1').is(':checked')) {
              val = val + vals.x3;
            }
            if($('.calc_2').is(':checked')) {
              //val = val + vals.x4;
            }

            if($('.calc_4').is(':checked')) {
              val = val + vals.x5;
            }
          }

          putValue();
      });

      function putValue() {
        $('.js-put-value').html(val + '€');
      }
    };

    var initEvents = function() {
      el.faq_collapse.on('click', function(e) {
        /*if($(this).find('.answer').hasClass('active')) {
          $(this).find('.answer').removeClass('active');
        } else {
          $(this).find('.answer').addClass('active');
        }*/
        $(this).find('.answer').slideToggle(300);
      });

      $('.js-expand-menu').each(function(id, item) {
        $(item).on('click', function(e) {
          e.preventDefault();
          $(this).parent().toggleClass('active');

          $(this).parent().find('.js-expanded-menu').toggle();
        })
      });

      $('.js-close-vacancies').on('click', function(e) {
        $('.vacancy_popup').removeClass('active');
      });

      $('.j-price-popup-close').on('click', function(e) {
        $('.price_popup').fadeOut();
      });

      // var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      //return re.test(email);

      $('[type="email"]').each(function(id, item) {
        if(!$(item).hasClass('no-validation')) {
          $(item).on('keyup', function(e) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (re.test($(this).val())) {
              if($(item).parent().find('.icon-validate').length < 1) {
                $(item).after("<i class='icon icon-validate'></i>");
              }
            } else {
              $(item).parent().find('.icon-validate').remove();
            }
          });
        }
      });

      $('[type="text"]').each(function(id, item) {
        if(!$(item).hasClass('no-validation')) {
          $(item).on('keyup', function(e) {
            if(typeof $(this).val() !== undefined && $(this).val().length > 1) {
              if ($(this).val().search(/[^а-яА-Яa-zA-Z .?0-9 \/]+/) === -1) {
                if($(item).parent().find('.icon-validate').length < 1) {
                  $(item).after("<i class='icon icon-validate'></i>");
                }
              } else {
                $(item).parent().find('.icon-validate').remove();
              }
            } else {
              $(item).parent().find('.icon-validate').remove();
            }
          });
        }
      });

      $('[type="tel"]').each(function(id, item) {
        if(!$(item).hasClass('no-validation')) {
          $(item).on('keyup', function(e) {
            $(item).val($(item).val().replace(/[^0-9]/gi, ''));
            if (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{5}[-\s\.]?[0-9]{0,6}$/im.test($(this).val())) {
              console.log('here');
              if($(item).parent().find('.icon-validate').length < 1) {
                $(item).after("<i class='icon icon-validate'></i>");
              }
            } else {
              $(item).parent().find('.icon-validate').remove();
            }
          });
        }
      });

      $('.j-open-price').each(function(id, item) {
        $(item).on('click', function(ev) {
          $('.price_popup').fadeIn();
        });
      });

      $('.js-count-price').on('click', function(e) {
        e.preventDefault();

        $('.count_price').fadeIn();
      });

      $('.js-close-success-subscription').each(function(id, item) {
        $(item).on('click', function(e) {
          $(this).parent().fadeOut();
        })
      });

      $('.js-success-subscription').on('click', function(e) {
        $('.success_subscription').fadeIn();
        e.stopPropagation();

        $(window).click(function() {
          $('.success_subscription').each(function(id, item) {
            $(item).on('click', function(e) {
              e.stopPropagation();
            });

            $(item).fadeOut();
          });
        });
      });

      $('.count_price').find('.icon-count_close').on('click', function(e) {
        $('.count_price').fadeOut();
      });

      $('.j-vacancy-open').on('click', function(ev) {
        var _id = $(this).data("id");

        console.log($(this));

        $('.j-vacancy-' + _id).addClass('active');
      });

      $('.js-delivery-menu').each(function(id, item) {
        $(item).on('click', function(e) {
          e.preventDefault();
          $(this).parent().toggleClass('active');

          $(this).parent().find('.js-delivery-expanded').toggle();
          console.log($(item).hasClass('agro'));
          if($(item).hasClass('agro')) {

          } else {
            if($(this).find('.icon-arrow_down')) {
              console.log(1);
              $(this).find('.icon-arrow_down').toggleClass('icon-arrow_down').toggleClass('icon-arrow_up');
            } else if($(this).find('.icon-arrow_up')) {
              console.log(2);
              $(this).find('.icon-arrow_up').toggleClass('icon-arrow_down').toggleClass('icon-arrow_up');
            }
          }
        })
      });
    };

    var initTriggers = function() {
      scrollTrigger(el.fadeInUp, el.fadeInUp_toggle);
      scrollTrigger(el.fadeIn, el.fadeIn_toggle);
      menuTrigger(el.col_left, el.col_trigger);
    };

    var initYoutube = function() {
      if($('.js-youtube').length) {
        $('.js-youtube').attr('width', $('.video_how').width());
        console.log($('.about_features').width());

        $('.js-video-play').on('click', function(ev) {
          ev.preventDefault();

          $('.js-video-play').fadeOut();
        })
      }
    };

    var scrollTrigger = function(elem, className) {
      elem.each(function(i) {
        if(!$(this).hasClass(className)) {
          if($(this).isOnScreen()) {
            $(this).addClass(className);
          }
        }
      });
    };

    $('.js-totop').on('click', function(ev) {
      ev.preventDefault();

      $("html, body").animate({ scrollTop: 0 }, "slow");
    });

    $('.js-fullshare').on('click', function(ev) {
      ev.preventDefault();

      $('.full_share').toggleClass('active');
    });

    $('.js-order-call').on('click', function() {
      $('.js-call-menu').addClass('active');
    });

    $('.tablet-search').on('click', function() {
      $('.js-ask').addClass('show_search');
      $('.tablet-search').addClass('show_search');
      $('.tablet-search').find('input').fadeIn();
      $('.js-menu-tablet').fadeOut();
      $('.js-close-tablet-search').fadeIn();
    });

    $('.js-reset-search').on('click', function() {
      $('.searchinput').val('');
    });

    $('.js-close-tablet-search').on('click', function(e) {
      e.stopPropagation();
      $('.js-ask').removeClass('show_search');
      $('.tablet-search').removeClass('show_search');
      $('.tablet-search').find('input').fadeOut();
      $('.js-menu-tablet').fadeIn();
      $('.js-close-tablet-search').fadeOut();
    });

    $('.js-menu-1').on('click', function(ev) {
      ev.preventDefault();
      $('.js-col-left-main').fadeOut();
      $('.js-col-inner').fadeOut();
      $('.js-col-left-inner-1').fadeIn();
    });

    $('.js-menu-2').on('click', function(ev) {
      ev.preventDefault();
      $('.js-col-left-main').fadeOut();
      $('.js-col-inner').fadeOut();
      $('.js-col-left-inner-2').fadeIn();
    });

    $('.js-menu-3').on('click', function(ev) {
      ev.preventDefault();
      $('.js-col-left-main').fadeOut();
      $('.js-col-inner').fadeOut();
      $('.js-col-left-inner-3').fadeIn();
    });

    $('.js-menu-4').on('click', function(ev) {
      ev.preventDefault();
      $('.js-col-left-main').fadeOut();
      $('.js-col-inner').fadeOut();
      $('.js-col-left-inner-4').fadeIn();
    });

    $('.js-col-backbtn').on('click', function(ev) {
      ev.preventDefault();
      $('.js-col-left-main').fadeIn();
      $('.js-col-inner').fadeOut();
    });

    var menuTrigger = function(elem, triggerEl) {
      var triggerHeight = triggerEl.height();
      var scrollTop = body.scrollTop();
      var bodyWidth = body.width();

      if(bodyWidth > desktop_breakpoint) {
        if(scrollTop >= triggerHeight) {
          elem.addClass('fixed');
        } else {
          elem.removeClass('fixed');
        }
      }
    };
}(window));

$.fn.isOnScreen = function(){

	var win = $(window);

	var viewport = {
		top : win.scrollTop(),
		left : win.scrollLeft(),
    height: document.body.offsetHeight * 0.05
	};
	viewport.right = viewport.left + win.width();
	viewport.bottom = viewport.top + win.height();

	var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();

    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top + viewport.height || viewport.top > bounds.bottom));

};
