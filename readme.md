
# Project Structure
```
node-express-typescript/
--build/
  --app.js
--src/
  --api.ts
--test/
  --api.test.js

--package.json
--tsconfig.json
```

# Project Setup
1. create project folder
2. open terminal from root folder, and run `npm init`
3. install express and dev dependencies
    - `npm i express`
    - `npm i -D typescript @types/node @types/express`
4. initialize `tsconfig.json` by `npx tsc --init` and add
    ```
        "outDir": "./build", 
        "rootDir": "./src",  
    ```
5. create `src` folder and create a file `app.ts`
    ```
    import express, {Application, Request, Response} from 'express';

    const app: Application = express();

    const PORT: number = 3001;

    app.use('/', (req: Request, res: Response): void => {
        res.send('Hello World');
    })

    app.listen(PORT, (): void => {
        console.log(`SERVER IS UP ON PORT: ${PORT}`);
    })
    ```
7. build the project by run `npx tsc` => see the build folder with the app.js file compiled in the project
8. run the project `npm run start`
    to test automatically, add this to the (compile and run)`package.json`
    ```  "scripts": { "start": "npx tsc && node ./build/app.js" }```

## Install nodeomon
### with ts-node
1. `npm install -save-dev ts-node nodemon`
    - `ts-node`: Execution engine and REPL for nodejs (enabling you to directly execute Typescript on Node.js without precompiling)
2. create `nodemon.json` file inside the root directory
```
{
  "watch": [ "src" ],
  "ext": "ts",
  "exec": "ts-node ./main/server.ts"
}
```
3. add these script inside of the `package.json`
```
"dev": "nodemon - exec 'ts-node' src/main/server.ts",
```

### with concurrently
1. `npm install -D concurrently nodemon`
2. add this script in package.json `"dev": "concurrently \"npx tsc --watch\" \"nodemon -q dist/index.js\""`

### with rimraf
1. `npm install -D concurrently rimraf`
2. add this script in package.json
    - `"build": "rimraf dist && tsc -p tsconfig-build.json"`
    - `"build:watch": "npm run build -- watch"`
==========================================

# Tech Stack
- NodeJS
- Typescript
- MongoDB
- Express/Fastify 
- MongoDB Driver
- REST/GraphQL 
- TDD
- Clean Architecture
- Solid Principles
- Design Patterns / DDD Patterns (Domain Driven Design Pattern)

# About the Project
![project.JPG](./project.JPG)
- API to find catalogs (flyers) from the supermarkets or retailers
- contoh website : [tiendeo](https://business.tiendeo.com/en/)

## Setting up a NodeJs Development Environment
1. `npm init -y`
2. sediakan folder `src` dan `test`
3. npm i -D typescript @type/node 
    - npm i -D rimraf concurrently
4. inisialisasi ts config : `npx tsc init`
    - define `baseUrl` (for reference), `paths` (define domain directory inside the src folder)
        misal kita udah define baseUrl : ./src, terus di paths, ini dia akan pointing base nya ke baseUrl. jadi paths yg ada ini relatif thdp baseurl. jadi kalau misal di luar ./src, pakai "../" 
        -> `"paths"` ini berguna saat kita menggunakan import file (ini perlu install package `module-alias` to build the project)
    - define `rootDir` || `rootDirs` (kalau banyak folder nya)
    - define   `include`, dan `exclude`
      karena kita akan buat 2 file untuk di build, folder test untuk development dan folder src untuk build
    - copy tsconfig.json ke `tsconfig-build.json` yg extend ke `tsconfig.json`
    - define , `outDir`, `inDir`
5. update package.json
    - `"build":`
    - `"build-watch"`
    - `"main": `
6. install  `module-alias`
7. define module-alias for 4 main folder of typescript build in package.json
8. install `nodemon` as dev dep
    -     "dev": "nodemon -L --watch ./dist ./dist/main/server.js",
    -     "start:dev": "concurrently --kill-others-on-fail \"npm run build:watch\" \"npm run dev\" ",

9. install dev npm i -D `jest`, `@types/jest`
    - init jest: `npx jest --init` output nya nanti file `jest.config.json`
        - update `collectCoverageFrom`
            collectCoverageFrom: [
                "<rootDir>/src/**/*.ts",
                "!<rootDir>/src/main/**/*.ts"
            ],
            disini kita collect dari src tetapi ignore file yg ada di `main` folder (karena only contain vertical edge cover)
        - update `coverageDirectory` : "coverage" => laporan coverage nya nya diletakkan di folder mana
        - update `moduleNameMapper`
            mapper for tsconfig file for the domain, application, infrastructure, and main layer 
            (we tell the jest )
                "@domain/(.*)": "<rootDir>/src/domain/$1"
                artinya $1 itu akan diisi oleh (.*)
        - update `roots` for test folder
    - setup jest using typescript (allow us to write our test inside jest using typescript files)
        notes: cari tahu tentang preset
        - npm i -D ts-jest  (sebenarnya bisa dg cara lain yaitu menggunakan babel)
        - update `jest.config.js`
            "transform": {
                ...tsjPreset.transform,
            },
    - update package.json, `"test"`
        note: inband ini ada pertimbangan nya ntar cek lg (32.45)
        - "test": "jest --passWithNoTest --runInBand --no-cache"
        - "test:ci": "npm run test -- --coverage"

10. install eslint
    - npm init @eslint/config => output nya file `.eslintrc.json`
    - update gitignore file 
        .idea
        .DS_Store
        /node_modules
        /dist
        /coverage

    - update package.json
        "lint": "eslint --ignore-path .gitignore --ext .ts --fix"

    - update jest.config.js
        di paling atas tambahkan
        /* eslint-disable */

11. Install husky (conventional commit)
    Package to add git hooks (enforce policies and ensure consistency among team members)
    - npx husky-init && npm install (this also add hook to run before every commit)
    - add a new hooks for commitlint
      npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'

12. Install lint-staged (linters againts staged git files)
    - npm install -D lint-staged
    - update package.json
    ```
    {
        "lint-staged": {
            "*.ts": [
            "npm run lint",
            "npm run test:staged"
            ]
        }
    }
    ```
    - update .husky.pre-commit
    ```
    npx lint-staged    
    ```

13. install commitlint
    - npm install -D @commitlint/config-conventional @commitlint/cli
    - create commitlint.config.js
    ```
        /* eslint-disable */
    module.exports = {extends: ['@commitlint/config-conventional']}
    ```
    - to execute the commitlint
      (default nya sudah ada di .husky/commit-msg)
    ```
    npx --no -- commitlint --edit ${1}
    ```
    - tell eslint the typescript project
        eslint need to know that is the configuration for the typescript in order to check the rules
    update `.eslintrc.json` (we use tsconfig.json only for development)
    ```
        "parserOptions": {
        "project": "./tsconfig.json",
        }
    ```
    - install eslint extension in viscode

14. install jest-mongodb
    in-memory implementation
    basically a preset to run with jest (run mongodb in memory)
    - npm install i -D @shelf/jest-mongodb
    - update jest.config.js
      ```
      preset: '@shelf/jest-mongodb',
      ```
    - init jest-mongodb-config.js
      sesuaikan versinya dengan mongo yg dipakai 
    - npm i mongodb
    - update .gitignore add `globalConfig.json`





# Reference
- [Dyarlen Iber - Clean Architecture with Typescript](https://www.youtube.com/playlist?list=PLN3ZW2QI7gLfQ4oEkDWw0DZVIjvAjO140)