<?php
// создание маршрута
add_action('rest_api_init', function () {

    // пространство имен
    $namespace = 'ommo/v2';

    // маршрут
    $rout = '/get_vendor_card';

    // параметры конечной точки (маршрута)
    $rout_params = [
        'methods' => 'GET',
        'callback' => 'get_vendor_card',
        'permission_callback' => '__return_true',
    ];

    register_rest_route($namespace, $rout, $rout_params);
});

// функция обработчик конечной точки (маршрута)
function get_vendor_card(WP_REST_Request $request): array
{
    $posts = get_posts([
        'post_type'  => 'card',
        'meta_key'   => 'vendor_id',
        'meta_value' => $request['id']
    ]);

    $response = [];
    foreach ($posts as $post) {
        $arrayPost = (array)$post;
        $fields = get_fields($post->ID);
        $response[] = array_merge($arrayPost, $fields);
    }

    return $response;
}