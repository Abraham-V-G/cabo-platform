import { notFound } from "next/navigation";
import { tours } from "@/lib/tours";
import BookingForm from "@/components/BookingForm";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BookPage({ params }: Props) {
  const { slug } = await params;

  const tour = tours.find((t) => t.slug === slug);

  if (!tour) return notFound();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">{tour.name}</h1>
      <p className="text-zinc-400 mb-6">{tour.description}</p>

      <BookingForm tour={tour} />
    </div>
  );
}