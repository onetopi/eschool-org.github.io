$(document).ready(function(){
//----------------------------------------------------------------------------------------------------------------------
    //Текст подсказка в мемках и инпутах
    $("body").delegate("input[title], textarea[title]", "focus blur", function(e){
        if (e.type == 'focus') {
            if ($(this).attr('title') == $(this).val()) {
                $(this).val('');
            }
        }else{
            if ($(this).val() == '') {
                $(this).val($(this).attr('title'));
            }
        }
    });
//----------------------------------------------------------------------------------------------------------------------
    if (!$(".content-wrapper").hasClass("schedule")) {
        // Messages Tabs
        var msgNavLinks = $('.mph-nav li a'),
        msgTabs = $('.mp-tabs > li');
        msgNavLinks.each(function(index, item) {
            $(item).click(function(e) {
    //            e.preventDefault();
                if (!$(this).hasClass('active')) {
                    msgNavLinks.parent().removeClass('active');
                    msgTabs.removeClass('active');
                    $(msgTabs[index]).addClass('active');
                    $(this).parent().addClass('active');
                }
            });
        });
    }
    // Delete Messages
    $("body").delegate(".ml-message", "mouseover", function(e){
        $(this).find('.delete-message').show();
    });
    $("body").delegate(".ml-message", "mouseout", function(e){
        $(this).find('.delete-message').hide();
    });
    
    
    // Select Customization
//    $('.custom-select, .custom-select-160').selectbox({
//        animationSpeed: 0,
//        replaceInvisible: true
//    });
    
    // Table hover
    $('.journal-choose tr').hover(function() {
        $(this).addClass('tr-hover');
    }, function() {
        $(this).removeClass('tr-hover');
    });
    $('.schedule-item').hover(function() {
        $(this).addClass('si-hover');
    }, function() {
        $(this).removeClass('si-hover');
    });
    
    $('.point-table td.pt-point input').focus(function() {
        $(this).parents('td').addClass('pt-input');
    });
    $('.point-table td.pt-point input').blur(function() {
        $(this).parents('td').removeClass('pt-input');
    });
    
    // Points table
    $('.point-table.pt-teacher tbody tr td.pt-point > span').click(function(e) {
        e.preventDefault();
    });
    
    // Tooltips
    $('.tooltip').each(function(index, item) {
        $(item).parent().hover(function() {
            $('.tooltip', $(this)).fadeIn(200);
        }, function() {
            $('.tooltip', $(this)).fadeOut(200);
        });
    });
    
    // Schooll Gallery
    if ($(".school-gallery a").length) {
        $(".school-gallery a").fancybox();
    }
    
    // Отображение подсказок
    var firstLink = $('[data-toggle="tooltip"]').first();
    $('[data-toggle="tooltip"]').tooltip();
    firstLink.tooltip('open');
    setTimeout(function () {
        firstLink.tooltip('close');
    }, 3000);
    $('[data-toggle="tooltip"]').tooltip();
//    $('.wg-birth').hide();
    //
    $('.show-more-birth').click(function() {
        $('.wg-birth li.hidden').removeClass('hidden');
        $(this).hide();
        return false;
    });
    
    $('.menu-default-index .open-modal').click(function() {
        var link = $(this);

        $.post(link.attr('value'), function(data) {
            $('.modal').modal('show').find('#modelContent').html( data );
        });
        return false;
    });    
    
    // Отображение блока с пользователями которые просмотрели новость
    $("body").delegate('.user-list-show', "click", function() {
        var popup = $(this).parent().parent().find(".user-list-popup");
        $(".user-list-popup").hide();
        if ($(this).offset().top + popup.height() > $(document).height()) {
            popup.css("top", (50 - popup.height()) + 'px');
        } else {
            popup.css("top", "90%");
        }
        popup.show();
        
        return false;
    });
    $(document).delegate("body", "click", function() {
        $(this).parent().parent().find(".user-list-popup").hide();
    });
    
    
});