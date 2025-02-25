import { useSession } from "next-auth/react";
import { useEffect } from "react";
import LoginForm from "@/components/Auth/LoginForm";
import RegisterForm from "@/components/Auth/RegisterForm";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    try {
      if (session) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("خطا در redirect:", error);
    }
  }, [session, router]);
  
  if (status === "loading") {
    return <p>Loading...</p>; // لودینگ شدن
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900">خوش آمدید به ایما</h1>
          <p className="mt-2 text-gray-600">
            فهرست هدایای مورد علاقه خود را بسازید و با دوستان خود به اشتراک بگذارید
          </p>
          
          {/* اگر کاربر لاگین نیست، فرم لاگین را نمایش بده */}
          {!session && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold">ورود یا ثبت نام</h2>
              <div className="mt-4 space-y-4">
                <LoginForm />
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    حساب کاربری ندارید؟ <a href="#" className="text-blue-500 hover:underline">ثبت نام کنید</a>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
