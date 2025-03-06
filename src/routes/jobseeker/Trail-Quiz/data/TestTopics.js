import { FaReact, FaJs, FaPython, FaLightbulb, FaAngular, FaCss3Alt } from "react-icons/fa";
import { SiGatsby, SiDjango, SiKotlin, SiLaravel } from "react-icons/si";


const topics = [
    { id: 1, name: "React", icon: <FaReact className="text-black" />, color: "border-purple-500 bg-purple-100" },
    { id: 2, name: "JavaScript", icon: <FaJs className="text-black" />, color: "bg-yellow-100" },
    { id: 3, name: "Python", icon: <FaPython className="text-black" />, color: "bg-blue-100" },
    { id: 4, name: "Apptitude", icon: <FaLightbulb className="text-black" />, color: "bg-yellow-100" },
    { id: 5, name: "Gatsby", icon: <SiGatsby className="text-black" />, color: "bg-purple-100" },
    { id: 6, name: "Angular", icon: <FaAngular className="text-black" />, color: "bg-red-100" },
    { id: 7, name: "Django", icon: <SiDjango className="text-black" />, color: "bg-green-100" },
    { id: 8, name: "CSS", icon: <FaCss3Alt className="text-black" />, color: "bg-blue-100" },
    { id: 9, name: "Kotlin", icon: <SiKotlin className="text-black" />, color: "bg-purple-100" },
    { id: 10, name: "Laravel", icon: <SiLaravel className="text-black" />, color: "bg-red-100" },
];

export default topics;
