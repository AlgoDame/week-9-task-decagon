export interface Organization{
    _id?:string,
    organization: string,
    products: string[],
    marketValue: string,
    address: string,
    ceo: string,
    country: string,
    id?: string,
    noOfEmployees: number,
    employees: string[],
    createdAt?: Date,
    updatedAt?: Date
}

export interface SignUp{
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    confirmpassword: string
}

export interface Login{
    email: string,
    password:string
}