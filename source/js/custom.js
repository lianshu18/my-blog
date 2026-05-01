// source/js/custom.js
document.addEventListener("DOMContentLoaded", function () {
    const titleEl = document.getElementById("site-title");
    if (titleEl) {
        const text = titleEl.innerText || titleEl.textContent;
        titleEl.innerText = "";
        titleEl.style.borderRight = "3px solid #00f3ff"; // 青色发光光标
        titleEl.style.paddingRight = "4px";
        titleEl.style.animation = "blink 0.8s infinite"; // 调用 CSS 中的闪烁动画

        let i = 0;
        let isDeleting = false;

        function typeWriter() {
            const speed = isDeleting ? 75 : 150; // 删除速度快，打字速度慢

            if (!isDeleting && i < text.length) {
                // 打字阶段
                titleEl.innerText = text.substring(0, i + 1);
                i++;
                setTimeout(typeWriter, speed);
            } else if (isDeleting && i > 0) {
                // 删除阶段
                titleEl.innerText = text.substring(0, i - 1);
                i--;
                setTimeout(typeWriter, speed);
            } else {
                // 状态切换：打完停 3 秒，删完停 1 秒
                isDeleting = !isDeleting;
                setTimeout(typeWriter, isDeleting ? 3000 : 1000);
            }
        }

        setTimeout(typeWriter, 600);
    }
});