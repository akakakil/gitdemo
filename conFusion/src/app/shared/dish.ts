export class Dish{
    id?: string;
    name?: string;
    image?: string;
    category?: string;
    featured?: boolean;
    label?: string;
    price?: string;
    description?: string;
    comments?:IComments[];
}

export class IComments{
        rating?:number;
        comment?:string;
        author?:string;
        date?:string; 
}