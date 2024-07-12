const users = [
  "fake-user-set01-01",
  "fake-user-set01-02",
  "fake-user-set01-03",
  "fake-user-set01-04",
  "fake-user-set01-05",
  "fake-user-set01-06",
  "fake-user-set01-07",
  "fake-user-set01-08",
  "fake-user-set01-09",
]


for (const user of users) {
  const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "name": user,
  "carNumber": "ก 888 BKK ",
  "status": "Active"
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://localhost:3000/users/", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}
