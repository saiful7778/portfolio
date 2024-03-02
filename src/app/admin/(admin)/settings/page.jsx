import { connectToDB } from "@/lib/server-helper";
import SettingsForm from "./SettingsForm";
import prisma from "../../../../../prisma";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Settings - admin - portfolio",
  description: "This is settings page of Saiful Islam portfolio website.",
};

async function getSettings() {
  try {
    await connectToDB();
    const settings = await prisma.settings.findMany();
    if (!settings) {
      throw new Error("No data available");
    }
    return settings;
  } catch (err) {
    throw new Error(err);
  } finally {
    await prisma.$disconnect();
  }
}

const SettingsPage = async () => {
  const settings = await getSettings();

  return <SettingsForm initialData={settings[0]} />;
};

export default SettingsPage;
