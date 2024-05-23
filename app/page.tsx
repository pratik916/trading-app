import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      Trading App
      <Link href="/login"> Login to start trading</Link>
    </main>
  );
}
