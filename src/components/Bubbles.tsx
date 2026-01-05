
import React, { useEffect, useState } from 'react';

interface Bubble {
  id: number;
  size: number;
  left: number;
  top: number;
  animationDuration: number;
  delay: number;
}

const Bubbles = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const totalBubbles = 20;
    const newBubbles: Bubble[] = [];

    for (let i = 0; i < totalBubbles; i++) {
      newBubbles.push({
        id: i,
        size: Math.random() * 60 + 20,
        left: Math.random() * 100,
        top: Math.random() * 100,
        animationDuration: Math.random() * 10 + 5,
        delay: Math.random() * 5
      });
    }

    setBubbles(newBubbles);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none">
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="bubble"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            top: `${bubble.top}%`,
            animationDuration: `${bubble.animationDuration}s`,
            animationDelay: `${bubble.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Bubbles;
