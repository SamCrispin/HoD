var interactions = {
    'startingMenu': {						//Starting menus
        out: "Your name is Evandar Hrothgar. Your grandfather, a once decorated Warlord, brought dishonour to your family's name by deserting the scene of a great battle between your homeland of Demaxius and the Dark Elves of the south beyond the Dead Plains. 2 generations later, "
        + "you wish to bring back honour to your family by recovering a powerful relic lost during the Great War. You have heard rumours of it being among the abandoned mines of the southern elves and decided to start there.",
        opt1: "1.	Continue",
        opt1Onclick: "changeOut",
        opt1chance: 100,
        opt1open1: "startingMenu2"
    },
    'startingMenu2': {
        out: "After making the treacherous journey across the Dead Plains, the only things left in your possession are your trusty oak staff, a few gold pieces left over from your time in Demaxius and the now rusty broadsword passed down from your grandfather. You arrive in the town of Elaris and "
        + "after finding an innkeeper generous enough to offer you a room for the night in exchange for he little gold you have, you awake ready to explore!",
        opt1: "1.	Continue",
        opt1Onclick: "buildOpen",
        opt1open: "inventory",
        opt1interaction: 99
    },
    'openingScrBoss': {                        //Boss Fight
        out: "The cave you've meandered into seems darker than any others that you've seen before, you can barely see your hand in front of your face. A creeping sense of dread is accompanying the intense surrounding black. You continue deeper nonetheless. " +
        "You turn a corner and start to hear a periodic rumbling, the sound is reverberating around you and even shaking the rock beneath your feet.",
        opt1: "1.   Continue",
        opt1Onclick: "interaction.no0"
    },
    'boss1': {
        out: "Much against your better judgement, you tentatively carry on forwards, making sure to keep your footing on the rumbling ground beneath you. A painfully loud crashing behind you makes you jump out of your skin and you spin around to see " +
        "a massive stalactite shattered on the floor blocking your exit. You don't wait around to see if any other fancy rock formations are dropping from the ceiling and hastily make your way to the other end of the rocky corridor.",
        opt1: "1.   Continue",
        opt1Onclick: "changeOut",
        opt1chance: 100,
        opt1open1: "boss2"
    },
    'boss2': {
        out: "Passing under the naturally formed rock arch, you see it. The Heart Of Demaxius. Sitting on top of a pile of other treasure, the redemption for your family's name, your ticket for a role in the army, what you've dedicated years of your life " +
        "researching and looking for. You now stand in front of it, separated only by a 15 feet tall cave troll that was just woken up by the falling stalactite that only narrowly missed you. You don't know much about cave trolls, but one thing you do " +
        "know is the fact that waking up a cave troll before it wants to is a death sentence. You didn't wake him up... but he doesn't know that...",
        opt1: "1.   Well shit",
        opt1Onclick: "buildFight",
        opt1enemy: "Cave Troll",
        opt1interaction: "bossFight"
    },
    'notBoss': {
        out: "That sound is deep enough that the beast it came from could easily be twice the size of you, you think it best to not venture any further yet and turn to walk away.",
        opt1: "1.   Maybe another time",
        opt1Onclick: "buildOpen",
        opt1open: "map"
    },
    'victory': {                            //Win
        out: "You land your last blow onto the troll, and it staggers. It falls to its knees, and then to to its front with a tremendous crash. As the adrenaline starts draining from your veins and you regain composure, " +
        "you remember what you came here for. You step over the giant body of your fallen foe and towards the Heart of Demaxius.",
        opt1: "1.   Shiny...",
        opt1Onclick: "changeOut",
        opt1open1: "victory2",
        opt1chance: 100
    },
    'victory2': {
        out: "Holding your prize in your hands almost doesn't feel real, you stare in awe at the gemstones' detail, even after all these years its been sitting in a cave. Snapping out of your entrancement, you hurry to the exit not wanting to wait for " +
        "any more cave trolls. They may be solitary beasts but you'd rather not risk it. You dig your way out of the cave and make the long journey back to the town to rest up before the longer journey back home. You can't wait to see the looks on " +
        "your family's faces...",
        opt1: "1.   Continue",
        opt1Onclick: "buildOpen",
        opt1open: "finalScreen"
    },
    'openingScr1': {						//Interaction 1
        out: "You enter the cave to hear the cackling of a small band of cave goblins and see the flickering light of a campfire round the corner. One of the goblins shockingly acute sense of smell catches onto your "
        + "intrusion and before you can react, leaps round the corner, ready to fight.",
        opt1: "1.	Fight",
        opt1Onclick: "buildFight",
        opt1enemy: "Cave Goblin",
        opt1interaction: 1
    },
    'openingScr2': {						//Interaction 2
        out: "You slowly walk into the abandoned mine, you don't notice anything amiss but that doesn't lessen the gradual feeling of dread growing inside your stomach. You hear a gentle scuttling behind you and turn to see a"
        + " hugely oversized spider hanging from an equally oversized web, using all 8 of its eyes to stare at you.",
        opt1: "1.	Stand and fight",
        opt1Onclick: "buildFight",
        opt1enemy: "Giant Spider",
        opt1interaction: 2,
        opt2: "2.	Run into the cave and try to hide",
        opt2Onclick: "changeOut",
        opt2chance: 50,
        opt2open1: "hide2",
        opt2open2: "fall2"
    },
    'hide2': {
        out: "You turn and run to try and find a place to hide. After a minute or so you find a small indent in the cave and try and hide there. You hear the spider approaching. You close your eyes and pray to the gods that it doesn't notice you hiding.",
        opt1: "1.	Hold your breath",
        opt1Onclick: "changeOut",
        opt1chance: 50,
        opt1open1: "pass2",
        opt1open2: "spotted2"
    },
    'fall2': {
        out: "You turn to try and run but lose your footing in the uneven cave and fall, landing hard on the rocky floor. Before you've regained your composure, the spider is upon you.",
        opt1: "1.	Fight",
        opt1Onclick: "buildFight",
        opt1enemy: "Giant Spider",
        opt1interaction: 2,
    },
    'spotted2': {
        out: "The spider immediately spots your terrible hiding spot and attacks.",
        opt1: "1.	You curse your own stupidity and draw your sword to fight back",
        opt1Onclick: "buildFight",
        opt1enemy: "Giant Spider",
        opt1interaction: 2
    },
    'pass2': {
        out: "You hear the spider pass you and take a peek out of one eye to have a look. The oversized arachnid is still heading off in the wrong direction. You wait a while to make sure it doesn't return and then start walking back to the entrance of the cave."
        + " You notice some less fortunate adventurers rotting on the floor, you hold your nose and rummage around for some loot before scurrying away.",
        opt1: "1.	Continue",
        opt1Onclick: "buildOpen",
        opt1open: "loot",
        opt1interaction: 2
    },
    'openingScr3': {						//Interaction 3
        out: "You wander into the old mine shaft, hands poised to draw your weapon in case of trouble. You find a hooded figure sitting next to a fire, watching the flames dance in front of him. As you draw your weapon, he says quietly \"I mean you no harm,"
        + " but I will defend myself if needs be. Who are you and what are you doing down here?\".",
        opt1: "1.	Tell him of your backstory and quest",
        opt1Onclick: "changeOut",
        opt1chance: 100,
        opt1open1: "intrigued3",
        opt1open2: "bored3",
        opt1char: "charisma",
        opt1limit: 13,
        opt2: "2.	He could have loot! He lives in a cave on his own, no one will know he's gone right? Attack him!",
        opt2Onclick: "changeOut",
        opt2chance: 100,
        opt2open1: "fight3"
    },
    'fight3': {
        out: "You draw your sword and walk towards him, the man quickly gets the message and gets up, readying his own weapon, \"Big mistake boyo\".",
        opt1: "1.	Fight",
        opt1Onclick: "buildFight",
        opt1enemy: "Odd Man",
        opt1interaction: 3
    },
    'intrigued3': {
        out: "He\'s intrigued by your story and wishes he could help, \"I would give you something to help your quest but I already have very little to my name, hence...\" he gestures to the cave surrounding the two of you. \"Now, if you would be so kind to leave me in peace,"
        + " I've got a lot of thinking to do.\" A strange aura of trust is now emanating from the man, somehow calming you, you put your weapon back on your hip, and leave the man to himself.",
        opt1: "1.	Leave the man to his own mind, he seems to have enough weighing on it as it is",
        opt1Onclick: "buildOpen",
        opt1open: "map",
        blueOpt: "2.	Put emphasis on how much it would mean to you to complete the quest and you could do with any help you can get",
        blueOptOnclick: "changeOut",
        blueOptChance: 100,
        blueOptOpen1: "loot3",
        blueOptDisplay: function () {
            blueOptDisplay('charisma', 17);
        },
    },
    'bored3': {
        out: "He\'s bored by your story and makes no comment, he goes back to being entranced by the dancing flames infront of him. After a short while, he looks up at you, \"You can leave now...\" he snaps.",
        opt1: "1.	You leave the odd man to himself, he clearly won't offer you anything",
        opt1Onclick: "buildOpen",
        opt1open: "map",
        opt1interaction: 3
    },
    'loot3': {
        out: "He lets out a long sigh and gets up. He takes the pack off of his back and reaches into it, after some rustling he hands you something, \"If I give you this will you leave me alone?\".",
        opt1: "1.	You assure him you'll leave him alone and gratefully grab his gift",
        opt1Onclick: "buildOpen",
        opt1open: "loot",
        opt1interaction: 3
    },
    'openingScr4': {						//Interaction 4
        out: "You walk into the cave ready for anything, only to discover that the cave is completely empty save for some shiny rocks dotted around. You admire the rocks momentarily before leaving the desolate cave. There's nothing here for you. Unless you really like rocks.",
        opt1: "1.	Continue",
        opt1Onclick: "buildOpen",
        opt1open: "map",
        opt1interaction: 4
    },
    'openingScr5': {						//Interaction 5
        out: "You walk into a small abandoned keep. It clearly hasn't been used since the war and time has taken its toll, walls are crumbling, doors are rotting and the paving cobbles are worn. The amount of nooks and crannies that a secret assailant"
        + " could be hiding in concerns you however. As you cautiously walk through the corridors of the place, you spot a suspiciously placed chest and walk over to it.",
        opt1: "1.	Open the chest. You can't resist the possibility of loot!",
        opt1Onclick: "changeOut",
        opt1chance: 50,
        opt1open1: "trap5",
        opt1open2: "loot5",
        opt2: "2.	This is clearly a trap. Only a fool would fall for something so obvious!",
        opt2Onclick: "changeOut",
        opt2chance: 100,
        opt2open1: "leave5"
    },
    'leave5': {
        out: "You walk away with a smug smile on your face. Knowing you've just avoided a potentially deadly trap fills you with a subtle sense of confidence for the rest of your journey as you continue out of the keep.",
        opt1: "1.	Continue",
        opt1Onclick: "buildOpen",
        opt1open: "map",
        opt1interaction: 5
    },
    'trap5': {
        out: "You open the chest and a crudely made flashbang goes off. Temporarily blinded and deafened a loud ringing, you stumble back and try to draw your sword. As you start to be able to see again, an armed man runs round the corner and"
        + " sees you stumbling around trying to regain your senses. \"Wow! That worked?! I didn't think anyone would be so foolish to fall for something so obvious\". The man charges you with sword overhead.",
        opt1: "1.	Fight",
        opt1Onclick: "buildFight",
        opt1enemy: "Bandit",
        opt1interaction: 5
    },
    'loot5': {
        out: "You open the chest to find loot, result! Still being suspicious you look around. Seeing no prying eyes, you grab the loot and hurry away.",
        opt1: "1.	Continue",
        opt1Onclick: "buildOpen",
        opt1open: "loot",
        opt1interaction: 5
    },
    'openingScr6': {							//Interaction 6
        out: "You wander into a cave that looks as though it could have recently been inhabited, a few empty bags strewn over the floor, crumbs from clumsily eaten loafs of bread and other signs of life scattered across the cave. You note nothing worth taking though,"
        + " probably stripped bare by other travellers already. As you go deeper into the cave you start to hear what sounds like a high pitch squirming. You ready your sword and hurry round the corner.",
        opt1: "1.	Continue",
        opt1Onclick: "changeOut",
        opt1chance: 100,
        opt1open1: "midgeMan6",
    },
    'midgeMan6': {
        out: "You round the corner to see a man, no more than 3 and a half feet in height, practising his swordsmanship with a sword clearly made for someone larger than him. Letting off high pitch grunts of exertion with every stroke which is the noise you mistook for a struggle."
        + " He's so engrossed in his activity that it seems he hasn't noticed you yet...",
        opt1: "1.	You're impressed by his swordsmanship, compliment him on it",
        opt1Onclick: "changeOut",
        opt1chance: 100,
        opt1open1: "compliment6",
        opt2: "2.	You decide to leave the tiny man be, he looked no mug with a sword",
        opt2Onclick: "changeOut",
        opt2chance: 100,
        opt2open1: "leave6"
    },
    'compliment6': {
        out: "Smiling, you comment on being impressed on the size of the sword the midget is using. He turns his head towards you with nothing but anger in his eyes and immediately charges at you and leaps at your face.",
        opt1: "1.	AHHHHHHH",
        opt1Onclick: "changeOut",
        opt1chance: 100,
        opt1open1: "ahh6"
    },
    'ahh6': {
        out: "You manage to vault the tiny man over your head. You quickly realise that the remnants of previous inhabitants seen earlier were really from travellers unfortunate enough to come across this maniacal midget. You prepare your sword and get ready to fight.",
        opt1: "1.	Fight",
        opt1Onclick: "buildFight",
        opt1enemy: "Angry Midget",
        opt1interaction: 6
    },
    'leave6': {
        out: "You feel like he may not be in mood for polite conversation and leave him to his own devices.",
        opt1: "1.	Continue",
        opt1Onclick: "buildOpen",
        opt1open: "map",
        opt1interaction: 6
    },
    'openingScr7': {						//Interaction 7
        out: "As you cautiously walk through the entrance to the castle on top of the hill you just spent ages scaling, you clearly weren't cautious enough because you immediately fall through a hole covered up by the ragged red carpet leading your way through the castle. "
        + "Thankfully the fall wasn't far enough to break anything, just wind you a little and annoy you a lot. As you pick yourself up you are immediately faced by a heavily armoured man with a two handed great sword taller than you.",
        opt1: "1.     Oh dear...",
        opt1Onclick: "buildFight",
        opt1enemy: "Knight",
        opt1interaction: 7
    },
    'openingScr8': {						//Interaction 8
        out: "You walk to the top of a hill where some ruins lay scattered atop it. You spot a lit bonfire, unusual given the broad daylight, and walk over to it. As you approach, you notice the colours of the flames changing and sparks being spat out. You soon realise that the changing "
        + "colours are actually small spirits dancing around the flame, they all stop as you approach. In unison, they all turn to you and chant 'Are you ready to make a bet?? Sacrifice something and see what you get. Nothing but the best for the flame, or we'll all consider you really lame...'.",
        opt1: "1.	\"Uhhhh... ok???\". Throw your equipped weapon into the supposedly magical fire",
        opt1Onclick: "changeOut",
        opt1chance: 100,
        opt1open1: "sacrifice8",
        opt2: "2.	I don't care if I'm lame, I really like my weapon... ",
        opt2Onclick: "changeOut",
        opt2chance: 100,
        opt2open1: "lame8"
    },
    'sacrifice8': {
        out: "You toss your weapon into the fire, the spirits looking on in anticipation. The fire gobbles up your sacrifice and then starts rumbling... and keeps rumbling... and keeps rumbling... You roll your eyes and turn to leave after a few minutes, as soon as your back is turned, you hear "
        + "a massive explosion behind you. Startled, you turn to see that the fire has launched something directly at your face.",
        opt1: "1.	Wait wha-",
        opt1Onclick: "changeOut",
        opt1chance: 100,
        opt1open1: "duck8"
    },
    'duck8': {
        out: "You barely manage to duck out of the way of the projectile before it embedded itself in a tree behind you. You walk over to it and realise it's another weapon. Putting 2 hands on it you try and pull it out of the tree.",
        opt1: "1.	Pull!",
        opt1Onclick: "interaction.no8",
    },
    'lame8': {
        out: "With only a small dent to your dignity, you turn and walk away, being booed and jeered by the now angry fire spirits as you go.",
        opt1: "1.	At least I keep my weapon...",
        opt1Onclick: "buildOpen",
        opt1open: "map",
        opt1interaction: 8
    },
    'broke8': {
        out: "You give the weapon a mighty tug and you fall backwards as it comes loose from the tree. Feeling triumphant, you look at your newly acquired equipment just to realise that half of it is still stuck in the tree. It hadn't come loose. It had broke. You hear the laughing and sniggering "
        + "of the fire spirits behind you and angrily walk away cursing under your breath.",
        opt1: "1.	Just ignore them... I suppose I need a new weapon now",
        opt1Onclick: "buildOpen",
        opt1open: "map",
        opt1interaction: 8
    },
    'bad8': {
        out: "The weapon dislodges and you stumble back, you admire the craftsmanship of the piece and quickly realise that it's no where near as good as the one you sacrificed. Disappointed, you look back at the spirits to see that they've already lost interest and are back to staring at "
        + "the fire and waiting for the next person to come along.",
        opt1: "1.	Well, it could have been worse...",
        opt1Onclick: "buildOpen",
        opt1open: "map",
        opt1interaction: 8
    },
    'good8': {
        out: "It comes loose easier than you expected, you look at the fires creation and, much to your surprise, the new weapon seems a significant improvement to the one you threw in. Pleased with the outcome of this strange encounter, you look back to the onlooking spirits which are "
        + "clearly also pleased with the outcome as they are dancing round the fire cheering. Very confused at the whole situation, you head off with your new weapon in hand.",
        opt1: "1.	Well then, onwards... I guess",
        opt1Onclick: "buildOpen",
        opt1open: "map",
        opt1interaction: 8
    },
    'great8': {
        out: "Before you even start pulling, the weapon comes loose and falls into your hand. You can instantly tell the quality of it just be looking at it. You hear excitable whispering behind you from the spirits and they suddenly start cheering \"FIRE KING!!!\". The spirits rush to your side and "
        + "start gleefully circling you. You don't really know what to make of the situation so you hold tight to your lovely new addition to your inventory and run back down the hill. The spirits try to chase you but thankfully you outrun them. That chant would get annoying very quickly...",
        opt1: "1.	I don't know what just happened but I like it",
        opt1Onclick: "buildOpen",
        opt1open: "map",
        opt1interaction: 8
    },
    'openingScr9': {						//Interaction 9
        out: "You're wandering past a cave that looks so uninteresting you can't really even be bothered to explore inside of it, so you carry on wandering. Or you would have if a child, no more than 10 " +
        "or so, hadn't ran out of the cave desperately asking for your help. \"Please! My mother's hurt! She needs help quick!\". He gestures you to follow and runs back inside.",
        opt1: "1.   You can't just leave a kid's mother to die can you?",
        opt1Onclick: "changeOut",
        opt1chance: 100,
        opt1open1: "help9",
        opt2: "2.	Hmmm... seems oddly suspicious, keep walking",
        opt2Onclick: "changeOut",
        opt2chance: 100,
        opt2open1: "walk9"
    },
    'walk9': {
        out: "You feel bad for potentially leaving a kid to be destined an orphan but you don't know what was in that cave, there was as much chance of you dying in there from an ambush than a helping kids mother " +
        "who you owe nothing to.",
        opt1: "1.	Continue",
        opt1Onclick: "buildOpen",
        opt1open: "map",
        opt1interaction: 9
    },
    'help9': {
        out: "You follow the child into the dark cave, he's waiting at the end of the first tunnel. As he sees you, he hurries down the right of a split path. \"Hurry!\", You hear his echo rebounding off of the walls" +
        "making it sound as if you're surrounded. You round the final corner and you see the boy standing there.",
        opt1: "1.	\"Where is she?\"",
        opt1Onclick: "changeOut",
        opt1chance: 50,
        opt1open1: "trap9",
        opt1open2: "notTrap9"
    },
    'trap9': {
        out: "The child starts beaming with a menacingly evil smile. \"Good work laddie\", you hear a gruff voice behind you say. You turn to a man, quite a bit taller than you, staring at you with an " +
        "extremely disturbing grin from ear to ear and a sword in each hand start running towards you. You draw your sword and prepare for a fight",
        opt1: "1.	Well you don't look injured, or like a mother for that matter",
        opt1Onclick: "buildFight",
        opt1enemy: "Bandit",
        opt1interaction: 9
    },
    'notTrap9': {
        out: "\"Just round here, hurry!\", you catch up to him to see his mother resting on the floor with a nasty gash in her stomach. You you remember you're grand father telling you about a wound not" +
        "too dissimilar to this one from his time in the war and how he saved the injured persons life. You spend some time tending to her wound as best you can.",
        opt1: "1.	Continue",
        opt1Onclick: "changeOut",
        opt1chance: 100,
        opt1open1: "helping9"
    },
    'helping9': {
        out: "After a while, the mother wakes up having recovered a little. The two of them thank you, \"Please\" she said, \"Take this, we haven't got a need for it\". You thank the pair and open up " +
        "the bundle of cloth you got and see what it is.",
        opt1: "1.	Continue",
        opt1Onclick: "buildOpen",
        opt1open: "loot",
        opt1interaction: 9
    },
    'openingScr10': {                       //Interaction 10
        out: "You come across a crudely built wooden shopfront that looks like it will collapse at the slightest breeze of the wind. A man standing behind the stall greets you loudly, \"WELCOME TRAVELLER\", " +
        "he yells, \"CARE TO LOOK AT MY WARES!\", even louder this time. You glance at the stuff on sale and it looks in good enough nick, although you aren't quite sure about the shop owner...",
        opt1: "1.   I could do with a new pair of boots, why not",
        opt1Onclick: "interaction.no10",
        opt2: "2.   You don't like the look in the \'shopkeepers\' eyes, leave before anything bad happens",
        opt2Onclick: "changeOut",
        opt2chance: 100,
        opt2open1: "leave10"
    },
    'leave10': {
        out: "The unsettling smile on the \'shopkeepers\' face was a bit too much for you, you decide to leave the man and his wares to themselves. \"N-NO TRAVELLER, C-C-COME BACK!\", you turn to see he's left " +
        "his shop and is chasing you down the road. \"LOOK AT MY WARES! THEY'RE AMAZING!\". You outrun the crazed shopkeeper easily enough and carry on down the road.",
        opt1: "1.   Continue",
        opt1Onclick: "buildOpen",
        opt1open: "map",
        opt1interaction: 10
    },
    'openingScr11': {                       //Interaction 11
        out: "You are walking along a forest path, nothing interesting has happened for hours. As if the world read your thoughts, two people fly out of the foliage beside you and onto the path. Without a second " +
        "look at you they roll around on the path in a fierce attempt to get a proper hit in on the other. One of them has the colours and the badge of the Imperial Elf Army whereas the other is in rough raggedy " +
        "clothes. You feel like you should help one of them...",
        opt1: "1.   Help the soldier, you don't want to get on the wrong side of the Imperials",
        opt1Onclick: "changeOut",
        opt1chance: 50,
        opt1open1: "soldierGood11",
        opt1open2: "soldierBad11",
        opt2: "2.   Help the other man, you've been in his shoes before, he's likely just been caught theiving to feed his family",
        opt2Onclick: "changeOut",
        opt2chance: 50,
        opt2open1: "outlawGood11",
        opt2open2: "outlawBad11"
    },
    'soldierGood11': {
        out: "You run over to the tussle and separate the two then immediately land a hefty punch onto the commoners face, knocking him out. The Imperial catches his breath before thanking you for your help, " +
        "\"I\'m not quite sure how I almost let him best me there but thank you for you help, take this as a thanks\". He hands you something from his backpack and gets back to dealing with the criminal.",
        opt1: "1.   Continue",
        opt1Onclick: "buildOpen",
        opt1open: "loot",
        opt1interaction: 11
    },
    'soldierBad11': {
        out: "You run over to the tussle and separate the two then immediately land a hefty punch onto the commoners face, knocking him out. The Imperial catches his breath quickly before addressing you, " +
        "\"You shouldn't go around meddling in every fight you see kid, I'm no good guy\". He clearly killed an Imperial and stole his jacket, like he's looking to do you with you, although you doubt " +
        "he'll take your jacket.",
        opt1: "1.   Why are they never the good guys...",
        opt1Onclick: "buildFight",
        opt1enemy: "Imposter",
        opt1interaction: 11
    },
    'outlawGood11': {
        out: "You run over to the fight and separate the two then immediately land a punch onto the Imperials face, knocking him out. The man stands up thanking you, \"That blasted elf has been chasing me " +
        "for ages, I saw him take out a small patrol of Imperial Guards and steal one of their clothes. He noticed me and chased me immediately, clearly didn't want any witnesses.\" You relax, knowing " +
        "you've made the right decision, \"Take this as thanks\".",
        opt1: "1.   Continue",
        opt1Onclick: "buildOpen",
        opt1open: "loot",
        opt1interaction: 11
    },
    'outlawBad11': {
        out: "You run over to the fight and separate the two then immediately land a punch onto the Imperials face, knocking him out. The man scrambles for the elf's sword, which was still on his hilt " +
        "for some reason, and jumps to attack you.",
        opt1: "1.   Wrong choice it seems...",
        opt1Onclick: "buildFight",
        opt1enemy: "Outlaw",
        opt1interaction: 11
    },
    'openingScr12': {                       //Interaction 12
        out: "The sun is setting and there's no chance of getting back to town before dark, it's dangerous and extremely cold after the sun goes down. You need a place to rest for the night. You come across a clearing in the " +
        "small forest you're in and you see a house that seems to be made entirely made of candy, you don't quite know how that's entirely possible but it's there alright.",
        opt1: "1.   You've always had a sweet tooth, and you do really need to sleep",
        opt1Onclick: "changeOut",
        opt1chance: 100,
        opt1open1: "knock12",
        opt2: "2.   You've read the fairy tales, you'll chance it outside",
        opt2Onclick: "interaction.no12Leave"
    },
    'knock12': {
        out: "You walk up the path cobbled with gobstoppers towards the front door coated in liquorice, and nervously knock, very unsure of what to expect. The door is opened almost immediately by an old woman, hunched over " +
        "and laughing creepily. \"Come in child... Have some candy...\". She hands you a bowl next to the door and proceeds into the house, you gladly accept the bowl and start munching on some delicious sweets. \"Take a seat " +
        "dearie\", the lady says with a sweet smile.",
        opt1: "1.   Do as she says, you're excited for a proper meal",
        opt1Onclick: "changeOut",
        opt1chance: 50,
        opt1open1: "sitGood12",
        opt1open2: "sitBad12"
    },
    'sitGood12': {
        out: "You sit down on the soft and squidgy chair and the old lady brings up a sweet smelling pie and places it on the table in front of you, \"Bon appetit!\". You have no idea what that means but you tuck into the pie " +
        "nonetheless. This may be the best pie you've ever tasted. After scoffing down the pie, the lady shows you to a cozy looking bed and you get ready for a good nights sleep.",
        opt1: "1.   Continue",
        opt1Onclick: "interaction.no12"
    },
    'leaveAfterRest12': {
        out:  "After a nice meal and a good nights sleep, you feel reinvigorated ready for the adventure ahead.",
        opt1: "1.   Continue",
        opt1Onclick: "buildOpen",
        opt1open: "map",
        opt1interaction: 12
    },
    'sitBad12': {
        out: "You sit down on the soft and squidgy chair and the old lady brings up a sweet smelling pie and places it on the table in front of you, \"Bon appetit!\". You have no idea what that means but you tuck into the pie " +
        "nonetheless. Something about this pie doesn't taste quite right, you start to feel sleepy, more so than usual. The pie was drugged. The woman calls out to someone and a tubby man walks around the corner with a meat " +
        "cleaver. You may be drowsy but you can still fight, you draw your weapon.",
        opt1: "1.   Continue",
        opt1Onclick: "buildFight",
        opt1enemy: "Tubby Man",
        opt1interaction: 12
    },
    'leaveGood12': {
        out: "This place gives you the creeps, you think you'll do better risking it outside trying to get back to the town after dark. Risky as it was, you manage to get back to town without any hindrances somehow. You count " +
        "your blessings as the chances of that happening are too slim for you to want to think about. ",
        opt1: "1.   Continue",
        opt1Onclick: "buildOpen",
        opt1open: "map",
        opt1interaction: 12
    },
    'leaveBad12': {
        out: "This place gives you the creeps, you think you'll do better risking it outside trying to get back to the town after dark. You get jumped by a couple bandits on the way back, you manage to get away without " +
        "any serious injuries. They land a hit or two on you but it could have been much worse.",
        opt1: "1.   Continue",
        opt1Onclick: "buildOpen",
        opt1open: "map",
        opt1interaction: 12
    },
    'leaveReallyBad12': {
        out: "This place gives you the creeps, you think you'll do better risking it outside trying to get back to the town after dark. You get jumped by a couple bandits on the way back, in your rough state, they manage " +
        "to best you. They beat you to near death, take all your belongings and leave you to die in a bush somewhere on the roadside. No chance of getting any help from here.",
        opt1: "1.   Continue",
        opt1Onclick: "interaction.no12Die"
    },                                      //Interaction 13
    'openingScr13': {
        out: "You're walking down a path when you hear a man running up behind you, turning around with your hand on your sword, you're ready for anything. Or so you thought. You see a man with a leather jacket on backwards, " +
        "his trousers on his head, a pair of oversized shoes and holding a sword by the blade. He stops when he reaches you, drops his sword on the floor and grabs you by the shoulders. \"Did you know that my brother was a " +
        "unicorn? You should meet him!\".",
        opt1: "1.   ???",
        opt1Onclick: "changeOut",
        opt1chance: 100,
        opt1open1: "???13",
        opt2: "2.   ???",
        opt2Onclick: "changeOut",
        opt2chance: 100,
        opt2open1: "???13"
    },
    '???13': {
        out: "Not wanting to startle the madman, you stand still. The man starts rambling about how the monarchy is run by a bipedal lizard overlord species and how the only way to escape their aura of influence is to live " +
        "underground, he lets go of you and starts furiously digging down into the gravel path with his bare hands. \"They won't catch me down here. They won't catch me down here...\" he keeps muttering under his breath." +
        "You consider what to do.",
        opt1: "1.   Leave him alone, too risky to do anything around him",
        opt1Onclick: "changeOut",
        opt1chance: 50,
        opt1open1: "leaveGood13",
        opt1open2: "leaveBad13",
        opt2: "2.   This is quite funny, listen and learn more about our lizard overlords",
        opt2Onclick: "changeOut",
        opt2chance: 50,
        opt2open1: "digging13",
        opt2open2: "attack13"
    },
    'leaveGood13': {
        out: "Now the man is distracted by the floor, you take your chance to sneak quietly away. He doesn't notice your departure and you get away without any trouble.",
        opt1: "1.   Continue",
        opt1Onclick: "buildOpen",
        opt1open: "map",
        opt1interaction: 13
    },
    'leaveBad13': {
        out: "Now the man is distracted by the floor, you take your chance to sneak quietly away. As you try to escape, the man notices you leaving and immediately stops digging and turns to face you. \"Nononono you " +
        "can't leave. The lizards man I'm telling you. THEY'RE REAL.\" You continue in the other direction, trying to ignore the man. You hear him pick up the sword off the floor. \"I can't let another mindless " +
        "zombie controlled by THEM just keep walking around.\"",
        opt1: "1.   Draw your weapon and prepare for a fight",
        opt1Onclick: "buildFight",
        opt1enemy: "Madman",
        opt1interaction: 13
    },
    'digging13': {
        out: "You stick around for a bit to see what happens. Nothing changes, he just keeps muttering \"They won't catch me down here\", and keeps digging. After a few minutes you decide to give up and leave.",
        opt1: "1.   Continue",
        opt1Onclick: "buildOpen",
        opt1open: "map",
        opt1interaction: 13
    },
    'attack13': {
        out: "you stick around for a few minutes and the man doesn't seem to notice. You are about to turn and leave when he glances over his shoulder to you. \"You're one of them aren't you?!?!\", without time " +
        "to react, he jumps out of the small hole and grabs the sword he dropped to attack you.",
        opt1: "1.   Ready your weapon",
        opt1Onclick: "buildFight",
        opt1enemy: "Madman",
        opt1interaction: 13
    }
};

function changeOut(e) {
    var target = e.target,
            chance = target.getAttribute("chance"),
            interaction1 = target.getAttribute("interaction1"),
            interaction2 = target.getAttribute("interaction2"),
            characteristic = target.getAttribute("characteristic"),
            limit = target.getAttribute("limit");
    setOutputDiv(chance, interaction1, interaction2, characteristic, limit);
}

function setOutputDiv(chance, interaction1, interaction2, characteristic, limit) {
    var randInt = Math.floor(Math.random() * 100);
    var interaction = "";
    document.getElementById('blueOpt').style.display = 'none';
    if ((characteristic != null && characteristic != "null") && player[characteristic].current > limit) {
        interaction = interactions[interaction1]
    }
    else if (characteristic != null && characteristic != "null") {
        interaction = interactions[interaction2];
    }
    else {
        if (randInt <= chance) {
            interaction = interactions[interaction1];
        }
        else {
            interaction = interactions[interaction2];
        }
    }

    if (typeof interaction.opt2 === 'undefined') {
        interaction.opt2 = "";
    }
    if (typeof interaction.blueOpt === 'undefined') {
        interaction.blueOpt = "";
    }
    if (typeof interaction.blueOptDisplay !== 'undefined') {
        interaction.blueOptDisplay();
    }

    document.getElementById('outputContent').innerHTML = interaction.out;

    var opt1E = document.getElementById('opt1');
    opt1E.innerHTML = interaction.opt1;
    opt1E.setAttribute("chance", (interaction.opt1chance) ? interaction.opt1chance : null);
    opt1E.setAttribute("interaction1", (interaction.opt1open1) ? interaction.opt1open1 : null);
    opt1E.setAttribute("interaction2", (interaction.opt1open2) ? interaction.opt1open2 : null);
    opt1E.setAttribute("characteristic", (interaction.opt1char) ? interaction.opt1char : null);
    opt1E.setAttribute("limit", (interaction.opt1limit) ? interaction.opt1limit : null);
    opt1E.setAttribute("open", (interaction.opt1open) ? interaction.opt1open : null);
    opt1E.setAttribute("enemy", (interaction.opt1enemy) ? interaction.opt1enemy : null);
    opt1E.setAttribute("interaction", (interaction.opt1interaction) ? interaction.opt1interaction : null);
    opt1E.setAttribute("opt1Func", interaction.opt1Onclick);

    var opt2E = document.getElementById('opt2');
    opt2E.innerHTML = interaction.opt2;
    if (interaction.opt2 !== "") {
        opt2E.setAttribute("chance", (interaction.opt2chance) ? interaction.opt2chance : null);
        opt2E.setAttribute("interaction1", (interaction.opt2open1) ? interaction.opt2open1 : null);
        opt2E.setAttribute("interaction2", (interaction.opt2open2) ? interaction.opt2open2 : null);
        /** unused so far but may be in future
         * opt2E.setAttribute("characteristic", (interaction.opt2char) ? interaction.opt2char : null);
         * opt2E.setAttribute("limit", (interaction.opt2limit) ? interaction.opt2limit : null);
         * opt2E.setAttribute("open", (interaction.opt2open) ? interaction.opt2open : null);
         * opt2E.setAttribute("enemy", (interaction.opt2enemy) ? interaction.opt2enemy : null);
         * opt2E.setAttribute("interaction", (interaction.opt2interaction) ? interaction.opt2interaction : null);
         */
        opt2E.setAttribute("opt2Func", interaction.opt2Onclick);
    }

    var blueOpt = document.getElementById('blueOpt');
    blueOpt.innerHTML = interaction.blueOpt;
    if (interaction.blueOpt !== "") {
        blueOpt.setAttribute("chance", (interaction.blueOptChance) ? interaction.blueOptChance : null);
        blueOpt.setAttribute("interaction1", (interaction.blueOptOpen1) ? interaction.blueOptOpen1 : null);
        /** unused so far but may be in future
         * blueOpt.setAttribute("interaction2", (interaction.blueOptOpen2) ? interaction.blueOptOpen2 : null);
         * blueOpt.setAttribute("characteristic", (interaction.blueOptChar) ? interaction.blueOptChar : null);
         * blueOpt.setAttribute("limit", (interaction.blueOptLimit) ? interaction.blueOptLimit : null);
         */
        blueOpt.setAttribute("blueOptFunc", interaction.blueOptOnclick);
    }
}

function blueOptDisplay(characteristic, limit) {
    if (player[characteristic].current > limit) {
        document.getElementById('blueOpt').style.display = 'block';
    }
}

function buildOpen(e) {
    var id, compID;
    var t = e.target;
    id = t.getAttribute("open");
    compID = t.getAttribute("interaction");
    nav.open(id, compID);
}

function buildFight(e) {
    var eType, interactionNo;
    var t = e.target;
    eType = t.getAttribute("enemy");
    interactionNo = t.getAttribute("interaction");
    fight.setUpFight(eType, interactionNo)
}