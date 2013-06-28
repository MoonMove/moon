function limitation_onuncheck(this_priv)
{
    //  uncheck priv
    toggle_priv(this_priv, false);

    for(i = 0; i < this_priv.display_limit_privs.length; i++)
    {
        //remove code from list
        code = this_priv.display_limit_privs.pop();

        //locate code in priv array and determine if need to uncheck
        for(index in priv_array)
        {
            tmp_priv = priv_array[index];
            if(tmp_priv.code == code && tmp_priv.checked == 1)
            {
                //decrement counter
                tmp_priv.display_limit_count--;

                //if counter is zero, check limitations
                if(tmp_priv.display_limit_count == 0)
                {
                    limitation_onuncheck(tmp_priv);
                }
            }
        }
    }
}

function toggle_priv(this_priv, display, site_type)
{
    // init vars
    var tmp_priv;
    
    // create id
    var tmp_priv_id = this_priv.code + this_priv.category;
    
    if(this_priv.category == "-")
    {
        tmp_priv_id += this_priv.onfile_index;
    }
        
    if(display)
    {
        // privilege prompts
        if(this_priv.prompts == 1)
            document.getElementById("prompts_" + tmp_priv_id).style.display = "";
            
        //outfitter prompt
        if(this_priv.outfitter == 1)
            document.getElementById("outfitter_section_" + tmp_priv_id).style.display = "";

        //hunter safety
        if(this_priv.hunter_safety == 1)
            hunter_safety_count++;

        //trapper safety
        if(this_priv.trapper_safety == 1)
            trapper_safety_count++;

        //hip survey
        if(this_priv.hip == 1)
            hip_survey_count++;

        // check this priv
        this_priv.checked = 1;

        // disable other regular privs with same code
        for(tmp_priv in priv_array)
        {
            if(priv_array[tmp_priv].code == this_priv.code && priv_array[tmp_priv].category != this_priv.category && priv_array[tmp_priv].category != "-")
            {
                document.getElementById("chk" + this_priv.code + priv_array[tmp_priv].category).disabled = true;
            }
        }
        

        
        // increment basket count only if max purchase qty is 1
        if(this_priv.max_qty == 1)
            document.frm.basket_count.value++;
            
        // survey question
        if(this_priv.survey == 1)
            eval("category_" + this_priv.category + "_survey_count++;");

        // check box
        document.frm["chk" + tmp_priv_id].checked = true;
        
        // cross sale - only for regular privs
        if(this_priv.cross_sale.length > 0)
        {
            var cross_sale_info = this_priv.cross_sale.split("|");
            var cross_sale_prompt = 1;
            var cross_sale_exists = 0;

  		for (i=0;i<cross_sale_info.length;i++)
			{
				if (i%2 == 1)
				{

	            // check to see if cross_sale priv already checked
		            for(tmp_priv in priv_array)
		            {
		                // only for regular privs
		                if(priv_array[tmp_priv].category != "-")
		                {
		                    // cross sale priv code exists
		                    if(priv_array[tmp_priv].code == cross_sale_info[i-1])
		                    {
		                        cross_sale_exists = 1;
		                        
		                        // if checked, don't prompt
		                        if(document.frm["chk" + priv_array[tmp_priv].code + priv_array[tmp_priv].category].checked == true)
		                        {
		                            cross_sale_prompt = 0;
		                        }
		                    }
		                }
		            }//for(tmp_priv in priv_array)

		            if(cross_sale_exists && cross_sale_prompt)
		            {
		            	if (cross_sale_info[i-1] == "075")
		            	{
			                txt  = "Would you like to donate $5.00 to help create Conservation Foundation?\n\n";
				            txt += cross_sale_info[i] + "\n\n";
			    	        txt += "Press the [Ok] button, if you would like to donate.\n\n";
			        	    txt += "Press the [Cancel] button, if you do not want to donate.";	        	   
		            	}
		            	else
		            	{
			                txt  = "The following privileges are suggested for purchase along with this license....\n\n";
				            txt += cross_sale_info[i] + "\n\n";
			    	        txt += "Click OK below to purchase this privilege.\n\n";
			        	    txt += "Click Cancel if you DO NOT wish to purchase this privilege.";
		        	    }
		        
		            	if(confirm(txt))
			            {
		    	            for(tmp_priv in priv_array)
			    	        {
		    	    	        if(priv_array[tmp_priv].code == cross_sale_info[i-1] && priv_array[tmp_priv].category != '-')
		        	    	    {
		            	    	    var cross_sale_id = priv_array[tmp_priv].code + priv_array[tmp_priv].category;
		                	    	do_priv(cross_sale_id, display, site_type);
		                        }	
			                }
				        }
		
		            }//if(cross_sale_exists && cross_sale_prompt)

		        }//if (i%2 == 1)
	        }//for (i=0;i<cross_sale_info.length;i++)

        }//if(this_priv.cross_sale.length > 0)
    }
    else
    {
        // uncheck box
        document.frm["chk" + tmp_priv_id].checked = false;
        
        // survey question
        if(this_priv.survey == 1)
        {
            eval("category_" + this_priv.category + "_survey_count--;");
        }
        
        if(this_priv.prompts == 1)
            document.getElementById("prompts_" + tmp_priv_id).style.display = "none";

        //hunter safety
        if(this_priv.hunter_safety == 1)
            hunter_safety_count--;

        //trapper safety
        if(this_priv.trapper_safety == 1)
            trapper_safety_count--;

        //hip survey
        if(this_priv.hip == 1)
            hip_survey_count--;

        // uncheck this priv
        this_priv.checked = 0;

        // enable other privs
        for(tmp_priv in priv_array)
        {
            if(priv_array[tmp_priv].code == this_priv.code && priv_array[tmp_priv].category != this_priv.category && priv_array[tmp_priv].category != "-")
                document.getElementById("chk" + this_priv.code + priv_array[tmp_priv].category).disabled = false;
        }
        
        // decrement basket count by 1, if max purchase qty is 1, else decrement by priv.qty_selected
        if(this_priv.max_qty == 1)
            document.frm.basket_count.value--;
        else        
            document.frm.basket_count.value -= this_priv.qty_selected;
    }

    // hunter safety number
    if(hunter_safety_count > 0)
        document.getElementById("show_hunter_safety").style.display = "";
    else
        document.getElementById("show_hunter_safety").style.display = "none";

    // trapper safety number
    if(trapper_safety_count > 0)
        document.getElementById("show_trapper_safety").style.display = "";
    else
        document.getElementById("show_trapper_safety").style.display = "none";
        
    // category survey question
	if(this_priv.category != '-')
	{    
	    if(eval("category_" + this_priv.category + "_survey_count") > 0)
	        document.getElementById("survey_" + this_priv.category).style.display = "";
	    else
	        document.getElementById("survey_" + this_priv.category).style.display = "none";
	}

    // hip
    toggle_hip_display(this_priv.hip, hip_survey_count);
}

function toggle_hip_display(hip_type, display)
{
    if(display > 0)
    {
        if(hip_type == 1)
            document.getElementById("show_hip_intend").style.display = "";
        document.getElementById("show_hip_survey").style.display = "";
    }
    else
    {
        document.getElementById("show_hip_intend").style.display = "none";
        document.getElementById("show_hip_survey").style.display = "none";
    }
}
