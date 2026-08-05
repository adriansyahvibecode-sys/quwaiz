import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Question, QuizResult, QuizSettings, UserAnswer } from './types';
import { MASCOTS } from './data/mascots';
import { fetchQuestions, saveQuestions, resetQuestionsToDefault, loadLocalSettings, saveLocalSettings, saveQuizResult, loadQuizHistory } from './utils/storage';
import { soundFx } from './utils/sound';

import { Header } from './components/Header';
import { MascotWidget } from './components/MascotWidget';
import { StartScreen } from './components/StartScreen';
import { QuestionCard } from './components/QuestionCard';
import { VirtualKeypad } from './components/VirtualKeypad';
import { ResultScreen } from './components/ResultScreen';
import { CertificateModal } from './components/CertificateModal';
import { AdminModal } from './components/AdminModal';

export default function App() {
  const [screen, setScreen] = useState<'splash' | 'start' | 'countdown' | 'quiz' | 'feedback' | 'result'>('splash');
  const [countdownVal, setCountdownVal] = useState<number>(3);
  const [questionsBank, setQuestionsBank] = useState<Question[]>([]);
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [settings, setSettings] = useState<QuizSettings>(loadLocalSettings());

  // Feedback popup state
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    userAnswer: number | null;
    correctAnswer: number;
    message: string;
  } | null>(null);

  // Result state
  const [activeResult, setActiveResult] = useState<QuizResult | null>(null);

  // Modals state
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isCertOpen, setIsCertOpen] = useState<boolean>(false);

  // Splash Screen 2-Second Timeout Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen('start');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Countdown Screen (3-2-1) Effect
  useEffect(() => {
    if (screen !== 'countdown') return;

    if (countdownVal > 0) {
      soundFx.playTick();
      soundFx.speakText(countdownVal.toString());

      const timer = setTimeout(() => {
        setCountdownVal((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      soundFx.speakText("Mulai!");
      soundFx.playClick();
      setScreen('quiz');
    }
  }, [screen, countdownVal]);

  // Initial load
  useEffect(() => {
    fetchQuestions().then((qs) => {
      setQuestionsBank(qs);
    });
  }, []);

  // Update soundFx flags when settings change
  useEffect(() => {
    soundFx.enabled = settings.soundEnabled;
    soundFx.speechEnabled = settings.speechEnabled;
    saveLocalSettings(settings);
  }, [settings]);

  // Current selected mascot
  const mascot = useMemo(() => {
    return MASCOTS.find((m) => m.id === settings.selectedMascotId) || MASCOTS[0];
  }, [settings.selectedMascotId]);

  // High score calculation
  const highScore = useMemo(() => {
    const history = loadQuizHistory();
    if (history.length === 0) return 0;
    return Math.max(...history.map((h) => h.score));
  }, [activeResult]);

  // Handle start quiz session
  const handleStartQuiz = () => {
    // Filter by category if not 'campuran'
    let filtered = [...questionsBank];
    if (settings.selectedCategory !== 'campuran') {
      filtered = filtered.filter((q) => q.category === settings.selectedCategory);
    }
    // Fallback if filtered is empty
    if (filtered.length === 0) {
      filtered = [...questionsBank];
    }

    // Shuffle and pick
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, settings.selectedQuestionCount);

    setActiveQuestions(selected);
    setCurrentIndex(0);
    setUserAnswers([]);
    setFeedback(null);
    setCountdownVal(3);
    setScreen('countdown');
  };

  // Handle answer submission
  const handleAnswerQuestion = (answerNum: number | null) => {
    if (screen !== 'quiz') return;

    const currentQuestion = activeQuestions[currentIndex];
    const isCorrect = answerNum !== null && answerNum === currentQuestion.correctAnswer;

    // Record user answer
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      question: currentQuestion,
      userAnswer: answerNum,
      isCorrect,
      timeSpentSeconds: 15 - 5, // approx
    };

    const updatedAnswers = [...userAnswers, newAnswer];
    setUserAnswers(updatedAnswers);

    // Pick mascot reaction text
    let rxText = '';
    if (isCorrect) {
      soundFx.playCorrect();
      rxText = mascot.correctReactions[Math.floor(Math.random() * mascot.correctReactions.length)];
      soundFx.speakText(rxText);
    } else {
      soundFx.playWrong();
      rxText = mascot.wrongReactions[Math.floor(Math.random() * mascot.wrongReactions.length)];
      soundFx.speakText(rxText);
    }

    setFeedback({
      isCorrect,
      userAnswer: answerNum,
      correctAnswer: currentQuestion.correctAnswer,
      message: rxText,
    });
    setScreen('feedback');

    // Auto advance after 1.8 seconds
    setTimeout(() => {
      const nextIdx = currentIndex + 1;
      if (nextIdx < activeQuestions.length) {
        setCurrentIndex(nextIdx);
        setFeedback(null);
        setScreen('quiz');
      } else {
        // Quiz Finished!
        finishQuizSession(updatedAnswers);
      }
    }, 1800);
  };

  // Finish session and compute results
  const finishQuizSession = (answersList: UserAnswer[]) => {
    const total = answersList.length;
    const correctCount = answersList.filter((a) => a.isCorrect).length;
    const wrongCount = total - correctCount;
    const score = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    let stars = 1;
    if (score >= 90) stars = 3;
    else if (score >= 60) stars = 2;

    const result: QuizResult = {
      score,
      totalQuestions: total,
      correctCount,
      wrongCount,
      stars,
      timeSpentSeconds: 100,
      answers: answersList,
      completedAt: new Date().toISOString(),
      mascotName: mascot.name,
      mascotEmoji: mascot.emoji,
      playerName: settings.playerName?.trim() || 'Anak Pintar',
    };

    saveQuizResult(result);
    setActiveResult(result);
    setFeedback(null);
    setScreen('result');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-200 via-orange-100 to-amber-300 text-slate-800 flex flex-col font-sans selection:bg-amber-400 select-none pb-2 sm:pb-3">
      {/* App Header (Hidden during Splash Screen) */}
      {screen !== 'splash' && (
        <Header
          mascot={mascot}
          soundEnabled={settings.soundEnabled}
          speechEnabled={settings.speechEnabled}
          onToggleSound={() => setSettings((s) => ({ ...s, soundEnabled: !s.soundEnabled }))}
          onToggleSpeech={() => setSettings((s) => ({ ...s, speechEnabled: !s.speechEnabled }))}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />
      )}

      {/* Main Content Body */}
      <main className="flex-1 flex flex-col justify-center px-1.5 sm:px-3 max-w-5xl w-full mx-auto">
        <AnimatePresence mode="wait">
          {/* SCREEN 0: SPLASH SCREEN */}
          {screen === 'splash' && (
            <motion.div
              key="splash"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ type: 'spring', duration: 0.6 }}
              className="flex flex-col items-center justify-center text-center p-4 my-auto space-y-6 select-none"
            >
              {/* Animated Game Console Icon */}
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2, 
                  ease: "easeInOut" 
                }}
                className="text-8xl sm:text-9xl drop-shadow-xl"
              >
                🎮
              </motion.div>

              {/* Main Welcome Badge */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#2D3436] tracking-wider leading-tight max-w-2xl bg-[#FFE66D] border-4 border-[#2D3436] px-8 py-6 rounded-[32px] shadow-[8px_8px_0_0_#2D3436] uppercase">
                SELAMAT DATANG DI QUAIZ
                <span className="text-[#FF7675] text-2xl sm:text-3xl font-black block mt-3">— QUIZ DARI UWAIZ —</span>
              </h1>
            </motion.div>
          )}

          {/* SCREEN: COUNTDOWN SCREEN */}
          {screen === 'countdown' && (
            <motion.div
              key="countdown"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="flex flex-col items-center justify-center text-center p-6 space-y-6 my-auto select-none"
            >
              <h2 className="text-3xl sm:text-4xl font-black text-[#2D3436] tracking-wide uppercase">
                SIAP-SIAP... 🚀
              </h2>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={countdownVal}
                  initial={{ scale: 0.5, y: 50, opacity: 0 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  exit={{ scale: 1.5, y: -50, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 15 }}
                  className="text-8xl sm:text-9xl md:text-[12rem] font-black text-[#FF7675] drop-shadow-[6px_6px_0_#2D3436]"
                >
                  {countdownVal}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}

          {/* SCREEN 1: START SCREEN */}
          {screen === 'start' && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <StartScreen
                settings={settings}
                onUpdateSettings={(newS) => setSettings(newS)}
                onStartQuiz={handleStartQuiz}
                onOpenAdmin={() => setIsAdminOpen(true)}
                totalAvailableQuestions={questionsBank.length}
                highScore={highScore}
              />
            </motion.div>
          )}

          {/* SCREEN 2 & 3: QUIZ & FEEDBACK TRANSITION */}
          {(screen === 'quiz' || screen === 'feedback') && activeQuestions.length > 0 && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-4 my-2"
            >
              {/* Mascot cheering on top */}
              <MascotWidget
                mascot={mascot}
                speechText={
                  feedback
                    ? feedback.message
                    : `${mascot.name} menunggumu! Pilih angka di keypad bawah!`
                }
                reactionState={
                  feedback ? (feedback.isCorrect ? 'cheering' : 'sad') : 'idle'
                }
                size="md"
              />

              {/* Main Question Card Display */}
              <QuestionCard
                question={activeQuestions[currentIndex]}
                questionNumber={currentIndex + 1}
                totalQuestions={activeQuestions.length}
                onTimeOut={() => handleAnswerQuestion(null)}
                disabled={screen === 'feedback'}
              />

              {/* Virtual On-screen Numpad for Dual Input Remote Mode */}
              <VirtualKeypad
                key={currentIndex}
                onSelectNumber={(num) => handleAnswerQuestion(num)}
                disabled={screen === 'feedback'}
              />

              {/* Feedback Overlay Popup */}
              <AnimatePresence>
                {feedback && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      className={`p-6 sm:p-8 rounded-3xl border-4 text-center font-black text-xl sm:text-3xl border-[#2D3436] max-w-md w-full ${
                        feedback.isCorrect
                          ? 'bg-[#55E6C1] text-[#2D3436] shadow-[8px_8px_0_0_#2D3436]'
                          : 'bg-[#FF7675] text-[#2D3436] shadow-[8px_8px_0_0_#2D3436]'
                      }`}
                    >
                      {feedback.isCorrect ? (
                        <div className="flex flex-col items-center justify-center gap-3">
                          <span className="text-6xl sm:text-7xl animate-bounce">🎉</span>
                          <span className="uppercase tracking-wide">HEBAT! BENAR! 🌟</span>
                          <span className="text-sm font-black bg-white/30 px-3.5 py-1.5 rounded-xl border border-[#2D3436]">
                            {feedback.message}
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-3">
                          <span className="text-6xl sm:text-7xl">😢</span>
                          <span className="uppercase text-white tracking-wide">
                            {feedback.userAnswer === null
                              ? '⏰ WAKTU HABIS!'
                              : `OPS! BELUM TEPAT`}
                          </span>
                          <span className="text-sm font-black bg-white px-4 py-2 rounded-xl text-[#2D3436] border-2 border-[#2D3436] shadow-[3px_3px_0_0_#2D3436]">
                            Jawaban yang benar:{' '}
                            <strong className="text-[#4ECDC4] text-xl font-black">
                              {feedback.correctAnswer}
                            </strong>
                          </span>
                        </div>
                      )}
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* SCREEN 4: RESULT SCREEN */}
          {screen === 'result' && activeResult && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <ResultScreen
                result={activeResult}
                mascot={mascot}
                onPlayAgain={handleStartQuiz}
                onBackToHome={() => setScreen('start')}
                onOpenCertificate={() => setIsCertOpen(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Admin / Question Bank Modal */}
      {isAdminOpen && (
        <AdminModal
          questions={questionsBank}
          onSaveQuestions={async (updated) => {
            setQuestionsBank(updated);
            await saveQuestions(updated);
          }}
          onResetQuestions={async () => {
            const defaults = await resetQuestionsToDefault();
            setQuestionsBank(defaults);
          }}
          onClose={() => setIsAdminOpen(false)}
        />
      )}

      {/* Certificate Modal */}
      {isCertOpen && activeResult && (
        <CertificateModal
          result={activeResult}
          mascot={mascot}
          onClose={() => setIsCertOpen(false)}
        />
      )}
    </div>
  );
}
