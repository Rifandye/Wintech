"use client";

import Image from "next/image";
import axios from "axios";
import { useEffect, useState, useRef, useCallback } from "react";

type ImageType = {
  id: number;
  name: string;
  url: string;
};

export default function GalleryPage() {
  const [images, setImages] = useState<ImageType[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const limit = 20;
  const loader = useRef<HTMLDivElement | null>(null);

  const fetchImages = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:3000/image?limit=${limit}&offset=${offset}`
      );
      const newImages = res.data;
      setImages((prev) => [...prev, ...newImages]);
      setOffset((prev) => prev + newImages.length);
      setHasMore(newImages.length === limit);
    } catch {
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [offset, loading, hasMore]);

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loader.current) return;
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading) {
        fetchImages();
      }
    };
    const option = { root: null, rootMargin: "20px", threshold: 0 };
    const observer = new window.IntersectionObserver(handleObserver, option);
    observer.observe(loader.current);
    return () => observer.disconnect();
  }, [fetchImages, hasMore, loading]);

  return (
    <main className="min-h-screen bg-white w-full p-8">
      <h1 className="text-4xl font-bold text-center mb-10">Picture Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-items-center">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative w-64 h-64 rounded-2xl overflow-hidden shadow-lg bg-gray-200 flex items-center justify-center group"
          >
            <Image
              src={img.url}
              alt={img.name}
              width={256}
              height={256}
              className="object-cover w-full h-full group-hover:opacity-80 transition duration-200"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-200">
              <span className="text-white text-lg font-semibold mb-2 drop-shadow-md">
                {img.name}
              </span>
              <span className="text-white text-sm drop-shadow-md">
                {img.url}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div
        ref={loader}
        className="w-full flex justify-center items-center mt-8"
        style={{ minHeight: 40 }}
      >
        {loading && <span className="text-gray-500">Loading...</span>}
        {!hasMore && <span className="text-gray-400">No more images</span>}
      </div>
    </main>
  );
}
