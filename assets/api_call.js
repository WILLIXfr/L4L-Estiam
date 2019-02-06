document.querySelector('.container .form').addEventListener('submit', function(event){
  event.preventDefault();
  reset();
  exec_request();
});

function reset() {
  var select = document.body.querySelectorAll('div p, div img');
  if (select.length > 0) {
    select.forEach(e => e.parentNode.removeChild(e));
  }
}

function exec_request() {
  const req = new XMLHttpRequest();
  var url = "https://westeurope.api.cognitive.microsoft.com/text/analytics/v2.0/languages";
  req.open('POST', url, true);

  req.onreadystatechange = function(event) {
    if (this.readyState == XMLHttpRequest.DONE) {
      if (this.status == 200) {
        //console.log(this.response);
        var result = JSON.parse(this.response);
        console.log(result);
        display_info(result);
      }
    }
  };


  req.setRequestHeader("Content-Type", "application/json");
  req.setRequestHeader("Ocp-Apim-Subscription-Key", "cd96febd40474e8a90b2372a28fdf5cc");
  
  req.send(JSON.stringify({
    "documents": [
      {
        "id": "1",
        "text": document.querySelector('div input').value
      }
    ]
  }))
  //req.send(null);
}

function display_info(result) {
  let language = result.documents[0].detectedLanguages[0].name;
  let iso_name = result.documents[0].detectedLanguages[0].iso6391Name;
  create_content_holder(language, iso_name )
}

function create_content_holder(language, iso_name) {
  var output = document.createElement('p');
  document.body.querySelector('div').appendChild(output);

  output.innerText = "This is: " + language + ", " + iso_name;

  var img = document.createElement('img');
  document.body.querySelector('div').appendChild(img);
  img.setAttribute('class', 'mx-auto');

  var src_img = "https://www.countryflags.io/" + iso_name + "/flat/64.png"

  img.setAttribute('src', src_img);

  output.setAttribute('class', 'text-white');
}