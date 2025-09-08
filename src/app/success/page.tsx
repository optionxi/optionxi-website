"use client";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function SuccessContent() {
  const searchParams = useSearchParams();

  const broker = searchParams.get("broker");
  // const suid = searchParams.get("suid"); // 🔒 Debug only
  const userId = searchParams.get("user_id");
  const userName = searchParams.get("user_name");

  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown === 0) safeClose();
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const safeClose = () => {
    if (typeof window !== "undefined") {
      window.open("", "_self");
      window.close();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
      >
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>

        <h1 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
          Connection Successful ✅
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Your account is now connected with{" "}
          <span className="font-semibold">{broker}</span>.
        </p>

        <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 text-left">
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">User ID:</span> {userId}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">User Name:</span> {userName}
          </p>
        </div>

        <div className="mt-6">
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 5, ease: "linear" }}
            className="h-1 bg-green-500 rounded-full"
          />
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            Closing in {countdown} seconds...
          </p>
        </div>

        <motion.button
          onClick={safeClose}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full mt-6 bg-green-500 text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-green-600 transition"
        >
          Close Now
        </motion.button>
      </motion.div>
    </div>
  );
}

// 🔹 Skeleton Fallback
function SuccessSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="flex justify-center mb-4">
          <Skeleton className="w-16 h-16 rounded-full" />
        </div>
        <Skeleton className="h-6 w-3/4 mx-auto mb-4" />
        <Skeleton className="h-4 w-2/3 mx-auto mb-6" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <Skeleton className="h-10 w-full mt-6 rounded-xl" />
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<SuccessSkeleton />}>
      <SuccessContent />
    </Suspense>
  );
}
