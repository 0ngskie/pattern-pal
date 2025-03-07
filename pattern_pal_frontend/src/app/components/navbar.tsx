import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-800 text-white p-4 shadow-md sticky top-0">
      <ul className="flex justify-end space-x-4 w-full">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/register">Register</Link></li>
        <li><Link href="/login">Log-In</Link></li>
      </ul>
    </nav>
  );
}