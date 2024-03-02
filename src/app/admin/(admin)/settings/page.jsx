import SettingsForm from "./SettingsForm";
import readData from "@/lib/settings/read";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Settings - admin - portfolio",
  description: "This is settings page of Saiful Islam portfolio website.",
};

const SettingsPage = async () => {
  const settings = await readData();

  return <SettingsForm initialData={settings} />;
};

export default SettingsPage;
