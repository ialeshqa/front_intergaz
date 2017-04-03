;(function(window) {
    "use strict";

    var $ = window.jQuery;


    window.Header = function() {
      var body = $('body');
      var el = {
        ask: $('.js-ask'),
        ask_collapse: $('.js-ask-collapse'),
        column: $('.js-ask-column'),
        close: $('.js-ask-close'),
        action_btn: $('.j-close-action'),
        action_block: $('.j-action'),
        content: $('.setheight'),
        menu_tablet: $('.js-menu-tablet'),
        menu_tablet_column: $('.js-menu-tablet-column'),
        menu_tablet_close: $('.js-menu-tablet-close'),
        ask_background: $('.col-ask__background'),
        menu_tablet_background: $('.col-menu-tablet__background')
      };

      el.ask_collapse.on('click', function(e) {
        $(this).find('.popular-caption').slideToggle(300);
      });

      el.ask.on('click', function(e) {
        e.preventDefault();
        body.css('overflow-y', 'hidden');
        el.column.removeClass('col-ask__hide');
        el.column.addClass('active');
      });

      el.close.on('click', function(e) {
        e.preventDefault();

        //body.removeClass('no-overflow');
        body.css('overflow-y', 'visible');
        el.column.removeClass('active');
        el.column.addClass('col-ask__hide');
      });

      el.ask_background.on('click', function(e) {
        e.preventDefault();

        body.removeClass('no-overflow');
        el.column.removeClass('active');
        el.column.addClass('col-ask__hide');
      });

      el.menu_tablet.on('click', function(e) {
        e.preventDefault();

        body.addClass('no-overflow');
        //body.css('overflow-y', 'hidden');
        $(window).scroll(function() { return false; });
        //$('body').bind('touchmove', function(e){e.preventDefault()});
        el.menu_tablet_column.addClass('active');
      });

      el.menu_tablet_close.on('click', function(e) {
        e.preventDefault();

      body.removeClass('no-overflow');
      //  body.css('overflow-y', 'visible');
      $(window).unbind('scroll');
      //  $('body').unbind('touchmove');
        el.menu_tablet_column.removeClass('active');
        $('.js-call-menu').removeClass('active');
      });

      el.menu_tablet_background.on('click', function(e) {
        e.preventDefault();

        body.removeClass('no-overflow');
        $('body').unbind('touchmove');
        el.menu_tablet_column.removeClass('active');
      });

      el.action_btn.on('click', function(e) {
        e.preventDefault();

        el.action_block.addClass('action-bar__hide');
        el.content.removeClass('setheight__margin');
      });

      $("#ask_name").on('keyup', function(e) {
        var val = $(this).val();
        if (val.match(/[^\sa-zA-Zа-яА-Я-]/g)) {
           $(this).val(val.replace(/[^\sa-zA-Zа-яА-Я-]/g, ''));
        }
      });

      $("#ask_phone").on('keyup', function(e) {
        var val = $(this).val();
        if (val.match(/[^0-9-+()]/g)) {
           $(this).val(val.replace(/[^0-9-+()]/g, ''));
        }
      });

      $("#ask_email, #subscribe_email").on('keyup', function(e) {
        var val = $(this).val();
        if (val.match(/[^a-zA-Z0-9@.-]/g)) {
           $(this).val(val.replace(/[^a-zA-Z0-9@.-]/g, ''));
        }
      });
    };
}(window));
