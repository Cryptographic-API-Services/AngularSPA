export default class RegisterUserFormObject {
    public username: string;
    public email: string;
    public password: string;
    public addressOne: string;
    public addressTwo: string;
    public city: string;
    public state: string;
    public zip: string;
    public country: string;

    constructor(username: string, email: string, password: string, addressOne: string, addressTwo: string, city: string, state: string, zip: string, country: string) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.addressOne = addressOne;
        this.addressTwo = addressTwo;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.country = country;
    }
}