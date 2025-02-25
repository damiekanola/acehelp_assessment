const Card = ({ title, completed, user }) => {
  return (
    <div className={`rounded-lg w-full p-2 bg-[#E0EBDD] flex flex-col justify-between ${completed && "opacity-60"}`}>
      <p className={`text-base ${completed && "line-through"}`}>{title}</p>
      <div className=" mt-3">
        <p>{completed ? "✅Completed" : "⏳Pending"}</p>
        <p>Assigned to: {user}</p>
      </div>
    </div>
  );
};

export default Card;
