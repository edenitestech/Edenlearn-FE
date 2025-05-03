// import { db } from '../firebase';
// import { collection, query, where, getDocs } from 'firebase/firestore';

// export const getEnrolledCourses = async (userId) => {
//   const q = query(
//     collection(db, 'enrollments'),
//     where('userId', '==', userId)
//   );
  
//   const querySnapshot = await getDocs(q);
//   return querySnapshot.docs.map(doc => ({
//     id: doc.id,
//     ...doc.data()
//   }));
// };

// Add more course-related service functions as needed


// Mock service functions
export const getEnrolledCourses = async (userId) => {
  // Mock data - replace with real API calls later
  return [
    {
      id: 1,
      title: "Introduction to React",
      progress: 65,
      lastAccessed: "2 days ago"
    },
    {
      id: 2,
      title: "JavaScript Fundamentals",
      progress: 30,
      lastAccessed: "1 week ago"
    }
  ];
};