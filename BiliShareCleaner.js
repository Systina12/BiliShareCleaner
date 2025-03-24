// ==UserScript==
// @name         B站干净分享链接
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  清除复制链接中的追踪参数
// @author       Systina12
// @match        *://www.bilibili.com/video/*
// @grant        GM_setClipboard
// @updateURL    https://github.com/Systina12/BiliShareCleaner/edit/main/BiliShareCleaner.js
// @downloadURL  https://github.com/Systina12/BiliShareCleaner/edit/main/BiliShareCleaner.js
// ==/UserScript==

(function () {
    'use strict';

    const observer = new MutationObserver(() => {
        const copyBtns = document.querySelectorAll('.copy-link');
        copyBtns.forEach(btn => {
            if (!btn.dataset.cleaned) {
                btn.dataset.cleaned = 'true';
                btn.addEventListener('click', () => {
                    setTimeout(copyCleanLink, 100);
                });
            }
        });

        const altBtn = document.querySelector('#share-btn-outer > div > span');
        if (altBtn && !altBtn.dataset.cleaned) {
            altBtn.dataset.cleaned = 'true';
            altBtn.addEventListener('click', () => {
                setTimeout(copyCleanLink, 100);
                console.log('监听到备用分享按钮点击');
            });
        }
    });

    // 通用的复制逻辑（链接清洗 + 写入剪贴板）
    function copyCleanLink() {
        let cleanURL = location.href.split('?')[0].split('&')[0];
        let title = document.title.replace(/_哔哩哔哩_bilibili$/, '').trim();
        const cleanText = `${title} ${cleanURL}`;
        GM_setClipboard(cleanText);
        console.log('复制成功：', cleanText);
    }

    // 启动 DOM 监听
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
