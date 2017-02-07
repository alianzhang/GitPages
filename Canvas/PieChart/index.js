/*
* @Author: Administrator
* @Date:   2016-11-25 12:40:38
* @Last Modified by:   Administrator
* @Last Modified time: 2016-11-25 12:43:46
*/
window.onload=function(){
	var cas=document.getElementById('c1');
    // 通过canvas标签对象去获取画图工具  RenderContext2D
    var ctx=cas.getContext("2d");
    // getRadian是一个通过角度获取弧度值的函数
    function getRadian(angle){
      return angle / 180 * Math.PI;
    }
    //getRadian是用来随机生成一个0-255的数字，用它来产生一个随机色
    function getRandom(){
        return parseInt(Math.random() * 255);
    }
     //确定中心点，半径和绘制的起始位置
     var x=cas.width/2;
     var y=cas.height/2;
     var r=100;
     var startAngle=-90;

     
     var padding=20;
     var textXOffset=0;
     var textYOffset=-5;


     var sum=0;
     var data=[293,167,95,696,300,234,109,492];

     /*forEach
        是数组的一个方法，用来遍历数组中的每一个元素，并执行一个回调函数
        语法: 数组名.forEach(callback)
        callback有三个形参
            1.currentElement   当前正在遍历的元素
            2.currentIndex 当前正在遍历的元素的索引
            3.array    当前正在被遍历的数组本身
            4.如果forEach的回调函数中有返回值，会将返回值直接替换到该数组中*/
     //循环遍历数组中的所有数据，求出总和
     data.forEach(function(v,i){
         sum+=v;
     });

      /*map
        是数组的一个方法，用来遍历数组中的每一个元素，并执行一个回调函数
        语法: 数组名.map(callback)
        map有三个形参
        1.currentElement   当前正在遍历的元素
        2.currentIndex 当前正在遍历的元素的索引
        3.array    当前正在被遍历的数组本身
        4.如果map的回调函数中有返回值，会将所有的返回值，重新的组合成一个数组，作为map的返回值*/
    //遍历map中的每一个数据并求出每个数据占总数据的比值后再求出在圆形中所占的比例，并将结果存储到rData中
     var rData=data.map(function(v, i) {
         return 360*v/sum;
     })
     
     rData.forEach(function(v,i){
        ctx.beginPath();
        var color="rgb("+getRandom()+","+getRandom()+","+getRandom()+")";
        ctx.fillStyle=color;
        ctx.moveTo(x, y);
        //arc画圆弧
	    //x, y 表示圆心的坐标
	    //r，  表示弧的半径
	    //starAngle 开始的角度
	    //endAngle  结束的角度
	    //flag     是否逆时针方向绘制   可选的
        ctx.arc(x, y, r, getRadian(startAngle), getRadian(startAngle+v));
        ctx.fill();//填充内部空间
        //画穿过扇形中心的线
        ctx.beginPath();
        ctx.moveTo(x, y);
        //先找到要在圆外面绘制文字的那个折线点
        var x1=x+(r+padding)*Math.cos(getRadian(startAngle+v/2));
        var y1=y+(r+padding)*Math.sin(getRadian(startAngle+v/2));
        ctx.strokeStyle=color;
        ctx.lineTo(x1, y1);
        ctx.font="14px 微软雅黑";
        //要绘制的文本在我们原来的数组data中
        //这里不能直接获取，只能通过当前的索引i 去data数组中查找 data[i]
        //对要绘制的文本进行宽度测量
        var textWidth=ctx.measureText(data[i].toString());
        //画显示文字用的横线
        //判断要绘制的坐标点是在圆的左半边还是右半边
        if (x1<x) {
        	//如果是左半边，那么画线的方向就变为向左，所以x坐标要减小
            ctx.lineTo(x1-textWidth.width, y1);
            //如果是左半边，那么画文字的起始位置，要向左边移动文字的宽度
            ctx.fillText(data[i].toString(), x1+textXOffset-textWidth.width, y1+textYOffset);
        }else{
        	//如果是右边，那么画线的方向就是向右的，直接给x加文本的宽度就好了
            ctx.lineTo(x1+textWidth.width, y1);
            //如果是右边，文本的绘制起始点也就不用做多的处理，直接写
            ctx.fillText(data[i].toString(), x1+textXOffset, y1+textYOffset);
        }

        ctx.stroke();//stroke是描边

        startAngle+=v;
     })
}
