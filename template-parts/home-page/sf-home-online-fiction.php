<div class="o-content-row o-content-row--basic">
  <div class="c-row-header">Online Fiction Series</div>

<?php

$args = array(
  'numberposts' => 6,
  'orderby' => 'desc',
  'tag' => 'monthly-fiction'
);

$onlinePosts = get_posts( $args );

if($onlinePosts) {

	
	foreach($onlinePosts as $post) : setup_postdata( $post ); ?>
	<!-- This is where the "archive content" modules are created -->
	<div class="c-content-module c-content-module--basic c-content-module--archive">
	<a href="<?php the_permalink(); ?>" class="c-content-image-link">
      <img class="c-content-image" data-src="<?php the_post_thumbnail_url( 'large' ); ?>">
    </a>
    <div class="c-content-text">
      <a href="<?php the_permalink(); ?>" class="c-content-title"><?php the_title(); ?></a>
      <div class="c-content-text--meta">
          <p class="c-content-author"><?php guest_author_link(); ?></p>
      </div>
      <p class="c-content-description"><?php the_field('lede'); ?></p>
    </div>
  </div>

  <?php endforeach;
  wp_reset_postdata();
};

?>

<script type="text/javascript">

	var audioPlayer = document.querySelector('.c-podcast-player__audio-element'),
	audioWrapper = document.querySelector(".c-podcast-player"),
	audioPlayPause = document.querySelector(".js-podcast-player__play-pause svg"),
	audioElapsed = document.querySelector(".c-podcast-player--elapsed"),
	audioDuration = document.querySelector(".c-podcast-player--duration"),
	progressBar = document.querySelector(".c-podcast-player__progress-bar"),
	progressOverlay = document.querySelector(".js-podcast-player__progress-bar--overlay"),
	subButton = document.getElementById("c-podcast-player__small-button--sub"),
	shareButton = document.getElementById("c-podcast-player__small-button--share"),
	subSlide = document.getElementById("c-podcast-player--sub-slide"),
	shareSlide = document.getElementById("c-podcast-player--share-slide"),
	closeButton = document.querySelectorAll(".o-close-button svg");

	function SetVolume(a) {
		audioPlayer.volume = a / 100
	}

	function updateTrackTime(a) {
			var b = Math.floor(a.currentTime).toString(),
					c = Math.floor(a.duration).toString();
			audioElapsed.innerHTML = formatSecondsAsTime(b), isNaN(c) ? audioDuration.innerHTML = "00:00" : audioDuration.innerHTML = formatSecondsAsTime(c);
			var fraction = b / c;
			progressOverlay.style.transform = "scaleX(" + fraction + ")";
	}

	subButton.addEventListener("click", function(){
		subSlide.classList.toggle("is-visible");
	});

	shareButton.addEventListener("click", function(){
		shareSlide.classList.toggle("is-visible");
	});

	function slideRemove() {
		subSlide.classList.remove("is-visible");
		shareSlide.classList.remove("is-visible");
	}

	for (var i = 0; i < closeButton.length; i++){
		closeButton[i].addEventListener("click", slideRemove);
	}


	progressBar.addEventListener("click", function(ev){
		var $div = $(ev.target);
    var offset = $div.offset();
    var x = ev.clientX - offset.left;
		var width = progressBar.offsetWidth;
		var ratio = x / width;
		var duration = audioPlayer.duration;
		var newCurrentTime = ratio * duration;
		audioPlayer.currentTime = newCurrentTime;
	});

	function formatSecondsAsTime(a, b) {
			var c = Math.floor(a / 3600),
					d = Math.floor((a - 3600 * c) / 60),
					e = Math.floor(a - 3600 * c - 60 * d);
			return d < 10 && (d = "0" + d), e < 10 && (e = "0" + e), c + ":" + d + ":" + e
	}

	audioPlayer.addEventListener('loadedmetadata', function() {
		var time = audioPlayer.duration;
		var formatted = formatSecondsAsTime(time);
		audioDuration.innerHTML = formatted;
		audioElapsed.innerHTML = "0:00:00";
	});

	window.addEventListener("load", function(){
		audioPlayPause.addEventListener("click", function(){
			if (audioPlayer.paused) {
				audioPlayer.play();
				audioPlayPause.classList.add("is-playing");
			} else {
				audioPlayer.pause();
				audioPlayPause.classList.remove("is-playing");
			};
		})
	})
	</script>