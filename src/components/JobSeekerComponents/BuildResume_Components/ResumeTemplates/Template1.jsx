import styled from "styled-components";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMailSharp } from "react-icons/io5";
import { GrLinkedin } from "react-icons/gr";
import { BsGithub } from "react-icons/bs";
import ResumeSkeloton from './../ResumeSkeloton';


const ResumeWrapper = styled.div`
  width: 100%;
  margin: auto;
  padding: 40px;
  background: white;
  color: black;
  font-family: ${(props) => props.font || "Arial, sans-serif"};
  line-height: 1.6;
  letter-spacing: 0.5px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
`;

const Divider = styled.div`
  border-bottom: 2px solid black;
  margin: 15px 0;
`;

const Section = styled.div`
  margin-top: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: bold;
  text-transform: capitalize;
  letter-spacing: 1px;
  margin-bottom: 5px;
`;

const formatLabel = (text) => {
  return text
    .replace(/([A-Z])/g, " $1") // Add space before uppercase letters
    .replace(/[_-]/g, " ") // Replace underscores/dashes with spaces
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
};

const Template1 = ({ data = {}, style }) => {
  if (!data || Object.keys(data).length === 0) {
    return <div className="flex w-full h-lvh">
      <ResumeSkeloton/>
    </div>;
  }

  return (
    <ResumeWrapper style={style}>
      {/* ✅ Header Section */}
      {data.personalInformation && (
        <div className="text-center">
          <h1 className="text-3xl font-bold uppercase tracking-wide">
            {data.personalInformation.firstName || "First Name"}{" "}
            {data.personalInformation.lastName || "Last Name"}
          </h1>
          {/* <p className="text-gray-700 uppercase text-sm">
            {data.personalInformation.specialization || "Your Role"}
          </p> */}
          <div className="text-sm text-gray-600 flex gap-2 justify-center items-center py-2">
            <FaPhoneAlt />
            {data.personalInformation.phoneNumber || "Phone"} | <IoMailSharp />
            {data.personalInformation.email || "Email"} | 
            {data.contactDetails?.linkedInUrl && (
              <div className="flex gap-2 items-center">
                <GrLinkedin />
                <a href={data.contactDetails.linkedInUrl} className="text-blue-500 underline">
                  LinkedIn <span className="text-black">|</span>
                </a>
              </div>
            )}
            {data.contactDetails?.githubUrl && (
              <div className="flex gap-2 items-center">
                <BsGithub />
                <a href={data.contactDetails.githubUrl} className="text-blue-500 underline">
                  GitHub
                </a>
              </div>
            )}
          </div>
          <Divider />
        </div>
      )}

      {/* ✅ Other Details (Summary at Top, Expertise below it) */}
      {data.otherDetails && (
        <Section>
          {/* Summary at the top */}
          {data.otherDetails.summary && (
            <>
              <SectionTitle>Summary</SectionTitle>
              <p className="text-gray-700">{data.otherDetails.summary}</p>
              <Divider />
            </>
          )}

          {/* Expertise right after Summary */}
          {data.otherDetails.expertise && (
            <>
              <SectionTitle>Expertise</SectionTitle>
              <p className="text-gray-700">{data.otherDetails.expertise.join(", ")}</p>
              <Divider />
            </>
          )}
        </Section>
      )}

      {/* ✅ Dynamic Sections (All Other Details except Achievements & Extracurricular) */}
      {Object.entries(data).map(([sectionKey, sectionValue]) => {
        if (
          sectionKey === "personalInformation" ||
          sectionKey === "contactDetails" ||
          sectionKey === "otherDetails" // Skip Other Details (Handled Separately Above)
        )
          return null;

        return (
          <Section key={sectionKey}>
            <SectionTitle>{formatLabel(sectionKey)}</SectionTitle>

            {/* ✅ Handle String Values */}
            {typeof sectionValue === "string" && (
              <p className="text-sm text-gray-800">{sectionValue}</p>
            )}

            {/* ✅ Handle Objects */}
            {typeof sectionValue === "object" &&
              !Array.isArray(sectionValue) && (
                <div className="pl-4">
                  {Object.entries(sectionValue).map(([key, value]) => (
                    <p key={key} className="text-gray-700 text-sm">
                      <b>{formatLabel(key)}:</b>{" "}
                      {Array.isArray(value) ? value.join(", ") : value}
                    </p>
                  ))}
                </div>
              )}

            {/* ✅ Handle Arrays (For Experience, Education, Projects, etc.) */}
            {Array.isArray(sectionValue) && sectionValue.length > 0 && (
              <div className="space-y-3">
                {sectionValue.map((item, index) => (
                  <div key={index} className="mb-3">
                    {/* ✅ Education Details Formatting */}
                    {sectionKey === "educationDetails" ? (
                      <div className="text-left">
                        <p className="font-bold">
                          {item.data.qualification}
                        </p>
                        <p className="italic text-gray-600">
                          {item.data.college}, {item.data.collegeCity}
                        </p>
                        <p className="text-gray-700 text-sm">
                          {item.data.joiningYear} - {item.data.completionYear}
                        </p>
                      </div>
                    ) : (
                      /* ✅ Formatting for Other Sections */
                      <div className="text-left">
                        <p className="font-bold">
                          {item.designation || item.name || item.title}
                        </p>
                        {item.organisation && (
                          <p className="italic text-gray-600">
                            {item.organisation}, {item.city}
                          </p>
                        )}
                        {item.from && item.to && (
                          <p className="text-gray-700 text-sm">
                            {item.from} - {item.to}
                          </p>
                        )}
                        {item.description && (
                          <p className="text-gray-700 text-sm">{item.description}</p>
                        )}
                        {item.skills && (
                          <p className="text-gray-700 text-sm">
                            <b>Skills:</b> {item.skills.join(", ")}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <Divider />
          </Section>
        );
      })}

      {/* ✅ Achievements & Extracurricular at Bottom */}
      {data.otherDetails && (
        <Section>
          {data.otherDetails.achievements && (
            <>
              <SectionTitle>Achievements</SectionTitle>
              <p className="text-gray-700">{data.otherDetails.achievements.join(", ")}</p>
              <Divider />
            </>
          )}

          {data.otherDetails.extraCurricular && (
            <>
              <SectionTitle>Extra Curricular</SectionTitle>
              <p className="text-gray-700">{data.otherDetails.extraCurricular.join(", ")}</p>
              <Divider />
            </>
          )}
        </Section>
      )}
    </ResumeWrapper>
  );
};

export default Template1;
