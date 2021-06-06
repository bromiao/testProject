/*
 * 全站公共脚本,基于jquery-1.9.1脚本库
 */
$(function() {
	$(".open").on("tap",function(event){
		event.preventDefault();
		if ( !$(this).hasClass("opend") ){
			$(this).addClass("opend");
			setTimeout(function(){
				document.getElementById("shade").style.display = "none";
			},800)
		}
	})
	//提现
	$(document).on("tap",".take-money",function(event){
		event.preventDefault();
		$(".share").show();
		$("#open-red").hide();
		$("#shade").show();
		setTimeout(function(){
			window.location.href = "http://www.baidu.com/";
		},2000)
	})
	//举报
	$(document).on("tap",".report",function(event){
		event.preventDefault();
		$(".report-wrap").show();
	})
	$(document).on("submit",".report-wrap",function(event){
		event.preventDefault();
		$(".report-wrap").hide();
		$(".report-finish").show();
	})
	
	//单选多选美化
		$(":input[type=radio]").parent().each(function(){
			$(this).hradio();
		})
	if ( $(".seek-help").length ){
		$(".share").show();
		$("#shade").show();
	}
})