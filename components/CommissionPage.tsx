import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateCommissionReport } from '../services/geminiService';
import { CommissionData } from '../types';
import { Wallet, Check, Loader2, ArrowLeft } from 'lucide-react';

const CommissionPage: React.FC = () => {
  const [data, setData] = useState<CommissionData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Determine if we should fetch real data or mock (since API key might not be set in user environment)
    // The service handles the fallback internally, so we just call it.
    const fetchData = async () => {
      try {
        const result = await generateCommissionReport();
        setData(result);
      } catch (e) {
        console.error("Failed to load commission", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
      {loading ? (
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-cyan-500 animate-spin" />
          <p className="text-slate-400 animate-pulse">Menghitung komisi Anda...</p>
        </div>
      ) : data ? (
        <div className="max-w-md w-full bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
            {/* Header / Success Banner */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-700 p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="relative z-10 flex flex-col items-center">
                    <div className="bg-white/20 p-4 rounded-full mb-4 backdrop-blur-sm">
                        <Wallet className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold mb-1">Komisi Diterima!</h2>
                    <p className="text-green-100 opacity-90 text-sm">{data.taskId}</p>
                </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
                <div className="text-center space-y-1">
                    <p className="text-slate-400 text-sm uppercase tracking-wide">Total Pendapatan</p>
                    <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                        {formatCurrency(data.amount)}
                    </p>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                    <p className="text-slate-300 text-center leading-relaxed italic">
                        "{data.message}"
                    </p>
                </div>

                <div className="space-y-3 pt-4">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Status</span>
                        <span className="text-green-400 flex items-center gap-1">
                            <Check className="w-4 h-4" /> Terverifikasi
                        </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Tanggal</span>
                        <span className="text-white">{new Date().toLocaleDateString('id-ID')}</span>
                    </div>
                </div>

                <button 
                    onClick={() => navigate('/')}
                    className="w-full mt-6 bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl transition-colors flex items-center justify-center gap-2 border border-slate-700"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Kembali ke Beranda
                </button>
            </div>
        </div>
      ) : (
        <div className="text-center text-red-400">
            <p>Gagal memuat data. Silakan coba lagi.</p>
             <button 
                onClick={() => navigate('/')}
                className="mt-4 text-white underline"
            >
                Kembali
            </button>
        </div>
      )}
    </div>
  );
};

export default CommissionPage;