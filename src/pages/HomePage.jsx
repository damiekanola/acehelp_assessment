import Navbar from "../components/Navbar";
import Card from "../components/Card";
import useDebounce from "../hooks/Debounce";
import { useEffect, useState, useMemo } from "react";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [task, setTasks] = useState([]);
 
  const [selectedStatus, setSelectedStatus] = useState("");
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500); 
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 20; //number of to-dos shown per page

  //     setLoading(true);
  //     fetch("https://jsonplaceholder.typicode.com/todos/")
  //       .then((response) => response.json())
  //       .then((todos) => {
  //         fetch("https://jsonplaceholder.typicode.com/users/")
  //           .then((res) => res.json())
  //           .then((users) => {
  //             const mergedList = todos.map((todo) => {
  //               const taskOwner = users.find((user) => user.id === todo.userId);
  //               return {
  //                 ...todo,
  //                 userName: taskOwner ? taskOwner.name : "Unknown User",
  //               };
  //             });
  //             setTasks(mergedList);
  //             setFilteredTasks(mergedList);
  //           });
  //           .catch((error) => {
  //             console.error("Error fetching users:", error);
  //           });
  //         })
  //         .catch((error) => {
  //           console.error("Error fetching todos:", error);
  //         })
  //         .finally(() => setLoading(false)); // Ensure loading state updates even if an error occur

  //       });
  //   }, []);

  useEffect(() => {
    setLoading(true);

    Promise.all([
      fetch("https://jsonplaceholder.typicode.com/todos/").then((res) =>
        res.json()
      ),
      fetch("https://jsonplaceholder.typicode.com/users/").then((res) =>
        res.json()
      ), // fetch the todos and users data
    ])
      .then(([todos, users]) => {
        const mergedList = todos.map((todo) => {
          const taskOwner = users.find((user) => user.id === todo.userId);
          return {
            ...todo,
            userName: taskOwner ? taskOwner.name : "User not found!",
            email: taskOwner ? taskOwner.email : "Email not found!",
          }; // create a new object with the tasks from the tasks data and then adding information about the user of the tasks
        });
        setTasks(mergedList);
     
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => setLoading(false)); // Ensure loading state is updated
  }, []);



  const filteredTasks = useMemo(() => {
    let filtered = [...task];

    if (selectedStatus) {
      filtered = filtered.filter((item) =>
        selectedStatus === "completed" ? item.completed : !item.completed
      );
    }

    if (debouncedQuery.trim() !== "") {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          item.userName.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          item.email.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
    }

    setCurrentPage(1); // Reset pagination on filter change
    return filtered;
  }, [task, selectedStatus, debouncedQuery]); // Dependencies

  //logic to handle pagination
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  return (
    <>
      <Navbar setQuery={setQuery} query={query} />
      <div className=" p-5">
        <div className=" w-fit mb-5 ml-auto flex gap-2">
          <label htmlFor="filter">Filter By</label>
          <select
            name="filter"
            id="filter"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border rounded-sm"
          >
            <option value="">All tasks</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
        </div>
        {loading ? (
          <h1 className=" text-xl flex items-center justify-center font-semibold">
            LOADING TASKS...
          </h1>
        ) : (
          <div className=" flex flex-col justify-between h-full">
            <div className=" grid grid-cols-2 gap-6 md:grid-cols-3 sm:grid-cols-3 lg:grid-cols-4">
              {currentTasks.map((todo) => (
                <Card
                  key={todo.id}
                  title={todo.title}
                  completed={todo.completed}
                  user={todo.userName}
                  email={todo.email}
                />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-6">
                <button
                  className="px-4 py-2 mx-1 bg-gray-200 rounded disabled:opacity-50"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  Previous
                </button>

                <span className="px-4">{`Page ${currentPage} of ${totalPages}`}</span>

                <button
                  className="px-4 py-2 mx-1 bg-gray-200 rounded disabled:opacity-50"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
