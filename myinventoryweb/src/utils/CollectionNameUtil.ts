require('dotenv').config();

export enum Environment {
    dev = "dev",
    prod = "prod"
};

export enum CollectionName {
    user = "user",
    password = "password",
    session = "session",
    item = "item"
};

export function getCollectionName(env: Environment, collection: CollectionName): string {
    console.log("Arguments ");
    printArgs();
    console.log("Environment is " + env);

    if (collection === CollectionName.user ) {
        const userCollectionName = getUserCollectionName(env);
        console.log("User collection is " + userCollectionName);
        return userCollectionName;
    } else if (collection === CollectionName.session) {
       const sessionCollectionName = getSessionCollectionName(env);
       console.log("Session collection is " + sessionCollectionName);
       return sessionCollectionName; 
    } else if (collection === CollectionName.password) {
        const passwordCollectionName = getPasswordCollectionName(env);
        console.log("Password collection is " + passwordCollectionName);
        return passwordCollectionName;
    } else if (collection === CollectionName.item) {
        const itemCollectionName = getItemCollectionName(env);
        console.log("Item Collection is " + itemCollectionName);
        return itemCollectionName;
    } else {
        return "";
    }
}

function getUserCollectionName(env: Environment): string {
    if (env === Environment.prod && process.env.REACT_APP_PRODUSERDB) {
        return process.env.REACT_APP_PRODUSERDB!;
    } else if (env === Environment.dev && process.env.REACT_APP_TESTUSERDB) {
        return process.env.REACT_APP_TESTUSERDB!;
    } else {
        return "";
    }
}

function getSessionCollectionName(env: Environment): string {
    if (env === Environment.prod && process.env.REACT_APP_PRODSESSIONDB) {
        return process.env.REACT_APP_PRODSESSIONDB!;
    } else if (env === Environment.dev && process.env.REACT_APP_TESTSESSIONDB) {
        return process.env.REACT_APP_TESTSESSIONDB!;
    } else {
        return "";
    }
}

function getPasswordCollectionName(env: Environment): string {
    if (env === Environment.prod && process.env.REACT_APP_PRODPASSWORDDB) {
        return process.env.REACT_APP_PRODPASSWORDDB!;
    } else if (env === Environment.dev && process.env.REACT_APP_TESTPASSWORDDB) {
        return process.env.REACT_APP_TESTPASSWORDDB!;
    } else {
        return "";
    }
}

function getItemCollectionName(env: Environment): string {
    if (env === Environment.prod && process.env.REACT_APP_PRODITEMDB) {
        return process.env.REACT_APP_PRODITEMDB!;
    } else if (env === Environment.dev && process.env.REACT_APP_TESTITEMDB) {
        return process.env.REACT_APP_TESTITEMDB!;
    } else {
        return "";
    }
}

function printArgs() {

    process.argv.forEach((value, index) => {
        console.log(getArgument({index: index, arg: value}));
    });
}

function getArgument(arg: {index: number, arg: string}): string {
    return `${arg.index}: ${arg.arg}`;
}

export function getEnvironmentArg(): Environment {
    const env = process.argv[2];

    if (env === "prod") {
        return Environment.prod
    } else {
        return Environment.dev
    }
}