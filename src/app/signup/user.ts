export interface User {
    nameGroup: {
        firstName: string;
        lastName: string;
    };
    email: string;
    passwordGroup: {
        password: string;
        passwordConf: string;
    }
}