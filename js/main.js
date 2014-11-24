$(function() {
    console.log("blah!");
    $('#nav-trigger').on('tap', function(e) {
        if ($(this).hasClass('open')) {
            $(this).removeClass('open').addClass('close');
            $('#main-nav').addClass('shown');
            $('body').css('overflow', 'hidden');
        } else {
            $(this).removeClass('close').addClass('open');
            $('#main-nav').removeClass('shown');
            $('body').css('overflow', 'auto');
        }
    });
});
