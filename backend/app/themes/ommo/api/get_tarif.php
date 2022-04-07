<?php
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