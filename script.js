var mapObj = {},
        merchantItems = [], aMerchantItems = [], smithyItems = [],
        pointNo = 0, pointsCleared = 0,
        innOpen = Math.floor(Math.random() * 2),
        innOut = Math.floor(Math.random() * 3) + 1,
        innSlept = false,
        inBattle = false,
        playthroughNo = 0;

var player = {

    health: {
        base: 100,
        current: 100,
        bonus: 0,
    },
    attack: {
        base: 10,
        current: 10,
        bonus: 0,
    },
    defense: {
        base: 10,
        current: 10,
        bonus: 0,
    },
    charisma: {
        base: 10,
        current: 10,
        bonus: 0,
    },
    intelligence: {
        base: 10,
        current: 10,
        bonus: 0,
    },
    gold: 1000,
    inventory: [],
    equipped: [],

    setUpPlayer: function () {
        player.changeHealth(0);
        player.changeGold(0);
        player.setUpEquipment();
        player.updateStats()
    },

    setUpEquipment: function () {
        player.equipped = [];
        for (var i = 0; i < 6; i++) {
            var item = new Item;
            switch (i) {
                case 0:
                    item.type = "helmet";
                    break;
                case 1:
                    item.type = "amulet";
                    break;
                case 2:
                    item.type = "armour";
                    break;
                case 3:
                    item.type = "leggings";
                    break;
                case 4:
                    item.type = "boots";
                    break;
                case 5:
                    item.type = "sword";
                    break;
            }
            item.consumable = false;
            item.regen = 0;
            item.health = 0;
            item.attack = 0;
            item.defense = 0;
            item.charisma = 0;
            item.intelligence = 0;
            item.power = 0;
            player.equipped.push(item);
        }
    },

    changeHealth: function (health) {
        var healthChanged = false;
        if (player.health.current <= (player.health.base + player.health.bonus) || health > 0) {
            player.health.current += health;
            healthChanged = true;
        }
        if (player.health.current <= 0) {
            player.health.current = 0;
        }
        if (player.health.current > (player.health.base + player.health.bonus)) {
            player.health.current = (player.health.base + player.health.bonus);
        }
        if (health === 0) {
            player.health.bonus = 0;
            player.health.current = 100;
        }
        document.getElementById("healthBar").style.width = ((player.health.current / (player.health.base + player.health.bonus)) * 100) + "%";
        document.getElementById("healthLabel").innerHTML = player.health.current + "/" + (player.health.base + player.health.bonus) + "hp";
        if (player.health.current == 0) {
            player.die();
        }
        return healthChanged;
    },

    changeGold: function (gold) {
        if (gold < 0) {
            gold = -gold;
            if (gold > player.gold) {
                return false;
            }
            player.gold -= gold;
            document.getElementById("gold").innerHTML = player.gold + " gold";
            return true;
        } else if (gold > 0) {
            player.gold += gold;
        }
        document.getElementById("gold").innerHTML = player.gold + " gold";
    },

    updateStats: function () {
        player.health.bonus = player.equipped[0].health + player.equipped[2].health + player.equipped[3].health + player.equipped[4].health;
        player.attack.bonus = player.equipped[1].attack + player.equipped[5].attack;
        player.defense.bonus = player.equipped[0].defense + player.equipped[2].defense + player.equipped[3].defense + player.equipped[4].defense;
        player.charisma.bonus = player.equipped[1].charisma;
        player.intelligence.bonus = player.equipped[1].intelligence + player.equipped[5].intelligence;

        player.attack.current = player.attack.base + player.attack.bonus;
        player.defense.current = player.defense.base + player.defense.bonus;
        player.charisma.current = player.charisma.base + player.charisma.bonus;
        player.intelligence.current = player.intelligence.base + player.intelligence.bonus;

        this.changeHealth(0);
    },

    /*changeStat: function (stat, amount) {
        player[stat].base += amount;
        player.updateStats();
    },*/

    die: function () {
        nav.open('defeat');
        document.getElementById('enemyHealthBarBG').style.display = 'none';
        document.getElementById('enemyHealthLabel').style.display = 'none';
        inBattle = false;
    },

};

var nav = {
    prevOpenDiv: "",

    open: function (ID, compID) {
        var list = document.getElementsByClassName('outputDiv'), interactionID = "", count = 1;

        if (ID.includes('output')) {
            while (parseInt(ID.slice(ID.length - count)) || parseInt(ID.slice(ID.length - count)) === 0) {
                interactionID = parseInt(ID.slice(ID.length - count));
                count++;
            }
            if (interactionID !== "") {
                interactionID = (interactionID === 0) ? "Boss" : interactionID;
                if (mapObj[interactionID].complete) {
                    return;
                }
                ID = ID.slice(0, ID.length - (count - 1));
                setOutputDiv(100, 'openingScr' + interactionID);
            }
        }
        for (var i = 0; i < list.length; i++) {
            if (list[i].style.display == 'block') {
                if (list[i].classList.contains('interaction') && (ID == 'inventory') && (list[i].id != 'openingMenuScr2')) {
                    return 0;
                }
                list[i].style.display = 'none';
                this.prevOpenDiv = list[i];
            }
        }
        if (typeof compID != "undefined" && compID != "null") {
            pointsCleared++;
            mapObj[compID].complete = true;
            document.getElementById("coord" + mapObj[compID].Y + "," + mapObj[compID].X).style.backgroundImage = "url(img/mapIconDone.png)"
        }

        if (ID == "loot") genLoot();
        document.getElementById('shopAnnouncement').style.display = 'none';
        document.getElementById('backButton').style.display = 'none';
        document.getElementById('doneButton').style.display = 'none';
        document.getElementById(ID).style.display = 'block';
    },

    back: function () {
        var list = document.getElementsByClassName('outputDiv');

        for (var j = 0; j < list.length; j++) {
            list[j].style.display = 'none';
        }

        this.prevOpenDiv.style.display = 'block';
        document.getElementById('backButton').style.display = 'none';
        document.getElementById('shopAnnouncement').style.display = 'none';
    }
};

var fight = {

    playerTurn: true,
    enemy: null,
    interactionNo: null,

    setUpFight: function (enemyType, interaction) {
        this.interactionNo = interaction;
        nav.open('fight');
        if (interaction != "bossFight") {
            this.enemy = this.genEnemy(enemyType);
        } else {
            this.enemy = new Enemy(enemyType, 100, 100, null, 5, 5);
        }
        inBattle = true;
        this.changeEnemyHealth(0);
        document.getElementById('enemyHealthBarBG').style.display = 'block';
        document.getElementById('enemyHealthLabel').style.display = 'block';
        document.getElementById('playerName').style.color = 'yellow';
        document.getElementById('enemyName').innerHTML = this.enemy.name;

        if (Math.random() > 0.8) {
            this.enemy.intention = 'block';
        } else {
            this.enemy.intention = 'attack';
        }
        document.getElementById('enemyIntention').innerHTML = this.enemy.intention;

        this.outputStats()
    },

    outputStats: function () {
        var output = "";
        output += "Attack: " + player.attack.current + "<br>";
        output += "Defense: " + player.defense.current + "<br>";
        output += "Charisma: " + player.charisma.current + "<br>";
        output += "Intelligence: " + player.intelligence.current + "<br>";
        document.getElementById('playerStats').innerHTML = output;

        output = "Attack: " + this.enemy.attack + "<br>";
        output += "Defense: " + this.enemy.defense + "<br>";
        document.getElementById('enemyStats').innerHTML = output;
    },

    attack: function (playersTurn) {
        if (!this.playerTurn && playersTurn) {
            return;
        }
        var damage = 0;
        var enemyDead = false;
        var dmgUp, dmgDown;
        var x;
        if (playersTurn) {
            x = this.enemy.defense;
            if (x > 75) {
                x = 75;
            }
            if (player.equipped[5].type == 'sword') {
                damage = Math.floor(player.attack.current - (player.attack.current * (x / 100)));
            } else {
                damage = Math.floor(player.intelligence.current - (player.intelligence.current * (x / 100)));
            }
            dmgUp = Math.round(damage + (damage * 0.1));
            dmgDown = Math.round(damage - (damage * 0.1));
            damage = Math.floor(Math.random() * (dmgUp - dmgDown)) + dmgDown;
            enemyDead = this.changeEnemyHealth(damage);
        } else {
            x = player.defense.current;
            if (x > 75) {
                x = 75;
            }
            damage = Math.floor(this.enemy.attack - (this.enemy.attack * (x / 100)));
            dmgUp = Math.round(damage + (damage * 0.1));
            dmgDown = Math.round(damage - (damage * 0.1));
            damage = Math.floor(Math.random() * (dmgUp - dmgDown)) + dmgDown;
            player.changeHealth(-damage);
        }
        if (playersTurn && !enemyDead) {
            document.getElementById('playerName').style.color = 'white';
            document.getElementById('enemyName').style.color = 'yellow';
            this.playerTurn = false;
            setTimeout(function () {
                fight.enemyTurn();
            }, 1000);
        }
    },

    enemyTurn: function () {
        if (this.enemy.intention == 'attack') {
            this.attack(false)
        }
        else if (this.enemy.intention == 'block') {
            this.enemy.defense = (Math.floor(this.enemy.defense * 1.1) == this.enemy.defense) ? (this.enemy.defense + 1) : Math.round(this.enemy.defense * 1.1);
            this.outputStats();
        }
        this.playerTurn = true;
        document.getElementById('playerName').style.color = 'yellow';
        document.getElementById('enemyName').style.color = 'white';

        var randInt = Math.floor(Math.random() * 5) + 1;
        if (randInt > 4) {
            this.enemy.intention = 'block';
        } else {
            this.enemy.intention = 'attack';
        }
        document.getElementById('enemyIntention').innerHTML = this.enemy.intention;
    },

    changeEnemyHealth: function (damage) {
        var enemyDead = false;
        this.enemy.hp -= damage;
        if (this.enemy.hp <= 0) {
            enemyDead = true;
            this.enemy.hp = 0;
        }
        document.getElementById("enemyHealthBar").style.width = ((this.enemy.hp / this.enemy.health) * 100) + "%";
        document.getElementById("enemyHealthLabel").innerHTML = this.enemy.hp + "/" + this.enemy.health + "hp";
        if (enemyDead) {
            this.victory();
        }
        return enemyDead;
    },

    genEnemy: function (type) {
        var enemy = new Enemy;
        var scalar = (pointsCleared / pointNo);
        scalar = (scalar < 0.2) ? 0.2 : scalar;

        enemy.name = type;
        enemy.attack = Math.floor(((Math.random() * 15) + 30) * scalar);
        enemy.defense = Math.floor(((Math.random() * 10) + 15) * scalar);
        enemy.health = Math.floor(((Math.random() * 100) + 150) * scalar);
        enemy.intention = 'attack';
        enemy.hp = enemy.health;
        return enemy;
    },

    victory: function () {
        document.getElementById('enemyHealthBarBG').style.display = 'none';
        document.getElementById('enemyHealthLabel').style.display = 'none';
        if (this.interactionNo != "bossFight") {
            mapObj[this.interactionNo].complete = true;
            nav.open('victoryScreen', this.interactionNo);
        } else {
            nav.open("output");
            setOutputDiv(100, "victory");
        }
        inBattle = false;
    }

};

function Item(type, consumable, regen, health, attack, defense, charisma, intelligence, power, cost) {
    this.type = type;
    this.consumable = consumable;
    this.regen = regen;
    this.health = health;
    this.attack = attack;
    this.defense = defense;
    this.charisma = charisma;
    this.intelligence = intelligence;
    this.power = power;
    this.cost = cost;
}

function Enemy(name, health, hp, intention, attack, defense) {
    this.name = name;
    this.health = health;
    this.hp = hp;
    this.intention = intention;
    this.attack = attack;
    this.defense = defense;
}

function invItemHover(itemType) {
    var output = "";
    var item;

    for (var i = 0; i < player.equipped.length; i++) {
        if (player.equipped[i].type == itemType || (itemType == 'weapon' && (player.equipped[i].type == 'sword' || player.equipped[i].type == 'staff'))) {
            item = player.equipped[i];
            break;
        }
    }

    document.getElementById('statsHoverName').innerHTML = item.type;

    for (var x in item) {
        if (x != 'consumable' && x != 'cost' && x != 'inShop' && x != 'type' && item[x] != "") {
            output += x + ': ' + item[x] + '<br>';
        }
    }
    document.getElementById('statsHoverContent').innerHTML = output;
}

function invItemHoverOut() {
    var output = "";
    document.getElementById('statsHoverName').innerHTML = "Stats";
    output += "Attack: " + player.attack.current + "<br>";
    output += "Defense: " + player.defense.current + "<br>";
    output += "Charisma: " + player.charisma.current + "<br>";
    output += "Intelligence: " + player.intelligence.current + "<br>";
    document.getElementById('statsHoverContent').innerHTML = output;
}

function genMap() {
    var pointCoord, x, y, div;

    document.getElementById("map").innerHTML = "";
    mapObj = {};
    //pointNo = Math.floor((Math.random() * 5) + 15);
    pointNo = 10;

    mapObj.town = {};
    mapObj.town.X = 30;
    mapObj.town.Y = 1;

    div = document.createElement('div');
    div.id = 'townIcon';
    div.className = 'iconCoord';
    div.setAttribute('onclick', 'nav.open("town")');
    document.getElementById('map').appendChild(div);
    genTown();

    pointCoord = Math.floor(Math.random() * 600);
    y = Math.floor(pointCoord / 30) + 1;
    x = ((pointCoord % 30) + 1);
    mapObj.Boss = {};
    mapObj.Boss.X = x;
    mapObj.Boss.Y = y;
    mapObj.Boss.complete = false;

    div = document.createElement('div');
    div.id = 'bossFight';
    div.className = 'iconCoord';
    div.setAttribute('onclick', 'nav.open("output0")');
    div.style.left = ((x * 20) - 10) + 'px';
    div.style.top = ((y * 20) - 10) + 'px';
    document.getElementById('map').appendChild(div);

    for (var i = 0; i < pointNo; i++) {
        pointCoord = Math.floor(Math.random() * 600);
        y = Math.floor(pointCoord / 30) + 1;
        x = ((pointCoord % 30) + 1);
        for (var key in mapObj) {
            if (mapObj[key].X != x || mapObj[key].Y != y) {
                mapObj[i + 1] = {};
                mapObj[i + 1].X = x;
                mapObj[i + 1].Y = y;
                mapObj[i + 1].complete = false;
            } else {
                i--;
                break;
            }
        }
        div = document.createElement('div');
        div.id = 'coord' + (y) + ',' + (x);
        div.className = 'iconCoord';
        div.setAttribute('onclick', 'nav.open("output' + (i+1) + '")');
        div.style.left = ((x * 20) - 10) + 'px';
        div.style.top = ((y * 20) - 10) + 'px';
        document.getElementById('map').appendChild(div);
    }
}

function genTown() {
    var randInt = (Math.floor(Math.random() * 3) + 1);
    var div;
    document.getElementById("town").innerHTML = "";

    switch (randInt) {
        case 1:
            document.getElementById('town').style.backgroundImage = "url(img/townLayout1.png)";

            div = document.createElement('div');
            div.setAttribute('class', 'shopHotspot inn');
            div.setAttribute('id', 'inn1');
            div.setAttribute('onclick', 'nav.open("inn"), genInn()');
            div.style.top = '14px';
            div.style.left = '14px';
            div.style.height = '167px';
            div.style.width = '97px';
            div.onmouseover = function () {
                document.getElementById('town').style.backgroundImage = "url(img/townLayout1IHover.png)"
            };
            div.onmouseout = function () {
                document.getElementById('town').style.backgroundImage = "url(img/townLayout1.png)"
            };

            document.getElementById('town').appendChild(div);

            div = document.createElement('div');
            div.setAttribute('class', 'shopHotspot smithy');
            div.setAttribute('id', 'smithy1p1');
            div.setAttribute('onclick', 'nav.open("smithy"), document.getElementById("backButton").style.display = "block"');
            div.style.top = '241px';
            div.style.left = '86px';
            div.style.height = '53px';
            div.style.width = '186px';
            div.onmouseover = function () {
                document.getElementById('town').style.backgroundImage = "url(img/townLayout1SHover.png)"
            };
            div.onmouseout = function () {
                document.getElementById('town').style.backgroundImage = "url(img/townLayout1.png)"
            };

            document.getElementById('town').appendChild(div);

            div = document.createElement('div');
            div.setAttribute('class', 'shopHotspot smithy');
            div.setAttribute('id', 'smithy1p2');
            div.setAttribute('onclick', 'nav.open("smithy"), document.getElementById("backButton").style.display = "block"');
            div.style.top = '294px';
            div.style.left = '179px';
            div.style.height = '112px';
            div.style.width = '93px';
            div.onmouseover = function () {
                document.getElementById('town').style.backgroundImage = "url(img/townLayout1SHover.png)"
            };
            div.onmouseout = function () {
                document.getElementById('town').style.backgroundImage = "url(img/townLayout1.png)"
            };

            document.getElementById('town').appendChild(div);

            div = document.createElement('div');
            div.setAttribute('class', 'shopHotspot merchant');
            div.setAttribute('id', 'merchant1');
            div.setAttribute('onclick', 'nav.open("merchant"), document.getElementById("backButton").style.display = "block"');
            div.style.top = '105px';
            div.style.left = '171px';
            div.style.height = '76px';
            div.style.width = '246px';
            div.onmouseover = function () {
                document.getElementById('town').style.backgroundImage = "url(img/townLayout1MHover.png)"
            };
            div.onmouseout = function () {
                document.getElementById('town').style.backgroundImage = "url(img/townLayout1.png)"
            };

            document.getElementById('town').appendChild(div);

            div = document.createElement('div');
            div.setAttribute('class', 'shopHotspot aMerchant');
            div.setAttribute('id', 'aMerchant1');
            div.setAttribute('onclick', 'nav.open("aMerchant"), document.getElementById("backButton").style.display = "block"');
            div.style.top = '241px';
            div.style.left = '404px';
            div.style.height = '62px';
            div.style.width = '202px';
            div.onmouseover = function () {
                document.getElementById('town').style.backgroundImage = "url(img/townLayout1AMHover.png)"
            };
            div.onmouseout = function () {
                document.getElementById('town').style.backgroundImage = "url(img/townLayout1.png)"
            };

            document.getElementById('town').appendChild(div);

            break;

        case 2:
            document.getElementById('town').style.backgroundImage = "url(img/townLayout2.png)";

            div = document.createElement('div');
            div.setAttribute('class', 'shopHotspot inn');
            div.setAttribute('id', 'inn2p1');
            div.setAttribute('onclick', 'nav.open("inn"), genInn()');
            div.style.top = '252px';
            div.style.left = '439px';
            div.style.height = '59px';
            div.style.width = '73px';
            div.onmouseover = function () {
                document.getElementById('town').style.backgroundImage = "url(img/townLayout2IHover.png)"
            };
            div.onmouseout = function () {
                document.getElementById('town').style.backgroundImage = "url(img/townLayout2.png)"
            };

            document.getElementById('town').appendChild(div);

            div = document.createElement('div');
            div.setAttribute('class', 'shopHotspot inn');
            div.setAttribute('id', 'inn2p2');
            div.setAttribute('onclick', 'nav.open("inn"), genInn()');
            div.style.top = '311px';
            div.style.left = '457px';
            div.style.height = '95px';
            div.style.width = '55px';
            div.onmouseover = function () {
                document.getElementById('town').style.backgroundImage = "url(img/townLayout2IHover.png)"
            };
            div.onmouseout = function () {
                document.getElementById('town').style.backgroundImage = "url(img/townLayout2.png)"
            };

            document.getElementById('town').appendChild(div);

            div = document.createElement('div');
            div.setAttribute('class', 'shopHotspot smithy');
            div.setAttribute('id', 'smithy2');
            div.setAttribute('onclick', 'nav.open("smithy"), document.getElementById("backButton").style.display = "block"');
            div.style.top = '135px';
            div.style.left = '179px';
            div.style.height = '59px';
            div.style.width = '185px';
            div.onmouseover = function () {
                document.getElementById('town').style.backgroundImage = "url(img/townLayout2SHover.png)"
            };
            div.onmouseout = function () {
                document.getElementById('town').style.backgroundImage = "url(img/townLayout2.png)"
            };

            document.getElementById('town').appendChild(div);

            div = document.createElement('div');
            div.setAttribute('class', 'shopHotspot merchant');
            div.setAttribute('id', 'merchant2');
            div.setAttribute('onclick', 'nav.open("merchant"), document.getElementById("backButton").style.display = "block"');
            div.style.top = '131px';
            div.style.left = '60px';
            div.style.height = '154px';
            div.style.width = '59px';
            div.onmouseover = function () {
                document.getElementById('town').style.backgroundImage = "url(img/townLayout2MHover.png)"
            };
            div.onmouseout = function () {
                document.getElementById('town').style.backgroundImage = "url(img/townLayout2.png)"
            };

            document.getElementById('town').appendChild(div);

            div = document.createElement('div');
            div.setAttribute('class', 'shopHotspot aMerchant');
            div.setAttribute('id', 'aMerchant2');
            div.setAttribute('onclick', 'nav.open("aMerchant"), document.getElementById("backButton").style.display = "block"');
            div.style.top = '134px';
            div.style.left = '422px';
            div.style.height = '59px';
            div.style.width = '143px';
            div.onmouseover = function () {
                document.getElementById('town').style.backgroundImage = "url(img/townLayout2AMHover.png)"
            };
            div.onmouseout = function () {
                document.getElementById('town').style.backgroundImage = "url(img/townLayout2.png)"
            };

            document.getElementById('town').appendChild(div);

            break;

        case 3:
            document.getElementById('town').style.backgroundImage = "url(img/townLayout3.png)";

            div = document.createElement('div');
            div.setAttribute('class', 'shopHotspot inn');
            div.setAttribute('id', 'inn3p1');
            div.setAttribute('onclick', 'nav.open("inn"), genInn()');
            div.style.top = '106px';
            div.style.left = '271px';
            div.style.height = '72px';
            div.style.width = '175px';
            div.onmouseover = function () {
                document.getElementById('town').style.backgroundImage = "url(img/townLayout3IHover.png)"
            };
            div.onmouseout = function () {
                document.getElementById('town').style.backgroundImage = "url(img/townLayout3.png)"
            };

            document.getElementById('town').appendChild(div);

            div = document.createElement('div');
            div.setAttribute('class', 'shopHotspot inn');
            div.setAttribute('id', 'inn3p2');
            div.setAttribute('onclick', 'nav.open("inn"), genInn()');
            div.style.top = '64px';
            div.style.left = '271px';
            div.style.height = '42px';
            div.style.width = '72px';
            div.onmouseover = function () {
                document.getElementById('town').style.backgroundImage = "url(img/townLayout3IHover.png)"
            };
            div.onmouseout = function () {
                document.getElementById('town').style.backgroundImage = "url(img/townLayout3.png)"
            };

            document.getElementById('town').appendChild(div);

            div = document.createElement('div');
            div.setAttribute('class', 'shopHotspot smithy');
            div.setAttribute('id', 'smithy3p1');
            div.setAttribute('onclick', 'nav.open("smithy"), document.getElementById("backButton").style.display = "block"');
            div.style.top = '237px';
            div.style.left = '75px';
            div.style.height = '52px';
            div.style.width = '138px';
            div.onmouseover = function () {
                document.getElementById('town').style.backgroundImage = "url(img/townLayout3SHover.png)"
            };
            div.onmouseout = function () {
                document.getElementById('town').style.backgroundImage = "url(img/townLayout3.png)"
            };

            document.getElementById('town').appendChild(div);

            div = document.createElement('div');
            div.setAttribute('class', 'shopHotspot smithy');
            div.setAttribute('id', 'smithy3p2');
            div.setAttribute('onclick', 'nav.open("smithy"), document.getElementById("backButton").style.display = "block"');
            div.style.top = '289px';
            div.style.left = '161px';
            div.style.height = '45px';
            div.style.width = '52px';
            div.onmouseover = function () {
                document.getElementById('town').style.backgroundImage = "url(img/townLayout3SHover.png)"
            };
            div.onmouseout = function () {
                document.getElementById('town').style.backgroundImage = "url(img/townLayout3.png)"
            };

            document.getElementById('town').appendChild(div);

            div = document.createElement('div');
            div.setAttribute('class', 'shopHotspot merchant');
            div.setAttribute('id', 'merchant3');
            div.setAttribute('onclick', 'nav.open("merchant"), document.getElementById("backButton").style.display = "block"');
            div.style.top = '126px';
            div.style.left = '14px';
            div.style.height = '52px';
            div.style.width = '144px';
            div.onmouseover = function () {
                document.getElementById('town').style.backgroundImage = "url(img/townLayout3MHover.png)"
            };
            div.onmouseout = function () {
                document.getElementById('town').style.backgroundImage = "url(img/townLayout3.png)"
            };

            document.getElementById('town').appendChild(div);

            div = document.createElement('div');
            div.setAttribute('class', 'shopHotspot aMerchant');
            div.setAttribute('id', 'aMerchant3');
            div.setAttribute('onclick', 'nav.open("aMerchant"), document.getElementById("backButton").style.display = "block"');
            div.style.top = '236px';
            div.style.left = '476px';
            div.style.height = '52px';
            div.style.width = '131px';
            div.onmouseover = function () {
                document.getElementById('town').style.backgroundImage = "url(img/townLayout3AMHover.png)"
            };
            div.onmouseout = function () {
                document.getElementById('town').style.backgroundImage = "url(img/townLayout3.png)"
            };

            document.getElementById('town').appendChild(div);

            break;
    }
    genInn();
    genShop('merchant');
    genShop('aMerchant');
    genShop('smithy');
}

function genInn() {
    var out = document.getElementById('innOut');
    var para1 = document.getElementById('innPara1');
    var para2 = document.getElementById('innPara2');

    if (!innSlept) {
        if (innOpen == 1) {
            switch (innOut) {
                case 1:
                    out.innerHTML = "You can hear the cheers of tennants inside enjoying their mugs of ale and decide that this could be a good place to spend the night and walk in. The cosy aesthetic of the inn is striking, a roaring fireplace in the middle of the "
                            + "room is keeping the room light and warm. You see elves and even a few humans filling out all of the tables at the inn. Clearly this place is popular. You walk up to the inn keeper, \"What'll it be friend?\".";
                    break;
                case 2:
                    out.innerHTML = "You walk into the inn, everyone seems cheery enough, chatting over mugs of ale and cups of wine. You see the inn keeper behind the bar, an upbeat looking man who also seems like he's broken up enough bar brawls in his time. You walk over to the "
                            + "bar and wait to be served. The keeper walks over to you, \"What can i get for you?\" he said in his jolly voice.";
                    break;
                case 3:
                    out.innerHTML = "Walking into the inn, you hear the noise of the merry chatter between tennants, telling overly exaggeratted stories about one of the many times they done something amazingly heroic. As well as elves you notice a few humans scattered around and "
                            + "decide that this could be a good play to rest for the night. You approach the inn keeper, \"What can I do you for on this fine evening sir?\".";
                    break;
            }
            para1.innerHTML = "1. 	\"A room for the night and a jug of your finest ale please\" (heals you for 50% of your missing hp - " + ((player.health.base + player.health.bonus) - player.health.current) / 2 + ")";
            para1.setAttribute('onclick', 'stayNight()');
            para2.innerHTML = "2. 	\"Hmmm, maybe another time\"";
            para2.setAttribute('onclick', 'nav.open("town")');
        } else {
            out.innerHTML = "You stroll up to the inn to see a sign hung on the door with big letters, \"NO MORE ROOMS LEFT\".";
            para1.innerHTML = "1. 	Dammit";
            para1.setAttribute('onclick', 'nav.open("town")');
            para2.innerHTML = "";
        }
    } else {
        out.innerHTML = "You've already slept the night, you should really go out adventuring again. Maybe sleep here again tonight...";
        para1.innerHTML = "1. 	To adventure!";
        para1.setAttribute('onclick', 'nav.open("town")');
        para2.innerHTML = "";
    }
}

function stayNight() {
    var out = document.getElementById('innOut');
    var para1 = document.getElementById('innPara1');
    var para2 = document.getElementById('innPara2');

    innSlept = player.changeHealth(((player.health.base + player.health.current) - player.health.current) / 2);
    if (!innSlept) {
        return 0;
    }

    out.innerHTML = "\"Of course!\", the inn keeper shouts, much louder than necessary. \"Take a seat and everything will be ready before you know it\". " +
            "He hands you a mug full to the brim of frothy ale and you head to one of the few free seats in the room and take a seat. "
            + "You take a looooong gulp of your ale...";
    para1.innerHTML = "1. 	Ahhhh, much better!";
    para1.setAttribute('onclick', 'nav.open("town")');
    para2.innerHTML = "";
    innSlept = true;
}

function genShop(shop) {
    var pos;
    var div = document.createElement('div');

    div.setAttribute('id', 'shopWelcome');
    if (shop == 'aMerchant') {
        div.innerHTML = 'Welcome to the arcane merchant';
    } else {
        div.innerHTML = 'Welcome to the ' + shop;
    }
    document.getElementById(shop).appendChild(div);

    for (var j = 0; j < 2; j++) {
        for (var i = 0; i < 5; i++) {
            pos = ((j * 5) + i);
            div = document.createElement('div');
            div.setAttribute('class', 'shopItem tooltip');
            div.setAttribute('id', shop + 'Item' + (j + 1) + ',' + (i + 1));
            div.setAttribute('onclick', 'buyItem(' + shop + ', ' + pos + ', ' + (j + 1) + ', ' + (i + 1) + ')');
            document.getElementById(shop).appendChild(div);

            //tooltips
            div = document.createElement('span');
            div.setAttribute('class', 'tooltiptext');
            div.setAttribute('id', shop + 'tooltiptext' + (j + 1) + ',' + (i + 1));
            document.getElementById(shop + 'Item' + (j + 1) + ',' + (i + 1)).appendChild(div);
        }
        for (i = 0; i < 5; i++) {
            div = document.createElement('div');
            div.setAttribute('class', 'shopPrice');
            div.setAttribute('id', shop + 'Price' + (j + 1) + ',' + (i + 1));
            document.getElementById(shop).appendChild(div);
        }
        if (j == 0) {
            div = document.createElement('div');
            div.setAttribute('id', 'bar');
            document.getElementById(shop).appendChild(div);
        }
    }
    populateShop(shop);
}

function genItem(inShop, type) {
    var scalar = pointsCleared / pointNo;
    scalar = (scalar < 0.2) ? 0.2 : scalar;
    scalar = (inShop) ? scalar - 0.1 : scalar;
    var item = new Item();
    if (typeof type === "undefined") {
        type = (Math.floor(Math.random() * 9) + 1);
    }
    var power = 100 * scalar;
    var variant = Math.floor(Math.random() * (power * 0.2));
    if (Math.random() >= 0.5) {
        variant = variant * -1;
    }

    item.consumable = false;
    item.regen = 0;
    item.health = 0;
    item.attack = 0;
    item.defense = 0;
    item.charisma = 0;
    item.intelligence = 0;
    item.power = 0;

    switch (type) {
        case 1:
            item.type = "sword";
            item.attack = Math.floor(power) + variant;
            break;
        case 2:
            item.type = "staff";
            item.intelligence = Math.floor(power + variant);
            break;
        case 3:
            item.type = "helmet";
            item.defense = Math.floor(power / 4) + variant;
            break;
        case 4:
            item.type = "amulet";
            item.attack = Math.floor(power / 3) + variant;
            item.charisma = Math.floor(power / 2) + variant;
            item.intelligence = Math.floor(power / 3) + variant;
            break;
        case 5:
            item.type = "armour";
            item.health = Math.floor(power * 3.5) + variant;
            item.defense = Math.floor(power / 3) + variant;
            break;
        case 6:
            item.type = "leggings";
            item.health = Math.floor(power * 2.5) + variant;
            item.defense = Math.floor(power / 4) + variant;
            break;
        case 7:
            item.type = "boots";
            item.defense = Math.floor(power / 4) + variant;
            break;
        case 8:
            item.type = "potion";
            item.consumable = true;
            item.regen = 20;
            break;
        case 9:
            item.type = "food";
            item.consumable = true;
            item.regen = 10;
    }
    item.power = power;
    item.cost = (type < 8) ? (2 * power) + variant : 2 * power;
    return item;
}

function genLoot() {
    var itemNoSel = Math.random(), itemNo, output = "", items = [], div;

    if (itemNoSel < 0.6) {
        itemNo = 1
    }
    else if (itemNoSel < 0.9) {
        itemNo = 2
    }
    else {
        itemNo = 3;
    }

    for (var i = 0; i < itemNo; i++) {
        output = "";
        do {
            items[i] = genItem(false);
        } while (items[i].consumable === true);
        div = document.createElement('div');
        div.className = 'lootItem';
        div.id = 'lootItem' + i;
        div.setAttribute('itemId', "" + i);
        div.style.backgroundImage = "url(img/" + items[i].type + ".png)";
        for (var y in items[i]) {
            if (y != 'consumable' && y != 'cost' && y != 'inShop' && items[i][y] != "") {
                output = output + y + ': ' + items[i][y] + '<br>';
            }
        }

        div.onclick = function (evt) {
            var itemId = parseInt(evt.target.getAttribute('itemId'));
            player.inventory.push(items[itemId]);
            document.getElementById('loot').removeChild(this);
        };
        div.style.top = (i + 1) * 120 + "px";
        document.getElementById('loot').appendChild(div);
        document.getElementById('lootItem' + i).innerHTML = output;
    }
    div = document.createElement('div');
    div.className = 'lootItem gold';
    div.id = 'lootItem' + i;
    div.setAttribute('itemId', "" + i);
    div.style.backgroundImage = "url(img/gold.png)";
    div.style.top = (i + 1) * 120 + "px";
    div.style.lineHeight = "100px";
    var gold = Math.floor(Math.random()*20) + 10;
    div.innerHTML = gold + " Gold";
    div.setAttribute("gold", "" + gold);
    div.onclick = function (e) {
        player.changeGold(parseInt(e.target.getAttribute("gold")));
        document.getElementById('loot').removeChild(this);
    };
    document.getElementById('loot').appendChild(div);
}

function populateShop(shop) {
    var item;
    var output = "";

    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 5; j++) {
            switch (shop) {
                case 'merchant':
                    do {
                        item = genItem(true);
                    } while (item.type == "staff" || item.type == "helmet" || item.type == "armour" || item.type == "leggings" || item.type == "boots");
                    merchantItems.push(item);
                    break;
                case 'smithy':
                    do {
                        item = genItem(true);
                    } while (item.type == "staff" || item.type == "amulet" || item.type == "potion" || item.type == "food");

                    smithyItems.push(item);
                    break;
                case 'aMerchant':
                    do {
                        item = genItem(true);
                    } while (item.type == "sword" || item.type == "helmet" || item.type == "armour" || item.type == "leggings" || item.type == "boots" || item.type == "food");
                    aMerchantItems.push(item);
                    break;
            }

            for (var x in item) {
                if (x != 'consumable' && x != 'cost' && x != 'inShop' && item[x] != "") {
                    output = output + x + ': ' + item[x] + '<br>';
                }
            }

            document.getElementById(shop + 'tooltiptext' + (i + 1) + ',' + (j + 1)).innerHTML = output;
            output = "";
            document.getElementById(shop + 'Item' + (i + 1) + ',' + (j + 1)).style.backgroundImage = 'url(img/' + item.type + '.png)';
            document.getElementById(shop + 'Price' + (i + 1) + ',' + (j + 1)).innerHTML = item.cost + 'GP';
        }
    }
}

function buyItem(shop, pos, y, x) {
    var item = eval(shop.id + 'Items[' + pos + ']');
    var price = item.cost;
    var sold = player.changeGold(-price);

    document.getElementById('shopAnnouncement').style.display = 'block';
    if (sold && item != "") {
        player.inventory.push(item);
        switch (shop.id) {
            case 'merchant':
                merchantItems[pos] = "";
                break;
            case 'aMerchant':
                aMerchantItems[pos] = "";
                break;
            case 'smithy':
                smithyItems[pos] = "";
                break;
        }

        document.getElementById(shop.id + 'Item' + y + ',' + x).removeChild(document.getElementById(shop.id + 'tooltiptext' + y + ',' + x));
        document.getElementById(shop.id + 'Item' + y + ',' + x).style.backgroundImage = 'url(img/sold.png)';
        document.getElementById(shop.id + 'Price' + y + ',' + x).innerHTML = 'Sold out!';
        document.getElementById('shopAnnouncement').innerHTML = 'Item purchased';

    } else if (item == "") {
        document.getElementById('shopAnnouncement').innerHTML = 'This item is sold out';
    } else {
        document.getElementById('shopAnnouncement').innerHTML = 'You dont have the gold to purchase this';
    }
    setTimeout(function () {
        document.getElementById('shopAnnouncement').innerHTML = "";
    }, 2000);

}

function popInv(item) {
    var x = 1, count = 0;
    var output = "";
    var currentItemDivs = document.getElementsByClassName(item + 'Inv'), listLength = currentItemDivs.length;

    player.inventory.sort(compare);
   /* for (var i = 0; i < listLength; i++) {
        if ((player.inventory[i].type == item || ((item == 'weapon') && (player.inventory[i].type == 'sword' || player.inventory[i].type == 'staff'))
                || ((item == 'cons') && (player.inventory[i].type == 'potion' || player.inventory[i].type == 'food'))) || item == 'full') {
            document.getElementById(item + 'Inv').removeChild(document.getElementById(item + 'InvNo' + x));
            x++;
        }
    }*/

    if (listLength !== 0) {
        for (var i = 0; i < listLength; i++) {
            document.getElementById(item + "Inv").removeChild(document.getElementById(currentItemDivs[i - count].id));
            count++;
        }
    }
    x = 1;

    for (i = 0; i < player.inventory.length; i++) {
        if ((player.inventory[i].type == item || ((item == 'weapon') && (player.inventory[i].type == 'sword' || player.inventory[i].type == 'staff'))
                || ((item == 'cons') && (player.inventory[i].type == 'potion' || player.inventory[i].type == 'food'))) || item == 'full') {
            var div = document.createElement('div');
            div.className = 'invItem tooltip ' + item + 'Inv';
            div.id = item + 'InvNo' + x;
            if (item !== "full") {
                div.setAttribute('onclick', 'equipItem(' + i + ', ' + item + ')');
            }

            document.getElementById(item + 'Inv').appendChild(div);
            document.getElementById(item + 'InvNo' + x).style.backgroundImage = 'url(img/' + player.inventory[i].type + '.png)';

            div = document.createElement('span');
            div.className = 'tooltiptext';
            div.id = item + 'tooltiptext' + x;
            document.getElementById(item + 'InvNo' + x).appendChild(div);

            for (var y in player.inventory[i]) {
                if (y != 'consumable' && y != 'cost' && y != 'inShop' && player.inventory[i][y] != "") {
                    output = output + y + ': ' + player.inventory[i][y] + '<br>';
                }
            }
            document.getElementById(item + 'tooltiptext' + x).innerHTML = output;
            output = "";
            x++;
        }
    }
}

function compare(x, y) {
    if (x.power < y.power) {
        return 1;
    }
    if (x.power > y.power) {
        return -1;
    }
    return 0;
}

function equipItem(pos, itemType) {
    var consumed = true;

    for (var i = 0; i < player.equipped.length; i++) {
        if (player.equipped[i].type == itemType.id || (itemType.id == "weapon" && (player.equipped[i].type == "staff" || player.equipped[i].type == "sword"))) {
            if (player.equipped[i].power > 0) {
                player.inventory.push(player.equipped[i]);
            }
            player.equipped[i] = player.inventory[pos];
            player.inventory.splice(pos, 1);
            player.updateStats();
            player.changeHealth(player.equipped[i].health);
            popInv(itemType.id);
            player.updateStats();
            invItemHoverOut();
            break;
        }

        if (player.inventory[pos].consumable) {
            consumed = player.changeHealth(player.inventory[pos].regen);
            if (!consumed) {
                break;
            }
            player.inventory.splice(pos, 1);
            if (inBattle) {
                nav.open('fight');
                document.getElementById('playerName').style.color = 'white';
                document.getElementById('enemyName').style.color = 'yellow';
                setTimeout(function () {
                    fight.enemyTurn();
                }, 1000);
            }
            popInv('cons');
            break;
        }
    }
}

function fadeIn(elementId) {
    var op = 0.1;
    var element = document.getElementById(elementId);
    element.style.opacity = "" + op;
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1) {
            clearInterval(timer);
        }
        element.style.opacity = "" + op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 50);
}

var interaction = {
    no0: function () {
        if (pointsCleared == pointNo) {
            setOutputDiv(100, "boss1");
        } else {
            setOutputDiv(100, "notBoss");
        }
    },
    no8: function () {
        var sel = Math.random(), item = {}, prevAtck, sword = true;
        if (player.equipped[5].type == 'sword') {
            item.type = 'sword';
            prevAtck = player.equipped[5].attack;
        } else {
            item.type = 'staff';
            sword = false;
            prevAtck = player.equipped[5].intelligence;
        }
        if (sel < 0.1) {
            item.consumable = false;
            item.regen = 0;
            item.health = 0;
            item.attack = 0;
            item.defense = 0;
            item.charisma = 0;
            item.intelligence = 0;
            item.power = 0;
            player.equipped[5] = item;
            interactions.broke8.opt1Onclick = "nav.open('inventory')";
            changeOut('broke8');
            setOutputDiv(100, 'broke8');
        } else if (sel < 0.6) {
            item = genItem(false, item.type);
            if (sword) {
                item.attack = prevAtck * 0.8
            }
            else {
                item.intelligence = prevAtck * 0.8;
            }
            interactions.bad8.opt1Onclick = "nav.open('inventory')";
            changeOut('bad8');
        } else if (sel < 0.9) {
            item = genItem(false, item.type);
            if (sword) {
                item.attack = prevAtck * 1.2
            }
            else {
                item.intelligence = prevAtck * 1.2;
            }
            interactions.good8.opt1Onclick = "nav.open('inventory')";
            changeOut('good8');
        } else {
            item = genItem(false, item.type);
            if (sword) {
                item.attack = prevAtck * 1.5
            }
            else {
                item.intelligence = prevAtck * 1.5;
            }
            interactions.great8.opt1Onclick = "nav.open('inventory')";
            changeOut('great8');
        }
    },
    no10: function() {
        populateShop('merchant');
        nav.open('merchant');
        document.getElementById("doneButton").style.display = "block";
    }
};

function setup() {
    genMap();
    setOutputDiv(100, 'startingMenu');
    nav.open("output");
    invItemHoverOut();
    player.setUpPlayer();

    document.getElementById('opt1').addEventListener("click", option1Click);
    document.getElementById('opt2').addEventListener("click", option2Click);
    document.getElementById('blueOpt').addEventListener("click", optionBlueClick);
}

/*function quit() {

}*/

function continuePlaythrough() {
    genMap();
    setOutputDiv(100, 'startingMenu');
    nav.open("output");
    playthroughNo++;
}

function option1Click(e) {
    var t = e.target;
    var func = t.getAttribute("opt1Func"), funcNo, funcName;
    if (func.includes(".")) {
        var pointIndex = func.indexOf(".");
        funcName = func.slice(0, pointIndex);
        funcNo = func.slice(pointIndex + 1);
        window[funcName][funcNo]();
    } else if (func) window[func](e);
}

function option2Click(e) {
    var t = e.target;
    var func = t.getAttribute("opt2Func"), funcNo, funcName;
    if (func.includes(".")) {
        var pointIndex = func.indexOf(".");
        funcName = func.slice(0, pointIndex);
        funcNo = func.slice(pointIndex + 1);
        window[funcName][funcNo]();
    } else if (func) window[func](e);
}

function optionBlueClick(e) {
    var t = e.target;
    var func = t.getAttribute("blueOptFunc"), funcNo, funcName;
    if (func.includes(".")) {
        var pointIndex = func.indexOf(".");
        funcName = func.slice(0, pointIndex);
        funcNo = func.slice(pointIndex + 1);
        window[funcName][funcNo]();
    } else if (func) window[func](e);
}

window.onload = setup;