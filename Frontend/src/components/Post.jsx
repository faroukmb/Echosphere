/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function Post({
  id,
  title,
  summary,
  cover,
  authorname,
}) {
  return (
    <div className=" w-1/2 bg-yellow-400 p-11 mt-10 mb-3">
      <Link to={`/post/${id}`} className=" mb-4">
        <img
          src={cover}
          className="object-cover rounded-md"
          alt=""
        />
      </Link>

      <div className="flex flex-col justify-between h-full mt-3">
        <Link to={`/post/${id}`}>
          <div>
            <h2 className="font-bold text-xl text-gray-800 line-clamp-2">
              {title}
            </h2>
          </div>
        </Link>

        <p className="text-sm text-gray-600 mt-2 line-clamp-3">{summary}</p>

        <div className="flex items-center justify-between mt-3">
          <span className="bg-black text-yellow-400 p-2 rounded-md text-sm">
            Author: {authorname}
          </span>
        </div>
      </div>
    </div>
  );
}