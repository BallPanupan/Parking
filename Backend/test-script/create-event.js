const userIds = [
	"6690ebb4d5a8ad0ddf3481d4",
	"6690ebb4d5a8ad0ddf3481d6",
	"6690ebb4d5a8ad0ddf3481d8",
	"6690ebb4d5a8ad0ddf3481da",
	"6690ebb4d5a8ad0ddf3481e0",
	"6690ebb4d5a8ad0ddf3481e2",
	"6690ebb4d5a8ad0ddf3481e4",
	"6690ebb4d5a8ad0ddf3481dc",
	"6690ebb4d5a8ad0ddf3481de",
]

const parking = [
	"6690e1cf75fc2d86e9def808",
	"6690e20275fc2d86e9def80c",
	"6690e20475fc2d86e9def80e",
	"6690e20575fc2d86e9def810",
	"6690e20a75fc2d86e9def812",
	"6690e20c75fc2d86e9def814",
	"6690e20f75fc2d86e9def816",
	"6690e21275fc2d86e9def818",
	"6690e21475fc2d86e9def81a",
]

for (let index = 0; index < userIds.length; index++) {
	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	const raw = JSON.stringify({
		"userId": userIds[index],
		"parkingId": parking[index],
		"action": "OUT" // option IN and  OUT
	});

	const requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow"
	};

	fetch("http://localhost:3000/eventParking/", requestOptions)
		.then((response) => response.text())
		.then((result) => console.log(result))
		.catch((error) => console.error(error));

}
