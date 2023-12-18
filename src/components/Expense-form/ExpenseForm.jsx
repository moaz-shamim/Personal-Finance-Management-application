import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select } from "../index";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import databaseService from "../../appwrite/dataBase";

export default function ExpenseForm({ expense }) {


  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      name: expense?.name || "",
      description: expense?.description || " ",
      amount: expense?.amount || " ",
      date: expense?.date || " ",
      category: expense?.category || "Education",
      slug : expense?.$id || "",
    },
  });

  const navigate = useNavigate();
  
  // Problem in Loading userData 
  const userData = useSelector((state) => state.auth.userData);

  
  const submit = async (data) => {

    
    if (expense) {

      const dbExpense = await databaseService.updateExpense(expense.$id, {
        ...data,
      });

      if (dbExpense) {
        navigate("/");
      }
    } else {
      const dbExpense = await databaseService.createExpense({
        ...data,
        userId: userData.$id,
        userName: userData.name,
      });

      if (dbExpense) {
        console.log(dbExpense);
        navigate("/");
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "name") {
        setValue("slug", slugTransform(value.name), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-1/2 px-2">
        <Input
          label="Name :"
          placeholder="Name the Expense"
          className="mb-4"
          {...register("name", { required: true })}
        />

        {/* <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        /> */}

        <Input
          label="Description :"
          placeholder="Describe the Expense"
          className="mb-4"
          {...register("description", { required: true })}
        />

        <Select
          options={[
            "Health",
            "Electronics",
            "Travel",
            "Education",
            "Books",
            "Others",
          ]}
          label="Category"
          className="mb-4"
          {...register("category", { required: true })}
        />

        <Input
          label="Date of Expense :"
          placeholder="Date of Expense(date-picker)"
          type="date"
          className="mb-4"
          {...register("date", { required: true })}
        />

        <Input
          label="Expense Amount :"
          placeholder="Expense Amount in INR"
          className="mb-4"
          {...register("amount", { required: true })}
        />

        <Button
          type="submit"
          bgColor={expense ? "bg-green-500" : undefined}
          className="w-full"
        >
          {expense ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
