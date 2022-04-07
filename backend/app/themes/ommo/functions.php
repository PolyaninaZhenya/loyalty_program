<?php
require_once 'post-type/_index.php';
require_once 'api/_index.php';


/**
 * Скрываем из админки не нужные поля
 */
add_action('admin_menu', 'remove_admin_menu');
function remove_admin_menu()
{
//    remove_menu_page('options-general.php');     // Удаляем раздел Настройки
    remove_menu_page('tools.php');                          // Инструменты
    remove_menu_page('users.php');                          // Пользователи
//    remove_menu_page('plugins.php');             // Плагины
    remove_menu_page('themes.php');                         // Внешний вид
    remove_menu_page('edit.php');                           // Посты блога
    remove_menu_page('upload.php');                         // Медиабиблиотека
    remove_menu_page('edit.php?post_type=page');            // Страницы
    remove_menu_page('edit-comments.php');                  // Комментарии
    remove_menu_page('link-manager.php');                   // Ссылки
    remove_menu_page('admin.php?page=_mtrloptions');        // Ссылки
}