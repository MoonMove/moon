function start_session()
{
    session_name(PROJECT_ID . "_SESSION");
    session_start();
}

function get_totals($app, $cust, $cust_basket)
{
    // totals with and without fedex, displaying fedex option
    $cust['subtotal']       = 0;
    $cust['subtotal_fedex'] = 0;
    $cust['total']          = 0;
    $cust['total_fedex']    = 0;
    $cust['agent_fee']      = 0;
    $cust['conv_fee']       = 0;
    $cust['conv_fee_fedex'] = 0;
    $cust['fedex_display']  = "none";

    // quantity
    if(no_value($cust_basket[$i]['qty']))
        $qty = 1;
    else
        $qty = $cust_basket[$i]['qty'];

    for($i = 0; $i < count($cust_basket); $i++)
    {
        $cust['subtotal']       += ($qty * $cust_basket[$i]['amount']);
        $cust['agent_fee']      += ($cust_basket[$i]['agent_fee']);
    }

    $cust['subtotal_fedex'] = $cust['subtotal'] + floatval($app['fedex_amount']);

    // only add conv fee for phone or internet sales
    $site_types = array('INT', 'VINT', 'PH', 'VPH');
    if($cust['subtotal'] == 0) {
       $cust['conv_fee'] = 0;
    }
    elseif(in_array($app['site_type'], $site_types))
    {
        $cust['conv_fee']       = round((($cust['subtotal'] + $app['internet_conv_fee']) * ($app['conv_percent']/100) + $app['internet_conv_fee']), 2);
        $cust['conv_fee_fedex'] = round((($cust['subtotal_fedex'] + $app['internet_conv_fee']) * ($app['conv_percent']/100) + $app['internet_conv_fee']), 2);
    }

    $cust['total']          = $cust['subtotal'] + $cust['agent_fee'] + $cust['conv_fee'];
    $cust['total_fedex']    = $cust['subtotal_fedex'] + $cust['conv_fee_fedex'];

    // apply formatting
    $cust['conv_fee']       = number_format($cust['conv_fee'], 2, ".", "");
    $cust['agent_fee']      = number_format($cust['agent_fee'], 2, ".", "");
    $cust['conv_fee_fedex'] = number_format($cust['conv_fee_fedex'], 2, ".", "");
    $cust['subtotal']       = number_format($cust['subtotal'], 2, ".", "");
    $cust['subtotal_fedex'] = number_format($cust['subtotal_fedex'], 2, ".", "");
    $cust['total']          = number_format($cust['total'], 2, ".", "");
    $cust['total_fedex']    = number_format($cust['total_fedex'], 2, ".", "");

    print_debug("subtotal = {$cust['subtotal']}<br>subtotal_fedex = {$cust['subtotal_fedex']}<br>conv_fee = {$cust['conv_fee']}<br>conv_fee_fedex = {$cust['conv_fee_fedex']}" .
    "<br>agent_fee = {$cust['agent_fee']}<br>total = {$cust['total']}<br>total_fedex = {$cust['total_fedex']}");

    return $cust;
}

// writes transaction requests/responses to log file director on webserves
function log_msg($project, $m)
{
    // for transaction message logging
    define("LOG_HEADER", $_SERVER['REMOTE_ADDR'] . " " . session_id() . " " . $_SERVER['PHP_SELF']);

    $project = strtolower($project);

    //$dest = "/http_log/prod/php/$project/" . date("Ymd") . ".log";
    $logpath=substr($_SERVER['DOCUMENT_ROOT'],0,strpos($_SERVER['DOCUMENT_ROOT'],"htdocs",0))."logs";
    $message = "\n" . date("[Y/m/d H:i:s]") . " " . microtime() . " " . LOG_HEADER . " " . $m . "\n";
    error_log($message, 3, $logpath."/log/" . date("Ymd") . ".log");
    print_debug("<textarea cols='100' rows='9'>$message</textarea>");
}

// prints a drop down from an associative array with the value as the array key and the option as the array value
function selectbox_pair($options, $selected)
{
    if(is_array($options))
    {
        foreach($options as $value => $option)
        {
            $select = ($selected == $value) ? " selected" : "";
            echo "<option value='$value'$select>$option</option>\n";
        }
        return;
    }
    else
        return;
}
