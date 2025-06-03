// src/data/mockCourses.js
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
    syllabus: ['AWS Fundamentals', 'Designing Resilient Architectures', 'Define Performant Architectures', 'Specify Secure Applications', 'Cost Optimization'],
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
    syllabus: ['React Fundamentals', 'Hooks and Context API', 'State Management', 'Performance Optimization', 'Testing React Apps'],
    prerequisites: ['JavaScript basics', 'HTML/CSS'],
    image: '../image/React pic.webp'
  },
  // ... other courses
};

export default allCourses;
