<?php
/**
 * Регистрация новой таксономии program
 */
//add_action('init', 'create_taxonomy_program');
//function create_user_cards()
//{
//    // список параметров: wp-kama.ru/function/get_taxonomy_labels
//    register_taxonomy('cat_program', ['program'], [
//        'label'               => '', // определяется параметром $labels->name
//        'labels'              => [
//            'name'              => __('Категории', 'dwr-theme'),
//            'singular_name'     => __('Категория', 'dwr-theme'),
//            'search_items'      => __('Найти категорию', 'dwr-theme'),
//            'all_items'         => __('Все категории', 'dwr-theme'),
//            'view_item '        => __('Посмотреть категорию', 'dwr-theme'),
//            'parent_item'       => __('Родительская категория', 'dwr-theme'),
//            'parent_item_colon' => __('Родительские категории:', 'dwr-theme'),
//            'edit_item'         => __('Изменить категорию', 'dwr-theme'),
//            'update_item'       => __('Обновить', 'dwr-theme'),
//            'add_new_item'      => __('Добавить категорию', 'dwr-theme'),
//            'new_item_name'     => __('Новое имя категории', 'dwr-theme'),
//            'menu_name'         => __('Типы программ', 'dwr-theme'),
//        ],
//        'description'         => '', // описание таксономии
//        'public'              => true,
//        // 'publicly_queryable'    => null, // равен аргументу public
//        // 'show_in_nav_menus'     => true, // равен аргументу public
//        // 'show_ui'               => true, // равен аргументу public
//        // 'show_in_menu'          => true, // равен аргументу show_ui
//        // 'show_tagcloud'         => true, // равен аргументу show_ui
//        // 'show_in_quick_edit'    => null, // равен аргументу show_ui
//        'hierarchical'        => false,
//        'rewrite'             => true,
//        //'query_var'             => $taxonomy, // название параметра запроса
//        'capabilities'        => [],
//        'meta_box_cb'         => null,
//        // html метабокса. callback: `post_categories_meta_box` или `post_tags_meta_box`. false — метабокс отключен.
//        'show_admin_column'   => false,
//        // авто-создание колонки таксы в таблице ассоциированного типа записи. (с версии 3.5)
//        'show_in_rest'        => true, // добавить в REST API
//        'show_in_graphql'     => true,
//        'graphql_single_name' => 'cat_program',
//        'graphql_plural_name' => 'cat_programs',
//        'rest_base'           => null, // $taxonomy
//        // '_builtin'              => false,
//        //'update_count_callback' => '_update_post_term_count',
//    ]);
//}


/**
 * Регистрация нового типа поста program
 */
add_action('init', 'register_post_types_user_cards');
function register_post_types_user_cards()
{
    register_post_type('user_cards', [
        'label'               => null,
        'labels'              => [
            'name'               => __('Карты', 'dwr-theme'),      // основное название для типа записи
            'singular_name'      => __('Карты', 'dwr-theme'),                  // название для одной записи этого типа
            'add_new'            => __('Добавить карту', 'dwr-theme'),         // для добавления новой записи
            'add_new_item'       => __('Добавление карты', 'dwr-theme'),
            // заголовка у вновь создаваемой записи в админ-панели.
            'edit_item'          => __('Редактирование карты', 'dwr-theme'),   // для редактирования типа записи
            'new_item'           => __('Новая карта', 'dwr-theme'),            // текст новой записи
            'view_item'          => __('Смотреть карту', 'dwr-theme'),         // для просмотра записи этого типа.
            'search_items'       => __('Искать карту', 'dwr-theme'),           // для поиска по этим типам записи
            'not_found'          => __('Не найдено', 'dwr-theme'),// если в результате поиска ничего не было найдено
            'not_found_in_trash' => __('Не найдено в корзине', 'dwr-theme'),  // если не было найдено в корзине
            'parent_item_colon'  => __('', 'dwr-theme'),                      // для родителей (у древовидных типов)
            'menu_name'          => __('Все карты', 'dwr-theme'),      // название меню
        ],
        'description'         => '',
        'public'              => true,
        // 'publicly_queryable'  => null,                    // зависит от public
        // 'exclude_from_search' => null,                    // зависит от public
        // 'show_ui'             => null,                    // зависит от public
        // 'show_in_nav_menus'   => null,                    // зависит от public
        'show_in_menu'        => null,                             // показывать ли в меню адмнки
        // 'show_in_admin_bar'   => null,                    // зависит от show_in_menu
        'show_in_rest'        => true,                            // Включаем поддержку Gutenberg
        'rest_base'           => 'user_cards',               // $post_type. C WP 4.7
        'menu_position'       => null,
        'menu_icon'           => 'dashicons-format-aside',
        //'capability_type'   => 'post',
        //'capabilities'      => 'post',                     // массив дополнительных прав для этого типа записи
        //'map_meta_cap'      => null,                       // Ставим true чтобы включить дефолтный обработчик специальных прав
        'hierarchical'        => false,
        'supports'            => [
            'title',
            'editor',
            'thumbnail',
        ],
        // 'title','editor','author','thumbnail','excerpt','trackbacks','custom-fields','comments','revisions','page-attributes','post-formats'
//        'taxonomies'          => ['cat_program'],
        'has_archive'         => false,
        'rewrite'             => true,
        'query_var'           => true,
        'show_in_graphql'     => true,
        'graphql_single_name' => 'userCard',
        'graphql_plural_name' => 'userCards',
    ]);
}