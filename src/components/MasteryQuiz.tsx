import { useState } from 'react';
import { Award, CheckCircle2, XCircle, RefreshCw, HelpCircle, ArrowRight, X } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/weldingData';

interface MasteryQuizProps {
  onClose?: () => void;
}

export default function MasteryQuiz({ onClose }: MasteryQuizProps) {
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const question = QUIZ_QUESTIONS[currentQIndex];
  const selectedOption = selectedAnswers[question.id];
  const isAnswered = selectedOption !== undefined;

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [question.id]: idx
    }));
  };

  const handleNext = () => {
    if (currentQIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentQIndex(0);
    setShowResults(false);
  };

  // Compute total score
  const correctCount = QUIZ_QUESTIONS.reduce((acc, q) => {
    return selectedAnswers[q.id] === q.correctIndex ? acc + 1 : acc;
  }, 0);
  const scorePercent = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-6 space-y-5 sm:space-y-6 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 sm:pb-4 gap-2">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold border border-amber-500/20 shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm sm:text-base font-bold text-white truncate">
              SMAW Mastery Assessment
            </h3>
            <p className="text-[10px] sm:text-xs text-slate-400 truncate">
              10-question compliance test covering all 9 clauses (7.1.1–7.1.9)
            </p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close quiz"
            className="min-h-[44px] min-w-[44px] p-2 rounded-xl bg-slate-950 hover:bg-slate-800 active:bg-slate-750 border border-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer flex items-center justify-center shrink-0 active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {!showResults ? (
        <div className="space-y-4 sm:space-y-5">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono">
              Question {currentQIndex + 1} of {QUIZ_QUESTIONS.length}
            </span>
            <span className="px-2 py-0.5 rounded-lg bg-slate-800 font-mono text-amber-400 font-bold border border-slate-700">
              Clause {question.sectionCode}
            </span>
          </div>

          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-amber-500 h-full transition-all duration-300"
              style={{ width: `${((currentQIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
              {question.question}
            </h4>
            <div className="mt-2 text-[10px] sm:text-[11px] text-slate-500 font-mono">
              Benchmark: {question.standardReference}
            </div>
          </div>

          {/* Options */}
          <div className="space-y-2 sm:space-y-2.5">
            {question.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = question.correctIndex === idx;

              let optionStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 active:bg-slate-900';
              if (isAnswered) {
                if (isCorrect) {
                  optionStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-semibold';
                } else if (isSelected) {
                  optionStyle = 'bg-red-950/40 border-red-500 text-red-200 font-medium';
                } else {
                  optionStyle = 'bg-slate-950/50 border-slate-850 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full min-h-[48px] text-left p-3.5 rounded-xl border transition-all text-xs flex items-start gap-3 cursor-pointer active:scale-[0.99] ${optionStyle}`}
                >
                  <span className="w-5 h-5 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center font-mono font-bold text-[11px] shrink-0 mt-0.5 border border-slate-700">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-relaxed flex-1">{option}</span>
                  {isAnswered && isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box after Selection */}
          {isAnswered && (
            <div className={`p-4 rounded-xl border text-xs space-y-1.5 ${
              selectedOption === question.correctIndex
                ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                : 'bg-amber-950/20 border-amber-500/40 text-amber-300'
            }`}>
              <div className="font-bold flex items-center gap-1.5">
                {selectedOption === question.correctIndex ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Correct Explanation:
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-red-400" />
                    Technical Analysis:
                  </>
                )}
              </div>
              <p className="text-slate-300 leading-relaxed">
                {question.explanation}
              </p>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:bg-amber-450 text-slate-950 font-black text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95"
              >
                <span>{currentQIndex < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'View Full Results'}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results View */
        <div className="space-y-6 text-center py-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/30">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <h4 className="text-xl font-bold text-white">Assessment Complete!</h4>
            <p className="text-xs text-slate-400 mt-1">
              Standard Operating Procedure Knowledge Evaluation Result
            </p>
          </div>

          <div className="inline-block bg-slate-950 px-6 py-4 rounded-2xl border border-slate-800">
            <div className="text-3xl font-bold font-mono text-amber-400">
              {scorePercent}%
            </div>
            <div className="text-xs text-slate-300 mt-1">
              {correctCount} of {QUIZ_QUESTIONS.length} Questions Correct
            </div>
          </div>

          <div className="max-w-md mx-auto text-xs text-slate-300 px-2">
            {scorePercent >= 80 ? (
              <p className="text-emerald-400 font-semibold">
                Outstanding! You demonstrate certified mastery of SMAW operating principles, equipment architecture, polarity laws, and joint design.
              </p>
            ) : (
              <p className="text-amber-400">
                Passing standard is 80%. Review the procedural clauses (7.1.1 to 7.1.9) and retake the evaluation.
              </p>
            )}
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={handleReset}
              className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-650 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer border border-slate-700 active:scale-95 shadow-sm"
            >
              <RefreshCw className="w-4 h-4 shrink-0" />
              <span>Retake Assessment</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
