
(function ($) {
    "use strict";

    
//    /*==================================================================
//    [ Validate ]*/
//    var input = $('.validate-input .input100');
//
//    $('.validate-form').on('submit',function(){
//        var check = true;
//
//        for(var i=0; i<input.length; i++) {
//            if(validate(input[i]) == false){
//                showValidate(input[i]);
//                check=false;
//            }
//        }
//
//        return check;
//    });
//
//
//    $('.validate-form .input100').each(function(){
//        $(this).focus(function(){
//           hideValidate(this);
//        });
//    });
//
//    function validate (input) {
//        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
//            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
//                return false;
//            }
//        }
//        else {
//            if($(input).val().trim() == ''){
//                return false;
//            }
//        }
//    }
//
//    function showValidate(input) {
//        var thisAlert = $(input).parent();
//
//        $(thisAlert).addClass('alert-validate');
//    }
//
//    function hideValidate(input) {
//        var thisAlert = $(input).parent();
//
//        $(thisAlert).removeClass('alert-validate');
//    }



    $(document).ready(function() {

    function synthesize(text) {
        $.ajax({
            url: '/api/tts',
            type: 'GET',
            data: { text: text },
            cache: false,
            xhr: function () {
                var xhr = new window.XMLHttpRequest();
                xhr.responseType = 'blob';
                return xhr;
            },
            success: function(blob) {
                $('#messages').text('');
                $('#speak-button').prop('disabled', false);
                $('#audio').attr('src', URL.createObjectURL(blob));
                $('#audio').prop('hidden', false);
            },
            error: function(xhr, status, error) {
                $('#messages').text('Error: ' + error);
                $('#speak-button').prop('disabled', false);
            }
        });
    }

    function synth(text) {
        $.ajax({
            url: '/api/vocoder',
            type: 'GET',
            data: { text: text },
            cache: false,
            xhr: function () {
                var xhr = new window.XMLHttpRequest();
                xhr.responseType = 'blob';
                return xhr;
            },
            success: function(blob) {
                $('#message').text('');
                $('#speak-buttontwo').prop('disabled', false);
                $('#vaudio').attr('src', URL.createObjectURL(blob));
                $('#vaudio').prop('hidden', false);
            },
            error: function(xhr, status, error) {
                $('#message').text('Error: ' + error);
                $('#speak-buttontwo').prop('disabled', false);
            }
        });
    }

      function waveglowsynth(text) {
        $.ajax({
            url: '/api/wgvocoder',
            type: 'GET',
            data: { text: text },
            cache: false,
            xhr: function () {
                var xhr = new window.XMLHttpRequest();
                xhr.responseType = 'blob';
                return xhr;
            },
            success: function(blob) {
                $('#message3').text('');
                $('#speak-buttonthree').prop('disabled', false);
                $('#vaudios').attr('src', URL.createObjectURL(blob));
                $('#vaudios').prop('hidden', false);
            },
            error: function(xhr, status, error) {
                $('#message3').text('Error: ' + error);
                $('#speak-buttonthree').prop('disabled', false);
            }
        });
    }

    $('#text').on('keyup', function(e) {
        if (e.keyCode === 13) { // enter
            do_tts(e);
        }
    });

    $('#speak-button').on('click', function(e) {
        var text = $('#text').val();
        if (text) {
            $('#messages').text('Synthesizing...');
            $('#speak-button').prop('disabled', true);
            $('#audio').prop('hidden', true);
            synthesize(text);
        }
        e.preventDefault();
        return false;
    });

    $('#speak-buttontwo').on('click', function(e) {
        var text = $('#text').val();
        if (text) {
            $('#message').text('Synthesizing...');

            $('#speak-buttontwo').prop('disabled', true);
            $('#vaudio').prop('hidden', true);
            synth(text);
        }
        e.preventDefault();
        return false;
    });

        $('#speak-buttonthree').on('click', function(e) {
        var text = $('#text').val();
        if (text) {
            $('#message3').text('Synthesizing...');

            $('#speak-buttonthree').prop('disabled', true);
            $('#vaudios').prop('hidden', true);
            waveglowsynth(text);
        }
        e.preventDefault();
        return false;
    });

    $('#text').focus();
});

    

})(jQuery);