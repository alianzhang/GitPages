/*
* @Author: Administrator
* @Date:   2016-11-25 12:40:38
* @Last Modified by:   Administrator
* @Last Modified time: 2016-11-25 16:33:09
*/
window.onload=function(){
	var cas = document.getElementById("c1");
    var ctx = cas.getContext("2d");

    var img = new Image();
    img.src = "imgs/NPCrabbitbaby.png";
img.onload =function () {
        //设定要显示在画布上的图片的大小
        var picWidth = img.width / 4;
        var picHeight = img.height /4;
        // 设定图片在画布的起始位置
        var x = (cas.width - picWidth)/2;
        var y = (cas.height - picHeight)/2;
        //设定每步的大小，以及起始移动的方向
        var yStep = 8;
        var yDirection = 1;
        var xStep = 8;
        var xDireciton = 1;

        var direction = 0; // 方向分别为 0上 1下 2左 3右
        //drawImage(img, x, y, w, h, x1, y1, w1, h1)
        //将图片的x，y, w,h这个位置绘制到 canvas的 x1,y1,w1,h1这个位置
        ctx.drawImage(img, 0, 0, picWidth, picHeight, x, y,picWidth,picHeight);

        var xIndex = 0;//记录横方向上的图片索引
        var yIndex = 0;//记录纵方向上的图片索引
        //此部分代码用来控制小人在不同方向移动时显示的图片
        function move(){
                if(++xIndex > 3){
                    xIndex = 0;
                }
                var picX = picWidth * xIndex;
                var picY = picHeight * yIndex;

                switch (direction){
                    case 0:
                        y -= yStep;//向上移动
                        yIndex = 3;//显示小人背面图
                        break
                    case 1:
                        y += yStep;//向下移动
                        yIndex = 0;//显示小人正面图
                        break
                    case 2:
                        x -= xStep;//向左移动
                        yIndex = 1;//显示小人左侧面图

                        break
                    case 3:
                        x += xStep;//向右移动
                        yIndex = 2;//显示小人右侧面图
                        break

                }
                //边界判断
                if(x>cas.width - picWidth){
                    x=cas.width - picWidth;
                    alert("哎呀，没路了");
                }
                if(x<0){
                    x=0;
                    alert("呜呜，迷路了");
                }
                if(y > cas.height - picHeight){
                    y=cas.height - picHeight;
                    alert("我去，都撞墙啦");
                }
                if(y < 0){
                    y=0;
                    alert("嘤嘤，放我出去");
                }
                //清空画布
                ctx.clearRect(0,0, cas.width, cas.height);
                ctx.drawImage(img, picX, picY, picWidth, picHeight, x, y,picWidth,picHeight);
        }
        // 添加键盘控制事件
        document.onkeypress = function (e) {
            //119 up
            //115 down
            //97  left
            //100 right
            console.log(e.keyCode);
            switch (e.keyCode){
                case 119:
                    //向上移动
                        direction = 0;
                        move();
                    break;
                case 115:
                    //向下移动
                        direction = 1;
                         move();

                    break;
                case 97:
                    //向左移动
                        direction = 2;
                         move();

                    break;
                case 100:
                    //向右移动
                        direction = 3;
                        move();
                    break;
            }
        }


    }
}
