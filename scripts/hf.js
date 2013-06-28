function do_cancel()
{
    if(!document.frm.site_type)
    {
        alert("no site type defined");
        return;
    }

  if(confirm("Are you sure that you want to cancel this transaction\nand lose all your current information?\n\nPress [OK] for Yes\n\nPress [Cancel] for No."))
	{
	    switch(document.frm.site_type.value)
	    {
	        case "VPH":
	            next_page("vehicle.php?action=vehiclelkup");
	            break;
	        case "PH":
    			next_page("license.php?action=custlkup&cancel=1");
    			break;
    	    case "INT":
    	    case "VINT":
    			next_page("index.php");
    			break;
    	    case "WPOS":
    	        next_page('webpos.php?action=main&webpos=1');
    	        break;
	    }
	}
}

function next_page(url)
{
	window.location = url;
}

function OpenEmail_ChangeAddr(tmp)
{
    var user = "";
    if (tmp != '' && tmp != '%20')
        user = tmp;

    window.open("./views/change_addr.phtml","Change_Address",
        "left=0,top=0,toolbar=no,location=no,directories=no,menubar=no,scrollbars=no,status=no,resizable=yes,copyhistory=no,width=640,height=480");
}

function OpenEmail(tmp)
{
    var user = "";
    if (tmp != '' && tmp != '%20')
        user = tmp;

    window.open("mailer.php?project_code=IL&uid=" + user,"mailer",
        "left=0,top=0,toolbar=no,location=no,directories=no,menubar=no,scrollbars=no,status=no,resizable=yes,copyhistory=no,width=640,height=480");
}

// checks the presence of input on radio buttons, select boxes, and text boxes
function no_input(element)
{

    // select box
    if(element.type && element.type == "select-one")
    {
        if(element.selectedIndex == 0)
        {
            return true;
        }
    }
    // text box
    else if(element.type && element.type == "text")
    {
        if(element.value.length == 0)
        {
            return true;
        }
    }
    // radio
    else if(element.length)
    {
        // radio
        if(element[0] && element[0].type == "radio")
        {
            for(var i = 0; i < element.length; i++)
            {
                if(element[i].checked)
                {
                    return false;
                }
            }

            return true;
        }
        else
        {
            alert(element.name + " multiple type unknown");
        }
    }
    else
    {
        alert(element.name + " type unknown");
    }
}

function isValidEmail(sEmail)
{
	var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return filter.test(sEmail);
}

function enable_links()
{
    // enable left frame links, only if left frame is loaded
    try
    {
        window.parent.left.buttons_disabled = false;
        window.parent.left.toggle_buttons();
    }
    catch(e)
    {
        ;
    }
}
