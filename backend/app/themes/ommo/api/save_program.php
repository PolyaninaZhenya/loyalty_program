<?php
require_once ABSPATH . 'wp-admin/includes/media.php';
require_once ABSPATH . 'wp-admin/includes/file.php';
require_once ABSPATH . 'wp-admin/includes/image.php';

// создание маршрута
add_action('rest_api_init', function () {

    // пространство имен
    $namespace = 'ommo/v2';

    // маршрут
    $rout = '/edit_program';

    // параметры конечной точки (маршрута)
    $rout_params = [
        'methods'             => 'POST',
        'callback'            => 'edit_program',
        'permission_callback' => '__return_true',
        'headers' => [
            'Content-Type' => "multipart/form-data;"
        ],
    ];

    register_rest_route($namespace, $rout, $rout_params);
});

// функция обработчик конечной точки (маршрута)
function edit_program(WP_REST_Request $request)
{
    $data = $request->get_params();

    if (isset($data['params'])) {
        $program_data = [
            'ID'            => $data['programId'],
            'post_type'     => 'program',
            'post_title'    => $data['programName'],
            'post_content'  => $data['programDesc'],
            'post_status'   => 'publish',
            'post_author'   => 1,
            'post_category' => [$data['programType']]
        ];
        $update_program = wp_update_post($program_data);
        update_field('levels', $data['levels'], $data['programId']);

        $card_data = [
            'ID'            => $data['cardId'],
            'post_type'     => 'card',
            'post_title'    => $data['cardName'],
            'post_content'  => $data['cardDesc'],
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
