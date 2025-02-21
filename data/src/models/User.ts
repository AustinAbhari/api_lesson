class User {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    isValid(): boolean {
        return !!this.name && !!this.age;
    }

    validate(): string[] | null {  // Return an array of strings or null
        const errors: string[] = [];

        if (!this.name || this.name.trim() === "") {
            errors.push("Name is required");
        }

        if (this.age === undefined || this.age === null || isNaN(this.age) || this.age < 0) {
            errors.push("Age is required and must be a non-negative number");
        }

        if (this.age > 150) {
            errors.push("Age is too high");
        }

        if (errors.length > 0) {
            return errors;
        }

        return null; // No errors
    }

    getName(): string {
        return this.name;
    }

    setName(name: string): void {
        this.name = name;
    }
}

export default User;