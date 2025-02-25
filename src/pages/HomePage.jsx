import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [task, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [query, setQuery] = useState("")

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/")
      .then((response) => response.json())
      .then((todos) => {
        fetch("https://jsonplaceholder.typicode.com/users/")
          .then((res) => res.json())
          .then((users) => {
            const mergedList = todos.map((todo) => {
              const taskOwner = users.find((user) => user.id === todo.userId);
              return {
                ...todo,
                userName: taskOwner ? taskOwner.name : "Unknown User",
              };
            });
            setTasks(mergedList);
            setFilteredTasks(mergedList);
          });
      });
  }, []);

  useEffect(() => {
    let filtered = [...task];
    if (selectedStatus) {
      filtered = task.filter((item) =>
        selectedStatus === "completed" ? item.completed : !item.completed
      );
    }

    if (query.trim() !== "") {
        filtered = filtered.filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.userName.toLowerCase().includes(query.toLowerCase())
        );
      }
    setFilteredTasks(filtered);
  }, [selectedStatus, task, query]);

  return (
    <div>
      <Navbar setQuery={setQuery} query={query}/>
      <div className=" p-5">
        <div className=" w-fit flex justify-end">
          <label htmlFor="filter">Filter By</label>
          <select
            name="filter"
            id="filter"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">All tasks</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
        </div>

        <div className=" grid grid-cols-2 gap-6 md:grid-cols-3 sm:grid-cols-3 lg:grid-cols-4">
          {filteredTasks.map((todo) => (
            <Card
              key={todo.id}
              title={todo.title}
              completed={todo.completed}
              user={todo.userName}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
