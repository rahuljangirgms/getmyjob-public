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

import RecruiterDashboard from './pages/dashboard/recruiter/RecruiterDashboard'
import RecruiterLayout from './pages/layout/recruiter/RecruiterLayout'
import JobManagement from './pages/dashboard/recruiter/Jobmanagement/JobManagement'
import CreateJob from './pages/dashboard/recruiter/Jobmanagement/CreateJob'
import EditJob from './pages/dashboard/recruiter/Jobmanagement/EditJob'


// admin rahul imports 
import AdminSignIn from './pages/authentication/admin/admin-signin'
import AdminSignUp from './pages/authentication/admin/admin-signup'
import ForgotPassword from './pages/authentication/admin/admin-forgot-password'
import Dashboard from './pages/dashboard/admin/Dashboard'
import Recruiters  from './pages/dashboard/admin/modules/recruiters/recruiters'
import Jobseekers from './pages/dashboard/admin/modules/jobseekers/jobseekers'
import ReportsAnalytics from './pages/dashboard/admin/modules/reportsanalytics/reportsanalytics'
import SupportManagement from './pages/dashboard/admin/modules/supportmanagment/supportmanagment'
import SubscriptionPayment from './pages/dashboard/admin/modules/subscriptionandpayment/subscriptionandpayment'
import Roles from './pages/dashboard/admin/modules/usermanagment/roles';



// added by admin rahul to use flowbit 
import "flowbite";
import "./index.css";





const App = () => {
  return (
    <>
    <Routes>
      <Route path='/jobseeker/' element={<JobSeekerHomePage/>}/>
      <Route path='/jobseeker/login' element={<JobseekerLogin/>}/>
      <Route path='/jobseeker/signup' element={<JobSeekerSignUp/>}/>
      <Route path='/jobseeker/forgetpassword' element={<JobseekerForgetPass/>}/>
      <Route path='/jobseeker/resetpassword' element={<JobseekerResetPass/>}/>

      
         <Route path='/jobseeker' element={<JobseekerLayout/>}>
             <Route path='dashboard' element={<JobseekerDashboard/>}/>
             <Route path='job-detail' element={<JobDetailsPage/>}/>
             <Route path='complete-profile-form' element={<CompleteProfileFormSection/>}>
                <Route path='personal-info' element={<PersonalInfoForm/>}/>
                <Route path='contact-info' element={<ContactDetailsForm/>}/>
                <Route path='education' element={<EducationalDetailsFrom/>}/>
                <Route path='attachments' element={<AttachementsFrom/>}/>
                <Route path='professional' element={<ProfessionalDetailForm/>}/>
                <Route path='internship' element={<InternshipForm/>}/>
                <Route path='projects' element={<ProjectsForm/>}/>
                <Route path='publications' element={<ResearchPaperForm/>}/>
                <Route path='trainings' element={<TraningForm/>}/>
                <Route path='certifications' element={<CertificationForm/>}/> 
                <Route path='other-details' element={<OtherDetailsForm/>}/> 
             </Route>
         </Route>

           {/* Recruiter Routes */}
      <Route path="/recruiter/login" element={<RecruitmentLogin />} />
      <Route path="/recruiter/signup" element={<RecruitmentSignup />} />
      <Route path="/recruiter/reset-password" element={<RecruitmentResetPassword />} />
      <Route path="/recruiter/forgot-password" element={<RecruitmentForgotpassword />} />
      
      {/* <Route path="/recruiter/dashboard" element={<RecruitmentAuthRoutes element={<RecruiterLayout />} allowedRoles={["recruiter"]} />}></Route> */}
      <Route path="/recruiter/dashboard" element={<RecruiterLayout /> }>
        <Route index element={<RecruiterDashboard />} />
        <Route path='companies' element={<CompanyManagement/>}/>
        <Route path="companies/create" element={<CreateCompany />} />
        <Route path="jobs" element={<JobManagement />} />
        <Route path="jobs/create" element={<CreateJob />} />
        <Route path="jobs/detail/:id" element={<JobDetail />} />
        <Route path="jobs/edit/:id" element={<EditJob />} />
        <Route path="users" element={<IndexUser />} />
      </Route>


      {/* admin  */}
      <Route path='/admin' element="">
       <Route path='dashboard' element={<Dashboard/>}/>
      </Route>

      <Route path='/usermanagment' element="">
      <Route path='roles' element={<Roles/>}/>
      </Route>

       <Route path='recruiters' element={<Recruiters/>}/>

       <Route path='jobseekers' element={<Jobseekers/>}/>

      <Route path='/admin/reportsanalytics' element={<ReportsAnalytics/>}/>
      <Route path='/admin/supportmanagement' element={<SupportManagement/>}/>
      <Route path='/admin/subscriptionpayment' element={<SubscriptionPayment/>}/>

      <Route path='/admin/signin' element={<AdminSignIn/>}/>
      <Route path='/admin/signup' element={<AdminSignUp/>}/>
      <Route path='/admin/forgot-password' element={<ForgotPassword/>}/>


    </Routes>
    </>
  )
}

export default App