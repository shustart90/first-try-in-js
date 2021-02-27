var catalogCont = document.querySelector('#catalog');
if(catalogCont) {
	function makeProduct (name, price, id) {
			this.name = name;
			this.price = price;
			this.id = id;
	}
	let harryPotter = new makeProduct ("Гарри Поттер", 1000, 1);
	let hobbit = new makeProduct ("Хоббит", 800, 2);
	let lotr = new makeProduct ("Властелин Колец", 2400, 3);
	let witcher = new makeProduct ("Ведьмак", 400, 4);
	let bible = new makeProduct ("Библия", 60, 5);
	let greenMile = new makeProduct ("Зеленая Миля", 999, 6);

	let products = [harryPotter, hobbit, lotr, witcher, bible, greenMile];
	sessvars.globBooksObj = {};
	catalogCont.style.width = "60%";
	catalogCont.style.height = "600px";
	catalogCont.style.paddingRight = "20%";
	catalogCont.style.paddingLeft = "20%";
	catalogCont.style.display = "flex";
	catalogCont.style.alignContent = "space-around";
	catalogCont.style.flexWrap = "wrap";
	catalogCont.style.justifyContent = "space-between";
	for (let i = 0; i < products.length; i++) {
		sessvars.globBooksObj[products[i]['name'] + '_count'] = 0;
		let prodMin = document.createElement("div");
		prodMin.id = products[i]["id"];
		prodMin.style.width = "250px";
		prodMin.style.height = "250px";
		prodMin.style.paddingTop = "10px";
		prodMin.style.paddingBottom = "10px";
		prodMin.style.border = ("2px solid rgba(103, 128, 159, .3)");
		prodMin.style.display = "flex";
		prodMin.style.flexDirection = "column";
		prodMin.style.alignItems = "center";
		prodMin.style.justifyContent = "space-between";
		let picture = document.createElement("img");
		picture.src = "img/small/" + prodMin.id + ".jpg";
		picture.id = "img_" + prodMin.id;
		picture.style.margin = "0";
		picture.addEventListener('click', function(e) {
			var modal = $modal({
			  title: products[i]["name"],
			  content: "<img src = 'img/big/" + prodMin.id + ".jpg'></img>"
			}); 
		    modal.show();
	  	});
		prodMin.appendChild(picture);
		let nameString = document.createElement("p");
		nameString.innerText = products[i]["name"];
		nameString.id = "name_" + prodMin.id;
		nameString.style.margin = "0";
		prodMin.appendChild(nameString);
		let priceString = document.createElement("span");
		priceString.innerText = products[i]["price"] + " руб";
		priceString.id = "price_" + prodMin.id;
		priceString.style.margin = "0";
		prodMin.appendChild(priceString);
		let addToCart = document.createElement("button");
		addToCart.innerText = "Добавить в корзину";
		addToCart.id = "add_" + prodMin.id;
		addToCart.style.margin = "0";
		addToCart.addEventListener('click', function (eventObj) {
			let current = eventObj.target;
			let currentId = current.id.split("_")[1];
			for (let k = 0; k < products.length; k++) {
				if (currentId == products[k]["id"]) {
					let currentName = products[k]["name"];
					busketSum += products[k]["price"];
					sessvars.globBooksObj["sum_inBusket"] = busketSum; //добавляем в глобальный объект сумму в корзине
					busketMoney.innerText = "В корзине товаров на сумму: " + busketSum + " руб";
					sessvars.globBooksObj[currentName] = products[k]["price"];
					sessvars.globBooksObj[currentName + '_count'] += 1;
					console.log(sessvars.globBooksObj);
					return busketSum;
				}
			}
		});
		prodMin.appendChild(addToCart);
		catalogCont.appendChild(prodMin);
	}
	let busketSum = 0;
	let busket = document.createElement("div");
	let busketMoney = document.createElement("div");
	busket.style.width = "60%";
	busket.style.height = "50px";
	busket.style.paddingRight = "20%";
	busket.style.paddingLeft = "20%";
	busket.style.display = "flex";
	busket.style.justifyContent = "space-between";
	busket.style.alignItems = "center";
	busketMoney.innerText = "Корзина пуста";
	let bodyCont = document.querySelector("body");
	let butToBuskForm = document.createElement("form");
	let butToBusk = document.createElement("button");
	butToBuskForm.action = "busket.html";
	butToBusk.innerText = "Перейти в корзину";
	butToBuskForm.appendChild(butToBusk);
	busket.appendChild(busketMoney);
	busket.appendChild(butToBuskForm);
	bodyCont.appendChild(busket);
}

var busketCont = document.querySelector('#busket');
if (busketCont) {
	busketCont.style.visibility = "visible";
	busketCont.style.position = "absolute";
	for (var key in sessvars.globBooksObj) {
		if(key.split('_').length == 1) {
			var booksRow = document.createElement('div');
			booksRow.classList.add('row_in_busket');
			booksRow.id = key + "_row";
			booksRow.style.width = '700px';
			booksRow.style.height = '40px';
			booksRow.style.display = 'flex';
			booksRow.style.justifyContent = 'space-between';
			booksRow.style.alignItems = 'center';
			booksRow.style.border = '1px solid black';
			booksRow.style.paddingLeft = "10px";
			booksRow.style.paddingRight = "10px";
			booksRow.style.boxSizing = "border-box";
			var titleInBusket = document.createElement('span');
			var priceInBusket = document.createElement('span');
			var numberInBusket = document.createElement('span');
			numberInBusket.id = key + "_number";
			priceInBusket.id = key + "_price";
			titleInBusket.innerText = key;
			titleInBusket.style.width = "250px";
			numberInBusket.style.width = "50px";
			priceInBusket.style.width = "100px";
			numberInBusket.innerText = sessvars.globBooksObj[key + '_count'] + ' шт.';
			priceInBusket.innerText = sessvars.globBooksObj[key] * Number(sessvars.globBooksObj[key + '_count']) + ' руб ';
			let plusProd = document.createElement('button');
			plusProd.id = key + "_plus_button";
			plusProd.innerText = "+";
			let minusProd = document.createElement('button');
			minusProd.id = key + "_minus_button";
			minusProd.innerText = "-";
			plusProd.addEventListener('click', function (eventObj) {
				let currentObj = eventObj.target;
				currentObjName = currentObj.id.split('_')[0];
				let currentBusketNumber = document.getElementById(currentObjName + "_number");
				currentBusketNumber.innerText = (Number(sessvars.globBooksObj[currentObjName + '_count']) + 1) + " шт.";
				sessvars.globBooksObj[currentObjName + '_count'] += 1;
				console.log(currentObjName);
				let currentBusketPrice = document.getElementById(currentObjName + "_price");
				let currentBusketPriceItem = sessvars.globBooksObj[currentObjName];
				currentBusketPrice.innerText = (Number(sessvars.globBooksObj[currentObjName]) * Number(currentBusketNumber.innerText.split(' ')[0])) + " руб.";
				console.log(sessvars.globBooksObj["sum_inBusket"]);
				console.log(Number(sessvars.globBooksObj[currentObjName]));
				sessvars.globBooksObj["sum_inBusket"] += Number(sessvars.globBooksObj[currentObjName]); //прибавляем стоимость товара к общей сумме в корзине
				totalValue.innerText = sessvars.globBooksObj["sum_inBusket"] + " руб.";;
				console.log(sessvars.globBooksObj);
			})
			minusProd.addEventListener('click', function (eventObj) {
				let currentObj = eventObj.target;
				currentObjName = currentObj.id.split('_')[0];
				let currentBusketNumber = document.getElementById(currentObjName + "_number");
				if (Number(currentBusketNumber.innerText.split(' ')[0]) > 1) {
					currentBusketNumber.innerText = (Number(sessvars.globBooksObj[currentObjName + '_count']) - 1) + " шт.";
					console.log(sessvars.globBooksObj[currentObjName + '_count']);
					sessvars.globBooksObj[currentObjName + '_count'] -= 1;
					console.log(currentObjName);
					let currentBusketPrice = document.getElementById(currentObjName + "_price");
					let currentBusketPriceItem = sessvars.globBooksObj[currentObjName];
					currentBusketPrice.innerText = (Number(sessvars.globBooksObj[currentObjName]) * Number(currentBusketNumber.innerText.split(' ')[0])) + " руб.";
					sessvars.globBooksObj["sum_inBusket"] -= Number(sessvars.globBooksObj[currentObjName]); //отнимаем стоимость товара от общей суммы в корзине
					totalValue.innerText = sessvars.globBooksObj["sum_inBusket"] + " руб.";;
					console.log(sessvars.globBooksObj);
				}
			})
			let deleteProd = document.createElement('button');
			deleteProd.innerText = 'delete';
			deleteProd.id = key + "_delete_button";
			deleteProd.addEventListener('click', function (eventObj) { 
				currentDeleteButton = eventObj.target;
				currentDeleteButtonName = currentDeleteButton.id.split('_')[0];
				let currentBusketNumber = document.getElementById(currentDeleteButtonName + "_number");
				let currentRow = document.getElementById(currentDeleteButtonName + '_row');
				sessvars.globBooksObj[currentDeleteButtonName + '_count'] = 0;
				busketCont.removeChild(currentRow);
				sessvars.globBooksObj["sum_inBusket"] -= (Number(sessvars.globBooksObj[currentDeleteButtonName]) * Number(currentBusketNumber.innerText.split(' ')[0]));// удаляем из общей суммы в корзине стоимость книг умноженную на их колличество
				delete sessvars.globBooksObj[currentDeleteButtonName];
				totalValue.innerText = sessvars.globBooksObj["sum_inBusket"] + " руб.";;
				console.log(sessvars.globBooksObj);
			})
			booksRow.appendChild(titleInBusket);
			booksRow.appendChild(minusProd);
			booksRow.appendChild(numberInBusket);
			booksRow.appendChild(plusProd);
			booksRow.appendChild(priceInBusket);
			booksRow.appendChild(deleteProd);
			busketCont.appendChild(booksRow);
		}
	}
	var totalRow = document.createElement('div');
	totalRow.style.width = '700px';
	totalRow.style.height = '40px';
	totalRow.style.display = 'flex';
	totalRow.style.justifyContent = 'space-between';
	totalRow.style.alignItems = 'center';
	totalRow.style.border = '1px solid black';
	totalRow.style.paddingLeft = "10px";
	totalRow.style.paddingRight = "10px";
	totalRow.style.boxSizing = "border-box";
	var totalText = document.createElement('span');
	totalText.innerText = "Итого: ";
	var totalValue = document.createElement('span');
	if (typeof sessvars.globBooksObj["sum_inBusket"] == "undefined") {
		totalValue.innerText = "0 руб.";
	}
	else {
		totalValue.innerText = sessvars.globBooksObj["sum_inBusket"] + " руб.";
	}
	totalRow.appendChild(totalText);
	totalRow.appendChild(totalValue);
	busketCont.appendChild(totalRow);	
	var buttonNextBusket = document.createElement("button");
	buttonNextBusket.style.marginTop = "30px";
	buttonNextBusket.innerText = "Далее";
	buttonNextBusket.addEventListener("click", function (eventObj) {
		busketCont.style.visibility = "hidden";
		adresCont.style.visibility = "visible";
	})
	busketCont.appendChild(buttonNextBusket);

	var adresCont = document.getElementById("adress");
	adresCont.style.position = "absolute";
	adresCont.style.visibility = "hidden";
	adresCont.style.marginTop = "50px";
	var adresForm = document.createElement("form");
	adresForm.innerText = "Введите ваш адрес:\r\r"
	var adresInput = document.createElement("input");
	adresInput.size = "50";
	var adresSubmit = document.createElement("input");
	adresSubmit.type = "submit";
	adresSubmit.value = "Подтвердить";
	adresSubmit.style.marginLeft = "20px";
	adresForm.appendChild(adresInput);
	adresForm.appendChild(adresSubmit);
	adresCont.appendChild(adresForm);
	var buttonNextAdres = document.createElement("button");
	buttonNextAdres.style.marginTop = "30px";
	buttonNextAdres.innerText = "Далее";
	buttonNextAdres.addEventListener("click", function (eventObj) {
		adresCont.style.visibility = "hidden";
		commentCont.style.visibility = "visible";
	})
	adresCont.appendChild(buttonNextAdres);

	var commentCont = document.getElementById("comments");
	commentCont.style.position = "absolute";
	commentCont.style.visibility = "hidden";
	commentCont.style.marginTop = "50px";
	var commentForm = document.createElement("form");
	commentForm.innerText = "Оставьте ваш комментарий:\r\r"
	var commentInput = document.createElement("textarea");
	commentInput.name = "comment";
	commentInput.cols= "50";
	commentInput.rows= "8";
	commentInput.style.resize = "none";
	var commentSubmitBorder = document.createElement("p");
	var commentSubmit = document.createElement("input");
	commentSubmitBorder.appendChild(commentSubmit);
	commentSubmit.type = "submit";
	commentSubmit.value = "Подтвердить";
	commentForm.appendChild(commentInput);
	commentForm.appendChild(commentSubmitBorder);
	commentCont.appendChild(commentForm);
}
