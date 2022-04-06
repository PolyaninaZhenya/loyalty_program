<?php
require_once 'post-type/_index.php';
require_once 'api/_index.php';


/**
 * Скрываем из админки не нужные поля
 */
add_action('admin_menu', 'remove_admin_menu');
function remove_admin_menu()
{
//    remove_menu_page('options-general.php');     // Удаляем раздел Настройки
    remove_menu_page('tools.php');                          // Инструменты
    remove_menu_page('users.php');                          // Пользователи
//    remove_menu_page('plugins.php');             // Плагины
    remove_menu_page('themes.php');                         // Внешний вид
    remove_menu_page('edit.php');                           // Посты блога
    remove_menu_page('upload.php');                         // Медиабиблиотека
    remove_menu_page('edit.php?post_type=page');            // Страницы
    remove_menu_page('edit-comments.php');                  // Комментарии
    remove_menu_page('link-manager.php');                   // Ссылки
    remove_menu_page('admin.php?page=_mtrloptions');        // Ссылки
}

// создание маршрута
add_action('rest_api_init', function () {

    // пространство имен
    $namespace = 'ommo/v2';

    // маршрут
    $rout = '/get_vendor';

    // параметры конечной точки (маршрута)
    $rout_params = [
        'methods'             => 'GET',
        'callback'            => 'get_vendor_by_id',
        //        'args'                => [
        //            'arg_str' => [
        //                'type'     => 'string', // значение параметра должно быть строкой
        //                'required' => true,     // параметр обязательный
        //            ],
        //        ],
        'permission_callback' => '__return_true',
    ];

    register_rest_route($namespace, $rout, $rout_params);
});

// функция обработчик конечной точки (маршрута)
function get_vendor_by_id(WP_REST_Request $request)
{
    $post = get_posts([
        'post_type'  => 'vendor',
        'meta_key'   => 'uid',
        'meta_value' => $request['id']
    ]);

    if (empty($post)) {
        return [
            'status'  => '404',
            'message' => 'Неявляеться организацией'
        ];
    }

    $acf = get_fields($post[0]->ID);
    return [
        'id'      => $post[0]->ID,
        'title'   => $post[0]->post_title,
        'guide'   => $acf,
        'status'  => '200',
        'message' => 'Вы являетесь организацией'
    ];
}