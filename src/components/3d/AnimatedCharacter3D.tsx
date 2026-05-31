"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * AnimatedCharacter3D — Personaje robot estilizado con animación procedural
 * 
 * Este componente renderiza un personaje robot low-poly animado que:
 * - Hace "idle breathing" (respira suavemente)
 * - Mueve los brazos rítmicamente
 * - Gira lentamente
 * - Tiene ojos brillantes con el color brand
 * - Responde al movimiento del ratón
 * 
 * ============================================
 * PARA SUSTITUIR POR UN MODELO .GLB ANIMADO:
 * ============================================
 * 
 * 1. Coloca tu modelo en: public/models/character.glb
 * 
 * 2. Reemplaza todo el componente por:
 * 
 *    import { useGLTF, useAnimations } from "@react-three/drei";
 *    
 *    export default function AnimatedCharacter3D() {
 *      const group = useRef<THREE.Group>(null);
 *      const { scene, animations } = useGLTF("/models/character.glb");
 *      const { actions } = useAnimations(animations, group);
 *      
 *      useEffect(() => {
 *        // Reproduce la primera animación (idle, walk, etc.)
 *        const firstAction = Object.values(actions)[0];
 *        if (firstAction) firstAction.play();
 *      }, [actions]);
 *      
 *      return (
 *        <group ref={group}>
 *          <primitive object={scene} scale={1.5} />
 *        </group>
 *      );
 *    }
 * 
 * 3. Formatos soportados: .glb, .gltf (con animaciones embebidas)
 * 4. Herramientas para crear: Mixamo, Blender, Ready Player Me
 * ============================================
 */
export default function AnimatedCharacter3D() {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);
  const antennaRef = useRef<THREE.Mesh>(null);

  // Emissive material refs for pulsing
  const coreMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const leftEyeMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const rightEyeMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const accentTopMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const accentBottomMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const leftHandMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const rightHandMatRef = useRef<THREE.MeshStandardMaterial>(null);
  const antennaGlowMatRef = useRef<THREE.MeshStandardMaterial>(null);

  // Material brand color memoized
  const brandEmissive = useMemo(() => new THREE.Color("#7cff00"), []);
  const bodyWhite = useMemo(() => new THREE.Color("#e8e8e8"), []);
  const bodyLight = useMemo(() => new THREE.Color("#d0d0d0"), []);
  const bodyAccent = useMemo(() => new THREE.Color("#c0c0c0"), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const mouseX = state.pointer.x;
    const mouseY = state.pointer.y;

    if (groupRef.current) {
      // Slow rotation + mouse follow
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouseX * 0.4 + Math.sin(time * 0.3) * 0.15,
        0.03
      );
      // Idle breathing — body goes up and down
      groupRef.current.position.y = Math.sin(time * 1.2) * 0.06;
    }

    if (headRef.current) {
      // Head looks at mouse slightly
      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        mouseX * 0.5,
        0.05
      );
      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        -mouseY * 0.25,
        0.05
      );
    }

    if (leftArmRef.current) {
      leftArmRef.current.rotation.x = Math.sin(time * 1.5) * 0.3 - 0.1;
      leftArmRef.current.rotation.z = Math.sin(time * 0.8) * 0.05 + 0.15;
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.x = Math.sin(time * 1.5 + Math.PI) * 0.3 - 0.1;
      rightArmRef.current.rotation.z = Math.sin(time * 0.8 + Math.PI) * 0.05 - 0.15;
    }

    if (leftLegRef.current) {
      leftLegRef.current.rotation.x = Math.sin(time * 1.5 + Math.PI) * 0.15;
    }
    if (rightLegRef.current) {
      rightLegRef.current.rotation.x = Math.sin(time * 1.5) * 0.15;
    }

    if (antennaRef.current) {
      antennaRef.current.rotation.z = Math.sin(time * 2) * 0.3;
    }

    // === Emissive pulse animation ===
    // Smooth breathing wave + subtle flicker for a modern "alive" feel
    const breathe = Math.sin(time * 1.5) * 0.5 + 0.5; // 0-1 smooth wave
    const flicker = Math.sin(time * 12) * 0.05; // fast micro-flicker
    const pulse = breathe + flicker;

    // Core: strongest pulse (2.5 → 5)
    if (coreMatRef.current) {
      coreMatRef.current.emissiveIntensity = 2.5 + pulse * 2.5;
    }
    // Eyes: offset pulse (2 → 4)
    const eyePulse = Math.sin(time * 1.5 + 0.5) * 0.5 + 0.5 + flicker;
    if (leftEyeMatRef.current) {
      leftEyeMatRef.current.emissiveIntensity = 2.0 + eyePulse * 2.0;
    }
    if (rightEyeMatRef.current) {
      rightEyeMatRef.current.emissiveIntensity = 2.0 + eyePulse * 2.0;
    }
    // Accent lines: gentle pulse (1 → 2)
    const accentPulse = Math.sin(time * 1.5 + 1.0) * 0.5 + 0.5;
    if (accentTopMatRef.current) {
      accentTopMatRef.current.emissiveIntensity = 1.0 + accentPulse * 1.0;
    }
    if (accentBottomMatRef.current) {
      accentBottomMatRef.current.emissiveIntensity = 1.0 + accentPulse * 1.0;
    }
    // Hands: offset pulse (1 → 2)
    const handPulse = Math.sin(time * 1.5 + 2.0) * 0.5 + 0.5;
    if (leftHandMatRef.current) {
      leftHandMatRef.current.emissiveIntensity = 1.0 + handPulse * 1.0;
    }
    if (rightHandMatRef.current) {
      rightHandMatRef.current.emissiveIntensity = 1.0 + handPulse * 1.0;
    }
    // Antenna glow: fast pulse (2.5 → 5)
    if (antennaGlowMatRef.current) {
      antennaGlowMatRef.current.emissiveIntensity = 2.5 + pulse * 2.5;
    }
  });

  return (
    <>
      {/* Lighting — clean and bright */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 8, 5]} intensity={2} color="#ffffff" />
      <directionalLight position={[-3, 4, -2]} intensity={0.8} color="#ffffff" />
      <pointLight position={[0, 2, 4]} intensity={3} color="#ffffff" distance={12} />
      {/* Subtle green rim */}
      <pointLight position={[0, 2, -3]} intensity={1.5} color="#7cff00" distance={8} />

      {/* Ground glow */}
      <mesh position={[0, -2.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.5, 64]} />
        <meshBasicMaterial color="#7cff00" transparent opacity={0.15} />
      </mesh>

      <group ref={groupRef} position={[0, -0.5, 0]} scale={0.9}>
        {/* ===== BODY / TORSO ===== */}
        <group ref={bodyRef}>
          {/* Chest — main torso */}
          <mesh position={[0, 0.3, 0]}>
            <boxGeometry args={[0.9, 1.1, 0.5]} />
            <meshStandardMaterial color={bodyWhite} roughness={0.5} metalness={0.1} />
          </mesh>
          {/* Green edge accent lines on chest */}
          <mesh position={[0, 0.85, 0.251]}>
            <boxGeometry args={[0.88, 0.02, 0.01]} />
            <meshStandardMaterial ref={accentTopMatRef} color="#7cff00" emissive="#7cff00" emissiveIntensity={1.5} toneMapped={false} />
          </mesh>
          <mesh position={[0, -0.2, 0.251]}>
            <boxGeometry args={[0.88, 0.02, 0.01]} />
            <meshStandardMaterial ref={accentBottomMatRef} color="#7cff00" emissive="#7cff00" emissiveIntensity={1.5} toneMapped={false} />
          </mesh>
          {/* Chest plate accent */}
          <mesh position={[0, 0.45, 0.26]}>
            <boxGeometry args={[0.5, 0.5, 0.02]} />
            <meshStandardMaterial color={bodyLight} roughness={0.4} metalness={0.15} />
          </mesh>
          {/* Core energy (brand green) — larger and brighter */}
          <mesh position={[0, 0.3, 0.29]}>
            <circleGeometry args={[0.15, 64]} />
            <meshStandardMaterial
              ref={coreMatRef}
              color="#7cff00"
              emissive="#7cff00"
              emissiveIntensity={4}
              toneMapped={false}
            />
          </mesh>
          {/* Waist */}
          <mesh position={[0, -0.3, 0]}>
            <cylinderGeometry args={[0.35, 0.4, 0.2, 8]} />
            <meshStandardMaterial color={bodyAccent} roughness={0.4} metalness={0.2} />
          </mesh>

          {/* ===== HEAD ===== */}
          <group ref={headRef} position={[0, 1.2, 0]}>
            {/* Skull */}
            <mesh>
              <boxGeometry args={[0.6, 0.5, 0.5]} />
              <meshStandardMaterial color={bodyWhite} roughness={0.4} metalness={0.15} />
            </mesh>
            {/* Visor / face plate */}
            <mesh position={[0, 0, 0.26]}>
              <boxGeometry args={[0.5, 0.25, 0.02]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.5} />
            </mesh>
            {/* Left eye */}
            <mesh position={[-0.12, 0.02, 0.28]}>
              <circleGeometry args={[0.06, 12]} />
              <meshStandardMaterial
                ref={leftEyeMatRef}
                color="#7cff00"
                emissive="#7cff00"
                emissiveIntensity={3}
                toneMapped={false}
              />
            </mesh>
            {/* Right eye */}
            <mesh position={[0.12, 0.02, 0.28]}>
              <circleGeometry args={[0.06, 12]} />
              <meshStandardMaterial
                ref={rightEyeMatRef}
                color="#7cff00"
                emissive="#7cff00"
                emissiveIntensity={3}
                toneMapped={false}
              />
            </mesh>
            {/* Antenna */}
            <group position={[0, 0.3, 0]}>
              <mesh ref={antennaRef}>
                <cylinderGeometry args={[0.015, 0.02, 0.3, 6]} />
                <meshStandardMaterial color={bodyLight} roughness={0.4} metalness={0.15} />
              </mesh>
              <mesh position={[0, 0.2, 0]}>
                <sphereGeometry args={[0.04, 12, 12]} />
                <meshStandardMaterial
                  ref={antennaGlowMatRef}
                  color="#7cff00"
                  emissive="#7cff00"
                  emissiveIntensity={4}
                  toneMapped={false}
                />
              </mesh>
            </group>
            {/* Neck */}
            <mesh position={[0, -0.35, 0]}>
              <cylinderGeometry args={[0.1, 0.15, 0.2, 8]} />
              <meshStandardMaterial color={bodyAccent} roughness={0.4} metalness={0.2} />
            </mesh>
          </group>

          {/* ===== LEFT ARM ===== */}
          <group ref={leftArmRef} position={[-0.6, 0.6, 0]}>
            {/* Shoulder joint */}
            <mesh>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshStandardMaterial color={bodyAccent} emissive="#7cff00" emissiveIntensity={0.6} roughness={0.4} metalness={0.2} />
            </mesh>
            {/* Upper arm */}
            <mesh position={[0, -0.3, 0]}>
              <boxGeometry args={[0.18, 0.45, 0.18]} />
              <meshStandardMaterial color={bodyWhite} roughness={0.5} metalness={0.1} />
            </mesh>
            {/* Elbow */}
            <mesh position={[0, -0.55, 0]}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial color={bodyLight} emissive="#7cff00" emissiveIntensity={0.8} roughness={0.4} metalness={0.15} />
            </mesh>
            {/* Forearm */}
            <mesh position={[0, -0.78, 0]}>
              <boxGeometry args={[0.15, 0.38, 0.15]} />
              <meshStandardMaterial color={bodyAccent} roughness={0.4} metalness={0.2} />
            </mesh>
            {/* Hand */}
            <mesh position={[0, -1.0, 0]}>
              <boxGeometry args={[0.14, 0.1, 0.14]} />
              <meshStandardMaterial
                ref={leftHandMatRef}
                color="#7cff00"
                emissive="#7cff00"
                emissiveIntensity={1.5}
                toneMapped={false}
              />
            </mesh>
          </group>

          {/* ===== RIGHT ARM ===== */}
          <group ref={rightArmRef} position={[0.6, 0.6, 0]}>
            <mesh>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshStandardMaterial color={bodyAccent} emissive="#7cff00" emissiveIntensity={0.6} roughness={0.4} metalness={0.2} />
            </mesh>
            <mesh position={[0, -0.3, 0]}>
              <boxGeometry args={[0.18, 0.45, 0.18]} />
              <meshStandardMaterial color={bodyWhite} roughness={0.5} metalness={0.1} />
            </mesh>
            <mesh position={[0, -0.55, 0]}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial color={bodyLight} emissive="#7cff00" emissiveIntensity={0.8} roughness={0.4} metalness={0.15} />
            </mesh>
            <mesh position={[0, -0.78, 0]}>
              <boxGeometry args={[0.15, 0.38, 0.15]} />
              <meshStandardMaterial color={bodyAccent} roughness={0.4} metalness={0.2} />
            </mesh>
            <mesh position={[0, -1.0, 0]}>
              <boxGeometry args={[0.14, 0.1, 0.14]} />
              <meshStandardMaterial
                ref={rightHandMatRef}
                color="#7cff00"
                emissive="#7cff00"
                emissiveIntensity={1.5}
                toneMapped={false}
              />
            </mesh>
          </group>

          {/* ===== LEFT LEG ===== */}
          <group ref={leftLegRef} position={[-0.2, -0.5, 0]}>
            {/* Hip joint */}
            <mesh>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshStandardMaterial color={bodyAccent} emissive="#7cff00" emissiveIntensity={0.4} roughness={0.4} metalness={0.2} />
            </mesh>
            {/* Upper leg */}
            <mesh position={[0, -0.35, 0]}>
              <boxGeometry args={[0.2, 0.5, 0.2]} />
              <meshStandardMaterial color={bodyWhite} roughness={0.5} metalness={0.1} />
            </mesh>
            {/* Knee */}
            <mesh position={[0, -0.65, 0]}>
              <sphereGeometry args={[0.09, 16, 16]} />
              <meshStandardMaterial color={bodyLight} emissive="#7cff00" emissiveIntensity={0.6} roughness={0.4} metalness={0.15} />
            </mesh>
            {/* Lower leg */}
            <mesh position={[0, -0.95, 0]}>
              <boxGeometry args={[0.18, 0.45, 0.18]} />
              <meshStandardMaterial color={bodyAccent} roughness={0.4} metalness={0.2} />
            </mesh>
            {/* Foot */}
            <mesh position={[0, -1.22, 0.06]}>
              <boxGeometry args={[0.2, 0.1, 0.3]} />
              <meshStandardMaterial color={bodyWhite} emissive="#7cff00" emissiveIntensity={0.3} roughness={0.5} metalness={0.1} />
            </mesh>
          </group>

          {/* ===== RIGHT LEG ===== */}
          <group ref={rightLegRef} position={[0.2, -0.5, 0]}>
            <mesh>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshStandardMaterial color={bodyAccent} emissive="#7cff00" emissiveIntensity={0.4} roughness={0.4} metalness={0.2} />
            </mesh>
            <mesh position={[0, -0.35, 0]}>
              <boxGeometry args={[0.2, 0.5, 0.2]} />
              <meshStandardMaterial color={bodyWhite} roughness={0.5} metalness={0.1} />
            </mesh>
            <mesh position={[0, -0.65, 0]}>
              <sphereGeometry args={[0.09, 16, 16]} />
              <meshStandardMaterial color={bodyLight} emissive="#7cff00" emissiveIntensity={0.6} roughness={0.4} metalness={0.15} />
            </mesh>
            <mesh position={[0, -0.95, 0]}>
              <boxGeometry args={[0.18, 0.45, 0.18]} />
              <meshStandardMaterial color={bodyAccent} roughness={0.4} metalness={0.2} />
            </mesh>
            <mesh position={[0, -1.22, 0.06]}>
              <boxGeometry args={[0.2, 0.1, 0.3]} />
              <meshStandardMaterial color={bodyWhite} emissive="#7cff00" emissiveIntensity={0.3} roughness={0.5} metalness={0.1} />
            </mesh>
          </group>
        </group>

        {/* ===== FLOATING PARTICLES around character ===== */}
        {[
          [-0.8, 0.5, 0.5],
          [0.9, 0.8, -0.3],
          [-0.6, 1.5, -0.4],
          [0.7, -0.3, 0.6],
          [-0.3, 1.8, 0.3],
          [0.5, 0.1, -0.5],
        ].map((pos, i) => (
          <FloatingParticle key={i} basePosition={pos as [number, number, number]} index={i} />
        ))}
      </group>
    </>
  );
}

/** Floating particle with independent animation */
function FloatingParticle({ basePosition, index }: { basePosition: [number, number, number]; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const offset = index * 1.3;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.x = basePosition[0] + Math.sin(time * 0.5 + offset) * 0.2;
      meshRef.current.position.y = basePosition[1] + Math.sin(time * 0.7 + offset) * 0.3;
      meshRef.current.position.z = basePosition[2] + Math.cos(time * 0.4 + offset) * 0.2;
      meshRef.current.scale.setScalar(0.6 + Math.sin(time * 2 + offset) * 0.4);
    }
  });

  return (
    <mesh ref={meshRef} position={basePosition}>
      <sphereGeometry args={[0.025, 8, 8]} />
      <meshBasicMaterial color="#7cff00" transparent opacity={0.5} />
    </mesh>
  );
}
