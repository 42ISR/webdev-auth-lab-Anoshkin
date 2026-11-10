const apiInstance = axios.create({
    baseURL: "???",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
})

apiInstance.interceptors.request.use((config) => {
    const { session } = useUserStore.???()

    if (session?.???) {
        config.headers.Authorization = `??? ${session.token}`
    }

    return config
})

const registerUser = async (user) => {
    const res = apiInstance.post("/auth/register", user)
    return res
}

const loginUser = async (user) => {
    const res = apiInstance.post("/auth/login", user)
    return res
}

const getItems = async () => {
    const res = apiInstance.get("/items")
    return res
}

const getStats = async () => {
    const res = apiInstance.post("/stats")
    return res
}

const getItems = async () => {
    const res = apiInstance.post("/items/${id}/bids")
    return res
}