$('#send-contact').click(function (evt) {
	evt.preventDefault();
	var name = $('#name').val();
	var email = $('#email').val();
	var message = $('#message').val();

	if (name !== '' && email !== '' && message !== '') {
		$.get('http://localhost:8080/sendContact', {
			name: name,
			email: email,
			message: message
		}, function (data) {
			if (data == 'sent') {
				$('.alert').html('<strong>Success! </strong> Your message has been sent!').addClass('success');
			} else{
				$('.alert').html('<strong>Uh oh!</strong> It looks like that didn\'t go through, let\'s try that again.').addClass('error');
			}
		});
	}
});