const fs = require('fs');
const vm = require('vm');
const path = require('path');
const files = ['math','control','digital_control','robotics','system_theory','physics','crypto','blockchain','neural_nets','plc','cyber_security','krl','fuegetechniken','agentic_ai','sensorik','ai_models'];
const sandbox = { window: {} };
vm.createContext(sandbox);
for (const f of files) {
    const code = fs.readFileSync(path.join('js','data',f+'.js'),'utf8');
    vm.runInContext(code, sandbox);
}
const D = sandbox.window.APP_DATA;
const rows = [];
for (const id of Object.keys(D)) {
    const cat = D[id];
    const counts = cat.levels.map(l => l.length);
    const total = counts.reduce((a,b)=>a+b,0);
    rows.push({ id, name: cat.name, total, L1: counts[0], L2: counts[1], L3: counts[2], delta: Math.max(0, 70-total) });
}
rows.sort((a,b)=>a.total-b.total);
const out = rows.map(r=>`${r.id.padEnd(20)} total=${String(r.total).padStart(3)}  L1=${r.L1} L2=${r.L2} L3=${r.L3}  delta=${r.delta}`).join('\n');
const deficit = rows.reduce((a,r)=>a+r.delta,0);
fs.writeFileSync('tools/_count.txt', out + '\n\nDeficit: ' + deficit + '\n');
console.log('written');
