/**
 * Slideshow
 *
 *  Author: Dominic Dingena
 *  Company: WeDesign
 *
 *  Copyright notice, do not remove:
 *   This work is open source and licensed under a Creative Commons GNU General Public License License
 *   http://creativecommons.org/licenses/GPL/2.0/
 *
 *  Summmary:
 *   To be applied to an UL
 *   Each list item will be faded to the next
 *   Requires jQuery.
 *
 *  Slideshow property/method list, default values in square brackets:
 *   @property @object options
 *     @property duration:   fadeOut speed (ms) [3000]
 *     
 *     @property interval:   pause between fading (ms) [3000]
 *     
 *     @property wrap:       wrap the provided ul [true]
 *                           note: some form of wrapping
 *                           is needed this options merely
 *                           allows to provide your own
 *     
 *     @property class:      additional class for the
 *                           wrapping element [null]
 *
 *     @property addBullets: add bullets to indiciate the
 *                           current image and allow traversing
 *                           through the images. [true]
 *
 *
 *     @property bullet:     the HTML for the bullet
 *                           ['<img src="images/bullet.png" />']                  
 *   end options
 *   
 *   @method play            Start/continue the slideshow.
 *
 *   @method pause           Stops/pauses the slideshow.
 * 
 *
 *  Usage:
 *    new Slideshow('ul.my-list', {
 *      duration: 1000,
 *      interval: 2000
 *    });
 *
 *  Notes on styling:
 *    Some styling is needed for the plugin to work. This is not covered
 *    in the javascript following as I don't like it that way. See the example
 *    that came with this file for ideas on styling.
 *    I will cover the necessities here. 
 *
 *    The list of items is wrapped in a div with class of "slideshow_wrap"
 *    this div will need a fixed height and width, overflow set to hidden,
 *    and position set to relative
 *    E.g.:
 *      .slideshow_wrap{
 *        height:200px;
 *        width:400px;
 *        overflow:hidden;
 *        position:relative;
 *      }
 *
 *    The list items themselves need to be displayed as "inline-block" and set to
 *    an absolute position.
 *    E.g.:
 *      ul.my-list li{
 *        display: inline-block;
 *        position: absolute;
 *      }
 *
 *    The bullets are contained in a div with class "bullets", the anchor tag of the
 *    bullet corresponding to the current image is given a class of "active-slide".
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