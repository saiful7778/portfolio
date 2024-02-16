import dbRead from "@/db/dbRead";
import SettingsForm from "./SettingsForm";
import { revalidatePath } from "next/cache";

export const metadata = {
  title: "Settings - admin - portfolio",
  description: "This is settings page of Saiful Islam portfolio website.",
};

const SettingsPage = () => {
  revalidatePath("/admin/settings");
  const initialData = dbRead();
  return <SettingsForm initialData={initialData} />;
};

export default SettingsPage;
