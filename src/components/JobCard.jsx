export default function JobCard({ title, company, location, salary }) {
    return (
        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition duration-200">
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
            <p className="text-gray-600">{company}</p>
            <p className="text-gray-500 text-sm mt-2">{location}</p>
            <p className="text-blue-700 font-semibold mt-3">{salary}</p>
            <button className="mt-4 bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800">
                Apply Now
            </button>
        </div>
    );
}
