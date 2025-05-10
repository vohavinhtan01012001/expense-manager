import axios from "axios";
import type { ExpenseType } from "../types/expense";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// type ExpenseTypeResponse = {
//     data: ExpenseType[];
//     totalCount: number;
//     pageCount: number;
// }

export const expenseApi = {
    // getExpenses: async (page: number, pageSize: number): Promise<ExpenseTypeResponse> => {
    //     try {
    //         const [response, countResponse] = await Promise.all([
    //             axios.get<ExpenseType[]>(`${API_URL}/expenses`, {
    //                 params: {
    //                     _page: page,
    //                     _limit: pageSize,
    //                 },
    //             }),
    //             expenseApi.getExpensesCount(),
    //         ]);

    //         const totalCount = countResponse;
    //         const pageCount = Math.ceil(Number(totalCount) / pageSize);
    //         return {
    //             data: response.data,
    //             totalCount: Number(totalCount),
    //             pageCount: pageCount,
    //         };
    //     } catch (error) {
    //         console.error("Error fetching expenses:", error);
    //         throw error;
    //     }
    // },
    addExpense: async (data: ExpenseType): Promise<ExpenseType> => {
        try {
            const response = await axios.post<ExpenseType>(`${API_URL}/expenses`, data);
            return response.data;
        } catch (error) {
            console.error("Error adding expense:", error);
            throw error;
        }
    },
    updateExpense: async (
        id: string,
        data: Partial<ExpenseType>
    ): Promise<ExpenseType> => {
        try {
            const response = await axios.put<ExpenseType>(
                `${API_URL}/expenses/${id}`,
                data
            );
            return response.data;
        } catch (error) {
            console.error(`Error updating expense with id ${id}:`, error);
            throw error;
        }
    },
    deleteExpense: async (id: string): Promise<void> => {
        try {
            await axios.delete(`${API_URL}/expenses/${id}`);
        } catch (error) {
            console.error(`Error deleting expense with id ${id}:`, error);
            throw error;
        }
    },
    fetchExpenses: async (): Promise<ExpenseType[]> => {
        try {
            const response = await axios.get<ExpenseType[]>(`${API_URL}/expenses`);
            return response.data;
        } catch (error) {
            console.error("Error fetching expenses:", error);
            throw error;
        }
    },
    // getExpensesCount: async () => {
    //     try {
    //         const response = await axios.get(`${API_URL}/expenses`);
    //         const count = response.data.length;
    //         return count
    //     } catch (error) {
    //         console.error("Error fetching expense count:", error);
    //     }
    // }
}

