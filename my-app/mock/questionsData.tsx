export interface Question {
  id: number;
  type: 'single' | 'multiple' | 'text' | 'largetext';
  question: string;
  variants?: string[];
}

const questionsData: Question[] = [
  {
    id: 0,
    type: 'text',
    question: 'What do you mean?',
  },
  {
    id: 1,
    type: 'largetext',
    question: 'What do you do?',
  },
  {
    id: 2,
    type: 'single',
    question: 'Years count?',
    variants: ['One year', 'Two years', 'Three years'],
  },
  {
    id: 3,
    type: 'multiple',
    question: 'How much?',
    variants: ['100', '200', '300', '400', '500'],
  },
  {
    id: 4,
    type: 'single',
    question: 'How much?',
    variants: ['100', '200', '300', '400', '500'],
  },
];

export default questionsData;
