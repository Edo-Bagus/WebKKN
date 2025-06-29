import Link from "next/link";

export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
        <h1 className="text-4xl font-bold">404 - Not Found</h1>
        <p className="text-lg mt-2">We can&apos;t seem to find the page you&apos;re looking for.</p>
        <Link href="/" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Go to Home
        </Link>
      </div>
    );
  }
  