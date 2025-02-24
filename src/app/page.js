import { useSession } from "next-auth/react";
import { useEffect } from "react";
import LoginForm from "@/components/Auth/LoginForm";
import RegisterForm from "@/components/Auth/RegisterForm";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  if (status === "loading") {
    return <p>Loading...</p>; // لودینگ صفحه
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">رجیستری هدایا</h1>
            <p className="mt-2 text-gray-600">
              لیست هدایای مورد علاقه خود را بسازید و با دوستان خود به اشتراک بگذارید
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-4">ورود</h2>
              <LoginForm />
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-4">ثبت‌نام</h2>
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
