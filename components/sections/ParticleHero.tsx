'use client';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export function ParticleHero({ accent = '#0080C8', sky = '#92DCE5' }: { accent?: string; sky?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 60;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const count = 4500;
    const positions = new Float32Array(count * 3);
    const targets = new Float32Array(count * 3);
    const randoms = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const accentColor = new THREE.Color(accent);
    const skyColor = new THREE.Color(sky);

    function inTooth(x: number, y: number) {
      const crown = ((x * x) / 0.9 + ((y - 0.2) * (y - 0.2)) / 0.6) <= 1 && y > -0.1;
      const rootL = (((x + 0.35) * (x + 0.35)) / 0.12 + ((y + 0.9) * (y + 0.9)) / 0.6) <= 1 && y <= 0.1;
      const rootR = (((x - 0.35) * (x - 0.35)) / 0.12 + ((y + 0.9) * (y + 0.9)) / 0.6) <= 1 && y <= 0.1;
      return crown || rootL || rootR;
    }

    let i = 0, attempts = 0;
    while (i < count && attempts < count * 50) {
      attempts++;
      const x = (Math.random() * 2 - 1) * 1.2;
      const y = Math.random() * 2.5 - 1.5;
      if (inTooth(x, y)) {
        const scale = 18;
        targets[i * 3] = x * scale;
        targets[i * 3 + 1] = y * scale + 3;
        targets[i * 3 + 2] = (Math.random() - 0.5) * 4;
        positions[i * 3] = (Math.random() - 0.5) * 160;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 80;
        randoms[i * 3] = Math.random() * Math.PI * 2;
        randoms[i * 3 + 1] = Math.random() * 2 + 0.5;
        randoms[i * 3 + 2] = Math.random();
        const c = accentColor.clone().lerp(skyColor, Math.random());
        colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
        sizes[i] = Math.random() * 1.2 + 0.5;
        i++;
      }
    }
    while (i < count) {
      const r = 40 + Math.random() * 20;
      const a = Math.random() * Math.PI * 2;
      targets[i * 3] = Math.cos(a) * r; targets[i * 3 + 1] = (Math.random() - 0.5) * 40; targets[i * 3 + 2] = Math.sin(a) * r;
      positions[i * 3] = targets[i * 3]; positions[i * 3 + 1] = targets[i * 3 + 1]; positions[i * 3 + 2] = targets[i * 3 + 2];
      randoms[i * 3] = Math.random() * Math.PI * 2; randoms[i * 3 + 1] = 1; randoms[i * 3 + 2] = Math.random();
      colors[i * 3] = skyColor.r; colors[i * 3 + 1] = skyColor.g; colors[i * 3 + 2] = skyColor.b;
      sizes[i] = 0.4; i++;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aTarget', new THREE.BufferAttribute(targets, 3));
    geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 3));
    geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));

    const vertexShader = `
      attribute vec3 aTarget;
      attribute vec3 aRandom;
      attribute vec3 aColor;
      attribute float aSize;
      uniform float uTime;
      uniform float uProgress;
      uniform vec2 uMouse;
      varying vec3 vColor;
      varying float vAlpha;
      void main() {
        vColor = aColor;
        vec3 pos = mix(position, aTarget, uProgress);
        float t = uTime * aRandom.y * 0.4;
        pos.x += sin(t + aRandom.x) * 0.4 * (1.0 - uProgress * 0.6);
        pos.y += cos(t * 1.3 + aRandom.x) * 0.4 * (1.0 - uProgress * 0.6);
        pos.z += sin(t * 0.8 + aRandom.x) * 0.6;
        pos.x += uMouse.x * aRandom.y * 2.0;
        pos.y += uMouse.y * aRandom.y * 2.0;
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        gl_PointSize = aSize * (280.0 / -mvPosition.z) * (0.5 + uProgress * 0.6);
        vAlpha = 0.3 + aRandom.z * 0.7;
      }
    `;
    const fragmentShader = `
      varying vec3 vColor;
      varying float vAlpha;
      void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float d = length(uv);
        float alpha = smoothstep(0.5, 0.0, d);
        alpha = pow(alpha, 2.0);
        gl_FragColor = vec4(vColor, alpha * vAlpha);
      }
    `;

    const uniforms = {
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    };

    const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouse.tx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.ty = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    mount.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    const start = performance.now();
    let raf: number;
    const tick = () => {
      const elapsed = (performance.now() - start) / 1000;
      uniforms.uTime.value = elapsed;
      const p = Math.min(1, elapsed / 3.5);
      uniforms.uProgress.value = 1 - Math.pow(1 - p, 3);
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      uniforms.uMouse.value.set(mouse.x, mouse.y);
      points.rotation.y = Math.sin(elapsed * 0.1) * 0.15;
      points.rotation.x = Math.cos(elapsed * 0.08) * 0.05;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      mount.removeEventListener('mousemove', onMouseMove);
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [accent, sky]);

  return <div ref={mountRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'auto' }} />;
}
