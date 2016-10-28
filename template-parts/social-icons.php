<div class="c-social-icons">
  <a href="http://www.facebook.com/sharer.php?u=<?php the_permalink(); ?>" target="_blank" rel="noopener">
    <?php get_template_part( 'svg/icons/inline', 'fb' ); ?>
  </a>
  <a href="https://twitter.com/share?url=<?php the_permalink(); ?>" target="_blank" rel="noopener">
    <?php get_template_part( 'svg/icons/inline', 'tw' ); ?>
  </a>
  <a class="js-social-expand social-expand">
    <?php get_template_part( 'svg/icons/inline', 'plus-circle' ); ?>
  </a>
  <div class="c-social-icons--hidden js-social-hidden">
    <a href="mailto:?subject=<?php the_title(); ?>&amp;body=<?php the_permalink() ?>" title="Send this article to a friend!">
      <?php get_template_part( 'svg/icons/inline', 'mail' ); ?>
    </a>
    <a href="javascript:;" onclick="window.print()" target="_blank" rel="noopener">
      <?php get_template_part( 'svg/icons/inline', 'print' ); ?>
    </a>
  </div>
</div>
