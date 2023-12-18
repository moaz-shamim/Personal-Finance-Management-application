import { Container, ExpenseForm } from "../components";
import databaseService from "../appwrite/dataBase";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EditExpense() {
  const [expense, setExpenses] = useState();
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      databaseService.getExpense(slug).then((expenseData) => {
        if (expenseData) {
          setExpenses(expenseData);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return expense ? (
    <div className="py-8">
      <Container>
        <ExpenseForm expense={expense} />
      </Container>
    </div>
  ) : null;
}
