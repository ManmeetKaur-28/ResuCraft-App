import React from "react";

function AnalysisList({ analytics, _id, changeState }) {
  return (
    <div className="bg-linear-to-br from-blue-50 to-blue-100 min-h-50 rounded-xl p-4 my-6 shadow-md">
      {/* Header */}
      <div className="bg-[#050722]/90 text-white rounded-xl p-4 text-center shadow-sm">
        <h1 className="font-['Unna'] text-xl font-semibold tracking-wide">
          Analysis Archive
        </h1>
      </div>

      {/* List */}
      <div className="bg-gray-100 my-3 rounded-xl min-h-25 p-3 border-2 border-blue-300">
        {analytics && analytics.length > 0 ? (
          <ul className="space-y-3">
            {analytics.map((item) => (
              <li
                onClick={() => changeState(item._id)}
                key={item.createdAt}
                className="cursor-pointer px-4 py-3 rounded-lg bg-white shadow-sm hover:shadow-md hover:bg-blue-100 transition duration-200 flex flex-col border border-blue-200"
              >
                <span className="font-['Unna'] text-lg font-semibold text-blue-900">
                  Role: {item.role}
                </span>
                <span className="text-base text-gray-600 font-sans">
                  On: {new Date(item.createdAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center font-sans text-base mt-4 text-gray-600">
            No resume report available <br />{" "}
            <span className="font-['Unna'] text-lg text-blue-700 font-semibold">
              Create one today.
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default AnalysisList;
