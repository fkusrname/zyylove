// 获取canvas元素和上下文
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 设置全屏
function setFullScreen() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// 爱心对象构造函数
function Heart(x, y, vx, vy, size, color) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.size = size;
    this.color = color;
}

// 绘制爱心
Heart.prototype.draw = function () {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - this.size * 0.5);
    ctx.bezierCurveTo(this.x - this.size * 0.5, this.y - this.size, this.x - this.size, this.y, this.x, this.y);
    ctx.bezierCurveTo(this.x + this.size, this.y, this.x + this.size * 0.5, this.y - this.size, this.x, this.y - this.size * 0.5);
    ctx.fillStyle = this.color;
    ctx.fill();
};

// 更新爱心位置
Heart.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;

    // 边界处理
    if (this.x < -this.size || this.x > canvas.width + this.size) {
        this.vx = -this.vx;
    }
    if (this.y < -this.size || this.y > canvas.height + this.size) {
        this.vy = -this.vy;
    }
};

// 初始化函数
function init() {
    setFullScreen();
    window.addEventListener('resize', setFullScreen);

    const hearts = [];
    const numHearts = 50;

    // 创建多个爱心
    for (let i = 0; i < numHearts; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const vx = (Math.random() - 0.5) * 5;
        const vy = (Math.random() - 0.5) * 5;
        const size = Math.random() * 20 + 10;
        const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.random() * 0.8 + 0.2})`;
        hearts.push(new Heart(x, y, vx, vy, size, color));
    }

    // 动画循环
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 更新和绘制爱心
        hearts.forEach(heart => {
            heart.update();
            heart.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();
}
