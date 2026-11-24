// Pump.fun Paper Sprint: Any Bot Can Win — momentum-breakout paper-trading bot.
// The grader runs `node /bot/main.ts`; the strategy lives in strategy.ts and the SDK shim is
// the kit's sdk/ts/makefun-bot.ts, vendored byte for byte.

import { runBot } from './vendor/makefun-bot.ts';
import { createStrategy, DEFAULT_PARAMS } from './strategy.ts';

await runBot(createStrategy(DEFAULT_PARAMS));
