import getServerUrl from "@/lib/getServerUrl";
const SettingsPage = () => {
  const url = getServerUrl();
  return <div>URL: {url}</div>;
};

export default SettingsPage;
