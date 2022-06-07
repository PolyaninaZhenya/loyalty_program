<?php
// создание маршрута
add_action('rest_api_init', function () {

    // пространство имен
    $namespace = 'ommo/v2';

    // маршрут
    $rout = '/get_user_cards';

    // параметры конечной точки (маршрута)
    $rout_params = [
        'methods' => 'GET',
        'callback' => 'get_user_cards',
        'permission_callback' => '__return_true',
    ];

    register_rest_route($namespace, $rout, $rout_params);
});

// функция обработчик конечной точки (маршрута)
function get_user_cards(WP_REST_Request $request)
{

    if (empty($request['uid'])) {
        $response = rest_ensure_response(['message' => 'Не переданы параметр uid']);
        $response->set_status(400);

        return $response;
    }

    $posts = new WP_Query([
        'post_type' => 'user_cards',
        'meta_query' => [
            [
                'key' => 'uid',
                'value' => $request['uid']
            ],
        ]
    ]);

    if ($posts->have_posts()) {
        $response = [];
        foreach ($posts->posts as $key => $post) {
            $acf = get_fields($post->ID);
            $data = get_post($acf['card_id']);
            $acfData = get_fields($acf['card_id']);

            $response[$key] = (array)$post;
            $response[$key]['data'] = (array)$data;
            $response[$key]['data']['acf'] = $acfData;
            $response[$key]['acf'] = $acf;
        }
    } else {
        $response = rest_ensure_response(['message' => 'Нету карт']);
        $response->set_status(400);

        return $response;
    }

    return $response;
}
