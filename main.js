
var tableBody = document.getElementById("tableBody");
var siteNameInput = document.getElementById("siteNameInput");
var siteUrlInput = document.getElementById("siteUrlInput");
var webSitesContainer = JSON.parse(localStorage.getItem("webSites")) ?? [];
displayWebSitesData();

function addProtocol(url) {
    if (!/^https?:\/\//.test(url)) {
        return "http://" + url;
    }
    return url;
}

function validateInputs(name, url) {
    if (name.trim() === "") {
        showAlert("Site name cannot be empty.", "danger");
        return false;
    }
    if (url.trim() === "") {
        showAlert("Site URL cannot be empty.", "danger");
        return false;
    }
    var urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
    if (!urlPattern.test(url)) {
        showAlert("Please enter a valid URL.", "danger");
        return false;
    }
    return true;
}

function showAlert(message, type) {
    var alertBox = document.getElementById("alertBox");
    alertBox.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
}

function addWebSiteData() {
    var siteName = siteNameInput.value;
    var siteUrl = siteUrlInput.value;

    if (!validateInputs(siteName, siteUrl)) {
        return;
    }

    siteUrl = addProtocol(siteUrl);

    var webSiteData = {
        name: siteName,
        url: siteUrl,
    };
    webSitesContainer.push(webSiteData);
    storeWebSiteData(webSitesContainer);
    displayWebSitesData();

    siteNameInput.value = "";
    siteUrlInput.value = "";
    showAlert("Website added successfully!", "success");
}

function storeWebSiteData(webSites) {
    localStorage.setItem("webSites", JSON.stringify(webSites));
}

function displayWebSitesData() {
    var storageBox = "";
    for (var i = 0; i < webSitesContainer.length; i++) {
        storageBox += `
        <tr>
        <td class="py-3">${i + 1}</td>
        <td class="py-3">${webSitesContainer[i].name}</td>
        <td><button onclick="visitSite('${webSitesContainer[i].url}')" class="btn btn-success py-2 px-3"><span><i class="fa-solid fa-eye"></i></span> Visit</button></td>
        <td><button class="btn btn-danger py-2 px-3" onclick="deleteSite(${i})"><span><i class="fa-solid fa-trash-can"></i></span> Delete</button></td>        
        </tr>
        `;
    }
    tableBody.innerHTML = storageBox;
}

function clear() {
    siteNameInput.value = "";
    siteUrlInput.value = "";
}

function visitSite(url) {
    window.open(url, "_blank");
}

function deleteSite(index) {
    webSitesContainer.splice(index, 1);
    storeWebSiteData(webSitesContainer);
    displayWebSitesData();
}
