import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import databaseService from "../appwrite/dataBase";
export default function Entry({
  $id,
  name,
  category,
  date,
  amount,
  description,
  updatedAt,
  userName,
  author,
}) {


  // console.log(author);
  // console.log(userName);

  const deleteExpense = () => {
    databaseService.deleteExpense($id).then((status) => {
      if (status) {
        navigate("/");
      }
    });
  };

  return (
    <>
      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
        <div class="flex items-center">
          <div>
            <div class="text-sm leading-5 text-gray-800">{name}</div>
          </div>
        </div>
      </td>
      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
        <div class="text-sm leading-5 text-blue-900">{category}</div>
      </td>
      <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
        {date.slice(0, 10)}
      </td>
      <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
        {description}
      </td>
      <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
        {`INR ${amount}`}
      </td>
      <td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
        {updatedAt}
      </td>
      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
        {userName}
      </td>
      {author === userName ? (
        <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
          <Link to={`/edit-expense/${$id}`}>
            <button className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50">
              ✏️
            </button>
          </Link>

          <button
            className="inline-flex mx-1 w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
            onClick={deleteExpense}
          >
            ❌
          </button>
        </td>
      ) : null}
    </>
  );
}
