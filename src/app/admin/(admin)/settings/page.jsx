import dbRead from "@/db/dbRead";
import SettingsForm from "./SettingsForm";

export const metadata = {
  title: "Settings - admin - portfolio",
  description: "This is settings page of Saiful Islam portfolio website.",
};

const SettingsPage = () => {
  const initialData = dbRead();
  return <SettingsForm initialData={initialData} />;
};

export default SettingsPage;
