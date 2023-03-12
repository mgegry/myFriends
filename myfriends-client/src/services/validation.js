class Validation {

    cleanValue(value) {
        return value.toString().trim();
    }

    validateLength(value, lower, upper) {
        const cleanedValue = this.cleanValue(value);
        if (cleanedValue.length > upper || cleanedValue.length < lower) {
            return false;
        }
        return true;
    }

    validateEmail(value) {
        const cleanedValue = this.cleanValue(value);
        console.log(cleanedValue.search('.'));
        if (cleanedValue.search("@") !== -1 && cleanedValue.indexOf(".") !== -1) {
            return true;
        }
        return false;
    }
}

const validation = new Validation();

export default validation; 