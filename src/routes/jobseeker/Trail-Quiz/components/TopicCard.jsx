export default function TopicCard({ topic, isSelected, onSelect }) {
    return (
      <div
        className={`flex flex-row items-center justify-center gap-3 p-4 rounded-md shadow-md cursor-pointer hover:scale-105 transition-transform ${topic.color} ${isSelected ? "border-2 border-purple-500" : ""}`}
        onClick={() => onSelect(topic.id)}
      >
        <div className="text-3xl">{topic.icon}</div>
        <div className="text-lg font-medium">{topic.name}</div>
      </div>
    )
  }