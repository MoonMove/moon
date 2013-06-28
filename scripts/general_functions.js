var isNN = (navigator.appName.indexOf("Netscape")!=-1);
if(document.layers)                                    
{                                                      
    document.captureEvents(Event.KEYPRESS)             
}

// Added to stop events from propagating through the DOM
function stopEvent(e) {
    if (!e) e = window.event;
    if (e.stopPropagation) {
        e.stopPropagation();
    } else {
        e.cancelBubble = true;
    }
}

// Added to cancel an event that is in progress
function cancelEvent(e) {
    if (!e) e = window.event;
    if (e.preventDefault) {
        e.preventDefault();
    } else {
        e.returnValue = false;
    }
}

// -- begin version check
function msieversion()
// return Microsoft Internet Explorer (major)
// version number, or 0 for others.
// This function works by finding the "MSIE "
// string and extracting the version number
// following the space, up to the decimal point
// for the minor version, which is ignored.
{
var ua = window.navigator.userAgent
var msie = ua.indexOf ( "MSIE " )
if ( msie > 0 )      // is Microsoft Internet Explorer; return version number
   return parseInt ( ua.substring ( msie+5, ua.indexOf ( ".", msie ) ) )
else
   return 0          // is other browser
}


// -- end version check
function containsElement(arr, ele)     
{                                      
    var found = false, index = 0;      
    while(!found && index < arr.length)
    if (arr[index] == ele)             
        found = true;                  
    else                               
        index++;                       
    return found;                      
} 

function autotab(obj,e, nextobj)
{   var len = obj.maxLength;                          
  var keyCode = (isNN) ? e.which : e.keyCode;                       
	var filter = (isNN) ? [0,8,9] : [0,8,9,16,17,18,37,38,39,40,46];  
	
	if (obj.value == "mm" || obj.value == "dd" || obj.value == "yyyy") return;
	
	if (obj.value.length >= len && !containsElement(filter,keyCode))
	{                                                                 
	    obj.value = obj.value.slice(0, len);                      
	    nextobj.focus(); 
	    if (nextobj.type == "text") nextobj.select();
	}                
}

//validate keys pressed SYOKLEY
function KeyValidate(obj,e,Type)
{
var Nav4 = document.layers; //Netscape 4.0 and Newer
var IE4 = document.all;		//Microsoft IE4.0 and Newer

	//type a or 1: alpha, n or 0: numbersonly
	//alert("Nav4=" + Nav4);
	//alert("IE=" + IE4);
                                               
        if (IE4)                                
            key = window.event.keyCode;         
        else if (Nav4)                          
            key = e.which; 
        else                         
			key = e.which; 
			
    // return key pressed don't check key	
	if (key == 13 || key == 0) 
	   return true;
                                                
        keyPressed = String.fromCharCode(key);                                            
	if (Type == "n" || Type == "0")		
	{   var nums = "01234567890.,-()"
            
	    if (nums.indexOf(keyPressed) == -1)	
	    {   alert("Numeric Characters Only!");
	        if (IE4)
 		    	window.event.keyCode = 0;
			else if (Nav4)
		    	e.which = 0;
		    	
			cancelEvent(e);
	        SelectTextBox(obj);
	        return false;
	    }    
	}
	if (Type == "a" || Type == "1")		
	{	var chrs = "abcdefghijklmnopqrstuvwxyz,.ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	    if (chrs.indexOf(keyPressed) == -1)	
	    {   alert("Alpha Characters Only!");
	        if (IE4)
    		    window.event.keyCode = 0;
			else if (Nav4)
		    	e.which = 0;	    
		    	
			cancelEvent(e);
	        SelectTextBox(obj);
	        return false;
	    }    
	}
	
	if (Type == "onlyNum" || Type == "2")		
	{   var nums = "01234567890"
            
	    if (nums.indexOf(keyPressed) == -1)	
	    {   alert("Numeric Characters Only!");
	        if (IE4)
 		    	window.event.keyCode = 0;
			else if (Nav4)
		    	e.which = 0;
		    	
			cancelEvent(e);
	        SelectTextBox(obj);
	        return false;
	    }    
	}
		     
	return true;
}  

function OpenWin(url)                                                          
{       
		height =  screen.height * .90;
		width =  screen.width * .90;
        window.open(url,"_blank","left=0,top=0,width=" + width + ",height=" + height + ",toolbar=no,resizable=yes,scrollbars=yes");
} 

function OpenSizedWin(url,width,height)                                                          
{         window.open(url,"_blank","left=0,top=0,width=" + width + ",height=" + height + ",toolbar=no,resizable=yes,scrollbars=yes");                                                              
}

function OpenEmail(tmp,project_code)                                                            
{   var user = "";
    if (tmp != '' && tmp != '%20') user = tmp;
                                                                                 
    window.open("../util/mailer.php?project_code=" + project_code + "&uid=" + user,"mailer","left=0,top=0,toolbar=no,location=no,directories=no,menubar=no,scrollbars=no,status=no,resizable=yes,copyhistory=no,width=640,height=480");
} 

function isValidEmail(sEmail)
{
	var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return filter.test(sEmail);
}

//select textbox and select all of the text SYOKLEY
function SelectTextBox(obj)
{       obj.focus();
        if (obj.value.length) obj.select();
}

//********************************************************************
function isEmpty( inputStr ) {

  if ( inputStr == null || inputStr == "" ) {
    return true;
  }
  return false;
}

//********************************************************************
//  function:    isNotEmpty
//  description: General purpose function to see if an input value 
//               has been entered at all
//  input:
//               inputStr
//
// return values:
//               true  - value entered
//               false - no value entered
//********************************************************************
function isNotEmpty( inputStr ) {

  if ( inputStr == null || inputStr == "" ) {
    return false;
  }
  return true;
}

//********************************************************************
//  function:    isPosInteger
//  description: General purpose function to see if a suspected numeric 
//               input is a positive integer
//  input:
//               inputVal
//
// return values:
//               true  - positive integer entered
//               false - positive integer not entered
//********************************************************************
function isPosInteger( inputVal ) {

  inputStr = inputVal.toString();

  for ( var i = 0; i < inputStr.length; i++ ) {
    var oneChar = inputStr.charAt(i);
    if ( oneChar < "0" || oneChar > "9" ) {
      return false;
    }
  }
  return true;
}

//********************************************************************
//  function:    isValidLength
//  description: 
//  input:
//               nFieldNo  index to field being validated 
//               inputVal  form field to validate
//  return:  
//               true  - if value checked is valid 
//               false - if value is not valid
//********************************************************************
function isValidLength( nFieldNo, inputVal ) {

  if ( isEmpty( inputVal.value ) ) {
    if ( nFieldLengthArray[ nFieldNo ] > 0 ) {
      window.alert( strMsgArray[ nFieldNo ] + ", please enter." );
      inputVal.focus();
      inputVal.select();
      return false;
    }
  }
  else {
    var inputStr = inputVal.value.toString();

    if ( inputStr.length < nFieldLengthArray[ nFieldNo  ] ) {
      window.alert( strMsgArray[ nFieldNo  ] + ", please re-enter." );
      inputVal.focus();
      inputVal.select();
      return false;
    }
  }
  return true;
}
