import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'motion/react';
import { Trophy, Play, RotateCcw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, LogIn } from 'lucide-react';
import { db, auth } from '../../lib/firebase';
import { 
  doc, 
  onSnapshot, 
  setDoc, 
  serverTimestamp,
} from 'firebase/firestore';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { handleFirestoreError, OperationType } from '../../lib/firestoreUtils';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const INITIAL_SPEED = 150;

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [user, setUser] = useState<User | null>(null);
  
  const gameLoopRef = useRef<number | null>(null);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Real-time Global High Score
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'stats', 'snake'), (snapshot) => {
      if (snapshot.exists()) {
        setHighScore(snapshot.data().score);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'stats/snake');
    });
    return () => unsub();
  }, []);

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const updateGlobalHighScore = async (newScore: number) => {
    if (!user || newScore <= highScore) return;
    
    try {
      await setDoc(doc(db, 'stats', 'snake'), {
        score: newScore,
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'stats/snake');
    }
  };

  const generateFood = useCallback((currentSnake: { x: number; y: number }[]) => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // Check if food is on snake
      const onSnake = currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
      if (!onSnake) break;
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setIsGameOver(false);
    setIsStarted(true);
    setSpeed(INITIAL_SPEED);
    setFood(generateFood(INITIAL_SNAKE));
  };

  const moveSnake = useCallback(() => {
    if (isGameOver || !isStarted) return;

    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = {
        x: head.x + direction.x,
        y: head.y + direction.y,
      };

      // Check wall collision
      if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
        setIsGameOver(true);
        return prevSnake;
      }

      // Check self collision
      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setIsGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        const newScore = score + 10;
        setScore(newScore);
        setFood(generateFood(newSnake));
        if (speed > 60) setSpeed(prev => prev - 2);
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, isGameOver, isStarted, generateFood, speed, score]);

  useEffect(() => {
    if (isGameOver && score > highScore) {
      updateGlobalHighScore(score);
    }
  }, [isGameOver, score, highScore]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (isStarted && !isGameOver) {
      gameLoopRef.current = window.setInterval(moveSnake, speed);
    } else {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [isStarted, isGameOver, moveSnake, speed]);

  return (
    <section className="relative min-w-[100vw] h-screen flex flex-col items-center justify-center flex-shrink-0 bg-neutral-950 px-6 py-20 overflow-hidden" id="snake-game">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="z-10 w-full max-w-4xl flex flex-col items-center gap-8">
        <div className="text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold tracking-tighter mb-2 uppercase text-white"
          >
            SNAKE <span className="text-white/40">ARCADE</span>
          </motion.h2>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm tracking-widest font-bold uppercase text-gray-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              SCORE: <span className="text-white">{score}</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-emerald-400" />
              GLOBAL HIGH: <span className="text-emerald-400">{highScore}</span>
            </div>
            {user && (
              <div className="flex items-center gap-2 text-[10px]">
                <img src={user.photoURL || ''} alt={user.displayName || 'user'} className="w-4 h-4 rounded-full border border-white/20" />
                <span className="text-white/40">{user.displayName}</span>
              </div>
            )}
          </div>
        </div>

        <div className="relative aspect-square w-full max-w-[400px] bg-neutral-900 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          {/* Grid Background */}
          <div className="absolute inset-0 grid grid-cols-20 grid-rows-20 opacity-20">
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
              <div key={i} className="border-[0.5px] border-white/5" />
            ))}
          </div>

          {/* Food */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="absolute bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.5)]"
            style={{
              width: `${100 / GRID_SIZE}%`,
              height: `${100 / GRID_SIZE}%`,
              left: `${(food.x * 100) / GRID_SIZE}%`,
              top: `${(food.y * 100) / GRID_SIZE}%`,
            }}
          />

          {/* Snake */}
          {snake.map((segment, i) => (
            <div
              key={i}
              className={`absolute rounded-sm transition-all duration-75 ${
                i === 0 ? 'bg-white z-10 scale-110 shadow-lg' : 'bg-white/40'
              }`}
              style={{
                width: `${100 / GRID_SIZE}%`,
                height: `${100 / GRID_SIZE}%`,
                left: `${(segment.x * 100) / GRID_SIZE}%`,
                top: `${(segment.y * 100) / GRID_SIZE}%`,
              }}
            />
          ))}

          {/* Overlays */}
          {!isStarted && (
            <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center">
              <Play className="w-12 h-12 text-white mb-4" />
              <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tighter">Ready to Play?</h3>
              <p className="text-gray-400 text-[10px] mb-6 uppercase tracking-widest">
                Use arrow keys to control the snake.
                {!user && <span className="block mt-2 text-emerald-400/60 font-bold">Sign in below to save high scores!</span>}
              </p>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={resetGame}
                  className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-colors uppercase text-xs tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                >
                  Start Game
                </button>
                
                {!user && (
                  <button 
                    onClick={loginWithGoogle}
                    className="flex items-center justify-center gap-2 px-8 py-3 border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-colors uppercase text-[10px] tracking-widest"
                  >
                    <LogIn className="w-3 h-3" /> Login to Save
                  </button>
                )}
              </div>
            </div>
          )}

          {isGameOver && (
            <div className="absolute inset-0 bg-neutral-950/90 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-300">
              <Trophy className="w-12 h-12 text-emerald-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-tighter">Game Over</h3>
              <p className="text-gray-400 text-sm mb-6 uppercase tracking-widest">Final Score: {score}</p>
              
              {!user && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-400/5 border border-emerald-400/10">
                  <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mb-3">Sign in now to participate in global rankings!</p>
                  <button 
                    onClick={loginWithGoogle}
                    className="flex items-center justify-center gap-2 w-full px-6 py-2 bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 rounded-full hover:bg-emerald-400/20 transition-colors uppercase text-[9px] font-bold tracking-widest"
                  >
                    <LogIn className="w-3 h-3" /> Link Profile
                  </button>
                </div>
              )}
              
              <button 
                onClick={resetGame}
                className="flex items-center gap-2 px-8 py-3 bg-emerald-500 text-white font-bold rounded-full hover:bg-emerald-400 transition-colors uppercase text-xs tracking-widest shadow-[0_0_20px_rgba(52,211,153,0.3)]"
              >
                <RotateCcw className="w-4 h-4" /> Try Again
              </button>
            </div>
          )}
        </div>

        {/* Mobile Controls */}
        <div className="grid grid-cols-3 gap-2 md:hidden">
          <div />
          <button 
            className="w-16 h-16 bg-neutral-900 border border-white/10 rounded-xl flex items-center justify-center active:bg-neutral-800"
            onClick={() => direction.y === 0 && setDirection({ x: 0, y: -1 })}
          >
            <ArrowUp className="text-white" />
          </button>
          <div />
          <button 
            className="w-16 h-16 bg-neutral-900 border border-white/10 rounded-xl flex items-center justify-center active:bg-neutral-800"
            onClick={() => direction.x === 0 && setDirection({ x: -1, y: 0 })}
          >
            <ArrowLeft className="text-white" />
          </button>
          <button 
            className="w-16 h-16 bg-neutral-900 border border-white/10 rounded-xl flex items-center justify-center active:bg-neutral-800"
            onClick={() => direction.y === 0 && setDirection({ x: 0, y: 1 })}
          >
            <ArrowDown className="text-white" />
          </button>
          <button 
            className="w-16 h-16 bg-neutral-900 border border-white/10 rounded-xl flex items-center justify-center active:bg-neutral-800"
            onClick={() => direction.x === 0 && setDirection({ x: 1, y: 0 })}
          >
            <ArrowRight className="text-white" />
          </button>
        </div>

        <p className="hidden md:block text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase">
          Use Keyboard Arrows to Navigate
        </p>
      </div>
    </section>
  );
}

