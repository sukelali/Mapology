
  $(function(){
  //click toggle for left side btns
   var mapStyles = [ {"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"},{"lightness":20}]},{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"transit","elementType":"all","stylers":[{"saturation":-100},{"visibility":"on"},{"lightness":10}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":50}]},{"featureType":"water","elementType":"all","stylers":[{"hue":"#a1cdfc"},{"saturation":30},{"lightness":49}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"hue":"#f49935"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"hue":"#fad959"}]}, {featureType:'road.highway',elementType:'all',stylers:[{hue:'#dddbd7'},{saturation:-92},{lightness:60},{visibility:'on'}]}, {featureType:'landscape.natural',elementType:'all',stylers:[{hue:'#c8c6c3'},{saturation:-71},{lightness:-18},{visibility:'on'}]},  {featureType:'poi',elementType:'all',stylers:[{hue:'#d9d5cd'},{saturation:-70},{lightness:20},{visibility:'on'}]} ];

   "use strict";

    if( $('body').hasClass('navigation-fixed') ){
        $('.off-canvas-navigation').css( 'top', - $('.header').height() );
        $('#page-canvas').css( 'margin-top',$('.header').height() );
    }

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });
    $('.off-canvas-navigation header').css( 'line-height', $('.header').height() + 'px' );

    // Date & Time picker

    if( $('.input-group.date').length > 0 ){
        $('.input-group.date').datepicker({ });
    }
    if( $('.input-daterange').length > 0 ){
        $('.input-daterange').datepicker({
            todayHighlight: true
        });
    }

//  Bootstrap Select ---------------------------------------------------------------------------------------------------

    var select = $('select');
    if (select.length > 0 ){
        select.selectpicker();
    }
    var bootstrapSelect = $('.bootstrap-select');
    var dropDownMenu = $('.dropdown-menu');
    bootstrapSelect.on('shown.bs.dropdown', function () {
        dropDownMenu.removeClass('animation-fade-out');
        dropDownMenu.addClass('animation-fade-in');
    });
    bootstrapSelect.on('hide.bs.dropdown', function () {
        dropDownMenu.removeClass('animation-fade-in');
        dropDownMenu.addClass('animation-fade-out');
    });
    bootstrapSelect.on('hidden.bs.dropdown', function () {
        var _this = $(this);
        $(_this).addClass('open');
        setTimeout(function() {
            $(_this).removeClass('open');
        }, 100);
    });

//  Expand content on click --------------------------------------------------------------------------------------------

    $('.expand-content').live('click',  function(e){
        e.preventDefault();
        var children = $(this).attr('data-expand');
        var parentHeight = $(this).closest('.expandable-content').height();
        var contentSize = $( children + ' .content' ).height();
        $( children ).toggleClass('collapsed');
        $( this ).toggleClass('active');
        $( children ).css( 'height' , contentSize );
        if( !$( children).hasClass('collapsed') ){
            setTimeout(function() {
                $( children ).css('overflow', 'visible');
            }, 400);
        }
        else {
            $( children ).css('overflow', 'hidden');
        }
        $('.has-child').live('click',  function(e){
            var parent = $(this).closest('.expandable-content');
            var childHeight = $( $(this).attr('data-expand') + ' .content').height();
            if( $(this).hasClass('active') ){
                $(parent).height( parent.height() + childHeight )
            }
            else {
                $(parent).height(parentHeight);
            }
        });
    });


    $('.map-buttons .btn-bg').click( function() {
    $('.map-buttons .btn-bg').removeClass('smokescreen');
    //$('.slide-panel-left').show();
    $(this).addClass('smokescreen');
  });
  $('.slide-panel-left .fa-times').click( function() {
    $('.slide-panel-left').hide();
    $('.map-buttons .btn-bg').removeClass('smokescreen');
  });
  $('#quickview-btn-bg').click( function() {
    $('#travel').hide();
    $('#street-view').hide();
    $('#layers').hide();
    $('#for-quickview-btn-bg').show();
  });
  $('#travel-btn-bg').click( function() {
    $('#for-quickview-btn-bg').hide();
    $('#street-view').hide();
    $('#layers').hide();
    $('#travel').show();
  });
  $('#sview-btn-bg').click( function() {
    $('#for-quickview-btn-bg').hide();
    $('#travel').hide();
    $('#layers').hide();
    $('#street-view').show();
  });
  $('#filters-btn-bg').click( function() {
    $('#for-quickview-btn-bg').hide();
    $('#travel').hide();
    $('#street-view').hide();
    $('#layers').show();
  });

    $('.quick-view, .results .item').live('click',  function(){
        var id = $(this).attr('id');
        quickView(id);
        return false;
    });

    // Scrollbar on "Results" section

    if( $('.items-list').length > 0 ){
        $(".items-list").mCustomScrollbar({
            mouseWheel:{ scrollAmount: 350 }
        });
    }

    // Bootstrap tooltip

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });
    $('.off-canvas-navigation header').css( 'line-height', $('.header').height() + 'px' );

    // Date & Time picker

    if( $('.input-group.date').length > 0 ){
        $('.input-group.date').datepicker({ });
    }
    if( $('.input-daterange').length > 0 ){
        $('.input-daterange').datepicker({
            todayHighlight: true
        });
    }


    // function
    function setInputsWidth(){
    var $inputRow = $('.search-bar.horizontal .input-row');
    for( var i=0; i<$inputRow.length; i++ ){
        if( $inputRow.find( $('button[type="submit"]') ).length ){
            $inputRow.find('.form-group:last').css('width','initial');
        }
    }

    var searchBar =  $('.search-bar.horizontal .form-group');
    for( var a=0; a<searchBar.length; a++ ){
        if( searchBar.length <= ( 1 + 1 ) ){
            $('.main-search').addClass('inputs-1');
        }
        else if( searchBar.length <= ( 2 + 1 ) ){
            $('.main-search').addClass('inputs-2');
        }
        else if( searchBar.length <= ( 3 + 1 ) ){
            $('.main-search').addClass('inputs-3');
        }
        else if( searchBar.length <= ( 4 + 1 ) ){
            $('.main-search').addClass('inputs-4');
        }
        else if( searchBar.length <= ( 5 + 1 ) ){
            $('.main-search').addClass('inputs-5');
        }
        else {
            $('.main-search').addClass('inputs-4');
        }
        if( $('.search-bar.horizontal .form-group label').length > 0 ){
            $('.search-bar.horizontal .form-group:last-child button').css('margin-top', 25)
        }
    }
}

});

   