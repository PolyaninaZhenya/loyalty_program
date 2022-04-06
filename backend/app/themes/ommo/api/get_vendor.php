<?php
// создание маршрута
add_action('rest_api_init', function () {

    // пространство имен
    $namespace = 'ommo/v2';

    // маршрут
    $rout = '/get_vendor/(?P<id>\d+)';

    // параметры конечной точки (маршрута)
    $rout_params = [
        'methods'             => 'GET',
        'callback'            => 'get_vendor',
        'args'                => [
            'arg_str' => [
                'type'     => 'string', // значение параметра должно быть строкой
                'required' => true,     // параметр обязательный
            ],
        ],
        'permission_callback' => '__return_true',
    ];

    register_rest_route($namespace, $rout, $rout_params);
});

// функция обработчик конечной точки (маршрута)
function get_vendor(WP_REST_Request $request)
{
    $posts = get_posts([
        'post_type'  => 'vendor',
        'meta_key'   => 'uid',
        'meta_value' => $request['id']
    ]);

    if (empty($posts)) {
        return new WP_Error('no_author_posts', 'Записей не найдено', ['status' => 404]);
    }

    return $posts;
}
