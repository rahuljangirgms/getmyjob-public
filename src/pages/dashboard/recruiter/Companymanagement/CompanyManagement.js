// src/pages/company/CompanyManagement.js
import { Link } from "react-router-dom";
import {
  Building,
  Edit,
  ExternalLink,
  Globe,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCompanyRequest,
  updateCompanyRequest,
} from "../../../../store/slices/recruiter/companySlice";

const CompanyManagement = () => {
  const dispatch = useDispatch();
  const { company, loading } = useSelector((state) => state.companies) || {
    company: null,
  };
  const { user } = useSelector((state) => state.auth);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  useEffect(() => {
    if (user && user.id) {
      dispatch(fetchCompanyRequest({ user_id: user.id }));
    }
  }, [dispatch, user]);

  const openModal = (companyData) => {
    setSelectedCompany(companyData);
    setLogoPreview(companyData.company_logo || null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCompany(null);
    setLogoPreview(null);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedCompany({ ...selectedCompany, company_logo: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = () => {
    if (
      !selectedCompany.name ||
      !selectedCompany.website ||
      !selectedCompany.industry ||
      !selectedCompany.locations ||
      !selectedCompany.company_size ||
      !selectedCompany.company_description ||
      !selectedCompany.company_logo
    ) {
      console.error("❌ Missing required fields!");
      return;
    }

    dispatch(
      updateCompanyRequest({
        name: selectedCompany.name,
        website: selectedCompany.website,
        industry: selectedCompany.industry, // array
        locations: selectedCompany.locations, // array
        company_size: selectedCompany.company_size,
        company_description: selectedCompany.company_description,
        company_logo: selectedCompany.company_logo, // File object
        social_profiles: selectedCompany.social_profiles || [], // array of strings
      })
    );

    closeModal();
  };

  return (
    <div className="h-full bg-gray-100 flex flex-col items-center justify-center p-6">
      {loading ? (
        <p className="text-center text-gray-500">Loading company details...</p>
      ) : company ? (
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-xl">
          {/* Company Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <img
                src={company.company_logo || "https://via.placeholder.com/150"}
                alt={company.name}
                className="w-28 h-28 rounded-full shadow-md object-cover"
              />
              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  {company.name}
                </h2>
                <div className="text-gray-600 flex items-center gap-2 mt-1">
                  <Globe size={18} />
                  <Link
                    to={company.website}
                    className="text-blue-600 hover:underline"
                  >
                    {company.website}
                  </Link>
                </div>
              </div>
            </div>
            {/* Edit Company Profile Button */}
            <button
              onClick={() => openModal(company)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md hover:bg-blue-700 transition"
            >
              <Edit size={18} /> Edit Profile
            </button>
          </div>

          <div className="mt-8 border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-800">
              Company Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
              <div className="flex items-center gap-2">
                <Building size={20} className="text-gray-500" />
                <span className="text-gray-700">
                  Locations:{" "}
                  {company.locations && company.locations.join(", ")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={20} className="text-gray-500" />
                <span className="text-gray-700">
                  Company Size: {company.company_size} employees
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ExternalLink size={20} className="text-gray-500" />
                <span className="text-gray-700">
                  Industry: {company.industry && company.industry.join(", ")}
                </span>
              </div>
            </div>
          </div>

          {/* Social Profiles Section */}
          <div className="mt-8 border-t pt-6">
            <h3 className="text-xl font-semibold text-gray-800">
              Social Profiles
            </h3>
            <div className="mt-2">
              {company.social_profiles && company.social_profiles.length > 0
                ? company.social_profiles.join(", ")
                : "No social profiles available."}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No company profile found.</p>
      )}

      {/* Responsive Modal for Editing Company Profile */}
      <AnimatePresence>
        {isModalOpen && selectedCompany && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            />
            <motion.div
              className="fixed inset-0 flex items-center justify-center px-4 py-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* Modal Container */}
              <div
                className="bg-white rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-2xl 
                           p-4 sm:p-6 overflow-y-auto max-h-[90vh]"
                onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
              >
                {/* Modal Header */}
                <div className="flex justify-between items-center border-b pb-4">
                  <h2 className="text-xl font-semibold">Edit Company Profile</h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Edit Form */}
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="text-gray-700 font-medium">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={selectedCompany.name}
                      onChange={(e) =>
                        setSelectedCompany({
                          ...selectedCompany,
                          name: e.target.value,
                        })
                      }
                      className="w-full border rounded-md p-2 mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-gray-700 font-medium">Website</label>
                    <input
                      type="text"
                      value={selectedCompany.website}
                      onChange={(e) =>
                        setSelectedCompany({
                          ...selectedCompany,
                          website: e.target.value,
                        })
                      }
                      className="w-full border rounded-md p-2 mt-1"
                    />
                  </div>

                  {/* Company Logo Input */}
                  <div>
                    <label className="text-gray-700 font-medium">
                      Company Logo
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="w-full border rounded-md p-2 mt-1"
                    />
                    {logoPreview && (
                      <img
                        src={logoPreview}
                        alt="Logo Preview"
                        className="mt-2 w-32 h-32 object-cover rounded"
                      />
                    )}
                  </div>

                  <div>
                    <label className="text-gray-700 font-medium">Locations</label>
                    <input
                      type="text"
                      value={selectedCompany.locations.join(", ")}
                      onChange={(e) =>
                        setSelectedCompany({
                          ...selectedCompany,
                          locations: e.target.value
                            .split(",")
                            .map((loc) => loc.trim()),
                        })
                      }
                      className="w-full border rounded-md p-2 mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-gray-700 font-medium">Industries</label>
                    <input
                      type="text"
                      value={selectedCompany.industry.join(", ")}
                      onChange={(e) =>
                        setSelectedCompany({
                          ...selectedCompany,
                          industry: e.target.value
                            .split(",")
                            .map((ind) => ind.trim()),
                        })
                      }
                      className="w-full border rounded-md p-2 mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-gray-700 font-medium">
                      Company Size
                    </label>
                    <input
                      type="number"
                      value={selectedCompany.company_size}
                      onChange={(e) =>
                        setSelectedCompany({
                          ...selectedCompany,
                          company_size: e.target.value,
                        })
                      }
                      className="w-full border rounded-md p-2 mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-gray-700 font-medium">
                      Company Description
                    </label>
                    <textarea
                      value={selectedCompany.company_description}
                      onChange={(e) =>
                        setSelectedCompany({
                          ...selectedCompany,
                          company_description: e.target.value,
                        })
                      }
                      className="w-full border rounded-md p-2 mt-1"
                    />
                  </div>
                  {/* Social Profiles Field */}
                  <div>
                    <label className="text-gray-700 font-medium">
                      Social Profiles (comma separated)
                    </label>
                    <input
                      type="text"
                      value={(selectedCompany.social_profiles || []).join(", ")}
                      onChange={(e) =>
                        setSelectedCompany({
                          ...selectedCompany,
                          social_profiles: e.target.value
                            .split(",")
                            .map((s) => s.trim()),
                        })
                      }
                      className="w-full border rounded-md p-2 mt-1"
                    />
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end gap-4 mt-6 border-t pt-4">
                  <button
                    onClick={closeModal}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CompanyManagement;
