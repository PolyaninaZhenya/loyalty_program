<?php
// создание маршрута
add_action('rest_api_init', function () {

    // пространство имен
    $namespace = 'ommo/v2';

    // маршрут
    $rout = '/get_user_card';

    // параметры конечной точки (маршрута)
    $rout_params = [
        'methods'             => 'GET',
        'callback'            => 'get_user_card',
        'permission_callback' => '__return_true',
    ];

    register_rest_route($namespace, $rout, $rout_params);
});

// функция обработчик конечной точки (маршрута)
function get_user_card(WP_REST_Request $request): array
{
    $posts = get_posts([
        'post_type'  => 'card',
    ]);

    $myPosts = [];

    foreach ($posts as $key => $post) {
        $acf = get_fields($post->ID);

        if ($acf['user'] && is_array($acf['user'])) {
            foreach ($acf['user'] as $user) {
                if ($user['uid'] == $request['id']) {
                    $myPosts[] = array_merge($post->to_array(), ['acf' => $acf]);
                }
            }
        }
    }

    return $myPosts;
}