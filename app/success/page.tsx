export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      <div className="max-w-lg text-center bg-neutral-900 p-10 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-green-400">
          🎉 Payment Successful!
        </h1>

        <p className="mb-6 text-gray-300">
          Your reservation has been confirmed.
          A confirmation email has been sent to you.
        </p>

        <a
          href="/"
          className="inline-block bg-white text-black px-6 py-3 rounded-xl font-semibold hover:opacity-80 transition"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}