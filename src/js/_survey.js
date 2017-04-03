;(function() {
    "use strict";
    
    if (!$(".content__inner-survey").length) return;
    
    var $body = $('body'),
        $survey = $(".content__inner-survey"),
        $form = $(".survey-form", $survey),
        $question_item = $(".survey-form-question", $survey),
        $buttons = $("button", $survey),
        $inputs = $("input, textarea", $survey),
        $question_wrap = $(".survey-form-question_wrap", $survey),
        $survey_popup = $('.survey_popup'),
        $survey_popup_close = $('.j-survey-popup-close'),
        is_valid = [false, false, false, false];
    
    $(function () {
        $body.addClass("_survey");
        
        checkSelect();
    
        $buttons.on("click", function (e) {
            e.preventDefault();
            
            if ($(this).hasClass("survey-form-question_next")) {
                initQuestionOffset();
                nextQuestion()
            } else {
                submitForm();
            }
        });
    
        $inputs.filter(":radio").on("change", function () {
            $(this).parents(".survey-form-question_wrap").attr("data-label", this.value);
            is_valid[$(this).parents(".survey-form-question").index()] = true;
            nextQuestion();
            validationForm();
        });
    
        $inputs.filter("textarea").on("change input", function () {
            is_valid[3] = !!(this.value.length);
            validationForm();
        });
        
        $question_wrap.on("click", function () {
            $(this).toggleClass("_active");
        });
        
        $("label", $question_wrap).on("click", function (e) {
            e.stopPropagation();
            $question_wrap.removeClass("_active");
        });
    
        $body.on("click", function (e) {
            if (!$(e.target).closest($question_wrap).length) {
                $question_wrap.removeClass("_active");
            }
        });
    
        $survey_popup_close.on("click", function () {
            $survey_popup.fadeOut();
        });
    });
    
    function initQuestionOffset () {
        var form_offset = $form.offset().top;
        
        $question_item.each(function () {
            var $this = $(this);
    
            $this.data("offset", $this.offset().top - form_offset);
        });
    }
    
    function checkSelect () {
        var $checkbox_inputs = $inputs.filter(":checkbox"),
            $self_whence = $inputs.filter("[name='self_whence']"),
            $self_variant = $("._self_variant", $survey),
            $button_next = $buttons.filter(".survey-form-question_next"),
            is_self_variant = false;
        
        $checkbox_inputs.on("change", function () {
            if (this.value === "Другое") {
                if (this.checked) {
                    $self_variant.addClass("_active");
                } else {
                    $self_variant.removeClass("_active");
                }
                is_self_variant = this.checked;
            }
            if ($checkbox_inputs.filter(":checked").length) {
                $button_next.attr("disabled", false);
                if (is_self_variant && !$self_whence.val().length) {
                    $button_next.attr("disabled", true);
                }
            } else {
                $button_next.attr("disabled", true);
            }
            is_valid[0] = !$button_next.is(":disabled");
            validationForm();
        });
    
        $self_whence.on("change input", function () {
            if (!this.value.length) {
                $button_next.attr("disabled", true);
            } else {
                $button_next.attr("disabled", false);
            }
            is_valid[0] = !$button_next.is(":disabled");
            validationForm();
        });
    }
    
    function nextQuestion () {
        var $active_question = $question_item.filter("._active"),
            form_height = $form.innerHeight();
    
        if ($active_question.next().length) {
            $active_question = $active_question.removeClass("_active").next().addClass("_active");
        }
    
        var offset = parseInt($active_question.data("offset"), 10) - form_height / 2 + $active_question.innerHeight() / 1.3;
        $form.animate({scrollTop: offset}, 500);
    }
    
    function validationForm () {
        if (is_valid.indexOf(false) === -1) {
            $buttons.not(".survey-form-question_next").attr("disabled", false);
        } else {
            $buttons.not(".survey-form-question_next").attr("disabled", true)
        }
    }
    
    function submitForm () {
        $survey_popup.fadeIn();
    }
}());