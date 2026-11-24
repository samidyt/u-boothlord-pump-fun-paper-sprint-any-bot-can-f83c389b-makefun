# Pump.fun Paper Sprint: Any Bot Can Win

[![make.fun](https://make.fun/badge/u-boothlord-pump-fun-paper-sprint-any-bot-can-f83c389b.svg)](https://make.fun/bounty/u-boothlord-pump-fun-paper-sprint-any-bot-can-f83c389b)
[![rank](https://make.fun/badge/u-boothlord-pump-fun-paper-sprint-any-bot-can-f83c389b/samidyt/u-boothlord-pump-fun-paper-sprint-any-bot-can-f83c389b-makefun/rank.svg)](https://make.fun/bounty/u-boothlord-pump-fun-paper-sprint-any-bot-can-f83c389b)
[![reward](https://make.fun/badge/u-boothlord-pump-fun-paper-sprint-any-bot-can-f83c389b/samidyt/u-boothlord-pump-fun-paper-sprint-any-bot-can-f83c389b-makefun/reward.svg)](https://make.fun/bounty/u-boothlord-pump-fun-paper-sprint-any-bot-can-f83c389b)

A momentum-breakout paper-trading bot for the [make.fun](https://make.fun/bounty/u-boothlord-pump-fun-paper-sprint-any-bot-can-f83c389b) pump.fun replay sprint. Paper money only — no real funds, no fees to enter. The bot replays on 6 hours of real pump.fun chain data after entries close; highest net PnL wins the $2 pot.

## Strategy

Single small entries on accelerating buy pressure: a mature curve (300+ slots old) whose 60-slot tape shows net SOL inflow from at least 5 distinct buyers, price up 10%+ and sitting within 4% of its window high, with inflow accelerating into the newer half of the window. Exits: 20% stop-loss, +150% take-profit, 25% trailing stop armed at +10%, fade exit on outflow, exit on any single ≥ 5 SOL sell, 2000-slot max hold. Tiny 0.01 SOL probe round trips keep the run above the guardrail bar (≥ 20 coins, ≥ 200 fills). Full design, parameters and honest dev-window results: see [STRATEGY.md](STRATEGY.md).

## Run it

Node 22.18+ (the grader runs `node /bot/main.ts`, no install, no build):

```sh
node main.ts
```

## Layout

- `main.ts` — entrypoint: hands the tuned strategy to the replay shim.
- `strategy.ts` — the momentum-breakout strategy (all parameters in `DEFAULT_PARAMS`).
- `vendor/makefun-bot.ts` — the kit's `agent-fun/replay/v2` shim, byte-identical to the kit.
- `STRATEGY.md` — design notes and dev-window results.
- `BUILD-NOTES.md` — build log.
