window.onload = function () {
	var cartTable = document.getElementById('cartTable');
	var tr =  cartTable.children[1].rows; 
	var checkInputs = document.getElementsByClassName('check');
	var checkAllInputs = document.getElementsByClassName('check-all');
	var selectedTotal = document.getElementById('selectedTotal'); 
	var priceTotal = document.getElementById('priceTotal'); 
	var selectedViewList = document.getElementById('selectedViewList'); 
	var selected = document.getElementById('selected'); 
	var foot = document.getElementById('foot');
	if (!document.getElementsByClassName) {
		document.getElementsByClassName = function (cls) { 
			var ret = [];
			var els = document.getElementsByTagName('*'); 
			for (var i = 0, len = els.length; i < len; i++) { 
				if (els[i].className === cls || els[i].className.indexOf(cls + ' ') >=0 || els[i].className.indexOf(' ' + cls + ' ') >=0 || els[i].className.indexOf(' ' + cls) >=0) {
					ret.push(els[i]);
				}
			}
			return ret;
		}
	}
	function getTotal() {
		var seleted = 0;
		var price = 0;
		var HTMLstr = '';
		for (var i = 0, len = tr.length; i < len; i++) {
			if (tr[i].getElementsByTagName('input')[0].checked) { 
				tr[i].className = 'on';
				seleted += parseInt(tr[i].getElementsByTagName('input')[1].value);
				price += parseFloat(tr[i].cells[4].innerHTML); 
				HTMLstr += '<div><img src="' + tr[i].getElementsByTagName('img')[0].src + '"><span class="del" index="' + i + '">取消选择</span></div>'
			}
			else {
				tr[i].className = '';
			}
		}
		selectedTotal.innerHTML = seleted;
		priceTotal.innerHTML = price.toFixed(2); 
		selectedViewList.innerHTML = HTMLstr;

		if (seleted == 0) {
			foot.className = 'foot';
		}
	}
	for(var i = 0; i < checkInputs.length; i++ ){
		checkInputs[i].onclick = function () { 
			if (this.className.indexOf('check-all') >= 0) { 
				for (var j = 0; j < checkInputs.length; j++) {
					checkInputs[j].checked = this.checked;
				}
			}
			if (!this.checked) { 
				for (var i = 0; i < checkAllInputs.length; i++) {
					checkAllInputs[i].checked = false;
				}
			}
			getTotal();
		}
	}
	selected.onclick = function(){
		if(foot.className == 'foot'){ 
			if (selectedTotal.innerHTML != 0) {	
				foot.className = 'foot show';
			}
		}else{
			foot.className = 'foot';
		}
	}
	selectedViewList.onclick = function (e) {
		var e = e || window.event;
		var el = e.srcElement;
		if (el.className=='del') {
			var input =  tr[el.getAttribute('index')].getElementsByTagName('input')[0]
			input.checked = false;
			input.onclick();
		}
	}
	for (var i = 0; i < tr.length; i++) {
		tr[i].onclick = function (e) {
			var e = e || window.event;
			var el = e.target || e.srcElement; 
			var cls = el.className; 
			var countInput = this.getElementsByTagName('input')[1];
			var value = parseInt(countInput.value); 
			switch (cls) {
				case 'add': 
					countInput.value = value + 1;
					getSubtotal(this);
					break;
				case 'reduce': 
					if (value > 1) {
						countInput.value = value - 1;
						getSubtotal(this);
					}
					break;
				case 'delete':
					var conf = confirm('确定删除此商品吗？');
					if (conf) {
						this.parentNode.removeChild(this);
					}
					break;
			}
			getTotal();
		}
		tr[i].getElementsByTagName('input')[1].onkeyup = function () {
			var val = parseInt(this.value);
			if (isNaN(val) || val <= 0) {
				val = 1;
			}
			if (this.value != val) {
				this.value = val;
			}
			getSubtotal(this.parentNode.parentNode);
			getTotal();
		}
	}
	function getSubtotal(tr) {
		var cells = tr.cells;
		var price = cells[2]; 
		var countInput = tr.getElementsByTagName('input')[1]; 
		var subtotal = (parseInt(countInput.value) * parseFloat(price.innerHTML)).toFixed(2);
		cells[4].innerHTML = subtotal;
		var span = tr.getElementsByTagName('span')[1];
		if (countInput.value == 1) {
			span.innerHTML = '';
		}else{
			span.innerHTML = '-';
		}
	}
	deleteAll.onclick = function () {
		if (selectedTotal.innerHTML != 0) {
			var con = confirm('确定删除所选商品吗？'); 
			if (con) {
				for (var i = 0; i < tr.length; i++) { 
					if (tr[i].getElementsByTagName('input')[0].checked) {
						tr[i].parentNode.removeChild(tr[i]);
						i--; 
					}
				}
			}
		} else {
			alert('请选择商品！');
		}
		getTotal();
	}
	checkAllInputs[0].checked = true;
	checkAllInputs[0].onclick();
}