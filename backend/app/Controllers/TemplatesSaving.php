<?php

namespace app\Controllers;

use PDO, PDOException;

class TemplatesSaving
{
    private $connect;

    public function __construct(PDO $pdo)
    {
        $this->connect = $pdo;
    }

    public function templatesSaving()
    {
        $errMsg = '';
        $login = $_COOKIE["login"];
        $templates = $_POST['templates'];
        if ($login == '') $errMsg = 'Enter login';
        if ($errMsg == '') {
            try {
                $stmt = $this->connect->prepare('SELECT * FROM users WHERE login = :login');
                $stmt->execute(array(':login' => $login));
                $data = $stmt->fetch(PDO::FETCH_ASSOC);
                if ($data == false) {
                    $errMsg = "User $login not authorized.";
                    echo $errMsg;
                } else {
                    $sql = ("UPDATE users SET templates = '$templates' WHERE login = '$login'");
                    $this->connect->exec($sql);
                    echo "successful save";
                }
            } catch (PDOException $e) {
                echo "Database error: " . $e->getMessage();
            }
        } else {
            echo 'Error in Logging In.';
        }
    }
}