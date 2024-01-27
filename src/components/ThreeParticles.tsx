import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface Particle {
  particle: THREE.Points;
  velocity: number;
}

const ParticleTutorial: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particles: Particle[] = [];
  let distance = 2300;
  let numParticles = 500;
  let mouseY = 0;

  useEffect(() => {
    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;

    const init = () => {
      camera = new THREE.PerspectiveCamera(
        100,
        window.innerWidth / window.innerHeight,
        1,
        4000
      );
      camera.position.z = 2000;
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0b1433);
      scene.add(camera);

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      rendererRef.current = renderer;
      if (containerRef.current) {
        containerRef.current.appendChild(renderer.domElement);
      }
      makeParticles();

      document.addEventListener("mousemove", onMouseMove, false);
      window.addEventListener("resize", onWindowResize);
      animate();
    };

    const animate = () => {
      requestAnimationFrame(animate);
      update();
    };

    const update = () => {
      updateParticles();
      if (rendererRef.current) {
        rendererRef.current.render(scene, camera);
      }
    };

    const makeParticles = () => {
      const colors = [0x98adf9, 0x7aff8f, 0xffffff];

      for (let i = 0; i < numParticles; i++) {
        const colorIndex = Math.floor(Math.random() * colors.length);
        const color = colors[colorIndex];

        const vertices = [
          Math.random() * (distance * 2) - distance,
          Math.random() * (distance * 2) - distance,
          Math.random() * (distance * 2) - distance,
        ];

        const particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(vertices, 3)
        );

        const particleMaterial = new THREE.PointsMaterial({
          color: color,
          size: 7,
        });

        const particle = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particle);

        particles.push({
          particle,
          velocity: Math.random() * 5 + 1, // 파티클의 이동 속도 설정
        });
      }
    };

    const updateParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        const particleObj = particles[i];
        const particle = particleObj.particle;

        particle.position.z += particleObj.velocity * mouseY * 0.001;

        // 카메라 앞쪽 경계를 넘어서면 파티클을 뒤쪽으로 재배치
        if (particle.position.z > distance) {
          particle.position.z = -distance;
        }
      }
    };

    const onMouseMove = (event: MouseEvent) => {
      mouseY = event.clientY;
    };

    const onWindowResize = () => {
      if (rendererRef.current && camera) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };

    init();

    return () => {
      if (rendererRef.current) {
        rendererRef.current.dispose();
        const rendererContainer = containerRef.current;
        if (rendererContainer) {
          rendererContainer.removeChild(rendererRef.current.domElement);
        }
      }
      window.removeEventListener("resize", onWindowResize);
    };
  }, []);

  return <div ref={containerRef}></div>;
};

export default ParticleTutorial;