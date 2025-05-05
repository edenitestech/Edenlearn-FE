
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