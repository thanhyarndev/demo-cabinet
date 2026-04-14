import { useState, useEffect } from 'react';
import { Button } from './components/Button';
import { GlassCard } from './components/GlassCard';
import { Progress } from './components/Progress';
import { StatusBadge } from './components/StatusBadge';
import { Shirt, Hexagon, ScanLine, CheckCircle2, RotateCcw } from 'lucide-react';

export default function App() {
  const [isScanning, setIsScanning] = useState(false);
  const [poloCount, setPoloCount] = useState(0);
  const [gownCount, setGownCount] = useState(0);
  const [status, setStatus] = useState<"ready" | "scanning" | "verified">("ready");

  const poloTarget = 8;
  const gownTarget = 7;
  const totalTarget = poloTarget + gownTarget;
  const currentTotal = poloCount + gownCount;

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isScanning) {
      interval = setInterval(() => {
        const canIncrementPolo = poloCount < poloTarget;
        const canIncrementGown = gownCount < gownTarget;
        
        if (!canIncrementPolo && !canIncrementGown) {
          setIsScanning(false);
          setStatus("verified");
          clearInterval(interval);
          return;
        }

        const choices = [];
        if (canIncrementPolo) choices.push('polo');
        if (canIncrementGown) choices.push('gown');

        const randomChoice = choices[Math.floor(Math.random() * choices.length)];

        if (randomChoice === 'polo') {
          setPoloCount(prev => prev + 1);
        } else {
          setGownCount(prev => prev + 1);
        }
      }, 50); // very fast mock delay
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isScanning, poloCount, gownCount]);

  useEffect(() => {
    if (isScanning && status !== "scanning") {
      setStatus("scanning");
    } else if (currentTotal === totalTarget) {
      setIsScanning(false);
      setStatus("verified");
    }
  }, [isScanning, currentTotal, status]);

  const handleStart = () => {
    if (status === "verified") return;
    setIsScanning(true);
    setStatus("scanning");
  }

  const handleReset = () => {
    setIsScanning(false);
    setPoloCount(0);
    setGownCount(0);
    setStatus("ready");
  }

  const percent = (currentTotal / totalTarget) * 100;

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center items-center p-4 md:p-8 font-sans selection:bg-primary/30 relative overflow-hidden text-slate-900">
      
      {/* Background Glows for Light Tech Vibe */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      <main className="w-full max-w-lg z-10 flex flex-col gap-6">
        
        {/* Header Section with Logo */}
        <header className="flex flex-col mb-2 gap-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Nextwaves Industries" className="h-10 object-contain drop-shadow-sm" />
            <div className="h-6 w-[1px] bg-slate-300"></div>
            <span className="text-[13px] font-semibold tracking-wider uppercase text-slate-500">
              Nextwaves Industries
            </span>
          </div>
          
          <div className="flex items-end justify-between mt-2">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                <ScanLine className="w-6 h-6 text-blue-600" />
                RFID Inbound Station
              </h1>
              <p className="text-[13px] text-slate-500 mt-1 font-medium">
                Warehouse Delta-4 • Check-in Line
              </p>
            </div>
            <StatusBadge status={status} />
          </div>
        </header>

        {/* Main Dashboard Card */}
        <GlassCard variant="default" className="p-6 flex flex-col gap-8 relative overflow-hidden bg-white/70 backdrop-blur-xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-end mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Batch Progress
              </span>
              <span className="text-2xl font-light tabular-nums tracking-tight text-slate-900">
                {currentTotal} <span className="text-sm font-medium text-slate-400">/ {totalTarget}</span>
              </span>
            </div>
            <Progress 
              value={percent} 
              variant={status === "verified" ? "success" : "default"} 
              size="lg" 
            />
          </div>

          <div className="grid grid-cols-1 gap-3">
            {/* Polo Shirt Tracker */}
            <div className={`p-4 rounded-[12px] border transition-all duration-300 flex items-center justify-between ${poloCount === poloTarget ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${poloCount === poloTarget ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                  <Shirt className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-900">Popo Pique CAFE - WHITE</span>
                  <span className="text-[12px] text-slate-500 font-medium">SKU: WP-001-M</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-light tabular-nums text-slate-900">
                  {poloCount}
                  <span className="text-[13px] text-slate-400 ml-1">/ {poloTarget}</span>
                </span>
                {poloCount === poloTarget && <CheckCircle2 className="w-5 h-5 text-emerald-500 ml-2 animate-in zoom-in" />}
              </div>
            </div>

            {/* Cleanroom Gown Tracker */}
            <div className={`p-4 rounded-[12px] border transition-all duration-300 flex items-center justify-between ${gownCount === gownTarget ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-200 shadow-sm'}`}>
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${gownCount === gownTarget ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                  <Hexagon className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-900">Cleanroom Gown</span>
                  <span className="text-[12px] text-slate-500 font-medium">SKU: CRG-99A-L</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-light tabular-nums text-slate-900">
                  {gownCount}
                  <span className="text-[13px] text-slate-400 ml-1">/ {gownTarget}</span>
                </span>
                {gownCount === gownTarget && <CheckCircle2 className="w-5 h-5 text-emerald-500 ml-2 animate-in zoom-in" />}
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Action Controls */}
        <div className="grid grid-cols-3 gap-3">
          <Button 
            variant="ghost" 
            className="flex-col h-16 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm text-slate-600"
            onClick={handleReset}
          >
            <RotateCcw className="w-4 h-4 mb-1" />
            <span className="text-[11px] uppercase tracking-wider font-bold">Reset</span>
          </Button>

          <Button 
            className={`col-span-2 h-16 text-[15px] tracking-wide transition-all shadow-md ${
               status === "verified" 
                 ? "bg-emerald-500 text-white hover:bg-emerald-600 border-0" 
                 : "bg-[#09090b] text-white hover:bg-black border-0"
            }`}
            onClick={handleStart}
            disabled={status === "scanning" || status === "verified"}
          >
            {status === "scanning" && (
              <span className="flex items-center gap-2 font-semibold">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Scanning Environment...
              </span>
            )}
            {status === "ready" && (
               <span className="flex items-center gap-2 font-semibold">
                  <ScanLine className="w-5 h-5" />
                  Initiate Scan
               </span>
            )}
            {status === "verified" && (
               <span className="flex items-center gap-2 font-semibold">
                  <CheckCircle2 className="w-5 h-5" />
                  All Items Verified
               </span>
            )}
          </Button>
        </div>

      </main>
    </div>
  );
}
