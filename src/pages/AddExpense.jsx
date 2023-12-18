import { Container , ExpenseForm } from "../components";

export default function AddExpense(){
    return (
        <div className="py-8">
          <Container>
            <ExpenseForm />
          </Container>
        </div>
      ); 
}