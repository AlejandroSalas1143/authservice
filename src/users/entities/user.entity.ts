export class User {
    id: number;
    email: string;
    password: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}
