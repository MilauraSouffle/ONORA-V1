import React, { useEffect, useRef } from 'react';

const StaticNoise = ({ isVisible = true, className = "z-[50] mix-blend-overlay opacity-20" }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const draw = () => {
            const w = canvas.width;
            const h = canvas.height;
            const idata = ctx.createImageData(w, h);
            const buffer32 = new Uint32Array(idata.data.buffer);
            const len = buffer32.length;

            for (let i = 0; i < len; i++) {
                // Bruit gris dense (style "Grey Noise")
                const value = Math.random() * 255;
                // Alpha aléatoire pour la densité
                const alpha = Math.random() > 0.5 ? 255 : 100;

                // Format Little Endian (ABGR)
                // R=value, G=value, B=value, A=alpha
                buffer32[i] = (alpha << 24) | (value << 16) | (value << 8) | value;
            }
            ctx.putImageData(idata, 0, 0);
            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resize);
        resize();
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 ${isVisible ? '' : 'opacity-0'} ${className}`}
        />
    );
};

export default StaticNoise;
