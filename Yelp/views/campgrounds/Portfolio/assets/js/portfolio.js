//Check off specific todos by clicking
$("ul").on("click", "li", function(){
	
// if($(this).css("color") !== "rgb(128, 128, 128)") //compare it not to gray but to rgb (128, 128, 128)
$(this).toggleClass("completed"); //no need for a . like in the vanilla selector method

});

//Click on X to delete Todo
//How to get the li associated with the span
//span event and the li click event is firing
//click on the span, li, ul, and div, and body with one click
//when adding an event listener it goes through all of them
//event bubbling order which things fire are from most nested to least nested element
//we can tell the event to not bubble to parent events by passing in event handler
$("ul").on("click", "span", function(event){
	//$(this).parent().fadeOut().remove();// fading out doesn't remove it
	//$(this).parent().fadeOut().remove(); //this won't won't work because it will remove it before fading out
	//so we call fadeout first and the pass in a callback to function for once fadeout finishes
	$(this).parent().fadeOut(500, function(){
		$(this).remove(); //this above refers to span, this here refers to the li , not the span
	});

	 //this will give us the parent element as a jQuery element
	event.stopPropagation();
})


$("input[type='text']").keypress(function(event){
//corresponds to character code of the key that was pressed
//is the char code correct? so we work with the event object again
	//take the text, add a new li and then clear it
	if(event.which === 13){
		//grabbing new todo text from input
		var todoText = $(this).val(); //grabbing the value of the input
		$(this).val(""); //clear out the text
		//create a new li and add to ul
		//new method append
		//first select an element to append to

		//Use single quotes inside the html so that the quotes don't interfere
		$("ul").append("<li><span><i class='fa fa-trash'></i> </span>" + todoText + "</li>");//give it a string of html
		//problem new todos can't get checked off
		//click only adds listeners for existing elements
		//on("click") uses listeners for all potential future elements
		//can't just switch click and on click, have to completely adjust the code
	
		//change from li on click
		//to ul on click
		//can only add a listener using jquery on eelemetns that exist when running the code the first time/
		//li doesn't exist, so we add a listener to the entire ul parent, and then we add a second
		//parameter that says when a li is clicked inside the ul, run this code

	}	



});

/*shows and hides the input */
$(".fa-plus").click(function(){
	$("input[type='text']").fadeToggle();
});