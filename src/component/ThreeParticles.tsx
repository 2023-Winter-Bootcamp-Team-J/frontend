import React, { useEffect, useRef } from 'react';
import * as THREE from 'Three';

const ParticleTutorial: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particles: THREE.Points[] = [];

  useEffect(() => {
    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let mouseX = 0;
    let mouseY = 0;

    const init = () => {
      camera = new THREE.PerspectiveCamera(
        80,
        window.innerWidth / window.innerHeight,
        1,
        4000
      );
      camera.position.z = 1000;

      scene = new THREE.Scene();
      scene.add(camera);

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      rendererRef.current = renderer;

      if (containerRef.current) {
        containerRef.current.appendChild(renderer.domElement);
      }

      makeParticles();

      document.addEventListener('mousemove', onMouseMove, false);
      setInterval(update, 1000 / 30);
    };

    const update = () => {
      updateParticles();
      if (rendererRef.current) {
        rendererRef.current.render(scene, camera);
      }
    };

    const makeParticles = () => {
      const colors = [0x98adf9, 0x7aff8f, 0xffffff];
      const distance = 2000;

      for (let zpos = -distance; zpos < distance; zpos += 15) {
        const colorIndex = Math.floor(Math.random() * colors.length);
        const color = colors[colorIndex];

        const geometry = new THREE.BufferGeometry();
        const vertices = [
          Math.random() * (distance * 2) - distance,
          Math.random() * (distance * 2) - distance,
          zpos,
        ];
        geometry.setAttribute(
          'position',
          new THREE.Float32BufferAttribute(vertices, 3)
        );

        const material = new THREE.PointsMaterial({ color: color, size: 10 });

        const particle = new THREE.Points(geometry, material);

        scene.add(particle);
        particles.push(particle);
      }
    };

    const updateParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        particle.position.z += mouseY * 0.03;
        if (particle.position.z > 1500) particle.position.z -= 2500;
      }
    };

    const onMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    init();

    return () => {
      // Clean up code (e.g., remove event listeners, dispose Three.js resources)
      if (rendererRef.current) {
        rendererRef.current.dispose();
        const rendererContainer = containerRef.current;
        if (rendererContainer) {
          rendererContainer.removeChild(rendererRef.current.domElement);
        }
      }
    };
  }, []); // 빈 dependency array로 설정하여 한 번만 실행되도록

  return <div ref={containerRef}>{/* 나머지 JSX */}</div>;
};

export default ParticleTutorial;
