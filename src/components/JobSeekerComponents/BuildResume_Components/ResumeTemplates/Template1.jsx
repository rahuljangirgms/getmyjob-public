import styled from "styled-components";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMailSharp } from "react-icons/io5";
import { GrLinkedin } from "react-icons/gr";
import { BsGithub } from "react-icons/bs";

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
  font-size: 1rem;
  font-weight: bold;
  text-transform: capitalize;
  letter-spacing: 1px;
  margin-bottom: 5px;
`;

const BulletList = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
`;

const BulletPoint = styled.li`
  font-size: 0.9rem;
  margin-bottom: 5px;
`;

/** ✅ Converts camelCase or snake_case to Proper Sentence Case */
const formatLabel = (text) => {
  return text
    .replace(/([A-Z])/g, " $1") // Add space before uppercase letters
    .replace(/[_-]/g, " ") // Replace underscores/dashes with spaces
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
};

const Template1 = ({ data = {}, style }) => {
  if (!data || Object.keys(data).length === 0) {
    return <h2 className="text-center text-xl">No Data Available</h2>;
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
          <p className="text-gray-700 uppercase text-sm">
            {data.personalInformation.specialization || "Your Role"}
          </p>
          <div className="text-sm text-gray-600 flex gap-2 justify-center items-center">
            <FaPhoneAlt />
            {data.personalInformation.phoneNumber || "Phone"} | <IoMailSharp />
            {data.personalInformation.email || "Email"} | <GrLinkedin />
            {data.contactDetails?.linkedInUrl && (
              <a
                href={data.contactDetails.linkedInUrl}
                className="text-blue-500 underline"
              >
                LinkedIn <span className="text-black">|</span>
              </a>
            )}
            {/* githubUrl */}
            <BsGithub />
            {data.contactDetails?.githubUrl && (
              <a
                href={data.contactDetails.linkedInUrl}
                className="text-blue-500 underline"
              >
                GitHub <span className="text-black"></span>
              </a>
            )}
          </div>
          <Divider />
        </div>
      )}

      {/* ✅ Dynamic Sections */}
      {Object.entries(data).map(([sectionKey, sectionValue]) => {
        if (
          sectionKey === "personalInformation" ||
          sectionKey === "contactDetails"
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
                <BulletList>
                  {Object.entries(sectionValue).map(([key, value]) => (
                    <BulletPoint key={key}>
                      <b className="text-gray-800">{formatLabel(key)}:</b>{" "}
                      {Array.isArray(value) ? value.join(", ") : value}
                    </BulletPoint>
                  ))}
                </BulletList>
              )}

            {/* ✅ Handle Arrays */}
            {Array.isArray(sectionValue) && sectionValue.length > 0 && (
              <div className="space-y-3">
                {sectionValue.map((item, index) => (
                  <div key={index} className="mb-3">
                    {/* ✅ Special Handling for Education Details */}
                    {sectionKey === "educationDetails" ? (
                      <div className="text-left">
                        <p className="font-bold">
                          {item.data.qualification} |{" "}
                          <span>
                            {item.data.aggregate}{" "}
                            {item.data.aggregateType === "percentage"
                              ? "%"
                              : "CGPA"}
                          </span>
                        </p>
                        <p className="italic text-gray-600">
                          {item.data.college}, {item.data.collegeCity}
                        </p>
                        <p className="text-gray-700 text-sm">
                          {item.data.joiningYear} - {item.data.completionYear}
                        </p>
                      </div>
                    ) : (
                      Object.entries(item).map(([key, value]) => (
                        <p key={key} className="text-gray-700 text-sm">
                          <b>{formatLabel(key)}:</b>{" "}
                          {Array.isArray(value) ? value.join(", ") : value}
                        </p>
                      ))
                    )}
                  </div>
                ))}
              </div>
            )}

            <Divider />
          </Section>
        );
      })}
    </ResumeWrapper>
  );
};

export default Template1;
