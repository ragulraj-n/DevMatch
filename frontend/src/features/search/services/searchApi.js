import axiosApi from "../../../services/axiosApi"

export const searchUsersApi = async (query, limit = 5) => {
    try {
        const res = await axiosApi.get(`/search?q=${query}&limit=${limit}`)
        return res.data
    } catch (err) {
        throw err
    }
}