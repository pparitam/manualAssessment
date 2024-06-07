// k6-tests/load_test.js
import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '30s', target: 20 }, // Ramp-up to 20 users
    { duration: '1m', target: 20 },  // Stay at 20 users for 1 minute
    { duration: '30s', target: 0 },  // Ramp-down to 0 users
  ],
};

export default function () {
  http.get('https://devel.manual.co/hair-loss/power-shampoo');
  sleep(1);
  http.get('https://devel.manual.co/checkout/review')
  sleep(1);
}

export function handleSummary(data) {
  return {
    'results/summary.json': JSON.stringify(data),
    'stdout': textSummary(data, { indent: ' ', enableColors: true }),
  };
}