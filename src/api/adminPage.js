

// get All Admin Data 
export const getAllAdminData = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/allAdmin`)
    const data = await response.json()
    return data
}