<?
// redirect to https
require_once("../util/check_for_correct_port.php");
// loads application constants
require_once("includes/config.php");
// class for error handling
require_once("includes/error_class.php");
// database class
require_once("../util/classes/oracle_class.php");
// php functions
require_once("includes/functions.php");
// database functions
require_once("includes/db_functions.php");
// transaction functions
require_once("includes/xtn_functions.php");
// socket class for connection to gen2 switch
require_once("../util/socket_gen2.php");
// for browser logging
require_once("../util/classes/phpSniff.class.php");
//payment info
require_once("../util/payment_info.php");
$securepath=substr($_SERVER['DOCUMENT_ROOT'],0,strpos($_SERVER['DOCUMENT_ROOT'],"htdocs",0))."secure";
require($securepath."/config.inc");
require($securepath."/system.inc");
require("config.php");

start_session();
require("includes/get_session_vars.php");

// session timeout check.. list of pages that are ok to have an empty session
$new_session_actions = array("error", "custlkup", "login", "process_login", "maginfo", "vehiclelkup", "pdf", "dmx");

// if coming from web_pos left frame and there are no web_pos vars or if session is empty, give session timeout
if((!count($_SESSION) && !in_array($_GET['action'], $new_session_actions)) || (intval($_GET['webpos']) && !count($web_pos)))
{
    session_unset();
    session_destroy();
    new Error("", "Session Timed Out Due to " . intval(ini_get('session.gc_maxlifetime'))/60 . " Minutes of Inactivity", "timeout", $viewnow);
}

// reset web pos session var if not coming from web pos links
if(($_GET['action'] == "vehiclelkup" || $_GET['action'] == "custlkup") && intval($_GET['webpos']) != 1)
{
    unset($web_pos);
}

// initialize session for web pos, license
$init_session_actions = array("custlkup", "vehiclelkup", "process_login", "maginfo");

if(in_array($_GET['action'], $init_session_actions))
{
    // save any variables already set
  $tmp_web_pos   = $web_pos;
	$tmp_user_id   = $user_id;
	$tmp_user_ln   = $user_ln;
	$tmp_user_fn   = $user_fn;

	if(isset($viewnow))
	{
	    $tmp_viewnow = $viewnow;
	}
	else
	{
	    $tmp_viewnow = 0;
	}

	// save app array as well if web pos
	if(count($web_pos))
	{
	   // reset license year set flag... this forces the choice of a license year for each sale in dual license year scenario
	   $app['license_year_set'] = 0;
	   $tmp_app = $app;
	}

	session_unset();
	session_destroy();
	start_session();

    // restore saved variables
	$web_pos           = $tmp_web_pos;
	$user_id           = $tmp_user_id;
	$user_ln           = $tmp_user_ln;
	$user_fn           = $tmp_user_fn;
	$viewnow		   = $tmp_viewnow;

	// include file to register all our session vars since we have started a new session
    require("includes/save_session_vars.php");
    require("includes/get_session_vars.php");

	print_debug("<b>session reset</b>");

	// restore the saved app array for web pos
	if(count($web_pos) && $_GET['action'] != "login")
	{
	   $app = $tmp_app;
	}

	// phone sales login info... these are session vars
    if ((strlen(trim($user_id)) == 0) || (strlen(trim($user_ln)) == 0) || (strlen(trim($user_fn)) == 0))
    {
    	if ($_POST['txtUserID'] != "")
    	    $user_id= $_POST['txtUserID'] ;
    	else
    		$user_id = "";

    	if ($_POST['txtLastName'] != "")
    	    $user_ln = $_POST['txtLastName'] ;
    	else
    		$user_ln = "";

    	if ($_POST['txtFirstName'] != "")
    	    $user_fn = $_POST['txtFirstName'];
    	else
    		$user_fn = "";
    }

    // determine site type
    if (!no_value($user_fn) && !no_value($user_ln) && !no_value($user_id))
    {
        if($_GET['action'] == 'vehiclelkup')
            $app['site_type'] = "VPH";
        else
            $app['site_type'] = "PH";
    }
    else if(!count($web_pos))
    {
        if($_GET['action'] == 'vehiclelkup')
            $app['site_type'] = "VINT";
        else
            $app['site_type'] = "INT";
    }
    else
    {
        ; // web_pos... site type already set.
    }
}

// phone sales check
if (($_SERVER["SERVER_PORT"] == 8082) && !strlen(trim($user_id)) && $_GET['action'] != "error")
{
    session_unset();
    session_destroy();
    new Error("", "Phone Sales Error. Please re-login by clicking on the " . PROJECT_ID . " License Sales Link!", "phone_sales", $app['debug']);
}

// page alignment
if($app['site_type'] == "INT" || $app['site_type'] == "VINT")
{
    $page_width = "750";
    $page_align = "center";
    $margin     = 2;
}
else
{
    $page_width = "600";
    $page_align = "left";
    $margin     = 8;
}

// prints out debugging information from the current session
$omit_debug_actions = array("frameset", "top", "left", "email", "dmx");
if($_SESSION['viewnow'] == 1 && !in_array($_GET['action'], $omit_debug_actions))
{
	?>
	<style>.debug{font-family: Verdana; font-size: 10px; color: #990000;}</style>
    <table width="100%"  border="1" cellpadding="1" cellspacing="1" bordercolor="#8C0000" bgcolor="#FFE8E8">
      <tr>
        <td align="right"><a class="debug" href="javascript: document.all.debug.style.display=''; void(0);"><b>View Debugging</b></a></td>
      </tr>
      <tr>
        <td>
        <table width="100%" border="0" cellspacing="1" cellpadding="1" id='debug' bordercolor="#8C0000" style="display:none;">
            <tr>
                <td colspan="2" align="right"><a class="debug" href="javascript: document.all.debug.style.display='none'; void(0);"><b>Hide Debugging</a></td>
            </tr>
            <tr>
                <td valign="top">
                    <? print_array($cust, "cust", $viewnow);?>
                </td>
                <td valign="top">
                <? print_debug("<b>CONSTANTS</b>"); ?>
                <? print_debug("TEST = " . TEST); ?>
                <? print_debug("PROJECT_ID = " . PROJECT_ID); ?>
                <? print_debug("STATE_CODE = " . STATE_CODE); ?>
                <? print_debug("DB = " . DB); ?>
                <? //print_debug("DB_USER = " . DB_USER); ?>
                <? //print_debug("DB_PWD = " . DB_PWD); ?>
                <? print_debug("TARGET = " . TARGET); ?>
                <? print_debug("PORT = " . PORT); ?>
                <?
                    print_array($_POST, "POST", $viewnow);
                    print_array($_GET, "GET", $viewnow);
                    print_array($app, "app", $viewnow);
                    print_array($web_pos, "web_pos", $viewnow);
                    print_array($report, "report", $viewnow);
                    print_array($cust_basket, "cust_basket", $viewnow);
                    print_array($currently_onfile, "currently_onfile", $viewnow);
                    print_array($new_privilege, "new_privilege", $viewnow);
                 ?>
                </td>
            </tr>
        </table>
       </td>
     </tr>
    </table>
	<?
}
?>
