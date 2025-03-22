import Card from "./Card";

export default function DashboardCard({ title, value }) {
  return (
    <Card className="text-center">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </Card>
  );
}
