$('form').submit(function(e) {
		e.preventDefault();
		e.stopPropagation();
});

$('body').on('click', 'a.boxclose', function() {
    $(this).parent().parent().hide();
});

// function serverRequest(recordID){
//     $.ajax({
//         url: 'http://dry-bayou-7910.herokuapp.com/renderjson/' + recordID + '?callback=jsoncallback',
//         type: "GET",
//         dataType: 'jsonp',
        
//         timeout: 5000,
//         success: function(data){

//             alert(data.name + " | " + data.growth_conditions)

//         },
//         error: function(){
//             console.log('There was an error loading the data.');
//         }
//     });
// }

function barcodeScanner(){

    var scanner = cordova.require("cordova/plugin/BarcodeScanner");

    scanner.scan(
        function (result) {

            scanResult = result.text;
            //alert(scanResult);

            $.ajax({
                url: "https://api.nutritionix.com/v1_1/item?upc=" + scanResult + "&appId=64ba9eac&appKey=fdb2032513e161995ee9a20b03a33104",
                type: 'GET',
                dataType: 'json',
                success: function(data){
                    //console.log(data);
                        var appendString = '<li><div class="card show"><a class="boxclose">X</a><p class="card-title">' + data.item_name + '</p><p><b>Total Calories:</b> ' + data.nf_calories + '</p><p><b>Total Fat:</b> ' + data.nf_total_fat +  '</p><p><b>Protein:</b> ' + data.nf_protein + 'g' + '</p></div></li>';

                        //$('#populate').prepend(appendString);

                        $('#populate').prepend(
						    $(appendString).hide().fadeIn('slow')
						);
                }
            });
            //serverRequest(scanResult);

        }, 
        function (error) {
            alert("Scanning failed: " + error);
        }
    );
}

/////////////////////////////////////////////////////////////

var appid = "64ba9eac";
var appkey = "fdb2032513e161995ee9a20b03a33104";

function apiRequest(phrase, max, cal_max, allergen_contains_milk, allergen_contains_eggs, allergen_contains_fish, allergen_contains_shellfish, allergen_contains_tree_nuts, allergen_contains_peanuts, allergen_contains_wheat, allergen_contains_soybeans, allergen_contains_gluten){

        var apiURL = 'https://api.nutritionix.com/v1_1/search/' + phrase + '?results=0%3A' + max + '&cal_min=0&cal_max=' + cal_max + '&fields=*&allergen_contains_milk=' + !allergen_contains_milk + '&allergen_contains_eggs=' + !allergen_contains_eggs + '&allergen_contains_fish=' + !allergen_contains_fish + '&allergen_contains_shellfish=' + !allergen_contains_shellfish + '&allergen_contains_tree_nuts=' + !allergen_contains_tree_nuts + '&allergen_contains_peanuts=' + !allergen_contains_peanuts + '&allergen_contains_wheat=' + !allergen_contains_wheat + '&allergen_contains_soybeans=' + !allergen_contains_soybeans + '&allergen_contains_gluten=' + !allergen_contains_gluten + '&appId=64ba9eac&appKey=fdb2032513e161995ee9a20b03a33104';

        console.log(apiURL);

        $.ajax({
            url: apiURL,
            type: 'GET',
            dataType: 'json',
            success: function(data){
				

                $('#populate').html('');                
            	console.log(data);

                for(var i=0;i<10;i++){

                    var appendString = '<li><div class="card show"><a class="boxclose">X</a><p class="card-title">' + data.hits[i].fields.item_name + '</p><p><b>Total Calories:</b> ' + data.hits[i].fields.nf_calories + '</p><p><b>Total Fat:</b> ' + data.hits[i].fields.nf_total_fat +  '</p><p><b>Protein:</b> ' + data.hits[i].fields.nf_protein + 'g' + '</p></div></li>';

                    $('#populate').append(appendString);
                }

            }
        });
    
}

function generateList(){
        
        location.href='#list';

        var timerange = $('#timerange').val()*3;
        var calorieintake = $('#calorieintake').val();

        // console.log(timerange);
        // console.log(calorieintake);

        apiRequest('', timerange, calorieintake, localStorage.getItem("allergen_contains_milk"), localStorage.getItem("allergen_contains_eggs"), localStorage.getItem("allergen_contains_fish"), localStorage.getItem("allergen_contains_shellfish"), localStorage.getItem("allergen_contains_tree_nuts"), localStorage.getItem("allergen_contains_peanuts"), localStorage.getItem("allergen_contains_wheat"), localStorage.getItem("allergen_contains_soybeans"), localStorage.getItem("allergen_contains_gluten"));

}

function register(){


$("#registerbutton").click(function () { 
    var regUsername = $("#regUsername").val();
	localStorage.setItem("regUsername", regUsername);      //******* setItem()
	var regPassword = $("#regPassword").val();
    var confirmPassword = $("#confirmPassword").val();
    if(regPassword != confirmPassword){
		alert("Password does not match!");
	}else{
	localStorage.setItem("regPassword", regPassword);      //******* setItem()
	}
	//allergen_contains_milk
	if( $('#checkbox_1a').is(':checked')){
		localStorage.setItem("allergen_contains_milk","true");
	}
	else{
		localStorage.setItem("allergen_contains_milk","false");
	}
	//allergen_contains_eggs
	if( $('#checkbox_2a').is(':checked')){
		localStorage.setItem("allergen_contains_eggs","true");
	}
	else{
		localStorage.setItem("allergen_contains_eggs","false");
	}
	
	//allergen_contains_fish
	if( $('#checkbox_3a').is(':checked')){
		localStorage.setItem("allergen_contains_fish","true");
	}
	else{
		localStorage.setItem("allergen_contains_fish","false");
	}
	
	//allergen_contains_shellfish
	if( $('#checkbox_4a').is(':checked')){
		localStorage.setItem("allergen_contains_shellfish","true");
	}
	else{
		localStorage.setItem("allergen_contains_shellfish","false");
	}
	
	//allergen_contains_tree_nuts
	if( $('#checkbox_5a').is(':checked')){
		localStorage.setItem("allergen_contains_tree_nuts","true");
	}
	else{
		localStorage.setItem("allergen_contains_tree_nuts","false");
	}
	
	//allergen_contains_peanuts
	if( $('#checkbox_6a').is(':checked')){
		localStorage.setItem("allergen_contains_peanuts","true");
	}
	else{
		localStorage.setItem("allergen_contains_peanuts","false");
	}
	
	//allergen_contains_wheat
	if( $('#checkbox_7a').is(':checked')){
		localStorage.setItem("allergen_contains_wheat","true");
	}
	else{
		localStorage.setItem("allergen_contains_wheat","false");
	}
	
	//allergen_contains_soybeans
	if( $('#checkbox_8a').is(':checked')){
		localStorage.setItem("allergen_contains_soybeans","true");
	}
	else{
		localStorage.setItem("allergen_contains_soybeans","false");
	}
	
	//allergen_contains_gluten
	if( $('#checkbox_9a').is(':checked')){
		localStorage.setItem("allergen_contains_gluten","true");
	}
	else{
		localStorage.setItem("allergen_contains_gluten","false");
	}
	
    
    location.href='#generate';


 //    alert( "username: " + localStorage.getItem("regUsername") +
	// "\nregPassword: " + localStorage.getItem("regPassword") +
	// "\nallergen_contains_milk: " + localStorage.getItem("allergen_contains_milk") + 
	// "\nallergen_contains_eggs: " + localStorage.getItem("allergen_contains_eggs") + 
	// "\nallergen_contains_fish: " + localStorage.getItem("allergen_contains_fish") + 
	// "\nallergen_contains_shellfish: " + localStorage.getItem("allergen_contains_shellfish") + 
	// "\nallergen_contains_tree_nuts: " + localStorage.getItem("allergen_contains_tree_nuts") + 
	// "\nallergen_contains_peanuts: " + localStorage.getItem("allergen_contains_peanuts") + 
	// "\nallergen_contains_wheat: " + localStorage.getItem("allergen_contains_wheat") + 
	// "\nallergen_contains_soybeans: " + localStorage.getItem("allergen_contains_soybeans") + 
	// "\nallergen_contains_gluten: " + localStorage.getItem("allergen_contains_gluten"));  //******* getItem()
    //var value = localStorage[key]; also works
    //var shortkey = value.replace(prefix, "");
	
    });

}





