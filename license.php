<?
    //add AMS tokenization
    require_once('../payment/AMS_client_class.php');
    require_once("includes/inc.php");

    switch($_GET['action'])
    {
        case "magazine" :
            require_once("models/magazine.phpm");
            require_once('views/header.phtml');
            require_once("views/magazine.phtml");
            require_once('views/footer.phtml');
            break;
        case "custlkup" :
            require_once("models/custlkup.phpm");
            require_once('views/header.phtml');
            require_once("views/custlkup.phtml");
            require_once('views/footer.phtml');
            break;        
        case "process_custlkup" :
            require_once("models/process_custlkup.phpm");
            break;
        case "custinfo" :
            require_once("models/custinfo.phpm");
            require_once('views/header.phtml');
            require_once("views/custinfo.phtml");
            require_once('views/footer.phtml');
            break;
        case "process_custinfo" :
            require_once("models/process_custinfo.phpm");
            break;
        case "selection" :
            require_once("models/selection.phpm");
            require_once('views/header.phtml');
            require_once("views/selection.phtml");
            require_once('views/footer.phtml');
            break;
        case "deerturkey" :
        	
            require_once("models/deerturkey.phpm");
            require_once('views/header.phtml');
            require_once("views/deerturkey.phtml");
            require_once('views/footer.phtml');
        	
        	
            break;
        case "process_deerturkey" :
            require_once("models/process_deerturkey.phpm");
            break;
        case "email" :
            require_once("models/email.phpm");
            break;
        case "process_selection" :
            require_once("models/process_selection.phpm");
            break;
        case "checkout" :
            require_once("models/checkout.phpm");
            require_once('views/header.phtml');
            require_once("views/checkout.phtml");
            require_once('views/footer.phtml');
            break;
        case "process_checkout" :
            require_once("../util/classes/phpSniff.class.php");
            require_once("models/process_checkout.phpm");
            break;
        case "process_cart" :
            require_once("models/process_cart.phpm");
            break;
        case "confirmation" :
            require_once("models/confirmation.phpm");
            require_once('views/header.phtml');
            require_once("views/confirmation.phtml");
            require_once('views/footer.phtml');
            break;
        case "pdf":
            require_once("models/process_pdf.phpm");
            break;
        case "dmx":
            require_once("models/process_dmx.phpm");
            break;
        case "wait" :
            require_once('views/header.phtml');
            require_once("views/wait.phtml");
            require_once('views/footer.phtml');
            break;
        case "error" :
            require_once("models/error.phpm");
            require_once('views/header.phtml');
            require_once("views/error.phtml");
            require_once('views/footer.phtml');
            break;
        default :
            new Error("", "Unknown action for license sale controller", "", $viewnow);
            break;
}
?>
