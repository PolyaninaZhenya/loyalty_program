<?php

// создание маршрута
add_action('rest_api_init', function () {

    // пространство имен
    $namespace = 'ommo/v2';

    // маршрут
    $rout = '/get_user_card_by_number';

    // параметры конечной точки (маршрута)
    $rout_params = [
        'methods' => 'GET',
        'callback' => 'get_user_card_by_number',
        'permission_callback' => '__return_true',
    ];

    register_rest_route($namespace, $rout, $rout_params);
});

// функция обработчик конечной точки (маршрута)
function get_user_card_by_number(WP_REST_Request $request)
{

    if (empty($request['number'])) {
        return [
            'status' => 400,
            'message' => 'Не переданы номер карты'
        ];
    }

    $posts = new WP_Query([
        'post_type' => 'user_cards',
        'meta_query' => [
            'relation' => 'AND',
            [
                'key' => 'number',
                'value' => $request['number']
            ],
        ]
    ]);

    if ($posts->have_posts()) {
        $response = [];
        foreach ($posts->posts as $key => $post) {
            $acf = get_fields($post->ID);

            $response = (array)$post;
            $response['acf'] = $acf;
        }
    } else {
        $response = [
            'status' => 200,
            'message' => 'Нету карточки'
        ];
    }

    return $response;
}