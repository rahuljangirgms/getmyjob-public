// Put this in a shared utils folder, e.g. "utils/experienceUtils.js"

/**
 * Given an array of experience items [{from, to, ...}],
 * returns an object with:
 *   totalMonths,
 *   totalYearsFloat,
 *   totalDuration: "X years Y months"
 */
export function calculateTotalExperience(experienceArray) {
    if (!experienceArray || experienceArray.length === 0) {
      return { totalMonths: 0, totalYearsFloat: 0, totalDuration: "", overallRange: "" };
    }
  
    let totalMonths = 0;
    let earliestStart = null;
    let latestEnd = null;
  
    experienceArray.forEach((exp) => {
      const startDate = new Date(exp.from);
      const endDate = (exp.to || "").toLowerCase() === "present"
        ? new Date()
        : new Date(exp.to);
  
      // Track earliest & latest
      if (!earliestStart || startDate < earliestStart) {
        earliestStart = startDate;
      }
      if (!latestEnd || endDate > latestEnd) {
        latestEnd = endDate;
      }
  
      // Convert the difference into months
      const months =
        (endDate.getFullYear() - startDate.getFullYear()) * 12 +
        (endDate.getMonth() - startDate.getMonth());
      totalMonths += months;
    });
  
    // Convert totalMonths -> X years Y months
    const years = Math.floor(totalMonths / 12);
    const leftoverMonths = totalMonths % 12;
    const totalDuration = `${years} years${leftoverMonths ? ` ${leftoverMonths} months` : ""}`;
  
    // For floating years (like 5.1):
    const totalYearsFloat = totalMonths / 12;
  
    const overallRange = earliestStart
      ? `From ${earliestStart.toLocaleDateString()} to ${latestEnd.toLocaleDateString()}`
      : "";
  
    return {
      totalMonths,
      totalYearsFloat,
      totalDuration,
      overallRange,
    };
  }
  