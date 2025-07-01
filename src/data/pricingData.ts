export interface PricingItem {
  category: string;
  title: string;
  description: string;
  duration?: string;
  price: number;
  currency: string;
  btn: string;
  isNumber: boolean;
}

export const pricingData: PricingItem[] = [
  {
    category: 'Courses',
    title: 'Handledarkurs',
    description:
      'Get ready for private driving lessons with our Handledarkurs. This essential course lays the groundwork for safe driving. Book your Handleadrkurs online today and start your journey to confident driving!',
    duration: '180 mins, ex.rest',
    price: 299,
    currency: 'kr',
    btn: 'Book Online',
    isNumber: false,
  },
  {
    category: 'Courses',
    title: 'Risk1 (Riskettan)',
    description:
      'Essential for safe driving. Risk 1 covers comprehensive training on alcohol, drugs, fatigue, and risky behavior. Book online and get started now!',
    duration: '180 mins, ex.rest',
    price: 349,
    currency: 'kr',
    btn: 'Book Online',
    isNumber: false,
  },

  {
    category: 'Courses',
    title: 'Risk 2 (Halkbana)',
    description:
      "This practical course ensures you're ready to handle slippery surfaces confidently. Call or email us to book your session and master the skills needed for safe driving.",
    duration: '180 mins, ex.rest',
    price: 1900,
    currency: 'kr',
    btn: '0855066666',
    isNumber: true,
  },
  {
    category: 'Courses',
    title: 'Risk1 + Risk2 (Halkbana)',
    description:
      "Get a cost-effective bundle with our Risk 1 and Risk 2 package. Both courses are mandatory before attempting the theory test. Book together and enjoy significant savings while ensuring you're fully prepared.",
    duration: '180 mins, ex.rest',
    price: 2090,
    currency: 'kr',
    btn: '0855066666',
    isNumber: true,
  },
  {
    category: 'Driving Lessons',
    title: 'Test driving lesson',
    description:
      "Kickstart your driving journey with our Test Lessons! In your first session, we assess your driving skills, create a personalized plan, and estimate the number of classes you'll need to ace the final test. Let's map out your path to success!",
    duration: '1 x 50 mins',
    price: 595,
    currency: 'kr',
    btn: '0855066666',
    isNumber: true,
  },
  {
    category: 'Driving Lessons',
    title: 'Driving lesson',
    description:
      "Master the road with our expert driving lessons! Our experienced instructors provide personalized training to help you build confidence and develop essential driving skills. Whether you're a beginner or need a refresher, we've got you covered.",
    duration: '1 x 50 mins',
    price: 595,
    currency: 'kr',
    btn: '0855066666',
    isNumber: true,
  },
  {
    category: 'Driving Lessons',
    title: 'Five lessons package',
    description: 'Interest-Free Installment fr.122 kr/month*',
    duration: '5 x 50 mins',
    price: 650,
    currency: 'kr',
    btn: '0855066666',
    isNumber: true,
  },
  {
    category: 'Driving Lessons',
    title: 'Ten lessons package',
    description: 'Interest-Free Installment fr.243 kr/month*',
    duration: ' 1 x 50 mins',
    price: 650,
    currency: 'kr',
    btn: '0855066666',
    isNumber: true,
  },
  {
    category: 'Driving Lessons',
    title: 'Beginner small package',
    description: 'Interest-Free Installment fr.329kr/month*',
    duration: '10 x Driving lesson, Risk1, Risk2',
    price: 7900,
    currency: 'kr',
    btn: '0855066666',
    isNumber: true,
  },
  {
    category: 'Driving Lessons',
    title: 'Beginner Medium package',
    description: 'Interest-Free Installment fr.570 kr/month*',
    duration: '20 x Driving lesson, Risk1, Risk2',
    price: 13690,
    currency: 'kr',
    btn: '0855066666',
    isNumber: true,
  },
  {
    category: 'Driving Lessons',
    title: 'Beginner large package',
    description: 'Interest-Free Installment fr.725 kr/month*',
    duration: '30 x Driving lesson, Risk1, Risk2',
    price: 17400,
    currency: 'kr',
    btn: '0855066666',
    isNumber: true,
  },
  {
    category: 'Theory',
    title: 'Theory',
    description:
      'Get on the road as a professional taxi driver! Our comprehensive course includes 4 sessions of 90 minutes each for just 4400 kr. Perfect your skills and start your taxi driving career with confidence.',
    duration: 'Svenska, Arabiska,English,Bengali,Dari',
    price: 3000,
    currency: 'kr',
    btn: '0855066666',
    isNumber: true,
  },

  {
    category: 'Driving Test',
    title: 'Utbildningskontroll: Pre-Test Checkup',
    description:
      "Ready for your driving test? Ensure you're fully prepared with our Utbildningskontroll! Get evaluated by a different instructor to simulate the real test experience, identify any mistakes you might make, and receive essential correction tips. Perfect for those who want to gauge their readiness before the actual driving test.",
    duration: '2x50 mins',
    price: 950,
    currency: 'kr',
    btn: '0855066666',
    isNumber: true,
  },

  {
    category: 'Driving Test',
    title: 'Borrowing car to practical test',
    description:
      'After successfully completing all driving lessons and the pre-test checkup, students can borrow our car for their practical test. Book your test through us and take the exam with confidence in a familiar vehicle.',
    duration: '1 x 70 mins',
    price: 950,
    currency: 'kr',
    btn: '0855066666',
    isNumber: true,
  },
  {
    category: 'Others',
    title: 'Taxi Driving License',
    description:
      'Get on the road as a professional taxi driver! Our comprehensive course includes 4 sessions of 90 minutes each for just 4400 kr. Perfect your skills and start your taxi driving career with confidence.',
    duration: '4x90 mins',
    price: 4400,
    currency: 'kr',
    btn: '0855066666',
    isNumber: true,
  },
  {
    category: 'Others',
    title: 'Eye test for learner’s permit',
    description:
      "Get your learner's permit with ease! Our essential eye test, required alongside your health declaration, sends results directly to Transportstyrelsen",
    price: 200,
    duration: '',
    currency: 'kr',
    btn: '0855066666',
    isNumber: true,
  },
];
