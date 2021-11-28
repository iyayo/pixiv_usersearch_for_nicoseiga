const target = document.getElementsByClassName("sub_info_side")[0];
const relative_path = "html/searchMenu.html";

Promise.resolve()
    .then(() => getLocalResourceURL(relative_path))
    .then(abs_path => getLocalResourceDOM(abs_path))
    .then(dom => injectDocument(target, dom))
    .then(() => setEventHandler())

function getLocalResourceURL(rel_path) {
    return chrome.runtime.getURL(rel_path)
}

function getLocalResourceDOM(abs_path) {
    return new Promise((resolve, reject) => {
        fetch(abs_path)
            .then(res => res.text())
            .then(text => new DOMParser().parseFromString(text, "text/html"))
            .then(dom => resolve(dom.body.firstChild))
    })
}

function injectDocument(target, dom) {
    target.prepend(dom);
    return;
}

function setEventHandler() {
    const searchButton = document.getElementById("_searchButton");
    const checkOption = document.getElementsByName("nick_mf");
    const removeAtsignButton = document.getElementById("_removeAtsign");

    const title = document.querySelector("h1.title").innerText;
    const userName = document.querySelector(".user_name > strong").innerText;

    formData.userInput.value = userName;
    formData.titleInput.value = title;
    setSearchHref();

    formData.userInput.oninput = setSearchHref;
    formData.titleInput.oninput = setSearchHref;
    checkOption.forEach(element => element.onclick = changeInput);
    removeAtsignButton.onclick = removeAtsign;

    function removeAtsign() {
        if (formData.nick_mf.value !== "title") formData.userInput.value = formData.userInput.value.split(/[@＠]/)[0];
        else if (formData.nick_mf.value === "title") formData.titleInput.value = formData.titleInput.value.split(/[@＠]/)[0];
        setSearchHref();
    }

    function setSearchHref() {
        if (formData.nick_mf.value !== "title") searchButton.href = `https://www.pixiv.net/search_user.php?s_mode=s_usr&nick=${formData.userInput.value}&nick_mf=${formData.nick_mf.value}`
        else if (formData.nick_mf.value === "title") searchButton.href = `https://www.pixiv.net/tags/${formData.titleInput.value}/artworks?s_mode=s_tc`;
    }

    function changeInput() {
        if (formData.nick_mf.value !== "title") {
            formData.titleInput.style.display = "none";
            formData.userInput.style.display = "block";
            setSearchHref();
        } else if (formData.nick_mf.value === "title") {
            formData.userInput.style.display = "none";
            formData.titleInput.style.display = "block";
            setSearchHref();
        }
    }
}