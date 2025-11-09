export default function HeroSection() {
    return (
        <section className="bg-gradient-to-r from-blue-50 to-blue-100 pt-28 pb-16 text-center">
            <h1 className="text-5xl font-bold text-blue-800 mb-4">
                Find Your Dream Job
            </h1>
            <p className="text-gray-600 text-lg mb-8">
                Explore top opportunities, connect with employers, and grow your career.
            </p>
            <div className="flex justify-center gap-3 max-w-xl mx-auto">
                <input
                    type="text"
                    placeholder="Search jobs, titles, or keywords"
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-blue-600"
                />
                <button className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800">
                    Search
                </button>
            </div>
        </section>
    );
}
