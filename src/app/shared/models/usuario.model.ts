export class Usuario {
    id: string;
    name: string;
    email: string;

    /**
     * Constructor
     *
     * @param user
     */
    constructor(user)
    {
        {
            this.id = user.id || '';
            this.name = user.name || '';
            this.email = user.email || '';
        }
    }
}
