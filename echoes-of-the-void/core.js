export const ROOMS=[[-12,12,-12,10],[-4,4,-22,-12],[-10,10,-40,-22],[-24,-10,-36,-26],[-9,9,-62,-40]];
export function inside(x,z){return ROOMS.some(([x0,x1,z0,z1])=>x>=x0&&x<=x1&&z>=z0&&z<=z1);}
export function walkable(x,z,gateOpen=false){if(!gateOpen&&z< -39.45)return false;for(const [dx,dz] of [[0,0],[.28,0],[-.28,0],[0,.28],[0,-.28]])if(!inside(x+dx,z+dz))return false;return true;}
export function clearPath(ax,az,bx,bz,gateOpen=false){const n=Math.ceil(Math.hypot(bx-ax,bz-az)/.12);for(let i=0;i<=n;i++){const t=n?i/n:0;if(!walkable(ax+(bx-ax)*t,az+(bz-az)*t,gateOpen))return false;}return true;}
export function damageForCharge(seconds,upgraded){return upgraded&&seconds>=.75?4:1;}
export function summarize(samples){if(!samples.length)return null;const sorted=[...samples].sort((a,b)=>a-b),sum=samples.reduce((a,b)=>a+b,0);return {frames:samples.length,seconds:sum/1000,meanFPS:1000*samples.length/sum,p95FrameMs:sorted[Math.floor((sorted.length-1)*.95)],p99FrameMs:sorted[Math.floor((sorted.length-1)*.99)],framesOver20ms:samples.filter(x=>x>20).length};}
