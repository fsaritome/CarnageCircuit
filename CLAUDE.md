# Carnage Circuit: notes for Claude

Top-down combat racer (Death Rally 1996 homage) by fsaritome. Everything lives in `index.html`
(inline CSS + one inline script, Canvas 2D, Web Audio). Read `docs/DECISIONS.md` for why things are
the way they are and `docs/ROADMAP.md` for what's next.

## Workflow

- Work on the `dev` branch. Never push to `main`: it's protected (required check `check`, enforced for
  admins). Release by opening a PR `dev` → `main` with `gh pr create`.
- Every push runs `.github/workflows/pages.yml`: `node tools/check.mjs index.html`, then deploys
  main to https://fsaritome.github.io/CarnageCircuit/ and dev to https://fsaritome.github.io/CarnageCircuit/dev/
- Run `node tools/check.mjs index.html` before every commit.
- Commit messages end with a `Co-Authored-By: Claude ...` line.

## Branches

- `dev`: single-player work. `multiplayer`: online play (preview /mp/, separate saves with suffix -mp).
- Every branch's workflow builds all three previews, so keep `.github/workflows/pages.yml` identical on all branches.

## Testing on the dev preview

- The dev build exposes `window.__cc` (state, cars, player, raceT, gangs, bikers, bikes, debris,
  net, explode(x, y)). It only exists on the previews (`/dev/`, `/mp/`).
- The built-in browser pane throttles `requestAnimationFrame` to 0 fps when hidden. Reload the page
  with the loop swapped to timers:
  fetch `/CarnageCircuit/dev/`, replace `requestAnimationFrame(frame)` with
  `setTimeout(() => frame(performance.now()), 16)`, then `document.open/write/close`.
- Useful tricks: `player.tough = 0` (invincible), set rivals' `lap = 2` to trigger the final-lap biker
  gang, write a save to `localStorage['carnage-circuit-career-dev']` with `race: 1` (Scrapyard Hook)
  or `race: 2` (Bone Canyon) and press Continue to pick a track.
- After teleporting a car in a test, also set its `idx` near the new spot, or the wall clamp pulls it back.

## Code map (search for these)

- Tracks: `TRACKS`, `buildTrack`, `racingLine`, `speedProfile`
- Difficulty: `DIFF` (spd, lineK, up, grip, rb, aim, range, lead, fire, tough, mine, sp, focus, agg, infight, hunt)
- AI: `aiControl`
- Physics: `drive`, `trackClamp`, `phys` (flying bodies/bikes)
- Weapons: `fire`, `dropMine`, `useSpecial`, `SPECIALS`, `explode`, `blast`
- Bikers: `spawnGang`, `updateGang`, `killBiker`, `gibBiker`
- Blood switch: `gore`, `yelp`, `bloodSplat`, `goreSpot`, `scorch`
- Online: `NET`, `netHost`, `netJoin`, `brokerConnectAll`, `netStartRace`, `remoteCar`, `snapshot`, `netTick`, `applySnap`, `applyEvents`, `guestUpdate`, `onlineScreen`
- Multiplayer test: open /mp/ in two browser tabs (patch both loops as above); `window.__cc.net` exposes the network state
- Screens: `titleScreen`, `garage`, `endRace`, `champScreen`, `creditsScreen`

## Boundaries agreed with the user

- Generic spectators and the fictional Iron Vultures biker gang can be as gory as the user likes.
- No gore mechanics targeting stand-ins for real political groups (the glued climate-activist roadblock
  was replaced by the biker gang for this reason).
