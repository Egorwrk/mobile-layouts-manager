<?php

namespace routes;
include "../bootstrap/Autoloader.php";

use \app\Controllers;

class Router
{
    public function rout()
    {
        $config = parse_ini_file("../config/config.ini");
        $dbConnect = new Controllers\DBConnect($config['dbhost'], $config['dbuser'], $config['dbpass'], $config['dbname']);
        switch ($_SERVER['REQUEST_METHOD']) {
            case 'GET':
            {
                switch ($_GET['q']) {
                    case '/templates':
                    {
                        if (isset($_COOKIE['login'])) {
                            $conn = $dbConnect::connect();
                            $log = new Controllers\ReturnTemplates($conn);
                            $log->returnTemplates();
                        } else {
                            echo "user doesn't auth";
                        }
                    }
                }
                break;
            }
            case 'POST':
            {
                switch ($_POST['q']) {
                    case 'login':
                    {
                        if (isset($_POST['login']) && isset($_POST['password'])) {
                            $conn = $dbConnect::connect();
                            $log = new Controllers\Login($conn);
                            $log->login();
                        }
                        break;
                    }
                    case 'registration':
                    {
                        if (isset($_POST['login']) && isset($_POST['password']) && isset($_POST['email'])) {
                            $conn = $dbConnect::connect();
                            $reg = new Controllers\Registration($conn);
                            $reg->registration();
                        }
                        break;
                    }
                    case 'templatesSaving':
                    {
                        if (isset($_COOKIE["login"]) && isset($_POST['templates'])) {
                            $conn = $dbConnect::connect();
                            $layoutsSave = new Controllers\TemplatesSaving($conn);
                            $layoutsSave->templatesSaving();
                        }
                        break;
                    }
                }
            }
        }
    }
}