import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * @typedef {Object} Course
 * @property {number} id
 * @property {string} title
 * @property {string} instructor
 * @property {number} price
 * @property {string} image
 * @property {string} [category]
 * @property {number} [rating]
 * @property {number} [students]
 */

/**
 * Custom hook for fetching data
 * @param {string} url - API endpoint
 * @param {boolean} [useMockData=false] - Whether to use mock data
 * @returns {{ data: Course[], loading: boolean, error: Error | null }}
 */
export const useFetch = (url, useMockData = false) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Enhanced mock data with additional fields
  const mockCourses = [
    { 
      id: 1, 
      title: "React Basics", 
      instructor: "GabbyTech", 
      price: 5, 
      image: '../image/React pic.webp',
      category: "Web Development",
      rating: 4.8,
      students: 1200
    },
    { 
      id: 2, 
      title: "Python", 
      instructor: "Emmanuel Chibuzor", 
      price: 5, 
      image: '../image/Python.webp',
      category: "Programming",
      rating: 4.7,
      students: 950
    },
    { 
      id: 3, 
      title: "Machine Learning", 
      instructor: "Strongcode", 
      price: 5, 
      image: '../image/AI and Machine Learning.webp',
      category: "Data Science",
      rating: 4.9,
      students: 750
    },
    { 
      id: 4, 
      title: "Advanced JS", 
      instructor: "Johncode", 
      price: 5, 
      image: '../image/JavaScript Lang.webp',
      category: "Web Development",
      rating: 4.8,
      students: 1100
    },
    { 
      id: 5, 
      title: "Computer Basics", 
      instructor: "Judec", 
      price: 5, 
      image: '../image/basic computer.webp',
      category: "Beginner",
      rating: 4.6,
      students: 2300
    },
    { 
      id: 6, 
      title: "Data Analysis", 
      instructor: "Chiamaka Eze", 
      price: 5, 
      image: '../image/Data Science.webp',
      category: "Data Science",
      rating: 4.7,
      students: 850
    },
    { 
      id: 7,
      title: "UI/UX Design Fundamentals",
      instructor: "DesignMaster",
      price: 5,
      image: 'https://picsum.photos/seed/uxdesign/400/300',
      category: "Design",
      rating: 4.9,
      students: 680
    },
    { 
      id: 8,
      title: "Cloud Computing with AWS",
      instructor: "CloudExpert",
      price: 5,
      image: 'https://picsum.photos/seed/aws/400/300',
      category: "Cloud",
      rating: 4.8,
      students: 920
    },
    { 
      id: 9,
      title: "Mobile App Development",
      instructor: "AppBuilder",
      price: 5,
      image: 'https://picsum.photos/seed/mobileapp/400/300',
      category: "Mobile",
      rating: 4.7,
      students: 780
    },
    { 
      id: 10,
      title: "Cybersecurity Essentials",
      instructor: "SecurityPro",
      price: 5,
      image: 'https://picsum.photos/seed/cybersecurity/400/300',
      category: "Security",
      rating: 4.9,
      students: 1050
    },
    { 
      id: 11,
      title: "Digital Marketing Mastery",
      instructor: "MarketingGuru",
      price: 5,
      image: 'https://picsum.photos/seed/marketing/400/300',
      category: "Marketing",
      rating: 4.6,
      students: 1250
    },
    { 
      id: 12,
      title: "Blockchain Basics",
      instructor: "CryptoExpert",
      price: 5,
      image: 'https://picsum.photos/seed/blockchain/400/300',
      category: "Blockchain",
      rating: 4.8,
      students: 650
    },
    { 
      id: 13,
      title: "Game Development with Unity",
      instructor: "GameCreator",
      price: 5,
      image: 'https://picsum.photos/seed/gamedev/400/300',
      category: "Game Dev",
      rating: 4.7,
      students: 580
    },
    { 
      id: 14,
      title: "DevOps for Beginners",
      instructor: "DevOpsMaster",
      price: 5,
      image: 'https://picsum.photos/seed/devops/400/300',
      category: "DevOps",
      rating: 4.8,
      students: 890
    },
    { 
      id: 15,
      title: "Artificial Intelligence",
      instructor: "AIResearcher",
      price: 5,
      image: 'https://picsum.photos/seed/ai/400/300',
      category: "AI",
      rating: 4.9,
      students: 1100
    },
    { 
      id: 16,
      title: "Full Stack Development",
      instructor: "FullStackPro",
      price: 5,
      image: 'https://picsum.photos/seed/fullstack/400/300',
      category: "Web Development",
      rating: 4.8,
      students: 1350
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (useMockData) {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 800));
          setData(mockCourses);
        } else {
          const response = await axios.get(url);
          setData(response.data);
        }
      } catch (err) {
        setError(err);
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, useMockData]);

  return { data, loading, error };
};


// image: 'https://picsum.photos/seed/react/400/300'
// image: 'https://picsum.photos/seed/python/400/300'
// image: 'https://picsum.photos/seed/machinelearning/400/300'
// image: 'https://picsum.photos/seed/javascript/400/300'
// image: 'https://picsum.photos/seed/computer/400/300'
// image: 'https://picsum.photos/seed/dataanalysis/400/300'