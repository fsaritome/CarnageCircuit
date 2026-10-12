# Roadmap and ideas

## Status (2026-10-12)

- Everything is released to `main`: special weapons, the Iron Vultures biker gang, the TORCS-style racing
  AI, same-class rivals and the 5-level difficulty, damage cuts, the blood switch, online multiplayer,
  the all-rights-reserved license. `dev` and `multiplayer` are in sync with `main`.
- New work starts on `dev` again (or a feature branch), released to `main` through a pull request.

## Needs a human playtest

- Is Normal winnable but challenging? (Bot test was within 0.2 s before Normal was eased.)
- Do Hard / Brutal / Insane feel like clear steps up?
- Weapon damage after the second cut: too weak now, or right?
- Biker roadblock: is the gap fair, is the slowdown from running them over too harsh?

## Multiplayer

- **Online with room codes: released** (see DECISIONS.md). Tested with two browser tabs: connect in ~4 s,
  guest driving, damage sync, results, back to the lobby, second race.
- Still untested: two real computers on different networks.
- Possible next steps: a TURN fallback for strict networks (needs a hosted service), copy-paste invite
  codes as a no-relay fallback, spectating after you finish, guest-side smoothing tweaks, chat/emotes,
  online championships with money and the garage.
- **Local split-screen** is still not built.

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
