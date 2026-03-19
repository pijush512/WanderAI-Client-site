import Banner from "@/src/components/Banner";

export default function Home() {
  return (
    <div>
      <Banner></Banner>

      <div className="h-40 w-full flex items-center justify-center bg-blue-100 dark:bg-blue-900 transition-all">
  <p className="text-blue-900 dark:text-blue-100 font-bold text-2xl">
    {/* লাইট মোডে এটি নীল দেখাবে, ডার্ক মোডে এটি আকাশী নীল দেখাবে */}
    WanderAI Theme Test
  </p>
</div>
    </div>
  );
}
