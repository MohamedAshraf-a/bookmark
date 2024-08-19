var siteName = document.querySelector("#siteName");
var siteURL = document.querySelector("#siteURL");
var lightBoxContainer = document.querySelector("#lightBoxContainer");
var closeLightBox = document.querySelector("#lightBoxContainer .fa-xmark");
var btn = document.querySelector("button");
var sitesList;

localStorage.getItem("sitesList") == null
  ? (sitesList = [])
  : ((sitesList = JSON.parse(localStorage.getItem("sitesList"))),
    displaySites(sitesList));


  siteName.addEventListener("keydown",function(e) {
    var NameValue =e.target.value;
    ValidateName(NameValue);

    
  } );  

  siteURL.addEventListener("keydown",function(e) {

    var urlValue =e.target.value;
    ValidateURL(urlValue);
  });

btn.addEventListener("click", function (event) {
  var name = siteName.value;
  var url = siteURL.value;
  if (validateInput(name, url)) {
    var addSite = {
      name: name,
      link: url,
    };
    sitesList.push(addSite);
    localStorageUpdate();
    displaySites();
    clearInputs();
  } else {
    showLightBox();
  }
});

function localStorageUpdate() {
  localStorage.setItem("sitesList", JSON.stringify(sitesList));
}

function clearInputs() {
  siteName.value = "";
  siteURL.value = "";
  siteName.classList.remove("is-valid", "is-invalid");
  siteURL.classList.remove("is-valid", "is-invalid");
}

function ValidateURL(check) {
  const regex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(:[0-9]{1,5})?(\/[^\s]*)?$/i;
  if (regex.test(check)) {
    siteURL.classList.add("is-valid");
    siteURL.classList.remove("is-invalid");
    return true;
  } else {
    siteURL.classList.add("is-invalid");
    siteURL.classList.remove("is-valid");
    return false;
  }
}

function ValidateName(name){
    if (name.length >= 4) {
        siteName.classList.add("is-valid");
        siteName.classList.remove("is-invalid");
      } else {
        siteName.classList.add("is-invalid");
        siteName.classList.remove("is-valid");
      }
}

function validateInput(name, url) {
 
    ValidateName(name);
  return name.length >= 4 && ValidateURL(url);
}


function displaySites() {
  let cartona = ``;
  for (var i = 0; i < sitesList.length; i++) {
    cartona += `<tr >
                  <td>${i + 1}</td>
                  <td>${sitesList[i].name}</td>
                  <td><button class="btn btn-success" onclick="visitSite('${
                    sitesList[i].link
                  }')"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
                  <td><button class="btn pe-2 btn-danger" onclick="deleteSite(${i})"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td></tr>`;
  }
  document.getElementById("tbody").innerHTML = cartona;
}

function visitSite(link) {
  window.open(link);
}

function deleteSite(index) {
  sitesList.splice(index, 1);
  localStorageUpdate();
  displaySites();
}

function showLightBox() {
  lightBoxContainer.classList.remove("d-none");
}

function hideLightBox() {
  lightBoxContainer.classList.add("d-none");
}

closeLightBox.addEventListener("click", hideLightBox);

document.addEventListener("keyup", function (event) {
  if (event.key == "Escape") {
    hideLightBox();
  }
});
