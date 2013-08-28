/* DOM loaded
==============================*/
var slider;
var lastSlide = false;

$(function() {

	slider =
	$('.slide_wrapper').bxSlider({
		mode:'fade',
		speed: 1000,
		controls: false,
		auto: true,
		pager: false,
		pause: 4000,
		infiniteLoop:false,
		onSlideBefore: function($slideElement, oldIndex, newIndex){

			 // start of last slide - make note of it
			 if ($slideElement.index() == (totalSlides -1)) lastSlide = true;

		},
	    onSlideAfter: function($slideElement, oldIndex, newIndex){

		    var video = $slideElement.children(".video-js");

		    // check if this slide has video
		    if(video.length){

			    slider.stopAuto();

			    var vidID = video.attr("id");
				var player = videojs(vidID);

				player.on("ended", function() {

					slider.goToNextSlide();
					slider.startAuto();

					if (lastSlide) {

						//========================================================
						// CHRISTINE!! THIS IS WHERE THE LAST MOVIE STOPS PLAYING
						//========================================================
						var box = document.getElementById('box-1');
						var child = getParentByClassName(box, 'child');
						var parent = getParentByClassName(box, 'parent');

						$(box.getElementsByClassName('touchable')[0]).hide();
						// $(box.getElementsByClassName('button')[0]).hide();

						var tween = TweenMax.to(child, 1, {
							zIndex:5,
							scale:1,
							transformOrigin:"center center 0px",
							rotationY:180,
							top:"150px",
							paused: true,
							onStart: function() {
							             flipEffectsTimeline.clear();
								parent.classList.add('flipped');
								flipEffects(this, false);
								currentFlip = parent;
								flipEffectsTimeline.play();
							},
							onComplete: function() {
								setTimeout(function(){
									box.getElementsByClassName('button')[0].getElementsByTagName('input')[0].onclick();
								}, 500);
								setTimeout(function(){
									box.getElementsByClassName('button')[0].getElementsByTagName('input')[0].onclick();
								}, 5000);
								setTimeout(function() {
									tween.reverse();
									flipEffectsTimeline.reverse();
								}, 5250);
							},
							onReverseComplete: function() {
								parent.classList.remove('flipped');
								$(box.getElementsByClassName('touchable')[0]).show();
								currentFlip = '';
							},
							ease:Circ.EaseIn
						});

						setTimeout(function(){
							tween.play();
						}, 1500);
						return;
					}
				});

				player.play();
		    }
		}
	});

	var totalSlides = slider.getSlideCount();

	populateSlidesFromJSON();
});

















