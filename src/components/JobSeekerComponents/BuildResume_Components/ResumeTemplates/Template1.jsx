  import styled from "styled-components";
  import { FaPhoneAlt } from "react-icons/fa";
  import { IoMailSharp } from "react-icons/io5";
  import { GrLinkedin } from "react-icons/gr";
  import { BsGithub } from "react-icons/bs";
  import ResumeSkeloton from "./../ResumeSkeloton";

  // Responsive styled component for the resume wrapper
  const ResumeWrapper = styled.div`
    width: 100%;
    margin: auto;
    padding: 20px; /* Default padding for mobile */
    @media (min-width: 640px) {
      padding: 40px; /* For tablets and up */
    }
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
      .replace(/([A-Z])/g, " $1")
      .replace(/[_-]/g, " ")
      .trim()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const Template1 = ({ data = {}, style }) => {
    if (!data || Object.keys(data).length === 0) {
      return (
        <div className="flex w-full h-screen md:h-[80vh] lg:h-[70vh]">
          <ResumeSkeloton />
        </div>
      );
    }

    return (
      <ResumeWrapper style={style}>
        {/* Header Section */}
        {data.personalInformation && (
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wide">
              {data.personalInformation.firstName || "First Name"}{" "}
              {data.personalInformation.lastName || "Last Name"}
            </h1>
            <div className="text-sm sm:text-base text-gray-600 flex flex-wrap justify-center items-center gap-2 py-2">
              <FaPhoneAlt />
              <span>{data.personalInformation.phoneNumber || "Phone"}</span>
              <IoMailSharp />
              <span>{data.personalInformation.email || "Email"}</span>
              {data.contactDetails?.linkedInUrl && (
                <div className="flex items-center gap-2">
                  <GrLinkedin />
                  <a
                    href={data.contactDetails.linkedInUrl}
                    className="text-blue-500 underline"
                  >
                    LinkedIn <span className="text-black">|</span>
                  </a>
                </div>
              )}
              {data.contactDetails?.githubUrl && (
                <div className="flex items-center gap-2">
                  <BsGithub />
                  <a
                    href={data.contactDetails.githubUrl}
                    className="text-blue-500 underline"
                  >
                    GitHub
                  </a>
                </div>
              )}
            </div>
            <Divider />
          </div>
        )}

        {/* Other Details (Summary & Expertise) */}
        {data.otherDetails && (
          <Section>
            {data.otherDetails.summary && (
              <>
                <SectionTitle>Summary</SectionTitle>
                <p className="text-gray-700 text-sm sm:text-base">
                  {data.otherDetails.summary}
                </p>
                <Divider />
              </>
            )}
            {data.otherDetails.expertise && (
              <>
                <SectionTitle>Expertise</SectionTitle>
                <p className="text-gray-700 text-sm sm:text-base">
                  {data.otherDetails.expertise.join(", ")}
                </p>
                <Divider />
              </>
            )}
          </Section>
        )}

        {/* Dynamic Sections */}
        {Object.entries(data).map(([sectionKey, sectionValue]) => {
          if (
            sectionKey === "personalInformation" ||
            sectionKey === "contactDetails" ||
            sectionKey === "otherDetails"
          )
            return null;

          return (
            <Section key={sectionKey}>
              <SectionTitle>{formatLabel(sectionKey)}</SectionTitle>
              {/* Handle string values */}
              {typeof sectionValue === "string" && (
                <p className="text-gray-700 text-sm sm:text-base">{sectionValue}</p>
              )}
              {/* Handle objects */}
              {typeof sectionValue === "object" &&
                !Array.isArray(sectionValue) && (
                  <div className="pl-4">
                    {Object.entries(sectionValue).map(([key, value]) => (
                      <p key={key} className="text-gray-700 text-sm sm:text-base">
                        <b>{formatLabel(key)}:</b>{" "}
                        {Array.isArray(value) ? value.join(", ") : value}
                      </p>
                    ))}
                  </div>
                )}
              {/* Handle arrays */}
              {Array.isArray(sectionValue) && sectionValue.length > 0 && (
                <div className="space-y-3">
                  {sectionValue.map((item, index) => (
                    <div key={index} className="mb-3">
                      {sectionKey === "educationDetails" ? (
                        <div className="text-left">
                          <p className="font-bold text-sm sm:text-base">
                            {item.data.qualification}
                          </p>
                          <p className="italic text-gray-600 text-xs sm:text-sm">
                            {item.data.college}, {item.data.collegeCity}
                          </p>
                          <p className="text-gray-700 text-xs sm:text-sm">
                            {item.data.joiningYear} - {item.data.completionYear}
                          </p>
                        </div>
                      ) : (
                        <div className="text-left">
                          <p className="font-bold text-sm sm:text-base">
                            {item.designation || item.name || item.title}
                          </p>
                          {item.organisation && (
                            <p className="italic text-gray-600 text-xs sm:text-sm">
                              {item.organisation}, {item.city}
                            </p>
                          )}
                          {item.from && item.to && (
                            <p className="text-gray-700 text-xs sm:text-sm">
                              {item.from} - {item.to}
                            </p>
                          )}
                          {item.description && (
                            <p className="text-gray-700 text-xs sm:text-sm">
                              {item.description}
                            </p>
                          )}
                          {item.skills && (
                            <p className="text-gray-700 text-xs sm:text-sm">
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

        {/* Achievements & Extra Curricular */}
        {data.otherDetails && (
          <Section>
            {data.otherDetails.achievements && (
              <>
                <SectionTitle>Achievements</SectionTitle>
                <p className="text-gray-700 text-sm sm:text-base">
                  {data.otherDetails.achievements.join(", ")}
                </p>
                <Divider />
              </>
            )}
            {data.otherDetails.extraCurricular && (
              <>
                <SectionTitle>Extra Curricular</SectionTitle>
                <p className="text-gray-700 text-sm sm:text-base">
                  {data.otherDetails.extraCurricular.join(", ")}
                </p>
                <Divider />
              </>
            )}
          </Section>
        )}
      </ResumeWrapper>
    );
  };

  export default Template1;
