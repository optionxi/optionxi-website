"use client";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function FailContent() {
  const searchParams = useSearchParams();

  const broker = searchParams.get("broker");
  const error = searchParams.get("error");
  // const suid = searchParams.get("suid"); // 🔒 Debug only

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-rose-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
      >
        <div className="flex justify-center mb-4">
          <XCircle className="w-16 h-16 text-red-500" />
        </div>

        <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
          Connection Failed ❌
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Could not connect with{" "}
          <span className="font-semibold">{broker}</span>.
        </p>

        <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-4 text-left">
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Error:</span> {error}
          </p>
        </div>

        <div className="mt-6">
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 5, ease: "linear" }}
            className="h-1 bg-red-500 rounded-full"
          />
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            Closing in {countdown} seconds...
          </p>
        </div>

        <motion.button
          onClick={safeClose}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full mt-6 bg-red-500 text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-red-600 transition"
        >
          Close Now
        </motion.button>
      </motion.div>
    </div>
  );
}

// 🔹 Skeleton Fallback
function FailSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-rose-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="flex justify-center mb-4">
          <Skeleton className="w-16 h-16 rounded-full" />
        </div>
        <Skeleton className="h-6 w-3/4 mx-auto mb-4" />
        <Skeleton className="h-4 w-2/3 mx-auto mb-6" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-10 w-full mt-6 rounded-xl" />
      </div>
    </div>
  );
}

export default function FailPage() {
  return (
    <Suspense fallback={<FailSkeleton />}>
      <FailContent />
    </Suspense>
  );
}
