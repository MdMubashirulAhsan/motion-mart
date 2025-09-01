// "use client";
// import { useState } from "react";
// import toast from "react-hot-toast";

// export default function UsersList({ users }) {
//   const [loadingId, setLoadingId] = useState(null);

//   const makeAdmin = async (id) => {
//     setLoadingId(id);
//     try {
//       const res = await fetch(`/api/users/${id}/role`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ role: "admin" }),
//       });

//       if (res.ok) {
//         toast.success("User promoted to Admin ✅");
//       } else {
//         toast.error("Failed to update role");
//       }
//     } catch (err) {
//       toast.error("Something went wrong");
//     } finally {
//       setLoadingId(null);
//     }
//   };

//   return (
//     <table className="min-w-full border">
//       <thead>
//         <tr>
//           <th className="p-2 border">Name</th>
//           <th className="p-2 border">Email</th>
//           <th className="p-2 border">Role</th>
//           <th className="p-2 border">Action</th>
//         </tr>
//       </thead>
//       <tbody>
//         {users.map((user) => (
//           <tr key={user._id}>
//             <td className="p-2 border">{user.name}</td>
//             <td className="p-2 border">{user.email}</td>
//             <td className="p-2 border">{user.role}</td>
//             <td className="p-2 border">
//               {user.role !== "admin" ? (
//                 <button
//                   onClick={() => makeAdmin(user._id)}
//                   disabled={loadingId === user._id}
//                   className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
//                 >
//                   {loadingId === user._id ? "..." : "Make Admin"}
//                 </button>
//               ) : (
//                 <span className="text-green-600 font-semibold">Admin</span>
//               )}
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }
