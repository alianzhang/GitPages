/**
 * Created by Administrator on 2016/9/29.
 */
$(function () {
    //鼠标移动到li标签上 隐藏i  显示span 和dl列表
    $(".header-right>ul>li").mouseenter(function () {
        var index = $(this).index();
        $(".header-right>ul>li").eq(index).find("i").stop().hide(200);
        $(".header-right>ul>li").eq(index).find("span").stop().show(200).css("color", "red");
        $(".header-right>ul>li").eq(index).find("dl").css("display", "block");
    });
    $(".header-right>ul>li").mouseleave(function () {
        var index = $(this).index();
        $(".header-right>ul>li").eq(index).find("i").stop().show(200);
        $(".header-right>ul>li").eq(index).find("span").stop().hide(200);
        $(".header-right>ul>li").eq(index).find("dl").css("display", "none");
    });
    var header = document.getElementById("header")
    document.onscroll = function () {
        if (scroll().top > header.offsetTop) {
            $(".header").addClass("fixed");
        } else {
            $(".header").removeClass("fixed");
        }
    }
    //轮播图代码
    var box = document.getElementById("banner");
    var lbt_ul = box.children[0].children[0];
    var ullist = lbt_ul.children;
    var ol = box.children[0].children[1];
    var ollist = ol.children;
    var picWid = box.children[0].offsetWidth;
    var lbt_arr = document.getElementById("arr");
    var right = document.getElementById("right");
    var left = document.getElementById("left");
    var count = 0;
    var timer = null;
    for (var i = 0; i < ullist.length; i++) {
        var li = document.createElement("li");
        li.innerHTML = i + 1;
        ol.appendChild(li);
    }
    var newli = lbt_ul.children[0].cloneNode(true);
    lbt_ul.appendChild(newli);
    ol.children[0].className = "current";
    for (var i = 0; i < ollist.length; i++) {
        ollist[i].index = i;
        ollist[i].onclick = function () {
            for (var j = 0; j < ollist.length; j++) {
                ollist[j].className = "";
            }
            this.className = "current";
            count = this.index;
            var target = -this.index * picWid;
            animate(lbt_ul, {"left": target}, function () {
                console.log(1);
            });
        }
    }
    box.onmouseover = function () {
        lbt_arr.style.display = "block";
        clearInterval(timer);
    }
    box.onmouseout = function () {
        lbt_arr.style.display = "none";
        timer = setInterval(next1, 2000);
    }
    right.onclick = function () {
        if (count == ullist.length - 1) {
            lbt_ul.style.left = 0 + "px";
            count = 0;
        }
        count++;
        var target = -count * picWid;
        animate(lbt_ul, {"left": target});
        for (var i = 0; i < ollist.length; i++) {
            ollist[i].className = "";
        }
        if (count == ollist.length) {
            ollist[0].className = "current";
        } else {
            ollist[count].className = "current";
        }
    }
    left.onclick = function () {
        if (count == 0) {
            lbt_ul.style.left = -(lbt_ul.offsetWidth - picWid) + "px";
            count = ullist.length - 1;
        }
        count--;
        var target = -count * picWid;
        animate(lbt_ul, {"left": target});
        for (var i = 0; i < ollist.length; i++) {
            ollist[i].className = "";
        }
        ollist[count].className = "current";
    }
    function next1() {
        right.click();
    }

    timer = setInterval(next1, 2000);
    //活动部分代码
    $('.activity a').mouseenter(function () {
        $(this).children('img').animate({width: '110%', "marginTop": "-5%", "marginLeft": "-5%"}, 200);
    });
    $('.activity a').mouseleave(function () {

        $(this).children('img').animate({width: $(this).parent().width(), "marginTop": "0", "marginLeft": "0"}, 200);
    });
    //时尚态度代码
    var config = [
        {
            width: 400,
            top: 20,
            left: 50,
            opacity: 0.2,
            zIndex: 2
        },//0
        {
            width: 600,
            top: 70,
            left: 20,
            opacity: 0.8,
            zIndex: 3
        },//1
        {
            width: 800,
            top: 100,
            left: 200,
            opacity: 1,
            zIndex: 4
        },//2
        {
            width: 600,
            top: 70,
            left: 580,
            opacity: 0.8,
            zIndex: 3
        },
        {
            width: 400,
            top: 20,
            left: 750,
            opacity: 0.2,
            zIndex: 2
        }
    ];
    var wrap = document.getElementById("wrap");
    var slide = wrap.children[0];
    var fashionul = slide.children[0];
    var arr = slide.children[1];
    var lis = fashionul.children;
    var arrLeft = document.getElementById("arrLeft");
    var arrRight = document.getElementById("arrRight");
    timer2 = setInterval(next, 2000);
    change();
    wrap.onmouseover = function () {
        animate(arr, {"opacity": 1});
        clearInterval(timer2);
    }
    wrap.onmouseout = function () {
        animate(arr, {"opacity": 0});
        timer2 = setInterval(next, 2000);
    }
    var flag = true;
    arrRight.onclick = function () {
        if (flag) {
            flag = false;
            var temp = config.shift();
            config.push(temp);
            change();
        }
    };
    arrLeft.onclick = function () {
        if (flag) {
            flag = false;
            var temp = config.pop();
            config.unshift(temp);
            change();
        }
    }
    function change() {
        for (var i = 0; i < config.length; i++) {
            //console.log(fashionul.children[i]);
            animate(fashionul.children[i], config[i], function () {
                flag = true;
            });
        }
    }

    function next() {
        arrRight.onclick();
    }

    //高端定制代码
    var advanced = document.getElementById("advanced");
    var ul = advanced.children[0];
    var lis = ul.children;
    for (var i = 0; i < lis.length; i++) {
        lis[i].style.left = i * 196 + "px";
        lis[i].index = i;
        lis[i].style.backgroundImage = "url(images/" + "photo-0" + (i + 1) + ".jpg)";
        lis[i].onmouseover = function () {
            for (var j = 0; j < lis.length; j++) {
                if (j <= this.index) {
                    animate(lis[j], {"left": 100 * j});
                }
                else {
                    animate(lis[j], {"left": 100 * j + 700});
                }
            }
        }
        lis[i].onmouseout = function () {
            for (var i = 0; i < lis.length; i++) {
                animate(lis[i], {"left": i * 196});
            }
        };
    }
    //客片大赏代码
    var enjoydatas = [
        {
            name: "海洋恋人",
            type: "TIME:2014-1-19"
        },
        {
            name: "喜欢一个人",
            type: "TIME:2014-12-3"
        },
        {
            name: "漂浮之爱恋",
            type: "TIME:2014-7-14"
        },
        {
            name: "私人订制",
            type: "TIME:2014-3-3"
        },
        {
            name: "最爱",
            type: "TIME:2014-8-4"
        },

        {
            name: "红色引力",
            type: "TIME:2015-11-12"
        },

        {
            name: "摩登大牌",
            type: "TIME:2014-7-22"
        },
        {
            name: "爱你",
            type: "TIME:2016-1-4"
        },
        {
            name: "咱们结婚吧",
            type: "TIME:2016-7-19"
        },
        {
            name: "三生树",
            type: "TIME:2016-6-27"
        },
    ];
    $("#enjoy-show").children("li").mouseenter(function () {
        $("#aa").remove();
        //for (var i = 0; i < enjoydatas.length; i++) {
        var str = "";
        str = "<div id='aa'><img src='images/img_hover.png'>" +
            "<span>" +
            enjoydatas[$(this).index()].name +
            "</span>" +
            "<i>" +
            enjoydatas[$(this).index()].type +
            "</i>" +
            "</div>";
        //}
        $(this).append(str);

        //$("#aa").show(1000);
    });
    $("#enjoy-show").children("li").mouseleave(function () {
        $("#aa").remove();
    });

    $("#view-more").click(function () {
        $(this).parent().css("height", "1200px");
        $(this).css("top", "20px");
        $("#enjoy-hide").show(1000);
        $(".duihuakuang").hide(1000);
    });
    $("#enjoy-top").click(function () {
        $(this).parent().parent().css("height", "760px");
        $("#enjoy-hide").hide(1);
        //$("#view-more").slideDown(1000);
        $("#view-more").animate({"top": "1300px"}, function () {
            $("#view-more").animate({"top": "700px"}, function () {
                $("#view-more").animate({"top": "730px"}, function () {
                    var duihuak = document.createElement("div");
                    duihuak.className = "duihuakuang";
                    duihuak.innerHTML = "不好意思 刚才跑过了"
                    $(".enjoy-photo").append(duihuak);
                    $(".duihuakuang").click(function () {
                        $(this).hide(1000);
                    });
                });
            });
        });
    })

//客片大赏 view more 部分
    $("#enjoy-hide>li>a").mouseenter(function () {
        $("#ff").remove();
        console.log(1);
        str = "<div id='ff'>" +
            "<span>" +
            "</span>" +
            "<i>" +
            "</i>"
        "</div>";
        $(this).append(str);
        $(this).find("span").stop().animate({"opacity": "1", "left": "60px"}, 600);
        $(this).find("i").stop().animate({"opacity": "1", "right": "60px"}, 600);
        $(this).stop().animate({"top": "5px"}, 400)
    });
    $("#enjoy-hide>li>a").mouseleave(function () {
        $("#ff").remove();
        $(this).stop().animate({"top": "30px"}, 400)
    });
//粉丝社区部分
    $("#fans-photo .fans-l").mouseenter(function () {
        $(this).css("opacity", 1).siblings().css("opacity", 0.6)
        $("#bb").remove();
        var str = "";
        str = "<div id='bb'>" +
            "<span>" +
            " 每日花絮" +
            "</span>" +
            "<i>" +
            "客照花絮欣赏" +
            "</i>" +
            "<s>点击率：9999 回复 100</s>"
        "</div>";
        $(this).append(str);
    });
    $("#fans-photo .fans-r").mouseenter(function () {
        $(this).css("opacity", 1).siblings().css("opacity", 0.6)
        $("#cc").remove();
        var str = "";
        str = "<div id='cc'>" +
            "<span>" +
            " 每日花絮" +
            "</span>" +
            "<i>" +
            "客照花絮欣赏" +
            "</i>" +
            "<s>点击率：9999 回复 100</s>"
        "</div>";
        $(this).append(str);
    });
    $("#fans-photo .fans-t-l").mouseenter(function () {
        $(this).css("opacity", 1).siblings().css("opacity", 0.6)
        $("#dd").remove();
        var str = "";
        str = "<div id='dd'>" +
            "<span>" +
            " 每日花絮" +
            "</span>" +
            "<i>" +
            "客照花絮欣赏" +
            "</i>" +
            "<s>点击率：9999 回复 100</s>"
        "</div>";
        $(this).append(str);
    });
    $("#fans-photo .fans-t-r").mouseenter(function () {
        $(this).css("opacity", 1).siblings().css("opacity", 0.6);
        $("#ee").remove();
        var str = "";
        str = "<div id='ee'>" +
            "<span>" +
            " 每日花絮" +
            "</span>" +
            "<i>" +
            "客照花絮欣赏" +
            "</i>" +
            "<s>点击率：9999 回复 100</s>"
        "</div>";
        $(this).append(str);
    });
    $("#fans-photo>li").mouseleave(function () {
        $(this).parent().children().css("opacity", 1);
        $("#bb").remove();
        $("#cc").remove();
        $("#dd").remove();
        $("#ee").remove();
    })


    //返回顶部
    document.onscroll = function () {
        if (scroll().top > 200) {
            $(".go-top").show(1);
            $(".qq").stop().animate({"opacity":1});
            $(".phone").stop().animate({"opacity":1});
        } else {
            $(".go-top").hide(1);
            $(".qq").stop().animate({"opacity":0});
            $(".phone").stop().animate({"opacity":0});
        }
    }
    $(".go-top>a").mouseenter(function () {
        $(this).css("background", "url(images/gotopd.gif) no-repeat");
    });
    $(".go-top>a").mouseleave(function () {
        $(this).css("background", "url(images/gotop.png)");
    });
    $(window).scroll(function () {
        if ($(window).scrollTop() > 100) {
            $(".go-top>a").fadeIn(1);
        } else {
            $(".go-top>a").fadeOut(1);
        }
    });
    $(".go-top").click(function () {
        $('html,body').animate({scrollTop: '0px'}, 800);
    }); //火箭动画停留时间，越小消失的越快~


    //左侧固定栏

    $(".qq").mouseenter(function () {
        $(this).stop().animate({"width":"200px"}).css("background-color","#D62010");
    });
    $(".qq").mouseleave(function () {
       $(this).stop().animate({"width":"45px"}, function () {
           $(this).css("background-color","#DEDEDE")
       });
    });
    $(".phone").mouseenter(function () {
        $(this).stop().animate({"width":"200px"}).css("background-color","#D62010");
    });
    $(".phone").mouseleave(function () {
        $(this).stop().animate({"width":"45px"}, function () {
            $(this).css("background-color","#DEDEDE");
        });
    });


    //鼠标样式
    var stararr = ["#FFFC82", "#B8F1FD", "#ADF1B9", "#C99BDC", "#FFACFC"];

    document.onmousemove = function (e) {
        var star = document.createElement("div");
        star.className = "star";
        var num = Math.floor(Math.random() * 5);
        star.style.backgroundColor = stararr[num];
        document.body.appendChild(star);

        star.style.left = getPageX(e) + Math.random() * 50 - 20 + "px";
        star.style.top = getPageY(e) + Math.random() * 50 - 20 + "px";
        $(star).animate({
            "width": 0,
            "height": 0
        }, 500, function () {
            $(star).remove();
        });
    };
    function getPageX(e) {
        //获取鼠标针对可视区域的位置
        var x = e.clientX;
        return scroll().left + x;

    }


    function getPageY(e) {
        //获取鼠标针对可视区域的位置
        var y = e.clientY;
        return scroll().top + y;

    }

    function scroll() {
        return {
            top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
            left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
        };
    }

    function animate(tag, obj, fn) {
        clearInterval(tag.timer);
        tag.timer = setInterval(function () {
//            k----属性名----attr
//            obj[k]---属性值----target
            var flag = true;
            for (k in obj) {
                if (k == "opacity") {
                    var leader = getStyle(tag, k) * 100;
                    var target = obj[k] * 100;
                    var step = (target - leader) / 10;
                    step = target > leader ? Math.ceil(step) : Math.floor(step);
                    leader += step;
                    tag.style[k] = leader / 100;
                } else if (k == "zIndex") {
                    tag.style.zIndex = obj[k];
                } else {
                    var leader = parseInt(getStyle(tag, k)) || 0;
                    var target = obj[k];
                    var step = (target - leader) / 10;
                    step = target > leader ? Math.ceil(step) : Math.floor(step);
                    leader += step;
                    tag.style[k] = leader + "px";
                }
                if (target != leader) {
                    flag = false;
                }
            }
            if (flag) {
                clearInterval(tag.timer);
                if (typeof fn == "function") {
                    fn();
                }
            }
        }, 17)
    }

    function getStyle(tag, attr) {
        return tag.currentStyle ? tag.currentStyle[attr] : getComputedStyle(tag, null)[attr];
    }
})
;