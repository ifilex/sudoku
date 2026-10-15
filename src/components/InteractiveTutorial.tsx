import React, { useState } from 'react';
import {
  Brain,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  Edit3,
  Play,
} from 'lucide-react';
import { LanguageCode } from '../types';
import { translations } from '../i18n/translations';

interface InteractiveTutorialProps {
  language: LanguageCode;
  onStartPlay: () => void;
}

export const InteractiveTutorial: React.FC<InteractiveTutorialProps> = ({
  language,
  onStartPlay,
}) => {
  const t = translations[language] || translations.es;
  const [currentStep, setCurrentStep] = useState(0);

  // Interactive Mini Sudoku Grid for Practice
  const [practiceGrid, setPracticeGrid] = useState<number[][]>([
    [1, 2, 3, 4, 5, 6, 7, 8, 0], // missing 9 at (0,8)
    [4, 5, 6, 7, 8, 9, 1, 2, 3],
    [7, 8, 9, 1, 2, 3, 4, 5, 6],
    [2, 3, 4, 5, 6, 7, 8, 9, 1],
    [5, 6, 7, 8, 9, 1, 2, 3, 4],
    [8, 9, 1, 2, 3, 4, 5, 6, 7],
    [3, 4, 5, 6, 7, 8, 9, 1, 2],
    [6, 7, 8, 9, 1, 2, 3, 4, 5],
    [9, 1, 2, 3, 4, 5, 6, 7, 8],
  ]);

  const [selectedPracticeCell, setSelectedPracticeCell] = useState<{ r: number; c: number } | null>({ r: 0, c: 8 });
  const [practiceSolved, setPracticeSolved] = useState(false);

  const handlePracticeInput = (num: number) => {
    if (!selectedPracticeCell) return;
    const { r, c } = selectedPracticeCell;
    const newG = practiceGrid.map((row) => [...row]);
    newG[r][c] = num;
    setPracticeGrid(newG);

    if (r === 0 && c === 8 && num === 9) {
      setPracticeSolved(true);
    }
  };

  const steps = [
    {
      title: t.step1Title,
      desc: t.step1Desc,
      icon: <Brain className="w-6 h-6 text-indigo-400" />,
      detail: "Cada fila contiene exactamente 9 casillas. Los números del 1 al 9 deben ubicarse de modo que ninguno se repita dentro de la misma línea horizontal.",
    },
    {
      title: t.step2Title,
      desc: t.step2Desc,
      icon: <HelpCircle className="w-6 h-6 text-cyan-400" />,
      detail: "Igualmente, las 9 columnas verticales y las 9 cuadrículas principales de 3x3 deben completarse con los dígitos 1-9 sin duplicados.",
    },
    {
      title: t.step3Title,
      desc: t.step3Desc,
      icon: <Lightbulb className="w-6 h-6 text-amber-400" />,
      detail: "Escaneo visual cruzado: Cuando observas una fila que ya tiene 8 números colocados, la novena casilla obligatoriamente tiene un único valor posible.",
    },
    {
      title: t.step4Title,
      desc: t.step4Desc,
      icon: <Edit3 className="w-6 h-6 text-emerald-400" />,
      detail: "El modo lápiz permite anotar números candidatos. Esto reduce el estrés en tu memoria de trabajo y ejercita la estructuración lógica.",
    },
    {
      title: t.step5Title,
      desc: t.step5Desc,
      icon: <CheckCircle2 className="w-6 h-6 text-indigo-300" />,
      detail: "El sistema de pistas te ayuda explicándote la razón matemática detrás de cada paso, guiando tu razonamiento deductivo de forma interactiva.",
    },
  ];

  return (
    <div id="interactive-tutorial-view" className="w-full max-w-4xl mx-auto p-4 flex flex-col gap-6 text-slate-100">
      {/* Title */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center">
            <HelpCircle className="w-7 h-7 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{t.tutorialTitle}</h2>
            <p className="text-xs text-slate-400">{t.tutorialSubtitle}</p>
          </div>
        </div>

        <button
          onClick={onStartPlay}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 flex items-center gap-2 cursor-pointer transition-all"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>{t.finishTutorial}</span>
        </button>
      </div>

      {/* Step Card & Stepper */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-6">
        {/* Progress Bar Header */}
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 border-b border-slate-800 pb-3">
          <span>Paso {currentStep + 1} de {steps.length}</span>
          <div className="flex gap-1.5">
            {steps.map((_, idx) => (
              <div
                key={`step-dot-${idx}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentStep
                    ? 'w-6 bg-indigo-500'
                    : idx < currentStep
                    ? 'w-2 bg-indigo-800'
                    : 'w-2 bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step Explanation */}
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center flex-shrink-0">
            {steps[currentStep].icon}
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold text-slate-100">{steps[currentStep].title}</h3>
            <p className="text-sm font-semibold text-indigo-300">{steps[currentStep].desc}</p>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 mt-1">
              {steps[currentStep].detail}
            </p>
          </div>
        </div>

        {/* Interactive Practice Grid for Step 3 */}
        {currentStep === 2 && (
          <div className="mt-2 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center gap-3">
            <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4" />
              <span>{t.tryInteractive} ¿Qué número falta en la esquina superior derecha (Fila 1, Columna 9)?</span>
            </span>

            {/* Mini Row Preview */}
            <div className="flex gap-1 bg-slate-900 p-2 rounded-lg border border-slate-800">
              {practiceGrid[0].map((val, idx) => (
                <div
                  key={`prac-${idx}`}
                  onClick={() => setSelectedPracticeCell({ r: 0, c: idx })}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-sm font-bold border transition-all cursor-pointer ${
                    idx === 8
                      ? practiceSolved
                        ? 'bg-emerald-600 text-white border-emerald-400 font-black'
                        : 'bg-indigo-600/40 text-amber-300 border-amber-400/80 animate-pulse'
                      : 'bg-slate-800 text-slate-200 border-slate-700'
                  }`}
                >
                  {val !== 0 ? val : '?'}
                </div>
              ))}
            </div>

            {/* Touch Number Buttons for Practice */}
            {!practiceSolved ? (
              <div className="flex gap-1.5 mt-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={`prac-btn-${num}`}
                    onClick={() => handlePracticeInput(num)}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-indigo-600 text-white font-bold text-xs border border-slate-700 transition-colors"
                  >
                    {num}
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-800 px-3 py-1.5 rounded-lg">
                <CheckCircle2 className="w-4 h-4" />
                <span>¡Correcto! Faltaba el número 9. Has completado tu primer escaneo visual.</span>
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              currentStep === 0
                ? 'opacity-40 cursor-not-allowed bg-slate-950 text-slate-600'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{t.prevStep}</span>
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              onClick={() => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold cursor-pointer transition-all shadow-md shadow-indigo-600/30"
            >
              <span>{t.nextStep}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onStartPlay}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold cursor-pointer transition-all shadow-lg shadow-emerald-600/30"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{t.finishTutorial}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
