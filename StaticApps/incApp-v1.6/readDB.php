<?php

# Sunucu IP Adresi94.73.147.215
#Sunucu VersiyonCloudLinux, cPanel
# Veritabanı Adıu0181896_dbA4D
# Kullanıcı Adıu0181896_userA4D

$host = "127.0.0.1";

if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    if ($_GET['prev'] == 'true') {

        echo "<p>previous saved file</p>";
        $myfile = fopen("prevSavedFile.json", "r") or die("Unable to open file!");

        echo fread($myfile, filesize("savedFile.json"));

        fclose($myfile);
    }

    else {

        echo "<p>last save</p>";

    $myfile = fopen("savedFile.json", "r") or die("Unable to open file!");

    echo fread($myfile, filesize("savedFile.json"));

    fclose($myfile);
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $json = file_get_contents('php://input');

    echo 'REQUEST RECİEVED/n';

    echo $json;

    #mysqli_connect('{host}', '{user}', '{password}', '{db_name}');

    $myfile = fopen("savedFile.json", "r") or die("Unable to open file!");

    $prevfile = fopen("prevSavedFile.json", "w") or die("Unable to open file!");

    $prevSave = fread($myfile, filesize("savedFile.json"));

    fwrite($prevfile, $prevSave);

    fclose($myfile);

    fclose($prevfile);

    $myfile = fopen("savedFile.json", "w") or die("Unable to open file!");

    fwrite($myfile, $json);
}
