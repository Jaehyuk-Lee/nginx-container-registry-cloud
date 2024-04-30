function send(type) {
  const SERVER_IP = `http://${WAS_IP}:3000/${type}/`;
  let texts = document.querySelectorAll("div#input input[type='text']");
  let numbers = document.querySelectorAll("div#input input[type='number']");
  let selects = document.querySelectorAll("div#input select");
  let params = {};
  [texts, numbers, selects].map(input => input.forEach(key => {
    if (TYPE_INFO[type].params.indexOf(key.name) != -1)
      params[key.name] = key.value;
  }));
  httpRequest(
    SERVER_IP,
    TYPE_INFO[type].method,
    type,
    params
  );
}

function httpRequest(url, method, type, params) {
  var http = new XMLHttpRequest();
  var param = JSON.stringify({ params });
  console.log(param);
  http.open("GET", url + "?param=" + param, true);
  http.setRequestHeader("Content-type", "application/json; charset=utf-8");

  http.onreadystatechange = function () {
    if (http.status == 200) {
      if (http.readyState == 4) {
        const res = http.responseText === undefined ? '' : JSON.parse(http.responseText);
        if (res.length === 0) {
          alert('검색 결과가 없습니다.');
          return;
        }
        for (const [key, value] of Object.entries(res[0])) {
          let k = key[0].toLowerCase() + key.slice(1);
          document.querySelector(`span[id='result-${k}']`).innerText = value;
        }
        alert('대상자입니다!');
      }
    } else {
      alert('뭔가 문제가 있어요.\nHTTP Status Code: ' + http.status);
    }
  }
  http.send();
}
