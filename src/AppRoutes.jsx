import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Career from './components/Career';
import HRcontactForm from './components/HRcontactForm';
import CareerApplication from './components/CareerApplicationForm';
import Courses from './pages/Courses';
import DashboardLayout from './components/DashboardLayout';
import { StudentDashboard, AdminDashboard } from './components/Dashboard';
import AuthWrapper from './components/AuthWrapper';
import TeachSection from './components/TeachSection';
import JAMBPage from './components/JAMBPage';
import WAECPage from './components/WAECPage';
import NECOPage from './components/NECOPage';
import ThankYou from './components/ThankYou';
import InstructorGuidelines from './components/InstructorGuidelines';
import ITSoftwarePage from './components/ITSoftwarePage';
import CategoryPage from './components/CategoryPage';
import CourseDetailPage from './components/CourseDetailPage';
import FashionDesignPage from './components/FashionPage';
import LeatherCraftingPage from './components/LeatherCraftingPage';
import CBTExamsPage from './components/CBTExamsPage';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/careers" element={<Career />} />
      <Route path="/instructor-guidelines" element={<InstructorGuidelines />} />
      <Route path="/careers/contact" element={<HRcontactForm />} />
      <Route path="/careers/apply/:id" element={<CareerApplication />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/login" element={<AuthWrapper />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<StudentDashboard />} />
        <Route path="admin" element={<AdminDashboard />} />
      </Route>
      <Route path="/it-software" element={<ITSoftwarePage />} />
      <Route path="/it-software/:categoryId" element={<CategoryPage />} />
      <Route path="/it-software/:categoryId/:courseId" element={<CourseDetailPage />} />
      <Route path="/fashion-design" element={<FashionDesignPage />} />
      <Route path="/leather-crafting" element={<LeatherCraftingPage />} />
      <Route path="/cbt-exams" element={<CBTExamsPage />} />
      <Route path="/exams/jamb" element={<JAMBPage />} />
      <Route path="/exams/waec" element={<WAECPage />} />
      <Route path="/exams/neco" element={<NECOPage />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:slug" element={<CourseDetailPage />} />
      <Route path="/teach" element={<TeachSection />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;