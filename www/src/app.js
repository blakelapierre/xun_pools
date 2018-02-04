import { h, render } from 'preact-cycle';

import poolUrls from './pools';

const A = document.createElement('a');

const START = (_, mutation) => {
  console.log('started');
  _.started = true;

  _.pools = _.poolUrls.map(url => monitorPool({url, stats: {}}, mutation));
  _.poolsStats = {};
};

const UPDATE_STATS = (_, pool, stats) => {
  console.log(stats);
  Object.assign(pool.stats = pool.stats || {}, stats);
  delete pool.error;

  const poolsStats = _.pools.reduce((stats, pool) => {
    if (pool.stats.pool) {
      const {hashrate, miners} = pool.stats.pool;
      stats.hashrate += hashrate || 0;
      stats.miners += miners || 0;

      if (hashrate > stats.maxHashrate) stats.maxHashrate = hashrate;
      if (miners > stats.maxMiners) stats.maxMiners = miners;
    }
    return stats;
  }, {hashrate: 0, miners: 0, maxHashrate: 0, maxMiners: 0});

  Object.assign(_.poolsStats, poolsStats);
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
    <global>
      <h1>All Known Pools</h1>
      <hashrate>Hashrate: {poolsStats.hashrate}</hashrate>
      <miners>Miners: {poolsStats.miners}</miners>
    </global>
    {Object
      .values(pools)
      .sort((a, b) => !a.stats.pool ? 1 : (!b.stats.pool ? -1 : (a.stats.pool.hashrate > b.stats.pool.hashrate ? -1 : 1)))
      .map(pool => <Pool pool={pool} />)}
  </pools>
);

const Network = ({pools}) => (
  <network>
    <table>
      <thead>
        <th>pool</th>
        <th>reported network difficulty</th>
      </thead>
      <tbody>
        {pools.map(pool => <tr><td>{A.href = pool.url, A.hostname}</td><td>{(pool.stats.network||{}).difficulty}</td></tr>)}
      </tbody>
    </table>
  </network>
);

const Pool = ({pool:{url, stats, error}}) => (
  <pool>
    <a href={A.href = url, `${A.protocol}${A.hostname}`} target="_new">{A.hostname}</a>
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
  View(Pools), {poolUrls}, document.body
);

function monitorPool(pool, mutation) {
  fetch(pool.url)
    .then(response => {
      response
        .json()
        .then(json => mutation(UPDATE_STATS)(pool, json))
        .catch(error => console.log('Error decoding json', pool.url, response));
      setTimeout(() => monitorPool(pool, mutation), 10000);
    })
    .catch(error => {
      console.log('Error fetching', pool.url, error);
      mutation(POOL_ERROR)(pool, error);
      setTimeout(() => monitorPool(pool, mutation), 10000);
    });

  return pool;
}

function getPoolStats(url, updateStats) {
  fetch(url).then(response => {
    response.json().then(json => updateStats(url, json));
  });
}