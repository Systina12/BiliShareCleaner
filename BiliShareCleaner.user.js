// ==UserScript==
// @name         B站分享链接清理
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  清除复制链接中的追踪参数
// @author       Systina12
// @match        *://www.bilibili.com/video/*
// @grant        GM_setClipboard
// @updateURL    https://raw.githubusercontent.com/Systina12/BiliShareCleaner/main/BiliShareCleaner.user.js
// @downloadURL  https://raw.githubusercontent.com/Systina12/BiliShareCleaner/main/BiliShareCleaner.user.js
// ==/UserScript==

(function() {
    'use strict';
    
    const cleanURL = () => {
        const url = new URL(location.href);
        return url.origin + url.pathname + (url.hash || '');
    };
    
    // 事件委托处理分享按钮
    const handleShareClick = (event) => {
        const target = event.target;
        const shareBtn = target.closest('.copy-link, [id^="share-btn-"]');
        
        if (shareBtn) {
            // 阻止事件冒泡和默认行为
            event.stopImmediatePropagation();
            event.preventDefault();
            
            const cleanURLText = cleanURL();
            const title = document.title.replace(/_哔哩哔哩_bilibili$/, '').trim();
            const cleanText = `${title} ${cleanURLText}`;
            
            GM_setClipboard(cleanText);
            console.log('BiliCleaner: 复制成功', cleanText);
        }
    };
    
    // 初始化事件监听
    const init = () => {
        document.addEventListener('click', handleShareClick, true);
    };
    
    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
