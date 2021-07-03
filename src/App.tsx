import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Earth from "./components/earth";

function App() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Canvas>
        <Suspense fallback={null}>
          <Earth />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
