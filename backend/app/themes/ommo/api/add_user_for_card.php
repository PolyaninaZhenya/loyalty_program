<?php
// создание маршрута
add_action('rest_api_init', function () {

    // пространство имен
    $namespace = 'ommo/v2';

    // маршрут
    $rout = '/add_user_for_card';

    // параметры конечной точки (маршрута)
    $rout_params = [
        'methods' => 'GET',
        'callback' => 'add_user_for_card',
        'permission_callback' => '__return_true',
    ];

    register_rest_route($namespace, $rout, $rout_params);
});

// функция обработчик конечной точки (маршрута)
function add_user_for_card(WP_REST_Request $request): array
{
    $date = date('dmYhis');
    $number =  crc32($date . $request['userId']);

    $posts = new WP_Query([
        'post_type' => 'user_cards',
        'meta_query' => [
            'relation' => 'AND',
            [
                'key' => 'uid',
                'value' => $request['userId']
            ],
            [
                'key' => 'card_id',
                'value' => $request['postId']
            ],
        ]
    ]);

    if ($posts->have_posts()) {
        return [
            'status' => 400,
            'message' => 'У вас уже есть карта'
        ];
    }

    $data = [
        'post_title' => $number,
        'post_type' => 'user_cards',
        'post_content' => null,
        'post_status' => 'publish',
        'post_author' => 1,
        'post_category' => null,
    ];

    $newCard = wp_insert_post($data);

    if ($newCard) {
        update_post_meta($newCard, 'date', $date);

        update_field('number', $number, $newCard);
        update_field('uid', $request['userId'], $newCard);
        update_field('scores', 0, $newCard);
        update_field('level', 1, $newCard);
        update_field('card_id', $request['postId'], $newCard);

        return [
            'status' => '200',
            'value' => $newCard,
            'message' => 'Успешно добавлено'
        ];
    } else {
        return [
            'status' => '400',
            'message' => 'Ошибка'
        ];
    }
}


// создание маршрута
add_action('rest_api_init', function () {

    // пространство имен
    $namespace = 'ommo/v2';

    // маршрут
    $rout = '/delete_user_for_card';

    // параметры конечной точки (маршрута)
    $rout_params = [
        'methods' => 'POST',
        'callback' => 'delete_user_for_card',
        'permission_callback' => '__return_true',
    ];

    register_rest_route($namespace, $rout, $rout_params);
});

// функция обработчик конечной точки (маршрута)
function delete_user_for_card(WP_REST_Request $request)
{

    if (empty($request['id'])) {
        $response = rest_ensure_response(['message' => 'не передан ID']);
        $response->set_status(400);

        return $response;
    }

    $post_id = wp_delete_post($request['id']);

    return [
        'id' => $post_id,
        'message' => 'Успешно удалена карта'
    ];
}
