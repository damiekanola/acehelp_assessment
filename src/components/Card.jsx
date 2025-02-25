const Card = ({ title, completed, user, email }) => {
  return (
    <div
      className={`rounded-lg w-full p-2 bg-[#E0EBDD] flex flex-col justify-between  ${
        completed && "opacity-60"
      }`}
    >
      <p
        className={` text-base font-medium sm:text-lg md:text-xl ${
          completed && "line-through"
        }`}
      >
        {title}
      </p>
      <div className=" mt-5 text-sm sm:text-base flex flex-col gap-2">
        <p>{completed ? "✅Completed" : "⏳Pending"}</p>
        <p>Assigned to: <span className=" font-medium">{user}</span></p>
        <p className=" break-words">Email: {email}</p>
      </div>
    </div>
  );
};

export default Card;
