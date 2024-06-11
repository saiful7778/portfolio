"use client";
import Spinner from "@/components/Spinner";
import Button from "@/components/ui/button";
import useToast from "@/hooks/useToast";
import verifyToken from "@/lib/actions/auth/verifyToken";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function VerifyButton({
  token,
  id,
}: {
  token: string;
  id: string;
}) {
  const [spinner, setSpinner] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleVerify = async (token: string, id: string) => {
    try {
      setSpinner(true);
      const res = await verifyToken(token, id);
      if (res?.isVerified) {
        toast({
          title: "Email is verified",
        });
        router.replace("/login");
      }
    } catch (err) {
      if (err instanceof Error) {
        toast({
          variant: "destructive",
          title: "Something went wrong!",
          description: err.message,
        });
      }
    } finally {
      setSpinner(false);
    }
  };
  return (
    <Button
      onClick={() => handleVerify(token, id)}
      className="w-full"
      size="lg"
      disabled={spinner}
    >
      {spinner ? <Spinner /> : "Click to Verify"}
    </Button>
  );
}
