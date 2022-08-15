const sendSingleDeviceNotification = data => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append(
    'Authorization',
    'key=AAAAkd58Dws:APA91bFF1NvZzDYf5iuI4eODXTGnyw5NnnGX_ObU5SrPSLtDjim52pnknZ67FQC1WwCsxW62ddWurH5NJbX_LhuejsXeQZbn8NXQpNLZ-n2PcbzP5ECk4YjEhWtQqedJQw5PzfJqxtY-',
  );

  var raw = JSON.stringify({
    data: {},
    notification: {
      body: data.body,
      title: data.title,
    },
    to: data.token,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch('https://fcm.googleapis.com/fcm/send', requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
};

const sendMultiDeviceNotification = data => {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append(
    'Authorization',
    'key=AAAAkd58Dws:APA91bFF1NvZzDYf5iuI4eODXTGnyw5NnnGX_ObU5SrPSLtDjim52pnknZ67FQC1WwCsxW62ddWurH5NJbX_LhuejsXeQZbn8NXQpNLZ-n2PcbzP5ECk4YjEhWtQqedJQw5PzfJqxtY-',
  );

  var raw = JSON.stringify({
    data: {},
    notification: {
      body: data.body,
      title: data.title,
    },
    registration_ids: data.token,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch('https://fcm.googleapis.com/fcm/send', requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
};

export default {
  sendSingleDeviceNotification,
  sendMultiDeviceNotification,
};
