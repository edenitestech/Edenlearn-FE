import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaChevronDown, FaChevronUp, FaArrowRight } from 'react-icons/fa';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  
  // Complete data for all categories and subcategories
  const categoriesData = {
    development: {
      title: 'Development',
      subcategories: [
        {
          name: 'Web Development',
          courses: [
            { id: 'html-css', name: 'HTML & CSS Fundamentals' },
            { id: 'javascript', name: 'JavaScript Programming' },
            { id: 'react', name: 'React JS Masterclass' },
            { id: 'node', name: 'Node.js Backend Development' },
            { id: 'fullstack', name: 'Fullstack Development' }
          ]
        },
        {
          name: 'Game Development',
          courses: [
            { id: 'unity', name: 'Unity Game Development' },
            { id: 'unreal', name: 'Unreal Engine' }
          ]
        },
        {
          name: 'Mobile Development',
          courses: [
            { id: 'android', name: 'Android Development' },
            { id: 'ios', name: 'iOS Development' },
            { id: 'flutter', name: 'Flutter Cross-platform' },
            { id: 'react-native', name: 'React Native' }
          ]
        },
        {
          name: 'Programming Languages',
          courses: [
            { id: 'python', name: 'Python Programming' },
            { id: 'java', name: 'Java Development' },
            { id: 'csharp', name: 'C# Programming' },
            { id: 'go', name: 'Go Language' }
          ]
        },
        {
          name: 'Database Design',
          courses: [
            { id: 'sql', name: 'SQL Fundamentals' },
            { id: 'mongodb', name: 'MongoDB' },
            { id: 'mysql', name: 'MySQL' }
          ]
        },
        { 
            name: 'Software Engineering', 
            courses: [ 
                { id: 'agile', name: 'Agile & Scrum' }, 
                { id: 'version-control', name: 'Git & GitHub' } 
            ] 
        }
      ]
    },
    certifications: {
      title: 'Certifications',
      subcategories: [
        {
          name: 'Cloud Certifications',
          courses: [
            { id: 'aws-solutions-architect', name: 'AWS Certified Solutions Architect' },
            { id: 'azure-administrator', name: 'Microsoft Certified: Azure Administrator' },
            { id: 'google-cloud-architect', name: 'Google Professional Cloud Architect' }
          ]
        },
        {
          name: 'Networking Certifications',
          courses: [
            { id: 'cisco-ccna', name: 'Cisco CCNA' },
            { id: 'comptia-security-plus', name: 'CompTIA Security+' },
            { id: 'juniper-cert', name: 'Juniper Networks Certification' }
          ]
        },
        {
          name: 'Developer Certifications',
          courses: [
            { id: 'aws-developer', name: 'AWS Certified Developer' },
            { id: 'microsoft-mta', name: 'Microsoft Technology Associate' },
            { id: 'oracle-java-cert', name: 'Oracle Java Certification' }
          ]
        },
        {
          name: 'Cybersecurity Certifications',
            courses: [
            { id: 'ceh', name: 'Certified Ethical Hacker (CEH)' },
            { id: 'cissp', name: 'CISSP Certification' }
            ]
        },
        { name: 'DevOps Certifications', 
            courses: [ 
                { id: 'docker-cert', name: 'Docker Certified Associate' }, 
                { id: 'kubernetes-cert', name: 'Kubernetes Administrator' } 
            ] 
        },
        {
            name: 'Project Management',
            courses: [
            { id: 'pmp', name: 'Project Management Professional (PMP)' },
            { id: 'prince2', name: 'PRINCE2 Foundation' }
            ]
        }
      ]
    },
    popular_topics: {
      title: 'Popular Topics',
      subcategories: [
        {
          name: 'Emerging Technologies',
          courses: [
            { id: 'machine-learning', name: 'Machine Learning Fundamentals' },
            { id: 'blockchain', name: 'Blockchain Basics' },
            { id: 'ai-tools', name: 'AI Tools for Developers' }
          ]
        },
        {
          name: 'Security',
          courses: [
            { id: 'cybersecurity', name: 'Cybersecurity Essentials' },
            { id: 'ethical-hacking', name: 'Ethical Hacking' },
            { id: 'data-privacy', name: 'Data Privacy and Compliance' }
          ]
        },
        {
          name: 'Cloud Computing',
          courses: [
            { id: 'cloud-fundamentals', name: 'Cloud Computing Fundamentals' },
            { id: 'devops', name: 'DevOps Practices' },
            { id: 'serverless', name: 'Serverless Architecture' }
          ]
        },
        {
            name: 'Data Science',
            courses: [
            { id: 'data-analysis', name: 'Data Analysis with Python' },
            { id: 'data-ethics', name: 'Data Privacy & Ethics' },
            { id: 'data-viz', name: 'Data Visualization Techniques' }
            ]
        },
        {
            name: 'Productivity Tools',
            courses: [
            { id: 'excel', name: 'Microsoft Excel for Professionals' },
            { id: 'notion', name: 'Productivity with Notion' }
            ]
        },
        {
            name: 'AI & Robotics',
            courses: [
            { id: 'ai-intro', name: 'Artificial Intelligence Basics' },
            { id: 'chatgpt', name: 'Using ChatGPT Effectively' },
            { id: 'robotics', name: 'Robotics for Beginners' }
            ]
        }
      ]
    },
    network_security: {
      title: 'Network & Security',
      subcategories: [
        {
          name: 'Networking',
          courses: [
            { id: 'network-fundamentals', name: 'Network Fundamentals' },
            { id: 'vpn-technologies', name: 'VPN Technologies' },
            { id: 'network-devices', name: 'Networking Devices & Configurations' }
          ]
        },
        {
          name: 'Security',
          courses: [
            { id: 'firewall-config', name: 'Firewall Configuration' },
            { id: 'penetration-testing', name: 'Penetration Testing' },
            { id: 'intrusion-detection', name: 'Intrusion Detection Systems' }
          ]
        }, 
        {
            name: 'Cloud Security',
            courses: [
            { id: 'aws-security', name: 'AWS Security Best Practices' },
            { id: 'azure-security', name: 'Azure Security Fundamentals' },
            { id: 'cloud-security', name: 'Cloud Security Best Practices' },
            { id: 'identity-access', name: 'Identity & Access Management' }
            ]
        },
        { name: 'Cryptography', 
            courses: [ 
                { id: 'crypto-basics', name: 'Cryptography Basics' }, 
                { id: 'ssl-tls', name: 'SSL/TLS Protocols' } 
            ] 
        },
        { name: 'Compliance', 
            courses: [ 
                { id: 'gdpr', name: 'GDPR Compliance' }, 
                { id: 'iso27001', name: 'ISO 27001' } 
            ] 
        },
        {
            name: 'Network Monitoring',
            courses: [
            { id: 'wireshark', name: 'Network Monitoring with Wireshark' },
            { id: 'nagios', name: 'Nagios for Network Monitoring' }
            ]
        }
      ]
    },
    hardware: {
      title: 'Hardware',
      subcategories: [
        {
          name: 'Computer Hardware',
          courses: [
            { id: 'computer-assembly', name: 'Computer Assembly & Maintenance' },
            { id: 'hardware-troubleshooting', name: 'Hardware Troubleshooting' },
            { id: 'motherboard-cpu', name: 'Motherboards and CPUs' },
            { id: 'printer-repair', name: 'Printer and Scanner Repair' }
          ]
        },
        {
          name: 'Embedded Systems',
          courses: [
            { id: 'embedded-systems', name: 'Embedded Systems' },
            { id: 'iot-devices', name: 'IoT Devices' },
          ]
        },
        { 
            name: 'Raspberry Pi Projects', 
            courses: [ 
                { id: 'raspberry-basics', name: 'Raspberry Pi Basics' }, 
                { id: 'pi-home-auto', name: 'Home Automation with Raspberry Pi' } 
            ] 
        },
        { 
            name: 'Arduino Projects', 
            courses: [ 
                { id: 'arduino-intro', name: 'Arduino for Beginners' }, 
                { id: 'sensors', name: 'Working with Sensors' }, 
                { id: 'arduino', name: 'Arduino Programming' } 
            ] 
        },
        {
            name: 'Networking Devices',
            courses: [
            { id: 'routers', name: 'Routers and Switches' },
            { id: 'cabling', name: 'Cabling and Connectivity' }
            ]
        },
        {
            name: 'Hardware Certifications',
            courses: [
            { id: 'comptia-a+', name: 'CompTIA A+ Certification' },
            { id: 'hardware-safety', name: 'Hardware Safety Procedures' }
            ]
        }
      ]
    },
    operating_systems: {
      title: 'Operating Systems',
      subcategories: [
        {
          name: 'Desktop OS',
          courses: [
            { id: 'windows-admin', name: 'Windows Administration' },
            { id: 'linux-command-line', name: 'Linux Command Line' },
            { id: 'macos', name: 'macOS Essentials' }
          ]
        },
        {
          name: 'Virtualization',
          courses: [
            { id: 'virtualization-tech', name: 'Virtualization Technologies' },
            { id: 'docker', name: 'Containerization with Docker' },
            { id: 'vmware', name: 'VMware Basics' }
          ]
        },
        {
            name: 'Mobile OS',
            courses: [
            { id: 'android-os', name: 'Android OS Internals' },
            { id: 'ios-os', name: 'Understanding iOS System' }
            ]
        },
        {
            name: 'Linux Administration',
            courses: [
            { id: 'linux-admin', name: 'Linux System Administration' },
            { id: 'bash-scripting', name: 'Bash Shell Scripting' }
            ]
        },
        { 
            name: 'Linux Distributions', 
            courses: [ 
                { id: 'ubuntu', name: 'Getting Started with Ubuntu' }, 
                { id: 'centos', name: 'CentOS Admin Guide' } 
            ] 
        }
      ]
    }
  };

  const [expandedSubcategories, setExpandedSubcategories] = useState({});
  const category = categoriesData[categoryId] || categoriesData.development;

  const toggleSubcategory = (subcategoryName) => {
    setExpandedSubcategories(prev => ({
      ...prev,
      [subcategoryName]: !prev[subcategoryName]
    }));
  };

  const handleCourseClick = (courseId) => {
    navigate(`/it-software/${categoryId}/${courseId}`);
  };

  return (
    <PageContainer>
      <CategoryTitle>{category.title}</CategoryTitle>
      
      <SubcategoriesGrid>
        {category.subcategories.map((subcategory, index) => (
          <SubcategoryCard key={index}>
            <SubcategoryHeader 
              onClick={() => subcategory.courses.length > 0 && toggleSubcategory(subcategory.name)}
              hasCourses={subcategory.courses.length > 0}
            >
              <SubcategoryName>{subcategory.name}</SubcategoryName>
              {subcategory.courses.length > 0 && (
                expandedSubcategories[subcategory.name] ? <FaChevronUp /> : <FaChevronDown />
              )}
            </SubcategoryHeader>
            
            {subcategory.courses.length > 0 && (
              <CourseList isOpen={expandedSubcategories[subcategory.name]}>
                {subcategory.courses.map(course => (
                  <CourseItem 
                    key={course.id}
                    onClick={() => handleCourseClick(course.id)}
                  >
                    {course.name}
                    <FaArrowRight />
                  </CourseItem>
                ))}
              </CourseList>
            )}
          </SubcategoryCard>
        ))}
      </SubcategoriesGrid>
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const CategoryTitle = styled.h1`
  font-size: 2.5rem;
  color: var(--primary-blue);
  margin-bottom: 2rem;
  text-align: center;
`;

const SubcategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const SubcategoryCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const SubcategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem;
  background: ${props => props.hasCourses ? 'var(--primary-blue)' : '#f5f5f5'};
  color: ${props => props.hasCourses ? 'white' : 'var(--font-primary)'};
  cursor: ${props => props.hasCourses ? 'pointer' : 'default'};
  transition: all 0.2s ease;

  ${props => props.hasCourses && `
    &:hover {
      background: #1a5276;
    }
  `}
`;

const SubcategoryName = styled.h2`
  font-size: 1.3rem;
  margin: 0;
`;

const CourseList = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  transition: all 0.3s ease;
`;

const CourseItem = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f9f9f9;
    color: var(--primary-blue);
  }

  &:last-child {
    border-bottom: none;
  }
`;

export default CategoryPage;