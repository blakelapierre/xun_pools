import { h, render } from 'preact-cycle';

import poolUrls from './pools';
import explorerUrls from './explorers';

const A = document.createElement('a');

// https://stackoverflow.com/questions/879152/how-do-i-make-javascript-beep
const notificationSound =  new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");

let difficultyThreshold = 500000000;

if (localStorage) {
  try {
    difficultyThreshold = parseInt(localStorage.getItem('difficultyThreshold'), 10) || difficultyThreshold;
    console.log({difficultyThreshold});
  }
  catch (e) {}
}


const START = (_, mutation) => {
  console.log('started');
  _.started = true;

  START_POOL_MONITOR(_, mutation);

  _.poolsStats = {};
};

const START_POOL_MONITOR = (_, mutation) => _.pools = _.poolUrls.map(url => monitorPool({url}, mutation));
const START_EXPLORER_MONITOR = (_, mutation) => _.explorers = _.explorerUrls.map(url => monitorExplorer({url}, _, mutation));


const UPDATE_STATS = (_, pool, liveStats, latency, mutation) => {
  if (_.heightData.firstSeen === undefined) _.heightData.firstSeen = liveStats.network.height; // ...could be not what's expected it forked/stalled pool comes first

  Object.assign(pool.stats = pool.stats || {
    firstSeenBlockCount: liveStats.pool.totalBlocks,
    lastSeenBlockCount: liveStats.pool.totalBlocks,
    lastSeenBlock: 0,
    height: liveStats.network.height
  }, {liveStats});

  delete pool.error;

  pool.updated = new Date().getTime();
  pool.latency = latency;


  if (_.heightData.last === undefined) {
    _.heightData.last = liveStats.network.height;
    START_EXPLORER_MONITOR(_, mutation);
  }
  else if (liveStats.network.height > _.heightData.last) {
    _.heightData.last = liveStats.network.height; //!

    _.heightData.seen.unshift([liveStats.network.height, new Date().getTime(), pool]);
    _.heightData.span = _.heightData.seen[0][1] - _.heightData.seen[_.heightData.seen.length-1][1];
    if (_.heightData.seen.length > 17) _.heightData.seen.splice(17, _.heightData.seen.length - 17);
  }


  if (liveStats.pool.totalBlocks > pool.stats.lastSeenBlockCount) {
    pool.stats.lastSeenBlock = new Date().getTime();
    pool.stats.lastSeenBlockCount = liveStats.pool.totalBlocks;
  }

  if (liveStats.network.height > pool.stats.height) {
    pool.stats.height = liveStats.network.height;
  }

  _.knownNetworkRate = 0;
  const poolsStats = _.pools.reduce((stats, pool) => {
    if (pool.stats && pool.stats.liveStats.pool) {
      const {hashrate, miners} = pool.stats.liveStats.pool;
      stats.hashrate += hashrate || 0;
      stats.miners += miners || 0;

      if (hashrate > stats.maxHashrate) stats.maxHashrate = hashrate;
      if (miners > stats.maxMiners) stats.maxMiners = miners;

      _.knownNetworkRate += hashrate;
    }
    return stats;
  }, {hashrate: 0, miners: 0, maxHashrate: 0, maxMiners: 0});

  Object.assign(_.poolsStats, poolsStats);

  _.hashrates.push([_.knownNetworkRate, pool.updated]);

  if (pool.stats.liveStats.network && _.difficultyThreshold > 0 && pool.stats.liveStats.network.difficulty < _.difficultyThreshold) notificationSound.play();
};

const UPDATE_EXPLORER = (_, explorer, {result}, latency) => {
  Object.assign(explorer.stats = explorer.stats || {}, {result});
};

const SET_DIFFICULTY_NOTIFICATION_THRESHOLD = _ => {
  _.difficultyThreshold = parseInt(_.difficultyThresholdInput);
  if (localStorage) {
    localStorage.setItem('difficultyThreshold', _.difficultyThreshold);
  }
};

const DIFFICULTY_THRESHOLD_INPUT = (_, {target: {value}}) => {
  _.difficultyThresholdInput = value;
};

const POOL_ERROR = (_, pool, error) => {
  pool.error = error;
};

const View = (Component) => ({started, ...props}, {mutation}) => (
  <view>
    {started ? <Component {...props} /> : mutation(START)(mutation)}
  </view>
);


const Pools = ({pools, poolsStats}, {mutation}) => (
  <pools>
    <Network pools={pools} />
    <donate>Donate to: TRTLv1W1So77yGbVtrgf8G4epg5Fhq9hEZvpZC8ev86xRVLYsQQMHrxQG92QVjUU3bcE6ThGw9vSbEHBMejJpexE2sdrTC24ZXR</donate>
  </pools>
);

const HeightKnowledge = ({}, {heightData}) => (
  <height-knowledge>
    <table>
      <thead>
        <th colspan={2}>last {heightData.seen.length} seen heights {heightData.seen.length > 0 ? `[${((new Date().getTime() - heightData.seen[heightData.seen.length-1][1]) / 1000).toFixed(1)}s]` : undefined}</th>
      </thead>
      <tbody>
        {heightData.seen.map(([height, time, pool]) => (
          <tr><td>{height}</td><td>{((new Date().getTime() - time) / 1000).toFixed(1)}s ago</td></tr>
        ))}
      </tbody>
    </table>
  </height-knowledge>
);

const Explorers = ({}, {explorers}) => (
  <explorers>
    {explorers ? explorers.map(explorer => explorer.stats ? <Explorer explorer={explorer} /> : undefined) : undefined}
  </explorers>
);

const Explorer = (
  {explorer:{url, stats}}, {heightData},
  computedStats = stats.result
                       .blocks
                       .slice(0, 17)
                       .reduce((agg, block, i) => (
                         agg.totalTime += agg.time-block.timestamp,
                         agg.times.push([agg.time-block.timestamp, block.height - heightData.last, agg.previousDifficulty, agg.totalTime, agg.totalTime / 30]),
                         agg.time = block.timestamp,
                         agg.maxDiff = Math.max(agg.maxDiff, block.difficulty),
                         agg.minDiff = Math.min(agg.minDiff, block.difficulty),
                         agg.previousDifficulty = block.difficulty,
                         agg), {time: new Date().getTime()/1000, totalTime: 0, times: [], maxDiff: 0, minDiff: 9999999999})
) => (
  <explorer>
    {url}
    <block-times>
      {computedStats
        .times
        .map(([time, height, difficulty, cumulativeTime, offset]) => (
          <block-time className={time >= 30 ? 'over' : 'under'} style={{'width': time / computedStats.totalTime * 100 + '%'}}>
            {difficulty ? <difficulty-bar style={{'top': (1 - (difficulty - computedStats.minDiff) / (computedStats.maxDiff - computedStats.minDiff)) * 100 + '%'}}></difficulty-bar> : undefined}
            <height>{height}</height>
            <time>{time.toFixed(0)}s</time>
            <cumulative-time>{offset.toFixed(1)}</cumulative-time>
          </block-time>
        ))
      }
    </block-times>
    <total-time>{computedStats.totalTime.toFixed(0)}</total-time>
    <mean-time>{(computedStats.totalTime/17).toFixed(2)}</mean-time>
  </explorer>
);

const Network = (
  {pools},
  {startTime, difficultyThresholdInput, mutation, heightData},

  activePools =
    Object
      .values(pools)
      .filter(pool => pool.stats && Math.abs(heightData.last - pool.stats.height) < 6),

  possiblyForkedPools =
    Object
      .values(pools)
      .filter(pool => pool.stats && Math.abs(heightData.last - pool.stats.height) > 5),

  unrespondedPools =
    Object
      .values(pools)
      .filter(pool => !pool.stats),

  totalNewBlocks =
    activePools
      .reduce((sum, pool) => sum + pool.stats.liveStats.pool.totalBlocks - pool.stats.firstSeenBlockCount, 0)
  ) => (
  <network>
    <table>
      <thead>
        <tr><th colspan={9}>values obtained/computed from pools'</th></tr>
        <tr>
          <th>rtt</th>
          <th>pool</th>
          <th>height</th>
          <th>network difficulty</th>
          <th>hashrate</th>
          <th>% of known pools</th>
          <th>blocks</th>
          <th>new blocks</th>
          <th>seconds per block</th>
        </tr>
      </thead>

      <thead><th colspan={9}>active pools {heightData.last - heightData.firstSeen > 0 ? `(${totalNewBlocks}/${heightData.last - heightData.firstSeen}) [${(totalNewBlocks / (heightData.last - heightData.firstSeen) * 100).toFixed(2)}%] of seen blocks` : undefined}</th></thead>
      <PoolListBody pools={activePools} showSummary={true} />

      <thead><th colspan={9}>possibly forked pools</th></thead>
      <PoolListBody pools={possiblyForkedPools} />

      <thead><th colspan={9}>unresponded pools</th></thead>
      <PoolListBody pools={unrespondedPools} />

    </table>

    <Explorers />
    <HeightKnowledge />

    Average Seconds Per Block: {totalNewBlocks > 0 ? ((new Date().getTime() - startTime) / totalNewBlocks / 1000).toFixed(2) : 'waiting for new block'}
    <form action="javascript:" onSubmit={mutation(SET_DIFFICULTY_NOTIFICATION_THRESHOLD)}>
      Difficulty threshold for notification: <input type="number" value={difficultyThresholdInput || 0} onInput={mutation(DIFFICULTY_THRESHOLD_INPUT)} />
      <button>Set</button>
    </form>
  </network>
);

const PoolListBody = (
  {pools, showSummary},
  {heightData, startTime, knownNetworkRate},

  // knownNetworkRate = Object.values(pools).reduce((sum, pool) => pool.stats ? sum + pool.stats.liveStats.pool.hashrate : 0, 0),

  totalBlocks =
    pools
      .reduce((sum, pool) => pool.stats ? sum + pool.stats.liveStats.pool.totalBlocks || 0 : 0, 0),

  totalNewBlocks =
    pools
      .reduce((sum, pool) => pool.stats ? sum + pool.stats.liveStats.pool.totalBlocks - pool.stats.firstSeenBlockCount : 0, 0)
) => (
  <tbody>
    {pools
      .sort((a, b) => !a.stats ? 1 : (!b.stats ? -1 : a.stats.liveStats.pool.hashrate > b.stats.liveStats.pool.hashrate ? -1 : 1))
      .map(pool => (
          <tr className={{
            'updated': (new Date().getTime() - pool.updated) <= (9 * 1000),
            'new-block': pool.stats && ((new Date().getTime() - pool.stats.lastSeenBlock) <= (90 * 1000)),
            'error': pool.error
          }}>
            <td>{pool.latency}</td>
            <td><a href={(A.href = pool.url, `${A.protocol || 'http'}//${A.hostname}`)} target="_new">{A.hostname}</a></td>
            <td className={{'possible-fork': pool.stats && Math.abs(heightData.last - pool.stats.liveStats.network.height) > 5}}>{pool.stats ? pool.stats.liveStats.network.height : undefined}</td>
            <td>{pool.stats ? pool.stats.liveStats.network.difficulty : undefined}</td>
            <td>{pool.stats ? pool.stats.liveStats.pool.hashrate : undefined}</td>
            <td>{pool.stats ? (pool.stats.liveStats.pool.hashrate / knownNetworkRate * 100).toFixed(1) : undefined}</td>
            <td>{pool.stats ? pool.stats.liveStats.pool.totalBlocks : undefined}</td>
            <td>{pool.stats ? pool.stats.liveStats.pool.totalBlocks - pool.stats.firstSeenBlockCount : undefined}</td>
            <td>{pool.stats && pool.stats.liveStats.pool.totalBlocks - pool.stats.firstSeenBlockCount > 0 ? ((new Date().getTime() - startTime) / (pool.stats.liveStats.pool.totalBlocks - pool.stats.firstSeenBlockCount) / 1000).toFixed(1) : undefined}</td>
          </tr>
        ))
        .concat(showSummary ? [<tr><td></td><td></td><td></td><td></td><td>{knownNetworkRate}</td><td></td><td>{totalBlocks}</td><td>{totalNewBlocks}</td></tr>] : [])}
  </tbody>
);

const Pool = ({pool:{url, stats, error}}) => (
  <pool>
    <a href={(A.href = url, `${A.protocol || 'http'}//${A.hostname}`)} target="_new">{A.hostname}</a>
    {stats.pool ? <PoolStats stats={stats} /> : undefined}
    {error ? <PoolError error={error} /> : undefined}
  </pool>
);

const PoolStats = ({stats}, {poolsStats}) => (
  <pool-stats>
    <hashrate>Hashrate: {stats.pool.hashrate}</hashrate>
    <hashrate-bar style={{'width': `${stats.pool.hashrate / poolsStats.maxHashrate * 100}%`}}></hashrate-bar>

    <miners>Miners: {stats.pool.miners}</miners>
    <miners-bar style={{'width': `${stats.pool.miners / poolsStats.maxMiners * 100}%`}}></miners-bar>

    <config>
      <div>Fee: {stats.config.fee}</div>
      <div>Min Payment: {stats.config.minPaymentThreshold}</div>

      <table>
        <thead>
          <tr><th>Port</th><th>Difficulty</th><th>Description</th></tr>
        </thead>
        <tbody>
          {stats.config.ports.map(({port, difficulty, desc}) => (
            <tr><td>{port}</td><td>{difficulty}</td><td>{desc}</td></tr>
          ))}
        </tbody>
      </table>
    </config>
  </pool-stats>
);

const PoolError = ({error}) => (
  <pool-error>
    {error.message}
  </pool-error>
);

render(
  View(Pools), {startTime: new Date().getTime(), poolUrls, explorerUrls, difficultyThresholdInput: difficultyThreshold, difficultyThreshold, hashrates: [], heightData: {last: undefined, seen:[]}}, document.body
);

function monitorPool(pool, mutation) {
  const start = new Date().getTime();
  fetch(pool.url)
    .then(response => {
      const end = new Date().getTime();
      response
        .json()
        .then(json => mutation(UPDATE_STATS)(pool, json, end - start, mutation))
        .catch(error => console.log('Error decoding json', pool.url, response, error));
      setTimeout(() => monitorPool(pool, mutation), 10000);
    })
    .catch(error => {
      console.log('Error fetching', pool.url, error);
      mutation(POOL_ERROR)(pool, error);
      setTimeout(() => monitorPool(pool, mutation), 10000);
    });

  return pool;
}

function monitorExplorer(explorer, _, mutation) {
  monitor((start = new Date().getTime()) =>
    fetch(explorer.url, {method: 'POST', body: JSON.stringify({"jsonrpc":"2.0","id":"test","method":"f_blocks_list_json","params":{"height": _.heightData.last || 0}})})
      .then(response =>
        response
          .json()
          .then(json => mutation(UPDATE_EXPLORER)(explorer, json, new Date().getTime() - start, mutation))
      ), 10000);

  return explorer;
}

function monitor(fn, timeout) {
  return fn()
    .then(() => setTimeout(() => monitor(fn, timeout), timeout))
    .catch(error => {
      console.log('Monitor error', error);
      setTimeout(fn, timeout);
    });
}

function getPoolStats(url, updateStats) {
  fetch(url).then(response => {
    response.json().then(json => updateStats(url, json));
  });
}