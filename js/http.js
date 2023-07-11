export const BASE_URL = "http://localhost:5050"

export const getData = async (path) => {
    try {
        const res = await fetch(BASE_URL + path)

        const data = await res.json()

        return data   
    } catch (error) {
        console.log(error)
        return []
    }
}

export const postData = async (path, body) => {
    try {
        const res = await fetch(BASE_URL + path, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const data = await res.json()

        return data
    }catch(e){
        console.log(e);
    }
}

export const delData = async (userId) => {
    try {
        const res = await fetch(BASE_URL + "/users/" + userId, {
            method: "DELETE"
        })
    
    } catch (e) {
        console.log(e);
    }
}

export const newData = async (userId, relData) => {
    try {
        const res = await fetch(BASE_URL + "/users/" + userId, {
            method: "PATCH",
            body: JSON.stringify(relData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        // const relData = await getData('/users')
        //     reload(relData)
        
        
    } catch (error) {
        console.log(error);
    }
}
