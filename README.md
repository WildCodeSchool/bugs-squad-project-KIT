# AngularTemplate

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Environment variables in development

To set up environment variables such as en API Key, copy the file `src/environments/environment.ts` to `src/environments/environment.development.ts`.
Add the variables to the new file for example `apiKey: 'xxxxxxxx'`.
To reference an environment variable in the files, import `import { environment } from 'src/environments/environment.development';` 
and use `environment.nameOfVariable` to reference the variable.

## Gitignore file for development if don't work

If when you add files to a .gitignore they still appear in the git status, try to run the following commands:
`git rm -r --cached .`
`git add .`
`git commit -m "fixed untracked files"`
