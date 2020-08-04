<div class="author-box">
	<div class="author-image-wrapper">
		<img src="<?php block_field( 'author-image' ); ?>" alt="<?php block_field( 'author-name' ); ?>" class="author-image">
	</div>
	<div class="author-text-wrapper">
		<p class="author-box__bio"><span class="author-box__name"><?php block_field( 'author-name' ); ?></span> <?php block_field( 'author-bio' ); ?></p>
		<p class="author-box__note"><span class="author-box-about">About <?php block_field( 'piece-title' ); ?>:</span> <?php block_field( 'author-note' ); ?></p>
	</div>
</div>