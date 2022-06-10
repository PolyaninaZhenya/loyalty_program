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

    if (!empty($data)) {
        $card_data = [
            'ID'            => $data['post']['id'],
            'post_type'     => 'card',
            'post_title'    => $data['post']['title']['rendered'],
            'post_content'  => $data['post']['content']['rendered'],
            'post_status'   => 'publish',
            'post_author'   => 1,
        ];

        $update_card = wp_update_post($card_data);
        wp_set_post_terms($data['post']['id'], $data['post']['cat_card'], 'cat_card', false);
        update_field('levels', $data['post']['acf']['levels'], $data['post']['id']);

        return [
            'status'  => '200',
            'requset' => $request,
            'data'    => $request->get_params(),
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
