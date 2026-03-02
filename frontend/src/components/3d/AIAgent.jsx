import { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Sphere, Icosahedron, Environment } from '@react-three/drei'
import * as THREE from 'three'

function AIAgent() {
  const groupRef = useRef(null)
  const sphereRef = useRef(null)
  const lightRef = useRef(null)
  const { mouse } = useThree()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Floating animation
      groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.3

      // Mouse tracking for head movement
      groupRef.current.rotation.x = mousePosition.y * 0.1
      groupRef.current.rotation.y = mousePosition.x * 0.15
    }

    if (sphereRef.current) {
      // Subtle rotation
      sphereRef.current.rotation.z += 0.001
    }
  })

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <group ref={groupRef}>
      {/* Main core */}
      <Icosahedron args={[1, 4]} ref={sphereRef}>
        <meshStandardMaterial
          color="#0E2A47"
          metalness={0.8}
          roughness={0.2}
          emissive="#0D9488"
          emissiveIntensity={0.3}
        />
      </Icosahedron>

      {/* Glow sphere */}
      <Sphere args={[1.15, 32, 32]}>
        <meshStandardMaterial
          color="#0D9488"
          wireframe={false}
          transparent
          opacity={0.1}
          emissive="#0D9488"
          emissiveIntensity={0.5}
        />
      </Sphere>

      {/* Ring */}
      <mesh rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[1.4, 0.1, 16, 100]} />
        <meshStandardMaterial
          color="#0D9488"
          emissive="#0D9488"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Lighting */}
      <pointLight
        ref={lightRef}
        position={[5, 5, 5]}
        intensity={1}
        color="#0D9488"
      />
    </group>
  )
}

function AIAgentScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.5], fov: 50 }}
      style={{ height: '100%', width: '100%' }}
    >
      <Suspense fallback={null}>
        <AIAgent />
        <Environment preset="studio" />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={2}
      />
    </Canvas>
  )
}

export default AIAgentScene
