// 量子金融算法调研平台 - 交互功能
// ========== MathJax配置 ==========
window.MathJax = {
    tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']],
        processEscapes: true,
        processEnvironments: true
    },
    options: {
        skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
        ignoreHtmlClass: 'tex2jax_ignore',
        processHtmlClass: 'tex2jax_process'
    },
    startup: {
        ready: () => {
            MathJax.startup.defaultReady();
            console.log('✓ MathJax is ready');
            // 初始渲染后再次渲染，确保所有公式正确显示
            setTimeout(() => {
                if (window.MathJax && window.MathJax.typesetPromise) {
                    MathJax.typesetPromise();
                }
            }, 500);
        }
    }
};

document.addEventListener("DOMContentLoaded", function() {
    console.log("量子金融算法调研平台已加载");

    // ========== 导航栏交互 ==========
    const navLinks = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("section[id]");

    // 平滑滚动
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();

            // 更新活跃状态
            navLinks.forEach(l => l.classList.remove("active"));
            this.classList.add("active");

            // 平滑滚动到目标
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: "smooth"
                });
            }
        });
    });

    // 动态更新导航活跃状态
    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100;

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

    // ========== 卡片悬停效果 ==========
    const cards = document.querySelectorAll(".content-card, .nav-card, .point, .spec-item");
    cards.forEach(card => {
        card.addEventListener("mouseenter", function() {
            this.style.transition = "all 0.3s ease";
        });
    });

    // ========== 算法步骤交互 ==========
    const algoSteps = document.querySelectorAll(".algo-step");
    algoSteps.forEach((step, index) => {
        step.style.animationDelay = `${index * 0.1}s`;
        step.style.opacity = "0";
        step.style.animation = "fadeIn 0.5s forwards";

        step.addEventListener("click", function() {
            this.classList.toggle("expanded");
        });
    });

    // ========== 表格交互 ==========
    const tableRows = document.querySelectorAll("tr");
    tableRows.forEach(row => {
        if (row.rowIndex > 0) { // 跳过表头
            row.addEventListener("mouseenter", function() {
                this.style.backgroundColor = "#f5f9ff";
            });

            row.addEventListener("mouseleave", function() {
                this.style.backgroundColor = "";
            });
        }
    });

    // ========== 回到顶部按钮 ==========
    const backToTopBtn = document.getElementById("back-to-top");

    function toggleBackToTop() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add("visible");
        } else {
            backToTopBtn.classList.remove("visible");
        }
    }

    window.addEventListener("scroll", toggleBackToTop);

    backToTopBtn.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // ========== 打印按钮 ==========
    const printBtn = document.getElementById("print-btn");
    printBtn.addEventListener("click", function() {
        window.print();
    });

    // ========== 公式渲染优化 ==========
    function renderMathFormulas() {
        if (window.MathJax && window.MathJax.typesetPromise) {
            MathJax.typesetPromise().then(() => {
                console.log("✓ 数学公式渲染完成");
            }).catch(err => {
                console.log("公式渲染警告:", err.message);
                // 重试
                setTimeout(renderMathFormulas, 300);
            });
        } else {
            // 等待MathJax加载
            setTimeout(renderMathFormulas, 100);
        }
    }

    // 初始渲染
    setTimeout(renderMathFormulas, 800);

    // 页面加载动画
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.5s";

    setTimeout(() => {
        document.body.style.opacity = "1";
    }, 100);

    // ========== 控制台欢迎信息 ==========
    console.log(`
    ╔══════════════════════════════════════════════════════════╗
    ║        量子金融算法调研平台                              ║
    ║        版本: 3.0.0 (专业完整版)                         ║
    ║        结构: 金融问题 → 数学问题 → 量子解决方案         ║
    ║        部署: GitHub Pages                               ║
    ║        访问: yukiyang821.github.io/finance_report       ║
    ╚══════════════════════════════════════════════════════════╝
    `);

    console.log("✅ 所有功能已加载：导航、交互、动画、公式渲染");
});

// 在script.js中添加公式编号功能
function addEquationNumbers() {
    const formulaBoxes = document.querySelectorAll('.formula-box');
    formulaBoxes.forEach((box, index) => {
        const equationNum = index + 1;
        const label = box.previousElementSibling;
        if (label && label.classList.contains('step-label')) {
            // 在标签中添加公式编号
            const originalText = label.textContent;
            if (originalText.includes('公式')) {
                label.innerHTML = `${originalText}<span class="equation-ref" data-eq="${equationNum}">(${equationNum})</span>`;
            }
        }

        // 在公式右下角添加编号
        const eqNumber = document.createElement('div');
        eqNumber.className = 'equation-number';
        eqNumber.textContent = `(${equationNum})`;
        box.appendChild(eqNumber);
    });
}

// 在DOM加载完成后调用
document.addEventListener('DOMContentLoaded', function() {
    // 原有代码...

    // 添加公式编号
    setTimeout(addEquationNumbers, 1000);
});