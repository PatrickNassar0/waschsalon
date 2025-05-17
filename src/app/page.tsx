"use client"
import { Suspense } from 'react'
import Main from "./pages/main";

export default function Home() {
  
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[100dvh] bg-gray-100">Loading page...</div>}>
      <Main />
    </Suspense>
  );
}
