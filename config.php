<?php 

/*
|--------------------------------------------------------------------------
| Init
|--------------------------------------------------------------------------
|
| Application initialization
|
|
*/

define("DEBUG", true);
define("CHECK_MOD_REWRITE", false);
define("URL_ROOT", "/lando/");
define("COMPLETE_URL_ROOT", $_SERVER['DOCUMENT_ROOT'].URL_ROOT);
define("WBR_FOLDER", "images/wbr/uploads/");
define("PUBLIC_FOLDER", "public/");
define("PRODUCTION_MODE", 0);
define("IP_ADDRESS", "65.94.72.223");

require_once("app/core/app_core.php");