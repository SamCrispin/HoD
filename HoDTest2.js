var mapArray = [];
var merchantItems = [];
var aMerchantItems = [];
var smithyItems = [];
var pointNo = 0;
var pointsCleared = 0;

var player = {

	health: 100,
	currentHealth: 100,
	attack: 10,
	defense: 10,
	charisma: 0,
	intelligence: 10,
	gold: 1000,
	inventory: [],
	equipped: [],

};

function Item(type, name, consumable, instantHealth, health, attack, defense, charisma, intelligence, isEquipped, abilities, power, cost) {
	this.type = type;
	this.name = name;
	this.consumable = consumable;
	this.instantHealth = instantHealth;
	this.health = health;
	this.attack = attack;
	this.defense = defense;
	this.charisma = charisma;
	this.intelligence = intelligence;
	this.abilities = abilities;
	this.power = power;
	this.cost = cost;																										//creates an object template for an item that can be reused
}

function instEquipped() {						//equips a set of useless items onto the player for the functionality of equipping the first set of items

	for (i = 0; i < 6; i++) {

		var item = new Item;
	
		switch (i) {
			case 0: item.type = "helmet";																					//type of the item
						break;
			case 1: item.type = "amulet";
						break;
			case 2: item.type = "armour";
						break;
			case 3: item.type = "leggings";	
						break;
			case 4: item.type = "boots";
						break;
			case 5: item.type = "sword";
						break;
		}
		item.name = "";																							//the name (will be generated elsewhere)
		item.consumable = false;																			//whether the item is consumable (potions food etc)
		item.instantHealth = 0;																				//how much health it gives instantly (health fro ma potion)
		item.health = 0;																							//how much permanent health it gives you 
		item.attack = 0	;																							//how much attack the item gives you
		item.defense = 0;																						
		item.charisma = 0;
		item.intelligence = 0;
		item.power = 0;
		item.abilities = "";																						//any special abilities the item gives you
		
		player.equipped.push(item);

	}

}

function invItemHover(itemType) {			//sets the output div to the stats of the equipped item of that type when you hover over it

	var output = "";																																	//initialises output
	
	for (i = 0; i < player.equipped.length; i++) {
		if (player.equipped[i].type == itemType || (itemType == 'weapon' && (player.equipped[i].type == 'sword' || player.equipped[i].type == 'staff'))) {
			item = player.equipped[i];
			break;
		}
	}																																							//sets the var 'item' to the item being hovered over so i know what type it is
	
	document.getElementById('statsHoverName').innerHTML = item.type;												//sets the title to the type of item (will later be the name of the item)
	
	for (x in item) {																																	//for every property in 'item'
		if (x != 'consumable' && x != 'cost' && x != 'inShop' && x != 'type' && item[x] != "")						//some properties i dont want to show in the shop tooltip, and if its not blank
			output +=  x + ': ' + item[x] + '<br>';																							//add the property and its value to the output variable
	}

	document.getElementById('statsHoverContent').innerHTML = output;												//sets the innerHTML of the output to the output variable worked out above

}

function invItemHoverOut() {					//set the output div back to the players stats when unhovered over

	var output = ""																							//initialises output
	
	document.getElementById('statsHoverName').innerHTML = "Stats"
	
	output += "Attack: " + player.attack + "<br>";
	output += "Defense: " + player.defense + "<br>";
	output += "Charisma: " + player.charisma + "<br>";
	output += "Intelligence: " + player.intelligence + "<br>";							//adds all of the relevent players stats to the output var
	
	document.getElementById('statsHoverContent').innerHTML = output;		//sets the output div to the output var

}

function genMap() {								//generates the points on the map and selects their interactions

	var pointCoord = 0;
	var x = 0, y = 0;
	var div;
	
	pointNo = Math.floor((Math.random() * 5) + 15);													//generates the amount of map points and saves it to a global variable for later use

	for (var i = 0; i < 20; i++) {
	
		mapArray[i+1] = new Array();
		
		for (var j = 0; j < 30; j++) {
			mapArray[i+1][j+1] = '';
		}
		
	}																																//makes every y value in the array an array to make it 2d

	mapArray[1][30] = 't';
	
	div = document.createElement('div');
	div.setAttribute('id', 'townIcon');
	div.setAttribute('class', 'iconCoord');
	div.setAttribute('onclick', 'rearrange("town")');														//creates the icon for a town (special exception hence the hardcoding)
	
	document.getElementById('map').appendChild(div);
	
	genTown();																												//calls the function which generates the layout, hotspots and functionality of the town

	for (var k = 0; k < pointNo; k++) {																			//for every point to be generated...
	
		pointCoord = Math.floor(Math.random() * 600);													//generates where the point will go on the map
	
		y = (parseInt(pointCoord/30) + 1);																		//gens y coord from the random number
		x = ((pointCoord % 30) + 1);																				//gens x coord from the random number
		
		if (mapArray[y][x] == '') {																					//if the space is empty...
		
			interactionNo = (Math.floor(Math.random() * 5)) + 1;										//generates the interaction that will be at this map point
			
			//interactionNo = 3;																							//hardcodes the encounter that will happen so i can test them (bugtesting line)
		
			div = document.createElement('div');																//puts a div in a variable called 'div', currently has no attributes or properties
			div.setAttribute('class', 'iconCoord');																//sets the class to 'mapCoord'
			div.setAttribute('id', 'coord' + (y) + ',' + (x));													//sets the id to 'coord' then the x and y coordinate
			div.setAttribute('onclick', 'rearrange("openingScr' + interactionNo + '")');		//gives the div an onclick function to close the map and open the interaction (wip)
			div.style.left = ((x * 20) - 10) + 'px';																//positions the new div along the x axis
			div.style.top = ((y * 20) - 10) + 'px';																//positions the new div along the y axis
			
			document.getElementById('map').appendChild(div);										//appends the div to the element with id 'map'
		
			mapArray[y][x] = 'o';																						//'o' for occupied, 'c' for cleared, 't' for town
			
		} else {																												//if the space is already taken...
		
			k--;																													//put the iterator back one so it loops again
		
		}
		
	}

}

function genTown() {								//generates the hotspots on the town so you can click them and visit them
	
	var randInt = (Math.floor(Math.random() * 3) + 1);																	//decides which map will be chosen for this playthrough
	var div;

	switch(randInt) {																															//checks the value of randInt (nicer than if/elseif/else)
		case 1:																																	//if 1...
			document.getElementById('town').style.backgroundImage = "url(townLayout1.png)";		//set the town div to have the 1st layout as its background
			
			div = document.createElement('div');																					//hotspot on the inn so you can click it and visit it
			div.setAttribute('class', 'shopHotspot inn');
			div.setAttribute('id', 'inn1')
			div.setAttribute('onclick', 'rearrange("inn"), document.getElementById("backButton").style.display = "block"');
			div.style.top = '14px';
			div.style.left = '14px';
			div.style.height  = '167px';
			div.style.width = '97px';
			div.onmouseover = function(){document.getElementById('town').style.backgroundImage = "url(townLayout1IHover.png)"};
			div.onmouseout = function(){document.getElementById('town').style.backgroundImage = "url(townLayout1.png)"}
			
			document.getElementById('town').appendChild(div);
			
			div = document.createElement('div');																					//hotspot on the smithy so you can click it and visit it
			div.setAttribute('class', 'shopHotspot smithy');
			div.setAttribute('id', 'smithy1p1')
			div.setAttribute('onclick', 'rearrange("smithy"), document.getElementById("backButton").style.display = "block"');
			div.style.top = '241px';
			div.style.left = '86px';
			div.style.height  = '53px';
			div.style.width = '186px';
			div.onmouseover = function(){document.getElementById('town').style.backgroundImage = "url(townLayout1SHover.png)"};
			div.onmouseout = function(){document.getElementById('town').style.backgroundImage = "url(townLayout1.png)"}
			
			document.getElementById('town').appendChild(div);
			
			div = document.createElement('div');																					//hotspot on the smithy so you can click it and visit it (compund shape so 2 parts)
			div.setAttribute('class', 'shopHotspot smithy');
			div.setAttribute('id', 'smithy1p2')
			div.setAttribute('onclick', 'rearrange("smithy"), document.getElementById("backButton").style.display = "block"');
			div.style.top = '294px';
			div.style.left = '179px';
			div.style.height  = '112px';
			div.style.width = '93px';
			div.onmouseover = function(){document.getElementById('town').style.backgroundImage = "url(townLayout1SHover.png)"};
			div.onmouseout = function(){document.getElementById('town').style.backgroundImage = "url(townLayout1.png)"}
			
			document.getElementById('town').appendChild(div);
			
			div = document.createElement('div');																					//hotspot on the merchant so you can click it and visit it
			div.setAttribute('class', 'shopHotspot merchant');
			div.setAttribute('id', 'merchant1')
			div.setAttribute('onclick', 'rearrange("merchant"), document.getElementById("backButton").style.display = "block"');
			div.style.top = '105px';
			div.style.left = '171px';
			div.style.height  = '76px';
			div.style.width = '246px';
			div.onmouseover = function(){document.getElementById('town').style.backgroundImage = "url(townLayout1MHover.png)"};
			div.onmouseout = function(){document.getElementById('town').style.backgroundImage = "url(townLayout1.png)"}
			
			document.getElementById('town').appendChild(div);
			
			div = document.createElement('div');																					//hotspot on the arcane merchant so you can click it and visit it
			div.setAttribute('class', 'shopHotspot aMerchant');
			div.setAttribute('id', 'aMerchant1')
			div.setAttribute('onclick', 'rearrange("aMerchant"), document.getElementById("backButton").style.display = "block"');
			div.style.top = '241px';
			div.style.left = '404px';
			div.style.height  = '62px';
			div.style.width = '202px';
			div.onmouseover = function(){document.getElementById('town').style.backgroundImage = "url(townLayout1AMHover.png)"};
			div.onmouseout = function(){document.getElementById('town').style.backgroundImage = "url(townLayout1.png)"}
			
			document.getElementById('town').appendChild(div);
			
			break;
			
		case 2:
			document.getElementById('town').style.backgroundImage = "url(townLayout2.png)";
			
			div = document.createElement('div');																					//hotspot on the inn so you can click it and visit it
			div.setAttribute('class', 'shopHotspot inn');
			div.setAttribute('id', 'inn2p1')
			div.setAttribute('onclick', 'rearrange("inn"), document.getElementById("backButton").style.display = "block"');
			div.style.top = '252px';
			div.style.left = '439px';
			div.style.height  = '59px';
			div.style.width = '73px';
			div.onmouseover = function(){document.getElementById('town').style.backgroundImage = "url(townLayout2IHover.png)"};
			div.onmouseout = function(){document.getElementById('town').style.backgroundImage = "url(townLayout2.png)"}
			
			document.getElementById('town').appendChild(div);

			div = document.createElement('div');																					//hotspot on the smithy so you can click it and visit it
			div.setAttribute('class', 'shopHotspot inn');
			div.setAttribute('id', 'inn2p2')
			div.setAttribute('onclick', 'rearrange("inn"), document.getElementById("backButton").style.display = "block"');
			div.style.top = '311px';
			div.style.left = '457px';
			div.style.height  = '95px';
			div.style.width = '55px';
			div.onmouseover = function(){document.getElementById('town').style.backgroundImage = "url(townLayout2IHover.png)"};
			div.onmouseout = function(){document.getElementById('town').style.backgroundImage = "url(townLayout2.png)"}
			
			document.getElementById('town').appendChild(div);

			div = document.createElement('div');																					//hotspot on the smithy so you can click it and visit it (compund shape so 2 parts)
			div.setAttribute('class', 'shopHotspot smithy');
			div.setAttribute('id', 'smithy2')
			div.setAttribute('onclick', 'rearrange("smithy"), document.getElementById("backButton").style.display = "block"');
			div.style.top = '135px';
			div.style.left = '179px';
			div.style.height  = '59px';
			div.style.width = '185px';
			div.onmouseover = function(){document.getElementById('town').style.backgroundImage = "url(townLayout2SHover.png)"};
			div.onmouseout = function(){document.getElementById('town').style.backgroundImage = "url(townLayout2.png)"}
		
			document.getElementById('town').appendChild(div);

			div = document.createElement('div');																					//hotspot on the merchant so you can click it and visit it
			div.setAttribute('class', 'shopHotspot merchant');
			div.setAttribute('id', 'merchant2')
			div.setAttribute('onclick', 'rearrange("merchant"), document.getElementById("backButton").style.display = "block"');
			div.style.top = '131px';
			div.style.left = '60px';
			div.style.height  = '154px';
			div.style.width = '59px';
			div.onmouseover = function(){document.getElementById('town').style.backgroundImage = "url(townLayout2MHover.png)"};
			div.onmouseout = function(){document.getElementById('town').style.backgroundImage = "url(townLayout2.png)"}
			
			document.getElementById('town').appendChild(div);

			div = document.createElement('div');																					//hotspot on the arcane merchant so you can click it and visit it
			div.setAttribute('class', 'shopHotspot aMerchant');
			div.setAttribute('id', 'aMerchant2')
			div.setAttribute('onclick', 'rearrange("aMerchant"), document.getElementById("backButton").style.display = "block"');
			div.style.top = '134px';
			div.style.left = '422px';
			div.style.height  = '59px';
			div.style.width = '143px';
			div.onmouseover = function(){document.getElementById('town').style.backgroundImage = "url(townLayout2AMHover.png)"};
			div.onmouseout = function(){document.getElementById('town').style.backgroundImage = "url(townLayout2.png)"}
			
			document.getElementById('town').appendChild(div);
			
			break;
			
		case 3:
			document.getElementById('town').style.backgroundImage = "url(townLayout3.png)";
			
			div = document.createElement('div');																					//hotspot on the inn so you can click it and visit it
			div.setAttribute('class', 'shopHotspot inn');
			div.setAttribute('id', 'inn3p1')
			div.setAttribute('onclick', 'rearrange("inn"), document.getElementById("backButton").style.display = "block"');
			div.style.top = '106px';
			div.style.left = '271px';
			div.style.height  = '72px';
			div.style.width = '175px';
			div.onmouseover = function(){document.getElementById('town').style.backgroundImage = "url(townLayout3IHover.png)"};
			div.onmouseout = function(){document.getElementById('town').style.backgroundImage = "url(townLayout3.png)"}
			
			document.getElementById('town').appendChild(div);

			div = document.createElement('div');																					//hotspot on the inn so you can click it and visit it (compound shape so 2 parts)
			div.setAttribute('class', 'shopHotspot inn');
			div.setAttribute('id', 'inn3p2')
			div.setAttribute('onclick', 'rearrange("inn"), document.getElementById("backButton").style.display = "block"');
			div.style.top = '64px';
			div.style.left = '271px';
			div.style.height  = '42px';
			div.style.width = '72px';
			div.onmouseover = function(){document.getElementById('town').style.backgroundImage = "url(townLayout3IHover.png)"};
			div.onmouseout = function(){document.getElementById('town').style.backgroundImage = "url(townLayout3.png)"}
			
			document.getElementById('town').appendChild(div);

			div = document.createElement('div');																					//hotspot on the smithy so you can click it and visit it
			div.setAttribute('class', 'shopHotspot smithy');
			div.setAttribute('id', 'smithy3p1')
			div.setAttribute('onclick', 'rearrange("smithy"), document.getElementById("backButton").style.display = "block"');
			div.style.top = '237px';
			div.style.left = '75px';
			div.style.height  = '52px';
			div.style.width = '138px';
			div.onmouseover = function(){document.getElementById('town').style.backgroundImage = "url(townLayout3SHover.png)"};
			div.onmouseout = function(){document.getElementById('town').style.backgroundImage = "url(townLayout3.png)"}
			
			document.getElementById('town').appendChild(div);
			
			div = document.createElement('div');																					//hotspot on the smithy so you can click it and visit it
			div.setAttribute('class', 'shopHotspot smithy');
			div.setAttribute('id', 'smithy3p2')
			div.setAttribute('onclick', 'rearrange("smithy"), document.getElementById("backButton").style.display = "block"');
			div.style.top = '289px';
			div.style.left = '161px';
			div.style.height  = '45px';
			div.style.width = '52px';
			div.onmouseover = function(){document.getElementById('town').style.backgroundImage = "url(townLayout3SHover.png)"};
			div.onmouseout = function(){document.getElementById('town').style.backgroundImage = "url(townLayout3.png)"}
			
			document.getElementById('town').appendChild(div);

			div = document.createElement('div');																					//hotspot on the merchant so you can click it and visit it
			div.setAttribute('class', 'shopHotspot merchant');
			div.setAttribute('id', 'merchant3')
			div.setAttribute('onclick', 'rearrange("merchant"), document.getElementById("backButton").style.display = "block"');
			div.style.top = '126px';
			div.style.left = '14px';
			div.style.height  = '52px';
			div.style.width = '144px';
			div.onmouseover = function(){document.getElementById('town').style.backgroundImage = "url(townLayout3MHover.png)"};
			div.onmouseout = function(){document.getElementById('town').style.backgroundImage = "url(townLayout3.png)"}
			
			document.getElementById('town').appendChild(div);

			div = document.createElement('div');																					//hotspot on the arcane merchant so you can click it and visit it
			div.setAttribute('class', 'shopHotspot aMerchant');
			div.setAttribute('id', 'aMerchant3')
			div.setAttribute('onclick', 'rearrange("aMerchant"), document.getElementById("backButton").style.display = "block"');
			div.style.top = '236px';
			div.style.left = '476px';
			div.style.height  = '52px';
			div.style.width = '131px';
			div.onmouseover = function(){document.getElementById('town').style.backgroundImage = "url(townLayout3AMHover.png)"};
			div.onmouseout = function(){document.getElementById('town').style.backgroundImage = "url(townLayout3.png)"}
			
			document.getElementById('town').appendChild(div);
			
			break;
	}
	
	genShop('merchant');																													//generates the layouts for the 3 shops in the town
	genShop('aMerchant');																												//the inn will be a serperate function as it will have a different layout 
	genShop('smithy');

}

function genShop(shop) {						//generates the look and functionaity of the shops

	var pos = 0;
	var div = document.createElement('div');

	div.setAttribute('id', 'shopWelcome');
	if (shop == 'aMerchant') {
		div.innerHTML = 'Welcome to the arcane merchant';
	} else {
		div.innerHTML = 'Welcome to the ' + shop;																			//creates the welcome text at the top of the shop (aMerchant is hardcoded as the shop isnt stored as 'arcane merchant')
	}
	
	document.getElementById(shop).appendChild(div);																//appends it to the div

	for (j = 0; j < 2;  j++) {																											//the code only generates one row of the shop so it has to be done twice

		for (i = 0; i < 5; i++) {																											//the code generates one item in the shop so repeats it 5 times
		
			pos = ((j * 5) + i);																											//works out which number the div is (0 being top left, 9 bottom right, starting from 0 as the array storing the items will be 0 indexed)

			div = document.createElement('div');
			div.setAttribute('class', 'shopItem tooltip');																		//generates divs id, class and onclick functionality for an item in the shop
			div.setAttribute('id', shop + 'Item' + (j+1) + ',' + (i+1));
			div.setAttribute('onclick', 'buyItem(' + shop + ', ' + pos + ', ' + (j+1) + ', ' + (i+1) + ')');
		
			document.getElementById(shop).appendChild(div);
			
			div = document.createElement('span');
			div.setAttribute('class', 'tooltiptext');
			div.setAttribute('id', shop + 'tooltiptext' + (j+1) + ',' + (i+1));											//generate the tooltip div and add it to the item
			
			document.getElementById(shop + 'Item' + (j+1) + ',' + (i+1)).appendChild(div);
			
		}
	
		for (i = 0; i < 5; i++) {
			
			div = document.createElement('div');
			div.setAttribute('class', 'shopPrice');
			div.setAttribute('id', shop + 'Price' + (j+1) + ',' + (i+1));													//generates divs id, class and innerHTML for a price in the shop
		
			document.getElementById(shop).appendChild(div);
		
		}

		if (j == 0) {
		
			div = document.createElement('div');
			div.setAttribute('id', 'bar');																								//the bar seperating the 2 rows
			
			document.getElementById(shop).appendChild(div);
		
		}
	
	}

	populateShop(shop);																												//calls the function to put items in the shop

}

function genItem(difficulty) {					//generates an item and its stats

	var percentCleared = Math.floor((pointsCleared / pointNo) * 100);
	var item = new Item();
	var type = (Math.floor(Math.random() * 9) + 1);
	
	switch(type) {
		case 1:
			item.type = "sword";																					//type of the item
			item.name = "";																							//the name (will be generated elsewhere)
			item.consumable = false;																			//whether the item is consumable (potions food etc)
			item.instantHealth = 0;																				//how much health it gives instantly (health fro ma potion)
			item.health = 0;																							//how much permanent health it gives you 
			item.attack = (Math.floor(Math.random() * 3) + 1);										//how much attack the item gives you
			item.defense = 0;																						
			item.charisma = 0;
			item.intelligence = 0;
			item.abilities = "";																						//any special abilities the item gives you
			
			break;
	
		case 2:
			item.type = "staff";
			item.name = "";
			item.consumable = false;
			item.instantHealth = 0;
			item.health = 0;
			item.attack = 0;
			item.defense = 0;
			item.charisma = 0;
			item.intelligence = (Math.floor(Math.random() * 3) + 1);
			item.abilities = "";
			
			break;
		
		case 3:
			item.type = "helmet";
			item.name = "";
			item.consumable = false;
			item.instantHealth = 0;
			item.health = 0;
			item.attack = 0;
			item.defense = (Math.floor(Math.random() * 3) + 1);
			item.charisma = 0;
			item.intelligence = 0;
			item.abilities = "";
			
			break;
			
		case 4:
			item.type = "amulet";
			item.name = "";
			item.consumable = false;
			item.instantHealth = 0;
			item.health = 0;
			item.attack = (Math.floor(Math.random() * 2) + 1);
			item.defense = 0;
			item.charisma = (Math.floor(Math.random() * 5) + 1);
			item.intelligence = (Math.floor(Math.random() * 2) + 1);
			item.abilities = "";
			
			break;
			
		case 5:
			item.type = "armour";
			item.name = "";
			item.consumable = false;
			item.instantHealth = 0;
			item.health = (Math.floor(Math.random() * 20) + 1);
			item.attack = 0;
			item.defense = (Math.floor(Math.random() * 5) + 1);
			item.charisma = 0;
			item.intelligence = 0;
			item.abilities = "";
			
			break;
			
		case 6:
			item.type = "leggings";
			item.name = "";
			item.consumable = false;
			item.instantHealth = 0;
			item.health = (Math.floor(Math.random() * 10) + 1);
			item.attack = 0;
			item.defense =  (Math.floor(Math.random() * 4) + 1);
			item.charisma = 0;
			item.intelligence = 0;
			item.abilities = "";
			
			break;
			
		case 7:
			item.type = "boots";
			item.name = "";
			item.consumable = false;
			item.instantHealth = 0;
			item.health = 0;
			item.attack = 0;
			item.defense = (Math.floor(Math.random() * 3) + 1);
			item.charisma = 0;
			item.intelligence = 0;
			item.abilities = "";
			
			break;
			
		case 8:
			item.type = "potion";
			item.name = "";
			item.consumable = true;
			item.instantHealth = 20;
			item.health = 0;
			item.attack = 0;
			item.defense = 0;
			item.charisma = 0;
			item.intelligence = 0;
			item.abilities = "";
			
			break;
			
		case 9: 
			item.type = "food";
			item.name = "";
			item.consumable = true;
			item.instantHealth = 10;
			item.health = 0;
			item.attack = 0;
			item.defense = 0;
			item.charisma = 0;
			item.intelligence = 0;
			item.abilities = "";
	}

	item.power = item.instantHealth + item.health + item.attack + item.defense + item.charisma + item.intelligence;			//basic algorithm for the power of the item
	item.cost = 2 * item.power;																																			//basic algorithm for the cost of the item

	return item;

}

function populateShop(shop) {				//populates items to go in the shops

	var item;

	var output = "";
	var x, y, z;

	for (i = 0; i < 2; i++) {
	
		for (j = 0; j < 5; j++) {																																																//repeates this code 10 times (one for each item)
		
			switch(shop) {
				case 'merchant': 
					do {
						item = genItem(1);																																													//calls the function to generate an item
					} while (item.type == "staff" || item.type == "helmet" || item.type == "armour" || item.type == "leggings" || item.type == "boots");		//repeates generating an item until its not one of these (restricts what items can be in the shop)
					item.inShop = true;																																														//makes it so the 
					merchantItems.push(item);																																											//adds it to the array of shop items to be able to access it later
					break;
				
				case 'smithy':
					do {
						item = genItem(1);
					} while (item.type == "staff" || item.type == "amulet" || item.type == "potion" || item.type == "food");													//same as previous section
					item.inShop = true;
					smithyItems.push(item);
					break;
				
				case 'aMerchant':
					do {
						item = genItem(1);
					} while (item.type == "sword" || item.type == "helmet" || item.type == "armour" || item.type == "leggings" || item.type == "boots" || item.type == "food");			//same as previous section
					item.inShop = true;
					aMerchantItems.push(item);
					break;
			
			}
			
			for (x in item) {																																																	//for every property in 'item'
				if (x != 'consumable' && x != 'cost' && x != 'inShop' && item[x] != "")																												//some properties i dont want to show in the shop tooltip, and if its not blank
					output = output + x + ': ' + item[x] + '<br>';																																				//add the property and its value to the output variable
			}
			
			document.getElementById(shop + 'tooltiptext' + (i+1) + ',' + (j+1)).innerHTML = output;																					//make the text of the tooltip the output var
			
			output = "";																																																			//resets the output
			
			x = shop + 'Item' + (i+1) + ',' + (j+1);																																									//sets x to a string (easier to keep track of debugging wise)
			y = shop + 'Price' + (i+1) + ',' + (j+1);																																									//sets y to a string (easier to keep track of debugging wise)
			z = 'url(' + item.type + '.png)';																																												//sets z to a string (easier to keep track of debugging wise)
			
			document.getElementById(x).style.backgroundImage = z;																																	//sets the backgroung image of the shopitem 
			document.getElementById(y).innerHTML = item.cost + 'GP';																																//sets the text of the price div to the price
		
		}
	
	}

}

function buyItem(shop, pos, y, x) {			//buys an item from a shop (moves it from a shop inventory to the player inventory)

	document.getElementById('shopAnnouncement').style.display = 'block';																	//shows the announcement at the bottom of the div (starts off black until filled)
	
	var item = eval(shop.id + 'Items[' + pos + ']');																											//makes var item equal to the item being bought 
	var gold = player.gold;																																				//var gold is equal to the amount of gold the player has currently
	var price = item.cost;																																				//var cost equals the cost of the item
	
	if (gold >= price && item != "") {																																//if you can afford it and if the item isnt empty...
	
		player.inventory.push(item);																																	//put it in the players inventory
		player.gold -= price;																																				//take the cost of the itme off of the players gold 

		switch(shop.id) {
			case 'merchant': merchantItems[pos] = "";
				break;
			case 'aMerchant': aMerchantItems[pos] = "";
				break;
			case 'smithy': smithyItems[pos] = "";
				break;
		}																																											//set the item in the shop to "" (no dynamic way of doing this afaik)

		var parent = document.getElementById(shop.id + 'Item' + y + ',' + x);
		var child = document.getElementById(shop.id + 'tooltiptext' + y + ',' + x);
		
		parent.removeChild(child);																																		//removes the tooltip
		document.getElementById(shop.id + 'Item' + y + ',' + x).style.backgroundImage = 'url("sold.png")';						//changes the background of the item to be 'sold'
		document.getElementById(shop.id + 'Price' + y + ',' + x).innerHTML = 'Sold out!';													//changes the price div to be 'Sold out!'
		document.getElementById('shopAnnouncement').innerHTML = 'Item purchased';													//changes the announcement to be 'Item purchased '
	
	} else if (item == "") {																																				//else if its already been sold...
		document.getElementById('shopAnnouncement').innerHTML = 'This item is sold out';												//tell the player
	} else {																																									//if it hasnt been sold and you cant afford it...
		document.getElementById('shopAnnouncement').innerHTML = 'You dont have the gold to purchase this';				//tell the player
	}
	
	setTimeout(function() { document.getElementById('shopAnnouncement').innerHTML = ""; }, 2000);							//clears the announcement after 2 seconds
	
}

function popInv(item) {							//generates item thumbnails and tooltips for your inventory

	var x = 1;
	var output = "";

	player.inventory.sort(compare);																																					//sorts the items in player inventory by power rating
	
	var list = document.getElementsByClassName(item + 'Inv');
	length = list.length;
	
	for (var i = 0; i < length; i++, x++)	{
		document.getElementById(item + 'Inv').removeChild(document.getElementById(item + 'InvNo' + x));
	}																																																	//removes all the divs in the inventory as they will be reproduced later
	
	x = 1;
	
	for (var i = 0; i < player.inventory.length; i++) {																															//for each item in player inventory
	
		if ((player.inventory[i].type == item || ((item == 'weapon') && (player.inventory[i].type == 'sword' || player.inventory[i].type == 'staff')) || ((item == 'cons') && (player.inventory[i].type == 'potion' || player.inventory[i].type == 'food'))) || item == 'full') {
																																																		//if item selected in loop is equal to the item type inventory being shown
			var div = document.createElement('div');
			div.setAttribute('class', 'invItem tooltip ' + item + 'Inv');
			div.setAttribute('id', item + 'InvNo' + x); 
			div.setAttribute('onclick', 'equipItem(' + i + ', ' + item +')')																									//gen the item thumbnail and put it in the inventory div
			
			document.getElementById(item + 'Inv').appendChild(div);
			
			document.getElementById(item + 'InvNo' + x).style.backgroundImage = 'url(' + player.inventory[i].type + '.png)';
		
			div = document.createElement('span');
			div.setAttribute('class', 'tooltiptext');
			div.setAttribute('id', item + 'tooltiptext' + x);																														//generate the tooltip div and add it to the item
			
			document.getElementById(item + 'InvNo' + x).appendChild(div);
			
			for (y in player.inventory[i]) {																																				//for every property in 'item'
				if (y != 'consumable' && y != 'cost' && y != 'inShop' && player.inventory[i][y] != "")														//some properties i dont want to show in the shop tooltip, and if its not blank
					output = output + y + ': ' + player.inventory[i][y] + '<br>';																							//add the property and its value to the output variable
			}
			
			var z = item + 'tooltiptext' + x
			document.getElementById(z).innerHTML = output;																												//make the text of the tooltip the output var
			
			output = "";
		
			x++;
		
		}
	
	}
	
	var list = document.getElementsByClassName(item + 'Inv');
	console.log(list);

}

function compare(x,y) {							//sorts items by power

	if (x.power < y.power)
		return 1;
	if (x.power > y.power)
		return -1;
	return 0;
	
}

function equipItem(pos, itemType) {		//equips and item from your inventory, and unequips the equipped item. if no item already equipped just equips clicked item

	for (i = 0; i < player.equipped.length; i++) {																//for each item equipped (will be 6)
	
		if (player.equipped[i].type == itemType.id || (itemType.id == "weapon" && (player.equipped[i].type == "staff" || player.equipped[i].type == "sword"))) {
		
			if (player.equipped[i].power > 0) player.inventory.push(player.equipped[i]);		//if the equipped item has power (if something is currently equipped), push it onto the players inv
			player.equipped[i] = player.inventory[pos];														//overwrite the item being unequipped with the item being equipped
			player.inventory.splice(pos, 1);																			//remove that item from your inventory
			popInv(itemType.id);																							//update the inventory shown
			getStats();																											//update your stats
			break;
		
		}
	
	}

}

function getStats() {								//updates the players stats according to equipped items

	player.health = 100 + player.equipped[0].health + player.equipped[2].health + player.equipped[3].health + player.equipped[4].health;
	player.attack = 10 + player.equipped[1].attack + player.equipped[5].attack;
	player.defense = 10 + player.equipped[0].health + player.equipped[2].health + player.equipped[3].health + player.equipped[4].health;
	player.charisma = 10 + player.equipped[1].charisma;
	player.intelligence = 10 + player.equipped[1].intelligence + player.equipped[5].intelligence;
	
}

function hideAll() {									//hide all the output divs being shown

	var list = document.getElementsByClassName('outputDiv');				//gets every element with class 'outputDiv' (every one of the rectangular main divs)
	var num = list.length;																			//gets the length of list, ie the amount of divs in the background div

	for (i = 0; i < num; i++) {																		//for every div in the list do...
	
		if (list[i].style.display == 'block') {													//if its being shown...
		
			list[i].style.display = 'none';															//unshow it

		}
		
	}

}

function back() {										//goes back from a shop to the town

	var x = document.getElementsByClassName('shop');
	
	for (i = 0; i < x.length; i++) {																		//hides all the shops
		x[i].style.display = 'none';
	}
	
	document.getElementById('town').style.display = 'block';							//shows the town
	document.getElementById('backButton').style.display = 'none';					//hides the back button
	document.getElementById('shopAnnouncement').style.display = 'none';	//hides the shop announcement
	
}

function rearrange(openingId) {				//closes the open div, opens the div passed into it

	var list = document.getElementsByClassName('outputDiv');		//gets every element with class 'outputDiv' (every one of the rectangular main divs)
	var num = list.length;																	//gets the length of list, ie the amount of divs in the background div

	for (i = 0; i < num; i++) {																//for every div in the list do...
	
		if (list[i].style.display == 'block') {											//if its being shown...
		
			if (list[i].classList.contains('interaction') && 							//if its an interaction...
			   (openingId == 'inventory') && 											//and if its trying to open the map or inventory...
			   (list[i].id != 'openingMenuScr2')) {									//and its not the second intro menu (specific outlier)
				console.log('breaking');
				console.log(list[i].id);
				return 0;																			//dont change the screen as the player wont have access to either during an encounter
																										//they will have access to potions and consumables during a fight but that will be done separatly 
			}
		
			list[i].style.display = 'none';													//unshow the div list[i]
		
		}
	
	}
	
	document.getElementById('shopAnnouncement').style.display = 'none';
	document.getElementById('backButton').style.display = 'none';
	document.getElementById(openingId).style.display = 'block';	//show the div thats being opened
	
}

function rearrangeChance(chance, openingId1, openingId2) {		//closes open div and has 'chance'% of opening id1, else id2

	var randInt = (Math.floor(Math.random() * 100) + 1);						//gen a number between 1 and 100 (a percentage)	

	//var randInt = 51;																				//hardcoding encounter results to test them (bugtesting line)

	hideAll();

	if (randInt < chance) {																			//if the number generated is below the chance of the outcome happening...
	
		document.getElementById(openingId1).style.display = 'block';		//show that outcome
	
	} else {
	
		document.getElementById(openingId2).style.display = 'block';		//else show the other outcome
	
	}

}

function rearrangeCharacteristic(characteristic, limit, openingId1, openingId2) {			//if your characteristic is equal to or above the limit, open id1, else id2

	hideAll();
	
	console.log(openingId2);
	console.log(player[characteristic]);
	
	if (player[characteristic] >= limit) {																//if the characteristic is over the limit...
		
		document.getElementById(openingId1).style.display = 'block';				//display one outcome
	
	} else {																										//else...
	
		document.getElementById(openingId2).style.display = 'block';				//display another
		
	};

}