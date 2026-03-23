// scroller.js - 修正版
class Scroller {
    constructor(eleRef) {
        let scrollTimeout;
        let isScrolling = false;
        
        // 防御性检查：确保eleRef存在且有value属性
        if (!eleRef || typeof eleRef !== 'object') {
            console.error('Scroller: Invalid element reference provided');
            return;
        }
        
        const element = eleRef.value;
        console.log('Scroller initialized with element:', element);
        
        if (!element || !element.addEventListener) {
            console.error('Scroller: element is not a valid DOM element');
            return;
        }

        const showScrollbar = () => {
            // 显示自定义滚动条
            document.body.style.setProperty('--scrollbar-opacity', '1');
            clearTimeout(scrollTimeout);
        };

        const hideScrollbar = () => {
            // 延迟隐藏滚动条
            scrollTimeout = setTimeout(() => {
                document.body.style.setProperty('--scrollbar-opacity', '0');
            }, 1000); // 用户停止滚动1秒后隐藏
        };

        // 监听滚动事件
        element.addEventListener('scroll', () => {
            if (!isScrolling) {
                showScrollbar();
                isScrolling = true;
                console.log('Scrolling started');
            }
            hideScrollbar();
        });

        // 监听鼠标移动，确保用户操作时能显示滚动条
        element.addEventListener('mousemove', showScrollbar);
        element.addEventListener('touchstart', showScrollbar);
    }
}

export { Scroller };
