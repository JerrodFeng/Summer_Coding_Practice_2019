speller={
    init:function(n){
        this.hard=n;
        this.step=0;
        this.useTime=0;
        this.blank=(n==21)?8:14;
        this.createGrid();
        clearInterval(this.timer);
        this.timer=setInterval(function () {
            speller.useTime++;
            document.getElementById("times").innerHTML=('0'+parseInt(speller.useTime/60)).slice(-2)+':'+('0'+speller.useTime%60).slice(-2);
        },1000)
    }
    ,createGrid:function(){
        if(this.hard==21){
            var X=function(n){
                return n%3*100;
            }
            var Y=function(n){
                return parseInt(n/3)*100;
            }
            for(var i=0,html=[];i<9;i++){
                html.push('<p onClick="speller.move(this);" id="'+i+'" class="'+i+'" style="left:'+X(i)+'px;top:'+Y(i)+'px;background-position:-'+X(i)+'px -'+Y(i)+'px;"></p>')
            }
            document.getElementById("shell").innerHTML=html.join('');
            this.ran();
        }else{
            var X=function(n){
                return n%5*100;
            }
            var Y=function(n){
                return parseInt(n/5)*100;
            }
            for(var i=0,html=[];i<15;i++){
                html.push('<p onclick="speller.move(this);" id="'+i+'" class="'+i+'" style="left:'+X(i)+'px;top:'+Y(i)+'px;background-position:-'+X(i)+'px -'+Y(i)+'px;"></p>');
            }
            document.getElementById("shell").innerHTML=html.join('');//将图块布局到页面中
            this.ran();
        }

    }
    ,ran:function(p){
        var ps=document.getElementById("shell").getElementsByTagName("p");
        var l=ps.length;
        var me=this;
        ps[this.blank].style.display="none";
        var en=function (n) {
            var arr=[];
            if(me.hard==21){
                if(n<8 && n%3!=2){
                    arr.push(n+1);
                }
                if(n>0 && n%3!=0){
                    arr.push(n-1);
                }
                if(n>2){
                    arr.push(n-3);
                }
                if(n<6){
                    arr.push(n+3);
                }
            }else{
                if(n<14 && n%5!=4){
                    arr.push(n+1);
                }
                if(n>0 && n%5!=0){
                    arr.push(n-1);
                }
                if(n>4){
                    arr.push(n-5);
                }
                if(n<10){
                    arr.push(n+5);
                }
            }
            return arr[parseInt(Math.random()*arr.length)]*1;
        }
        var getp=function (n) {
            for(var i=0;i<l;i++){/////////////////
                if(ps[i].className==n){
                    return ps[i];
                }
            }
        }
        for(var i=0;i<me.hard;i++){
            this.move2(getp(en(this.blank*1)));
        }
    }
    ,move2:function (p) {
        var pos=p.className*1, POS=this.blank*1, abs=Math.abs(pos-POS), max=pos>POS?pos:POS;
        if(this.hard==21){
            p.style.top=parseInt(POS/3)*100+"px";
            p.style.left=POS%3*100+"px";
            p.className=POS;
            this.blank=pos;
        }else {
            p.style.top=parseInt(POS/5)*100+"px";
            p.style.left=POS%5*100+"px";
            p.className=POS;
            this.blank=pos;
        }
    }
    ,move:function (p) {
        var pos=p.className*1;
        var POS=this.blank*1;
        var abs=Math.abs(pos-POS);
        var max=pos>POS?pos:POS;
        if(this.hard==21){
            if(abs==3){
                p.style.top=parseInt(POS/3)*100+"px";
            }else if(abs==1&&max%3!=0){
                p.style.left=POS%3*100+"px";
            }else{return;}
        }else{
            if(abs==5){
                p.style.top=parseInt(POS/5)*100+"px";
            }else if(abs==1&&max%5!=0){
                p.style.left=POS%5*100+"px";
            }else{return;}
        }
        p.className=POS;
        this.blank=pos;
        document.getElementById("steps").innerHTML=++this.step;
        if(this.check()){
            if(this.hard==21){
                var last=document.getElementById("shell").getElementsByTagName("P")[8];//获取最后一块拼图
            }else{
                var last=document.getElementById("shell").getElementsByTagName("P")[14];//获取最后一块拼图
            }
            last.style.display="block";
            alert('你成功了!再来一次吧!');
            this.init(document.getElementById("hard").value);
        }
    }
    ,check:function(){
        var p=document.getElementById("shell").getElementsByTagName("p");
        for(var i=0, l=p.length;i<l;i++){
            if(p[i].className!=p[i].id){
                return false;
            }
        }

        return true;
    }
}

speller.init(document.getElementById("hard").value);
document.getElementById("showall").onclick=function(){
    document.getElementById("show").style.display=document.getElementById("show").style.display=="none"?"":"none";
}

document.getElementById("hard").onchange=function(){
    speller.init(this.value);
    if(this.value==21){
        document.getElementById("shell").style.width=299;
        document.getElementById("show").style.width=299;
    }else{
        document.getElementById("shell").style.width=499;
        document.getElementById("show").style.width=499;
    }
}
