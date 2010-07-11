/**
 * Slideshow - lastbreath
 *
 *  Author: Dominic Dingena
 *  Company: WeDesign
 *
 *  Copyright notice, do not remove:
 *   This work is open source and licensed under a Creative Commons GNU General Public License License
 *   http://creativecommons.org/licenses/GPL/2.0/
 *
 */
 
var Slideshow = function(ul, options){
  $.extend(this.options, options);
  var $this = this;
  $this.ul_string = ul;
  $this.ul = $(ul);
  // Reverse order
  $this.ul.children().each(function(){
    $(this).addClass('slide-'+$(this).index());
    $(this).prependTo($this.ul);
  });
  // Wrap
  if($this.options.wrap === true) $this.ul.wrap('<div class="slideshow_wrap" />');
  $this.wrap = this.ul.parent();
  if ($this.class) $this.wrap.addClass(class);
  // Add bullets
  if($this.options.addBullets === true){
    $this.wrap.append('<div class="bullets" />');
      for(i=0; i<$this.ul.children().length; i++){
        $('.bullets', $this.wrap).append('<a href="#" rel="slide-'+i+'">'+$this.options.bullet+'</a>');
      }
    $('.bullets a:first', $this.wrap).addClass('active-slide');
  }
  // Start Slideshow
  $this.play();
  // Pause on hover
  $this.ul.hover(function(){
    $this.pause();
  }, function(){
    $this.play();
  });
  //Go to image on hover bullet
  $('.bullets a', $this.wrap).hover(function(){
     $this.pause();
     var targetSlide = $('li.'+$(this).attr('rel'), $this.wrap),
                slide = $('li:last', $this.wrap);
     while (slide.attr('class') !== targetSlide.attr('class')){
       slide.prependTo($this.ul);
       slide = $('li:last', $this.ul);
    }
    $('.bullets a', $this.wrap).removeClass('active-slide');
     $('.bullets a[rel="'+slide.attr('class')+'"]', $this.wrap).addClass('active-slide');
  }, function(){
     $this.play();
  });
  
};

Slideshow.prototype = {
  play: function(){
    this.interval = setInterval('slide(\''+this.ul_string+'\', '+this.options.duration+')', this.options.duration+this.options.interval);
  },
  pause: function(){
    clearInterval(this.interval);
  },
  options:{
    duration: 3000,
    interval: 3000,
    wrap: true,
    class: null,
    addBullets: true,
    bullet: '<img src="images/bullet.png" />'
  }
};

function slide(ul, duration){
  var currentSlide = $('li:last', ul);
  currentSlide.fadeOut(duration, function(){
    $(this).prependTo($(ul)).fadeIn(0);
  });
  
  $(ul).delay(duration/2).queue(function(){
	  $(ul).parent().find('.bullets a').removeClass('active-slide');
  	$(ul).parent().find('.bullets a[rel="'+currentSlide.prev().attr('class')+'"]').addClass('active-slide');
  	$(this).dequeue();
	});
}