

const Navbar = ({ setQuery, query }) => {
  return (
    <nav className=" flex items-center justify-between p-5 border-b">
      <p>TO-DO LIST</p>
      <div className=" rounded-md bg-[#E0EBDD] overflow-hidden border">
      <input type="text"placeholder="Search..." className=" bg-inherit focus:outline-none p-1"  onChange={(e) => setQuery(e.target.value)} value={query}/>
      </div>
    </nav>
  )
}

export default Navbar
