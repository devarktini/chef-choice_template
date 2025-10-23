"use client";

import { ChefHatSVG, FoodSVG, UtensilsSVG, SpiceSVG, PlateSVG } from './SVGBackgrounds';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute top-10 left-10 text-primary-200 animate-float">
        <ChefHatSVG />
      </div>
      <div className="absolute top-1/4 right-20 text-warm-200 animate-float" style={{ animationDelay: '1s' }}>
        <FoodSVG />
      </div>
      <div className="absolute bottom-1/4 left-1/4 text-accent-200 animate-float" style={{ animationDelay: '2s' }}>
        <UtensilsSVG />
      </div>
      <div className="absolute top-1/2 right-1/3 text-primary-200 animate-float" style={{ animationDelay: '0.5s' }}>
        <SpiceSVG />
      </div>
      <div className="absolute bottom-20 right-10 text-warm-200 animate-float" style={{ animationDelay: '1.5s' }}>
        <PlateSVG />
      </div>
    </div>
  );
}
