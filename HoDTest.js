var out = document.getElementById('outputContent');
var para1 = document.getElementById('opt1');
var para2 = document.getElementById('opt2');
var head = document.getElementById('blueOpt')

function changeOutput(openingScreen) {
	
	para2.innerHTML = "";
	head.innerHTML = "";
	head.style.display = 'none';
	
	switch (openingScreen) {
														//Opening screen
		case 'openingMenu': 
			out.innerHTML = "Your name is Evandar Hrothgar. Your grandfather, a once decorated Warlord, brought dishonour to your family's name by desserting the scene of a great battle "
			+ "between your homeland of Demaxius and the Dark Elves of the south beyond the Dead Plains. 2 generations later, you wish to bring back honour to your family by recovering a powerful relic lost during the Great War. " 
			+ "You have heard rumours of it being among the abandoned mines of the southern elves and decided to start there.";
			para1.innerHTML = "1. 	Continue";
			para1.setAttribute('onclick', 'changeOutput("openingMenu2")');
			break;
		case 'openingMenu2': 
			out.innerHTML = "After making the treacherous journey across the Dead Plains, the only things left in your possesion are your trusty oak staff, a few gold pieces left over from your time in Demaxius and the now rusty "
			+ "broadsword passed down from your grandfather. You arrive in the town of Elaris and after finding an innkeeper generous enough to offer you a room for the night in exchange for he little gold you have, you awake ready "
			+ "to explore!";
			para1.setAttribute('onclick', 'nav.open("inventory")');
			break;
														//Inns
		case 'inn1':
			out.innerHTML = "You can hear the cheers of tennants inside enjoying their mugs of ale and decide that this could be a good place to spend the night and walk in. The cosy aesthetic of the inn is striking, a roaring fireplace in the middle of the room is keeping the room light and"
			+ " warm. You see elves and even a few humans filling out all of the tables at the inn. Clearly this place is popular. You walk up to the inn keeper, \"What'll it be friend?\".";
			para1.innerHTML = "\"A room for the night and a jug of your finest ale please\" (heals you for 50% of your missing hp - " + (player.health - player.hp) / 2 + ")";
			para1.setAttribute('onclick', 'stayNight()');
			para2.innerHTML = "\"Hmmm, maybe another time\"";
			para2.setAttribute('onclick', 'nav.open("town")');
			break;
		case 'inn2':
			out.innerHTML = "You walk into the inn, everyone seems cheery enough, chatting over mugs of ale and cups of wine. You see the inn keeper behind the bar, an upbeat looking man who also seems like he's broken up enough bar brawls in his time. You walk over to the bar "
			+ "and wait to be served. The keeper walks over to you, \"What can i get for you?\" he said in his jolly voice.";
			para1.innerHTML = "\"A room for the night and a jug of your finest ale please\" (heals you for 50% of your missing hp - " + (player.health - player.hp) / 2 + ")";
			para1.setAttribute('onclick', 'stayNight()');
			para2.innerHTML = "\"Hmmm, maybe another time\"";
			para2.setAttribute('onclick', 'nav.open("town")');
			break;
		case 'inn3':
			out.innerHTML = "Walking into the inn, you hear the noise of the merry chatter between tennants, telling overly exaggeratted stories about one of the many times they done something amazingly heroic. As well as elves you notice a few humans scattered around and decide that "
			+ "this could be a good play to rest for the night. You approach the inn keeper, \"What can I do you for on this fine evening sir?\".";
			para1.innerHTML = "\"A room for the night and a jug of your finest ale please\" (heals you for 50% of your missing hp - " + (player.health - player.hp) / 2 + ")";
			para1.setAttribute('onclick', 'stayNight()');
			para2.innerHTML = "\"Hmmm, maybe another time\"";
			para2.setAttribute('onclick', 'nav.open("town")');
			break;
		case 'night':
			out.innerHTML = "\"Of course!\", the inn keeper shouts, much louder than necessary. \"Take a seat and everything will be ready before you know it\". He hands you a mug full to the brim of frothy ale and you head toone of hte few free seats in the room and take a seat. "
			+ "You take a looooong gulp of your ale...";
			para1.innerHTML = "Ahhhh, much better!";
			para1.setAttribute('nav.open("town")');
		case 'innClosed':
			out.innerHTML = "You stroll up to the inn to see a sign hung on the door with big letters, \"NO MORE ROOMS LEFT\".";
			para1.innerHTML = "Dammit";
			para1.setAttribute('onclick', 'nav.open("town")');
			break;
														//Interaction 1
		case 'openingScr1':
			out.innerHTML = "You enter the cave to hear the cackling of a small band of cave goblins and see the flickering light of a campfire round the corner. One of the goblins shockingly acute sense of smell catches onto your "
			+ "intrusion and before you can react, leaps round the corner, ready to fight."
			para1.innerHTML = "1. 	Fight";
			para1.setAttribute('onclick', 'nav.open("fight")');
			break;
														//Interaction 2
		case 'openingScr2': 
			out.innerHTML = "You slowly walk into the abandoned mine, you don't notice anything amiss but that doesn't lessen the gradual feeling of dread growing inside your stomach. You hear a gentle scuttling behind you and turn to see a"
			+ " hugely oversized spider hanging from an equally oversized web, using all 8 of its eyes to stare at you.";
			para1.innerHTML = "1. 	Stand and fight";
			para1.setAttribute('onclick', 'nav.open("fight")');
			para2.innerHTML = "2. 	Run into the cave and try to hide";
			para2.setAttribute('onclick', 'changeOutputChance(50, "hide2", "fall2")');
			break;
														//Interaction 3
		case 'openingScr3':
			out.innerHTML = "You wander into the old mine shaft, hands poised to draw your weapon in case of trouble. You find a hooded figure sitting next to a fire, watching the flames dance in front of him. As you draw your weapon, he says quietly \"I mean you no harm,"
			+ " but I will defend myself if needs be. Who are you and what are you doing down here?\"."
			para1.innerHTML = "1. 	Tell him of your backstory and quest";
			para1.setAttribute('onclick', 'changeOutputCharacteristic("charisma", 13, "intrigued3", "bored3")');
			para2.innerHTML = "2. 	He could have loot! He lives in a cave on his own, no one will know he's gone right? Attack him!";
			para2.setAttribute('onclick', 'changeOutput("fight3")');
			break;
		case 'fight3': 
			out.innerHTML = "You draw your sword and walk towards him, the man quickly gets the message and gets up, readying his own weapon, \"Big misteak boyo\".";
			para1.innerHTML = "1. 	Fight";
			para1.setAttribute('onclick', 'nav.open("fight")');
			break;
		case 'loot3':
			out.innerHTML = "He lets out a long sigh and gets up. He takes the pack off of his back and reaches into it, after some rustling he hands you something, \"Take this and leave me alone\".";
			para1.innerHTML = "1. 	You hold out your hand and take what he\'s giving you";
			para1.setAttribute('onclick', 'nav.open("loot")');
			break;
														//Interaction 4
		case 'openingScr4':
			out.innerHTML = "You walk into the cave ready for anything, only to discover that the cave is completely empty save for some shiny rocks dotted around. You admire the rocks momentarily before leaving the desolate cave. There's nothing here for you. Unless you really like rocks.";
			para1.innerHTML = "1. 	Continue";
			para1.setAttribute('onclick', 'nav.open("map")');
			break;
														//Interaction 5
		case 'openingScr5': 
			out.innerHTML = "You walk into a small abandoned keep. It clearly hasn't been used since the war and time has taken its toll, walls are crumbling, doors are rotting and the paving cobbles are worn. The amount of nooks and crannies that a secret assailant"
			+ " could be hiding in concerns you however. As you cautiously walk through the corridors of the place, you spot a suspiciously placed chest and walk over to it.";
			para1.innerHTML = "1. 	Open the chest. You can't resist the possibility of loot!";
			para1.setAttribute('onclick', 'changeOutputChance(50, "trap5", "loot5")');
			para2.innerHTML = "2. 	This is clearly a trap. Only a fool would fall for something so obvious!";
			para2.setAttribute('onclick', 'changeOutput("leave5")');
			break;
		case 'leave5':
			out.innerHTML = "You walk away with a smug smile on your face. Knowing you've just avoided a potentially deadly trap fills you with a subtle sense of confidence for the rest of your journey as you continue out of the keep.";
			para1.innerHTML = "1. 	Continue";
			para1.setAttribute('onclick', 'nav.open("map")');
			break;
														//Interaction 6
		case 'openingScr6': 
			out.innerHTML = "You wander into a cave that looks as though it could have recently been inhabited, a few empty bags strewn over the floor, crumbs from clumsily eaten loafs of bread and other signs of life scattered across the cave. You note nothing worth taking though,"
			+ " probably stripped bare by other travellers already. As you go deeper into the cave you start to hear what sounds like a high pitch squirming. You ready your sword and hurry round the corner.";
			para1.innerHTML = "1. 	Continue";
			para1.setAttribute('onclick', 'changeOutput("midgeMan6")');
			break;
		case 'midgeMan6':
			out.innerHTML = "You round the corner to see a man, no more than 3 feet in height, practising his swordsmanship with a sword clearly made for a normal sized person. Letting off high pitch grunts of exertion after every stroke which is what you mistook for a struggle. Smiling,"
			+ " you comment on being impressed on the size of the sword the midget is using. He turns his head towards you with nothing but anger in his eyes and immediately charges at you and leaps at your face."
			para1.innerHTML = "1. 	AHHHHHHH!";
			para1.setAttribute('onclick', 'changeOutput("ahh6")');
			break;
		case 'ahh6':
			out.innerHTML = "You manage to vault the tiny man over your head. You quickly realise that the remnants of previous inhabitants seen earlier were really from travellers unfortunate enough to come across this maniacal midget. You prepare your sword and get ready to fight.";
			para1.innerHTML = "1. 	Fight";
			para1.setAttribute('onclick', 'nav.open("fight")');
			break;
														//Interaction 7
		case 'openingScr7':
			out.innerHTML = "As you cautiously walk through the entrance to the castle on top of the hill you just spent ages scaling, you clearly weren’t cautious enough because you immediately fall through a hole covered up by the ragged red carpet leading your way through the castle. "
			+ "Thankfully the fall wasn’t far enough to break anything, just wind you a little and annoy you a lot. As you pick yourself up you are immediately faced by a heavily armoured man with a two handed great sword taller than you.";
			para1.innerHTML = "Oh dear...";
			para1.setAttribute('onclick', 'nav.open("fight")');
	}	
}

function changeOutputChance(chance, openingScreen1, openingScreen2) {
	
	var openingScreen;
	var randInt = (Math.floor(Math.random() * 100) + 1);
	if (randInt < chance) { openingScreen = openingScreen1 }
	else openingScreen = openingScreen2;
	para2.innerHTML = "";
	head.innerHTML = "";
	head.style.display = 'none';
	
	switch (openingScreen) {
														//Interaction 2
		case 'hide2': 
			out.innerHTML = "You turn and run to try and find a place to hide. After a minute or so you find a small indent in the cave and try and hide there. You hear the spider approaching. You close your eyes and pray to the gods that it doesn't notice you hiding."
			para1.innerHTML = "1. 	Hold your breath!"
			para1.setAttribute('onclick', 'changeOutputChance(50, "pass2", "spotted2")');
			break;
		case 'fall2': 
			out.innerHTML = "You turn to try and run but lose your footing in the uneven cave and fall, landing hard on the rocky floor. Before you've regained your composure, the spider is upon you."
			para1.innerHTML = "1. 	Fight"
			para1.setAttribute('onclick', 'nav.open("fight")');
			break;
		case 'pass2':
			out.innerHTML = "You hear the spider pass you and take a peek out of one eye to have a look. The oversized arachnid is still heading off in the wrong direction. You wait a while to make sure it doesn't return and then start walking back to the entrance of the cave."
			+ " You notice some less fortunate adventurers rotting on the floor, you hold your nose and rummage around for some loot before scurrying away.";
			para1.innerHTML = "1. 	Continue";
			para1.setAttribute('onclick', 'nav.open("loot")');
			break;
		case 'spotted2': 
			out.innerHTML = "The spider immediately spots your terrible hiding spot and attacks.";
			para1.innerHTML = "1. 	You curse your own stupidity and draw your sword to fight back";
			para1.setAttribute('onclick', 'nav.open("fight")');
			break;
														//Interaction 5
		case 'trap5':
			out.innerHTML = "You open the chest and a crudely made flashbang goes off. Temporarily blinded and deafened a loud ringing, you stumble back and try to draw your sword. As you start to be able to see again, an armed man runs round the corner and"
			+ " sees you stumbling around trying to regain your senses. \"Wow! That worked?! I didn't think anyone would be so foolish to fall for something so obvious\". The man charges you with sword overhead.";
			para1.innerHTML = "1. 	Fight";
			para1.setAttribute('onclick', 'nav.open("fight")');
			break;
		case 'loot5':
			out.innerHTML = "You open the chest to find loot, result! Still being suspicious you look around. Seeing no prying eyes, you grab the loot and hurry away.";
			para1.innerHTML = "1. 	Continue";
			para1.setAttribute('onclick', 'nav.open("loot")');
		}
}

function changeOutputCharacteristic(characteristic, limit, openingScreen1, openingScreen2) {
	
	var openingScreen;
	if (player[characteristic] > limit) { openingScreen = openingScreen1 }
	else openingScreen = openingScreen2;
	para2.innerHTML = "";
	head.innerHTML = "";
	head.style.display = 'none';
	
	switch (openingScreen) {
														//Interaction 3
		case 'intrigued3':
			out.innerHTML = "He\'s intrigued by your story and wishes he could help, \"I would give you something to help your quest but I already have very little to my name, hence...\" he gestures to the cave surrounding the two of you. \"Now, if you would be so kind to leave me in peace,"
			+ " I've got a lot of thinking to do.\" A strange aura of trust is now emanating from the man, somehow calming you, you put your weapon back on your hip.";
			para1.innerHTML = "1. 	Leave the man to his own mind, he seems to have enough weighing on it as it is";
			para1.setAttribute('onclick', 'nav.open("map")');
			if (player.charisma > 17) head.style.display = 'block';
			head.innerHTML = "2.     Put emphasis on how much it would mean to you to complete the quest and you could do with any help you can get";
			head.setAttribute('onclick', 'changeOutput("loot3")');
			break;
		case 'bored3':
			out.innerHTML = "He\'s bored by your story and makes no comment, he goes back to being entranced by the dancing flames infront of him. After a short while, he looks up at you, \"You can leave now...\" he snaps.";
			para1.innerHTML = "1.     You leave the odd man to himself, he clearly won't offer you anything";
			para1.setAttribute('onclick', 'nav.open("map")');
			break;
	}
	
}