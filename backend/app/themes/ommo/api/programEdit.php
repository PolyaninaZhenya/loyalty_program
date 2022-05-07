<?php
// создание маршрута
add_action('rest_api_init', function () {

    // пространство имен
    $namespace = 'ommo/v2';

    // маршрут
    $rout = '/programInfo';

    // параметры конечной точки (маршрута)
    $rout_params = [
        'methods'             => 'GET',
        'callback'            => 'get_program',
        'permission_callback' => '__return_true',
    ];

    register_rest_route($namespace, $rout, $rout_params);
});

// функция обработчик конечной точки (маршрута)
function get_program(WP_REST_Request $request)
{
    $data = $request->get_params();
    ['programId' => $programId] = $data;

    $program = get_post($programId, ARRAY_A);

    if ($program) {
        $card = get_post(get_field('card_id', $programId), ARRAY_A);
        $program['acf'] = get_fields($programId);
        $card['acf'] = get_fields($card['ID']);
        $program['terms'] = get_the_terms($programId, 'cat_program');

        $response = rest_ensure_response([
            'program' => $program,
            'card' => $card,
        ]);

    } else {
        $response = rest_ensure_response([
            'message' => 'Ошибка нет такой программы',
        ]);

        $response->set_status(401);
    }

    return $response;
}
