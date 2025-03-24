// ==UserScript==
// @name         B站干净分享链接
// @namespace    http://tampermonkey.net/
// @version      1.8
// @description  清除复制链接中的追踪参数
// @author       Systina12
// @match        *://www.bilibili.com/video/*
// @grant        GM_setClipboard
// @updateURL    https://raw.githubusercontent.com/Systina12/BiliShareCleaner/main/BiliShareCleaner.user.js
// @downloadURL  https://raw.githubusercontent.com/Systina12/BiliShareCleaner/main/BiliShareCleaner.user.js
// ==/UserScript==

(function () {
    'use strict';

    const observer = new MutationObserver(() => {
        // 处理 .copy-link 按钮
        const copyBtns = document.querySelectorAll('.copy-link');
        copyBtns.forEach(btn => {
            if (!btn.dataset.cleaned) {
                btn.dataset.cleaned = 'true';
                btn.addEventListener('click', () => {
                    setTimeout(copyCleanLink, 300);
                    console.log('监听到 copy-link 分享按钮点击');
                });
            }
        });

        // 处理 div > span 类型的分享按钮
        const altBtn = document.querySelector('#share-btn-outer > div > span');
        if (altBtn && !altBtn.dataset.cleaned) {
            altBtn.dataset.cleaned = 'true';
            altBtn.addEventListener('click', () => {
                setTimeout(copyCleanLink, 300);
                console.log('监听到 span 类型分享按钮点击');
            });
        }

        // 处理 svg 图标型分享按钮
        const altBtn1 = document.querySelector('#share-btn-outer > svg');
        if (altBtn1 && !altBtn1.dataset.cleaned) {
            altBtn1.dataset.cleaned = 'true';
            altBtn1.addEventListener('click', () => {
                setTimeout(copyCleanLink, 300);
                console.log('监听到 svg 图标分享按钮点击');
            });
        }
        const altBtn2 = document.querySelector('##share-btn-qq');
        if (altBtn2 && !altBtn2.dataset.cleaned) {
            altBtn2.dataset.cleaned = 'true';
            altBtn2.addEventListener('click', () => {
                setTimeout(copyCleanLink, 300);
                console.log('监听到qq分享按钮点击');
            });
        }
        const altBtn3 = document.querySelector('#share-btn-weixin');
        if (altBtn3 && !altBtn3.dataset.cleaned) {
            altBtn3.dataset.cleaned = 'true';
            altBtn3.addEventListener('click', () => {
                setTimeout(copyCleanLink, 300);
                console.log('监听到微信分享按钮点击');
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
