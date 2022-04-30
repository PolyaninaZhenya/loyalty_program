<?php
// создание маршрута
add_action('rest_api_init', function () {

    // пространство имен
    $namespace = 'ommo/v2';

    // маршрут
    $rout = '/create_program';

    // параметры конечной точки (маршрута)
    $rout_params = [
        'methods'             => 'POST',
        'callback'            => 'create_program',
        'permission_callback' => '__return_true',
    ];

    register_rest_route($namespace, $rout, $rout_params);
});

// функция обработчик конечной точки (маршрута)
function create_program(WP_REST_Request $request)
{
    $data = $request->get_params();

    $program_data = [
        'post_type'     => 'program',
        'post_title'    => $data['params']['programName'],
        'post_content'  => $data['params']['programDesc'],
        'post_status'   => 'publish',
        'post_author'   => 1,
        'post_category' => [$data['params']['programType']]
    ];

    $card_data = [
        'post_type'     => 'card',
        'post_title'    => $data['params']['cardName'],
        'post_content'  => $data['params']['cardDesc'],
        'post_status'   => 'publish',
        'post_author'   => 1,
    ];

    $vendors = get_posts([
        'post_type'  => 'vendor',
        'meta_key'   => 'uid',
        'meta_value' => $data['params']['user']['uid']
    ]);

    if ($vendors) {
        // Вставляем запись в базу данных
        $program_id = wp_insert_post($program_data, true);
        $card_id = wp_insert_post($card_data, true);

        //Устанавливаем владельца и привязываем карту к программе
        update_post_meta($program_id, 'vendor_id', $vendors[0]->ID);
        update_post_meta($program_id, 'card_id', $card_id);
        update_post_meta($card_id, 'vendor_id', $vendors[0]->ID);
    }

    return [
        'params' => $data['params'],
        'program_id' => $program_id
    ];
}
