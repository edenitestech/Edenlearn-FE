import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useFetch } from '../hooks/useFetch';

const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  padding: 2rem;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  overflow: hidden;
  border: 4px solid white;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UserName = styled.h1`
  margin: 0.5rem 0;
  font-size: 2rem;
`;

const UserEmail = styled.p`
  margin: 0.2rem 0;
  opacity: 0.9;
`;

const UserBio = styled.p`
  margin: 1rem 0;
  text-align: center;
  max-width: 600px;
`;

const ProfileDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const DetailCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  
  h3 {
    margin-top: 0;
    color: #555;
    border-bottom: 1px solid #eee;
    padding-bottom: 0.5rem;
  }
`;

const CoursesSection = styled.section`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const CourseCard = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
`;

const CourseInfo = styled.div`
  padding: 1rem;
  
  h4 {
    margin: 0 0 0.5rem 0;
    color: #333;
  }
  
  p {
    margin: 0.2rem 0;
    color: #666;
    font-size: 0.9rem;
  }
`;

const Profile = () => {
  // In a real app, you would get this from your auth context or state management
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Frontend developer passionate about React and UX design. Currently learning advanced state management techniques.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    joinDate: 'January 2023',
    lastLogin: new Date().toLocaleDateString(),
    enrolledCourses: [1, 3, 5] // IDs of enrolled courses
  });

  // Fetch courses data
  const { data: courses, loading, error } = useFetch(
    'https://api.example.com/courses', 
    true // Using mock data for now
  );

  // Filter courses to only show enrolled ones
  const enrolledCourses = courses?.filter(course => 
    user.enrolledCourses.includes(course.id)
  ) || [];

  return (
    <ProfileContainer>
      <ProfileHeader>
        <Avatar>
          <img src={user.avatar} alt={user.name} />
        </Avatar>
        <UserName>{user.name}</UserName>
        <UserEmail>{user.email}</UserEmail>
        <UserBio>{user.bio}</UserBio>
      </ProfileHeader>

      <ProfileDetails>
        <DetailCard>
          <h3>Account Details</h3>
          <p><strong>Member since:</strong> {user.joinDate}</p>
          <p><strong>Last login:</strong> {user.lastLogin}</p>
        </DetailCard>

        <DetailCard>
          <h3>Learning Stats</h3>
          <p><strong>Courses enrolled:</strong> {user.enrolledCourses.length}</p>
          <p><strong>Courses completed:</strong> 2</p>
          <p><strong>Learning streak:</strong> 5 days</p>
        </DetailCard>
      </ProfileDetails>

      <CoursesSection>
        <h2>My Courses</h2>
        {loading ? (
          <p>Loading your courses...</p>
        ) : error ? (
          <p>Error loading courses: {error.message}</p>
        ) : enrolledCourses.length === 0 ? (
          <p>You haven't enrolled in any courses yet.</p>
        ) : (
          <CourseGrid>
            {enrolledCourses.map(course => (
              <CourseCard key={course.id}>
                <img src={course.image} alt={course.title} />
                <CourseInfo>
                  <h4>{course.title}</h4>
                  <p>Instructor: {course.instructor}</p>
                  <p>Progress: 65%</p>
                </CourseInfo>
              </CourseCard>
            ))}
          </CourseGrid>
        )}
      </CoursesSection>
    </ProfileContainer>
  );
};

export default Profile;