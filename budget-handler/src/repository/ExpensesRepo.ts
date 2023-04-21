import type { IExpenses } from "@/interfaces/IExpenses";
import axios from "axios";

export default class ExpensesRepo {
    private url = 'http://localhost:3000/expenses';

    public async getAllExpenses(): Promise<IExpenses[]> {
        const expenses: IExpenses[] = await axios({
            method: 'get',
            url: this.url,
        }).then((response) => {
            return response.data as IExpenses[];
        })
        return expenses;
    }

    public async getExpense(id: string): Promise<IExpenses> {
        const expense: IExpenses = await axios({
            method: 'get',
            url: `${this.url}/${id}`,
        }).then((response) => {
            return response.data as IExpenses;
        })
        return expense;
    }

    public async setNewExpense(newExpense: IExpenses): Promise<IExpenses> {
        const newExpenseResponse: IExpenses = await axios({
            method: 'patch',
            url: this.url,
            data: `${this.url}/${newExpense.id}`
        }).then((response) => {
            return response.data as IExpenses;
        })
        return newExpenseResponse;
    }

    public async updateExpense(updatedExpense: IExpenses): Promise<IExpenses> {
        const updatedExpenseResponse: IExpenses = await axios({
            method: 'patch',
            url: this.url,
            data: updatedExpense
        }).then((response) => {
            return response.data as IExpenses;
        })
        return updatedExpenseResponse;
    }

    public deleteExpense(id: string) {

    }

    
}