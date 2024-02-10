import Alert from "@/config/alert.config";

export default async function reCaptcha(recaptchaRef, confirmCaptcha) {
  const captchaValue = recaptchaRef.current.getValue();
  if (!captchaValue) {
    Alert.fire({
      icon: "warning",
      text: "Please verify the reCAPTCHA!",
    });
    confirmCaptcha();
    return false;
  }
  try {
    const res = await fetch("/captcha/verify", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ captchaValue }),
    });
    const data = await res.json();
    if (data?.success) {
      return true;
    } else {
      Alert.fire({
        icon: "error",
        text: "Invalid reCaptcha!",
      });
      return false;
    }
  } catch (err) {
    throw new Error(err);
  }
}
