import Image from "next/image";
import Search from "@/componentes/Search";
import Test from "@/componentes/Test";
import Final from "@/componentes/Final";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <Test /> */}
      {/* <Search /> */}
      <Final />
    </main>
  );
}
