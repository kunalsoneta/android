
// Erro Msg And Code

    	var error103 = "Please enter valid email address.";
    	var error104 = "Email already exist.";
    	var error105 = "Mobile no already exist.";
    	var error106 = "Please Enter Name";
    	var error107 = "Please Enter Password";
    	var error108 = "Please Enter Area";
    	var error109 = "Please Enter Mobile No";
    	var error110 = "Invalid User Or Password";
    	var error112 = "Enter Valid Email Id";
    	var error111 = "Enter Valid Password";
    	var error113 = "Please check your internet connection";
    	var error114 = "Please enter landmark";
    	var error115 = "password not match";
        var error116 = "Email Id not registred";
        var error117 = "invalid enter code";
        var error118 = "Please Enter Email Id";
        var error119 = "Please Enter Valid Coupon Code";

   		var urlis = "http://testweb4you.com/projects/tonyandmark/mobile_app/marketweb/webservice.php?";
   		//var urlis = "http://testweb4you.com/projects/tonyandmark/mobile_app/marketweb/demo.php?";
//_________________________________________________________________________________________________________

	// Check User Login
    	//_________________________________________________________________________________________________________

    		$('#userlogin').click(function(){

				localStorage.setItem('userloginemailid',"");
    			localStorage.setItem('userloginpassword',"");
    			var emailid = 	localStorage.getItem('userloginemailid');
    			var pwdis =	localStorage.getItem('userloginpassword');
    			var txtloginemail = $("#txtloginemail").val();
    			var txtloginpwd = $("#txtloginpwd").val();

    	    	if ( txtloginemail == "" && txtloginpwd == "")
    			{
    				 errormsg('txtloginemail',error112)
                     errormsg('txtloginpwd',error111)
    				return false;
    			}

				if (emailid == "" && pwdis.trim() == "")
    			{
    				LoginUser(txtloginemail.trim(),txtloginpwd.trim());
    			}

				else
    			{
    				window.location = "home.html";
    			}
				return false;
    	});

				function LoginUser(emaildis,passwordis)
        		{

        				$.ajax({
        				type       : "POST",
        				url        : urlis+"action=GetUser&email="+emaildis+"&pwd="+passwordis+"&format=json",
        				crossDomain: true,
        			    //beforeSend : function() {$.mobile.loading('show')},
        			   // complete   : function() {$.mobile.loading('hide')},
        				data: '{}',
        				dataType   : 'json',
        				beforeSend: function(){
                    	//	startloader();
                		},
        				complete: function(){
                   			//		stoploader();

               			},
        				success    : function(response) {

        					if(JSON.stringify(response) != '""')
        					{

        						var t = JSON.parse(JSON.stringify(response))

        							localStorage.setItem('userloginemailid',t.email.trim());
        							localStorage.setItem('userloginpassword',t.password.trim());
        						//	localStorage.setItem('useridfnp',t.customer_id.trim());
        						//	localStorage.setItem('mobileno',t.mobile_no.trim());
        								window.location  = "home.html";
        					}
        					else
        						{
        							//	errormsg('txtloginemail',error112)
        						  errormsg('txtloginpwd',error111)
        						}

        					},
        					error:function() {
        					alert("error");
        					//console.error("error");
        					errormsg('txtpincode',error113)
        				}
        			});
        		}


    var grand_total = 0;
    var new_price = 0;
    var oldcart = true;
	var totalbasket = 0;
	var totalqty = 0;
	var jsonObj = [];
	var cartitem = 0;
	var qty = 0;
function GetStoreId() {

	var selectBox = document.getElementById("store");
	var storeid = selectBox.options[selectBox.selectedIndex].value;
	$("#store option[value='0']").attr('disabled','disabled');
	console.log(storeid);
	//var dataString="Store_id="+selectedValue;
	$.ajax({
		type       : "POST",
		url        : urlis+"action=GetStoreId&store_id="+storeid+"",
		crossDomain: true,
		data: {},
		dataType   : 'json',
		success    : function(response) {

			console.log(response);
			$('#DisplayProduct').html("");
			$.each(response, function (i, v) {

				img1 = new Image();
				img1.src = "http://testweb4you.com/projects/tonyandmark/uploads/product_image/" + v.product_id + ".jpg";
				htmlis = '<div class="pro_box"><div class="tp_box cf"><div class="tp_l"><img src="' + img1.src + '" alt="" /></div><div class="tp_r"><h1>' + v.name + '</h1><p>1 * ' + v.unit + ': $' + v.price + ' (serves on a 12 inch round platter)</p></div></div><div class="pr_ad cf"><div class="pr_ad_l"><div class="wan-spinner wan-spinner-2"><a href="#" class="minus" onClick="javascript:minusproduct('+ v.product_id +')"></a><div class="qty"><p id="'+ v.product_id +'">'+ totalqty +' </p></div><a href="#" class="plus" onClick="javascript:addproduct('+ v.product_id +')"></a></div></div><div class="textbox_price"><input type="text" id="txt_price'+ v.product_id +'" onblur="GrandTotal('+ v.product_id +')" value="0"></div><div class="pr_ad_r"><h2 id="gtotal'+ v.product_id +'">$ '+grand_total+' </h2></div></div></div>';


				$('#DisplayProduct').append(htmlis);
			})
		},
		error:function(response) {
			alert(response);
		}
	});
}
function GetProduct() {

		var urlis = "http://testweb4you.com/projects/tonyandmark/mobile_app/marketweb/webservice.php?";
		$.ajax({
		type       : "POST",
		url        : urlis+"action=GetProduct",
		crossDomain: true,
		data: '{}',
		dataType   : 'html',
		success    : function(response) {

            $("#store").html(response);

		},
		error:function(response) {
			alert("error");
			//console.error("error");
		}
	});
}

function  minusproduct(qtyid){

	var qtyis = $('#'+ qtyid+'').html();
	if (qtyis > 0)
	{
		$('#'+ qtyid+'').html(parseInt(qtyis) - 1)
		var qtytotal = parseInt(qtyis) - 1;
		new_price = parseInt($('#txt_price'+qtyid+'').val());
		grand_total = qtytotal * new_price ;
		$('#gtotal'+qtyid+'').html('$ '+grand_total);
		addcart('m',qtyid);
	}

}
function  addproduct(qtyid){

	var qtyis = $('#'+ qtyid+'').html();
	$('#'+ qtyid+'').html(parseInt(qtyis) + 1);
	var qtytotal = parseInt(qtyis) + 1;
	new_price = parseInt($('#txt_price'+qtyid+'').val());
	grand_total = qtytotal * new_price ;
	$('#gtotal'+qtyid+'').html('$ '+grand_total);
	addcart('a',qtyid);
}

 function  addcart(type,proid){
			var totalqty = $('.cartvalue').html();


			if (type == 'm')
			{

				$('.cartvalue').html(parseInt(totalqty) - 1);
				var stringis = String( localStorage.getItem('addtocartlistlocal'));
				var finalDatais = JSON.parse(stringis);
				if(JSON.stringify(finalDatais) != '""')
					{
					   console.log(JSON.stringify(finalDatais));
					   $.each(finalDatais, function(i,v) {

						  if(v.productid == proid) {

							  finalDatais.splice(i, 1);
							  localStorage.setItem('addtocartlistlocal',JSON.stringify(finalDatais))
							  return false;
						  }
					   });
					    console.log(JSON.stringify(finalDatais));

				}
			}
			else
			{
				$('.cartvalue').html(parseInt(totalqty) + 1);
				var quo = "";
			item = {}
        	item ["productid"] = quo + proid + quo;
	        jsonObj.push(item);
			var datacart = localStorage.getItem('addtocartlistlocal');
			var string = String(datacart);
				if (string.length > 0)
				{
				var finalData = string.replace("\\", "");

				finalData = JSON.parse(finalData);
					if (oldcart == true)
					{
					$.each(finalData, function(i, v) {
					var txt_price = parseInt($('#txt_price'+v.productid+'').val());
					item = {}
				    item ["productid"] = quo + v.productid + quo;
					console.log(item.value);
						 jsonObj.push(item);
						 oldcart = false;
					});
					}
					}
					else
					{
						 oldcart = false;
					}

			jsonString = JSON.stringify(jsonObj);
			localStorage.setItem('addtocartlistlocal',jsonString);
			}


			//alert(joldstring);

		 }



function callcart()
{

 $('.cartvalue').html("0");
$.ajax({
				type       : "POST",
				url        : urlis+"action=GetProduct2&format=json",
				crossDomain: true,
			    //beforeSend : function() {$.mobile.loading('show')},
			   // complete   : function() {$.mobile.loading('hide')},
				data: '{}',
				dataType   : 'json',
				success    : function(response) {
					if(JSON.stringify(response) != '""')
					{
					alert(response);
						var t = JSON.parse(JSON.stringify(response))
						var getlastaddtocart =  localStorage.getItem('addtocartlistlocal');
                        alert(getlastaddtocart);
						$.each(response, function(i, v) {

		if (getlastaddtocart != "" && getlastaddtocart != null )
		{

		checkproduct(getlastaddtocart, v.product_id);
		}
    });
					}
					else
					{
					alert("else"+response);

					}

					},
				error:function() {
					//console.error("error");
					alert("error");

				}

			});

}



// Get each Product Qty
		 	function checkproduct(data,productid)
			{
			alert("checkproduct");

				var qtyis =0;

				var string = String(data);
				if (string.length > 0)
				{
				var finalData = string.replace("\\", "");

				finalData = JSON.parse(finalData);

				if(JSON.stringify(finalData) != '""')
					{

						$.each(finalData, function(i, v) {


							if(v.productid == productid){

								 qtyis = qtyis+1;
								 console.log(v.productid + "========" + productid);
								 console.log(qtyis + "<====");


							}
					    });
						totalbasket = qtyis;
						if (qtyis > 0)
						{

						var totalqtyiscart = $('.cartvalue').html();
						 $('#'+ productid+'').html(totalbasket);
						 $('.cartvalue').html(parseInt(totalqtyiscart) + qtyis);
						}
						else
						{
						 $('#'+ productid+'').html("0");
						}

					}
				}

			}


function GrandTotal(qtyid){
	var qtytotal = 0;
	var qtyis = $('#'+ qtyid+'').html();

	var txt_price = parseInt($('#txt_price'+qtyid+'').val());

		if(txt_price >= 0) {
			new_price = txt_price;
			if (qtyis > 0) {
				var qtytotal = parseInt(qtyis);

			}
			grand_total = qtytotal * txt_price;
			$('#gtotal' + qtyid + '').html('$ '+grand_total);
		}
	else {
			alert("Please Enter Proper Price");
			grand_total = 0;
			$('#txt_price'+qtyid+'').html(grand_total);
			$('#gtotal' + qtyid + '').html('$ '+grand_total);
		}

}


function  TextBoxClear(qtyid) {

	var txt_price = parseInt($('#txt_price'+qtyid+'').val());
	txt_price = "";
	$('#txt_price' + qtyid + '').html(txt_price);

}

