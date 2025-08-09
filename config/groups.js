const allowedGroupIds = new Set([
  "120363030414674555@g.us",
  "120363044643759498@g.us",
  "120363267582104256@g.us",
  "120363418541813477@g.us",
  "120363420560838116@g.us",
  "120363417884183297@g.us",
  "120363385918467697@g.us",
  '120363414056929342@g.us',
  "120363159874666524@g.us",
  "120363264918819223@g.us",
  '919427951390-1425829214@g.us'
]);

const warningLimits = new Map([
  ["120363030414674555@g.us", 5],
  ["120363044643759498@g.us", 5],
  ["120363267582104256@g.us", 3],
  ["120363418541813477@g.us", 5],
  ["120363420560838116@g.us", 5],
  ["120363417884183297@g.us", 5],
  ["120363385918467697@g.us", 5],
  ["120363414056929342@g.us", 5],
  ["120363159874666524@g.us", 5],
  ["120363264918819223@g.us", 5],
  ["919427951390-1425829214@g.us", 5]
]);

const blacklist = [
  "fuck", "shit", "bitch", "bc", "mc", "chutiya", "mf", "nigga", "idiot", "harami",
  "kutta", "kamina", "mkc", "bkl", "gandu", "gendu", "tf", "bsdk", '♥️da', '♥️de', 'madarchod', 'behenchod', 'nigge', 'niggao'
];

module.exports = { allowedGroupIds, warningLimits, blacklist };
