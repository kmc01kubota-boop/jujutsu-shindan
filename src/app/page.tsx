"use client";

import { useState, useCallback } from "react";
import Logo from "@/components/Logo";
import QuestionCard from "@/components/QuestionCard";
import ResultPage from "@/components/ResultPage";
import DomainExpansion from "@/components/DomainExpansion";
import AdSlot from "@/components/AdSlot";
import { questions, Question } from "@/data/questions";
import { findBestMatch, determineRank, MatchResult } from "@/lib/matching";
import { Choice } from "@/data/questions";

// Ad display toggle — set to true when ad provider is configured
const SHOW_ADS = false;

// Find the Yuki question index
const YUKI_Q_INDEX = questions.findIndex((q: Question) => q.special === "yuki");

type Phase = "start" | "questions" | "revealing" | "result";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("start");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Choice[]>([]);
  const [result, setResult] = useState<MatchResult | null>(null);
  const [rank, setRank] = useState("");
  const [yukiAnswer, setYukiAnswer] = useState("");

  const handleStart = useCallback(() => {
    setPhase("questions");
    setCurrentQ(0);
    setAnswers([]);
  }, []);

  const handleAnswer = useCallback(
    (choice: Choice) => {
      const newAnswers = [...answers, choice];
      setAnswers(newAnswers);

      // Track Yuki's iconic question answer
      if (currentQ === YUKI_Q_INDEX) {
        setYukiAnswer(choice.text);
      }

      if (currentQ + 1 >= questions.length) {
        // All questions answered → domain expansion reveal
        const matchResult = findBestMatch(newAnswers);
        const userRank = determineRank(newAnswers);
        setResult(matchResult);
        setRank(userRank);
        setPhase("revealing");
      } else {
        setCurrentQ((prev) => prev + 1);
      }
    },
    [answers, currentQ]
  );

  const handleRevealComplete = useCallback(() => {
    setPhase("result");
  }, []);

  const handleRestart = useCallback(() => {
    setPhase("start");
    setCurrentQ(0);
    setAnswers([]);
    setResult(null);
    setRank("");
    setYukiAnswer("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="relative z-10 min-h-screen">
      {/* ===== Start Screen ===== */}
      {phase === "start" && (
        <Logo onStart={handleStart} />
      )}

      {/* ===== Question Phase ===== */}
      {phase === "questions" && (
        <div className="flex min-h-screen items-center justify-center py-12">
          <QuestionCard
            key={questions[currentQ].id}
            question={questions[currentQ]}
            currentIndex={currentQ}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
          />
        </div>
      )}

      {/* ===== Domain Expansion Reveal ===== */}
      {phase === "revealing" && (
        <DomainExpansion onComplete={handleRevealComplete} />
      )}

      {/* ===== Result Page ===== */}
      {phase === "result" && result && (
        <ResultPage result={result} rank={rank} yukiAnswer={yukiAnswer} onRestart={handleRestart} />
      )}

      {/* ===== Footer Ad (persistent except during reveal & start) ===== */}
      {SHOW_ADS && phase !== "revealing" && phase !== "start" && (
        <AdSlot variant="footer" />
      )}
    </div>
  );
}
