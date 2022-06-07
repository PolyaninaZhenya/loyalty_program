<?php
// создание маршрута
add_action('rest_api_init', function () {

    // пространство имен
    $namespace = 'ommo/v2';

    // маршрут
    $rout = '/get_user_card';

    // параметры конечной точки (маршрута)
    $rout_params = [
        'methods' => 'GET',
        'callback' => 'get_user_card',
        'permission_callback' => '__return_true',
    ];

    register_rest_route($namespace, $rout, $rout_params);
});

// функция обработчик конечной точки (маршрута)
function get_user_card(WP_REST_Request $request)
{

    if (empty($request['uid']) || empty($request['cardId'])) {
        return [
            'status' => 400,
            'message' => 'Не переданы все нужные параметры uid и cardId'
        ];
    }

    $posts = new WP_Query([
        'post_type' => 'user_cards',
        'meta_query' => [
            'relation' => 'AND',
            [
                'key' => 'uid',
                'value' => $request['uid']
            ],
            [
                'key' => 'card_id',
                'value' => $request['cardId']
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
            'status'  => 200,
            'message' => 'Нету карточки'
        ];
    }

    return $response;
}