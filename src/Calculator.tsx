import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Wrench, Shield, CheckCircle2 } from 'lucide-react';

export function Calculator() {
  const [step, setStep] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedPart, setSelectedPart] = useState("");

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  return (
    <div className="bg-surface/50 border border-white/10 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl"></div>
      
      <div className="mb-8 relative z-10">
        <h3 className="text-2xl font-bold text-white mb-2">Калькулятор подбора деталей</h3>
        <p className="text-textMuted">Выберите марку, год и узел для точного подбора запчастей</p>
      </div>

      <div className="flex gap-2 mb-8 relative z-10">
        {[1, 2, 3, 4].map(s => (
          <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors ${s <= step ? 'bg-primary' : 'bg-white/10'}`} />
        ))}
      </div>

      <div className="relative z-10 min-h-[220px]">
        <AnimatePresence mode='wait'>
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-medium text-white mb-4">Марка мотоцикла</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['Yamaha', 'Honda', 'Kawasaki', 'Suzuki', 'BMW', 'Ducati', 'KTM', 'Aprilia'].map(brand => (
                  <button
                    key={brand}
                    onClick={() => { setSelectedBrand(brand); handleNext(); }}
                    className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                      selectedBrand === brand 
                        ? 'bg-primary/20 border-primary text-white' 
                        : 'bg-background border-white/5 text-textMuted hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-medium text-white mb-4">Год выпуска</h4>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016'].map(year => (
                  <button
                    key={year}
                    onClick={() => { setSelectedYear(year); handleNext(); }}
                    className="p-3 rounded-xl border bg-background border-white/5 text-textMuted hover:border-primary hover:text-white transition-all text-sm font-medium"
                  >
                    {year}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-medium text-white mb-4">Какой узел ищем?</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'engine', name: 'Двигатель и ТО', icon: Settings },
                  { id: 'chassis', name: 'Подвеска и тормоза', icon: Wrench },
                  { id: 'body', name: 'Пластик и тюнинг', icon: Shield }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => { setSelectedPart(item.name); handleNext(); }}
                    className="p-4 rounded-xl border bg-background border-white/5 text-textMuted hover:border-primary hover:text-white transition-all flex flex-col items-center gap-3 group"
                  >
                    <item.icon className="w-8 h-8 group-hover:text-primary transition-colors" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center space-y-4 py-4"
            >
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-primary mb-2">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-white">Параметры сохранены!</h4>
              <p className="text-textMuted max-w-md">
                Мы подобрали каталог именно для {selectedBrand} ({selectedYear}). Нажмите ниже, чтобы получить подборку деталей в Telegram.
              </p>
              <button 
                onClick={() => {
                   if (window.Telegram && window.Telegram.WebApp) {
                     window.Telegram.WebApp.sendData(JSON.stringify({
                       action: "quiz_completed",
                       brand: selectedBrand,
                       year: selectedYear,
                       part: selectedPart
                     }));
                     window.Telegram.WebApp.close();
                   } else {
                     alert("Для отправки откройте приложение внутри Telegram!");
                   }
                }}
                className="mt-4 bg-[#2AABEE] hover:bg-[#229ED9] text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-[#2AABEE]/20 flex items-center gap-2"
              >
                Получить подборку в Telegram
              </button>
              <button 
                onClick={() => setStep(1)}
                className="text-sm text-textMuted hover:text-white transition-colors mt-2"
              >
                Начать заново
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
