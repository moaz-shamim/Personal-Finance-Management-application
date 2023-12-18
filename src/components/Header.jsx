import { Container } from "./index";
import { useNavigate } from "react-router-dom";
export default function Header() {

  const navigate = useNavigate();

  return (
    <Container>

      <header class="header sticky top-0 bg-white shadow-md flex items-center justify-between px-8 py-02">
        {/* <!-- logo --> */}
        <div class="flex items-center">
          <span class="ml-2 font-semibold text-[#252C32]">
            EXPENSE MANAGER
          </span>
        </div>

        <input
          type="text"
          class="w-1/3 rounded-md border border-[#DDE2E4] px-3 py-2 text-sm"
          value="Search Expense by Name"
        />

        {/* <!-- buttons ---> */}
        <div class="w-3/12 flex justify-end m-2">
          <button 
           onClick={() => navigate("/add-expense")}
          class="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md border py-2 px-4 hover:bg-green-300">
            <span class="text-sm font-medium ">+ Create Expense</span>
          </button>
        </div>
      </header>
      
    </Container>
  );
}
