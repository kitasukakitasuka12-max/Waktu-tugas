import React, { useState, useEffect, useRef } from 'react';
import { Play, CheckCircle2, AlertCircle } from 'lucide-react';
import TimerDisplay from './TimerDisplay';
import { TimerStatus } from '../types';

const TOTAL_TIME = 5 * 60; // 5 minutes in seconds

const Home: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [status, setStatus] = useState<TimerStatus>(TimerStatus.IDLE);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (status === TimerStatus.RUNNING && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (intervalRef.current) window.clearInterval(intervalRef.current);
            setStatus(TimerStatus.COMPLETED);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [status, timeLeft]);

  const handleStart = () => {
    setStatus(TimerStatus.RUNNING);
  };

  const handleCheckCommission = () => {
    window.location.href = 'https://gconline.online';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700 p-8 flex flex-col items-center gap-8">
        
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Automated task work system
          </h1>
          <p className="text-slate-400 text-sm">
            Sistem Akan Memproses Secara Otomatis Hingga Waktu Yang Ditentukan Selesai.
          </p>
        </div>

        <TimerDisplay timeLeft={timeLeft} totalTime={TOTAL_TIME} />

        <div className="w-full space-y-4">
          {status === TimerStatus.IDLE && (
            <button
              onClick={handleStart}
              className="w-full group relative flex items-center justify-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-4 px-6 rounded-2xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-cyan-500/20"
            >
              <Play className="w-6 h-6 fill-current" />
              <span>MULAI</span>
              <div className="absolute inset-0 rounded-2xl ring-2 ring-white/20 group-hover:ring-white/40 transition-all"></div>
            </button>
          )}

          {status === TimerStatus.RUNNING && (
            <div className="w-full bg-slate-800/80 border border-slate-700 rounded-2xl p-4 flex items-center justify-center gap-3 animate-pulse">
              <AlertCircle className="w-5 h-5 text-yellow-500" />
              <span className="text-yellow-500 font-medium">Work in progress...</span>
            </div>
          )}

          {status === TimerStatus.COMPLETED && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="text-center p-4 bg-green-500/10 border border-green-500/20 rounded-2xl">
                <p className="text-green-400 font-medium flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Waktu Selesai!
                </p>
              </div>
              <button
                onClick={handleCheckCommission}
                className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold py-4 px-6 rounded-2xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-green-500/30 flex items-center justify-center gap-2"
              >
                <span>Cek Komisi Sekarang</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="text-center text-xs text-slate-500">
            © 2016 - 2025 Guccio Gucci S.p.A.
        </div>
      </div>
    </div>
  );
};

export default Home;
