// 量子金融算法调研网站 - 交互功能
document.addEventListener("DOMContentLoaded", function() {
    console.log("量子金融算法调研网站已加载");

    // 1. 平滑滚动导航
    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();

            // 更新活跃状态
            navLinks.forEach(l => l.classList.remove("active"));
            this.classList.add("active");

            // 平滑滚动
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: "smooth"
                });
            }
        });
    });

    // 2. 动态更新导航活跃状态
    function updateActiveNav() {
        const sections = document.querySelectorAll("section[id]");
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute("id");

            if (scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", updateActiveNav);

    // 3. 表格行悬停效果
    const tableRows = document.querySelectorAll("tr");
    tableRows.forEach(row => {
        row.addEventListener("mouseenter", function() {
            this.style.backgroundColor = "#f1f7ff";
            this.style.cursor = "pointer";
        });

        row.addEventListener("mouseleave", function() {
            this.style.backgroundColor = "";
        });

        // 点击表格行显示详细信息
        row.addEventListener("click", function() {
            if (this.rowIndex > 0) { // 跳过表头
                const cells = this.querySelectorAll("td");
                let info = "详细信息: ";
                cells.forEach((cell, index) => {
                    info += `${cell.textContent} | `;
                });
                console.log(info.slice(0, -3));
            }
        });
    });

    // 4. 卡片悬停效果
    const flowSteps = document.querySelectorAll(".flow-step");
    flowSteps.forEach((step, index) => {
        step.style.transitionDelay = `${index * 0.05}s`;

        step.addEventListener("mouseenter", function() {
            this.style.transform = "translateY(-8px)";
            this.style.boxShadow = "0 15px 30px rgba(0,0,0,0.1)";
        });

        step.addEventListener("mouseleave", function() {
            this.style.transform = "translateY(0)";
            this.style.boxShadow = "0 5px 15px rgba(0,0,0,0.05)";
        });
    });

    // 5. 添加打印按钮
    const printButton = document.createElement("button");
    printButton.innerHTML = "📄 打印调研报告";
    printButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-blue);
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 25px;
        cursor: pointer;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        z-index: 1000;
        font-size: 14px;
        transition: all 0.3s;
        font-family: inherit;
    `;

    printButton.addEventListener("mouseenter", function() {
        this.style.transform = "translateY(-2px)";
        this.style.boxShadow = "0 6px 15px rgba(0,0,0,0.3)";
    });

    printButton.addEventListener("mouseleave", function() {
        this.style.transform = "translateY(0)";
        this.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
    });

    printButton.addEventListener("click", function() {
        window.print();
    });

    document.body.appendChild(printButton);

    // 6. 回到顶部按钮
    const backToTopButton = document.createElement("button");
    backToTopButton.innerHTML = "⬆";
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 70px;
        right: 20px;
        background: var(--quantum-purple);
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        z-index: 1000;
        display: none;
        font-size: 20px;
        transition: all 0.3s;
        font-family: inherit;
    `;

    backToTopButton.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.body.appendChild(backToTopButton);

    // 显示/隐藏回到顶部按钮
    window.addEventListener("scroll", function() {
        backToTopButton.style.display = window.scrollY > 500 ? "block" : "none";
    });

    // 7. 数学公式渲染通知
    if (window.MathJax) {
        MathJax.typesetPromise().then(() => {
            console.log("✓ 数学公式渲染完成");
        }).catch(err => {
            console.warn("数学公式渲染警告:", err.message);
        });
    }

    // 8. 页面加载动画
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.5s";

    setTimeout(() => {
        document.body.style.opacity = "1";
    }, 100);

    // 9. 控制台欢迎信息
    console.log(`
    ╔══════════════════════════════════════════════════╗
    ║       量子金融算法调研网站                        ║
    ║       版本: 1.0.0                               ║
    ║       作者: YukiYang821                         ║
    ║       部署: GitHub Pages                        ║
    ║       访问: yukiyang821.github.io/finance_report ║
    ╚══════════════════════════════════════════════════╝
    `);
});
