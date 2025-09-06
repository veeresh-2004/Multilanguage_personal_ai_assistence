import React, { useEffect } from 'react';

const Animate = () => {
  useEffect(() => {
    const container = document.querySelector('.advanced-loading-container');
    
    // Add random sparkles
    const sparkleInterval = setInterval(() => {
      const sparkle = document.createElement('div');
      sparkle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: white;
        border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        opacity: 1;
        pointer-events: none;
        z-index: 20;
        animation: sparkle 2s ease-out forwards;
      `;
      if (container) {
        container.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 2000);
      }
    }, 300);

    return () => clearInterval(sparkleInterval);
  }, []);

  return (
    <div className="advanced-loading-wrapper">
      <div className="advanced-loading-container">
        {/* Floating Particles */}
        <div className="particles">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`particle particle-${i + 1}`}></div>
          ))}
        </div>

        {/* Energy Waves */}
        <div className="energy-waves">
          <div className="wave wave-1"></div>
          <div className="wave wave-2"></div>
          <div className="wave wave-3"></div>
        </div>

        {/* Floating Coins */}
        <div className="floating-coins">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`coin coin-${i + 1}`}></div>
          ))}
        </div>

        {/* Success Indicators */}
        <div className="success-indicators">
          <div className="check-mark check-1"></div>
          <div className="check-mark check-2"></div>
          <div className="check-mark check-3"></div>
          <div className="check-mark check-4"></div>
        </div>

        {/* Logo Section */}
        <div className="logo-container">
          <div className="logo">
            <div className="logo-icon">L</div>
            <div className="logo-text">LoanMate</div>
          </div>
        </div>

        {/* Main Animation */}
        <div className="main-animation">
          <div className="handshake-scene">
            {/* Person */}
            <div className="person">
              <div className="person-avatar"></div>
              <div className="handshake-arm">
                <div className="handshake-hand"></div>
              </div>
            </div>

            {/* Connection Line */}
            <div className="connection-line"></div>

            {/* Loan Symbol */}
            <div className="loan-symbol">
              <div className="money-stack">
                <div className="money-bill">$</div>
                <div className="money-bill">$</div>
                <div className="money-bill">$</div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="progress-section">
          <div className="progress-bar-container">
            <div className="progress-bar"></div>
          </div>
          
          <div className="loading-text">
            <div className="main-text">Launching Your Financial Future</div>
            <div className="sub-text">Connecting you with the perfect loan solutions</div>
          </div>

          <div className="loading-dots">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .advanced-loading-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 9999;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          overflow: hidden;
          background: linear-gradient(-45deg, #394a92ff, #5308dfff, #010a1aff, #21263eff, #0071d4ff, #00f2fe);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
          100% { background-position: 0% 50%; }
        }

        .advanced-loading-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 1;
        }

        .particle {
          position: absolute;
          background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 100%);
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
          opacity: 0.7;
        }

        .particle-1 { width: 6px; height: 6px; top: 20%; left: 10%; animation-delay: 0s; }
        .particle-2 { width: 8px; height: 8px; top: 60%; left: 20%; animation-delay: 1s; }
        .particle-3 { width: 4px; height: 4px; top: 40%; left: 80%; animation-delay: 2s; }
        .particle-4 { width: 10px; height: 10px; top: 80%; left: 70%; animation-delay: 0.5s; }
        .particle-5 { width: 5px; height: 5px; top: 30%; left: 50%; animation-delay: 1.5s; }
        .particle-6 { width: 7px; height: 7px; top: 70%; left: 30%; animation-delay: 2.5s; }
        .particle-7 { width: 9px; height: 9px; top: 15%; left: 85%; animation-delay: 3s; }
        .particle-8 { width: 6px; height: 6px; top: 85%; left: 15%; animation-delay: 0.8s; }

        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); }
          25% { transform: translateY(-20px) translateX(10px) scale(1.1); }
          50% { transform: translateY(-40px) translateX(-5px) scale(0.9); }
          75% { transform: translateY(-20px) translateX(15px) scale(1.05); }
        }

        .logo-container {
          position: relative;
          z-index: 10;
          margin-bottom: 3rem;
          animation: logoEntrance 2s ease-out forwards;
          opacity: 0;
          transform: scale(0.5) rotateY(180deg);
        }

        @keyframes logoEntrance {
          to {
            opacity: 1;
            transform: scale(1) rotateY(0deg);
          }
        }

        .logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(15px);
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 25px;
          padding: 1.5rem 3rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .logo-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: bold;
          color: white;
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
          animation: logoIconPulse 2s ease-in-out infinite;
          position: relative;
          overflow: hidden;
        }

        .logo-icon::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shine 3s ease-in-out infinite;
        }

        @keyframes shine {
          0% { transform: rotate(0deg) translate(-100%, -100%); }
          50% { transform: rotate(45deg) translate(0%, 0%); }
          100% { transform: rotate(90deg) translate(100%, 100%); }
        }

        @keyframes logoIconPulse {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(5deg); }
        }

        .logo-text {
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.02em;
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          animation: textGlow 3s ease-in-out infinite;
        }

        @keyframes textGlow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.2) drop-shadow(0 0 20px rgba(102, 126, 234, 0.5)); }
        }

        .main-animation {
          position: relative;
          z-index: 5;
          margin: 2rem 0;
          animation: mainAnimationEntrance 2.5s ease-out 0.5s forwards;
          opacity: 0;
          transform: translateY(50px);
        }

        @keyframes mainAnimationEntrance {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .handshake-scene {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          margin: 2rem 0;
        }

        .person {
          position: relative;
          animation: personFloat 4s ease-in-out infinite;
        }

        @keyframes personFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.02); }
        }

        .person-avatar {
          width: 120px;
          height: 120px;
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          border-radius: 50%;
          position: relative;
          box-shadow: 0 15px 35px rgba(79, 172, 254, 0.3);
          border: 4px solid rgba(255, 255, 255, 0.3);
          animation: avatarGlow 3s ease-in-out infinite;
        }

        @keyframes avatarGlow {
          0%, 100% { box-shadow: 0 15px 35px rgba(79, 172, 254, 0.3), 0 0 0 0px rgba(79, 172, 254, 0.5); }
          50% { box-shadow: 0 20px 40px rgba(79, 172, 254, 0.4), 0 0 0 10px rgba(79, 172, 254, 0.2); }
        }

        .person-avatar::before {
          content: '👤';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 3rem;
          animation: emojiPulse 2s ease-in-out infinite;
        }

        @keyframes emojiPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.1); }
        }

        .handshake-arm {
          position: absolute;
          top: 50%;
          right: -30px;
          width: 60px;
          height: 8px;
          background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
          border-radius: 10px;
          transform-origin: left center;
          animation: handshakeMotion 2s ease-in-out infinite;
          box-shadow: 0 4px 15px rgba(79, 172, 254, 0.3);
        }

        @keyframes handshakeMotion {
          0%, 100% { transform: translateY(-50%) rotate(0deg) scaleX(1); }
          25% { transform: translateY(-50%) rotate(5deg) scaleX(1.1); }
          75% { transform: translateY(-50%) rotate(-5deg) scaleX(1.1); }
        }

        .handshake-hand {
          position: absolute;
          right: -15px;
          top: -8px;
          width: 24px;
          height: 24px;
          background: #4facfe;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.5);
          animation: handGlow 1.5s ease-in-out infinite;
        }

        @keyframes handGlow {
          0%, 100% { box-shadow: 0 0 0 0px rgba(79, 172, 254, 0.7); }
          50% { box-shadow: 0 0 0 8px rgba(79, 172, 254, 0.2); }
        }

        .loan-symbol {
          position: relative;
          animation: loanFloat 4s ease-in-out infinite reverse;
        }

        @keyframes loanFloat {
          0%, 100% { transform: translateY(0px) scale(1) rotateY(0deg); }
          50% { transform: translateY(-15px) scale(1.05) rotateY(5deg); }
        }

        .money-stack {
          width: 100px;
          height: 120px;
          position: relative;
          perspective: 1000px;
        }

        .money-bill {
          position: absolute;
          width: 80px;
          height: 40px;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          border-radius: 8px;
          border: 2px solid rgba(255, 255, 255, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: bold;
          color: white;
          box-shadow: 0 10px 25px rgba(240, 147, 251, 0.3);
        }

        .money-bill:nth-child(1) {
          top: 0px;
          left: 10px;
          animation: billFloat1 3s ease-in-out infinite;
          z-index: 3;
        }

        .money-bill:nth-child(2) {
          top: 15px;
          left: 5px;
          animation: billFloat2 3s ease-in-out infinite;
          z-index: 2;
          opacity: 0.9;
        }

        .money-bill:nth-child(3) {
          top: 30px;
          left: 0px;
          animation: billFloat3 3s ease-in-out infinite;
          z-index: 1;
          opacity: 0.8;
        }

        @keyframes billFloat1 {
          0%, 100% { transform: translateY(0px) rotateX(0deg) rotateZ(0deg); }
          50% { transform: translateY(-8px) rotateX(10deg) rotateZ(2deg); }
        }

        @keyframes billFloat2 {
          0%, 100% { transform: translateY(0px) rotateX(0deg) rotateZ(0deg); }
          50% { transform: translateY(-5px) rotateX(-5deg) rotateZ(-1deg); }
        }

        @keyframes billFloat3 {
          0%, 100% { transform: translateY(0px) rotateX(0deg) rotateZ(0deg); }
          50% { transform: translateY(-3px) rotateX(5deg) rotateZ(1deg); }
        }

        .connection-line {
          position: relative;
          width: 120px;
          height: 4px;
          background: linear-gradient(90deg, #4facfe 0%, #00f2fe 50%, #f093fb 100%);
          border-radius: 10px;
          margin: 0 1rem;
          overflow: hidden;
          animation: connectionPulse 2s ease-in-out infinite;
        }

        .connection-line::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
          animation: shimmer 2s linear infinite;
        }

        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        @keyframes connectionPulse {
          0%, 100% { transform: scaleY(1); opacity: 1; }
          50% { transform: scaleY(1.5); opacity: 0.8; }
        }

        .floating-coins {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 400px;
          height: 400px;
        }

        .coin {
          position: absolute;
          width: 30px;
          height: 30px;
          background: radial-gradient(circle at 30% 30%, #ffd700, #ffb300);
          border-radius: 50%;
          border: 3px solid #fff;
          box-shadow: 0 8px 20px rgba(255, 215, 0, 0.4);
          animation: coinOrbit 8s linear infinite;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: #b8860b;
          font-size: 0.9rem;
        }

        .coin::before {
          content: '$';
        }

        .coin-1 { animation-delay: 0s; }
        .coin-2 { animation-delay: 1s; }
        .coin-3 { animation-delay: 2s; }
        .coin-4 { animation-delay: 3s; }
        .coin-5 { animation-delay: 4s; }
        .coin-6 { animation-delay: 5s; }

        @keyframes coinOrbit {
          0% {
            transform: rotate(0deg) translateX(150px) rotate(0deg) scale(1);
            opacity: 1;
          }
          50% {
            transform: rotate(180deg) translateX(150px) rotate(-180deg) scale(1.2);
            opacity: 0.8;
          }
          100% {
            transform: rotate(360deg) translateX(150px) rotate(-360deg) scale(1);
            opacity: 1;
          }
        }

        .progress-section {
          margin-top: 3rem;
          width: 100%;
          max-width: 500px;
          animation: progressEntrance 1.5s ease-out 1s forwards;
          opacity: 0;
          transform: translateY(30px);
        }

        @keyframes progressEntrance {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .progress-bar-container {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          margin-bottom: 1.5rem;
          overflow: hidden;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #4facfe 0%, #00f2fe 50%, #f093fb 100%);
          border-radius: 10px;
          animation: progressFill 4s ease-in-out infinite;
          box-shadow: 0 0 20px rgba(79, 172, 254, 0.6);
          position: relative;
        }

        .progress-bar::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
          animation: progressShimmer 2s linear infinite;
        }

        @keyframes progressFill {
          0% { width: 0%; }
          25% { width: 30%; }
          50% { width: 65%; }
          75% { width: 85%; }
          100% { width: 100%; }
        }

        @keyframes progressShimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }

        .loading-text {
          text-align: center;
          color: white;
          animation: textFade 3s ease-in-out infinite;
        }

        .main-text {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .sub-text {
          font-size: 1rem;
          opacity: 0.9;
          text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
        }

        @keyframes textFade {
          0%, 100% { opacity: 1; transform: translateY(0); }
          50% { opacity: 0.7; transform: translateY(-2px); }
        }

        .loading-dots {
          display: flex;
          gap: 0.5rem;
          margin-top: 2rem;
          animation: dotsEntrance 1s ease-out 2s forwards;
          opacity: 0;
        }

        @keyframes dotsEntrance {
          to { opacity: 1; }
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          animation: dotBounce 1.4s ease-in-out infinite;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .dot:nth-child(1) { animation-delay: 0s; }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }
        .dot:nth-child(4) { animation-delay: 0.6s; }

        @keyframes dotBounce {
          0%, 80%, 100% { 
            transform: scale(0.8) translateY(0); 
            opacity: 0.7; 
          }
          40% { 
            transform: scale(1.2) translateY(-15px); 
            opacity: 1; 
          }
        }

        .success-indicators {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 600px;
          pointer-events: none;
        }

        .check-mark {
          position: absolute;
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.2rem;
          font-weight: bold;
          animation: checkFloat 6s ease-in-out infinite;
          box-shadow: 0 10px 25px rgba(17, 153, 142, 0.3);
        }

        .check-mark::before {
          content: '✓';
        }

        .check-1 { top: 10%; right: 10%; animation-delay: 0s; }
        .check-2 { bottom: 15%; left: 5%; animation-delay: 2s; }
        .check-3 { top: 20%; left: 15%; animation-delay: 4s; }
        .check-4 { bottom: 20%; right: 20%; animation-delay: 1s; }

        @keyframes checkFloat {
          0%, 100% { 
            transform: translateY(0px) scale(1) rotate(0deg); 
            opacity: 0.8; 
          }
          50% { 
            transform: translateY(-20px) scale(1.1) rotate(360deg); 
            opacity: 1; 
          }
        }

        .energy-waves {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 300px;
          height: 300px;
        }

        .wave {
          position: absolute;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          animation: waveExpand 3s ease-out infinite;
        }

        .wave-1 { animation-delay: 0s; }
        .wave-2 { animation-delay: 1s; }
        .wave-3 { animation-delay: 2s; }

        @keyframes waveExpand {
          0% {
            width: 0px;
            height: 0px;
            opacity: 1;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          100% {
            width: 300px;
            height: 300px;
            opacity: 0;
            top: 0;
            left: 0;
            transform: translate(0, 0);
          }
        }

        @keyframes sparkle {
          0% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(180deg); }
          100% { opacity: 0; transform: scale(0.5) rotate(360deg); }
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .logo-text { font-size: 2.5rem; }
          .logo-icon { width: 50px; height: 50px; font-size: 1.5rem; }
          .logo { padding: 1rem 2rem; gap: 0.8rem; }
          .person-avatar { width: 100px; height: 100px; }
          .person-avatar::before { font-size: 2.5rem; }
          .money-stack { width: 80px; height: 100px; }
          .money-bill { width: 65px; height: 35px; font-size: 1.2rem; }
          .main-text { font-size: 1.2rem; }
          .handshake-scene { gap: 1rem; }
        }

        @media (max-width: 480px) {
          .logo-text { font-size: 2rem; }
          .logo-icon { width: 40px; height: 40px; font-size: 1.2rem; }
          .logo { padding: 0.8rem 1.5rem; }
          .progress-section { max-width: 300px; }
        }
      `}</style>
    </div>
  );
};

export default Animate;