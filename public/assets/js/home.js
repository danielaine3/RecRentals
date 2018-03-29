$('#choice').on('click', function(e) {
	e.preventDefault();
	var choice = $('#user-type').val();
	console.log(choice);
	if (choice == 1) {
		
		location.href = "/renter";
	}
	else if (choice == 2) {
		location.href = "/owner"
	}
});