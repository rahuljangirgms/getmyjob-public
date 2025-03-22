import React from 'react'
import { Route, Routes } from 'react-router-dom'
import JobseekerLayout from './pages/layout/jobseeker/JobseekerLayout'
import JobseekerLogin from './pages/authentication/jobseeker/JobseekerLogin'
import JobseekerDashboard from './pages/dashboard/jobseeker/JobseekerDashboard'
import JobSeekerSignUp from './pages/authentication/jobseeker/JobseekerSignUp'

import RecruitmentLogin from './pages/authentication/Recruiter/RecruitmentLogin'
import RecruitmentResetPassword from './pages/authentication/Recruiter/RecruitmentResetPassword'
import RecruitmentForgotpassword from './pages/authentication/Recruiter/RecruitmentForgotpassword'
import RecruitmentSignup from './pages/authentication/Recruiter/RecruitmentSignup'
import JobseekerForgetPass from './pages/authentication/jobseeker/JobseekerForgetPass'
import JobseekerResetPass from './pages/authentication/jobseeker/JobseekerResetPass'
import JobSeekerHomePage from './pages/authentication/jobseeker/JobSeekerHomePage'
import CompleteProfileFormSection from './routes/jobseeker/CompleteProfileFormSection';
import PersonalInfoForm from './routes/jobseeker/completeProfileForms/PersonalInfoForm';
import ContactDetailsForm from './routes/jobseeker/completeProfileForms/ContactDetailsForm';
import EducationalDetailsFrom from './routes/jobseeker/completeProfileForms/EducationalDetailsFrom';
import AttachementsFrom from './routes/jobseeker/completeProfileForms/AttachementsFrom';
import ProfessionalDetailForm from './routes/jobseeker/completeProfileForms/ProfessionalDetailForm';
import InternshipForm from './routes/jobseeker/completeProfileForms/InternshipForm';
import ProjectsForm from './routes/jobseeker/completeProfileForms/ProjectsForm';
import ResearchPaperForm from './routes/jobseeker/completeProfileForms/ResearchPaperForm';
import TraningForm from './routes/jobseeker/completeProfileForms/TraningForm';
import CertificationForm from './routes/jobseeker/completeProfileForms/CertificationForm';
import OtherDetailsForm from './routes/jobseeker/completeProfileForms/OtherDetailsForm';
import JobDetailsPage from './pages/jobseekerpages/JobDetailsPage';
import CompanyManagement from './pages/dashboard/recruiter/Companymanagement/CompanyManagement';
import CreateCompany from './pages/dashboard/recruiter/Companymanagement/CreateCompany';
import JobDetail from './pages/dashboard/recruiter/Jobmanagement/JobDetail';
import IndexUser from './pages/dashboard/recruiter/userManagement/IndexUser';
// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import JobseekerLayout from "./pages/layout/jobseeker/JobseekerLayout";
// import JobseekerLogin from "./pages/authentication/jobseeker/JobseekerLogin";
// import JobseekerDashboard from "./pages/dashboard/jobseeker/JobseekerDashboard";
// import JobSeekerSignUp from "./pages/authentication/jobseeker/JobseekerSignUp";
// import AdminDashboard from "./pages/dashboard/admin/admin-dashboard";
// import AdminSignIn from "./pages/authentication/admin/admin-signin";
// import AdminSignUp from "./pages/authentication/admin/admin-signup";
// import ForgotPassword from "./pages/authentication/admin/admin-forgot-password";
// import RecruitmentLogin from "./pages/authentication/Recruiter/RecruitmentLogin";
// import RecruitmentResetPassword from "./pages/authentication/Recruiter/RecruitmentResetPassword";
// import RecruitmentForgotpassword from "./pages/authentication/Recruiter/RecruitmentForgotpassword";
// import RecruitmentSignup from "./pages/authentication/Recruiter/RecruitmentSignup";
// import JobseekerForgetPass from "./pages/authentication/jobseeker/JobseekerForgetPass";
// import JobseekerResetPass from "./pages/authentication/jobseeker/JobseekerResetPass";
// import JobSeekerHomePage from "./pages/authentication/jobseeker/JobSeekerHomePage";
// import CompleteProfileFormSection from "./routes/jobseeker/CompleteProfileFormSection";
// import PersonalInfoForm from "./routes/jobseeker/completeProfileForms/PersonalInfoForm";
// import ContactDetailsForm from "./routes/jobseeker/completeProfileForms/ContactDetailsForm";
// import EducationalDetailsFrom from "./routes/jobseeker/completeProfileForms/EducationalDetailsFrom";
// import AttachementsFrom from "./routes/jobseeker/completeProfileForms/AttachementsFrom";
// import ProfessionalDetailForm from "./routes/jobseeker/completeProfileForms/ProfessionalDetailForm";
// import InternshipForm from "./routes/jobseeker/completeProfileForms/InternshipForm";
// import ProjectsForm from "./routes/jobseeker/completeProfileForms/ProjectsForm";
// import ResearchPaperForm from "./routes/jobseeker/completeProfileForms/ResearchPaperForm";
// import TraningForm from "./routes/jobseeker/completeProfileForms/TraningForm";
// import CertificationForm from "./routes/jobseeker/completeProfileForms/CertificationForm";
// import OtherDetailsForm from "./routes/jobseeker/completeProfileForms/OtherDetailsForm";
// import JobDetailsPage from "./pages/jobseekerpages/JobDetailsPage";

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

// import RecruiterDashboard from './pages/dashboard/recruiter/RecruiterDashboard'
// import RecruiterLayout from './pages/layout/recruiter/RecruiterLayout'
// import JobManagement from './pages/dashboard/recruiter/Jobmanagement/JobManagement'
// import CreateJob from './pages/dashboard/recruiter/Jobmanagement/CreateJob'
// import EditJob from './pages/dashboard/recruiter/Jobmanagement/EditJob'


// admin rahul imports 
// import AdminSignIn from './pages/authentication/admin/admin-signin'
// import AdminSignUp from './pages/authentication/admin/admin-signup'
// import ForgotPassword from './pages/authentication/admin/admin-forgot-password'
// import Dashboard from './pages/dashboard/admin/Dashboard'
// import Recruiters  from './pages/dashboard/admin/modules/recruiters/recruiters'
// import Jobseekers from './pages/dashboard/admin/modules/jobseekers/jobseekers'
// import ReportsAnalytics from './pages/dashboard/admin/modules/reportsanalytics/reportsanalytics'
// import SupportManagement from './pages/dashboard/admin/modules/supportmanagment/supportmanagment'
// import SubscriptionPayment from './pages/dashboard/admin/modules/subscriptionandpayment/subscriptionandpayment'
// import Roles from './pages/dashboard/admin/modules/usermanagment/roles';
// import Permissions from './pages/dashboard/admin/modules/usermanagment/permission';
// import Users from './pages/dashboard/admin/modules/usermanagment/users'
// import UserProfile from './pages/dashboard/admin/components/UserProfile/UserProfile'
// added by admin rahul to use flowbit 






import RecruitmentAuthRoutes from './routes/RecruitmentAuthRoutes'
// import CompanyManagement from './pages/dashboard/recruiter/Companymanagement/CompanyManagement'
// import CreateCompany from './pages/dashboard/recruiter/Companymanagement/CreateCompany'
// import IndexUser from './pages/dashboard/recruiter/userManagement/IndexUser'
// import JobDetail from './pages/dashboard/recruiter/Jobmanagement/JobDetail'
import CandidateManagement from './pages/dashboard/recruiter/candidateManagement/CandidateManagement'
import CandidateDetail from './pages/dashboard/recruiter/candidateManagement/CandidateDetail'
import InterviewInvitation from './pages/dashboard/recruiter/InterviewInvitation'
import Billing from './pages/dashboard/recruiter/dropdowns/Billing'
import Subscriptions from './pages/dashboard/recruiter/dropdowns/Subscriptions'
import Contactus from './pages/dashboard/recruiter/dropdowns/Contactus'
import AccountSettings from './pages/dashboard/recruiter/dropdowns/AccountSettings'
import EmployeerSettings from './pages/dashboard/recruiter/dropdowns/EmployeerSettings'
import CandidateTestPage from './pages/dashboard/recruiter/candidateManagement/CandidateTestPage'
import PermissionRoute from './routes/PermissionRoute'


// added by admin rahul
import AdminSignIn from './pages/authentication/admin/admin-signin'
import AdminSignUp from './pages/authentication/admin/admin-signup'
import ForgotPassword from './pages/authentication/admin/admin-forgot-password'
import Dashboard from './pages/dashboard/admin/Dashboard'
import Recruiters from './pages/dashboard/admin/modules/recruiters/recruiters'
import Jobseekers from './pages/dashboard/admin/modules/jobseekers/jobseekers'
import ReportsAnalytics from './pages/dashboard/admin/modules/reportsanalytics/reportsanalytics'
import SupportManagement from './pages/dashboard/admin/modules/supportmanagment/supportmanagment'
import SubscriptionPayment from './pages/dashboard/admin/modules/subscriptionandpayment/subscriptionandpayment'
import Roles from './pages/dashboard/admin/modules/usermanagment/roles';
import Permissions from './pages/dashboard/admin/modules/usermanagment/permission';
import Users from './pages/dashboard/admin/modules/usermanagment/users'
import UserProfile from './pages/dashboard/admin/components/UserProfile/UserProfile'
// added by admin rahul to use flowbit
import "flowbite";
import "./index.css";

// Adminguards
import AdminProtectedRoute from './services/Guards/ProtectedRoute'
import PermissionGuard from './services/Guards/PermissionGuard'

const App = () => {
  return (
    <>
      <Routes>
        {/* Public (unprotected) jobseeker routes */}
        <Route path="/jobseeker/" element={<JobSeekerHomePage />} />
        <Route path="/jobseeker/login" element={<JobseekerLogin />} />
        <Route path="/jobseeker/signup" element={<JobSeekerSignUp />} />
        <Route path="/jobseeker/forgetpassword" element={<JobseekerForgetPass />} />
        <Route path="/jobseeker/resetpassword" element={<JobseekerResetPass />} />

        {/* Prevent logged-in users from accessing these routes */}
        <Route element={<RedirectIfAuthenticated />}>
          <Route path="/jobseeker/" element={<JobSeekerHomePage />} />
          <Route path="/jobseeker/login" element={<JobseekerLogin />} />
          <Route path="/jobseeker/signup" element={<JobSeekerSignUp />} />
          <Route path="/jobseeker/forgetpassword" element={<JobseekerForgetPass />} />
          <Route path="/jobseeker/resetpassword" element={<JobseekerResetPass />} />
        </Route>

        {/* Protected jobseeker routes */}
        <Route path="/jobseeker" element={<ProtectedRoute />}>
          <Route element={<JobseekerLayout />}>
            <Route path="dashboard" element={<JobseekerDashboard />} />
            <Route path="job-detail" element={<JobDetailsPage />} />
            <Route path="apply-job" element={<ApplyForJobPage />} />
            <Route path="profile" element={<JobSeekerProfile />} />
            <Route path="resume-builder" element={<ResumeBuilder />} />

            <Route path="complete-profile-form" element={<CompleteProfileFormSection />}>
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
              <Route index element={<QuizPlanPage />} />
              <Route path="quiz-topic" element={<QuizTopics />} />
              <Route path="quiz-page" element={<QuizPage />} />
            </Route>
          </Route>
        </Route>

        {/* Recruiter Routes (public) */}
        <Route path="/recruiter/login" element={<RecruitmentLogin />} />
        <Route path="/recruiter/signup" element={<RecruitmentSignup />} />
        <Route path="/recruiter/reset-password" element={<RecruitmentResetPassword />} />
        <Route path="/recruiter/forgot-password" element={<RecruitmentForgotpassword />} />

        {/* Protected recruiter dashboard routes */}
        <Route
          path="/recruiter/dashboard"
          element={<RecruitmentAuthRoutes allowedRoles={["recruiter", "Senior Recruiter", "HR-Admin", "Admin", "Manager"]} />}
        >
          <Route element={<RecruiterLayout />}>
            <Route
              index
              element={
                <PermissionRoute menu="dashboard" action="view">
                  <RecruiterDashboard />
                </PermissionRoute>
              }
            />
            <Route path="companies" element={<CompanyManagement />} />
            <Route path="companies/create" element={<CreateCompany />} />
            <Route
              path="jobs"
              element={
                <PermissionRoute menu="job management" action="view">
                  <JobManagement />
                </PermissionRoute>
              }
            />
            <Route path="jobs/create" element={<CreateJob />} />
            <Route path="jobs/detail/:id" element={<JobDetail />} />
            <Route path="jobs/edit/:id" element={<EditJob />} />
            <Route
              path="users"
              element={
                <PermissionRoute menu="users" action="view">
                  <IndexUser />
                </PermissionRoute>
              }
            />
            <Route
              path="candidates"
              element={
                <PermissionRoute menu="candidate" action="view">
                  <CandidateManagement />
                </PermissionRoute>
              }
            />
            <Route path="candidates/detail/:id" element={<CandidateDetail />} />
            <Route path="candidates/test/:testSessionId" element={<CandidateTestPage />} />
            <Route path="candidates/open-to-work" element={<CandidateManagement />} />
            <Route path="candidates/jobId" element={<CandidateManagement />} />
            <Route
              path="interview"
              element={
                <PermissionRoute menu="interview" action="view">
                  <InterviewInvitation />
                </PermissionRoute>
              }
            />

            {/* Recruiter profile routes */}
            <Route path="billing-plans" element={<Billing />} />
            <Route path="subscriptions" element={<Subscriptions />} />
            <Route path="contact-us" element={<Contactus />} />
            <Route path="account-settings" element={<AccountSettings />} />
            <Route path="employeer-settings" element={<EmployeerSettings />} />
          </Route>
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element="">
          <Route
            path="dashboard"
            element={
              <PermissionGuard menuKey="admin-dashboard" action="view">
                <Dashboard />
              </PermissionGuard>
            }
          />
          <Route
            path="userprofile"
            element={
              <PermissionGuard menuKey="profile" action="view">
                <UserProfile />
              </PermissionGuard>
            }
          />
        </Route>

        <Route path="/usermanagment" element="">
          <Route
            path="roles"
            element={
              <PermissionGuard menuKey="role-management" action="view">
                <Roles />
              </PermissionGuard>
            }
          />
          <Route
            path="permission"
            element={
              <PermissionGuard menuKey="role-permission" action="view">
                <Permissions />
              </PermissionGuard>
            }
          />
          <Route
            path="user"
            element={
              <PermissionGuard menuKey="user-management" action="view">
                <Users />
              </PermissionGuard>
            }
          />
        </Route>

        <Route
          path="/recruiters"
          element={
            <PermissionGuard menuKey="recruiter-management" action="view">
              <Recruiters />
            </PermissionGuard>
          }
        />

        <Route
          path="/jobseekers"
          element={
            <PermissionGuard menuKey="jobseeker-management" action="view">
              <Jobseekers />
            </PermissionGuard>
          }
        />

        <Route
          path="/admin/reportsanalytics"
          element={
            <PermissionGuard menuKey="reports-analytics" action="view">
              <ReportsAnalytics />
            </PermissionGuard>
          }
        />

        <Route
          path="/admin/supportmanagement"
          element={
            <PermissionGuard menuKey="profile" action="view">
              <SupportManagement />
            </PermissionGuard>
          }
        />

        <Route
          path="/admin/subscriptionpayment"
          element={
            <PermissionGuard menuKey="subscription-payment" action="view">
              <SubscriptionPayment />
            </PermissionGuard>
          }
        />

        {/* Public Routes – No Permission Required */}
        <Route path="/admin/signin" element={<AdminSignIn />} />
        <Route path="/admin/signup" element={<AdminSignUp />} />
        <Route path="/admin/forgot-password" element={<ForgotPassword />} />

        {/* Admin Routes */}

      </Routes>
    </>
  );
};

export default App;
