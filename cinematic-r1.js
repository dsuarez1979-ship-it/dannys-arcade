// SKYBOUND-FQ1-CR1-20261116 — CR1 visual layer, merged onto FQ1. No input, flight, or XR changes.
import * as THREE from 'three';
export const BUILD_ID = 'SKYBOUND-FQ1-CR1-20261116'; // merged build id (single source of truth with index.html)
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));

// Material-space rock detail: inexpensive continuous mineral variation;
// no new draw calls, textures, passes, or downloads.
function mineral(material, strength=0.25) {
  material.onBeforeCompile = s => {
    s.vertexShader=s.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 crLocal;');
    s.vertexShader=s.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\ncrLocal=position;');
    s.fragmentShader=s.fragmentShader.replace('#include <common>', `#include <common>
      varying vec3 crLocal;
      float crHash(vec3 p){ return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453); }
      float crNoise(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
        return mix(mix(mix(crHash(i),crHash(i+vec3(1,0,0)),f.x),mix(crHash(i+vec3(0,1,0)),crHash(i+vec3(1,1,0)),f.x),f.y),
        mix(mix(crHash(i+vec3(0,0,1)),crHash(i+vec3(1,0,1)),f.x),mix(crHash(i+vec3(0,1,1)),crHash(i+vec3(1,1,1)),f.x),f.y),f.z);}`);
    s.fragmentShader=s.fragmentShader.replace('#include <color_fragment>', `#include <color_fragment>
      float detail=crNoise(crLocal*.17)*.65+crNoise(crLocal*.7)*.35;
      diffuseColor.rgb *= 1.0-${strength.toFixed(3)}+detail*${(strength*1.5).toFixed(3)};`);
  };
  material.customProgramCacheKey=()=>`cr1-mineral-${strength}`;
  material.needsUpdate=true;
}
function terrainMaterial(mesh) {
  const g=mesh.geometry, p=g.attributes.position;
  g.computeVertexNormals(); const n=g.attributes.normal;
  const c=new Float32Array(p.count*3), color=new THREE.Color();
  const moss=new THREE.Color('#53623a'), meadow=new THREE.Color('#7c8251');
  const rock=new THREE.Color('#6a6d66'), scree=new THREE.Color('#929085');
  for(let i=0;i<p.count;i++){
    const x=p.getX(i),y=p.getY(i),z=p.getZ(i);
    const slope=1-Math.abs(n.getY(i));
    const patch=.5+.25*Math.sin(x*.023+Math.sin(z*.012)*2)+.25*Math.sin(z*.031+x*.006);
    color.copy(moss).lerp(meadow,clamp(patch,0,1));
    color.lerp(rock,clamp((slope-.18)*2.3,0,1));
    color.lerp(scree,clamp((y-145)/180,0,.6));
    color.multiplyScalar(.88+.12*Math.sin(x*.09+z*.05));
    c.set([color.r,color.g,color.b],i*3);
  }
  g.setAttribute('color',new THREE.BufferAttribute(c,3));
  mesh.material=new THREE.MeshStandardMaterial({vertexColors:true,roughness:1,metalness:0});
  mineral(mesh.material,.26);
}

// Called BEFORE each world module is instanced. Keep object names/contracts.
export function styleWorld(gltf, name) {
  gltf.scene.traverse(o=>{
    if(!o.isMesh)return;
    if(name==='terrain') {terrainMaterial(o);return;}
    if(name==='clouds') {
      o.material=new THREE.MeshStandardMaterial({color:'#e7e9e4',roughness:1,transparent:true,opacity:.32,depthWrite:false});
      // Prevent the old radial disk texture from turning 3D lobes into stacks of discs.
      o.material.map=new THREE.DataTexture(new Uint8Array([255,255,255,255]),1,1);
      o.material.map.needsUpdate=true;
      return;
    }
    const materials=Array.isArray(o.material)?o.material:[o.material];
    materials.forEach(m=>{
      m.roughness=Math.max(m.roughness||0,.82);
      if(name==='mountains'||name==='cliffs'||name==='islands'||name==='landmarks') {
        if(o.name==='RangeRing') {
          // Neutral atmospheric rock; remove painted horizontal colour stripes.
          m.color.set('#647479');m.map=null;m.vertexColors=false;
        }
        if(name==='landmarks') {
          const c=o.geometry.attributes.color;
          if(c)for(let i=0;i<c.count;i++){
            const r=c.getX(i),g=c.getY(i),b=c.getZ(i);
            if(g>r*1.4&&g>b*1.4)c.setXYZ(i,g*.42,g*.58,g*.26);
          }
          if(c)c.needsUpdate=true;
        }
        mineral(m,.22);
      }
      if(['conifer','broadleaf','forest'].includes(name)) {
        // Muted forest colours instead of luminous toy-green foliage.
        m.color.set(o.name.toLowerCase().includes('trunk')?'#b9ad95':'#879573');
        m.roughness=1;
      }
    });
  });
}
function featherDetail(m) {
  m.onBeforeCompile=s=>{
    s.vertexShader=s.vertexShader.replace('#include <common>','#include <common>\nvarying vec2 crUV;');
    s.vertexShader=s.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\ncrUV=uv;');
    s.fragmentShader=s.fragmentShader.replace('#include <common>','#include <common>\nvarying vec2 crUV;');
    s.fragmentShader=s.fragmentShader.replace('#include <color_fragment>',`#include <color_fragment>
      vec2 featherUV=crUV*vec2(26.,18.);
      float barbs=.5+.5*sin((featherUV.y+abs(fract(featherUV.x)-.5)*.55)*70.);
      float overlap=smoothstep(.0,.18,fract(featherUV.y));
      diffuseColor.rgb *= .72+.15*barbs+.13*overlap;`);
  };m.customProgramCacheKey=()=> 'cr1-feather-barbs';m.needsUpdate=true;
}
export function styleBird(root) {
  const seen=new Set();
  root.traverse(o=>{
    if(!o.isMesh)return;
    for(const m of (Array.isArray(o.material)?o.material:[o.material])){
      if(seen.has(m))continue;seen.add(m);
      if(/Plumage/.test(m.name)) {m.color.set('#79694f');m.roughness=.92;m.metalness=0; featherDetail(m);}
      if(/Feather/.test(m.name)) {m.color.set('#5b5145');m.roughness=.88;m.metalness=0; featherDetail(m);}
      if(/Beak/.test(m.name)) {m.color.set('#8d8267');m.roughness=.42;}
    }
  });
}

export function installSky(skyGroup,mood,sunDirection) {
  const dome=skyGroup.children.find(o=>o.isMesh&&o.geometry.type==='SphereGeometry');
  if(!dome)return ()=>{};
  const u={zenith:{value:mood.zenith},mid:{value:mood.mid},horizon:{value:mood.horizon},warm:{value:mood.sunWarm},sun:{value:sunDirection}};
  dome.material.dispose();
  dome.material=new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,uniforms:u,
    vertexShader:'varying vec3 ray;void main(){ray=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader:`varying vec3 ray;uniform vec3 zenith,mid,horizon,warm,sun;
      void main(){vec3 d=normalize(ray);float h=max(d.y,0.);
        vec3 c=mix(horizon,mid,smoothstep(0.,.3,h));c=mix(c,zenith,smoothstep(.2,1.,h));
        float glow=pow(max(0.,dot(d,normalize(sun))),8.)*.3;
        c=mix(c,warm,glow);c=mix(c,horizon*.6,smoothstep(0.,.6,-d.y));
        gl_FragColor=vec4(c,1.);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`});
  return ()=>{}; // colours reference the live mood objects, updated by existing transitions
}
