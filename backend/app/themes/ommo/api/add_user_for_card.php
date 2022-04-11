<?php
// создание маршрута
add_action('rest_api_init', function () {

    // пространство имен
    $namespace = 'ommo/v2';

    // маршрут
    $rout = '/add_user_for_card';

    // параметры конечной точки (маршрута)
    $rout_params = [
        'methods'             => 'GET',
        'callback'            => 'add_user_for_card',
        'permission_callback' => '__return_true',
    ];

    register_rest_route($namespace, $rout, $rout_params);
});

// функция обработчик конечной точки (маршрута)
function add_user_for_card(WP_REST_Request $request)
{
    $users = get_field('user', $request['postId']);

    if (is_array($users)) {
        array_push($users, [
            'uid'    => $request['userId'],
            'number' => rand(100000, 999999),
        ]);
    } else {
        $users[0] = [
            'uid'    => $request['userId'],
            'number' => rand(100000, 999999)
        ];
    }

    $update = update_field('user', $users, $request['postId']);

    if ($update) {
        return [
            'status'  => '200',
            'value'   => $update,
            'message' => 'Успешно добавлено'
        ];
    } else {
        return [
            'status'  => '400',
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
        'methods'             => 'GET',
        'callback'            => 'delete_user_for_card',
        'permission_callback' => '__return_true',
    ];

    register_rest_route($namespace, $rout, $rout_params);
});

// функция обработчик конечной точки (маршрута)
function delete_user_for_card(WP_REST_Request $request): array
{

    $users = get_field('user', $request['postId']);
    $response['old_users'] = $users;
    $response['users'] = array_diff($users, [[$request['userId']]]);
    $response['status'] = 200;
    $response['message'] = 'Успешно удален';

    $update = update_field('user', $response['users'], $request['postId']);

    return $response;
}

