<?php
// создание маршрута
add_action('rest_api_init', function () {

    // пространство имен
    $namespace = 'ommo/v2';

    // маршрут
    $rout = '/create_program';

    // параметры конечной точки (маршрута)
    $rout_params = [
        'methods'             => 'GET',
        'callback'            => 'create_program',
        'permission_callback' => '__return_true',
    ];

    register_rest_route($namespace, $rout, $rout_params);
});

// функция обработчик конечной точки (маршрута)
function create_program(WP_REST_Request $request): array
{



//    return [
//        'id'      => $post[0]->ID,
//        'title'   => $post[0]->post_title,
//        'guide'   => $acf,
//        'message' => 'Вы являетесь организацией'
//    ];
}