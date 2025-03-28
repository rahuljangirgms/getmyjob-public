import React from "react";
import { Route, Routes } from "react-router-dom";
import JobseekerLayout from "./pages/layout/jobseeker/JobseekerLayout";
import JobseekerLogin from "./pages/authentication/jobseeker/JobseekerLogin";
import JobseekerDashboard from "./pages/dashboard/jobseeker/JobseekerDashboard";
import JobSeekerSignUp from "./pages/authentication/jobseeker/JobseekerSignUp";
import AdminDashboard from "./pages/dashboard/admin/admin-dashboard";
import AdminSignIn from "./pages/authentication/admin/admin-signin";
import AdminSignUp from "./pages/authentication/admin/admin-signup";
import ForgotPassword from "./pages/authentication/admin/admin-forgot-password";
import RecruitmentLogin from "./pages/authentication/Recruiter/RecruitmentLogin";
import RecruitmentResetPassword from "./pages/authentication/Recruiter/RecruitmentResetPassword";
import RecruitmentForgotpassword from "./pages/authentication/Recruiter/RecruitmentForgotpassword";
import RecruitmentSignup from "./pages/authentication/Recruiter/RecruitmentSignup";
import JobseekerForgetPass from "./pages/authentication/jobseeker/JobseekerForgetPass";
import JobseekerResetPass from "./pages/authentication/jobseeker/JobseekerResetPass";
import JobSeekerHomePage from "./pages/authentication/jobseeker/JobSeekerHomePage";
import CompleteProfileFormSection from "./routes/jobseeker/CompleteProfileFormSection";
import PersonalInfoForm from "./routes/jobseeker/completeProfileForms/PersonalInfoForm";
import ContactDetailsForm from "./routes/jobseeker/completeProfileForms/ContactDetailsForm";
import EducationalDetailsFrom from "./routes/jobseeker/completeProfileForms/EducationalDetailsFrom";
import AttachementsFrom from "./routes/jobseeker/completeProfileForms/AttachementsFrom";
import ProfessionalDetailForm from "./routes/jobseeker/completeProfileForms/ProfessionalDetailForm";
import InternshipForm from "./routes/jobseeker/completeProfileForms/InternshipForm";
import ProjectsForm from "./routes/jobseeker/completeProfileForms/ProjectsForm";
import ResearchPaperForm from "./routes/jobseeker/completeProfileForms/ResearchPaperForm";
import TraningForm from "./routes/jobseeker/completeProfileForms/TraningForm";
import CertificationForm from "./routes/jobseeker/completeProfileForms/CertificationForm";
import OtherDetailsForm from "./routes/jobseeker/completeProfileForms/OtherDetailsForm";
import JobDetailsPage from "./pages/jobseekerpages/JobDetailsPage";

import RecruiterDashboard from "./pages/dashboard/recruiter/RecruiterDashboard";
import RecruiterLayout from "./pages/layout/recruiter/RecruiterLayout";
import JobManagement from "./pages/dashboard/recruiter/Jobmanagement/JobManagement";
import CreateJob from "./pages/dashboard/recruiter/Jobmanagement/CreateJob";
import EditJob from "./pages/dashboard/recruiter/Jobmanagement/EditJob";
import ResumeBuilder from "./routes/jobseeker/ResumeBuilder/ResumeBuilder";
import QuizHomePage from "./routes/jobseeker/Trail-Quiz/QuizHomePage";
import QuizTopics from "./routes/jobseeker/Trail-Quiz/Pages/QuizTopics";
import QuizPlanPage from "./routes/jobseeker/Trail-Quiz/Pages/QuizPlanPage";
import QuizPage from "./routes/jobseeker/Trail-Quiz/Pages/QuizPage";
import JobSeekerProfile from "./routes/jobseeker/Profile/JobSeekerProfile";
import ProtectedRoute from "./routes/jobseeker_Protected_Route/ProtectedRoute";
import RedirectIfAuthenticated from "./routes/jobseeker_Protected_Route/RedirectIfAuthenticated";
import ApplyForJobPage from './pages/jobseekerpages/ApplyForJobPage';
import ResumeAnalyzer from './routes/jobseeker/ResumeAnalyzer/ResumeAnalyzer';
import ChangePassword from './routes/jobseeker/Profile/components/ChangePassword';


const App = () => {
  return (
    <>
      <Routes>
        {/* Prevent logged-in users from accessing login, signup, forget password, reset password, and home */}
        <Route element={<RedirectIfAuthenticated />}>
          <Route path="/jobseeker/" element={<JobSeekerHomePage />} />
          <Route path="/jobseeker/login" element={<JobseekerLogin />} />
          <Route path="/jobseeker/signup" element={<JobSeekerSignUp />} />
          <Route
            path="/jobseeker/forgetpassword"
            element={<JobseekerForgetPass />}
          />
          <Route
            path="/jobseeker/resetpassword"
            element={<JobseekerResetPass />}
          />
        </Route>

        {/* Protected Routes (Only Accessible When Logged In) */}
        <Route path="/jobseeker" element={<ProtectedRoute />}>
          <Route element={<JobseekerLayout />}>
            <Route path="dashboard" element={<JobseekerDashboard />} />
            <Route path="job-detail/:id/:bash_id" element={<JobDetailsPage />} />
            <Route path="apply-job" element={<ApplyForJobPage />} />
            <Route path="profile" element={<JobSeekerProfile />} />
            <Route path='change-password' element={<ChangePassword/>}/>
            <Route path="resume-builder" element={<ResumeBuilder />} />
            <Route
              path="complete-profile-form"
              element={<CompleteProfileFormSection />}
            >
              <Route path="personal-info" element={<PersonalInfoForm />} />
              <Route path="contact-info" element={<ContactDetailsForm />} />
              <Route path="education" element={<EducationalDetailsFrom />} />
              <Route path="attachments" element={<AttachementsFrom />} />
              <Route path="professional" element={<ProfessionalDetailForm />} />
              <Route path="internship" element={<InternshipForm />} />
              <Route path="projects" element={<ProjectsForm />} />  
              <Route path="publications" element={<ResearchPaperForm />} />
              <Route path="trainings" element={<TraningForm />} />
              <Route path="certifications" element={<CertificationForm />} />
              <Route path="other-details" element={<OtherDetailsForm />} />
            </Route>
            <Route path="trail-quiz" element={<QuizHomePage />}>
              <Route path="" element={<QuizPlanPage />} />
              <Route path="quiz-topic" element={<QuizTopics />} />
              <Route path="quiz-page" element={<QuizPage />} />
            </Route>
            <Route path="resume-analyzer/:id/:bash_id" element={<ResumeAnalyzer/>}/>
          </Route>
        </Route>

        {/* Recruiter Routes */}
        <Route path="/recruiter/login" element={<RecruitmentLogin />} />
        <Route path="/recruiter/signup" element={<RecruitmentSignup />} />
        <Route
          path="/recruiter/reset-password"
          element={<RecruitmentResetPassword />}
        />
        <Route
          path="/recruiter/forgot-password"
          element={<RecruitmentForgotpassword />}
        />

        <Route path="/recruiter/dashboard" element={<RecruiterLayout />}>
          <Route index element={<RecruiterDashboard />} />
          <Route path="jobs" element={<JobManagement />} />
          <Route path="jobs/create" element={<CreateJob />} />
          <Route path="jobs/edit/:id" element={<EditJob />} />
        </Route>

        {/* admin  */}
        <Route path="/admin" element="">
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
        <Route path="/admin/signin" element={<AdminSignIn />} />
        <Route path="/admin/signup" element={<AdminSignUp />} />
        <Route path="/admin/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </>
  );
};

export default App;
