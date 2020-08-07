setInterval(shownotification, 20000);


function shownotification() {
	let myNotification = new Notification('LAR', {
		body: 'Avery yar Eyes'
	})

	myNotification.onclick = () => {
		console.log('Notification clicked');
	}
}