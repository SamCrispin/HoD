var interactions = {
	'startingMenu': {						//Starting menus
		out: "Your name is Evandar Hrothgar. Your grandfather, a once decorated Warlord, brought dishonour to your family's name by desserting the scene of a great battle between your homeland of Demaxius and the Dark Elves of the south beyond the Dead Plains. 2 generations later, "
		+ "you wish to bring back honour to your family by recovering a powerful relic lost during the Great War. You have heard rumours of it being among the abandoned mines of the southern elves and decided to start there.",
		opt1: "1.	Continue",
		opt1Onclick: "changeOut(100, 'startingMenu2')",
	},
	'startingMenu2': {
		out: "After making the treacherous journey across the Dead Plains, the only things left in your possesion are your trusty oak staff, a few gold pieces left over from your time in Demaxius and the now rusty broadsword passed down from your grandfather. You arrive in the town of Elaris and "
		+ "after finding an innkeeper generous enough to offer you a room for the night in exchange for he little gold you have, you awake ready to explore!",
		opt1: "1.	Continue",
		opt1Onclick: "nav.open('inventory')",
	},
	'openingScr1': {						//Interaction 1
		out: "You enter the cave to hear the cackling of a small band of cave goblins and see the flickering light of a campfire round the corner. One of the goblins shockingly acute sense of smell catches onto your "
		+ "intrusion and before you can react, leaps round the corner, ready to fight.",
		opt1: "1.	Fight",
		opt1Onclick: "fight.setUpFight('Cave Goblin', 1)",
	},
	'openingScr2': {						//Interaction 2
		out: "You slowly walk into the abandoned mine, you don't notice anything amiss but that doesn't lessen the gradual feeling of dread growing inside your stomach. You hear a gentle scuttling behind you and turn to see a"
		+ " hugely oversized spider hanging from an equally oversized web, using all 8 of its eyes to stare at you.",
		opt1: "1.	Stand and fight",
		opt1Onclick: "fight.setUpFight('Giant Spider', 2)",
		opt2: "2.	Run into the cave and try to hide",
		opt2Onclick: "changeOut(50, 'hide2', 'fall2')",
	},
	'hide2': {
		out: "You turn and run to try and find a place to hide. After a minute or so you find a small indent in the cave and try and hide there. You hear the spider approaching. You close your eyes and pray to the gods that it doesn't notice you hiding.",
		opt1: "1.	Hold your breath",
		opt1Onclick: "changeOut(100, 'pass2', 'spotted2')",
	},
	'fall2': {
		out: "You turn to try and run but lose your footing in the uneven cave and fall, landing hard on the rocky floor. Before you've regained your composure, the spider is upon you.",
		opt1: "1.	Fight",
		opt1Onclick: "fight.setUpFight('Giant Spider', 2)",
	},
	'spotted2': {
		out: "The spider immediately spots your terrible hiding spot and attacks.",
		opt1: "1.	You curse your own stupidity and draw your sword to fight back",
		opt1Onclick: "fight.setUpFight('Giant Spider', 2)",
	},
	'spotted2': {
		out: "You hear the spider pass you and take a peek out of one eye to have a look. The oversized arachnid is still heading off in the wrong direction. You wait a while to make sure it doesn't return and then start walking back to the entrance of the cave."
		+ " You notice some less fortunate adventurers rotting on the floor, you hold your nose and rummage around for some loot before scurrying away.",
		opt1: "1.	Continue",
		opt1Onclick: "nav.open('loot', 2)",
	},
	'pass2': {
		out: "You hear the spider pass you and take a peek out of one eye to have a look. The oversized arachnid is still heading off in the wrong direction. You wait a while to make sure it doesn't return and then start walking back to the entrance of the cave."
		+ " You notice some less fortunate adventurers rotting on the floor, you hold your nose and rummage around for some loot before scurrying away.",
		opt1: "1.	Continue",
		opt1Onclick: "nav.open('loot', 2)",
	},
	'openingScr3': {						//Interaction 3
		out: "You wander into the old mine shaft, hands poised to draw your weapon in case of trouble. You find a hooded figure sitting next to a fire, watching the flames dance in front of him. As you draw your weapon, he says quietly \"I mean you no harm,"
		+ " but I will defend myself if needs be. Who are you and what are you doing down here?\".",
		opt1: "1.	Tell him of your backstory and quest",
		opt1Onclick: "changeOut(100, 'intrigued3', 'bored3', 'charisma', 13)",
		opt2: "2.	He could have loot! He lives in a cave on his own, no one will know he's gone right? Attack him!",
		opt2Onclick: "changeOut(100, 'fight3')",
	},
	'fight3': {
		out: "You draw your sword and walk towards him, the man quickly gets the message and gets up, readying his own weapon, \"Big misteak boyo\".",
		opt1: "1.	Fight",
		opt1Onclick: "fight.setUpFight('Odd Man', 3)",
	},
	'intrigued3': {
		out: "He\'s intrigued by your story and wishes he could help, \"I would give you something to help your quest but I already have very little to my name, hence...\" he gestures to the cave surrounding the two of you. \"Now, if you would be so kind to leave me in peace,"
		+ " I've got a lot of thinking to do.\" A strange aura of trust is now emanating from the man, somehow calming you, you put your weapon back on your hip.",
		opt1: "1.	Leave the man to his own mind, he seems to have enough weighing on it as it is",
		opt1Onclick: "nav.open('map')",
		blueOpt: "2.	Put emphasis on how much it would mean to you to complete the quest and you could do with any help you can get",
		blueOptOnclick: "changeOut(100, 'loot3')",
		blueOptDisplay: function() { blueOptDisplay('charisma', 17); },
	},
	'bored3': {
		out: "He\'s bored by your story and makes no comment, he goes back to being entranced by the dancing flames infront of him. After a short while, he looks up at you, \"You can leave now...\" he snaps.",
		opt1: "1.	You leave the odd man to himself, he clearly won't offer you anything",
		opt1Onclick: "nav.open('map', 3)",
	},
	'loot3': {
		out: "He lets out a long sigh and gets up. He takes the pack off of his back and reaches into it, after some rustling he hands you something, \"Take this and leave me alone\".",
		opt1: "1.	You greatfully accept his offer and leave him alone",
		opt1Onclick: "nav.open('loot', 3)",
	},
	'openingScr4': {						//Interaction 4
		out: "You walk into the cave ready for anything, only to discover that the cave is completely empty save for some shiny rocks dotted around. You admire the rocks momentarily before leaving the desolate cave. There's nothing here for you. Unless you really like rocks.",
		opt1: "1.	Continue",
		opt1Onclick: "nav.open('map', 4)",
	},
	'openingScr5': {						//Interaction 5
		out: "You walk into a small abandoned keep. It clearly hasn't been used since the war and time has taken its toll, walls are crumbling, doors are rotting and the paving cobbles are worn. The amount of nooks and crannies that a secret assailant"
		+ " could be hiding in concerns you however. As you cautiously walk through the corridors of the place, you spot a suspiciously placed chest and walk over to it.",
		opt1: "1.	Open the chest. You can't resist the possibility of loot!",
		opt1Onclick: "changeOut(50, 'trap5', 'loot5')",
		opt2: "2.	This is clearly a trap. Only a fool would fall for something so obvious!",
		opt2Onclick: "changeOut(100, 'leave5')",
	},
	'leave5': {
		out: "You walk away with a smug smile on your face. Knowing you've just avoided a potentially deadly trap fills you with a subtle sense of confidence for the rest of your journey as you continue out of the keep.",
		opt1: "1.	Continue",
		opt1Onclick: "nav.open('map', 5)",
	},
	'trap5': {
		out: "You open the chest and a crudely made flashbang goes off. Temporarily blinded and deafened a loud ringing, you stumble back and try to draw your sword. As you start to be able to see again, an armed man runs round the corner and"
		+ " sees you stumbling around trying to regain your senses. \"Wow! That worked?! I didn't think anyone would be so foolish to fall for something so obvious\". The man charges you with sword overhead.",
		opt1: "1.	Fight",
		opt1Onclick: "fight.setUpFight('Bandit', 5)",
	},
	'loot5': {
		out: "You open the chest to find loot, result! Still being suspicious you look around. Seeing no prying eyes, you grab the loot and hurry away.",
		opt1: "1.	Continue",
		opt1Onclick: "nav.open('loot', 5)",
	},
	'openingScr6':{							//Interaction 6
		out: "You wander into a cave that looks as though it could have recently been inhabited, a few empty bags strewn over the floor, crumbs from clumsily eaten loafs of bread and other signs of life scattered across the cave. You note nothing worth taking though,"
		+ " probably stripped bare by other travellers already. As you go deeper into the cave you start to hear what sounds like a high pitch squirming. You ready your sword and hurry round the corner.",
		opt1: "1.	Continue",
		opt1Onclick: "changeOut(100, 'midgeMan6')",
	},
	'midgeMan6': {
		out: "You round the corner to see a man, no more than 3 and a half feet in height, practising his swordsmanship with a sword clearly made for someone larger than him. Letting off high pitch grunts of exertion with every stroke which is the noise you mistook for a struggle."
		+ " He's so ingrossed in his activity that it seems he hasn't noticed you yet...",
		opt1: "1.	You're impressed by his swordsmanship, compliment him on it",
		opt1Onclick: "changeOut(100, 'compliment6')",
		opt2: "2.	You decide to leave the tiny man be, he looked no mug with a sword",
		opt2Onclick: "changeOut(100, 'leave6')",
	},
	'compliment6': {
		out: "Smiling, you comment on being impressed on the size of the sword the midget is using. He turns his head towards you with nothing but anger in his eyes and immediately charges at you and leaps at your face.",
		opt1: "1.	AHHHHHHH",
		opt1Onclick: "changeOut(100, 'ahh6')",
	},
	'ahh6': {
		out: "You manage to vault the tiny man over your head. You quickly realise that the remnants of previous inhabitants seen earlier were really from travellers unfortunate enough to come across this maniacal midget. You prepare your sword and get ready to fight.",
		opt1: "1.	Fight",
		opt1Onclick: "fight.setUpFight('Angry Midget', 6)",
	},
	'leave6': {
		out: "You feel like he may not be in mood for polite conversation and leave him to his own devices.",
		opt1: "1.	Continue",
		opt1Onclick: "nav.open('map', 6)",
	},
	'openingScr7': {						//Interaction 7
		out: "As you cautiously walk through the entrance to the castle on top of the hill you just spent ages scaling, you clearly weren't cautious enough because you immediately fall through a hole covered up by the ragged red carpet leading your way through the castle. "
		+ "Thankfully the fall wasn't far enough to break anything, just wind you a little and annoy you a lot. As you pick yourself up you are immediately faced by a heavily armoured man with a two handed great sword taller than you.",
		opt1: "1.     Oh dear...",
		opt1Onclick: "fight.setUpFight('Knight', 7)",
	},
	'openingScr8': {						//Interaction 8
		out: "You walk to the top of a hill where some ruins lay scattered atop it. You spot a lit bonfire, unusual given the broad daylight, and walk over to it. As you approach, you notice the colours of the flames changing and sparks being spat out. You soon realise that the changing "
		+ "colours are actually small spirits dancing around the flame, they all stop as you approach. In unison, they all turn to you and chant 'Are you ready to make a bet?? Sacrifice something and see what you get. Nothing but the best for the flame, or we'll all consider you really lame...'.",
		opt1: "1.	\"Uhhhh... ok???\". Throw your equipped weapon into the supposedly magical fire",
		opt1Onclick: "changeOut(100, 'sacrifice8')",
		opt2: "2.	I don't care if I'm lame, I really like my weapon... ",
		opt2Onclick: "changeOut(100, 'lame8')",
	},
	'sacrifice8': {
		out: "You toss your weapon into the fire, the spirits looking on in anticipation. The fire gobbles up your sacrifice and then starts rumbling... and keeps rumbling... and keeps rumbling... You roll your eyes and turn to leave after a few minutes, as soon as your back is turned, you hear "
		+ "a massive explosion behind you. Startled, you turn to see that the fire has launched something directly at your face.",
		opt1: "1.	Wait wha-",
		opt1Onclick: "changeOut(100, 'duck8')"
	},
	'duck8': {
		out: "You barely manage to duck out of the way of the projectile before it embeded itself in a tree behind you. You walk over to it and realise it's another weapon. Putting 2 hands on it you try and pull it out of the tree.",
		opt1: "1.	Pull!",
		opt1Onclick: "interaction.no8",
	},
	'lame8': {
		out: "With only a small dent to your dignity, you turn and walk away, being booed and jeered by the now angry fire spirits as you go.",
		opt1: "1.	At least I keep my weapon...",
		opt1Onclick: "nav.open('map')",
	},
	'broke8': {
		out: "You give the weapon a mighty tug and you fall backwards as it comes loose from the tree. Feeling triumphant, you look at your newly aquired equipment just to realise that half of it is still stuck in the tree. It hadn't come loose. It had broke. You hear the laughing and sniggering "
		+ "of the fire spirits behind you and angrily walk away cursing under your breath.",
		opt1: "1.	Just ignore them... I suppose I need a new weapon now",
	},
	'bad8': {
		out: "The weapong dislodges and you stumble back, you admire the craftsmanship of the piece and quickly realise that it's no where near as good as the one you sacrificed. Dissapointed, you look back at the spirits to see that they've already lost interest and are back to staring at "
		+ "the fire and waiting for the next person to come along.",
		opt1: "1.	Well, it could have been worse...",
	},
	'good8': {
		out: "It comes loose easier than you expected, you look at the fires creation and, much to your suprise, the new weapon seems a significant improvement to the one you threw in. Pleased with the outcome of this strange encounter, you look back to the onlooking spirits which are "
		+ "clearly also pleased with the outcome as they are dancing round the fire cheering. Very confused at the whole situation, you head off with your new weapon in hand.",
		opt1: "1.	Well then, onwards... I guess"
	},
	'great8': {
		out: "Before you even start pulling, the weapon comes loose and falls into your hand. You can instantly tell the quality of it just be looking at it. You hear excitable whispering behind you from the spirits and they suddenly start cheering \"FIRE KING!!!\". The spirits rush to your side and "
		+ "start gleefully circling you. You don't really know what to make of the situation so you hold tight to your lovely new addition to your inventory and run back down the hill. The spirits try to chase you but thankfully you outrun them. That chant would get annoying very quickly...",
		opt1: "1.	I don't know what just happened but I like it"
	},
	'openingScr9': {						//Interaction 9
		out: "You're wandering past a cave that looks so uninteresting you can't really even be bothered to explore inside of it, so you carry on wandering. Or you would have if a child, no more than 10 " +
		"or so, hadn't ran out of the cave desperately asking for your help. \"Please! My mother's hurt! She needs help quick!\". He gestures you to follow and runs back inside.",
		opt1: "1.   You can't just leave a kid's mother to die can you?",
		opt1Onclick: "changeOut(100, 'help9')",
		opt2: "2.	Hmmm... seems oddly suspicious, keep walking",
		opt2Onclick: "changeOut(100, 'walk9')"
	},
	'walk9': {
		out: "You feel bad for potentially leaving a kid to be destined an orphan but you don't know what was in that cave, there was as much chance of you dying in there from an ambush than a kids mother " +
		"who you owe nothing to.",
		opt1: "1.	Continue",
		opt1Onclick: "nav.open(map, 9)"
	},
	'help9': {
		out: "You follow the child into the dark cave, he's waiting at the end of the first tunnel. As he sees you, he hurries down the right fork. \"Hurry!\", You hear his echo rebounding off of the walls" +
		"making him sound as if you're surrounded. You round the final corner and you see the boy standing there.",
		opt1: "1.	\"Where is she?\"",
		opt1Onclick: "changeOut(50, 'trap9', 'notTrap9')"
	},
	'trap9': {
		out: "The child starts beaming with a meanacingly evil smile. \"Good work laddie\", you hear a gruff voice behind you say. You turn to a man, quite a bit taller than you, staring at you with an " +
		"extremely disturbing grin from ear to ear and a sword in each hand start running towards you. You draw your sword and prepare for a fight",
		opt1: "1.	Well you don't look injured, or like a mother for that matter",
		opt1Onclick: "fight.setUpFight('Dual Wielding Bandit', 9)"
	},
	'notTrap9': {
		out: "\"Just round here, hurry!\", you catch up to him to see his mother resting on the floor with a nasty gash in her stomach. You you remember you're grand father telling you about a wound not" +
		"too disimilar to this one from his time in the war. You spend some time tending to her wound as best you can.",
		opt1: "1.	Continue",
		opt1Onclick: "changeOut(100, 'helping9')"
	},
	'helping9': {
		out: "After a while, the mother wakes up having recovered a little. The two of them thank you, \"Please\" she said, \"Take this, we haven't got a need for it\". You thank the pair and open up " +
		"the bundle of cloth you got and see what it is.",
		opt1: "1.	Continue",
		opt1Onclick: "nav.open('loot', 9)"
	}
};

function changeOut(chance, interaction1, interaction2, characteristic, limit) {
	var randInt = Math.floor(Math.random() * 100);
	var interaction = "";
	document.getElementById('blueOpt').style.display = 'none';
	if (characteristic != null && player[characteristic].current > limit) { interaction = interactions[interaction1] }
	else if (characteristic != null) { interaction = interactions[interaction2]; }
	else { 
		if (randInt <= chance) { interaction = interactions[interaction1]; }
		else interaction = interactions[interaction2];
	}

	if (typeof interaction.opt2 === 'undefined') interaction.opt2 = "";
	if (typeof interaction.blueOpt === 'undefined') interaction.blueOpt = "";
	if (typeof interaction.blueOptDisplay !== 'undefined') interaction.blueOptDisplay();
	
	document.getElementById('outputContent').innerHTML = interaction.out;
	document.getElementById('opt1').innerHTML = interaction.opt1;
	document.getElementById('opt1').setAttribute('onclick', interaction.opt1Onclick);
	document.getElementById('opt2').innerHTML = interaction.opt2;
	if (interaction.opt2 !== '') document.getElementById('opt2').setAttribute('onclick', interaction.opt2Onclick);
	document.getElementById('blueOpt').innerHTML = interaction.blueOpt;
	if (interaction.blueOpt !== '') document.getElementById('blueOpt').setAttribute('onclick', interaction.blueOptOnclick);
}

function blueOptDisplay(characteristic, limit) {
	if (player[characteristic].current > limit) document.getElementById('blueOpt').style.display = 'block';
}