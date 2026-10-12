# Design decisions

Why Carnage Circuit is the way it is. Newest decisions are at the bottom of each section.
Created by **fsaritome**, built together with Claude Code (October 2026).

## Origin

- Started as a remake request for "Death Race" (1976). First result was **Tombstone Derby**, a small
  Death Race-style game (run down gremlins that turn into tombstones). It's kept as a separate
  claude.ai artifact: https://claude.ai/artifact/87FNher6b2TTctyyyaivhH
- The real target was **Death Rally (1996, Remedy)**: top-down combat racing, guns, upgrades, blood.
  That became Carnage Circuit. Name chosen to avoid the original's trademark.
- Single `index.html`, no build step, no dependencies except two Google Fonts
  (Black Ops One, Chakra Petch). Canvas 2D rendering, Web Audio synthesized sound.

## Structure of the game

- Championship of **6 races** over **3 tracks** (Dust Bowl, Scrapyard Hook, Bone Canyon), 4 laps each.
- 4 cars: you plus rivals **Grimm** (the sharpest), **Vex**, **Mad Dog**.
- Prize money by position (scales up each race), $300 per rival you wreck, points 10/6/3/1.
  Wrecked cars earn nothing; the player is patched to 10% armor after a wreck.
- Garage between races: engine, tires, armor, machine gun upgrades; repair, ammo, mines; special weapons.
- Career saved in `localStorage`. Credits screen and byline credit fsaritome.

## Weapons and damage

- Machine gun, mines, nitro from the start; pickups for cash, repair, ammo, nitro, and a purple star
  crate with a random special.
- Special weapons (E fires, Q switches): rockets, heat seekers, flamethrower, burning oil drums.
  Bought in the garage; rivals carry some on Normal and above.
- **Damage was cut twice** because fights ended too fast. Current values:

  | Source | Damage |
  |---|---|
  | Bullet | 1.3 + 0.6 per gun level |
  | Rocket direct hit | 9 (plus the explosion) |
  | Explosion (rocket, mine, drum, bike) | 20 at the centre, falls off with distance |
  | Flamethrower | 11 per second |
  | Burning car | 3 per second |
  | Lake of fire (oil drum) | 4.5 per second |

- Rivals take less damage on higher difficulties (`tough`), and rivals only deal 40% damage to each other.

## Rival AI

- **Driving** (rebuilt after rivals stopped and reversed at hairpins): the same technique the open-source
  TORCS / Speed Dreams robots use.
  1. Racing line per track: K1999-style elastic-band smoothing (after Remi Coulom's robot) inside the
     track edges. Computed once in `racingLine()`.
  2. Speed profile per car: max speed from line curvature and the car's turn rate, then a backwards
     braking pass. `speedProfile()`. Never asks for reverse.
  3. Pure-pursuit steering toward a look-ahead point that moves further ahead with speed.
  - Root cause of the old bug: the previous corner-speed guess went **negative** on Scrapyard Hook's
    hairpin, which the AI read as "drive backwards".
  - Unstick reverse only after a full second of pushing forward without moving.
- **Same class as the player.** Rivals used to get up to +22% top speed, race-number-based upgrades and
  extra grip, which made them unbeatable. Now they drive the player's car with the player's upgrade
  levels (±1 by difficulty). Difficulty mostly sets how close to the limit they drive (`lineK`).
- **Race first, fight second.** Rivals shoot in short bursts with long pauses (`agg`), use specials and
  mines sparingly, and only steer off the line to aim on Insane (`hunt`). They mostly ignore each other
  (`infight` = chance to pick a fight with another rival).
- **Gentle catch-up** (`rb`): rivals ease off once more than ~0.08 lap ahead of you and push only slightly
  when well behind. Nobody waits for a wrecked player.

### Difficulty table (current)

| Level | Pace (`spd`) | Limit (`lineK`) | Upgrades vs you | Damage taken (`tough`) | Aggression (`agg`) | Infighting |
|---|---|---|---|---|---|---|
| Easy | 0.92 | 0.77 | −1 | 0.55 | 0.5 | 0.10 |
| Normal | 0.96 | 0.83 | 0 | 0.42 | 0.65 | 0.15 |
| Hard | 1.00 | 0.91 | 0 | 0.32 | 0.8 | 0.20 |
| Brutal | 1.00 | 0.95 | +1 | 0.24 | 0.95 | 0.25 |
| Insane | 1.02 | 0.98 | +1 | 0.16 | 1.15 | 0.30 |

Test result before the last easing: a bot driving the player's car at 88% of the limit finished within
0.2 s of the leaders on Normal. Normal and Easy were then eased slightly to leave room for human mistakes.
**Still needs a real human playtest.**

## Final lap: the Iron Vultures

- Originally a sit-in of climate activists glued to the road (parody banner "LETZTE RUNDE · KLIMA JETZT"),
  as a non-violent roadblock.
- The request to make them killable with lots of blood and explodable by rockets was **declined**:
  they're a recognisable stand-in for a real political group (Letzte Generation) whose members have been
  hit by real drivers, and the game won't reward goring them. Agreed replacement: a **fictional biker
  gang**, the Iron Vultures, with the full gore treatment.
- How the gang works: when the leader starts the final lap, two roadblocks of 6 parked bikes and 6–12
  bikers appear (red squares on the minimap), leaving one gap.
  - Running a biker over: big splatter, body launched, car loses 40% speed. Bodies on the road drag you.
  - Explosions throw bodies and bikes with gravity, bounce, spin, blood trails; close blasts dismember.
  - Bikes are heavy but shovable, explode after 6 bullets or when caught in blasts or fire (chain reactions).
  - Fire sets bikers running in flames until they collapse charred. $50 bounty per biker.

## Blood switch

- "Blood: on/off" in the bottom bar, remembered per browser. Off: no blood decals, gibs, dismemberment,
  blood trails or red tyre marks; hits become dust puffs with a cartoon bonk; callouts become
  BONK / KNOCKED OUT. Physics, explosions and fire unchanged.

## Workflow and hosting

- Repo: https://github.com/fsaritome/CarnageCircuit (public).
- `main` → https://fsaritome.github.io/CarnageCircuit/ (release)
- `dev` → https://fsaritome.github.io/CarnageCircuit/dev/ (preview)
- GitHub Actions workflow `.github/workflows/pages.yml` checks every push (`tools/check.mjs`: every inline
  script compiles, key page elements exist) and deploys both branches to Pages. A failing dev build is
  not published; main is only ever built from `main`.
- `main` is protected: required status check `check`, strict, enforced for admins, no force pushes, no
  deletion. Changes reach main through a pull request from `dev`.
- The dev build uses separate save slots (`-dev` suffix) and shows a red DEV BUILD tag.

## Online multiplayer (branch `multiplayer`, preview https://fsaritome.github.io/CarnageCircuit/mp/)

- **No server of our own.** GitHub can't coordinate: writes need an auth token, which can't live in a
  public page, and GitHub's login endpoints don't allow browser calls. Instead:
  - **Matchmaking** goes through free public MQTT relays (HiveMQ, EMQX, Mosquitto) over secure WebSockets,
    keyed by a 5-letter room code. Host and guests connect to all three at once, retrying each up to three
    times, because a single relay sometimes ignores a connection ("connack timeout"). The relays only
    carry the WebRTC offer/answer (which includes IP addresses), nothing about the race.
  - **The race** runs browser to browser over WebRTC data channels: `rel` (reliable, ordered) for
    events and lobby, `fast` (unordered, no retransmits) for snapshots and inputs. STUN only (Google,
    Cloudflare), no TURN, so some strict networks (symmetric NAT / CGNAT) can't connect.
- **Host-authoritative.** The host simulates rivals, damage, weapons, bikers and laps, and sends a
  snapshot 20×/s plus effect events (blood, bursts, scorch marks, positional sounds, floats, messages,
  bullets, wreck notices). Guests drive their own car locally (no input lag), report it 30×/s with
  their fire/mine/special/nitro buttons and any wall damage, and receive "kicks" when the host knocks
  their car around (rams, explosions, running over bikers).
- Personal feedback (YOU ARE WRECKED, lap callouts, pickup sounds) goes only to its player. Each player's
  blood switch decides what they see.
- Online races are one-offs: up to 4 humans, empty seats get rivals at the host's chosen difficulty,
  everyone gets a standard car (engine 2, tires 2, armor 1, gun 1, a pack of specials). No career money.
  No pause in shared races. A disconnected guest's car is taken over by the AI.
- Fixed along the way: Back on the Credits screen used to save the title screen's demo career over the
  real championship save.
