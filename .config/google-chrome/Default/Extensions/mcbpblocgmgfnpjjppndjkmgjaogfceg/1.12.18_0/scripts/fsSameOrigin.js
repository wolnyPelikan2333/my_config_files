/*
 FireShot - Webpage Screenshots and Annotations
 Copyright (C) 2007-2023 Evgeny Suslikov (evgeny@suslikov.ru)
*/
(function(){const e=(a,b)=>{const d=[...a.querySelectorAll(b)];a=document.createNodeIterator(a,Node.ELEMENT_NODE);let c;for(;c=a.nextNode();)c.shadowRoot&&d.push(...e(c.shadowRoot,b));return d};let f=!0;e(document,"frame,iframe").forEach(a=>{try{f&=document.location.origin===(new URL(a.src)).origin||200>a.clientWidth||200>a.clientHeight}catch(b){}});return!f})();
