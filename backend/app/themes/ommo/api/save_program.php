<?php
// создание маршрута
add_action('rest_api_init', function () {

    // пространство имен
    $namespace = 'ommo/v2';

    // маршрут
    $rout = '/edit_program';

    // параметры конечной точки (маршрута)
    $rout_params = [
        'methods'             => 'PUT',
        'callback'            => 'edit_program',
        'permission_callback' => '__return_true',
    ];

    register_rest_route($namespace, $rout, $rout_params);
});

// функция обработчик конечной точки (маршрута)
function edit_program(WP_REST_Request $request)
{
    $data = $request->get_params();

    if (isset($data['params'])) {
        $program_data = [
            'ID'            => $data['params']['programId'],
            'post_type'     => 'program',
            'post_title'    => $data['params']['programName'],
            'post_content'  => $data['params']['programDesc'],
            'post_status'   => 'publish',
            'post_author'   => 1,
            'post_category' => [$data['params']['programType']]
        ];
        $update_program = wp_update_post($program_data);
        update_field('levels', $data['params']['levels'], $data['params']['programId']);

        $card_data = [
            'ID'            => $data['params']['cardId'],
            'post_type'     => 'card',
            'post_title'    => $data['params']['cardName'],
            'post_content'  => $data['params']['cardDesc'],
            'post_status'   => 'publish',
            'post_author'   => 1,
        ];
        $update_card = wp_update_post($card_data);

        return [
            'status'  => '200',
            'requset' => $request,
            'data'    => $request->get_params(),
            'program' => $update_program,
            'card'    => $update_card,
            'message' => 'Успешно обновлено'
        ];
    } else {
        // получим объект WP_REST_Response
        $response = rest_ensure_response(array( 'message' => 'нет параметров' ));
        $response->set_status(401);
        return $response;
    }
}
