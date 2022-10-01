$(document).ready(function(){
    $(document).delegate('a.modal-box', 'click', function(e) {
        e.preventDefault();
        $.fancybox($(this),{href:$(this).attr('href')});
    });
    
    $("body").delegate("form.modal-ajax-form", 'submit', function() {
        $.fancybox.showActivity();
        $.post($(this).attr('action'), $(this).serialize(), function(resp){
            $.fancybox.hideActivity();
            resp = $.parseJSON(resp);
            if(resp.status === 'success'){
                if(resp.reload)
                    document.location.reload();
                else
                    $.fancybox.close();
            } else {
                $.fancybox(resp.html);
            }
        });
        return false;
    });
    
    $("body").delegate("a.delete-lesson", "click", function() {
        var url = $(this).attr('href');
        var lessonId = $(this).data('lessonId');
        if (confirm(messages.deleteLesson)) {
            $.post(url, {schedule_id: lessonId}, function(resp){
                resp = $.parseJSON(resp);
                if(resp.result === true) {
                    document.location.reload();
                } else {
                    if (resp.message) {
                        alert(resp.message);
                    }
                }
            });
        }
        return false;
    });
    $("body").delegate("a.form-submit-btn", 'click', function(e){
        e.preventDefault();
        $(this).parents('form').submit();
    });
    $("input.authorization").keypress(function(e) {
    if (e.keyCode === 13) {
       $(this).parents('form').submit();
    }
    });
    $("#add-child-form").on('beforeValidate', function (event, messages, deferreds) {
        return false;
    });
    
    // Скрывать или отображать поля в зависимости от выбора типа урока при создании или редактировании
    $("body").delegate("#osvitaschedulereal-lesson_type_id", "change", function() {
        var val = $(this).val();
        if (!lesson_type_list[val]) {
            $('.label1-lesson_date').removeClass('hidden');
            $('.label2-lesson_date').addClass('hidden');
            $('#osvitaschedulereal-repeate_type, #osvitaschedulereal-room_id').closest(".row").removeClass('hidden');
        } else {
            $('.label1-lesson_date').addClass('hidden');
            $('.label2-lesson_date').removeClass('hidden');
            $('#osvitaschedulereal-repeate_type, #osvitaschedulereal-room_id').closest(".row").addClass('hidden');
        }
    });
    $("#add-child-form").submit(function(event) {
        event.preventDefault(); // stopping submitting
        var data = $(this).serializeArray();
        var url = $(this).attr('action');
        $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            data: data
        })
        .done(function(response) {
            $(".modal-body .alert").remove();
            if (response.data.success == true) {
                $('#add-student-to-parent').modal('hide');
                $("ul.children-list").append(response.data.child);
                $(".content-wrapper").prepend('<div class="alert alert-success" role="alert">' + response.data.message + '</div>');
            } else {
                $(".modal-body").prepend('<div class="alert alert-danger" role="alert">' + response.data.message + '</div>');
            }
        })
        .fail(function() {
            console.log("error");
        });

    });
    $(".remove-student").click(function() {
        var url = $(this).attr('href');
        $.ajax({
            url: url,
            type: 'post',
            dataType: 'json'
        })
        .done(function(response) {
            if (response.data.success == true) {
                $("#student-" + response.data.student_id).remove();
                $(".content-wrapper").prepend('<div class="alert alert-success" role="alert">' + response.data.message + '</div>');
            }
        })
        .fail(function() {
            console.log("error");
        });;
        return false;
    });
    $(".class_list_select").change(function() {
        $("#class_list_form").submit();
    });
    $(".personal_list_select").change(function() {
        $("#personal_list_form").submit();
    });
    $(".children_list_select").change(function() {
        $("#children_list_form").submit();
    });
    
    $ ('#user-update-form').on('afterValidateAttribute', function(event, attribute, messages) {
        if (attribute.name === 'email' && (messages.length > 0 || attribute.value == '')) {
            $('.field-userform-generatepassword input').attr("disabled", 'disabled');
        } else if (attribute.name === 'email') {
            $('.field-userform-generatepassword input').removeAttr('disabled');
        }
    });
    
});