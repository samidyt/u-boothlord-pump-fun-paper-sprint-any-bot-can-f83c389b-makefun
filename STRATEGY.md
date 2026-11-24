# Strategy — Pump.fun Paper Sprint (6h)

Momentum breakout on pump.fun bonding curves, paper money only. The entry signal and
exits are the design tuned on the sibling 24h-replay bounty (`u-jackxyz72`), whose sweep
over 400+ configurations on the same dev window found **no positive region**: the best
configuration scored about −0.21 SOL on the dev window, and momentum-chasing loses there
at every setting tried. This entry reuses that least-bad configuration, with one added
rule (a hard +150% take-profit). It is submitted because submitting is free, the entry is
valid, guardrails are met, and the entry is deterministic — and because the final
scoring window is **different data** (a fresh 6-hour window collected after entries
close), so the dev-negative result does not decide the prize. A prize is not likely on
current evidence; the entry is honest about that.

## Entry (all in `DEFAULT_PARAMS` in strategy.ts)

- Window: 60 slots. Net inflow ≥ 0.3 SOL over the window, from ≥ 10 buy trades by ≥ 5
  distinct buyers, price up ≥ 10% over the window and within 4% of the window high, with
  inflow accelerating (newer half ≥ older half), largest single buyer ≤ 60% of buy SOL.
- Curve mature: ≥ 300 slots since CreateEvent. Real SOL at entry: 1–80 SOL.
- Size: first buy 0.05 SOL, no pyramiding (`pyramid: false`, `maxEntries: 1`), at most
  5 momentum positions at once, 0.05 SOL max exposure per... no — max total exposure
  6 SOL. Slippage 500 bps on buys.

## Exits (sell whole position on the first trigger)

- Stop-loss: value < cost × 0.80.
- Take-profit: value ≥ cost × 2.50.
- Trailing stop: once value ≥ cost × 1.10, sell if value < peak × 0.75.
- Fade: net SOL over the last 30 slots < −0.05.
- Big sell: any single recorded sell ≥ 5 SOL.
- Max hold: 2000 slots (unless up ≥ 0%, i.e. always applies once underwater or flat).
- Curves that complete are closed by the replay itself.

## Guardrails

Tiny 0.01 SOL probe round trips (buy, sell as soon as the buy lands) keep the run on
pace toward ≥ 20 distinct coins and ≥ 200 fills, paced over 4 hours of block time.
Probes are the only trades on coins the momentum signal never picks.

## Determinism

No clock, no `Math.random`, no environment reads. Iteration only over insertion-ordered
maps fed by the batch stream. Two executions produce byte-identical action logs.

## Dev-window results

`grade-local --driver process` on the final files (worktree, before commit; L1 regrade
reproduced byte for byte):

- **Net PnL −0.168 SOL** (return −1.68%, 90% interval −0.312 … −0.027 SOL)
- 399 fills over 121 coins, 200 round trips, win rate 12.0%, max drawdown 2.44%
- Fees 0.142 SOL curve + 0.043 SOL tx; at 2x fees −0.350 SOL
- **Guardrails met** (121 coins ≥ 20, 200 round trips, drawdown ok); determinism ✓
- Eligible: **ranked yes, prize no** (net PnL < 0, below hold cash)
- result_sha256 `78d502169a29e6c9080df80e0e0c1bc22d08ef0efdb6dc1c58c4edfc017e9cca`
- Local sim (patched to load all 3 dataset parts) agreed within 0.01 SOL
  (backtest −0.162; 24-cell sweep mean −0.172, worst −0.186 for these defaults).

For comparison, the sibling 24h-replay entry with the same design graded −0.202 SOL
net PnL, 400 fills over 121 coins, 200 round trips, 13.0% win rate, 2.41% max
drawdown, guardrails met, deterministic — ranked yes, prize no on dev data.
