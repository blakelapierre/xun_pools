import { h, render } from 'preact-cycle';

import poolUrls from './pools';

const START = (_, mutation) => {
  _.started = true;

  _.pools = _.poolUrls.map(url => monitorPool({url, stats: {}}, mutation));
};

const UPDATE_STATS = (_, pool, stats) => {
  Object.assign(pool.stats = pool.stats || {}, stats);
  delete pool.error;
};

const POOL_ERROR = (_, pool, error) => {
  pool.error = error;
};

const Pools = ({started, pools}, {mutation}) => (
  <pools>
    {started ? Object
                .values(pools)
                .sort((a, b) => !a.stats.pool ? 1 : (!b.stats.pool ? -1 : (a.stats.pool.hashrate > b.stats.pool.hashrate ? -1 : 1)))
                .map(pool => <Pool pool={pool} />)

             : mutation(START)(mutation)}
  </pools>
);

const Pool = ({pool:{url, stats, error}}) => (
  <pool>
    {stats.pool ? <PoolStats stats={stats} /> : undefined}
    <a href={url} target="_new">{url}</a>
    {error ? <PoolError error={error} /> : undefined}
  </pool>
);

const PoolStats = ({stats}) => (
  <pool-stats>
    <hashrate>Hashrate: {stats.pool.hashrate}</hashrate>
    <div>Miners: {stats.pool.miners}</div>
    {stats.pool.workers ? <div>Workers: {stats.pool.workers}</div> : undefined}
  </pool-stats>
);

const PoolError = ({error}) => (
  <pool-error>
    {error.message}
  </pool-error>
);

render(
  Pools, {poolUrls}, document.body
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