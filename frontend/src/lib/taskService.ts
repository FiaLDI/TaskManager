import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskService = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/api/',
        credentials: "include",
    }),
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: ({len, skip, filter}) => ({
                url: `/task?len=${len}&skip=${skip}&filter=${!filter ? "" : filter}`,
                method: "GET",
            }),
        }),
        addTask: builder.mutation({
            query: (data) => ({
                url: `/task`,
                method: "POST",
                body: data,
            }),
        }),
        editTask: builder.mutation({
            query: (data) => ({
                url: `/task`,
                method: "PUT",
                body: data,
            }),
        }),
        removeTask: builder.mutation({
            query: (id) => ({
                url: `/task?id=${id}`,
                method: "DELETE",
            }),
        }),
        
    }),
});

export const {
    useLazyGetTasksQuery,
    useAddTaskMutation,
    useEditTaskMutation,
    useRemoveTaskMutation
} = taskService;
