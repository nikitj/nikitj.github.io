$('.sidebar').css({'opacity' : '1'});

$(window).scroll(function(){
	var wScroll = $(this).scrollTop();
	if(wScroll > $(window).height()/8){
      $('footer').css({'opacity' : '1', 'transition': 'all 0.5s ease-in-out'});
   	}
	if(wScroll < $(window).height()/8){
      $('footer').css({'opacity' : '0', 'transition': 'all 0.5s ease-in-out'});
	}
});