"use client";

export default async function reCaptcha(recaptchaToken: string) {
  try {
    const res = await fetch("/api/captcha/verify", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ captchaValue: recaptchaToken }),
    });

    const data = await res.json();

    if (!data?.success) {
      throw new Error("Invalid reCaptcha!");
    }
    return true;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
}
