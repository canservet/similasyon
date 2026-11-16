import React, { useState } from 'react';
import { 
  Calculator, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  HelpCircle, 
  RefreshCw, 
  Award, 
  Info, 
  ChevronRight,
  FileText
} from 'lucide-react';

interface CalculationState {
  grossSalary: number;
  // Step 1
  sgkWorkerInput: string;
  unemploymentInput: string;
  // Step 2
  taxBaseInput: string;
  incomeTaxInput: string;
  // Step 3
  stampTaxInput: string;
  netSalaryInput: string;
}

export default function App() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [grossSalary, setGrossSalary] = useState<number>(30000);
  
  // User input states for each step
  const [inputs, setInputs] = useState<CalculationState>({
    grossSalary: 30000,
    sgkWorkerInput: '',
    unemploymentInput: '',
    taxBaseInput: '',
    incomeTaxInput: '',
    stampTaxInput: '',
    netSalaryInput: '',
  });

  // Correct calculation values based on user's entered gross salary
  const correctSgkWorker = Math.round(grossSalary * 0.14 * 100) / 100;
  const correctUnemployment = Math.round(grossSalary * 0.01 * 100) / 100;
  const correctTaxBase = Math.round((grossSalary - correctSgkWorker - correctUnemployment) * 100) / 100;
  const correctIncomeTax = Math.round(correctTaxBase * 0.15 * 100) / 100;
  const correctStampTax = Math.round(grossSalary * 0.00759 * 100) / 100;
  const correctNetSalary = Math.round((grossSalary - correctSgkWorker - correctUnemployment - correctIncomeTax - correctStampTax) * 100) / 100;

  // Validation checkers
  const isSgkWorkerCorrect = inputs.sgkWorkerInput !== '' && Math.abs(parseFloat(inputs.sgkWorkerInput) - correctSgkWorker) < 1;
  const isUnemploymentCorrect = inputs.unemploymentInput !== '' && Math.abs(parseFloat(inputs.unemploymentInput) - correctUnemployment) < 1;
  const isTaxBaseCorrect = inputs.taxBaseInput !== '' && Math.abs(parseFloat(inputs.taxBaseInput) - correctTaxBase) < 1;
  const isIncomeTaxCorrect = inputs.incomeTaxInput !== '' && Math.abs(parseFloat(inputs.incomeTaxInput) - correctIncomeTax) < 1;
  const isStampTaxCorrect = inputs.stampTaxInput !== '' && Math.abs(parseFloat(inputs.stampTaxInput) - correctStampTax) < 1;
  const isNetSalaryCorrect = inputs.netSalaryInput !== '' && Math.abs(parseFloat(inputs.netSalaryInput) - correctNetSalary) < 1;

  const handleInputChange = (field: keyof CalculationState, value: string) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleGrossChange = (val: number) => {
    setGrossSalary(val);
    setInputs(prev => ({ 
      ...prev, 
      grossSalary: val,
      sgkWorkerInput: '',
      unemploymentInput: '',
      taxBaseInput: '',
      incomeTaxInput: '',
      stampTaxInput: '',
      netSalaryInput: ''
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-slate-100 flex flex-col font-sans">
      {/* HEADER */}
      <header className="border-b border-indigo-900/50 bg-slate-900/80 backdrop-blur-md sticky top-0 z-30 px-4 py-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 p-2.5 rounded-xl shadow-md shadow-indigo-500/30">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white via-indigo-200 to-blue-400 bg-clip-text text-transparent">
                Brütten Nete Maaş Hesaplama Eğitimi
              </h1>
              <p className="text-xs text-slate-400">Adım Adım Bordro ve Vergi Kesintileri Simülatörü</p>
            </div>
          </div>
        </div>
      </header>

      {/* TOP DYNAMIC SUMMARY BAR (ÜST ÖZET BARı) */}
      <div className="bg-slate-900/90 border-b border-indigo-900/40 px-4 py-3 shadow-inner overflow-x-auto">
        <div className="max-w-4xl mx-auto flex items-center gap-2 min-w-max text-xs">
          <div className="flex items-center gap-1.5 bg-blue-950/80 border border-blue-700/50 px-3 py-1.5 rounded-lg text-blue-200">
            <span className="font-semibold">Brüt:</span>
            <span className="font-bold text-white">{grossSalary.toLocaleString('tr-TR')} ₺</span>
          </div>

          <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0" />

          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${activeStep >= 1 ? (isSgkWorkerCorrect ? 'bg-emerald-950/60 border-emerald-600/60 text-emerald-200' : 'bg-slate-800 border-slate-700 text-slate-300') : 'bg-slate-800/40 border-slate-800 text-slate-500'}`}>
            <span>- SGK (%14):</span>
            <span className="font-bold">{isSgkWorkerCorrect ? `${correctSgkWorker.toLocaleString('tr-TR')} ₺` : '...'}</span>
          </div>

          <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0" />

          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${activeStep >= 1 ? (isUnemploymentCorrect ? 'bg-emerald-950/60 border-emerald-600/60 text-emerald-200' : 'bg-slate-800 border-slate-700 text-slate-300') : 'bg-slate-800/40 border-slate-800 text-slate-500'}`}>
            <span>- İşsizlik (%1):</span>
            <span className="font-bold">{isUnemploymentCorrect ? `${correctUnemployment.toLocaleString('tr-TR')} ₺` : '...'}</span>
          </div>

          <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0" />

          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${activeStep >= 2 ? (isTaxBaseCorrect ? 'bg-purple-950/60 border-purple-600/60 text-purple-200' : 'bg-slate-800 border-slate-700 text-slate-300') : 'bg-slate-800/40 border-slate-800 text-slate-500'}`}>
            <span>GV Matrahı:</span>
            <span className="font-bold">{isTaxBaseCorrect ? `${correctTaxBase.toLocaleString('tr-TR')} ₺` : '...'}</span>
          </div>

          <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0" />

          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${activeStep >= 2 ? (isIncomeTaxCorrect ? 'bg-emerald-950/60 border-emerald-600/60 text-emerald-200' : 'bg-slate-800 border-slate-700 text-slate-300') : 'bg-slate-800/40 border-slate-800 text-slate-500'}`}>
            <span>- Gelir Vergisi (%15):</span>
            <span className="font-bold">{isIncomeTaxCorrect ? `${correctIncomeTax.toLocaleString('tr-TR')} ₺` : '...'}</span>
          </div>

          <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0" />

          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${activeStep >= 3 ? (isStampTaxCorrect ? 'bg-emerald-950/60 border-emerald-600/60 text-emerald-200' : 'bg-slate-800 border-slate-700 text-slate-300') : 'bg-slate-800/40 border-slate-800 text-slate-500'}`}>
            <span>- Damga (0.00759):</span>
            <span className="font-bold">{isStampTaxCorrect ? `${correctStampTax.toLocaleString('tr-TR')} ₺` : '...'}</span>
          </div>

          <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0" />

          <div className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border font-bold ${activeStep >= 3 && isNetSalaryCorrect ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-600/30' : 'bg-slate-800 border-slate-700 text-slate-300'}`}>
            <span>💰 Net Ücret:</span>
            <span>{activeStep >= 3 && isNetSalaryCorrect ? `${correctNetSalary.toLocaleString('tr-TR')} ₺` : 'Hesaplanıyor...'}</span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT CONTAINER */}
      <main className="max-w-4xl mx-auto px-4 py-6 flex-1 w-full flex flex-col gap-6">
        
        {/* STEP TABS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { step: 1, title: '1. Brüt & SGK', desc: 'Brüt Ücret ve SGK' },
            { step: 2, title: '2. Vergi Matrahı & GV', desc: 'Matrah ve %15 Gelir V.' },
            { step: 3, title: '3. Damga & Net Maaş', desc: 'Damga ve Net Ücret' },
            { step: 4, title: '4. Tam Bordro Özeti', desc: 'Sonuç Karnesi ve İnceleme' },
          ].map((item) => (
            <button
              key={item.step}
              onClick={() => setActiveStep(item.step)}
              className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col gap-1 cursor-pointer ${
                activeStep === item.step
                  ? 'bg-gradient-to-br from-indigo-900/80 to-blue-900/80 border-indigo-500 shadow-lg shadow-indigo-500/20 text-white'
                  : 'bg-slate-800/50 border-slate-700/60 text-slate-300 hover:bg-slate-800/80 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${activeStep === item.step ? 'bg-indigo-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
                  Adım {item.step}
                </span>
                {item.step === 1 && isSgkWorkerCorrect && isUnemploymentCorrect && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                )}
                {item.step === 2 && isTaxBaseCorrect && isIncomeTaxCorrect && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                )}
                {item.step === 3 && isStampTaxCorrect && isNetSalaryCorrect && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                )}
              </div>
              <div className="font-semibold text-sm mt-1">{item.title}</div>
              <div className="text-xs text-slate-400">{item.desc}</div>
            </button>
          ))}
        </div>

        {/* STEP 1 CONTENT */}
        {activeStep === 1 && (
          <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-sm flex flex-col gap-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/60 pb-5">
              <div>
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Adım 1 / 4</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">Brüt Ücret Girişi ve SGK Kesintileri</h2>
                <p className="text-sm text-slate-300 mt-1">
                  Öncelikle hesaplama yapmak istediğiniz brüt ücret tutarını aşağıya girin. Ardından %14 SGK işçi primi ve %1 işsizlik sigortası primini hesaplayın.
                </p>
              </div>
            </div>

            {/* User Gross Salary Input Card */}
            <div className="bg-slate-900/90 border border-indigo-500/40 rounded-xl p-5 shadow-lg">
              <label className="block text-xs font-semibold text-indigo-300 uppercase tracking-wide mb-2">
                Hesaplanacak Brüt Ücret Tutarını Giriniz:
              </label>
              <div className="relative max-w-md">
                <input 
                  type="number" 
                  value={grossSalary} 
                  onChange={(e) => handleGrossChange(Number(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-indigo-500/80 rounded-xl px-4 py-3 text-white font-bold text-xl text-right pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  step="1000"
                  min="17002"
                />
                <span className="absolute right-4 top-3.5 text-indigo-400 font-bold text-lg">₺</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* SGK %14 Box */}
              <div className={`bg-slate-900/80 border rounded-xl p-5 flex flex-col justify-between transition-all ${
                inputs.sgkWorkerInput === '' 
                  ? 'border-slate-700' 
                  : isSgkWorkerCorrect 
                    ? 'border-emerald-500/80 shadow-lg shadow-emerald-500/10 bg-emerald-950/20' 
                    : 'border-rose-500/80 shadow-lg shadow-rose-500/10 bg-rose-950/20'
              }`}>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-indigo-300 font-semibold">%14 SGK İşçi Primi</span>
                    {inputs.sgkWorkerInput !== '' && (
                      isSgkWorkerCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <XCircle className="w-5 h-5 text-rose-400" />
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Brüt Ücret × 0.14</p>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <div className="relative">
                    <input 
                      type="number" 
                      placeholder="Tutar giriniz..."
                      value={inputs.sgkWorkerInput}
                      onChange={(e) => handleInputChange('sgkWorkerInput', e.target.value)}
                      className={`w-full bg-slate-950 border rounded-lg px-3 py-2 text-white font-bold text-right pr-8 focus:outline-none focus:ring-2 ${
                        inputs.sgkWorkerInput === '' 
                          ? 'border-slate-700 focus:ring-indigo-500' 
                          : isSgkWorkerCorrect 
                            ? 'border-emerald-500 focus:ring-emerald-500 text-emerald-300' 
                            : 'border-rose-500 focus:ring-rose-500 text-rose-300'
                      }`}
                    />
                    <span className="absolute right-3 top-2.5 text-slate-400 text-sm">₺</span>
                  </div>
                  {inputs.sgkWorkerInput !== '' && !isSgkWorkerCorrect && (
                    <span className="text-xs text-rose-400 font-medium flex items-center gap-1">
                      <Info className="w-3 h-3" /> Hatalı hesaplama! İpucu: Brüt tutarın %14'ünü hesaplayın.
                    </span>
                  )}
                  {isSgkWorkerCorrect && (
                    <span className="text-xs text-emerald-400 font-medium">Mükemmel! Doğru hesapladınız.</span>
                  )}
                </div>
              </div>

              {/* İşsizlik %1 Box */}
              <div className={`bg-slate-900/80 border rounded-xl p-5 flex flex-col justify-between transition-all ${
                inputs.unemploymentInput === '' 
                  ? 'border-slate-700' 
                  : isUnemploymentCorrect 
                    ? 'border-emerald-500/80 shadow-lg shadow-emerald-500/10 bg-emerald-950/20' 
                    : 'border-rose-500/80 shadow-lg shadow-rose-500/10 bg-rose-950/20'
              }`}>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-indigo-300 font-semibold">%1 İşsizlik Sigortası</span>
                    {inputs.unemploymentInput !== '' && (
                      isUnemploymentCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <XCircle className="w-5 h-5 text-rose-400" />
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Brüt Ücret × 0.01</p>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <div className="relative">
                    <input 
                      type="number" 
                      placeholder="Tutar giriniz..."
                      value={inputs.unemploymentInput}
                      onChange={(e) => handleInputChange('unemploymentInput', e.target.value)}
                      className={`w-full bg-slate-950 border rounded-lg px-3 py-2 text-white font-bold text-right pr-8 focus:outline-none focus:ring-2 ${
                        inputs.unemploymentInput === '' 
                          ? 'border-slate-700 focus:ring-indigo-500' 
                          : isUnemploymentCorrect 
                            ? 'border-emerald-500 focus:ring-emerald-500 text-emerald-300' 
                            : 'border-rose-500 focus:ring-rose-500 text-rose-300'
                      }`}
                    />
                    <span className="absolute right-3 top-2.5 text-slate-400 text-sm">₺</span>
                  </div>
                  {inputs.unemploymentInput !== '' && !isUnemploymentCorrect && (
                    <span className="text-xs text-rose-400 font-medium flex items-center gap-1">
                      <Info className="w-3 h-3" /> Hatalı hesaplama! İpucu: Brüt tutarın %1'ini hesaplayın.
                    </span>
                  )}
                  {isUnemploymentCorrect && (
                    <span className="text-xs text-emerald-400 font-medium">Harika! Doğru hesapladınız.</span>
                  )}
                </div>
              </div>
            </div>

            {/* Gelir Vergisi Matrahı Preview at the end of Step 1 (appears only when both inputs are correct) */}
            {isSgkWorkerCorrect && isUnemploymentCorrect && (
              <div className="bg-emerald-950/40 border border-emerald-500 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-emerald-500/10 animate-fadeIn">
                <div>
                  <span className="text-xs text-emerald-300 font-bold uppercase tracking-wider">1. Adım Başarılı! 🎉</span>
                  <h4 className="font-bold text-white text-base">Gelir Vergisi Matrahı (Brüt - SGK - İşsizlik)</h4>
                  <p className="text-xs text-slate-300">İki kesintiyi de doğru girdiniz. Bulunan Gelir Vergisi Matrahı:</p>
                </div>
                <div className="bg-emerald-900 border border-emerald-400 px-5 py-3 rounded-xl text-right">
                  <div className="text-xs text-emerald-200 font-semibold">Gelir Vergisi Matrahı</div>
                  <div className="text-2xl font-bold text-white">{correctTaxBase.toLocaleString('tr-TR')} ₺</div>
                </div>
              </div>
            )}

            {/* Step 1 Footer Action */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-700/60">
              <div className="text-xs text-slate-400">
                {isSgkWorkerCorrect && isUnemploymentCorrect ? (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> 1. Adım başarıyla tamamlandı! 2. adıma geçebilirsiniz.
                  </span>
                ) : (
                  <span>Devam etmek için kutucukları doğru değerlerle doldurunuz.</span>
                )}
              </div>
              <button
                disabled={!isSgkWorkerCorrect || !isUnemploymentCorrect}
                onClick={() => setActiveStep(2)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                  isSgkWorkerCorrect && isUnemploymentCorrect
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-indigo-600/30 hover:from-blue-500 hover:to-indigo-500'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                }`}
              >
                <span>İkinci Adıma Geç</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 CONTENT */}
        {activeStep === 2 && (
          <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-sm flex flex-col gap-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/60 pb-5">
              <div>
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Adım 2 / 4</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">Gelir Vergisi Matrahı ve %15 Gelir Vergisi Kesintisi</h2>
                <p className="text-sm text-slate-300 mt-1">
                  Brüt ücretten SGK işçi payı ve işsizlik sigortası çıkarılarak <b>Gelir Vergisi Matrahı</b> bulunur. Bu matrah üzerinden %15 gelir vergisi kesilir.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Gelir Vergisi Matrahı Box */}
              <div className={`bg-slate-900/80 border rounded-xl p-5 flex flex-col justify-between transition-all ${
                inputs.taxBaseInput === '' 
                  ? 'border-slate-700' 
                  : isTaxBaseCorrect 
                    ? 'border-emerald-500/80 shadow-lg shadow-emerald-500/10 bg-emerald-950/20' 
                    : 'border-rose-500/80 shadow-lg shadow-rose-500/10 bg-rose-950/20'
              }`}>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-indigo-300 font-semibold">Gelir Vergisi Matrahı</span>
                    {inputs.taxBaseInput !== '' && (
                      isTaxBaseCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <XCircle className="w-5 h-5 text-rose-400" />
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Brüt ({grossSalary} ₺) - SGK - İşsizlik</p>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <div className="relative">
                    <input 
                      type="number" 
                      placeholder="Tutar giriniz..."
                      value={inputs.taxBaseInput}
                      onChange={(e) => handleInputChange('taxBaseInput', e.target.value)}
                      className={`w-full bg-slate-950 border rounded-lg px-3 py-2 text-white font-bold text-right pr-8 focus:outline-none focus:ring-2 ${
                        inputs.taxBaseInput === '' 
                          ? 'border-slate-700 focus:ring-indigo-500' 
                          : isTaxBaseCorrect 
                            ? 'border-emerald-500 focus:ring-emerald-500 text-emerald-300' 
                            : 'border-rose-500 focus:ring-rose-500 text-rose-300'
                      }`}
                    />
                    <span className="absolute right-3 top-2.5 text-slate-400 text-sm">₺</span>
                  </div>
                  {inputs.taxBaseInput !== '' && !isTaxBaseCorrect && (
                    <span className="text-xs text-rose-400 font-medium flex items-center gap-1">
                      <Info className="w-3 h-3" /> Hatalı! İpucu: Brüt ücretten SGK ve İşsizlik primlerini düşün.
                    </span>
                  )}
                  {isTaxBaseCorrect && (
                    <span className="text-xs text-emerald-400 font-medium">Tebrikler, matrahı doğru hesapladınız!</span>
                  )}
                </div>
              </div>

              {/* Gelir Vergisi %15 Box */}
              <div className={`bg-slate-900/80 border rounded-xl p-5 flex flex-col justify-between transition-all ${
                inputs.incomeTaxInput === '' 
                  ? 'border-slate-700' 
                  : isIncomeTaxCorrect 
                    ? 'border-emerald-500/80 shadow-lg shadow-emerald-500/10 bg-emerald-950/20' 
                    : 'border-rose-500/80 shadow-lg shadow-rose-500/10 bg-rose-950/20'
              }`}>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-indigo-300 font-semibold">%15 Gelir Vergisi Kesintisi</span>
                    {inputs.incomeTaxInput !== '' && (
                      isIncomeTaxCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <XCircle className="w-5 h-5 text-rose-400" />
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Gelir Vergisi Matrahı × 0.15</p>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <div className="relative">
                    <input 
                      type="number" 
                      placeholder="Tutar giriniz..."
                      value={inputs.incomeTaxInput}
                      onChange={(e) => handleInputChange('incomeTaxInput', e.target.value)}
                      className={`w-full bg-slate-950 border rounded-lg px-3 py-2 text-white font-bold text-right pr-8 focus:outline-none focus:ring-2 ${
                        inputs.incomeTaxInput === '' 
                          ? 'border-slate-700 focus:ring-indigo-500' 
                          : isIncomeTaxCorrect 
                            ? 'border-emerald-500 focus:ring-emerald-500 text-emerald-300' 
                            : 'border-rose-500 focus:ring-rose-500 text-rose-300'
                      }`}
                    />
                    <span className="absolute right-3 top-2.5 text-slate-400 text-sm">₺</span>
                  </div>
                  {inputs.incomeTaxInput !== '' && !isIncomeTaxCorrect && (
                    <span className="text-xs text-rose-400 font-medium flex items-center gap-1">
                      <Info className="w-3 h-3" /> Hatalı! İpucu: GV Matrahının %15'ini hesaplayın.
                    </span>
                  )}
                  {isIncomeTaxCorrect && (
                    <span className="text-xs text-emerald-400 font-medium">Harika! Gelir vergisi doğru.</span>
                  )}
                </div>
              </div>
            </div>

            {/* Step 2 Footer Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-700/60">
              <button
                onClick={() => setActiveStep(1)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-slate-700 hover:bg-slate-600 text-slate-200 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Geri</span>
              </button>

              <button
                disabled={!isTaxBaseCorrect || !isIncomeTaxCorrect}
                onClick={() => setActiveStep(3)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                  isTaxBaseCorrect && isIncomeTaxCorrect
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-indigo-600/30 hover:from-blue-500 hover:to-indigo-500'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                }`}
              >
                <span>Üçüncü Adıma Geç</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 CONTENT */}
        {activeStep === 3 && (
          <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-sm flex flex-col gap-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/60 pb-5">
              <div>
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Adım 3 / 4</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">Damga Vergisi ve Net Ücretin Bulunması</h2>
                <p className="text-sm text-slate-300 mt-1">
                  Son aşamada brüt ücret üzerinden 0.00759 oranında <b>Damga Vergisi</b> kesilir. Brütten tüm kesintiler çıkarılarak <b>Net Maaş</b> elde edilir.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Damga Vergisi Box */}
              <div className={`bg-slate-900/80 border rounded-xl p-5 flex flex-col justify-between transition-all ${
                inputs.stampTaxInput === '' 
                  ? 'border-slate-700' 
                  : isStampTaxCorrect 
                    ? 'border-emerald-500/80 shadow-lg shadow-emerald-500/10 bg-emerald-950/20' 
                    : 'border-rose-500/80 shadow-lg shadow-rose-500/10 bg-rose-950/20'
              }`}>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-indigo-300 font-semibold">Damga Vergisi (0.00759)</span>
                    {inputs.stampTaxInput !== '' && (
                      isStampTaxCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <XCircle className="w-5 h-5 text-rose-400" />
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Brüt Ücret × 0.00759</p>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <div className="relative">
                    <input 
                      type="number" 
                      placeholder="Tutar giriniz..."
                      value={inputs.stampTaxInput}
                      onChange={(e) => handleInputChange('stampTaxInput', e.target.value)}
                      className={`w-full bg-slate-950 border rounded-lg px-3 py-2 text-white font-bold text-right pr-8 focus:outline-none focus:ring-2 ${
                        inputs.stampTaxInput === '' 
                          ? 'border-slate-700 focus:ring-indigo-500' 
                          : isStampTaxCorrect 
                            ? 'border-emerald-500 focus:ring-emerald-500 text-emerald-300' 
                            : 'border-rose-500 focus:ring-rose-500 text-rose-300'
                      }`}
                      step="0.01"
                    />
                    <span className="absolute right-3 top-2.5 text-slate-400 text-sm">₺</span>
                  </div>
                  {inputs.stampTaxInput !== '' && !isStampTaxCorrect && (
                    <span className="text-xs text-rose-400 font-medium flex items-center gap-1">
                      <Info className="w-3 h-3" /> Hatalı! İpucu: Brüt ücreti 0.00759 ile çarpın.
                    </span>
                  )}
                  {isStampTaxCorrect && (
                    <span className="text-xs text-emerald-400 font-medium">Damga vergisi hesaplaması doğru!</span>
                  )}
                </div>
              </div>

              {/* Net Ücret Box */}
              <div className={`bg-slate-900/80 border rounded-xl p-5 flex flex-col justify-between transition-all ${
                inputs.netSalaryInput === '' 
                  ? 'border-slate-700' 
                  : isNetSalaryCorrect 
                    ? 'border-emerald-500/80 shadow-lg shadow-emerald-500/10 bg-emerald-950/20' 
                    : 'border-rose-500/80 shadow-lg shadow-rose-500/10 bg-rose-950/20'
              }`}>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-emerald-400 font-bold uppercase tracking-wide">Nihai Net Ücret</span>
                    {inputs.netSalaryInput !== '' && (
                      isNetSalaryCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <XCircle className="w-5 h-5 text-rose-400" />
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Brüt - SGK - İşsizlik - Gelir V. - Damga V.</p>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <div className="relative">
                    <input 
                      type="number" 
                      placeholder="Tutar giriniz..."
                      value={inputs.netSalaryInput}
                      onChange={(e) => handleInputChange('netSalaryInput', e.target.value)}
                      className={`w-full bg-slate-950 border rounded-lg px-3 py-2 text-white font-bold text-right pr-8 focus:outline-none focus:ring-2 ${
                        inputs.netSalaryInput === '' 
                          ? 'border-slate-700 focus:ring-indigo-500' 
                          : isNetSalaryCorrect 
                            ? 'border-emerald-500 focus:ring-emerald-500 text-emerald-300' 
                            : 'border-rose-500 focus:ring-rose-500 text-rose-300'
                      }`}
                      step="0.01"
                    />
                    <span className="absolute right-3 top-2.5 text-slate-400 text-sm">₺</span>
                  </div>
                  {inputs.netSalaryInput !== '' && !isNetSalaryCorrect && (
                    <span className="text-xs text-rose-400 font-medium flex items-center gap-1">
                      <Info className="w-3 h-3" /> Hatalı! İpucu: Brütten tüm kesintileri çıkararak neti bulunuz.
                    </span>
                  )}
                  {isNetSalaryCorrect && (
                    <span className="text-xs text-emerald-400 font-medium">Tebrikler! Net maaşı başarıyla buldunuz. 🎉</span>
                  )}
                </div>
              </div>
            </div>

            {/* Step 3 Footer Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-700/60">
              <button
                onClick={() => setActiveStep(2)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-slate-700 hover:bg-slate-600 text-slate-200 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Geri</span>
              </button>

              <button
                disabled={!isStampTaxCorrect || !isNetSalaryCorrect}
                onClick={() => setActiveStep(4)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                  isStampTaxCorrect && isNetSalaryCorrect
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30 hover:from-emerald-500 hover:to-teal-500'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                }`}
              >
                <span>Sonuç Karnesini Gör</span>
                <Award className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 CONTENT: SUMMARY & REPORT CARD */}
        {activeStep === 4 && (
          <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-sm flex flex-col gap-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/60 pb-5">
              <div>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Adım 4 / 4 • Tamamlandı</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">Bordro Hesaplama Karnesi ve Özeti</h2>
                <p className="text-sm text-slate-300 mt-1">
                  Harika bir iş çıkardınız! Kendi girdiğiniz brüt ücrete göre adım adım gerçekleştirdiğiniz hesaplamanın resmi bordro tablosu aşağıdadır.
                </p>
              </div>
              <div className="bg-emerald-950/80 border border-emerald-600/60 px-4 py-2 rounded-xl flex items-center gap-3">
                <Award className="w-8 h-8 text-emerald-400" />
                <div>
                  <div className="text-xs text-emerald-300 font-medium">Eğitim Durumu</div>
                  <div className="text-sm font-bold text-white">Başarıyla Tamamlandı 🎓</div>
                </div>
              </div>
            </div>

            {/* Official Payroll Style Breakdown Table */}
            <div className="bg-slate-900/90 border border-slate-700 rounded-xl overflow-hidden shadow-md">
              <div className="bg-slate-800/80 px-5 py-3 border-b border-slate-700 flex justify-between items-center">
                <span className="font-bold text-sm text-indigo-300 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Personel Bordro Döküm Tablosu
                </span>
                <span className="text-xs bg-indigo-950 text-indigo-300 border border-indigo-700/60 px-2.5 py-1 rounded-md">
                  Brüt: {grossSalary.toLocaleString('tr-TR')} ₺
                </span>
              </div>

              <div className="divide-y divide-slate-800 text-sm">
                <div className="px-5 py-3 flex justify-between items-center bg-blue-950/20">
                  <span className="font-semibold text-slate-200">1. Brüt Ücret</span>
                  <span className="font-bold text-white">{grossSalary.toLocaleString('tr-TR')} ₺</span>
                </div>
                <div className="px-5 py-3 flex justify-between items-center text-slate-300">
                  <span>(-) SGK İşçi Primi (%14)</span>
                  <span className="text-rose-400 font-semibold">-{correctSgkWorker.toLocaleString('tr-TR')} ₺</span>
                </div>
                <div className="px-5 py-3 flex justify-between items-center text-slate-300">
                  <span>(-) İşsizlik Sigortası İşçi Payı (%1)</span>
                  <span className="text-rose-400 font-semibold">-{correctUnemployment.toLocaleString('tr-TR')} ₺</span>
                </div>
                <div className="px-5 py-3 flex justify-between items-center bg-purple-950/20 font-medium text-purple-200">
                  <span>(=) Gelir Vergisi Matrahı</span>
                  <span className="font-bold">{correctTaxBase.toLocaleString('tr-TR')} ₺</span>
                </div>
                <div className="px-5 py-3 flex justify-between items-center text-slate-300">
                  <span>(-) Gelir Vergisi Kesintisi (%15)</span>
                  <span className="text-rose-400 font-semibold">-{correctIncomeTax.toLocaleString('tr-TR')} ₺</span>
                </div>
                <div className="px-5 py-3 flex justify-between items-center text-slate-300">
                  <span>(-) Damga Vergisi Kesintisi (0.00759)</span>
                  <span className="text-rose-400 font-semibold">-{correctStampTax.toLocaleString('tr-TR')} ₺</span>
                </div>
                <div className="px-5 py-4 flex justify-between items-center bg-emerald-950/40 border-t border-emerald-700/40 text-base font-bold text-emerald-300">
                  <span className="flex items-center gap-2">💰 Nihai Net Ödeme (Net Maaş)</span>
                  <span className="text-xl text-white">{correctNetSalary.toLocaleString('tr-TR')} ₺</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-700/60">
              <button
                onClick={() => setActiveStep(3)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm bg-slate-700 hover:bg-slate-600 text-slate-200 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Geri</span>
              </button>

              <button
                onClick={() => {
                  setInputs({
                    grossSalary: 30000,
                    sgkWorkerInput: '',
                    unemploymentInput: '',
                    taxBaseInput: '',
                    incomeTaxInput: '',
                    stampTaxInput: '',
                    netSalaryInput: '',
                  });
                  setActiveStep(1);
                }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Yeni Hesaplama Yap</span>
              </button>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 bg-slate-900/60 py-4 px-4 text-center text-xs text-slate-500">
        <p>Brütten Nete Maaş Hesaplama Eğitimi • İnteraktif Bordro Simülatörü © 2026</p>
      </footer>
    </div>
  );
}
