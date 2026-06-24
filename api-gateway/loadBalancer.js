const targets = {
  auth: [
    process.env.AUTH_SERVICE_1,
  ].filter(Boolean),
  user: [process.env.USER_SERVICE],
  restaurant: [process.env.RESTAURANT_SERVICE],
  table: [process.env.TABLE_SERVICE],
  reservation: [process.env.RESERVATION_SERVICE],
};

const counters = {};

function getTarget(service) {
  const list = targets[service];
  if (!list || list.length === 0) throw new Error(`No targets for ${service}`);
  if (!counters[service]) counters[service] = 0;
  const url = list[counters[service] % list.length];
  counters[service]++;
  return url;
}

module.exports = { getTarget };