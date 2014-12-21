$(function() {
    // console.log("blah!");
    $('#nav-trigger').on('tap', function(e){
        openCloseMenu();
    });
});

function openCloseMenu(e) {
    if ($('#nav-trigger').hasClass('open')) {
        $('#nav-trigger').removeClass('open').addClass('close');
        $('#main-nav').addClass('shown');
        $('body').css('overflow', 'hidden');
    } else {
        $('#nav-trigger').removeClass('close').addClass('open');
        $('#main-nav').removeClass('shown');
        $('body').css('overflow', 'auto');
    }
}
