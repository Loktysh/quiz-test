'use client';
import Quiz from '@/components/quiz';
import questionsData from '@/mock/questionsData';
import { loadState } from './helpers/presist';

export default function Home() {
  return (
    <Quiz
      questionsData={questionsData}
      currentQuestionId={loadState('currentQuestionId') || 0}
      remainingTime={loadState('remainingTime') || 900}
    />
  );
}
