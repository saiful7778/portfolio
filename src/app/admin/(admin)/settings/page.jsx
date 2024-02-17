import SettingsForm from "./SettingsForm";
import ErrorDataShow from "@/components/ErrorDataShow";
import prisma from "../../../../../prisma";
import { connectToDB } from "@/lib/server-helper";

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
      return {
        success: false,
        message: "No data available",
      };
    }
    return {
      success: true,
      data: settings,
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: err,
    };
  } finally {
    await prisma.$disconnect();
  }
}

const SettingsPage = async () => {
  const res = await getSettings();
  if (!res.success) {
    return <ErrorDataShow error={res?.message} />;
  }
  const { data } = res;
  return <SettingsForm initialData={data[0]} />;
};

export default SettingsPage;
