import React, { useEffect, useMemo } from "react";
import { BriefcaseBusiness } from "lucide-react";
import { File } from "lucide-react";
import { UserSearch } from "lucide-react";
import { FileBadge } from "lucide-react";
import { Star } from "lucide-react";
import { Sparkles } from "lucide-react";
import { ListCheck } from "lucide-react";
import { IoSparklesSharp } from "react-icons/io5";
import { ArrowDownToLine } from "lucide-react";
import {
  getResumeByIdRequest,
  getResumeAnalysisRequest,
} from "./../../../store/slices/jobSeeker/resume_Analyze/resumeAnalyzeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AIResumeAnalysisSkeleton from "./../../../components/JobSeekerComponents/ReusableComponents/AIResumeAnalysisSkeleton";

function ResumeAnalyzer() {
  // get resume by id State

  const resumeData = useSelector((state) => state.resumeAnalyzer.resume);

  const analysisData = useSelector((state) => state.resumeAnalyzer.analysis);

  const resumeName = useSelector((state) => state.resumeAnalyzer.resumeName);

  console.log("Analysis Data: ", analysisData);

  const parsedAnalysis = useMemo(() => {
    try {
      const text = analysisData.analysis || "";
  
      const getSection = (label) => {
        const pattern = new RegExp(`${label}:\\n([\\s\\S]*?)(?=\\n\\w|\\n[A-Z]|$)`, 'g');
        const match = pattern.exec(text);
        if (!match) return [];
        return match[1]
          .trim()
          .split("\n")
          .filter((line) => line.trim().length > 0);
      };
  
      return {
        resumeTitle: getSection("Resume Title"),
        summary: getSection("Professional Summary"),
        suggestedRoles: getSection("Suggested Job Role"),
        additionalSkills: getSection("Additional Skills to Learn"),
        rating: getSection("Resume Rating"),
        improvements: getSection("Resume Improvement"),
        grammar: getSection("Grammar Check"),
      };
    } catch (e) {
      console.error("Failed to parse analysis:", e);
      return {};
    }
  }, [analysisData]);
  

  console.log("analysis: ", analysisData);

  const resByIdLoading = useSelector((state) => state.resumeAnalyzer.loading);
  const analysisLoading = useSelector((state) => state.resumeAnalyzer.loading);

  const { id, bash_id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getResumeByIdRequest({ id, bash_id }));

    dispatch(getResumeAnalysisRequest({ id, bash_id }));
  }, [dispatch]);

  //Section Component

  function Section({ title, icon, data }) {
    if (!data?.length) return null;
    return (
      <div className="py-2">
        <div className="flex flex-row gap-2 items-center">
          {icon}
          <h1 className="text-lg font-semibold py-2">{title}</h1>
        </div>
        <ul className="space-y-1 text-gray-600">
          {data.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div> 
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 mt-10 md:mt-16 h-lvh no-scrollbar bg-gradient-to-tr from-sky-200 to-purple-400">
      <div className="flex-1 mx-6 my-6 rounded-md p-6">
        <div className="flex flex-row  items-center justify-end">
          <div className=" flex items-center">
            <button
              type="button"
              class="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2 gap-1"
            >
              <ArrowDownToLine size={18} />
              Download Report
            </button>
          </div>
        </div>

        {resByIdLoading || analysisLoading ? (
          <AIResumeAnalysisSkeleton />
        ) : (
          <div className="mx-36 bg-white p-6 my-6 rounded-xl shadow-2xl">
            <div className="flex gap-1 justify-center">
              <IoSparklesSharp size={30} className="text-yellow-500" />
              <h1 className="text-center text-3xl font-semibold">
                AI Analysis - {resumeName}
              </h1>
            </div>

            {/* Resume Title */}
            <Section
              title=" Resume Title"
              icon={<File size={20} />}
              data={parsedAnalysis.resumeTitle}
            />

            {/* Summary */}
            <Section
              title="Professional Summary"
              icon={<BriefcaseBusiness size={20} />}
              data={parsedAnalysis.summary}
            />

            {/* Suggested Roles */}
            <Section
              title="Suggested Job Roles"
              icon={<UserSearch size={20} />}
              data={parsedAnalysis.suggestedRoles}
            />

            {/* Additional Skills */}
            <Section
              title="Additional Skills to Learn"
              icon={<FileBadge size={20} />}
              data={parsedAnalysis.additionalSkills}
            />

            {/* Resume Rating */}
            <Section
              title="Resume Rating"
              icon={<Star size={20} />}
              data={parsedAnalysis.rating}
            />

            {/* Resume Improvement */}
            <div className="py-2">
              <div className="flex flex-row gap-2 items-center">
                <Sparkles size={20} />
                <h1 className="text-lg font-semibold py-2">
                  Resume Improvement Suggestions
                </h1>
              </div>
              {parsedAnalysis.improvements?.map((line, index) => {
                const [title, ...rest] = line.split(":");
                return (
                  <div key={index} className="pb-2">
                    <ul className="space-y-1 text-gray-700 font-semibold">
                      <li>{title}</li>
                    </ul>
                    {rest.length > 0 && (
                      <p className="text-gray-600 ps-6">
                        {rest.join(":").trim()}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Grammar Check */}
            <Section
              title="Grammar Check"
              icon={<ListCheck size={20} />}
              data={parsedAnalysis.grammar}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeAnalyzer;
