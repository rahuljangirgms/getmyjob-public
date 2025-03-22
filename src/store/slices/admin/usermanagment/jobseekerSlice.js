import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
  { 
    id: 1, 
    name: "Rajesh Kumar", 
    location: "Bangalore", 
    experience: 5, 
    jobTitle: "Software Engineer",
    status: "Active",
    completion: 80,
    profileImage: "https://rahuljangir-works.pages.dev/assets/img/avatars/avatar-1.png"
  },
  { 
    id: 2, 
    name: "Priya Sharma", 
    location: "Mumbai", 
    experience: 3, 
    jobTitle: "UI/UX Designer",
    status: "Inactive",
    completion: 60,
    profileImage: "https://rahuljangir-works.pages.dev/assets/img/avatars/avatar-5.png"
  },
  { 
    id: 3, 
    name: "Amit Verma", 
    location: "Delhi", 
    experience: 7, 
    jobTitle: "Data Scientist",
    status: "Active",
    completion: 90,
    profileImage: "https://rahuljangir-works.pages.dev/assets/img/avatars/avatar-2.png"
  },
  { 
    id: 4, 
    name: "Neha Gupta", 
    location: "Hyderabad", 
    experience: 4, 
    jobTitle: "Project Manager",
    status: "Active",
    completion: 75,
    profileImage: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
  },
  { 
    id: 5, 
    name: "Vikas Singh", 
    location: "Pune", 
    experience: 6, 
    jobTitle: "Backend Developer",
    status: "Inactive",
    completion: 85,
    profileImage: "https://rahuljangir-works.pages.dev/assets/img/avatars/avatar-1.png"
  },
  { 
    id: 6, 
    name: "Kavita Rao", 
    location: "Chennai", 
    experience: 2, 
    jobTitle: "Graphic Designer",
    status: "Active",
    completion: 55,
    profileImage: "https://rahuljangir-works.pages.dev/assets/img/avatars/avatar-5.png"
  },
  { 
    id: 7, 
    name: "Manoj Tiwari", 
    location: "Jaipur", 
    experience: 8, 
    jobTitle: "ML Engineer",
    status: "Active",
    completion: 95,
    profileImage: "https://rahuljangir-works.pages.dev/assets/img/avatars/avatar-2.png"
  },
  { 
    id: 8, 
    name: "Pooja Desai", 
    location: "Kolkata", 
    experience: 5, 
    jobTitle: "Software Tester",
    status: "Inactive",
    completion: 70,
    profileImage: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
  },
  { 
    id: 9, 
    name: "Ravi Patel", 
    location: "Ahmedabad", 
    experience: 6, 
    jobTitle: "DevOps Engineer",
    status: "Active",
    completion: 82,
    profileImage: "https://rahuljangir-works.pages.dev/assets/img/avatars/avatar-1.png"
  },
  { 
    id: 10, 
    name: "Sneha Iyer", 
    location: "Bangalore", 
    experience: 4, 
    jobTitle: "Business Analyst",
    status: "Active",
    completion: 77,
    profileImage: "https://rahuljangir-works.pages.dev/assets/img/avatars/avatar-5.png"
  },
  { 
    id: 11, 
    name: "Arun Mehta", 
    location: "Delhi", 
    experience: 3, 
    jobTitle: "SEO Specialist",
    status: "Inactive",
    completion: 60,
    profileImage: "https://rahuljangir-works.pages.dev/assets/img/avatars/avatar-2.png"
  },
  { 
    id: 12, 
    name: "Swati Kapoor", 
    location: "Mumbai", 
    experience: 7, 
    jobTitle: "Marketing Manager",
    status: "Active",
    completion: 88,
    profileImage: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
  },
  { 
    id: 13, 
    name: "Vivek Agarwal", 
    location: "Hyderabad", 
    experience: 5, 
    jobTitle: "Full Stack Developer",
    status: "Active",
    completion: 80,
    profileImage: "https://rahuljangir-works.pages.dev/assets/img/avatars/avatar-1.png"
  },
  { 
    id: 14, 
    name: "Meena Nair", 
    location: "Chennai", 
    experience: 6, 
    jobTitle: "HR Manager",
    status: "Inactive",
    completion: 65,
    profileImage: "https://rahuljangir-works.pages.dev/assets/img/avatars/avatar-5.png"
  },
  { 
    id: 15, 
    name: "Harish Bhatt", 
    location: "Jaipur", 
    experience: 2, 
    jobTitle: "Technical Writer",
    status: "Active",
    completion: 50,
    profileImage: "https://rahuljangir-works.pages.dev/assets/img/avatars/avatar-2.png"
  },
  { 
    id: 16, 
    name: "Ankita Choudhary", 
    location: "Pune", 
    experience: 9, 
    jobTitle: "AI Researcher",
    status: "Active",
    completion: 96,
    profileImage: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
  },
  { 
    id: 17, 
    name: "Ramesh Pandey", 
    location: "Kolkata", 
    experience: 4, 
    jobTitle: "Cloud Architect",
    status: "Inactive",
    completion: 75,
    profileImage: "https://rahuljangir-works.pages.dev/assets/img/avatars/avatar-1.png"
  },
  { 
    id: 18, 
    name: "Divya Joshi", 
    location: "Ahmedabad", 
    experience: 5, 
    jobTitle: "Cyber Security Analyst",
    status: "Active",
    completion: 85,
    profileImage: "https://rahuljangir-works.pages.dev/assets/img/avatars/avatar-5.png"
  },
  { 
    id: 19, 
    name: "Sandeep Chauhan", 
    location: "Delhi", 
    experience: 7, 
    jobTitle: "Blockchain Developer",
    status: "Active",
    completion: 90,
    profileImage: "https://rahuljangir-works.pages.dev/assets/img/avatars/avatar-2.png"
  },
  { 
    id: 20, 
    name: "Komal Saxena", 
    location: "Bangalore", 
    experience: 6, 
    jobTitle: "Data Analyst",
    status: "Inactive",
    completion: 70,
    profileImage: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
  }
],
  loading: false,
};

const jobseekerSlice = createSlice({
  name: "jobseekers",
  initialState,
  reducers: {
    addJobseeker: (state, action) => {
      state.data.push(action.payload);
    },
    updateJobseekerStatus: (state, action) => {
      const { id, status } = action.payload;
      const jobseeker = state.data.find((js) => js.id === id);
      if (jobseeker) {
        jobseeker.status = status; // ✅ Update Status
      }
    },
    updateJobseekerCompletion: (state, action) => {
      const { id, completion } = action.payload;
      const jobseeker = state.data.find((js) => js.id === id);
      if (jobseeker) {
        jobseeker.completion = completion; // ✅ Update Profile Completion
      }
    },
  },
});

export const { addJobseeker, updateJobseekerStatus, updateJobseekerCompletion } = jobseekerSlice.actions;
export default jobseekerSlice.reducer;
