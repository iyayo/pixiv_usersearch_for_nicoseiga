function injectHtml(path, target) {
    fetch(chrome.runtime.getURL(path), { method: "GET" })
    .then(response => response.text())
    .then(text => new DOMParser().parseFromString(text, "text/html"))
    .then(dom => dom.getElementById("_search_pixiv_menu"))
    .then(dom => target.prepend(dom))
    .then(() => {
        const searchButton = document.getElementById("_searchButton");
        const checkOption = document.getElementsByName("nick_mf");
        const removeAtsignButton = document.getElementById("_removeAtsign");
        const title = document.querySelector("h1.title").innerText;
        const userName = document.querySelector('.user_name > strong').innerText;
        formData.userInput.value = userName;
        formData.titleInput.value = title;
        setSearchHref();

        formData.userInput.addEventListener("input", setSearchHref);
        formData.titleInput.addEventListener("input", setSearchHref);
        checkOption.forEach(element => element.addEventListener("click", changeInput));
        removeAtsignButton.addEventListener("click", removeAtsign);

        function removeAtsign() {
            if (formData.nick_mf.value !== "title") formData.userInput.value = formData.userInput.value.split(/[@＠]/)[0];
            else if(formData.nick_mf.value === "title") formData.titleInput.value = formData.titleInput.value.split(/[@＠]/)[0];
        }

        function setSearchHref() {
            if (formData.nick_mf.value !== "title") {
                searchButton.href = `https://www.pixiv.net/search_user.php?s_mode=s_usr&nick=${formData.userInput.value}&nick_mf=${formData.nick_mf.value}`
            } else if (formData.nick_mf.value === "title") {
                searchButton.href = `https://www.pixiv.net/tags/${formData.titleInput.value}/artworks?s_mode=s_tc`;
            }
        }

        function changeInput() {
            if (formData.nick_mf.value !== "title") {
                formData.titleInput.style.display = "none";
                formData.userInput.style.display = "block";
                setSearchHref();
            } else if(formData.nick_mf.value === "title") {
                formData.userInput.style.display = "none";
                formData.titleInput.style.display = "block";
                setSearchHref();
            }
        }
    })    
}

injectHtml("html/searchMenu.html", document.getElementsByClassName('sub_info_side')[0]);