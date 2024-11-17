import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center h-lvh flex-col">
      <h2 className="text-2xl">
        404 <span className="text-white text-opacity-50"> | </span>
        <p className="inline text-sm text-opacity-80 text-white">Could not find requested resource</p>
      </h2>

      <Link href="google.com" className="text-blue-600">
        Return Home
      </Link>
    </div>
  );
}
 