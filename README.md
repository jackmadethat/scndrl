# SCNDRL

A single player rogue-like card game by Zach Gage and Kurt Bieg

## Setup

Scoundrel is played with a standard deck of playing cards.

Search through the deck and remove all jokers, red face cards and red aces. Place them to the side, they are not used in this game.

Shuffle the remaining cards and place the pile face down on your left. This is your ***Dungeon***.

To your right will be your discard pile, the ***Graveyard***.

Between the dungeon deck and the discard pile is the current ***Room***.

Using a notepad, d20 or just your memory, note down the number 20. This is your ***Starting Health***.

## Rules

The 26 **Clubs** and **Spades** in the deck are ***Monsters***. Their damage is equal to their nominal value; 10 is 10, Jack is 11, Queen is 12, King is 13, and Ace is 14.

The 9 **Diamonds** in the deck are ***Weapons***. Each weapon deals damage equal to it's nominal value. All weapons in *Scoundrel* are *binding*, meaning if you pick one up, you *must equip it*, and discard your previous weapon.

The 9 **Hearts** in the deck are ***Health Potions***. You may only use one helath potion per turn, even if you pull two. The second potion you pull is simply discarded. You may not restore your health beyond the starting value of 20.

The game ends when either your health reaches 0 or your make your way through the entire **Dungeon**.

## Scoring

If your life reaches 0, find all the remaining monsters in the **Dungeon** and subtract their values from your life. This negative value is your score.

If you complete the **Dungeon**, your score is your remaining health, or, if your health is 20 and your last card is a health potion, your health plus the potion's value.

## Gameplay

On your first turn and every turn, draw cards from the top of the deck until you have four cards face up in front of you. These four cards make a ***Room***.

You may avoid the ***Room*** if you wish. If you choose to do so, scoop up all four cards place them at the bottom of the ***Dungeon***. While you may avoid as many rooms as you wish, you not avoid two rooms in a row.

If you choose to play the ***Room***, you must face three of the four cards, taking them one at a time.

### If you choose a ***Weapon***
You *must equip it*. Do this by placing it face up between you and the room. If you had a weapon equipped, move it and any monsters on it to the ***Graveyard***.

### If you choose a ***Health Potion***
Add its number to your health, and then discard it. Your health may not exceed 20 and you may not use more than one health potion per turn. If you take two health potions in one turn, the second is simply discarded and nothing more is added to your health.

### If you choose a ***Monster***
You may fight it barehanded or with an equipped weapon.

Once you have chosen three cards (so that only one remains), your turn is complete. Leave the fourth card as part of the next ***Room***.

## Combat

If you choose to fight the ***Monster*** *barehanded*, subtract its full value from your health and move the ***Monster*** to the ***Graveyard***.

If you choose to fight the ***Monster*** with your *equipped weapon*, place the ***Monster*** face up on top of your ***Weapon*** (and on top of any other monsters on the weapon). Be sure to stagger the placement of the ***Monster*** so that the ***Weapon***'s number is still showing. Subtract the ***Weapon***'s value from the ***Monster***'s value and subtract the resulting value from your health. *For example, if your ***Weapon*** is a 5 and you place a ***Monster*** with value 3 on it, you take 0 damage as 3 - 5 = <0. If your ***Weapon*** is a 5 and you place a Jack ***Monster*** on it, you take 6 damage as 11 - 5 = 6.*

Although you retain your weapons until they are replaced, once a ***Weapon*** is used on a ***Monster***, the ***Weapon*** can then only be used to slay ***Monster***s of a *lower value* than the previous ***Monster*** slain. *For example, if your 5 ***Weapon*** has slain a Queen monster, you may use your ***Weapon*** on a 6 ***Monster*** as 6 < 12. If, however, you have used your 5 ***Weapon*** on a 6 ***Monster*** and then face a Queen ***Monster***, you must fight it barehanded as Queen, 12, is greater than 6. Despite this, your ***Weapon*** is not discarded as it can still be used to slay ***Monster***s weaker than 6.*

## Potential Changes/Additions

"I’ve been playing a single player card game called Scoundrel (not mine) and I’ve been having a lot of fun with it. I attached an image of the rules of the game and I thought it was really good, but I added some extra cards to the game. In the rules you’re supposed to remove the red face cards and aces. I put the King of Diamonds and King of Hearts back into the deck as “merchants.” When a king is in your dungeon and you decide to play it, you shuffle the discard pile and draw six cards. All spades and clubs are nothing cards, you can’t purchase them. All hearts you can get for free but they only heal three health, unless you draw a two of hearts in which case it’s three. All diamonds cost three of your health to purchase and your current weapon is discarded in place of the purchased weapon. If a red king or joker (the next card I added) is drawn, they are also nothing cards and can’t be purchased. You can only purchase/get one card from a merchant, so either a weapon or health. The next card I added was the jokers, which when drawn and played allow you to shuffle the dungeon deck. This could be useful because if you skip a very difficult dungeon and you know it’s coming but you draw a joker, that dungeon will be completely different. It could also create very difficult dungeons but it’s just chance. I also added a “looping” mechanic like in a real rogue-like. After you finish the dungeon, you mark that you’ve finished the dungeon somehow, you keep your current health and weapon, you shuffle the discard pile and make it the dungeon pile. The weapons in the merchant now cost three health instead of two and it increases every loop (probably maxing at five). I’m left with the red aces, queens, and jacks. For Jacks I was thinking of making them “Necromancers”, and when drawn and played you can pay him 1-2 of your health (haven’t decided) to shuffle the discard pile and play four cards, basically resurrecting a new dungeon from the already discarded cards. It’s like a dungeon within a dungeon. This could be useful because you could get really good weapons/health potions but you could also encounter powerful monsters."
