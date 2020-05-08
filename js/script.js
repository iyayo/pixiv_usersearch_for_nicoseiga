const sub_info_side = document.querySelector('.sub_info_side');
const nickname = document.querySelector('.user_name > strong').textContent;
const div = document.createElement('div');
div.id = 'search_pixiv_menu';

const h2 = document.createElement('h2');
h2.textContent = 'Pixivユーザー検索';

const form = document.createElement('form');
form.action = 'https://www.pixiv.net/search_user.php';
form.method = 'get';
form.target = '_blank';

const inputText = document.createElement('input');
inputText.type = 'text';
inputText.className = 'search_pixiv_input';
inputText.name = 'nick';
inputText.value = nickname;

const inputHidden = document.createElement('input');
inputHidden.type = 'hidden';
inputHidden.name = 's_mode';
inputHidden.value = 's_usr';

const inputSubmit = document.createElement('input');
inputSubmit.type = 'submit';
inputSubmit.value = '検索';

const br = document.createElement('br');

const labelRadio1 = document.createElement('label');

const inputRadio1 = document.createElement('input');
inputRadio1.type = 'radio';
inputRadio1.name = 'nick_mf';
inputRadio1.value = '0';
inputRadio1.checked = 'checked';

const labelRadio1Text = document.createTextNode('部分一致');

const labelRadio2 = document.createElement('label');

const inputRadio2 = document.createElement('input');
inputRadio2.type = 'radio';
inputRadio2.name = 'nick_mf';
inputRadio2.value = '1';

const labelRadio2Text = document.createTextNode('完全一致');

const atSignButton = document.createElement('a');
atSignButton.onclick = atSignRemoval;

const atSignText = document.createTextNode('＠以降削除');

div.appendChild(h2);
div.appendChild(form);
form.appendChild(inputText);
form.appendChild(inputHidden)
form.appendChild(inputSubmit);
form.appendChild(br);
form.appendChild(labelRadio1);
labelRadio1.appendChild(inputRadio1);
labelRadio1.appendChild(labelRadio1Text)
form.appendChild(labelRadio2);
labelRadio2.appendChild(inputRadio2);
labelRadio2.appendChild(labelRadio2Text)
form.appendChild(atSignButton);
atSignButton.appendChild(atSignText);

sub_info_side.prepend(div);

function atSignRemoval(){
    let text = document.querySelector('.search_pixiv_input');
    text.value = text.value.split(/[@＠]/)[0];
}