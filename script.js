// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    
    // 移动端菜单切换
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // 点击导航链接后关闭移动菜单
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // 返回顶部按钮
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 技能条动画
    const skillBars = document.querySelectorAll('.skill-level');
    const skillPercentElements = document.querySelectorAll('.skill-percent');
    
    function animateSkillBars() {
        skillBars.forEach((bar, index) => {
            const percent = bar.getAttribute('data-level');
            bar.style.width = percent + '%';
            
            // 同时更新百分比数字动画
            const percentElement = skillPercentElements[index];
            if (percentElement) {
                animateNumber(percentElement, 0, parseInt(percent), 1500);
            }
        });
    }
    
    // 数字动画函数
    function animateNumber(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * (end - start) + start);
            element.textContent = currentValue + '%';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // 统计数字动画
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            animateNumber(stat, 0, target, 2000);
        });
    }
    
    // 滚动时触发动画
    function checkScroll() {
        const skillsSection = document.getElementById('skills');
        const aboutSection = document.getElementById('about');
        
        if (skillsSection && isElementInViewport(skillsSection)) {
            animateSkillBars();
            // 只执行一次
            window.removeEventListener('scroll', checkScroll);
        }
        
        if (aboutSection && isElementInViewport(aboutSection)) {
            animateStats();
        }
    }
    
    // 检查元素是否在视口中
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    }
    
    // 监听滚动事件
    window.addEventListener('scroll', checkScroll);
    
    // 初始检查
    checkScroll();
    
    // 表单提交
    const messageForm = document.getElementById('messageForm');
    
    if (messageForm) {
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // 简单验证
            if (!name || !email || !message) {
                alert('请填写所有字段！');
                return;
            }
            
            // 这里在实际项目中应该发送到服务器
            // 现在只显示成功消息
            alert(`谢谢 ${name}！你的消息已发送。我会尽快回复你。`);
            
            // 重置表单
            messageForm.reset();
        });
    }
    
    // 打字机效果
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = typingText.textContent;
        typingText.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // 延迟开始打字效果
        setTimeout(typeWriter, 1000);
    }
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 添加活跃导航项的高亮
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});