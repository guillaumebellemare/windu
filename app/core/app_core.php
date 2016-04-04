<?php

/*
|--------------------------------------------------------------------------
| Initialization
|--------------------------------------------------------------------------
|
| This is where the initialization is made
|
*/
define("COMPLETE_FOLDER", dirname(__FILE__));
define("COMPLETE_URL_ROOT", $_SERVER['DOCUMENT_ROOT'].URL_ROOT);
define("PUBLIC_FOLDER", "public/");
define("WBR_FOLDER", "images/wbr/uploads/");

/*
|--------------------------------------------------------------------------
| Database connection
|--------------------------------------------------------------------------
|
| This is where the connection is made to the database.
| The language files is included as well.
|
*/
require_once("app/core/app_connect.php");


/*
|--------------------------------------------------------------------------
| Application Languages
|--------------------------------------------------------------------------
|
| Here is where the languages are set.
| fr/fre is default
|
*/
require_once("app/helpers/lang.class.php");
$lang = new Lang($possible_languages);
$lang2 = $lang->lang2;
$lang3 = $lang->lang3;
$lang2_trans = $lang->lang2_trans;

require_once("app/helpers/sluggedrecord.class.php");


/*
|--------------------------------------------------------------------------
| Error handlers
|--------------------------------------------------------------------------
|
| This is where the errors handlers are declared
|
*/
$app_messages = array();
$app_errors = array();

$messages = array();
$errors = array();


/*
|--------------------------------------------------------------------------
| Template Inheritance
|--------------------------------------------------------------------------
|
| Here is where the templates inheritance is declared.
|
*/
require_once("app/helpers/ti/ti.php");


/*
|--------------------------------------------------------------------------
| Custom methods
|--------------------------------------------------------------------------
|
| Here is where the custom methods are declared.
|
*/
require_once("app/core/app_controller.php");
if(@require_once("app/helpers/translate.class.php"));
if(@require_once(COMPLETE_URL_ROOT . 'app/helpers/meta.class.php'));

/*
|--------------------------------------------------------------------------
| Model classes
|--------------------------------------------------------------------------
|
| Here is where all the models classes are called.
|
*/
foreach (glob("app/models/*.php") as $filename)
{
	require_once($filename);
}
$user = new User();
$app_controller = new AppController();
require_once("app/helpers/custom_methods/index.php");

/*
|--------------------------------------------------------------------------
| Languages
|--------------------------------------------------------------------------
|
| Here is where the langugages files are instantiated.
|
*/
foreach (glob("public/lang/".$lang2."/*.php") as $filename)
{
    require_once($filename);
}

require_once("app/core/app_routes.php");
if(SHOPPING_CART) require_once("app/helpers/cart/cart_core.php");

/*
|--------------------------------------------------------------------------
| Debugging
|--------------------------------------------------------------------------
|
| Debugging options.
|
|
*/
 

if(DEBUG==true)
{
	if(CHECK_MOD_REWRITE)
	{
		if(function_exists('apache_get_modules'))
		{
			$modules = apache_get_modules();
			$mod_rewrite = in_array('mod_rewrite', $modules);
		}else{
			$mod_rewrite =  getenv('HTTP_MOD_REWRITE')=='On' ? true : false ;
		}
		
		if ($mod_rewrite)
		{
			$app_messages[] = '<strong>Mod_rewrite est activé</strong><hr class="app-hr">';
		}else{
			$app_messages[] = '<strong>Mod_rewrite est désactivé</strong><hr class="app-hr">';
		}
	}
	
	if($_SERVER['REMOTE_ADDR']===IP_ADDRESS)
	{
		$app_messages[] = '<strong>IP address: </strong>'.$_SERVER['REMOTE_ADDR'].'<br>';
		$debug_on = true;
	}
	
}

if(SHOPPING_CART && (CANADA_POST_SANDBOX_MODE || PAYPAL_SANDBOX_MODE))
{
	$app_floating_messages[] = 'Vous &ecirc;tes en <strong>mode sandbox</strong>';
	if(CANADA_POST_SANDBOX_MODE) $app_floating_messages[] = ' pour <strong>Poste Canada</strong>';
	if(CANADA_POST_SANDBOX_MODE && PAYPAL_SANDBOX_MODE) $app_floating_messages[] = ' et';
	if(PAYPAL_SANDBOX_MODE) $app_floating_messages[] = ' pour <strong>PayPal</strong>';
}
require_once("app/core/app_handler.php");
