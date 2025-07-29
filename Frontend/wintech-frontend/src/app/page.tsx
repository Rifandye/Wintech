export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-6xl font-bold text-center mb-6">
          Welcome to Picture Gallery
        </h1>
        <p className="text-xl text-gray-500 text-center mb-10 max-w-2xl">
          Discover and explore beautiful images from around the world. Browse
          our curated collection of stunning photographs.
        </p>
        <div className="flex gap-4">
          <a
            href="/gallery"
            className="px-8 py-3 rounded-md bg-black text-white font-medium text-lg shadow hover:bg-gray-800 transition"
          >
            View Gallery
          </a>
          <a
            href="#"
            className="px-8 py-3 rounded-md bg-white border border-gray-200 text-black font-medium text-lg shadow hover:bg-gray-100 transition"
          >
            Learn More
          </a>
        </div>
      </div>
    </main>
  );
}
