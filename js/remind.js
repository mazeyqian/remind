'use strict';
/*
 DONE 1 点击四个部分分别计算四个部分的高度
 TODO 2 有精力尝试下用js动画效果，练习操作dom
 TODO 计算最小高度，若计算的高度小于最小高度则设为最小高度
 * */
//防止运营商劫持
if(window.top !== window.self){ //若自身窗口不等于顶层窗口
    window.top.location.href = window.self.location.href + '?act=jump'; //顶层窗口跳转到自身窗口
}
//全局变量
//设备高度 - 暂时无效 - TODO 视情况删除
const CLIENT_HEIGHT = document.documentElement.clientHeight;
//最小高度
let minHeight = CLIENT_HEIGHT;
//可视窗口
const main = document.getElementsByClassName('main')[0];
//装四个盒子的大盒子，宽度 = 可视窗口 * 4，左右移动
const mainBody = document.getElementsByClassName('main-body')[0];
//四个盒子
const remindBody = document.getElementsByClassName('remind-body')[0];
const robotBody = document.getElementsByClassName('robot-body')[0];
const cookBody = document.getElementsByClassName('cook-body')[0];
const userBody = document.getElementsByClassName('user-body')[0];
const bodyObj = document.getElementsByTagName('body')[0];
//底部导航图标组
const remindIcon = document.getElementById('remind-icon');
const robotIcon = document.getElementById('robot-icon');
const cookIcon = document.getElementById('cook-icon');
const userIcon = document.getElementById('user-icon');
//延迟时间
const timeDelay = 500;
//click/touch事件
const EVENTMZ = 'click'; //'click' 'touchstart'
//ICON
const ICON_FA_CORRECT = 'fa-check';
const ICON_FA_ERROR = 'fa-times';
//class
const ICON_FEED_CORRECT = 'has-success';
const ICON_FEED_ERROR = 'has-error';
//机器君
const ROBOT_BODY_BODY = document.getElementsByClassName('robot-body-body')[0];
const ROBOT_BODY_FOOTER = document.getElementsByClassName('robot-body-footer')[0];
const ROBOT_BODY_FOOTER_HEIGHT = ROBOT_BODY_FOOTER.offsetHeight;
let robotBodyBodyHeight;

//加载
window.onload = function(){
    //初始化界面 - body上下内边距
    resetBodyPadding();
    //初始化界面 - remindBody高度
    resetBodyHeight(remindBody);
    //初始化界面 - robotBodyBody高度
    resetRobotBodyBodyHeight();
    //测试用户界面，之后删除
    tabRemindToOthers(robotIcon,'-100%');
    resetBodyHeight(robotBody);
    //移动
    remindIcon.addEventListener(EVENTMZ, function(){
        tabRemindToOthers(this,'0%');
        setTimeout('resetBodyHeight(remindBody)', timeDelay); //延迟0.5秒执行，与css transition一致
    });
    robotIcon.addEventListener(EVENTMZ, function(){
        tabRemindToOthers(this,'-100%');
        setTimeout('resetBodyHeight(robotBody)', timeDelay);
    });
    cookIcon.addEventListener(EVENTMZ, function(){
        tabRemindToOthers(this,'-200%');
        setTimeout('resetBodyHeight(cookBody)', timeDelay);
    });
    userIcon.addEventListener(EVENTMZ, function(){
        tabRemindToOthers(this,'-300%');
        setTimeout('resetBodyHeight(userBody)', timeDelay);
    });
}

//更新机器聊天内容高度
function resetRobotBodyBodyHeight(){
    robotBodyBodyHeight = (minHeight - ROBOT_BODY_FOOTER_HEIGHT) + 'px';
    ROBOT_BODY_BODY.style.height = robotBodyBodyHeight;
    console.log('Reset robot body body\'s height to ' + robotBodyBodyHeight + ' successfully!');
}
//根据导航高度更新body padding
function resetBodyPadding(){
    //上下导航高度
    var navbarHeight = document.getElementsByClassName('navbar')[0].offsetHeight,
    newPadding = navbarHeight + 'px 0';
    bodyObj.style.padding = newPadding;
    console.log('Reset body\'s padding to ' + newPadding + ' successfully!');
    //初始化最小高度
    minHeight -= navbarHeight * 2;
}

//更新mainBody窗口高度
function resetBodyHeight(obj){
    var myArr = getClassObj(obj,'container-fluid'), //获取对象指定class子元素数组
    nowHeight = 0,
    extraHight = 0;
    for(var i = 0; i < myArr.length; i++){ //计算子元素高度和
        nowHeight += myArr[i].offsetHeight;
    }
    if(obj === remindBody){ //提醒君加间隙高度
        extraHight = (myArr.length - 1) * 3; //因为部分元素有3px的上下margin，预留空隙
    }
    nowHeight += extraHight;
    nowHeight = (nowHeight >= minHeight ? nowHeight : minHeight) + 'px';
    main.style.height = nowHeight;
    mainBody.style.height = nowHeight;
    console.log('Reset inner body\'s height to ' + nowHeight + ' successfully!');
}

//点击移动主体
function tabRemindToOthers(obj,offset){
    var that = obj,
    cls = 'active',
    objParent = that.parentNode, //li父元素ul
    objParentList = objParent.childNodes; //ul子元素li数组
    for(var i = 0; i < objParentList.length; i++){
        if(objParentList[i].nodeName.toLowerCase() === 'li'){ //ul子元素Name li
            var thisLi = objParentList[i];
            if(hasCls(thisLi, cls)){ //若有此class则移除
                if(thisLi === that){ //若重复点击退出
                    console.log('You click me again!');
                    return;
                }
                removeCls(thisLi,cls); //否则移除class
                break;
            }
        }
    }
    addCls(that, cls); //点击元素添加cls
    mainBody.style.left = offset;
    console.log('Move inner body\'s left to ' + offset + ' successfully!');
}

/*
*通过父级和子元素的class类 获取该同类子元素的数组
*/
function getClassObj(parent,className){
    var obj=parent.getElementsByTagName('*');//获取 父级的所有子集
    var pinS=[];//创建一个数组 用于收集子元素
    for (var i=0;i<obj.length;i++) {//遍历子元素、判断类别、压入数组
        if (obj[i].className.indexOf(className) > -1){
            pinS.push(obj[i]);
        }
    };
    return pinS;
}
//getClassObj(remindBody,'container-fluid');

//jQuery hasClass
function hasCls(obj, cls){
    var oriCls = obj.className, //获取对象的class值
    oriClsArr = oriCls.split(/\s+/); //分隔空格转换成数组
    for(var i = 0; i < oriClsArr.length; i++){
        if(oriClsArr[i] === cls){
            return true; //若匹配到class则返回True
        }
    }
    return false; //否则返回False
}
//hasCls(remindIcon, 'text-center');

//jQuery addClass
function addCls(obj, cls){
    var oriCls = obj.className, space = '', newCls; //获取对象的class值
    if(oriCls !== ''){
        space = ' '; //若原来的class不为空，跟一个空格
    }
    newCls = oriCls + space + cls; //将新的class加进去
    obj.className = newCls; //替换新class
}
//addCls(remindIcon, 'active');

//jQuery removeClass
function removeCls(obj, cls){
    var oriCls = obj.className, newCls; //获取对象的class值
    newCls = ' ' + oriCls + ' '; //前后加空格
    newCls = newCls.replace(/(\s+)/gi, ' '); //将多余的空格替换成一个空格
    newCls = newCls.replace(' ' + cls + ' ', ' '); //将加了前后空格的cls替换成空格' '
    newCls = newCls.replace(/(^\s+)|(\s+$)/g, ''); //去掉前后空格
    obj.className = newCls;
}
//removeCls(remindIcon, 'text-center');

//layer
document.getElementById("t1").addEventListener('click', function(){
    layer.open({
      style: 'border:none; background-color:#78BA32; color:#fff;',
      content:'内容'
    });
});

document.getElementById("t2").addEventListener('click', function(){
    openPageToChooseTime();
});

//打开日期选择页面
function openPageToChooseTime(){
    layer.open({
      type: 1
      ,content: document.getElementById('choose-time-content').innerHTML
      //'<div class=\"layui-m-layercont\">  <div style=\"padding:20px;\"><p style=\"margin-bottom: 20px;\">仿佛是一个全新的页面</p><a href=\"javascript:;\" class=\"button\" onclick=\"layer.closeAll(); layer.open({content:\'世界恢复原样 →_→\', time:2});  \">我要关闭！！</a></div></div>'
      ,anim: 'up'
      ,style: 'position:fixed; left:0; top:0; width:100%; height:100%; border: none; -webkit-animation-duration: .5s; animation-duration: .5s;'
      //,time:2
    });
}
//openPageToChooseTime();


//Bootstrap JavaScript
$(function(){
    $('.nav-tabs>li>a').click(function(e){
        e.preventDefault();
        $(this).tab('show');
    });
})

//正则验证
function checkByReg(str, reg){
    let regExp = new RegExp(reg);
    if(regExp.test(str)){
        return true;
    }else{
        return false;
    }
}

//验证目标
function checkThis(domEle,reg){
    let thisVal = $(domEle).val();
    if(checkByReg(thisVal, reg)){
        changeToSuccess(domEle);
        return true;
    }else{
        changeToError(domEle);
        return false;
    }
}

//显示正确
function changeToSuccess(domEle){
    $(domEle).next().removeClass(ICON_FA_ERROR);
    $(domEle).next().addClass(ICON_FA_CORRECT);
    $(domEle).next().parent().removeClass(ICON_FEED_ERROR);
    $(domEle).next().parent().addClass(ICON_FEED_CORRECT);
}

//显示错误
function changeToError(domEle){
    $(domEle).next().removeClass(ICON_FA_CORRECT);
    $(domEle).next().addClass(ICON_FA_ERROR);
    $(domEle).next().parent().removeClass(ICON_FEED_CORRECT);
    $(domEle).next().parent().addClass(ICON_FEED_ERROR);
}

//添加事件监听
//帐号
document.getElementsByName('username')[0].addEventListener('blur', function(){
    checkThis(this,'^[0-9a-zA-Z_]{2,20}$');
});
//密码
document.getElementsByName('password')[0].addEventListener('blur', function(){
    checkThis(this,'^[0-9a-zA-Z_]{6,20}$');
});
