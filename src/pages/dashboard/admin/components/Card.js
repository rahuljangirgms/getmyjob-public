export default function Card({ children, className }) {
  return (
    <div className={`bg-gray-100 dark:bg-gray-800  p-4 shadow-md rounded-lg ${className}`}>
      {children}        
    </div>
  );
}
