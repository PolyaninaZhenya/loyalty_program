<?php
// создание маршрута
add_action('rest_api_init', function () {

    // пространство имен
    $namespace = 'ommo/v2';

    // маршрут
    $rout = '/create_payment';

    // параметры конечной точки (маршрута)
    $rout_params = [
        'methods' => 'POST',
        'callback' => 'create_payment',
        'permission_callback' => '__return_true',
        'headers' => [
            'Content-Type' => "multipart/form-data;"
        ],
    ];

    register_rest_route($namespace, $rout, $rout_params);
});

// функция обработчик конечной точки (маршрута)
function create_payment(WP_REST_Request $request)
{
    $data = $request->get_params();

    if (empty($data)) {
        $response = rest_ensure_response(['message' => 'Не переданы параметры']);
        $response->set_status(400);

        return $response;
    }

    $payment_data = [
        'post_type'    => 'payment',
        'post_title'   => date('d.m.y h:i:s'),
        'post_content' => null,
        'post_status'  => 'publish',
        'post_author'  => 1
    ];

    $payment_id = wp_insert_post($payment_data, true);

    update_field('number', $data['number'], $payment_id);
    update_field('summa', $data['summa'], $payment_id);
    update_field('uid', $data['uid'], $payment_id);


    $cards = get_posts([
        'post_type'  => 'user_cards',
        'meta_key'   => 'number',
        'meta_value' => $data['number']
    ]);

    if ($data['bonuses'] && $cards[0]) {
        $bonuses = get_field('scores', $cards[0]->ID);

        update_field('scores', $bonuses + $data['bonuses'], $cards[0]->ID);
        update_field('bonuses', $data['bonuses'], $payment_id);
    }

    return [
        'cards' => $cards[0],
        'params' => $data
    ];
}
