class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    isValid() {
        return !!this.name && !!this.age;
    }

    getName() {
        return this.name
    }

    setName(name) {
        this.name = name
    }
}

export default User;