import getSettings from "@/lib/data/getSettings";
import SettingsForm from "./SettingsForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Settings - admin - portfolio",
  description: "This is settings page of Saiful Islam portfolio website.",
};

const SettingsPage = async () => {
  const settings = await getSettings();

  return <SettingsForm initialData={settings} />;
};

export default SettingsPage;
