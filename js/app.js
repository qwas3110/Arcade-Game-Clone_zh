//指定DOM
const playAgain = document.querySelector(".play-again");
const result = document.querySelector('.result');

class Enemy {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/enemy-bug.png';
        this.speed = Math.floor(Math.random() * 10) + 100;
    }
    // 更新敌人的位置，参数dt 表示时间间隙
    update(dt) {
        // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
        // 都是以同样的速度运行的
        this.x += this.speed * dt;
        if (this.x > 510) {
            this.x = 0;
        }
        // console.log(this.x);
    }
    // 用来在屏幕上画出敌人
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数

class Player {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-boy.png';
    }
    // 更新玩家的位置，参数dt 表示时间间隙
    update() {
        //当玩家到达河边，游戏结束
        let playY = this.y;
        if(playY === -15) {
            setTimeout(function () {
                result.style.top = "30%";
                playAgain.addEventListener("click", function f() {
                    location.reload();
                })
            },1000)
        }
    }
    // 用来在屏幕上画出玩家
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // 操控人物上下左右
    handleInput(direction) {
        switch (direction) {
            case 'left':
                this.x > 0 ? (this.x -= 101) : (this.x = 0);
                break;
            case 'right':
                this.x < 404 ? (this.x += 101) : (this.x = 404);
                break;
            case 'up':
                this.y > 0 ? (this.y -= 83) : (this.y = -13);
                break;
            case 'down':
                this.y < 400 ? (this.y += 83) : (this.y = 400);
                break;
        }
    }
    // 加入碰撞检测
    collision() {
        allEnemies.forEach(enemy => {
            let {x,y} = enemy;
            if ((Math.abs(this.y - y) < 40) && (Math.abs(this.x - x) < 50)) {
                this.x = 202;
                this.y = 400;
            }
        })
    }

}

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面

// const enemy = new Enemy(0,(Math.floor(Math.random()*(230-60+1)+60)));
let allEnemies = [];

for (let x = 0; x < 5; x++) {
    let y = Math.floor(Math.random()*3)*83+65;
    let enemy = new Enemy(0,y);
    allEnemies.push(enemy);
}



// 把玩家对象放进一个叫 player 的变量里面

const player = new Player(202,400);



// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
