const selectorPoll = (queryStr, all, {
  intervalTime = 500,
  maxTime = 1000 * 20,
} = {}) => {
  return new Promise((resolve, reject) => {
    let maxTimeReached = false;
    setTimeout(() => maxTimeReached = true, maxTime);

    let interval = setInterval(() => {
      let ele;
      if (all) {
        ele = document.querySelectorAll(queryStr);
      } else {
        ele = document.querySelector(queryStr);
      }

      if ((all && ele.length > 0) || (!all && ele)) {
        resolve(ele);
        clearInterval(interval);
      }
      if (maxTimeReached) {
        reject();
        clearInterval(interval);
      }
    }, intervalTime);
  });
};

const querySelectorPoll = (queryStr, config) => selectorPoll(queryStr, false, config);
const querySelectorAllPoll = (queryStr, config) => selectorPoll(queryStr, true, config);

document.title = '云笔记';
// 监听title改变
new window.MutationObserver((mutations) => {
  mutations.forEach(() => {
    if (document.title !== '云笔记') document.title = '云笔记';
  });
}).observe(document.querySelector('head > title'), { subtree: true, characterData: true, childList: true })

setInterval(() => {
  const btn = document.querySelector('.btn.btn_send');
  if (btn && btn.innerHTML !== '保存') btn.innerHTML = '保存';
}, 1000);

const style = document.createElement('link');
style.setAttribute('rel', 'stylesheet');
style.setAttribute('href', chrome.extension.getURL('pageStyles/main.css'));
document.documentElement.appendChild(style);
const style2 = document.createElement('style');
style2.innerHTML = `
.chat_item .avatar, .message .avatar, .contact_item .avatar {
  background-image: url("${chrome.extension.getURL('images/note.jpg')}") !important;
  background-size: contain;
  background-repeat: no-repeat;
}
`;
document.documentElement.appendChild(style2);

var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
link.type = 'image/x-icon';
link.rel = 'shortcut icon';
link.href = chrome.extension.getURL('images/note.jpg');
document.getElementsByTagName('head')[0].appendChild(link);

// const img = document.createElement('img');
// img.setAttribute('class', 'weChatShelter-head');
// img.setAttribute('src', chrome.extension.getURL('images/head.jpg'));
// document.body.insertBefore(img, document.body.firstChild);

const head = document.createElement('div');
head.setAttribute('class', 'weChatShelter-head');
head.innerHTML = `
<img class="weChatShelter-head-left" src="${chrome.extension.getURL('images/head_left.png')}"></img>
<img class="weChatShelter-head-right" src="${chrome.extension.getURL('images/head_right.png')}"></img>
`;
document.body.insertBefore(head, document.body.firstChild);


const menu = document.createElement('div');
menu.setAttribute('class', 'weChatShelter-menu');
menu.innerHTML = `
<img class="weChatShelter-menu-top" src="${chrome.extension.getURL('images/menu_top.png')}"></img>
<img class="weChatShelter-menu-bottom" src="${chrome.extension.getURL('images/menu_bottom.png')}"></img>
`;
document.querySelector('.main').insertBefore(menu, document.querySelector('.main_inner'));
