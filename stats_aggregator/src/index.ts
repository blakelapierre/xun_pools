import {exec} from 'child_process';

import pools from './pools';

const stats = {};

loadAllPoolStats();

setInterval(() => {
  loadAllPoolStats();
}, 10000);

function loadAllPoolStats() {
  // loadPoolStats(pools[0]);
  pools.forEach(loadPoolStats);
}

function loadPoolStats(url) {
  console.log(url);

  exec(`curl --compressed ${url}`, (error, stdout, stderr) => {
    const results = JSON.parse(stdout.toString('UTF8')));

    stats[url] = results;
  });

  // get(url, {compressed: true}, (err, response) => {
  //   if (err) return console.error(err);

  //   console.log(response.body);
  // });
  // request({
  //   url: url,
  //   resolveWithFullResponse: true,
  //   headers: {
  //     'accept-encoding': 'deflate',
  //     'content-type': 'application/json',
  //     'cache-control': 'no-cache'
  //   }
  // })
  //   .then((response) => {
  //     console.log(response);
  //     zlib.gunzipRaw(new Buffer(response.body), (err, buffer) => {
  //       if (err) console.log(err);
  //       else console.log(buffer);
  //     });
  //   })
  //   .catch(error => console.error(url, error));
}