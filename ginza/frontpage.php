<?php
/**
  Template name: Главная
 */

get_header(); ?>

  <div class="main-slider owl-loaded">

        <?php $slider = get_field('slider_main') ?>

          <?php  if( have_rows('slider_main') ): ?>

            <?php while ( have_rows('slider_main') ) : the_row(); ?>

              <?php if( get_row_layout() == 'slide_form' ): ?>
                <?php
                $image = get_sub_field('bg_img');
                $size = 'full';
                $alt = get_post_meta($image['id'], '_wp_attachment_image_alt', true);
                ?>
              <div class="item-slide">
              	<div class="desc-slider"><?php echo get_sub_field('slide_title'); ?><a href="#step-form" data-attitude="Заявка расчет дизайна" class="btn open-popup-slider"><?php echo get_sub_field('slide_btn_text'); ?></a></div>
                <img src="<?=wp_get_attachment_image_url( $image['id'], $size );?>" alt="<?=$alt;?>">
                <div id="step-form" class="white-popup mfp-hide">

                  <?php $page_form = new WP_Query( 'page_id=1102' ); ?>

                      <?php if( $page_form -> have_posts() ) : ?>

                         <?php while ( $page_form -> have_posts() ) : $page_form -> the_post(); ?>

                    <div class="popup-thanks">
                      <?php echo get_field('send_ok') ?>
                    </div>

                    <div class="popup-body">
                      <div class="popup-title">
                        <h1><?php echo get_field('modal_title') ?></h1>
                      </div>
                      <form class="ajax-form-order" method="post">
                        <span class="input wizard-step active">
                          <select name="type" class="form-control required">
                            <option value="">Введите тип Вашего помещения</option>
                           <?php

                              if( have_rows('step_1') ):

                                  while ( have_rows('step_1') ) : the_row();
                            ?>
                                  <option value="<?php the_sub_field('type'); ?>"><?php the_sub_field('type'); ?></option>

                            <?php
                              endwhile;
                              endif;
                            ?>
                            </select>
                            <button class="btn next-step">Далее</button>
                        </span>
                        <span class="input wizard-step">
                          <select name="style" class="form-control required">
                            <option value="">Какой стиль вы предпочитаете</option>
                           <?php

                              if( have_rows('step_2') ):

                                  while ( have_rows('step_2') ) : the_row();
                            ?>
                                  <option value="<?php the_sub_field('style'); ?>"><?php the_sub_field('style'); ?></option>

                            <?php
                              endwhile;
                              endif;
                            ?>
                            </select>
                            <button class="btn next-step">Далее</button>
                        </span>
                        <span class="input wizard-step">
                          <input type="text" name="area" placeholder="<?php echo get_field('step_3') ?>" class="form-control required">
                          <button class="btn next-step">Далее</button>
                        </span>
                        <span class="input wizard-step">
                          <select name="vizual" class="form-control required">
                            <option value="">Нужна ли 3D визуализация</option>
                           <?php

                              if( have_rows('step_4') ):

                                  while ( have_rows('step_4') ) : the_row();
                            ?>
                                  <option value="<?php the_sub_field('visual'); ?>"><?php the_sub_field('visual'); ?></option>

                            <?php
                              endwhile;
                              endif;
                            ?>
                            </select>
                            <button class="btn next-step">Далее</button>
                        </span>
                        <span class="input wizard-step">
                          <input type="text" name="name" placeholder="Имя" class="form-control required">
                          <button class="btn next-step">Далее</button>
                        </span>
                        <span class="input wizard-step">
                          <input type="tel" name="phone" placeholder="Телефон" class="form-control required">
                          <input type="submit" class="btn next-step submit" value="Отправить">
                        </span>
                      </form>
                    </div>
                     <?php endwhile; ?>
                     <?php wp_reset_postdata(); ?>
                    <?php endif; ?>
                  </div>

              </div>


              <?php elseif( get_row_layout() == 'slider_video' ): ?>

                <div class="item-slide 1">
                  <video class="slider_video video-js" autoplay loop muted controls id="bgvideo">
                   <source type="video/mp4" src="<?php echo the_sub_field('video_url'); ?>" >
                  </video>
                  <div class="desc-slider"><?php echo the_sub_field('title'); ?><a href="#video" class="btn popup-video"><?php echo the_sub_field('title_btn'); ?></a></div>

                  <div id="video" class="mfp-video mfp-hide">
                    <div class="popup-body">
                      <video controls width="780">
                        <source type="video/mp4" src="<?php echo the_sub_field('video_url'); ?>" >
                      </video>
                    </div>
                  </div>
                  <input type="button" value="включить звук" class="mute_slide_video" id="mute">
                </div>

              <?php elseif( get_row_layout() == 'slider_link_post' ): ?>
                  <?php
                  $image = get_sub_field('bg_img');
                  $size = 'full';
                  ?>
                <div class="item-slide">
                  <img src="<?=wp_get_attachment_image_url( $image['id'], $size );?>" alt="">
                  <div class="desc-slider"><?php echo get_sub_field('title'); ?><a href="<?php echo get_sub_field('btn_link'); ?>" class="btn"><?php echo get_sub_field('btn_title'); ?></a></div>
                </div>

              <?php endif; ?>

            <?php endwhile; ?>

          <?php endif; ?>

    </div>

    <?php $news = new WP_Query('post_type=post&category_name=news&posts_per_page=2&orderby=date&order=desc') ?>

    <?php if ( $news ) : ?>

    <section id="blog" class="block-1">
      <div class="block-title" style="opacity: 0;">
        <h2 class="cl_bg1"></h2>
      </div>
      <div class="container">
        <div class="news-list">

          <?php while ( $news -> have_posts() ) : $news -> the_post(); ?>

          <div class="news-item clearfix">
            <div class="row">
              <div class="col-md-9 col-sm-7 col-xs-12">

      				<?php $images = get_field('photo_main');
                    $size = 'slider-thumb-alt';

      				  if($images){

                  // echo ' <div class="news-i-img '. php echo count($images) > 1 ? "load-img-1" : "none-gallery" . '>";

                  if(!(count($images) > 1)){
                    $size = 'large';
                    echo '<div class="news-i-img none-gallery">';

                    foreach($images as $image){
                      echo wp_get_attachment_image( $image['photo']['id'], $size );
                    }

                    echo '</div>';

                  }else{

                    echo '<div class="news-i-img load-img-1">';

                    foreach($images as $image){
                      echo wp_get_attachment_image( $image['photo']['id'], $size );
                    }

                    echo '</div>';

                  }
                };

              ?>

              </div>
              <div class="col-md-3 col-sm-5 col-xs-12">
                <div class="news-i_content">
                  <h3><a href="<?= get_permalink(); ?>"><?php the_title(); ?></a></h3>
                  <?php the_excerpt(); ?><a href="<?= get_permalink(); ?>" data-post="<?php echo get_post_type(); ?>" data-postid="<?php the_id(); ?>" class="btn open_post_list">Смотреть</a>
                </div>
              </div>
            </div>
          </div>

          <?php endwhile; ?>

          <?php if (  $news->max_num_pages > 1 ) : ?>
            <script>
            var true_posts = '<?php echo serialize($news->query_vars); ?>';
            var current_page = <?php echo (get_query_var('paged')) ? get_query_var('paged') : 1; ?>;
            var max_pages = '<?php echo $news->max_num_pages; ?>';
            var front_page_news = 1;
            </script>
            <div class="news-list-btn"><a href="http://www.gold-c.ru/category/news/" class="btn" id="load-more-post">еще новости</a></div>
          <?php endif; ?>


        </div>
      </div>
    </section>
    <br>
    <div class="marquiz__container marquiz__container_inline">
  <a class="marquiz__button marquiz__button_blicked marquiz__button_rounded marquiz__button_shadow" href="#popup:marquiz_5f58cad759ef2000447bd50c" data-fixed-side="" data-alpha-color="rgba(252, 201, 0, 0.5)" data-color="#fcc900" data-text-color="#000000" data-hide-quiz-on-mobile="false">Пройти тест</a>
</div>
  <?php wp_reset_postdata(); ?>
  <?php endif; ?>
<br>

    <?php if( have_rows('adv_front') ): ?>

    <section id="service" data-parallax="scroll" data-image-src="<?php echo get_template_directory_uri(); ?>/img/b-adv.png" class="block-adv parallax-window">
      <div class="block-adv-title">
        <div class="container">
          <div class="b-adv-t_item">точное планирование </div>
          <div class="b-adv-t_item">современный дизайн </div>
          <div class="b-adv-t_item">потрясающий результат</div>
        </div>
      </div>
      <div class="container">
        <div class="row row-flex">

        <?php while ( have_rows('adv_front') ) : the_row(); ?>
          <div class="col-md-3 col-sm-12 col-xs-12">
            <div class="b-adv-title_mobile">
              <span>
                <?php the_sub_field('title'); ?>
              </span>
            </div>
            <div class="b-adv-item">
              <div style="background-image:url(<?php
                    $image = get_sub_field('img');
                    $size = 'large';
                      echo wp_get_attachment_image_url( $image['id'], $size );

                  ?>)" class="b-adv-img"></div>
              <div class="b-adv-title"><?php the_sub_field('title'); ?></div>
              <div class="b-adv-desc"><?php the_sub_field('desc'); ?></div>
            </div>
          </div>
        <?php endwhile; ?>

        </div>
        <div id="about"></div>
        <div class="adv-btn-wrapper">
          <a data-attitude="Записаться на консультацию" data-title="Записаться на консультацию" data-thanks="Мы вам перезвоним в ближайшее время"  data-button="Записаться" class="btn adv-btn open-popup-link">Узнайте, как мы это делаем</a>
        </div>

      </div>
    </section>

    <?php endif; ?>

    <section class="block-2">
      <div class="block-title">
        <h2>о студии</h2>
      </div>
      <div class="container">
        <div class="row">

          <?php

              while ( have_posts() ) : the_post();
          ?>

          <div class="col-md-5 col-lg-offset-2 col-md-offset-1 col-xs-12 col-sm-6 col-offset-0">
            <div class="about-img"><?= get_the_post_thumbnail(get_the_ID(), 'large'); ?></div>
          </div>
          <div class="col-md-5 col-sm-6 col-xs-12">

            <?php

              the_content();

              endwhile;
          ?>

          </div>
        </div>
      </div>
    </section>
    <section id="portfolio" class="block-2">
      <div class="block-title">
        <h2>Выполненные проекты</h2>
      </div>
      <div class="container"><?php echo get_field('complitet_project'); ?>
        <div class="work-list">
          <div class="work-gallery work-slide">
            <div class="row">

              <?php
                $port_objects = get_field('complitet_project_list');
                $large_size_img = array(1,5,9);
                if( $port_objects ):
                  $i = 1;
                  foreach( $port_objects as $port):
                    $img_id = get_post_thumbnail_id($port->ID);
                  $alt = get_post_meta($img_id, '_wp_attachment_image_alt', true);
              ?>

                  <div class="work-g-col">
                    <div class="work-g-item">
                      <?php if(in_array($i, $large_size_img)) : ?>
                        <img src="<?php echo get_the_post_thumbnail_url( $port->ID, 'portfolio-img-lg' ); ?>" alt="<?=$alt;?>">
                      <?php else: ?>
                        <img src="<?php echo get_the_post_thumbnail_url( $port->ID, 'portfolio-img-md' ); ?>" alt="<?=$alt;?>">
                      <?php endif;?>
                      <div class="work-g-item-title"><?php echo get_the_title($port->ID); ?></div><a href="<?php echo get_permalink($port->ID); ?>"></a>
                    </div>
                  </div>

                 <?php $i++; endforeach; ?>

              <?php endif; ?>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
	<section class="services" style="background: #f4f5f0">
	<div class="block-title"><h2 class="cl_bg1">ПРОЕКТ ДИЗАЙНА ИНТЕРЬЕРА</h2></div>
		<div class="container">
		<div class="service-list">
          <div class="row">
          <div class="col-xs-12 col-md-4 col-sm-4">
              <div class="service-i__mobile">
                <div class="service-i-title">Комфорт <span>от 1800 руб/кв.м.</span></div>
              </div>
              <div class="service-item">
                <div class="service-i-img_wrp">
					<img src="http://www.gold-c.ru/wp-content/uploads/2016/10/2-510x361.jpg" alt="">
                  <div></div>
                </div>
                <div class="service-i-title">Комфорт <span>от 1800 руб/кв.м.</span></div>
                <div class="service-i-desc">
					•	Обмер и фото фиксация объекта <br>
					•	Выявление потребностей заказчика<br>
					•	Составление задания на проектирование <br>
					•	Планировочные решения от 3 до 5 вариантов<br>
					•	Концепция дизайна интерьера<br>
					•	Подбор отделочных материалов.<br>
					•	Подбор мебели, сантехники, декора<br>
					•	План демонтажа  стен и перегородок<br>
					•	План возводимых стен и перегородок<br>
					•	План полов с указанием типа покрытия <br>
					•	План потолков  с прорисовкой отдельных узлов и сечений<br>
					•	План освещения и электрики <br>
					•	План теплых полов <br>
					•	План сантехники <br>
					•	Развертки стен с указанием размеров и артикулов<br>
					•	Раскладка плитки в санузлах с указанием артикулов и количества материала<br>
					•	Спецификация отделочных материалов
				</div>
                <button data-attitude="Проект дизайна - Комфорт" data-title="Получить пример проекта" data-button="Получить" data-thanks="Мы отправим вам пример готового проекта в ближайшее время" class="btn open-popup-link">Получить пример проекта</button>
              </div>
            </div>
            <div class="col-xs-12 col-md-4 col-sm-4">
              <div class="service-i__mobile">
                <div class="service-i-title">Премиум <span>от 2500 руб/кв.м.</span></div>
              </div>
              <div class="service-item">
                <div class="service-i-img_wrp">
                    <img src="http://www.gold-c.ru/wp-content/uploads/2016/10/1-488x343.jpg" alt="">
                  <div></div>
                </div>
                <div class="service-i-title">Премиум <span>от 2500 руб/кв.м.</span></div>
                <div class="service-i-desc">
					•	Обмер и фото фиксация объекта <br>
					•	Выявление потребностей заказчика<br>
					•	Составление задания на проектирование <br>
					•	Планировочные решения от 5 до 15 вариантов<br>
					•	Концепция дизайна интерьера<br>
					•	Подбор отделочных материалов.<br>
					•	Подбор мебели, сантехники, декора<br>
					•	3D визуализация<br>
					•	План демонтажа  стен и перегородок<br>
					•	План возводимых стен и перегородок<br>
					•	План полов с указанием типа покрытия <br>
					•	План потолков  с прорисовкой отдельных узлов и сечений<br>
					•	План освещения и электрики <br>
					•	План теплых полов <br>
					•	План сантехники<br>
					•	План радиаторов и кондиционеров<br>
					•	Развертки стен с указанием размеров и артикулов<br>
					•	Раскладка плитки в санузлах с указанием артикулов и количества материала<br>
					•	Чертежи заказных изделий  <br>
					•	Спецификация отделочных материалов<br>
				</div>
                <button data-attitude="Проект дизайна - Премиум" data-title="Получить пример проекта" data-button="Получить" data-thanks="Мы отправим вам пример готового проекта в ближайшее время" class="btn open-popup-link">Получить пример проекта</button>
              </div>
            </div>
            <div class="col-xs-12 col-md-4 col-sm-4">
              <div class="service-i__mobile">
                <div class="service-i-title">Люкс <span>от 3300 руб/кв.м.</span></div>
              </div>
              <div class="service-item">
                <div class="service-i-img_wrp">
					<img src="http://www.gold-c.ru/wp-content/uploads/2016/10/luxury.jpg" alt="">
                  <div></div>
                </div>
                <div class="service-i-title">Люкс <span>от 3300 руб/кв.м.</span></div>
                <div class="service-i-desc">
                •	Обмер и фото фиксация объекта <br>
					•	Выявление потребностей заказчика<br>
					•	Составление задания на проектирование <br>
					•	Планировочные решения от 5 до 15 вариантов<br>
					•	Концепция дизайна интерьера<br>
					•	Подбор отделочных материалов.<br>
					•	Подбор мебели, сантехники, декора<br>
					•	3D визуализация<br>
					•	План демонтажа  стен и перегородок<br>
					•	План возводимых стен и перегородок<br>
					•	План полов с указанием типа покрытия <br>
					•	План потолков  с прорисовкой отдельных узлов и сечений<br>
					•	План освещения и электрики <br>
					•	План теплых полов <br>
					•	План сантехники<br>
					•	План радиаторов и кондиционеров<br>
					•	Развертки стен с указанием размеров и артикулов<br>
					•	Раскладка плитки в санузлах с указанием артикулов и количества материала<br>
					•	Чертежи заказных изделий  <br>
					•	Спецификация отделочных материалов<br>
          <div class="service-i-title"><span>+ Авторский надзор</span></div>
				</div>
                <button data-attitude="Проект дизайна - Люкс" data-title="Получить пример проекта" data-button="Получить" data-thanks="Мы отправим вам пример готового проекта в ближайшее время" class="btn open-popup-link">Получить пример проекта</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
	
  <?php $publication = new WP_Query('post_type=publication&posts_per_page=100&orderby=date&order=desc') ?>

   <?php if ( $publication -> have_posts() ) : ?>

    <section class="block-3">
      <div class="block-title">
        <h2 class="cl_bg1">публикации</h2>
      </div>
      <h4 class="block-title_desc">Золотое сечение — в журналах, на телевидении и в интернет-изданиях</h4>
      <div class="container">
        <div class="publication-wrapper">
          <div class="row">
            <div class="col-xs-10 col-xs-offset-1">
              <div class="publication-slider">

              <?php while ( $publication -> have_posts() ) : $publication -> the_post(); ?>

                <?php if(has_post_format('link')) : ?>

                  <div class="pub-item">
                  <a href="<?php echo esc_url( get_the_content() ); ?>" target="_blank"><?= get_the_post_thumbnail(get_the_ID(), 'slider-thumb-alt'); ?></a></div>

                <?php else : ?>

                <div class="pub-item">
                  <a href="<?php the_permalink(); ?>"><?= get_the_post_thumbnail(get_the_ID(), 'slider-thumb-alt'); ?></a></div>

                <?php endif; ?>

              <?php endwhile; ?>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
      <!-- <video controls="controls" width="540" height="480">
<source src="https://www.gold-c.ru/wp-content/uploads/2020/10/dizayn-Neoklassika.mpg" type="video/mp4"></video>
      </div> -->
    </section>

  <?php endif; ?>

  <?php $reviews = new WP_Query('post_type=reviews&posts_per_page=100&orderby=date&order=desc');?>

   <?php if ( $reviews -> have_posts() ) : ?>

    <section class="block-4">
      <div class="block-title">
        <h2 class="cl_bg1">ОТЗЫВЫ</h2>
      </div>
      <div class="container">
        <div class="reviews-wrapper">
          <div class="reviews-slider">

          <?php  while ( $reviews -> have_posts() ) : $reviews -> the_post(); ?>

            <div class="reviews-item">
              <div class="r-content">
              <span class="r-text"><?php the_title(); ?></span>
                <?php the_excerpt(); ?>
                <div class="r-link-box">

                  <?php if(get_field('link_project')) : ?>

                    <span class="r-show-proekt"><a href="<?php the_permalink(get_field('link_project')); ?>">посмотреть проект</a></span>

                  <?php endif; ?>

                  <span class="r-read"><a data-post="<?php echo get_post_type(); ?>" data-postid="<?php the_id(); ?>" class="open-popup-link-post">смотреть</a></span></div>
                <div class="r-author"><?php echo get_field('author_reviews'); ?><span><?php echo get_field('author_post'); ?></span><span style="background-image: url(<?php the_post_thumbnail_url('medium'); ?>)" class="r-img-author"></span></div>
              </div>
            </div>

            <?php endwhile; ?>

          </div>
        </div>
        <div class="adv-btn-wrapper"><a data-attitude="Отзыв" data-email="1" data-attrtext="true" data-title="Оставить отзыв" data-desc="Дорогие клиенты! С помощью ваших отзывов, мы сможем стать еще лучше. Спасибо вам за обратную связь!:)"   data-thanks="Спасибо за отзыв!)" data-auth="1" class="btn open-popup-link">Оставить отзыв</a></div>
      </div>
    </section>

    <?php
      endif;
    ?>

    <div class="form-hidden-block">
      <?= do_shortcode('[mc4wp_form id="3418"]'); ?>
    </div>
<?php get_footer(); ?>
