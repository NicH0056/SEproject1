$(function(){
	// GET/READ
	$('#get-button').on('click', function() {
		$.ajax({
			url: '/parsedTweets',
			contentType: 'application/json',
			success: function(response) {
				console.log(response);
				var tbodyEL = $('tbody');

				tbodyEL.html('');
				response.parsedTweets.forEach(function(parsedTweets) {
					tbodyEL.append('\
							<tr>\
								<td><input type = "text" class="screen_name" value="' + parsedTweets.screen_name + '"</td>\
								<td><input type = "text" class="text" value="' + parsedTweets.text + '"</td>\
								<td>\
									<button class ="update-button">\
										UPDATE/PUT</button>\
									<button class ="delete-button">\
									DELETE</button>\
								</td>\
								</tr>\
						');
				});
			}
		});
	});

	// CREATE/POST

	$('#name-form').on('submit', function(event) {
		event.preventDefault();

		var nameInput = $('#name-input');
		var textInput = $('#text-input');

		$.ajax({
			url: '/parsedTweets',
			method: 'POST',
			contentType: 'application/json',
			data: {
				name: JSON.stringify({ name: nameInput.val()}),
				text: JSON.stringify({ text: textInput.val()})
			},
			success: function(response) {
				console.log(response);
				createInput.val('');
				$('#get-button').click();
			}
		});
	});
	// UPDATE/PUT
	$('table').on('click', '.update-button', function(){
		var rowEl = $(this).closest('tr');
		var id = rowEl.find('.screen_name').val();
		//var newName = rowEl.find('.name').val();
		var newText = rowEl.find('.text').val();
		console.log(id);

		$.ajax({
			url: '/parsedTweets/' + id,
			method: 'PUT',
			contentType: 'application/json',
			data: 
				JSON.stringify({ text: newText }),
			success: function(response) {
				console.log(response);
				$('#get-button').click();
			}
		});
	});

	// DELETE
	$('table').on('click', '.delete-button', function() {
		var rowEl = $(this).closest('tr');
		var id = rowEl.find('.screen_name').val();
		$.ajax({
			url: '/parsedTweets/' + id,
			method: 'DELETE',
			contentType: 'application/json',
			success: function(response) {
				console.log(response);
				$('#get-button').click();
			}
		});
	});
});