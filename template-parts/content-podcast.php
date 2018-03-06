<?php
/**
 * The template part for displaying review posts
 */
?>

	<article class="o-article" id="post-<?php the_ID(); ?>">

		<section class="entry-header c-article__header c-article__header--review">
			<div class="c-article__head-image c-article__head-image--review">
				<img src="<?php the_post_thumbnail_url( 'large' ); ?>" />
			</div>
			<div class="c-article__info c-article__info--review">
				<h3 class="heading-3 c-article__info--date">
					<?php the_date(); ?><?php sf_single_cat(); ?>
				</h3>
				<!--<h3 class="heading-3 c-article__info--date">
					<?php //the_field("podcast_series"); ?>
				</h3>-->
				<h1 class="heading-1 c-article__info--title c-article__info--title--review">
					<?php the_title(); ?>
				</h1>
			</div>
		</section>
		<div class="js-article__social-icons c-article__social-icons">
			<?php get_template_part('template-parts/social-icons'); ?>
		</div>

		<div class="entry-content c-article__body">
		<p></p>
		<div class="c-podcast-player">
				<img class="c-podcast-player__image" src="<?php the_post_thumbnail_url( 'thumbnail' ); ?>">
				<audio
					type="audio/mpeg"
					class="c-podcast-player__audio-element"
					id="<?php $id = get_field("podcast_episode_title"); $id = preg_replace('/\s+/', '', $id); echo $id; ?>"
					ontimeupdate="updateTrackTime(this);"
					preload="metadata"
					src="<?php the_field('podcast_audio_file'); ?>">
					Your browser does not support the <code>audio</code> element.
				</audio>
				<div class="c-podcast-player__elements-wrapper">
					<div class="c-podcast-player__play-pause js-podcast-player__play-pause">
				    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" width="1000" height="1000" viewBox="250 250 500 500"><path id="Play" fill-rule="evenodd" d="M421 501.04c0-31.65.6-63.32-.3-94.94-.38-13.48 12.24-21.12 24.68-14.15 52.1 29.2 104.55 57.77 156.87 86.58 6.13 3.37 12.22 6.78 18.4 10.07 4.9 2.62 8.2 6.4 8.3 12.1.13 5.95-3.2 9.82-8.27 12.6-58.9 32.4-117.75 64.87-176.67 97.23-11.8 6.5-23-.17-23-13.55v-95.94z" clip-rule="evenodd"/><path id="Pause" d="M420.7 388.14h55.23v223.72H420.7zm123.74 0h55.23v223.72h-55.23z"/></svg>
				  </div>
					<div class="c-podcast-player__title">
						<h2><?php the_field("podcast_episode_title"); ?></h2>
						<span style="display: none;" class="c-podcast-player__series-title"><?php the_field("podcast_series"); ?></span>
					</div>
					<div class="c-podcast-player__info">
						<div class="c-podcast-player__progress-bar">
							<div class="c-podcast-player__progress-bar--overlay js-podcast-player__progress-bar--overlay"></div>
						</div>
						<div class="c-podcast-player__progress">
					    <span class="c-podcast-player--elapsed"></span> / <span class="c-podcast-player--duration"></span>
					  </div>
					  <div class="c-podcast-player__volume-wrapper">
					    <p>Vol:</p>
					    <input id="vol-control" class="c-footer-audio__volume js-audio-volume" type="range" min="0" max="100" step="1" oninput="SetVolume(this.value)" onchange="SetVolume(this.value)"></input>
					  </div>
						<a
							class="c-podcast-player__download-button"
							id="c-download-<?php $id = get_field("podcast_episode_title"); $id = preg_replace('/\s+/', '', $id); echo $id; ?>"
							href="<?php the_field('podcast_audio_file'); ?>"
							data-audio="<?php the_field('podcast_audio_file'); ?>"
							download="<?php the_field('podcast_episode_title'); ?>.mp3">Download</a>
					</div>

				</div>
				<div class="c-podcast-player__button-bar">
					<span class="c-podcast-player__small-button" id="c-podcast-player__small-button--share">Share</span>
					<span class="c-podcast-player__small-button" id="c-podcast-player__small-button--sub">Subscribe</span>
				</div>
				<div class="c-podcast-player__slide" id="c-podcast-player--share-slide">
					<span class="c-podcast-player__slide--text">Share <span class="c-podcast-player__slide--text__podcast-title"><?php the_field("podcast_episode_title"); ?></span></span>
					<div class="c-podcast-player__slide--links">

						<a class="c-podcast-player__share-icon" href="http://www.facebook.com/sharer.php?u=<?php the_permalink(); ?>" target="_blank" rel="noopener"><?php get_template_part( 'svg/icons/inline', 'fb' ); ?></a>

						<a class="c-podcast-player__share-icon" href="https://twitter.com/share?url=<?php the_permalink(); ?>" target="_blank" rel="noopener"><?php get_template_part( 'svg/icons/inline', 'tw' ); ?></a>

						<a class="c-podcast-player__share-icon" href="mailto:?subject=<?php the_title(); ?>&amp;body=<?php the_permalink() ?>" title="Send this article to a friend!"><?php get_template_part( 'svg/icons/inline', 'mail' ); ?></a>

					</div>
					<div class="o-close-button">
						<svg xmlns="http://www.w3.org/2000/svg" width="1596.8" height="1605.8" viewBox="0 0 1596.8 1605.8"><path d="M788 1h23c2.7.3 5.5.7 8.3.7 48 1 95.3 6.7 142.3 16.3 68.3 14 133.7 36.7 196 68 134 68 241 165.7 320 293.3 70.5 113.5 109.8 237 118.3 370.5 5 83.3-2 165.7-22 247-27 109.7-75 209.6-144 299-77 99.8-172.7 177-286 231.6-89.6 43-183.8 68-282.6 76-44 3.7-87.8 3.4-131.8-.4-57.7-5-114-16-169.3-33.2-146.3-46.2-269.6-127.6-369.4-244.4C124 1246 74 1156 41.3 1056.7c-22-66.7-35-135.2-38.7-205.4L1 813v-18l.7-11c1.7-25.4 2.6-51 5.3-76.2 7-64.6 22.3-127.2 45.2-187.8 48-127.5 123.5-236.2 226.7-325.3 94-81.3 201-137.2 322-168.3 50-13 101-21 152-23.6L788 1zm209 803.7l4.6-4.7L1172 629.6c33.7-33.8 68-67 101.2-101.6 36-38 47.5-83.3 34.4-134-17.7-68.3-86.8-113-156-101.8-31 5-57.5 18.8-79.8 41-89.3 89.5-178.6 178.8-268 268L799 606c-1.6-2-2.7-3.7-4-5.2-89.2-89-178-178.4-267.4-267-43-42.8-94.4-54-151.3-33.5-58.8 21.3-95.6 82-89 144.3 3.4 34.2 18 63.2 42.4 87.6l267.2 267c1 1.5 3 2.4 5 3.6l-5 5-72 72c-65 65.2-131 130.6-196 196.4-38 38-51 83.5-38 135.3 17 70 86 114.8 157 103.4 31-5 57-20 79.2-42 89-89 178.5-178 267.6-267l4.7-5 4.3 5c89.8 89.2 178.8 178.5 268 267.5 36 36 79.7 49.6 129.6 40 71-14 120-83.8 110.3-155-4.4-32.5-18.5-60.2-42-83.5l-267-267c-1.3-1-3.2-2-5-3.2z"/></svg>
					</div>
				</div>
				<div class="c-podcast-player__slide" id="c-podcast-player--sub-slide">
					<span class="c-podcast-player__slide--text">Subscribe to <span class="c-podcast-player__slide--text__podcast-title"><?php the_field("podcast_series"); ?></span></span>
					
					<div class="c-podcast-player__slide--links">

						<a target="_blank" rel="noopener" class="c-podcast-player__share-icon" title="Subscribe via RSS" href="https://stingingfly.org/wp-content/uploads/podcasts/stingingflypodcast.xml"><?php get_template_part( 'svg/icons/inline', 'rss' ); ?></a>
						<a target="_blank" rel="noopener" class="c-podcast-player__share-icon" title="Subscribe via iTunes" href="https://itunes.apple.com/ie/podcast/the-stinging-fly-podcast/id1216193485"><?php get_template_part( 'svg/icons/inline', 'itunes' ); ?></a>
						
					</div>
					<div class="o-close-button">
						<svg xmlns="http://www.w3.org/2000/svg" width="1596.8" height="1605.8" viewBox="0 0 1596.8 1605.8"><path d="M788 1h23c2.7.3 5.5.7 8.3.7 48 1 95.3 6.7 142.3 16.3 68.3 14 133.7 36.7 196 68 134 68 241 165.7 320 293.3 70.5 113.5 109.8 237 118.3 370.5 5 83.3-2 165.7-22 247-27 109.7-75 209.6-144 299-77 99.8-172.7 177-286 231.6-89.6 43-183.8 68-282.6 76-44 3.7-87.8 3.4-131.8-.4-57.7-5-114-16-169.3-33.2-146.3-46.2-269.6-127.6-369.4-244.4C124 1246 74 1156 41.3 1056.7c-22-66.7-35-135.2-38.7-205.4L1 813v-18l.7-11c1.7-25.4 2.6-51 5.3-76.2 7-64.6 22.3-127.2 45.2-187.8 48-127.5 123.5-236.2 226.7-325.3 94-81.3 201-137.2 322-168.3 50-13 101-21 152-23.6L788 1zm209 803.7l4.6-4.7L1172 629.6c33.7-33.8 68-67 101.2-101.6 36-38 47.5-83.3 34.4-134-17.7-68.3-86.8-113-156-101.8-31 5-57.5 18.8-79.8 41-89.3 89.5-178.6 178.8-268 268L799 606c-1.6-2-2.7-3.7-4-5.2-89.2-89-178-178.4-267.4-267-43-42.8-94.4-54-151.3-33.5-58.8 21.3-95.6 82-89 144.3 3.4 34.2 18 63.2 42.4 87.6l267.2 267c1 1.5 3 2.4 5 3.6l-5 5-72 72c-65 65.2-131 130.6-196 196.4-38 38-51 83.5-38 135.3 17 70 86 114.8 157 103.4 31-5 57-20 79.2-42 89-89 178.5-178 267.6-267l4.7-5 4.3 5c89.8 89.2 178.8 178.5 268 267.5 36 36 79.7 49.6 129.6 40 71-14 120-83.8 110.3-155-4.4-32.5-18.5-60.2-42-83.5l-267-267c-1.3-1-3.2-2-5-3.2z"/></svg>
					</div>
				</div>
			</div>
			<?php
				the_content();
			?>
			
		</div>

	</article>

	<script type="text/javascript">

	var audioPlayer = document.getElementById("<?php echo $id; ?>"),
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

	function fileLength() {
		audioPlayer.addEventListener('loadedmetadata', function() {
			var time = audioPlayer.duration;
			var formatted = formatSecondsAsTime(time);
			audioDuration.innerHTML = formatted;
		});
	}

	window.addEventListener("load", function(){

		audioElapsed.innerHTML = "00:00";
		fileLength();

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
