# Roadmap and ideas

## Status (2026-10-11)

- `main` (released): the game with credits, 4 difficulty levels and the first damage tuning.
- `dev` (not yet released): special weapons, the Iron Vultures biker gang, the TORCS-style racing AI,
  same-class rivals and the 5-level difficulty, damage cuts, the blood switch, README updates.
  **Next step: release `dev` → `main` via a pull request** once fsaritome has playtested it.

## Needs a human playtest

- Is Normal winnable but challenging? (Bot test was within 0.2 s before Normal was eased.)
- Do Hard / Brutal / Insane feel like clear steps up?
- Weapon damage after the second cut: too weak now, or right?
- Biker roadblock: is the gap fair, is the slowdown from running them over too harsh?

## Multiplayer (discussed, not started)

Recommended order:

1. **Local split-screen** (start here). Two humans on one computer: WASD vs arrows or a gamepad,
   two camera views side by side. No servers. Main work: the code assumes one `player` everywhere
   (camera, HUD, controls, catch-up, career, results), so refactor to a list of human players first.
   Estimated one solid session.
2. **Online with room codes** on top of that. Host-authoritative: the host simulates, guests send inputs,
   host broadcasts state ~20×/s, guests interpolate. WebRTC via PeerJS's free public broker (no server
   to run, but it's a third-party free service). Hard parts: guest input lag (needs prediction), syncing
   debris and bikers efficiently, disconnects. A few sessions plus testing with real people on two
   machines.
3. **Own game server** (Cloudflare Workers / Durable Objects or a small VPS): most reliable, costs
   hosting. Only worth it with many players.

Note: claude.ai artifacts block WebRTC, but GitHub Pages is fine.

## Gadget ideas not built yet

- Oil slick that makes cars spin out
- Rear flamethrower
- Side spikes for ramming
- Radar jammer that hides you from rival aim
- More tracks; night track with headlights

## Other ideas

- Best lap / ghost times per track
- Controller (Gamepad API) support
- Sound and music options
