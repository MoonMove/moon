function toggle_payment(element)
{
    var cc_type         = "none";
    var check           = "none";
    var cc              = "none";
    
    if(element.name == "payment_type")
    {
        // reset check type or cc type selections
        for(var i = 0; i < document.frm.cc_type.length; i++)
        {
            document.frm.cc_type[i].checked = false;    
        }
    }
    
    // credit card
    if(document.frm.payment_type[0].checked)
    {
        check = "";
    }
    if(document.frm.payment_type[1].checked)
    {
        cc_type = "";
    }
    
    // cc type selected
    for(var i = 0; i < document.frm.cc_type.length; i++)
    {
        if(document.frm.cc_type[i].checked)
        {
            cc = "";   
        }    
    }

    
    document.getElementById('cc_type').style.display = cc_type;
    document.getElementById('check').style.display = check;
    document.getElementById('cc').style.display = cc;
}

// returns true or false depending on successful
function do_payment()
{
    var alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var num = "0123456789";
    var cardSelected;
    
    //credit card
    if(document.frm.payment_type[1].checked)
    {
        // card type
        if(no_input(document.frm.cc_type))
        {
            alert("Please choose a Credit Card Type");
            return false;   
        }
        
        //Get Card Type
  	var radioLength = document.frm.cc_type.length;
		for(var i = 0; i < radioLength; i++) {
			if(document.frm.cc_type[i].checked)
			{
				cardSelected = document.frm.cc_type[i].value;
			}
		}
		
		//Fix cardSelected value
		cardSelected = ( cardSelected == 'AX' ) ? 'AMEX' : cardSelected;
        
        //name
        if (no_input(document.frm.cc_name))
        {
           alert("Please enter the Billing Name.");				      
           SelectTextBox(document.frm.cc_name);
           return false;			       
        }
        
        //address1
        if(no_input(document.frm.cc_address_1))
        {
        	alert("Please enter the billing address.");
        	SelectTextBox(document.frm.cc_address_1);
        	return false;
        }
        
        tmp = stripCharsNotInBag(document.frm.cc_address_1.value, alpha + num + ' .-#/');
        if(tmp != document.frm.cc_address_1.value)
        {
        	alert("Please use only letters, numbers, spaces, periods, slashes, dashes, and poundsigns in the address.");
        	SelectTextBox(document.frm.cc_address_1);
        	return false;
        }
        
        //address2
        if(!no_input(document.frm.cc_address_2))
        {
            tmp = stripCharsNotInBag(document.frm.cc_address_2.value, alpha + num + ' .-#/');
            if(tmp != document.frm.cc_address_2.value)
            {
            	alert("Please use only letters, numbers, spaces, periods, slashes, dashes, and poundsigns in the address.");
            	SelectTextBox(document.frm.cc_address_2);
            	return false;
            }
        }
        
        //city
        if(no_input(document.frm.cc_city))
        {
        	alert("Please enter the billing city.");
        	SelectTextBox(document.frm.cc_city);
        	return false;
        }
        
        tmp = stripCharsNotInBag(document.frm.cc_city.value, alpha + ' ');
        if(tmp != document.frm.cc_city.value)
        {
        	alert("Please use only letters and spaces in the city.");
        	SelectTextBox(document.frm.cc_city);
        	return false;
        }
        
        //state
        if(document.frm.cc_state && no_input(document.frm.cc_state))
        {
        	alert("Please select the billing state.");
        	SelectTextBox(document.frm.cc_state);
        	return false;
        }
        
        // country
        if(document.frm.cc_country && no_input(document.frm.cc_country))
        {
        	alert("Please select the billing country.");
        	SelectTextBox(document.frm.cc_country);
        	return false;
        }
        
        //zip
        if(document.frm.cc_zip)
        {
        	document.frm.cc_zip.value = stripCharsNotInBag(document.frm.cc_zip.value, num);
        	if(document.frm.cc_zip.value.length != 5 && document.frm.cc_zip.value.length != 9)
        	{
        		alert("Please enter the billing zip.");
        		SelectTextBox(document.frm.cc_zip);
        		return false;
        	}
        }
        
        //postal code
        if(document.frm.cc_postal)
        {
        	
        	document.frm.cc_postal.value = stripCharsNotInBag(document.frm.cc_postal.value, alpha + num);
        	if(no_input(document.frm.cc_postal))
        	{
        		alert("Please enter the billing postal code.");
        		SelectTextBox(document.frm.cc_postal);
        		return false;
        	}
        }
               
        if(!validateCreditCardNumber(cardSelected, document.frm.card_number, 1)){ return false; }
        
        //expiration month
        if(no_input(document.frm.card_month))
        {
            alert("Please select the expiration month.");
            SelectTextBox(document.frm.card_month);
            return false;
        }
        
        //expiration year
        if(no_input(document.frm.card_year))
        {
            alert("Please select the expiration year.");
            SelectTextBox(document.frm.card_year);
            return false;
        }
        
        // expiration date
        inMonth = document.frm.card_month.options[document.frm.card_month.selectedIndex].value;            
        inYear = document.frm.card_year.options[document.frm.card_year.selectedIndex].value;
        inDate = inYear.toString() + inMonth.toString();
        var dt = document.frm.sysdate.value;
        var sys_dt= dt.substr(0,6); 
        if(parseInt(inDate) < parseInt(sys_dt)) 
        { 
            alert("The expiration date entered has already expired.");
            SelectTextBox(document.frm.card_month);
            return false;
        }
    }        
    //check
    else if(document.frm.payment_type[0].checked)
    {
        //name
        if(no_input(document.frm.check_name))
        {
           alert("Please enter the Billing Name.");				      
           SelectTextBox(document.frm.check_name);
           return false;			       
        }
        
        //address1
        if(no_input(document.frm.check_address_1))
        {
        	alert("Please enter the billing address.");
        	SelectTextBox(document.frm.check_address_1);
        	return false;
        }
        
        tmp = stripCharsNotInBag(document.frm.check_address_1.value, alpha + num + ' .-#');
        if(tmp != document.frm.check_address_1.value)
        {
            alert("Please use only letters, numbers, spaces, periods, dashes, and poundsigns in the address.");        
        	SelectTextBox(document.frm.check_address_1);
        	return false;
        }
        
        //address2
        if(!no_input(document.frm.check_address_2))
        {
            tmp = stripCharsNotInBag(document.frm.check_address_2.value, alpha + num + ' .-#');
            if(tmp != document.frm.check_address_2.value)
            {
            	alert("Please use only letters, numbers, spaces, periods, dashes, and poundsigns in the address.");
            	SelectTextBox(document.frm.check_address_2);
            	return false;
            }
        }
        
        //city
        if(no_input(document.frm.check_city))
        {
        	alert("Please enter the billing city.");
        	SelectTextBox(document.frm.check_city);
        	return false;
        }
        
        tmp = stripCharsNotInBag(document.frm.check_city.value, alpha + ' ');
        if(tmp != document.frm.check_city.value)
        {
        	alert("Please use only letters and spaces in the city.");
        	SelectTextBox(document.frm.check_city);
        	return false;
        }
        
        //state
        if(document.frm.check_state && no_input(document.frm.check_state))
        {
        	alert("Please select the billing state.");
        	SelectTextBox(document.frm.check_state);
        	return false;
        }
        
        //zip
        if(document.frm.check_zip)
        {
        	document.frm.check_zip.value = stripCharsNotInBag(document.frm.check_zip.value, num);
        	if(document.frm.check_zip.value.length != 5 && document.frm.cc_zip.value.length != 9)
        	{
        		alert("Please enter the billing zip.");
        		SelectTextBox(document.frm.check_zip);
        		return false;
        	}
        }

        //phone
        document.frm.check_phone_1.value = stripCharsNotInBag(document.frm.check_phone_1.value, num);
	    document.frm.check_phone_2.value = stripCharsNotInBag(document.frm.check_phone_2.value, num);
	    document.frm.check_phone_3.value = stripCharsNotInBag(document.frm.check_phone_3.value, num);

    	if(document.frm.check_phone_1.value.length != 3)
    	{
    		alert("Please enter your Area Code.");
    		SelectTextBox(document.frm.check_phone_1);
    	    return;
    	}

        if(document.frm.check_phone_2.value.length != 3)
    	{
    	   alert("Please enter your Phone Number prefix.");
    	   SelectTextBox(document.frm.check_phone_2);
    	   return;
    	}

    	if(document.frm.check_phone_3.value.length != 4)
    	{
    	   alert("Please enter the last 4 digit of your Phone Number.");
    	   SelectTextBox(document.frm.check_phone_3);
    	   return;
    	}
    	
        //email
        if(document.frm.check_email.value.length == 0)
    	{
    	   alert("Please enter your email address.");
    	   SelectTextBox(document.frm.check_email);
    	   return;
    	}
        
        if(!isValidEmail(document.frm.check_email.value))
    	{
    	   alert("The email address you entered is not valid.");
    	   SelectTextBox(document.frm.check_email);
    	   return;
    	}
    	
        //dl number/state
        if(document.frm.dl_number.value.length > 0 || !no_input(document.frm.dl_state))
        {
            if(document.frm.dl_number.value.length == 0)
            {
                alert("Please enter the driver's license.");
                SelectTextBox(document.frm.dl_state);
                return false;   
            }
            
            tmp = stripCharsNotInBag(document.frm.dl_number.value, alpha + num);
            if(tmp != document.frm.dl_number.value)
            {
                alert("Only letters and numbers are allowed in the driver's license.");
                SelectTextBox(document.frm.dl_number);
                return false;   
            }
            
            if(no_input(document.frm.dl_state))
            {
                alert("Please select the driver's license state.");
                SelectTextBox(document.frm.dl_state);
                return false;   
            }
        }
        
        //routing number
        if(document.frm.routing_number.value.length == 0)
        {
            alert("Please enter the routing number.");
            SelectTextBox(document.frm.routing_number);
            return false;
        }
        
        tmp = stripCharsNotInBag(document.frm.routing_number.value, num);
        if(tmp != document.frm.routing_number.value)
        {
            alert("Please use only numbers in the routing number.");
            SelectTextBox(document.frm.routing_number);
            return false;
        }
          
        //account number
        if(document.frm.account_number.value.length == 0)
        {
            alert("Please enter the account number.");
            SelectTextBox(document.frm.account_number);
            return false;
        }
        
        tmp = stripCharsNotInBag(document.frm.account_number.value, num);
        if(tmp != document.frm.account_number.value)
        {
            alert("Please use only numbers in the account number.");
            SelectTextBox(document.frm.account_number);
            return false;
        }
        
        //check number
        if(no_input(document.frm.check_number))
        {
            alert("Please enter the check number.");
            document.frm.check_number.select();
            return false;
        }
        
        tmp = stripCharsNotInBag(document.frm.check_number.value, num);
        if(tmp != document.frm.check_number.value)
        {
            alert("Please use only numbers in the check number.");
            SelectTextBox(document.frm.check_number);
            return false;
        }
        
    }
    // neither credit nor check selected
    else
    {
        alert("Please select the payment type.");
        return false;              
    }
    
    return true;
}
