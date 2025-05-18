import axios from "axios";
import type { ExpenseType } from "../types/expense";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const addExpense = async (data: ExpenseType): Promise<ExpenseType> => {
    try {
        const response = await axios.post<ExpenseType>(`${API_URL}/expenses`, data);
        return response.data;
    } catch (error) {
        console.error("Error adding expense:", error);
        throw error;
    }
}
export const updateExpense = async (
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
}
export const deleteExpense = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/expenses/${id}`);
    } catch (error) {
        console.error(`Error deleting expense with id ${id}:`, error);
        throw error;
    }
}
export const fetchExpenses = async (): Promise<ExpenseType[]> => {
    try {
        const response = await axios.get<ExpenseType[]>(`${API_URL}/expenses`);
        return response.data;
    } catch (error) {
        console.error("Error fetching expenses:", error);
        throw error;
    }
}


export const login = async ({ email, password }: { email: string; password: string }) => {
    try {
        const res = await axios.get(`${API_URL}/users?email=${email}`);
        const user = res.data[0];

        if (!user) {
            throw new Error("Tài khoản không tồn tại");
        }

        if (user.password !== password) {
            throw new Error("Mật khẩu không đúng");
        }

        const userPayload = {
            email: user.email,
            role: user.role,
        };

        const token = btoa(JSON.stringify(userPayload));

        return token;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

export const register = async ({ email, password }: { email: string; password: string }) => {
    try {
        const check = await axios.get(`${API_URL}/users?email=${email}`);
        if (check.data.length) {
            throw new Error("Email đã được đăng ký");
        }

        await axios.post(`${API_URL}/users`, {
            email,
            password,
            role: 'user'
        });

        const token = btoa(JSON.stringify({ email, role: 'user' }));

        return token;
    } catch (error) {
        console.error("Register error:", error);
        throw error;
    }
};