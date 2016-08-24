function myReady(fn){
	//1.对于现代浏览器，我们就用addEventListener
	if(document.addEventListener){
		document.addEventListener("DOMContentLoaded",fn,false);

	}else{
		//自己模拟一个
		IEContentLoaded(fn);
	}
	function IEContLoaded(fn){
		var isdone=false;
		//保证fn只执行一次
		function ainit(){
			if(Boollean(!isdone)){    //跟!isdone==true  是等价的
				isdone=true;
				fn();       
			}
		}
		//函数的自调用
		(function(){
			try{
				//如果DOM没有加载完毕，调用doScroll会报错
				document.documentElement.doScroll("left");

			}catch(e){
				//catch(error)没加载完会报错
				alert(e);
				//出错，意味着dom树没有加载完毕
				//延迟再试一次   调用延迟，直接跳过
				setTimeout(arguments.Callee,10);
				//　arguments.callee表示引用当前正在执行的函数，或者说是调用arguments.callee的
				//　函数对象的引用，它给匿名函数提供了一种自我引用的方式。
				return;
			}
			//代表doScroll没有报错了，DOM树加载完毕了
			ainit();
		})();

		//监听document的加载状态
		document.onreadystatechange=function(){
			if(document.readyState=="complete"){
				//说明DOM加载完毕
				ainit();
			}
		}
	}
}