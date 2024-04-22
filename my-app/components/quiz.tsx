'use client';

import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import formatTime from '@/app/helpers/time';
import { loadState, saveState } from '@/app/helpers/presist';

interface Props {
  questionsData: Question[];
  currentQuestionId: number;
  remainingTime: number;
}

export default function Quiz({ questionsData, currentQuestionId, remainingTime }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(currentQuestionId);
  const [time, setTime] = useState(remainingTime);
  useEffect(() => {
    saveState('currentQuestionId', currentQuestion);
  }, [currentQuestion]);
  useEffect(() => saveState('remainingTime', time), [time]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(prevTime => prevTime - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleNextQuestion = (values: any) => {
    console.log('Answered:', values);
    setCurrentQuestion(prevQuestion => {
      saveState('currentQuestionId', prevQuestion + 1);
      saveState('userAnswersData', values);
      return prevQuestion + 1;
    });
  };

  const handleSubmit = (values: string[]) => {
    console.log('Submitted:', values);
  };

  return (
    <Formik
      initialValues={loadState('userAnswersData') || {}}
      onSubmit={values => {
        console.log('Submitted:', values);
      }}
    >
      {formik => (
        <Form className="form-container">
          <>
            <div className="quiz-header">
              <h1 className="font-size-25 bold">Тестирование</h1>
              <div className="timer">{formatTime(time)}</div>
            </div>
            <QuestionsProgress count={questionsData.length} currentId={currentQuestion} />
            <div>
              <h3 className="bold">{questionsData[currentQuestion].question}</h3>
              {questionsData[currentQuestion].variants ? (
                questionsData[currentQuestion].variants.map((variant, index) => (
                  <label className="custom-radio" key={index}>
                    <Field
                      type={questionsData[currentQuestion].type === 'single' ? 'radio' : 'checkbox'}
                      name={`question-${currentQuestion}`}
                      value={variant}
                    />
                    {variant && variant}
                  </label>
                ))
              ) : (
                <Field
                  as={questionsData[currentQuestion].type === 'largetext' ? 'textarea' : 'input'}
                  type={questionsData[currentQuestion].type === 'text' ? 'text' : 'textarea'}
                  name={`question-${currentQuestion}`}
                />
              )}
            </div>
            {currentQuestion === questionsData.length - 1 && (
              <button type="submit" className="button">
                Отправить ответы
              </button>
            )}
            {currentQuestion !== questionsData.length - 1 && (
              <button
                type="button"
                onClick={() => handleNextQuestion(formik.values)}
                className="button"
              >
                Ответить
              </button>
            )}
          </>
        </Form>
      )}
    </Formik>
  );
}

interface Question {
  question: string;
  variants: string[];
  type: string;
}

const QuestionsProgress = ({ count, currentId }) => {
  const progressBar = [];
  for (let i = 0; i < count; i++) {
    const variant = i === currentId ? 'active' : i < currentId && 'passed';
    progressBar.push(<div key={i} className={`question-mark ${variant}`}></div>);
  }
  return <div>{progressBar}</div>;
};
