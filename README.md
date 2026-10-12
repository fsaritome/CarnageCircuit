# Carnage Circuit

A top-down combat racer for the browser by **fsaritome**, inspired by the 1996 DOS classic Death Rally.

**Play it:** https://fsaritome.github.io/CarnageCircuit/

Race three rivals over a six-race championship. Finish in the money, wreck your rivals for a bounty, and spend your winnings in the garage on engine, tires, armor and guns. Spectators wander onto the track. Mind them, or don't.

## Play

Open `index.html` in any modern browser. No build step, no install. It only fetches two Google Fonts.

## Controls

| Action      | Keys                    |
|-------------|-------------------------|
| Drive       | Arrow keys or W A S D   |
| Machine gun | Space (or J)            |
| Drop mine   | X (or K)                |
| Nitro       | Shift (or L)            |
| Special     | E (or Enter)            |
| Switch special | Q (or Tab)           |
| Pause       | P or Esc                |
| Mute        | M                       |

Touch devices get on-screen buttons.

## Features

- Three tracks: Dust Bowl, Scrapyard Hook, Bone Canyon
- Drifting car physics, off-road slowdown, tyre walls that hurt
- Machine gun, mines, nitro, pickups (cash, repair, ammo, nitro)
- Damage model with smoke, fire, explosions and persistent wrecks
- AI rivals (Grimm, Vex, Mad Dog) that race the line, shoot, mine and dodge
- Five rival difficulty levels (Easy, Normal, Hard, Brutal, Insane), switchable from the title screen or the garage
- Special weapons: rockets, heat seekers, flamethrower, burning oil drums
- Final lap: the Iron Vultures biker gang blocks the track. Run them over, burn them, or blow them sky high
- Prize money, kill bonuses, upgrades, repairs, championship points
- Blood on/off switch (bottom bar): off swaps blood, gibs and screams for dust puffs and cartoon bonks
- Career progress saved in the browser (localStorage)
- Synthesized sound effects via the Web Audio API

## Difficulty

| Level  | What changes |
|--------|--------------|
| Easy   | Rivals drive loosely, carry no special weapons |
| Normal | Rivals take the racing line, lead their shots, carry a few specials |
| Hard   | Faster, grippier, more upgrades, more aggressive toward you |
| Brutal | Hard, turned up further |
| Insane | Good luck |

## Special weapons

| Weapon | Keys | Effect |
|--------|------|--------|
| Rockets | E (Q to switch) | Straight shot, explodes on impact |
| Heat seekers | E | Locks on to the nearest rival and chases it |
| Flamethrower | hold E | Short cone of fire, sets cars and people alight |
| Burning oil drums | E | Dropped behind you, explodes into a lake of fire |

Buy them in the garage or grab the purple star crates on the track.

## Credits

Created by **fsaritome**. Inspired by Death Rally (Remedy Entertainment, 1996).

## Development

| Branch | Live at | Purpose |
|--------|---------|---------|
| `main` | https://fsaritome.github.io/CarnageCircuit/ | The released game |
| `dev`  | https://fsaritome.github.io/CarnageCircuit/dev/ | Work in progress, new gadgets |

- Work happens on `dev`. Every push is checked and, if it passes, published to the `/dev/` preview within a minute or two.
- `main` is protected: changes arrive through a pull request from `dev`, and the check must pass before it can merge.
- The dev preview keeps its own save slots, so testing never touches your real championship save.
- Run the check locally with `node tools/check.mjs index.html`.

## License

© 2026 fsaritome. All rights reserved. You may play the game and read this repository, but copying, modifying,
re-hosting or redistributing it is not permitted without written permission. See [LICENSE](LICENSE).
