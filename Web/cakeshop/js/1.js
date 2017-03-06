window.onload=function(){
	//二级菜单
	$(function(){
			$('#xiala').hover(function(){
					$('#xiala ul').css('display','block')
			},function(){
					$('#xiala ul').css('display','');
			})
			$('#xiala2').hover(function(){
					$('#xiala2 ul').css('display','block')
			},function(){
					$('#xiala2 ul').css('display','');
			})
			//点击关闭
		$('#showpic_top_x').click(function(){
			$('#showpic_top').css('display','none');
		})
		//大图轮播淡入淡出效果 
		var size=$('#showpic img').size();
		var index=size;
		$('#showpic img').append($('#showpic img:eq(0)')).clone();
		function play(){
			var timer=null;
			timer=setInterval(function(){
				$('#showpic img').eq(index).fadeOut(800);
				index==1?index=size:index--;
				$('#showpic img').eq(index).fadeIn(800);
			},2000)
		}
		play();
	})
	//大图轮播
	// var ullist=document.getElementById('showpic_ul');
	// var imglist=ullist.getElementsByTagName('li');
	// 	function play(no){
	// 		for(i=0;i<imglist.length;i++){
	// 			if(i==no){
	// 				imglist[i].className='on';
	// 			}else{
	// 				imglist[i].className='';
	// 			}
	// 		}
	// 	}
	// 	function autoplay(){
	// 		var num=1;
	// 	var xh=setInterval(function(){
	// 			play(num);
	// 			num++;
	// 			if(num>=imglist.length){
	// 				num=0;
	// 			}
	// 		},1000)
	// 	}
	// 	play(0);
	// 	autoplay();
	//品牌动态选项卡效果
	 function run(){
		var top=document.getElementById('list-two-four');
		var top_t=top.getElementsByTagName('span');
		var bottom=document.getElementById('list-two-bottom');
		var bottom_b=bottom.getElementsByTagName('ul');
		var len=top_t.length;
			for(i=0;i<len;i++){
				top_t[i].index=i;
				top_t[i].onmouseover=function(){
					for(i=0;i<len;i++){
						top_t[i].className='';
						bottom_b[i].className='hide';
					}
					top_t[this.index].className='act';
					top_t[this.index].style.background='#4b382e';
					bottom_b[this.index].className='';
				}
				top_t[i].onmouseout=function(){
					top_t[this.index].style.background='#f8c400';
				}
			}
	}
	run();

	//轮播图效果
	var odiv=document.getElementById('product-pic');
	var oul=odiv.getElementsByTagName('ul')[0];
	var oli=oul.getElementsByTagName('li');
	var left=document.getElementById('left');
	var right=document.getElementById('right');
	var speed=2;
		oul.innerHTML=oul.innerHTML+oul.innerHTML;
		oul.style.width=oli[0].offsetWidth*oli.length+'px';
		function move(){
			oul.style.left=oul.offsetLeft+speed+'px';
			if(oul.offsetLeft<-oul.offsetWidth/2){
				oul.style.left='0px';
			}
			if(oul.offsetLeft>0){
				oul.style.left=-oul.offsetWidth/2+'px';
			}
		};
		var a=setInterval(move,40);
		oul.onmouseover=function(){
			clearInterval(a);
			left.style.display='block';
			right.style.display='block';
			left.setAttribute('class','left');
			right.setAttribute('class','right');
		}
		oul.onmouseout=function(){
			a=setInterval(move,40);
			left.style.display='';
			right.style.display='';
		}
		left.onmouseover=function toBlock(){
			left.style.display='block';
			right.style.display='block';
		}
		right.onmouseover=function toBlock(){
			left.style.display='block';
			right.style.display='block';
		}
		left.onclick=function(){
			speed=-2;
			}
		right.onclick=function(){
				speed=2;
			}
	//选项卡效果
	function tab(){
		var right=document.getElementById('store-pic-right');
		var right_div1=right.getElementsByTagName('div');
		var left=document.getElementById('store-pic-left');
		var left_img=left.getElementsByTagName('img');
		var len=right_div1.length;
		for(i=0;i<len;i++){
			right_div1[i].index=i;
			right_div1[i].onmouseover=function(){
				for(i=0;i<len;i++){
					right_div1[i].className='';
					left_img[i].className='hide';
				}
				right_div1[this.index].className='';
				left_img[this.index].className='';
			}
		}
	}
	tab();
};