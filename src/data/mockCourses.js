// src/data/mockCourses.js
// ────────────────────────────────────────────────────────────
// All course data (mocked)
// ────────────────────────────────────────────────────────────
const allCourses = {
  'aws-certified-solutions-architect': {
    id: 'aws-solutions-architect',
    title: 'AWS Certified Solutions Architect',
    category: 'IT Certifications',
    instructor: 'Cee Jay',
    rating: 4.8,
    students: 1200,
    price: 5,
    duration: '6 weeks',
    description: 'Master AWS cloud architecture and become a certified solutions architect. Learn to design distributed systems on AWS.',
    syllabus: [
      'AWS Fundamentals',
      'Designing Resilient Architectures',
      'Define Performant Architectures',
      'Specify Secure Applications',
      'Cost Optimization'
    ],
    prerequisites: ['Basic cloud computing knowledge'],
    image: '../image.AWS.png'
  },
  'react-js-masterclass': {
    id: 'react',
    title: 'React JS Masterclass',
    category: 'Web Development',
    instructor: 'Gabby Tech',
    rating: 4.9,
    students: 850,
    price: 5,
    duration: '8 weeks',
    description: 'Become a React expert by building real-world applications with hooks, context API, and advanced patterns.',
    syllabus: [
      'React Fundamentals',
      'Hooks and Context API',
      'State Management',
      'Performance Optimization',
      'Testing React Apps'
    ],
    prerequisites: ['JavaScript basics', 'HTML/CSS'],
    image: '../image/React pic.webp'
  },
  'html-css': {
    id: 'html-css',
    title: 'HTML & CSS Fundamentals',
    category: 'Web Development',
    instructor: 'John Code',
    rating: 4.7,
    students: 1500,
    price: 5,
    duration: '4 weeks',
    description: 'Learn the building blocks of web development with hands-on projects.',
    syllabus: [
      'HTML5 Semantic Elements',
      'CSS Flexbox and Grid',
      'Responsive Design',
      'CSS Animations',
      'Accessibility'
    ],
    prerequisites: [],
    image: '../image/AWS.png'
  },
  'javascript': {
    id: 'javascript',
    title: 'JavaScript Programming',
    category: 'Web Development',
    instructor: 'Judec',
    rating: 4.8,
    students: 1800,
    price: 5,
    duration: '6 weeks',
    description: 'Master JavaScript from basics to advanced concepts with real-world projects.',
    syllabus: [
      'Variables and Data Types',
      'Functions and Scope',
      'DOM Manipulation',
      'ES6+ Features',
      'Async Programming'
    ],
    prerequisites: ['HTML/CSS basics'],
    image: '../image/JavaScript.png'
  }
};


export default allCourses;
