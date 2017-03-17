$(document).ready(function(){
	// для обоих ползунков добавляем в начало и в конец значения min и max
	$('input[type="range"]').each(function(){
		var min=$(this).attr('min');
		var max=$(this).attr('max');
		$(this).before('<span class="num">'+razr(min)+'</span>');
		$(this).after('<span class="num">'+razr(max)+'</span>');
	})

	// при вводе значений в одно из 4 полей (2 ползунка и 2 текстовых поля) запускаем расчет
	$('body').on('input','.credit, .time',function(){
		// получаем все необходимые значения элемента
		var value=$(this).val();
		var classname=$(this).attr('class');

		// подставляем такое же значение в аналогичный input
		$('.'+classname+'').each(function(){
			$(this).val(value);
		})

		// расчет
		var credit = $('.credit').val(); // S - первоначальная сумма кредита
    	credit=+credit;
    	var time = $('.time').val(); // N - количество месяцев
    	time=+time;
    	var per_month = 18/12/100 // P - процент за месяц
    	var result = 1+per_month;
    	result=Math.pow(result,time);

    	result=result-1;
    	result=per_month/result;
    	result=per_month+result;
    	result=credit*result;
    	result=result.toFixed(0);
    	$('#result').text( razr(result) );

    	// склонения валюты в зависимости от последней цифры числа
    	if(result.substr(-1)=='1'){
    		currency = 'рубль';
    	}else if( result.substr(-1)=='2' || result.substr(-1)=='3' || result.substr(-1)=='4' ){
    		currency = 'рубля';
    	}else{
    		currency = 'рублей';
    	}
    	$('#currency').text( currency );
	})



	// защита на случай, если пользователь вводит число меньше минимального и больше максимального
	$('body').on('change','.credit, .time',function(){
		var value=$(this).val();
		var min=$(this).attr('min');
		var max=$(this).attr('max');
		min=+min;
		max=+max;

		if( value<min ) {$(this).val(min);};
		if( value>max ) {$(this).val(max);};

		// ставим триггер на пересчет
		$('.credit, .time').trigger('input');
	})

})

// функция добавления пробела между разрядами числа
function razr(num){
	return num.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
}